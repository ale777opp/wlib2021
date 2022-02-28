<?php 

$globaloutput = <<<HTML
<div id="infor">
	<div class="parallax-1">
		<h3>
			<span>
					<span>Труды университета -</span>
					<span>неотъемлемая часть</span>
					<span>научного наследия</span>
					<span>страны</span>
			</span>
		</h3>
	</div>
	<div class="pcontent-1">
		<div class="header">
			<div>Разделы</div>
			<div>Просмотр</div>
		</div>


HTML;
	
		

$term = '(ID *)';
$iddb=$fjson->repobibldb;
$rlogin=$fjson->repologin;
$item='dbs_'.$iddb;

$postdata = http_build_query(
    array(
        '_action' => 'fulltext',
		'querylist' => '<_service>STORAGE:opacfindd:FindView[separator]<_version>2.7.0[separator]<session>1698199[separator]<_start>0[separator]<start>0[separator]<length>15[separator]<outformList[0]/outform>ORDERFORM[separator]<query/params[0]/name>presence[separator]<query/params[0]/value>INCLUDE[separator]<iddb>'.$iddb.'[separator]<query/body>'.$term.'[separator]<facets[0]/type>terms[separator]<facets[0]/name>FG[separator]<facets[0]/field>FG[separator]<facets[0]/limit>500[separator]<facets[0]/sort/entity>count[separator]<facets[0]/sort/order>desc[separator]<facets[1]/type>terms[separator]<facets[1]/name>AU[separator]<facets[1]/field>AU[separator]<facets[1]/limit>500[separator]<facets[1]/sort/entity>count[separator]<facets[1]/sort/order>desc[separator]<facets[2]/type>terms[separator]<facets[2]/name>MSH[separator]<facets[2]/field>MSH[separator]<facets[2]/limit>500[separator]<facets[2]/sort/entity>count[separator]<facets[2]/sort/order>desc[separator]<facets[3]/type>terms[separator]<facets[3]/name>PY[separator]<facets[3]/field>PY[separator]<facets[3]/limit>500[separator]<facets[3]/sort/entity>index[separator]<facets[3]/sort/order>desc[separator]<query/label>DT[separator]<query/direct>desc[separator]<userId>'.$rlogin.'[separator]'
    )
);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);
 
$context  = stream_context_create($opts);
 
$res = file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP, false, $context);

require_once(THEINCLUDESPATH.'/functions.php');

$json=prepareJson($res);

$globaloutput.='<div class="table"><div class="row">';

foreach ($json as $arg => $prop)
{
	foreach ($prop as $a => $b)
	{
		if(strpos($a, 'facets_') !== false)
		{
			$role=$b->name;
			$coltitle=$fjson->$item->labels->$role->title;
			$globaloutput.='<div class="td"><div><div>'.$coltitle.'</div><div id="'.$role.'">';
			$backet=array();
			foreach ($b as $c => $d)
			{
				if(strpos($c, 'buckets_') !== false)
				{
					$backet[]=array($d->value,$d->count);
				}
			}
			$lbacket=count($backet);
			$xarr=array();
			$yarr=array();
			$x=0;
			$y=0;
			$z=0;
			for($j=0;$j<$lbacket;$j++)
			{
				$xarr[$x]='<div class="table"><span data-label="'.$role.'" class="td" onmousedown="callToSearch(this)">'.$backet[$j][0].'</span><i class="td">'.$backet[$j][1].'</i></div>';
				$x++;
				$z++;
				if($x % 5 == 0)
				{
					$yarr[$y]=$xarr;
					$x=0;
					$y++;
					$xarr=array();
				}
				if($z == $lbacket)
				{
					if(count($xarr) > 0)
						$yarr[$y]=$xarr;
					$x=0;
					$y=0;
					$z=0;
					$xarr=array();
				}
			}
			$ycount=count($yarr);
			for($j=0;$j<$ycount;$j++)
			{
				$style='';
				if($j>0)
					$style=' style="display:none"';
				$globaloutput.='<div'.$style.'>';
				
				if($j>0)
					$globaloutput.='<div class="table even" onmousedown="facetsBack(this)"><span class="td">назад</span><span></span></div>';
				$acount=count($yarr[$j]);
				for($m=0;$m<$acount;$m++)
				{
					$globaloutput.=$yarr[$j][$m];
				}
				if($lbacket>5)
				{
					if($acount==5)
					{
						if(isset($yarr[$j+1]))
						{
							if($j<$ycount)
								$globaloutput.='<div class="table else" onmousedown="facetsNext(this)"><span class="td"></span><span class="td">далее</span></div>';
						}
					}
				}
				$globaloutput.='</div>';
			}
			$globaloutput.='</div></div></div>';
		}
	}
}
$globaloutput.='</div></div></div></div>';

include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>

