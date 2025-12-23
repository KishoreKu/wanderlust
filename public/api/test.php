<?php
// Test script to check if environment variables are set
header('Content-Type: application/json');

$apiKey = getenv('MAILCHIMP_API_KEY') ?: '';
$listId = getenv('MAILCHIMP_LIST_ID') ?: '';
$dataCenter = getenv('MAILCHIMP_SERVER') ?: '';

echo json_encode([
    'api_key_set' => !empty($apiKey),
    'api_key_length' => strlen($apiKey),
    'list_id_set' => !empty($listId),
    'list_id' => $listId,
    'datacenter_set' => !empty($dataCenter),
    'datacenter' => $dataCenter,
    'php_version' => phpversion(),
    'curl_available' => function_exists('curl_init')
]);
