<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">';

if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	$response1=$result->response_1;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$start=intval($result->_start);
	$size=intval($result->_size);
	$searchtitle="Коллекции";
	if(isset($response0->_searchtitle))
		$searchtitle=$response0->_searchtitle;
	$ndb=$response0->_iddb;
	$length=10;
	$outform="SHOTFORM";
	$itemsstr='';
	$colsstr='';
	$labresprefix=$fjson->collection->labresprefix;;
	$idslist="";
	$idsarr=array();
	if(isset($response0->_idslist))
		$idslist=$response0->_idslist;
	if($idslist!="")
	{
		$arr1=explode('|', $idslist);
		$larr1=count ($arr1);
		if($larr1>0)
		{
			for($i=0; $i<$larr1; $i++)
			{
				if($arr1[$i]!="")
				{
					$idsarr[$arr1[$i]]=$arr1[$i];
				}
			}
		}
	}
	if(isset($response0->_length))
		$length=$response0->_length;
	if(isset($response0->_length))
		$length=$response0->_length;
	if(isset($response0->_outform))
		$outform=$response0->_outform;
	$labres=$response0->_labres;
	
	$globaloutput.= <<<HTML
		$searchtitle</span>
		</div>
		<div class="col_content">
		<div class="table w100 mt20x">
			<div class="row">
				<div class="td">
					<div id="menu_button_collections" onmousedown="showHideM('col_menu')">Выбрать коллекции для просмотра</div>
					<ul id="col_menu" class="block">
HTML;


	
	if(intval($size) > 0)
	{
		$counter=0;
		foreach ($response0 as $key => $value)
		{
			$pos = strpos($key, 'result_');
			if($pos !== false)
			{
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->COLLWEB_0))
				{
					$imgsrc=THEIMGPATH.'/nophoto.png';
					$annotshort='';
					$annotfull='';
					$theafid='';
					$term='';
					$seef='';
					$arr=$value->COLLWEB_0;
					$len = count ($arr);
					$ind=time();
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							$res=strpos($arr[$i], '[IMG]');
							$res2=strpos($arr[$i], '[ID]');
							$res3=strpos($arr[$i], '[ANNOTSHORT]');
							$res4=strpos($arr[$i], '[ANNOTFULL]');
							$res5=strpos($arr[$i], '[SEEF]');
							if($res !== false)
							{
								$imgsrc=substr($arr[$i], $res+5);
							}
							elseif($res2 !== false)
							{
								$theafid=substr($arr[$i], $res2+4);
								$theafid=addslashes($theafid);
							}
							elseif($res3 !== false)
							{
								$annotshort=substr($arr[$i], $res3+12);
							}
							elseif($res4 !== false)
							{
								$annotfull=substr($arr[$i], $res4+11);
							}
							elseif($res5 !== false)
							{
								$seef=substr($arr[$i], $res5+6);
							}
							else
							{
								$term=$arr[$i];
								$counter++;
							}
						}
					}
					$colsstr.='<li class="folder"><div><input type="checkbox" name="wr" id="wr'.$ind.''.$counter.'" /><label for="wr'.$ind.''.$counter.'" class="term"><span>'.parseBB($term).'</span></label><br clear="all"/><div class="figcont"><figure tabindex="1" style="background-image:url('.$imgsrc.')"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title=""/></figure><div id="'.$theafid.'" class="resourсes" title="Посмотреть" onmousedown="showResources(this)" data-label="'.$labres.'" data-labrespref="'.$labresprefix.'" data-title="'.$term.'">Документы</div></div><div class="annotshort"><div>'.$annotshort.'</div></div><div class="annotfull"><div>'.$annotfull.'</div>';
					if($seef != '')
					{
						$colsstr.='<div class="dn" id="_'.$theid.'"></div><script>searchSubCollection("'.$theid.'"); </script>';
					}
					$colsstr.='</div></div></li>';
				}
				if(isset($value->TITLEWEB_0))
				{
					$imgsrc=THEIMGPATH.'/nophoto.png';
					$term='';
					$theafid='';
					$arr=$value->TITLEWEB_0;
					$len = count ($arr);
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							$res=strpos($arr[$i], '[IMG]');
							$res2=strpos($arr[$i], '[ID]');
							if($res !== false)
							{
								$imgsrc=substr($arr[$i], $res+5);
							}
							elseif($res2 !== false)
							{
								$theafid=substr($arr[$i], $res2+4);
								$theafid=addslashes($theafid);
							}
							else
							{
								$term=$arr[$i];
							}
						}
					}
					$termin=$term;
					$from=$from = array("'", "\"", "\\");
					$to = array("[apos]", "[quot]", "[backslash]");
					$newtermin = str_replace($from, $to, $termin);
					$colsstr.='<li id="'.$theafid.'" class="gallery" data-iddb="'.$ndb.'" onmousedown="showResources(this)" data-label="'.$labres.'" data-labrespref="'.$labresprefix.'" data-title="'.$newtermin.'"><div class="img"><figure tabindex="1" style="background-image:url('.$imgsrc.')"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" title="" vspace="0" hspace="0" border="0"></figure></div><div class="cont">'.parseBB($term).'</div></li>';
				}
			}
		}
	}
	else
	{
		$colsstr.='<li class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</li>';

	}
	$countitems=0;
	foreach ($response1 as $key => $value)
	{
		$res = strpos($key, 'indx_');
		if($res !== false)
		{
			$labsubcol=$response1->_labsubcol;
			$itemsstr.='<li id="item-'.$countitems.'" data-label="'.$labsubcol.'" onmousedown="chooseCollections(this)"';
			if(isset($idsarr['item-'.$countitems]))
				$itemsstr.=' class="colorized"';
			$itemsstr.='>'.$value->item.'</li>';
			$countitems++;
		}
	}
	
$globaloutput.= <<<HTML
						$itemsstr
					</ul>
				</div>
				<div class="td">
					<div class="newscontrols">
						<span title="Смотреть списком" data-outform="COLLWEB" data-iddb="$ndb" data-title="Коллекции" onmousedown="showAllCollectionsNew(this)">Список</span>
						<span title="Смотреть в виде галереи" data-outform="TITLEWEB" data-iddb="$ndb" data-title="Коллекции" onmousedown="showAllCollectionsNew(this)">Галерея</span>
					</div>

HTML;
					

$N1=ceil($size/$length);
if($N1!= 1)
{
	$globaloutput.= '<p class="pages">';
	$globaloutput.= resPaginator($start,$length,$size,NULL,'8');
	$globaloutput.= '</p>';
}


$globaloutput.= <<<HTML
					<div class="$outform">
						<ul>
							$colsstr
						</ul>
					</div>

HTML;
					

$N1=ceil($size/$length);
if($N1!= 1)
{
	$globaloutput.= '<p class="pages">';
	$globaloutput.= resPaginator($start,$length,$size,NULL,'8');
	$globaloutput.= '</p>';
}


$globaloutput.= <<<HTML
				</div>
			</div>
		</div>
	</div>
</div>

HTML;

	
}
else
{
	$globaloutput.='</span></div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>