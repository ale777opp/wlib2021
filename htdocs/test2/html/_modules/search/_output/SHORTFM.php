<?php  
foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_');
	$rdb=$iddb;
	$realdb=$iddb;
	$realname='';
	$loadurl='';
	$flagseef='';
	if($res !== false)
	{
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
		$count++;
		$theid=htmlspecialchars($value->id);
		$theid=addslashes($theid);
		$mark='';
		$output='';
		if((isset($_POST['_auth']))||($flag45)||(isset($fjson->listlit)))
			$mark='<div class="td w3"><input type="checkbox" name="marker" value="'.$theid.'" style="margin: 0" class="'.$realdb.'"/></div>';
		echo '<div class="searchrez" id="'.$theid.'">';
		$imgsrc='';
		if(((isset($fjson->$ritem->additional->nophoto))&&($fjson->$ritem->additional->nophoto)=="display"))
			$imgsrc.=THEIMGPATH.'/nophoto.png';
		$imgstr='';
		$slides='';
		$sb='';
		$see='';
		$see7='';
		$see6='';
		$seef='';
		$libs=array();
		$libraries='';
		$tabs='';
		$tabdivs='';
		$search='';
		$socialtext='';
		$social='';
		$resflstr='';
		//$biblink='';
		$countlibs=0;
		$flagurl=false;
		if(isset($value->SHORTFM_0))
		{
			$arr=$value->SHORTFM_0;
			$len = count ($arr);
			$output.='<div class="output">';
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$res7=strpos($arr[$i], '[IMG]'); 
					$res6=strpos($arr[$i], '[ISBN]');
					$cres=strpos($arr[$i], '[CONTENT]');
					$res5=strpos($arr[$i], '[SEE'); 
					$res1=strpos($arr[$i], '[SEE1]'); 
					$res2=strpos($arr[$i], '[SEE2]');
					$resf=strpos($arr[$i], '[SEEF]'); 
					$res4=strpos($arr[$i], '[SEE4]'); 
					$res77=strpos($arr[$i], '[SEE7]'); 
					$res66=strpos($arr[$i], '[SEE6]'); 
					$res88=strpos($arr[$i], '[SEARCHTITLE]'); 
					$rlike=strpos($arr[$i], '[LIKE]'); 
					$rlike1=strpos($arr[$i], '[/LIKE]'); 
					$resfl=strpos($arr[$i], '[FLIPPINGBOOK]');
					$res3=strpos($arr[$i], '[URL]');
					$resins=strpos($arr[$i], '[INSERT]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					if($res7 !== false)
					{
						$imgsrc=substr($arr[$i], $res7+5);
					}
					elseif($rlike !== false)
					{
						$sstr=substr($arr[$i],0,$rlike1);
						$sstr=substr($sstr,$rlike+6);
						$dpos=strpos($sstr, '['); 
						$dpos1=strpos($sstr, ']'); 
						if($dpos!==false)
						{
							$rlabel=substr($sstr,$dpos);
							$rlabel=substr($rlabel,$dpos1);
							$ssstr=substr($sstr,$dpos1);
							$output.='<u title="посмотреть похожие записи" class="'.$rlabel.'" onmousedown="showLable(this)">'.$ssstr.'</u>';
						}
					}
					elseif($res4 !== false)
					{
						$output.='<span class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$str.'</span><div id="SEE4'.$count.'" style="display:none"></div></span>';
					}
					elseif($res5 !== false)
					{
						if($res1 !== false)
						{
							$see.='<span class="SEE1" onmousedown="See(this,\''.$theid.'\',\'SEE1\',null,\''.$realdb.'\')">'.$str.'</span>';
						}
						if(($res2 !== false)&&($flagseef!='hierarchical'))
						{
							$see.='<span class="SEE2" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$str.'</span>';
						}
						if($resf !== false)
						{
							if(($str=="Тома/выпуски")&&($flagseef=='hierarchical'))
							{
								$seef.='<span class="SEEF" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$str.'</span><div id="see'.$theid.'" class="seediv" style="display:none"></div>';
							}
							else
							{
								$termin=substr($arr[$i], $pos+1);
								$from=$from = array("'", "\"", "\\");
								$to = array("[apos]", "[quot]", "[backslash]");
								$newtermin = str_replace($from, $to, $termin);
								$pos1m = strpos($str, 'Первый МГМУ'); 
								$possc = strpos($str, 'Статьи/части'); 
								$postv = strpos($str, 'Тома/выпуски'); 
								if($postv !== false)
									$str='Включает';
								if($possc !== false)
								{
									$see.='<span class="SEEF" onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\',this.innerHTML)">'.$str.'</span>';
								}
								else
								{
									if($pos1m === false)
									{
										$see.='<span class="SEEF" onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\')">'.$str.'</span>';
									}
								}
							}
						}
						if($res77 !== false)
						{
							$see7.='<span class="SEE7">'.$str.'</span>';
						}
						if($res66 !== false)
						{
							$see6.='<span class="SEE6">'.$str.'</span>';
						}
					}
					elseif($res6 !== false)
					{
						if(((isset($fjson->$ritem->additional->googlb))&&($fjson->$ritem->additional->googlb)=="display"))
						{
							$sb=prepareISBN(substr($arr[$i], $pos+1));
							$output.='<input name="sb" type="hidden" class="isbn" value="'.$sb.'"/>';
						}
					}
					elseif($res88 !== false)
					{
						$searchtitle.='<input name="search_title" type="hidden" class="search_title" value="'.substr($arr[$i], $pos+1).'"/>';
					}
					elseif($cres !== false)
					{
						$slides.='<input type="hidden" name="tab" value="'.substr($arr[$i],$cres+9).'"/>';
					}
					elseif($resfl !== false)
					{
						$resflstr.='<b class="mobi" title="Доступен просмотр через мобильное приложение"><img alt="" src="/wlib/wlib/img/mobi.png" hspace="0" vspace="0" border="0" align="middle"/></b>';
					}
					elseif($res3 !== false)
					{
						if(!$flagurl)
						{
							if($loadurl=='link')
								$output.='<span class="URL"><a target="_blank" href="'.substr($arr[$i], $pos+1).'">'.$str.'</a></span>';
							else
								$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.substr($arr[$i], $pos+1).'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$str.'</span>';
						}
						$flagurl=true;
					}
					elseif($resins !== false)
					{
						$term=substr($arr[$i], $pos+1);
						$finalterm=parseBB($term);
						if($lightstring!="")
							$finalterm=backlight($lightstring,$finalterm);
						$output.='<span class="cb"><span class="add1" onmousedown="showHide(this)">'.$str.'</span><div style="display:none">'.$finalterm.'</div></span>';
					}
					else
					{
						$term=$arr[$i];
						$socialtext.=strip_tags($term);
						if($i==0)
						{
							if($realname!="")
								$output.='<div class="aright c9">'.$realname.'</div>';
							$term=substr($term, 5);
							$term='<div class="fstr">'.($count+$start).'. '.$term;
						}
						//$biblink=$finalterm=parseBB($term);
						$finalterm=parseBB($term);
						if($lightstring!="")
							$finalterm=backlight($lightstring,$finalterm);
						$output.=$finalterm;
					}
				}
			}
			$output.='</div>';
		}
		if($slides!="")
		{
			$slides='<span class="titleslides" onclick="showSlidesCont(this)">'.$slides.'</span>';
		}
		if(isset($value->highlighting_0))
		{
			$harr=$value->highlighting_0->snippets_0;
			$hlen = count ($harr);
			if($harr > 0)
			{
				$output.='<div class="lighttitle"><input name="wi'.($count+$start).'" class="hlight" id="wi'.($count+$start).'" type="checkbox"/><label for="wi'.($count+$start).'">Найдено в тексте документа</label><div class="backlight">';
				for($i=0; $i<$hlen; $i++)
				{
					$output.='<div>'.$harr[$i].'</div>';
				}
				$output.='</div></div>';
			}
		}
		if(isset($value->SHORTFMSTR_3))
		{
			$starr=$value->SHORTFMSTR_3;
			$stlen=count ($starr);
			for($i=0; $i<$stlen; $i++)
			{
				if($starr[$i]!="")
				{
					$tress=strpos($starr[$i], '[SEARCH]');
					if($tress !== false)
					{
						$search=substr($starr[$i],$tress+8);
					}
				}
			}
		}
		$libstext='';
		if(isset($value->SHORTFMS_2))
		{
			$sstr=$value->SHORTFMS_2[0];
			$spos=strpos($sstr, '[UR]');
			
			if($spos !== false)
			{
				$uspos=strpos($sstr, '[UR][/UR]');
				if($uspos !== false)
				{
					$sstr=str_replace($uspos,'',$sstr);
				}
				$libs=explode('[/UR]', $sstr);
			}
			$llen=count ($libs);
			$libstext='';
			if($llen>0)
			{
				for($i=0; $i<$llen; $i++)
				{
					if($libs[$i]!="")
					{
						$urtext='';
						$loctext='';
						$larr=explode('[END]', $libs[$i]);
						$lllen=count ($larr);
						for($j=0; $j<$lllen; $j++)
						{
							if($larr[$j]!="")
							{
								$ipos = strpos($larr[$j], '[ITEM]');
								$ipos1 = strpos($larr[$j], '[/ITEM]');
								$bpos = strpos($larr[$j], '[BIBLID]');
								$bpos1 = strpos($larr[$j], '[/BIBLID]');
								$spos = strpos($larr[$j], '[SIGLA]');
								$spos1 = strpos($larr[$j], '[/SIGLA]');
								$tpos = strpos($larr[$j], '[TITL]');
								$tpos1 = strpos($larr[$j], '[/TITL]');
								$aupos = strpos($larr[$j], '[AUTHID]');
								$aupos1 = strpos($larr[$j], '[/AUTHID]');
								$apos = strpos($larr[$j], '[ADRESS]');
								$apos1 = strpos($larr[$j], '[/ADRESS]');			
								$astr="";
								$bstr="";
								$istr="";
								$ssstr="";
								$tstr="";
								$austr="";
								if($ipos !== false)
								{
									$istr=substr($larr[$j],0,$ipos1);
									$istr=substr($istr,$ipos+6);
								}
								if($bpos !== false)
								{
									$bstr=substr($larr[$j],0,$bpos1);
									$bstr=substr($bstr,$bpos+8);
								}
								if($spos !== false)
								{
									$ssstr=substr($larr[$j],0,$spos1);
									$ssstr=substr($ssstr,$spos+7);
								}
								if($tpos !== false)
								{
									$tstr=substr($larr[$j],0,$tpos1);
									$tstr=substr($tstr,$tpos+6);
								}
								if($apos !== false)
								{
									$astr=substr($larr[$j],0,$apos1);
									$astr=substr($astr,$apos+8);
								}
								if($aupos !== false)
								{
									$austr=substr($larr[$j],0,$aupos1);
									$austr=substr($austr,$aupos+8);
								}
								if(strpos($larr[$j], '[UR]') !== false)
								{
									$countlibs++;
									$urauth=$austr;
									$urtext.='<div onclick="showHide1(this.parentNode.parentNode)" class="td"><p class="fstr lh120">'.$tstr.'</p><p class="address">'.$astr.'</p></div><div class="td w30 p5x" id="l_'.$count.'_'.$countlibs.'_'.$austr.'"><input type="hidden" class="titl" value="'.$tstr.'"/><input type="hidden" class="item" value="'.$istr.'"/><input type="hidden" class="biblid" id="biblid'.$i.'" value="'.$bstr.'"/><input type="hidden" class="authid" value="'.$austr.'"/><input type="hidden" class="addr" value="'.$astr.'"/><!--<input type="hidden" class="sigla" value="'.$sstr.'"/>--><span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id,'.$countlibs.',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'.$countlibs.',\'map\')">Посмотреть на карте</span>';
									if((isset($_POST['_auth']))||($flag45))
									{
										$urtext.='<span class="aflinkinfo" onclick="showLibInfo(this,'.$countlibs.',\'avail\')">Уточнить наличие</span>';
									}
									$urtext.='<!--<span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id,'.$countlibs.')">О библиотеке</span><span class="aflinkinfo" onclick="lookAtMap(this)">Посмотреть на карте</span><span class="aflinkinfo" onclick="checkAvail(this,\''.$istr.'\',\'\',\''.$i.'\')">Уточнить наличие</span>--><input type="hidden" class="addr" value="'.$astr.'"/><input type="hidden" class="tstr" value="'.$tstr.'"/></div>';
								}
								else
								{
									$countlibs++;
									$loctext.='<div class="row"><div class="td loc"><p><b>'.$tstr.'</b></p><p class="address">'.$astr.'</p></div><div class="td w30 p5x" id="l_'.$count.'_'.$countlibs.'_'.$austr.'"><input type="hidden" class="titl" value="'.$tstr.'"/><input type="hidden" class="item" value="'.$istr.'"/><input type="hidden" class="biblid" value="'.$bstr.'"/><input type="hidden" class="authid" value="'.$austr.'"/><input type="hidden" class="addr" value="'.$astr.'"/><!--<input type="hidden" class="sigla" value="'.$sstr.'"/>--><span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id,'.$countlibs.',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'.$countlibs.',\'map\')">Посмотреть на карте</span>';
									if((isset($_POST['_auth']))||($flag45))
									{
										$loctext.='<span class="aflinkinfo" onclick="showLibInfo(this,'.$countlibs.',\'avail\')">Уточнить наличие</span>';
									}
									$loctext.='<!--<span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id,'.$countlibs.')">О библиотеке</span><span class="aflinkinfo" onclick="lookAtMap(this)">Посмотреть на карте</span><span class="aflinkinfo" onclick="checkAvail(this.parentNode.parentNode.parentNode.previousSibling.firstChild.lastChild.lastChild,\''.$istr.'\',\'\',\''.$i.'\')">Уточнить наличие</span>--><input type="hidden" class="tstr" value="'.$astr.'"/></div></div>';
								}
							}
						}
						if($loctext!='')
						{
							if($urtext!='')
							{
								$urtext='<div class="row ur">'.$urtext.'</div>';
							}
							$loctext='<div class="level" style="display:none">'.$loctext.'</div>';
						}
						else
						{
							$urtext='<div class="row">'.$urtext.'</div>';
							$loctext='<div></div>';
						}
						$libstext.='<div class="level">'.$urtext.'</div>'.$loctext;
					}
				}
			}
		}
		if($libstext!="")
		{
			$libraries.=$libstext;
		}
		if(isset($value->LINEORD_1))
		{
			$larr=$value->LINEORD_1;
			$count1=0;
			//echo '||'.$linkstring.'<br/>';
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
									$output.='<div class="_'.$llen.'"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
							}
						}
					}
				}
			}
		}
		$tabs.='<span title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
		$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
		if(($libraries!="")&&($seef==""))
		//if($libraries!="")
		{
			$tabs.='<span title="libraries" class="add2 border" onmousedown="showHide2(this,\'lib'.$count.'\')">Библиотеки</span>';
			$tabdivs.='<div class="adddiv" id="lib'.$count.'"><input id="lib'.$count.'search" class="searchquery" type="hidden" value="'.htmlentities($search, ENT_COMPAT | ENT_IGNORE, "UTF-8").'"/>'.$libraries.'</div>';
		}
		if(isset($fjson->$ritem->bibcard))
		{
			$tabs.='<span title="card" class="add1" onmousedown="seeBibcard(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$realdb.'\')">Карточка</span>';
			$tabdivs.='<div class="adddiv"  id="bib'.$count.'" style="display: none"></div>';
		}
		if(isset($fjson->$ritem->rusmarc))
		{
			$tabs.='<span title="rusmarc" class="add1" onmousedown="seeRusmarc(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$realdb.'\')">RUSMARC</span>';
			$tabdivs.='<div class="adddiv"  id="rusm'.$count.'" style="display: none"></div>';
		}
		if($see!="")
		{
			$tabs.='<span title="links" class="add1" onmousedown="showHide2(this,\'link'.$count.'\')">Связанные записи</span>';
			$tabdivs.='<div class="adddiv" id="link'.$count.'" style="display:none">'.$see.'</div>';
		}
		if($seef!="")
		{
			$tabs.='<span title="part" class="add1" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">Тома/выпуски</span>';
			$tabdivs.='<div class="adddiv" id="see'.$theid.'" style="display:none"></div>';
		}
		if((isset($fjson->$ritem->place))&&($libraries=="")&&($seef=="")&&(!$flagurl))
		{
			if(($see7!="")||($see6!=""))
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
		echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$resflstr.''.$social.'</div><div class="td vtop pl10x pt10x pb10x w100">'.$output.'</div></div></div>';
		echo '</div>';
	}
}
?>	