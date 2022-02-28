<?php  
require_once(THEINCLUDESPATH.'/functions.php');  
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="infor"><div class="col_title">';
$ufio="";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$ureaderflag="";
	$uprolong="";
	$ulogout="";
	$uhistlog="";
	$ufio=$response0->_fio;
	$ucode=$response0->_AI;
	$umail=$response0->_umail;
	$firstsearch=$response0->_code;
	$portioncount=intval($response0->_portioncount);
	$rreader="";
	if(isset($response0->_reader))
		$rreader=$response0->_reader;
	$begin=0;
	if(isset($response0->_begin))
		$begin=intval($response0->_begin);
	$total=1;
	if(isset($response0->_total))
		$total=intval($response0->_total);
	if(isset($response0->total))
		$total=intval($response0->total);
	$ushow="";
	if(isset($response0->_visibility))
		$ushow=$response0->_visibility;
	$howmuch=intval($response0->_howMuch);
	$howmuch=($howmuch - 1);
	$lastsearch="";
	$firstrec="";
	$firstterm="";
	if(isset($response0->_firstterm))
		$firstterm=addslashes($response0->_firstterm);
	$lastrec="";
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
				if($result->response_1->balanceES_0->type == "ORGANIZATION")
				{
					$ureaderflag="Читатель";
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
	$middleoutput='<table cellspacing="0" class="filter" id="tableorder"><thead><tr class="h2"><td class="acenter b amiddle nowrap">№<br/>п/п</td><td class="b amiddle">Номер заказа</td><td class="b amiddle">Документ</td><td class="b amiddle">Дата выполнения</td>';
	if($ureaderflag!="")
	{
		if($ushow=="")
		{
			$middleoutput.='<td class="b">'.$ureaderflag.'</td>';
		}
	}
	$middleoutput.='</tr></thead><tbody>';
	foreach ($response0 as $key => $value)
	{
		$res = strpos($key, 'ord_'); 
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
			$middleoutput.='<td class="b">'.($count + $start).'</td><td>'.$value->order.'</td><td>'.$value->outform.'</td><td>'.$value->dateExecution.'</td>';
			if($ureaderflag!="")
			{
				if($ushow=="")
				{
					$reader="";
					if(isset($value->reader_0))
					{
						$farr=$value->reader_0;
						$flen = count ($farr);
						for($i=0; $i<$flen; $i++)
						{
							$resf = strpos($farr[$i], 'AO:');
							if($resf !== false)
								$reader.=substr($farr[$i],3);
						}
					}
					$middleoutput.='<td class="blue">'.$reader.'</td>';
				}
			}			
			$middleoutput.='</tr>';
			$lastrec=addslashes($value->idBibRec);
		}
	}
	if($firstterm=="")
		$firstterm=$firstrec;
	$middleoutput.='<input type="hidden" id="dtc" name="uml" value="'.$umail.'"/><input type="hidden" id="uml" name="uml" value="'.$response0->_dtc.'"/><input type="hidden" id="firstterm" value="'.$firstterm.'"/><input type="hidden" id="lastrec" value="'.$lastrec.'"/><input type="hidden" id="lastsearch" value="'.$lastsearch.'"/><input type="hidden" id="firstsearch" value="'.$firstsearch.'"/><input type="hidden" id="portioncount" value="'.$portioncount.'"/><input type="hidden" id="total" value="'.$total.'"/>';
	$middleoutput.='</tbody></table>';
	$buttonoutput='<div class="period_container">';
	$buttonoutput.='<input type="button" class="button2" value="&#171; к статистике" onmousedown="statInd();"/>';
	if($begin > 0)
	{
		$size=$total;
		$length=$howmuch+1;
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$buttonoutput.='<span class="pages">';
			if($rreader != "")
				$buttonoutput.=resPaginator($begin,$length,$size,NULL,'11');
			else
				$buttonoutput.=resPaginator($begin,$length,$size,NULL,'10');
			$buttonoutput.='</span>';
		}
	}
	$buttonoutput.='</div>';
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
