<?php

	$clasaId = $_GET['clasaId'];
	$dscId = $_GET['dscId'];

	include('config.php');


	
	// $clasaId = 5;
	// $dscId = 68;
	
	$db = new DB();

	$firstSQL= "SELECT clasa_disciplina_id FROM junction_clasa_disciplina WHERE clasa_FK='$clasaId' && disciplina_FK='$dscId' ";





	$data=$db->popArticles($firstSQL);

	echo json_encode($data);