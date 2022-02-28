<?php
require_once('functions.php');
if(isset($_POST['regformpath']))
{
	$path1=$_POST['regformpath'].'conf/default/conf/regform.conf';
	$path2=$_POST['regformpath'].'conf/custom/conf/regform.conf';
	$jstr=$_POST['regformjson'];
	writeFile($path1,$jstr);
	writeFile($path2,$jstr);
	echo 'alert("Список полей для регистрационной формы изменен!");';
}
?>
