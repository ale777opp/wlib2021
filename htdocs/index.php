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

/*-- распечатка запроса
foreach ($_POST as $a => $v)
{
	echo '"'.$a.'"="'.$v.'"'."
";
}
//error_reporting(0);
//echo getenv("HTTP_HOST");
 --*/

function makeJson($str)
{
	$from = array("\\", "[%]", "[amp]", "\'", "\t");
	$to = array("\\\\", "%", "&", "\\\'", "&#09;");
	$newstr = str_replace($from, $to, $str);
	return json_decode($newstr);
}

$flag45=0;
$skin="blue";
$iddb="";
$lind="";
$codemenu="";
$ltitle="";
$laddress="";
$sigla="";
$site="";
$elcat="";
$particle="";
$datascript='';
$bodyclass='';
$ogtype=THEOGTYPE;
$ogtitle=THEOGTITLE;
$ogdesc=THEOGDESC;
$ogkeywords=THEOGKEYWORDS;
$ogurl=THEOGURL;
$ogimage=THEOGIMAGE;

if((isset($_POST["p"]))||(isset($_POST["m"])))
{
	if(isset($_POST["p"]))
	{
		$bodyclass='sheet_'.$_POST["p"];
	}
	if(isset($_POST["m"]))
	{
		$bodyclass='sheet_'.$_POST["m"];
	}
	$bodyclass=str_replace("/", "_",$bodyclass);
	$bodyclass=str_replace(".", "_",$bodyclass);
	$datascript.='var _sheet="'.$bodyclass.'";'."
";
}

if(isset($_POST['_searchtitle']))
{
	$ogtitle.=$_POST['_searchtitle'];
	$ogdesc.=$_POST['_searchtitle'];
}
else
{
	$ogtitle=THEOGTITLE;
	$ogdesc=THEOGDESC;
}

if(isset($_POST['_searchurl']))
{
	$ogurl.=$_POST['_searchurl'];
}
else
{
	$ogurl=THEOGURL;
}

if(isset($_POST['_searchimg']))
{
	$ogimage.=$_POST['_searchimg'];
}
else
{
	$ogimage=THEOGIMAGE;
}

if(isset($_POST['_bodyclass']))
{
	if($bodyclass != "")
		$bodyclass.=' '.$_POST['_bodyclass'];
	else
		$bodyclass.=$_POST['_bodyclass'];
}

