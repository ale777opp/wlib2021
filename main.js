/*
Vue.component('page-info',{
template: `
<html>
<head>
<title>Тест новая страницв на JavaScript</title>
<meta http-equiv=Content-Type content="text/html; charset=UTF-8">
<script language="JavaScript">
var win1;
function W() {
//alert("Сейчас откроется новое окно.");
win1 = window.open("", "Scriptic", "resizable=1, width=300, height=150");
win1.document.open ();
win1.document.write("<html><head><title>Оппа</title><meta http-equiv=Content-Type content='text/html; charset=UTF-8'>");
win1.document.write(" </head> <body><div height=40, width=120 style='text-align: center;'>как-бы тест <br>");
win1.document.write(" <label>Логин:<input type='text' name='login' id='login' tabindex='1'/></label>");
win1.document.write(" <label>Пароль:<input type='text' name='password' id='password' tabindex='2' /></label>");
win1.document.writeln(" <input value='Чисто для вида' type='button'></div></body></html>");
window.focus();
}
</script>
</head>
<body onload="W();">
</body>
</html>
`
})
,
*/

Vue.component("page-readers", {
    template: "<div>Readers component</div>"
});
Vue.component("page-about", {
    template: "<div>About component</div>"
});
Vue.component("page-history", {
    template: "<div>History component</div>"
});
Vue.component("page-structure", {
    template: "<div>Structure component</div>"
});
Vue.component("page-requisites", {
    template: "<div>Requisites component</div>"
});
Vue.component("page-address", {
    template: `<div id="infor">
        <span>Address component</span>
        </div>`
});
Vue.component("page-patch", {
    template: `<div id="infor">
            <span>Cтраница находится в разработке</span>
            </div>`
});
/*
Vue.component('main-menu',{
props: {
    element: Object,
    required: true
},

template: `
        <div v-for="(item, index) in element"
             v-if="item.flag"
             v-for = "(it, ind) in item.subMenu"
             :class = "'subMenu' + 1 + ind"
        ><span class="item"
                @click = "patch(it.name)"
        >{{it.name}}</span>
        </div>
        `
//  <a class="item" :href="`${it.ref? it.ref : '#'}`">{{it.name}}</a> -->
//  "${'menu']"  pageContentClass(index)]
});
*/
var menu = new Vue({
    el: '#pageContent',
    data: {
        activeItem: 0,
        currentPage: 'patch',
        menuItems: [{
            id: 1,
            title: 'О библиотеке',
            flag: false,
            subMenu: [
                {name:'История', ref: 'history'},
                {name:'Адрес и время работы', ref: 'address'},
                {name:'3D панорамы Галерея', ref: ''}, ///ru/pages/3d/
                {name:'Противодействие коррупции', ref: ''}, //
                {name:'Структура библиотеки, контакты', ref: 'structure'},
                {name:'Реквизиты библиотеки', ref: 'requisites'},
                {name:'Официальные документы', ref: ''}, //http://liart.ru/ru/pages/index/normdocs/
                {name: 'Попечительский совет', ref:  'about'}
                ]
                },
            {
            id: 2,
            title: 'Читателям',
            flag: false,
            subMenu: [
                {name: 'Запись читателей', ref: 'readers'},
                {name: 'Услуги, правила пользования', ref: ''}, ///ru/pages/service/
                {name: 'Фонды, ресурсы, каталоги', ref: ''}, ///ru/pages/fonds/main/
                {name: 'Доступная среда', ref: ''},
                {name: 'Мероприятия и экскурсии', ref: ''},
                {name: 'Клубы и объединения', ref: ''},
                {name: 'Учёба в РГБИ', ref: ''},
                {name: 'Творческое развитие', ref: ''} ///ru/pages/contacts/
                ]
            },
            {
            id: 3,
            title: 'Коллегам',
            flag: false,
            subMenu: [
                {name: 'Конференции, семинары', ref: ''},
                {name: 'Методические документы', ref: ''},
                {name: 'Проекты библиотеки', ref: ''},
                {name: 'Издания РГБИ', ref: ''},
                {name: 'Библиотека благодарит', ref: ''},
                {name: 'Творческие конкурсы', ref: ''},
                {name: 'Вакансии', ref: ''},
                {name: 'Секция библиотек по искуству и музейных библиотек РБА', ref: ''}
                ]
            },
            {
            id: 4,
            title: 'Спроси библиографа',
            flag: false,
            subMenu: [
                {name: ' ', ref: ''},
                {name: 'Тематические запросы', ref: ''},
                {name: 'Наличие изданий', ref: ''},
                {name: 'Задать вопрос', ref: ''},
                {name: 'Отзывы и предложения', ref: ''},
                {name: 'Вне категорий', ref: ''},
                {name: 'Вопросы о работе РГБИ', ref: ''},
                {name: '  ', ref: ''}
                ]
            }
            ]
},

methods: {
    selectSubMenu: function(index) {
        if (this.activeItem !== index) {
        this.menuItems[this.activeItem].flag = false;
        this.menuItems[index].flag = true;
        this.activeItem = index;
        } else {
            this.menuItems[index].flag = true;
        }
    },
/*
    pageContentClass(index) {
        //console.log(index);
        return "main" + this.menuItems[index].id;
    },
*/    
    currentPageName: function(p) {
        this.currentPage = p? p : 'patch';
        //console.log(this.currentPage);
    },
},
computed: {
    currentPageComponent: function() {
        return "page-" + this.currentPage.toLowerCase();
    },

},

});

let modal = document.getElementsByClassName('subMenu10');
window.onclick = function (event) {
    console.log(event.target);
    $.each(modal, function(index,value) {
     console.log("output", index, value );   
    })
    //if (event.target == modal[0]) modal.css('display', 'none');
};

/*
 const createEl = (id, text, tag, _class) => {
    const el = document.createElement(tag)
    if (id != false) { el.id = id; }
    el.className = _class
    el.innerHTML = text
    return el
}

function idMenu(event) {
    let cl = event.target.id;
    return cl;
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
*/
