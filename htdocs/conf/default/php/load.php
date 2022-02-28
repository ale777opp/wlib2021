<?php
if(isset($_POST['islimits']))
{
	$path=$_POST['islimits'];
	if(file_exists($path)) 
	{
		$rezult = file_get_contents($path);
		$json=json_decode($rezult);
		echo 'var dbname='.$_POST['dbname'].';';
		echo 'var dbindex='.$_POST['dbindex'].';';
		echo 'var rezult='.$rezult.';';
	}
	else
	{
		echo 'var error={_message_0: ["Не найден файл: '.$path.'."],_action_1: ["Создайте настройки вручную."]};';
	}
}
?>
