/*
Vue.component('sub-menu',{
props:{
    option: Array
},
template: `<menu-items
           :item = item
           :index = index 
           ></menu-items>`
})

})
*/

var menu = new Vue({
    el: '#mainMenu',
    data: {
        activeItem: 0,
        menuItems: [{
            id: 1,
            title: 'О библиотеке',
            flag: true,
            subMenu: [
                {name:'История', ref: 'history()'},
                {name:'Адрес и время работы', ref: 'address()'},
                {name:'3D панорамы Галерея', ref: '/ru/pages/3d/'},
                {name:'Противодействие коррупции', ref: 'http://liart.ru/ru/pages/index/korrupt/'},
                {name:'Структура библиотеки, контакты', ref: 'structure()'},
                {name:'Реквизиты библиотеки', ref: 'requisites()'},
                {name:'Официальные документы', ref: 'http://liart.ru/ru/pages/index/normdocs/'},
                {name: 'Попечительский совет', ref:  'about()'}
                ]
                },
            {
            id: 2,
            title: 'Читателям',
            flag: false,
            subMenu: [
                {name: 'Запись читателей', ref: 'readers()'},
                {name: 'Услуги, правила пользования', ref: '/ru/pages/service/'}, 
                {name: 'Фонды, ресурсы, каталоги', ref: '/ru/pages/fonds/main/'},
                {name: 'Доступная среда', ref: ''},
                {name: 'Мероприятия и экскурсии', ref: ''},
                {name: 'Клубы и объединения', ref: ''},
                {name: 'Учёба в РГБИ', ref: ''},
                {name: 'Творческое развитие', ref: '/ru/pages/contacts/'}
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
            }
        },
 
    }

});