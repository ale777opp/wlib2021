<?php
/*----- вывод дополнительных запросов - пример -----*/
$countresp=0;
$addoutput="";
$addresp=array();
foreach ($result as $arg => $val)
{
	$resp = strpos($arg, 'response_'); 
	if(($resp !== false) && ($arg != "response_0"))
	{
		$str="";
		$countiv=0;
		$countfs=0;
		$countfv=0;
		foreach ($val as $k => $v)
		{
			$iv=strpos($k, 'indx_');
			$fs=strpos($k, 'resultList_');
			$fv=strpos($k, 'result_');
			if($iv !== false)/*IndexView - словарь*/
			{
				if((isset($val->_addtitle)) && ($countiv == 0))
					$str.='<div class="addquery_title">'.$val->_addtitle.'</div>';
				$termin=$v->item;
				$from=$from = array("'", "\"", "\\");
				$to = array("[apos]", "[quot]", "[backslash]");
				$newtermin = str_replace($from, $to, $termin);
				$str.='<div title="Искать" onmousedown="searchVoc(\''.$val->_addlabel.'\',\''.$newtermin.'\',\''.$val->_iddb.'\')">'.$countresp.') '.$v->item.' - '.$v->size.'</div>';
				$countiv++;
			}
			if($fs !== false)/*FindSize - найдено в других БД*/
			{
				if((isset($val->_addtitle)) && ($countfs == 0))
					$str.='<div class="addquery_title">'.$val->_addtitle.'</div>';
				$ldb=$v->iddb_0->number;
				$item='dbs_'.$ldb;
				$title=$v->iddb_0->title;
				if(isset($fjson->$item->alias))
					$title=$fjson->$item->alias;
				$str.='<div id="d'.$ldb.'" title="Посмотреть" onmousedown="searchInBase(this)">'.$countresp.') '.$title.' - '.$v->size.'</div>';
				$countfs++;
			}
			if($fv !== false)/*FindView - историческая справка*/
			{
				$ao=$val->_addoutform.'_0';
				if(isset($v->$ao))
				{
					$harr=$v->$ao;
					$hlen = count ($harr);
					$href='';
					for($h=0; $h<$hlen; $h++)
					{
						$sres=strpos($harr[$h],'[HTML]')+6;
						if($sres !== false)
						{
							$href.=substr($harr[$h],$sres);
							break;
						}
					}
				}
				$str.='<div class="histrefheader" id="histrefheader" onmousedown="showHelpRef(\''.$href.'\')">'.$val->_addtitle.'</div>'."\n";
				$str.='<div id="helpdisplay" class="dn"></div>';
			}
		}
		$addresp[$countresp]=$str;
		$countresp++;
	}
}
if($countresp > 0)
{
	$acount=count($addresp);
	for($x=0;$x<$acount;$x++)
	{
		$addoutput.='<div id="addquery_'.$x.'">'.$addresp[$x].'</div>';
	}
	echo $addoutput;
}
/*----- конец вывод дополнительных запросов - пример -----*/

foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_'); 
	if($res !== false)
	{
		$count++;
		$rdb=$iddb;
		$realdb=$iddb;
		$realname='';
		$loadurl='';
		$flagseef='';
		$oquantity=0;
		$flagurl=false;
		$newsterm='';
		if(isset($value->sourceIddb))
		{
			$rdb=$value->sourceIddb;
		}
		if(isset($value->iddb))
		{
			$realdb=$value->iddb;
			$ritem='dbs_'.$realdb;
			$rditem='dbs_'.$rdb;
			if(isset($fjson->$ritem->loadurl))
				$loadurl=$fjson->$ritem->loadurl;
			if(isset($dbarr[$rdb])&&($ldb!=$rdb))
				$realname=$dbarr[$rdb];
			if((isset($fjson->$rditem))&&($ldb!=$rdb))
				$realname=$fjson->$rditem->alias;
			if(isset($fjson->$ritem->seef))
				$flagseef=$fjson->$ritem->seef;
		}
		$theid=htmlspecialchars($value->id);
		$theid=addslashes($theid);
		$mark='';
		$output='';
		if((isset($_POST['_auth']))||($flag45))
			$mark='<div class="td w3"><input type="checkbox" name="marker" value="'.$theid.'" style="margin: 0" class="'.$realdb.'"/></div>';
		$output.='<div class="searchrez" id="'.$theid.'">';
		if(isset($value->SHOTFORM_0->content_0))
		{
			$imgsrc='';
			if(((isset($fjson->$ritem->additional->nophoto))&&($fjson->$ritem->additional->nophoto)=="display"))
				$imgsrc.=THEIMGPATH.'/nophoto.png';
			$imgstr='';
			$slides='';
			$tabs='';
			$tabdivs='';
			$sb='';
			$see='';
			$seef='';
			$see7='';
			$socialtext='';
			$social='';
			$arr=$value->SHOTFORM_0->content_0;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				$pos=strpos($arr[$i], '>'); 
				$output.='<div class="output">';
				$res6=strpos($arr[$i], '[ISBN]');
				$cres=strpos($arr[$i], '[CONTENT]');
				if($cres !== false)
				{
					$slides.='<input type="hidden" name="tab" value="'.substr($arr[$i],$cres+9).'"/>';
				}
				elseif($res6 !== false)
				{
					if(((isset($fjson->$ritem->additional->googlb))&&($fjson->$ritem->additional->googlb)=="display"))
					{
						$sb=prepareISBN(substr($arr[$i], $pos+1));
						$output.='<input name="sb" type="hidden" class="isbn" value="'.$sb.'"/>';
					}
				}
				else
				{
					$term=$arr[$i];
					if((isset($result->response_0->_renew))&&($start == 0))
					{
						$htpath=THEPAGESPATH.'/index/_news/newbooks.html';
						if(file_exists($htpath))
						{
							$newsterm.=parseBB($term);
						}
					}
					if($i==0)
					{
						if($realname!="")
							$output.='<div class="aright c9">'.$realname.'</div>';
						$socialtext.=strip_tags($term);
						$term='<div class="fstr">'.($count+$start).'. '.$term.'</div>';
					}
					$finalterm=parseBB($term);
					if($lightstring!="")
						$finalterm=backlight($lightstring,$finalterm);
					$output.=$finalterm;
				}
				$output.='</div>';
			}
			if($slides!="")
			{
				$slides='<span class="titleslides" onclick="showSlidesCont(this)">'.$slides.'</span>';
			}
			foreach ($value->SHOTFORM_0 as $arg => $val)
			{
				$res2 = strpos($arg, 'action_');
				if($res2 !== false)
				{
					$rtitle="";
					if(isset ($val->title))
						$rtitle=$val->title;
					else
						$rtitle="Показать";
					if($val->id=='SEE1')
						$see.='<span class="'.$val->id.'" onmousedown="See(this,\''.$theid.'\',\'SEE1\',null,\''.$realdb.'\')">'.$rtitle.'</span>';
					if(($val->id=='SEE2')&&($flagseef!='hierarchical'))
						$see.='<span class="'.$val->id.'" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$rtitle.'</span>';
					if($val->id=='SEE8')
						$see.='<span class="'.$val->id.'" onmousedown="See8(\''.htmlspecialchars($val->arg, ENT_QUOTES).'\',\''.$realdb.'\')">'.$val->title.'</span>';
					if($val->id=='SEE4')
						$output.='<div class="output"><div class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$rtitle.'</span><div id="'.$val->id.''.$count.'" style="display: none"></div></div></div>';
					if($val->id=='URL')
					{
						if(!$flagurl)
						{
							if($loadurl=='link')
								$output.='<span class="URL"><a target="_blank" href="'.$val->arg.'">'.$rtitle.'</a></span>';
							else
								$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.$val->arg.'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$rtitle.'</span>';
						}
						$flagurl=true;
					}
					if($val->id=='SEEF')
					{
						$seefpos=strpos($val->title, 'Тома/выпуски'); 
						if(($seefpos !== false)&&($flagseef=='hierarchical'))
						{
							$seef.='<span class="SEEF" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">'.$val->title.'</span><div id="see'.$theid.'" class="seediv" style="display:none"></div>';
						}
						else
						{
							$termin=$val->arg;
							$from=$from = array("\'", "\"", "\\\\");
							$to = array("[apos]", "[quot]", "[backslash]");
							$newtermin = str_replace($from, $to, $termin);
							$pos1m = strpos($val->title, 'Первый МГМУ'); 
							$possc = strpos($val->title, 'Статьи/части'); 
							
							if(($pos1m === false)&&($possc === false))
							{
								$see.='<span class="SEEF" onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\')">'.$rtitle.'</span>';
							}
						}
					}
					if($val->id=='SEE7')
					{
						$see7.='<span class="SEE7">'.$val->title.'</span>';
					}
					if($val->id=='IMG')
					{
						$imgsrc=$val->arg;
					}
				}
			}
			if($newsterm!="")
			{
				$pict=$imgsrc;
				if($imgsrc=="")
					$pict=THEIMGPATH.'/nophoto.png';
				$textoutput.='<div class="slids" data-iddb="'.$realdb.'" data-id="'.$theid.'" onmousedown="searchItem(this)"><div class="img"><figure tabindex="1" style="background-image:url('.$pict.')"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title=""/></figure></div><div class="cont">'.$newsterm.'</div></div>'."\n";
			}
			if(isset($value->AVAILABLEEXEMPLARS_1))
			{
				if(isset($value->AVAILABLEEXEMPLARS_1->quantity))
					$oquantity=intval($value->AVAILABLEEXEMPLARS_1->quantity);
				else
					$oquantity=0;
			}
			else
				$oquantity=0;
			if(isset($value->LINEORD_0))
			{
				$larr=$value->LINEORD_0;
				$count1=0;
				foreach($larr as $llen) 
				{ 
					if($llen != "")
					{
						if(isset($linkarr["070"]))
						{
							if(!$flagurl)
							{
								if($llen=="065")
								{
									$output.='<p><span class="_065 el">Просмотр документа доступен только зарегистрированным читателям библиотеки</span></p>';
								}
								if((($llen=="058")||($llen=="069"))&&($count1 == 0))
								{
									$output.='<p><span class="_065 el">Просмотр документа доступен после авторизации</span></p>';
									$count1++;
								}
							}
						}
						else
						{
							if(isset($linkarr[$llen]))
							{
								if((($llen=="058")||($llen=="069"))&&($count1 == 0)&&(!$flagurl))
								{
									$output.='<div class="_'.$llen.'"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
									$count1++;
								}
								else
								{
									if(($llen!="058")&&($llen!="069"))
									{
										if($oquantity > 0)
										{
											$output.='<div class="_'.$llen.'"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
										}
									}
								}
							}
						}
					}
				}
			}
			
			$tabs.='<span title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
			$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
			if(isset($fjson->$ritem->bibcard))
			{
				$tabs.='<span title="card" class="add1" onmousedown="seeBibcard(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Карточка</span>';
				$tabdivs.='<div class="adddiv"  id="bib'.$count.'" style="display: none"></div>';
			}
			if(isset($fjson->$ritem->rusmarc))
			{
				$tabs.='<span title="rusmarc" class="add1" onmousedown="seeRusmarc(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$realdb.'\')">RUSMARC</span>';
				$tabdivs.='<div class="adddiv"  id="rusm'.$count.'" style="display: none"></div>';
			}
			if($see!="")
			{
				$tabs.='<span title="links" class="add2 border" onmousedown="showHide2(this,\'link'.$count.'\')">Связанные записи</span>';
				$tabdivs.='<div class="adddiv" id="link'.$count.'">'.$see.'</div>';
			}
			if($seef!="")
			{
				$tabs.='<span title="part" class="add1" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">Тома/выпуски</span>';
				$tabdivs.='<div class="adddiv" id="see'.$theid.'" style="display:none"></div>';
			}
			if(isset($fjson->$ritem->place))
			{
				if($see7!="")
				{
					$tabs.='<span title="place" class="add1" onmousedown="seePlace(this,\''.$theid.'\',\''.$count.'\',\''.$rdb.'\')">Местонахождение</span>';
					$tabdivs.='<div class="adddiv" id="place'.$count.'" style="display:none"></div>';
				}
			}
			$output.='<div class="tabs">'.$tabs.'</div><div class="tabdivs">'.$tabdivs.'</div>';
			
			if($imgsrc!="")
				$imgstr='<figure tabindex="1"><img border="0" hspace="0" vspace="0" alt="" title="" src="'.$imgsrc.'"/></figure>';
			else
			{
				$imgstr='<span><cite';
				if($sb!='')
					$imgstr.=' id="ISBN'.$sb.'"';
				$imgstr.='><span class="book" tabindex="1"><ul class="paperback_front"><li></li></ul><ul class="ruled_paper"><li></li><li></li><li></li><li></li><li></li></ul><ul class="paperback_back"><li></li></ul></span></cite></span>';
			}
			if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
			{
				$social='<span class="social w88x"><input type="hidden" name="purl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
			}
			if(((isset($fjson->$ritem->additional->scopy))&&($fjson->$ritem->additional->scopy)=="display"))
			{
				$social.='<span class="scopy w88x"><input style="height:1px;opacity:0" type="text" name="surl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$iddb.'&ID='.$theid.'"/><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)">Скопировать ссылку</span></span>';
			}
			echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$social.'</div><div class="td vtop pr5x">'.$output.'</div></div></div>';
		}
		echo '</div>';
	}
}
?>