<?php
error_reporting(0);
/*ЭБС ЛАНЬ - авторизация по токену*/
	function OsIs($OS)
	{
		$tmp = php_uname();
		$tmp = strpos($tmp, $OS);
		if($tmp || $tmp === 0)
			return true;
		return false;
	}
	if((isset($_GET['token']))&&(isset($_GET['url'])))
	{
		$osSlash='';
		if(OsIs('Linux'))
			$osSlash='/';
		else
			$osSlash='\\';
		$dirname=dirname(__FILE__);
		$array = explode($osSlash,$dirname);
		$len = count($array);
		$folderName=$array[$len-6];
		$historyfolder='';
		for($i=0; $i<$len-3; $i++)
		{
			$historyfolder.=$array[$i].'/';
		}
		$historyfolder.='_'.$folderName;
		//echo $historyfolder;
		$fuser=file_get_contents($historyfolder.'/'.$_GET['nsean'].'/user.conf');
		//echo $historyfolder.'/'.$_GET['nsean'].'/user.conf';
		$jsonuser=json_decode('{'.$fuser.'}');
		//var_dump(json_decode('{'.$fuser.'}'));
		if(isset($jsonuser->userinfo->AY))
		{
			$opts = array(
				'http'=>array(
					'method'=>"GET",
					'header'=>"accept: application/json\r\n" .
					"x-auth-token: ".$_GET['token']."\r\n"
				)
			);
			
			$context  = stream_context_create($opts);
			
			$rezult = file_get_contents('https://openapi.e.lanbook.com/1.0/security/autologinUrl?uid='.urlencode($jsonuser->userinfo->AY).'&redirect='.$_GET['url'].'&time='.date('YmdHi'), False, $context);
			$rjson=json_decode($rezult);
			if((!isset($rjson->data)) || ($rjson->data == null))
				echo '<html><head><title>Не удалось подключиться к ЭБС</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>Не удалось подключиться к ЭБС</body></html>';
			else
				header("Location: $rjson->data");
		}
		else
			echo '<html><head><title>Не удалось подключиться к ЭБС</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>Не удалось подключиться к ЭБС</body></html>';
	}
	else
		echo '<html><head><title>Не удалось подключиться к ЭБС</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>Не удалось подключиться к ЭБС</body></html>';
?>