/*ютф*/
var codeMenu="";
var ordered=false;
var loginvalue="FU";
var extravalue="OFF";
var passwordvalue="OFF";
var fio="";
var protocol=window.location.protocol;
var host=window.location.host;
var order="";
var readercode="";
var mail="";
var readerid="";
var status="";
var modeed="";
var ided="";
var startdate="";
var enddate="";
var codeaccess="";
var accessor="";
var period="";
var agreement="";
var staccess="link";

function showOrderWin(o,rdb,ind)
{
	typework="";
	var msg='';
	var service='STORAGE:opacholdd:NewHoldRecord';
	var version='1.3.0';
	if(typeof o != "string")
	{
		if(o.parentNode.parentNode!=null)
			scrollobj=o.parentNode.parentNode;
		if(o.parentNode.className.indexOf('_')!= -1)
			codeMenu=o.parentNode.className.substring(1);
		else
			codeMenu=o.parentNode.className;
	}
	else
	{
		if(typeof _codemenu != "undefined")
		{
			codeMenu=_codemenu;
		}
		else
		{
			codeMenu=o;
		}
	}
	if(codeMenu=='043')
		msg='Заказать документ';
	if(codeMenu=='058')
		msg='Показать онлайн';
	if(codeMenu=='069')
		msg='Показать онлайн (только внутри библиотеки)';
	if(codeMenu=='059')
		msg='Заказать онлайн доступ';
	if(codeMenu=='066')
	{
		msg='Заказать на биржу';
		service='STORAGE:opacesd:OrderToStock';
		version='1.0.0';
	}
	var arg={'cls':'dialog2','message':msg,'target':self};
	showLayerWin('orderwin',arg);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	if(codeMenu!='066')
	{
		querylist.push(["_service","STORAGE:opacholdd:Setting"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["toDo","getCommon"]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		querylist.length=0;
	}
	querylist.push(["_service",service]);
	querylist.push(["_version",version]);
	querylist.push(["session",numsean]);
	/*querylist.push(["id",identif]);*/
	querylist.push(["iddb",rdb]);
	querylist.push(["idrec",ind]);
	querylist.push(["codeMenu",codeMenu]);
	querylist.push(["$codeMenu",codeMenu]);
	//querylist.push(["copyform","SEE7BB"]);
	querylist.push(["stage",0]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if(codeMenu!='066')
		ajaxToRCP(gArr,openOrderWin);
	else
		ajaxToRCP(gArr,openRialtoWin);
}

function openRialtoWin(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	try
	{
		eval(x.responseText);
	}
	catch(e)
	{
		var error={};
		error._message_0="Данный документ для заказа недоступен.";
		error._action_1="";
	}
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var docc=take('orderwinform');
		docc.n.innerHTML="";
		var doc=docc.create('div',{id:'ordercontainer'});
		var getfree="";
		var iddbo="";
		var idrec="";
		var routform="";
		for(var arg in response[0]._stage0_0)
		{
			var value=response[0]._stage0_0[arg];
			if(arg=="_free")
				getfree=value;
			if(arg=="_iddb")
				iddbo=value;
			if(arg=="_idrec")
				idrec=value;
			if(arg=="_outform")
				routform=value;
			if(arg.indexOf('_authorization_')!=-1)
			{
				if(typeof value._login!="undefined")
					loginvalue=value._login;
				if(typeof value._extra!="undefined")
					extravalue=value._extra;
				if(typeof value._password!="undefined")
					passwordvalue=value._password;
			}
		}
		doc.create('input',{type: 'hidden',id:'getfree',name:'getfree',value:getfree});
		doc.create('input',{type: 'hidden',id:'iddbo',name:'iddbo',value:iddbo});
		doc.create('input',{type: 'hidden',id:'idrec',name:'idrec',value:idrec});
		doc.create('input',{type: 'hidden',id:'codeMenu',name:'codeMenu',value:codeMenu});
		doc.create('div',{className:'wrapped_',textNode:'Информация о документе',onmousedown:'function(){showHide1(this)}'});
		doc.create('div',{textNode:routform,className:'expl'});
		flag45=findFlag45();
		if(flag45)
		{
			var cont=doc.create('div',{id:'cdrcont',className:'expl'});
			var contcdr=cont.create('p',{style:{clear:'both'}});
			contcdr.create('span',{className:'leftred',textNode:'Код читателя:'});
			contcdr.create('input',{className:'stage1',type:'text',maxLength:50,value:'',id:'cdr_'+loginvalue});
			if(extravalue!="OFF")
			{
				cont.create('p',{textNode:'или',style:{marginLeft:'215px'}});
				var contextra=cont.create('p',{style:{clear:'both'}});
				contextra.create('span',{className:'leftred',textNode:'Дополнительный критерий:'});
				contextra.create('input',{className:'stage1',type:'text',maxLength:50,value:'',id:'extra_'+extravalue});
			}
			var contnext=cont.create('p',{style:{marginLeft:'210px',clear:'both'}});
			contnext.create('input',{type:'button',className:'button2',value:'Далее',id:'icdrnext',onmousedown:'function(){callRialtoStages(1)}'});
		}
		else
		{
			callRialtoStages(1);
		}
	}
}

function callRialtoStages(stage)
{
	typework="";
	var loggin=identif;
	var sign="";
	if(flag45)
	{
		if(take('cdr_'+loginvalue).n!=null)
		{
			if(take('cdr_'+loginvalue).n.value=="")
			{
				if((take('extra_'+extravalue).n!=null)&&(take('extra_'+extravalue).n.value!=""))
				{
					loggin=take('extra_'+extravalue).n.value;
					sign="extra";
				}
				else
				{
					alert('Введите код читателя или дополнительный критерий!');
					return;
				}
			}
			else
			{
				loggin=take('cdr_'+loginvalue).n.value;
				sign="login";
			}
		}
		else
		{
			if(typeof _reader!="undefined")
			{
				loggin=_reader;
				sign="login";
			}
		}
	}
	else
	{
		loggin=eval(login);
		sign="login";
	}
	var iddbo=take('iddbo').n.value;
	var idrec=take('idrec').n.value;
	var getfree=take('getfree').n.value;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacesd:OrderToStock"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["iddb",iddbo]);
	querylist.push(["idrec",idrec]);
	querylist.push(["codeMenu",codeMenu]);
	querylist.push([sign,loggin]);
	if(stage!=1)
	{
		;
	}
	querylist.push(["stage",stage]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,stagesRialtoView);
}

function stagesRialtoView(x)
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
		var doc=take('ordercontainer');
		var oper=take('opercontainer');
		var codeaction=[];
		var codetitle=[];
		var dateord=[];
		var numberdays="";
		var maxdays="";
	}
	for(var key in response[0])
	{
		var value=response[0][key];
		if(key.indexOf("_stage1_")!=-1)
		{
			for(var arg in value)
			{
				var val=value[arg];
				if(arg=="_warning")
				{
					doc.create('div',{textNode:val,className:'warn'});
					return;
				}
				else
				{
					if(arg.indexOf("_reader_")!=-1)
					{
						var arr=val;
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i].indexOf('AI:')!=-1)
								mail=arr[i].substring(3);
							else if(arr[i].indexOf('AO:')!=-1)
								fio=arr[i].substring(3);
							else
								;
						}
						if(take('cdrcont').n!=null)
						{
							take('cdrcont').hide();
						}
						doc.create('div',{className:'wrapped',textNode:'Информация о читателе',onmousedown:'function(){showHide1(this)}'});
						var div=doc.create('div',{className:'expl',style:{display:'none'}});
						var p=div.create('p',{style:{clear:'both'}});
						p.create('span',{className: 'leftred', textNode:'ЧИТАТЕЛЬ: '});
						p.create('span',{textNode:fio});
						var p2=div.create('p',{style:{clear:'both'}});
						p2.create('span',{className: 'leftred', textNode:'E-MAIL: '});
						p2.create('span',{textNode:mail});
					}
					if(arg.indexOf("_moveAction_")!=-1)
					{
						codeaction.push(val._codeAction);
						codetitle.push(val._title);
					}
					if(arg.indexOf("_dateOrd")!=-1)
					{
						dateord.push(val);
					}
					if(arg.indexOf("_numberDays")!=-1)
					{
						numberdays=val;
					}
					if(arg.indexOf("_maxDays")!=-1)
					{
						maxdays=val;
					}
					if(oper.n==null)
						oper=doc.create('div',{className:'expl',id:'opercontainer'});
					else
						oper.n.innerHTML="";
					oper.create('input',{type:'hidden',id:'oper66',name:'oper66',value:codetitle[0],className:codeaction[0]});
				}
			}
		}
	}
}

