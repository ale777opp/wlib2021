/*------------------------------ авторизация, регистрация и статистика -------------------------------------*/

function doAuthorization(l,p)/*авторизация*/
{
	var curDate=new Date();
	if(typeof l != "string")
		l=take('login').n.value;
	if(typeof p != "string")
		p=take('password').n.value;
	if((l=="")||(p==""))
	{
		alert("Вы не заполнили все поля или заполнили их неправильно!");
		return;
	}
	typework="authorization";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_logintype","LOGIN"]);
	gArr.push(["_login",trimSpaces(l.toUpperCase())]);
	gArr.push(["_password",trimSpaces(p)]);
	gArr.push(["_auth",curDate.getTime()]);
	gArr.push(["_userinfo","yes"]);
	if(typeof _str != "undefined")
	{
		var str=_str;
		gArr.push(["_showsearchrez","yes"]);
		if(take('change_search_string').n != null)
			str='[bracket]ID '+take('change_search_string').n.value+'[/bracket]';
		if(lockedfilters!="")
		{
			var bstr="";
			farr=[];
			farr=lockedfilters.split('[END]');
			for(var i=0; i<farr.length; i++)
			{
				if(i > 0)
					bstr+=' AND ';
				var val=convertseef(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+val+'[apos][/bracket]';
			}
			str='[bracket]'+str+'[/bracket] AND '+convertseef(bstr);
		}
		gArr.push(["_str",str]);
		if(typeof _showstr != "undefined")
			gArr.push(["_showstr",_showstr]);
		if(typeof _iddb != "undefined")
			gArr.push(["_iddb",_iddb]);
	}
	callToRCP(gArr,"_self",'/'+foldername+'/');
}

function openRegistrWin(x,arg)/*регистрация - проверка создания записи на читателя*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText+"\n"+arg);
	w.document.close();*/
	//return;
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var isn="";
		var tmp=/^0\s*/;
		if(tmp.test(answere))
		{
			isn=answere.substring(answere.lastIndexOf(' ')+1);
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","registrold"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_serviceclass","CATALOGING"]);
			gArr.push(["_service","PARAM"]);
			gArr.push(["_numsean",numsean]);
			gArr.push(["_login",identif]);
			gArr.push(["arg2",""]);
			gArr.push(["arg4","USER"]);
			gArr.push(["arg5","REA"]);
			gArr.push(["arg6",isn]);
			gArr.push(["arg8","FDT_SPACE"]);
			ajaxToRCP(gArr,openRegistrWinOk,null,null,null,arg);
		}
		else
		{
			var error={};
			error._message_0=answere;
			/*error._action_1="Для продления абонемента войдите в личный кабинет и нажмите кнопку НОВЫЙ АБОНЕМЕНТ";*/
			error._action_1="";
			delLayerWin();
			WriteError(error);
		}
	}
}

function openRegistrWinOk(x,obj)/*сообщение об успешной регистрации*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	//return;
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var doc=take('loaderwinform');
		var arr=answere.split('[END]');
		var text1="";
		var mail="";
		var ep="";
		var log="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].substring(0,3)=='AO:')
			{
				text1=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='AY:')
			{
				log=arr[i].substring(3);
				if((typeof obj != "undefined")&&(obj != null)&&(obj != '0'))
					obj.log=log;
			}
			if(arr[i].substring(0,3)=='AI:')
			{
				mail=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='EP:')
			{
				ep=arr[i].substring(3);
			}
		}
		delLayerWin();
		if(typeof obj == "object")
			_typereg=obj._typereg;
		if(typeof _typereg=="undefined")
		{
			var arg={};
			arg.cls='dialog2';
			arg.target=self;
			arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
			arg.dispatcher='reAuth';
			arg.width='500';
			arg.height='400';
			showLayerWin('hiwin',arg);
			var text2=take('reganswere').n.value;
			var doc=take('hiwinform');
			doc.n.innerHTML="";
			var p=doc.create('div',{textNode:'Спасибо, '});
			p.create('span',{textNode: text1});
			p.text(text2);
		}
		else if(_typereg=="regform")
		{
			sendConfirm(text1,mail,obj);
		}
		else if(_typereg=="_promo")
		{
			if(typeof prolongSign !="undefined")
				prolongSign(ep);
		}
		else
		{
			if(typeof sendBill !="undefined")
				sendBill(text1,mail);
		}
	}
}

function sendConfirm(fio,mail,obj)/*отправка по электронной почте сообщения читателю с регистрационными данными*/
{
	var log="";
	if(take('AY').n != null)
		log=take('AY').n.value;
	if(typeof obj == "object")
		log=obj.log;
	var pass="";
	if(take('readercode').n != null)
		pass=take('readercode').n.value;
	if(typeof obj == "object")
		pass=obj.pass;
	var gArr=new Array();
	gArr.push(["_to",mail]);
	gArr.push(["_subject","Подтверждение регистрации"]);
	gArr.push(["_fio",fio]);
	gArr.push(["_body","\nЗдравствуйте, "+fio+". Вы успешно зарегистрировались в системе.\nВаши регистрационные данные для входа в электронный каталог:\nЛогин: "+log+", Пароль: "+pass+". Для получения читательского билета обратитесь в Отдел регистрации Библиотеки.\n\n"]);
	ajaxToRCP(gArr,confirmsendedOK,"/opacg/html/circle/php/mail.php",null,null,fio);
}

