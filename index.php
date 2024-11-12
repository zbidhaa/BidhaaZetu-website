<?php
// Mipangilio ya database
$servername = "localhost";  // Server ya MySQL
$username = "root";         // Jina la mtumiaji wa MySQL
$password = "";             // Neno la siri la MySQL (kwa XAMPP, hii ni kawaida tupu)
$dbname = "bidhaa_zetu";    // Jina la database yako

// Kuungana na database
$conn = new mysqli($servername, $username, $password, $dbname);

// Angalia ikiwa muunganisho umeshindwa
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";
?>
