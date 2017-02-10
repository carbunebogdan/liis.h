<?php

$input_data=json_decode(file_get_contents("php://input"));

$newPsw=$input_data->newPsw;
$id=$input_data->id;

include('config.php');

$db= new DB();

$sql="UPDATE profesor SET parola=? WHERE id_profesor=?";

$db->changePsw($sql,$newPsw,$id);

