/*пользовательские функции Ростов-ДЭБ*/
function displaySearhString(o)/*открытие/скрытие поискового слоя*/
{
	var cont=take(document.body);
	var cls=cont.n.className;
	if(cont.hasclass('div_search_php'))
	{
		cont.delclass('div_search_php');
		switchSearch('simple');
	}
	else
		cont.addclass('div_search_php');
}

function searchCollection(o)/*переход в коллекцию с главной страницы (формирование текстового файла)*/
{
	;
}

function searchSubCollection(o)/*переход в подколлекцию с главной страницы*/
{
	;
}