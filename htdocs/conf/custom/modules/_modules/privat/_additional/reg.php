<?php
$portname='http';
if(getenv("HTTPS")!="")
	$portname='https';
$serverHost = getenv ("HTTP_HOST");
$pathactrcp='/request';
$pathreg='/reg';
$folderName="wlib";
function OsIs($OS)
{
	$tmp = php_uname();
	$tmp = strpos($tmp, $OS);
	if($tmp || $tmp === 0)
		return true;
	return false;
}
$osSlash='';
if(OsIs('Linux'))
	$osSlash='/';
else
	$osSlash='\\';
$dirname=dirname(__FILE__);
$array = explode($osSlash,$dirname);
$len = count($array);
$folderName=$array[$len-5];

$ppath=$portname.'://'.$serverHost.'/'.$folderName.'/'.$folderName.'/_conf/path.conf';
$prezult = file_get_contents($ppath);
$pjson=json_decode($prezult);
if(isset($pjson->pathactrcp))
	$pathactrcp=$pjson->pathactrcp;
if(isset($pjson->pathreg))
	$pathreg=$pjson->pathreg;

/*$respvars="Переданные данные: ";
foreach($_POST as $k => $v)
{
	$respvars.=$k . '=' . $v . '; ';
}
foreach($_GET as $k => $v)
{
	$respvars.=$k . '=' . $v . '; ';
}
$respvars=addslashes($respvars);
//echo $respvars;*/

$data="";

