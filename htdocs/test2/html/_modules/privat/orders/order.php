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
	$ureader=$response0->_reader;
	$ulogin="";
	$uprolong="";
	$ulogout="";
	$ustat="";
	$uhistlog="";
	$uhint='';
	$myhands='';
	$mybooks='';
	$notice='';
	$ufio=$response0->_fio;
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
					if($result->response_1->balanceES_0->status == "NO")
					{
						$uhint='<span class="hint"></span>ВНИМАНИЕ! Истек срок действия вашего договора.';
						if($result->response_1->balanceES_0->type == "INDIVIDUAL")
							$uhint.=' Для продления нажмите кнопку НОВЫЙ АБОНЕМЕНТ.';
					}
					$st = strpos($result->response_1->balanceES_0->status, 'YES_');
					if($st !== false)
					{
						$uhint='<span class="hint"></span>ВНИМАНИЕ! Достигнут предел по одному из ограничений договора.';
						if($result->response_1->balanceES_0->type == "INDIVIDUAL")
							$uhint.=' Для продления нажмите кнопку НОВЫЙ АБОНЕМЕНТ.';
					}
				}
				else
				{
					$uhint='<span class="hint"></span>ВНИМАНИЕ! Нет подтверждения об оплате.';
				}
			}
			//else
			//	$notice='';
			if($uhint!='')
				$uhint='<p class="red acenter"><span id="hint">'.$uhint.'</span></p>';
		}
		$cls=' class="user_info"';
	}
	if(isset($response0->list_0->reader_0))
	{
		$farr=$response0->list_0->reader_0;
		$flen = count ($farr);
		for($i=0; $i<$flen; $i++)
		{
			$resm = strpos($farr[$i], 'AI:');
			$reslog = strpos($farr[$i], 'AY:');
			if($resm !== false)
				$globaloutput.='<input type="hidden" value="'.substr($farr[$i],3).'" id="umail" name="umail"/>';
			if($reslog !== false)
				$ulogin=substr($farr[$i],3);
		}
	}
	$myhands='<input id="myhandsbut" type="button" class="button2" value="Книги на руках" onmousedown="myHands()"/>';
	$mybooks='<input id="mybooksbut" type="button" class="button2" value="История выдач" onmousedown="myBooks()"/>';
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info"'.$cls.'>'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$ustat.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/>'.$ulogout.'</div><div class="spacer"></div></div><div class="spacer"></div><div class="h3">Список заказов</div><div class="spacer"></div>'.$notice;
	$globaloutput.='<div class="memo h35x mybookscontainer"><span class="fleft">'.$myhands.''.$mybooks.'</span></div>';
	$globaloutput.=$uhint.'<div class="col_content">';
	if(!isset($response0->list_0))
	{
		$globaloutput.='<div class="period_container acenter b p30x f80 h250x">На текущую дату список заказов пуст<br/><br/><input id="order_list_data" type="button" class="button2 orderlist" value="Задать период" onmousedown="ordersSearch2();"/></div>';
	}
	else
	{
		$globaloutput.='<div class="table w100 orders"><div class="row b"><div class="td h30x">№ заказа</div><div class="td td2unvisible">Дата заказа</div><div class="td">Документ</div><div class="td">Дата выдачи</div><div class="td td2unvisible">Кафедра выдачи</div><div class="td td2unvisible">Тип заказа</div><div class="td">Статус</div></div>';
		$count=0;
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'list_'); 
			if($res !== false)
			{
				$count++;
				$globaloutput.='<div class="row">';
				$globaloutput.='<div class="td">'.$value->order.'</div><div class="td td1unvisible">'.$value->timeReception.'</div><div class="td">'.$value->outform.'</div><div class="td">'.$value->date.'</div><div class="td td1unvisible">'.$value->placeDelivery.'</div><div class="td td1unvisible">'.$value->typeOrder.'</div><div class="td"><div class="blue">'.$value->statusOrder.'</div>';
				if(isset($value->modeEd))
				{
					$globaloutput.='<input type="hidden" value="'.$value->userid.'"/><a href="http://'.THEHOSTNAME.'/link.html?mail='.$ulogin.',order='.addslashes($value->order).',from=ELS" target="_blank" class="url">Показать online</a><br/><span class="url" onmousedown="documentMail(\''.addslashes($value->order).'\');">Получить ссылку по email</span>';
				}
				$globaloutput.='</div></div>';
			}
		}
		$globaloutput.='</div><div class="spacer" style="height: 10px">&#160;</div><br/><div class="period_container acenter b p30x f80">Задать другой период:<br/><input id="order_list_data" type="button" class="button2 orderlist" value="Задать период" onmousedown="ordersSearch2();"/></div>';
	}
	$globaloutput.='<div class="h50x"></div></div></div>';
}
else
{
	if(isset($_POST['fio']))
		$ufio=$_POST['fio'];
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="acenter f80 lh80"><div class="period_container acenter b p30x f80 h250x">На текущую дату список заказов пуст<br/><br/><input id="order_list_data" type="button" class="button2 orderlist" value="Задать период" onmousedown="ordersSearch2();"/></div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
