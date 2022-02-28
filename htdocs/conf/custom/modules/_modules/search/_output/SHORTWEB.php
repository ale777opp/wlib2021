<?php  
foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_');
	$rdb=$iddb;
	$realdb=$iddb;
	$realname='';
	$loadurl='';
	$flagseef='';
	$oquantity=0;
	$ecopy=0;
	$lquantity=0;
	$iddbecopy=0;
	$idrececopy="";
	$accesstype="";
	$eurl="";
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
		$process='';
		if(isset($value->iddbPurpose))
			$process=$value->iddbPurpose;
		if((isset($_POST['_auth']))||($flag45)||(isset($fjson->listlit)))
			$mark='<div class="td w3"><input type="checkbox" name="marker" value="'.$theid.'" style="margin: 0" class="'.$realdb.'"/></div>';
		$output.='<div class="searchrez" id="'.$theid.'">';
		$imgsrc='';
		if(((isset($fjson->$ritem->additional->nophoto))&&($fjson->$ritem->additional->nophoto)=="display"))
			$imgsrc.=THEIMGPATH.'/nophoto.png';
		$imgstr='';
		$slides='';
		$sb='';
		$searchtitle='';
		$see='';
		$see7='';
		$see6='';
		$seef='';
		$tabs='';
		$tabdivs='';
		$search='';
		$socialtext='';
		$term='';
		$typestr='';
		if(isset($value->resourceType))
		{
			$typestr=$value->resourceType;
		}
		$social='';
		$resflstr='';
		$flagurl=false;
		$newsterm='';
		$tabstr="";
		if(isset($value->SHORTWEB_0))
		{
			$arr=$value->SHORTWEB_0;
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
					$tab=strpos($arr[$i], '[TAB]'); 
					$res4=strpos($arr[$i], '[SEE4]'); 
					$res77=strpos($arr[$i], '[SEE7]'); 
					$res66=strpos($arr[$i], '[SEE6]'); 
					$res88=strpos($arr[$i], '[SEARCHTITLE]'); 
					$rlike=strpos($arr[$i], '[LIKE]'); 
					$rlike1=strpos($arr[$i], '[/LIKE]');
					$bmark=strpos($arr[$i], '[BOOKMARK]'); 
					$bmark1=strpos($arr[$i], '[/BOOKMARK]'); 
					$resfl=strpos($arr[$i], '[FLIPPINGBOOK]');
					$res3=strpos($arr[$i], '[URL]');
					$restype1=strpos($arr[$i], '[type]'); 
					$restype2=strpos($arr[$i], '[/type]');
					$resins=strpos($arr[$i], '[INSERT]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					if($tab !== false)
						$tabstr=$str;
					if($restype2 !== false)
					{
						$term=substr($arr[$i],$restype2+7);
						$typestr=substr(substr($arr[$i],0,$restype2),$restype1+6);
					}
					elseif($res7 !== false)
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
					elseif($bmark !== false)
					{
						$tarr=explode('[/BOOKMARK]', $arr[$i]);
						$tlen=count($tarr);
						$term='';
						for($j=0; $j<$tlen; $j++)
						{
							if($tarr[$j]!="")
							{
								//echo '<br/> '.$j.' '.$tarr[$j].'<br/>';
								$p1 = strpos($tarr[$j], '[BOOKMARK]');
								if($p1 === false)
									$term.=parseBB($tarr[$j]);
								else
								{
									$barr=explode('[BOOKMARK]', $tarr[$j]);
									$blen=count($barr);
									for($b=0; $b<$blen; $b++)
									{
										if($barr[$b]!="")
										{
											$p=strpos($barr[$b], '{');
											if($p === false)
												$term.=parseBB($barr[$b]);
											else
											{
												$s=substr($barr[$b], 1, $p-2);
												$t=substr($barr[$b], $p);
												$from = array("'", "\"", "\\");
												$to = array("[apos]", "[quot]", "[backslash]");
												$m = str_replace($from, $to, $t);
												
												$term.='<span class="a u curs" onmousedown="SeeF(\''.htmlspecialchars($m, ENT_QUOTES).'\')">'.$s.'</span>';
											}
										}
									}
								}
							}
						}
						$output.=$term;
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
							if(($flagseef=='hierarchical')&&($tab !== false)&&($str== $tabstr))
							{
								$seef.='<span class="SEEF" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$str.'</span><div id="see'.$theid.'" class="seediv" style="display:none"></div>';
							}
							else
							{
								$termin=substr($arr[$i], $pos+1);
								$from = array("'", "\"", "\\");
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
					/*elseif($resfl !== false)
					{
						$resflstr.='<span class="social" title="Доступен просмотр через мобильное приложение"><a target="_blank" class="android" href="https://itunes.apple.com/app/id1122433076"></a><a target="_blank" class="apple" href="https://play.google.com/store/apps/details?id=com.mediaparts.ditm"></a></span>';
					}*/
					elseif($res3 !== false)
					{
						if(!$flagurl)
						{
							if($loadurl=='link')
								$output.='<span class="URL"><a target="_blank" href="'.substr($arr[$i], $pos+1).'">'.$str.'</a></span>';
							else
								//$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.substr($arr[$i], $pos+1).'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$str.'</span>';
								$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.substr($arr[$i], $pos+1).'\',\''.$rdb.'\')" class="URL u w180x" title="открыть">'.$str.'</span>';
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
						$socialtext.=strip_tags(parseBB($term));
						if($i==0)
						{
							if($realname!="")
							{
								if($process=="CATALOGING")
									$output.='<div class="aright rose">В обработке</div>';
								else
									$output.='<div class="aright c9">'.$realname.'</div>';
							}
							$term=substr($term, 5);
							$term='<div class="fstr">'.($count+$start).'. '.$term;
						}
						else
						{
							if((isset($result->response_0->_renew))&&($start == 0)&&(($newsoutform=="")||($newsoutform=="SHORTWEB")))
							{
								$npath='/index/_news/newbooks.html';
								if(isset($result->response_0->_newspath))
									$npath=$result->response_0->_newspath;
								$htpath=THEPAGESPATH.''.$npath;
								if(file_exists($htpath))
								{
									$newsterm.=parseBB($term);
								}
							}
						}
						$finalterm=parseBB($term);
						if($lightstring!="")
							$finalterm=backlight($lightstring,$finalterm);
						$output.=$finalterm;
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
			$output.='</div>';
		}
		if($newsoutform!="")
		{
			$npict='';
			$nsign=$newsoutform.'_2';
			$nstr='';
			if(isset($value->$nsign))
			{
				$narr=$value->$nsign;
				$nlen = count ($narr);
				for($j=0; $j<$nlen; $j++)
				{
					if($narr[$j]!="")
					{
						$resimg=strpos($narr[$j], '[IMG]');
						if($resimg !== false)
						{
							$npict=substr($narr[$j], $resimg+5);
						}
						else
						{
							if((isset($result->response_0->_renew))&&($start == 0))
							{
								$nterm=$narr[$j];
								$npath='/index/_news/newbooks.html';
								if(isset($result->response_0->_newspath))
									$npath=$result->response_0->_newspath;
								$htpath=THEPAGESPATH.''.$npath;
								if(file_exists($htpath))
								{
									$nstr.=parseBB($nterm);
								}
							}
						}
					}
				}
				if($nstr!="")
				{
					$pict=$npict;
					if($npict=="")
						$pict=THEIMGPATH.'/nophoto.png';
					$textoutput.='<div class="slids" data-iddb="'.$realdb.'" data-id="'.$theid.'" onmousedown="searchItem(this)"><div class="img"><figure tabindex="1" style="background-image:url('.$pict.')"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title=""/></figure></div><div class="cont">'.$nstr.'</div></div>'."\n";
				}
			}
		}

		foreach ($value as $a => $b)
		{
			$posA=strpos($a, 'AVAILABLEEXEMPLARS_');
			$posE=strpos($a, 'AVAILABLEECOPY_');
			if($posA !== false)
			{
				if(isset($b->quantity))
					$oquantity=intval($b->quantity);
				else
					$oquantity=0;
			}
			if($posE !== false)
			{
				if(isset($b->ecopy))
					$ecopy=intval($b->ecopy);
				else
					$ecopy=0;
				if(isset($b->iddbEcopy))
					$iddbecopy=intval($b->iddbEcopy);
				else
					$iddbecopy=0;
				if(isset($b->quantity))
					$lquantity=intval($b->quantity);
				else
					$lquantity=0;
				if(isset($b->idRecEcopy))
					$idrececopy=$b->idRecEcopy;
				else
					$idrececopy="";
				if(isset($b->accessType))
					$accesstype=$b->accessType;
				else
					$accesstype="";
				if(isset($b->url))
					$eurl=$b->url;
				else
					$eurl="";
			}
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
		/*только для RusMed*/
		if(isset($value->LINEORD_1))
		{
			$larr=$value->LINEORD_1;
			$count1=0;
			
			$loper=array();
			
			foreach($larr as $llen) 
			{ 
				if($llen != "")
				{
					if(isset($linkarr[$llen]))
					{
						if($llen=="043")
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="069")&&($ecopy > 0)&&($accesstype=="PAY"))
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="070")&&($ecopy > 0)&&($accesstype=="PAY"))
						{
							array_push($loper, $llen);
						}
						elseif($llen=="076")
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="077")&&($ecopy==0))
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="078")&&($ecopy > 0)&&($accesstype=="FREE"))
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="079")&&($ecopy > 0)&&($accesstype=="FREE"))
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="059")&&($ecopy==0))
						{
							array_push($loper, $llen);
						}
						elseif(($llen=="058")&&($ecopy > 0)&&($accesstype=="PAY"))
						{
							array_push($loper, $llen);
						}
						else
						{
							if((!$flagurl) && ($ecopy == 2) && ($eurl != "") && ($accesstype == "NOLIMITS"))
							{
								$output.='<span onmousedown="loadFreeUrl(\''.$idrececopy.'\',\''.$eurl.'\',\''.$iddbecopy.'\')" class="URL u w180x" title="открыть">Показать документ</span>';
								$flagurl=true;
							}
						}
					}
				}
			}
			$operlen = count($loper);
			$lstr=implode('|', $loper);
			//echo $lstr.'<br/>';
			if((!$flagurl) && ($operlen > 0))
			{
				$output.='<div class="opercont">';
				for($i=0; $i < $operlen; $i++)
				{
					if($loper[$i] == '070')
					{
						$output.='<div><div data="Сервис доступен подписчикам Электронного абонемента или В ЗДАНИИ БИБЛИОТЕКИ" class="operations _070"  onmousedown="createAuthLayer(\''.$theid.'\')">Заказать онлайн просмотр</div></div>';
					}
					elseif($loper[$i] == '076')
					{
						$output.='<div><div data="Сервис доступен зарегистрированным читателям библиотеки" class="operations _076" onmousedown="createAuthLayer(\''.$theid.'\')">Заказать в читальный зал</div></div>';
					}
					elseif($loper[$i] == '077')
					{
						$output.='<div><div data="Сервис доступен подписчикам Электронного абонемента" class="operations _077" onmousedown="createAuthLayer(\''.$theid.'\')">Заказать онлайн просмотр</div></div>';
					}
					elseif($loper[$i] == '043')
					{
						$output.='<div><div class="operations _043" onmousedown="showOrderWin(\'043\',\''.$rdb.'\',\''.$theid.'\')">Заказать в читальный зал</div></div>';
					}
					elseif($loper[$i] == '069')
					{
						if(($idrececopy != "") && ($iddbecopy != ""))
							$output.='<div><div class="operations _069" onmousedown="showOrderWin(\'069\',\''.$iddbecopy.'\',\''.$idrececopy.'\')">Заказать онлайн просмотр</div></div>';
						else
							$output.='<div><div class="operations _069" onmousedown="showOrderWin(\'069\',\''.$rdb.'\',\''.$theid.'\')">Заказать онлайн просмотр</div></div>';
					}
					elseif($loper[$i] == '078')
					{
						if(($idrececopy != "") && ($iddbecopy != ""))
							$output.='<div><div class="operations _078" onmousedown="showOrderWin(\'078\',\''.$iddbecopy.'\',\''.$idrececopy.'\')">Заказать онлайн просмотр</div></div>';
						else
							$output.='<div><div class="operations _078" onmousedown="showOrderWin(\'078\',\''.$rdb.'\',\''.$theid.'\')">Заказать онлайн просмотр</div></div>';
					}
					elseif($loper[$i] == '058')
					{
						if(($idrececopy != "") && ($iddbecopy != ""))
							$output.='<div><div class="operations _058" onmousedown="showOrderWin(\'058\',\''.$iddbecopy.'\',\''.$idrececopy.'\')">Показать онлайн</div></div>';
						else
							$output.='<div><div class="operations _058" onmousedown="showOrderWin(\'058\',\''.$rdb.'\',\''.$theid.'\')">Показать онлайн</div></div>';
					}
					elseif($loper[$i] == '059')
					{
						$output.='<div><div class="operations _058" onmousedown="showOrderWin(\'059\',\''.$rdb.'\',\''.$theid.'\')">Заказать онлайн доступ</div></div>';
					}
					elseif($loper[$i] == '079')
					{
						$output.='<div><div data="Сервис доступен подписчикам Электронного абонемента  или зарегистрированным читателям библиотеки" class="operations _079" onmousedown="createAuthLayer(\''.$theid.'\')">Заказать онлайн просмотр</div></div>';
					}
					else
					{
						;
					}
				}
				$output.='</div>';
			}
		}
		/*конец только для RusMed*/
		$tabs.='<span data-title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
		$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
		$typestr = strtolower($typestr);
		if((isset($fjson->$ritem->bibcard))&&($typestr != 'collection'))
		{
			$tabs.='<span data-title="card" class="add1" onmousedown="seeBibcard(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Карточка</span>';
			$tabdivs.='<div class="adddiv"  id="bib'.$count.'" style="display: none"></div>';
		}
		if(isset($fjson->$ritem->rusmarc))
		{
			$tabs.='<span data-title="rusmarc" class="add1" onmousedown="seeRusmarc(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">RUSMARC</span>';
			$tabdivs.='<div class="adddiv"  id="rusm'.$count.'" style="display: none"></div>';
		}
		if($see!="")
		{
			$tabs.='<span data-title="links" class="add2 border" onmousedown="showHide2(this,\'link'.$count.'\')">Связанные записи</span>';
			$tabdivs.='<div class="adddiv" id="link'.$count.'">'.$see.'</div>';
		}
		if($seef!="")
		{
			$tabs.='<span data-title="part" class="add1" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">'.$tabstr.'</span>';
			$tabdivs.='<div class="adddiv" id="see'.$theid.'" style="display:none"></div>';
		}
		if((isset($fjson->$ritem->place))&&($seef=="")&&(!$flagurl))
		{
			if(($see7!="")||($see6!=""))
			{
				$tabs.='<span data-title="place" class="add1" onmousedown="seePlace(this,\''.$theid.'\',\''.$count.'\',\''.$rdb.'\')">Местонахождение</span>';
				$tabdivs.='<div class="adddiv" id="place'.$count.'" style="display:none"></div>';
			}
		}
		$output.='<div class="tabs">'.$tabs.'</div><div class="tabdivs">'.$tabdivs.'</div>';
		
		if($imgsrc!="")
		{
			//$imgstr='<figure tabindex="1"><img border="0" hspace="0" vspace="0" alt="" title="" src="'.$imgsrc.'"/></figure>';
			$imgstr='<figure tabindex="1" style="background-image:url('.$imgsrc.')"></figure>';
		}
		else
		{
			$imgstr='<span><cite';
			if($sb!='')
				$imgstr.=' id="ISBN'.$sb.'"';
			$imgstr.='><span class="book" tabindex="1"><ul class="paperback_front"><li></li></ul><ul class="ruled_paper"><li></li><li></li><li></li><li></li><li></li></ul><ul class="paperback_back"><li></li></ul></span></cite></span>';
		}
		if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
		{
			$social='<span class="social w88x"><input type="hidden" name="purl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>'.$searchtitle;
		}
		if(((isset($fjson->$ritem->additional->scopy))&&($fjson->$ritem->additional->scopy)=="display"))
		{
			$social.='<span class="scopy w88x"><input style="height:1px;opacity:0" type="text" name="surl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$iddb.'&ID='.$theid.'"/><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)">Скопировать ссылку</span></span>';
		}
		echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$resflstr.''.$social.'</div><div class="td vtop pl10x pt10x pb10x w100">'.$output.'</div></div></div>';
		if(($size == 1)&&($codemenu != "")&&($ind != ""))
		{
			echo '<script>showOrderWin(\''.$codemenu.'\',\''.$rdb.'\',\''.$theid.'\')</script>';
		}
		echo '</div>';
	}
}
?>	