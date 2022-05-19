<?php

$metatags='';
if(isset($theogtitle) && ($theogtitle != ""))
{
	$ogtitle=$theogtitle;
	$metatags.='<meta name="robots" content="all" />'."
";
}
if(isset($theogtype) && ($theogtype != ""))
{
	$ogtype=$theogtype;
}
if(isset($theogdescription) && ($theogdescription != ""))
{
	$ogdesc=$theogdescription;
}
if(isset($theogkeywords))
{
	$ogkeywords=$theogkeywords;
}
if(isset($theogimage))
{
	$ogimage=$theogimage;
}
if($ogimage == "")
	$ogimage=THEOGIMAGE;

$metatags.='<title>'.$ogtitle.'</title>'."
".'<meta name="author" content="'.THEOGAUTHOR.'" />'."
";
if($ogdesc != "")
	$metatags.='<meta name="Description" content="'.$ogdesc.'" />'."
";
if($ogkeywords != "")
	$metatags.='<meta name="keywords" content="'.$ogkeywords.'" />'."
";
$metatags.='<meta name="DC.Title" content="'.$ogtitle.'" />'."
";
if($ogdesc != "")
	$metatags.='<meta name="DC.Description" content="'.$ogdesc.'" />'."
";
if($ogkeywords != "")
	$metatags.='<meta name="DC.Subject" content="'.$ogkeywords.'" />'."
";
$metatags.='<meta name="DC.Identifier" content="'.$ogurl.'" />'."
".'<meta name="DC.Creator" content="'.THEOGAUTHOR.'" />'."
".'<meta name="DC.Type" content="Text" />'."
".'<meta name="DC.Format" content="text/html" />'."
".'<meta property="og:site_name" content="'.THEOGTITLE.'" />'."
".'<meta property="og:title" content="'.$ogtitle.'" />'."
".'<meta property="og:type" content="'.$ogtype.'" />'."
";
if($ogdesc != "")
	$metatags.='<meta property="og:description" content="'.$ogdesc.'" />'."
";
$metatags.='<meta property="og:url" content="'.$ogurl.'" />'."
";
$metatags.='<meta property="og:image" content="'.$ogimage.'" />'."
";

echo $metatags;

if ($jsd = opendir(THEFULLJSPATH))
{
	while (false !== ($jsfile = readdir($jsd)))
	{
		if (($jsfile != '.' && $jsfile != '..')&&(is_file(THEFULLJSPATH.'/'.$jsfile)))
		{
			echo '<script src="'.THEJSPATH.'/'.$jsfile.'"></script>'."
";
		}
	}
	closedir($jsd);
}
echo '<link href="//api.bibliosearch.ru/bs.min.css" type="text/css" rel="stylesheet"/>
			<link href="/wlib/wlib/css/_additional/biblio.css" type="text/css" rel="stylesheet"/>';
if((isset($_POST['_auth']))||($flag45))
{
	echo '<script src="'.THEJSPATH.'/_additional/orderel.js"></script>'."
";
}
if ($cssd = opendir(THEFULLCSSPATH))
{
	while (false !== ($cssfile = readdir($cssd)))
	{
		if (($cssfile != '.' && $cssfile != '..')&&(is_file(THEFULLCSSPATH.'/'.$cssfile)))
		{
			echo '<link href="'.THECSSPATH.'/'.$cssfile.'" type="text/css" rel="stylesheet"/>'."
";
		}
	}
	closedir($cssd);
}
?>
<!--[if lt IE 9]>
<link href="/test4/test4/css/_additional/add.css" type="text/css" rel="stylesheet">
<![endif]-->
</head><body <?php
if($bodyclass!="") echo 'class="'.$bodyclass.'"';
 ?> onload="initd()">
