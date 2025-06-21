<?php
// chat-assistant.php

header('Content-Type: application/json');

// CONFIGURE THIS:
$apiKey = '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'; // Your OpenAI API key
$assistantId = 'asst_gAR4KqWcP3lBwIJ1mGEUn5iO'; // Your Assistant ID from OpenAI

//check if message is empty
$input = json_decode(file_get_contents("php://input"), true);
$userMessage = trim($input['message'] ?? '');

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'Message input is empty']);
    exit;
}


if (!$userMessage) {
    echo json_encode(['error' => 'No message received']);
    exit;
}

// 1. Create a new thread
$thread = apiCall("https://api.openai.com/v1/threads", [], $apiKey);

// 2. Add user message to thread
$threadId = $thread['id'];
apiCall("https://api.openai.com/v1/threads/$threadId/messages", [
    'role' => 'user',
    'content' => $userMessage
], $apiKey);

// 3. Run the assistant
$run = apiCall("https://api.openai.com/v1/threads/$threadId/runs", [
    'assistant_id' => $assistantId
], $apiKey);

// 4. Wait for the run to complete (polling)
$runId = $run['id'];
$status = 'queued';
while ($status !== 'completed' && $status !== 'failed') {
    sleep(1); // wait 1 second
    $runCheck = apiCall("https://api.openai.com/v1/threads/$threadId/runs/$runId", [], $apiKey, 'GET');
    $status = $runCheck['status'];
}

if ($status === 'failed') {
    echo json_encode(['error' => 'Assistant run failed']);
    exit;
}

// 5. Get the assistant's reply
$messages = apiCall("https://api.openai.com/v1/threads/$threadId/messages", [], $apiKey, 'GET');

// 6. Return the last assistant message
foreach ($messages['data'] as $msg) {
    if ($msg['role'] === 'assistant') {
        echo json_encode(['reply' => $msg['content'][0]['text']['value']]);
        exit;
    }
}

echo json_encode(['reply' => 'No assistant reply found']);
exit;

// Helper function to call OpenAI API
function apiCall($url, $postData = [], $apiKey = '', $method = 'POST') {
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    if (!empty($postData) && $method !== 'GET') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    }

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
    'OpenAI-Beta: assistants=v2'
]);


    $response = curl_exec($ch);
    $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($httpStatus >= 400) {
    http_response_code($httpStatus);
    echo json_encode([
        'error' => "API error: $httpStatus",
        'response' => json_decode($response, true)
    ]);
    exit;
}


    return json_decode($response, true);
}
