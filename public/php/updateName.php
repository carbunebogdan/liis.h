<?php

$account=json_decode(file_get_contents("php://input"));

include('config.php');

$name=$account->name;
$surname=$account->surname;
$id=$account->id;

$db= new DB();

$sql="UPDATE profesor 
		SET
		nume_profesor=?,
		prenume=?
		
		WHERE id_profesor=?";

$db->updateName($sql,$name,$surname,$id);