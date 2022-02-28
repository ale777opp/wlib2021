<?php
require_once('functions.php');
if(isset($_POST['facetspath']))
{
	$path1=$_POST['facetspath'].'conf/default/conf/facets.conf';
	$path2=$_POST['facetspath'].'conf/custom/conf/facets.conf';
	$jstr=$_POST['facetjson'];
	writeFile($path1,$jstr);
	writeFile($path2,$jstr);
	$json=json_decode($jstr);
	$jcount=0;
	$jsarr='var facetss=[];'."\n";
	foreach ($json as $key => $value)
	{
		$jsarr.='facetss['.$jcount.']=[];'."\n";
		$jsarr.='facetss['.$jcount.']["type"]="terms";'."\n";
		$jsarr.='facetss['.$jcount.']["name"]="'.$key.'";'."\n";
		$jsarr.='facetss['.$jcount.']["field"]="'.$value->label.'";'."\n";
		$jcount++;
	}
	$pathf2=$_POST['facetspath'].'conf/custom/js/default/facets.js';
	writeFile($pathf2,$jsarr);
	echo 'alert("Список фасетов изменен!");';
}
?>
