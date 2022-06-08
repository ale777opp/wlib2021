<?php 
	$rezultpath = file_get_contents($path);
	$jsonpath=json_decode($rezultpath);
	$rezultdb = file_get_contents($basepath);
	$jsondb=json_decode($rezultdb);
	$servername=$jsonpath->servername;
	$pathrubricator=$jsonpath->pathrubricator;
	$js=$jsonpath->pathjs;
	$css=$jsonpath->pathcss;
	
	$thefullcsspath=$jsonpath->thefullcsspath;
	
	$img=$jsonpath->pathimg;
	$html=$jsonpath->pathhtml;
	
	$thefulljspath=$jsonpath->thefulljspath;
	$thepagespath=$jsonpath->thepagespath;
	$themodulespath=$jsonpath->themodulespath;
	$theincludespath=$jsonpath->theincludespath;
	$rcpunloaddir=$jsonpath->rcpunloaddir;
	$rcphtmldir=$jsonpath->rcphtmldir;

	$pathbasestop=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/basestop.html';
	$pathbasesbottom=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/basesbottom.html';
	
	$pathheadertop=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/headertop.html';
	$pathheadermiddle=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/headermiddle.html';
	$pathheadermiddle1=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/headermiddle1.html';
	$pathheaderbottom=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/headerbottom.html';
	$pathfooter=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/footer.html';
	
	$pathnewsasmodule=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/newsasmodule.html';
	
	$pathjs='custom/js/default/custom.js';
	$pathlimits='custom/html/limits.html';
	$pathlimitsopt='custom/html/limitsopt.html';
	$pathfilters='custom/html/filters.php';
	$pathlabels='custom/html/labels.html';
	$pathbases='custom/html/bases.html';
	$pathsinterface='custom/html/switchinterface.html';
	$pathinterfaces='custom/html/interfaces.html';
	$pathjsdefault='default/js/custom.js';
	$pathjspagesdefault='default/js/pages.js';
	$pathjspages='custom/js/default/pages.js';
	$pathjsmodules='custom/js/default/modules.js';
	$pagespath='custom/conf/pages.conf';
	$modulespath='custom/conf/modules.conf';
	$facetspath='custom/conf/facets.conf';
	$sortpath='custom/conf/sort.conf';
	$regpath='custom/conf/regform.conf';

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
	$afcount=0;
	$biblcount=0;
	$biblnumber=0;
	$aflnumber=0;
	$filtersarr=array();
	$sinterf=$jsondb->switchinterface;
	$silen=count($sinterf);
	$cln='';
	$switchinbase='';
	$flagallbases=false;
	$flagdisplay=false;
	$fulltext=false;
	$fulltextbasenumber="";
	$fromaftobiblname="";
	$fromaftobibltitle="";
	$prefind="";
	$bibliosearch=false;
	$bibliowidget="";
	$bibliodiv="";
	$bibliocss="";
	$bibliotabs="";
	$useblind=false;
	$strjs.='var servername="'.$servername.'";'."\n";
	$jsdirpath=$jsonpath->dirhtdocs.'conf/custom/js/default';
	$jsdirpathfrom=$jsonpath->dirhtdocs.'conf/custom/additional/base/js';
	$flagreg=false;
	$flagpayloan=false;
	$flagreglayer=false;
	$flagnewsasmodule=false;
	$maptpl="";
	foreach(glob($jsdirpath.'/*') as $file)
	{
		if(($file!=$jsdirpath.'/pages.js')&&($file!=$jsdirpath.'/p.js')&&($file!=$jsdirpath.'/map.js'))
			@unlink($file);
	}
	copyDirectory($jsdirpath,$jsdirpathfrom);
	
	for($i=0; $i<$silen; $i++)
	{
		if($i==0)
			$cln='_';
		else
			$cln='';
		if(isset($sinterf[$i]->outform))
		{
			$strjs.='var outform="'.$sinterf[$i]->outform.'";'."\n";
		}
		if(isset($sinterf[$i]->outformfull))
		{
			$strjs.='var outformfull="'.$sinterf[$i]->outformfull.'";'."\n";
		}
		if(isset($sinterf[$i]->quantity))
		{
			$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmousedown="switchSearch(this)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
			$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display: none">';
			$iflen=(int)$sinterf[$i]->quantity;
			for($j=0; $j<$iflen; $j++)
			{
				$interfacesdiv.='<b class="voc" onmousedown="showVoc(this)"></b>';
				if($sinterf[$i]->tie=="true")
				{
					if($j<($iflen-1))
					{
						$interfacesdiv.='<div class="logcontainer"><div class="select1"><img onclick="showOptions(this,\'logic_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,\'logic_div\')" class="iAND">И</span></div></div>';
					}
				}
				$interfacesdiv.='<div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div>';
				if(isset($sinterf[$i]->fraselimits))
				{
					if($sinterf[$i]->fraselimits=="true")
					{
						$interfacesdiv.='<div class="opt1"><div class="select3"><img onclick="showOptions(this,\'voc_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="stype"/><span onmousedown="showOptions(this.previousSibling,\'voc_div\')" class="iEXACT">Точная фраза</span></div></div>';
					}
				}
				$interfacesdiv.='<div class="inp"><input id="item'.$j.'" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div>';
			}
			$interfacesdiv.='<div class="spacer"></div></div><div class="spacer"></div>';
		}
		elseif($sinterf[$i]->id=="authority")
		{
			$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display: none">';
			$interfacesdiv.='<input type="button" class="authoritybutton" onmousedown="findInAf()" value="Искать"/><input id="voclist" type="button" class="voc" onmousedown="findInAf(this)" value="Список"/><input id="vocaf" type="button" class="voc" onmousedown="showVoc(this)" value="Словарь"/><div class="voc angle" id="meshtree"><div onmousedown="seeTreeView(this)">Дерево</div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div>';
			$interfacesdiv.='<div class="inp"><input id="itemaf" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div id="afalfabet"><span onmousedown="searchAlfabetAuth(this)">А</span> <span onmousedown="searchAlfabetAuth(this)">Б</span> <span onmousedown="searchAlfabetAuth(this)">В</span> <span onmousedown="searchAlfabetAuth(this)">Г</span> <span onmousedown="searchAlfabetAuth(this)">Д</span> <span onmousedown="searchAlfabetAuth(this)">Е</span> <span onmousedown="searchAlfabetAuth(this)">Ж</span> <span onmousedown="searchAlfabetAuth(this)">З</span> <span onmousedown="searchAlfabetAuth(this)">И</span> <span onmousedown="searchAlfabetAuth(this)">Й</span> <span onmousedown="searchAlfabetAuth(this)">К</span> <span onmousedown="searchAlfabetAuth(this)">Л</span> <span onmousedown="searchAlfabetAuth(this)">М</span> <span onmousedown="searchAlfabetAuth(this)">Н</span> <span onmousedown="searchAlfabetAuth(this)">О</span> <span onmousedown="searchAlfabetAuth(this)">П</span> <span onmousedown="searchAlfabetAuth(this)">Р</span> <span onmousedown="searchAlfabetAuth(this)">С</span> <span onmousedown="searchAlfabetAuth(this)">Т</span> <span onmousedown="searchAlfabetAuth(this)">У</span> <span onmousedown="searchAlfabetAuth(this)">Ф</span> <span onmousedown="searchAlfabetAuth(this)">Х</span> <span onmousedown="searchAlfabetAuth(this)">Ц</span> <span onmousedown="searchAlfabetAuth(this)">Ч</span> <span onmousedown="searchAlfabetAuth(this)">Ш</span> <span onmousedown="searchAlfabetAuth(this)">Щ</span> <span onmousedown="searchAlfabetAuth(this)">Э</span> <span onmousedown="searchAlfabetAuth(this)">Ю</span> <span onmousedown="searchAlfabetAuth(this)">Я</span><br/><span onmousedown="searchAlfabetAuth(this)">A</span> <span onmousedown="searchAlfabetAuth(this)">B</span> <span onmousedown="searchAlfabetAuth(this)">C</span> <span onmousedown="searchAlfabetAuth(this)">D</span> <span onmousedown="searchAlfabetAuth(this)">E</span> <span onmousedown="searchAlfabetAuth(this)">F</span> <span onmousedown="searchAlfabetAuth(this)">G</span> <span onmousedown="searchAlfabetAuth(this)">H</span> <span onmousedown="searchAlfabetAuth(this)">I</span> <span onmousedown="searchAlfabetAuth(this)">J</span> <span onmousedown="searchAlfabetAuth(this)">K</span> <span onmousedown="searchAlfabetAuth(this)">L</span> <span onmousedown="searchAlfabetAuth(this)">M</span> <span onmousedown="searchAlfabetAuth(this)">N</span> <span onmousedown="searchAlfabetAuth(this)">O</span> <span onmousedown="searchAlfabetAuth(this)">P</span> <span onmousedown="searchAlfabetAuth(this)">Q</span> <span onmousedown="searchAlfabetAuth(this)">R</span> <span onmousedown="searchAlfabetAuth(this)">S</span> <span onmousedown="searchAlfabetAuth(this)">T</span> <span onmousedown="searchAlfabetAuth(this)">U</span> <span onmousedown="searchAlfabetAuth(this)">V</span> <span onmousedown="searchAlfabetAuth(this)">W</span> <span onmousedown="searchAlfabetAuth(this)">X</span> <span onmousedown="searchAlfabetAuth(this)">Y</span> <span onmousedown="searchAlfabetAuth(this)">Z</span></div>';
			$interfacesdiv.='</div><div class="spacer"></div>';
			$strjs.='var fromaftobibl=["'.$sinterf[$i]->label.'","'.$sinterf[$i]->title.'"];'."\n";
			$fromaftobiblname=$sinterf[$i]->label;
			$fromaftobibltitle=$sinterf[$i]->title;
			if(isset($sinterf[$i]->prefind))
			{
				if($sinterf[$i]->prefind!="")
					$strjs.='var prefind="'.$sinterf[$i]->prefind.'";'."\n";
			}
			if($sinterf[$i]->affindbroker!="")
				$strjs.='var affindbroker="'.$sinterf[$i]->affindbroker.'";'."\n";	
			if($sinterf[$i]->affindlogin!="")
				$strjs.='var affindlogin="'.$sinterf[$i]->affindlogin.'";'."\n";
			
			$afjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/search_af/js';
			$afjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
			if(!is_file($afjspath2.'/searchaf.js'))
				copyDirectory($afjspath2,$afjspath1);
		}
		elseif($sinterf[$i]->id=="fulltext")
		{
			$fulltext=true;
			$strjs.='var fulltextbase="'.$sinterf[$i]->base.'";'."\n";
			$fulltextbasenumber=$sinterf[$i]->base;
			$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmousedown="switchSearch(this)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
			$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display: none">';
			$interfacesdiv.='<input type="button" class="'.$sinterf[$i]->id.'button" onmousedown="fulltextSearch()" value="Искать"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'fullt_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'fullt_div\')"></span></div></div><div class="inp"><input id="itemfulltxt" type="text" class="iLAB" value="" maxlength="1000" /></div></div></div><div class="spacer"></div>';
		}
		elseif($sinterf[$i]->id=="usesort")
		{
			$strjs.='var usesort="yes";'."\n";
			if(isset($sinterf[$i]->label))
				$strjs.='var usesortlabel="'.$sinterf[$i]->label.'";'."\n";
		}
		elseif($sinterf[$i]->id=="uselight")
		{
			$strjs.='var uselight="yes";'."\n";
		}
		elseif($sinterf[$i]->id=="blind")
		{
			$useblind=true;
		}
		elseif($sinterf[$i]->id=="biblio")
		{
			$strjs.='var biblio="yes";'."\n";
			$bibliosearch=true;
		}
		elseif($sinterf[$i]->id=="bibliowidget")
		{
			$strjs.='var bibliowidget="'.$sinterf[$i]->value.'";'."\n";
			$bibliowidget=$sinterf[$i]->value;
			$bibliodiv='<div id="bs" data-library="'.$bibliowidget.'"></div>
<script src="//'.$jsonpath->biblioserver.'/bs.min.js"></script>';
			$bibliocss='echo \'<link href="//'.$jsonpath->biblioserver.'/bs.min.css" type="text/css" rel="stylesheet"/>
			<link href="/wlib/wlib/css/_additional/biblio.css" type="text/css" rel="stylesheet"/>\';';
			$bibliotabs='<div class="tab_to_switch_search"><span class="discovery" onmousedown="userSwitchTypeSearch(this)">Искать во внешних источниках</span></div>';
		}
		elseif($sinterf[$i]->id=="solr")
		{
			$strjs.='var solr="yes";'."\n";
		}
		elseif($sinterf[$i]->id=="mapsearch")
		{
			$sinterfacediv.='<span id="callsearchmap" onmousedown="showSearchMap()" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
			$strjs.='var mapwidth="'.$sinterf[$i]->mapwidth.'";'."\n";
			$strjs.='var mapheight="'.$sinterf[$i]->mapheight.'";'."\n";
			if(isset($sinterf[$i]->listregions))
				$strjs.='var listregions="yes";'."\n";
			$maptpl='<div id="map_container" class="map_hide">'."\n".'<div id="searchmap" class="map_hide"></div>'."\n".'</div>';
		}
		else
		{
			if(!isset($sinterf[$i]->switch_in_base))
			{
				$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmousedown="switchSearch(this)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
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
					$interfacesdiv.='<b class="voc" onmousedown="showVoc(this)"></b><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div><div class="inp"><input id="itemprof" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><div class="spacer"></div><div class="ibutt"><input type="button" class="'.$sinterf[$i]->id.'button" onmousedown="simpleSearch()" value="Искать"/><input type="button" class="button2" onmousedown="clearSearch()"  value="Очистить"/><input title="ПЕРЕНЕСТИ" type="button" id="sand" onclick="putLAB(this)" value="И"/><input title="ПЕРЕНЕСТИ" type="button" id="sor" onclick="putLAB(this)" value="ИЛИ"/><input title="ПЕРЕНЕСТИ" type="button" id="snot" onclick="putLAB(this)" value="НЕ"/>';
					if($sinterf[$i]->choose_af=="true")
					{
						$interfacesdiv.='<input title="АЛФАВИТНЫЙ СПИСОК" type="button" id="saf" class="saf" onclick="findInAf(this)" value="Список"/>';
						$afjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/search_af/js';
						$afjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
						if(!is_file($afjspath2.'/searchaf.js'))
							copyDirectory($afjspath2,$afjspath1);
					}
					$interfacesdiv.='</div><div id="combo"><div class="me"><u>Я ищу</u>:</div><div id="expr"></div><div class="spacer"></div></div>';
				}
				else
				{
					$interfacesdiv.='<input type="button" class="'.$sinterf[$i]->id.'button" onmousedown="simpleSearch()" value="Искать в РГБИ"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,\'labs_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,\'labs_div\')"></span></div></div><div class="inp"><input';
					if($sinterf[$i]->id=="simple")
					{
						$interfacesdiv.=' id="itemsimple"';
					}
					$interfacesdiv.=' type="text" class="iLAB" value="" maxlength="1000" /></div></div>';
				}
				$interfacesdiv.='</div><div class="spacer"></div>';
			}
			else
			{
				if($sinterf[$i]->switch_in_base=="in_interface")
				{
					$sinterfacediv.='<span id="'.$sinterf[$i]->id.'" onmousedown="switchSearch(this)" class="sel'.$cln.'">'.$sinterf[$i]->title.'</span>';
				}
				$interfacesdiv.='<div id="'.$sinterf[$i]->id.'_search" style="display:none"><input type="button" class="fundbutton" onmousedown="searchFundHolders()" value="Искать"/><div class="labcontainer"><div class="inp"><input id="iCA" type="text" class="iLAB" value="" maxlength="1000"/></div></div><div id="lib_search">Введите сиглу, часть названия или адреса</div></div><div class="spacer"></div>';
				$switchinbase.=$sinterf[$i]->switch_in_base;
				//$strjs.='var numdbAF="'.$sinterf[$i]->fundnumber.'";'."\n";
				$afjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/search_fundholders/js';
				$afjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
				if(!is_file($afjspath2.'/searchfundholders.js'))
					copyDirectory($afjspath2,$afjspath1);
			}
		}
	}
	$sinterfacediv.='<span class="history_link" onclick="showHistory()">История поисков</span>';
	$interfacesdiv.='<div id="sbuttons" style="display:none"><input type="button" class="expandbutton" onmousedown="simpleSearch()" value="Искать"/><input type="button" class="button2" onmousedown="clearSearch(this)" value="Очистить"/></div>';
	foreach ($jsonpath as $key => $value)
	{
		if((strpos($key, 'pathactrcp')!==false)||(strpos($key, 'foldername')!==false)||(strpos($key, 'pathcss')!==false)||(strpos($key, 'pathjs')!==false)||(strpos($key, 'pathimg')!==false)||(strpos($key, 'pathhtml')!==false)||(strpos($key, 'pathdoc')!==false)||(strpos($key, 'pathrubricator')!==false))
		{
			$strjs.='var '.$key.'="'.$value.'";'."\n";			
		}
		else
		{
			continue;
		}
	}
	if(isset($jsondb->repointerface))/*репозиторий*/
	{
		$strjs.='var repointerface="yes";'."\n";	
	}
	if(isset($jsondb->listlit))/*список выдачи*/
	{
		$strjs.='var listlit="yes";'."\n";	
	}
	if(isset($jsondb->collection))/*коллекции на отдельной странице*/
	{
		$strjs.='var coldb="'.$jsondb->collection->coldb.'";'."\n";	
		$strjs.='var labcol="'.$jsondb->collection->labcol.'";'."\n";	
		$strjs.='var labsubcol="'.$jsondb->collection->labsubcol.'";'."\n";	
		$strjs.='var labres="'.$jsondb->collection->labres.'";'."\n";
		if(isset($jsondb->collection->labresprefix))
		{
			$strjs.='var labresprefix="'.$jsondb->collection->labresprefix.'";'."\n";
		}
		$coljspath1=$jsonpath->dirhtdocs.'conf/custom/additional/collections/js';
		$coljspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
		if(!is_file($coljspath2.'/collections.js'))
			copyDirectory($coljspath2,$coljspath1);
		$colcsspath1=$jsonpath->dirhtdocs.'conf/custom/additional/collections/css';
		$colcsspath2=$jsonpath->dirhtdocs.'conf/custom/css/default';
		if(!is_file($coljspath2.'/collections.css'))
			copyDirectory($colcsspath2,$colcsspath1);
	}
	if(isset($jsondb->groupcode))/*добавление регистрации*/
	{
		$strjs.='var groupcode="'.$jsondb->groupcode.'";'."\n";	
		$strjs.='var codepointreg="'.$jsondb->codepointreg.'";'."\n";
		$flagreg=true;
		if(isset($jsondb->notepointreg))
		{
			$strjs.='var notepointreg="'.$jsondb->notepointreg.'";'."\n";
		}
		if(isset($jsondb->payloan))
		{
			$flagpayloan=true;
			$strjs.='var payloan="yes";'."\n";
			$regjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/pay_emba/js';
			$regjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
			if(!is_file($regjspath2.'/emba.js'))
				copyDirectory($regjspath2,$regjspath1);
		}
		else
		{
			$regjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/libregistration/js';
			$regjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
			if(!is_file($regjspath2.'/libregistration.js'))
				copyDirectory($regjspath2,$regjspath1);
		}
		if(isset($jsondb->reglayer))
		{
			$flagreglayer=true;
			$rezultregpath = file_get_contents($regpath);
			$strjs.='var titlereglayer="'.$jsondb->reglayer.'";'."\n";
			if(isset($jsondb->notereglayer))
				$strjs.='var notereglayer="'.$jsondb->notereglayer.'";'."\n";
			$strjs.='var regfromlayer='.$rezultregpath.';'."\n";
			$strjs.='var titleregformbutton="'.$jsondb->titleregformbutton.'";'."\n";
			if(isset($jsondb->noteregformbutton))
				$strjs.='var noteregformbutton="'.$jsondb->noteregformbutton.'";'."\n";
			if(isset($jsondb->accountsets))
			{
				if(isset($jsondb->accountsets->titleauthform))
					$strjs.='var titleauthform="'.$jsondb->accountsets->titleauthform.'";'."\n";
				if(isset($jsondb->accountsets->noteauthform))
					$strjs.='var noteauthform="'.$jsondb->accountsets->noteauthform.'";'."\n";
				if(isset($jsondb->accountsets->titleauthformbutton))
					$strjs.='var titleauthformbutton="'.$jsondb->accountsets->titleauthformbutton.'";'."\n";
				if(isset($jsondb->accountsets->noteauthformbutton))
					$strjs.='var noteauthformbutton="'.$jsondb->accountsets->noteauthformbutton.'";'."\n";
				if(isset($jsondb->accountsets->titlelogin))
					$strjs.='var titlelogin="'.$jsondb->accountsets->titlelogin.'";'."\n";
				if(isset($jsondb->accountsets->titleloginnote))
					$strjs.='var titleloginnote="'.$jsondb->accountsets->titleloginnote.'";'."\n";
				if(isset($jsondb->accountsets->titlepassword))
					$strjs.='var titlepassword="'.$jsondb->accountsets->titlepassword.'";'."\n";
				if(isset($jsondb->accountsets->titlepasswordnote))
					$strjs.='var titlepasswordnote="'.$jsondb->accountsets->titlepasswordnote.'";'."\n";
				if(isset($jsondb->accountsets->titleforgotpass))
					$strjs.='var titleforgotpass="'.$jsondb->accountsets->titleforgotpass.'";'."\n";
				if(isset($jsondb->accountsets->titleforgotpassnote))
					$strjs.='var titleforgotpassnote="'.$jsondb->accountsets->titleforgotpassnote.'";'."\n";
				if(isset($jsondb->accountsets->titleforgotpassbutton))
					$strjs.='var titleforgotpassbutton="'.$jsondb->accountsets->titleforgotpassbutton.'";'."\n";
				if(isset($jsondb->accountsets->emailfield))
					$strjs.='var emailfield="'.$jsondb->accountsets->emailfield.'";'."\n";
			}
		}
	}
	
	if((isset($jsondb->newsdb))||(isset($jsondb->newsasmodule)))/*новые поступления*/
	{
		if(isset($jsondb->newsdb))
		{
			$strjs.='var newsdb="'.$jsondb->newsdb.'";'."\n";
		}
		if(isset($jsondb->newslabel))
		{
			$strjs.='var newslabel="'.$jsondb->newslabel.'";'."\n";
		}
		if(isset($jsondb->sortnewslabel))
		{
			$strjs.='var sortnewslabel="'.$jsondb->sortnewslabel.'";'."\n";
		}
		if(isset($jsondb->newscalendar))
		{
			$strjs.='var newscalendar="'.$jsondb->newscalendar.'";'."\n";
		}
		if(isset($jsondb->newsperiod))
		{
			$strjs.='var newsperiod="'.$jsondb->newsperiod.'";'."\n";
		}
		if(isset($jsondb->newsquant))
		{
			$strjs.='var newsquant="'.$jsondb->newsquant.'";'."\n";
		}
		if(isset($jsondb->newsrestriction))
		{
			$strjs.='var newsrestriction="'.$jsondb->newsrestriction.'";'."\n";
		}
		if(isset($jsondb->newsoutform))
		{
			$strjs.='var newsoutform="'.$jsondb->newsoutform.'";'."\n";
		}
		if(isset($jsondb->newsasmodule))
		{
			$strjs.='var newsasmodule="yes";'."\n";
			$flagnewsasmodule=true;
		}
	}
	
	if($flagnewsasmodule)
	{
		$snpath1=$jsonpath->dirhtdocs.'conf/custom/additional/supplementary_search_news/js';
		$snpath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
		if(!is_file($snpath2.'/supplementary_search_news.js'))
			copyDirectory($snpath2,$snpath1);
		$nscsspath1=$jsonpath->dirhtdocs.'conf/custom/additional/supplementary_search_news/css';
		$nscsspath2=$jsonpath->dirhtdocs.'conf/custom/css/default';
		if(!is_file($nscsspath2.'/nessite.css'))
			copyDirectory($nscsspath2,$nscsspath1);
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
			if($value->number=="all")
				$flagallbases=true;
			if(($value->type =="BIBL")&&($value->number!="all"))
				$biblcount++;
			if($count==1)
			{
				if($jsondb->display=="none")
				{
						$basesdiv.='<input type="hidden" name="base" id="currdb" value="'.$value->number.'"/>';
				}
			}
			if($value->type =="AF")
			{
				$afcount++;
				$basecls='authority';
				if((!isset($value->display))&&($value->dbindex!="fundholders"))
					$aflnumber=$value->number;
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
						$basesdiv.='<div id="i'.$value->dbindex.'" onclick="PutLabValue(this)" class="i'.$value->number.'">'.$value->alias.'</div>';
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
					$show='';
					if(isset($value->display))
						$show.=' style="display:none"';
					else
						$show='';
					$basesdiv.='<div id="i'.$value->dbindex.'" onclick="PutLabValue(this)" class="i'.$value->number.'"'.$show.'>'.$value->alias.'</div>';
				}
			}
			$strjs.='dbs["'.$value->number.'"]=[];'."\n";
			$strjs.='dbs["'.$value->number.'"]["type"]="'.$value->type.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["mode"]="'.$value->mode.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["alias"]="'.$value->alias.'";'."\n";
			$strjs.='dbs["'.$value->number.'"]["dbindex"]="'.$value->dbindex.'";'."\n";
			if(isset($value->outform))
			{
				$strjs.='dbs["'.$value->number.'"]["outform"]="'.$value->outform.'";'."\n";
			}
			if(isset($value->outformfull))
			{
				$strjs.='dbs["'.$value->number.'"]["outformfull"]="'.$value->outformfull.'";'."\n";
			}
			if(isset($value->loadurl))
			{
				$strjs.='dbs["'.$value->number.'"]["loadurl"]="'.$value->loadurl.'";'."\n";
			}
			if(isset($value->seef))
			{
				$strjs.='dbs["'.$value->number.'"]["seef"]="'.$value->seef.'";'."\n";
			}
			if(isset($value->bibcard))
			{
				$strjs.='dbs["'.$value->number.'"]["bibcard"]="'.$value->bibcard.'";'."\n";
			}
			if(isset($value->bibcardtype))
			{
				$strjs.='dbs["'.$value->number.'"]["bibcardtype"]="'.$value->bibcardtype.'";'."\n";
			}
			if(isset($value->rusmarc))
			{
				$strjs.='dbs["'.$value->number.'"]["rusmarc"]="'.$value->rusmarc.'";'."\n";
			}
			if(isset($value->place))
			{
				$strjs.='dbs["'.$value->number.'"]["place"]="'.$value->place.'";'."\n";
			}
			if(isset($value->groupplace))
			{
				$strjs.='dbs["'.$value->number.'"]["groupplace"]="'.$value->groupplace.'";'."\n";
			}
			if(isset($value->additional))
			{
				$strjs.='dbs["'.$value->number.'"]["additional"]=[];'."\n";
				$strjs.='dbs["'.$value->number.'"]["additional"]["raitings"]="'.$value->additional->raitings.'";'."\n";
				$strjs.='dbs["'.$value->number.'"]["additional"]["comments"]="'.$value->additional->comments.'";'."\n";
				$strjs.='dbs["'.$value->number.'"]["additional"]["social"]="'.$value->additional->social.'";'."\n";
				if($value->additional->social != "")
				{
					$sjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/social/js';
					$sjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
					if(!is_file($sjspath2.'/social.js'))
						copyDirectory($sjspath2,$sjspath1);
				}
				$strjs.='dbs["'.$value->number.'"]["additional"]["scopy"]="'.$value->additional->scopy.'";'."\n";
				if($value->additional->scopy != "")
				{
					$ssjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/copy_link/js';
					$ssjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
					if(!is_file($ssjspath2.'/copy_link.js'))
						copyDirectory($ssjspath2,$ssjspath1);
				}
				$strjs.='dbs["'.$value->number.'"]["additional"]["nophoto"]="'.$value->additional->nophoto.'";'."\n";
			}
			if(isset($value->addqueries))
			{
				$strjs.='dbs["'.$value->number.'"]["addqueries"]=[];'."\n";
				$addqueries=$value->addqueries;
				$alen=count($addqueries);
				for($i=0; $i<$alen; $i++)
				{
					$strjs.='dbs["'.$value->number.'"]["addqueries"]['.$i.']={';
					if(isset($addqueries[$i]->addnumber))
					{
						$strjs.='"addnumber":"'.$addqueries[$i]->addnumber.'"';
					}
					if(isset($addqueries[$i]->addtitle))
					{
						$strjs.=',"addtitle":"'.$addqueries[$i]->addtitle.'"';
					}
					if(isset($addqueries[$i]->addquery))
					{
						$strjs.=',"addquery":"'.$addqueries[$i]->addquery.'"';
					}
					if(isset($addqueries[$i]->addlabel))
					{
						$strjs.=',"addlabel":"'.$addqueries[$i]->addlabel.'"';
					}
					if(isset($addqueries[$i]->addservice))
					{
						$strjs.=',"addservice":"'.$addqueries[$i]->addservice.'"';
					}
					if(isset($addqueries[$i]->addversion))
					{
						$strjs.=',"addversion":"'.$addqueries[$i]->addversion.'"';
					}
					if(isset($addqueries[$i]->addoutform))
					{
						$strjs.=',"addoutform":"'.$addqueries[$i]->addoutform.'"';
					}
					if(isset($addqueries[$i]->addport))
					{
						$strjs.=',"addport":"'.$addqueries[$i]->addport.'"';
					}
					if(isset($addqueries[$i]->addhost))
					{
						$strjs.=',"addhost":"'.$addqueries[$i]->addhost.'"';
					}
					if(isset($addqueries[$i]->addhandlerpath))
					{
						$strjs.=',"addhandlerpath":"'.$addqueries[$i]->addhandlerpath.'"';
					}
					$strjs.='};'."\n";
				}
			}
			if(isset($value->afrubricator))
			{
				$strjs.='dbs["'.$value->number.'"]["afrubricator"]="'.$value->afrubricator.'";'."\n";
				if($value->afrubricator == "4")
				{
					$treejspath1=$jsonpath->dirhtdocs.'conf/custom/additional/treeview/js';
					$treejspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
					if(!is_file($treejspath2.'/treeview.js'))
						copyDirectory($treejspath2,$treejspath1);
				}
			}
			if(isset($value->display))
			{
				$strjs.='dbs["'.$value->number.'"]["display"]="'.$value->display.'";'."\n";
			}
			if(isset($value->rubricator))
			{
				$strjs.='dbs["'.$value->number.'"]["rubricator"]="'.$value->rubricator->label.'";'."\n";
				$strjs.='dbs["'.$value->number.'"]["rdisplay"]="'.$value->rubricator->display.'";'."\n";
				$rubjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/rubricator/js';
				$rubjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
				if(!is_file($rubjspath2.'/rubricator.js'))
					copyDirectory($rubjspath2,$rubjspath1);
			}
			if(isset($value->search_label))
			{
				$strjs.='dbs["'.$value->number.'"]["search_label"]="'.$value->search_label.'";'."\n";
			}
			if(isset($value->bibl_search_label))
			{
				$strjs.='dbs["'.$value->number.'"]["bibl_search_label"]="'.$value->bibl_search_label.'";'."\n";
			}
			if(isset($value->brokerid))
			{
				$strjs.='dbs["'.$value->number.'"]["brokerid"]="'.$value->brokerid.'";'."\n";
			}
			if(isset($value->fundlogin))
			{
				$strjs.='dbs["'.$value->number.'"]["fundlogin"]="'.$value->fundlogin.'";'."\n";
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
				if(($fulltextbasenumber!="")&&($fulltextbasenumber==$value->number))
				{
					$strjs.='dbs["'.$value->number.'"]["labels"]["FR"]=["Фраза","",""];'."\n";
					$strjs.='dbs["'.$value->number.'"]["labels"]["KS"]=["Ключевые слова","",""];'."\n";
				}
				if($fromaftobiblname!="")
				{
					$strjs.='dbs["'.$value->number.'"]["labels"]["'.$fromaftobiblname.'"]=["'.$fromaftobibltitle.'","",""];'."\n";
				}
				$labsdiv.='<div style="display: none;" class="options" id="labs_div_'.$value->number.'">';
				foreach($value->labels as $arg => $val)
				{
					$frole='N';
					$ffacet='false';
					$fsort='count';
					$forder='desc';
					$fscore='1';
					$freal=$arg;
					if(isset($val->role))
						$frole=$val->role;
					if(isset($val->facet))
						$ffacet=$val->facet;
					if(isset($val->_sort))
						$fsort=$val->_sort;
					if(isset($val->order))
						$forder=$val->order;
					if(isset($val->score))
						$fscore=$val->score;
					if(isset($val->reallabel))
						$freal=$val->reallabel;
					$strjs.='dbs["'.$value->number.'"]["labels"]["'.$arg.'"]=["'.$val->title.'","'.$val->index.'","'.$val->af.'","'.$frole.'","'.$ffacet.'","'.$fsort.'","'.$forder.'","'.$fscore.'","'.$freal.'"];'."\n";
					if(($arg!="COD")&&(!isset($val->invisible)))
						$labsdiv.='<div onclick="PutLabValue(this)" class="i'.$arg.'">'.$val->title.'</div>';
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
						$limitsdiv.='<div id="l_'.$value->number.'_'.$arg.'" class="select"><img onclick="showOptions(this)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div>';
						$limitsdivopt.='<div id="l_'.$value->number.'_'.$arg.'_opt" class="options" style="display: none"><div onclick="PutLabValue(this)" class="all">все</div>';
						for($i=0; $i<$len; $i++)
						{
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']=[];'."\n";
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']["value"]="'.$arr[$i]->value.'";'."\n";
							$strjs.='dbs["'.$value->number.'"]["limits"]["'.$arg.'"]["content"]['.$i.']["text"]="'.$arr[$i]->text.'";'."\n";
							$limitsdivopt.='<div onclick="PutLabValue(this)" class="'.$arr[$i]->value.'">'.$arr[$i]->text.'</div>';
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
							$limitsdiv.='<span class="from">&#160;c&#160;</span><span class="input"><input id="period_'.$value->number.'_'.$arg.'_1" name="period_'.$value->number.'_'.$arg.'_1" size="4" maxlength="4" type="text" value="" class="'.$val->label.'"/></span><span class="to">&#160;по&#160;</span><span class="input"><input id="period_'.$value->number.'_'.$arg.'_2" name="period_'.$value->number.'_'.$arg.'_2" size="4" maxlength="4" type="text" value="" class="'.$val->label.'"/></span>';
						}
					}
					$limitsdiv.='</div>';
				}
				$limitsdiv.='</div><div class="spacer"></div>';
			}
			
			if(isset($value->filters))
			{
				$strjs.='dbs["'.$value->number.'"]["filters"]=[];'."\n";
				$filtersdiv='<div id="filters_'.$value->number.'">';
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
							$filtersdiv.='<div class="'.$arr[$i]->value.'"><span id="filter_'.$value->number.'_'.$arg.'_'.$i.'" class="unchecked" title="ФИЛЬТРОВАТЬ"  onclick="appendFilter(this)">'.$arr[$i]->text.'</span><i>(0)</i></div>';
						}
						if(isset($val->felse))
						{
							if($val->felse == "yes")
							{
								$filtersdiv.='<div id="filter_'.$value->number.'_'.$arg.'_else" class="else"  onclick="addFilterVoc(\''.$val->name.'\',this)">еще...</div>';
							}
						}
					}
					else
					{
						$filtersdiv.='<div class="('.$val->label.' \''.date('Y').'\')"><span class="unchecked" id="dinamic_'.$value->number.'_currdate" title="ФИЛЬТРОВАТЬ"  onclick="appendFilter(this)">'.date('Y').'</span><i>(0)</i></div><div class="else" id="dinamic_'.$value->number.'_'.$arg.'"  onclick="addFilterPeriod(this)">задать диапазон...</div>';
					}
					$filtersdiv.='</div></div>';
				}
				$filtersdiv.='<div style="text-align:center"><input type="button" class="button2 clear_filters" onmousedown="clearFilters(this)" value="Очистить фильтры"/></div></div>';
				$filtersarr[]=array($value->number,$filtersdiv);
			}
		}
	}
	if($biblcount>0)
	{
		$bcount=0;
		$acount=0;
		foreach ($jsondb as $key => $value)
		{
			$res = strpos($key, 'dbs_');
			if($res !== false)
			{
				if(($value->type =="BIBL")&&($value->number!="all"))
				{
					if($bcount==0)
						$biblnumber=$value->number;
					$bcount++;
				}
				else
				{
					if($value->type =="AF")
					{
						if($acount==0)
							$aflnumber=$value->number;
						$acount++;
					}
				}
			}
		}
		$strjs.='var numdbBIBL="'.$biblnumber.'";'."\n";
		$strjs.='var numdbf="'.$aflnumber.'";'."\n";
	}
	if($fulltext)
	{
		$labsdiv.='<div style="display: none;" class="options" id="fullt_div"><div onclick="PutLabValue(this)" class="iFR">Фраза</div><div onclick="PutLabValue(this)" class="iKS">Ключевые слова</div></div>';
	}
	if($flagallbases==true)
	{
		foreach ($jsondb as $key => $value)
		{
			$res = strpos($key, 'dbs_'.$biblnumber);
			if($res !== false)
			{
				$labsdiv.='<div style="display: none;" class="options" id="labs_div_all">';
				foreach($value->labels as $arg => $val)
				{
					if(($arg!="COD")&&(!isset($val->invisible)))
						$labsdiv.='<div onclick="PutLabValue(this)" class="i'.$arg.'">'.$val->title.'</div>';
				}
				$labsdiv.='</div>';
			}
		}
	}
	
	writeFile($pathlabels,$labsdiv);
	
	if(!file_exists($pathlabelsdefault))
	{
		writeFile($pathlabelsdefault,$labsdiv);
	}
	
	if($jsondb->display=="select")
	{
		$flagdisplay=true;
		$basesselect.='<div style="display: none;" class="options2" id="bases_container">'.$basesdiv.'</div>';
		$basesdiv='<div class="basescontainer"><div class="opt2"><div class="select2"><img onmousedown="showOptions(this,\'bases_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" title="" class="labs" border="0" hspace="0" vspace="0"/><span id="currdb" onmousedown="showOptions(this.previousSibling,\'bases_div\')"></span></div></div></div>';
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
		$limitsdiv='<div id="limits_search" class="limits" onclick="showLimits(this)" style="display:none">Ограничения</div>'.$limitsdiv;

		writeFile($pathlimits,$limitsdiv);
		
		if(!file_exists($pathlimitsdefault))
		{
			writeFile($pathlimitsdefault,$limitsdiv);
		}
		
		if($limitsdivopt!='')
		{
			writeFile($pathlimitsopt,$limitsdivopt);
			
			if(!file_exists($pathlimitsoptdefault))
			{
				writeFile($pathlimitsoptdefault,$limitsdivopt);
			}
		}
	}
	
	$conffile=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/_conf/db.conf';
	copyFile($basepath,$conffile);
	
	$newfacetspath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/_conf/facets.conf';
	if(file_exists($facetspath))
	{
		copyFile($facetspath,$newfacetspath);
	}

	$newsortpath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/_conf/sort.conf';
	if(file_exists($sortpath))
	{
		copyFile($sortpath,$newsortpath);
	}
	
	if($flagreg && $flagreglayer)
	{
		$newregpath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/_conf/regform.conf';
		if(file_exists($regpath))
		{
			copyFile($regpath,$newregpath);
		}
	}
	
	$idir=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/img';
	$icdir='custom/img';
	if(!count(glob($idir.'/*')))
		copyFiles($idir,$icdir);
	
	$footertpl = <<<HTML
