<?php
require_once('functions.php');
if(isset($_POST['sortpath']))
{
	$path1=$_POST['sortpath'].'conf/default/conf/sort.conf';
	$path2=$_POST['sortpath'].'conf/custom/conf/sort.conf';
	$jstr=$_POST['sortjson'];
	writeFile($path1,$jstr);
	writeFile($path2,$jstr);
	echo 'alert("Список меток для сортировки изменен!");';
}
?>