function confirmsendedOK(x,fio)/*сообщение об успешной отправке подтверждения регистрации*/
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
		p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслано подтверждение регистрации.');
	}
}

/*-------------личный кабинет------------*/

function showHistory()/*история поисков*/
{
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A")&&(typeof _auth!="undefined"))
	{
		typework="history";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",modules["history"].directory+'/history.php']);
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		querylist.push(["$fio",AO]);
		if((typeof repointerface != "undefined")&&(typeof mmenu != "undefined")&&(typeof mmenu["058"] != "undefined"))
		{
			querylist.push(["$repoauthor","yes"]);
			if((typeof AL != "undefined")&&(AL != "")&&(AL != "N/A"))
				querylist.push(["$profile",AL]);
		}
		if(typeof _reader!="undefined")
			querylist.push(["$reader",_reader])
		querylist.push(["$typework",typework]);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	}
	else
	{
		goToLocation('history');
	}
}

function myHands()/*книги на руках - ввод штрихкода*/
{
	if(flag45)
	{
		var arg={'cls':'dialog2','message':'КНИГИ НА РУКАХ','target':self,'callback':'callmyHands',callbackname:'Искать','width':'400','height':'250'};
		showLayerWin('orderwin',arg);
		var doc=take('orderwinform');
		doc.n.innerHTML="";
		var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
		cont.create('b',{textNode: 'Код читателя'});
		cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
	}
	else
	{
		callmyHands();
	}
}

