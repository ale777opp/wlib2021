<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
include (THEPAGESPATH.'/includes/get_page_info.php');

$con = new Db();
$con->books();
$books=$con->data;
/*
$con->events();
$events=$con->data;

$con->news();
$news=$con->data;
*/
?>
<!-- слайдер -->
<div id = "parallax-1" class="parallax-1">
	<div class="rlib_outer">
		<div class="rlib_inner" id = "books_container">
<!-- 	
			<div id="racont1" class="rarrow_container">
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab1" for="rslid4"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab2" for="rslid3"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab3" for="rslid2"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab4" for="rslid1"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
			</div>

			<div id="racont2" class="rarrow_container">
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab5" for="rslid2"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab6" for="rslid3"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab7" for="rslid4"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
				<label class="rlabel" onmousedown="ieslider(this)" id="rlab8" for="rslid1"><img border="0" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" hspace="0" vspace="0"></label>
			</div>
-->		
		</div>
	</div>
</div>
<!-- слайдер -->

<div class="spacer h15x"></div>
<div id="infor"><div>
	<div class="table index_page">
		<div class="row h100"><div class="td w33 p3 h100 vtop curs acenter">
			<div class="dib w100" onmousedown="searchNews(null,3);">
			<div class="header">Новые поступления</div>
			<div class="spacer"></div>
			<div id="newbooks"></div>
			<div class="else1">
				<span>Еще...</span>
			</div>
		</div>
	</div>
	<div class="td h100 p3 vtop">
<div class="header w100">Популярное</div>
<div class="table w100">
	<div class="row h100">
		<div class="td w50 vtop curs acenter">
			<div class="dib" onmousedown="goToLocation('bookrating');">
			<div class="header1">Книги</div>
			<div id="bookrating"></div>
			<div class="else1">
				<span>Еще...</span>
			</div>
		</div>
	</div>
	<div class="td vtop curs acenter">
		<div class="dib" onmousedown="goToLocation('ebookrating');">
		<div class="header1">Электронные книги</div>
		<div id="ebookrating"></div>
		<div class="else1">
			<span>Еще...</span>
		</div>
	</div>
</div></div></div></div></div></div></div></div>
<div class="spacer"></div>

<script type="text/javascript"> //скрипт новостей событий и книг
let element = {}; 
element.get_link = function(text) {
	var htmlObject = document.createElement('div');
		htmlObject.innerHTML = text;
		//проверка есть ли ссылка в публикации о новинке
	if (htmlObject.innerHTML.indexOf("</a>") != -1) {
		var link = htmlObject.getElementsByTagName('a');
		return link[0].href;
	}else{
		return '#';
	}
}
function searchOff() {
	//let slider = document.getElementByClassName('parallax-1'); 
	//slider[0].style.dislpay = 'none';
	alert('searchOff');
}
//let htmlSpan = `<span class = "curs" onclick="alert('CLICK!');">Еще...</span>`;
// books \/
let books = <?php echo json_encode($books); ?>;
//let numBooks = books.length;
let numBooks = 4;
let big = 'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="';
let little = 'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="';
let booksContainer =document.getElementById('books_container');

for(let i=1;i<=numBooks;i++){ //numBooks
let inputBooks = document.createElement('input');
inputBooks.name = "rslid";
inputBooks.id = "rslid" + i;
inputBooks.className = "radio";
inputBooks.type = "radio";
booksContainer.append(inputBooks);
}
let rlibBooks = document.createElement('div');
rlibBooks.className = "rlib";
booksContainer.append(rlibBooks);

for(let i=1;i<=numBooks;i++){
//alert(i);	
let rslids = document.createElement('div');
let rslidsId = "rslider" + i;
rslids.className = "rslids";
rslids.id = rslidsId; 
document.getElementsByClassName("rlib")[0].appendChild(rslids);

let bookContent = document.getElementById(`${rslidsId}`);

let bookRImg = document.createElement('div');
bookRImg.className = "rimg";
bookContent.append(bookRImg);

let bookCover = document.createElement('div');
bookCover.className = "bookCover";
let bookHref = element.get_link(books[i-1]['content']);
bookCover.innerHTML = `<a href=${bookHref}><img src="http://liart.ru/media/uploads/newinlib/itemavatars/big/${books[i-1]['avatar_img_name']}" alt=""></a>`;
bookContent.append(bookCover);

let bookCont = document.createElement('div');
bookCont.className = "rcont";
bookCont.innerHTML = `<p>${books[i-1]['title']}</p>`;
bookContent.append(bookCont);
}
/*
// -- arrow --
let arrowRigth = document.createElement('div');
arrowRigth.className = "rarrow_container";
arrowRigth.id = "racont2";
arrowRigth.style.right = 30 + 'px';
booksContainer.after(arrowRigth);

let arrowContainer = document.getElementById('racont2');

for (let j = 2;j <= numBooks;j++) {
arrowLabel = document.createElement('label');
arrowLabel.className = "rlabel";
//arrowLabel.onmousedown = "ieslider(this)";
n = j + 2;
arrowLabel.id = "rlab" + n;
arrowLabel.htmlFor = "rslid" + j;
arrowLabel.innerHTML = `<img border="0" alt="" ${little} hspace="0" vspace="0">`;
arrowContainer.append(arrowLabel);
}

// -- arrow --
let arrowLeft = document.createElement('div');
arrowLeft.className = "rarrow_container";
arrowLeft.id = "racont1";
arrowLeft.style.right = 80 + 'px';
booksContainer.after(arrowLeft);

arrowContainer = document.getElementById('racont1');
console.log(arrowContainer);

for (let j = 1;j <= numBooks - 1;j++) {
let arrowLabel = document.createElement('label');
arrowLabel.className = "rlabel";
//arrowLabel.onmousedown = "ieslider(this)";
arrowLabel.id = "rlab" + j;
arrowLabel.htmlFor = "rslid" + j;
arrowLabel.innerHTML = `<img border="0" alt="" ${big} hspace="0" vspace="0">`;
arrowContainer.append(arrowLabel);
}
*/
/*
let else_books = document.createElement('div');
else_books.className = "else1";
else_books.innerHTML = htmlSpan;
books_content.append(else_books);

var title = document.createElement('p');
title.innerHTML = data[i]['title'];
title.style = "line-height:1.5em;";
*/
</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>