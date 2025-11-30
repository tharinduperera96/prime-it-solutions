<?php
// Basic contact form mail handler.
// IMPORTANT: Update $to, $subjectPrefix, and optionally headers for your mail server.

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

function sanitize($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, "UTF-8");
}

$name    = sanitize($_POST["name"] ?? "");
$email   = sanitize($_POST["email"] ?? "");
$phone   = sanitize($_POST["phone"] ?? "");
$company = sanitize($_POST["company"] ?? "");
$subject = sanitize($_POST["subject"] ?? "");
$service = sanitize($_POST["service"] ?? "");
$message = sanitize($_POST["message"] ?? "");

if (!$name || !$email || !$subject || !$message) {
    header("Location: contact.html?status=error");
    exit;
}

$to            = "hello@prime.lk"; // TODO: change to your preferred receiving address
$subjectPrefix = "[Prime IT Contact] ";
$fullSubject   = $subjectPrefix . $subject;

$body = "New contact form submission:\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: {$phone}\n";
$body .= "Company: {$company}\n";
$body .= "Service: {$service}\n\n";
$body .= "Message:\n{$message}\n";

$headers = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";

$success = @mail($to, $fullSubject, $body, $headers);

if ($success) {
    header("Location: contact.html?status=sent");
} else {
    header("Location: contact.html?status=error");
}
exit;
