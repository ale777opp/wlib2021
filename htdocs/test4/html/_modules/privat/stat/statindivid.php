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
	$umail="";
	$ufio=$response0->_fio;
	$ucode=$response0->_AI;
	if($ufio!="")
	{
		if(isset($response0->infoES_0))
		{
			if($response0->infoES_0->type == "INDIVIDUAL")
			{
				if($response0->infoES_0->status != "YES")
				{
					$uprolong='<input type="button" class="url" value="Новый абонемент" onmousedown="prolongSign();"/>';
				}
			}
			if($response0->infoES_0->type == "ORGANIZATION")
			{
				$ureaderflag="Количество читателей";
			}
		}
		/*$ulogout='<input type="button" class="button2" value="Завершить сеанс" onmousedown="closeSession()"/>';
		$uhistlog='<input type="button" class="button2" value="История сеансов" onmousedown="showAllLists()"/>';*/
	}
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>'.$ulogout.'</div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div class="h3">Статистика использования Электронного библиотечного абонемента</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div><div class="col_content">';
	$count=0;
	$nkolvo=0;
	$gkolvo=0;
	$okolvo=0;
	$mkolvo=0;
	$mokolvo=0;
	$globaloutput.='<table cellspacing="0" class="filter" id="tableorder"><tbody>';
	
	foreach ($response0 as $key => $value)
	{
		$res = strpos($key, 'infoES_'); 
		if($res !== false)
		{
			$count++;
			if(isset($value->myNumberVariousWorks))
				$mkolvo=$value->myNumberVariousWorks;
			if(isset($value->myOrders))
				$mokolvo=$value->myOrders;
			if(isset($value->itOrders))
				$okolvo=$value->itOrders;
			$nkolvo=$value->itNumberVariousWorks;
			$gkolvo=$value->itGeneralNumberWorks;
			$ckolvo=$value->itCustomers;
			$umail=$value->email;
			$globaloutput.='<tr class="h2 bge"><td class="blue">Тип заказчика</td><td>'.$value->nameGroupAccess.'<input type="hidden" id="uml" name="uml" value="'.$value->email.'"/><input type="hidden" id="nga" name="nga" value="'.$value->codeGroupAccess.'"/><input type="hidden" id="ues" name="ues" value="'.$value->userES.'"/><input type="hidden" id="dtc" name="dtc" value="'.$value->dateContract.'"/><input type="hidden" id="dts" name="dts" value="'.$value->dateStop.'"/></td></tr><tr class="c2 b1e"><td class="blue">Абонент</td><td>'.$value->name.'</td></tr>';
			if($ureaderflag!="")
			{
				if($ucode == $umail)
				{
					$globaloutput.='<tr class="h2 bge"><td class="blue">Количство читателей по договору</td><td><span class="blue">'.$value->customers.'</span></td></tr>';
					$globaloutput.='<tr class="c2 b1e"><td class="blue">Зарегистрировано читателей</td><td id="_'.$value->userES.'"><span class="blue">'.$value->itCustomers.'</span>';
					if(intval($ckolvo) > 0)
						$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="Подробнее" onmousedown="showPersons(this.parentNode)"/></span>';
					$globaloutput.='</td></tr>';
				}
			}
			$globaloutput.='<tr class="c2 b1e"><td class="blue">Срок договора</td><td>с '.substr($value->dateContract,6).'.'.substr($value->dateContract,4,2).'.'.substr($value->dateContract,0,4).' по '.substr($value->dateStop,6).'.'.substr($value->dateStop,4,2).'.'.substr($value->dateStop,0,4).'</td></tr>';
			$globaloutput.='<tr class="h2 bge"><td class="blue">Максимальное количество уникальных документов по договору</td><td>'.$value->numberVariousWorks.'</td></tr>';
			$globaloutput.='<tr class="c2 b1e"><td class="blue">Количество выданных уникальных документов</td><td class="blue"><input type="hidden" id="total" value="'.$value->itNumberVariousWorks.'"/>'.$value->itNumberVariousWorks;
			if(intval($nkolvo) > 0)
			{
				if($ucode == $umail)
				{
					$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="Подробнее" onmousedown="seeAddStat();"/></span>';
				}
			}
			$globaloutput.='</td></tr>';
			if($ureaderflag!="")
			{
				$globaloutput.='<tr class="c2 b1e"><td class="blue">Количество выданных мне уникальных документов</td><td class="blue"><input type="hidden" id="total" value="'.$value->myNumberVariousWorks.'"/>'.$value->myNumberVariousWorks;
				if(intval($mkolvo) > 0)
				{
					$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="Подробнее" onmousedown="seeAddStatP();"/></span>';
				}
				$globaloutput.='</td></tr>';
			}
			$globaloutput.='<tr class="c2 b1e"><td class="blue">Количество документов в процессе оцифровки</td><td class="blue">'.$value->itOrders;
			if(intval($okolvo) > 0)
			{
				if($ucode == $umail)
				{
					$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="Подробнее" onmousedown="seeAddStatDigit();"/></span>';
				}
			}
			$globaloutput.='</td></tr>';
			if($ureaderflag!="")
			{
				$globaloutput.='<tr class="c2 b1e"><td class="blue">Мои документы в процессе оцифровки</td><td class="blue">'.$value->myOrders;
				if(intval($mokolvo) > 0)
				{
					$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="Подробнее" onmousedown="seeAddStatDigitMy();"/></span>';
				}
				$globaloutput.='</td></tr>';
			}
			$globaloutput.='<tr class="h2 bge"><td class="blue">Максимальное количество выдач</td><td>'.$value->generalNumberWorks.'</td></tr>';
			$globaloutput.='<tr class="c2 b1e"><td class="blue">Общее количество выполненных выдач</td><td class="blue">'.$value->itGeneralNumberWorks.'</td></tr>';
			if($ureaderflag!="")
				$globaloutput.='<tr class="c2 b1e"><td class="blue">Мои выдачи</td><td class="blue">'.$value->myGeneralNumberWorks.'</td></tr>';
		}
	}
	$globaloutput.='</tbody></table><div class="spacer" style="height: 10px">&#160;</div>';
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
