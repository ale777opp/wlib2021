var menu = new Vue({
	el: '#mainMenu',
	data: {
		selectedItem: 0,
		menuItems: [
		{
		item : 'О библиотеке',
		flag: true,
		subMenu: ['История','Адрес и время работы','3D панорамы Галерея','Противодействие коррупции','Структура библиотеки, контакты','Реквизиты библиоттеки','Официальные документы','Попечительский совет']
		},

		{
		item : 'Читателям',
		flag: false,
		subMenu: ['Запись читателей','Услуги, правила пользования','Фонды, ресурсы, каталоги','Доступная среда','Мероприятия и экскурсии','Клубы и объединения','Учёба в РГБИ','Творческое развитие']
		},
		
		{
		item :  'Коллегам',
		flag: false,
		subMenu: ['Конференции, семинары','Методические документы','Проекты библиотеки','Издания РГБИ','Библиотека благодарит','Творческие конкурсы','Вакансии','Секция библиотек по искуству и музейных библиотек РБА']
		},

		{
		item : 'Спроси библиографа',
		flag: false,
		subMenu: ['Отзывы и предложения','Тематические запросы','Вне категорий','Наличие изданий','Вопросы о работе РГБИ','Задать вопрос']
    	},
    	]
    },	

    methods: {
    selectSubMenu: function (index) {
    	this.menuItems[index].flag = true;
    //	this.selectedItem = index;
    //this.menuItems[index].flag? this.menuItems[index].flag = false : this.menuItems[index].flag = true;
    //	console.log(index); //event.target.innerHTML
    //  console.log(this.menuItems[index].flag);
    },
    unselectSubMenu: function (index) {
    //	this.selectedItem = index;
    	this.menuItems[index].flag = false;
    },
  	}
});

