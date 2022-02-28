/*онлайн регистрация читателей*/

/*--------Настройки личного кабинета---------*/

function lkSettings()/*кнопка Настройки личного кабинета*/
{
	if(take('settingslayerform').n != null)
		delLkSettingslayer();
	else
	{
		delLayerWin();
		document.body.style.overflow="hidden";
		var doc=take(document.body).create('div',{id:'settingslayerform'});
		var tab=doc.create('div',{className:'table'});
		var td1=tab.create('div',{className:'td'});
		if(typeof emailfield != "undefined")
		{
			var td2=tab.create('div',{className:'td'});
			if((typeof AI != "undefined")&&((AI == "") || (AI == "N/A")))
				td2.create('div',{id:'emailfieldtitle',textNode:'Введите e-mail',className:'orange'});
			else
				td2.create('div',{id:'emailfieldtitle',textNode:'Изменить e-mail'});
			var tab1=td2.create('div',{className:'table'});
			var row1=tab1.create('div',{className:'row'});
			var row2=tab1.create('div',{className:'row'});
			if((typeof AI != "undefined")&&((AI == "") || (AI == "N/A")))
				row1.create('div',{className:'td',textNode:'E-mail',className:'orange'});
			else
				row1.create('div',{className:'td',textNode:'E-mail'});				
			var div1=row1.create('div',{className:'td'});
			div1.create('input',{type:'text',id:'email','value':''});
			row2.create('div',{className:'td',textNode:'Подтвердить'});
			var div2=row2.create('div',{className:'td'});
			div2.create('input',{type:'text',id:'email1','value':''});
			var div3=td2.create('div');
			div3.create('input',{type:'button',className:'button',value:'Изменить e-mail',onmousedown:'doRecEmail'});
		}
		td1.create('div',{id:'passfieldtitle',textNode:'Изменить пароль'});
		var tab1=td1.create('div',{className:'table'});
		var row1=tab1.create('div',{className:'row'});
		var row2=tab1.create('div',{className:'row'});
		row1.create('div',{className:'td',textNode:'Новый пароль'});
		var div1=row1.create('div',{className:'td'});
		div1.create('input',{type:'password',id:'password','value':''});
		row2.create('div',{className:'td',textNode:'Подтвердить'});
		var div2=row2.create('div',{className:'td'})
		div2.create('input',{type:'password',id:'password1','value':''});
		var div3=td1.create('div');
		div3.create('input',{type:'button',className:'button',value:'Изменить пароль',onmousedown:'doRecPass'});
		doc.sety(take('header').getb());
	}
}

function doRecEmail()
{
	if((typeof FU != "undefined") && (FU != "N/A") && (FU != ""))
	{
		var c1=take('email').n.value;
		var c2=take('email1').n.value;
		var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if(c1!=c2)
		{
			alert('Поля "e-mail" и "Подтверждение e-mail" - не совпадают!');
			return;
		}
		else if(!emailRegular.test(c1))
		{
			alert('Неверно введен e-mail!');
			return;
		}
		else
		{
			var len=FU.length;
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","registrold"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_serviceclass","CATALOGING"]);
			gArr.push(["_service","PARAM"]);
			gArr.push(["_numsean",numsean]);
			gArr.push(["_login",identif]);
			gArr.push(["arg4","USER"]);
			gArr.push(["arg5","VIE"]);
			gArr.push(["arg7","FU"]);
			gArr.push(["arg8","FDT"]);
			gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,FU,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+FU+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);
			var arg={};
			arg.target=self;
			arg.cls='loader';
			showLayerWin('loaderwin',arg);
			var obj={};
			obj.field="AI";
			obj.content=c1;
			obj.title="e-mail";
			ajaxToRCP(gArr,doRecPassAndEmail,null,null,null,obj);
		}
	}
	else
	{
		alert("Смена e-mail невозможна.\nОбратитесь к сотрудникам библиотеки");
		return;
	}
}

