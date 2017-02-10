<?php

include('config.php');
$db= new DB();

$sql="SELECT * FROM disciplina";

$data=$db->getAllD($sql);

echo json_encode($data);