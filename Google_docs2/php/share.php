<?php
session_start();
?>


<?php

include 'mysql_con.php';

$share_partner = $_POST['share'];
$sharer = $_SESSION['username'];

$sql = "update google set share='".$sharer."' where uname in ('".$sharer."','".$share_partner."')";

if (mysqli_query($conn, $sql)) {
	echo "<script>window.location.href = 'http://localhost/Google_docs2/editor.html';
	
	</script>";

} else {
    echo "Error updating record: " . mysqli_error($conn);
}


?>