<div id="footer">
	<div id="bottom_info">
		<div>
			<div>
				<span>Адрес:</span>
				<span>$jsonpath->rcppostaddress</span>
			</div>
			<div>
				<span>Контакты:</span>
				<span>Телефон:</span>
				<span>$jsonpath->rcpphonenumber</span><br/>
				<span>E-mail:</span>
				<span>$jsonpath->rcpmailto</span>
			</div>
			<div>
				<span>Техническая поддержка:</span>
				<span><span>Разработано</span> <a href="http://ditm.ru/" target="_blank" title="ДИТ-М">ООО «ДИТ-М»</a> <span>на базе решений</span> <a href="http://softwareag.com/" target="_blank" title="Software AG">Software AG</a></span>
				<span class="invis" title="НАВЕРХ" id="go-to-top" onclick="goToTop()"></span>
			</div>
		</div>
	</div>
	<div id="bottom_copy">
		<div>
			<div>
				<span>&copy; <?php echo date('Y') ?>, $jsonpath->rcpcopyright</span>
				<span>
					<span class="bcounter"></span>
				</span>
			</div>
		</div>
	</div>
</div>


HTML;
	

if(!file_exists($pathfooter))
{
	writeFile($pathfooter,$footertpl);
}
	
	$bases=file_get_contents($pathbases);
	$swint=file_get_contents($pathsinterface);
	$ints=file_get_contents($pathinterfaces);
	$flabs=file_get_contents($pathlabels);
	$flimits="";
	if(file_exists($pathlimits))
		$flimits=file_get_contents($pathlimits);
	$flimitsopt="";
	if(file_exists($pathlimitsopt))
		$flimitsopt=file_get_contents($pathlimitsopt);

