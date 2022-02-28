<?php
require_once('functions.php');
if(isset($_POST['iscords']))
{
	$cordspath=$_POST['iscords'].'conf/custom/additional/map/js/map.js';
	$cordspath2=$_POST['iscords'].'conf/custom/js/default/map.js';
	$cordspath3=$_POST['iscords'].'conf/custom/additional/map/conf/map.conf';
	$cordspath4=$_POST['iscords'].'conf/custom/conf/map.conf';
	$cordspath5=$_POST['iscords'].'conf/custom/js/default/p.js';
	copyFile($cordspath,$cordspath2);
	copyFile($cordspath3,$cordspath4);
	$cordsjson=file_get_contents($cordspath4);
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
	writeFile($cordspath5,$jsarr);	
	if(file_exists($cordspath5)) 
	{
		echo 'var obj={_message_0: ["Координаты загружены!"],_action_1: "'.$cordspath5.'"};';
	}
	else
	{
		echo 'var error={_message_0: ["Не найден файл: '.$cordspath5.'."],_action_1: ["Создайте файл вручную."]};';
	}
}
?>
