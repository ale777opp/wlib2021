<?php
require_once('functions.php');
require 'jsmin.php';
$dirdocs='';
$dirname=dirname(__FILE__);
$array = explode($osSlash,$dirname);
$len = count($array);
$tm=strtotime("now");
for($i=0; $i<$len-2; $i++)
{
	$dirdocs.=$array[$i].'/';
}
define('THECOMPRESSJSPATH', $dirdocs.'custom/js/default');
define('THEDESTINATIONPATH', $dirdocs.'custom/js');
define('THEFILENAME', THEDESTINATIONPATH.'/default_'.$tm.'.js');
foreach(glob(THEDESTINATIONPATH.'/default_*.js') as $file) 
{
	@unlink($file);
}
header('Content-type: text/javascript; charset=utf-8');
ob_start("compress");
function compress($buffer)
{
	writeFile(THEFILENAME,$buffer);
	$jsmin_php = JSMin::minify(file_get_contents(THEFILENAME));
	file_put_contents(THEFILENAME, $jsmin_php);
}
if ($jsd = opendir(THECOMPRESSJSPATH))
{
	while (false !== ($jsfile = readdir($jsd)))
	{
		if (($jsfile != '.' && $jsfile != '..')&&(is_file(THECOMPRESSJSPATH.'/'.$jsfile)))
		{
			include(THECOMPRESSJSPATH.'/'.$jsfile);
		}
	}
	closedir($jsd);
}
ob_end_flush();
?>