$searchdivbottomtpl=<<<HTML
	<div class="bottom"></div>
	$maptpl


HTML;


$basesbottomtpl=<<<HTML
			</div>
	</div>


HTML;


$headertoptpl=<<<HTML
	<div id="header">
	<div>
	<div class="cross" id="menu_button" onclick="showHideM('top_info', 'menu_button')"><span></span><span></span><span></span></div><div id="index__" class="s" onclick="goToLocation(this.id)">$jsonpath->rcpsmalltitle</div>
	<div class="top_logo"><div id="index" class="index" onclick="goToLocation(this.id)"><div class="inner"><div class="n">$jsonpath->rcptitle</div><div class="z">$jsonpath->rcpdescription</div></div></div></div>
	<div class="block" id="top_info">
	<?php
		\$utype='';
		if(isset(\$ujson))
			\$utype=gettype(\$ujson);

		if(((\$utype=='object') && isset(\$ujson->userinfo->FU) && (\$ujson->userinfo->FU != "") && (\$ujson->userinfo->FU != "N/A")) && (!\$flag45))
		{
			if(isset(\$fjson->accountsets))
			{
				\$ffio='';
				\$fcode='';
				\$fmail='';
				if(isset(\$fjson->accountsets->AO))
				{
					\$ffio="AO";
				}
				if(isset(\$fjson->accountsets->fieldcodes))
				{
					\$fcode=\$fjson->accountsets->fieldcodes;
				}
				if(isset(\$fjson->accountsets->AI))
				{
					\$fmail="AI";
				}
				if((\$utype=='object') && isset(\$ujson->userinfo->FU) && (\$ujson->userinfo->FU != "") && (\$ujson->userinfo->FU != "N/A"))
				{
					\$lkstr='<div id="lkinfo">';
					if(\$ffio != "")
						\$lkstr.='<span class="lk'.\$ffio.'">'.\$ujson->userinfo->\$ffio.'</span>';
					if(\$fcode != "")
					{
						\$lkstr.='<span class="lktitleet">'.\$fjson->accountsets->titleet.'</span>';
						if(isset(\$ujson->userinfo->\$fcode))
							\$lkstr.='<span class="lk'.\$fcode.'">'.\$ujson->userinfo->\$fcode.'</span>';
						else
							\$lkstr.='<span class="lk'.\$fcode.'">отсутствует</span>';
					}
					if(\$fmail != "")
					{
						\$lkstr.='<span class="lktitleai">'.\$fjson->accountsets->titlemail.'</span>';
						if((isset(\$ujson->userinfo->\$fmail))&&(\$ujson->userinfo->\$fmail != "N/A"))
							\$lkstr.='<span class="lk'.\$fmail.'">'.\$ujson->userinfo->\$fmail.'</span>';
						else
							\$lkstr.='<span class="lk'.\$fmail.'">отсутствует</span>';
					}
					\$lkstr.='<span class="addsettings" onmousedown="lkSettings()">Настройки</span></div>';
					echo \$lkstr;
				}
			}
		}
	?>
	<ul id="top_menu" class="top_menu">


