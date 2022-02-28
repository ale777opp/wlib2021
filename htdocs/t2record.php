<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<link rel="shortcut icon" href="//opac64-test.liart.local/test2/favicon.ico" type="image/x-icon"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<?php 
$portname='http';
if(getenv("HTTPS")!="")
	$portname='https';
define('THEPORTNAME', $portname);
define('THEHOSTNAME', 'opac64-test.liart.local');
define('THEHISTORYPATH', 'C:/opac-global/web/test2/htdocs/test2/_test2');
define('THEHTMLPATH', 'test2/test2/_test2');
define('THEIMGPATH', '/test2/test2/img');
define('THEFULLJSPATH', 'C:/opac-global/web/test2/htdocs/test2/js');
define('THEJSPATH', '/test2/test2/js');
define('THEFULLCSSPATH', 'C:/opac-global/web/test2/htdocs/test2/css');
define('THECSSPATH', '/test2/test2/css');
define('THEPAGESPATH', 'test2/html/pages');
define('THEMODULESPATH', 'test2/html/_modules');
define('THEINCLUDESPATH', 'test2/html/_includes');
define('THEFOLDERNAME', 'test2');
define('THEPATHACTRCP', '/t2request');
define('THEPATHFIND', '/t2find');
define('THEPATHREG', '/t2reg');
define('THEPAGESEARCHPATH', 't2record');

define('THEOGTYPE', 'website');
define('THEOGTITLE', 'Электронный абонемент');
define('THEOGDESC', 'Поиск и заказ доступа к ресурсам библиотеки');
define('THEOGKEYWORDS', 'электронный абонемент, электронная библиотека, информационные технологии, базы данных, каталоги библиотек, компьютеризация, автоматизация, OPAC-Global, электронные каталоги, поиск книг');
define('THEOGURL', '//opac64-test.liart.local/test2');
define('THEOGIMAGE', '//opac64-test.liart.local/test2/test2/img/logo_big.jpg');
define('THEOGAUTHOR', 'ООО «ДИТ-М»');
define('FLAG45', 'RGBIG');

function makeJson($str)
{
	$from = array("\\", "[%]", "[amp]", "\'", "\t");
	$to = array("\\\\", "%", "&", "\\\'", "&#09;");
	$newstr = str_replace($from, $to, $str);
	return json_decode($newstr);
}

$flag45=0;
$flgs="";
$qustr="";
if(isset($_COOKIE['numsean']))
{
	$qustr=$_COOKIE['numsean'];
	if(file_exists(THEHISTORYPATH.'/'.$qustr.'/enter.js'))
	{
		$flgs='<script src="/'.THEHTMLPATH.'/'.$qustr.'/enter.js"></script>';
	}
}
if($flgs=="")
{
	$flgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.$qustr);
}

$fpath=THEFOLDERNAME.'/_conf/db.conf';
$frezult = file_get_contents($fpath);
$fjson=json_decode($frezult);

$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
$smrezult = file_get_contents($smpath);
$smjson=json_decode($smrezult);

$qarr=explode('/', $flgs);
$qlen = count($qarr);
$nsean=$qarr[$qlen-3];
$qpath=THEHISTORYPATH.'/'.$nsean.'/db.conf';
$qrezult='';
$qjson='';
if(file_exists($qpath))
{
	$qrezult = file_get_contents($qpath);
	$qjson=json_decode($qrezult); 
}
if(isset($qjson->flag45))
{
	$flag45=1;
}
$ujson='';
$upath=THEHISTORYPATH.'/'.$nsean.'/user.conf';
if(file_exists($upath))
{
	$urezult=file_get_contents($upath);
	$ujson=makeJson('{'.$urezult.'}'); 
}

$seo_uri='//'.THEHOSTNAME.''.$_SERVER['REQUEST_URI'];
$url=parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($url, '/'));
$seglength=count($segments);

$seo_record_section=$segments[0];
$seo_record_id="";
$seo_record_iddb="";
$page="";

if($seglength == 2)
{
	if(isset($smjson->pages->$segments[1]))
	{
		$pagedir=$smjson->pages->$segments[1];
		$page = THEPAGESPATH.'/'.$pagedir->directory.'/'.$segments[1].'.php';
	}
	else
	{
		$seo_record_id=$segments[1];
		$page = THEMODULESPATH.'/search/_additional/seo_records.php';
	}
}
elseif($seglength == 3)
{
	$seo_record_iddb=$segments[1];
	$seo_record_id=$segments[2];
	$page = THEMODULESPATH.'/search/_additional/seo_records.php';
}
else
	$page = THEPAGESPATH.'/index/index.php';

$bodyclass='sheet_'.$segments[0].'/'.$segments[1];
$bodyclass=str_replace("/", "_",$bodyclass);
$bodyclass=str_replace(".", "_",$bodyclass);
$datascript='<script>var _sheet="'.$bodyclass.'";</script>'."
";

$ogurl=$seo_uri;
$ogtype=THEOGTYPE;
$ogtitle=THEOGTITLE;
$ogdesc=THEOGDESC;
$ogkeywords=THEOGKEYWORDS;
$ogimage=THEOGIMAGE;

echo $flgs;
echo $datascript;
include ($page);

?>
</body>
</html>
	
