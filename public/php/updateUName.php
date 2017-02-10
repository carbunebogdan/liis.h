<?php

$account=json_decode(file_get_contents("php://input"));

$uname=$account->uname;
$id=$account->id;

include('config.php');

$db= new DB();

$sql="UPDATE profesor SET username=? WHERE id_profesor=?";

$db->updateUName($sql,$uname,$id);