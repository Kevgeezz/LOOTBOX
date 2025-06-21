<?php

header('Content-Type: application/json');


$apiKey = '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'; // Make sure this is correct and active

$data = json_decode(file_get_contents('php://input'), true);
$userMessage = trim($data['message'] ?? '');




// Define the product data


$productData = "
Here are our available products and prices:
- PLAYSTATION 5 (Digital): GH₵7,500
- JBL XTREME: GH₵500
- JBL HEADPHONE: GH₵250
- APPLE DESKTOP MONITOR: GH₵45,000
";
// Check if the user message is empty


if (!$userMessage) {
    echo json_encode(['error' => 'No message provided']);
    exit;
}

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);

$postData = [
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'system', 'content' => "You are a helpful assistant. Use only the information below to answer questions:\n{$productData}"],
        ['role' => 'user', 'content' => $userMessage]
    ],
    'temperature' => 0.7
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check if it's an error response
if ($httpStatus !== 200) {
    echo json_encode([
        'error' => 'OpenAI API error',
        'status' => $httpStatus,
        'response' => $response
    ]);
    exit;
}

echo $response;
?>
