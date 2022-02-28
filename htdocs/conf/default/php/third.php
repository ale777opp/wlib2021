<?php 
	$str = $_POST['jsonpath'];

	writeFile($path,$str);
	writeFile($path0,$str);

	$rezult = file_get_contents($path);
	$json=json_decode($rezult);
	$BROKERID=$json->BROKERID;
	$foldername=$json->foldername;
	$foldercgibin=$json->foldercgibin;
	$dirhtdocs=$json->dirhtdocs;
	$pathcgi=$json->pathcgi;
	$dircgibin=$json->dircgibin;
	$userLogin=$json->userlogin;
	$userPassword=$json->userpassword;
	$guestLogin=$json->guestlogin;
	$guestPassword=$json->guestpassword;
	$pathActRcp=$json->pathactrcp;
	$pathfind=$json->pathfind;
	$pathreg=$json->pathreg;
	$pagesearchpath=$json->pagesearchpath;
	$pathrubricator=$json->pathrubricator;
	
	$pathcss=$json->pathcss;
	$pathjs=$json->pathjs;
	$thefulljspath=$json->thefulljspath;
	
	$thepagespath=$json->thepagespath;
	$themodulespath=$json->themodulespath;
	$theincludespath=$json->theincludespath;
	
	$opacdocumentroot=$json->opacdocumentroot;
	$commoninipath=$json->commoninipath;
	$rcppathfile=$json->rcppathfile;
	$rcppathbegin=$json->rcppathbegin;
	$rcpunloaddir=$json->rcpunloaddir;
	$rcphtmldir=$json->rcphtmldir;
	$rcporderdir=$json->rcporderdir;
	$rcporderhtml=$json->rcporderhtml;
	
	$rcptitle=$json->rcptitle;
	$rcpsmalltitle=$json->rcpsmalltitle;
	$rcpmetacontenttype=$json->rcpmetacontenttype;
	$rcpmetacontentscripttype=$json->rcpmetacontentscripttype;
	$rcpmetakeywords=$json->rcpmetakeywords;
	$rcpauthor=$json->rcpauthor;
	
	$rcppostaddress=$json->rcppostaddress;
	$rcpphonenumber=$json->rcpphonenumber;
	$rcpmailto=$json->rcpmailto;
	$rcpcopyright=$json->rcpcopyright;
	$rcpdescription=$json->rcpdescription;
	
	$rcpdns=$json->rcpdns;
	$rcpaddress=$json->rcpaddress;
	$mailhostname=$json->mailhostname;
	$maillogin=$json->maillogin;
	$mailpassword=$json->mailpassword;
	$mailportname=25;
	if(isset($json->mailportname))
		$mailportname=$json->mailportname;
	$libalias='Отдел МБА';
	if(isset($json->libalias))
		$libalias=$json->libalias;
	$useralias='Читатель';
	if(isset($json->useralias))
		$useralias=$json->useralias;
	$serveraddr=$json->serveraddr;
	$servername=$json->servername;
	$hostname=getenv ("HTTP_HOST");
	$rcphandlerpath=$json->rcphandlerpath;
	$biblioserver=$json->biblioserver;
	$biblioapi=$json->biblioapi;
	$repoauthorpage=$json->repoauthorpage;
	$repobiblpage=$json->repobiblpage;
	$script='';
	$script.= <<<HTML
	<script>
	var BROKERID="$BROKERID";
	var foldername="$foldername";
	var userLogin="$userLogin";
	var userPassword="$userPassword";
	var guestLogin="$guestLogin";
	var guestPassword="$guestPassword";
	var pathActRcp="$pathActRcp";
	var pathrubricator="$pathrubricator";
	var opacdocumentroot="$opacdocumentroot";
	var commoninipath="$commoninipath";
	var rcppathfile="$rcppathfile";
	var rcppathbegin="$rcppathbegin";
	var rcpunloaddir="$rcpunloaddir";
	var rcphtmldir="$rcphtmldir";
	var rcporderdir="$rcporderdir";
	var rcporderhtml="$rcporderhtml";
	var rcpdns="$rcpdns";
	var rcpaddress="$rcpaddress";
	var maillogin="$maillogin";
	var mailpassword="$mailpassword";
	var serveraddr="$serveraddr";
	var servername="$servername";
	var rcphandlerpath="$rcphandlerpath";
	var biblioserver="$biblioserver";
	var biblioapi="$biblioapi";
	</script>

	
HTML;

	
	$str1='';
	$str1.= <<<HTML
[env]
# Сюда можно добавить переменные окружения, которые будут установлены для всех CGI-приложений

