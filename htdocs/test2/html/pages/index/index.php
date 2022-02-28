<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer h30 w60" style="margin:0 auto">
<div class="bgslider-container">
    <input name="bslid" id="bslid1" class="radio" type="radio">
    <input name="bslid" id="bslid2" class="radio" type="radio">
    <input name="bslid" id="bslid3" class="radio" type="radio">
    <input name="bslid" id="bslid4" class="radio" type="radio">
    <input name="bslid" id="bslid5" class="radio" type="radio">
    <input name="bslid" id="bslid6" class="radio" type="radio">
    <input name="bslid" id="bslid7" class="radio" type="radio">
    <div class="bslids" id="bslider1"></div>
    <div class="bslids" id="bslider2"></div>
    <div class="bslids" id="bslider3"></div>
    <div class="bslids" id="bslider4"></div>
    <div class="bslids" id="bslider5"></div>
    <div class="bslids" id="bslider6"></div>
    <div class="bslids" id="bslider7"></div>
</div>
</div>

<div class="spacer"></div>

<div id="infor"><div><div class="table index_page"><div class="row h100"><div class="td w33 p3 h100 vtop curs acenter"><div class="dib w100" onmousedown="searchNews(null,3);"><div class="header">Новые поступления</div><div class="spacer h100x"></div><div id="newbooks"></div><div class="else1"><span>Еще...</span></div></div></div><div class="td h100 p3 vtop"><div class="header w100">Популярное</div><div class="table w100"><div class="row h100"><div class="td w50 vtop curs acenter"><div class="dib" onmousedown="goToLocation('bookrating');"><div class="header1">Книги</div><div id="bookrating"></div><div class="else1"><span>Еще...</span></div></div></div><div class="td vtop curs acenter"><div class="dib" onmousedown="goToLocation('ebookrating');"><div class="header1">Электронные книги</div><div id="ebookrating"></div><div class="else1"><span>Еще...</span></div></div></div></div></div></div></div></div></div></div><div class="spacer"></div>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

