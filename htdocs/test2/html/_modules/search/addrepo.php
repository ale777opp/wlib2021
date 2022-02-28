<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div><div class="col_content"><div id="searchhead">';
$size="0";
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
	$ritem='dbs_'.$iddb;
	if(intval($size)==0)
	{
		include (THEINCLUDESPATH.'/errorpage.php');
		$globaloutput.='</div></div>';
	}
	else
	{
		$FULLREPOTITL='';
		$FULLREPOAUTH='';
		$FULLREPOSRC='';
		$FULLREPOVYX='';
		$FULLREPOANT='';
		$FULLREPOKW='';
		$FULLREPOLINK='';
		$FULLREPOAFF='';
		$FULLREPOINFO='';
		$size=intval($response0->size);
		$entry=$response0->result_0;
		$theid=htmlspecialchars($entry->id);
		$theid=addslashes($theid);
		$sid=$theid;
		if(isset($fjson->repobiblprefix))
		{
			$sid= substr($entry->id,strlen($fjson->repobiblprefix));
			$sid=substr($theid, strpos($theid, $fjson->repobiblprefix) + strlen($fjson->repobiblprefix));
		}
		else
		{
			if(isset($fjson->$ritem))
			{
				if(isset($fjson->$ritem->idprefix))
				{
					$sid= substr($entry->id,strlen($fjson->$ritem->idprefix));
					$sid=substr($theid, strpos($theid, $fjson->$ritem->idprefix) + strlen($fjson->$ritem->idprefix));
				}
			}
		}
		$globaloutput.='<div class="fright">&#160;&#160;<input type="button" class="button2" value="Вернуться к поиску" onmousedown="nextSearch()"/></div>';
		if((isset($_POST['_auth']))||($flag45)||(isset($fjson->listlit)))
		{
			$globaloutput.='<span class="fright"><input type="button" class="button2" value="Список литературы" onclick="showOrderList();"/></span><span class="fleft"><input type="button" class="button2" value="В список литературы" onclick="toOrderList(\''.$theid.'\');"/></span>';
		}
		$globaloutput.='<div class="spacer h10x"></div></div>';
		$socialtext='';
		$social='';
		$imgsrc='';
		$imgstr='';
		$output='';
		$taboutput='';
		$thelang='';
		$theogtype='';
		$theogtitle='';
		$theogdescription='';
		$theogkeywords='';
		$theogimage='';
		if(isset($entry->SEO_META_REPO_10))
		{
			$arr=$entry->SEO_META_REPO_10;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if(($arr[$i]!="") && (strpos($arr[$i], '[DESCRIPTION]') === false))
				{
					$resl=strpos($arr[$i], '[LANG]');
					$resty=strpos($arr[$i], '[OGTYPE]');
					$rest=strpos($arr[$i], '[OGTITLE]');
					$resd=strpos($arr[$i], '[OGDESCRIPTION]');
					$resk=strpos($arr[$i], '[OGKEYWORDS]');
					$resi=strpos($arr[$i], '[OGIMAGE]');
					$pos=strpos($arr[$i], '>');
					
					if($rest !== false)
					{
						$theogtitle=substr($arr[$i], $pos+1);
					}
					elseif($resl !== false)
					{
						$thelang=substr($arr[$i], $pos+1);
					}
					elseif($resty !== false)
					{
						$theogtype=substr($arr[$i], $pos+1);
					}
					elseif($resd !== false)
					{
						$theogdescription=substr($arr[$i], $pos+1);
					}
					elseif($resk !== false)
					{
						$theogkeywords=substr($arr[$i], $pos+1);
					}
					elseif($resi !== false)
					{
						$theogimage=substr($arr[$i], $pos+1);
					}
					else
					{
						;
					}
				}
			}
		}
		if(isset($entry->FULLREPOTITL_0))
		{
			$output.='<div class="output FULLREPOTITL">';
			$arr=$entry->FULLREPOTITL_0;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOAUTH2_1))
		{
			$output.='<div class="output FULLREPOAUTH">';
			$arr=$entry->FULLREPOAUTH2_1;
			$len = count ($arr);
			$j=0;
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$rc=strpos($arr[$i], '[AF]'); 
					$rc1=strpos($arr[$i], '[/AF]'); 
					$rl=strpos($arr[$i], '[LINK]'); 
					$rl1=strpos($arr[$i], '[/LINK]');
					$rh=strpos($arr[$i], '[HINT]'); 
					$rh1=strpos($arr[$i], '[/HINT]');
					$firstpart=substr($arr[$i],0,$rh);
					$lastpart=substr(substr($arr[$i],0,$rh1),$rh+6);
					$linkpart="";
					if($rl != false)
					{
						$linkpart=substr(substr($arr[$i],0,$rl1+7),$rl);
						$firstpart=substr($arr[$i],0,$rl);
					}
					if($j > 0)
						$output.=', ';
					if($rc1 !== false)
					{
						$partaf=substr(substr($arr[$i],0,$rc1),$rc+4);
						$firstpart=substr($firstpart,$rc1+5);
						$output.='<span data="'.$lastpart.'" onmousedown="findInRepoAf(\''.$partaf.'\')">'.$firstpart.'</span>'.$linkpart;
					}
					else
					{
						$output.='<span data="'.$lastpart.'">'.$firstpart.'</span>'.$linkpart;			
					}
					$j++;
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOSRC_2))
		{
			$output.='<div class="output FULLREPOSRC">';
			$arr=$entry->FULLREPOSRC_2;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOVYX_3))
		{
			$output.='<div class="output FULLREPOVYX">';
			$arr=$entry->FULLREPOVYX_3;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOANT_4))
		{
			$output.='<div class="output FULLREPOANT">';
			$arr=$entry->FULLREPOANT_4;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOKW_5))
		{
			$output.='<div class="output FULLREPOKW">';
			$arr=$entry->FULLREPOKW_5;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOLINK_6))
		{
			$taboutput.='<div class="FULLREPOLINK">';
			$arr=$entry->FULLREPOLINK_6;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$taboutput.='<div>'.$arr[$i].'</div>';
				}
			}
			$taboutput.='</div>';
		}
		if(isset($entry->FULLREPOAFF2_7))
		{
			$output.='<div class="output FULLREPOAFF"><div><b>Адреса:</b></div>';
			$arr=$entry->FULLREPOAFF2_7;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOINFO_8))
		{
			$output.='<div class="output FULLREPOINFO">';
			$arr=$entry->FULLREPOINFO_8;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		if(isset($entry->FULLREPOPHOTO_9))
		{
			
			$arr=$entry->FULLREPOPHOTO_9;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$imgsrc=$arr[$i];
				}
			}
		}
		if(isset($entry->SEO_MARC_11))
		{
			
			$output.='<div class="output SEO_MARC">';
			$arr=$entry->SEO_MARC_11;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div>'.$arr[$i].'</div>';
				}
			}
			$output.='</div>';
		}
		
		if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
		{
			$social='<span class="social w88x"><input type="hidden" name="purl" value="'.$portname.'://'.THEHOSTNAME.''.THEPATHFIND.'?iddb='.$iddb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
		}
		if($imgsrc!="")
		{
			$imgstr='<figure tabindex="1" style="background-image:url('.$imgsrc.')"></figure>';
		}
		$globaloutput.='<div class="searchrezult">';
		$globaloutput.='<div class="table w100"><div class="row"><div class="td vtop pr20x">'.parseBB($output).'</div><div class="td vtop rcol"><center>'.$imgstr.''.$social.'</center>'.parseBB($taboutput).'<div class="uri"><p><input style="width:1px;height:1px;opacity:0;margin-left:-2px;" type="text" name="surl" value="//'.THEHOSTNAME.''.THEPATHARTICLES.'/'.$sid.'/"/><b title="Унифицированный идентификатор ресурса">URI:</b><a target="_blank" href="//'.THEHOSTNAME.''.THEPATHARTICLES.'/'.$sid.'/">'.$sid.'</a><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)" class="copylink"></span></p></div></div></div></div>';
		$globaloutput.='<div class="spacer h10x"></div><div>Унифицированный идентификатор ресурса для цитирования: <span class="cite">//'.THEHOSTNAME.''.THEPATHARTICLES.'/'.$sid.'/</span></div></div>';
	}
}
else
{
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}

include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
echo $globaloutput.'</div></div>';
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
