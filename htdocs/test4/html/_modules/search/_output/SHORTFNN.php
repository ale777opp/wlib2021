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
		$output='';
		$output1='';
		//$output.='<div class="searchrez" id="'.$theid.'">';
		$imgsrc='';
		$annot='';
		$fstr='';
		$socialtext='';
		$social='';
		if(isset($value->SHORTFNN_0))
		{
			$arr=$value->SHORTFNN_0;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$res7=strpos($arr[$i], '[IMG]');
					$annotp=strpos($arr[$i], '[ANNOT]'); 
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					if($res7 !== false)
					{
						$imgsrc.=substr($arr[$i], $res7+5);
					}
					elseif($annotp !== false)
					{
						$annot.=substr($arr[$i], $res7+7);
					}
					else
					{
						$term=$arr[$i];
						if($i==0)
						{
							$socialtext.=strip_tags(parseBB($term));
							$fstr.='<span class="td">&#160;</span><span class="td">'.parseBB($term).'</span>';
							if((isset($result->response_0->_renew))&&($start == 0))
							{
								$shterm=strip_tags(parseBB($socialtext));
								$output1.='<div class="newssign">'.$shterm.'</div>';
							}
						}
						else
							$output.=parseBB($term);
					}
				}
			}
		}
		if($imgsrc=="")
			$imgsrc=THEIMGPATH.'/nofoto2.gif';
		else
		{
			if(strpos($imgsrc, 'http') === false)
				$imgsrc='//ih-clone.rucml.ru'.$imgsrc;
		}
		if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
		{
			$social='<span class="social"><input type="hidden" name="purl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
		}
		echo '<div class="table wl00"><div class="row"><div class="td"><div class="searchrez" id="'.$theid.'"><div class="fstr table">'.$fstr.'</div><div class="annot"><div class="shotform"><img src="'.$imgsrc.'"/></div>'.$annot.'</div>'.$output.'<div class="seeaddnn"><span class="addspan" onmousedown="seeAddNN(\''.$theid.'\')">подробнее ...</span>'.$social.'</div></div></div></div></div>';
		//echo '</div>';
		if((isset($result->response_0->_renew))&&($start == 0)&&($count < 13))
		{
			$textoutput.='<div data-title="подробнее..." class="newrecs" onmousedown="seeAddNN(\''.$theid.'\')"><img src="'.$imgsrc.'"/>'.$output1.'</div>';
		}
	}
}
if($size > 1)
{
	if(isset($result->response_1))
	{
		$fasetoutput="";
		$fasetdivs="";
		$fasetdivarr=array();
		foreach ($result as $arg => $val)
		{
			$resp = strpos($arg, 'response_'); 
			if($resp !== false)
			{
				if(isset($val->indx_0))
				{
					$fasettitle="";
					$fasetlabel="";
					$fsearchlabel=$val->_facetlabel;
					$fsearchtermin=$val->_facettermin;
					foreach ($val as $sign => $term)
					{
						$fas = strpos($sign, 'indx_'); 
						if($fas !== false)
						{
							$fterm=$val->_facettermin;
							$fterm=mb_strtoupper($fterm, "utf-8");
							if(strpos($term->item, $fterm) !== false)
							{
								if(strpos($term->item, $fterm) == 0)
								{
									if($fasettitle=="")
									{
										$fasettitle=$val->_facettitle;
										if($fasetlabel=="")
										{
											if($fasettitle=="Этнос")
											{
												$fasetlabel='ETN';
												$fasetdivarr["ETN"]=array();
											}
											if($fasettitle=="Рубрикатор")
											{
												$fasetlabel='IH';
												$fasetdivarr["IH"]=array();
											}
											if($fasettitle=="Регион")
											{
												$fasetlabel='LPL';
												$fasetdivarr["LPL"]=array();
											}
										}
									}
									$facettermin="";
									$facettext="";
									$termsize=$term->size;
									$one=explode('[|]', $term->item);
									if(strpos($one[1], '[ID]') !== false)
									{
										$two=explode('[ID]', $one[1]);
										$facettermin=$two[1];
										$facettext=$two[1];
									}
									else
									{
										$facettermin=$one[1];
										$facettext=$one[1];
									}
									if(!array_key_exists('title', $fasetdivarr[$fasetlabel]))
										$fasetdivarr[$fasetlabel]['title']=$fasettitle;
									if(!array_key_exists('label', $fasetdivarr[$fasetlabel]))
										$fasetdivarr[$fasetlabel]['label']=$fsearchlabel;
									if(!array_key_exists('termin', $fasetdivarr[$fasetlabel]))
										$fasetdivarr[$fasetlabel]['termin']=$fsearchtermin;
									if(array_key_exists($facettermin, $fasetdivarr[$fasetlabel]))
									{
										$fasetdivarr[$fasetlabel][$facettermin]=intval($fasetdivarr[$fasetlabel][$facettermin])+intval($termsize);
									}
									else
									{
										$fasetdivarr[$fasetlabel]+=array($facettermin=>$termsize);
									}
									//echo '<p>'.mb_strtolower($term->item, "utf-8").' - '.$termsize.'</p>';
								}
							}
						}
					}
				}
			}
		}
		$fslen=count($fasetdivarr);
		if($fslen > 0)
		{
			$iarr=array();
			$jarr=array();
			$foutput='<div id="facets_container">';
			foreach($fasetdivarr as $k => $v)
			{
				$i=0;
				$j=0;
				$z=0;
				$countkey=count($v)-3;
				arsort($v);
				$foutput.='<div>';
				foreach ($v as $a => $b)
				{
					if($a === 'title')
						$foutput.='<div class="title">'.$b.'</div>';
					elseif($a === 'label')
						$foutput.='<input type="hidden" class="label" value="'.$b.'"/>';
					elseif($a === 'termin')
						$foutput.='<input type="hidden" class="termin" value="'.$b.'"/>';
					else
					{
						$iarr[$i]='<div><span title="УТОЧНИТЬ" class="'.$k.'" onclick="searchWithFacet(this)">'.$a.'</span><i>'.$b.'</i></div>';
						$i++;
						$z++;
						if($i % 5 == 0)
						{
							$jarr[$j]=$iarr;
							$i=0;
							$j++;
							$iarr=array();
						}
						if($z == $countkey)
						{
							if(count($iarr) > 0)
								$jarr[$j]=$iarr;
							$i=0;
							$j=0;
							$z=0;
							$iarr=array();
						}
					}
				}
				$jcount=count($jarr);
				for($x=0;$x<$jcount;$x++)
				{
					$style='';
					if($x>0)
						$style=' style="display:none"';
					$foutput.='<div'.$style.'>';
					if($x>0)
						$foutput.='<div class="facetbac" onclick="facetsBack(this)">... назад</div>';
					$xcount=count($jarr[$x]);
					for($y=0;$y<$xcount;$y++)
					{
						$foutput.=$jarr[$x][$y];
					}
					if($countkey>5)
					{
						if($xcount==5)
						{
							if(isset($jarr[$x+1]))
							{
								if($x<$jcount)
									$foutput.='<div class="facetels" onclick="facetsNext(this)">далее ...</div>';
							}
						}
					}
					$foutput.='</div>';
				}
			//var_dump($jarr);
				$foutput.='</div>';
			}
			$foutput.='</div>';
			echo $foutput;
		}
	}
}
?>	