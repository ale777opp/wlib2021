/*платный электронный абонемент*/

/*---------------------- регистрация -------------------------*/

function getPrice()/*запрос стоимости подписки на электронный абонемент*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["toDo","getInfoIndividES"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openRWin);
}

function openRWin(x)/*вывод информации о стоимости подписки на электронный абонемент*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		price=response[0]._groupAccess_0._price;
	}
}

function doRegistration(o)/*регистрация - сбор введенных данных и распределение по типам*/
{
	var WW="";
	if(take('WW').n!=null)
		WW=take('WW').n.value;
	var mail=take('mail').n.value;
	mail=mail.toLowerCase();
	var nik=take('nik').n.value.toUpperCase();
	var c1=take('readercode').n.value;
	var c2=take('readercode2').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
	}
	if(take('ipfirst').n!=null)
	{
		var v1=take('ipfirst').n.value;
		var v2=take('ipsecond').n.value;
		var v3=take('ipthird').n.value;
		if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
		{
			alert('Неверно введен код!');
			take('ipfirst').n.focus();
			return;
		}
		else
			promocod=v1+''+v2+''+v3;
	}
	if(c1!=c2)
	{
		alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');
		return;
	}
	else if(c1.length<6)
	{
		alert('Слишком короткий пароль!');
		return;
	}
	else if(WW=="")
	{
		alert('Кодовое слово не введено!');
		return;
	}
	else if(mail=="")
	{
		alert('Не введен e-mail!');
		return;
	}
	else if(nik=="")
	{
		alert('Форма обращения не введена!');
		return;
	}
	else
	{
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);

		readerobj={};
		readerobj.AA=c1;
		readerobj.AO=nik;
		readerobj.FU=mail;
		readerobj.WW=WW;
		readerobj.AI=mail;
		if(promocod!="")
		{
			promoCheck();
		}
		else
		{
			simpleRegistration();
		}
	}
}

