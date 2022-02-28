<?php 
	$rezult='';
	$json='';
	$fgc='';
	if(file_exists($path))
	{
		$rezult = file_get_contents($path);
		$json=json_decode($rezult);
		if(file_exists($json->dircgibin.'rcp.exe'))
			$fgc=file_get_contents('http://'.$hostname.''.$json->pathactrcp.'?_action=penter&_html=enter&_errorhtml=error2&_login='.$json->userlogin.'&_password='.$json->userpassword);
		$script='';
		$gl='';
		$gp='';
		$bs='';
		$ba='';
		if(isset($json->guestlogin))
			$gl=$json->guestlogin;
		if(isset($json->guestpassword))
			$gp=$json->guestpassword;
		if(isset($json->biblioserver))
			$bs=$json->biblioserver;
		if(isset($json->biblioapi))
			$ba=$json->biblioapi;
		$script.= <<<HTML
		<script>
		var BROKERID="$json->BROKERID";
		var foldername="$json->foldername";
		var userLogin="$json->userlogin";
		var userPassword="$json->userpassword";
		var guestLogin="$gl";
		var guestPassword="$gp";
		var pathActRcp="$json->pathactrcp";
		var pathrubricator="$json->pathrubricator";
		var opacdocumentroot="$json->opacdocumentroot";
		var dirhtdocs="$json->dirhtdocs";
		var commoninipath="$json->commoninipath";
		var rcppathfile="$json->rcppathfile";
		var rcppathbegin="$json->rcppathbegin";
		var rcpunloaddir="$json->rcpunloaddir";
		var rcphtmldir="$json->rcphtmldir";
		var rcporderdir="$json->rcporderdir";
		var rcporderhtml="$json->rcporderhtml";
		var rcpdns="$json->rcpdns";
		var rcpaddress="$json->rcpaddress";
		var serveraddr="$json->serveraddr";
		var servername="$json->servername";
		var rcphandlerpath="$json->rcphandlerpath";
		var biblioserver="$bs";
		var biblioapi="$ba";
		</script>
		

HTML;
		echo $script;
		echo $fgc;
		echo '</head><body><h1>Настройка проекта</h1><form id="frm" onsubmit="return false"><div id="basesets"><p style="text-align:center">Базовые определения</p><br/><p style="text-align:center"><input onclick="editPathSettings(\''.$path.'\')" type="button" class="button" value="Изменить"/></p><br/></div>';
		if($fgc!="")
		{
			if(file_exists($basepath))
			{
				echo '<div id="invitation"><p style="text-align:center">Поисковый интерфейс</p><br/><p style="text-align:center"><input onclick="editBaseSettings(\''.$basepath.'\')" type="button" class="button" value="Изменить"/> <input id="chooseaction" onclick="nextSettings(2)" type="button" class="button" value="Настроить"/></p><br/></div><div id="editdiv"><p style="text-align:center">Настройка сайта</p><br/><p style="text-align:center"><input id="writesite" name="writesite" onclick="nextSettings(6)" type="button" class="button" value="Изменить"/></p><br/></div></form>';
			}
			else
			{
				echo '<div id="invitation"><p style="text-align:center">Поисковый интерфейс</p><br/><p style="text-align:center"><input id="chooseaction" onclick="nextSettings(2)" type="button" class="button" value="Настроить"/></p><br/></div></form>';
			}
			echo '<form target="uploadframe" action="default/php/upload.php" method="post" enctype="multipart/form-data" style="display:none" id="uploadform" name="uploadform"><input type="hidden" id="flabel" name="flabel" value=""><input type="hidden" id="fname" name="fname" value=""><input type="hidden" id="dbname" name="dbname" value=""><input type="hidden" name="pathto" value="'.$json->opacdocumentroot.'/'.$json->foldername.'/rubricator"><input class="button2" id="rubfield" type="file" name="rubfield"><br/><input class="button3" type="submit" value="Загрузить"><br/></form><iframe src="about:blank" marginheight="0" marginwidth="0" style="width: 0px; height: 0px;" id="uploadframe" name="uploadframe" frameborder="0" scrolling="no"></iframe>';
		}
	}
	else
	{
		echo '</head><body><h1>Настройка проекта</h1><form method="POST" id="frm"><div id="basesets"><p style="text-align:center">Базовые определения</p><br/><p style="text-align:center"><input name="settings" id="settings" type="submit" class="button" value="Настроить"/></p><br/></div></form>';
	}
?>