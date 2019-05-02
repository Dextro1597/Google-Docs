
<?php

include 'mysql_con.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "INSERT INTO google (email,uname,pass) VALUES ('".$email."','".$username."','".$password."')";

if (mysqli_query($conn, $sql)) {
	$my_file = '../files/'.$username.'.txt';
	$handle = fopen($my_file, 'w');
echo "<script>
alert('Signup completed');
window.location.href = 'http://localhost/Google_docs2/';
</script>";
}
 else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>