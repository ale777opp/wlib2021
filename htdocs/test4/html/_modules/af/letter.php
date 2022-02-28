<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="infor"><div class="col_title">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle='Список: ';
	if(isset($response0->_iddbtitle))
		$iddbtitle='АФ '.$response0->_iddbtitle;
	$showstr=$response0->_showstr;
	$term="";
	$listtype="";
	$listname="";
	if(isset($response0->_listtype))
	{
		$listtype=$response0->_listtype;
		if($listtype=="permutation")
			$listname=' Пермутационный список: ';
		elseif($listtype=="letter")
			$listname=' Алфавитный список: ';
		elseif($listtype=="treeview")
			$listname=' Дерево: ';
		else
		{
			$listname='';
			$iddbtitle='';
		}
		if(isset($response0->_fromnexttree))
			$listname=' Дерево: ';
	}
	$globaloutput.='<span class="caption"><u>'.$iddbtitle.'</u>.'.$listname.'</span><span id="termin">'.$showstr.'</span><span>'.$term.'</span></div>';
	if(isset($response0->result_0->id))
	{
		$start=0;
		if(isset($response0->_start))
			$start=intval($response0->_start);
		$size=0;
		if(isset($response0->size))
			$size=intval($response0->size);
		$length=15;
		if(isset($response0->_length))
			$length=intval($response0->_length);
		$response0=$result->response_0;
		$andor='AND';
		if(isset($response0->_andor))
			$andor=$response0->_andor;
		$label=$response0->_label;
		$fromaftobibl=$response0->_fromaftobibl;
		$query=$response0->_query;
		$iddb=$response0->_iddbaf;
		$viewOptions="";
		if(isset($response0->_viewOptions))
			$viewOptions=$response0->_viewOptions;
		$biblid="";
		if(isset($response0->_biblid))
			$biblid=addslashes($response0->_biblid);
		$returntolist="";
		if(isset($response0->_returntolist))
			$returntolist=addslashes($response0->_returntolist);
		$endvoc=false;
		if(isset($response0->end))
			$endvoc=true;
		$treeview=false;
		if(isset($response0->_treeview))
			$treeview=true;
		$treeviewtext='';
		$globaloutput.='<div id="searchhead"><div class="fright">';
		if ($listtype=="permutation")
		{
			$N1=ceil($size/$length);
			if($N1!= 1)
			{
				$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
			}
		}
		else
		{
			if(isset($response0->_skipFirst))
			{
				if(isset($response0->_fromnexttree))
					$globaloutput.='<input id="rback" type="button" class="button2" value="&#8249; Назад" onmousedown="previousTree();"/>';
				else
				{
					if($query!="")
						$globaloutput.='<input id="rback" type="button" class="button2" value="&#8249; Назад" onmousedown="previousSearchAlfabetAuth();"/>';
				}
			}
			if(!$endvoc)
			{
				if(isset($response0->_fromnexttree))
					$globaloutput.='<input id="rfor" type="button" class="button2" value="Далее &#8250;" onmousedown="nextTree(\''.$response0->next_0->start.'\');"/>';
				else
					$globaloutput.='<input id="rfor" type="button" class="button2" value="Далее &#8250;" onmousedown="nextSearchAlfabetAuth();"/>';
			}
		}
		if($biblid!="")
			$globaloutput.='<input type="button" class="button2" value="Вернуться к записи" onmousedown="addSee();"/>';
		$globaloutput.='</div><div class="fleft">';
		if((isset($response0->_fromnexttree))&&(isset($response0->_returntolist)))
			$globaloutput.='<input type="button" class="button2" value="Вернуться к списку" onmousedown="findInAf(1);"/>';
		$globaloutput.='</div><div class="spacer"></div></div><div class="col_content table w80"><div id="srezults" class="td w70 vtop">';
		$count=-1;
		$lastterm="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$flag="";
				$globaloutput.='<div class="searchrez" align="left" id="d_'.$count.'">';
				$title="";
				$titleend="";
				$annot="";
				$annotfunc="getAnnotation(this.parentNode.parentNode)";
				$synonyms="";
				$subject="";
				$language="";
				$otherlanguage="";
				$links="";
				$meshcodes="";
				$meshcount=0;
				$searchterm=$value->id;
				$pubmed="";
				$ebsco="";
				$level=0;
				if(isset($value->level))
					$level=intval($value->level);
				$hasNextLevel=false;
				$mainlevel=false;
				$searchbox="";
				$searchboxend="";
				$exactquery="";
				$downquery="";
				if(($viewOptions=="meshNewTree")||$treeview)
				{
					if($fromaftobibl=="COD")
					{
						if(isset($value->AFSHORTFORM_0->meshCodes_0))
						{
							$searchterm=$value->AFSHORTFORM_0->meshCodes_0->query;
						}
					}
				}
				if(isset($value->AFSHORTFORM_0->meshQuery))
				{
					$exactquery=' data-exact="'.$value->AFSHORTFORM_0->meshQuery.'"';
				}
				if(isset($value->AFSHORTFORM_0->meshDownQuery))
				{
					$downquery=' data-down="'.$value->AFSHORTFORM_0->meshDownQuery.'"';
				}
				if(isset($response0->_fromnexttree))
				{
					if(isset($value->AFSHORTFORM_0->meshCodes_0))
					{	
						$downquery=' data-down="'.$value->AFSHORTFORM_0->meshCodes_0->label.' '.$value->AFSHORTFORM_0->meshCodes_0->query.'*"';
						$exactquery=' data-exact="'.$value->AFSHORTFORM_0->meshCodes_0->label.' '.$value->AFSHORTFORM_0->meshCodes_0->query.'"';
					}
				}
				$searchbox='<input id="'.($start+$count).'_'.$value->id.'" type="checkbox" name="'.$fromaftobibl.'" value="'.$searchterm.'" onclick="putAfTerms(this)"'.$exactquery.''.$downquery;
				$searchboxend='/>';
				$globaloutput.='<div style="margin: 5px 0px 0px 0px" id="'.$value->id.'">';
				if(isset($value->isSyn))
				{
					foreach ($value->AFSHORTFORM_0 as $arg => $val)
					{
						$res1 = strpos($arg, 'title_');
						if($res1 !== false)
						{
							$tsize = count($val);
							for($i=0; $i < $tsize; $i++)
							{
								$title.='<code>'.$val[$i].'</code> </span>';
								$lastterm=htmlspecialchars($val[$i]);
							}
							if(isset($value->key) && $title=="")
								$title.=$value->key.'</span>';
							$titleend.='<input name="ch" class="afsearchimg" id="ch'.$value->id.'" style="visibility: hidden; position: absolute;" type="checkbox"/><label title="Искать в ..." tabindex="0" class="afsearchimg" for="ch'.$value->id.'"></label>';
								$titleend.='<span class="tooltip"><label class="del" for="ch'.$value->id.'"></label><span class="titl mb5x">Искать в: </span><span class="u a curs ml20x p5x" onmousedown="searchTerm(this.parentNode.parentNode)">Локальные ресурсы</span>';
						}
						if($arg == "subject")
						{
							$subject.='<span> ('.$val.') </span>';
						}
						if($arg=="language")
						{
							$language.='<span> Язык: '.$val.' </span>';
						}
						if($arg=="originalTermin")
						{
							$pmterm=$val.'[MeSH Terms]';
							//$pubmed.='<a class="ml20x p5x" target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">PubMed</a>';
							$pubmed.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'\')">PubMed</span>';
							if(isset($_POST['_auth']))
							{
								$ebscoterm='(MH '.$val.')';
								//$ebsco.='<a class="ml20x p5x" target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">EBSCO</a>';
								$ebsco.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'\')">EBSCO</span>';
							}
						}
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<div><div style="margin-left:43px;text-decoration:underline"  title="Аннотация" class="afbig f80 mb10x" onmousedown="'.$annotfunc.'">'.$val[$i];
							//'<span  onmousedown="searchTerm(this.parentNode.parentNode.firstChild)" title="Искать в каталоге" class="afsearchimg"></span>';
							$synonyms.='</div></div>';
						}
					}
				}
				else
				{
					foreach ($value->AFSHORTFORM_0 as $arg => $val)
					{
						$res1 = strpos($arg, 'title_');
						if($res1 !== false)
						{
							$tsize = count($val);
							for($i=0; $i < $tsize; $i++)
							{
								$text="";
								if(isset($value->key) && ($value->key != ""))
									$text=$value->key;
								else
								{
									if(isset($value->title) && ($value->title != ""))
										$text=$value->title;
									else
										$text=$val[$i];
								}
								$title.=$val[$i].'</span>';
								//$titleend.='<span title="Искать в каталоге" onmousedown="searchTerm(this.parentNode)" class="afsearchimg"></span>';
								
								$titleend.='<input name="ch" class="afsearchimg" id="ch'.$count.''.$level.''.$meshcount.''.$i.'" style="visibility: hidden; position: absolute;" type="checkbox"/><label title="Искать в ..." tabindex="0" class="afsearchimg" for="ch'.$count.''.$level.''.$meshcount.''.$i.'"></label>';
								$titleend.='<span class="tooltip"><label class="del" for="ch'.$count.''.$level.''.$meshcount.''.$i.'"></label><span class="titl mb5x">Искать в: </span><span class="u a curs ml20x p5x" onmousedown="searchTerm(this.parentNode.parentNode)">Локальные ресурсы</span>';
								
								$lastterm=htmlspecialchars($text);
								$annot.='<span class="afannotimg" title="Аннотация" onmousedown="'.$annotfunc.'"></span>';
							}
						}
						if($arg == "subject")
						{
							$subject.='<span> ('.$val.') </span>';
						}
						if($arg=="language")
						{
							$language.='<span> Язык: '.$val.' </span>';
						}
						if($arg=="originalTermin")
						{
							$pmterm=$val.'[MeSH Terms]';
							//$pubmed.='<a class="ml20x p5x" target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">PubMed</a>';
							$pubmed.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'\')">PubMed</span>';
							if(isset($_POST['_auth']))
							{
								$ebscoterm='(MH '.$val.')';
								//$ebsco.='<a class="ml20x p5x" target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">EBSCO</a>';
								$ebsco.='<span class="u a curs ml20x p5x" onmousedown="window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'\')">EBSCO</span>';
							}
						}
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<p class="afsmall" style="margin-left:43px">- '.$val[$i].'</p>';
						}
					}
				}
				foreach ($value->AFSHORTFORM_0 as $arg => $val)
				{
					if($arg=="seeOtherLanguage")
					{
						$otherlanguage.='<p onmousedown="seeAlsoOtherLanguage(this.parentNode)" class="afbig u curs">См. также на другом языке</p>';
					}
					$res3 = strpos($arg, 'links_');
					if($res3 !== false)
					{
						if(isset($val->code))
							$links.='<span onmousedown="seeAlso(this.parentNode.parentNode,\''.$val->code.'\')"  class="afbig u curs">'.$val->abridgement.' ('.$val->count.')</span> ';
						if(isset($val->codePos))
						{
							if(isset($val->codeVal))
							{
								$links.='<span onmousedown="seeAlso(this.parentNode.parentNode,null,\''.$val->codePos.'\',\''.$val->codeVal.'\')"  class="afbig u curs">'.$val->abridgement.' ('.$val->count.')</span> ';
							}
							else
							{
								$links.='<span onmousedown="seeAlso(this.parentNode.parentNode,null,\''.$val->codePos.'\')"  class="afbig u curs">'.$val->abridgement.' ('.$val->count.')</span> ';								
							}
						}
					}
					$res4 = strpos($arg, 'meshCodes');
					if($res4 !== false)
					{
						if(isset($val->hasNextLevel))
							$hasNextLevel=true;
						if(!isset($val->main))
						{
							$tquery=$val->query;
							//if(!$treeview)
								$tquery+='*';
							$meshcodes.='<div class="afbig"><span title="Дерево" onmousedown="seeMeshTree(this,\''.$val->label.'\',\''.$val->query.'\',null,'.$start.')"><input type="hidden" name="lang" value="'.$val->lang.'"/>'.$val->title.'</span>';
							//$meshcodes.='<span class="afsearchimg" title="Искать в каталоге" onmousedown="searchTerm(\''.$tquery.'\',\''.$val->title.'\',\''.$val->label.'\')"></span>';
							$meshcodes.='<span class="mt5x db"></span>';
							$meshcodes.='</div>';
							$mainlevel=false;
						}
						else
							$mainlevel=true;
						$meshcount++;
					}
				}
				if($title!="")
				{
					$globaloutput.='<p class="aftitle" style="margin-left: '.($level*25).'px;">';
					if(!$treeview)
						$globaloutput.=$searchbox.' class="'.$lastterm.'" '.$searchboxend;
					else
						$globaloutput.=$searchbox.' class="'.$lastterm.'" style="visibility:hidden" '.$searchboxend;
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							if((!$mainlevel)&&(($hasNextLevel)||($treeview)))
							{
								$globaloutput.='<span class="afplusimg" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)"><input type="hidden" name="lang" value="'.$val->lang.'"/>';
							}
							elseif(($mainlevel)&&(($hasNextLevel)||($treeview)))
							{
								$globaloutput.='<span class="afplusimg f140" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)"><input type="hidden" name="lang" value="'.$val->lang.'"/>';
							}
							else
							{
								if(!$mainlevel)
									$globaloutput.='<span class="afbulletimg">';
								else
									$globaloutput.='<span class="afbulletimg f140">';
							}
						}
						else
						{
							if(!$mainlevel)
								$globaloutput.='<span class="afbulletimg">';
							else
								$globaloutput.='<span class="afbulletimg f140">';
						}
						if($treeview)
							$treeviewtext='<span style="margin-left:15px; margin-right:15px; color:#333">['.$val->title.']</span>';
					}
					else 
						$globaloutput.='<span class="b">';
					$globaloutput.=$title;
					$globaloutput.=$treeviewtext;
					if($subject!="")
						$globaloutput.=$subject;
					if($language!="")
						$globaloutput.=$language;
					if($annot!="")
						$globaloutput.=$annot;
					if($titleend!="")
					{
						$globaloutput.=$titleend;
					if($pubmed!="")
						$globaloutput.=$pubmed;
					if($ebsco!="")
						$globaloutput.=$ebsco;
					//if($titleend!="")
						$globaloutput.='</span>';
					}
					$globaloutput.='</p>';
					if($synonyms!="")
					{
						$globaloutput.=$synonyms;
					}
					
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							$globaloutput.='<div style="display:none;margin-left: '.($level*25).'px;" id="add'.$count.''.$val->query.'"></div>';
						}
						else
						{
							$globaloutput.='<div style="margin-left: '.($level*30+43).'px;padding: 0px;text-decoration:underline;font-size:70%" class="afbig" title="Дерево" onmousedown="showHideM(this.nextSibling,this)">см. другие значения термина</div><div style="margin-left: '.($level*30+63).'px" class="meshcodesdisplay" id="add'.$count.''.$val->query.'">'.$meshcodes.'</div><br/>';
						}
					}
				}
				if($links!="")
				{
					$globaloutput.='<p>'.$links.'</p>';
				}
				if($otherlanguage!="")
				{
					$globaloutput.=$otherlanguage;
				}
				$globaloutput.='</div></div>';
			}
		}
		$globaloutput.='</div>
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
		$globaloutput.='<script>var _lastterm="'.$lastterm.'";</script><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="5"/></div></div>';
	}
	else
	{
		$globaloutput.='<div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
	}
}
else
{
	$globaloutput.='<span class="caption">Список: </span></div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
