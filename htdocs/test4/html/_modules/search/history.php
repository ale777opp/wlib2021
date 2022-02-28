<?php
require_once(THEINCLUDESPATH.'/functions.php');
if(is_numeric($nsean))
{
$globaloutput='<div id="infor"><div class="col_title">';
$result1=file(THEHISTORYPATH.'/'.$nsean.'/history.txt');
$result=array_reverse($result1);
$size = count($result);

if((isset($_POST['_auth']))||($flag45))
{
	$uprolong="";
	$ulogout="";
	$ufio="";
	$ustat="";
	$uhistlog="";
	$res="";
	$response0="";
	$cls='';
	if(isset($_POST['fio']))
		$ufio=$_POST['fio'];
	if(isset($_POST['response']))
	{
		$res=prepareJson($_POST['response']);
		$response0=$res->response_0;
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
		if(isset($response0->_id))
			$lind=$response0->_id;
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
		if(isset($response0->_fio))
			$ufio=$response0->_fio;
	}
	if($ufio!="")
	{
		if(isset($response0->balanceES_0))
		{
			if($response0->balanceES_0->type == "INDIVIDUAL")
			{
				if($response0->balanceES_0->status != "YES")
				{
					$uprolong='<input type="button" class="url" value="Новый абонемент" onmousedown="prolongSign();"/>';
				}
			}
			if($response0->balanceES_0->status != "SOON")
			{
				$ustat='<input type="button" class="button2" value="Статистика" onmousedown="statInd();"/>';
			}
		}
		$uhistlog='<input type="button" class="button2" value="История сеансов" onmousedown="showAllLists()"/>';
		$cls=' class="user_info"';
	}
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info"'.$cls.'>'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$ustat.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input id="orderlist" type="button" class="button2 orderlist" value="Список заказов" onmousedown="ordersSearch();"/>'.$uhistlog.''.$ulogout.'</div></div><div class="spacer"></div><div class="h3">История поисков сеанса: <b class="highlight">'.$nsean.'</b></div>';
}
else
{
	$globaloutput.='<span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">История поисков</span>';
	if(isset($fjson->listlit))
		$globaloutput.='<span class="fright"><input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/></span>';
	$globaloutput.='</div><div class="h3">Всего поисков: <b class="highlight">'.$size.'</b></div>';
}
$globaloutput.='<div class="col_content table w80"><div id="srezults" class="td w70 vtop">';
include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
if($size>0)
{
	$countb=0;
	for ($i=0; $i<$size; $i++)
	{
		$arr=explode('[|]', $result[$i]);
		$rb=explode(':', $arr[4]);
		$item='dbs_'.$rb[0];
		if(isset($qjson->$item))
		{
			$ldbt=$fjson->$item->alias;
			$trimed=trim($arr[5]);
			$globaloutput.='<div class="searchhead"><div class="fright"><input id="_'.$i.'"  type="button" class="url" onmousedown="historySearch(this.id)" value="Показать"/></div><div class="fleft pl5x"><span id="c_'.$i.'" class="constr" onclick="putSearchToConstructor(this)" title="Добавить в конструктор"></span><b>'.($size-$i).'.&#160;<u>Поисковое выражение:</u></b> <span class="showstr" id="showstr_'.$i.'">'.$arr[1].'</span><br/>Найдено записей: <b class="highlight">'.$arr[2].'</b><br/>БД: <b class="highlight">'.$ldbt.'</b></div><span style="display:none" id="str_'.$i.'">'.$arr[0].'</span><span style="display:none" id="hand_'.$i.'">'.$arr[3].'</span><span style="display:none" id="etb_'.$i.'">'.$arr[4].'</span><span style="display:none" id="outf_'.$i.'">'.$trimed.'</span><div class="spacer"></div></div>';
			$countb++;
		}
	}
	if($countb==0)
		$globaloutput.='<br/><br/><br/><div class="b acenter p30x f80 h250x">Поиск не производился.</div><br/><br/>';
	$globaloutput.='<div class="h50x"></div>
	</div><div class="td w30 vtop" id="bibl_searchbox">
		<div>
			<input name="wi999" class="wr" id="wi999" type="checkbox" checked="checked"/>
			<label class="wrapped ml20x" for="wi999">Поисковый конструктор:</label>
			<div id="bconstruct" class="expl1">
				<textarea id="searchbox" onkeyup="setElastic(this)" onmouseup="setElastic(this)" onfocus="setElastic(this)" onblur="setElastic(this)"></textarea>
				<div class="aright">
					<!--<span id="helpconstructor"></span>-->
					<input type="button" class="button2" value="Очистить" onmousedown="clearSearchConstructor();"/>
					<input type="button" class="button3" value="Искать" onmousedown="searchFromConstructor();"/>
				</div>			
				<div class="elastic"></div>
				<div id="termtextbox"></div>
			</div>
		</div>
	</div>
	</div>
	</div>';
}
else
{
	$globaloutput.='<br/><br/><br/><div class="b acenter p30x f80 h250x">Поиск не производился.</div><br/><br/>';
	$globaloutput.='<div class="h50x"></div>
	</div><div class="td w30 vtop" id="bibl_searchbox">
		<div>
			<input name="wi999" class="wr" id="wi999" type="checkbox" checked="checked"/>
			<label class="wrapped ml20x" for="wi999">Поисковый конструктор:</label>
			<div id="bconstruct" class="expl1">
				<textarea id="searchbox" onkeyup="setElastic(this)" onmouseup="setElastic(this)" onfocus="setElastic(this)" onblur="setElastic(this)"></textarea>
				<div class="aright">
					<!--<span id="helpconstructor"></span>-->
					<input type="button" class="button2" value="Очистить" onmousedown="clearSearchConstructor();"/>
					<input type="button" class="button3" value="Искать" onmousedown="searchFromConstructor();"/>
				</div>			
				<div class="elastic"></div>
				<div id="termtextbox"></div>
			</div>
		</div>
	</div>
	</div>
	</div>';
}
echo $globaloutput;
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
}
else
{
	echo '<script>alert("Определение пользователя не найдено в системе!"); history.back();</script>';
}
?>