HTML;

$basestoptpl=<<<HTML
	<div class="searchdiv" id="searchdiv">
		<div class="bases_div" id="bases_div">
			<div class="cross" id="menu_button_base" onmousedown="showHideM('bases_div_inner', 'menu_button_base')"><span></span><span></span><span></span></div><div class="s_base" onmousedown="showHideM('bases_div_inner')">Выбрать БД</div>
			<div id="bases_div_inner" class="block">


HTML;

	
$pagetext=<<<HTML
<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>


HTML;


$pagetextfooter=<<<HTML
<div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>


HTML;


$headermiddletpl='';

$hdir=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html';
$ihdir='custom/modules';
if(!is_dir($hdir.'/_modules'))
{
	copyDirectory($hdir,$ihdir);
}
//$sitemap=writeSiteMap($hdir.'/_modules','','',0);
//$sitemapjson='{"modules":{'.$sitemap.'"":{}},"pages":{';
//$sitemap='var modules={'.$sitemap.'"":{}};'."\n";

$modules=writeSiteMap($hdir.'/_modules','','',0);
$modulesjson='"modules":{'.$modules.'"":{}}';
$modules='var modules={'.$modules.'"":{}};'."\n";

$pages='var pages={';
$pagesjson='"pages":{';

$xmldir='custom/pages';
if ($dh = opendir($xmldir))
{
	$num=0;
	while (($jfile = readdir($dh)) !== false)
	{
		if(is_file($xmldir.'/'.$jfile))
		{
			$ext=str_replace(".xml","",$jfile);
			createDirectory($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/'.$ext);
			$pagefilepath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/'.$ext.'/'.$ext.'.php';
			$xmlfile=$xmldir.'/'.$jfile;
			$xml = new DOMDocument('1.0');
			$xml->formatOutput = true; 
			$xml->preserveWhiteSpace = false; 
			$xml->load($xmlfile);
			$ttags = $xml->getElementsByTagName('title');
			$tnode = $ttags->item(0);
			$pagename=showPageTree($tnode,'');
			if(($ext!="index") && ($ext!="privat") && ($ext!="regform"))
			{
				$headermiddletpl.='<li><span id="'.$ext.'" onclick="goToLocation(this.id)">'.$pagename.'</span></li>';
			}
			$ctags = $xml->getElementsByTagName('content');
			if($ctags->length==0)
			{
				$ctags = $xml->getElementsByTagName('index');
			}
			$cnode = $ctags->item(0);
			$showpagetree='';
			$showpagetree.=showPageTree($cnode,'');
			if($num>0)
			{
				$pages.=',';
				$pagesjson.=',';
			}
			if($ext!="index")
			{
				$showpagetree=$pagetext.'<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">'.$pagename.'</span></div>'.$showpagetree.'</div>'.$pagetextfooter;
				//$sitemap.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
				//$sitemapjson.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
				$pages.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
				$pagesjson.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
			}
			else
			{
				$showpagetree=$pagetext.'<div id="infor">'.$showpagetree.'</div>'.$pagetextfooter;
				//$sitemap.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"image","display":"no"}';
				//$sitemapjson.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
				$pages.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"image","display":"no"}';
				$pagesjson.='"'.$ext.'":{"directory":"'.$ext.'","name":"'.$pagename.'","mapping":"text","display":"yes"}';
			}
			$num++;
			if(!file_exists($pagefilepath))
			{
				writeFile($pagefilepath,$showpagetree);
			}
		}
	}
	closedir($dh);
}
if($flagreg)
{
	$pagedir='';
	if($flagpayloan)
		$pagedir='custom/registration_el';
	else
		$pagedir='custom/registration';
	$newpagefilepath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/privat/privat.php';
	$regpagefilepath=$pagedir.'/privat.php';
	copyFile($regpagefilepath,$newpagefilepath);
	
	$regchangepath=$pagedir.'/_change.php';
	$newchangepath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/privat/_change.php';
	if(!file_exists($newchangepath))
	{
		copyFile($regchangepath,$newchangepath);
	}
	
	createDirectory($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/regform');
	$regformpath=$pagedir.'/regform.php';
	$newformpath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/regform/regform.php';
	
	//if(!file_exists($newformpath))
	//{
		copyFile($regformpath,$newformpath);
	//}
	
	$pages.=',"_change":{"directory":"privat","name":"Запрос на смену пароля","mapping":"text","display":"yes"}';
	$pagesjson.=',"_change":{"directory":"privat","name":"Запрос на смену пароля","mapping":"text","display":"yes"}';
	$pages.=',"regform":{"directory":"regform","name":"Регистрация","mapping":"text","display":"yes"}';
	$pagesjson.=',"regform":{"directory":"regform","name":"Регистрация","mapping":"text","display":"yes"}';
	
	if($flagpayloan)
	{
		$collectivepath=$pagedir.'/_collective.php';
		$newcollectivepath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/regform/_collective.php';
		if(!file_exists($newcollectivepath))
		{
			copyFile($collectivepath,$newcollectivepath);
		}
		$individualpath=$pagedir.'/_individual.php';
		$newindividualpath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/regform/_individual.php';
		if(!file_exists($newindividualpath))
		{
			copyFile($individualpath,$newindividualpath);
		}
		$promopath=$pagedir.'/_promo.php';
		$newpromopath=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/regform/_promo.php';
		if(!file_exists($newpromopath))
		{
			copyFile($promopath,$newpromopath);
		}
		$pages.=',"_collective":{"directory":"regform","name":"Регистрация коллективных пользователей","mapping":"text","display":"yes"}';
		$pagesjson.=',"_collective":{"directory":"regform","name":"Регистрация коллективных пользователей","mapping":"text","display":"yes"}';
		$pages.=',"_individual":{"directory":"regform","name":"Регистрация индивидуальных пользователей","mapping":"text","display":"yes"}';
		$pagesjson.=',"_individual":{"directory":"regform","name":"Регистрация индивидуальных пользователей","mapping":"text","display":"yes"}';
		$pages.=',"_promo":{"directory":"regform","name":"Регистрация с кодом","mapping":"text","display":"yes"}';
		$pagesjson.=',"_promo":{"directory":"regform","name":"Регистрация с кодом","mapping":"text","display":"yes"}';
	}
}

$pages.='};'."\n";
$pagesjson.='}';

$newsasmoduletpl='';
if($flagnewsasmodule)
{
	$namarr=$jsondb->newsasmodule;
	$namarrlen=count($namarr);
	$newsasmoduletpl.='<li><span id="'.$namarr[0]->id.'" onmousedown="switchSubSections(\''.$namarr[1]->id.'\','.$namarr[1]->ndb;
	if(isset($namarr[1]->label))
		$newsasmoduletpl.=',\''.$namarr[1]->label.'\'';
	$newsasmoduletpl.=')">'.$namarr[0]->title.'</span><ul>';
	for($i=1; $i<$namarrlen; $i++)
	{
		$newsasmoduletpl.='<li><span id="'.$namarr[$i]->id.'" onmousedown="switchSubSections(\''.$namarr[$i]->id.'\','.$namarr[$i]->ndb;
		if(isset($namarr[$i]->label))
			$newsasmoduletpl.=',\''.$namarr[$i]->label.'\'';
		$newsasmoduletpl.=')">'.$namarr[$i]->title.'</span></li>';
	}
	$newsasmoduletpl.='</ul></li>';
}

$blindbutton='';
$blindstr='';
$pathblindstr=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/blind_panel.html';
$pathblindbutton=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl/blind_button.html';
$pathblindcss=$jsonpath->dirhtdocs.'conf/custom/css/default/blind.css';

if($useblind)
{
	$blindjspath1=$jsonpath->dirhtdocs.'conf/custom/additional/blind/js';
	$blindjspath2=$jsonpath->dirhtdocs.'conf/custom/js/default';
	if(!is_file($blindjspath2.'/blind.js'))
		copyDirectory($blindjspath2,$blindjspath1);
	$blindcsspath1=$jsonpath->dirhtdocs.'conf/custom/additional/blind/css';
	$blindcsspath2=$jsonpath->dirhtdocs.'conf/custom/css/default';
	if(!is_file($blindcsspath2.'/blind.css'))
		copyDirectory($blindcsspath2,$blindcsspath1);
	$blindhtmlpath1=$jsonpath->dirhtdocs.'conf/custom/additional/blind/html';
	$blindhtmlpath2=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/tpl';
	if(!is_file($blindhtmlpath2.'/blind_panel.html'))
		copyDirectory($blindhtmlpath2,$blindhtmlpath1);
}
else
{
	if(is_file($pathblindstr))
	{
		@unlink($pathblindstr);
	}
	if(is_file($pathblindbutton))
	{
		@unlink($pathblindbutton);
	}
	if(is_file($pathblindcss))
	{
		@unlink($pathblindcss);
	}
	$blindstr='';
	$blindbutton='';
}

if(is_file($pathblindstr))
{
	$blindstr=file_get_contents($pathblindstr);
	$blindstr='<!-- из файла ../tpl/blind_panel.html -->'."\n".$blindstr."\n".'<!-- конец из файла ../tpl/blind_panel.html -->';
}

if(is_file($pathblindbutton))
{
	$blindbutton=file_get_contents($pathblindbutton);
	$blindbutton='<!-- из файла ../tpl/blind_button.html -->'."\n".$blindbutton."\n".'<!-- конец из файла ../tpl/blind_button.html -->';
}

$headermiddletpl1='</ul></div></div></div>';

//$strjs.=$sitemap;
if(!file_exists($pathjspages))
{
	writeFile($pathjspages,$pages);
}

if(!file_exists($pathjsmodules))
{
	writeFile($pathjsmodules,$modules);
}

writeFile($pathjs,$strjs);

if(!file_exists($pagespath))
{
	writeFile($pagespath,$pagesjson);
}

if(!file_exists($modulespath))
{
	writeFile($modulespath,$modulesjson);
}

$tmppagesstr=file_get_contents($pagespath);
$tmpmodulesstr=file_get_contents($modulespath);
$sitemapjson='{'.$tmpmodulesstr.','.$tmppagesstr.'}';

$sitemapfile=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/_conf/sitemap.conf';

//if(!file_exists($sitemapfile))
//{
	writeFile($sitemapfile,$sitemapjson);
//}
if($filtersdiv!='')
{
	if(!file_exists($pathfiltersdefault))
	{
		writeFile($pathfiltersdefault,$filtersdiv);
	}
}
if(!file_exists($pathbasestop))
{
	writeFile($pathbasestop,$basestoptpl);
}

if(!file_exists($pathbasesbottom))
{
	writeFile($pathbasesbottom,$basesbottomtpl);
}
if(!file_exists($pathheadertop))
{
	writeFile($pathheadertop,$headertoptpl);
}

if(!file_exists($pathheadermiddle))
{
	writeFile($pathheadermiddle,$headermiddletpl);
}

if($newsasmoduletpl != '')
{
	writeFile($pathnewsasmodule,$newsasmoduletpl);
}

if(!file_exists($pathheadermiddle1))
{
	writeFile($pathheadermiddle1,$headermiddletpl1);
}

if(!file_exists($pathheaderbottom))
{
	writeFile($pathheaderbottom,$searchdivbottomtpl);
}

if(isset($filtersarr[0]))
{
	for($z=0; $z<$biblcount; $z++)
	{
		if(isset($filtersarr[$z][1]))
		{
			writeFile($pathfilters,$filtersarr[$z][1]);
			$ffile=$jsonpath->dirhtdocs.''.$jsonpath->foldername.'/html/_includes/dbs_'.$filtersarr[$z][0].'filters.php';
			copyFile($pathfilters,$ffile);
		}
	}
}

$basestop=file_get_contents($pathbasestop);
$basesbottom=file_get_contents($pathbasesbottom);
$headertop=file_get_contents($pathheadertop);
$headermiddle=file_get_contents($pathheadermiddle);
$headermiddle1=file_get_contents($pathheadermiddle1);
$headerbottom=file_get_contents($pathheaderbottom);
$footer=file_get_contents($pathfooter);
$newsasmodule='';
if($flagnewsasmodule)
{
	if(is_file($pathnewsasmodule))
	{
		$newsasmodule=file_get_contents($pathnewsasmodule);
		$newsasmodule='<!-- из файла ../tpl/newsasmodule.html -->'."\n".$newsasmodule."\n".'<!-- конец из файла ../tpl/newsasmodule.html -->';
	}
}
else
{
	if(is_file($pathnewsasmodule))
	{
		@unlink($pathnewsasmodule);
	}
}

/*проверка авторизации*/
$username = '';
$password = '';
$testtmp = '';
$testtmp1 = '';
if(isset($_SERVER["PHP_AUTH_USER"]))
	$username = $_SERVER["PHP_AUTH_USER"];
if(isset($_SERVER["PHP_AUTH_PW"]))
	$password = $_SERVER["PHP_AUTH_PW"];

if(($username != '') && ($password != ''))
{
	$context = stream_context_create(array(
		'http' => array(
			'header'  => "Authorization: Basic " . base64_encode("$username:$password")."\r\n"
		)
	));
	$testtmp=file_get_contents('http://'.$hostname.'/'.$jsonpath->foldername.'/conf/default/php/compress_css.php', false, $context);
	$testtmp1=file_get_contents('http://'.$hostname.'/'.$jsonpath->foldername.'/conf/default/php/compress_js.php', false, $context);
}
else
{
	$testtmp=file_get_contents('http://'.$hostname.'/'.$jsonpath->foldername.'/conf/default/php/compress_css.php');
	$testtmp1=file_get_contents('http://'.$hostname.'/'.$jsonpath->foldername.'/conf/default/php/compress_js.php');
}
/**/

$searchdiv= <<<HTML
<?php

\$metatags='';
if(isset(\$theogtitle) && (\$theogtitle != ""))
{
	\$ogtitle=\$theogtitle;
	\$metatags.='<meta name="robots" content="all" />'."
";
}
if(isset(\$theogtype) && (\$theogtype != ""))
{
	\$ogtype=\$theogtype;
}
if(isset(\$theogdescription) && (\$theogdescription != ""))
{
	\$ogdesc=\$theogdescription;
}
if(isset(\$theogkeywords))
{
	\$ogkeywords=\$theogkeywords;
}
if(isset(\$theogimage))
{
	\$ogimage=\$theogimage;
}
if(\$ogimage == "")
	\$ogimage=THEOGIMAGE;

\$metatags.='<title>'.\$ogtitle.'</title>'."
".'<meta name="author" content="'.THEOGAUTHOR.'" />'."
";
if(\$ogdesc != "")
	\$metatags.='<meta name="Description" content="'.\$ogdesc.'" />'."
";
if(\$ogkeywords != "")
	\$metatags.='<meta name="keywords" content="'.\$ogkeywords.'" />'."
";
\$metatags.='<meta name="DC.Title" content="'.\$ogtitle.'" />'."
";
if(\$ogdesc != "")
	\$metatags.='<meta name="DC.Description" content="'.\$ogdesc.'" />'."
";
if(\$ogkeywords != "")
	\$metatags.='<meta name="DC.Subject" content="'.\$ogkeywords.'" />'."
";
\$metatags.='<meta name="DC.Identifier" content="'.\$ogurl.'" />'."
".'<meta name="DC.Creator" content="'.THEOGAUTHOR.'" />'."
".'<meta name="DC.Type" content="Text" />'."
".'<meta name="DC.Format" content="text/html" />'."
".'<meta property="og:site_name" content="'.THEOGTITLE.'" />'."
".'<meta property="og:title" content="'.\$ogtitle.'" />'."
".'<meta property="og:type" content="'.\$ogtype.'" />'."
";
if(\$ogdesc != "")
	\$metatags.='<meta property="og:description" content="'.\$ogdesc.'" />'."
";
\$metatags.='<meta property="og:url" content="'.\$ogurl.'" />'."
";
\$metatags.='<meta property="og:image" content="'.\$ogimage.'" />'."
";

echo \$metatags;

if (\$jsd = opendir(THEFULLJSPATH))
{
	while (false !== (\$jsfile = readdir(\$jsd)))
	{
		if ((\$jsfile != '.' && \$jsfile != '..')&&(is_file(THEFULLJSPATH.'/'.\$jsfile)))
		{
			echo '<script src="'.THEJSPATH.'/'.\$jsfile.'"></script>'."\n";
		}
	}
	closedir(\$jsd);
}
$bibliocss
if((isset(\$_POST['_auth']))||(\$flag45))
{
	echo '<script src="'.THEJSPATH.'/_additional/orderel.js"></script>'."\n";
}
if (\$cssd = opendir(THEFULLCSSPATH))
{
	while (false !== (\$cssfile = readdir(\$cssd)))
	{
		if ((\$cssfile != '.' && \$cssfile != '..')&&(is_file(THEFULLCSSPATH.'/'.\$cssfile)))
		{
			echo '<link href="'.THECSSPATH.'/'.\$cssfile.'" type="text/css" rel="stylesheet"/>'."\n";
		}
	}
	closedir(\$cssd);
}
?>
<!--[if lt IE 9]>
<link href="$css/_additional/add.css" type="text/css" rel="stylesheet">
<![endif]-->
</head><body <?php
if(\$bodyclass!="") echo 'class="'.\$bodyclass.'"';
 ?> onload="initd()">
<form id="main" onsubmit="return false">
<!-- шапка -->
$blindstr
<!-- из файла ../tpl/headertop.html -->
$headertop
<!-- конец из файла ../tpl/headertop.html -->
	<?php
		\$nspos=strpos(\$nsean, '*ютф*');
		\$pagescont='';
		\$logout='';
		\$titleaccount='Кабинет';
		if((\$nspos === false)&&(((\$utype=='object') && isset(\$ujson->userinfo->FU)) || (isset(\$_POST['_auth']))||(\$flag45)))
		{
			if(isset(\$fjson->accountsets))
				if(isset(\$fjson->accountsets->titleaccount))
					\$titleaccount=\$fjson->accountsets->titleaccount;
			if(defined('FLAG45'))
			{
				\$stoplogout=constant('FLAG45');
				if((isset(\$_POST['_login'])) && (\$_POST['_login'] == \$stoplogout))
				{
					\$GLOBALS['flag45']=1;
					\$logout='';
				}
				elseif(\$flag45)
				{
					\$logout='';
				}
				else
				{
					\$logout='<li><span class="exits" onmousedown="closeSession()">Выход</span></li>';
				}
			}
			\$pagescont.='<li><span id="privat" onmousedown="ordersSearch()">'.\$titleaccount.'</span></li>';
		}
		else
		{
			if(isset(\$smjson->pages->privat))
				\$pagescont.='<li><span id="privat" onmousedown="goToLocation(this.id)">Вход</span></li>';
			if(isset(\$smjson->pages->regform))
				\$pagescont.='<li class="reg"><span id="regform" onmousedown="goToLocation(this.id)">Регистрация</span></li>';
		}
		echo \$pagescont.''.\$logout;
	?>
<!-- из файла ../tpl/headermiddle.html -->
$headermiddle
<!-- конец из файла ../tpl/headermiddle.html -->
$newsasmodule
$blindbutton
<!-- из файла ../tpl/headermiddle1.html -->
$headermiddle1
<!-- конец из файла ../tpl/headermiddle1.html -->
<!-- конец шапка -->
<!-- далее не редактировать -->
$bibliotabs
<!-- из файла ../tpl/basestop.html -->
$basestop
<!-- конец из файла ../tpl/basestop.html -->
		<?php 
		if(isset(\$qjson))
		{
			\$qtype=gettype(\$qjson);
			if(\$qtype=='object')
			{
				\$biblcounter=0;
				\$basescounter=0;
				\$basescont='';
				\$basesdiv='';
				\$numdbbibl='';
				\$display=\$fjson->display;
				\$dbnumber='';
				\$dbtitle='';
				\$dbalways='';
				\$show='';
				\$allbases='';
				foreach (\$fjson as \$fkey => \$fvalue)
				{
					if(\$fkey=='dbs_all')
					{
						\$allbases.='<span class="simple"><input type="radio" name="base" value="all" id="iall"/><label for="iall" onmousedown="chooseBase(this)">'.\$fjson->\$fkey->alias.'</label></span>';
					}
					foreach (\$qjson as \$qkey => \$qvalue)
					{
						if(\$fkey==\$qkey)
						{
							if(!isset(\$qjson->\$qkey->masked))
							{
								\$qclass='simple';
								if(\$fjson->\$fkey->type=='AF')
								{
									if(\$fjson->\$fkey->dbindex=='fundholders')
										\$qclass='fundholders';
									else
										\$qclass='authority';
								}
								else
								{
									\$numdbbibl='var biblnumber="'.\$fjson->\$fkey->number.'"; ';
									\$qclass='simple';
									\$biblcounter++;
								}
								\$basescounter++;
								if(isset(\$fjson->\$fkey->display))
									\$show=' style="display:none"';
								else
									\$show='';
								if(\$basescounter==1)
								{
									\$dbnumber=\$fjson->\$fkey->number;
									\$dbtitle=\$fjson->\$fkey->alias;
									if(isset(\$fjson->\$fkey->always))
										\$dbalways=\$fjson->\$fkey->always;
								}
								if(((\$display=='select')&&(\$qclass != 'fundholders'))||((\$display=='select')&&(\$qclass == 'fundholders')&&(\$fjson->\$fkey->switch_in_base == 'in_base')))
								{
									if(\$basescounter==1)
									{
										if(\$allbases!='')
										{
											\$dbnumber='all';
											\$ftitl='dbs_all';
											\$dbtitle=\$fjson->\$ftitl->alias;
										}
										\$basescont.='<div class="basescontainer"><div class="opt2"><div class="select2"><img onmousedown="showOptions(this,\'bases_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" title="" class="labs" hspace="0" border="0" vspace="0"/><span class="i'.\$dbnumber.'" id="currdb" onmousedown="showOptions(this.previousSibling,\'bases_div\')">'.\$dbtitle.'</span></div></div></div>';
										if(\$allbases!='')
											\$allbases='';
										\$basesdiv.='<div id="'.\$fjson->\$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.\$dbnumber.'">'.\$dbtitle.'</div>';
									}
									else
									{
										\$basesdiv.='<div id="'.\$fjson->\$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.\$fjson->\$fkey->number.'">'.\$fjson->\$fkey->alias.'</div>';
									}
								}
								if(\$display=='radio')
								{
									if((\$qclass != 'fundholders') || ((\$qclass == 'fundholders') && (\$fjson->\$fkey->switch_in_base == 'in_base')))
									{
										\$basescont.='<span class="'.\$qclass.'"'.\$show.'><input type="radio" name="base" value="'.\$fjson->\$fkey->number.'" id="i'.\$fjson->\$fkey->dbindex.'"/><label for="i'.\$fjson->\$fkey->dbindex.'" onmousedown="chooseBase(this)">'.\$fjson->\$fkey->alias.'</label></span>';
									}
								}
							}
						}
					}
				}
				if(\$basescounter==1)
				{
					if(\$dbalways=='')
					{
						if(\$display!='none')
							\$basescont='<div class="single_base">'.\$dbtitle.'</div>';

						else
							\$basescont='<input name="base" id="currdb" value="'.\$dbnumber.'" type="hidden"/>';
						\$basesdiv='';
					}
				}
				else
				{
					if(\$display=='select')
					{
						\$basesdiv='<div style="display: none;" class="options2" id="bases_container">'.\$basesdiv.'</div>';
					}
				}
				if(\$biblcounter > 1)
				{
					\$numdbbibl='';
				}
				echo \$allbases.''.\$basescont.'<script> var biblcounter='.\$biblcounter.'; '.\$numdbbibl.'</script>'.\$basesdiv;
			}
		}
		?>
<!-- из файла ../tpl/basesbottom.html -->
		$basesbottom
<!-- конец из файла ../tpl/basesbottom.html -->
	<div class="searchdiv_outer">
		<div class="searchdiv_inner">
		<!-- попробовать перенести bases_div -->
			<div class="top">$swint</div>
			<div class="middle" id="middle">
			$ints
			$flimits
			</div>
<!-- конец далее не редактировать -->
<!-- из файла ../tpl/headerbottom.html -->
			$headerbottom
<!-- конец из файла ../tpl/headerbottom.html -->
		</div>
	</div>
	<div class="spacer"></div>
</div>


HTML;



	writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/includes/searchdiv.php',$searchdiv);
	
	$footerdiv= <<<HTML
<div class="spacer"></div></form>
$bibliodiv
<!-- подвал -->
$footer
<!-- конец подвал -->
<!-- далее не редактировать -->
<div id="voc_div" class="options3" style="display: none"><div onclick="PutLabValue(this)" class="iEXACT">Точная фраза</div><div onclick="PutLabValue(this)" class="iANY">Любое слово</div><div onclick="PutLabValue(this)" class="iEVERY">Все слова</div></div><div id="andor_div" class="options4" style="display: none"><div onclick="PutLabValue(this)" class="AND">И</div><div onclick="PutLabValue(this)" class="OR">ИЛИ</div></div>
<div id="logic_div" class="options1" style="display: none"><div onclick="PutLabValue(this)" class="iAND">И</div><div onclick="PutLabValue(this)" class="iOR">ИЛИ</div><div onclick="PutLabValue(this)" class="iNOT">НЕ</div></div>
$flabs
$flimitsopt
<div style="display:none" id="livesearch" class="livesearch"></div>


HTML;


	writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/html/pages/includes/footer.php',$footerdiv);
	
	$calljs='http://'.$hostname.$jsonpath->pathactrcp;
	
	$repoauthorpage=$jsonpath->repoauthorpage;
	$repobiblpage=$jsonpath->repobiblpage;
	$repopath='';
	if(($repoauthorpage!='')&&($repobiblpage!=''))
	{
		$repopath.="define('THEPATHARTICLES', '/$repobiblpage');\n";
		$repopath.="define('THEPATHAUTHORS', '/$repoauthorpage');\n";
	}
	
	$indexdiv = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$jsonpath->rcpmetacontenttype" />
<meta http-equiv="Content-Script-Type" content="$jsonpath->rcpmetacontentscripttype"/>
<link rel="shortcut icon" href="//$hostname/$jsonpath->foldername/favicon.ico" type="image/x-icon"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<?php 
\$portname='http';
if(getenv("HTTPS")!="")
	\$portname='https';
define('THEPORTNAME', \$portname);
define('THEHOSTNAME', '$hostname');
define('THEHISTORYPATH', '$rcpunloaddir');
define('THEHTMLPATH', '$rcphtmldir');
define('THEIMGPATH', '$img');
define('THEFULLJSPATH', '$thefulljspath');
define('THEJSPATH', '$js');
define('THEFULLCSSPATH', '$thefullcsspath');
define('THECSSPATH', '$css');
define('THEPAGESPATH', '$thepagespath');
define('THEMODULESPATH', '$themodulespath');
define('THEINCLUDESPATH', '$theincludespath');
define('THEFOLDERNAME', '$jsonpath->foldername');
define('THEPATHACTRCP', '$jsonpath->pathactrcp');
define('THEPATHFIND', '$jsonpath->pathfind');
define('THEPATHREG', '$jsonpath->pathreg');
define('THEPAGESEARCHPATH', '$jsonpath->pagesearchpath');
$repopath
define('THEOGTYPE', 'website');
define('THEOGTITLE', '$jsonpath->rcptitle');
define('THEOGDESC', '$jsonpath->rcpdescription');
define('THEOGKEYWORDS', '$jsonpath->rcpmetakeywords');
define('THEOGURL', '//$hostname/$jsonpath->foldername');
define('THEOGIMAGE', '//$hostname/$jsonpath->foldername/$jsonpath->foldername/img/logo_big.jpg');
define('THEOGAUTHOR', '$jsonpath->rcpauthor');
define('FLAG45', '$jsonpath->login045');

/*-- распечатка запроса
foreach (\$_POST as \$a => \$v)
{
	echo '"'.\$a.'"="'.\$v.'"'."\n";
}
//error_reporting(0);
//echo getenv("HTTP_HOST");
 --*/

function makeJson(\$str)
{
	\$from = array("\\\", "[%]", "[amp]", "\\'", "\\t");
	\$to = array("\\\\\\\", "%", "&", "\\\\\'", "&#09;");
	\$newstr = str_replace(\$from, \$to, \$str);
	return json_decode(\$newstr);
}

\$flag45=0;
\$skin="blue";
\$iddb="";
\$lind="";
\$codemenu="";
\$ltitle="";
\$laddress="";
\$sigla="";
\$site="";
\$elcat="";
\$particle="";
\$datascript='';
\$bodyclass='';
\$ogtype=THEOGTYPE;
\$ogtitle=THEOGTITLE;
\$ogdesc=THEOGDESC;
\$ogkeywords=THEOGKEYWORDS;
\$ogurl=THEOGURL;
\$ogimage=THEOGIMAGE;

if((isset(\$_POST["p"]))||(isset(\$_POST["m"])))
{
	if(isset(\$_POST["p"]))
	{
		\$bodyclass='sheet_'.\$_POST["p"];
	}
	if(isset(\$_POST["m"]))
	{
		\$bodyclass='sheet_'.\$_POST["m"];
	}
	\$bodyclass=str_replace("/", "_",\$bodyclass);
	\$bodyclass=str_replace(".", "_",\$bodyclass);
	\$datascript.='var _sheet="'.\$bodyclass.'";'."
";
}

if(isset(\$_POST['_searchtitle']))
{
	\$ogtitle.=\$_POST['_searchtitle'];
	\$ogdesc.=\$_POST['_searchtitle'];
}
else
{
	\$ogtitle=THEOGTITLE;
	\$ogdesc=THEOGDESC;
}

if(isset(\$_POST['_searchurl']))
{
	\$ogurl.=\$_POST['_searchurl'];
}
else
{
	\$ogurl=THEOGURL;
}

if(isset(\$_POST['_searchimg']))
{
	\$ogimage.=\$_POST['_searchimg'];
}
else
{
	\$ogimage=THEOGIMAGE;
}

if(isset(\$_POST['_bodyclass']))
{
	if(\$bodyclass != "")
		\$bodyclass.=' '.\$_POST['_bodyclass'];
	else
		\$bodyclass.=\$_POST['_bodyclass'];
}

if(isset(\$_POST['_flag45']))
{
	\$flag45=1;
	\$datascript.='var _flag45="yes";'."
";
}
if(isset(\$_POST['_iddb']))
{
	\$datascript.='var _iddb="'.\$_POST['_iddb'].'";'."
";
}
if(isset(\$_POST['_str']))
{
	\$datascript.='var _str="'.\$_POST['_str'].'";'."
";
}
if(isset(\$_POST['_showstr']))
{
	\$datascript.='var _showstr="'.\$_POST['_showstr'].'";'."
";
}
if(isset(\$_POST['_showsearchrez']))
{
	\$datascript.='var _showsearchrez="'.\$_POST['_showsearchrez'].'";'."
";
}
if(isset(\$_POST['_localiddb']))
{
	\$iddb=\$_POST['_localiddb'];
	\$particle="lib_";
	\$datascript.='var _localiddb="'.\$_POST['_localiddb'].'";'."
";
}
if(isset(\$_POST['_skin']))
{
	if(\$_POST['_skin']!="")
		\$skin=\$_POST['_skin'];
	\$datascript.='var _skin="'.\$skin.'";'."
";
}
if(isset(\$_POST['_ltitle']))
{
	\$ltitle=\$_POST['_ltitle'];
	\$datascript.='var _ltitle="'.\$ltitle.'";'."
";
}
if(isset(\$_POST['_lind']))
{
	\$lind=\$_POST['_lind'];
	\$datascript.='var _lind="'.\$lind.'";'."
";
}
if(isset(\$_POST['_codemenu']))
{
	\$codemenu=\$_POST['_codemenu'];
	\$datascript.='var _codemenu="'.\$codemenu.'";'."
";
}
if(isset(\$_POST['_laddress']))
{
	\$laddress=\$_POST['_laddress'];
	\$datascript.='var _laddress="'.\$laddress.'";'."
";
}
if(isset(\$_POST['_sigla']))
{
	\$sigla=\$_POST['_sigla'];
	\$datascript.='var _sigla="'.\$sigla.'";'."
";
}
if(isset(\$_POST['_site']))
{
	\$site=\$_POST['_site'];
	\$datascript.='var _site="'.\$site.'";'."
";
}
if(isset(\$_POST['_elcat']))
{
	\$elcat=\$_POST['_elcat'];
	\$datascript.='var _elcat="'.\$elcat.'";'."
";
}
if(isset(\$_POST['_addfilters']))
{
	\$datascript.='var _addfilters="'.\$_POST['_addfilters'].'";'."
";
}
if(isset(\$_POST['_linkstring']))
{
	\$datascript.='var _linkstring="'.\$_POST['_linkstring'].'";'."
";
}
if(isset(\$_POST['_typereg']))
{
	\$datascript.='var _typereg="'.\$_POST['_typereg'].'";'."
";
}
if(isset(\$_POST['_cataloguer']))
{
	\$particle="cataloguer_";
	\$datascript.='var _cataloguer="'.\$_POST['_cataloguer'].'";'."
";
}
if(isset(\$_POST['_typework']))
{
	\$datascript.='var _typework="'.\$_POST['_typework'].'";'."
";
}
if(isset(\$_POST['_basequant']))
{
	\$datascript.='var _basequant="'.\$_POST['_basequant'].'";'."
";
}
if(isset(\$_POST['_rubricator']))
{
	\$datascript.='var _rubricator="'.\$_POST['_rubricator'].'";'."
";
}
if(\$datascript!="")
{
	\$datascript="
".'<script>'."
".\$datascript.'</script>'."
";
}
\$qstr=getenv("QUERY_STRING");
if(!isset(\$_POST['p']))
{
	if(!isset(\$_POST['m']))
	{
		if(!isset(\$_GET['_overcharge']))
		{
			\$page = THEPAGESPATH.'/index/index.php';
		}
		else
		{
			\$page = THEPAGESPATH.'/privat/_overcharge.php';
			\$datascript.='<script>var overcharge="'.\$_GET['_overcharge'].'";</script>'."
";
			\$qstr='';
		}
	}
	else
	{
		\$page = THEMODULESPATH.'/'.\$_POST['m'];
		if(strpos(\$_POST['m'], 'cataloguer')!==false)
		{
			\$particle="cataloguer_";
		}
	}
}
else
{
	\$page = THEPAGESPATH.'/'.\$_POST['p'].'.php';
}
\$fgs="";
if(isset(\$_POST['_numsean']))
{
	\$qstr=\$_POST['_numsean'];
	if(file_exists(THEHISTORYPATH.'/'.\$qstr.'/enter.js'))
	{
		\$fgs='<script src="/'.THEHTMLPATH.'/'.\$qstr.'/enter.js"></script>';
	}
}
if(isset(\$_POST['_logintype']))
{
	\$qstr.='&_logintype='.\$_POST['_logintype'];
}
if(isset(\$_POST['_login']))
{
	\$qstr.='&_login='.\$_POST['_login'];
}
if(isset(\$_POST['_password']))
{
	\$qstr.='&_password='.\$_POST['_password'];
}
if(isset(\$_POST['_auth']))
{
	\$qstr.='&_auth='.\$_POST['_auth'];
}
if(isset(\$_POST['_userinfo']))
{
	\$qstr.='&_userinfo='.\$_POST['_userinfo'];
}
if(isset(\$_POST['_code']))
{
	\$qstr.='&_code='.\$_POST['_code'];
}
if(isset(\$_POST['_fields']))
{
	\$qstr.='&_fields='.\$_POST['_fields'];
}
if(isset(\$_POST['_oldsean']))
{
	\$qstr.='&_oldsean='.\$_POST['_oldsean'];	
}

if(\$fgs=="")
{
	\$fgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.\$qstr);
}

\$fpath=THEFOLDERNAME.'/_conf/db.conf';
\$frezult = file_get_contents(\$fpath);
\$fjson=json_decode(\$frezult);

\$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
\$smrezult = file_get_contents(\$smpath);
\$smjson=json_decode(\$smrezult);

\$qarr=explode('/', \$fgs);
\$qlen = count(\$qarr);
\$nsean=\$qarr[\$qlen-3];
\$qpath=THEHISTORYPATH.'/'.\$nsean.'/db.conf';
\$qrezult='';
\$qjson='';
if(file_exists(\$qpath))
{
	\$qrezult = file_get_contents(\$qpath);
	\$qjson=json_decode(\$qrezult); 
}
if(isset(\$qjson->flag45))
{
	\$flag45=1;
}
\$ujson='';
if(isset(\$_POST['_auth']))
{
	\$upath=THEHISTORYPATH.'/'.\$nsean.'/user.conf';
	if(file_exists(\$upath))
	{
		\$urezult=file_get_contents(\$upath);
		\$ujson=makeJson('{'.\$urezult.'}'); 
	}
}
echo \$fgs;
echo \$datascript;
include (\$page);


?>
</body>
</html>
	

HTML;


	
	$pagesearchdiv = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$jsonpath->rcpmetacontenttype" />
<meta http-equiv="Content-Script-Type" content="$jsonpath->rcpmetacontentscripttype"/>
<link rel="shortcut icon" href="//$hostname/$jsonpath->foldername/favicon.ico" type="image/x-icon"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<?php 
\$portname='http';
if(getenv("HTTPS")!="")
	\$portname='https';
define('THEPORTNAME', \$portname);
define('THEHOSTNAME', '$hostname');
define('THEHISTORYPATH', '$rcpunloaddir');
define('THEHTMLPATH', '$rcphtmldir');
define('THEIMGPATH', '$img');
define('THEFULLJSPATH', '$thefulljspath');
define('THEJSPATH', '$js');
define('THEFULLCSSPATH', '$thefullcsspath');
define('THECSSPATH', '$css');
define('THEPAGESPATH', '$thepagespath');
define('THEMODULESPATH', '$themodulespath');
define('THEINCLUDESPATH', '$theincludespath');
define('THEFOLDERNAME', '$jsonpath->foldername');
define('THEPATHACTRCP', '$jsonpath->pathactrcp');
define('THEPATHFIND', '$jsonpath->pathfind');
define('THEPATHREG', '$jsonpath->pathreg');
define('THEPAGESEARCHPATH', '$jsonpath->pagesearchpath');
$repopath
define('THEOGTYPE', 'website');
define('THEOGTITLE', '$jsonpath->rcptitle');
define('THEOGDESC', '$jsonpath->rcpdescription');
define('THEOGKEYWORDS', '$jsonpath->rcpmetakeywords');
define('THEOGURL', '//$hostname/$jsonpath->foldername');
define('THEOGIMAGE', '//$hostname/$jsonpath->foldername/$jsonpath->foldername/img/logo_big.jpg');
define('THEOGAUTHOR', '$jsonpath->rcpauthor');
define('FLAG45', '$jsonpath->login045');

function makeJson(\$str)
{
	\$from = array("\\\", "[%]", "[amp]", "\\'", "\\t");
	\$to = array("\\\\\\\", "%", "&", "\\\\\'", "&#09;");
	\$newstr = str_replace(\$from, \$to, \$str);
	return json_decode(\$newstr);
}

\$flag45=0;
\$flgs="";
\$qustr="";
if(isset(\$_COOKIE['numsean']))
{
	\$qustr=\$_COOKIE['numsean'];
	if(file_exists(THEHISTORYPATH.'/'.\$qustr.'/enter.js'))
	{
		\$flgs='<script src="/'.THEHTMLPATH.'/'.\$qustr.'/enter.js"></script>';
	}
}
if(\$flgs=="")
{
	\$flgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.\$qustr);
}

\$fpath=THEFOLDERNAME.'/_conf/db.conf';
\$frezult = file_get_contents(\$fpath);
\$fjson=json_decode(\$frezult);

\$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
\$smrezult = file_get_contents(\$smpath);
\$smjson=json_decode(\$smrezult);

\$qarr=explode('/', \$flgs);
\$qlen = count(\$qarr);
\$nsean=\$qarr[\$qlen-3];
\$qpath=THEHISTORYPATH.'/'.\$nsean.'/db.conf';
\$qrezult='';
\$qjson='';
if(file_exists(\$qpath))
{
	\$qrezult = file_get_contents(\$qpath);
	\$qjson=json_decode(\$qrezult); 
}
if(isset(\$qjson->flag45))
{
	\$flag45=1;
}
\$ujson='';
\$upath=THEHISTORYPATH.'/'.\$nsean.'/user.conf';
if(file_exists(\$upath))
{
	\$urezult=file_get_contents(\$upath);
	\$ujson=makeJson('{'.\$urezult.'}'); 
}

\$seo_uri='//'.THEHOSTNAME.''.\$_SERVER['REQUEST_URI'];
\$url=parse_url(\$_SERVER['REQUEST_URI'], PHP_URL_PATH);
\$segments = explode('/', trim(\$url, '/'));
\$seglength=count(\$segments);

\$seo_record_section=\$segments[0];
\$seo_record_id="";
\$seo_record_iddb="";
\$page="";

if(\$seglength == 2)
{
	if(isset(\$smjson->pages->\$segments[1]))
	{
		\$pagedir=\$smjson->pages->\$segments[1];
		\$page = THEPAGESPATH.'/'.\$pagedir->directory.'/'.\$segments[1].'.php';
	}
	else
	{
		\$seo_record_id=\$segments[1];
		\$page = THEMODULESPATH.'/search/_additional/seo_records.php';
	}
}
elseif(\$seglength == 3)
{
	\$seo_record_iddb=\$segments[1];
	\$seo_record_id=\$segments[2];
	\$page = THEMODULESPATH.'/search/_additional/seo_records.php';
}
else
	\$page = THEPAGESPATH.'/index/index.php';

\$bodyclass='sheet_'.\$segments[0].'/'.\$segments[1];
\$bodyclass=str_replace("/", "_",\$bodyclass);
\$bodyclass=str_replace(".", "_",\$bodyclass);
\$datascript='<script>var _sheet="'.\$bodyclass.'";</script>'."
";

\$ogurl=\$seo_uri;
\$ogtype=THEOGTYPE;
\$ogtitle=THEOGTITLE;
\$ogdesc=THEOGDESC;
\$ogkeywords=THEOGKEYWORDS;
\$ogimage=THEOGIMAGE;

echo \$flgs;
echo \$datascript;
include (\$page);

?>
</body>
</html>
	

HTML;



$repobibldiv='';
if(($repoauthorpage!='')&&($repobiblpage!=''))
{
		$repobibldiv = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$jsonpath->rcpmetacontenttype" />
<meta http-equiv="Content-Script-Type" content="$jsonpath->rcpmetacontentscripttype"/>
<link rel="shortcut icon" href="//$hostname/$jsonpath->foldername/favicon.ico" type="image/x-icon"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<?php 
\$portname='http';
if(getenv("HTTPS")!="")
	\$portname='https';
define('THEPORTNAME', \$portname);
define('THEHOSTNAME', '$hostname');
define('THEHISTORYPATH', '$rcpunloaddir');
define('THEHTMLPATH', '$rcphtmldir');
define('THEIMGPATH', '$img');
define('THEFULLJSPATH', '$thefulljspath');
define('THEJSPATH', '$js');
define('THEFULLCSSPATH', '$thefullcsspath');
define('THECSSPATH', '$css');
define('THEPAGESPATH', '$thepagespath');
define('THEMODULESPATH', '$themodulespath');
define('THEINCLUDESPATH', '$theincludespath');
define('THEFOLDERNAME', '$jsonpath->foldername');
define('THEPATHACTRCP', '$jsonpath->pathactrcp');
define('THEPATHFIND', '$jsonpath->pathfind');
define('THEPATHREG', '$jsonpath->pathreg');
define('THEPAGESEARCHPATH', '$jsonpath->pagesearchpath');
$repopath
define('THEOGTYPE', 'website');
define('THEOGTITLE', '$jsonpath->rcptitle');
define('THEOGDESC', '$jsonpath->rcpdescription');
define('THEOGKEYWORDS', '$jsonpath->rcpmetakeywords');
define('THEOGURL', '//$hostname/$jsonpath->foldername');
define('THEOGIMAGE', '//$hostname/$jsonpath->foldername/$jsonpath->foldername/img/logo_big.jpg');
define('THEOGAUTHOR', '$jsonpath->rcpauthor');
define('FLAG45', '$jsonpath->login045');

\$flag45=0;
\$flgs="";
\$qustr="";
if(isset(\$_COOKIE['numsean']))
{
	\$qustr=\$_COOKIE['numsean'];
	if(file_exists(THEHISTORYPATH.'/'.\$qustr.'/enter.js'))
	{
		\$flgs='<script src="/'.THEHTMLPATH.'/'.\$qustr.'/enter.js"></script>';
	}
}
if(\$flgs=="")
{
	\$flgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.\$qustr);
}

\$fpath=THEFOLDERNAME.'/_conf/db.conf';
\$frezult = file_get_contents(\$fpath);
\$fjson=json_decode(\$frezult);

\$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
\$smrezult = file_get_contents(\$smpath);
\$smjson=json_decode(\$smrezult);

\$qarr=explode('/', \$flgs);
\$qlen = count(\$qarr);
\$nsean=\$qarr[\$qlen-3];
\$qpath=THEHISTORYPATH.'/'.\$nsean.'/db.conf';
\$qrezult='';
\$qjson='';
if(file_exists(\$qpath))
{
	\$qrezult = file_get_contents(\$qpath);
	\$qjson=json_decode(\$qrezult); 
}
if(isset(\$qjson->flag45))
{
	\$flag45=1;
}

\$seo_uri='//'.THEHOSTNAME.''.\$_SERVER['REQUEST_URI'];
\$url=parse_url(\$_SERVER['REQUEST_URI'], PHP_URL_PATH);
\$segments = explode('/', trim(\$url, '/'));
\$seglength=count(\$segments);

\$seo_record_section=\$segments[0];
\$seo_record_id="";
\$seo_record_iddb="";
\$page = THEMODULESPATH.'/search/_additional/seo_records.php';

if(\$seglength == 2)
{
	\$seo_record_id=\$segments[1];
}
elseif(\$seglength == 3)
{
	\$seo_record_iddb=\$segments[1];
	\$seo_record_id=\$segments[2];
}
else
	\$page = THEPAGESPATH.'/index/index.php';

\$bodyclass='sheet_'.\$segments[0].'/'.\$segments[1];
\$bodyclass=str_replace("/", "_",\$bodyclass);
\$bodyclass=str_replace(".", "_",\$bodyclass);
\$datascript='<script>var _sheet="'.\$bodyclass.'";</script>'."
";

\$ogurl=\$seo_uri;
\$ogtype=THEOGTYPE;
\$ogtitle=THEOGTITLE;
\$ogdesc=THEOGDESC;
\$ogkeywords=THEOGKEYWORDS;
\$ogimage=THEOGIMAGE;

echo \$flgs;
echo \$datascript;
include (\$page);

?>
</body>
</html>
	

HTML;


}


$repoauthordiv='';
if(($repoauthorpage!='')&&($repobiblpage!=''))
{
		$repoauthordiv = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=$jsonpath->rcpmetacontenttype" />
<meta http-equiv="Content-Script-Type" content="$jsonpath->rcpmetacontentscripttype"/>
<link rel="shortcut icon" href="//$hostname/$jsonpath->foldername/favicon.ico" type="image/x-icon"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<?php 
\$portname='http';
if(getenv("HTTPS")!="")
	\$portname='https';
define('THEPORTNAME', \$portname);
define('THEHOSTNAME', '$hostname');
define('THEHISTORYPATH', '$rcpunloaddir');
define('THEHTMLPATH', '$rcphtmldir');
define('THEIMGPATH', '$img');
define('THEFULLJSPATH', '$thefulljspath');
define('THEJSPATH', '$js');
define('THEFULLCSSPATH', '$thefullcsspath');
define('THECSSPATH', '$css');
define('THEPAGESPATH', '$thepagespath');
define('THEMODULESPATH', '$themodulespath');
define('THEINCLUDESPATH', '$theincludespath');
define('THEFOLDERNAME', '$jsonpath->foldername');
define('THEPATHACTRCP', '$jsonpath->pathactrcp');
define('THEPATHFIND', '$jsonpath->pathfind');
define('THEPATHREG', '$jsonpath->pathreg');
define('THEPAGESEARCHPATH', '$jsonpath->pagesearchpath');
$repopath
define('THEOGTYPE', 'website');
define('THEOGTITLE', '$jsonpath->rcptitle');
define('THEOGDESC', '$jsonpath->rcpdescription');
define('THEOGKEYWORDS', '$jsonpath->rcpmetakeywords');
define('THEOGURL', '//$hostname/$jsonpath->foldername');
define('THEOGIMAGE', '//$hostname/$jsonpath->foldername/$jsonpath->foldername/img/logo_big.jpg');
define('THEOGAUTHOR', '$jsonpath->rcpauthor');
define('FLAG45', '$jsonpath->login045');

\$flag45=0;
\$flgs="";
\$qustr="";
if(isset(\$_COOKIE['numsean']))
{
	\$qustr=\$_COOKIE['numsean'];
	if(file_exists(THEHISTORYPATH.'/'.\$qustr.'/enter.js'))
	{
		\$flgs='<script src="/'.THEHTMLPATH.'/'.\$qustr.'/enter.js"></script>';
	}
}
if(\$flgs=="")
{
	\$flgs=file_get_contents(THEPORTNAME.'://'.THEHOSTNAME.''.THEPATHACTRCP.'?_action=penter&_errorhtml=error2&_numsean='.\$qustr);
}

\$fpath=THEFOLDERNAME.'/_conf/db.conf';
\$frezult = file_get_contents(\$fpath);
\$fjson=json_decode(\$frezult);

\$smpath=THEFOLDERNAME.'/_conf/sitemap.conf';
\$smrezult = file_get_contents(\$smpath);
\$smjson=json_decode(\$smrezult);

\$qarr=explode('/', \$flgs);
\$qlen = count(\$qarr);
\$nsean=\$qarr[\$qlen-3];
\$qpath=THEHISTORYPATH.'/'.\$nsean.'/db.conf';
\$qrezult='';
\$qjson='';
if(file_exists(\$qpath))
{
	\$qrezult = file_get_contents(\$qpath);
	\$qjson=json_decode(\$qrezult); 
}
if(isset(\$qjson->flag45))
{
	\$flag45=1;
}

\$seo_uri='//'.THEHOSTNAME.''.\$_SERVER['REQUEST_URI'];
\$url=parse_url(\$_SERVER['REQUEST_URI'], PHP_URL_PATH);
\$segments = explode('/', trim(\$url, '/'));
\$seglength=count(\$segments);

\$seo_record_section=\$segments[0];
\$seo_record_id="";
\$seo_record_iddb="";
\$page = THEMODULESPATH.'/search/_additional/seo_authors.php';

if(\$seglength == 2)
{
	\$seo_record_id=\$segments[1];
}
elseif(\$seglength == 3)
{
	\$seo_record_iddb=\$segments[1];
	\$seo_record_id=\$segments[2];
}
else
	\$page = THEPAGESPATH.'/index/index.php';

\$bodyclass='sheet_'.\$segments[0].'/'.\$segments[1];
\$bodyclass=str_replace("/", "_",\$bodyclass);
\$bodyclass=str_replace(".", "_",\$bodyclass);
\$datascript='<script>var _sheet="'.\$bodyclass.'";</script>'."
";

\$ogurl=\$seo_uri;
\$ogtype=THEOGTYPE;
\$ogtitle=THEOGTITLE;
\$ogdesc=THEOGDESC;
\$ogkeywords=THEOGKEYWORDS;
\$ogimage=THEOGIMAGE;

echo \$flgs;
echo \$datascript;
include (\$page);

?>
</body>
</html>
	

HTML;


}

	writeFile($jsonpath->dirhtdocs.'/index.php',$indexdiv);
	
	writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->pagesearchpath.'.php',$pagesearchdiv);

	if($repobibldiv != '')
	{
		writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->repobiblpage.'.php',$repobibldiv);
	}
	if($repoauthordiv != '')
	{
		writeFile($jsonpath->dirhtdocs.'/'.$jsonpath->repoauthorpage.'.php',$repoauthordiv);
	}

	
	$jdir=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/js';
	$cjdir='custom/js';

	foreach(glob($jdir.'/default_*.js') as $file)
	{
		@unlink($file);
	}

	copyDirectory($jdir,$cjdir);
			
	$cdir=$jsonpath->dirhtdocs.'/'.$jsonpath->foldername.'/css';
	$ccdir='custom/css';

	foreach(glob($cdir.'/default_*.css') as $file)
	{
		@unlink($file);
	}

	copyDirectory($cdir,$ccdir);
	
	echo '</head><body><h1>Настройка проекта</h1><form id="frm" method="POST"><div><p style="text-align:center"><a target="_blank" href="http://'.$hostname.'/'.$jsonpath->foldername.'" style="color:#069">Посмотреть сайт</a></p><br/><p style="text-align:center"><input type="submit" class="button" value="Изменить"/></p></div></form>';

 ?>