/*----------------------------- версия для слабовидящих -------------------------------*/

function openBlindPanel()
{
	var obj=take('blind_panel').n;
	var cont=take(document.body);
	//var cls=(typeof _sheet != "undefined") ? _sheet+" " : "";
	var cls=(typeof _sheet != "undefined") ? _sheet : "";
	if(obj.className=="blind_hide")
	{
		obj.className="blind_show";
		cont.hasclass('blind_panel') ? '' : cont.addclass('blind_panel');
		//if(cont.n.className==(cls+'blind_panel'))
			 toStandartSettings(take('standart_set').n);
	}
	else
	{
		obj.className="blind_hide";
	}
}

function switchToBlindVersion(o)
{
	var cont=take(document.body);
	var elem=take(o.parentNode).tags('input');
	for(var i=0; i<elem.length; i++)
	{
		if(cont.hasclass(elem[i].name+'_'+i))
			cont.delclass(elem[i].name+'_'+i);
	}
	cont.addclass(o.name+'_'+o.value);
	bodyclass=cont.n.className;
}
function toNormalVersion()
{
	var cont=take(document.body);
	var obj=take('blind_panel').n;
	obj.className="blind_hide";
	//cont.n.className=(typeof _sheet != "undefined") ? _sheet+" " : "";
	cont.n.className=(typeof _sheet != "undefined") ? _sheet : "";
	bodyclass="";
}

function toStandartSettings(o)
{
	var val="";
	if(o.hasAttribute('data-value'))
		val=o.getAttribute('data-value');
	var cont=take(document.body);
	if(val !="")
		cont.n.className=val;
	bodyclass=cont.n.className;
}

/*-------------------------- конец версия для слабовидящих ----------------------------*/