if((isset($_POST['login']))||(isset($_GET['login']))||(isset($_POST['email']))||(isset($_GET['email'])))
{
	$ID="";
	$IMP="";
	$RP="";
	$AU="";
	$TI="";
	$AH="";
	$TM="";
	$TITL="";
	$FGOS="";
	$str="";
	$showstr="";
	$numDB="17";
	$login="";
	$password="";
	$fio="";
	$updepname="";
	$depname="";
	$dolzn="";
	$email="";
	$group="";
	$LFR="";
	$AX="19900101";
	$WW="";
	$termarr=array();
	$showarr=array();

	if(isset($_POST['login']))
	{
		if($_POST['login']!="")
			$login=addslashes($_POST['login']);
	}

	if(isset($_POST['password']))
	{
		if($_POST['password']!="")
			$password=addslashes($_POST['password']);
	}

	if(isset($_POST['fio']))
	{
		if($_POST['fio']!="")
			$fio=addslashes($_POST['fio']);
	}

	if(isset($_POST['updepname']))
	{
		if($_POST['updepname']!="")
			$updepname=addslashes($_POST['updepname']);
	}

	if(isset($_POST['depname']))
	{
		if($_POST['depname']!="")
			$depname=addslashes($_POST['depname']);
	}

	if(isset($_POST['dolzn']))
	{
		if($_POST['dolzn']!="")
			$dolzn=addslashes($_POST['dolzn']);
	}

	if(isset($_POST['email']))
	{
		if($_POST['email']!="")
			$email=addslashes($_POST['email']);
	}

	if(isset($_POST['group']))
	{
		if($_POST['group']!="")
			$group=addslashes($_POST['group']);
	}
	if(isset($_POST['WW']))
	{
		if($_POST['WW']!="")
			$WW=addslashes($_POST['WW']);
	}
	if(isset($_POST['AX']))
	{
		if($_POST['AX']!="")
			$AX=addslashes($_POST['AX']);
	}

	if(isset($_POST['iddb']))
	{
		if($_POST['iddb']!="")
			$numDB=addslashes($_POST['iddb']);
	}
	if(isset($_POST['ID']))
	{
		if($_POST['ID']!="")
			$ID=$_POST['ID'];
	}
	if(isset($_POST['IMP']))
	{
		if($_POST['IMP']!="")
			$IMP=$_POST['IMP'];
	}
	if(isset($_POST['RP']))
	{
		if($_POST['RP']!="")
			$RP=$_POST['RP'];
	}
	if(isset($_POST['AU']))
	{
		if($_POST['AU']!="")
			$AU=$_POST['AU'];
	}
	if(isset($_POST['TI']))
	{
		if($_POST['TI']!="")
			$TI=$_POST['TI'];
	}
	if(isset($_POST['AH']))
	{
		if($_POST['AH']!="")
			$AH=$_POST['AH'];
	}
	if(isset($_POST['TM']))
	{
		if($_POST['TM']!="")
			$TM=$_POST['TM'];
	}
	if(isset($_POST['TITL']))
	{
		if($_POST['TITL']!="")
			$TITL=$_POST['TITL'];
	}
	if(isset($_POST['FGOS']))
	{
		if($_POST['FGOS']!="")
			$FGOS=$_POST['FGOS'];
	}
	if(isset($_POST['LFR']))
	{
		if($_POST['LFR']!="")
			$LFR=addslashes($_POST['LFR']);
	}
	
	if(isset($_GET['login']))
	{
		if($_GET['login']!="")
			$login=addslashes($_GET['login']);
	}

	if(isset($_GET['password']))
	{
		if($_GET['password']!="")
			$password=addslashes($_GET['password']);
	}

	if(isset($_GET['fio']))
	{
		if($_GET['fio']!="")
			$fio=addslashes($_GET['fio']);
	}

	if(isset($_GET['updepname']))
	{
		if($_GET['updepname']!="")
			$updepname=addslashes($_GET['updepname']);
	}

	if(isset($_GET['depname']))
	{
		if($_GET['depname']!="")
			$depname=addslashes($_GET['depname']);
	}

	if(isset($_GET['dolzn']))
	{
		if($_GET['dolzn']!="")
			$dolzn=addslashes($_GET['dolzn']);
	}

	if(isset($_GET['email']))
	{
		if($_GET['email']!="")
			$email=addslashes($_GET['email']);
	}

	if(isset($_GET['group']))
	{
		if($_GET['group']!="")
			$group=addslashes($_GET['group']);
	}
	if(isset($_GET['WW']))
	{
		if($_GET['WW']!="")
			$WW=addslashes($_GET['WW']);
	}
	if(isset($_GET['AX']))
	{
		if($_GET['AX']!="")
			$AX=addslashes($_GET['AX']);
	}

	if(isset($_GET['iddb']))
	{
		if($_GET['iddb']!="")
			$numDB=addslashes($_GET['iddb']);
	}
	if(isset($_GET['ID']))
	{
		if($_GET['ID']!="")
			$ID=$_GET['ID'];
	}
	if(isset($_GET['IMP']))
	{
		if($_GET['IMP']!="")
			$IMP=$_GET['IMP'];
	}
	if(isset($_GET['RP']))
	{
		if($_GET['RP']!="")
			$RP=$_GET['RP'];
	}
	if(isset($_GET['AU']))
	{
		if($_GET['AU']!="")
			$AU=$_GET['AU'];
	}
	if(isset($_GET['TI']))
	{
		if($_GET['TI']!="")
			$TI=$_GET['TI'];
	}
	if(isset($_GET['AH']))
	{
		if($_GET['AH']!="")
			$AH=$_GET['AH'];
	}
	if(isset($_GET['TM']))
	{
		if($_GET['TM']!="")
			$TM=$_GET['TM'];
	}
	if(isset($_GET['TITL']))
	{
		if($_GET['TITL']!="")
			$TITL=$_GET['TITL'];
	}
	if(isset($_GET['FGOS']))
	{
		if($_GET['FGOS']!="")
			$FGOS=$_GET['FGOS'];
	}
	if(isset($_GET['LFR']))
	{
		if($_GET['LFR']!="")
			$LFR=addslashes($_GET['LFR']);
	}
	
	if($RP!="")
	{
		$RP=str_replace("'","\\\'",$RP);
		$RP=str_replace('"','\"',$RP);
		$RP=htmlentities($RP, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(RP ".$RP.")";
		$showarr[]=' <i>Автор</i> '.$RP;
	}
	if($AU!="")
	{
		$AU=str_replace("'","\\\'",$AU);
		$AU=str_replace('"','\"',$AU);
		$AU=htmlentities($AU, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(AU ".$AU.")";
		$showarr[]=' <i>Автор</i> '.$AU;
	}
	if($TI!="")
	{
		$TI=str_replace("'","\\\'",$TI);
		$TI=str_replace('"','\"',$TI);
		$TI=htmlentities($TI, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(TI ".$TI.")";
		$showarr[]=' <i>Автор</i> '.$TI;
	}
	if($AH!="")
	{
		$AH=str_replace("'","\\\'",$AH);
		$AH=str_replace('"','\"',$AH);
		$AH=htmlentities($AH, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(AH ".$AH.")";
		$showarr[]=' <i>Везде по ключевым словам</i> '.$AH;
	}
	if($TM!="")
	{
		$TM=str_replace("'","\\\'",$TM);
		$TM=str_replace('"','\"',$TM);
		$TM=htmlentities($TM, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(TM ".$TM.")";
		$showarr[]=' <i>Тема</i> '.$TM;
	}
	if($TITL!="")
	{
		$TITL=str_replace("'","\\\'",$TITL);
		$TITL=str_replace('"','\"',$TITL);
		$TITL=htmlentities($TITL, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(TITL ".$TITL.")";
		$showarr[]=' <i>Заглавие</i> '.$TITL;
	}
	if($FGOS!="")
	{
		$FGOS=str_replace("'","\\\'",$FGOS);
		$FGOS=str_replace('"','\"',$FGOS);
		$FGOS=htmlentities($FGOS, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(FGOS ".$FGOS.")";
		$showarr[]=' <i>Специальность/Дисциплина</i> '.$FGOS;
	}
	if($ID!="")
	{
		$ID=str_replace("'","\\\'",$ID);
		$ID=str_replace('"','\"',$ID);
		$ID=htmlentities($ID, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$idpos=strpos($ID, 'EMLL-');
		if($idpos !== false)
		{
			$ID=substr($ID, $idpos+5);
		}
		$termarr[] = "(ID ".$ID.")";
		$showarr[]=' <i>Идентификатор</i> '.$ID;
	}
	if($IMP!="")
	{
		$IMP=str_replace("'","\\\'",$IMP);
		$IMP=str_replace('"','\"',$IMP);
		$IMP=htmlentities($IMP, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(IMP ".$IMP.")";
		$showarr[]=' <i>Идентификатор другой системы</i> '.$IMP;
	}
	if($LFR!="")
	{
		$LFR=str_replace("'","\\\'",$LFR);
		$LFR=str_replace('"','\"',$LFR);
		$LFR=htmlentities($LFR, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$termarr[] = "(LFR '".$LFR."')";
		$showarr[]=' <i>Форма ресурса</i> '.$LFR;
	}
	if(is_array($termarr))
	{
		$cn=count($termarr);
		if($cn > 0)
		{
			if($cn > 1)
			{
				$str=implode(' AND ',$termarr);
			}
			else
			{
				$str=$termarr[0];
			}
		}
	}
	if(is_array($showarr))
	{
		$cn1=count($showarr);
		if($cn1 > 0)
		{
			if($cn1 > 1)
			{
				$showstr=implode(' И ',$showarr);
			}
			else
			{
				$showstr=$showarr[0];
			}
		}
	}
	
	$fgs=file_get_contents($portname.'://'.$serverHost.''.$pathactrcp.'?_action=penter&_html=enter&_errorhtml=error4');
	
	$data=<<<HERE
	<!DOCTYPE html>
	<html>
	<head>
	<title>Электронный каталог</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Script-Type" content="text/javascript"/>
	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
	<meta http-equiv="x-rim-auto-match" content="none" />
	<meta name="format-detection" content="telephone=no" />
	$fgs
	<script src="/$folderName/$folderName/js/default/custom.js"></script>
	<script src="/$folderName/$folderName/js/default/calendar.js"></script>
	<script src="/$folderName/$folderName/js/default/searchbibl.js"></script>
	<script src="/$folderName/$folderName/js/default/pages.js"></script>
	<script src="/$folderName/$folderName/js/default/modules.js"></script>
	<script src="/$folderName/$folderName/js/default/root.js"></script>
	<script src="/$folderName/$folderName/js/default/interface.js"></script>
	<script src="/$folderName/$folderName/js/default/search_news.js"></script>
	<link href="/$folderName/$folderName/css/default/controls.css" type="text/css" rel="stylesheet"/>
	<link href="/$folderName/$folderName/css/default/layerwindow.css" type="text/css" />
	<script>
	var fio="$fio";
	var updepname="$updepname";
	var depname="$depname";
	var dolzn="$dolzn";
	var email="$email";
	var group="$group";
	var WW="$WW";
	var AX="$AX";
	var str="$str";
	var showstr="$showstr";
	var _iddb="$numDB";
	var login="$login";
	var password="$password";
	if((email !="")&&(WW !="")&&(fio != ""))
	{
		login=email;
		password=login.substring(0,login.indexOf('@'));
		password=password.toUpperCase();
	}
	function doCheckReader1()
	{
		if((login=="")||(password==""))
		{
			var error={_message_0: ["Невозможно произвести авторизацию. $respvars"],_action_1: ["Недостаточно данных для входа в систему"]};
			WriteError(error);
			return;
		}
		else
		{
			typework="";
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
			querylist.push(["_version","1.1.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["login",login.toUpperCase()]);
			querylist.push(["\$password",password]);
			if(fio!="")
				querylist.push(["\$fio",fio]);
			if(updepname!="")
				querylist.push(["\$updepname",updepname]);	
			if(depname!="")
				querylist.push(["\$depname",depname]);	
			if(dolzn!="")
				querylist.push(["\$dolzn",dolzn]);	
			if(group!="")
				querylist.push(["\$group",group]);	
			if(str!="")
				querylist.push(["\$str",str]);	
			gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,openAuthWin1);
		}
	}
	function openAuthWin1(x)
	{
		/*var w=window.open();
		w.document.open();
		w.document.write(x.responseText);
		w.document.close();*/
		eval(x.responseText);
		/*if(typeof error!="undefined")
		{
			delLayerWin();
			WriteError(error);
		}
		else
		{*/
			
			if((typeof response!="undefined")&&(typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT")&&(response[0]._whatThis!="PLACE")&&(typeof response[0]._reader_0._visitor_0!="undefined"))
			{
				take('messbody').n.innerHTML='Авторизация ...';
				doLogIn();
				
			}
			else
			{
				if(((WW!="")||(group!=""))&&(fio!="")&&(login!=""))
				{
					take('messbody').n.innerHTML='Регистрация ...';
					doReg();
				}
				else
				{
					var error={_message_0: ["Регистрация пользователя невозможна. $respvars"],_action_1: ["Неуказаны обязательные параметры"]};
					WriteError(error);
					return;
				}
			}
		/*}*/
	}
	function doLogIn()
	{
		var gArr=new Array();
		gArr.push(["_logintype","LOGIN"]);
		gArr.push(["_login",login.toUpperCase()]);
		gArr.push(["_password",password]);
		gArr.push(["_auth",(new Date()).getTime()]);
		gArr.push(["_userinfo","yes"]);
		if(str!="")
		{
			gArr.push(["_str",str]);
			gArr.push(["_showstr",showstr]);
			gArr.push(["_iddb",_iddb]);
		}
		callToRCP(gArr,"_self","$portname://$serverHost$pathreg");
	}
	function doReg()
	{
		var curDate=new Date();
		var Year=curDate.getFullYear();
		var maxYear=Year+5;
		var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
		var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","registrold"]);
		gArr.push(["_errorhtml","error"]);
		gArr.push(["_serviceclass","CATALOGING"]);
		gArr.push(["_service","PARAM"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_login",identif]);
		gArr.push(["arg2","ONLINE"]);
		gArr.push(["arg4","USER"]);
		gArr.push(["arg5","NEW"]);
		gArr.push(["arg6","0"]);
		gArr.push(["AA:",password]);
		if(group!="")
			gArr.push(["AB:",group]);
		gArr.push(["AO:",fio.toUpperCase()]);
		var org="";
		if((updepname!="")&&(depname!=""))
		{
			org=updepname+', '+depname;
		}
		else
		{
			if(depname!="")
				org=depname;
		}
		if(org!="")
			gArr.push(["AC:",org]);
		if(dolzn!="")
			gArr.push(["CH:",dolzn]);
		gArr.push(["FU:",login]);
		gArr.push(["FG:",Year+''+mm+''+dd]);
		gArr.push(["FB:",maxYear+''+mm+''+dd]);
		if(WW!="")
			gArr.push(["WW:",WW]);
		if(email!="")
			gArr.push(["AI:",email]);
		else
			gArr.push(["AI:",login]);
		gArr.push(["AX:",AX]);
		gArr.push(["AY:",login.toUpperCase()]);
		gArr.push(["AE:","RU"]);
		gArr.push(["FL:","ONLINE"]);
		gArr.push(["AW:","READER"]);
		ajaxToRCP(gArr,openRegistrWin);
	}
	function openRegistrWin(x)
	{
		/*var w=window.open();
		w.document.open();
		w.document.write(x.responseText);
		w.document.close();*/
		eval(x.responseText);
		if(typeof error!="undefined")
		{
			delLayerWin();
			WriteError(error);
		}
		else
		{
			var isn="";
			var tmp=/^0\s*/;
			if(tmp.test(answere))
			{
				isn=answere.substring(answere.lastIndexOf(' ')+1);
				var gArr=new Array();
				var querylist=new Array();
				gArr.push(["_action","registrold"]);
				gArr.push(["_errorhtml","error"]);
				gArr.push(["_serviceclass","CATALOGING"]);
				gArr.push(["_service","PARAM"]);
				gArr.push(["_numsean",numsean]);
				gArr.push(["_login",identif]);
				gArr.push(["arg2",""]);
				gArr.push(["arg4","USER"]);
				gArr.push(["arg5","REA"]);
				gArr.push(["arg6",isn]);
				gArr.push(["arg8","FDT_SPACE"]);
				ajaxToRCP(gArr,openRegistrWinOk1);
			}
			else
			{
				var error={};
				error._message_0=answere+" $respvars";
				error._action_1="Не удалось произвести регистрацию";
				delLayerWin();
				WriteError(error);
			}
		}
	}
	function openRegistrWinOk1(x)
	{
		/*var w=window.open();
		w.document.open();
		w.document.write(x.responseText);
		w.document.close();*/
		eval(x.responseText);
		if(typeof error!="undefined")
		{
			delLayerWin();
			WriteError(error);
		}
		else
		{
			take('messbody').n.innerHTML='Авторизация ...';
			doLogIn();
		}
	}
	</script>
	</head>
	<body onload="doCheckReader1()"><div id="messbody" style="position:absolute;text-align:center;line-height:500%;width:90%;height:90%;background:#fff"><div class="progress"><div></div></div></div></body>
</html>

HERE;



}
elseif(isset($_POST['_logintype']))
{
	$logintype=$_POST['_logintype'];
	$login=$_POST['_login'];
	$password=$_POST['_password'];
	$iddb="";
	if(isset($_POST['_iddb']))
		$iddb.=addslashes($_POST['_iddb']);
	$str="";
	if(isset($_POST['_str']))
		$str.=addslashes($_POST['_str']);
	$showstr="";
	if(isset($_POST['_showstr']))
		$showstr.=addslashes($_POST['_showstr']);
	$ind="";
	if(isset($_POST['_id']))
	{
		if($_POST['_id']!="")
			$ind=$_POST['_id'];
	}
	$codemenu="";
	if(isset($_POST['_codemenu']))
	{
		if($_POST['_codemenu']!="")
			$codemenu=$_POST['_codemenu'];
	}
	if($ind!="")
	{
		$ind=str_replace("'","\\\'",$ind);
		$ind=str_replace('"','\"',$ind);
		$ind=htmlentities($ind, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
		$ind=addslashes($ind);
		$str = "(ID ".$ind.")";
		$showstr=' <i>Идентификатор</i> '.$ind;
	}
	
	$fgs=file_get_contents("$portname://$serverHost$pathactrcp?_action=penter&_html=enter&_errorhtml=error1&_logintype=LOGIN&_login=$login&_password=$password&_userinfo=yes&_auth=yes");

	$data=<<<HERE
<!DOCTYPE html>
<html>
<head>
<title>Электронный каталог</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
$fgs
<script src="/$folderName/$folderName/js/default/custom.js"></script>
<script src="/$folderName/$folderName/js/default/calendar.js"></script>
<script src="/$folderName/$folderName/js/default/searchbibl.js"></script>
<script src="/$folderName/$folderName/js/default/pages.js"></script>
<script src="/$folderName/$folderName/js/default/modules.js"></script>
<script src="/$folderName/$folderName/js/default/root.js"></script>
<script src="/$folderName/$folderName/js/default/interface.js"></script>
<script src="/$folderName/$folderName/js/default/search_news.js"></script>
<link href="/$folderName/$folderName/css/default/controls.css" type="text/css" rel="stylesheet"/>
<link href="/$folderName/$folderName/css/default/layerwindow.css" type="text/css" />
<script>
var str="$str";
var showstr="$showstr";
var _iddb="$iddb";
var ind="$ind";
var codemenu="$codemenu";
function findInLocal()
{
	take('messbody').n.innerHTML='Переход к поиску ...';
	numDB=_iddb;
	typesearch="simple";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error4"]);
	if(numDB=="all")
	{
		typework="searchallbases";
		gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);
		querylist.push(["\$showstr",showstr]);
		querylist.push(["\$str",convertbrackets(str)]);
		var term=prepareTerm(str);
		var dbflag=false;
		for(var key in dbs)
		{
			if(dbs[key]["type"]!="AF")
			{
				if(key!="all")
				{
					if((typeof iddb[key] !="undefined")&&(((typeof l =="undefined")&&(searchlabel!="")&&(typeof dbs[key]["labels"][searchlabel]!="undefined"))||((typeof l !="undefined")&&(typeof dbs[key]["labels"][l]!="undefined"))))
					{
						if(typeof iddb[key][5] != "undefined")
						{
							var arr=iddb[key][5];
							for(var i=0; i<arr.length; i++)
							{
								if(arr[i][0]=="067")
								{
									dbflag=true;
									break;
								}
							}
						}
						if(!dbflag)
						{
							querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
							querylist.push(["_version","1.1.0"]);
							querylist.push(["session",numsean]);
							querylist.push(["iddb",key]);
							querylist.push(["query",term]);
							gArr.push(["querylist",prepareQueryString(querylist,key)]);
							querylist.length=0;
						}
						dbflag=false;
					}
				}
			}
		}
	}
	else
	{
		typework="search";
		var outfrm=outform;
		var ndb=numDB;
		if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
			ndb=_iddb;
		if(typeof dbs[ndb].outform!="undefined")
			outfrm=dbs[ndb].outform;
		gArr.push(["_handler",modules["search"].directory+"/search.php"]);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.5.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",0]);
		querylist.push(["start",0]);
		querylist.push(["\$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["\$showstr",showstr]);
		querylist.push(["\$str",convertbrackets(str)]);
		querylist.push(["\$outform",outfrm]);
		querylist.push(["outformList[0]/outform",outfrm]);
		querylist.push(["outformList[1]/outform","LINEORD"]);
		if(outfrm=="SHORTFM")
		{
			querylist.push(["outformList[2]/outform","SHORTFMS"]);
			querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
		}
		else
			querylist.push(["outformList[2]/outform","AVAILABLEECOPY"]);
		querylist.push(["iddb",ndb]);
		querylist.push(["_iddb",ndb]);
		querylist.push(["query/body",str]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(ind != "")
			querylist.push(["\$ind",ind]);
		if(codemenu != "")
			querylist.push(["\$codemenu",codemenu]);
		querylist.push(["_history","yes"]);
		if(typeof solr!="undefined")
		{
			var count1=-1;
			var countscore=-1;
			for(var key in dbs[ndb]["labels"])
			{
				if(dbs[ndb]["labels"][key][4]=="true")
				{
					count1++;
					querylist.push(["facets["+count1+"]/type","terms"]);
					querylist.push(["facets["+count1+"]/name",key]);
					querylist.push(["facets["+count1+"]/field",key]);
					querylist.push(["facets["+count1+"]/limit","500"]);
					if(dbs[ndb]["labels"][key][5] != "undefined")
					{
						querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
						querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
					}
				}
				var score=parseInt(dbs[ndb]["labels"][key][7],10);
				if(score > 1)
				{
					countscore++;
					querylist.push(["boost["+countscore+"]/label",key]);
					querylist.push(["boost["+countscore+"]/score",score]);
				}
			}
			querylist.push(["\$solr","yes"]);
		}
		lightstring="";
		gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	}
	callToRCP(gArr);
}
function doRedirect()
{
	if(typeof error!="undefined")
		WriteError();
	else
	{
		if(str!="")
			findInLocal();
		else
			ordersSearch();
	}
}
</script>
</head>
<body onload="doRedirect()">
<div id="messbody" style="position:absolute;text-align:center;line-height:500%;width:90%;height:90%;background:#fff">Переход в личный кабинет ...<div class="progress"><div></div></div></div>
</body>
</html>


HERE;


}

echo $data;

?>
