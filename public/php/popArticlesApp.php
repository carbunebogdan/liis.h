<?php

	header("Access-Control-Allow-Origin: *");

	$id=json_decode(file_get_contents("php://input"));

	include('config.php');
	
	$db = new DB();

	$sql="SELECT articol.*,profesor.nume_profesor,profesor.prenume
						FROM articol 
							JOIN profesor
								ON profesor=id_profesor
						WHERE clasa_disciplina=$id ORDER BY data DESC";

	

	$data = $db->pop($sql);

	echo json_encode($data);