<form id="main" onsubmit="return false">
<!-- шапка -->
<!-- из файла ../tpl/blind_panel.html -->
	<div id="blind_panel" class="blind_hide">
		<div class="base_sets">
			<div>
				<div>
					<div>Размер шрифта</div>
					<div id="blind_letter_size">
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_size" id="letter_size0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_size" id="letter_size1" value="1"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_size" id="letter_size2" value="2"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_size" id="letter_size3" value="3"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_size" id="letter_size4" value="4"/>
						<label class="letter_size_0" for="letter_size0">A</label>
						<label class="letter_size_1" for="letter_size1">A</label>
						<label class="letter_size_2" for="letter_size2">A</label>
						<label class="letter_size_3" for="letter_size3">A</label>
						<label class="letter_size_4" for="letter_size4">A</label>
					</div>
				</div>
				<div>
					<div>Цветовая схема</div>
					<div id="blind_theme">
						<input onclick="switchToBlindVersion(this)" type="radio" name="color_theme" id="color_theme0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="color_theme" id="color_theme1" value="1"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="color_theme" id="color_theme2" value="2"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="color_theme" id="color_theme3" value="3"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="color_theme" id="color_theme4" value="4"/>
						<label class="color_theme_0" for="color_theme0">ц</label>
						<label class="color_theme_1" for="color_theme1">ц</label>
						<label class="color_theme_2" for="color_theme2">ц</label>
						<label class="color_theme_3" for="color_theme3">ц</label>
						<label class="color_theme_4" for="color_theme4">ц</label>
					</div>
				</div>
				<div>
					<div>Изображения</div>
					<div id="blind_picture">
						<input onclick="switchToBlindVersion(this)" type="radio" name="pict" id="pict0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="pict" id="pict1" value="1"/>
						<label class="pict_0" for="pict0">вкл.</label>
						<label class="pict_1" for="pict1">выкл.</label>
					</div>
				</div>
			</div>
			<div>
				<div>
					<div>Форма</div>
					<div id="blind_letter_form">
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_form" id="letter_form0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_form" id="letter_form1" value="1"/>
						<label class="letter_form_0" for="letter_form0">с засечками</label>
						<label class="letter_form_1" for="letter_form1">без засечек</label>
					</div>
				</div>
				<div>
					<div>Межсимвольный интервал</div>
					<div id="blind_letter_space">
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_space" id="letter_space0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_space" id="letter_space1" value="1"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="letter_space" id="letter_space2" value="2"/>
						<label class="letter_space_0" for="letter_space0">стандартный</label>
						<label class="letter_space_1" for="letter_space1">средний</label>
						<label class="letter_space_2" for="letter_space2">большой</label>
					</div>
				</div>
				<div>
					<div>Межстрочный интервал</div>
					<div id="blind_string_space">
						<input onclick="switchToBlindVersion(this)" type="radio" name="string_space" id="string_space0" value="0"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="string_space" id="string_space1" value="1"/>
						<input onclick="switchToBlindVersion(this)" type="radio" name="string_space" id="string_space2" value="2"/>
						<label class="string_space_0" for="string_space0">одинарный</label>
						<label class="string_space_1" for="string_space1">полуторный</label>
						<label class="string_space_2" for="string_space2">двойной</label>
					</div>
				</div>
			</div>
			<div id="blind_controls">
				<div>
					<div>
						<span class="button" id="standart_set" onclick="toStandartSettings(this)" data-value="blind_panel letter_size_0 color_theme_0 pict_0">стандартные настройки</span>
					</div>
				</div>
				<div>
					<div>
						<span class="button" onclick="toNormalVersion()" id="normal_vers">обычная версия сайта</span>
					</div>
				</div>
				<div>
					<div>
						<span class="button" onclick="openBlindPanel()" id="close_panel">закрыть</span>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- конец из файла ../tpl/blind_panel.html -->
<!-- из файла ../tpl/headertop.html -->
<div id="header">
    <!--
<div>
	<div class="cross" id="menu_button" onclick="showHideM('top_info', 'menu_button')">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div id="index__" class="s" onclick="goToLocation(this.id)">ЭБА</div>
	<div class="top_logo">
		<div id="index" class="index" onclick="goToLocation(this.id)">
			<div class="inner">
				<div class="n">Электронный абонемент</div>
				<div class="z">Поиск и заказ доступа к ресурсам библиотеки</div>	
			</div>
		</div>
	</div>
