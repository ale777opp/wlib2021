<?php
require_once(THEINCLUDESPATH.'/functions.php');
$globaloutput='<div id="infor1"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Словарь</span>';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	if(isset($response0->_localiddb))
	{
		$iddb=$response0->_localiddb;
		$particle="lib_";
	}
	if(isset($response0->_skin))
	{
		if($response0->_skin!="")
			$skin=$response0->_skin;
	}
	if(isset($response0->_ltitle))
		$ltitle=$response0->_ltitle;
	if(isset($response0->_laddress))
		$laddress=$response0->_laddress;
	if(isset($response0->_sigla))
		$sigla=$response0->_sigla;
	if(isset($response0->_site))
		$site=$response0->_site;
	if(isset($response0->_elcat))
		$elcat=$response0->_elcat;
	$globaloutput.='<span id="example">Поисковое выражение: </span><span id="termin">'.$response0->_showstr.'</span></div>';
	if(isset($response0->indx_0))
	{
		$start=intval($response0->_start);
		$label="";
		if(isset($response0->_label))
			$label=$response0->_label;
		$andor="";
		$vocfunc='searchAlfabet(null,';
		if(isset($response0->_andor))
		{
			$andor=$response0->_andor;
			$vocfunc='showVoc(null,\''.$label.'\',';
		}
		$endvoc=false;
		if(isset($response0->end))
			$endvoc=true;
		$globaloutput.='<div class="searchhead" id="searchhead">';
		$buttonscont='';
		$buttonscont.='<div class="fright">';
		if(isset($response0->_skipFirst))
			$buttonscont.='<input type="button" class="button2" value="&#8249; Назад" onmousedown="'.$vocfunc.'0);"/>';
		if(!$endvoc)
			$buttonscont.='<input type="button" class="button2" value="Далее &#8250;" onmousedown="'.$vocfunc.'1);"/>';
		$buttonscont.='</div>';
		$globaloutput.=$buttonscont;
		if($andor!="")
		{
			$globaloutput.='<div class="fleft"><!--<input type="button" class="button2" value="Добавить к поиску" onmousedown="addVoc();"/>--><div id="menu1" style="display: none"><div class="andor"><div class="select4"><img onmousedown="showOptions(this,\'andor_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/>';
			if(intval($andor)==0)
				$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="OR" id="andor">ИЛИ</span>';
			else
				$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="AND" id="andor">И</span>';
			$globaloutput.='</div></div>';
			if(isset($response0->_indxterms))
			{
				$arr=explode('[END]', $response0->_indxterms);
				$size = count($arr);
				for($j=0; $j < $size; $j++)
					$globaloutput.='<code style="display:none" id="'.substr($arr[$j],0,strpos($arr[$j],'|')).'">'.substr($arr[$j],strpos($arr[$j],'|')+1).'</code>';
			}
			$globaloutput.='</div></div>';
		}
		$globaloutput.='<div class="spacer"></div></div><div class="col_content"><div id="srezults">';
		include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
		$globaloutput.='<center><table class="filter" cellspacing="0">';
		//$count=-1;
		$count=0;
		$lastterm="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'indx_'); 
			if($res !== false)
			{
				$count++;
				$flag="";
				if($count % 2 == 0)
				{
					$globaloutput.='<tr class="c2">';
				}
				else
				{
					$globaloutput.='<tr class="h2">';
				}
				if(isset($arr))
				{
					for($i=0; $i < $size; $i++)
					{
						if(substr($arr[$i],0,strpos($arr[$i],'|'))=='_'.($start+$count))
						{
							$flag='checked="checked"';
							break;
						}
					}
				}
				$globaloutput.='<td class="w3">'.($start+$count).'.</td>';
				/*if($andor!="")
					$globaloutput.='<td class="w3"><input '.$flag.' id="'.($start+$count).'" type="checkbox" class="addbox" name="'.$label.'"  value="'.htmlspecialchars($value->item).'" onclick="putTerms(this)"/><span style="display: none">'.htmlspecialchars($value->item).'</span></td>';
				$globaloutput.='<td><span class="code" title="Искать" onmousedown="searchVoc(\''.$label.'\',\''.htmlspecialchars($value->item).'\');"><u>'.$value->item.'</u></span></td><td width="3%" class="h">'.$value->size.'</td></tr>';
				$lastterm=addslashes($value->item);*/
				$termin=$value->item;
				$from=$from = array("'", "\"", "\\");
				$to = array("[apos]", "[quot]", "[backslash]");
				$newtermin = str_replace($from, $to, $termin);
				if($andor!="")
					$globaloutput.='<td class="w3"><input '.$flag.' id="'.($start+$count).'" type="checkbox" class="addbox" name="'.$label.'"  value="'.$newtermin.'" onclick="putTerms(this)"/><span style="display: none">'.$newtermin.'</span></td>';
				$globaloutput.='<td><span class="code" title="Искать" onmousedown="searchVoc(\''.$label.'\',this.firstChild.firstChild.nodeValue);"><u class="dn">'.$newtermin.'</u><u class="lh140">'.$value->item.'</u></span></td><td width="3%" class="h">'.$value->size.'</td></tr>';
				$lastterm=addslashes($value->item);
			}
		}
		$globaloutput.='</table></center><script>var _lastterm="'.$lastterm.'";</script><div class="spacer"></div></div></div>';
		$globaloutput.='<div class="searchhead1">'.$buttonscont.'</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="20"/></div></div>';
		echo $globaloutput;	
	}
	else
	{
		include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
		echo $globaloutput;
		include (THEINCLUDESPATH.'/errorpage.php');
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $globaloutput.'</div>';
	include (THEINCLUDESPATH.'/errorpage.php');
}
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
