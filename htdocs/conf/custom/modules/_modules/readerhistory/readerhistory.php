<!DOCTYPE html>
<html>
<head>
<title>ИСТОРИЯ ВЫДАЧ</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
body {background: #fff; margin: 0px; padding: 0px; font-family:Arial; font-size:100%}
h1, thead, ul{display:none}
h2 {font-size:100%}
table, h2 {width:90% !important; margin-left:5% !important; border-spacing: 5px;}
td {margin: 0px !important; padding:5px; vertical-align:top; font-size:80%; border:solid 1px silver; border-collapse:collapse}
.embedded-header-menu
{
	display:none;
}
@media screen and (max-width: 670px)
{
	table {width:auto !important}
}
<?php
$serverName = getenv ("SERVER_NAME");
$serverAddr = getenv ("SERVER_ADDR");
$serverPort = getenv ("SERVER_PORT");
$hostName = getenv("HTTP_HOST");
$height='100%';
$code="";
$year=date("Y");
$day=date("d");
$month=date("m");
$now=$year.''.$month.''.$day;
$from=($year-1).''.$month.''.$day;
$embedded='QURNSU4=';/*измените пароль на актуальный*/
if(isset($_POST['_height']))
	$height=$_POST['_height'];
if(isset($_POST['_inputdata1']))
	$from=$_POST['_inputdata1'];
if(isset($_POST['_inputdata2']))
	$now=$_POST['_inputdata2'];
if(isset($_POST['_code']))
	$code=$_POST['_code'];
echo "\n".'.body{height:'.$height.'px; overflow:auto}'."\n".'</style>'."\n".'</head>'."\n".'<body><div class="body">';
$serv_page = 'reports/tasks';
$fp = fsockopen($serverName, $serverPort, $errno, $errstr, 30);
//$fp = fsockopen('ssl://'.$serverName, $serverPort, $errno, $errstr, 30);/*если https*/
if(!$fp)
{
    echo "$errstr ($errno)<br />\n";
}
else
{
	$data = urlencode('_collection') . '=' . urlencode('standard') . '&' . urlencode('_report') . '=' . urlencode('reader_history') . '&' . urlencode('embedded') . '=' . urlencode($embedded). '&' . urlencode('_mode') . '=' . urlencode('sync_once'). '&' . urlencode('_output') . '=' . urlencode('index.html') . '&'  . urlencode('readerBarcode') . '=' . urlencode($code)  . '&'  . urlencode('actionDates') . '=' . urlencode($from) . '&'  . urlencode('actionDates') . '=' . urlencode($now) . '&'  . urlencode('tableSize') . '=' . urlencode('50') . "\r\n";

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
	echo $html.'</div>';
}
?>
</body>
</html>