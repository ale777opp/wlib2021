<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>

<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Популярное</span></div><div class="col_content"><input class="button3 mt20x" value="Обновить" onmousedown="callBookRating();" type="button"/><div class="table mt20x h100 w100"><div class="row"><div class="td content"><div id="bookratings" class="ml5 mr5">
						<?php 
						include (THEMODULESPATH.'/bookrating/_ratings/bookrating.html');
						?>
					</div></div></div></div></div></div><div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

