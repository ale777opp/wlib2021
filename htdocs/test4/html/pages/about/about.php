<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
include (THEPAGESPATH.'/includes/get_page_info.php');

$content = new Db();
$content->index_info();
$info=$content->data;
//var_dump($info);
?>

<head>
    <meta charset="utf-8">
<style>
.infoContent  {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
	
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
}
ul.subpages li {
	list-style-type: none;
}
.subpages {
	align-self:center;
}
.header {
	height: auto;
}
#infoWindow {
	width: 80%;
	margin: 0 auto;
}
</style>	
</head>  
<div id="infor">
    <div class="col_title">
        <span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">О библиотеке</span>
    </div>
    <div id="infoContainer" >
		<div class = "spacer h15x"></div>
	</div>
</div>

<script>
let info = <?php echo json_encode($info); ?>;

const ID_ABOUT = ["main", "address", "readers", "about", "history", "structure", "requisites"];

const MENU_PREFIX = "mnu";
const MENU_SEPARATOR = "_";

let regexp = /img.src=.*?jpg\"/i;
let url = info[0].content.match(regexp);
let newUrl = url[0].replace(/\"/,"http://liart.ru");
newUrl = newUrl.replace(/\"/,"");
info[0].content = info[0].content.replace(regexp,newUrl); 

$('<div/>', {"class": "infoContent", "id": "infoContent"}).prependTo('#infoContainer');
$('<div/>', {"class": "header", "html": `<center>${info[0].content}</center>`}).prependTo('#infoContent');
$('<div/>', {"class": "spacer h30x"}).appendTo('#infoContent');
$('<div/>', {"class": "about", "id": "infoWindow", "html": info[3].content }).appendTo('#infoContent');

// $('<ul/>', {"class": "subpages"}).appendTo('#infoContent');

for (let i=1;i<info.length;i++){
let id = MENU_PREFIX + MENU_SEPARATOR + ID_ABOUT[i];
//let id = ID_ABOUT[i];
$('<li/>', {
    "html": function () {
        return $('<a/>', { 
			"id": id,
			"class": "dropdown-item",
			"text": info[i].title
			//click: function (event) {
			//let clickId = event.target.id; 
			//alert (clickId);
			//}
       })
    }
}).appendTo('ul.subpages');
}

 
$('a[id^="mnu_"]').click(function(event) {
    let clickId = event.target.id;
if ($("#infoWindow").length) { $("#infoWindow").remove(); }

switch(clickId) {
	
	case "mnu_main":
		main();
		alert('click №1');
	break;
	
	case "mnu_address":
    $('<div/>', { "class": "address", "id": "infoWindow", "html": info[1].content }).appendTo('#infoContent');
		//alert('click №2');
	break;

	case "mnu_readers":
	$('<div/>', { "class": "readers", "id": "infoWindow", "html": info[2].content }).appendTo('#infoContent');
		//alert('click №3');
	break; 

	case "mnu_about":
	$('<div/>', { "class": "about", "id": "infoWindow", "html": info[3].content }).appendTo('#infoContent');
		//alert('click №4');
	break;

	case "mnu_history":
	$('<div/>', { "class": "history", "id": "infoWindow", "html": info[4].content }).appendTo('#infoContent');
		//alert(clickId);
	break;

	case "mnu_structure":
	$('<div/>', { "class": "structure", "id": "infoWindow", "html": info[5].content }).appendTo('#infoContent');
		//alert('click №6');
	break; 

	case "mnu_requisites":
	$('<div/>', { "class": "requisites", "id": "infoWindow", "html": info[6].content }).appendTo('#infoContent');
		//alert('click №7');
	break;

  	default:
  		alert('click hren');
	break;		
}
});			

</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>