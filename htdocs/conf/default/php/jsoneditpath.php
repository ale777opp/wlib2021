<?php 
	$epath=$_POST['jsoneditpath'];
	if(file_exists($epath)) 
	{
		$rezult = file_get_contents($epath);
		$json=json_decode($rezult);
		$gl='';
		$gp='';
		$l45='';
		$p45='';
		$biblioserver='';
		$biblioapi='';
		$pf='';
		$pr='';
		$psp='';
		$repoauthorpage='';
		$repobiblpage='';
		$theincludespath=$folderName.'/html/_includes';
		if(isset($json->theincludespath))
			$theincludespath=$json->theincludespath;
		$thepagespath=$folderName.'/html/pages';
		if(isset($json->thepagespath))
			$thepagespath=$json->thepagespath;
		$themodulespath=$folderName.'/html/_modules';
		if(isset($json->themodulespath))
			$themodulespath=$json->themodulespath;
		$thefullcsspath=$dirHtdocs.''.$folderName.'/css';
		if(isset($json->thefullcsspath))
			$thefullcsspath=$json->thefullcsspath;
		$thefulljspath=$dirHtdocs.''.$folderName.'/js';
		if(isset($json->thefulljspath))
			$thefulljspath=$json->thefulljspath;
		if(isset($json->guestlogin))
			$gl=$json->guestlogin;
		if(isset($json->guestpassword))
			$gp=$json->guestpassword;
		if(isset($json->login045))
			$l45=$json->login045;
		if(isset($json->password045))
			$p45=$json->password045;
		if(isset($json->biblioserver))
			$biblioserver=$json->biblioserver;
		if(isset($json->biblioapi))
			$biblioapi=$json->biblioapi;
		if(isset($json->pathfind))
			$pf=$json->pathfind;
		if($pf=='')
			$pf='/find';
		if(isset($json->pathreg))
			$pr=$json->pathreg;
		if($pr=='')
			$pr='/reg';
		if(isset($json->pagesearchpath))
			$psp=$json->pagesearchpath;
		if($psp=='')
			$psp='record';
		if(isset($json->repoauthorpage))
			$repoauthorpage=$json->repoauthorpage;
		if(isset($json->repobiblpage))
			$repobiblpage=$json->repobiblpage;
		$mailportname=25;
		if(isset($json->mailportname))
			$mailportname=$json->mailportname;
		$libalias='Отдел МБА';
		if(isset($json->libalias))
			$libalias=$json->libalias;
		$useralias='Читатель';
		if(isset($json->useralias))
			$useralias=$json->useralias;
		echo '</head><body><h1>Настройка проекта</h1><form id="frm" onsubmit="return false"><div><input class="wr" id="wi1" name="wi1" type="checkbox" checked="checked"/><label class="wrapped" for="wi1">Базовые определения</label><div class="expl"><div><span class="titl">Имя сервера</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="servername" class="titl1">'.$json->servername.'</span></div>
<div><span class="titl">Адрес сервера</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="serveraddr" class="titl1">'.$json->serveraddr.'</span></div>
<div style="display:none"><span class="titl">BROKER_ID</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="BROKERID" class="titl1">'.$json->BROKERID.'</span></div>
<div><span class="titl">Имя каталога</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="foldername" class="titl1">'.$json->foldername.'</span></div>
<div><span class="titl">OpacDocumentRoot</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="opacdocumentroot" class="titl1">'.$json->opacdocumentroot.'</span></div>
<div><span class="titl">commonInipath</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="commoninipath" class="titl1">'.$json->commoninipath.'</span></div>
<div><span class="titl">rcppathfile</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcppathfile" class="titl1">'.$json->rcppathfile.'</span></div>
<div style="display:none"><span class="titl">rcppathbegin</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcppathbegin" class="titl1">'.$json->rcppathbegin.'</span></div>
<div><span class="titl">rcpunloaddir</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcpunloaddir" class="titl1">'.$json->rcpunloaddir.'</span></div>
<div><span class="titl">rcphtmldir</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcphtmldir" class="titl1">'.$json->rcphtmldir.'</span></div>
<div style="display:none"><span class="titl">rcporderdir</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcporderdir" class="titl1">'.$json->rcporderdir.'</span></div>
<div style="display:none"><span class="titl">rcporderhtml</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcporderhtml" class="titl1">'.$json->rcporderhtml.'</span></div>
<div><span class="titl">Путь к обработчику</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="rcphandlerpath" class="titl1">'.$json->rcphandlerpath.'</span></div>
<div><span class="titl">dirHtdocs</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="dirhtdocs" class="titl1">'.$json->dirhtdocs.'</span></div>
<div><span class="titl">folderCgibin</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="foldercgibin" class="titl1">'.$json->foldercgibin.'</span></div>
<div><span class="titl">dirCgibin</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="dircgibin" class="titl1">'.$json->dircgibin.'</span></div>
<div><span class="titl">pathCgi</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathcgi" class="titl1">'.$json->pathcgi.'</span></div>
<div><span class="titl">pathActRcp</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathactrcp" class="titl1">'.$json->pathactrcp.'</span></div>
<div><span class="titl">Путь к cgi</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathcgi" class="titl1">'.$json->pathcgi.'</span></div>
<div><span class="titl">"Обертка" для поиска</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathfind" class="titl1">'.$pf.'</span></div>
<div><span class="titl">"Обертка" для регистрации</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathreg" class="titl1">'.$pr.'</span></div>
<div><span class="titl">Маршрут для перехода к записи/странице</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pagesearchpath" class="titl1">'.$psp.'</span></div>
<div><span class="titl">Путь к файлам css</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathcss" class="titl1">'.$json->pathcss.'</span></div>
<div><span class="titl">Полный путь к css</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="thefullcsspath" class="titl1">'.$thefullcsspath.'</span></div>
<div><span class="titl">Путь к файлам js</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathjs" class="titl1">'.$json->pathjs.'</span></div>
<div><span class="titl">Полный путь к js</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="thefulljspath" class="titl1">'.$thefulljspath.'</span></div>
<div><span class="titl">Путь к изображениям</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathimg" class="titl1">'.$json->pathimg.'</span></div>
<div><span class="titl">Путь к html-шаблонам</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathhtml" class="titl1">'.$json->pathhtml.'</span></div>
<div><span class="titl">Путь к текстовым документам</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathdoc" class="titl1">'.$json->pathdoc.'</span></div>
<div><span class="titl">Путь к рубрикатору</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="pathrubricator" class="titl1">'.$json->pathrubricator.'</span></div>
<div><span class="titl">Путь к страницам</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="thepagespath" class="titl1">'.$thepagespath.'</span></div>
<div><span class="titl">Путь к модулям</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="themodulespath" class="titl1">'.$themodulespath.'</span></div>
<div><span class="titl">IncludesPath</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="theincludespath" class="titl1">'.$theincludespath.'</span></div>
<div><span class="titl">Логин администратора</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="userlogin">'.$json->userlogin.'</span></div>
<div><span class="titl">Пароль администратора</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="userpassword">'.$json->userpassword.'</span></div>
<div><span class="titl">Логин гостевого пользователя</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="guestlogin">'.$gl.'</span></div>
<div><span class="titl">Пароль гостевого пользователя</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="guestpassword">'.$gp.'</span></div>
<div><span class="titl">Логин гостевого пользователя внутри библиотеки (ввод штрихкода)</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="login045">'.$l45.'</span></div>
<div><span class="titl">Пароль гостевого пользователя внутри библиотеки (ввод штрихкода)</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="password045">'.$p45.'</span></div>
<div><span class="titl">Адрес SMTP сервера</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpdns">'.$json->rcpdns.'</span></div>
<div><span class="titl">Имя сервера</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="mailhostname">'.$json->mailhostname.'</span></div>
<div><span class="titl">Порт SMTP</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="mailportname">'.$mailportname.'</span></div>
<div><span class="titl">E-mail</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpaddress">'.$json->rcpaddress.'</span></div>
<div><span class="titl">E-mail логин</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="maillogin">'.$json->maillogin.'</span></div>
<div><span class="titl">E-mail пароль</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="mailpassword">'.$json->mailpassword.'</span></div>
<div><span class="titl">Адресат в библиотеке</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="libalias">'.$libalias.'</span></div>
<div><span class="titl">Адресат/читатель</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="useralias">'.$useralias.'</span></div>
<div><span class="titl">Заголовок страницы</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcptitle">'.$json->rcptitle.'</span></div>
<div><span class="titl">Краткий заголовок для мобильной версии</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpsmalltitle">'.$json->rcpsmalltitle.'</span></div>
<div style="display:none"><span class="titl">Кодировка</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpmetacontenttype">'.$json->rcpmetacontenttype.'</span></div>
<div style="display:none"><span class="titl">Язык скриптов</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpmetacontentscripttype">'.$json->rcpmetacontentscripttype.'</span></div>
<div><span class="titl">Ключевые слова</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpmetakeywords">'.$json->rcpmetakeywords.'</span></div>
<div><span class="titl">Автор</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpauthor">'.$json->rcpauthor.'</span></div>
<div><span class="titl">Почтовый адрес</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcppostaddress">'.$json->rcppostaddress.'</span></div>
<div><span class="titl">Номер телефона</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpphonenumber">'.$json->rcpphonenumber.'</span></div>
<div><span class="titl">E-mail</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpmailto">'.$json->rcpmailto.'</span></div>
<div><span class="titl">Копирайт</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpcopyright">'.$json->rcpcopyright.'</span></div>
<div><span class="titl">Описание</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="rcpdescription">'.$json->rcpdescription.'</span></div>
<div style="border:solid 1px silver">Настройки для интеграции с системой БИБЛИОПОИСК</div>
<div><span class="titl">Адрес сервера</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="biblioserver">'.$biblioserver.'</span></div>
<div><span class="titl">Путь к api</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span class="titl1" id="biblioapi">'.$biblioapi.'</span></div>
<div style="border:solid 1px silver">Настройки для создания репозитория</div>
<div><span class="titl">Маршрут для перехода к записи на автора</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="repoauthorpage" class="titl1">'.$repoauthorpage.'</span></div>
<div><span class="titl">Маршрут для перехода к библиографической записи</span><span class="edit" title="редактировать" onclick="editItem(this)" onmouseover="setCursor(this)"></span><span id="repobiblpage" class="titl1">'.$repobiblpage.'</span></div>
</div></div><p style="text-align:center"><input id="chooseaction" onclick="nextSettings(1)" type="button" class="button" value="Сохранить"/></p><br/></form>';
	}
	else
	{
		echo '</head><body><form id="frm"><div style="text-align:center">Отсутствует конфигурационный файл <b>'.$epath.'</b></div><p style="text-align:center"><input  type="submit" class="button" value="Создать"/></p></form>';
	}
?>