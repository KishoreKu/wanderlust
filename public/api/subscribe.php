<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get the posted data
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

// Validate email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address']);
    exit();
}

// Mailchimp configuration - using environment variables for security
// Set these in your cPanel PHP configuration or .htaccess
$apiKey = getenv('MAILCHIMP_API_KEY') ?: ''; // Set this in cPanel
$listId = getenv('MAILCHIMP_LIST_ID') ?: '887adb19d6';
$dataCenter = getenv('MAILCHIMP_SERVER') ?: 'us18';

// Fallback check - if no API key is set, return error
if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Newsletter service is not configured. Please contact support.']);
    exit();
}

// Prepare the data for Mailchimp
$memberData = [
    'email_address' => $email,
    'status' => 'subscribed', // Use 'pending' for double opt-in
];

// Create the API URL
$url = "https://{$dataCenter}.api.mailchimp.com/3.0/lists/{$listId}/members";

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($memberData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: apikey ' . $apiKey
]);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to connect to Mailchimp']);
    exit();
}

// Parse the response
$responseData = json_decode($response, true);

// Check if subscription was successful
if ($httpCode === 200 || $httpCode === 201) {
    echo json_encode([
        'success' => true,
        'message' => 'Successfully subscribed! Check your email for confirmation.'
    ]);
} elseif ($httpCode === 400 && isset($responseData['title']) && $responseData['title'] === 'Member Exists') {
    echo json_encode([
        'success' => false,
        'message' => 'This email is already subscribed to our newsletter.'
    ]);
} else {
    http_response_code($httpCode);
    echo json_encode([
        'success' => false,
        'message' => isset($responseData['detail']) ? $responseData['detail'] : 'Failed to subscribe. Please try again.'
    ]);
}
