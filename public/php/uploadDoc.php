<?php

$target_dir = "../uploads/docs/";


move_uploaded_file($_FILES['file']['tmp_name'], $target_dir.$_FILES['file']['name']);
?>