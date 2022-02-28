<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div>';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	list($rvars, $realname) = printResponseVars($result,"");
	echo $rvars;
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	$start=intval($result->_start);
	$prev=intval($result->_prev);
	$next=intval($result->_next);
	$response0=$result->response_0;
	$size=intval($response0->size);
	$length=10;
	$outform="SHOTFORM";
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($result->response_0->_outform))
		$outform=$result->response_0->_outform;
	$checkmarks='';
	if(isset($_POST['_auth']))
	{
		$checkmarks='<div class="searchrez"><div class="table w100"><div class="row f80"><div class="td w3 vmiddle"><input type="checkbox" onclick="Mark(this)" id="mark" value=""/></div><div class="td p10x"><div class="fright"><input type="button" class="button2" value="Список литературы" onmousedown="showOrderList();"/><input id="orderlist" type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/></div><div class="fleft"><input type="button" class="button2" value="В список литературы" onmousedown="toOrderList();"/></div></div></div></div></div>';
	}
	else
	{
		if(($outform!="SHOTFORM")&&($outform!="BRIEFFORM")&&($outform!="SHORTWEB")&&($outform!="SHOTWEB"))
			$checkmarks='<div class="searchrez"><div class="table w100"><div class="row f80"><div class="td w3 vmiddle"><input type="checkbox" onclick="Mark(this)" id="mark" value=""/></div><div class="td p10x"><div class="fright"><input type="button" class="button2" value="Список литературы" onmousedown="showOrderList();"/></div><div class="fleft"><input type="button" class="button2" value="В список литературы" onmousedown="toOrderList();"/></div></div></div></div></div>';
	}
	include (THEPAGESPATH.'/includes/searchdiv.php');
	if(intval($size)==0)
	{
		include (THEINCLUDESPATH.'/errorpage.php');
	}
	else
	{
		$globaloutput.='<div class="spacer"></div><div id="searchhead">';
		$buttonscont='<div class="fright">';
		if($prev!= "")
			$buttonscont.='<input type="button" class="button2" value="&#8249; Назад" onmousedown="fulltextSearch('.$prev.');"/>';
		if($next!= "")
			$buttonscont.='<input type="button" class="button2" value="Далее &#8250;" onmousedown="fulltextSearch('.$next.');"/>';
		$buttonscont.='</div>';
		$globaloutput.=$buttonscont;
		$globaloutput.='<span><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$result->_showstr.'</span></span><div class="spacer"></div></div></div>';
		$globaloutput.='<div class="col_content"><div id="searchrezult" class="w100">'.$checkmarks;
		$count=-1;
		$textoutput="";
		$ldb=$response0->_iddb;
		echo $globaloutput;	
		include '_output/'.$outform.'.php';
		echo '</div></div>';

		/*$count=-1;
		echo '<div id="fullrezult" style="width:100%">';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_'); 
			if($res !== false)
			{
				$count++;
				if($count % 2 == 0)
				{
					echo '<div class="searchrez1">';
				}
				else
				{
					echo '<div class="searchrez">';
				}
				echo '<b style="float:left">'.($count+$start).'. </b>';
				if(isset($value->EC_VIEW_0))
				{
					$arr=$value->EC_VIEW_0;
					$len = count ($arr);
					for($i=0; $i<$len; $i++)
					{
						echo $arr[$i];
					}
				}
				echo '</div>';
			}
		}
		echo '</div>';
		echo '<p class="pages">';
		if($prev!= "")
		{
			echo '<input type="button" class="button6" value="« Назад" onmousedown="fulltextSearch('.$prev.');"/>';
		}
		if($next!= "")
		{
			echo '<input type="button" class="button6" value="Далее »" onmousedown="fulltextSearch('.$next.');"/>';
		}
		echo '</p>';*/
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');