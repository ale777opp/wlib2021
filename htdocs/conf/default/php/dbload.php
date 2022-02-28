<?php
if(isset($_POST['jsoneditbasepath']))
{
	$path=$_POST['jsoneditbasepath'];
	if(file_exists($path)) 
	{
		$rezult = file_get_contents($path);
		$json=json_decode($rezult);
		echo 'var rezult='.$rezult.';';
	}
	else
	{
		echo 'var error={_message_0: ["Не найден файл: '.$path.'."],_action_1: ["Создайте настройки вручную."]};';
	}
}
?>