function doRecPass()
{
	if((typeof FU != "undefined") && (FU != "N/A") && (FU != ""))
	{
		var c1=take('password').n.value;
		var c2=take('password1').n.value;
		if(c1!=c2)
		{
			alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');
			return;
		}
		else if(c1.length<6)
		{
			alert('Пароль меньше 6 символов!');
			return;
		}
		else if(!IsAlfaDigit(c1))
		{
			alert('Пароль может содержать только буквы латинского алфавита и цифры!');
			return;
		}
		else
		{
			var len=FU.length;
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","registrold"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_serviceclass","CATALOGING"]);
			gArr.push(["_service","PARAM"]);
			gArr.push(["_numsean",numsean]);
			gArr.push(["_login",identif]);
			gArr.push(["arg4","USER"]);
			gArr.push(["arg5","VIE"]);
			gArr.push(["arg7","FU"]);
			gArr.push(["arg8","FDT"]);
			gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,FU,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+FU+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);
			var arg={};
			arg.target=self;
			arg.cls='loader';
			showLayerWin('loaderwin',arg);
			var obj={};
			obj.field="AA";
			obj.content=c1;
			obj.title="пароль";
			ajaxToRCP(gArr,doRecPassAndEmail,null,null,null,obj);
		}
	}
	else
	{
		alert("Смена пароля невозможна.\nОбратитесь к сотрудникам библиотеки");
		return;
	}
}

function doRecPassAndEmail(x,obj)
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
		var arr=answere.split('[END]');
		var isn="";
		var mail="";
		var log="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].indexOf('[ISN]')!=-1)
			{
				isn=arr[i].substring(arr[i].indexOf('[ISN]')+5);
			}
			if(arr[i].substring(0,3)=='AI:')
			{
				mail=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='AY:')
			{
				log=arr[i].substring(3);
			}
		}
		obj.isn=isn;
		obj.mail=mail;
		obj.log=log;
		recPassAndEmail(obj);
	}
}

function recPassAndEmail(obj)
{
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","registrold"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_serviceclass","CATALOGING"]);
	gArr.push(["_service","PARAM"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_login",identif]);
	gArr.push(["arg4","USER"]);
	gArr.push(["arg5","SUP"]);
	gArr.push(["arg6",obj.isn]);
	gArr.push([obj.field+":",obj.content]);
	ajaxToRCP(gArr,backRecPassAndEmail,null,null,null,obj);
}

function backRecPassAndEmail(x,obj)
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
		if(obj.field == "AA")
		{
			var protocol=window.location.protocol;
			var host=window.location.host;
			var gArr=new Array();
			gArr.push(["_to",obj.mail]);
			gArr.push(["_subject","Изменение регистрационных данных"]);
			gArr.push(["_body","\nЗдравствуйте, Ваш "+obj.title+" изменен.\nВаши данные для авторизации на сайте "+protocol+"//"+host+"/"+foldername+":\nЛогин: "+obj.log+", "+obj.title+": "+obj.content+".\n\n"]);
			ajaxToRCP(gArr,recPassAndEmailOK,"/opacg/html/circle/php/mail.php",null,null,obj);
		}
		else
		{
			ajaxToRCP(gArr,recPassAndEmailOK,null,null,null,obj);
		}
	}
}

function recPassAndEmailOK(x,obj)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();
	eval(x.responseText);*/
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
		arg.message='ПАРОЛЬ ИЗМЕНЕН';
		//arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Ваш '+obj.title+' изменен.'});
		if(obj.field == "AA")
		{
			p.text(' На Ваш электронный адрес высланы новые регистрационные данные.');
		}
	}
}

/*--------конец Настройки личного кабинета---------*/

/**/
function KeyEsc(e)/*запуск функций по нажатию клавиш*/
{
	var Src=getSrc(e);
	var Key=getCode(e);
	if(Key==27)
		delReglayer(e);
	else
		return;
}

/*авторизация в слое*/

