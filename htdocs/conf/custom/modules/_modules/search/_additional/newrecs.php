<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
include (THEPAGESPATH.'/includes/searchdiv.php');
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
	if($namarr[$i]->id == "partnewrecs")
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



$month=date('m').'';
$month_number=$month;
$year=date('Y').'';
$year_number=intval($year);
$month_num=intval($month_number)-1;

if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$newsoutform="";
	if(isset($result->response_0->_newsoutform))
		$newsoutform=$result->response_0->_newsoutform;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	$ldb=$iddb;
	$lightstring="";
	if(isset($response0->_lightstring))
		$lightstring=$response0->_lightstring;
	$sign="";
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	if($sign!="")
		$globaloutput.= '<span class="caption1">&#160;/&#160;'.$sign.'</span>';
	$globaloutput.= '</h1><div id="newscontainer">';
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	$outform="SHOTFORM";
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($result->response_0->_outform))
		$outform=$result->response_0->_outform;
	if(isset($result->response_0->_year))
		$year_number=intval($result->response_0->_year);
	if(isset($result->response_0->_month))
		$month_number=$result->response_0->_month;
	$month_class=intval($month_number)-1;
	
	echo $globaloutput;	
	$globaloutput='';
	
	if(intval($size)==0)
	{
		$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
	}
	else
	{
		$count=0;
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			echo '<p class="pages">';
			echo resPaginator($start,$length,$size,NULL,'7');
			echo '</p>';
		}

		include THEMODULESPATH.'/search/_output/'.$outform.'.php';		

		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			echo '<p class="pages">';
			echo resPaginator($start,$length,$size,NULL,'7');
			echo '</p>';
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
				<div class="td vtop w20 content pl20x pr20x pb20x">
					<div class="mt50x ml20x">
HTML;


echo $globaloutput;
include (THEMODULESPATH.'/search/_additional/calendar.php');
$globaloutput='';

$globaloutput.= <<<HTML
					</div>
				</div>
			</div>
		</div>


HTML;

echo $globaloutput;
$ppath=THEPAGESPATH.'/newssite/_events/events.html';
if(file_exists($ppath))
{
	include ($ppath);
}
echo '</div></div><div class="spacer"></div>';
include (THEPAGESPATH.'/includes/footer.php');
?>