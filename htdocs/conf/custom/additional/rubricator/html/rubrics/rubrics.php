<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div id="infor">
	<div class="col_title">
		<span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Рубрикатор</span>
	</div>
	<div class="col_content">
		<div id="rubricator">
			<ul>
			<?php 
				require_once(THEINCLUDESPATH.'/functions.php'); 
				$item='dbs_9';/*dbs_НОМЕР_БАЗЫ_ДАННЫХ_К_КОТОРОЙ_ПОДКЛЮЧЕН_РУБРИКАТОР*/
				$xmlfile=$historyfolder.'rubricator/'.$fjson->$item->rubricator->path;
				$xml = new DOMDocument('1.0'); 
				$xml->formatOutput = true; 
				$xml->preserveWhiteSpace = false; 
				$xml->load($xmlfile);
				$tags = $xml->getElementsByTagName('rubricator');
				$rnode = $tags->item(0);
				writeSingleRubricator($rnode,1,$folderName);
			?>
			</ul>
		</div>
	</div>
</div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