-->
    <div class="block" id="top_info">
        <?php
		$utype='';
		if(isset($ujson))
			$utype=gettype($ujson);

		if((($utype=='object') && isset($ujson->userinfo->FU) && ($ujson->userinfo->FU != "") && ($ujson->userinfo->FU != "N/A")) && (!$flag45))
		{
			if(isset($fjson->accountsets))
			{
				$ffio='';
				$fcode='';
				$fmail='';
				if(isset($fjson->accountsets->AO))
				{
					$ffio="AO";
				}
				if(isset($fjson->accountsets->fieldcodes))
				{
					$fcode=$fjson->accountsets->fieldcodes;
				}
				if(isset($fjson->accountsets->AI))
				{
					$fmail="AI";
				}
				if(($utype=='object') && isset($ujson->userinfo->FU) && ($ujson->userinfo->FU != "") && ($ujson->userinfo->FU != "N/A"))
				{
					$lkstr='<div id="lkinfo">';
					if($ffio != "")
						$lkstr.='<span class="lk'.$ffio.'">'.$ujson->userinfo->$ffio.'</span>';
					if($fcode != "")
					{
						$lkstr.='<span class="lktitleet">'.$fjson->accountsets->titleet.'</span>';
						if(isset($ujson->userinfo->$fcode))
							$lkstr.='<span class="lk'.$fcode.'">'.$ujson->userinfo->$fcode.'</span>';
						else
							$lkstr.='<span class="lk'.$fcode.'">отсутствует</span>';
					}
					if($fmail != "")
					{
						$lkstr.='<span class="lktitleai">'.$fjson->accountsets->titlemail.'</span>';
						if((isset($ujson->userinfo->$fmail))&&($ujson->userinfo->$fmail != "N/A"))
							$lkstr.='<span class="lk'.$fmail.'">'.$ujson->userinfo->$fmail.'</span>';
						else
							$lkstr.='<span class="lk'.$fmail.'">отсутствует</span>';
					}
					$lkstr.='<span class="addsettings" onmousedown="lkSettings()">Настройки</span></div>';
					echo $lkstr;
				}
			}
		}
	?>
            <ul id="top_menu" class="top_menu">
                <li>
                    <span title="Версия для слабовидящих" class="blind" onmousedown="openBlindPanel()"></span>
                </li>
<!-- конец из файла ../tpl/headertop.html -->
	<?php
		$nspos=strpos($nsean, '*ютф*');
		$pagescont='';
		$logout='';
		$titleaccount='Кабинет';
		if(($nspos === false)&&((($utype=='object') && isset($ujson->userinfo->FU)) || (isset($_POST['_auth']))||($flag45)))
		{
			if(isset($fjson->accountsets))
				if(isset($fjson->accountsets->titleaccount))
					$titleaccount=$fjson->accountsets->titleaccount;
			if(defined('FLAG45'))
			{
				$stoplogout=constant('FLAG45');
				if((isset($_POST['_login'])) && ($_POST['_login'] == $stoplogout))
				{
					$GLOBALS['flag45']=1;
					$logout='';
				}
				elseif($flag45)
				{
					$logout='';
				}
				else
				{
					$logout='<li><span class="exits" onmousedown="closeSession()">Выход</span></li>';
				}
			}
			$pagescont.='<li><span id="privat" onmousedown="ordersSearch()">'.$titleaccount.'</span></li>';
		}
		else
		{
			if(isset($smjson->pages->privat))
				$pagescont.='<li><span id="privat" onmousedown="goToLocation(this.id)">Вход</span></li>';
			if(isset($smjson->pages->regform))
				$pagescont.='<li class="reg"><span id="regform" onmousedown="goToLocation(this.id)">Регистрация</span></li>';
		}
		echo $pagescont.''.$logout;
	?>
<!-- из файла ../tpl/headermiddle.html -->
<!--  
<li><span id="bookrating" onclick="goToLocation(this.id)">Популярное</span></li> 
<li><span id="ebookrating" onclick="goToLocation(this.id)">Популярные электронные книги</span></li>
-->
<li><span id="help" onclick="goToLocation(this.id)">Помощь</span></li>
<!-- конец из файла ../tpl/headermiddle.html -->

