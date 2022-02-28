<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$namarr=$fjson->newsasmodule;
$namarrlen=count ($namarr);
$titlemodule = $namarr[0]->title;
$pagetitle='';
$globaloutput= <<<HTML
<div class="spacer"></div>
<div id="infor">
	<div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">$titlemodule</span></div>
	<div class="col_content">
		<div class="table w100 mt20x h100">
			<div class="row h100">
				<div class="td w21 vtop pr20x pb20x">
					<ul class="left_menu">
HTML;


for($i=1; $i<$namarrlen; $i++)
{
	$globaloutput.='<li><span ';
	if($namarr[$i]->id == "partphoto")
	{
		$pagetitle=$namarr[$i]->title;
		$globaloutput.='class="aktive" ';
	}
	$globaloutput.='id="'.$namarr[$i]->id.'" onmousedown="switchSubSections(\''.$namarr[$i]->id.'\','.$namarr[$i]->ndb;
	if(isset($namarr[$i]->label))
		$globaloutput.=',\''.$namarr[$i]->label.'\'';
	$globaloutput.=')">'.$namarr[$i]->title.'</span></li>';
}

$globaloutput.= <<<HTML
					</ul>
				</div>
				<div class="td vtop content pr20x pb20x pl20x brl1c h100">
					<h1>$pagetitle


HTML;


if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	$sign="";
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	$outform="SHORTPHOTO";
	$sign="";
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	if($sign!="")
		$globaloutput.= '<span class="caption1">&#160;/&#160;'.$sign.'</span>';
	$globaloutput.= '</h1><div id="photoscontainer">';
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($result->response_0->_outform))
		$outform=$result->response_0->_outform;
	if(intval($size)==0)
	{
		$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
	}
	else
	{
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'6');
			$globaloutput.= '</p>';
		}
		$count=0;
		if($sign != "")
			$sign='<h3>'.$sign.'</h3>';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$title='';
				$output='';
				$imgsrc='';
				$imgstr='';
				$seef='';
				$impref='';
				$impostf='.jpg';
				$socialtext='';
				$social='';
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->SHORTPHOTO_0))
				{
					$arr=$value->SHORTPHOTO_0;
					$len = count ($arr);
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
								$title=parseBB($arr[$i]);
							else
							{	
								$res7=strpos($arr[$i], '[IMG]'); 
								$resf=strpos($arr[$i], '[SEEF]');
								$pos=strpos($arr[$i], '>');
								$str1=substr($arr[$i],0,$pos);
								$pos1=strpos($str1, '<')+1; 
								$str=substr($str1,$pos1);
								if($res7 !== false)
								{
									$imgsrc.=substr($arr[$i], $res7+5);
									/*$pos2=strpos($imgsrc, '.jpg');
									if($pos2!==false)
									{
										$impref=substr($imgsrc,0,$pos2);
										$imgstr='<input type="hidden" name="img" value="'.$imgsrc.'"/><img border="0" hspace="0" vspace="0" width="120" alt="" title="" src="'.$impref.'-1'.$impostf.'"/>';
									}*/
									$imgstr='<input type="hidden" name="img" value="'.$imgsrc.'"/><img border="0" hspace="0" vspace="0" width="120" alt="" title="" src="'.$imgsrc.'"/>';
								}
								elseif($resf !== false)
								{
									$termin=substr($arr[$i], $pos+1);
									$from=$from = array("'", "\"", "\\");
									$to = array("[apos]", "[quot]", "[backslash]");
									$newtermin = str_replace($from, $to, $termin);
									$outf='SHORTPHOTO';
									if($str=="Фото")
									{
										$outf='FULLPHOTO';
									}
									$seef.='searchPhoto(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\',\''.$outf.'\','.$iddb.',\''.$title.'\')';
								}
								else
								{
									$output.='<div class="note">'.parseBB($arr[$i]).'</div>';
								}
							}
						}
					}
					$globaloutput.='<div onmousedown="'.$seef.'" class="photocont table w100"><div class="row"><div class="td w130x vtop pt5x pr5x pb10x"><div class="thumb">'.$imgstr.'</div></div><div class="td vtop pl5x pt5x pb5x w100"><div class="fstn"><span title="Подробнее">'.$title.'</span></div>'.$output.'</div></div></div>';
				}
				if(isset($value->FULLPHOTO_0))
				{
					$arr=$value->FULLPHOTO_0;
					$len = count ($arr);
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
							{
								$title=parseBB($arr[$i]);
								$socialtext.=strip_tags($title);
							}
							else
							{	
								$res7=strpos($arr[$i], '[IMG]');
								if($res7 !== false)
								{
									$imgsrc.=substr($arr[$i], $res7+5);
									/*$pos2=strpos($imgsrc, '.jpg');
									if($pos2!==false)
									{
										$impref=substr($imgsrc,0,$pos2);
										$imgstr='<input type="hidden" name="img" value="'.$imgsrc.'"/><figure tabindex="1"><span class="thumb"><img border="0" hspace="0" vspace="0" alt="" title="" src="'.$impref.'-1'.$impostf.'"/></span>';
									}*/
									$imgstr='<input type="hidden" name="img" value="'.$imgsrc.'"/><figure tabindex="1"><span class="thumb"><img width="120" border="0" hspace="0" vspace="0" alt="" title="" src="'.$imgsrc.'"/></span>';
								}
								else
								{
									$output.='<span>'.parseBB($arr[$i]).'</span>';
								}
							}
						}
					}
					$globaloutput.='<div class="newrecs" onmousedown="zoomImg(this)">'.$imgstr.'<figcaption class="newssign">'.$title.'</figcaption></figure></div>';
				}
			}
		}
		/*if($sign !="")
		{
			$social='<span class="social w88x"><input type="hidden" name="purl" value="'.THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHFIND.'?action=PHOTOS&iddb='.$iddb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
			$social.='<br/><span class="scopy w88x"><input style="height:1px;opacity:0" type="text" name="surl" value="'.THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHFIND.'?action=PHOTOS&iddb='.$iddb.'&ID='.$theid.'"/><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)">Скопировать ссылку</span></span>';
		}*/
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'6');
			$globaloutput.= '</p>';
		}
	}
}
else
{
	$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
}
$globaloutput.= <<<HTML
					</div>
				</div>
				<!--<div class="td vtop w10 content pt50x pl20x pr20x pb20x">
				<div class="b c6 f80 pl5x">$sign $social</div>
				</div>-->
			</div>
		</div>


HTML;

include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
$ppath=THEPAGESPATH.'/newssite/_events/events.html';
if(file_exists($ppath))
{
	include ($ppath);
}
echo '</div></div><div class="spacer"></div>';
include (THEPAGESPATH.'/includes/footer.php');
?>