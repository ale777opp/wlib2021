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
		$flagurl=false;
		$newsterm='';
		if(isset($value->SHOTREPO_0))
		{
			$arr=$value->SHOTREPO_0;
			$len = count ($arr);
			$tcodes='';
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
					$rcode=strpos($arr[$i], '[codes]'); 
					$rcode1=strpos($arr[$i], '[/codes]'); 
					$res3=strpos($arr[$i], '[URL]');
					$restype1=strpos($arr[$i], '[type]'); 
					$restype2=strpos($arr[$i], '[/type]');
					$resins=strpos($arr[$i], '[INSERT]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
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
					elseif($rcode !== false)
					{
						$tcodes.=substr(substr($arr[$i],0,$rcode1),$rcode+7);
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
						$search = '[space] [/space] [/div]';
						if (substr($arr[$i], strlen($arr[$i]) - strlen($search)) == $search)
						{
							$term=substr($arr[$i], 0, strlen($arr[$i]) - strlen($search)).'[/div]';
						}
						else
						{
							$term=$arr[$i];
						}
						$socialtext.=strip_tags($term);
						if((isset($result->response_0->_renew))&&($start == 0)&&(($newsoutform=="")||($newsoutform=="SHOTREPO")))
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
						$finalterm=parseBB($term);
						if($lightstring!="")
							$finalterm=backlight($lightstring,$finalterm);
						if($i==0)
						{
							$output.='<div class="red ft" title="Подробнее" onmousedown="seeFullRopoInfo(\''.$theid.'\')">'.$finalterm.'</div>';
						}
						else
						{
							
							$output.=$finalterm;
						}
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

			$output.='</div>';
			
			if($tcodes != "")
			{
				$output.='<div class="tcodes">'.parseBB($tcodes).'</div>';
			}
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
		if(isset($value->AVAILABLEEXEMPLARS_0))
		{
			if(isset($value->AVAILABLEEXEMPLARS_0->quantity))
				$oquantity=intval($value->AVAILABLEEXEMPLARS_0->quantity);
			else
				$oquantity=0;
		}
		else
			$oquantity=0;
		if($slides!="")
		{
			$slides='<span class="titleslides" onclick="showSlidesCont(this)">'.$slides.'</span>';
		}
		if(isset($value->LINEORD_1))
		{
			$larr=$value->LINEORD_1;
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
								if(($llen!="058")&&($llen!="069")&&($llen!="065"))
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

		if($imgsrc!="")
		{
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
		echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$social.'</div><div class="td vtop w100">'.$output.'</div></div></div>';
		if(($size == 1)&&($codemenu != "")&&($ind != ""))
		{
			echo '<script>showOrderWin(\''.$codemenu.'\',\''.$rdb.'\',\''.$theid.'\')</script>';
		}
		echo '</div>';
	}
}
?>	