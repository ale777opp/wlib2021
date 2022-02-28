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
	$uprolong="";
	$ulogout="";
	$ustat="";
	$uhistlog="";
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
				}
			}
		}
		$cls=' class="user_info"';
	}
	$start=0;
	if(isset($response0->start))
	{
		$start=intval($response0->start);
	}
	$size=intval($response0->size);
	$total=intval($response0->total);
	$length=intval($response0->length);
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info"'.$cls.'>'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$ustat.'<input type="button" class="button2 orderlist" value="Список заказов" onmousedown="ordersSearch();"/></div><div class="spacer"></div></div><div class="spacer"></div><div class="h3">История сеансов</div><div class="spacer"></div>';
	if($total==0)
	{
		$globaloutput.='<br/><br/><br/><div class="b mt30x p30x f80 h250x acenter">История сеансов пуста.</div>';
	}
	else
	{
		$globaloutput.='<div class="memo"><span>Всего сеансов: <b class="highlight">'.$total.'</b></span></div>';
		$N1=ceil($total/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$total,NULL,'3').'</p>';
		}
		$count=0;
		$globaloutput.='<div class="col_content"><table cellspacing="0" class="filter mb210x" id="tableorder"><thead><tr class="h2"><td class="w3 acenter b amiddle nowrap">№<br/>п/п</td><td class="acenter b amiddle">Номер сеанса</td><td class="acenter b amiddle">Дата создания</td><td class="acenter b amiddle">Количество записей</td></tr></thead><tbody>';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_'); 
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
				$globaloutput.='<td class="w3 acenter b">'.($start+$count).'</td><td class="acenter"><span class="code"><u title=" ПЕРЕЙТИ " onmousedown="showOrderList(null,\''.$value->session.'\')">'.$value->session.'</u></span></td><td class="acenter">'.substr($value->date,6).'.'.substr($value->date,4,2).'.'.substr($value->date,0,4).' '.substr($value->time,0,2).':'.substr($value->time,2,2).':'.substr($value->time,4).'</td><td class="acenter">'.$value->size.'</td></tr>';
			}
		}
		$globaloutput.='</tbody></table></div><div class="spacer" style="height: 10px">&#160;</div>';
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$total,NULL,'3').'</p>';
		}
	}
	$globaloutput.='<div class="h50x"></div></div>';
}
else
{
	if(isset($_POST['fio']))
		$ufio=$_POST['fio'];
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="acenter f80 lh80"><br/><br/><br/><div class="b mt30x p30x f80 h250x acenter">История сеансов пуста.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
