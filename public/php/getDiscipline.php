<?php
	
	header("Access-Control-Allow-Origin: *");

	$id=json_decode(file_get_contents("php://input"));

	

	include('config.php');

	
	
	$db = new DB();

	$sql="SELECT * 
			FROM disciplina 
			JOIN junction_clasa_disciplina 
				ON disciplina.id_disciplina = junction_clasa_disciplina.disciplina_FK 
					WHERE junction_clasa_disciplina.clasa_FK = $id
					ORDER BY disciplina.nume_disciplina";



	$data = $db->pop($sql);

	echo json_encode($data);