<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Конфигурационный файл</title>
<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<link href="default/css/base.css" type="text/css" rel="stylesheet"/>
<!--[if lt IE 9]>
<link href="default/css/add.css" type="text/css" rel="stylesheet">
<![endif]-->
<script src="default/js/base.js"></script>
<?php
require_once('default/php/functions.php');
$path='custom/conf/path.conf';
$path0='default/conf/path.conf';
$basepath='custom/conf/db.conf';
$dbpath0='default/conf/db.conf';
$folderName='';
$OpacDocumentRoot='';
$pathapache='';
$dirHtdocs='';
$dirCgibin='';
$serverName = getenv ("SERVER_NAME");
$serverAddr = getenv ("SERVER_ADDR");
$hostname = getenv ("HTTP_HOST");
$dirname=dirname(__FILE__);
$array = explode($osSlash,$dirname);
$len = count($array);
$folderName.=$array[$len-3];
for($i=0; $i<$len-2; $i++)
{
	$dirHtdocs.=$array[$i].'/';
	$dirCgibin.=$array[$i].'/';
	$pathapache.=$array[$i].'/';
}
$dirOpacCgi='';
if(OsIs('Linux'))
	$dirOpacCgi.=$array[0].''.$osSlash.''.$array[1].''.$osSlash.''.$array[2].''.$osSlash.''.$array[3].''.$osSlash.'cgi-bin'.$osSlash.'opacg';
else
	$dirOpacCgi=$array[0].''.$osSlash.''.$array[1].''.$osSlash.''.$array[2].''.$osSlash.'cgi-bin'.$osSlash.'opacg';
$pathapache.='apache.conf';
if(isset($_POST['settings']))
{
	include ('default/php/second.php'); 
}
elseif(isset($_POST['jsonpath']))
{
	include ('default/php/third.php'); 
}
elseif(isset($_POST['jsoneditpath']))
{
	include ('default/php/jsoneditpath.php'); 
}
elseif(isset($_POST['jsontext']))
{
	include ('default/php/jsontext.php'); 
}
elseif(isset($_POST['siteconfig']))
{
	include ('default/php/siteconfig.php'); 
}
elseif(isset($_POST['writesite']))
{
	include ('default/php/editor.php'); 
}
else
{
	include ('default/php/begin.php'); 
}
?>
</body>
</html>