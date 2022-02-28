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
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>'.$ulogout.'</div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div class="h3">Список заказов документа</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div><div class="period_container">';
	if(!isset($response0->_back))
		$globaloutput.='<input type="button" class="button2" value="&#171; к списку документов" onmousedown="seeAddStat(\''.addslashes($response0->_startFrom).'\');"/>';
	else
		$globaloutput.='<input type="button" class="button2" value="&#171; к списку документов" onmousedown="seeAddStatP();"/>';
	$globaloutput.='<input type="button" class="button2" value="&#171; к статистике" onmousedown="statInd();"/><input id="firstrec" type="hidden" value="'.$response0->_firstrec.'"/></div>';
	$count=0;
	$globaloutput.='<div class="memo">'.$response0->doc_0->outform.'</div><div class="col_content"><table cellspacing="0" class="filter" id="tableorder"><thead><tr class="h2"><td class="w3 acenter b amiddle nowrap">№<br/>п/п</td><td class="acenter b amiddle">Номер заказа</td><td class="b amiddle">Читатель</td><td class="acenter b amiddle">Дата заказа</td><td class="acenter b amiddle">Дата выполнения</td></tr></thead><tbody>';
	foreach ($response0->doc_0 as $key => $value)
	{
		$res = strpos($key, 'ord_'); 
		if($res !== false)
		{
			$count++;
			if($count % 2 == 0)
			{
				$globaloutput.='<tr class="h2">';
			}
			else
			{
				$globaloutput.='<tr class="c2">';
			}
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
			if(isset($value->organization))
				$reader.='<br/><i>('.$value->organization.')</i>';
			$globaloutput.='<td class="w3 acenter b">'.$count.'</td><td class="acenter">'.$value->order.'</td><td>'.$reader.'<input type="hidden" id="dtc" name="dtc" value="'.$response0->_dtc.'"/><input type="hidden" id="uml" name="uml" value="'.$umail.'"/></td><td class="acenter">'.$value->dateExecution.'</td><td class="acenter">'.$value->dateInput.'</td></tr>';
		}
	}
	$globaloutput.='</tbody></table><div class="spacer" style="height: 10px">&#160;</div><div class="period_container"><input type="button" class="button2" value="&#171; к списку документов" onmousedown="';
	if(!isset($response0->_back))
		$globaloutput.='seeAddStat(\''.addslashes($response0->_startFrom).'\')';
	else
		$globaloutput.='seeAddStatP()';
	$globaloutput.=';"/><input type="button" class="button2" value="&#171; к статистике" onmousedown="statInd();"/></div></div></div>';
}
else
{
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="col_content1"><br/><br/><div class="b i acenter">Статистика отсутствует.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
