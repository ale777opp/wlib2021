<?php 
	$OpacDocumentRoot.=$dirHtdocs.'htdocs';
	$dirHtdocs=$OpacDocumentRoot.'/';
	$foldercgibin=$dirCgibin.'cgi-bin';
	$dirCgibin.='cgi-bin'.'/'.$folderName.'/';
	$pathCgi='/cgi'.$folderName.'/';
	$pathActRcp='/request';

	$pathfind='/find';
	$pathreg='/reg';
	$pagesearchpath='record';

	$pathCss='/'.$folderName.'/'.$folderName.'/css';
	$thefullcsspath=$dirHtdocs.''.$folderName.'/css';
	$pathJs='/'.$folderName.'/'.$folderName.'/js';
	$thefulljspath=$dirHtdocs.''.$folderName.'/js';
	$pathImg='/'.$folderName.'/'.$folderName.'/img';
	$pathHtml='/'.$folderName.'/'.$folderName.'/html';
	$pathDoc='/'.$folderName.'/'.$folderName.'/documents';
	$pathRubricator='/'.$folderName.'/'.$folderName.'/rubricator';
	
	$thepagespath=$folderName.'/html/pages';
	$themodulespath=$folderName.'/html/_modules';
	$theincludespath=$folderName.'/html/_includes';
	
	$commonInipath=$dirCgibin.$folderName.'/'.$folderName.'_$(OPACCGIDATE).log';
	$rcppathfile=$folderName.'/html/';
	$rcppathbegin=$folderName.'/error4';
	$rcpunloaddir=$dirHtdocs.$folderName.'/_'.$folderName;
	$rcphtmldir=$folderName.'/'.$folderName.'/_'.$folderName;
	$rcporderdir=$dirHtdocs.$folderName.'/'.'unload'.'/';
	$rcporderhtml='/'.$folderName.'/'.$folderName.'/unload/';
	$rcphandlerpath='/'.$folderName.'/index.php';
	
	$rcptitle='Электронный абонемент';
	$rcpsmalltitle='ЭБА';
	$rcpmetacontenttype='utf-8';
	$rcpmetacontentscripttype='text/javascript';
	$rcpmetakeywords='электронный абонемент, электронная библиотека, информационные технологии, базы данных, каталоги библиотек, компьютеризация, автоматизация, OPAC-Global, электронные каталоги, поиск книг';
	$rcpauthor='ООО «ДИТ-М»';
	$rcpcopyright='ООО «ДИТ-М»';
	$rcppostaddress='109240, Москва, Москворецкая наб., д.2-а, офис 220';
	$rcpphonenumber='8(495)698-5929';
	$rcpmailto='opac@ditm.ru';
	$rcpdescription='Поиск и заказ доступа к ресурсам библиотеки';
	
	$rcpdns='<input class="textpath" style="width:170px" type="text" value="smtp.server.ru" id="rcpdns" name="rcpdns"/>';
	$rcpaddress='<input class="textpath" style="width:170px" type="text" value="mailbox@server.ru" id="rcpaddress" name="rcpaddress"/>';
	$maillogin='<input class="textpath" style="width:170px" type="text" value="mailbox" id="maillogin" name="maillogin"/>';
	$mailpassword='<input class="textpath" style="width:170px" type="text" value="mailboxpassword" id="mailpassword" name="mailpassword"/>';
	$libalias='<input class="textpath" style="width:170px" type="text" value="Отдел МБА" id="libalias" name="libalias"/>';
	$useralias='<input class="textpath" style="width:170px" type="text" value="Читатель" id="useralias" name="useralias"/>';
	$mailhostname='<input class="textpath" style="width:170px" type="text" value="server.ru" id="mailhostname" name="mailhostname"/>';
	$mailportname='<input class="textpath" style="width:170px" type="text" value="25" id="mailportname" name="mailportname"/>';
	$userLogin='<input class="textpath" style="width:170px" type="text" value="" id="userlogin" name="userlogin" maxlength="15"/>';
	$userPassword='<input class="textpath" style="width:170px" type="text" value="" id="userpassword" name="userpassword" maxlength="15"/>';
	$guestLogin='<input class="textpath" style="width:170px" type="text" value="" id="guestlogin" name="guestlogin" maxlength="15"/>';
	$guestPassword='<input class="textpath" style="width:170px" type="text" value="" id="guestpassword" name="guestpassword" maxlength="15"/>';
	$login045='<input class="textpath" style="width:170px" type="text" value="" id="login045" name="guestlogin" maxlength="15"/>';
	$password045='<input class="textpath" style="width:170px" type="text" value="" id="password045" name="guestpassword" maxlength="15"/>';
	$biblioserver='<input class="textpath" style="width:300px" type="text" value="" id="biblioserver" name="biblioserver" maxlength="300"/>';
	$biblioapi='<input class="textpath" style="width:300px" type="text" value="" id="biblioapi" name="biblioapi" maxlength="300"/>';
