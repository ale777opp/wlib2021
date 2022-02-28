<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div>';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	include (THEPAGESPATH.'/includes/searchdiv.php');
	$globaloutput.='<div class="spacer"></div><div id="searchhead"><div><span class="dib mt10x mb10x"><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$response0->_showstr.'</span><br/><b>Найдено записей: </b><b class="highlight" id="totalquant"></b></span></div><div class="spacer"></div></div><div class="spacer"></div><div class="col_content">';
	$count=0;
	$totalquant=0;
	foreach ($result as $key => $value)
	{
		$res = strpos($key, 'response_'); 
		if($res !== false)
		{
			$rsize=intval($value->size);
			if((isset($value->iddb_0))&&($rsize > 0))
			{
				$count++;
				$globaloutput.='<div class="searchrez"><div class="spacer mt10x"></div>';
				$totalquant+=$rsize;
				$ldb=$value->iddb_0->number;
				$item='dbs_'.$ldb;
				$title=$value->iddb_0->title;
				if(isset($fjson->$item->alias))
					$title=$fjson->$item->alias;
				$globaloutput.='<p class="curs" title="ИСКАТЬ" onmousedown="searchInBase(this)" id="d'.$ldb.'"><span class="fright">Найдено записей <b class="highlight">'.$value->size.'</b>.</span><span class="fleft"><b>'.$count.'. </b><u>База данных <b>'.$title.'</b></u></span></p>';
				$globaloutput.='<div class="spacer mb10x"></div></div>';
			}
		}
	}
	$globaloutput.="<script>take('totalquant').n.innerHTML=$totalquant;</script>";
	echo $globaloutput;
	if($totalquant == 0)
		include (THEINCLUDESPATH.'/errorpage.php');
}
else
{
	include (THEPAGESPATH.'/includes/searchdiv.php');
	echo $globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
echo '</div></div>';
include (THEPAGESPATH.'/includes/footer.php');
?>