if(isset($_POST['_flag45']))
{
	$flag45=1;
	$datascript.='var _flag45="yes";'."
";
}
if(isset($_POST['_iddb']))
{
	$datascript.='var _iddb="'.$_POST['_iddb'].'";'."
";
}
if(isset($_POST['_str']))
{
	$datascript.='var _str="'.$_POST['_str'].'";'."
";
}
if(isset($_POST['_showstr']))
{
	$datascript.='var _showstr="'.$_POST['_showstr'].'";'."
";
}
if(isset($_POST['_showsearchrez']))
{
	$datascript.='var _showsearchrez="'.$_POST['_showsearchrez'].'";'."
";
}
if(isset($_POST['_localiddb']))
{
	$iddb=$_POST['_localiddb'];
	$particle="lib_";
	$datascript.='var _localiddb="'.$_POST['_localiddb'].'";'."
";
}
if(isset($_POST['_skin']))
{
	if($_POST['_skin']!="")
		$skin=$_POST['_skin'];
	$datascript.='var _skin="'.$skin.'";'."
";
}
if(isset($_POST['_ltitle']))
{
	$ltitle=$_POST['_ltitle'];
	$datascript.='var _ltitle="'.$ltitle.'";'."
";
}
if(isset($_POST['_lind']))
{
	$lind=$_POST['_lind'];
	$datascript.='var _lind="'.$lind.'";'."
";
}
if(isset($_POST['_codemenu']))
{
	$codemenu=$_POST['_codemenu'];
	$datascript.='var _codemenu="'.$codemenu.'";'."
";
}
if(isset($_POST['_laddress']))
{
	$laddress=$_POST['_laddress'];
	$datascript.='var _laddress="'.$laddress.'";'."
";
}
if(isset($_POST['_sigla']))
{
	$sigla=$_POST['_sigla'];
	$datascript.='var _sigla="'.$sigla.'";'."
";
}
if(isset($_POST['_site']))
{
	$site=$_POST['_site'];
	$datascript.='var _site="'.$site.'";'."
";
}
if(isset($_POST['_elcat']))
{
	$elcat=$_POST['_elcat'];
	$datascript.='var _elcat="'.$elcat.'";'."
";
}
if(isset($_POST['_addfilters']))
{
	$datascript.='var _addfilters="'.$_POST['_addfilters'].'";'."
";
}
if(isset($_POST['_linkstring']))
{
	$datascript.='var _linkstring="'.$_POST['_linkstring'].'";'."
";
}
if(isset($_POST['_typereg']))
{
	$datascript.='var _typereg="'.$_POST['_typereg'].'";'."
";
}
if(isset($_POST['_cataloguer']))
{
	$particle="cataloguer_";
	$datascript.='var _cataloguer="'.$_POST['_cataloguer'].'";'."
";
}
if(isset($_POST['_typework']))
{
	$datascript.='var _typework="'.$_POST['_typework'].'";'."
";
}
if(isset($_POST['_basequant']))
{
	$datascript.='var _basequant="'.$_POST['_basequant'].'";'."
";
}
if(isset($_POST['_rubricator']))
{
	$datascript.='var _rubricator="'.$_POST['_rubricator'].'";'."
";
}
if($datascript!="")
{
	$datascript="
".'<script>'."
".$datascript.'</script>'."
";
}
$qstr=getenv("QUERY_STRING");
if(!isset($_POST['p']))
{
	if(!isset($_POST['m']))
	{
		if(!isset($_GET['_overcharge']))
		{
			$page = THEPAGESPATH.'/index/index.php';
		}
		else
		{
			$page = THEPAGESPATH.'/privat/_overcharge.php';
			$datascript.='<script>var overcharge="'.$_GET['_overcharge'].'";</script>'."
";
			$qstr='';
		}
	}
	else
	{
		$page = THEMODULESPATH.'/'.$_POST['m'];
		if(strpos($_POST['m'], 'cataloguer')!==false)
		{
			$particle="cataloguer_";
		}
	}
}
else
{
	$page = THEPAGESPATH.'/'.$_POST['p'].'.php';
}
$fgs="";
if(isset($_POST['_numsean']))
{
	$qstr=$_POST['_numsean'];
	if(file_exists(THEHISTORYPATH.'/'.$qstr.'/enter.js'))
	{
		$fgs='<script src="/'.THEHTMLPATH.'/'.$qstr.'/enter.js"></script>';
	}
}
if(isset($_POST['_logintype']))
{
	$qstr.='&_logintype='.$_POST['_logintype'];
}
if(isset($_POST['_login']))
{
	$qstr.='&_login='.$_POST['_login'];
}
if(isset($_POST['_password']))
{
	$qstr.='&_password='.$_POST['_password'];
}
if(isset($_POST['_auth']))
{
	$qstr.='&_auth='.$_POST['_auth'];
}
if(isset($_POST['_userinfo']))
{
	$qstr.='&_userinfo='.$_POST['_userinfo'];
}
if(isset($_POST['_code']))
{
	$qstr.='&_code='.$_POST['_code'];
}
if(isset($_POST['_fields']))
{
	$qstr.='&_fields='.$_POST['_fields'];
}
if(isset($_POST['_oldsean']))
{
	$qstr.='&_oldsean='.$_POST['_oldsean'];	
}

if($fgs=="")
{
	$fgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.$qstr);
}

$fpath=THEFOLDERNAME.'/_conf/db.conf';
$frezult = file_get_contents($fpath);
$fjson=json_decode($frezult);

$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
$smrezult = file_get_contents($smpath);
$smjson=json_decode($smrezult);

$qarr=explode('/', $fgs);
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
if(isset($_POST['_auth']))
{
	$upath=THEHISTORYPATH.'/'.$nsean.'/user.conf';
	if(file_exists($upath))
	{
		$urezult=file_get_contents($upath);
		$ujson=makeJson('{'.$urezult.'}'); 
	}
}
echo $fgs;
echo $datascript;
include ($page);


?>
</body>
</html>
	
