<!DOCTYPE html>
<html>
<head>
<title>ЧАСТО ЗАКАЗЫВАЕМЫЕ ЭЛЕКТРОННЫЕ КНИГИ</title>
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
$embedded='QURNSTE=';/*измените пароль на актуальный*/
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
	$year=date("Y");
	$day=date("d");
	$month=date("m");
	$y=$year-1;
	$now=$year.''.$month.''.$day;
	$from=$y.''.$month.''.$day;
	$data = urlencode('_collection') . '=' . urlencode('esubscription') . '&' . urlencode('_report') . '=' . urlencode('ebook_rating') . '&' . urlencode('embedded') . '=' . urlencode($embedded). '&' . urlencode('_mode') . '=' . urlencode('sync_once'). '&' . urlencode('_output') . '=' . urlencode('index.html') . '&'  . urlencode('dbId') . '=' . urlencode('')  . '&'  . urlencode('actionDates') . '=' . urlencode($from) . '&'  . urlencode('actionDates') . '=' . urlencode($now) . '&'  . urlencode('tableSize') . '=' . urlencode('50') . "\r\n";

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
	echo '<div id="output" style="display:none">';
	/*для не json*/
	$hpath=$thehistoryfolder.'_modules'.$theosSlash.'ebookrating'.$theosSlash.'_ratings'.$theosSlash.'ebookrating.html';
	$posh = strpos($html, "<tbody>");
	$output = '<table class="badge">'.substr($html, $posh);
	if($output!="")
		writeFile($hpath,$output);
	echo $output;
	/*конец для не json*/
	echo '</div><script>parent.document.getElementById("bookratings").innerHTML=document.getElementById("output").innerHTML; parent.delLayerWin();</script>';
}
?>
</body>
</html>