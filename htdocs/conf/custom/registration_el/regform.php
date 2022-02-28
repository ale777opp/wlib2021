<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>

<div id="infor">
<div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Регистрация</span></div>
<div>
	<div class="acenter bge p20x">
		<div class="border1 bgf w50"><br/>
			<div><input type="button" class="button2 l-gdg w100 cf h40x mb30x" value="Коллективные абоненты" onmousedown="goToLocation('_collective');"/></div>
			<div><input type="button" class="button2 l-gdg w100 cf h40x mb30x" value="Индивидуальные абоненты" onmousedown="goToLocation('_individual');"/></div>
			<div><input type="button" class="button l-gr w100 h40x mb30x" value="Регистрация с кодом" onmousedown="goToLocation('_promo');"/>
			</div>
			<br/>
		</div>
		<div class="filling"></div>
	</div>
</div>
</div>
<div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

