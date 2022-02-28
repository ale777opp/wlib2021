/*переход в коллекцию с главной страницы (формирование текстового файла)*/

var newstitle="Новые поступления";

function searchCollection(o)
{
	if(o.hasAttribute('data-title'))
		newstitle=o.getAttribute('data-title');
	if(o.hasAttribute('data-iddb'))
		newsdb=o.getAttribute('data-iddb');
	if(o.hasAttribute('data-quant'))
		newsquant=o.getAttribute('data-quant');
	if(o.hasAttribute('data-path'))
		newspath=o.getAttribute('data-path');
	if(typeof take(o).getsign('input',{type:'hidden'})[0] != "undefined")
		newsrestriction=take(o).getsign('input',{type:'hidden'})[0].value;
	newsperiod="1";
	viewAllNews();
}