function createAuthLayer(ind)/*создание слоя с формой авторизации из предварительных настроек*/
{
	delLayerWin();
	document.body.style.overflow="hidden";
	var rdiv=take('reglayerform');
	if(rdiv.n == null)
		rdiv=take(document.body).create('div',{id:'reglayerform',onkeyup:'KeyEsc', onmousedown:'delReglayer'});
	rdiv.n.innerHTML="";
	var rrdiv=rdiv.create('div',{id:'reglayercont',className:'auth'});
	rrdiv.create('span',{title:'Закрыть',id:'dellayerform',className:'del',onmousedown:'delReglayer'});
	var rcdiv=rrdiv.create('div',{id:'reglayercontinner'});
	rcdiv.create('div',{id:'regformtitle',textNode:titleauthform});
	if(typeof noteauthform != "undefined")
		rcdiv.create('div',{id:'noteauthform',textNode:noteauthform});
	var div1=rcdiv.create('div');
	div1.create('span',{className:'reglabel required',textNode:titlelogin});
	var div2=rcdiv.create('div');
	div2.create('input',{type:'text',id:'login','value':''});
	var div3=rcdiv.create('div');
	div3.create('span',{className:'regnote',textNode:titleloginnote});
	
	var div11=rcdiv.create('div');
	div11.create('span',{className:'reglabel required',textNode:titlepassword});
	var div21=rcdiv.create('div');
	div21.create('input',{type:'password',id:'password','value':''});
	var div31=rcdiv.create('div');
	div31.create('span',{className:'regnote',textNode:titlepasswordnote});
	if(typeof noteauthformbutton != "undefined")
		rcdiv.create('div',{id:'noteauthformbutton',textNode:noteauthformbutton});
	var div111=rcdiv.create('div');
	div111.create('input',{type:'button',className:'button',value:titleauthformbutton,onmousedown:'doAuthorization'});
	var div211=rcdiv.create('div');
	div211.create('span',{className:'reglabel required',textNode:'Обязательно к заполнению'});
	if(typeof ind != "undefined")
	{
		div211.create('input',{type:'hidden',id:'change_search_string',value:ind});
	}
	var div22=rcdiv.create('div');
	div22.create('span',{className:'a u',textNode:'Забыли пароль?',onmousedown:'callChangePassWin'});
	setTimeout(function()
	{
		take('login').n.focus();
	}, 100);
}

function callChangePassWin()/*добавление слоя восстановления пароля в форме авторизации*/
{
	var cont=take('reglayercontinner');
	if(take('forgotpass').n==null)
	{
		var doc=cont.create('div',{id:'forgotpass'});
		var div=doc.create('div');
		div.create('span',{className:'reglabel required',textNode:titleforgotpass});
		var div2=doc.create('div');
		div2.create('input',{type:'text',id:'email','value':''});
		var div3=doc.create('div');
		div3.create('span',{className:'regnote',textNode:titleforgotpassnote});
		var div4=doc.create('div');
		div4.create('input',{type:'button',className:'button',value:titleforgotpassbutton,onmousedown:'callChangePass'});
	}
}

/*регистрация в слое*/

function castToUpper(o)/*action "привести содержимое поля к верхнему регистру*/
{
	return o.toUpperCase();
}

function cutToAt(o)/*action "взять данные из поля AI-email и обрезать до знака @*/
{
	return o.substring(0,o.indexOf('@'));
}

function cutToAtUpper(o)/*action "взять данные из поля AI-email и обрезать до знака @ и привести к верхнему регистру*/
{
	return o.substring(0,o.indexOf('@')).toUpperCase();
}

function linkTo(o)/*action переход по ссылке. сейчас не обрабатывается*/
{
	;
}

function delLkSettingslayer()/*кнопка закрыть для слоя настроек ЛК*/
{
	document.body.style.overflow="";
	if(take('settingslayerform').n != null)
		document.body.removeChild(take('settingslayerform').n);
}

function delReglayer(e)/*кнопка закрыть для слоя авторизации/регистрации*/
{
	var etype=getEtype(e);
	var Src=getSrc(e);
	if((Src.id) && ((Src.id == 'reglayerform') || (Src.id == 'dellayerform')) || (etype == 'keyup'))
	{
		document.body.style.overflow="";
		if(take('reglayerform').n != null)
		{
			document.body.removeChild(take('reglayerform').n);
			var calendar=take(document.body).getsign('div',{className:'calendar'});
			var len=calendar.length;
			if(len > 0)
			{
				for(var i=0; i<len; i++)
				{
					document.body.removeChild(calendar[i]);
				}
			}
		}
	}
	else
		return;
}

