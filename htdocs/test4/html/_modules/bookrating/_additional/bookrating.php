<!DOCTYPE html>
<html>
<head>
<title>ЧАСТО ЗАКАЗЫВАЕМЫЕ КНИГИ</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php
function theOsIs($OS)
{
	$tmp = php_uname();
	$tmp = strpos($tmp, $OS);
	if($tmp || $tmp === 0)
		return true;
	return false;
}
$theosSlash='';
if(theOsIs('Linux'))
	$theosSlash='/';
else
	$theosSlash='\\';
$thedirname=dirname(__FILE__);
$thearray = explode($theosSlash,$thedirname);
$thelen = count($thearray);
$thefolderName=$thearray[$thelen-5];
$thehistoryfolder='';
for($i=0; $i<$thelen-3; $i++)
{
	$thehistoryfolder.=$thearray[$i].''.$theosSlash;
}
define('THEHOSTNAME', getenv("HTTP_HOST"));
require_once($thehistoryfolder.'_includes'.$theosSlash.'functions.php'); 
$serverName = getenv ("SERVER_NAME");
$serverAddr = getenv ("SERVER_ADDR");
$serverPort = getenv ("SERVER_PORT");
$serv_page = 'reports/tasks';
$fp = fsockopen($serverName, $serverPort, $errno, $errstr, 30);
//$fp = fsockopen('ssl://'.$serverName, $serverPort, $errno, $errstr, 30);/*если https*/
if(!$fp)
{
    echo "$errstr ($errno)<br />\n";
}
else
{
	$embedded='QURNSU4=';/*измените пароль на актуальный*/
	$outform='';
	//$outform='OUTFORM.RUSMARC.BIBL.SHOTFORM';/*можно указать выходную форму*/
	$year=date("Y");
	$day=date("d");
	$month=date("m");
	$y=$year-1;
	$now=$year.''.$month.''.$day;
	$from=$y.''.$month.''.$day;
	$data = urlencode('_collection') . '=' . urlencode('standard') . '&' . urlencode('_report') . '=' . urlencode('book_rating') . '&' . urlencode('embedded') . '=' . urlencode($embedded). '&' . urlencode('_mode') . '=' . urlencode('sync_once'). '&' . urlencode('_output') . '=' . urlencode('index.json') . '&'  . urlencode('dbId') . '=' . urlencode('')  . '&'  . urlencode('actionDates') . '=' . urlencode($from) . '&'  . urlencode('actionDates') . '=' . urlencode($now) . '&'  . urlencode('outform') . '=' . urlencode($outform) . '&'  . urlencode('tableSize') . '=' . urlencode('50') . "\r\n";

	$out = "POST /".$serv_page." HTTP/1.1\r\n";
	$out .= "Host: ".$serverName.":".$serverPort."\r\n";
	$out .= "Content-type: application/x-www-form-urlencoded\r\n";
	$out .= "Content-length: ".strlen($data)."\r\n";
	$out .= "Connection: Close\r\n\r\n";
	$out .= $data."\r\n\r\n";

	$html = '';
	fwrite($fp, $out);
	while (!feof($fp)) {
		$html .= fgets($fp, 128);
	}
	fclose($fp);
	
	$pos = strpos($html, "\r\n\r\n");
	$html = substr($html, $pos+4);
	$result=json_decode($html);
	//var_dump(json_decode($html));
	//echo $html;
	echo '<div id="output" style="display:none">';
	if(isset($result->error))
	{
		//echo $result->error;
		echo file_get_contents('http://'.THEHOSTNAME.'/'.$thefolderName.'/'.$thefolderName.'/html/_modules/bookrating/_ratings/bookrating.html'); 
		//echo file_get_contents('https://'.THEHOSTNAME.'/'.$thefolderName.'/'.$thefolderName.'/html/_modules/bookrating/_ratings/bookrating.html');/*если https*/
	}
	else
	{
		$output='<ol class="badge">';
		$textoutput='<ol class="badge">';
		$len=count ($result);
		$counter=0;
		for($i=0; $i<$len; $i++)
		{
			if(isset($result[$i]->bibcard))
			{
				$output.='<li class="p5px';
				$output.='" data="';
				$output.=$result[$i]->count;
				$output.='"><br/>';
				$output.=parseBB($result[$i]->bibcard);
				$output.='<br/><br/></li>';
				$counter++;
				if($counter==10)
				{
					$textoutput.=$output;
				}
			}
		}
		$output.='</ol>';
		$textoutput.='</ol>';
		$hpath=$thehistoryfolder.'_modules'.$theosSlash.'bookrating'.$theosSlash.'_ratings'.$theosSlash.'bookrating.html';
		if($textoutput!="")
			writeFile($hpath,$textoutput);
		//echo $textoutput;
		echo $output;
	}
	echo '</div><script>parent.document.getElementById("bookratings").innerHTML=document.getElementById("output").innerHTML; parent.delLayerWin();</script>';
}
?>
</body>
</html>