<?php  
require_once(THEINCLUDESPATH.'/functions.php');
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="info"><div class="col_title">';
$ufio="";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$uprolong="";
	$ulogout="";
	$uhistlog="";
	$ufio=$response0->_fio;
	$ucode=$response0->_AI;
	$umail=$response0->_umail;
	$firstsearch=$response0->_startFrom;
	$portioncount=intval($response0->_portioncount);
	$begin=0;
	if(isset($response0->_begin))
		$begin=intval($response0->_begin);
	$total=1;
	if(isset($response0->_total))
		$total=intval($response0->_total);
	if(isset($response0->total))
		$total=intval($response0->total);
	$howmuch=intval($response0->_howMuch);
	$howmuch=($howmuch - 1);
	$lastsearch="";
	$firstrec="";
	$firstterm="";
	if(isset($response0->_firstterm))
		$firstterm=addslashes($response0->_firstterm);
	$lastrec="";
	$theend="";
	if(isset($response0->end))
		$theend=$response0->end;
	if($ufio!="")
	{
		if(isset($result->response_1))
		{
			if(isset($result->response_1->balanceES_0))
			{
				if($result->response_1->balanceES_0->type == "INDIVIDUAL")
				{
					if($result->response_1->balanceES_0->status != "YES")
					{
						$uprolong='<input type="button" class="url" value="Новый абонемент" onmousedown="prolongSign();"/>';
					}
				}
			}
		}
		/*$ulogout='<input type="button" class="button2" value="Завершить сеанс" onmousedown="closeSession()"/>';
		$uhistlog='<input type="button" class="button2" value="История сеансов" onmousedown="showAllLists()"/>';*/
	}
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>'.$ulogout.'</div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div class="h3">Список документов</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div><div class="col_content">';
	$count=0;
	$start=0;
	if($portioncount > 0)
		$start=($howmuch * $portioncount);
	if($begin > 0)
		$start=$begin-1;
	$middleoutput='<table cellspacing="0" class="filter" id="tableorder"><thead><tr class="h2"><td class="acenter b amiddle nowrap">№<br/>п/п</td><td class="b amiddle">Документ</td><td class="acenter b amiddle">Кол-во<br/>заказов</td></tr></thead><tbody>';
	foreach ($response0 as $key => $value)
	{
		$res = strpos($key, 'doc_'); 
		if($res !== false)
		{
			$count++;
			if($count % 2 == 0)
			{
				$middleoutput.='<tr class="h2">';
			}
			else
			{
				$middleoutput.='<tr class="c2">';
			}
			if($count == 1)
				$firstrec=addslashes($value->idBibRec);
			$middleoutput.='<td class="b">'.($count + $start + $portioncount).'</td><td>'.$value->outform.'<input type="hidden" id="dtc" name="dtc" value="'.$response0->_dtc.'"/><input type="hidden" id="uml" name="uml" value="'.$umail.'"/></td><td class="b acenter"><span class="blue">'.$value->number.' <span class="'.$value->idBibRec.'">';
			if(isset($value->search))
			{
				$lastsearch=$value->search;
				$middleoutput.='<input type="button" class="b button2" value="подробнее" onmousedown="addElemStat(this,\''.$value->search.'\')"/>';
			}
			else
			{
				$middleoutput.='<input type="button" class="b button2" value="подробнее" onmousedown="addElemStatP(this)"/>';
			}
			$middleoutput.='</span></span></td></tr>';
			$lastrec=addslashes($value->idBibRec);
		}
	}
	if($firstterm=="")
		$firstterm=$firstrec;
	$middleoutput.='<input type="hidden" id="firstterm" value="'.$firstterm.'"/><input type="hidden" id="lastrec" value="'.$lastrec.'"/><input type="hidden" id="lastsearch" value="'.$lastsearch.'"/><input type="hidden" id="firstsearch" value="'.$firstsearch.'"/><input type="hidden" id="portioncount" value="'.$portioncount.'"/><input type="hidden" id="total" value="'.$total.'"/>';
	$middleoutput.='</tbody></table>';
	$buttonoutput='<div class="period_container">';
	$buttonoutput.='<input type="button" class="button2" value="&#171; к статистике" onmousedown="statInd();"/>';

	if($portioncount > 0)
		$buttonoutput.='<input type="button" class="button2" value="&#8249; назад" onmousedown="seeAddStat(\''.$firstsearch.'\',\''.$firstrec.'\',\''.$portioncount.'\',0)"/>';
	if($theend == "false")
		$buttonoutput.='<input type="button" class="button2" value="далее &#8250;" onmousedown="seeAddStat(\''.$firstsearch.'\',\''.$lastrec.'\',\''.$portioncount.'\',1)"/>';
	if($begin > 0)
	{
		$size=$total;
		$length=$howmuch+1;
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$buttonoutput.='<span class="pages">';
			$buttonoutput.=resPaginator($begin,$length,$size,NULL,'9');
			$buttonoutput.='</span>';
		}
	}

	$buttonoutput.='</div>';
	if(isset($response0->_back))
		$buttonoutput.='<input type="hidden" id="back" value="'.$response0->_back.'"/>';
	$globaloutput.=$buttonoutput;
	$globaloutput.=$middleoutput;
	$globaloutput.=$buttonoutput;
	$globaloutput.='</div></div>';
}
else
{
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="col_content"><br/><br/><div class="b i acenter">Статистика отсутствует.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
