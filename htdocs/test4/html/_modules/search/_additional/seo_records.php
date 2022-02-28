<?php
$term="";
$pref="";
$iddb="";
$rlogin=$fjson->repologin;

if(isset($seo_record_iddb) && ($seo_record_iddb != ""))
	$iddb=$seo_record_iddb;
else
{
	if(isset($fjson->repobibldb))
		$iddb=$fjson->repobibldb;
	else
	{
		$iddb=$fjson->numdbbibl;
	}
}
if(isset($fjson->repobiblprefix))
	$pref=$fjson->repobiblprefix;
else
{
	$item='dbs_'.$iddb;
	if(isset($fjson->$item))
	{
		if(isset($fjson->$item->idprefix))
			$pref=$fjson->$item->idprefix;
	}
}

$term = $pref.''.$seo_record_id;


$postdata = http_build_query(
    array(
        '_action' => 'fulltext',
		'querylist' => '<_service>STORAGE:opacfindd:FindView[separator]<_version>2.7.0[separator]<session>'.$nsean.'[separator]<start>0[separator]<length>15[separator]<iddbIds[0]/iddb>'.$iddb.'[separator]<iddbIds[0]/id>'.$term.'[separator]<outformList[0]/outform>FULLREPOTITL[separator]<outformList[1]/outform>FULLREPOAUTH2[separator]<outformList[2]/outform>FULLREPOSRC[separator]<outformList[3]/outform>FULLREPOVYX[separator]<outformList[4]/outform>FULLREPOANT[separator]<outformList[5]/outform>FULLREPOKW[separator]<outformList[6]/outform>FULLREPOLINK[separator]<outformList[7]/outform>FULLREPOAFF2[separator]<outformList[8]/outform>FULLREPOINFO[separator]<outformList[9]/outform>FULLREPOPHOTO[separator]<outformList[10]/outform>SEO_META_REPO[separator]<outformList[11]/outform>SEO_MARC[separator]<userId>'.$rlogin.'[separator]'
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

//var_dump($res);

require_once(THEINCLUDESPATH.'/functions.php');

$json = json_decode($res, true);

$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div><div class="col_content">';

$error="";
$theid="";
$output="";
$taboutput="";
$imgstr="";
$imgsrc="";
$social="";
$sid="";
$size="0";
$thelang='';
$theogtype='';
$theogtitle='';
$theogdescription='';
$theogkeywords='';
$theogimage='';

foreach ($json as $arg => $prop)
{
	foreach ($prop as $key => $value)
	{
		if($key == 'size')
		{
			$size=$value;
			if(intval($value) == 0)
			{
				$error='<div class="acenter"><br/><br/><div>По вашему запросу ничего не найдено</div></div>';
			}
		}
		if((strpos($key, 'result_') !== false) && (intval($size) > 0))
		{
			foreach ($value as $k => $val)
			{
				if(strpos($k, 'error_') !== false)
				{
					$error='<div class="acenter"><br/><br/><div>По вашему запросу ничего не найдено</div></div>';
				}
				else
				{
					if($k == 'id')
					{
						$sarr= explode('-', $val);
						$sid=$sarr[2];
						$theid=htmlspecialchars($val);
						$theid=addslashes($theid);
					}
					if(strpos($k, 'SEO_META_REPO') !== false)
					{
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if(($arr[$i] != "") && (strpos($arr[$i], '[DESCRIPTION]') === false))
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
					if(strpos($k, 'FULLREPOTITL') !== false)
					{
						$output.='<div class="output FULLREPOTITL">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<h1>'.$arr[$i].'</h1>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOAUTH') !== false)
					{
						$output.='<div class="output FULLREPOAUTH">';
						$arr=$val;
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
									if(isset($fjson->repoafprefix))
									{
										$sind = substr($partaf,strlen($fjson->repoafprefix));
										$output.='<a data="'.$lastpart.'" href="//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$sind.'/">'.$firstpart.'</a>'.$linkpart;
									}
									else
									{
										$output.='<span data="'.$lastpart.'" onmousedown="simpleSearchAF(null,\''.$fjson->numdbaf.'\',\'ID\',\''.$partaf.'\')">'.$firstpart.'</span>'.$linkpart;
									}
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
					if(strpos($k, 'FULLREPOSRC') !== false)
					{
						$output.='<div class="output FULLREPOSRC">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOVYX') !== false)
					{
						$output.='<div class="output FULLREPOVYX">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOANT') !== false)
					{
						$output.='<div class="output FULLREPOANT">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOKW') !== false)
					{
						$output.='<div class="output FULLREPOKW">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOLINK') !== false)
					{
						$taboutput.='<div class="FULLREPOLINK">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$taboutput.='<div>'.$arr[$i].'</div>';
							}
						}
						$taboutput.='</div>';
					}
					if(strpos($k, 'FULLREPOAFF') !== false)
					{
						$output.='<div class="output FULLREPOAFF">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOINFO') !== false)
					{
						$output.='<div class="output FULLREPOINFO">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'FULLREPOPHOTO') !== false)
					{
						$output.='<div class="output FULLREPOPHOTO">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$imgsrc=$arr[$i];
							}
						}
						$output.='</div>';
					}
					if(strpos($k, 'SEO_MARC') !== false)
					{
						$output.='<div class="output SEO_MARC">';
						$arr=$val;
						$len = count ($arr);
						for($i=0; $i<$len; $i++)
						{
							if($arr[$i] != "")
							{
								$output.='<div>'.$arr[$i].'</div>';
							}
						}
						$output.='</div>';
					}
				}
			}
		}
	}
}

echo "
".'<script>'."
".'var _iddb='.$iddb.';'."
".'var _typesearch="simple";'."
".'var _typework="search";'."
".'</script>'."
";

if($error != "")
{
	$globaloutput.=$error.'</div></div>';
}
else
{
	if($imgsrc!="")
	{
		$imgstr='<figure tabindex="1" style="background-image:url('.$imgsrc.')"></figure>';
	}
	$globaloutput.='<div class="searchrezult">';
	$globaloutput.='<div class="table w100">';
	$globaloutput.='<div class="row">';
	$globaloutput.='<div class="td vtop pr20x">'.parseBB($output).'</div><div class="td vtop rcol"><center>'.$imgstr.''.$social.'</center>'.parseBB($taboutput).'<div class="uri"><p><input style="width:1px;height:1px;opacity:0;margin-left:-2px;" type="text" name="surl" value="//'.THEHOSTNAME.'/'.$seo_record_section.'/'.$sid.'/"/><b title="Унифицированный идентификатор ресурса">URI:</b><a target="_blank" href="'.$seo_uri.'">'.$sid.'</a><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)" class="copylink"></span></p></div></div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
	$globaloutput.='<div class="spacer h10x"></div><div>Унифицированный идентификатор ресурса для цитирования: <span class="cite">//'.THEHOSTNAME.'/'.$seo_record_section.'/'.$sid.'/</span></div></div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
}

//var_dump($result);

//$res = ob_get_contents();
//ob_end_clean();

include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>