<?php  
require_once(THEINCLUDESPATH.'/functions.php');  
$globaloutput='<div id="infor"><div class="col_title">';
$ufio="";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$ulogin="";
	$uprolong="";
	$ulogout="";
	$ustat="";
	$uhistlog="";
	$uhint='';
	$myhands='';
	$mybooks='';
	$ufio=$response0->_fio;
	$size=0;
	$cls='';
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
				if($result->response_1->balanceES_0->status != "SOON")
				{
					$ustat='<input type="button" class="button2" value="Статистика" onmousedown="statInd();"/>';
				}
			}
		}
		$cls=' class="user_info"';
	}
	else
	{
		if(isset ($response0->reader_0->visitor_0))
		{
			$rarr=$response0->reader_0->visitor_0;
			$rlen=count($rarr);
			for($j=0; $j<$rlen; $j++)
			{
				$rpos=strpos($rarr[$j], '[AO]');
				if($rpos !== false)
				{
					$ufio=substr($rarr[$j],$rpos+4);
					break;
				}
			}
		}
	}
	$prolong='<input type="button" class="button2" value="Продлить" onmousedown="prolong()"/>';
	//$prolong='<input type="button" class="button2" value="Продлить" onmousedown="prolongNodeJs()"/>';/*продление через plugin*/
	$myhands='<input type="button" class="button2 orderlist" value="Список заказов" onmousedown="ordersSearch()"/>';
	$mybooks='<input type="button" class="button2" value="История выдач" onmousedown="myBooks()"/>';
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info"'.$cls.'>'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$ustat.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/>'.$ulogout.'</div></div><div class="spacer"></div><div class="h3">Книги на руках</div><div class="spacer"></div>';
	
	if((!isset($response0->whatThis))||($response0->whatThis != "READER"))
	{
		$globaloutput.='<div class="period_container acenter b p30x f80 h250x">Не существует пользователя с заданным кодом/идентификатором или ошибка при идентификации пользователя.<br/>Вернитесь в &laquo;Список заказов&raquo;</div>';
	}
	else
	{
		if(isset($response0->reader_0->size))
			$size=intval($response0->reader_0->size);
		if($size == 0)
		{
			$globaloutput.='<div class="memo h35x"><span class="fleft">'.$myhands.''.$mybooks.'</span></div>';
			$globaloutput.='<div class="period_container acenter b p30x f80 h250x">Документов на руках нет.</div>';
		}
		else
		{
			$globaloutput.='<div class="memo h35x"><span class="fright">'.$prolong.'</span><span class="fleft">'.$myhands.''.$mybooks.'</span></div>';
			$globaloutput.='<div class="col_content">';
			$globaloutput.='<div class="table w100 orders" id="searchrezult"><div class="row b"><div class="td h30x w3"><input type="checkbox" onclick="Mark(this)" id="mark" value=""/></div><div class="td">Документ</div><div class="td td2unvisible">Код документа</div><div class="td td2unvisible">Место выдачи</div><div class="td td2unvisible">Дата выдачи</div><div class="td td">Дата возврата</div></div>';
			$count=0;
			foreach ($response0->reader_0 as $key => $value)
			{
				$res = strpos($key, 'documents_'); 
				if($res !== false)
				{
					$count++;
					$globaloutput.='<div class="row">';
					$riddb="";
					if(isset($value->iddb))
						$riddb=$value->iddb;
					$globaloutput.='<div class="td check w3" ><input type="checkbox" name="marker" value="'.$value->codeDoc.'" class="'.$riddb.'"/></div><div class="td">'.$value->outform.'</div><div class="td td2unvisible">'.$value->codeDoc.'</div><div class="td td2unvisible">'.$value->place.'</div><div class="td td2unvisible">'.$value->timeDoc.'</div><div class="td">'.$value->controlTime.'</div></div>';
				}
				else
				{
					$res1 = strpos($key, 'place_');
					if($res1 !== false)
					{
						$place=$value->place;
						foreach ($value as $arg => $val)
						{
							$res2 = strpos($arg, 'documents_');
							if($res2 !== false)
							{
								$count++;
								$globaloutput.='<div class="row">';
								$rriddb="";
								if(isset($val->iddb))
									$rriddb=$val->iddb;
								$globaloutput.='<div class="td check w3" ><input type="checkbox" name="marker" value="'.$val->codeDoc.'" class="'.$rriddb.'"/></div><div class="td">'.$val->outform.'</div><div class="td td2unvisible">'.$val->codeDoc.'</div><div class="td td2unvisible">'.$place.'</div><div class="td td2unvisible">'.$val->timeDoc.'</div><div class="td">'.$val->controlTime.'</div></div>';
							}
						}
					}
				}
			}
			$globaloutput.='</div></div><div class="spacer" style="height: 10px"></div>';
		}
	}
	$globaloutput.='<div class="h50x"></div></div>';
}
else
{
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="acenter f80 lh80"><div class="period_container acenter b p30x f80 h250x"Не существует пользователя с заданным кодом/идентификатором или ошибка при идентификации пользователя.<br/>Вернитесь в &laquo;Список заказов&raquo;</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
