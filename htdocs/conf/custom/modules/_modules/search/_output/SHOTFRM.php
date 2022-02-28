<?php  
foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_');
	$loadurl='link';
	$realdb=$iddb;
	$rdb=$iddb;
	$realname='';
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
		$output.='<div class="searchrez" id="'.$theid.'">';
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
		$tabs='';
		$tabdivs='';
		$search='';
		$social='';
		$socialtext='';
		$fulllinkbefore='';
		$fulllinkmiddle='addSee';
		$fulllinkafter='';
		$textoutput='';
		$picttype="";
		$picttext="";
		$linkdisp="";
		if(isset($value->SHOTFRM_0))
		{
			$arr=$value->SHOTFRM_0;
			$len = count ($arr);
			$counturl=0;
			$countseef=0;
			$seeind='';
			$seeindtext='';
			$poscultobj=false;
			$poscultdigit=false;
			$typestr='';
			$restype1=false;
			$restype2=false;
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>';
					if($i==0)
					{
						if($realname!="")
							$output.='<div class="aright c9">'.$realname.'</div>';
						$poscultobj = strpos($arr[$i], 'Объект культуры:'); 
						$poscultdigit = strpos($arr[$i], 'Цифровая копия объекта культуры:');
						$term='';
						$restype1=strpos($arr[$i], '[type]'); 
						$restype2=strpos($arr[$i], '[/type]');
						if($restype2 !== false)
						{
							$term=substr($arr[$i],$restype2+7);
							$typestr=substr(substr($arr[$i],0,$restype2),$restype1+6);
						}
						else
						{
							$term=$arr[$i];
							$typestr='';
						}
						$socialtext.=strip_tags($term);
						$fulllinkbefore='<span>'.($count+$start).'.</span> <span title="Подробнее" class="fstr" onmousedown="';
						$fulllinkafter='(\''.$theid.'\',\''.$realdb.'\')">'.$term.'</span>';
						$fulllinkmiddle='addSee';
					}
					if($typestr != '')
					{
						if($typestr=='culture')
						{
							$fulllinkmiddle='addSeeCulture';
							$picttype='culture';
							$picttext='ОБЪЕКТЫ КУЛЬТУРЫ';
						}
						if($typestr=='archive')
						{
							$fulllinkmiddle='addSeeArchive';
							$picttype='archive';
							$picttext='АРХИВНЫЕ МАТЕРИАЛЫ';
						}
						if($typestr=='collection')
						{
							$fulllinkmiddle='addSeeCollection';
							$picttype='collection';
							$picttext='КОЛЛЕКЦИИ';
						}
					}
					if(($poscultobj !== false)||($poscultdigit !== false))
					{
						$fulllinkmiddle='addSeeCulture';
						$picttype='culture';
						$picttext='ОБЪЕКТЫ КУЛЬТУРЫ';
					}
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
					$res3=strpos($arr[$i], '[URL]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					$termin=substr($arr[$i], $pos+1);
					$from=$from = array("'", "\"", "\\");
					$to = array("[apos]", "[quot]", "[backslash]");
					$newtermin = str_replace($from, $to, $termin);
					$pos1m = strpos($str, 'Первый МГМУ'); 
					$possc = strpos($str, 'Статьи/части');
					$arcposf = strpos($str, 'Фонд'); 
					$arcposo = strpos($str, 'Опись'); 
					$arcposd = strpos($str, 'Дело'); 
					$arcposdoc = strpos($str, 'Документ');
					$colposf = strpos($str, 'Входит в коллекцию'); 
					$colposp = strpos($str, 'Включает коллекции');
					if($colposp !== false)
					{
						$linkdisp=' style="display:none" ';
						$countseef++;
						$seeind=' id="see'.$theid.'_'.$countseef.'" ';
						$seeindtext='see'.$theid.'_'.$countseef;
					}
					else
						$linkdisp='';
					if($res7 !== false)
					{
						$imgsrc=substr($arr[$i], $res7+5);
					}
					elseif($res4 !== false)
					{
						$output.='<span class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$str.'</span><div id="SEE4'.$count.'" style="display:none"></div></span>';
					}
					elseif($res3 !== false)
					{
						if($counturl==0)
						{
							$output.='<span class="el lh140">Есть электронный документ</span>';
						}
						$counturl++;
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
								$from= array("'", "\"", "\\");
								$to = array("[apos]", "[quot]", "[backslash]");
								$newtermin = str_replace($from, $to, $termin);
								$pos1m = strpos($str, 'Первый МГМУ'); 
								$possc = strpos($str, 'Статьи/части'); 
								$postv = strpos($str, 'Тома/выпуски'); 
								if(($arcposf !== false)||($arcposo !== false)||($arcposd !== false)||($arcposdoc !== false))
								{
									$fulllinkmiddle='addSeeArchive';
									$picttype='archive';
									$picttext='АРХИВНЫЕ МАТЕРИАЛЫ';
								}
								elseif(($colposf !== false)||($colposp !== false))
								{
									$fulllinkmiddle='addSeeCollection';
									$picttype='collection';
									$picttext='КОЛЛЕКЦИИ';
								}
								elseif(($poscultobj !== false)||($poscultdigit !== false))
								{
									$fulllinkmiddle='addSeeCulture';
									$picttype='culture';
									$picttext='ОБЪЕКТЫ КУЛЬТУРЫ';
								}
								else
								{
									;
								}
								if(($pos1m === false)&&($possc === false)&&($postv === false))
								{
									$see.='<span'.$seeind.' class="SEEF"'.$linkdisp.' onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\')">'.$str.'</span>';
									if($linkdisp!='')
										$see.='<script>showSeefA("'.$seeindtext.'","'.$rdb.'","'.$newtermin.'");</script>';
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
					else
					{
						if($i!=0)
							$output.=$arr[$i];
					}
					$output.='</div>';
				}
			}
		}
		$textoutput.='<div>'.$fulllinkbefore.''.$fulllinkmiddle.''.$fulllinkafter.'</div>';
		$output='<div class="output">'.$textoutput.''.$output.'</div>';
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
			if(($see7!="")||($see6!=""))
			{
				$tabs.='<span title="place" class="add1" onmousedown="seePlace(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$rdb.'\')">Местонахождение</span>';
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
		if($picttype!='')
		{
			$social='<span class="social w88x"><span title="'.$picttext.'" class="'.$picttype.'"></span></span>';
		}
		echo '<div class="table wl00"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$social.'</div><div class="td vtop pl5x pr5x w90"><div class="aright c9"></div>'.$output.'</div></div></div>';
		echo '</div>';
	}
}
?>	