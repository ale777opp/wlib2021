<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="infor"><div class="col_title">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle="";
	$showstr=$response0->_showstr;
	$term="";
	/*if(isset($response0->_mterm))
		$term=$response0->_mterm;*/
	if(isset($response0->main_0->mode))
	{
		if($response0->main_0->mode=='seeOtherLanguage')
		{
			$iddbtitle.='Записи на другом языке';
		}
		if($response0->main_0->mode=='tree')
		{
			$iddbtitle.='Дерево отношений';
		}
		if($response0->main_0->mode=='see')
		{
			$iddbtitle.='См. также';
		}
	}
	if(isset($response0->_iddbtitle))
		$iddbtitle='<u>АФ '.$response0->_iddbtitle.'</u> '.$iddbtitle;
	$globaloutput.='<span class="caption">'.$iddbtitle.'</span><span id="termin">'.$showstr.'</span><span>'.$term.'</span></div>';
	if((isset($response0->result_0)) || (isset($response0->main_0)))
	{
		//$start=intval($response0->_start);
		$fromaftobibl=$response0->_fromaftobibl;
		//$andor=$response0->_andor;
		//$label=$response0->_label;
		//$query=$response0->_query;
		$iddb=$response0->_iddbaf;
		$viewOptions=$response0->_viewOptions;
		$returntolist="";
		if(isset($response0->_returntolist))
			$returntolist=addslashes($response0->_returntolist);
		$biblid="";
		if(isset($response0->_biblid))
			$biblid=addslashes($response0->_biblid);
		$globaloutput.='<div id="searchhead">';
		if($biblid!="")
			$globaloutput.='<div class="fright"><input type="button" class="button2" value="Вернуться к записи" onmousedown="addSee();"/></div>';
		$globaloutput.='<div class="fleft">';
		//if($returntolist!="")
		if(isset($response0->_returntolist))
			$globaloutput.='<input type="button" class="button2" value="Вернуться к списку" onmousedown="findInAf(1);"/>';
		/*$globaloutput.='<input type="button" class="button2" value="Искать в каталоге" onmousedown="searchFromAfToBibl();" style="visibility:hidden" id="fromaftobibl"/><div id="menu1" style="display: none"><div class="andor"><div class="select4"><img onmousedown="showOptions(this,\'andor_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/>';
		if(intval($andor)==0)
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="OR" id="andor">ИЛИ</span>';
		else
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="AND" id="andor">И</span>';
		$globaloutput.='</div></div></div>';*/
		$globaloutput.='</div><div class="spacer"></div></div><div class="col_content table w80""><div id="srezults" class="td w70 vtop">';
		$count=-1;
		$lastterm="";
		foreach ($response0 as $key => $value)
		{
			$main = strpos($key, 'main_');
			$res = strpos($key, 'result_');
			if((($main !== false) ||($res !== false)) && isset($value->AFSHORTFORM_0))
			{
				$count++;
				$flag="";
				$globaloutput.='<div class="searchrez" align="left" id="d_'.$count.'">';
				$title="";
				$annot="";
				$searchbibl="";
				$synonyms="";
				$subject="";
				$language="";
				$otherlanguage="";
				$links="";
				$meshcodes="";
				$meshcount=0;
				$searchterm="";
				$theind="";
				if(isset($value->id))
				{
					$searchterm=$value->id;
					$theind=$searchterm;
				}
				$level=0;
				if(isset($value->level))
					$level=intval($value->level);
				$hasNextLevel=false;
				$mainlevel=false;
				$searchbox="";
				$exactquery="";
				$downquery="";
				if($viewOptions=="meshNewTree")
				{
					if($fromaftobibl=="COD")
					{
						if(isset($value->AFSHORTFORM_0->meshCodes_0))
							$searchterm=$value->AFSHORTFORM_0->meshCodes_0->query.'*';
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
				if(isset($value->id))
				{
					$searchbox='<input '.$flag.' id="_'.$count.'_'.$value->id.'" type="checkbox" class="'.htmlentities($value->AFSHORTFORM_0->title_0[0], ENT_COMPAT | ENT_IGNORE, "UTF-8").'" name="'.$fromaftobibl.'" value="'.$searchterm.'" onclick="putAfTerms(this)"'.$exactquery.''.$downquery.'/>';
				}
				$globaloutput.='<div style="margin: 5px 0px 0px 25px" id="'.$theind.'">';
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
								$title.='<b>'.$val[$i].'</b> ';
								$lastterm=htmlspecialchars($val[$i]);
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
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<div class="afbig">'.$val[$i].'<span class="afannotimg"  title="Аннотация" onmousedown="getAnnotation(this.parentNode.parentNode)"></span><span  onmousedown="searchTerm(this.parentNode.parentNode.firstChild)" title="Искать в каталоге" class="afsearchimg"></span></div>';
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
								if(isset($value->id))
								{
									$title.=$val[$i].'</span>';
									$searchbibl='<span title="Искать в каталоге" onmousedown="searchTerm(this.parentNode)" class="afsearchimg"></span>';
									$lastterm=htmlspecialchars($text);
									//$annot.='<span class="afannotimg" title="Аннотация" onmousedown="getAnnotation(this.parentNode.parentNode,null,null,1)"></span>';
									$annot.='<span class="afannotimg" title="Аннотация" onmousedown="getAnnotation(this.parentNode.parentNode)"></span>';
								}
								else
								{
									$title.='<s>'.$val[$i].'</s></span>';
								}
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
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<p class="afsmall">- '.$val[$i].'</p>';
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
							$meshcodes.='<div class="afbig"><span title="Дерево" onmousedown="seeMeshTree(this,\''.$val->label.'\',\''.$val->query.'\')"><input type="hidden" name="lang" value="'.$val->lang.'"/>'.$val->title_0[0].'</span>';
							//$meshcodes.='<span class="afsearchimg" title="Искать в каталоге" onmousedown="searchTerm(\''.$val->query.'*\')"></span>
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
					$globaloutput.='<p class="aftitle" style="margin-left: '.($level*10).'px;">'.$searchbox;
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							if((!$mainlevel)&&($hasNextLevel))
							{
								$globaloutput.='<span class="afplusimg" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)"><input type="hidden" name="lang" value="'.$val->lang.'"/>';
							}
							elseif(($mainlevel)&&($hasNextLevel))
							{
								$globaloutput.='<span class="afplusimg" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)"><input type="hidden" name="lang" value="'.$val->lang.'"/>';
							}
							else
								$globaloutput.='<span class="afbulletimg">';
						}
						else
						{
							$globaloutput.='<span class="afbulletimg">';
						}
					}
					else 
						$globaloutput.='<span class="b">';
					$globaloutput.=$title;
					if($subject!="")
						$globaloutput.=$subject;
					if($language!="")
						$globaloutput.=$language;
					if($annot!="")
						$globaloutput.=$annot;
					if($searchbibl!="")
						$globaloutput.=$searchbibl;
					$globaloutput.='</p>';
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							$globaloutput.='<div style="display:none;margin-left: '.($level*10).'px;" id="add'.$count.''.$val->query.'"></div>';
						}
						else
						{
							$globaloutput.='<div style="margin-left: '.($level*10+55).'px;padding: 0px" class="afbig" title="см. другие значения термина" onmousedown="showHideM(this.nextSibling)">см. другие значения термина</div><div style="margin-left: '.($level*10+55).'px;" class="meshcodesdisplay" id="add'.$count.''.$val->query.'">'.$meshcodes.'</div><br/>';
						}
					}
				}
				if($synonyms!="")
				{
					$globaloutput.=$synonyms;
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
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
