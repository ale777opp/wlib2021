Vue.component('sub-menu', {
props: {
	items: Array,
	required: true
},
template:
`
<span {{ item }}</span>
`
})

var menu = new Vue({
	el: '#mainMenu',
	data: {
		activeItem: 0,
		menuItems: [
		{
		id: 1,	
		title : 'О библиотеке',
		flag: true,
		subMenu: ['История','Адрес и время работы','3D панорамы Галерея','Противодействие коррупции','Структура библиотеки, контакты','Реквизиты библиотеки','Официальные документы','Попечительский совет']
		},

		{
		id: 2,	
		title : 'Читателям',
		flag: false,
		subMenu: ['Запись читателей','Услуги, правила пользования','Фонды, ресурсы, каталоги','Доступная среда','Мероприятия и экскурсии','Клубы и объединения','Учёба в РГБИ','Творческое развитие']
		},

		{
		id: 3,	
		title :  'Коллегам',
		flag: false,
		subMenu: ['Конференции, семинары','Методические документы','Проекты библиотеки','Издания РГБИ','Библиотека благодарит','Творческие конкурсы','Вакансии','Секция библиотек по искуству и музейных библиотек РБА']
		},

		{
		id: 4,	
		title : 'Спроси библиографа',
		flag: false,
		subMenu: ['Отзывы и предложения','Тематические запросы','Вне категорий','Наличие изданий','Вопросы о работе РГБИ','Задать вопрос']
    },

    ]
    },	

    methods: {
    selectSubMenu: function (index) {
    this.activeItem = this.activeItem + 0;
    if (this.activeItem =! index) {
    	console.log(typeof(this.activeItem));
    	console.log(typeof(index));
    	console.log(this.menuItems[this.activeItem]);
    	console.log(this.menuItems[index]);
    }
    //	this.menuItems[index].flag = true;
    //	this.activeItem = index;
    //console.log(this.menuItems.flag.includes(false)); //event.target.innerHTML
    //	console.log(this.activeItem =! index);
    //.find(item => item.flag == true)
    },
    unselectSubMenu: function (index) {
      	this.menuItems[index].flag = false;
      	this.activeItem = index;
    	console.log(this.menuItems[index].title);
    	console.log(this.activeItem);
    	//console.log(this.menuItems.findIndex(item => item.flag == true))
    	//if (this.menuItems.findIndex(item => item.flag == true) == -1) this.menuItems[index].flag = true;
    },

  	mainMenuClass(index) {
  		//console.log(index);
     	return "post" + this.menuItems[index].id;
    },
    subMenuClass(index) {
    	//console.log(index);
    	return "post" + 1 + index;
    }


    }	
});