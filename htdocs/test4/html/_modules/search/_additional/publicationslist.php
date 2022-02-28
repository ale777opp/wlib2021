<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$namarr=$fjson->newsasmodule;
$namarrlen=count ($namarr);
$titlemodule = $namarr[0]->title;
$pagetitle='';
$addlabel='';
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
		$addlabel=$namarr[$i]->addlabel;
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
					<div class="newscontrols">
						<!--<span onmousedown="searchPublications($ndb,'all')">Все $pagetitle</span>
						<span onmousedown="searchPublications($ndb,'archiv')">Архив</span>-->
					</div>
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
	$sign="";
	$label="";
	$length=15;
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($response0->_label))
		$label=$response0->_label;
	if(isset($response0->indx_0))
	{
		$count=0;
		$globaloutput.='<ul class="pub">';
		$prev="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'indx_');
			if($res !== false)
			{
				$count++;
				$vocfunc='searchPubTheme(this,'.$iddb.')';
				$term=$value->item;
				$res3=strpos($value->item, '[SUB]');
				if($res3 !== false)
				{
					$vocfunc='searchPubThemeList('.$iddb.',\''.$addlabel.'\')';
					$term=substr($value->item,0,$res3);
					if($prev==$term)
						$term="";
					$prev=$term;
				}
				if($term!="")
				{
					$term = mb_strtolower($term, 'UTF-8');
					$term = my_mb_ucfirst($term);
					$globaloutput.='<li class="u" onmousedown="'.$vocfunc.'">'.htmlspecialchars($term).'</li>';
				}
			}
		}
		$globaloutput.='</ul>';
	}
	else
	{
		$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
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
				<div class="b c6 f80 pl5x"></div>
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