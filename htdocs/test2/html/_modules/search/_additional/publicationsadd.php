<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$namarr=$fjson->newsasmodule;
$namarrlen=count ($namarr);
$titlemodule = $namarr[0]->title;
$pagetitle='';
$ndb='';

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
	if($namarr[$i]->id == "partpub")
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
					<!--<h1>$pagetitle</h1>
					<div class="newscontrols">
						<span onmousedown="searchPublications($ndb,'all')">Все $pagetitle</span>
						<span onmousedown="searchPublications($ndb,'archiv')">Архив</span>
					</div>-->
					<div id="newscontainer">


HTML;


if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	$outform="FULLNEWS";
	$sign="";
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
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
			$globaloutput.= resPaginator($start,$length,$size,NULL,'9');
			$globaloutput.= '</p>';
		}
		$count=0;
		$output='';
		$imgsrc='';
		$socialtext='';
		$social='';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->FULLPUB_0))
				{
					$arr=$value->FULLPUB_0;
					$len = count ($arr);
					$llen=$len-1;
					$lllen=$len-2;
					$output.='<div class="nessite">';
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
							{
								$term=parseBB($arr[$i]);
								$socialtext.=strip_tags($term);
								$output.='<div class="content"><h1>'.$term.'</h1></div>';
							}
							else
							{
								$res3=strpos($arr[$i], '[URL]');
								$res7=strpos($arr[$i], '[IMG]'); 
								$res8=strpos($arr[$i], '[/IMG]');
								if($res7 !== false)
								{
									$sstr=substr($arr[$i],0,$res8);
									$imgsrc.=substr($sstr, $res7+5);
								}
								if($res3 !== false)
								{
									$output.='<div><a target="_blank" href="'.substr($arr[$i], $res3+5).'">Полный текст</a></div>';
								}
								else
									$output.='<div>'.parseBB($arr[$i]).'</div>';
							}
						}
					}
					$output.='</div>';
				}
			}
		}
		$social='<span class="social w88x"><input style="height:1px;opacity:0" type="text" id="purl" name="purl" value="'.THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHFIND.'?action=PUBLICATIONS&iddb='.$iddb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
		$social.='<br/><span class="scopy w88x"><input style="height:1px;opacity:0" type="text" name="surl" value="'.THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHFIND.'?action=PUBLICATIONS&iddb='.$iddb.'&ID='.$theid.'"/><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)">Скопировать ссылку</span></span>';
		$globaloutput.=$output;
		
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'9');
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
				<div class="td vtop w20 content pt50x pl20x pr20x pb20x">
				<!--<div class="b c6 f80 pl5x">$sign</div>-->
				$social
				</div>
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