<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>
<div id="infor">
	<div class="col_title"><span id="index_" class="bread" onmousedown="goToLocation(this.id)">Главная</span> / <span class="bread" onmousedown="goToLocation('privat')">Авторизация</span> / <span class="caption">Запрос смены пароля</span></div>
	<div class="col_content">
		<div class="acenter p20x">
			<div class="border1 w50">
				<br/>
				<br/>
				<p><span class="red">* </span><span class="b">E-MAIL:</span></p>
				<p><input id="email" type="text"/></p>
				<p class="i"><span>e-mail, введенный при регистрации</span></p><br/>
				<div><input type="button" class="button" onmousedown="callChangePass()" value="OK"/></div>
				<br/>
				<br/>
				<div><span class="red">* </span><span>Обязательно к заполнению</span></div><input id="answere" type="hidden" value="Ваш пароль изменен и отправлен на ваш почтовый адрес."/><input id="callback" type="hidden" value="reAuth"/>
				<br/>
				<br/>
			</div>
		</div>
		<div class="spacer"></div>
	</div>
</div>
<div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>