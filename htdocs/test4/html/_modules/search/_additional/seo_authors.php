<?php
$term="";
$pref="";
$iddb="";
$iddbbibl="";

$rlogin=$fjson->repologin;

if(isset($seo_record_iddb) && ($seo_record_iddb != ""))
	$iddb=$seo_record_iddb;
else
{
	if(isset($fjson->repoafdb))
		$iddb=$fjson->repoafdb;
	else
	{
		$iddb=$fjson->numdbaf;
	}
}
if(isset($fjson->repobibldb))
	$iddbbibl=$fjson->repobibldb;
else
{
	$iddbbibl=$fjson->numdbbibl;
}
if(isset($fjson->repoafprefix))
	$pref=$fjson->repoafprefix;
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
		'querylist' => '<_service>STORAGE:opacafd:Find[separator]<_version>1.3.0[separator]<session>'.$nsean.'[separator]<length>15[separator]<iddb>'.$iddb.'[separator]<query/mode>wordSet[separator]<query/body>(ID '.$term.')[separator]<query/direct>asc[separator]<query/label>s1[separator]<query/outforms[0]>AFREPO1[separator]<query/outforms[1]>AFREPO2[separator]<query/outforms[2]>AFREPO3[separator]<query/outforms[3]>AFREPO4[separator]<query/outforms[4]>AFREPO5[separator]<query/outforms[5]>SEO_MARC[separator]<userId>'.$rlogin.'[separator]'
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

$json = json_decode($res, true);

$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div><div class="col_content">';

$error="";
$output="";
$taboutput="";
$imgstr="";
$imgsrc="";
$social="";
$size="0";
$poutput="";
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
				if(strpos($k, 'AFREPO') !== false)
				{
					$title='';
					foreach ($val as $ar => $va)
					{
						foreach ($va as $arr => $var)
						{
							if($var=='FIO')
							{
								$title='FIO';
							}
							if($var=='IMG')
							{
								$title='IMG';
							}
							if(strpos($arr, 'entries_') !== false)
							{
								foreach ($var as $a => $b)
								{
									if($a == 'text')
									{
										if($title == 'FIO')
										{
											$title="";
											$output.='<h1 class="FIO">'.substr($b,(strpos($b, '[FIO]')+5)).'</h1>';
										}
										else
										{
											if(strpos($k, 'AFREPO2_') === false)
											{
												if(strpos($k, 'AFREPO5_') !== false)
												{
													$resl=strpos($b, '[LANG]');
													$resty=strpos($b, '[OGTYPE]');
													$rest=strpos($b, '[OGTITLE]');
													$resd=strpos($b, '[OGDESCRIPTION]');
													$resk=strpos($b, '[OGKEYWORDS]');
													$resi=strpos($b, '[OGIMAGE]');
													if($rest !== false)
													{
														$theogtitle=substr($b, $rest+9);
													}
													elseif($resl !== false)
													{
														$thelang=substr($b, $resl+8);
													}
													elseif($resty !== false)
													{
														$theogtype=substr($b, $resty+8);
													}
													elseif($resd !== false)
													{
														$theogdescription=substr($b, $resd+15);
													}
													elseif($resk !== false)
													{
														$theogkeywords=substr($b, $resk+12);
													}
													elseif($resi !== false)
													{
														$theogimage=substr($b, $resi+9);
													}
													else
													{
														;
													}
												}
												else
												{
													$search = '[space] [/space]';
													if (substr($b, strlen($b) - strlen($search)) == $search)
													{
														$output.='<div>'.substr($b, 0, strlen($b) - strlen($search)).'</div>';
													}
													else
													{
														$output.='<div>'.$b.'</div>';
													}
												}
											}
											else
											{
												$taboutput.='<div>'.$b.'</div>';
											}
										}
									}
									if($a=='url')
									{
										if($title == 'IMG')
										{
											$title="";
											$imgsrc=$b;
										}
									}
								}
							}
						}
					}
				}
				if(strpos($k, 'SEO_MARC') !== false)
				{
					$output.='<div class="output SEO_MARC">';
					foreach ($val as $ar => $va)
					{
						foreach ($va as $arr => $var)
						{
							if(strpos($arr, 'entries_') !== false)
							{
								foreach ($var as $a => $b)
								{
									if($a == 'text')
									{
										$output.='<div>'.$b.'</div>';
									}
								}
							}
						}
					}
					$output.='</div>';
				}
			}
		}
	}
}