function openOrderWin(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	try
	{
		eval(x.responseText);
	}
	catch(e)
	{
		var error={};
		error._message_0="Данный документ для заказа недоступен.";
		error._action_1="";
	}
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var docc=take('orderwinform');
		docc.n.innerHTML="";
		var doc=docc.create('div',{id:'ordercontainer'});
		var counted=0;
		var countc=0;
		var getfree="";
		var getfreeed="";
		var geted="";
		var geturl="";
		var outform="";
		var found="";
		var warning="";
		var iddbo="";
		var idbr="";
		var ed=[];
		var copies=[];
		var codeMenu="043";
		if(typeof _codeMenu!="undefined")
			codeMenu=_codeMenu;
		if((codeMenu=="059")||(codeMenu=="058")||(codeMenu=="069"))
		{
			ordered=true;
		}
		else
			ordered=false;
		for(var val in response[0]._common_0)
		{
			var item=response[0]._common_0[val];
			if(val=="_login")
			{
				loginvalue=item;
			}
			if(val=="_extra")
				extravalue=item;
			if(val=="_password")
				passwordvalue=item;
		}
		for(var arg in response[1]._stage0_0)
		{
			var value=response[1]._stage0_0[arg];
			if(arg=="_free")
				getfree=value;
			if(arg=="_iddb")
				iddbo=value;
			if(arg=="_idbr")
				idbr=value;
			else if(arg=="_freeED")
				getfreeed=value;
			else if(arg=="_urlED")
				geturl=value;
			else if(arg=="_outform")
				outform=value;
			else if(arg=="_found")
				found=value;
			else if(arg=="_warning")
				warning=value;
			else if(arg.indexOf('_ed_')!=-1)
			{
				ed[counted]=[];
				if(typeof value._idEd!="undefined")
					ed[counted].idEd=value._idEd;
				if(typeof value._supplier!="undefined")
					ed[counted].supplier=value._supplier;
				if(typeof value._license!="undefined")
					ed[counted].license=value._license;
				if(typeof value._free!="undefined")
					ed[counted].free=value._free;
				if(typeof value._price!="undefined")
					ed[counted].price=value._price;
				counted++;
			}
			else
			{
				if(arg.indexOf('_copies')!=-1)
				{
					copies[countc]=[];
					if(typeof value._copy!="undefined")
						copies[countc].copy=value._copy;
					if(typeof value._shifr!="undefined")
						copies[countc].shifr=value._shifr;
					if(typeof value._inventory!="undefined")
						copies[countc].inventory=value._inventory;
					if(typeof value._barcode!="undefined")
						copies[countc].barcode=value._barcode;
					if(typeof value._location!="undefined")
						copies[countc].location=value._location;
					countc++;
				}
			}
		}
		if(warning=="")
		{
			if(ed.length>0)
			{
				var isuppliers=doc.create('div',{className:'expl',id:'isuppliers',style:{display:'none'}});
				isuppliers.create('span',{className: 'leftred', textNode:'Поставщик: '});
				if(ed.length>1)
				{
					var sel=isuppliers.create('select',{onchange:'function(){callStages(3)}'});
					//sel.create('option',{value:'',textNode:''});
					for(var i=0; i<ed.length; i++)
					{
						if(i==0)
							sel.create('option',{value:ed[i].idEd,className:ed[i].supplier,textNode:ed[i].supplier+' цена: '+ed[i].price+' доступно: '+ed[i].free+' из: '+ed[i].license,selected:'selected'});
						else
							sel.create('option',{value:ed[i].idEd,className:ed[i].supplier,textNode:ed[i].supplier+' цена: '+ed[i].price+' доступно: '+ed[i].free+' из: '+ed[i].license});
					}
				}
				else
				{
					isuppliers.create('span',{className:ed[0].supplier,textNode:ed[0].supplier+' цена: '+ed[0].price+' доступно: '+ed[0].free+' из: '+ed[0].license,id:ed[0].idEd});
				}
			}
			doc.create('input',{type: 'hidden',id:'getfree',name:'getfree',value:getfree});
			doc.create('input',{type: 'hidden',id:'getfreeed',name:'getfreeed',value:getfreeed});
			doc.create('input',{type: 'hidden',id:'geturl',name:'geturl',value:geturl});
			doc.create('input',{type: 'hidden',id:'geted',name:'geted',value:counted});
			doc.create('input',{type: 'hidden',id:'found',name:'found',value:found});
			doc.create('input',{type: 'hidden',id:'iddbo',name:'iddbo',value:iddbo});
			doc.create('input',{type: 'hidden',id:'idbr',name:'idbr',value:idbr});
			doc.create('input',{type: 'hidden',id:'codeMenu',name:'codeMenu',value:codeMenu});
			doc.create('div',{className:'wrapped_',textNode:'Информация о документе',onmousedown:'function(){showHide1(this)}'});
			doc.create('div',{textNode:outform,className:'expl'});
			if(found=="1")
			{
				if(countc > 0)
				{
					var div=doc.create('div',{className:'expl'});
					var tab=div.create('table',{style:{width:'100%'}})
					var th=tab.create('thead');
					var tr=th.create('tr');
					tr.create('td',{textNode:'Шифр хранения',style:{padding:'5px'}});
					tr.create('td',{textNode:'Инвентарный номер',style:{padding:'5px'}});
					tr.create('td',{textNode:'Код',style:{padding:'5px'}});
					tr.create('td',{textNode:'Статус',style:{padding:'5px'}});
					var tb=tab.create('tbody');
					var cls='w';
					for(var i=0; i<countc; i++)
					{
						if((i % 2)==0)
							cls='#fff';
						else
							cls='#f6f6f6';
						if(typeof copies[i]!="undefined")
						{
							var tr1=tb.create('tr',{style:{background:cls}});
							tr1.create('td',{textNode:copies[i].shifr,style:{textAlign:'center',padding:'5px'}});
							tr1.create('td',{textNode:copies[i].inventory,style:{textAlign:'center',padding:'5px'}});
							tr1.create('td',{textNode:copies[i].barcode,style:{textAlign:'center',padding:'5px'}});
							tr1.create('td',{textNode:copies[i].location,style:{textAlign:'center',padding:'5px'}});	
						}
					}
				}
				flag45=findFlag45();
				var flag72=findFlag72(iddbo);
				if(flag45)
				{
					var cont=doc.create('div',{id:'cdrcont',className:'expl'});
					var contcdr=cont.create('p',{style:{clear:'both'}});
					contcdr.create('span',{className:'leftred',textNode:'Код читателя:'});
					contcdr.create('input',{className:'stage1',type:'text',maxLength:50,value:'',id:'cdr_'+loginvalue});
					if(extravalue!="OFF")
					{
						cont.create('p',{textNode:'или',className:'ml215x'});
						var contextra=cont.create('p',{style:{clear:'both'}});
						contextra.create('span',{className:'leftred',textNode:'Дополнительный критерий:'});
						contextra.create('input',{className:'stage1',type:'text',maxLength:50,value:'',id:'extra_'+extravalue});
					}
					if(flag72)
					{
						var contreg=cont.create('p',{style:{clear:'both'}});
						contreg.create('span',{className:'leftred',textNode:'Если вы не являетесь читателем библиотеки, зарегистрируйтесь:'});
						contreg.create('input',{type:'button',className:'button3',value:'Регистрация',id:'regbutton',onmousedown:'function(){goToLocation(\'regform\',\''+replaceSymb(idbr)+'\')}'});
					}
					var contnext=cont.create('p',{style:{marginLeft:'210px',clear:'both'}});
					contnext.create('input',{type:'button',className:'button2',value:'Далее',id:'icdrnext',onmousedown:'function(){callStages(1)}'});
				}
				else
				{
					callStages(1);
				}
			}
		}
		else
		{
			doc.create('div',{className:'warn',id:'warn0',textNode:warning});
		}
	}
}

