<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>

<head>
        <meta charset="utf-8">
</head>  
<div id="infor">
    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Новые поступления</span>
    </div>
        <h1 align = "center">Новые поступления</h1>
    <div id="news_container" >
		<div class="header"><center>Содержание</center></div>
		<div class = "spacer h15x"></div>
	</div>
</div>
<script>
	
        const log = console.log;
const createEl = (id, text, tag, _class) => {
  const el = document.createElement(tag)
  el.id = id
  el.className = _class
  el.textContent = text
  return el
}
let element = {}; 
element.get_link = function(text){
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

let j = 2; //книги
let k = 3; //новости
// let i = 3; //события

let htmlSpan = `<span class = "curs" onclick="alert('CLICK!');">Еще...</span>`;

// books \/
let books = <?php echo json_encode($books); ?>;

let books_container = document.getElementById('books_container');
let htmlBooksObject = document.createElement('div');
htmlBooksObject.className = "widget";
htmlBooksObject.id = "books_content";
books_container.append(htmlBooksObject);

let books_content = document.getElementById('books_content');

let img_books = document.createElement('img');
img_books.src = "http://liart.ru/media/uploads/newinlib/itemavatars/big/" + books[j]['avatar_img_name'];
img_books.style = "padding:10px;";
img_books.className = "image";
books_content.append(img_books);

let p_books = document.createElement('p');
p_books.innerHTML = books[j]['content'];
p_books.style = "line-height:1.5em;padding: 10px;";
p_books.className = "image";
books_content.append(p_books);
/*
let a_books = document.createElement('a');
a_books.href = element.get_link(books[j]['content']);
a_books.className = "button15";
a_books.id = "more_books"; 
a_books.target = "_blank";
a_books.innerHTML = "Ccылка на книгу";
books_content.append(a_books);
*/
let else_books = document.createElement('div');
else_books.className = "else1";
else_books.innerHTML = htmlSpan;
books_content.append(else_books);
/*
var title = document.createElement('p');
title.innerHTML = data[i]['title'];
title.style = "line-height:1.5em;";
*/
//events \/
let events = <?php echo json_encode($events); ?>;
let eventsTape = {};
let events_container = document.getElementById('events_container');
eventsTape.start = 3;
eventsTape.end = 5;

for(var i=eventsTape.start;i<=eventsTape.end;i=i+2){
	console.log(i);
	console.log(events[i]['id']);
let htmlEventsObject = document.createElement('div');
htmlEventsObject.className = "widget";
eventsTime = `<p style="text-align:left;">Начало: ${events[i]['start_date']}</p>
<p style="text-align:left;">Окончание: ${events[i]['end_date']}</p>`;
eventsTitle = `<center>${events[i]['title']}</center><br>`;
htmlEventsObject.innerHTML = eventsTitle + eventsTime;
eventsId = "events_content_" + i;
htmlEventsObject.id = eventsId;
events_container.append(htmlEventsObject);

let events_content = document.getElementById(eventsId);

let p_events = document.createElement('p');
//p_events.className = "else1";
p_events.innerHTML = `${events[i]['content']}<hr>`;
events_content.append(p_events);

let else_events = document.createElement('div');
else_events.className = "else1";
else_events.innerHTML = htmlSpan;
events_content.append(else_events);
}

//news \/
let news = <?php echo json_encode($news); ?>;
let news_container = document.getElementById('news_container');
let htmlNewsObject = document.createElement('div');
htmlNewsObject.innerHTML = `<p><cenetr>${news[k]['title']}</center></p>`;
/*
let newsImg =[];
newsImg = news[j]['content'].match(/price\[(\d+)\]\[(\d+)\]/ig);
<p><img  (?<=<p><img)(.+?)(?=(>\<\?p>))
*/
htmlNewsObject.className = "widget";
htmlNewsObject.id = "news_content";
news_container.appendChild(htmlNewsObject);

let news_content = document.getElementById('news_content');

let img_news = document.createElement('img');
img_news.src = "http://192.168.1.18/media/uploads/newsavatars/" + news[k]['avatar_img_name'];
img_news.style = "padding:10px;height: 200px; width: 240px;";
news_content.append(img_news);
	 
let text_news = document.createElement('div');
text_news.className = "text_news";
text_news.innerHTML = news[k]['content'];
news_content.append(text_news);

let else_news = document.createElement('div');
else_news.className = "else1";
else_news.innerHTML = htmlSpan;
news_content.append(else_news);

</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>