function createRegLayer()/*создание слоя регистрационной формы из предварительных настроек*/
{
	delLayerWin();
	document.body.style.overflow="hidden";
	var rdiv=take('reglayerform');
	if(rdiv.n == null)
		rdiv=take(document.body).create('div',{id:'reglayerform',onkeyup:'KeyEsc',onmousedown:'delReglayer'});
	rdiv.n.innerHTML="";
	var rrdiv=rdiv.create('div',{id:'reglayercont',className:'reg'});
	rrdiv.create('span',{title:'Закрыть',id:'dellayerform',className:'del',onmousedown:'delReglayer'});
	var rrcdiv=rrdiv.create('div',{id:'reglayercontinner'});
	rrcdiv.create('div',{id:'regformtitle',textNode:titlereglayer});
	if(typeof notereglayer != "undefined")
		rrcdiv.create('div',{id:'notereglayer',textNode:notereglayer});
	var rcdiv=rrcdiv.create('div');
	var rnum=0;
	for(var key in regfromlayer)
	{
		var val=regfromlayer[key];
		var act="";
		if(val.action != "")
			act=val.action[0];
		var note="";
		if(val.note != "")
			note=val.note;
		if(val.type != "hidden")
		{
			var odiv=rcdiv.create('div',{className:'cells'});
			var sdiv=odiv.create('div',{className:'s_'+key+'_s'});
			var fdiv=odiv.create('div',{className:'f_'+key+'_f'});
			var ndiv=odiv.create('div',{className:'n_'+key+'_n'});
			//var sreq=null;
			if(val.type == "checkbox")
			{
				//sreq=fdiv.create('span',{className:'required'});
				var ctext=val.label.split(' с ');
				fdiv.create('input',{type:'checkbox','data-label':ctext[1],id:key,'data-field':key,'data-required':val.required,value:''});
				fdiv.create('label',{textNode:ctext[0]+' с ','for':key});
				fdiv.create('a',{target:'_blank',textNode:ctext[1],href:note,'data-required':val.required});
			}
			else
			{
				//sreq=sdiv.create('span',{className:'required'});
				sdiv.create('span',{className:'reglabel',textNode:val.label,'data-required':val.required});
				if(note != "")
					ndiv.create('span',{className:'regnote',textNode:note});
				if(val.type=="text")
					fdiv.create('input',{className:'text',type:'text','data-label':val.label,id:key,'data-field':key,'data-action':act,'data-required':val.required,'value':''});
				if(val.type == "date")
				{
					fdiv.create('input',{className:'date','data-label':val.label,'data-field':key,type:'text',maxLength:2,'value':'',id:'d'+rnum,onblur:'changeData',onmouseup:'changeData',placeHolder:'ДД','data-required':val.required});
					fdiv.create('input',{className:'date','data-label':val.label,'data-field':key,type:'text',maxLength:2,'value':'',id:'m'+rnum,onblur:'changeData',onmouseup:'changeData',placeHolder:'ММ','data-required':val.required});
					fdiv.create('input',{className:'date','data-label':val.label,'data-field':key,type:'text',maxLength:4,'value':'',id:'y'+rnum,onblur:'changeData',onmouseup:'changeData',placeHolder:'ГГГГ','data-required':val.required});
					fdiv.create('span',{title:'Выбрать из календаря',id:rnum,className:'calc',onmousedown:'CreateCal'});
				}
				if(val.type == "password")
				{
					fdiv.create('input',{type:'password','data-label':val.label,id:'readercode','data-field':key,'data-action':act,'data-required':val.required});
					fdiv.create('input',{type:'password','data-label':val.label,id:'readercode2','data-field':key,'data-action':act,'data-required':val.required});
				}
				if(val.type=="select")
				{
					var sel=fdiv.create('select',{id:key,'data-label':val.label,'data-field':key,'data-required':val.required});
					var opt=val.options;
					sel.create('option',{textNode:'','value':''});
					for(var i=0; i<opt.length; i++)
					{
						sel.create('option',{textNode:opt[i][1],'value':opt[i][0]});
					}
				}
			}
			/*if(val.required=="true")
				sreq.text('*');*/
		}
		else
		{
			rcdiv.create('input',{type:'hidden',id:key,value:val.datafrom,'data-field':key,'data-action':act});
		}
		rnum++;
	}
	var div1=rrcdiv.create('div',{id:'divregformbutton'});
	div1.create('input',{type:'button',className:'button',value:titleregformbutton,onmousedown:'doRegFromLayer'});
	if(typeof noteregformbutton != "undefined")
		rrcdiv.create('div',{id:'noteregformbutton',textNode:noteregformbutton});
	var div2=rrcdiv.create('div',{id:'divtitlerequired'});
	div2.create('span',{className:'reglabel required',textNode:'Обязательно к заполнению'});
	rrdiv.create('input',{type:'hidden',id:'reganswere',value:'. Вы успешно зарегистрировались в системе.'});
	setTimeout(function()
	{
		rrcdiv.getsign('input',{type:'text'})[0].focus();
	}, 100);
}

