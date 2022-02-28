<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor">';
$src="nophoto.jpg";
$size="0";
$loadurl='link';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$prev='';
	$next='';
	if(isset($response0->_prev))
		$prev=$response0->_prev;
	if(isset($response0->_next))
		$next=$response0->_next;
	if(isset($response0->size))
		$size=$response0->size;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	if(isset($response0->_localiddb))
	{
		$iddb=$response0->_localiddb;
		$particle="lib_";
	}
	$ritem='dbs_'.$iddb;
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
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	$globaloutput.='<div class="col_title"><div class="fright"><input type="button" class="button2" value="Вернуться к поиску" onmousedown="';
	if(($prev!="")||($next!=""))
	{
		$globaloutput.='fulltextSearch(1);';
	}
	else
		$globaloutput.='nextSearch();';
	$globaloutput.='"/></div><div class="spacer"></div></div><div class="col_content">';
	echo $globaloutput;
	if(intval($size)==0)
	{
		include (THEINCLUDESPATH.'/errorpage.php');
		echo '</div></div>';
	}
	else
	{
		$search='';
		$litres='';
		$ind='';
		$top='';
		$bibres='';
		$size=intval($response0->size);
		$entry=$response0->result_0;
		$theid=htmlspecialchars($entry->id);
		$theid=addslashes($theid);
		$sigla=array();
		$ids=array();
		if(isset($entry->FULLFRM2S_1))
		{
			$sarr=$entry->FULLFRM2S_1;
			$slen=count ($sarr);
			if(($slen>0)&&($sarr[0]!=""))
			{
				for($i=0; $i<$slen; $i++)
				{
					if($sarr[$i]!="")
					{
						$spos=strpos($sarr[$i], '[SIGLA]');
						$str=substr($sarr[$i],$spos+7);
						$sigla[]=$str;
						$ids[]=$sarr[$i];
					}
				}
			}
		}
		if(isset($entry->FULLFRM3_2))
		{
			$sarr=$entry->FULLFRM3_2;
			$slen=count ($sarr);
			for($i=0; $i<$slen; $i++)
			{
				if($sarr[$i]!="")
				{
					$resl=strpos($sarr[$i], '[LITRES]');
					if($resl !== false)
					{
						$litres=substr($sarr[$i],$resl+8);
					}
				}
			}
		}
		if(isset($entry->FULLFRM4_3))
		{
			$sarr=$entry->FULLFRM4_3;
			$slen=count ($sarr);
			for($i=0; $i<$slen; $i++)
			{
				if($sarr[$i]!="")
				{
					$ress=strpos($sarr[$i], '[SEARCH]');
					if($ress !== false)
					{
						$search=substr($sarr[$i],$ress+8);
					}
				}
			}
		}
		$globaloutput='<div class="spacer"><input type="hidden" id="skin" name="skin" value="'.$skin.'"/></div><div class="bge pt5x pb10x"><span class="fright mr5x mt5x"><input type="button" class="button2" value="Список литературы" onclick="showOrderList();"/></span><span class="fleft"><input type="button" class="button2" value="В список литературы" onclick="toOrderList(\''.$theid.'\');"/></span><div class="spacer"></div></div>';
		$socialtext='';
		$social='';
		$imgsrc='';
		$imgstr='';
		$output='';
		$sb='';
		if(isset($entry->FULLFRM1_0))
		{
			$arr=$entry->FULLFRM1_0;
			$len = count ($arr);
			$counturl=0;
			for($i=0; $i<$len; $i++)
			{
				$output.='<div class="output">';
				$res6=strpos($arr[$i], '[ISBN]');
				$res3=strpos($arr[$i], '[URL]');
				$pos=strpos($arr[$i], '>');
				$str1=substr($arr[$i],0,$pos);
				$pos1=strpos($str1, '<')+1; 
				$str=substr($str1,$pos1);
				if($res3 !== false)
				{
					if($counturl==0)
					{
						$resu=strpos($arr[$i], 'http');
						$utext='';
						if($resu !== false)
							$utext=substr($arr[$i], $pos+1);
						else
							$utext='//'.substr($arr[$i], $pos+1);
						$output.='<span class="URL"><a target="_blank" href="'.$utext.'">'.$str.'</a></span>';
					}
					$counturl++;
				}
				elseif($res6 !== false)
				{
					$sb=prepareISBN(substr($arr[$i], $pos+1));
					$output.='<input name="sb" type="hidden" class="isbn" value="'.$sb.'"/>';
				}
				else
				{
					if($arr[$i]!="")
					{
						$output.='<div>';
						if($i==0)
						{
							$term=$arr[$i];
							$socialtext.=strip_tags($term);
							$output.='<span class="c8 f160">'.$term.'</span>';
						}
						else
						{
							$output.=$arr[$i];
						}
						$output.='</div>';
					}
				}
				$output.='</div>';
			}
		}
		if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
		{
			$social='<span class="social w88x"><input type="hidden" name="purl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$iddb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
		}
		$imgstr.='<span class="db"><cite';
		if($sb!='')
			$imgstr.=' id="ISBN'.$sb.'"';
		$imgstr.='><span class="book" tabindex="1"><ul class="paperback_front"><li></li></ul><ul class="ruled_paper"><li></li><li></li><li></li><li></li><li></li></ul><ul class="paperback_back"><li></li></ul></span></cite></span>';
		$globaloutput.='<div id="searchrezult" class="bibres table w100"><div class="row w100"><div class="td w88x vtop pt10x">'.$imgstr.''.$social.'</div><div class="td w5"></div><div class="td vtop pr5x w80 pt10x w90 output">'.$output.'</div></div></div><div class="spacer"></div>';
		$globaloutput.='<div class="libres"><input id="mysigla" type="hidden" value="'.join(' OR ',$sigla).'"/><input id="myids" type="hidden" value="'.join('[END]',$ids).'"/><input id="searchquery" type="hidden" value="'.htmlentities($search, ENT_COMPAT | ENT_IGNORE, "UTF-8").'"/><input id="litresquery" type="hidden" value="'.$litres.'"/>';
		if($litres!="")
			$globaloutput.='<div class="wrapped" onclick="findSigla(this)">Купить</div><div style="display:none;text-align:center" id="sigla'.$ind.'" class="expl"></div>';
		else
			$globaloutput.='<div class="wrapped" onclick="findSigla(this)">Библиотеки</div><div style="display:none;text-align:center" id="sigla'.$ind.'" class="expl"></div>';
		$globaloutput.='</div><div class="spacer"></div>';
		if(isset($entry->FULLFRM5_4))
		{
			$sarr=$entry->FULLFRM5_4;
			$slen=count ($sarr);
			if(($slen>0)&&($sarr[0]!=""))
			{
				$globaloutput.='<div class="libres"><div class="wrapped_" onmousedown="showHide1(this)">Подробнее</div><div id="add_'.$ind.'" class="expl content">';
				for($i=0; $i<$slen; $i++)
				{
					if($sarr[$i]!="")
					{
						$globaloutput.='<p>';
						$rpos = strpos($sarr[$i], '[RP]');
						$rpos1 = strpos($sarr[$i], '[/RP]');
						$spos = strpos($sarr[$i], '[SUBJ]');
						$spos1 = strpos($sarr[$i], '[/SUBJ]');
						$npos=strpos($sarr[$i], '[NUM]');
						if($rpos !== false)
						{
							$rstr=substr($sarr[$i],0,$rpos1);
							$rstr=substr($rstr,$rpos+4);
							if($npos!==false)
							{
								$nstr=substr($sarr[$i],$npos);
								$nstr=htmlspecialchars($nstr);
								$nstr=addslashes($nstr);
								$globaloutput.='<u title="Искать" class="RP" onmousedown="showLable(this)">'.$rstr.'</u>';
								if(!isset($response0->_localiddb))
									$globaloutput.=' <u class="eaf c9" onmousedown="getAfList(this)">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
							}
							else
								$globaloutput.='<u title="Искать" class="RP" onmousedown="showLable(this)">'.$rstr.'</u>';
						}
						elseif($spos !== false)
						{
							$sstr=substr($sarr[$i],0,$spos1);
							$sstr=substr($sstr,$spos+6);
							if($npos!==false)
							{
								$nstr=substr($sarr[$i],$npos);
								$nstr=htmlspecialchars($nstr);
								$nstr=addslashes($nstr);
								$globaloutput.='<u title="Искать" class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
								if(!isset($response0->_localiddb))
									$globaloutput.=' <u class="eaf c9" onmousedown="getAfList(this)">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
							}
							else
								$globaloutput.='<u title="Искать" class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
						}
						else
							$globaloutput.=$sarr[$i];
						$globaloutput.='</p>';
					}
				}
				$globaloutput.='</div><div class="spacer"></div></div>';
			}
		}
		if(isset($entry->FULLFRM6_5))
		{
			$sarr=$entry->FULLFRM6_5;
			$slen=count ($sarr);
			if(($slen>0)&&($sarr[0]!=""))
			{
				$globaloutput.='<div class="libres"><div class="wrapped_" onmousedown="showHide1(this)">Предметные рубрики</div><div id="af_'.$ind.'" class="expl content">';
				for($i=0; $i<$slen; $i++)
				{
					if($sarr[$i]!="")
					{
						$globaloutput.='<p>';
						$spos = strpos($sarr[$i], '[SUBJ]');
						$spos1 = strpos($sarr[$i], '[/SUBJ]');
						$npos=strpos($sarr[$i], '[NUM]');
						if($spos !== false)
						{
							$sstr=substr($sarr[$i],0,$spos1);
							$sstr=substr($sstr,$spos+6);
							if($npos!==false)
							{
								$nstr=substr($sarr[$i],$npos);
								$nstr=htmlspecialchars($nstr);
								$nstr=addslashes($nstr);
								$globaloutput.='<u title="Искать" class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
								if(!isset($response0->_localiddb))
									$globaloutput.=' <u class="eaf c9" onmousedown="getAfList(this)">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
							}
							else
								$globaloutput.='<u title="Искать" class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
						}
						else
							$globaloutput.=$sarr[$i];
						$globaloutput.='</p>';
					}
				}
				$globaloutput.='</div><div class="spacer"></div></div>';
			}
		}
		if(isset($entry->BIBREF_6))
		{
			$sarr=$entry->BIBREF_6;
			$slen=count ($sarr);
			if(($slen>0)&&($sarr[0]!=""))
			{
				$globaloutput.='<div class="libres"><div class="wrapped_" onmousedown="showHide1(this)">Библиографическая ссылка</div><div class="expl content" id="ref_'.$ind.'">';
				for($i=0; $i<$slen; $i++)
				{
					if($sarr[$i]!="")
					{
						$globaloutput.='<p>';
						$globaloutput.=$sarr[$i];
						$globaloutput.='</p>';
					}
				}
				$globaloutput.='</div><div class="spacer"></div></div>';
			}
		}	
		echo $globaloutput;
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
echo '</div></div>';
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