function callStages(stage)
{
	//alert(stage);
	typework="";
	var loggin=identif;
	var qcall=true;
	if(flag45)
	{
		if(take('cdr_'+loginvalue).n!=null)
		{
			if(take('cdr_'+loginvalue).n.value=="")
			{
				if((take('extra_'+extravalue).n!=null)&&(take('extra_'+extravalue).n.value!=""))
					loggin=take('extra_'+extravalue).n.value;
				else
				{
					alert('Введите код читателя или дополнительный критерий!');
					return;
				}
			}
			else
				loggin=take('cdr_'+loginvalue).n.value;
		}
		else
		{
			if(typeof _reader!="undefined")
				loggin=_reader;
		}
	}
	else
	{
		loggin=eval(login);
	}
	var iddbo=take('iddbo').n.value;
	var idbr=take('idbr').n.value;
	var getfree=take('getfree').n.value;
	var codeMenu=take('codeMenu').n.value;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:NewHoldRecord"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["iddb",iddbo]);
	querylist.push(["idrec",idbr]);
	//if(stage==1)
		querylist.push(["codeMenu",codeMenu]);
	querylist.push(["login",loggin]);
	querylist.push(["free",getfree]);
	if(stage!=1)
	{
		var operation="";
		var method="";
		var bookchair="";
		var isupplier="";
		var inputdata="";
		var customdata="";
		var timeord="";
		if(take('opercontainer').n!=null)
		{
			var obj=take('opercontainer').n.lastChild;
			var arr=[];
			if(obj.nodeName.toLowerCase()=='select')
			{
				arr=obj.options[obj.selectedIndex].value.split('__');
			}
			else
			{
				arr=obj.id.split('__');
			}
			operation=arr[0];
			if(operation!="")
			{
				querylist.push(["operation",operation]);
				if(arr[1]!="")
				{
					method=arr[1];
					querylist.push(["method",method]);
				}
				qcall=true;
			}
			else
				qcall=false
		}
		if(stage!=2)
		{
			if(take('bookchaircontainer').n!=null)
			{
				var obj=take('bookchaircontainer').n.lastChild;
				var str="";
				if(obj.nodeName.toLowerCase()=='select')
				{
					str=obj.options[obj.selectedIndex].value;
				}
				else
				{
					str=obj.id;
				}
				bookchair=str;
				if(bookchair!="")
				{
					querylist.push(["bookchair",bookchair]);
					qcall=true;
				}
				else
					qcall=false;
			}
			if(take('isuppliers').n!=null)
			{
				var obj=take('isuppliers').n.lastChild;
				var str="";
				if(obj.nodeName.toLowerCase()=='select')
				{
					str=replaceSymb1(obj.options[obj.selectedIndex].value);
					modeed=obj.options[obj.selectedIndex].className;
				}
				else
				{
					str=obj.id;
					modeed=obj.className;
				}
				ided=replaceSymb1(str);
				isupplier=replaceSymb1(str);
				if(isupplier!="")
				{
					querylist.push(["idEd",isupplier]);
					qcall=true;
				}
				else
					qcall=false;
			}
			if(stage!=3)
			{
				if(!ordered)
				{
					if(take('dateordcontainer').n!=null)
					{
						var ty=take('y11');
						var tm=take('m11');
						var td=take('d11');
						var tyh=take('yh');
						var tmh=take('mh');
						var tdh=take('dh');
						var y=ty.n.value;
						var m=tm.n.value;
						var d=td.n.value;
						if(y<tyh.n.value)
							y=tyh.n.value;
						if(parseInt(d,10)<10)
							d='0'+parseInt(d,10);
						if(parseInt(m,10)<10)
							m='0'+parseInt(m,10);
						inputdata=y+''+m+''+d;
						customdata=tyh.n.value+''+tmh.n.value+''+tdh.n.value;
						if(parseInt(inputdata,10) < parseInt(customdata,10))
						{
							alert('Введенная дата меньше допустимой!');
							td.n.focus();
							return;
						}
						else
						{
							querylist.push(["dateOrd",inputdata]);
							querylist.push(["$dateOrd",inputdata]);
						}
					}
				}
				else
				{
					var y=take('y111').n.innerHTML;
					var m=take('m111').n.innerHTML;
					var d=take('d111').n.innerHTML;
					inputdata=y+''+m+''+d;
					querylist.push(["dateOrd",inputdata]);
					querylist.push(["$dateOrd",inputdata]);
					var plusday=take('numberdays');
					if(plusday.n.options.length>0)
					{
						var maxday=plusday.n.options[plusday.n.selectedIndex].value;
						var numday=parseInt(d,10)+parseInt(maxday,10)-1;
						if(numday<10)
							numday='0'+numday;
						var controlday=findDay(y,m);
						if(numday <= parseInt(controlday,10))
						{
							inputdata=y+''+m+''+numday;
							d=numday;
						}
						else
						{
							var dday=parseInt(controlday,10)-parseInt(d);
							var dday2=parseInt(maxday,10)-dday;
							var dm=parseInt(m,10)+1;
							if(parseInt(m,10)==12)
							{
								dm=1;
								y=parseInt(y,10)+1;
							}
							d=dday2;
							if(parseInt(d,10)<10)
								d='0'+parseInt(d,10);
							if(parseInt(dm,10)<10)
								dm='0'+parseInt(dm,10);
							inputdata=y+''+dm+''+d;
							m=dm;
						}
						querylist.push(["dateOrd2",inputdata]);
						querylist.push(["$dateOrd2",inputdata]);
					}
				}
				if(stage!=4)
				{
					if(take('timeordcontainer').n!=null)
					{
						var obj=take('timeordcontainer').n.lastChild;
						var str="";
						var sel=take('timeordcontainer').tags('select')[0];
						var sp=take('timeordcontainer').getsign('span',{className:'timeord'})[0];
						//if(obj.nodeName.toLowerCase()=='select')
						if(sel != null)
						{
							//str=obj.options[obj.selectedIndex].value;
							str=sel.options[sel.selectedIndex].value;
						}
						else
						{
							//str=obj.id;
							if(sp != null)
								str=sp.id;
						}
						timeord=str;
						//alert(timeord);
						if(timeord!="")
						{
							querylist.push(["timeOrd",str]);
							qcall=true;
						}
						else
							qcall=false;
					}
					if((take('pages').n!=null)&&(take('pages').n.value!=""))
						querylist.push(["pages",take('pages').n.value]);
					if((take('enote').n!=null)&&(take('enote').n.value!=""))
						querylist.push(["commentAccess",take('enote').n.value]);
					if(take('password_'+passwordvalue).n!=null)
					{
						if(take('password_'+passwordvalue).n.value!="")
						{
							querylist.push(["password",take('password_'+passwordvalue).n.value]);
						}
						else
						{
							alert('Введите пароль!');
							return;
						}
					}
				}
			}
		}
	}
	if((take('ireadermail').n != null)&&(take('ireadermail').n.value != "")&&(take('ireadermail').n.value != "N/A"))
		querylist.push(["email",take('ireadermail').n.value]);
	querylist.push(["stage",stage]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	//alert(qcall);
	//alert(timeord);
	//alert(gArr);
	//if(stage=="5")
	//	qcall=false;
	if(qcall)
		ajaxToRCP(gArr,stagesView);
}

function stagesView(x)
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
		var doc=take('ordercontainer');
		var isuppliers=take('isuppliers');
		var oper=take('opercontainer');
		var bookchaircontainer=take('bookchaircontainer');
		var dateordcontainer=take('dateordcontainer');
		var edateordcontainer=take('edateordcontainer');
		var timeordcontainer=take('timeordcontainer');
		var inext=take('inext');
		var iconfirm=take('iconfirm');
		var codeaction=[];
		var codemethod=[];
		var codetitle=[];
		var bookchair=[];
		var dateord=[];
		var timeord=[];
		var numberdays="";
		var maxdays="";
		var lib="";
		for(var key in response[0])
		{
			var value=response[0][key];
			if(key.indexOf("_stage1_")!=-1)
			{
				for(var arg in value)
				{
					var val=value[arg];
					if(arg=="_warning")
					{
						doc.create('div',{textNode:val,className:'warn'});
						return;
					}
					else
					{
						var warnarr=doc.getsign('div',{className:'warn'});
						var wlen=warnarr.length;
						if(wlen>0)
						{
							for(var i=0; i<wlen; i++)
							{
								take(warnarr[i]).hide();
							}
						}
						if(arg=="_organization")
						{
							lib=val;
						}
						if(arg=="_reader_0")
						{
							var arr=val;
							for(var i=0; i<arr.length; i++)
							{
								if(arr[i].indexOf('AI:')!=-1)
									mail=arr[i].substring(3);
								else if(arr[i].indexOf('AO:')!=-1)
									fio=arr[i].substring(3);
								else
									;
							}
							if(take('cdrcont').n!=null)
							{
								take('cdrcont').hide();
							}
							doc.create('div',{className:'wrapped',textNode:'Информация о читателе',onmousedown:'function(){showHide1(this)}'});
							var div=doc.create('div',{className:'expl',style:{display:'none'}});
							var p=div.create('p',{style:{clear:'both'}});
							p.create('span',{className: 'leftred', textNode:'ЧИТАТЕЛЬ: '});
							p.create('span',{textNode:fio});
							if(lib!="")
							{
								var p1=div.create('p',{style:{clear:'both'}});
								p1.create('span',{className: 'leftred', textNode:'ОРГАНИЗАЦИЯ: '});
								p1.create('span',{textNode:lib});
							}
							var p2=div.create('p',{style:{clear:'both'}});
							p2.create('span',{className: 'leftred', textNode:'E-MAIL: '});
							p2.create('span',{textNode:mail});
						}
						if(arg.indexOf("_eddAction_")!=-1)
						{
							codeaction.push(val._codeAction);
							if(typeof val._codeMethod!="undefined")
							{
								codemethod.push(val._codeMethod);
							}
							codetitle.push(val._title);
						}
						if(arg.indexOf("_moveAction_")!=-1)
						{
							
							codeaction.push(val._codeAction);
							if(typeof val._codeMethod!="undefined")
							{
								codemethod.push(val._codeMethod);
							}
							codetitle.push(val._title);
						}
					}
				}
				if(codeaction.length>0)
				{
					if(bookchaircontainer.n!=null)
						bookchaircontainer.hide();
					if(dateordcontainer.n!=null)
						dateordcontainer.hide();
					if(timeordcontainer.n!=null)
						timeordcontainer.hide();
					if(inext.n!=null)
						inext.hide();
					if(iconfirm.n!=null)
						iconfirm.hide();
					if(oper.n==null)
						oper=doc.create('div',{className:'expl',id:'opercontainer'});
					else
						oper.n.innerHTML="";
					if(!ordered)
						oper.show();
					else
						oper.hide();
					oper.create('span',{className: 'leftred', textNode:'Операция: '});
					if(codeaction.length>1)
					{
						var sel=oper.create('select',{onchange:'function(){callStages(2)}'});
						//sel.create('option',{value:'',textNode:'',selected:'selected'});
						for(var i=0; i<codeaction.length; i++)
						{
							var method="__";
							if(typeof codemethod[i]!="undefined")
							{
								method="__"+codemethod[i];
							}
							sel.create('option',{value:codeaction[i]+method,textNode:codetitle[i]});
						}
					}
					else
					{
						var method="__";
						if(codemethod.length>0)
							method="__"+codemethod[0];
						oper.create('span',{textNode:codetitle[0],id:codeaction[0]+method});
					}
					if(ordered)
					{
						if(isuppliers.n!=null)
						{
							doc.n.insertBefore(isuppliers.n,oper.n);
							isuppliers.show();
						}
					}
				}
			}
			if(key.indexOf("_stage2_")!=-1)
			{
				for(var arg in value)
				{
					var val=value[arg];
					if(arg=="_warning")
					{
						doc.create('div',{textNode:val,className:'warn'});
						return;
					}
					else
					{
						if(arg.indexOf("_bookchair_")!=-1)
						{
							bookchair.push([val._code,val._name]);
						}
					}
				}
				if(bookchair.length>0)
				{
					if(dateordcontainer.n!=null)
						dateordcontainer.hide();
					if(timeordcontainer.n!=null)
						timeordcontainer.hide();
					if(inext.n!=null)
						inext.hide();
					if(iconfirm.n!=null)
						iconfirm.hide();
					if(bookchaircontainer.n==null)
						bookchaircontainer=doc.create('div',{className:'expl',id:'bookchaircontainer'});
					else
						bookchaircontainer.n.innerHTML="";
					if(!ordered)
						bookchaircontainer.show();
					else
						bookchaircontainer.hide();
					bookchaircontainer.create('span',{className: 'leftred', textNode:'Кафедра выдачи: '});
					if(bookchair.length>1)
					{
						var sel=bookchaircontainer.create('select',{onchange:'function(){callStages(3)}'});
						//sel.create('option',{value:'',textNode:'',selected:'selected'});
						for(var i=0; i<bookchair.length; i++)
						{
							sel.create('option',{value:bookchair[i][0],textNode:bookchair[i][1]});
						}
					}
					else
					{
						bookchaircontainer.create('span',{textNode:bookchair[0][1],id:bookchair[0][0]});
						callStages(3);
					}
				}
				
			}
			if(key.indexOf("_stage3_")!=-1)
			{
				for(var arg in value)
				{
					var val=value[arg];
					if(arg=="_warning")
					{
						doc.create('div',{textNode:val,className:'warn'});
						return;
					}
					else
					{
						if(arg.indexOf("_dateOrd")!=-1)
						{
							dateord.push(val);
						}
						if(arg.indexOf("_numberDays")!=-1)
						{
							numberdays=val;
						}
						if(arg.indexOf("_maxDays")!=-1)
						{
							maxdays=val;
						}
					}
				}
				if(dateord.length>0)
				{
					if(timeordcontainer.n!=null)
						timeordcontainer.hide();
					if(inext.n!=null)
						inext.hide();
					if(iconfirm.n!=null)
						iconfirm.hide();
					if(isuppliers.n!=null)
					{
						var obj=take('isuppliers').n.lastChild;
						if(obj.nodeName.toLowerCase()=='select')
						{
							isuppliers.show();
						}
						else
						{
							isuppliers.hide();
						}
					}
					if(dateordcontainer.n==null)
						dateordcontainer=doc.create('div',{className:'expl period',id:'dateordcontainer'});
					else
						dateordcontainer.n.innerHTML="";
					if(ordered)
					{
						dateordcontainer.hide();
						if(edateordcontainer.n==null)
							edateordcontainer=doc.create('div',{className:'expl',id:'edateordcontainer'});
						else
							edateordcontainer.n.innerHTML="";
						var cm=take('codeMenu').n.value;
						if(cm=="058")
						{
							edateordcontainer.create('span',{className: 'leftred', textNode:'В настоящее время докумет: '});
							if(take('getfreeed').n.value=="0" || take('getfreeed').n.value=="#")
								edateordcontainer.create('b',{className:'busy',textNode:'ЗАНЯТ'});
							else
								edateordcontainer.create('b',{className:'free',textNode:'СВОБОДЕН'});
							edateordcontainer.create('br',{clear:'all'});
						}
						edateordcontainer.create('span',{className: 'leftred', textNode:'Доступ будет открыт: '});
						edateordcontainer.create('span',{textNode:dateord[0].substring(6,8),id:'d111'});
						edateordcontainer.text(' . ');
						edateordcontainer.create('span',{textNode:dateord[0].substring(4,6),id:'m111'});
						edateordcontainer.text(' . ');
						edateordcontainer.create('span',{textNode:dateord[0].substring(0,4),id:'y111'});
						edateordcontainer.create('br',{clear:'all'});
						edateordcontainer.create('span',{className: 'leftred', textNode:'Время пользования (дней): '});
						var sel=edateordcontainer.create('select',{id:'numberdays',onchange:'function(){callStages(4)}'});
						var gfred=parseInt(take('getfreeed').n.value,10);
						var ibeg=parseInt(numberdays,10);
						var len=parseInt(maxdays,10)+1;
						for(var i=1; i<len; i++)
						{
							var itext="";
							if(i==1)
							{
								if(gfred==1)
									itext="сегодня";
								else
									itext=i;
							}
							else
								itext=i;
							if(i==ibeg)
								sel.create('option',{value: i, textNode: itext, selected: 'selected'});
							else
								sel.create('option',{value: i, textNode: itext});
						}						
						edateordcontainer.create('br',{clear:'all'});
						edateordcontainer.create('span',{className: 'leftred', textNode:'Уведомить по email: '});
						edateordcontainer.create('input',{type:'text',id:'ireadermail',value:mail});
						edateordcontainer.create('br',{clear:'all'});
						if(cm=="059")
						{
							edateordcontainer.create('span',{className: 'leftred', textNode:'Примечание: '});
							edateordcontainer.create('textarea',{id:'enote',style:{width:'275px'}});
							edateordcontainer.create('br',{clear:'all'});
						}
					}
					else
					{
						dateordcontainer.show();
						dateordcontainer.create('span',{className: 'leftred', textNode:'Дата выполнения заказа: '});
						dateordcontainer.create('input',{className:'date',type:'text',maxLength:2,value:dateord[0].substring(6,8),id:'d11',onblur:'changeData',onmouseup:'changeData'});
						dateordcontainer.create('input',{className:'date',type:'text',maxLength:2,value:dateord[0].substring(4,6),id:'m11',onblur:'changeData',onmouseup:'changeData'});
						dateordcontainer.create('input',{className:'date',type:'text',maxLength:4,value:dateord[0].substring(0,4),id:'y11',onblur:'changeData',onmouseup:'changeData'});
						dateordcontainer.create('span',{title:'Выбрать из календаря',id:'11',className:'calc',onmousedown:'CreateCal'});
						dateordcontainer.create('input',{type:'hidden',value:dateord[0].substring(6,8),id:'dh'});
						dateordcontainer.create('input',{type:'hidden',value:dateord[0].substring(4,6),id:'mh'});
						dateordcontainer.create('input',{type:'hidden',value:dateord[0].substring(0,4),id:'yh'});
						dateordcontainer.create('input',{type:'button',className:'button2',value:'Далее',id:'inext',onmousedown:'function(){callStages(4)}',style:{display:'none'}});
						var opercode="";
						if(take('opercontainer').n!=null)
						{
							var obj=take('opercontainer').n.lastChild;
							var arr=[];
							if(obj.nodeName.toLowerCase()=='select')
							{
								arr=obj.options[obj.selectedIndex].value.split('__');
							}
							else
							{
								arr=obj.id.split('__');
							}
							opercode=arr[0];
						}
						if(opercode=='A005')
						{
							var pdiv=dateordcontainer.create('div',{id:'ipages'});
							pdiv.create('span',{textNode:'страницы',className:'leftred'});
							pdiv.create('input',{value:'',maxLength:'25',id:'pages',className:'date', style: {width: '225px'}});
							pdiv.create('br',{clear:'all'});
							pdiv.create('span',{textNode:'(Введите номера или диапазоны страниц. Пример: 1,2,3,6-9)'});
						}
					}
				}
			}
			if(key.indexOf("_stage4_")!=-1)
			{
				for(var arg in value)
				{
					var val=value[arg];
					if(arg=="_warning")
					{
						doc.create('div',{textNode:val,className:'warn'});
						return;
					}
					else
					{
						if(arg.indexOf("_grid")!=-1)
						{
							timeord.push([val._time1,val._time2]);
						}
					}
				}
				if(timeord.length>0)
				{
					if(inext.n!=null)
						inext.hide();
					if(iconfirm.n!=null)
						iconfirm.hide();
					if(timeordcontainer.n==null)
					{
						if(doc.n!=null)
							timeordcontainer=doc.create('div',{className:'expl',id:'timeordcontainer'});
					}
					else
						timeordcontainer.n.innerHTML="";
					if(!ordered)
						timeordcontainer.show();
					else
						timeordcontainer.hide();
					timeordcontainer.create('span',{className: 'leftred', textNode:'Время выполнения заказа: '});
					if(timeord.length>1)
					{
						var sel=timeordcontainer.create('select',{onchange:'viewConfirm'});
						//sel.create('option',{value:'',textNode:''});
						for(var i=0; i<timeord.length; i++)
						{
							sel.create('option',{value:timeord[i][0],textNode:timeord[i][0]+' - '+timeord[i][1]});
						}
					}
					else
					{
						timeordcontainer.create('span',{className:'timeord',textNode:timeord[0][0]+' - '+timeord[0][1],id:timeord[0][0]});
						viewConfirm();
					}
					timeordcontainer.create('br',{clear:'all'});
					timeordcontainer.create('span',{className: 'leftred', textNode:'Уведомить по email: '});
					timeordcontainer.create('input',{type:'text',id:'ireadermail',value:mail});
					timeordcontainer.create('br',{clear:'all'});
				}
			}
			if(key.indexOf("_stage5_")!=-1)
			{
				if(oper.n!=null)
					oper.hide();
				if(bookchaircontainer.n!=null)
					bookchaircontainer.hide();
				if(dateordcontainer.n!=null)
					dateordcontainer.hide();
				if(edateordcontainer.n!=null)
					edateordcontainer.hide();
				if(timeordcontainer.n!=null)
					timeordcontainer.hide();
				if(iconfirm.n!=null)
					iconfirm.hide();
				var _order="";
				var warnflag=false;
				var torder="";
				var twarning="";
				var tpdelivery="";
				var tdate="";
				var treception="";
				var tcommentaccess="";
				if(typeof value._warning!="undefined")
				{
					twarning=value._warning;
					doc.create('div',{textNode:twarning,className:'warn'});
					warnflag=true;
				}
				if(typeof value._order!="undefined")
				{
					_order=value._order;
				}
				if(typeof value._typeOrder!="undefined")
				{
					torder=value._typeOrder;
				}
				if(typeof value._placeDelivery!="undefined")
				{
					tpdelivery=value._placeDelivery;
				}
				if(typeof value._date!="undefined")
				{
					tdate=value._date;
				}
				if(typeof value._timeReception!="undefined")
				{
					treception=value._timeReception;
				}
				if(typeof value._commentAccess!="undefined")
				{
					tcommentaccess=value._commentAccess;
				}
				if(!warnflag)
				{
					var div=doc.create('div',{className:'expl',id:'orderc'});
					div.create('span',{className: 'leftred', textNode: '№ заказа:'});
					div.create('span',{textNode: _order});
					div.create('br',{clear: 'all'});
					div.create('span',{className: 'leftred', textNode: 'Тип заказа:'});
					div.create('span',{textNode: torder});
					div.create('br',{clear: 'all'});
					if(!ordered)
					{
						div.create('span',{className: 'leftred', textNode: 'Место выдачи:'});
						div.create('span',{textNode: tpdelivery});
						div.create('br',{clear: 'all'});
						div.create('span',{className: 'leftred', textNode: 'Дата выдачи:'});
						div.create('span',{textNode: tdate});
						div.create('br',{clear: 'all'});
						div.create('span',{className: 'leftred', textNode: 'Дата приема заказа:'});
						div.create('span',{textNode: treception});
					}
					else
					{
						if(tcommentaccess!="")
						{
							div.create('span',{className: 'leftred', textNode: 'Примечание: '+tcommentaccess+'.'});
							div.create('br',{clear: 'all'});
						}
						var dtord=_dateOrd.substring(6,8)+'.'+_dateOrd.substring(4,6)+'.'+_dateOrd.substring(0,4);
						var dtord2=_dateOrd2.substring(6,8)+'.'+_dateOrd2.substring(4,6)+'.'+_dateOrd2.substring(0,4);
						/*var d1=value._dateOrd.split('.');
						var d2=value._dateOrd2.split('.');*/
						var span=div.create('span',{textNode: 'Документ будет доступен для ознакомления в разделе '});
						span.create('u',{title: 'Перейти', className: 'blue', onmousedown: 'function(){ordersSearch1("'+_dateOrd+'","'+_dateOrd2+'")}', textNode: 'Список заказов личного кабинета '});
						span.text(' в период с '+dtord+' по '+dtord2+'. ');
						//span.text(' в период с '+value._dateOrd+' по '+value._dateOrd2+'. ');
						var cm=take('codeMenu').n.value;
						if(cm=="059")
						{
							span.text('Даты предоставления доступа к документу могут быть изменены. Информация о выполнении заказа будет отправлена на электронный адрес, указанный при регистрации.');
						}
						if(ordered)
							//setOrderCookie(_order,d1[2]+''+d1[1]+''+d1[0],d2[2]+''+d2[1]+''+d2[0]);
							setOrderCookie(_order,_dateOrd,_dateOrd2);
					}
				}
			}
		}
	}
}

