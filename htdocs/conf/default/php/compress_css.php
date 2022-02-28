<?php
require_once('functions.php');
$dirdocs='';
$dirname=dirname(__FILE__);
$array = explode($osSlash,$dirname);
$len = count($array);
$tm=strtotime("now");
for($i=0; $i<$len-2; $i++)
{
	$dirdocs.=$array[$i].'/';
}
define('THECOMPRESSCSSPATH', $dirdocs.'custom/css/default');
define('THEDESTINATIONPATH', $dirdocs.'custom/css');
define('THEFILENAME', THEDESTINATIONPATH.'/default_'.$tm.'.css');
foreach(glob(THEDESTINATIONPATH.'/default_*.css') as $file) 
{
	@unlink($file);
}
header('Content-type: text/css; charset=utf-8');
ob_start("compress");
function compress($buffer)
{
	$buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
	$buffer = str_replace(array("\r\n", "\r", "\n", "\t"), '', $buffer);
    $buffer = preg_replace('/ {2,}/', ' ', $buffer);
	writeFile(THEFILENAME,$buffer);
}
if ($cssd = opendir(THECOMPRESSCSSPATH))
{
	while (false !== ($cssfile = readdir($cssd)))
	{
		if (($cssfile != '.' && $cssfile != '..')&&(is_file(THECOMPRESSCSSPATH.'/'.$cssfile)))
		{
			include(THECOMPRESSCSSPATH.'/'.$cssfile);
		}
	}
	closedir($cssd);
}
ob_end_flush();
?>