function doRegFromLayer()/*отправка запроса на регистрацию*/
{
	var tarr=take('reglayercontinner').getsign('input',{className:'text'});
	var darr=take('reglayercontinner').getsign('input',{className:'date'});
	var sarr=take('reglayercontinner').tags('select');
	var parr=take('reglayercontinner').getsign('input',{type:'password'});
	var harr=take('reglayercontinner').getsign('input',{type:'hidden'});
	var carr=take('reglayercontinner').getsign('input',{type:'checkbox'});
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	var validflag=true;
	var WW="ONLINE";
	if(typeof codepointreg != "undefined")
		WW=codepointreg;
	var inputdate='';
	var y1='';
	var m1='';
	var d1='';
	var currdate=Year+''+mm+''+dd;
	var maxdate=(Year+5)+''+mm+''+dd;
	var log="";
	var pass="";
	var fio="";
	var AB=groupcode;
	var gArr=new Array();
	gArr.push(["_action","registrold"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_serviceclass","CATALOGING"]);
	gArr.push(["_service","PARAM"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_login",identif]);
	gArr.push(["arg2",WW]);
	gArr.push(["arg4","USER"]);
	gArr.push(["arg5","NEW"]);
	gArr.push(["arg6","0"]);
	for(var i=0; i<tarr.length; i++)
	{
		if(tarr[i].id!='AB')
		{
			if(tarr[i].id=='AI')
			{
				if(!emailRegular.test(tarr[i].value))
				{
					alert('Неверно введен e-mail!');
					tarr[i].focus();
					validflag=false;
					return;
				}
				else
				{
					gArr.push([tarr[i].id+":",tarr[i].value]);
				}
			}
			else
			{
				if((tarr[i].getAttribute('data-required')=="true")&&(tarr[i].value == ""))
				{
					alert('Поле "'+tarr[i].getAttribute('data-label')+'" не заполнено!');
					tarr[i].focus();
					validflag=false;
					return;
				}
				else
				{
					var val=tarr[i].value;
					var act=tarr[i].getAttribute('data-action');
					if(act != "")
					{
						act=eval(act);
						val=act(val);
					}
					gArr.push([tarr[i].id+":",val]);
					if(tarr[i].id == 'AO')
						fio=val;
					if(tarr[i].id == 'AY')
						log=val;
					if(tarr[i].id == 'AA')
						pass=val;
				}
			}
		}
	}
	for(var i=0; i<sarr.length; i++)
	{
		if((sarr[i].id=='AB')&&(sarr[i].value!=""))
		{
			AB=sarr[i].value;
		}
		else
		{
			if(sarr[i].id!='AB')
			{
				if((sarr[i].getAttribute('data-required')=="true")&&(sarr[i].value==""))
				{
					alert('Заполните поле "'+sarr[i].getAttribute('data-label')+'" из выпадающего списка!');
					sarr[i].focus();
					validflag=false;
					return;
				}
				else
				{
					gArr.push([sarr[i].id+":",sarr[i].value]);
				}
			}
		}
	}
	for(var i=0; i<darr.length; i++)
	{
		if((darr[i].getAttribute('data-required')=="true")&&(darr[i].value==""))
		{
			alert('Поле "'+darr[i].getAttribute('data-label')+'" не заполнено!');
			darr[i].focus();
			validflag=false;
			return;
		}
		else
		{
			if(darr[i].id.indexOf('d') != -1)
				d1=darr[i].value;
			if(darr[i].id.indexOf('m') != -1)
				m1=darr[i].value;
			if(darr[i].id.indexOf('y') != -1)
				y1=darr[i].value;
		}
	}
	if((d1 != "")&&(m1 != "")&&(y1 != ""))
	{
		inputdate=y1+''+m1+''+d1;
		gArr.push(["AX:",inputdate]);
	}
	if(parr.length > 1)
	{
		var c1=parr[0].value;
		var c2=parr[1].value;
		if(cq.length<6)
		{
			alert('Слишком короткий пароль!');
			validflag=false;
			return;
		}
		else if(c1!=c2)
		{
			alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');
			validflag=false;
			return;
		}
		else
		{
			gArr.push(["AA:",c1]);
			if(parr[i].id == 'AA')
				pass=c1;
		}
	}
	for(var i=0; i<harr.length; i++)
	{
		if(harr[i].id!='AB')
		{
			var val="";
			if(harr[i].value != "AX")
				val=take(harr[i].value).n.value;
			else
				val=inputdate;
			var act=harr[i].getAttribute('data-action');
			if(act != "")
			{
				act=eval(act);
				val=act(val);
			}
			gArr.push([harr[i].id+":",val]);
			if(harr[i].id == 'AY')
				log=val;
			if(harr[i].id == 'AA')
				pass=val;
		}
	}
	for(var i=0; i<carr.length; i++)
	{
		if((carr[i].getAttribute('data-required')=="true")&&(!carr[i].checked))
		{
			alert('Подтвердите согласие с '+carr[i].getAttribute('data-label')+'!');
			carr[i].focus();
			validflag=false;
			return;
		}
	}
	gArr.push(["AB:",AB]);
	if(validflag)
	{
		gArr.push(["FG:",currdate]);
		gArr.push(["FB:",maxdate]);
		gArr.push(["AE:","RU"]);
		gArr.push(["FL:",codepointreg]);
		if(typeof notepointreg != "undefined")
			gArr.push(["EN:",notepointreg+'-'+currdate]);
		gArr.push(["AW:","READER"]);
		var str=' var reganswere="'+take('reganswere').n.value+'"; var _typereg="regform"; ';
		var str={};
		str.reganswere=take('reganswere').n.value;
		str._typereg="regform";
		str.fio=fio;
		str.log=log;
		str.pass=pass;
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);
		ajaxToRCP(gArr,openRegistrWin,null,null,null,str);
	}
}

/*конец регистрация в слое*/

/*генерация пароля*/

function rnd(l)
{
	return Math.floor(Math.random() * l);
}

function generatePass(l)
{
	var len=6;
	if(typeof l!="undefined")
		len=l;
	var result = '';
	var symbols = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','W','X','Y','Z',2,3,4,5,6,7,8,9];
	for(i = 0; i < len; i++)
	{
		result += symbols[rnd(symbols.length)];
	}
	return result;
}

/*конец генерация пароля*/

/*смена пароля*/

function callChangePass()/*запрос на смену пароля - генерация пароля*/
{
	var mail=take('email').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
	}
	else
	{
		var pass=generatePass();
		if(IsAlfaDigit(pass))
		{
			var codecont=null;
			if(take('codecont').n!=null)
				codecont=take('codecont');
			else
				codecont=take(document.body).create('input',{type:'hidden',id:'codecont',value:''});
			codecont.n.value=pass;
			checkReaderInfo();
		}
		else
		{
			if(take('codecont').n!=null)
				codecont.n.value="";
			alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
			return;
		}
	}
}

function checkReaderInfo()/*запрос на проверку по введенному email существования записи на читателя*/
{
	if((take('codecont').n!=null)&&(take('codecont').n.value!=""))
	{
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);
		typework="";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
		gArr.push(["_errorhtml","error"]);
		var curDate = new Date();
		var year=curDate.getFullYear();
		var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
		var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
		gArr.push(["_errorhtml","error"]);
		querylist.push(["_service","STORAGE:opacstatd:PersonalVisit"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["userid",identif]);
		querylist.push(["time[0]",year+'01010000']);
		querylist.push(["time[1]",year+''+month+''+day+'0000']);
		querylist.push(["field","AI"]);
		querylist.push(["value",take('email').n.value]);
		querylist.push(["registr[0]",""]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		ajaxToRCP(gArr,callbackcheckReaderInfo);
	}
	else
	{
		alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
		return;
	}
}

function callbackcheckReaderInfo(x)/*запрос на получение информации о читателе*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError('Указанный пользователь в системе не зарегистрирован','index');
	}
	else
	{
		if(typeof response!="undefined")
		{
			if(typeof response[0]._reader_0!="undefined")
			{
				var arr=response[0]._reader_0;
				var eml='';
				var log='';
				for(var i=0; i<arr.length; i++)
				{
					if(arr[i].indexOf('AI:')!=-1)
					{
						var tmp=arr[i].substring(3);
						if(tmp!='N/A')
							eml=tmp;
					}
					if(arr[i].indexOf('AY:')!=-1)
					{
						var tmp=arr[i].substring(3);
						if(tmp!='N/A')
							log=tmp;
					}
				}
				//if((eml!='')&&(eml==take('login').n.value)&&(log!=''))
				if((eml!='')&&(log!=''))
				{
					var loginp=null;
					if(take('loginp').n!=null)
						loginp=take('loginp');
					else
						loginp=take(document.body).create('input',{type:'hidden',id:'loginp',value:''});
					loginp.n.value=log;
					var len=eml.length;
					var gArr=new Array();
					var querylist=new Array();
					gArr.push(["_action","registrold"]);
					gArr.push(["_errorhtml","error"]);
					gArr.push(["_serviceclass","CATALOGING"]);
					gArr.push(["_service","PARAM"]);
					gArr.push(["_numsean",numsean]);
					gArr.push(["_login",identif]);
					gArr.push(["arg4","USER"]);
					gArr.push(["arg5","VIE"]);
					gArr.push(["arg7","AI"]);
					gArr.push(["arg8","FDT"]);
					gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,AI,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+eml+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);
					ajaxToRCP(gArr,openChW);
				}
				else
				{
					WriteError('Указанный пользователь в системе не зарегистрирован','index');
				}
			}
		}
	}
}

function openChW(x)/*запрос на запись нового пароля*/
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
		var arr=answere.split('[END]');
		var isn=""
		var fio="";
		var mail="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].indexOf('[ISN]')!=-1)
			{
				isn=arr[i].substring(arr[i].indexOf('[ISN]')+5);
			}
		}
		chPass(isn);
	}
}

