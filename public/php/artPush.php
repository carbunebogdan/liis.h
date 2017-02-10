<?php

	$input_data = json_decode(file_get_contents("php://input"));
	$timestamp=	date("Y-m-d H:i:s");
	// $input_data=new stdClass();
	
	// 	$input_data->titlu='sad';
	// 	$input_data->continut='sdasdasd';
	// 	$input_data->doc='sdadsadsa';
	// 	$input_data->clasa_disciplina=1;
	// 	$input_data->profesor=1;
		
				$titlu=$input_data->titlu;
				$continut=$input_data->continut;
				$document=$input_data->document;
				$clasa_disciplina=$input_data->clasa_disciplina;
				$profesor=$input_data->profesor;



	include('config.php');

	$db = new DB();


	$sql="INSERT INTO articol(nume_articol,descriere_articol,document_articol,clasa_disciplina,profesor,data) VALUES (?,?,?,?,?,?)";

	$data=$db->pushArt($sql,$titlu,$continut,$document,$clasa_disciplina,$profesor,$timestamp);