function simpleRegistration()/*регистрация - запрос на создание записи на читателя*/
{
	var curDate=new Date();
	var Year=curDate.getFullYear();
	var maxYear=Year+5;
	var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
	var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","registrold"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_serviceclass","CATALOGING"]);
	gArr.push(["_service","PARAM"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_login",identif]);
	gArr.push(["arg2","ONLINE"]);
	gArr.push(["arg4","USER"]);
	gArr.push(["arg5","NEW"]);
	gArr.push(["arg6","0"]);
	gArr.push(["AA:",readerobj.AA]);
	gArr.push(["AO:",readerobj.AO]);
	gArr.push(["FU:",readerobj.FU]);
	gArr.push(["FG:",Year+''+mm+''+dd]);
	gArr.push(["FB:",maxYear+''+mm+''+dd]);
	gArr.push(["WW:",readerobj.WW]);
	gArr.push(["AI:",readerobj.AI]);
	gArr.push(["AX:","19900101"]);
	gArr.push(["AY:",readerobj.AI.toUpperCase()]);
	gArr.push(["AE:","RU"]);
	gArr.push(["FL:","ONLINE"]);
	gArr.push(["AW:","READER"]);
	ajaxToRCP(gArr,openRegistrWin);
}

function prolongSign(cod)/*продление договора*/
{
	if(typeof cod=="string")
		EP=cod;
	if(EP!="N/A")
	{
		if(typeof cod!="string")
		{
			var text='Новый абонемент';
			if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
				text='Активировать код';
			var arg={'cls':'dialog2','message':text,'target':self,'width':'400','height':'300'};
			showLayerWin('billwin',arg);
			var doc=take('billwinform');
			doc.n.innerHTML="";
			var cont=doc.create('div',{id: 'butcontainer', style:{textAlign:'center'}});
			cont.create('input', {className: 'mt30x w80 b button', id: 'promobut',value: 'Активировать код', type: 'button', onclick:'showPromo'});
			cont.create('input', {className: 'url w80 f80 m20x', id: 'billbut',value: 'Оплатить абонемент', type: 'button', onclick:'prolongSignBill'});
		}
		else
		{
			prolongSignPromo(cod);
		}
	}
	else
	{
		alert('Данному типу пользователя операция недоступна.');
		return;
	}
}

function sendBill(fio,mail)/*регистрация - отправка счета*/
{
	var gArr=new Array();
	gArr.push(["_to",mail]);
	gArr.push(["_subject","Счет на оплату услуг ЭБА"]);
	gArr.push(["_fio",fio]);
	gArr.push(["_price",price]);
	gArr.push(["_filename","bill"]);
	gArr.push(["_body","\nЗдравствуйте, "+fio+". Во вложенном файле находится счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);
	ajaxToRCP(gArr,billsendedOK,"/opacg/html/circle/php/mail.php");
}

function billsendedOK(x)/*регистрация - подтверждение отправки счета*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		delLayerWin();
		var arg={};
		arg.cls='dialog2';
		arg.target=self;
		arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
		arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Спасибо, '});
		p.create('span',{textNode: fio});
		p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.');
	}
}

function prolongSignBill()/*продление договора - выставление счета*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
	querylist.push(["_version","1.1.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["mode","ES"]);
	querylist.push(["code",EP]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,prolongSignBillOk)
}

function prolongSignBillOk(x)/*продление договора - отправка счета по электронной почте счета*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		if(response[0]._balanceES_0!=null)
		{
			if(response[0]._balanceES_0._type=="INDIVIDUAL")
			{
				var gArr=new Array();
				gArr.push(["_to",AI]);
				gArr.push(["_subject","Счет на оплату услуг ЭБА"]);
				gArr.push(["_fio",AO]);
				gArr.push(["_price",price]);
				gArr.push(["_filename","bill"]);
				gArr.push(["_body","\nЗдравствуйте, "+AO+". Во вложенном файле находится счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);
				ajaxToRCP(gArr,prolongSignOkWin,"/opacg/html/circle/php/mail.php");
			}
			else
			{
				var arg={};
				arg.cls='dialog2';
				arg.target=self;
				arg.message='ПРОДЛЕНИЕ ДОГОВОРА';
				arg.width='500';
				arg.height='400';
				showLayerWin('hiwin',arg);
				var doc=take('hiwinform');
				doc.n.innerHTML="";
				var p=doc.create('div',{style:{textAlign:'center', margin: '50px 10px 10px 10px', font: 'normal 12pt/24pt Arial, sans-serif'},textNode:'Уважаемый '});
				p.create('span',{textNode: AO,style:{color: '#3999e3'}});
				p.text('. Для продления срока действия Вашего договора Вам необходимо обратиться к контактному лицу по работе с Электронным абонементом в Вашей организации.');
			}
		}
		else
		{
			var error={};
			error._message_0="Операция невозможна";
			error._action_1="для данного пользователя";
			WriteError(error);
		}
	}
}

function prolongSignOkWin(x)/*продление договора - сообщение об успешно отправленном счете*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		delLayerWin();
		var arg={};
		arg.cls='dialog2';
		arg.target=self;
		arg.message='ПРОДЛЕНИЕ ДОГОВОРА';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Спасибо, '});
		p.create('span',{textNode: AO});
		p.text('. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.');
	}
}

function showPromo(cod)/*продление договора - ввод промокода*/
{
	var par=take('butcontainer');
	if(par.n!=null)
	{
		par.n.innerHTML="";
		par.create('b',{className: 'blue', textNode: 'Введите код:', style:{display:'block',margin:'20px', textAlign:'center'}});
		par.create('input',{type: 'text', id: 'ipfirst', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		par.create('span',{className: 'to', textNode: ' - '});
		par.create('input',{type: 'text', id: 'ipsecond', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		par.create('span',{className: 'to', textNode: ' - '});
		par.create('input',{type: 'text', id: 'ipthird', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		if(typeof cod!="string")
			par.create('input', {type:'button',className: 'url f80 w50',disabled: 'true', id: 'promoakt', value: 'Активировать', onmousedown:'prolongSignPromo',style:{margin:'20px',textAlign:'center'}});
		else
			par.create('input', {type:'button',className: 'url f80 w50',disabled: 'true', id: 'promoakt', value: 'Активировать', onmousedown:'function(){prolongSignPromo(\''+cod+'\');}',style:{margin:'20px',textAlign:'center'}});
		take('ipfirst').n.focus();
	}
}

function nextPortion(e)/*переключение между полями для ввода промокода*/
{
	var elem=getSrc(e);
	var val=elem.value;
	switch(elem.id)
	{
		case 'ipfirst':		if(val.length==4)
								take('ipsecond').n.focus();
							else
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
							}
		break;
		case 'ipsecond':	if(take('ipfirst').n.value.length<4)
								take('ipfirst').n.focus();
							else
							{
								if(val.length==4)
									take('ipthird').n.focus();
								else
								{
									if(take('promoakt').n!=null)
										take('promoakt').n.disabled=true;
								}
							}
		break;
		case 'ipthird':		if(take('ipfirst').n.value.length<4)
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
								take('ipfirst').n.focus();
							}
							else if(take('ipsecond').n.value.length<4)
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
								take('ipsecond').n.focus();
							}
							else
							{
								if(val.length==4)
								{
									if(take('promoakt').n!=null)
									{
										take('promoakt').n.disabled=false;
										take('promoakt').n.focus();
									}
								}
							}
		break;
		default: break;
	}
}

function prolongSignPromo(cod)/*продление договора - активация промокода*/
{
	typework="";
	if(typeof cod!="string")
		cod=EP;
	var pcode=promocod;
	if(promocod=="")
	{
		if(take('ipfirst').n!=null)
		{
			var v1=take('ipfirst').n.value;
			var v2=take('ipsecond').n.value;
			var v3=take('ipthird').n.value;
			if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
			{
				alert('Неверно введен код!');
				take('ipfirst').n.focus();
				return;
			}
			else
				pcode=v1+''+v2+''+v3;
		}
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","PromoCode"]);
	querylist.push(["mode","PROMOTE"]);
	querylist.push(["promo",pcode]);
	querylist.push(["reader",cod]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,prolongSignPromoOk);
}

function prolongSignPromoOk(x)/*сообщение об успешной регистрации с промокодом / активации промокода*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var text='Ваш абонемент активирован.';
		delLayerWin();
		var arg={};
		arg.cls='dialog2';
		arg.target=self;
		arg.width='500';
		arg.height='400';
		if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
		{
			text='Вы успешно зарегистрировались в системе. Для того, чтобы воспользоваться услугами ЭБА, перейдите на страницу Авторизации.';
			arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
			arg.dispatcher='reAuth';
		}
		else
		{
			arg.message='АБОНЕМЕНТ АКТИВИРОВАН';
			arg.dispatcher='ordersSearch';
		}
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		doc.create('div',{className:'answ',textNode:text});
	}
	promocod="";
	readerobj=null;
}

function promoCheck()/*проверка валидности промокода*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","PromoCode"]);
	querylist.push(["mode","CHECK"]);
	querylist.push(["promo",promocod]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,promoCheckOk);
}

function promoCheckOk(x)/*регистрация с промокодом*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	delLayerWin();
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		simpleRegistration();
	}
}

/*--------------конец регистрация - платный электронный абонемент---------------------------------------------*/

/*статистика для платного электронного абонемента*/

function addElemStat(o,s)
{
	portion=500;
	typework="privat";
	numDB=numdbBIBL;
	var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatES"]);
	querylist.push(["stat/startFrom/infoUser",s]);
	querylist.push(["stat/startFrom/idBibRec",o.parentNode.className]);
	querylist.push(["stat/level","2"]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$startFrom",s]);
	querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function addElemStatP(o)
{
	portion=500;
	typework="privat";
	numDB=numdbBIBL;
	var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpMyStatES"]);
	querylist.push(["stat/level","2"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/idBibRec",o.parentNode.className]);
	querylist.push(["stat/startFrom",1]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$startFrom",1]);
	querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$back","P"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function seeAddStatDigitMy(num)
{
	portion=50;
	begin=1;
	portioncount=0;
	typework="privat";
	numDB=numdbBIBL;
	if(typeof num != "undefined")
	{
		begin=portion * (parseInt(num,10) - 1) + 1;
		if(begin <= 0)
			begin=1;
	}
	var handler=modules["statdigit"].directory+'/statdigit.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatOrdersForDigitization"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/startFrom",begin]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",begin]);
	querylist.push(["$begin",begin]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$reader",ET]);
	querylist.push(["$code",EP]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatDigit(num)
{
	portion=50;
	portioncount=0;
	begin=1;
	typework="privat";
	numDB=numdbBIBL;
	if(typeof num != "undefined")
	{
		begin=portion * (parseInt(num,10) - 1) + 1;
		if(begin <= 0)
			begin=1;
	}
	var handler=modules["statdigit"].directory+'/statdigit.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatOrdersForDigitization"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/startFrom",begin]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$code",EP]);
	querylist.push(["$startFrom",begin]);
	querylist.push(["$begin",begin]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStat(s,r,p,o)
{
	portion=50;
	portioncount=0;
	var ind="";
	var start="";
	typework="privat";
	numDB=numdbBIBL;
	if(typeof o!="number")
	{
		if(take('ues').n != null)
			start=take('ues').n.value+''+take('dtc').n.value;
		else
		{
			if(take('firstsearch').n != null)
				start=take('firstsearch').n.value;
			else
				start=s;
		}
	}
	else
	{
		start=s;
		ind=r;
		portioncount=parseInt(p,10);
		if(o==0)
		{
			portioncount--;
		}
		else
		{
			portioncount++;
		}
		if(portioncount == 0)
			ind="";
	}
	var handler=modules["statindividadd"].directory+'/statindividadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatES"]);
	querylist.push(["stat/level","1"]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["stat/startFrom/infoUser",start]);
	if(ind != "")
		querylist.push(["stat/startFrom/idBibRec",ind]);
	querylist.push(["$startFrom",start]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatP(s)
{
	portion=50;
	portioncount=0;
	begin=1;
	var start="";
	typework="privat";
	numDB=numdbBIBL;
	if(typeof s!="number")
	{
		start=EP+''+ET+''+take('dtc').n.value;
	}
	else
	{
		begin=portion * (parseInt(s,10) - 1) + 1;
		if(begin <= 0)
			begin=1;
	}
	var handler=modules["statindividadd"].directory+'/statindividadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpMyStatES"]);
	querylist.push(["stat/level","1"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/startFrom",begin]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",start]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$begin",begin]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$back","P"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatInd(num,s)
{
	portion=50;
	begin=1;
	var back="";
	if(typeof s !="string")
	{
		s=ET;
	}
	else
	{
		back="userlist";		
	}
	if(num != null)
	{
		begin=portion * (parseInt(num,10) - 1) + 1;
		if(begin <= 0)
			begin=1;
	}
	typework="privat";
	numDB=numdbBIBL;
	var dc=take('dtc').n.value;
	var ds=take('dts').n.value;
	var handler=modules["stataddindivid"].directory+'/stataddindivid.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["mode","ES"]);
	querylist.push(["codenlr",s]);
	querylist.push(["date[0]",dc]);
	querylist.push(["date[1]",ds]);
	querylist.push(["startFrom",begin]);
	querylist.push(["fond","ED"]);
	querylist.push(["howMuch",portion]);
	querylist.push(["$startFrom",begin]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$codenlr",s]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$groupid",EP]);
	querylist.push(["$date0",dc]);
	querylist.push(["$date1",ds]);
	if(back!="")
		querylist.push(["$back",back]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function statInd()
{
	typework="privat";
	if((typeof EP == "undefined")||(EP=="")||(EP=="N/A"))
	{
		alert('Данному типу пользователя статистика недоступна.');
		return;
	}
	else
	{
		var handler=modules["statindivid"].directory+'/statindivid.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacesd:Manage"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["toDo","StatES"]);
		querylist.push(["es/code",EP]);
		querylist.push(["es/reader",ET]);
		querylist.push(["$AI",AI]);
		querylist.push(["$fio",AO]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		callToRCP(gArr);
	}
}

function showPersons(o,g,b,p)
{
	begin=1;
	portioncount=0;
	portion=50;
	typework="privat";
	var groupid="";
	if(typeof o!="number")
	{
		thegroup=o.parentNode;
		groupid=thegroup.id.substring(1);
	}
	else
	{
		if(typeof g != "undefined")
			groupid=g;
		portioncount=parseInt(p,10);
		begin=parseInt(b,10);
		o=parseInt(o,10);
		if(o==0)
		{
			portioncount--;
		}
		else
		{
			portioncount++;
		}
	}

	var handler=modules["personstat"].directory+'/personstat.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",top.numsean]);
	querylist.push(["id",top.identif]);
	querylist.push(["toDo","MembersES"]);
	querylist.push(["es/code",groupid]);
	querylist.push(["es/begin",begin]);
	querylist.push(["es/number",portion]);
	querylist.push(["$portion",portion]);
	querylist.push(["$begin",begin]);
	querylist.push(["$groupid",groupid]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$date0",take('dtc').n.value]);
	querylist.push(["$date1",take('dts').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	callToRCP(gArr);
}

/*конец статистика для платного электронного абонемента*/

/*конец платный электронный абонемент*/