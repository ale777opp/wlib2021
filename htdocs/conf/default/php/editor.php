<?php 
	echo '</head><body><h1>Настройка сайта</h1><form id="frm" onsubmit="return false"><div class="table"><div class="td w5"><input type="button" class="button4" value="Назад" onclick="history.go(-1)"/></div><div class="td aright"><input type="button" class="button4" value="Объединить CSS" onclick="nextEditor(1)"/><input type="button" class="button4" value="Объединить JS" onclick="nextEditor(2)"/><input type="button" class="button4" value="Изменить дизайн" onclick="nextEditor(3)"/><input type="button" class="button4" value="Редактировать меню" onclick="nextEditor(4)"/></div></div></form>';
	/*$rezultpath = file_get_contents($path);
	$jsonpath=json_decode($rezultpath);
	$rezultdb = file_get_contents($basepath);
	$jsondb=json_decode($rezultdb);
	$pathrubricator=$jsonpath->pathrubricator;
	$js=$jsonpath->pathjs;
	$css=$jsonpath->pathcss;
	$img=$jsonpath->pathimg;
	$html=$jsonpath->pathhtml;
	$pathjs='custom/js/custom.js';
	$pathlimits='custom/html/limits.html';
	$pathlimitsopt='custom/html/limitsopt.html';
	$pathfilters='custom/html/filters.php';
	$pathlabels='custom/html/labels.html';
	$pathbases='custom/html/bases.html';
	$pathsinterface='custom/html/switchinterface.html';
	$pathinterfaces='custom/html/interfaces.html';
	$pathjsdefault='default/js/custom.js';
	$pathlimitsdefault='default/html/limits.html';
	$pathlimitsoptdefault='default/html/limitsopt.html';
	$pathfiltersdefault='default/html/filters.html';
	$pathlabelsdefault='default/html/labels.html';
	$pathbasesdefault='default/html/bases.html';
	$pathsinterfacedefault='default/html/switchinterface.html';
	$pathinterfacesdefault='default/html/interfaces.html';
	$strjs='';
	$labsdiv='';
	$limitsdiv='';
	$limitsdivopt='';
	$filtersdiv='';
	$basesdiv='';
	$basesselect='';
	$sinterfacediv='';
	$interfacesdiv='';
	$lsdiv=0;
	$fsdiv=0;
	$count=0;
	$sinterf=$jsondb->switchinterface;
	$silen=count($sinterf);
	$cln='';
	$switchinbase='';
	for($i=0; $i<$silen; $i++)
	{
		if($i==0)
			$cln='_';
		else
			$cln='';
		if(isset($sinterf[$i]->quantity))
		{
			$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmouseover="setCursor(this)" onmousedown="switchSearch(this.id)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
			$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display: none">';
			$iflen=(int)$sinterf[$i]->quantity;
			for($j=0; $j<$iflen; $j++)
			{
				$interfacesdiv.='<input type="button" class="voc" onmousedown="showVoc(this)" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="СЛОВАРЬ"/>';
				if($sinterf[$i]->tie=="true")
				{
					if($j<($iflen-1))
					{
						$interfacesdiv.='<div class="logcontainer"><div class="select1"><img onclick="showOptions(this,\'logic_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open1.gif" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,\'logic_div\')" class="iAND">И</span></div></div>';
					}
				}
				$interfacesdiv.='<div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div>';
				if(isset($sinterf[$i]->fraselimits))
				{
					if($sinterf[$i]->fraselimits=="true")
					{
						$interfacesdiv.='<div class="opt1"><div class="select3"><img onclick="showOptions(this,\'voc_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="stype"/><span onmousedown="showOptions(this.previousSibling,\'voc_div\')" class="iEXACT">Точная фраза</span></div></div>';
					}
				}
				$interfacesdiv.='<div class="inp"><input id="item'.$j.'" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div>';
			}
			$interfacesdiv.='<div class="spacer"></div></div><div class="spacer"></div>';
		}
		elseif($sinterf[$i]->id=="authority")
		{
			$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display: none">';
			$interfacesdiv.='<input type="button" class="authoritybutton" onmousedown="simpleSearchAF()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ИСКАТЬ"/><input type="button" class="voc" onmousedown="searchAF(this)" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="СПИСОК"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div>';
			$interfacesdiv.='<div class="inp"><input id="itemaf" type="text" class="iLAB" value="" maxlength="1000" /></div></div>';
			$interfacesdiv.='</div><div class="spacer"></div>';
		}
		else
		{
			if(!isset($sinterf[$i]->switch_in_base))
			{
				$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmouseover="setCursor(this)" onmousedown="switchSearch(this.id)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
				if($sinterf[$i]->id=="simple")
				{
					$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search">';
				}
				else
				{
					$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display:none">';
				}
				if($sinterf[$i]->id=="professional")
				{
					$interfacesdiv.='<input type="button" class="voc" onmousedown="showVoc(this)" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="СЛОВАРЬ"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div><div class="inp"><input id="itemprof" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><div class="spacer"></div><div class="ibutt"><input type="button" class="'.$sinterf[$i]->id.'button" onmousedown="simpleSearch()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ИСКАТЬ"/><input type="button" class="button2" onmousedown="clearSearch()"  onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ОЧИСТИТЬ"/><input title="ПЕРЕНЕСТИ" type="button" id="sand" onclick="putLAB(this)" value="И"/><input title="ПЕРЕНЕСТИ" type="button" id="sor" onclick="putLAB(this)" value="ИЛИ"/><input title="ПЕРЕНЕСТИ" type="button" id="snot" onclick="putLAB(this)" value="НЕ"/>';
					if($sinterf[$i]->choose_af=="true")
					{
						$interfacesdiv.='<input title="АЛФАВИТНЫЙ СПИСОК" type="button" id="saf" class="saf" onclick="searchAF()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="СПИСОК"/>';
					}
					$interfacesdiv.='</div><div id="combo"><div class="me"><u>Я ищу</u>:</div><div id="expr"></div><div class="spacer"></div></div>';
				}
				else
				{
					$interfacesdiv.='<input type="button" class="'.$sinterf[$i]->id.'button" onmousedown="simpleSearch()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ИСКАТЬ"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div><div class="inp"><input type="text" class="iLAB" value="" maxlength="1000" /></div></div>';
				}
				$interfacesdiv.='</div><div class="spacer"></div>';
			}
			else
			{
				if($sinterf[$i]->switch_in_base=="in_interface")
				{
					$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmouseover="setCursor(this)" onmousedown="switchSearch(this.id)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
				}
				$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display:none"><input type="button" class="button" onmousedown="searchFundHolders()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ИСКАТЬ"/><div class="labcontainer"><div class="inp"><input id="iCA" type="text" class="iLAB" value="" maxlength="1000"/></div></div><div id="lib_search">Введите сиглу, часть названия или адреса</div></div><div class="spacer"></div>';
				$switchinbase.=$sinterf[$i]->switch_in_base;
			}
		}
	}
	$interfacesdiv.='<div id="sbuttons" style="display:none"><input type="button" class="expandbutton" onmousedown="simpleSearch()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ИСКАТЬ"/><input type="button" class="button2" onmousedown="clearSearch()" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="ОЧИСТИТЬ"/></div>';
	foreach ($jsonpath as $key => $value)
	{
		if((strpos($key, 'pathactrcp')!==false)||(strpos($key, 'foldername')!==false)||(strpos($key, 'pathcss')!==false)||(strpos($key, 'pathjs')!==false)||(strpos($key, 'pathimg')!==false)||(strpos($key, 'pathhtml')!==false)||(strpos($key, 'pathdoc')!==false)|(strpos($key, 'pathrubricator')!==false))
		{
			$strjs.='var '.$key.'="'.$value.'";'."\n";			
		}
		else
		{
			continue;
		}
	}
	
	$strjs.='var dbs=[];'."\n";
	
	foreach ($jsondb as $key => $value)
	{
		$res = strpos($key, 'dbs_');
		if($res !== false)
		{
			$count++;
			$flagfh=false;
			$basecls='simple';
			if($count==1)
			{
				if($jsondb->display=="none")
				{
						$basesdiv.='<input type="hidden" name="base" id="currdb" value="'.$value->number.'"/>';
				}
				$strjs.='var numdbBIBL="'.$value->number.'";'."\n";
			}
			if($value->type =="AF")
			{
				$basecls='authority';
			}
			if($value->dbindex == 'fundholders')
			{
				$basecls=$value->dbindex;
				for($i=0; $i<$silen; $i++)
				{
					if((isset($sinterf[$i]->switch_in_base))&&($sinterf[$i]->switch_in_base=="in_base"))
					{
						$flagfh=true;
						break;
					}
				}
				if($flagfh==true)
				{
					if($jsondb->display=="radio")
					{
						$basesdiv.='<span class="'.$basecls.'"><input type="radio" name="base" value="'.$value->number.'" id="i'.$value->dbindex.'"/><label class="boxunchecked" for="i'.$value->dbindex.'" onclick="chooseBase(this)">'.$value->alias.'</label></span>';
					}
					if($jsondb->display=="select")
					{
						$basesdiv.='<div id="i'.$value->dbindex.'" onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="i'.$value->number.'">'.$value->alias.'</div>';
					}
				}
			}
			else
			{
				if($jsondb->display=="radio")
				{
					$basesdiv.='<span class="'.$basecls.'"><input type="radio" name="base" value="'.$value->number.'" id="i'.$value->dbindex.'"/><label class="boxunchecked" for="i'.$value->dbindex.'" onclick="chooseBase(this)">'.$value->alias.'</label></span>';
				}
				if($jsondb->display=="select")
				{
					$basesdiv.='<div id="i'.$value->dbindex.'" onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="i'.$value->number.'">'.$value->alias.'</div>';
				}
			}
			$strjs.='dbs["'.$value->number.'"]=[];'."\n";
			$strjs.='dbs["'.$value->number.'"]["type"]="'.$value->type.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["mode"]="'.$value->mode.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["alias"]="'.$value->alias.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["dbindex"]="'.$value->dbindex.'";'."\n";
			if(isset($value->brokerid))
			{
				$strjs.='dbs["'.$value->number.'"]["brokerid"]="'.$value->brokerid.'";'."\n";
			}
			if(($value->dbindex == 'fundholders')&&($switchinbase!=""))
			{
				$strjs.='dbs["'.$value->number.'"]["switch_in_base"]="'.$switchinbase.'";'."\n";
				$strjs.='var numdbAF="'.$value->number.'";'."\n";
			}
			if(isset($value->labels))
			{
				$strjs.='dbs["'.$value->number.'"]["labels"]=[];'."\n";
				$strjs.='dbs["'.$value->number.'"]["labels"]["AND"]=[" И ","",""];'."\n";
				$strjs.='dbs["'.$value->number.'"]["labels"]["OR"]=[" ИЛИ ","",""];'."\n";
				$strjs.='dbs["'.$value->number.'"]["labels"]["NOT"]=[" НЕ ","",""];'."\n";
				$labsdiv.='<div style="display: none;" class="options" id="labs_div_'.$value->number.'">';
				foreach($value->labels as $arg => $val)
				{
					$strjs.='dbs["'.$value->number.'"]["labels"]["'.$arg.'"]=["'.$val->title.'","'.$val->index.'","'.$val->af.'"];'."\n";
					$labsdiv.='<div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="i'.$arg.'">'.$val->title.'</div>';
				}
				$labsdiv.='</div>';
			}
			
			if(isset($value->limits))
			{
				$limitsdiv.='<div class="baselimits" id="limits_'.$value->number.'" style="display: none">';
				$strjs.='dbs["'.$value->number.'"]["limits"]=[];'."\n";
				foreach($value->limits as $arg => $val)
				{
					$lsdiv++;
					$limitsdiv.='<div class="limits_left">';
					$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]=[];'."\n";
					$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["name"]="'.$arg.'";'."\n";
					$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["title"]="'.$val->name.'";'."\n";
					$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["type"]="'.$val->type.'";'."\n";
					$limitsdiv.='<span class="title">'.$val->name.'</span>';
					if(isset($val->content))
					{
						$arr=$val->content;
						$len = count ($arr);
						$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]=[];'."\n";
						$limitsdiv.='<div id="l_'.$value->number.'_'.$arg.'" class="select"><img onclick="showOptions(this)" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div>';
						$limitsdivopt.='<div id="l_'.$value->number.'_'.$arg.'_opt" class="options" style="display: none"><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="all">все</div>';
						for($i=0; $i<$len; $i++)
						{
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']=[];'."\n";
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']["value"]="'.$arr[$i]->value.'";'."\n";
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']["text"]="'.$arr[$i]->text.'";'."\n";
							$limitsdivopt.='<div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="'.$arr[$i]->value.'">'.$arr[$i]->text.'</div>';
						}
						$limitsdivopt.='</div>';
					}
					else
					{
						if($val->type=="one")
						{
							$limitsdiv.='<span class="input"><input id="one_'.$value->number.'_'.$arg.'" name="one_'.$value->number.'_'.$arg.'" size="4" maxlength="4" type="text" value="" class="'.$val->label.'"/></span>';
						}
						else
						{
							$limitsdiv.='<span class="from">c&#160;</span><span class="input"><input id="period_'.$value->number.'_'.$arg.'_1" name="period_'.$value->number.'_'.$arg.'_1" size="4" maxlength="4" type="text" value="" class="'.$val->label.'"/></span><span class="to">&#160;по&#160;</span><span class="input"><input id="period_'.$value->number.'_'.$arg.'_2" name="period_'.$value->number.'_'.$arg.'_2" size="4" maxlength="4" type="text" value="" class="'.$val->label.'"/></span>';
						}
					}
					$limitsdiv.='</div>';
				}
				$limitsdiv.='</div><div class="spacer"></div>';
			}
			
			if(isset($value->filters))
			{
				$strjs.='dbs["'.$value->number.'"]["filters"]=[];'."\n";
				$filtersdiv.='<div id="filters_'.$value->number.'" style="display: none">';
				foreach($value->filters as $arg => $val)
				{
					$filtersdiv.='<div class="filters">';
					$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]=[];'."\n";
					$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["name"]="'.$arg.'";'."\n";
					$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["title"]="'.$val->name.'";'."\n";
					$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["type"]="'.$val->type.'";'."\n";
					$filtersdiv.='<div class="title">'.$val->name.'</div><div';
					if(isset($val->label))
					{
						$filtersdiv.=' class="'.$val->label.'"';
						$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["label"]="'.$val->label.'";'."\n";
					}
					$filtersdiv.='>';
					if(isset($val->content))
					{
						$arr=$val->content;
						$len = count ($arr);
						$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["content"]=[];'."\n";
						for($i=0; $i<$len; $i++)
						{
							$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["content"]['.$i.']=[];'."\n";
							$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["content"]['.$i.']["value"]="'.$arr[$i]->value.'";'."\n";
							$strjs.='dbs["'.$value->number.'"]["filters"]["'.$arg.'"]["content"]['.$i.']["text"]="'.$arr[$i]->text.'";'."\n";
							$filtersdiv.='<div class="'.$arr[$i]->value.'"><span id="filter_'.$value->number.'_'.$arg.'_'.$i.'" class="unchecked" onmouseover="setCursor(this)" title="ФИЛЬТРОВАТЬ"  onclick="addFilter(this)">'.$arr[$i]->text.'</span></div>';
						}
						$filtersdiv.='<div id="filter_'.$value->number.'_'.$arg.'_else" class="else" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)"  onclick="addFilterVoc(\''.$val->name.'\',this)">еще...</div>';
					}
					else
					{
						$filtersdiv.='<div class="('.$val->label.' \''.date('Y').'\')"><span class="unchecked" id="dinamic_'.$value->number.'_currdate" onmouseover="setCursor(this)" title="ФИЛЬТРОВАТЬ"  onclick="addFilter(this)">'.date('Y').'</span></div><div class="else" id="dinamic_'.$value->number.'_'.$arg.'" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)"  onclick="addFilterPeriod(this)">задать диапазон...</div>';
					}
					$filtersdiv.='</div></div>';
				}
				$filtersdiv.='<div style="text-align:center"><input type="button" class="button7" onmousedown="clearFilters(this)" onmouseover="setFuncStyle(this)" onmouseout="deleteFuncStyle(this)" value="Очистить фильтры"/></div></div>';
			}
		}
	}
	writeFile($pathjs,$strjs);
	
	if(!file_exists($pathjsdefault))
	{
		writeFile($pathjsdefault,$strjs);
	}
	
	$fjfile=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/js/custom.js';
	copyFile($pathjs,$fjfile);
	
	writeFile($pathlabels,$labsdiv);
	
	if(!file_exists($pathlabelsdefault))
	{
		writeFile($pathlabelsdefault,$labsdiv);
	}
	
	if($jsondb->display=="select")
	{
		$basesselect.='<div style="display: none;" class="options2" id="bases_container">'.$basesdiv.'</div>';
		$basesdiv='<div class="basescontainer"><div class="opt2"><div class="select2"><img onmousedown="showOptions(this,\'bases_div\')" src="/'.$jsonpath->foldername.'/'.$jsonpath->foldername.'/img/open.gif" alt="" title="" class="labs" border="0" hspace="0" vspace="0"/><span id="currdb" onmousedown="showOptions(this.previousSibling,\'bases_div\')"></span></div></div></div>';
	}
	
	writeFile($pathbases,$basesdiv);
	
	if(!file_exists($pathbasesdefault))
	{
		writeFile($pathbasesdefault,$basesdiv);
	}
	
	writeFile($pathsinterface,$sinterfacediv);
	
	if(!file_exists($pathsinterfacedefault))
	{
		writeFile($pathsinterfacedefault,$sinterfacediv);
	}
	
	writeFile($pathinterfaces,$interfacesdiv);
	
	if(!file_exists($pathsinterfacedefault))
	{
		writeFile($pathinterfacesdefault,$interfacesdiv);
	}
	
	if($limitsdiv!='')
	{
		$limitsdiv='<div id="limits_search" class="limits" onmouseover="setCursor(this)" onclick="showLimits(this)" style="display:none">Ограничения</div>'.$limitsdiv;
		writeFile($pathlimits,$limitsdiv);
		
		writeFile($pathlimitsopt,$limitsdivopt);
		
		if(!file_exists($pathlimitsdefault))
		{
			writeFile($pathlimitsdefault,$limitsdiv);
		}
		
		if(!file_exists($pathlimitsoptdefault))
		{
			writeFile($pathlimitsoptdefault,$limitsdivopt);
		}
	}
	
	if($filtersdiv!='')
	{
		writeFile($pathfilters,$filtersdiv);
		
		$ffile=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/filters.php';
		copyFile($pathfilters,$ffile);
		
		if(!file_exists($pathfiltersdefault))
		{
			writeFile($pathfiltersdefault,$filtersdiv);
		}
	}
	
	$conffile=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/conf/db.conf';
	copyFile($basepath,$conffile);
	
	$cheader=file_get_contents('default/html/header.html');
	$cfooter=file_get_contents('default/html/footer.html');
	$header = str_replace('..', $jsonpath->foldername, $cheader); 
	$footer = str_replace('..', $jsonpath->foldername, $cfooter); 
	$bases=file_get_contents($pathbases);
	$swint=file_get_contents($pathsinterface);
	$ints=file_get_contents($pathinterfaces);
	$flabs=file_get_contents($pathlabels);
	$flimits=file_get_contents($pathlimits);
	$flimitsopt=file_get_contents($pathlimitsopt);
	$searchdiv= <<<HTML
<div id="header">
<!-- шапка -->
$header
<!-- конец шапка -->
</div>
<div class="searchdiv" id="searchdiv">
	<div id="bases_div">
	$bases
	</div>
	<div class="searchdiv_outer">
		<div class="searchdiv_inner">
			<div class="top">
				<div class="top_left">
					<div class="top_right">
					$swint
					</div>
				</div>
			</div>
			<div id="middle">
			$ints
			$flimits
			</div>
			<div class="bottom">
				<div class="bottom_left">
					<div class="bottom_right"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="spacer"></div>
</div>


HTML;


	writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/searchdiv.php',$searchdiv);
	
	$footerdiv= <<<HTML
<div id="footer">
<!-- подвал -->
$footer
<!-- конец подвал -->
</div>
<div id="voc_div" class="options3" style="display: none"><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iEXACT">Точная фраза</div><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iANY">Любое слово</div><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iEVERY">Все слова</div></div><div id="andor_div" class="options4" style="display: none"><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="AND">И</div><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="OR">ИЛИ</div></div>
<div id="logic_div" class="options1" style="display: none"><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iAND">И</div><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iOR">ИЛИ</div><div onmouseover="HighLight(this)" onmouseout="LowLight(this)" onclick="PutLabValue(this)" class="iNOT">НЕ</div></div>
<div id="disablediv" style="display: none">&#160;</div>
$flabs
$basesselect
$flimitsopt


HTML;


	writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/footer.php',$footerdiv);
	
	$calljs='http://'.$jsonpath->servername.$jsonpath->pathactrcp;
	$indexdiv = <<<HTML
<!DOCTYPE html>
<html>
<head>
<title>$jsonpath->rcptitle</title>
<meta http-equiv="Content-Type" content="text/html; charset=$jsonpath->rcpmetacontenttype" />
<meta http-equiv="Content-Script-Type" content="$jsonpath->rcpmetacontentscripttype"/>
<meta name="keywords" content="$jsonpath->rcpmetakeywords" />
<meta name="author" content="$jsonpath->rcpauthor" />
<meta name="Description" content="$jsonpath->rcpdescription" />
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<link href="$css/style.css" type="text/css" rel="stylesheet"/>
<link href="$css/print.css" type="text/css" rel="stylesheet" media="print"/>
<!--[if IE]>
<link href="$css/add.css" type="text/css" rel="stylesheet">
<![endif]-->
<?php echo file_get_contents("$calljs?_action=penter&_html=enter&_errorhtml=error2&_numsean=".getenv("QUERY_STRING")); ?>
<script src="$js/custom.js"></script>
<script src="$js/default.js"></script>
<?php 
if(isset(\$_POST['iddb']))
{
	echo '<script> var \$iddb="'.\$_POST['iddb'].'"; </script>';
}
 ?>

</head>
<body onload="initd()">
<form id="main" onsubmit="return false">
<?php include ('$jsonpath->foldername/html/searchdiv.php');
if(!isset(\$_POST['p']))
{
	\$page = 'main';
}
else
{
	\$page = \$_POST['p'];
}
include ('$jsonpath->foldername/html/'.\$page.'.php');
 ?>
<div class="spacer"></div>
</form>
<?php include ('$jsonpath->foldername/html/footer.php') ?>
</body>
</html>
	

HTML;


	writeFile($jsonpath->dirhtdocs.'/index.php',$indexdiv);
	
	echo '</head><body><h1>Настройка проекта</h1><form id="frm" method="POST" style="margin-top:40px;"><div><p style="text-align:center"><a target="_blank" href="http://'.$jsonpath->servername.'/'.$jsonpath->foldername.'" style="color:#069">Посмотреть сайт</a></p><br/><p style="text-align:center"><input type="submit" class="button" value="Изменить"/> <input id="writesite" name="writesite" type="submit" class="button" value="Редактор"/></p></div></form>';*/

 ?>