[common]
OpacDocumentRoot = $opacdocumentroot

[log]
path= $commoninipath
enable = false


HTML;


	createDirectory($foldercgibin.'/'.$foldername);

	$cgidir=$foldercgibin.'/'.$foldername;
	$ccgidir='custom/data';
	/*if(OsIs('Linux'))
	{
		$ccgidir.='/unix';
	}
	else
	{
		$ccgidir.='/win';
	}*/
	copyFiles($cgidir,$ccgidir);
	copyRcp($cgidir,$dirOpacCgi);
	createDirectory($cgidir.'/'.$foldername);

	$htmlcgidir=$cgidir.'/'.$foldername.'/html';
	createDirectory($htmlcgidir);
	$chtmlcgidir='custom/tplcgi';

	copyFiles($htmlcgidir,$chtmlcgidir);
	
	$path1=$foldercgibin.'/'.$foldername.'/common.ini';
	writeFile($path1,$str1);
	
	$bibliosettings='';
	if(($biblioserver!='')&&($biblioapi!=''))
	{
		$bibliosettings.='[BOOKSEARCH]'."\n";
		$bibliosettings.='host='.$biblioserver."\n";
		$bibliosettings.='port=http'."\n";
		$bibliosettings.='handlerpath='.$biblioapi."\n";
	}
	$reposettings='';
	if(($repoauthorpage!='')&&($repobiblpage!=''))
	{
		$reposettings.='Alias /'.$repoauthorpage." $dirhtdocs$repoauthorpage.php\n";
		$reposettings.='Alias /'.$repobiblpage." $dirhtdocs$repobiblpage.php\n";
	}

	$str2='';
	$str2.= <<<HTML
[BROKER_PARAMETERS]
#время ожидания для Broker. Формат: ЧС (Ч: число, С:["S"-секунды,"M"-минуты,"H"-часы])
wait_time=6M
receive_buffer_size=2000000
[LOG]
enable=true
[EXPORT]
.xls=application/vnd.ms-excel;
.rtf=application/rtf;
.txt_=text/plain
.xml_=text/xml
[CGI]
pathfile=$rcppathfile
pathbegin=error4
[SEARCH]
search_levels=Full,Retro,Unfinished,Unknown,Identify
findview_open=<span class='red'>
findview_close=</span>
[LIVETIME]
live_time=36000
[UNLOAD]
unloaddir=$rcpunloaddir/
htmldir=/$rcphtmldir/
orderdir=$rcporderdir
orderhtml=$rcporderhtml
[LOGON]
login=$guestLogin
password=$guestPassword
[MBA]
dns=$rcpdns
hostname=$mailhostname
port=$mailportname
address=$rcpaddress
login=$maillogin
password=$mailpassword
libalias=$libalias
useralias=$useralias
[PHP]
host=$serveraddr
port=http
handlerpath=$rcphandlerpath
$bibliosettings


HTML;


	$path2=$foldercgibin.'/'.$foldername.'/rcp.ini';
	writeFile($path2,$str2);

	$pathexe=$dircgibin.'rcp.exe';
	$strapache= <<<HTML
#SetEnv BROKER_ID $BROKERID
Alias /$foldername "$dirhtdocs"
Alias $pathcgi "$dircgibin"
Alias $pathActRcp "$pathexe"
Alias $pathreg "$dirhtdocs$foldername/html/_modules/privat/_additional/reg.php"
Alias $pathfind "$dirhtdocs$foldername/html/_modules/search/_additional/find.php"
Alias /$pagesearchpath "$dirhtdocs$pagesearchpath.php"
$reposettings

<Directory "$opacdocumentroot">
	AllowOverride All

	<IfVersion < 2.4>
		Options -Indexes FollowSymLinks ExecCGI
		Order allow,deny
		Allow from all
	</IfVersion>

	<IfVersion >= 2.4>
		Options -Indexes +FollowSymLinks +ExecCGI
		Require all granted
	</IfVersion>

	<IfModule dir_module>
		DirectoryIndex index.php
	</IfModule>
</Directory>

<Directory "$foldercgibin">
	AllowOverride None

	<IfVersion < 2.4>
		Options FollowSymLinks +ExecCGI
		Order allow,deny
		Allow from all
	</IfVersion>

	<IfVersion >= 2.4>
		Options +FollowSymLinks +ExecCGI
		Require all granted
	</IfVersion>

	SetHandler cgi-script
</Directory>
	

