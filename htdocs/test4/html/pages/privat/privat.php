<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>

<div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Авторизация</span></div><div class="col_content"><div class="acenter bge p20x"><div class="border1 bgf w50"><div><span class="hint"></span><b>Если у вас нет логина и пароля,</b><span> пройдите </span><b>Регистрацию</b></div><br/><p><span class="red">* </span><span class="b">ЛОГИН:</span></p><p><input id="login" type="text" value=""/></p><p><span class="i">e-mail, введенный при регистрации</span></p><br/><p><span class="red">* </span><span class="b">ПАРОЛЬ:</span></p><p><input id="password" type="password" value=""/></p><p><span class="i">пароль, введенный при регистрации</span></p><br/><div><input type="button" class="button l-gr" onmousedown="doAuthorization()" value="Вход"/></div><br/><div><span class="red">* </span><span>Обязательно к заполнению</span></div><br/><br/><br/></div></div></div></div><div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

