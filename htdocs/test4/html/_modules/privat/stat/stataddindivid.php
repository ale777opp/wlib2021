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
	$date0=$response0->_date0;
	$date1=$response0->_date1;
	$codenlr=$response0->_codenlr;
	$startFrom=intval($response0->_startFrom);
	$total=intval($response0->numberOrders);
	$howmuch=intval($response0->_howMuch);
	$howmuch=($howmuch - 1);
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
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>'.$ulogout.'</div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div class="h3">Список заказанных документов</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div><div class="col_content">';
	$count=0;
	$start=$startFrom - 1;
	$reso="";
	if(isset($response0->_back))
	{
		if(isset($response0->list_0->reader_0))
		{
			$farr=$response0->list_0->reader_0;
			$flen = count ($farr);
			for($i=0; $i<$flen; $i++)
			{
				$resp = strpos($farr[$i], 'AO:');
				if($resp !== false)
				{
					$reso.=substr($farr[$i],3);
					break;
				}
			}
			$globaloutput.='<div class="memo"><span>Читатель: </span><span class="blue">'.$reso.'</span></div>';
		}
	}
	$middleoutput='<table cellspacing="0" class="filter" id="tableorder"><thead><tr class="h2"><td class="acenter b amiddle nowrap">№<br/>п/п</td><td class="acenter b amiddle">Номер заказа</td><td class="acenter b amiddle">Дата заказа</td><td class="acenter b amiddle">Документ</td><td class="acenter b amiddle">Дата выдачи</td><td class="acenter b amiddle">Тип<br/>заказа</td><td class="acenter b amiddle">Статус</td></tr></thead><tbody>';
	foreach ($response0 as $key => $value)
	{
		$res = strpos($key, 'list_'); 
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
			$middleoutput.='<td class="b">'.($count + $start).'</td><td>'.$value->order.'</td><td class="acenter">'.$value->timeReception.'</td><td>'.$value->outform.'<input type="hidden" id="uml" name="uml" value="'.$umail.'"/></td><td class="acenter">'.$value->date.'</td><td class="acenter">'.$value->typeOrder.'</td><td class="acenter">'.$value->statusOrder.'</td></tr>';
		}
	}
	if($count==0)
		$middleoutput.='<tr><td colspan="7" class="acenter b">Заказанные документы отсутствуют</td></tr>';
	$middleoutput.='</tbody></table>';
	$buttonoutput='<div class="period_container">';
	if(isset($response0->_back))
	{
		$buttonoutput.='<span id="_'.$response0->_groupid.'"><input type="button" class="button2" value="&#171; к списку читателей" onmousedown="showPersons(this);"/></span><input type="hidden" id="dtc" name="dtc" value="'.$date0.'"/><input type="hidden" id="dts" name="dts" value="'.$date1.'"/>';
	}
	$buttonoutput.='<input type="button" class="button2" value="&#171; к статистике" onmousedown="statInd();"/>';
	
	$size=$total;
	$length=$howmuch+1;
	$N1=ceil($size/$length);
	if($N1!= 1)
	{
		$buttonoutput.='<span class="pages">';
		$buttonoutput.=resPaginator($startFrom,$length,$size,'\''.$codenlr.'\'','12');
		$buttonoutput.='</span>';
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