function setOrderCookie(o,d1,d2,idrec,iddb)
{
	if((take('codeMenu').n.value !=null)&&((take('codeMenu').n.value=='058')||(take('codeMenu').n.value=='069'))&&(modeed.toUpperCase()=="FLIPPINGBOOK"))
	{
		var pr=window.location.protocol;
		var fhost=window.location.host;
		var limit=ided.substring(ided.indexOf('://')+3);
		var limit1=limit.substring(limit.indexOf('/')+1);
		pr=ided.substring(0,ided.indexOf('://'));
		fhost=limit.substring(0,limit.indexOf('/'));
		fhost=pr+'://'+fhost;
		var dd1=d1;
		var dd2=d2;
		if(dd1.indexOf('.')!=-1)
		{
			var arr=dd1.split('.');
			dd1=arr[2]+''+arr[1]+''+arr[0];
		}
		if(dd2.indexOf('.')!=-1)
		{
			var arr=dd2.split('.');
			dd2=arr[2]+''+arr[1]+''+arr[0];
		}
		if(dd1.length==8)
			dd1=dd1+'000001';
		if(dd2.length==8)
			dd2=dd2+'235959';
		var gArr=new Array();
		gArr.push(["_order",o]);
		gArr.push(["_nsean",numsean]);
		gArr.push(["_ided",ided]);
		gArr.push(["_identif",identif]);
		gArr.push(["_idrec",idrec]);
		gArr.push(["_iddb",iddb]);
		gArr.push(["_fhost",fhost]);
		gArr.push(["_lim",limit1]);
		gArr.push(["_d1",dd1]);
		gArr.push(["_d2",dd2]);
		ajaxToRCP(gArr,setOrderCookieOk,'link.html');
	}
	else
		return;
}

