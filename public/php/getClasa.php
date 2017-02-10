<?php
	include('config.php');

	$db = new DB();

	
	$data = $db->qryPop();
	

	echo json_encode($data);