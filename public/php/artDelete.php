<?php

	$id=$_GET['id'];


	include('config.php');

	$db=new DB();

	$sql="DELETE FROM articol WHERE id_articol=$id";

	$result=$db->deleteArt($sql);

	echo $result;