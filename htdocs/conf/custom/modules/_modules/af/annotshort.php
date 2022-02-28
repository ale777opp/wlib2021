<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div><div class="col_content"><div id="searchhead">';
$thelang='';
$theogtype='';
$theogtitle='';
$theogdescription='';
$theogkeywords='';
$theogimage='';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->result_0->id))
	{
		$start=0;
		$size=0;
		$length=2;
		$showstr="";
		$textoutput="";
		$fullview="";
		if(isset($response0->_start))
			$start=intval($response0->_start);
		if(isset($response0->size))
			$size=intval($response0->size);
		if(isset($response0->_length))
			$length=$response0->_length;
		if(isset($response0->_showstr))
			$showstr=$response0->_showstr;
		if(isset($response0->_fullview))
			$fullview=$response0->_fullview;
		$ldb=$response0->_iddb;
		$item='dbs_'.$ldb;

		if($fullview != "")
		{
			$globaloutput.='<div class="fright"><input type="button" class="button2" value="Вернуться к поиску" onmousedown="findInRepoAf(this)"/></div>';
		}
		else
		{
			$globaloutput.='<div><span class="dib mt5x"><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$showstr.'</span><br/><b>Найдено записей: </b><b class="highlight">'.$size.'</b></span><br/></div><div class="spacer"></div><div id="menu1" style="display: none"><div id="andor" class="OR"></div></div>';
		}
		$globaloutput.='<div class="spacer h10x"></div></div><div class="spacer h10x"></div>';
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
		}
		$sw="";
		if($fullview == "")
		{
			$foutput='';
			foreach ($response0 as $a => $b)
			{
				$posa = strpos($a, 'facets_'); 
				if($posa !== false)
				{
					$colcounter=1;
					$role=$b->name;
					$foutput.='<div class="facets unwrap"><div onmousedown="toggleWrap(this)" class="title">'.$fjson->$item->labels->$role->title.'</div>';
					$backet=array();
					foreach ($b as $c => $d)
					{
						$posb = strpos($c, 'buckets_');
						if($posb !== false)
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
						$xarr[$x]='<div  onclick="showLable(this)" class="'.$b->name.'"><span class="unchecked" title="Смотреть публикации">'.$backet[$j][0].'</span><i></i></div>';
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
						$foutput.='<div class="table w100"'.$style.'>';
						if($j>0)
							$foutput.='<div onclick="facetsBack(this)"><span class="even">назад</span><span></span></div>';
						$acount=count($yarr[$j]);
						for($m=0;$m<$acount;$m++)
						{
							$foutput.=$yarr[$j][$m];
						}
						if($lbacket>5)
						{
							if($acount==5)
							{
								if(isset($yarr[$j+1]))
								{
									if($j<$ycount)
										$foutput.='<div onclick="facetsNext(this)"><span></span><span class="else">далее</span></div>';
								}
							}
						}
						$foutput.='</div>';
					}
					$foutput.='</div>';
				}
			}
			if($foutput != '')
			{
				$foutput='<div id="menu_button_facets" onmousedown="showHideM(\'facets\')">Смотреть публикации</div><div id="facets" class="block">'.$foutput.'</div>';
				$globaloutput.=$foutput;
				$sw=' style="width:78%;display:inline-block;"';
			}
		}
		if($fullview  != "")
			$globaloutput.='<div id="searchrezults">';
		else
			$globaloutput.='<div id="searchrezult"'.$sw.'>';
		$count=0;
		$imgsrc='';
		$turi="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				$sid=$theid;
				if(isset($fjson->repoafprefix))
				{
					$sid= substr($value->id,strlen($fjson->repoafprefix));
				}
				else
				{
					if(isset($fjson->$item))
					{
						if(isset($fjson->$item->idprefix))
						{
							$sid= substr($value->id,strlen($fjson->$item->idprefix));
						}
					}
				}
				$output='';
				$imgstr="";
				$output.='<div class="output">';
				$tcodes="";
				foreach ($value as $arg => $val)
				{
					$res1 = strpos($arg, 'AFREPO');
					if($res1!==false)
					{
						foreach ($val as $ar => $va)
						{
							foreach ($va as $name => $v)
							{
								if($name=="title")
								{
									if($v!="IMG")
									{
										if($v=="FIO")
										{
											if($fullview == "")
											{
												$output.='<div class="FIO" title="Подробнее" onmousedown="findInRepoAf(\''.$theid.'\')">'.substr($va->entries_0->text,(strpos($va->entries_0->text, '[FIO]')+5)).'</div>';
											}
											else
											{
												$output.='<div class="FIO">'.substr($va->entries_0->text,(strpos($va->entries_0->text, '[FIO]')+5)).'</div>';
											}
										}
									}
									else
									{
										$imgsrc=$va->entries_0->url;
									}
								}
								$res2 = strpos($name, 'entries_');
								if($res2!==false)
								{
									if(strpos($arg, 'AFREPO2')===false)
									{
										if(strpos($arg, 'AFREPO5')!==false)
										{
											$resl=strpos($v->text, '[LANG]');
											$resty=strpos($v->text, '[OGTYPE]');
											$rest=strpos($v->text, '[OGTITLE]');
											$resd=strpos($v->text, '[OGDESCRIPTION]');
											$resk=strpos($v->text, '[OGKEYWORDS]');
											$resi=strpos($v->text, '[OGIMAGE]');
											if($rest !== false)
											{
												$theogtitle=substr($v->text, $rest+9);
											}
											elseif($resl !== false)
											{
												$thelang=substr($v->text, $resl+8);
											}
											elseif($resty !== false)
											{
												$theogtype=substr($v->text, $resty+8);
											}
											elseif($resd !== false)
											{
												$theogdescription=substr($v->text, $resd+15);
											}
											elseif($resk !== false)
											{
												$theogkeywords=substr($v->text, $resk+12);
											}
											elseif($resi !== false)
											{
												$theogimage=substr($v->text, $resi+9);
											}
											else
											{
												;
											}
										}
										else
										{
											if(strpos($v->text, '[FIO]')===false)
												if($v->text !="")
												{
													$search = '[space] [/space]';
													if (substr($v->text, strlen($v->text) - strlen($search)) == $search)
													{
														$output.='<div>'.substr($v->text, 0, strlen($v->text) - strlen($search)).'</div>';
													}
													else
													{
														$output.='<div>'.$v->text.'</div>';
													}
												}
										}
									}
									else
									{
										$tcodes.='<div>'.$v->text.'</div>';
									}
								}
							}
						}
					}
				}
				if($fullview  != "")
				{
					if($imgsrc!="")
					{
						$imgstr='<figure class="mb30x" tabindex="1" style="background-image:url('.$imgsrc.')"></figure>';
					}
					if(isset($fjson->repointerface))
					{
						$turi='<div class="uri"><p><input style="width:1px;height:1px;opacity:0;margin-left:-2px;" type="text" name="surl" value="//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$sid.'/"/><b title="Унифицированный идентификатор ресурса">URI:</b><a target="_blank" title="Унифицированный идентификатор ресурса" href="//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$sid.'/">'.$sid.'</a><span title="Скопировать ссылку в буфер обмена" onclick="copyToClip(this)" class="copylink"></span></p></div>';
					}
				}
				$output.='<input type="hidden" class="stat_'.$count.'" name="stat" value="'.$theid.'"/><span class="add1" onmousedown="showHide(this)">Посмотреть публикации</span><div style="display:none"><div class="publink" style="display:none"><b>Всего публикаций:</b><span class="u" id="stat_'.$count.'" title="Смотреть все публикации автора" onmousedown="searchTerm(\''.$theid.'\')">0</span></div></div></div>';
				if(isset($fjson->repointerface))
				{
					if($fullview  != "")
					{
						$output.='<div class="spacer h10x"></div><div>Унифицированный идентификатор ресурса для цитирования: <span class="cite">//'.THEHOSTNAME.''.THEPATHAUTHORS.'/'.$sid.'/</span></div>';
					}
				}
				$globaloutput.='<div class="table w100"><div class="row"><div class="td vtop pr20x w100">'.parseBB($output).'</div>';
				if($fullview  != "")
				{
					$globaloutput.='<div class="td vtop rcol"><center>'.$imgstr.'</center><div class="FULLREPOLINK"><div class="mt30x mb10x"><b>Другие идентификаторы</b></div>';
				}
				else
				{
					$globaloutput.='<div class="tcodes td"><div>';
				}
				$globaloutput.=parseBB($tcodes).''.$turi.'</div></div></div></div>';
			}
		}
		$globaloutput.='</div>';
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
		}
		$globaloutput.='<script> registrOnloadFunctions(function(){getAFStat();}); </script></div></div>';
	}
	else
	{
		$globaloutput.='<div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
	}
}
else
{
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
