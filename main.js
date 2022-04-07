Vue.component("page-readers", {
    template: `<div @click = "closePage()"
                >${infoPages[2].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-about", {
    template: `<div @click = "closePage()"
                >${infoPages[0].content}${infoPages[3].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-history", {
    template: `<div @click = "closePage()"
                >${infoPages[4].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-structure", {
    template: `<div @click = "closePage()"
                >${infoPages[5].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-requisites", {
    template: `<div @click = "closePage()"
                >${infoPages[6].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-address", {
    template: `<div @click = "closePage()"
                >${infoPages[1].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});
Vue.component("page-norm", {
    template: `<div @click = "closePage()"
                >${infoPages[7].content}</div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
    }
});

Vue.component("page-patch", {
    template: `<div @click = "closePage()"
                ><span style = "padding:10px 50px;">Данная страница находится в разработке</span>
                </div>`,
    methods: {
        closePage: function() {
            menu.$data.activePage = false;
            infor.style.display = 'block';
        }
     }
});
Vue.component("tab-about", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class.stop = "'subMenu' + 1 + ind"
               @click = "currentPageName(it.ref)"
          ><span class="item"
                :class = "{errors: !it.ref}"
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
                {name:'Официальные документы', ref: 'norm'},
                {name: 'Попечительский совет', ref:  'about'}
                ]
          }
        },
methods: {
    currentPageName: function(p) {
        menu.$data.currentPage = p? p : 'patch';
        menu.$data.activePage = true;
        infor.style.display = 'none';
    },
},
});
    Vue.component("tab-readers", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class.stop = "'subMenu' + 1 + ind"
               @click = "currentPageName(it.ref)"
          ><span class="item"
          :class = "{errors: !it.ref}"
          >{{it.name}}</span>
          </div>
        </div>
        `,
        data() {
          return{
            subMenu: [
              {name: 'Запись читателей', ref: 'readers'},
                {name: 'Услуги, правила пользования', ref: ''},
                {name: 'Фонды, ресурсы, каталоги', ref: ''},
                {name: 'Доступная среда', ref: ''},
                {name: 'Мероприятия и экскурсии', ref: ''},
                {name: 'Клубы и объединения', ref: ''},
                {name: 'Учёба в РГБИ', ref: ''},
                {name: 'Творческое развитие', ref: ''}
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
      Vue.component("tab-colleagues", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class.stop = "'subMenu' + 1 + ind"
               @click = "currentPageName(it.ref)"
          ><span class="item"
          :class = "{errors: !it.ref}"
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
        },
methods: {
    currentPageName: function(p) {
        menu.$data.currentPage = p? p : 'patch';
        menu.$data.activePage = true;
    },
}
      });
      Vue.component("tab-ask", {
        template: `<div class = "grid_sub_menu">
          <div v-for = "(it, ind) in subMenu"
               :class = "'subMenu' + 1 + ind"
               @click.stop = "currentPageName(it.ref)"
          ><span class="item"
          :class = "{errors: !it.ref}"
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
        },
methods: {
    currentPageName: function(p) {
        menu.$data.currentPage = p? p : 'patch';
        menu.$data.activePage = true;
    },
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
 //   else this.activeSubMenu = false;
    this.currentMenu = i.id;
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
