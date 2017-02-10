<?php

$nume=$_GET['nume'];
$parola=$_GET['parola'];
include('config.php');

$db = new DB();
	
	

	$sql= "SELECT id_profesor,username,nume_profesor,prenume,parola,email FROM profesor WHERE username=? and parola=? ";



	$data = $db->getUser($sql,$nume,$parola);

	echo json_encode($data);