echo '</head><body><h1>Настройка проекта</h1><form id="frm" onsubmit="return false"><div><input class="wr" id="wi1" name="wi1" type="checkbox" checked="checked"/><label class="wrapped" for="wi1">Базовые определения</label><div class="expl"><div><span class="titl">Имя сервера</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="servername" class="titl1">'.$serverName.'</span></div>
<div><span class="titl">Адрес сервера</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="serveraddr" class="titl1">'.$serverAddr.'</span></div>
<div style="display:none"><span class="titl">BROKER_ID</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="BROKERID" class="titl1">'.$BrokerId.'</span></div>
<div><span class="titl">Имя каталога</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="foldername" class="titl1">'.$folderName.'</span></div>
<div><span class="titl">OpacDocumentRoot</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="opacdocumentroot" class="titl1">'.$OpacDocumentRoot.'</span></div>
<div><span class="titl">commonInipath</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="commoninipath" class="titl1">'.$commonInipath.'</span></div>
<div><span class="titl">rcppathfile</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcppathfile" class="titl1">'.$rcppathfile.'</span></div>
<div style="display:none"><span class="titl">rcppathbegin</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcppathbegin" class="titl1">'.$rcppathbegin.'</span></div>
<div><span class="titl">rcpunloaddir</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpunloaddir" class="titl1">'.$rcpunloaddir.'</span></div>
<div><span class="titl">rcphtmldir</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcphtmldir" class="titl1">'.$rcphtmldir.'</span></div>
<div style="display:none"><span class="titl">rcporderdir</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcporderdir" class="titl1">'.$rcporderdir.'</span></div>
<div style="display:none"><span class="titl">rcporderhtml</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcporderhtml" class="titl1">'.$rcporderhtml.'</span></div>
<div><span class="titl">Путь к обработчику</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcphandlerpath" class="titl1">'.$rcphandlerpath.'</span></div>
<div><span class="titl">dirHtdocs</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="dirhtdocs" class="titl1">'.$dirHtdocs.'</span></div>
<div><span class="titl">dirCgibin</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="dircgibin" class="titl1">'.$dirCgibin.'</span></div>
<div><span class="titl">folderCgibin</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="foldercgibin" class="titl1">'.$foldercgibin.'</span></div>
<div><span class="titl">pathCgi</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathcgi" class="titl1">'.$pathCgi.'</span></div>
<div><span class="titl">pathActRcp</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathactrcp" class="titl1">'.$pathActRcp.'</span></div>
<div><span class="titl">"Обертка" для поиска</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathfind" class="titl1">'.$pathfind.'</span></div>
<div><span class="titl">"Обертка" для регистрации</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathreg" class="titl1">'.$pathreg.'</span></div>
<div><span class="titl">Маршрут для перехода к записи/странице</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pagesearchpath" class="titl1">'.$pagesearchpath.'</span></div>
<div><span class="titl">Путь к файлам css</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathcss" class="titl1">'.$pathCss.'</span></div>
<div><span class="titl">Полный путь к css</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="thefullcsspath" class="titl1">'.$thefullcsspath.'</span></div>
<div><span class="titl">Путь к файлам js</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathjs" class="titl1">'.$pathJs.'</span></div>
<div><span class="titl">Полный путь к js</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="thefulljspath" class="titl1">'.$thefulljspath.'</span></div>
<div><span class="titl">Путь к изображениям</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathimg" class="titl1">'.$pathImg.'</span></div>
<div><span class="titl">Путь к html-шаблонам</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathhtml" class="titl1">'.$pathHtml.'</span></div>
<div><span class="titl">Путь к текстовым документам</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathdoc" class="titl1">'.$pathDoc.'</span></div>
<div><span class="titl">Путь к рубрикатору</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="pathrubricator" class="titl1">'.$pathRubricator.'</span></div>
<div><span class="titl">Путь к страницам</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="thepagespath" class="titl1">'.$thepagespath.'</span></div>
<div><span class="titl">Путь к модулям</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="themodulespath" class="titl1">'.$themodulespath.'</span></div>
<div><span class="titl">IncludesPath</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="theincludespath" class="titl1">'.$theincludespath.'</span></div>
<div><span class="titl">Заголовок страницы</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcptitle" class="titl1">'.$rcptitle.'</span></div>
<div><span class="titl">Краткий заголовок для мобильной версии</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpsmalltitle" class="titl1">'.$rcpsmalltitle.'</span></div>
<div style="display:none"><span class="titl">Кодировка</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpmetacontenttype" class="titl1">'.$rcpmetacontenttype.'</span></div>
<div style="display:none"><span class="titl">Язык скриптов</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpmetacontentscripttype" class="titl1">'.$rcpmetacontentscripttype.'</span></div>
<div><span class="titl">Ключевые слова</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpmetakeywords" class="titl1">'.$rcpmetakeywords.'</span></div>
<div><span class="titl">Автор</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpauthor" class="titl1">'.$rcpauthor.'</span></div>
<div><span class="titl">Почтовый адрес</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcppostaddress" class="titl1">'.$rcppostaddress.'</span></div>
<div><span class="titl">Номер телефона</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpphonenumber" class="titl1">'.$rcpphonenumber.'</span></div>
<div><span class="titl">E-mail</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpmailto" class="titl1">'.$rcpmailto.'</span></div>
<div><span class="titl">Копирайт</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpcopyright" class="titl1">'.$rcpcopyright.'</span></div>
<div><span class="titl">Описание</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="rcpdescription" class="titl1">'.$rcpdescription.'</span></div>
<div><span class="titl">Логин администратора</span>'.$userLogin.'</div>
<div><span class="titl">Пароль администратора</span>'.$userPassword.'</div>
<div><span class="titl">Логин гостевого пользователя</span>'.$guestLogin.'</div>
<div><span class="titl">Пароль гостевого пользователя</span>'.$guestPassword.'</div>
<div><span class="titl">Логин гостевого пользователя внутри библиотеки (ввод штрихкода)</span>'.$login045.'</div>
<div><span class="titl">Пароль гостевого пользователя внутри библиотеки (ввод штрихкода)</span>'.$password045.'</div>
<div><span class="titl">Адрес SMTP сервера</span>'.$rcpdns.'</div>
<div><span class="titl">Имя сервера</span>'.$mailhostname.'</div>
<div><span class="titl">Порт SMTP</span>'.$mailportname.'</div>
<div><span class="titl">E-mail</span>'.$rcpaddress.'</div>
<div><span class="titl">E-mail логин</span>'.$maillogin.'</div>
<div><span class="titl">E-mail пароль</span>'.$mailpassword.'</div>
<div><span class="titl">Адресат в библиотеке</span>'.$libalias.'</div>
<div><span class="titl">Адресат/читатель</span>'.$useralias.'</div>
<div style="border:solid 1px silver">Настройки для интеграции с системой БИБЛИОПОИСК</div>
<div><span class="titl">Адрес сервера</span>'.$biblioserver.'</div>
<div><span class="titl">Путь к api</span>'.$biblioapi.'</div>
<div style="border:solid 1px silver">Настройки для создания репозитория</div>
<div><span class="titl">Маршрут для перехода к записи на автора</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="repoauthorpage" class="titl1"></span></div>
<div><span class="titl">Маршрут для перехода к библиографической записи</span><span class="edit" title="редактировать" onclick="editItem(this)"></span><span id="repobiblpage" class="titl1"></span></div>
</div></div><p style="text-align:center"><input id="chooseaction" onclick="nextSettings(1)" type="button" class="button" value="Сохранить"/></p><br/></form>';
?>