function setOrderCookieOk(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	/*var gArr=new Array();
	gArr.push(["_patronus",identif]);
	gArr.push(["_idrec",take('idbr').n.value]);
	gArr.push(["_iddb",take('iddbo').n.value]);
	ajaxToRCP(gArr,null,'link.html')*/;
}

function ordersSearch1(d1,d2)
{
	var loggin=identif;
	if(flag45)
	{
		if(take('cdr_'+loginvalue).n!=null)
		{
			if(take('cdr_'+loginvalue).n.value=="")
			{
				if((take('extra_'+extravalue).n!=null)&&(take('extra_'+extravalue).n.value!=""))
					loggin=take('extra_'+extravalue).n.value;
				else
				{
					alert('Введите код читателя или дополнительный критерий!');
					return;
				}
			}
			else
				loggin=take('cdr_'+loginvalue).n.value;
		}
		else
		{
			if(typeof _reader!="undefined")
				loggin=_reader;
		}
		fio="";
	}
	else
	{
		loggin=eval(login);
		if((fio=="")&&(typeof AO !="undefined"))
			fio=AO;
	}
	if(typeof _date0!="undefined")
	{
		d1=_date0;
		d2=_date1;
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_handler",modules["order"].directory+'/order.php']);
	querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	var readertag="reader";
	if(loginvalue=="AY")
		querylist.push(["login",loggin.toUpperCase()]);
	else if(loginvalue=="ET")
		querylist.push(["codenlr",loggin]);
	else
	{
		querylist.push(["reader",loggin]);
	}
	querylist.push(["date[0]",d1]);
	querylist.push(["date[1]",d2]);
	querylist.push(["$date0",d1]);
	querylist.push(["$date1",d2]);
	querylist.push(["$reader",loggin]);
	querylist.push(["$fio",fio]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((fio!="")&&(EP!="")&&(EP!="N/A"))
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
	flagUnload=null;
	callToRCP(gArr);
}

function viewConfirm()
{
	var iconfirm=take('iconfirm');
	if(iconfirm.n==null)
	{
		iconfirm=take('ordercontainer').create('div',{className:'expl',id:'iconfirm'});
		if(passwordvalue!="OFF")
		{
			iconfirm.create('span',{className:'leftred',textNode:'Подтвердить заказ:'});
			iconfirm.create('input',{className:'stage5',type:'password',maxLength:50,value:'',id:'password_'+passwordvalue});
		}
		iconfirm.create('input',{type:'button',className:'url',value:'Заказать',onmousedown:'function(){callStages(5)}'});
	}
	iconfirm.show();
}

function documentMail(x)
{
	var ord="";
	if(typeof x=="string")
	{
		ord=x;
	}
	else
	{
		ord=replaceSymb(take('order').n.value);
	}
	if(take('umail').n!=null)
		mail=take('umail').n.value;
	var str='\n\n';
	str+=protocol+'//'+host+'/link.html?mail=';
	str+=identif;
	str+=',order=';
	str+=replaceSymb(ord);
	str+=',from=ELS';
	str+='\n\n';
	var gArr=new Array();
	gArr.push(["_to",mail]);
	gArr.push(["_subject","Получить доступ к ЭД"]);
	gArr.push(["_body",str]);
	gArr.push(["_type","script"]);
	ajaxToRCP(gArr,mailOk,"/opacg/html/circle/php/mail.php");
}

function mailOk(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	if(take('linkwinform').n!=null)
		delLayerWin();
	var msg='Ссылка отправлена';
	var dispatcher='cleaTMer';
	var arg={'message':msg,'width':'500','height':'400','dispatcher':'cleaTMer'};
	showLayerWin('confirmwin',arg);
	var doc=take('confirmwinform');
	doc.n.innerHTML="";
	doc.create('div',{textNode:"На ваш почтовый адрес отправлена ссылка на документ",style:{margin:'50px 10px 0px 10px',textAlign:'center'}});
	setTMer(500);
}

var TMer=null;

function setTMer(sec)
{
	TMer=setTimeout('ordersSearch1()',sec);
}

function cleaTMer()
{
	if(TMer!=null)
	{
		clearTimeout(TMer);
	}
}

function keyPr(e)
{
	var Key=getCode(e);
	var Src=getSrc(e);
	var stagecls=Src.className;
	if((Key==13)&&(Src.nodeName.toLowerCase()=='input')&&((typeof stagecls !="undefined")&&(stagecls.indexOf("stage")!=-1)))
	{
		if(codeMenu=="066")
			callRialtoStages(stagecls.substring(5));
		else
			callStages(stagecls.substring(5));
		return false;
	}
	else
		return;
}

document.onkeypress = keyPr;
