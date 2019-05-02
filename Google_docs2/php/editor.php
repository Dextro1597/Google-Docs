<?php
session_start();
?>

<?php

$username = $_SESSION['username'];
$sharer = $_SESSION['sharer'];
$my_file='../files/'.$username.'.txt';

if ($sharer!="no_share") {
	$my_file='../files/'.$sharer.'_share.txt';		
}

if($_POST['update']==1)
//if(true)
{
	$load_file="../files/".$sharer.".txt";
	clearstatcache();
	if(filesize($load_file)) {
	    $handle = fopen($load_file, 'r');
	    if (!isset($data)) 
    		$data = new stdClass();
		$data->load_data = fread($handle,filesize($load_file));
		$data->sharer= $sharer;
		echo json_encode($data);

	}
}
elseif ($_POST['update']==12) 
//if(true)
{
	if(filesize($my_file)) {
	    $handle = fopen($my_file, 'r');
		$data = fread($handle,filesize($my_file));
		echo $data;
	}
}
elseif ($_POST['update']==123) 
//if(true)
{
	$data=$_POST['data'];
	$handle = fopen("../files/".$sharer.".txt", 'w');
	fwrite($handle, $data);
}
else{
	$data=$_POST['update'];
	$handle = fopen($my_file, 'w');
	fwrite($handle, $data);
}

?> 