HTML;

	
	writeFile($pathapache,$strapache);

	createDirectory($dirhtdocs.'/'.$foldername);
	
	createDirectory($dirhtdocs.'/'.$foldername.'/_'.$foldername);
	
	createDirectory($dirhtdocs.'/'.$foldername.'/html');

	createDirectory($dirhtdocs.'/'.$foldername.'/documents');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/html/pages');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/html/tpl');

	createDirectory($dirhtdocs.'/'.$foldername.'/html/pages/includes');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/css');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/js');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/img');
	
	createDirectory($dirhtdocs.'/'.$foldername.'/_conf');

	$conffile1=$dirhtdocs.'/'.$foldername.'/_conf/path.conf';
	copyFile($path,$conffile1);

	$hstr2=
	<<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$rcpmetacontenttype" />
<title>$rcptitle</title>
<meta http-equiv="Content-Script-Type" content="$rcpmetacontentscripttype"/>
<meta name="keywords" content="$rcpmetakeywords" />
<meta name="author" content="$rcpauthor" />
<meta name="Description" content="$rcpdescription" />
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<link href="$json->pathcss/default/controls.css" type="text/css" rel="stylesheet"/>
<link href="$json->pathcss/default/layerwindow.css" type="text/css" rel="stylesheet"/>
<script src="$json->pathjs/default/custom.js"></script>
<script src="$json->pathjs/default/root.js"></script>
<script src="$json->pathjs/default/interface.js"></script>


HTML;


	$hstr3=
	<<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$rcpmetacontenttype" />
<title>$rcptitle</title>
<meta http-equiv="Content-Script-Type" content="$rcpmetacontentscripttype"/>
<meta name="keywords" content="$rcpmetakeywords" />
<meta name="author" content="$rcpauthor" />
<meta name="Description" content="$rcpdescription" />
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<link href="$json->pathcss/default/controls.css" type="text/css" rel="stylesheet"/>
<link href="$json->pathcss/default/layerwindow.css" type="text/css" rel="stylesheet"/>
<script src="$json->pathjs/default/custom.js"></script>
<script src="$json->pathjs/default/root.js"></script>
<script src="$json->pathjs/default/interface.js"></script>
<script>
var error = {
	

HTML;


	$hstr4=
	<<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$rcpmetacontenttype" />
<title>$rcptitle</title>
<meta http-equiv="Content-Script-Type" content="$rcpmetacontentscripttype"/>
<meta name="keywords" content="$rcpmetakeywords" />
<meta name="author" content="$rcpauthor" />
<meta name="Description" content="$rcpdescription" />
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<link href="$json->pathcss/default/controls.css" type="text/css" rel="stylesheet"/>
<link href="$json->pathcss/default/layerwindow.css" type="text/css" rel="stylesheet"/>
<script src="$json->pathjs/default/custom.js"></script>
<script src="$json->pathjs/default/root.js"></script>
<script src="$json->pathjs/default/interface.js"></script>
<script>
function printOk()
{
	var response=[];
	
	
HTML;


	$hstr7=
	<<<HTML

};/*ютф*/
</script>
</head>
<body onload="top.location='//$hostname/$foldername'">
<div id="main">
<div id="header">
</div>
</div>
<div id="footer">
</div>
</body>
</html>
	
	
HTML;


	$hcfile=$cgidir.'/'.$foldername.'/html/php1.html';
	writeFile($hcfile,$hstr2);
	
	$hcfile3=$cgidir.'/'.$foldername.'/html/error11.html';
	writeFile($hcfile3,$hstr3);
	
	$hcfile5=$cgidir.'/'.$foldername.'/html/error31.html';
	writeFile($hcfile5,$hstr3);
	
	$hcfile6=$cgidir.'/'.$foldername.'/html/error41.html';
	writeFile($hcfile6,$hstr3);

	$hcfile7=$cgidir.'/'.$foldername.'/html/error42.html';
	writeFile($hcfile7,$hstr7);
	
	$hcfile4=$cgidir.'/'.$foldername.'/html/url1.html';
	writeFile($hcfile4,$hstr4);
	
	$hcfile41=$cgidir.'/'.$foldername.'/html/url11.html';
	writeFile($hcfile41,$hstr4);
	
	echo '</head><body><h1>Настройка проекта</h1><form method="POST" id="frm"><div id="basesets"><p style="text-align:center">Базовые определения успешно сохранены.</p><p style="text-align:center">Перестартуйте web-сервер, затем нажмите на кнопку ПРОДОЛЖИТЬ.</p><br/><p style="text-align:center"><input onclick="editPathSettings(\''.$path.'\')" type="button" class="button" value="Изменить"/> <input type="submit" class="button" value="Продолжить"/></p><br/></div>';
?>