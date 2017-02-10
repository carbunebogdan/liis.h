<?php


$data = json_decode(file_get_contents("php://input"));
$timestamp=date("Y-m-d H:i:s");
include('config.php');

$db=new DB();

$id=$data->id;
$title=$data->title;
$content=$data->content;
$doc=$data->doc;
$professor=$data->professor;

$edit=true;

// $id=10;
// $title='dummy updatessss title';
// $content='dummy update content';
// $doc='path.doc';
// $professor=1;
// $date=date("Y-m-d H:i:s");
// $edit=true;


$sql="UPDATE articol 
		SET nume_articol=?,
			descriere_articol=?,
			document_articol=?,
			profesor=$professor,
			data=?,
			edit=true
		WHERE id_articol=$id;
		";


$db->updateArt($sql,$title,$content,$doc,$timestamp);