<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle='Аннотация: ';
	if(isset($response0->_iddbtitle))
		$iddbtitle='<u>АФ '.$response0->_iddbtitle.'</u> '.$iddbtitle;
	$globaloutput.='<span class="caption">'.$iddbtitle.'</span><span id="termin">'.$response0->_showstr.'</span></div>';
	if(isset($response0->result_0->AFHEADFORM_0->id))
	{
		$mesharr=array();
		$meshid="";
		$pubmedorigin="";
		$pubmed="";
		$ebsco="";
		$searchbibl="";
		//$start=intval($response0->_start);
		//$andor=$response0->_andor;
		//$label=$response0->_label;
		//$query=$response0->_query;
		$iddb=$response0->_iddbaf;
		$fromaftobibl=$response0->_fromaftobibl;
		$viewOptions=$response0->_viewOptions;
		$returntolist="";
		$output="";
		if(isset($response0->_returntolist))
			$returntolist=addslashes($response0->_returntolist);
		$biblid="";
		if(isset($response0->_biblid))
			$biblid=addslashes($response0->_biblid);
		$globaloutput.='<div id="searchhead">';
		if($biblid!="")
			$globaloutput.='<div class="fright"><input type="button" class="button2" value="Вернуться к записи" onmousedown="addSee();"/></div>';
		$globaloutput.='<div class="fleft';
		if(isset($response0->_treeview))
		{
			$globaloutput.=' angle"><input type="button" class="button2 clm" value="Вернуться к списку классов MeSH" onmousedown="seeTreeView(this);"/>';
		}
		else
		{
			$globaloutput.='">';
			if(isset($response0->_returntolist))
				$globaloutput.='<input type="button" class="button2" value="Вернуться к списку" onmousedown="findInAf(1);"/>';
		}
		/*$globaloutput.='<input type="button" class="button2" value="Искать в каталоге" onmousedown="searchFromAfToBibl();" style="visibility:hidden" id="fromaftobibl"/><div id="menu1" style="display: none"><div class="andor"><div class="select4"><img onmousedown="showOptions(this,\'andor_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/>';
		if(intval($andor)==0)
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="OR" id="andor">ИЛИ</span>';
		else
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="AND" id="andor">И</span>';
		$globaloutput.='</div></div></div>';*/
		$globaloutput.='</div><div class="spacer"></div></div><div class="col_content table w80"><div id="srezults" class="td w70 vtop">';
		$globaloutput.='<div class="inside" id="'.$response0->result_0->AFHEADFORM_0->id.'">';
		$count=0;
		$num=-1;
		$c=0;
		$m=0;
		$expl=array();
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				if(isset($value->AFHEADFORM_0))
				{
					$num++;
					$expl[$num]=array();
					$explstr="";
					$exactquery="";
					$downquery="";
					if(isset($value->AFHEADFORM_0->meshQuery))
					{
						$exactquery=' data-exact="'.$value->AFHEADFORM_0->meshQuery.'"';
					}
					if(isset($value->AFHEADFORM_0->meshDownQuery))
					{
						$downquery=' data-down="'.$value->AFHEADFORM_0->meshDownQuery.'"';
					}
					$globaloutput.='<p class="aftitle"><input id="_'.$num.'_'.$response0->result_0->AFHEADFORM_0->id.'" type="checkbox" class="'.htmlentities($value->AFHEADFORM_0->title, ENT_COMPAT | ENT_IGNORE, "UTF-8").'" name="AUIDS" value="'.$value->AFHEADFORM_0->id.'" onclick="putAfTerms(this)"'.$exactquery.''.$downquery.'/><b>'.$value->AFHEADFORM_0->title.'</b>';
					//echo $value->AFHEADFORM_0->title.'<br/>';
					//echo addslashes($value->AFHEADFORM_0->title).'<br/>';
					if(isset($value->AFHEADFORM_0->originalTermin))
					{
						$pubmedorigin=$value->AFHEADFORM_0->originalTermin;
						$pmterm=$value->AFHEADFORM_0->originalTermin.'[MeSH Terms]';
						$pubmed.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'\')">PubMed</span>';
						if(isset($_POST['_auth']))
						{
							$ebscoterm='(MH '.$value->AFHEADFORM_0->originalTermin.')';
							$ebsco.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'\')">EBSCO</span>';
						}
					}
					$globaloutput.='<input name="ch" class="afsearchimg" id="ch'.$count.'" style="visibility: hidden; position: absolute;" type="checkbox"/><label title="Искать в ..." tabindex="0" class="afsearchimg" for="ch'.$count.'"></label><span class="tooltip"><label class="del" for="ch'.$count.'"></label><span class="titl mb5x">Искать в: </span><span class="u a curs ml20x p5x" onmousedown="searchTerm(this.parentNode.parentNode)">Локальные ресурсы</span>'.$pubmed.''.$ebsco.'</span>';
					$globaloutput.='</p>';
					$pubmed="";
					$ebsco="";
				}
				foreach ($value as $arg => $val)
				{
					$res1 = strpos($arg, 'AFANNOT');
					if($res1!==false)
					{
						$num++;
						$expl[$num]=array();
						$explstr="";
						$use="";
						$mode="";
						$action="";
						foreach ($val as $name => $v)
						{
							$count++;
							if($name=="use")
								$use=$v;
							if($name=="mode")
								$mode=$v;
							if($name=="action")
								$action=$v;
							if($name=="title")
							{
								$vcheck=' checked="checked"';
								if($v=="Дерево")
								{
									$vcheck='';
									$meshid='expl'.$num;
								}
								$explstr.='<input class="wr" type="checkbox" name="wi'.$num.'" id="wi'.$num.'"'.$vcheck.'/><label class="wrapped" for="wi'.$num.'">'.$v.'</label><div class="expl1" id="expl'.$num.'">';
							}
							$res2 = strpos($name, 'entries_');
							if($res2!==false)
							{
								$explstr.='<p class="afsmall">';
								$explstr.=$v->text.'</p>';
							}
							$res3 = strpos($name, 'references_');
							if($res3!==false)
							{
								$cl="";
								$count++;
								if(($mode=="indirect")&&($action=="annotation"))
									$cl=" dib w30";
								else
									$cl="";
								$explstr.='<p class="afsmall'.$cl.'">';
								if(isset($v->blocked))
								{
									$explstr.=$v->title;
									if(($use=="search")||($use=="insert"))
									{
										$searchbibl='<span class="u a curs ml20x p5x" onmousedown="searchTerm(this.parentNode.parentNode)">Локальные ресурсы</span>';
									}
								}
								elseif(isset($v->id)&&($mode=="direct"))
								{
									//$explstr.='<span class="afbig" id="'.$v->id.'"><input id="'.$count.'" type="hidden" name="AUIDS"  value="'.$v->id.'" class="'.$v->title.'" onclick="putAfTerms(this)"/><span title="Аннотация" onmousedown="getAnnotation(this.parentNode,null,null,1)">'.$v->title.'</span><span></span></span>';
									$explstr.='<span class="afbig" id="'.$v->id.'"><input id="'.$count.'" type="hidden" name="AUIDS"  value="'.htmlentities($v->id, ENT_COMPAT | ENT_IGNORE, "UTF-8").'" class="'.$v->title.'" onclick="putAfTerms(this)"/><span title="Аннотация" onmousedown="getAnnotation(this.parentNode)">'.$v->title.'</span><span></span></span>';
								}
								elseif(isset($v->query)&&($mode=="indirect")&&($action=="mesh3"))
								{
									//$explstr.='<span class="afbig"><span title="Дерево" onmousedown="seeMeshTree(this,\''.$v->label.'\',\''.$v->query.'\',null,'.$start.')"><input type="hidden" name="lang" value="'.$v->lang.'"/>'.$v->query.'</span><span></span></span>';
									$mesharr[$c]=array($v->label,$v->query,$v->lang);
									$c++;
								}
								elseif(($mode=="indirect")&&($action=="annotation"))
								{
									$explstr.='<input id="_m_'.$num.'_'.$m.'_'.$response0->result_0->AFHEADFORM_0->id.'" type="checkbox" class="'.htmlentities($response0->result_0->AFHEADFORM_0->title.'/'.$v->title, ENT_COMPAT | ENT_IGNORE, "UTF-8").'" name="QMS" value="'.$response0->result_0->AFHEADFORM_0->id.'" onclick="putAfTerms(this)"'.$exactquery.''.$downquery.'/><span>'.$v->title.'</span>';
									$searchbibl='<span class="u a curs ml20x p5x" onmousedown="searchTerm(this.parentNode.parentNode)">Локальные ресурсы</span>';
									$m++;
								}
								else
								{
									$explstr.='<span>'.$v->title.'</span>';
								}
								if(isset($v->originalTermin)&&($action!="mesh3")&&($mode!="direct"))
								{
									$pmterm=$v->originalTermin.'[MeSH Terms]';
									if($action=="annotation")
									{
										if($pubmedorigin!="")
											$pmterm=$pubmedorigin.'[MeSH Terms] AND '.$v->originalTermin.'[MeSH Subheading]';
									}
									$pubmed.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'\')">PubMed</span>';
									if(isset($_POST['_auth']))
									{
										$ebscoterm='(MH '.$v->originalTermin.')';
										if($action=="annotation")
										{
											if($pubmedorigin!="")
												$ebscoterm='(MH '.$pubmedorigin.') AND (MW '.$v->originalTermin.')';
										}
										$ebsco.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'\')">EBSCO</span>';
									}
								}
								if(($searchbibl!="") || ($pubmed!=""))
									$explstr.='<input name="ch" class="afsearchimg" id="ch'.$count.'" style="visibility: hidden; position: absolute;" type="checkbox"/><label title="Искать в ..." class="afsearchimg" tabindex="0" for="ch'.$count.'"></label><span class="tooltip"><label class="del" for="ch'.$count.'"></label><span class="titl mb5x">Искать в: </span>'.$searchbibl.''.$pubmed.''.$ebsco.'</span>';
								$explstr.='</p>';
								$searchbibl="";
								$pubmed="";
								$ebsco="";
							}
							$res4 = strpos($name, 'lists_');
							if($res4!==false)
							{
								foreach ($v as $point => $elem)
								{
									$res5 = strpos($point, 'text_');
									$res6 = strpos($point, 'semicolon_');
									$res7 = strpos($point, 'marked_');
									$res8 = strpos($point, 'numbered_');
									if($res5!==false)
									{
										$tsize = count($elem);
										$explstr.='<p class="ml10x">';
										for($k=0; $k < $tsize; $k++)
											$explstr.='<i>'.$elem[$k].'</i> ';
										$explstr.='</p>';
									}
									if($res6!==false)
									{
										$ssize = count($elem);
										$explstr.='<p>';
										for($k=0; $k < $ssize; $k++)
											$explstr.='<span>'.$elem[$k].'</span> ';
										$explstr.='</p>';
									}
									if($res7!==false)
									{
										$msize = count($elem);
										$explstr.='<ol style="margin: 10px 0 10px 55px">';
										for($k=0; $k < $msize; $k++)
											$explstr.='<li style="margin: 5px">'.$elem[$k].'</li> ';
										$explstr.='</ol>';
									}
									if($res8!==false)
									{
										$nsize = count($elem);
										$explstr.='<ol style="margin: 10px 0 10px 55px">';
										for($k=0; $k < $nsize; $k++)
											$explstr.='<li style="margin: 5px">'.$elem[$k].'</li> ';
										$explstr.='</ol>';
									}
								}
							}
						}
					}
				}
				$expl[$num]=$explstr;
			}
		}
		$left = '<div>';
		$right = '</div>';
		$globaloutput.=$left.join("$right$right$left", $expl).$right;
		$globaloutput.='</div><div class="spacer"></div></div>
		<div id="search_constructor" class="td w30 vtop">
			<div class="aright">
				<input type="button" class="button3" value="Искать в локальных ресурсах" onmousedown="searchFromAfToBibl();" id="fromaftobibl"/>
			</div>
			<div>
				<input name="wi999" class="wr" id="wi999" type="checkbox" checked="checked"/>
				<label class="wrapped" for="wi999">Поисковое выражение:</label>
				<div id="sconstruct_'.$iddb.'" class="expl1"></div>
			</div>
			<div class="aright mb20x">
				<input type="button" class="button2" value="Очистить поисковое выражение" onmousedown="clearSearchBox('.$iddb.');"/>
			</div>
			<div>
				<input name="wi9999" class="wr" id="wi9999" type="checkbox" checked="checked"/>
				<label class="wrapped" for="wi9999">Предыдущие действия:</label>
				<div id="shist" class="expl1"></div>
			</div>
			<div class="aright">
				<input type="button" class="button2" value="Очистить историю действий" onmousedown="clearActivities();"/>
			</div>
		</div>
		</div>';
		$mcount=count($mesharr);
		if(($viewOptions=='meshNewTree')&&($mcount > 0))
			$globaloutput.='<script> var arr='.json_encode($mesharr).'; seeTreeMM("'.$meshid.'",arr); </script>';
		$globaloutput.='</div>';
		$addscript='';
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
