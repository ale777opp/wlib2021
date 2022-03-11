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
		subMenu: [' ','Тематические запросы','Наличие изданий','Задать вопрос','Отзывы и предложения','Вне категорий','Вопросы о работе РГБИ','  ']
    },

    ]
  },	

  methods: {
    selectSubMenu: function (index) {
    if (this.activeItem === index) {

    } else { 
    	this.menuItems[this.activeItem].flag = false;
    	this.menuItems[index].flag = true;
    	this.activeItem = index;
    }
    },
   	mainMenuClass(index) {
  		//console.log(index);
     	return "main" + this.menuItems[index].id;
    },
    subMenuClass(index) {
    	//console.log(index);
    	return "subMenu" + 1 + index;
    }
  }

});