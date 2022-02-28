<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div id="infor">
<div class="pcontent-1">
	<div class="header" onmousedown="searchCollection(this)">Раздел один</div>
	<input class="req" type="hidden" value=""/>
	<?php
		include (THEPAGESPATH.'/index/_additional/band1.html'); 
	?>
</div>

<div class="pcontent-2">
	<div class="header" onmousedown="searchCollection(this)">Раздел два</div>
	<input class="req" type="hidden" value=""/>
	<?php
		include (THEPAGESPATH.'/index/_additional/band2.html'); 
	?>
</div>

<div class="pcontent-3">
	<div class="header" onmousedown="searchCollection(this)">Раздел три</div>
	<input class="req" type="hidden" value=""/>
	<?php
		include (THEPAGESPATH.'/index/_additional/band3.html'); 
	?>
</div>
</div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