<!-- из файла ../tpl/blind_button.html -->
<div class="spacer"></div>
<!--
<li>
	<span title="Версия для слабовидящих" class="blind" onmousedown="openBlindPanel()"></span>
</li>
-->
<!-- конец из файла ../tpl/blind_button.html -->
<!-- из файла ../tpl/headermiddle1.html -->
</ul>
</div>
<div style="display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;">
    <div class="top_logo"></div>
    <div id="index">
        <!-- <div class="inner" onmousedown="goToLocation('index')"> -->
        <p></p>
        <p></p>
        <p></p>
        <div class="p">
            <p>Федеральное государственное бюджетное<br>учреждение культуры</p>
        </div>
        <div class="n">
            <p>Российская государственная<br>библиотека искусств</p>
        </div>
        <!-- 
			<div class="z">
			<p>Поиск и доступ к фондам и электронным ресурсам</p>
			</div> 
		</div>
		-->
    </div>
</div>
</div>

<!-- меню -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <!--
                    <li><span id="news" class="nav-link dropdown-toggle" onmousedown="goToLocation('news')">НОВОСТИ</span></li>
                    -->
                    <a class="nav-link dropdown-toggle" href="#" onmousedown="goToLocation('news')" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">События</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a href="#">События</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <!--
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2014/">2014</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2013/">2013</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2012/">2012</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2011/">2011</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2010/">2010</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2009/">2009</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2008/">2008</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2007/">2007</a></li>
                                <li><a class="dropdown-item" href="/ru/pages/Archive_news/2006/">2006</a></li>
                            -->
                            </ul>
                        </li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="">Новые поступления</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" onmousedown="goToLocation('about')" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">О библиотеке</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" onclick="address()">Адрес и время работы РГБИ</a></li>
                        <li><a class="dropdown-item" onclick="readers()">Запись читателей</a></li>
                        <li><a class="dropdown-item" onclick="about()">Общая информация</a></li>
                        <li><a class="dropdown-item" onclick="history()">Из истории РГБИ</a></li>
                        <li><a class="dropdown-item" onclick="structure()">Структура библиотеки</a></li>
                        <li><a class="dropdown-item" onclick="requisites()">Реквизиты библиотеки</a></li>
                        <li><a class="dropdown-item" href="http://liart.ru/ru/pages/index/normdocs/">Нормативные документы</a></li>
                        <li><a class="dropdown-item" href="http://liart.ru/ru/pages/index/korrupt/">Противодействие коррупции</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/3d/">3D панорамы библиотеки</a></li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/ru/pages/service/">Читателям</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/ru/pages/fonds/" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-expanded="false">Коллегам</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/ru/pages/fonds/main/">Основной фонд</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/cio">Справочно-информационный фонд</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/izofond">Фонд изобразительных материалов</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/abfond">Фонд отдела Абонемента</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/gvtp">Фонд газетных вырезок и театральных программ</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/video">Видеофонд</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/fonds/mffond">Фонд изданий на микрофишах</a></li>
                        <li><a class="dropdown-item" href="http://liart.ru/ru/pages/fonds/arhiv/">Архивный фонд </a></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/ru/pages/catalogs/" id="navbarDropdown4" role="button" data-bs-toggle="dropdown" aria-expanded="false">Спроси библиографа</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="http://opac.liart.ru/opacg/nog.htm" target="_blank">Электронный каталог</a></li>
                        <li><a class="dropdown-item" href="http://liart.ru/predm/i2.htm" target="_blank">Предметный каталог</a></li>
                        <li><a class="dropdown-item" href="/ru/pages/catalogs/Kartochnye_katalogi/">Карточные каталоги</a></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/ru/pages/eresorses/" id="navbarDropdown5" role="button" data-bs-toggle="dropdown" aria-expanded="false">Платные услуги</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/ru/pages/eresorses/bd">Базы данных</a></li>
                        <li><a class="dropdown-item" href="http://opac.liart.ru/opacg/nog.htm" target="_blank">Электронный каталог</a></li>
                    </ul>
                </li>

            </ul>
        </div>
    </div>
