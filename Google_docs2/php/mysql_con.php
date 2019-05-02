
<?php
$servername = "127.0.0.1";
$username = "ahad";
$password = "";
$database = "google";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