function chPass(isn)/*запись нового пароля*/
{
	if((take('codecont').n!=null)&&(take('codecont').n.value!=""))
	{
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","registrold"]);
		gArr.push(["_errorhtml","error"]);
		gArr.push(["_serviceclass","CATALOGING"]);
		gArr.push(["_service","PARAM"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_login",identif]);
		gArr.push(["arg4","USER"]);
		gArr.push(["arg5","SUP"]);
		gArr.push(["arg6",isn]);
		gArr.push(["AA:",take('codecont').n.value]);
		ajaxToRCP(gArr,openChPassW);
	}
	else
	{
		if(take('codecont').n!=null)
				codecont.n.value="";
			alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
			return;
	}
}

function openChPassW(x)/*отправка нового пароля на электронную почту читателя*/
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
		var protocol=window.location.protocol;
		var host=window.location.host;
		var eml=take('email').n.value;
		var log=take('loginp').n.value;
		var pass=take('codecont').n.value;
		var gArr=new Array();
		gArr.push(["_to",eml]);
		gArr.push(["_fio","fio"]);
		gArr.push(["_subject","Изменение пароля"]);
		gArr.push(["_body","\nЗдравствуйте, Ваш пароль изменен.\nВаши данные для авторизации на сайте "+protocol+"//"+host+"/"+foldername+":\nЛогин: "+log+", Пароль: "+pass+".\n\n"]);
		ajaxToRCP(gArr,confsendOK,"/opacg/html/circle/php/mail.php");
	}
}

