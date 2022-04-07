Vue.component("page-readers", {
    template: "<div>Readers component</div>"
});
Vue.component("page-about", {
    template: "<div>About component</div>"
});
Vue.component("page-history", {
    template: `<div
                @click = "this.menu.activePage = false"
                >History component</div>`,
methods: {
    log: function(p) {
        console.log(p);
    },
},
});
Vue.component("page-structure", {
    template: "<div>Structure component</div>"
});
Vue.component("page-requisites", {
    template: "<div>Requisites component</div>"
});
Vue.component("page-address", {
    template: `<div>
        <span>Cтраница "Address component" в разработке</span>
        </div>`
});
Vue.component("page-patch", {
    template: `<div >
            <span>Cтраница "Patch component" в разработке</span>
            </div>`
});
Vue.component("tab-about", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class = "'subMenu' + 1 + ind"
               @click = "currentPageName(it.ref)"
          ><span class="item"
          >{{it.name}}</span>
          </div>
        </div>
        `,
        data() {
          return{
            subMenu: [
                {name:'История', ref: 'history'},
                {name:'Адрес и время работы', ref: 'address'},
                {name:'3D панорамы Галерея', ref: ''},
                {name:'Противодействие коррупции', ref: ''},
                {name:'Структура библиотеки, контакты', ref: 'structure'},
                {name:'Реквизиты библиотеки', ref: 'requisites'},
                {name:'Официальные документы', ref: ''},
                {name: 'Попечительский совет', ref:  'about'}
                ]
          }
        },
methods: {
    currentPageName: function(p) {
        menu.$data.currentPage = p? p : 'patch';
        menu.$data.activePage = true;
    },
},
});
      Vue.component("tab-readers", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class = "'subMenu' + 1 + ind"
          ><span class="item"
                @click = "currentPageName(it.name)"
          >{{it.name}}</span>
          </div>
        </div>
        `,
        data() {
          return{
            subMenu: [
              {name: 'Запись читателей', ref: 'readers'},
                {name: 'Услуги, правила пользования', ref: '/ru/pages/service/'},
                {name: 'Фонды, ресурсы, каталоги', ref: '/ru/pages/fonds/main/'},
                {name: 'Доступная среда', ref: ''},
                {name: 'Мероприятия и экскурсии', ref: ''},
                {name: 'Клубы и объединения', ref: ''},
                {name: 'Учёба в РГБИ', ref: ''},
                {name: 'Творческое развитие', ref: '/ru/pages/contacts/'}
            ]
          }
        }
      });
      Vue.component("tab-colleagues", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class = "'subMenu' + 1 + ind"
          ><span class="item"
                @click = "currentPageName(it.name)"
          >{{it.name}}</span>
          </div>
        </div>
        `,
        data() {
          return{
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
          }
        }
      });
      Vue.component("tab-ask", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class = "'subMenu' + 1 + ind"
          ><span class="item"
                @click = "currentPageName(it.name)"
          >{{it.name}}</span>
          </div>
        </div>
        `,
        data() {
          return{
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
        }
      });


var menu = new Vue({
    el: '#pageContent',
    data: {
        activeSubMenu: false,
        activePage: false,
        currentPage: 'patch',
        currentMenu: 'about',
        menuItems: [
            {id: 'about', title: 'О библиотеке'},
            {id: 'readers', title: 'Читателям'},
            {id: 'colleagues', title: 'Коллегам'},
            {id: 'ask', title: 'Спроси библиографа'}
        ]
    },

methods: {

selectSubMenu: function(i) {
    if (!this.activeSubMenu) this.activeSubMenu = true
    else this.activeSubMenu = false;
    this.currentMenu = i.id;
},
    log: function(p) {
        console.log(p);
    },
/*
   mainMenuClass(index) {
        //console.log(index);
    return "main" + this.menuItems[index].id;
    },

    currentPageName: function(p) {
        this.currentPage = p? p : 'patch';
        console.log(this.currentPage);
    },

    currentPageComponent: function() {
          console.log(this.currentPage);
             console.log("page-" + this.currentPage.toLowerCase());
    return "page-" + this.currentPage.toLowerCase();
    },
*/
},
computed: {
   currentPageComponent: function() {
    return "page-" + this.currentPage.toLowerCase();
    },

    currentMenuComponent: function() {
    return "tab-" + this.currentMenu.toLowerCase();
    },
},

});




/*
infor.onclick = () => {
    menu.activePage = false;
    console.log('закрыть страницу');
};

window.onclick = function (event) {
    menu.activeSubMenu = !menu.activeSubMenu;
    console.log('закрыть');
};
*/
