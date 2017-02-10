<?php

$id=$_GET['id'];

include('config.php');

$db= new DB();



	$sql="SELECT articol.*,disciplina.nume_disciplina,clasa.nume_clasa
			FROM articol 
			JOIN  junction_clasa_disciplina 
				ON clasa_disciplina=clasa_disciplina_id 
			JOIN disciplina 
				ON disciplina_FK=id_disciplina
			JOIN clasa
				ON clasa_FK=id_clasa
				WHERE articol.profesor=$id
				ORDER BY articol.data DESC";

$data=$db->pop($sql);

echo json_encode($data);