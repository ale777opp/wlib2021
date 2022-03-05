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
		flag: true,
		subMenu: ['Запись читателей','Услуги, правила пользования','Фонды, ресурсы, каталоги','Доступная среда','Мероприятия и экскурсии','Клубы и объединения','Учёба в РГБИ','Творческое развитие']
		},
		
		{
		item :  'Коллегам',
		flag: true,
		subMenu: ['Конференции, семинары','Методические документы','Проекты библиотеки','Издания РГБИ','Библиотека благодарит','Творческие конкурсы','Вакансии','Секция библиотек по искуству и музейных библиотек РБА']
		},

		{
		item : 'Спроси библиографа',
		flag: true,
		subMenu: ['Отзывы и предложения','Тематические запросы','Вне категорий','Наличие изданий','Вопросы о работе РГБИ','Задать вопрос']
    	},
    	]
    },	

    methods: {
    selectSubMenu: function (index) {
    	this.selectedItem = index;
/*    	switch(index) {
  case 0:  // if (x === 'value1')
    menu.flag1 = false;
    console.log(menu.flag1);
    break;

  case 1:  // if (x === 'value2')
    menu.flag2 = false;
    console.log(menu.flag2);
    break;
case 2:  // if (x === 'value2')
    menu.flag3 = false;
    console.log(menu.flag3);
    break;
   case 3:  // if (x === 'value2')
   console.log(menu.flag4);
    menu.flag4 = false;
    break; 
// default:
//    ...
//    [break]
}
*/
      console.log(this.selectedItem); //event.target.innerHTML
      console.log(this.flag);
    }
  	}
});

