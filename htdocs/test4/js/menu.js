const log = console.log;
const createEl = (id, text, tag, _class) => {
    const el = document.createElement(tag)
    if (id != false) { el.id = id; }
    el.className = _class
    el.innerHTML = text
    return el
}

let element = {};
element.get_link = function(text) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = text;
    //проверка есть ли ссылка в публикации о новинке
    if (htmlObject.innerHTML.indexOf("</a>") != -1) {
        var link = htmlObject.getElementsByTagName('a');
        return link[0].href;
    } else {
        return '#';
    }
}

function userSwitchTypeSearch(o) {
    if (document.body.classList == 'sheet_search_search_php') {
        switchTypeSearch(o);
        document.getElementById('search-btn').click();
    }
}

function idMenu(event) {
    let cl = event.target.id;
    return cl;
}

let address = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "address", "id": "infoWindow", "html": info[1].content }).appendTo('#infoContent');
};
let readers = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "readers", "id": "infoWindow", "html": info[2].content }).appendTo('#infoContent');
};
let about = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "about", "id": "infoWindow", "html": info[3].content }).appendTo('#infoContent');
};
let history = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "history", "id": "infoWindow", "html": info[4].content }).appendTo('#infoContent');
};
let structure = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "structure", "id": "infoWindow", "html": info[5].content }).appendTo('#infoContent');
};
let requisites = () => {
    if ($("#infoWindow").length) { $("#infoWindow").remove(); }
    $('<div/>', { "class": "requisites", "id": "infoWindow", "html": info[6].content }).appendTo('#infoContent');
};
