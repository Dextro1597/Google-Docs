<?php
session_start();
?>

<?php

include 'mysql_con.php';

$username = $_POST['l_username'];
$password = $_POST['l_password'];

$sql = "select share from google where uname='".$username."'";

$result = mysqli_query($conn, $sql);
$share_name = mysqli_fetch_assoc($result);
$share_name = trim($share_name['share']);


$sql = "select pass from google where uname='".$username."'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

$row = mysqli_fetch_assoc($result);
if(strcmp($row['pass'], $password)==0)
{
	$_SESSION['username'] = $username;
	$_SESSION['sharer'] = $share_name;
	//echo $_SESSION['sharer'];
	header("Location: http://localhost/Google_docs2/editor.html", true, 301);
}
else
{
	echo "<script>
alert('Invalid password');
window.location.href = 'http://localhost/Google_docs2/';
</script>";

}

} else {
echo "<script>
alert('Invalid username');
window.location.href = 'http://localhost/Google_docs2/';
</script>";}

?>