function callmyHands()/*книги на руках*/
{
	typework="privat";
	var handler=modules["order"].directory+'/libcard.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
	querylist.push(["_version","1.1.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	var fio="";
	if(typeof _fio !="undefined")
		fio=_fio;
	var code=""
	if(flag45)
	{
		if((take('icdr').n!=null)&&(take('icdr').n.value!=""))
			code=take('icdr').n.value;
		else
		{
			alert('Введите код!');
			return;
		}
	}
	else
	{
		if(typeof AO!="undefined")
			fio=AO;
		if(typeof FU!="undefined")
			code=FU;
	}
	querylist.push(["code",code]);
	querylist.push(["formBibl",'GIVEFORM']);
	querylist.push(["$fio",fio]);
	//if(typeof _reader !="undefined")
		querylist.push(["$reader",code]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
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

function prolong()/*запрос на продление книги*/
{
	typework="";
	var arg={'cls':'dialog2','message':'ПРОДЛИТЬ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:ToProlong"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	//querylist.push(["id",identif]);
	querylist.push(["status",'PROLONG']);
	var arr=take('searchrezult').getsign('input',{type: 'checkbox'});
	var count=0;
	var adb="";
	for(var i=0; i < arr.length; i++)
	{
		if((arr[i].checked)&&(arr[i].id!="mark"))
		{
			querylist.push(["codeDoc["+count+"]",arr[i].value]);
			count++;
		}
	}
	if(count==0)
	{
		alert('Выберите документ!');
		return;
	}
	if(confirm('Изменить дату возврата?'))
	{
		querylist.push(["groupBooks","false"]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		showLayerWin('orderwin',arg);
		ajaxToRCP(gArr,prolongOK);
	}
}

function prolongOK(x)/*подтверждение продления книги*/
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
		take('orderwinform').n.innerHTML='<div class="acenter">Дата возврата изменена.</div>';
		if(typeof _reader != "undefined")
			take('orderwinform').n.innerHTML+='<input type="hidden" id="icdr" value="'+_reader+'"/>';
		setTimeout('callmyHands()',1000);
	}
}

function printClaim()/*печать требований - окно ввода штрихкода*/
{
	if(printTab())
	{
		var arg={'cls':'dialog2','message':'ПЕЧАТЬ ТРЕБОВАНИЙ','target':self,'callback':'printClaimStart',callbackname:'Печать','width':'400','height':'300'};
		showLayerWin('orderwin',arg);
		var doc=take('orderwinform');
		doc.n.innerHTML="";
		var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
		var div1=cont.create('div',{className:'mt10x'});
		var div2=cont.create('div',{className:'mt5x mb20x'});
		div1.create('span',{textNode: 'Код читателя:',className:'redstar'});
		var icdr=div1.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
		div2.create('span',{textNode: 'Место выдачи:'});
		div2.create('input',{type:'text',maxLength:25,value:'',id:'icdr1',name:'icdr1'});
		cont.create('i',{textNode:'Обязательно к заполнению',className:'redstar'});
		icdr.n.focus();
	}
}

function printClaimStart()/*печать требований - запрос информации о читателе*/
{
	if(take('icdr').n.value != "")
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
		querylist.push(["code",take('icdr').n.value]);
		if(take('icdr1').n.value != "")
			querylist.push(["$place",take('icdr1').n.value]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		ajaxToRCP(gArr,callbackprintClaim);
	}
	else
	{
		alert('Не введен код');
		return;
	}
}

function callbackprintClaim(x)/*печать требований*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError();
	}
	else
	{
		var code="";
		var fio="";
		if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
		{
			if(typeof response[0]._reader_0._visitor_0!="undefined")
			{
				var arr=response[0]._reader_0._visitor_0;
				for(var i=0; i<arr.length; i++)
				{
					if(arr[i].indexOf('FU:')!=-1)
					{
						code=arr[i].substring(arr[i].indexOf('FU:')+3);
					}
					if(arr[i].indexOf('AO:')!=-1)
					{
						fio=arr[i].substring(arr[i].indexOf('AO:')+3);
					}
				}
				if(code!="")
				{
					typework="";
					var year=curDate.getFullYear();
					var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
					var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
					var hour=(curDate.getHours()<10)?'0'+(curDate.getHours()):curDate.getHours();
					var minut=(curDate.getMinutes()<10)?'0'+(curDate.getMinutes()):curDate.getMinutes();
					var second=(curDate.getSeconds()<10)?'0'+(curDate.getSeconds()):curDate.getSeconds();
					var gArr=new Array();
					var querylist=new Array();
					gArr.push(["_action","execute"]);
					gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/privat/list/xsl/print_orders.xsl"]);
					gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);
					querylist.push(["_service","STORAGE:opacfindd:Order"]);
					querylist.push(["_version","3.0.0"]);
					var sess=numsean;
					if((take('realnsean').n != null)&&(take('realnsean').n.value != ""))
						sess=take('realnsean').n.value;
					querylist.push(["session",sess]);
					querylist.push(["outform","REQUEST"]);
					querylist.push(["mode","view"]);
					querylist.push(["sortBy","NOTHING"]);
					querylist.push(["sortDirect","asc"]);
					querylist.push(["$height",window.innerHeight-200]);		
					querylist.push(["$code",code]);		
					querylist.push(["$fio",fio]);
					querylist.push(["$date",day+'.'+month+'.'+year]);
					querylist.push(["$time",hour+':'+minut+':'+second]);
					if(typeof _place !="undefined")
						querylist.push(["$place",_place]);
					var arr=take('tableorder').getsign('input',{name:'marker'});
					var count=0;
					for(var i=0; i<arr.length; i++)
					{		
						if(arr[i].checked)
						{
							querylist.push(["query["+count+"]/id",arr[i].value]);
							querylist.push(["query["+count+"]/db",arr[i].className]);
							count++;
						}
					}
					if(count==0)
					{
						alert('Не выбраны записи!');
						return false;
					}
					if(take('excel').n!=null)
						take('excel').n.parentNode.removeChild(take('excel').n);
					var arg={'cls':'dialog2','target': self, 'message':'ПЕЧАТЬ ТРЕБОВАНИЙ','divframe':'1','forlinks':'1'};
					delLayerWin();
					showLayerWin('recordswin',arg);
					self.frames["recordswinframe"].document.open();
					self.frames["recordswinframe"].document.close();
					gArr.push(["querylist",prepareQueryString(querylist)]);
					callToRCP(gArr,self.frames["recordswinframe"],"/cgiopac/opacg/settings.exe");
				}
				else
					WriteError();
			}
			else
				WriteError();
		}
		else
			WriteError();
	}
}

function toOrderList(ind)/*запрос на добавление в список литературы*/
{
	typework="";
	var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","add"]);
	querylist.push(["outform","ORDERFORM"]);
	var count=0;
	if(typeof ind!="undefined")
	{
		querylist.push(["query[0]/db",numDB]);
		querylist.push(["query[0]/id",ind]);
		count++;
	}
	else
	{
		var arr=take('searchrezult').getsign('input',{name: 'marker'});
		for(var i=0; i < arr.length; i++)
		{
			if((arr[i].checked)&&(arr[i].id!="mark"))
			{
				querylist.push(["query["+count+"]/db",numDB]);
				querylist.push(["query["+count+"]/id",prepareStr(arr[i].value)]);
				count++;
			}
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return;
	}
	showLayerWin('orderwin',arg);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
	ajaxToRCP(gArr,createMess);
}

function createMess(x)/*сообщение о добавлении в список литературы*/
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
		var str='';
		if(parseInt(response[0]._new)>0)
			str+='<div class="mess">Добавлено записей: <b>'+response[0]._new+'</b>.</div>';
		else
			str+='<div class="mess">Документ уже добавлен в список.</div>';
		str+='<div class="mess">Текущий размер списка: <b>'+response[0]._total+'</b>.</div>';
		str+='<div class="mess">Для просмотра  выбранных записей выберите пункт меню<br/><b>&laquo;СПИСОК ЛИТЕРАТУРЫ&raquo;</b>.</div><br/>';
		take('orderwinform').n.innerHTML=str;
		setTimeout('delLayerWin()',1000);
	}
}

function showOrderList(c,s)/*вывод списка литературы*/
{
	typework="privat";
	var liststartfrom=0;
	var listhowmuch=portion;
	if(s==null)
		s=numsean;
	if(take('portionlist').n!=null)
		listhowmuch=take('portionlist').n.options[take('portionlist').n.selectedIndex].value;
	if(c!=null)
		liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["list"].directory+'/list.php']);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",s]);
	querylist.push(["$session",s]);
	querylist.push(["mode","view"]);
	querylist.push(["outform","ORDERFORM"]);
	querylist.push(["$liststartfrom",liststartfrom]);
	querylist.push(["length",listhowmuch]);
	querylist.push(["$length",listhowmuch]);
	querylist.push(["sortBy","NOTHING"]);
	querylist.push(["start",liststartfrom]);
	if((typeof repointerface != "undefined")&&(typeof mmenu != "undefined")&&(typeof mmenu["058"] != "undefined"))
	{
		querylist.push(["$repoauthor","yes"]);
		if((typeof AL != "undefined")&&(AL != "")&&(AL != "N/A"))
			querylist.push(["$profile",AL]);
	}
	var fio="";
	if(!flag45)
	{
		if(typeof AO!="undefined")
			fio=AO;
	}
	querylist.push(["$fio",fio]);
	if(typeof _reader!="undefined")
		querylist.push(["$reader",_reader])
	querylist.push(["sortDirect","asc"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
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

function showAllLists(c)/*вывод истории сеансов*/
{
	typework="privat";
	numDB=numdbBIBL;
	var liststartfrom=0;
	var listhowmuch=portion;
	if(c==null)
		liststartfrom='';
	else
		liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["alllists"].directory+'/alllists.php']);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","list"]);
	querylist.push(["outform","ORDERFORM"]);
	querylist.push(["length",listhowmuch]);
	querylist.push(["$length",listhowmuch]);
	querylist.push(["sortDirect","desc"]);
	querylist.push(["start",liststartfrom]);
	if((typeof repointerface != "undefined")&&(typeof mmenu != "undefined")&&(typeof mmenu["058"] != "undefined"))
	{
		querylist.push(["$repoauthor","yes"]);
		if((typeof AL != "undefined")&&(AL != "")&&(AL != "N/A"))
			querylist.push(["$profile",AL]);
	}
	var fio="";
	if(!flag45)
	{
		if(typeof AO!="undefined")
			fio=AO;
	}
	querylist.push(["$fio",fio]);
	if(typeof _reader!="undefined")
		querylist.push(["$reader",_reader])
	querylist.push(["$liststartfrom",liststartfrom]);
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

function ordersSearch2()/*окно выбора даты и ввода штрихкода для вывода списка заказов*/
{
	var arg={'cls':'dialog2','message':'Список заказов','target':self,'callback':'openListOfOrders',callbackname:'Искать','width':'500','height':'400'};
	showLayerWin('orderwin',arg);
	var doc=take('orderwinform');
	doc.n.innerHTML="";
	var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
	cont.create('span',{textNode:'Дата выполнения заказа'});
	cont.create('span',{className: 'from', textNode: ' с '});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});
	cont.create('br',{clear:'all'});
	cont.create('br',{clear:'all'});
	cont.create('span',{className: 'to', textNode: ' по '});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});
	if(flag45)
	{
		var div=cont.create('div');
		div.create('b',{textNode: 'Код читателя'});
		var icdr=div.create('input',{type:'text',tabIndex:'1',maxLength:25,value:'',id:'icdr',name:'icdr'});
		if((typeof extra != "undefined")&&(extra != "")&&(extra != "OFF"))
		{
			var div2=cont.create('div');
			div2.create('b',{textNode: 'или Дополнительный критерий'});
			div2.create('input',{type:'text',tabIndex:'2',maxLength:25,value:'',id:'iextra',name:'iextra'});
		}
		if((typeof password != "undefined")&&(password != "")&&(password != "OFF"))
		{
			var div1=cont.create('div');
			div1.create('b',{textNode: 'Пароль'});
			div1.create('input',{type:'password',tabIndex:'2',maxLength:25,value:'',id:'ipassword',name:'ipassword'});
		}
		icdr.n.focus();
	}
}

