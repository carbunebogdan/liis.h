<?php

$input_data=json_decode(file_get_contents("php://input"));

include('config.php');

$db= new DB();

$secondSql="INSERT INTO junction_clasa_disciplina(clasa_FK,disciplina_FK) VALUES($input_data->id_clasa,$input_data->id_disciplina)";
$firstSql="SELECT * FROM junction_clasa_disciplina WHERE clasa_FK=$input_data->id_clasa AND disciplina_FK=$input_data->id_disciplina";

$response=$db->addDsc($firstSql,$secondSql);

echo $response;