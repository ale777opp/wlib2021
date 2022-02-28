<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="infor">';
$src="nophoto.jpg";
$lcontent="";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	if(isset($result->response_0))
	{
		$response0=$result->response_0;
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
		if(isset($response0->id))
			$lind=$response0->id;
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				if(isset($value->AFANNOTTEXT_0))
				{
					foreach ($value->AFANNOTTEXT_0 as $arg => $val)
					{
						$res1 = strpos($arg, 'entries_');
						if($res1 !== false)
						{
							if($value->AFANNOTTEXT_0->title=="Title")
							{
								$ltitle=$val->text;
								$response0->_ltitle=$ltitle;
							}
							if($value->AFANNOTTEXT_0->title=="Addresse")
							{
								$laddress=$val->text;
								$response0->_laddress=$laddress;
							}
							if($value->AFANNOTTEXT_0->title=="Annotation")
								$lcontent.='<p>'.$val->text.'</p>';
							if($value->AFANNOTTEXT_0->title=="Internet")
							{
								$arr=explode('[END]', $val->text);
								if($arr[0]=="Интернет-сайт")
								{
									if(isset($arr[1]))
									{
										$site=$arr[1];
										$response0->_site=$site;
									}
								}
								elseif($arr[0]=="Электронный каталог")
								{
									if(isset($arr[1]))
									{
										$elcat=$arr[1];
										$response0->_elcat=$elcat;
									}
								}
								/*elseif($arr[0]=="IMG")
								{
									if(isset($arr[1]))
										$src=$arr[1];
								}*/
								elseif($arr[0]=="Каталог в СКБР")
								{
									if(isset($arr[1]))
									{
										if(isset($arr[2]))
										{
											$sigla=$arr[2];
											$response0->_sigla=$sigla;
										}
									}
								}
								else
								{
									;
								}
							}
						}
					}
				}
			}
		}
		list($rvars, $realname) = printResponseVars($response0,"");
		echo $rvars;
		$globaloutput.='<div class="col_content">';
		if(isset($result->response_1))
		{
			$response1=$result->response_1;
			$search='';
			$litres='';
			$ind='';
			$top='';
			$bibres='';
			$size=intval($response1->size);
			if($size>0)
			{
				$entry=$response1->result_0;
				$theid=htmlspecialchars($entry->id);
				$theid=addslashes($theid);
				$ids=array();
				if(isset($entry->FULLFRM2S_1))
				{
					$sarr=$entry->FULLFRM2S_1;
					$slen=count ($sarr);
					if(($slen>0)&&($sarr[0]!=""))
					{
						for($i=0; $i<$slen; $i++)
						{
							if($sarr[$i]!="")
							{
								$ids[]=$sarr[$i];
							}
						}
					}
				}
				if(isset($entry->FULLFRM3_2))
				{
					$sarr=$entry->FULLFRM3_2;
					$slen=count ($sarr);
					for($i=0; $i<$slen; $i++)
					{
						if($sarr[$i]!="")
						{
							$resl=strpos($sarr[$i], '[LITRES]');
							if($resl !== false)
							{
								$litres=substr($sarr[$i],$resl+8);
							}
						}
					}
				}
				if(isset($entry->FULLFRM4_3))
				{
					$sarr=$entry->FULLFRM4_3;
					$slen=count ($sarr);
					for($i=0; $i<$slen; $i++)
					{
						if($sarr[$i]!="")
						{
							$ress=strpos($sarr[$i], '[SEARCH]');
							if($ress !== false)
							{
								$search=substr($sarr[$i],$ress+8);
							}
						}
					}
				}
				$globaloutput.='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/><input type="hidden" id="skin" name="skin" value="'.$skin.'"/></div><div class="col3_title gray"><span class="fright"><input type="button" class="button2" value="Список литературы" onclick="showOrderList();"/></span><span class="fleft"><input type="button" class="button2" value="В список литературы" onclick="toOrderList(\''.$theid.'\');"/></span><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/></div>';
				$globaloutput.='<img src="/'.THEIMGPATH.'/'.$src.'" align="left" style="margin-right: 10px"/><div class="bibres">';
				if(isset($entry->FULLFRM1_0))
				{
					$arr=$entry->FULLFRM1_0;
					$len = count ($arr);
					for($i=0; $i<$len; $i++)
					{
						$res3=strpos($arr[$i], '[URL]');
						$pos=strpos($arr[$i], '>');
						$str1=substr($arr[$i],0,$pos);
						$pos1=strpos($str1, '<')+1; 
						$str=substr($str1,$pos1);
						if($res3 !== false)
						{
							$globaloutput.='<p class="URL"><a target="_blank" href="'.substr($arr[$i], $pos+1).'">'.$str.'</a></p>';
						}
						else
						{
							if($arr[$i]!="")
							{
								$globaloutput.='<p>';
								if($i==0)
									$globaloutput.='<span class="fstr">'.$arr[$i].'</span>';
								else
								{
									$globaloutput.=$arr[$i];
								}
								$globaloutput.='</p>';
							}
						}
					}
				}
				$globaloutput.='</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div>';
				
				$globaloutput.='<div class="libres"><input id="mysigla" type="hidden" value="'.$sigla.'"/><input id="myids" type="hidden" value="'.join('[END]',$ids).'"/><input id="searchquery" type="hidden" value="'.htmlentities($search, ENT_COMPAT | ENT_IGNORE, "UTF-8").'"/><input id="litresquery" type="hidden" value="'.$litres.'"/>';
				if($litres!="")
					$globaloutput.='<div class="add1" onclick="findSigla(this)">Купить</div><div style="display:none;text-align:center" id="sigla'.$ind.'"></div>';
				else
					$globaloutput.='<div class="add1" onclick="findSigla(this)">Библиотеки</div><div style="display:none;text-align:center" id="sigla'.$ind.'"></div>';
				$globaloutput.='</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div>';

				if(isset($entry->FULLFRM5_4))
				{
					$sarr=$entry->FULLFRM5_4;
					$slen=count ($sarr);
					if(($slen>0)&&($sarr[0]!=""))
					{
						$globaloutput.='<div class="libres"><div class="add2" onmousedown="showHide(this)">Подробнее</div><div id="add_'.$ind.'" style="margin-top:10px">';
						for($i=0; $i<$slen; $i++)
						{
							if($sarr[$i]!="")
							{
								$globaloutput.='<p>';
								$rpos = strpos($sarr[$i], '[RP]');
								$rpos1 = strpos($sarr[$i], '[/RP]');
								$spos = strpos($sarr[$i], '[SUBJ]');
								$spos1 = strpos($sarr[$i], '[/SUBJ]');
								$npos=strpos($sarr[$i], '[NUM]');
								if($rpos !== false)
								{
									$rstr=substr($sarr[$i],0,$rpos1);
									$rstr=substr($rstr,$rpos+4);
									if($npos!==false)
									{
										$nstr=substr($sarr[$i],$npos);
										$nstr=htmlspecialchars($nstr);
										$nstr=addslashes($nstr);
										$globaloutput.='<u class="RP" onmousedown="showLable(this)">'.$rstr.'</u>';
										if(!isset($response0->_localiddb))
											$globaloutput.=' <u onmousedown="getAfList(this)" class="eaf">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
									}
									else
										$globaloutput.='<u class="RP"  onmousedown="showLable(this)">'.$rstr.'</u>';
								}
								elseif($spos !== false)
								{
									$sstr=substr($sarr[$i],0,$spos1);
									$sstr=substr($sstr,$spos+6);
									if($npos!==false)
									{
										$nstr=substr($sarr[$i],$npos);
										$nstr=htmlspecialchars($nstr);
										$nstr=addslashes($nstr);
										$globaloutput.='<u class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
										if(!isset($response0->_localiddb))
											$globaloutput.=' <u onmousedown="getAfList(this)" class="eaf">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
									}
									else
										$globaloutput.='<u class="TM"  onmousedown="showLable(this)">'.$sstr.'</u>';
								}
								else
									$globaloutput.=$sarr[$i];
								$globaloutput.='</p>';
							}
						}
						$globaloutput.='</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div></div>';
					}
				}
				if(isset($entry->FULLFRM6_5))
				{
					$sarr=$entry->FULLFRM6_5;
					$slen=count ($sarr);
					if(($slen>0)&&($sarr[0]!=""))
					{
						$globaloutput.='<div class="libres"><div class="add2" onmousedown="showHide(this)">Предметные рубрики</div><div style="margin-top:10px" id="af_'.$ind.'">';
						for($i=0; $i<$slen; $i++)
						{
							if($sarr[$i]!="")
							{
								$globaloutput.='<p>';
								$spos = strpos($sarr[$i], '[SUBJ]');
								$spos1 = strpos($sarr[$i], '[/SUBJ]');
								$npos=strpos($sarr[$i], '[NUM]');
								if($spos !== false)
								{
									$sstr=substr($sarr[$i],0,$spos1);
									$sstr=substr($sstr,$spos+6);
									if($npos!==false)
									{
										$nstr=substr($sarr[$i],$npos);
										$nstr=htmlspecialchars($nstr);
										$nstr=addslashes($nstr);
										$globaloutput.='<u class="TM" onmousedown="showLable(this)">'.$sstr.'</u>';
										if(!isset($response0->_localiddb))
											$globaloutput.=' <u onmousedown="getAfList(this)" class="eaf">см. в Едином авторитетном файле</u><input type="hidden" value="'.$nstr.'"/>';
									}
									else
										$globaloutput.='<u class="TM"  onmousedown="showLable(this)">'.$sstr.'</u>';
								}
								else
									$globaloutput.=$sarr[$i];
								$globaloutput.='</p>';
							}
						}
						$globaloutput.='</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div></div>';
					}
				}
			}
			else
			{
				$globaloutput.='<img border="0" alt="" src="/'.THEIMGPATH.'/'.$src.'" align="left" hspace="0" vspace="0" style="margin-right: 20px" class="ramka1"/>'.$lcontent;
			}
		}
		else
		{
			$globaloutput.='<img border="0" alt="" src="/'.THEIMGPATH.'/'.$src.'" align="left" hspace="0" vspace="0" style="margin-right: 20px" class="ramka1"/>'.$lcontent;
		}
		$globaloutput.='</div></div>';
	}
	else
	{
		$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
	}
}
else
{
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