if(intval($size) > 0)
{
	$postdata1 = http_build_query(
    array(
        '_action' => 'fulltext',
		'querylist' => '<_service>STORAGE:opacfindd:FindView[separator]<_version>2.7.0[separator]<session>'.$nsean.'[separator]<start>0[separator]<length>15[separator]<iddb>'.$iddbbibl.'[separator]<query/body>(AUIDS '.$term.')[separator]<outformList[0]/outform>SHOTREPO[separator]<userId>'.$rlogin.'[separator]'
		)
	);

	$opts1 = array('http' =>
		array(
			'method'  => 'POST',
			'header'  => 'Content-type: application/x-www-form-urlencoded',
			'content' => $postdata1
		)
	);
	 
	$context1  = stream_context_create($opts1);
	 
	$res1 = file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP, false, $context1);

	//var_dump($res1);

	$json1 = json_decode($res1, true);
	$size1="0";
	
	foreach ($json1 as $arg1 => $prop1)
	{
		if(strpos($arg1, 'response_') !== false)
		{
			foreach ($prop1 as $key => $value)
			{
				if($key == 'size')
				{
					$size1=$value;
				}
				if((strpos($key, 'result_') !== false) && (intval($size1) > 0))
				{
					$ind="";
					$sind="";
					foreach ($value as $k => $val)
					{
						if($k == 'id')
						{
							$ind=$val;
							$sind = substr($val,strlen($fjson->repobiblprefix));
						}							
						if(strpos($k, 'SHOTREPO_') !== false)
						{
							$poutput.='<div><div class="searchrez"><div class="output">';
							$arr=$val;
							$len = count ($arr);
							$j=0;
							for($i=0; $i<$len; $i++)
							{
								if($arr[$i]!="")
								{
									if((strpos($arr[$i], '[INSERT]') === false) && (strpos($arr[$i], '[codes]') === false) && (strpos($arr[$i], '[IMG]') === false))
									{
										if($j == 0)
										{
											//$poutput.='<div class="red ft" title="Подробнее" onmousedown="seeFullRopoInfo(\''.$ind.'\',1)">'.$arr[$i].'</div><a class="dn" target="_blank" href="//'.THEHOSTNAME.''.THEPATHARTICLES.'/'.$sind.'">'.$arr[$i].'</a>';
											$poutput.='<a title="Подробнее" class="red ft" href="//'.THEHOSTNAME.''.THEPATHARTICLES.'/'.$sind.'">'.$arr[$i].'</a>';
										}
										else
										{
											$poutput.='<div>'.$arr[$i].'</div>';
										}
										$j++;
									}
								}
							}
							$poutput.='</div></div></div>';
						}
					}
				}
			}
		}
	}
	$poutput='<div class="publink"><b>Всего публикаций:</b><span>'.$size1.'</span>'.parseBB($poutput).'</div>';
}

echo "
".'<script>'."
".'var _iddb='.$iddb.';'."
".'var _typesearch="authority";'."
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
	$globaloutput.='<div id="searchrezults">';
	$globaloutput.='<div class="table w100">';
	$globaloutput.='<div class="row">';
	$globaloutput.='<div class="td vtop pr20x">
						<div class="output">'.parseBB($output).''.$poutput.'<div class="spacer h10x"></div><div>Унифицированный идентификатор ресурса для цитирования: <span class="cite">//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$seo_record_id.'/</span></div></div>
					</div>
					<div class="td vtop rcol"><center>'.$imgstr.''.$social.'</center><div class="FULLREPOLINK"><div class="mt30x mb10x"><b>Другие идентификаторы</b></div>'.parseBB($taboutput).'<div class="uri"><p><input style="width:1px;height:1px;opacity:0;margin-left:-2px;" type="text" name="surl" value="//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$seo_record_id.'/"/><b title="Унифицированный идентификатор ресурса">URI:</b><a target="_blank" href="'.$seo_uri.'">'.$seo_record_id.'</a><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)" class="copylink"></span></p></div></div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
	$globaloutput.='</div>';
}

include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>