<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$label="0";
	$usesort="";
	if(isset($response0->_usesort))
		$usesort=$response0->_usesort;
	if(isset($response0->_usesortlabel))
		$label=$response0->_usesortlabel;
	if((isset($result->response_0->_sortlabel))&&($result->response_0->_sortlabel!=""))
		$label=$result->response_0->_sortlabel;
	$showstr="";
	if(isset($result->_showstr))
		$showstr=$result->_showstr;
	if(isset($response0->_showstr))
		$showstr=$response0->_showstr;
	$bibliosearch="";
	if(isset($response0->_bibliosearch))
		$bibliosearch=$response0->_bibliosearch;
	$solr="";
	if(isset($response0->_solr))
		$solr=$response0->_solr;
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
	$searchtitle="Результаты поиска";
	if(isset($result->response_0->_searchtitle))
		$searchtitle=$result->response_0->_searchtitle;
	$start=intval($result->_start);
	$size=intval($result->_size);
	$length=10;
	$outform="SHOTFORM";
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($result->response_0->_outform))
		$outform=$result->response_0->_outform;
	$newsquant=$length;
	if(isset($fjson->newsquant))
		$newsquant=intval($fjson->newsquant);
	if(isset($result->response_0->_newsquant))
		$newsquant=intval($result->response_0->_newsquant);
	$newsoutform="";
	if(isset($result->response_0->_newsoutform))
		$newsoutform=$result->response_0->_newsoutform;
	$linkarr=array();
	$linkstring="";
	$ind="";
	if(isset($response0->_ind))
		$ind=$response0->_ind;
	$codemenu="";
	if(isset($response0->_codemenu))
		$codemenu=$response0->_codemenu;
	if(isset($response0->_linkstring))
		$linkstring=$response0->_linkstring;
	if($linkstring!="")
	{
		$arr1=explode('[END]', $linkstring);
		$larr1=count ($arr1);
		if($larr1>0)
		{
			for($i=0; $i<$larr1; $i++)
			{
				if($arr1[$i]!="")
				{
					$arr2=explode('[ID]', $arr1[$i]);
					$larr2=count ($arr2);
					if($arr2[0]!="")
					{
						$linkarr[$arr2[0]]=$arr2[1];
					}
				}
			}
		}
	}
	$dbarr=array();
	foreach ($response0 as $k => $v)
	{
		$resk = strpos($k, 'iddb_'); 
		if($resk !== false)
		{
			$dbarr[$v->number]=$v->title;
		}
	}
	$lightstring="";
	if(isset($response0->_lightstring))
		$lightstring=$response0->_lightstring;
	$checkmarks='';
	if((!isset($_POST['_auth']))&&(!$flag45)&&(isset($fjson->listlit)))
	{
		$checkmarks='<div class="searchrez"><div class="table w100"><div class="row f80"><div class="td w3 vmiddle"><input type="checkbox" onclick="Mark(this)" id="mark" value=""/></div><div class="td pb10x"><div class="fright"><input type="button" class="button2" value="Список литературы" onmousedown="showOrderList();"/></div><div class="fleft"><input type="button" class="button2" value="В список литературы" onmousedown="toOrderList();"/></div></div></div></div></div>';
	}
	if((isset($_POST['_auth']))||($flag45))
	{
		$checkmarks='<div class="searchrez"><div class="table w100"><div class="row f80"><div class="td w3 vmiddle"><input type="checkbox" onclick="Mark(this)" id="mark" value=""/></div><div class="td pb10x"><div class="fright"><input type="button" class="button2" value="Список литературы" onmousedown="showOrderList();"/><input id="orderlist" type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/></div><div class="fleft"><input type="button" class="button2" value="В список литературы" onmousedown="toOrderList();"/></div></div></div></div></div>';
	}
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	$globaloutput.=$searchtitle.'</span></div><div id="searchhead">';
	if(isset($result->response_0->_see))
	{
		$globaloutput.='<div class="fright"><input type="button" class="button2" value="Вернуться к поиску" onmousedown="nextSearch();"/></div>';
	}
	else
	{
		if($usesort != "")
		{
			$globaloutput.='<div class="fright"><b>Сортировать по:</b><br/><select name="sortlab" id="sortlab" onchange="nextSearch()">';
			$rsortpath=THEFOLDERNAME.'/_conf/sort.conf';
			$globaloutput.='<option value="0"';
			if($label=="0")
				$globaloutput.=' selected="selected"';
			$globaloutput.='></option>';
			if(file_exists($rsortpath))
			{
				$rsortrezult = file_get_contents($rsortpath);
				$rsortjson=json_decode($rsortrezult);
				foreach ($rsortjson as $a => $b)
				{
					$globaloutput.='<option value="'.$a.'"';
					if($label==$a)
						$globaloutput.=' selected="selected"';
					$globaloutput.='>'.$b.'</option>';
				}
			}
			else
			{
				$globaloutput.='<option value="PY"';
				if($label=="PY")
					$globaloutput.=' selected="selected"';
				$globaloutput.='>Году публикации</option>';
				$globaloutput.='<option value="DT"';
				if($label=="DT")
					$globaloutput.=' selected="selected"';
				$globaloutput.='>Дате поступления</option>';
				$globaloutput.='<option value="AU"';
				if($label=="AU")
					$globaloutput.=' selected="selected"';
				$globaloutput.='>Автору</option>';
				$globaloutput.='<option value="TI"';
				if($label=="TI")
					$globaloutput.=' selected="selected"';
				$globaloutput.='>Заглавию</option>';
			}
			$globaloutput.='</select></div>';
		}
	}
	$globaloutput.='<div><span class="dib mt5x mb5x"><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$showstr;
	if(isset($response0->_fshowstr))
		$globaloutput.=' И '.$response0->_fshowstr;
	if(isset($response0->_rshowstr))
	{
		if($showstr!="")
			$globaloutput.=' И ';
		$globaloutput.=$response0->_rshowstr;
	}
	$globaloutput.='</span><br/><b>Найдено записей:&#160;</b><b class="highlight">'.$size.'</b></span><b id="editq" style="display:none"><span onmousedown="editQuery()">Искать в найденном</span><i> (Редактировать поисковое выражение)</i></b>';
	$globaloutput.='<span id="linktosearch"><input style="height:1px;opacity:0" type="text" name="surl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$iddb.'"/><span title="Скопировать ссылку на результаты поиска" onclick="copySearchToClip(this)">Скопировать ссылку на результаты поиска</span></span>';$globaloutput.='</div>';
	if((($bibliosearch!="")||($solr!=""))&&(isset($response0->_lockedfilters)))
	{
		$globaloutput.='<div class="f_container"><div class="f_title">Выбраны фасеты:</div>';
		$larr=explode('[END]', $response0->_lockedfilters);
		$lllen=count ($larr);
		for($j=0; $j<$lllen; $j++)
		{
			if($larr[$j]!="")
			{
				$tpos = strpos($larr[$j], '[TITLE]');
				$npos = strpos($larr[$j], '[NAME]');
				$rpos = strpos($larr[$j], '[ROLE]');
				$vpos = strpos($larr[$j], '[VALUE]');
				$globaloutput.='<div class="ffacets">';
				$globaloutput.='<div class="title">'.substr(substr($larr[$j],0,$npos),$tpos+7).'</div>';
				$globaloutput.='<div>';
				$globaloutput.='<div class="'.substr(substr($larr[$j],0,$rpos),$npos+6).'">';
				$globaloutput.='<span class="checked" title="ОТМЕНИТЬ" onclick="appendFacet(this)">'.substr($larr[$j],$vpos+7).'</span>';		
				$globaloutput.='<i class="'.substr(substr($larr[$j],0,$vpos),$rpos+6).'">';
				$globaloutput.='</i>';		
				$globaloutput.='</div>';		
				$globaloutput.='</div>';
				$globaloutput.='</div>';
			}
		}
		$globaloutput.='</div>';
	}
	$globaloutput.='</div><div class="col_content">';
	echo $globaloutput;		
	$ldb=$response0->_iddb;
	$item='dbs_'.$ldb;
	$sr="";
	$sw=' style="width:100%"';
	$flagsw=false;
	$colcounter=0;
	if(intval($size)==0)
	{
		if(isset($fjson->$item->filters))
		{
			echo '<div id="menu_button_filters" onmousedown="showHideM(\'filters\')">Ограничить поиск</div><div id="filters" class="block">';
			include (THEINCLUDESPATH.'/'.$item.'filters.php');
			echo '</div>';
			$sw="";
			$flagsw=true;
		}
		if(isset($fjson->$item->rubricator))
		{
			if(isset($fjson->$item->rubricator->display)&& ($fjson->$item->rubricator->display == 'inside'))
			{
				echo '<div id="menu_button_rubricator" onmousedown="showHideM(\'rubricator\')">Рубрикатор</div><div id="rubricator" class="block"><div class="title">'.$fjson->$item->rubricator->name.'</div>';
				$xmlfile=$historyfolder.'rubricator/'.$fjson->$item->rubricator->path;
				$xml = new DOMDocument('1.0'); 
				$xml->formatOutput = true; 
				$xml->preserveWhiteSpace = false; 
				$xml->load($xmlfile);
				$tags = $xml->getElementsByTagName('rubricator');
				$rnode = $tags->item(0);
				showTree($rnode,1,$folderName);
				echo '</div>';
				if($flagsw)
					$sw=' style="width:50%"';
				else
					$sw="";
			}
		}
		echo '<div id="searchrezult"'.$sw.'>';
		include (THEINCLUDESPATH.'/errorpage.php');
		if(isset($fjson->$item->filters))
		{
			echo '</div>';
		}
	}
	else
	{
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			echo '<p class="pages">';
			if(isset($response0->_see))
				echo resPaginator($start,$length,$size,NULL,'0');
			elseif(isset($response0->_newrecs))
			{
				echo resPaginator($start,$length,$size,NULL,'7');
			}
			else
				echo resPaginator($start,$length,$size,NULL,NULL);
			echo '</p>';
		}
		$count=0;
		$textoutput="";
		$linordcount=-1;
		if(isset($fjson->$item->filters))
		{
			/*$sw="";
			$flagsw=true;*/
			$colcounter=1;
			echo '<div id="menu_button_filters" onmousedown="showHideM(\'filters\')">Ограничить поиск</div><div id="filters" class="block">';
			include (THEINCLUDESPATH.'/'.$item.'filters.php');
			echo '</div>';
		}
		if($bibliosearch!="")
		{
			/*$sw="";*/
			$colcounter=1;
			$facetpath=THEHISTORYPATH.'/'.$nsean.'/facet.conf';
			$rfacetpath=THEFOLDERNAME.'/_conf/facets.conf';
			if(file_exists($facetpath))
			{
				$foutput='';
				$foutput.='<div id="menu_button_facets" onmousedown="showHideM(\'facets\')">Ограничить поиск</div><div id="facets" class="block">';
				$facetrezult = file_get_contents($facetpath);
				$facetjson=json_decode($facetrezult);
				$rfacetrezult = file_get_contents($rfacetpath);
				$rfacetjson=json_decode($rfacetrezult);
				if(isset($facetjson->facets))
				{
					$fcarr=$facetjson->facets;
					$fclen = count ($fcarr);
					foreach ($rfacetjson as $rkey => $rvalue)
					{
						for($i=0; $i<$fclen; $i++)
						{
							if($rkey==$fcarr[$i]->name)
							{
								if(isset($fcarr[$i]->buckets))
								{
									$backet=$fcarr[$i]->buckets;
									if(is_array($backet))
									{
										$lbacket=count ($backet);
										if($lbacket > 0)
										{
											$foutput.='<div class="facets"><div class="title">'.$rfacetjson->$rkey->title.'</div>';
											$xarr=array();
											$yarr=array();
											$x=0;
											$y=0;
											$z=0;
											for($j=0;$j<$lbacket;$j++)
											{
												
												$xarr[$x]='<div class="'.$fcarr[$i]->name.'"><span class="unchecked" title="УТОЧНИТЬ"  onclick="appendFacet(this)">'.$backet[$j]->key.'</span><i class="'.$fcarr[$i]->isRole.'">'.$backet[$j]->count.'</i></div>';
												$x++;
												$z++;
												if($x % 5 == 0)
												{
													$yarr[$y]=$xarr;
													$x=0;
													$y++;
													$xarr=array();
												}
												if($z == $lbacket)
												{
													if(count($xarr) > 0)
														$yarr[$y]=$xarr;
													$x=0;
													$y=0;
													$z=0;
													$xarr=array();
												}
											}
											$ycount=count($yarr);
											for($a=0;$a<$ycount;$a++)
											{
												$style='';
												if($a>0)
													$style=' style="display:none"';
												$foutput.='<div class="table w100"'.$style.'>';
												if($a>0)
													$foutput.='<div onclick="facetsBack(this)"><span class="even">назад</span><span></span></div>';
												$acount=count($yarr[$a]);
												for($b=0;$b<$acount;$b++)
												{
													$foutput.=$yarr[$a][$b];
												}
												if($lbacket>5)
												{
													if($acount==5)
													{
														if(isset($yarr[$a+1]))
														{
															if($a<$ycount)
																$foutput.='<div onclick="facetsNext(this)"><span></span><span class="else">далее</span></div>';
														}
													}
												}
												$foutput.='</div>';
											}
											$foutput.='</div>';
										}
									}
								}
							}
						}
					}
				}
				$foutput.='</div>';
				echo $foutput;
			}
		}
		if($solr!="")
		{
			/*$sw="";
			$flagsw=true;*/
			$foutput='';
			foreach ($response0 as $a => $b)
			{
				$posa = strpos($a, 'facets_'); 
				if($posa !== false)
				{
					$colcounter=1;
					$role=$b->name;
					$fcls=' '.$fjson->$item->labels->$role->display;
					$foutput.='<div class="facets'.$fcls.'"><div onmousedown="toggleWrap(this)" class="title">'.$fjson->$item->labels->$role->title.'</div>';
					$backet=array();
					foreach ($b as $c => $d)
					{
						$posb = strpos($c, 'buckets_');
						if($posb !== false)
						{
							$backet[]=array($d->value,$d->count);
						}
					}
					$lbacket=count($backet);
					$xarr=array();
					$yarr=array();
					$x=0;
					$y=0;
					$z=0;
					for($j=0;$j<$lbacket;$j++)
					{
						$xarr[$x]='<div class="'.$b->name.'"><span class="unchecked" title="УТОЧНИТЬ"  onclick="appendFacet(this)">'.$backet[$j][0].'</span><i class="'.$role.'">'.$backet[$j][1].'</i></div>';
						$x++;
						$z++;
						if($x % 5 == 0)
						{
							$yarr[$y]=$xarr;
							$x=0;
							$y++;
							$xarr=array();
						}
						if($z == $lbacket)
						{
							if(count($xarr) > 0)
								$yarr[$y]=$xarr;
							$x=0;
							$y=0;
							$z=0;
							$xarr=array();
						}
					}
					$ycount=count($yarr);
					for($j=0;$j<$ycount;$j++)
					{
						$style='';
						if($j>0)
							$style=' style="display:none"';
						$foutput.='<div class="table w100"'.$style.'>';
						if($j>0)
							$foutput.='<div onclick="facetsBack(this)"><span class="even">назад</span><span></span></div>';
						$acount=count($yarr[$j]);
						for($m=0;$m<$acount;$m++)
						{
							$foutput.=$yarr[$j][$m];
						}
						if($lbacket>5)
						{
							if($acount==5)
							{
								if(isset($yarr[$j+1]))
								{
									if($j<$ycount)
										$foutput.='<div onclick="facetsNext(this)"><span></span><span class="else">далее</span></div>';
								}
							}
						}
						$foutput.='</div>';
					}
					$foutput.='</div>';
				}
			}
			if($foutput != '')
			{
				$foutput='<div id="menu_button_facets" onmousedown="showHideM(\'facets\')">Ограничить поиск</div><div id="facets" class="block">'.$foutput.'</div>';
				echo $foutput;
			}
		}
		if(isset($result->response_0->_newrecs))
		{
			$sr='rubnewrecs ';
			$month=date('m').'';
			$month_number=$month;
			$year=date('Y').'';
			$year_number=intval($year);
			$month_num=intval($month_number)-1;
			if(isset($result->response_0->_year))
				$year_number=intval($result->response_0->_year);
			if(isset($result->response_0->_month))
				$month_number=$result->response_0->_month;
			$month_class=intval($month_number)-1;
			/*if($flagsw)
				$sw=' style="width:50%"';
			else
				$sw="";*/
			$colcounter++;
			echo '<div class="calendar_container">';
			include '_additional/calendar.php';
			echo '</div>';
		}
		if(isset($fjson->$item->rubricator))
		{
			if(isset($fjson->$item->rubricator->display)&& ($fjson->$item->rubricator->display == 'inside'))
			{
				/*if($flagsw)
					$sw=' style="width:50%"';
				else
					$sw="";*/
				$colcounter++;
				echo '<div id="menu_button_rubricator" onmousedown="showHideM(\'rubricator\')">Рубрикатор</div><div id="rubricator" class="'.$sr.'block"><div class="title">'.$fjson->$item->rubricator->name.'</div>';
				$xmlfile=$historyfolder.'rubricator/'.$fjson->$item->rubricator->path;
				$xml = new DOMDocument('1.0'); 
				$xml->formatOutput = true; 
				$xml->preserveWhiteSpace = false; 
				$xml->load($xmlfile);
				$tags = $xml->getElementsByTagName('rubricator');
				$rnode = $tags->item(0);
				showTree($rnode,1,$folderName);
				echo '</div>';
			}
		}
		if($colcounter == 1)
			$sw="";
		if($colcounter >=2)
			$sw=' style="width:50%"';
		echo '<div id="searchrezult"'.$sw.'>'.$checkmarks;
		include '_output/'.$outform.'.php';
		echo '</div>';
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			echo '<p class="pages">';
			if(isset($response0->_see))
				echo resPaginator($start,$length,$size,NULL,'0');
			elseif(isset($response0->_newrecs))
			{
				echo resPaginator($start,$length,$size,NULL,'7');
			}
			else
				echo resPaginator($start,$length,$size,NULL,NULL);
			echo '</p>';
		}
		if((isset($result->response_0->_renew))&&($start == 0)&&($count >= $newsquant))
		{
			if($textoutput!="")
			{
				$npath='/index/_news/newbooks.html';
				if(isset($result->response_0->_newspath))
					$npath=$result->response_0->_newspath;
				$htpath=THEPAGESPATH.''.$npath;
				writeFile($htpath,$textoutput);
			}
		}
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $searchtitle.'</span></div>'.$globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
echo '<div class="h50x"></div></div></div>';
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