function confsendOK(x)
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
		arg.message='ПАРОЛЬ ИЗМЕНЕН';
		arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Ваш пароль изменен. На Ваш электронный адрес высланы новые регистрационные данные.'});
	}
}

/*конец смена пароля*/

function doLibRegistration()/*регистрация - сбор введенных данных*/
{
	var inputdata=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var c1=take('readercode').n.value;
	var c2=take('readercode2').n.value;
	var mail=take('AY').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
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
	else if(take('AY').n.value=="")
	{
		alert('Не введен e-mail!');
		return;
	}
	else if(take('AO').n.value=="")
	{
		alert('Введите фамилию, имя, отчество!');
		return;
	}
	else if(inputdata=="")
	{
		alert('Введите дату рождения!');
		return;
	}
	else if(take('FA').n.options[take('FA').n.selectedIndex].value=="")
	{
		alert('Пол не выбран!');
		return;
	}
	else if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value==""))
	{
		alert('Социальный статус не выбран!');
		return;
	}
	else if(!take('agree').n.checked)
	{
		alert('Вы не выразили согласие с правилами пользования библиотекой!');
		return;
	}
	else
	{
		var curDate=new Date();
		var Year=curDate.getFullYear();
		var maxYear=Year+5;
		var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
		var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
		var gArr=new Array();
		var querylist=new Array();
		var WW="ONLINE";
		if(typeof codepointreg != "undefined")
			WW=codepointreg;
		else
		{
			if(take('FL').n!=null)
				WW=take('FL').n.value;
		}
		gArr.push(["_action","registrold"]);
		gArr.push(["_errorhtml","error"]);
		gArr.push(["_serviceclass","CATALOGING"]);
		gArr.push(["_service","PARAM"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_login",identif]);
		gArr.push(["arg2",WW]);
		gArr.push(["arg4","USER"]);
		gArr.push(["arg5","NEW"]);
		gArr.push(["arg6","0"]);
		gArr.push(["AA:",c1]);
		var ab="";
		if(typeof groupcode != "undefined")
			ab=groupcode;
		else
		{
			if(take('AB').n!=null)
				WW=take('AB').n.value;
		}
		gArr.push(["AB:",ab]);
		gArr.push(["AO:",take('AO').n.value.toUpperCase()]);
		gArr.push(["AX:",inputdata]);
		gArr.push(["FA:",take('FA').n.options[take('FA').n.selectedIndex].value]);
		if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value!=""))
			gArr.push(["FE:",take('FE').n.options[take('FE').n.selectedIndex].value]);
		if((take('EA').n!=null)&&(take('EA').n.options[take('EA').n.selectedIndex].value!=""))
			gArr.push(["EA:",take('EA').n.options[take('EA').n.selectedIndex].value]);
		if((take('EB').n!=null)&&(take('EB').n.options[take('EB').n.selectedIndex].value!=""))
			gArr.push(["EB:",take('EB').n.options[take('EB').n.selectedIndex].value]);
		gArr.push(["FG:",Year+''+mm+''+dd]);
		gArr.push(["FB:",(Year+5)+''+mm+''+dd]);
		gArr.push(["AY:",take('AY').n.value.toUpperCase()]);
		gArr.push(["FU:",take('AY').n.value]);
		gArr.push(["AI:",take('AY').n.value]);
		gArr.push(["AE:","RU"]);
		if(typeof codepointreg != "undefined")
			gArr.push(["FL:",codepointreg]);
		else
		{
			if(take('FL').n!=null)
				gArr.push(["FL:",take('FL').n.value]);
		}
		if(typeof notepointreg != "undefined")
			gArr.push(["EN:",notepointreg+'-'+Year+''+mm+''+dd]);
		else
		{
			if(take('EN').n!=null)
				gArr.push(["EN:",take('EN').n.value+'-'+Year+''+mm+''+dd]);
		}
		gArr.push(["AW:","READER"]);
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);
		ajaxToRCP(gArr,openRegistrWin);
	}
}

/*конец онлайн регистрация читателей*/