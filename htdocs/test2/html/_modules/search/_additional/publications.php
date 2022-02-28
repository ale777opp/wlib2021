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
					<h1>$pagetitle</h1>


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
	//if($sign!="")
	//	$globaloutput.= '<span class="caption1">&#160;/&#160;'.$sign.'</span>';
	$globaloutput.= '<div id="newscontainer">';
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	$outform="SHORTPUB";
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
			$globaloutput.= resPaginator($start,$length,$size,NULL,'13');
			$globaloutput.= '</p>';
		}
		$count=0;
		$textoutput="";
		$output='';	
		//$output.='<h3>'.$sign.'</h3>';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->SHORTPUB_0))
				{
					$arr=$value->SHORTPUB_0;
					$len = count ($arr);
					$llen=$len-1;
					$lllen=$len-2;
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
							{
								$output.='<div class="nessite"><div class="fstn" ><span onmousedown="addPublications(\''.$theid.'\','.$iddb.')"  title="Подробнее">'.parseBB($arr[$i]).'</span></div><div>';
							}
							else
							{
								$output.='<div>';
								if($i==1)
								{
									$output.='<span><span>'.parseBB($arr[$i]).'</span></span>';
								}
								else
								{
									$output.=parseBB($arr[$i]);
									if($i==$lllen)
									{
										$output.='<span onmousedown="addPublications(\''.$theid.'\','.$iddb.')" class="nels" title="Подробнее">Еще</span>';
									}
								}
								$output.='</div>';
							}
						}
					}
					$output.='</div></div>';
				}
			}
		}
		$globaloutput.=$output;
		
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'13');
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