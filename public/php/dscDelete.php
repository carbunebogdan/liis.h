<?php

	$id = json_decode(file_get_contents("php://input"));


	include('config.php');

	$db=new DB();

	$sql="DELETE FROM junction_clasa_disciplina WHERE clasa_disciplina_id=$id->id";

	$result=$db->deleteArt($sql);

	echo $result;