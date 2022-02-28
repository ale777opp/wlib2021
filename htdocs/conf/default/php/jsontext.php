<?php 
	$dbstr = $_POST['jsontext'];
	if(!file_exists($dbpath0))
	{
		writeFile($dbpath0,$dbstr);
	}
	writeFile($basepath,$dbstr);
	echo '</head><body><h1>Настройка проекта</h1><form id="frm" method="POST"><div><p style="text-align:center">Базовые определения успешно сохранены.</p><p style="text-align:center">Поисковый интерфейс настроен.</p><br/><p style="text-align:center"><input id="begin" name="begin" type="submit" class="button" value="Изменить"/> <input id="siteconfig" name="siteconfig" type="submit" class="button" value="Записать" onsubmit="showProgressBar()"/></p></div></form>';
?>