<?php
/**
 * Zapier Webhook Notification Script
 * 
 * This script sends new blog post data to Zapier for social media distribution
 * 
 * Usage: POST to this endpoint with blog post data
 * Example: curl -X POST https://yourdomain.com/api/notify-zapier.php -d '{"title":"My Post","url":"https://..."}'
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Your Zapier webhook URL
$zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/16151270/uwsuse2/';

// Get the blog post data
$input = file_get_contents('php://input');
$blogPost = json_decode($input, true);

if (!$blogPost) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Prepare data for Zapier
$zapierData = [
    'title' => $blogPost['title'] ?? '',
    'url' => $blogPost['url'] ?? '',
    'excerpt' => $blogPost['excerpt'] ?? '',
    'image' => $blogPost['image'] ?? '',
    'category' => $blogPost['category'] ?? '',
    'published_date' => $blogPost['date'] ?? date('Y-m-d H:i:s'),
    
    // Social media optimized content
    'instagram_caption' => generateInstagramCaption($blogPost),
    'twitter_text' => generateTwitterText($blogPost),
    'linkedin_post' => generateLinkedInPost($blogPost),
    'facebook_post' => generateFacebookPost($blogPost),
    'pinterest_description' => generatePinterestDescription($blogPost),
];

// Send to Zapier
$ch = curl_init($zapierWebhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($zapierData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log the notification
$logFile = __DIR__ . '/zapier-notifications.log';
$logEntry = date('Y-m-d H:i:s') . " - " . $blogPost['title'] . " - HTTP " . $httpCode . "\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode([
        'success' => true,
        'message' => 'Blog post sent to Zapier successfully',
        'zapier_response' => $response
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send to Zapier',
        'http_code' => $httpCode
    ]);
}

// Helper functions to format content for each platform

function generateInstagramCaption($post) {
    $caption = "✨ " . $post['title'] . "\n\n";
    $caption .= $post['excerpt'] . "\n\n";
    $caption .= "Read the full guide 👉 Link in bio\n\n";
    $caption .= "#travel #wanderlust #travelguide #travelblog";
    return $caption;
}

function generateTwitterText($post) {
    $text = "🌍 " . $post['title'] . "\n\n";
    $text .= substr($post['excerpt'], 0, 150) . "...\n\n";
    $text .= "Read more: " . $post['url'];
    return substr($text, 0, 280); // Twitter character limit
}

function generateLinkedInPost($post) {
    $text = $post['title'] . "\n\n";
    $text .= $post['excerpt'] . "\n\n";
    $text .= "Read the complete guide: " . $post['url'] . "\n\n";
    $text .= "#Travel #TravelTips #Wanderlust";
    return $text;
}

function generateFacebookPost($post) {
    $text = "📍 " . $post['title'] . "\n\n";
    $text .= $post['excerpt'] . "\n\n";
    $text .= "👉 Read the full guide: " . $post['url'];
    return $text;
}

function generatePinterestDescription($post) {
    $text = $post['title'] . " | ";
    $text .= $post['excerpt'] . " ";
    $text .= "Click to read the complete travel guide!";
    return $text;
}
?>
