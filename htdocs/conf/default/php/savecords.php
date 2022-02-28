<?php
require_once('functions.php');
if(isset($_POST['cordsspath']))
{
	$cordspath1=$_POST['cordsspath'].'conf/custom/js/default/p.js';
	$cordspath2=$_POST['cordsspath'].'conf/custom/conf/map.conf';
	$cordsjson=$_POST['cordsjson'];
	writeFile($cordspath2,$cordsjson);
	$json=json_decode($cordsjson);
	$jsarr='';
	foreach ($json as $key => $value)
	{
		$jsarr.='var '.$key.'=new Object();'."\n";
		foreach ($value as $arg => $val)
		{
			$len=count($val);
			$jsarr.=$key.'["'.$arg.'"]=new Object();'."\n";
			for($i=0;$i<$len;$i++)
			{
				$term=$val[$i];
				if(($i>0)&&($i<($len-1)))
					$term='"'.$val[$i].'"';
				$jsarr.=$key.'["'.$arg.'"]['.$i.']=['.$term.'];'."\n";
			}
		}
	}
	writeFile($cordspath1,$jsarr);
	$cordspath=$_POST['cordsspath'].'conf/custom/additional/map/js/map.js';
	$cordspath3=$_POST['cordsspath'].'conf/custom/js/default/map.js';
	$cordspath4=$_POST['cordsspath'].'conf/custom/additional/map/css/map.css';
	$cordspath5=$_POST['cordsspath'].'conf/custom/css/default/map.css';
	copyFile($cordspath,$cordspath3);
	copyFile($cordspath4,$cordspath5);
	if((file_exists($cordspath1))&&(file_exists($cordspath2)))
	{
		echo 'var obj={_message_0: ["Координаты загружены!"],_action_1: "'.$cordspath1.'"};';
	}
	else
	{
		echo 'var error={_message_0: ["Не найден файл: '.$cordspath1.'."],_action_1: ["Создайте файл вручную."]};';
	}
}
?>
