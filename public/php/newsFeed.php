<?php
	
	header("Access-Control-Allow-Origin: *");

	include('config.php');

	$db = new DB();

	// $sql="SELECT * FROM articol";

	$sql="SELECT articol.*,disciplina.nume_disciplina,clasa.nume_clasa,profesor.nume_profesor,profesor.prenume
			FROM articol 
			JOIN  junction_clasa_disciplina 
				ON clasa_disciplina=clasa_disciplina_id 
			JOIN disciplina 
				ON disciplina_FK=id_disciplina
			JOIN clasa
				ON clasa_FK=id_clasa
			JOIN profesor
				ON profesor=id_profesor
				ORDER BY articol.id_articol DESC";

	$data=$db->popDetailed($sql);

	echo json_encode($data);
