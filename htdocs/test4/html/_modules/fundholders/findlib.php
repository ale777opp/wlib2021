<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Библиотеки</span></div>';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	if(isset($response0->_length))
		$length=$response0->_length;
	$globaloutput.='<div class="spacer"></div><div id="searchhead"><span><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$response0->_showstr.'</span><br/><b>Найдено записей: </b><b class="highlight">'.$size.'</b></span></div><div class="spacer"></div><div class="col_content">';
	if(intval($size)==0)
	{
		$globaloutput.='<br/><br/><div class="b acenter">По Вашему запросу ничего не найдено.</div></div></div>';
	}
	else
	{
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'1').'</p>';
		}
		$globaloutput.='<div class="table w100">';
		$count=0;
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$flag="";

				$mark='<div class="td w3">'.($start+$count).'.</div>';
				$title='';
				$addr='';
				$tabtext='';
				$skin="";
				$sigla="";
				foreach ($value as $arg => $val)
				{
					if(isset($val->AFANNOTTEXT_0))
					{
						$t=$val->AFANNOTTEXT_0->title;
						foreach ($val->AFANNOTTEXT_0 as $sign => $entry)
						{
							$res2 = strpos($sign, 'entries_');
							if($res2 !== false)
							{
								if(isset($entry->text))
								{
									if($t=="Title")
										$title.=$entry->text;
									elseif($t=="Addresse")
										$addr.=$entry->text;
									elseif($t=="Internet")
									{
										$arr=explode('[END]', $entry->text);
										$posc = stripos($arr[0], 'Каталог ');
										if($arr[0]=="Интернет-сайт")
										{
											if(isset($arr[1]))
												$tabtext.='<a class="aflinkinfo" target="_blank" href="'.$arr[1].'">Интернет-сайт</a>';
										}
										elseif($arr[0]=="Электронный каталог")
										{
											if(isset($arr[1]))
												$tabtext.='<a class="aflinkinfo" target="_blank" href="'.$arr[1].'">Электронный каталог</a>';
										}
										elseif($arr[0]=="SKBR")
										{
											$skin=$arr[1];
										}
										elseif($posc !== false)
										{
											if(isset($arr[1]))
											{
												if(isset($arr[2]))
													$sigla=$arr[2];
												$tabtext.='<span class="aflinkinfo addfilter" onclick="addLibToSearch(this)">Добавить фильтр к поиску</span><input type="hidden" value="'.$sigla.'" name="sigla"/>';
												$tabtext.='<input type="hidden" value="'.$sigla.'" name="sigla"/>';
												$tabtext.='<span class="aflinkinfo searchbibl" onclick="searchLibRecs(this)">Искать в каталоге</span>';
											}
										}
										else
										{
											$tabtext.='';
										}
									}
									else
									{
										$tabtext.='';
									}
								}
							}
						}
					}
				}
				$globaloutput.='<div class="row checked">'.$mark.'<div class="td"><p class="afurl">'.$title.'</p><p class="afdescription">';
				$globaloutput.=$addr;
				$globaloutput.='</p></div><div class="td w15" id="'.$value->id.'"><span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id)">О библиотеке</span>'.$tabtext.'</div></div>';
			}
		}
		$globaloutput.='</div>';
		if($N1!= 1)
		{
			$globaloutput.='<div class="spacer"></div>';
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'1').'</p>';
		}
		$globaloutput.='</div><div class="spacer"></div></div>';
	}
}
else
{
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