</nav>

</div>
<!-- div#header-->
<!-- конец из файла ../tpl/headermiddle1.html -->
<!-- конец шапка -->
<!-- далее не редактировать -->
<div class="tab_to_switch_search"><span class="opac" onmousedown="switchTypeSearch(this)">Поиск в электронных каталогах</span><span class="discovery" onmousedown="switchTypeSearch(this)">Поиск во внешних источниках</span></div>
<!-- из файла ../tpl/basestop.html -->
<div class="searchdiv" id="searchdiv">
    <div class="bases_div" id="bases_div">
        <div class="cross" id="menu_button_base" onmousedown="showHideM('bases_div_inner', 'menu_button_base')"><span></span><span></span><span></span></div>
        <div class="s_base" onmousedown="showHideM('bases_div_inner')">Выбрать БД</div>
        <div id="bases_div_inner" class="block">
<!-- конец из файла ../tpl/basestop.html -->
		<?php 
		if(isset($qjson))
		{
			$qtype=gettype($qjson);
			if($qtype=='object')
			{
				$biblcounter=0;
				$basescounter=0;
				$basescont='';
				$basesdiv='';
				$numdbbibl='';
				$display=$fjson->display;
				$dbnumber='';
				$dbtitle='';
				$dbalways='';
				$show='';
				$allbases='';
				foreach ($fjson as $fkey => $fvalue)
				{
					if($fkey=='dbs_all')
					{
						$allbases.='<span class="simple"><input type="radio" name="base" value="all" id="iall"/><label for="iall" onmousedown="chooseBase(this)">'.$fjson->$fkey->alias.'</label></span>';
					}
					foreach ($qjson as $qkey => $qvalue)
					{
						if($fkey==$qkey)
						{
							if(!isset($qjson->$qkey->masked))
							{
								$qclass='simple';
								if($fjson->$fkey->type=='AF')
								{
									if($fjson->$fkey->dbindex=='fundholders')
										$qclass='fundholders';
									else
										$qclass='authority';
								}
								else
								{
									$numdbbibl='var biblnumber="'.$fjson->$fkey->number.'"; ';
									$qclass='simple';
									$biblcounter++;
								}
								$basescounter++;
								if(isset($fjson->$fkey->display))
									$show=' style="display:none"';
								else
									$show='';
								if($basescounter==1)
								{
									$dbnumber=$fjson->$fkey->number;
									$dbtitle=$fjson->$fkey->alias;
									if(isset($fjson->$fkey->always))
										$dbalways=$fjson->$fkey->always;
								}
								if((($display=='select')&&($qclass != 'fundholders'))||(($display=='select')&&($qclass == 'fundholders')&&($fjson->$fkey->switch_in_base == 'in_base')))
								{
									if($basescounter==1)
									{
										if($allbases!='')
										{
											$dbnumber='all';
											$ftitl='dbs_all';
											$dbtitle=$fjson->$ftitl->alias;
										}
										$basescont.='<div class="basescontainer"><div class="opt2"><div class="select2"><img onmousedown="showOptions(this,\'bases_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" title="" class="labs" hspace="0" border="0" vspace="0"/><span class="i'.$dbnumber.'" id="currdb" onmousedown="showOptions(this.previousSibling,\'bases_div\')">'.$dbtitle.'</span></div></div></div>';
										if($allbases!='')
											$allbases='';
										$basesdiv.='<div id="'.$fjson->$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.$dbnumber.'">'.$dbtitle.'</div>';
									}
									else
									{
										$basesdiv.='<div id="'.$fjson->$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.$fjson->$fkey->number.'">'.$fjson->$fkey->alias.'</div>';
									}
								}
								if($display=='radio')
								{
									if(($qclass != 'fundholders') || (($qclass == 'fundholders') && ($fjson->$fkey->switch_in_base == 'in_base')))
									{
										$basescont.='<span class="'.$qclass.'"'.$show.'><input type="radio" name="base" value="'.$fjson->$fkey->number.'" id="i'.$fjson->$fkey->dbindex.'"/><label for="i'.$fjson->$fkey->dbindex.'" onmousedown="chooseBase(this)">'.$fjson->$fkey->alias.'</label></span>';
									}
								}
							}
						}
					}
				}
				if($basescounter==1)
				{
					if($dbalways=='')
					{
						if($display!='none')
							$basescont='<div class="single_base">'.$dbtitle.'</div>';

						else
							$basescont='<input name="base" id="currdb" value="'.$dbnumber.'" type="hidden"/>';
						$basesdiv='';
					}
				}
				else
				{
					if($display=='select')
					{
						$basesdiv='<div style="display: none;" class="options2" id="bases_container">'.$basesdiv.'</div>';
					}
				}
				if($biblcounter > 1)
				{
					$numdbbibl='';
				}
				echo $allbases.''.$basescont.'<script> var biblcounter='.$biblcounter.'; '.$numdbbibl.'</script>'.$basesdiv;
			}
		}
		?>
