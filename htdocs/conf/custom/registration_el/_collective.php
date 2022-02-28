<?php  
include (THEPAGESPATH.'/includes/searchdiv.php');
 ?>
    <div class="spacer"></div>
 
<div id="infor">
<div class="col_title"><span id="index_" class="bread" onmousedown="goToLocation(this.id)">Главная</span> / <span class="bread" onmousedown="goToLocation('regform')">Регистрация</span> / <span class="caption">Регистрация коллективных пользователей</span></div>
<div>
	<div class="acenter bge p20x">
		<div class="border1 bgf w50"><br/>
			<p><span class="red">* </span><span class="b">Идентификатор доступа:</span></p>
			<p><input id="WW" type="text" value=""/></p>
			<p><span class="i">полученный при заключении договора</span></p>
			<p><span class="red">* </span><span class="b">Форма обращения:</span></p>
			<p><input id="nik" type="text" value=""/></p>
			<p><span class="i">ФИО</span></p>
			<p><span class="red">* </span><span class="b">E-mail:</span></p>
			<p><input id="mail" type="text" value=""/></p>
			<p><span class="i">(будет использоваться в качестве логина)</span></p>
			<p><span class="red">* </span><span class="b">Пароль:</span></p>
			<p><input id="readercode" type="password" value=""/></p>
			<p><span class="i">последовательность символов, длиной не менее шести знаков</span></p>
			<p><span class="red">* </span><span class="b">Подтверждение пароля:</span></p>
			<p><input id="readercode2" type="password" value=""/></p>
			<br/>
			<div><input id="col" type="button" class="button l-gr pr5x pl5x" onmousedown="doRegistration(this)" value="Зарегистрироваться"/></div>
			<br/>
			<div><span class="red">* </span><span>Обязательно к заполнению</span></div><br/>
			<input type="hidden" id="reganswere" value=". Вы успешно зарегистрировались в системе. Для того, чтобы войти, перейдите на страницу Авторизации."/>
		</div>
		<div class="filling"></div>
	</div>
</div>
</div>
<div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>