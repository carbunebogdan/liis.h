<?php
	$id = $_GET['id'];
	// $id=2;
	include('config.php');

	$db = new DB();

	// $sql= "SELECT * FROM articol WHERE id_articol='$id' ";

		$sql="SELECT articol.*,profesor.nume_profesor,profesor.prenume
			FROM articol 
			JOIN profesor
				ON profesor=id_profesor
				WHERE id_articol=$id";

	$data = $db->pop($sql);

	echo json_encode($data);

	