<!-- из файла ../tpl/basesbottom.html -->
		</div>
</div>
<!-- конец из файла ../tpl/basesbottom.html -->
	<div class="searchdiv_outer">
		<div class="searchdiv_inner">
		<!-- попробовать перенести bases_div -->
			<div class="top"><span id="simple" onmousedown="switchSearch(this)" class="sel_">Простой поиск</span><span id="expand" onmousedown="switchSearch(this)" class="sel">Расширенный поиск</span><span class="history_link" onclick="showHistory()">История поисков</span></div>
			<div class="middle" id="middle">
			<div id="simple_search"><input type="button" class="simplebutton" onmousedown="simpleSearch()" value="Искать в РГБИ"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="itemsimple" type="text" class="iLAB" value="" maxlength="1000" /></div></div></div><div class="spacer"></div><div id="expand_search" style="display: none"><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item0" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item1" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item2" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item3" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item4" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><div class="spacer"></div></div><div class="spacer"></div><div id="authority_search" style="display: none"><input type="button" class="authoritybutton" onmousedown="findInAf()" value="Искать"/><input id="voclist" type="button" class="voc" onmousedown="findInAf(this)" value="Список"/><input id="vocaf" type="button" class="voc" onmousedown="showVoc(this)" value="Словарь"/><div class="voc angle" id="meshtree"><div onmousedown="seeTreeView(this)">Дерево</div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="itemaf" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div id="afalfabet"><span onmousedown="searchAlfabetAuth(this)">А</span> <span onmousedown="searchAlfabetAuth(this)">Б</span> <span onmousedown="searchAlfabetAuth(this)">В</span> <span onmousedown="searchAlfabetAuth(this)">Г</span> <span onmousedown="searchAlfabetAuth(this)">Д</span> <span onmousedown="searchAlfabetAuth(this)">Е</span> <span onmousedown="searchAlfabetAuth(this)">Ж</span> <span onmousedown="searchAlfabetAuth(this)">З</span> <span onmousedown="searchAlfabetAuth(this)">И</span> <span onmousedown="searchAlfabetAuth(this)">Й</span> <span onmousedown="searchAlfabetAuth(this)">К</span> <span onmousedown="searchAlfabetAuth(this)">Л</span> <span onmousedown="searchAlfabetAuth(this)">М</span> <span onmousedown="searchAlfabetAuth(this)">Н</span> <span onmousedown="searchAlfabetAuth(this)">О</span> <span onmousedown="searchAlfabetAuth(this)">П</span> <span onmousedown="searchAlfabetAuth(this)">Р</span> <span onmousedown="searchAlfabetAuth(this)">С</span> <span onmousedown="searchAlfabetAuth(this)">Т</span> <span onmousedown="searchAlfabetAuth(this)">У</span> <span onmousedown="searchAlfabetAuth(this)">Ф</span> <span onmousedown="searchAlfabetAuth(this)">Х</span> <span onmousedown="searchAlfabetAuth(this)">Ц</span> <span onmousedown="searchAlfabetAuth(this)">Ч</span> <span onmousedown="searchAlfabetAuth(this)">Ш</span> <span onmousedown="searchAlfabetAuth(this)">Щ</span> <span onmousedown="searchAlfabetAuth(this)">Э</span> <span onmousedown="searchAlfabetAuth(this)">Ю</span> <span onmousedown="searchAlfabetAuth(this)">Я</span><br/><span onmousedown="searchAlfabetAuth(this)">A</span> <span onmousedown="searchAlfabetAuth(this)">B</span> <span onmousedown="searchAlfabetAuth(this)">C</span> <span onmousedown="searchAlfabetAuth(this)">D</span> <span onmousedown="searchAlfabetAuth(this)">E</span> <span onmousedown="searchAlfabetAuth(this)">F</span> <span onmousedown="searchAlfabetAuth(this)">G</span> <span onmousedown="searchAlfabetAuth(this)">H</span> <span onmousedown="searchAlfabetAuth(this)">I</span> <span onmousedown="searchAlfabetAuth(this)">J</span> <span onmousedown="searchAlfabetAuth(this)">K</span> <span onmousedown="searchAlfabetAuth(this)">L</span> <span onmousedown="searchAlfabetAuth(this)">M</span> <span onmousedown="searchAlfabetAuth(this)">N</span> <span onmousedown="searchAlfabetAuth(this)">O</span> <span onmousedown="searchAlfabetAuth(this)">P</span> <span onmousedown="searchAlfabetAuth(this)">Q</span> <span onmousedown="searchAlfabetAuth(this)">R</span> <span onmousedown="searchAlfabetAuth(this)">S</span> <span onmousedown="searchAlfabetAuth(this)">T</span> <span onmousedown="searchAlfabetAuth(this)">U</span> <span onmousedown="searchAlfabetAuth(this)">V</span> <span onmousedown="searchAlfabetAuth(this)">W</span> <span onmousedown="searchAlfabetAuth(this)">X</span> <span onmousedown="searchAlfabetAuth(this)">Y</span> <span onmousedown="searchAlfabetAuth(this)">Z</span></div></div><div class="spacer"></div><div id="sbuttons" style="display:none"><input type="button" class="expandbutton" onmousedown="simpleSearch()" value="Искать"/><input type="button" class="button2" onmousedown="clearSearch(this)" value="Очистить"/></div>
			<div id="limits_search" class="limits" onclick="showLimits(this)" style="display:none">Ограничения</div><div class="baselimits" id="limits_307" style="display: none"><div class="limits_left"><span class="title">Вид документа</span><div id="l_307_0" class="select"><img onclick="showOptions(this)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div></div></div><div class="spacer"></div><div class="baselimits" id="limits_425" style="display: none"><div class="limits_left"><span class="title">Год</span><span class="from">&#160;c&#160;</span><span class="input"><input id="period_425_0_1" name="period_425_0_1" size="4" maxlength="4" type="text" value="" class="PY"/></span><span class="to">&#160;по&#160;</span><span class="input"><input id="period_425_0_2" name="period_425_0_2" size="4" maxlength="4" type="text" value="" class="PY"/></span></div><div class="limits_left"><span class="title">Аудитория</span><div id="l_425_1" class="select"><img onclick="showOptions(this)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div></div></div><div class="spacer"></div><div class="baselimits" id="limits_500" style="display: none"><div class="limits_left"><span class="title">Год</span><span class="from">&#160;c&#160;</span><span class="input"><input id="period_500_0_1" name="period_500_0_1" size="4" maxlength="4" type="text" value="" class="PY"/></span><span class="to">&#160;по&#160;</span><span class="input"><input id="period_500_0_2" name="period_500_0_2" size="4" maxlength="4" type="text" value="" class="PY"/></span></div><div class="limits_left"><span class="title">Аудитория</span><div id="l_500_1" class="select"><img onclick="showOptions(this)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div></div></div><div class="spacer"></div>
			</div>
<!-- конец далее не редактировать -->
<!-- из файла ../tpl/headerbottom.html -->
			<div class="bottom"></div>
<!-- конец из файла ../tpl/headerbottom.html -->
		</div>
	</div>
	<div class="spacer"></div>
</div>