function openListOfOrders()/*вывод списка заказов после ввода штрихкода*/
{
	typework="privat";
	var loggin=identif.toLowerCase();
	var fio="";
	if(flag45)
	{
		if(take('icdr').n.value!="")
			loggin=take('icdr').n.value;
		else
		{
			alert('Введите код читателя!');
			return;
		}
	}
	else
	{
		loggin=eval(login);
		if(typeof AO!="undefined")
			fio=AO;
	}
	var ty1=take('y1').n.value;
	var tm1=take('m1').n.value;
	var td1=take('d1').n.value;
	var ty2=take('y2').n.value;
	var tm2=take('m2').n.value;
	var td2=take('d2').n.value;
	var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;
	if(inputdata2 < inputdata1)
	{
		alert('Неверно задан временной интервал!');
	}
	else
	{
		var handler=modules["order"].directory+'/order.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		if((typeof login !="undefined")&&(typeof AY !="undefined")&&(login=="AY"))
			querylist.push(["login",loggin.toUpperCase()]);
		else if((typeof login !="undefined")&&(typeof ET !="undefined")&&(login=="ET"))
			querylist.push(["codenlr",loggin]);
		else
			querylist.push(["reader",loggin]);
		querylist.push(["date[0]",inputdata1]);
		querylist.push(["date[1]",inputdata2]);
		querylist.push(["$date0",inputdata1]);
		querylist.push(["$date1",inputdata2]);
		querylist.push(["$reader",loggin]);
		querylist.push(["$fio",fio]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
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
}

function ordersSearch()/*вход в личный кабинет - вывод списка заказов*/
{
	typework="privat";
	if(typeof repointerface != "undefined")
	{
		showOrderList();
	}
	else
	{
		flag45=findFlag45();
		if(flag45)
		{
			ordersSearch2();
		}
		else
		{
			if(typeof flagUnload!="undefined")
				flagUnload=null;
			var inputdata1=Year+''+mm+''+dd;
			var handler=modules["order"].directory+'/order.php';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","php"]);
			gArr.push(["_errorhtml","error1"]);
			gArr.push(["_handler",handler]);
			querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
			querylist.push(["_version","1.0.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["id",identif]);
			if((typeof login !="undefined") && ((login != "FU") || (login == "FU") && (typeof FU != "undefined")))
			{
				var loggin=identif.toLowerCase();
				if(typeof _reader!="undefined")
					loggin=_reader;
				else
					loggin=eval(login);
				if(login=="AY")
					querylist.push(["login",loggin.toUpperCase()]);
				else if(login=="ET")
					querylist.push(["codenlr",loggin]);
				else
					querylist.push(["reader",loggin]);
			}
			else
			{
				//alert((typeof login !="undefined")+' || '+(login != "FU") || (login == "FU")+' || '+(typeof FU != "undefined"));
				alert('Операция невозможна для данного пользователя');
				return;
			}
			querylist.push(["date[0]",inputdata1]);
			querylist.push(["date[1]",inputdata1]);
			querylist.push(["$date0",inputdata1]);
			querylist.push(["$date1",inputdata1]);
			querylist.push(["$reader",loggin]);
			if(typeof AO !="undefined")
				querylist.push(["$fio",AO]);
			gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
			if((typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
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
	}
}

function listPrint()/*печать списка литературы*/
{
	if(printTab())
		window.print();
}

function loadWord()/*выгрузка списка литературы в WORD*/
{
	typework="";
	if(printTab())
	{
		var str=take('excel').n.innerHTML;
		var head='<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ЗАКАЗ</title></head><body>';
		str=head+str+'</body></html>';
		var gArr=new Array();
		gArr.push(["_action","export"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_ext",".rtf"]);
		gArr.push(["_mode","screen"]);
		gArr.push(["_text",str]);
		callToRCP(gArr);
	}
}

function printTab()/*подготовка списка литературы к выгрузке и печати*/
{
	var div;
	if(take('excel').n==null)
		div=take(document.body).create('div',{id: 'excel'});
	else
		div=take('excel');
	div.n.innerHTML="";
	countList();
	var tab=div.create('div',{id: 'tabord'});
	var head=tab.create('div',{style:{textAlign:'center',fontWeight:'bold'},textNode:'Список литературы'});
	var cont=tab.create('ol');
	var elem=take('tableorder').n;
	var arr=elem.childNodes[1].childNodes;
	var count=0;
	for(var i=0; i<arr.length; i++)
	{		
		if(arr[i].className=='checked')
		{
			var text=arr[i].childNodes[2].innerText || arr[i].childNodes[2].textContent;
			cont.create('li',{textNode:text});
			count++;
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return false;
	}
	return true;
}

function listDel()/*удаление помечнной позиции в списке литературы*/
{
	typework="";
	var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","clear"]);
	var arr=take('tableorder').getsign('input',{type: 'checkbox'});
	var count=0;
	var adb="";
	for(var i=0; i < arr.length; i++)
	{
		if((arr[i].checked)&&(arr[i].id!="mark"))
		{
			adb=arr[i].className;
			querylist.push(["query["+count+"]/db",adb]);
			numDB=adb;
			querylist.push(["query["+count+"]/id",arr[i].value]);
			count++;
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return;
	}
	if(confirm('Удалить выбранные записи?'))
	{
		showLayerWin('orderwin',arg);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
		ajaxToRCP(gArr,delMess);
	}
}

function delMess(x)/*вывод списка литературы после удаления позиции*/
{
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var str='';
		str+='<div class="mess">Операция успешно завершена.</div><br/>';
		take('orderwinform').n.innerHTML=str;
		setTimeout('showOrderList()',1000);
	}
}

function closeSession()/*выход из личного кабинета*/
{
	goToLocation('close');
}

function myBooks()/*окно выбора даты для истории выдач*/
{
	var arg={'cls':'dialog2','target': self, 'message':'ИСТОРИЯ ВЫДАЧ','callback':'callReaderHistory','callbackname':'Показать','width':'500','height':'400'};
	showLayerWin('recordswin',arg);
	var doc=take('recordswinform');
	doc.n.innerHTML="";
	var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
	cont.create('span',{textNode:'Дата выполнения заказа'});
	cont.create('span',{className: 'from', textNode: ' с '});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});
	cont.create('br',{clear:'all'});
	cont.create('br',{clear:'all'});
	cont.create('span',{className: 'to', textNode: ' по '});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});
	if(flag45)
	{
		cont.create('b',{textNode: 'Код читателя'});
		var icdr=cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
		icdr.n.focus();
	}
}

function callReaderHistory()/*история выдач*/
{
	var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;
	var code="";
	if(inputdata2 < inputdata1)
	{
		alert('Неверно задан временной интервал!');
		return;
	}
	if(flag45)
	{
		if(take('icdr').n.value!="")
			code=take('icdr').n.value;
		else
		{
			alert('Введите код читателя!');
			return;
		}
	}
	else
	{
		code=FU;
	}
	typework="";
	delLayerWin();
	var arg={'cls':'dialog2','target': self, 'message':'История выдач','divframe':'1','forlinks':'1'};
	showLayerWin('recordswin',arg);
	self.frames["recordswinframe"].document.open();
	self.frames["recordswinframe"].document.close();
	trg=self.frames["recordswinframe"];
	var gArr=new Array();
	gArr.push(["_inputdata1",inputdata1]);
	gArr.push(["_inputdata2",inputdata2]);
	gArr.push(["_code",code]);
	gArr.push(["_height",window.innerHeight-200]);
	callToRCP(gArr,trg,pathhtml+'/_modules/readerhistory/readerhistory.php');
}

/*-------------конец личный кабинет------------*/

/*--------- дополнительные функции -------------*/

/*--------- рейтинги -------------*/

function callBookRating()/*часто выдаваемые книги*/
{
	var ifr=null;
	if(take('nframe').n !=null)
		ifr=take('nframe');
	else
		ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0', marginWidth:'0', border:'0', style:{margin:'0px',padding:'0px',width:'1px',height:'1px'}, id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});
	var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;
	idoc.open();
	idoc.close();
	ifr.n.src=pathhtml+'/_modules/bookrating/_additional/bookrating.php';
	var arg={};
	arg.cls='loader';
	showLayerWin('loader1win',arg);
}

function callEBookRating()/*часто выдаваемые электронные документы*/
{
	var ifr=null;
	if(take('nframe').n !=null)
		ifr=take('nframe');
	else
		ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0', marginWidth:'0', border:'0', style:{margin:'0px',padding:'0px',width:'1px',height:'1px'}, id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});
	var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;
	idoc.open();
	idoc.close();
	ifr.n.src=pathhtml+'/_modules/ebookrating/_additional/ebookrating.php';
	var arg={};
	arg.cls='loader';
	showLayerWin('loader1win',arg);
}

/*--------- конец рейтинги ---------*/

function findInLocal()
{
	typework="authorization";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_logintype","LOGIN"]);
	gArr.push(["_login",(take('AY').n.value).toUpperCase()]);
	gArr.push(["_password",take('readercode').n.value]);
	gArr.push(["_iddb",_iddb]);
	gArr.push(["_id",replaceSymb(_lind)]);
	gArr.push(["_codemenu",_codemenu]);
	callToRCP(gArr,"_self",'/reg');
}

function reAuth()
{
	var flag72=findFlag72(numDB);
	if((flag72)&&(typeof _lind != "undefined"))
	{
		findInLocal();
	}
	else
	{
		goToLocation('index');
	}
}

function reAnswere()
{
	goToLocation('contacts');
}

/*--------- конец дополнительные функции -------------*/

/*------------------------------ конец авторизация, регистрация и статистика -------------------------------------*/