<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor">';
$src="nophoto.jpg";
$size="0";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->size))
		$size=$response0->size;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	if(isset($response0->_localiddb))
	{
		$iddb=$response0->_localiddb;
		$particle="lib_";
	}
	if(isset($response0->_skin))
	{
		if($response0->_skin!="")
			$skin=$response0->_skin;
	}
	if(isset($response0->_id))
		$lind=$response0->_id;
	if(isset($response0->_ltitle))
		$ltitle=$response0->_ltitle;
	if(isset($response0->_laddress))
		$laddress=$response0->_laddress;
	if(isset($response0->_sigla))
		$sigla=$response0->_sigla;
	if(isset($response0->_site))
		$site=$response0->_site;
	if(isset($response0->_elcat))
		$elcat=$response0->_elcat;
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	$globaloutput.='<div class="col_title"><div class="fright"><input type="button" class="button2" value="Вернуться к поиску" onmousedown="nextSearch();"/></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div></div><div class="col_content">';
	echo $globaloutput;
	if(intval($size)==0)
	{
		include (THEINCLUDESPATH.'/errorpage.php');
		echo '</div></div>';
	}
	else
	{
		$theid=htmlspecialchars($response0->result_0->id);
		$theid=addslashes($theid);
		$archtype=$response0->_archtype;
		echo '<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/></div><div id="searchhead" class="acenter"><b>Форматы:</b><b class="red f120 pl10x pr10x" id="formattitle">Архивное описание</b><input id="bfirst" type="button" class="button2" value="Полное описание" onclick="showFormat(\'FULLFRMARC\');"/><input id="bsecond" type="button" class="button2" value="RUSMARC" onclick="showFormat(\'RUSMARC\');"/><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/></div></div>';
		$output='';
		$rstr='';
		$fstr='';
		$soutput='';
		$routput='';
		$foutput='';
		$fondtitle='';
		$opistitle='';
		$delotitle='';
		$documenttitle='';
		$fonddiv='';
		$opisdiv='';
		$delodiv='';
		$documentdiv='';
		$seelinks='';
		$lstr='';
		if(isset($response0->result_0->ARCHIV_0))
		{
			$sarr=$response0->result_0->ARCHIV_0;
			$slen=count ($sarr);
			$resl=strpos($sarr[0], '[name]Фонд');
			$res2=strpos($sarr[0], '[name]Опись');
			$res3=strpos($sarr[0], '[name]Дело');
			$res4=strpos($sarr[0], '[name]Документ');
			for($i=1; $i<$slen; $i++)
			{
				$resseef=strpos($sarr[$i], '[SEEF]');
				$rest=strpos($sarr[$i], '>');
				if($sarr[$i]!="")
				{
					if($resl !== false)
					{
						if($i==1)
						{
							if(isset($response0->result_0->UNIMARC_2))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_2).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_1))
							{
								$farr=$response0->result_0->FULLFRMARC_1;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td p5x w20 bgc"></div><div class="td p5x w80">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
							$fondtitle.='<p class="fstr">'.$sarr[$i].'</p>';
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							$fonddiv.='<p>'.$sarr[$i].'</p>';
						}
					}
					if($res2 !== false)
					{
						if($i==1)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$fondtitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
						}
						elseif($i==2)
						{
							$opistitle.='<p class="fstr">'.$sarr[$i].'</p>';
							if(isset($response0->result_0->UNIMARC_2))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_2).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_1))
							{
								$farr=$response0->result_0->FULLFRMARC_1;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td w20 bgc p5x"></div><div class="td w80 p5x">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							$opisdiv.='<p>'.$sarr[$i].'</p>';
						}
					}
					if($res3 !== false)
					{
						if($i==1)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$fondtitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
						}
						elseif ($i==2)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$opistitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
							;
						}
						elseif($i==3)
						{
							$delotitle.='<p class="fstr">'.$sarr[$i].'</p>';
							if(isset($response0->result_0->UNIMARC_2))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_2).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_1))
							{
								$farr=$response0->result_0->FULLFRMARC_1;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td w20 bgc p5x"></div><div class="td w80 p5x">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							$delodiv.='<p>'.$sarr[$i].'</p>';
						}
					}
					if($res4 !== false)
					{
						if($i==1)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$fondtitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
						}
						elseif ($i==2)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$opistitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
							;
						}
						elseif($i==3)
						{
							$ipos=strpos($sarr[$i], '[ind]');
							$iipos=strpos($sarr[$i], '[/ind]');
							$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
							$linkarg=addslashes($linkarg);
							$delotitle.='<p class="b u red" onclick="addSeeArchive(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
						}
						elseif($i==4)
						{
							$documenttitle.='<p class="fstr">'.$sarr[$i].'</p>';
							if(isset($response0->result_0->UNIMARC_2))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_2).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_1))
							{
								$farr=$response0->result_0->FULLFRMARC_1;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td w20 bgc p5x"></div><div class="td w80 p5x">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							$documentdiv.='<p>'.$sarr[$i].'</p>';
						}
					}
				}
			}
			$output.='<div id="archive_output">';
			$routput.='<div id="rusmarc_output" style="display:none">';
			$foutput.='<div id="full_output" style="display:none">';
			if($resl !==false)
			{
				$output.='<div class="table w100" id="fond'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr w100"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr w100"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="fonddiv">'.$fonddiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$output.='</div>';
				$routput.='</div>';
				$foutput.='</div>';
				if($seelinks!="")
				{
					$lstr.='
					<div class="table w100">
						<div class="tr w100">
							<div class="td w20 bge acenter p5x b">Описи</div>
							<div class="td w80 aleft p5x">
								<div id="alinkss"><div class="progress small"><div></div></div></div>
							</div>
						</div>
					</div>';
				}
			}
			if($res2 !==false)
			{
				$output.='<div class="table" id="opis'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="opisdiv">'.$opisdiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$routput.='</div>';
				$foutput.='</div>';
				$output.='</div>';
				if($seelinks!="")
				{
					$lstr.='<div class="table w100"><div class="tr w100"><div class="td w20 bge acenter p5x b">Дела</div><div class="td w80 aleft p5x"><div id="alinkss"><div id="alinkss"><div class="progress small"><div></div></div></div></div></div></div></div>';
				}
			}
			if($res3 !==false)
			{
				$output.='<div class="table" id="delo'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$delotitle.'</div></div>';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="opisdiv">'.$delodiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$output.='</div>';
				$routput.='</div>';
				$foutput.='</div>';
				if($seelinks!="")
				{
					$lstr.='<div class="table w100"><div class="tr"><div class="td w20 bge acenter p5x b">Документы</div><div class="td w80 aleft p5x"><div id="alinkss"><div id="alinkss"><div class="progress small"><div></div></div></div></div></div></div></div>';
				}
			}
			if($res4 !==false)
			{
				$output.='<div class="table" id="document'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Фонд</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Опись</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Дело</div><div class="td w80 aleft p5x b">'.$delotitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Дело</div><div class="td w80 aleft p5x b">'.$delotitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Дело</div><div class="td w80 aleft p5x b">'.$delotitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$documenttitle.'</div></div>';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="opisdiv">'.$documentdiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$output.='</div>';
				$foutput.='</div>';
				$routput.='</div>';
				if($seelinks!="")
				{
					$lstr.='<div class="table w100"><div class="tr"><div class="td w20 bge acenter p5x b">Документы</div><div class="td w80 aleft p5x"><div id="alinkss"><div id="alinkss"><div class="progress small"><div></div></div></div></div></div></div></div>';
				}
			}
			$output.='</div>';
			$routput.='</div>';
			$foutput.='</div>';
			if($seelinks!="")
			{
				$soutput.='<script> registrOnloadFunctions(function(){showItem("'.$archtype.'","'.htmlspecialchars($seelinks, ENT_QUOTES).'");}); </script>';
			}
		}
		echo '<div id="common_output">'.$foutput.''.$routput.''.$output.''.$lstr.''.$soutput.'</div>';
		echo '<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/></div>';
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
echo '</div></div>';
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
