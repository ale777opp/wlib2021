<?php
require_once('functions.php');
$cordspath2=$_POST['iscords'].'conf/custom/conf/map.conf';
$rezult='';
if(file_exists($cordspath2)) 
{
	$rezult = 'var rezult='.file_get_contents($cordspath2).';';
}
else
{
	$rezult = 'var rezult={';
	$rezult.= '"mapfull":{';
	$rezult.= '"01":';
	$rezult.= '[';
	$rezult.= '"0,0,0,0",';
	$rezult.= '"",';
	$rezult.= '"map01",';
	$rezult.= '"",';
	$rezult.= '"#c7cfd1",';
	$rezult.= '"#ffffff",';
	$rezult.= '"#3399cc",';
	$rezult.= '"mapOver",';
	$rezult.= '"mapOut",';
	$rezult.= '"zoomRegion",';
	$rezult.= '"1"';
	$rezult.= ']';
	$rezult.= '}';
	$rezult.= '};';
}
echo $rezult;
?>