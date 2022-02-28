/*------вывод мероприятий------*/

/*------настройки------*/

var date_now=Year+''+mm+''+dd;/* текущая дата */
var date_from=(Year-1)+''+mm+''+dd;/* дата - годом раньше */
var date_to=(Year+1)+''+mm+''+dd;/* дата - годом позже */
var term="ADE GE '"+date_from+"' AND ADB LE '"+date_to+"' NOT ST 'd' AND SY 'ACTIVITY'";/* вывод всех мероприятий */
var start=0;
var portion=6;/* количество мероприятий на экране - должно быть кратно 3-м */
var iddba='187';/* номер базы данных мероприятий */
var t_label='ATV';/* метка для поиска мероприятия по ключевым словам */
var p_label='APL';/* метка для поиска мероприятия по месту проведения */
var f_format='format';/* справочный файл форматов мероприятий */
var f_label='NC';/* метка для поиска форматов мероприятий */
//var direct_a='asc';/* сортировка asc / desc */
//var sortlabel_a='s1';/* системная сортировочная метка */
var actlogin='ADMIN';/* логин пользователя, которому прописана БД мероприятий и пункт Основного меню 056-Регистрация событий, мероприятий */

/*---конец настройки---*/

function searchEvent(o)/* общий поиск мероприятий */
{
	var termin="";
	var str="";
	typework="";
	if(typeof o != "string")
	{
		if(o.className == 'all')
		{
			termin=term;
			str="ADE GE [apos]"+date_from+"[apos] AND ADB LE [apos]"+date_to+"[apos] NOT ST [apos]d[apos]  AND SY [apos]ACTIVITY[apos]";
		}
		else if(o.className == 'today')
		{
			termin="ADE GE '"+date_now+"' AND ADB LE '"+date_now+"' NOT ST 'd' AND SY 'ACTIVITY'";
			str="ADE GE [apos]"+date_now+"[apos] AND ADB LE [apos]"+date_now+"[apos] NOT ST [apos]d[apos]  AND SY [apos]ACTIVITY[apos]";
		}
		else
		{
			var label="";
			var val="";
			if(o.className == 'unchecked')
			{
				label=o.getAttribute('data-label');
				val=o.innerHTML;
				
				if(val == "")
				{
					alert("Не задан термин для поиска!");
					return;
				}
				else
				{
					termin="("+label+" "+val+") AND SY 'ACTIVITY'";	
					str="[bracket]"+label+" "+val+"[/bracket] AND SY [apos]ACTIVITY[apos]";
				}
			}
			if(o.className == 'call_event')
			{
				var title=take('t_inp');
				var format=take('f_sel');
				var place=take('p_sel');
				var queryarr=[];
				var strarr=[];
				
				if((title.n != null) && (title.n.value != ""))
				{
					queryarr.push("("+title.n.getAttribute('data-label')+" "+title.n.value+")");
					strarr.push("[bracket]"+title.n.getAttribute('data-label')+" "+title.n.value+"[/bracket]");
				}
				
				if((format.n != null) && (format.n.options[format.n.selectedIndex].value != ""))
				{
					queryarr.push("("+format.n.getAttribute('data-label')+" "+format.n.options[format.n.selectedIndex].value+")");
					strarr.push("[bracket]"+format.n.getAttribute('data-label')+" "+format.n.options[format.n.selectedIndex].value+"[/bracket]");
				}
				if((place.n != null) && (place.n.options[place.n.selectedIndex].value != ""))
				{
					queryarr.push("("+place.n.getAttribute('data-label')+" '"+place.n.options[place.n.selectedIndex].value+"')");
					strarr.push("[bracket]"+place.n.getAttribute('data-label')+" [apos]"+place.n.options[place.n.selectedIndex].value+"[apos][/bracket]");
				}
				if((take('y1').n != null) && (take('y1').n.value != ""))
				{
					var date1=take('y1').n.value+''+take('m1').n.value+take('d1').n.value;
					var date2=take('y2').n.value+''+take('m2').n.value+take('d2').n.value;
					if(parseInt(date2,10) < parseInt(date1,10))
					{
						alert("Задан неверный временной интервал!");
						return;
					}
					else
					{
						queryarr.push("ADE GE '"+date1+"' AND ADB LE '"+date2+"' NOT ST 'd'");
						strarr.push("ADE GE [apos]"+date1+"[apos] AND ADB LE [apos]"+date2+"[apos] NOT ST [apos]d[apos]");
					}
				}
				if(queryarr.length > 0)
				{
					termin=queryarr.join(" AND ");
					str=strarr.join(" AND ");
					termin+=" AND SY 'ACTIVITY'";
					str+=" AND SY [apos]ACTIVITY[apos]";
				}
				else
				{
					alert("Недостаточно данных для поиска!");
					return;
				}
			}
		}
	}
	else
	{
		start=o;
		str=take('s_str').n.value;
		termin=prepareTerm(str);
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.4.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["length",portion]);
	querylist.push(["start",start]);
	querylist.push(["$sstart",start]);
	querylist.push(["$llength",portion]);
	querylist.push(["iddb",iddba]);
	querylist.push(["mode","wordSet"]);

	querylist.push(["$str",str]);
	querylist.push(["query/body",termin]);
	querylist.push(["query/outforms[0]","ACTIVITY_WEB1"]);
	querylist.push(["facets[0]/type","terms"]);
	querylist.push(["facets[0]/name","NC"]);
	querylist.push(["facets[0]/field","NC"]);
	querylist.push(["facets[0]/limit","500"]);
	if(typeof direct_a != "undefined")
	{
		if(typeof sortlabel_a != "undefined")
		{
			querylist.push(["query/direct",direct_a]);
			querylist.push(["query/label",sortlabel_a]);
		}
	}
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,searchEventShow);
}
function searchEventShow(x)/* обработка результатов поиска */
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
		take('s_str').n.value=_str;
		var facets_div=take('facets_list');
		var events_div=take('events_list');
		var pages_div=take('pages_list');
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			facets_div.n.innerHTML="";
			events_div.n.innerHTML="";
			pages_div.n.innerHTML="";
			for(var arg in response[0])
			{
				var value=response[0][arg];
				if(arg.indexOf('_facets')!=-1)
				{
					for (var prop in value)
					{
						var v=value[prop]
						if(prop.indexOf('_buckets')!=-1)
						{
							var tr=facets_div.create('div',{className:value._name});
							tr.create('span',{'data-label':value._name,className:'unchecked',textNode:v._value,onmousedown:'function(){searchEvent(this)}'});
							tr.create('i',{className:'td',textNode:v._count});
						}
					}
				}
				if(arg.indexOf('_result_')!=-1)
				{
					var ind=replaceSymb(value._id);
					if(typeof value._ACTIVITY_WEB1_0 != "undefined")
					{
						if(typeof value._ACTIVITY_WEB1_0._AFANNOTTEXT_0 != "undefined")
						{
							var obj=value._ACTIVITY_WEB1_0._AFANNOTTEXT_0;
							var imgsrc=pathimg+'/event.jpg';
							var format='';
							var title='';
							var date='';
							var time='';
							var library='';
							var cost='';
							var age='';
							var slid=events_div.create('div',{className:'activity_slid',id:ind,onmousedown:'function(){showEvent(this)}'});
							for(var prop in obj)
							{
								if(prop.indexOf('_entries_')!=-1)
								{
									var v=obj[prop]._text;
									if(v.indexOf('[SHOW]') != -1)
										imgsrc=v.substring(6);
									if(v.indexOf('[FORMAT]') != -1)
										format=v.substring(8);
									if(v.indexOf('[TITLE]') != -1)
										title=v.substring(7);
									if(v.indexOf('[DATE]') != -1)
										date=v.substring(6);
									if(v.indexOf('[TIME]') != -1)
										time=v.substring(6);
									if(v.indexOf('[LIBRARY]') != -1)
										library=v.substring(9);
									if(v.indexOf('[AGE]') != -1)
										age=v.substring(5);
									if(v.indexOf('[COST]') != -1)
										cost=v.substring(6);
								}
							}
							var banner=slid.create('div',{className:'banner',style:{backgroundImage:'url('+imgsrc+')'}});
							banner.create('span',{className:'format',textNode:format});
							if(age != "")
								slid.create('div',{className:'age',textNode:age});
							slid.create('div',{className:'title',textNode:title});
							slid.create('div',{className:'date',textNode:date});
							if(time != "")
								slid.create('div',{className:'time',textNode:time});
							if(cost != "")
								slid.create('div',{className:'cost',textNode:cost});
							if(library != "")
								slid.create('div',{className:'library',textNode:library});
						}
					}
				}
			}
		
			if(size > parseInt(_llength,10))
			{
				pages_div.n.innerHTML=aPs(parseInt(size,10),parseInt(_sstart,10),parseInt(_llength,10));
			}
			delSearchLayer();
		}
		else
		{
			var indx='search_events_div';
			if(take(indx).n == null)
				indx='events_list';
			createErrorMess(indx);
		}
	}
}

function createErrorMess(ind)/* вывод ошибки */
{
	var div=take(ind);
	var err=take('a_error');
	if(err.n == null)
	{
		err=div.create('div',{id:'a_error',textNode:'Мероприятия не найдены. Измените поисковые данные'});
		div.n.insertBefore(err.n,div.n.firstChild);
	}
	
}

function showEvent(o)/* подробный вывод */
{
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.4.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["length",1]);
	querylist.push(["start",0]);
	querylist.push(["iddb",iddba]);
	querylist.push(["mode","wordSet"]);
	querylist.push(["query/body","ID '"+o.id+"'"]);
	querylist.push(["query/outforms[0]","ACTIVITY_WEB1"]);
	querylist.push(["query/outforms[1]","ACTIVITY_WEB2"]);
	querylist.push(["facets[0]/type","terms"]);
	querylist.push(["facets[0]/name","NC"]);
	querylist.push(["facets[0]/field","NC"]);
	querylist.push(["facets[0]/limit","500"]);
	if(typeof direct_a != "undefined")
	{
		if(typeof sortlabel_a != "undefined")
		{
			querylist.push(["query/direct",direct_a]);
			querylist.push(["query/label",sortlabel_a]);
		}
	}
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,showEventDisplay);
}

function showEventDisplay(x)/* обработка подробного вывода */
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
		if(take('infowinform').n==null)
		{
			var arg={'cls':'dialog2','message': '','cls':'dialog2','width':'99%','height':'99%'};
			showLayerWin('infowin',arg);
		}
		var doc=take('infowinform');
		doc.n.innerHTML="";
		var imgsrc=pathimg+'/event.jpg';
		var format='';
		var title='';
		var date='';
		var time='';
		var library='';
		var cost='';
		var age='';

		for(var arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_result_')!=-1)
			{
				var ind=replaceSymb(value._id);
				if(typeof value._ACTIVITY_WEB1_0 != "undefined")
				{
					if(typeof value._ACTIVITY_WEB1_0._AFANNOTTEXT_0 != "undefined")
					{
						var obj=value._ACTIVITY_WEB1_0._AFANNOTTEXT_0;
						var slid=doc.create('div',{className:'activity_slid'});
						for(var prop in obj)
						{
							if(prop.indexOf('_entries_')!=-1)
							{
								var v=obj[prop]._text;
								if(v.indexOf('[SHOW]') != -1)
									imgsrc=v.substring(6);
								if(v.indexOf('[FORMAT]') != -1)
									format=v.substring(8);
								if(v.indexOf('[TITLE]') != -1)
									title=v.substring(7);
								if(v.indexOf('[DATE]') != -1)
									date=v.substring(6);
								if(v.indexOf('[TIME]') != -1)
									time=v.substring(6);
								if(v.indexOf('[LIBRARY]') != -1)
									library=v.substring(9);
								if(v.indexOf('[AGE]') != -1)
									age=v.substring(5);
								if(v.indexOf('[COST]') != -1)
									cost=v.substring(6);
							}
						}
						var banner=slid.create('div',{className:'banner',style:{backgroundImage:'url('+imgsrc+')'}});
						var b_cont=banner.create('div',{className:'b_cont'});
						if(age != "")
							b_cont.create('div',{className:'age',textNode:age});
						b_cont.create('div',{className:'date',textNode:date});
						if(time != "")
							b_cont.create('div',{className:'time',textNode:time});
						b_cont.create('div',{className:'title',textNode:title});
						b_cont.create('span',{className:'format',textNode:format});
					}
				}
				if(typeof value._ACTIVITY_WEB2_0 != "undefined")
				{
					if(typeof value._ACTIVITY_WEB2_0._AFANNOTTEXT_0 != "undefined")
					{
						var obj=value._ACTIVITY_WEB2_0._AFANNOTTEXT_0;
						var cont=doc.create('div',{className:'activity_cont'});
						var desc_cont=cont.create('div',{className:'desc_cont'});
						var info_cont=cont.create('div',{className:'info_cont'});
						var lib_cont=info_cont.create('div',{className:'lib_cont'});
						var loc_cont=info_cont.create('div',{className:'loc_cont'});
						var cost_cont=info_cont.create('div',{className:'cost_cont'});
						var coll_cont=info_cont.create('div',{className:'coll_cont'});
						if(cost != "")
						{
							cost_cont.create('div',{id:'cost_title',textNode:'Цена'});
							cost_cont.create('div',{className:'cost',textNode:cost});
						}
						if(library != "")
						{
							lib_cont.create('div',{className:'library',textNode:library});
						}

						for(var prop in obj)
						{
							if(prop.indexOf('_entries_')!=-1)
							{
								var v=obj[prop]._text;
								if(v.indexOf('[COLLECTION]') != -1)
								{
									if(take('coll_title').n == null)
										coll_cont.create('div',{id:'coll_title',textNode:'Коллекции'});
									coll_cont.create('div',{className:'collection',textNode:v.substring(12)});
								}
								else if(v.indexOf('[LOCATION]') != -1)
								{
									if(take('loc_title').n == null)
										loc_cont.create('div',{id:'loc_title',textNode:'Адрес'});
									var loc=loc_cont.create('div',{className:'location'});
									loc.n.innerHTML='<a title="Найти на карте" target="_blank" href="http://maps.yandex.ru/?&source=wizgeo&text='+encodeURIComponent(v.substring(10))+'&l=map">'+v.substring(10)+'</a>';
								}
								else if(v.indexOf('[ANONS]') != -1)
									desc_cont.create('div',{className:'anons',textNode:v.substring(7)});
								else if(v.indexOf('[POST]') != -1)
									desc_cont.create('div',{className:'post',textNode:v.substring(6)});
								else if(v.indexOf('[SHOWPOST]') != -1)
								{
									var video_cont=null;
									if(take('video_cont').n == null)
										video_cont=desc_cont.create('div',{id:'video_cont'});
									else
										video_cont=take('video_cont');
									video_cont.create('div',{className:'showpost',textNode:v.substring(10)});
								}
								else if(v.indexOf('[LIVE]') != -1)
								{
									var video_cont=null;
									if(take('video_cont').n == null)
										video_cont=desc_cont.create('div',{id:'video_cont'});
									else
										video_cont=take('video_cont');
									video_cont.create('div',{className:'video',textNode:v.substring(6)});
								}
								else if(v.indexOf('[VIDEO]') != -1)
								{
									var video_cont=null;
									if(take('video_cont').n == null)
										video_cont=desc_cont.create('div',{id:'video_cont'});
									else
										video_cont=take('video_cont');
									video_cont.create('div',{className:'video',textNode:v.substring(7)});
								}
								else if((v.indexOf('[iframe') != -1) || (v.indexOf('[video') != -1))
								{
									var video_cont=null;
									if(take('video_cont').n == null)
										video_cont=desc_cont.create('div',{id:'video_cont'});
									else
										video_cont=take('video_cont');
									video_cont.create('div',{className:'video',textNode:v});
								}
								else if(v.indexOf('[GALLERY]') != -1)
								{
									var gallery_cont=null;
									if(take('gallery_cont').n == null)
										gallery_cont=desc_cont.create('div',{id:'gallery_cont'});
									else
										gallery_cont=take('gallery_cont');
									gallery_cont.create('span',{className:'gallery',style:{backgroundImage:'url('+v.substring(9)+')'}});
								}
								else if(v.indexOf('[gallery]') != -1)
								{
									var gallery_cont=null;
									if(take('gallery_cont').n == null)
										gallery_cont=desc_cont.create('div',{id:'gallery_cont'});
									else
										gallery_cont=take('gallery_cont');
									gallery_cont.create('span',{className:'gallery',style:{backgroundImage:'url('+v.substring(9)+')'}});
								}
								else
									desc_cont.create('div',{className:'text',textNode:v});
							}
						}
					}
				}
			}
		}
		doc.n.innerHTML=parseBB(doc.n.innerHTML);
	}
}

function aPs(s,b,p)/* разбивка на страницы */
{
	var pages="";
	var N1=Math.ceil(s/p);
	if(N1!= 1)
	{
		var N2=Math.ceil(N1/10);
		var N3=Math.ceil((b+1)/p);
		var N4=Math.ceil(N3/10);
		var i1=(N4-1)*10+1;
		var N5=N4*10;
		var i2;
		if(N1>N5)
			i2=N4*10;
		else
			i2=N1;
		if(N4 > 1)
		{
			pages+='<a class="new" href="javascript: nextEvents(this,'+parseInt((N4-2)*10 + 1)+')">&lt;&lt;</a>';
		}
		for(;i1<=i2; i1++)
		{
			if(i1==N3)
			{
				pages+='<span class="now">'+i1+'</span>';
			}
			else
			{
				pages+='<a class="new" href="javascript: nextEvents(this,'+parseInt(i1)+')">'+i1+'</a>';
			}
		}
		if(N2 > N4)
		{
			pages+='<a class="new" href="javascript: nextEvents(this,'+parseInt(N4*10 + 1)+')">&gt;&gt;</a>';
		}
	}
	return pages;
}

function nextEvents(o,c)/* пролистывание */
{
	var startfrom=parseInt(portion,10)*(parseInt(c,10)-1);
	startfrom=startfrom+'';
	searchEvent(startfrom);
}

function createPeriodEvent(ind)/* поиск по дате */
{
	var cont=take(ind).create('div',{className: 'period_event'});
	var beg=cont.create('div',{className: 'beg'});
	beg.create('span',{className: 'from', textNode: 'Начало:'});
	beg.create('input',{className:'date d',size:2,type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});
	beg.create('span',{textNode: '.'});
	beg.create('input',{className:'date m',size:2,type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});
	beg.create('span',{textNode: '.'});
	beg.create('input',{className:'date y',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});
	beg.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});
	var end=cont.create('div',{className: 'end'});
	end.create('span',{className: 'to', textNode: 'Окончание:'});
	end.create('input',{className:'date d',size:2,type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});
	end.create('span',{textNode: '.'});
	end.create('input',{className:'date m',size:2,type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});
	end.create('span',{textNode: '.'});
	end.create('input',{className:'date y',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});
	end.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});
}

function createSearchTitle(ind)/* поиск по ключевым словам */
{
	var cont=take(ind).create('div',{className: 'title_event'});
	var div=cont.create('div',{className: 't_cont'});
	div.create('span',{className: 't_titl', textNode: 'Название мероприятия:'});
	div.create('input',{type:'text',value:'',id:'t_inp','data-label':t_label,placeHolder:'поиск по ключевым словам в названии'});
}

function createFormatEvent(ind)/* справочник форматов */
{
	var cont=take(ind).create('div',{className: 'format_event'});
	var div=cont.create('div',{className: 'f_cont'});
	div.create('span',{className: 'f_titl', textNode: 'Формат мероприятия:'});
	var sel=div.create('select',{id:'f_sel','data-label':f_label});
	sel.create('option',{textNode:'',value:''});
	formatEventSearch();
}

function formatEventSearch()/* запрос на вывод форматов*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_ctype","text/xml; charset=utf-8"]);
	querylist.push(["_service","STORAGE:opacsettingd:HandbookView"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["format","RUSMARC"]);
	querylist.push(["type","AF"]);
	querylist.push(["name[0]",f_format]);
	querylist.push(["_xmlstring","handbook"]);
	flag45=false;
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,formatEventSearchList);
}

function formatEventSearchList(x)/* обработка запроса на вывод форматов*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	var xml = x.responseXML;
	var xmlDoc=xml.documentElement;
	if(xmlDoc==null)
	{
		eval(x.responseText);
		if(typeof error!="undefined")
			WriteError(error);
	}
	else
	{
		var root=getcNode(xmlDoc);
		var arr=root.getElementsByTagName("entry");
		var sel=take('f_sel');
		for(var i=0; i<arr.length; i++)
		{
			sel.create('option',{textNode:arr[i].getAttribute('value'),value:arr[i].getAttribute('value')});
		}
	}
}

function createPlaceEvent(ind)/* место проведения */
{
	var cont=take(ind).create('div',{className: 'place_event'});
	var div=cont.create('div',{className: 'p_cont'});
	div.create('span',{className: 'p_titl', textNode: 'Место проведения:'});
	var sel=div.create('select',{id:'p_sel','data-label':p_label});
	sel.create('option',{textNode:'',value:''});
	placeEventSearch();
}

function placeEventSearch()/* запрос на вывод списка мест*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:List"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["length","500"]);
	querylist.push(["query",""]);
	querylist.push(["iddb",iddba]);
	querylist.push(["label",p_label]);
	querylist.push(["mode","index"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,placeEventSearchList);
}

function placeEventSearchList(x)/* обработка запроса на список мест*/
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
		if(response[0]._indx_0!=null)
		{
			var sel=take('p_sel');
			var j=0;
			for (var key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					sel.create('option',{textNode:value._item.toLowerCase(),value:value._item});
				}
				j++;
			}
		}
	}
}

function delSearchLayer()/* удаление поискового слоя */
{
	if(take('search_events_div').n != null)
	{
		take('events_container').n.removeChild(take('search_events_div').n);
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

function showSearchLayer(o)/* создание поискового слоя */
{
	var par=take('events_container');
	var item=take('bookmarks');
	var next=take('events_list');
	var w=item.getw();
	var sdiv=take('search_events_div');
	if(sdiv.n == null)
		sdiv=par.create('div',{id:'search_events_div'});
	sdiv.n.innerHTML="";
	var tab=sdiv.create('div',{className:'table w100'});
	var row=tab.create('div',{className:'row',id:'search_events_cont'});
	switch(o.className)
	{
		case 'calc':	createPeriodEvent('search_events_cont');
		break;
		case 'dict':	createPlaceEvent('search_events_cont');
		break;
		case 'search':	createPeriodEvent('search_events_cont');
						createSearchTitle('search_events_cont');
						var row1=tab.create('div',{className:'row',id:'search_events_cont1'});
						createFormatEvent('search_events_cont1');
						createPlaceEvent('search_events_cont1');
		break;
		default:
		break;
	}
	var cdiv=sdiv.create('div',{className:'controls_div'});
	cdiv.create('input',{type:'button',value:'Найти',id:'call_event',className:'call_event',onmousedown:'function(){searchEvent(this)}'});
	cdiv.create('input',{type:'button',value:'Закрыть',className:'close_layer',onmousedown:'delSearchLayer'});
	sdiv.setw(w);
}

/*переключатель вкладок*/
function switchTabs(o)
{
	delSearchLayer();
	var bookmarks=take('bookmarks').getsign('div',{className:'tab'});
	for(var i=0; i<bookmarks.length; i++)
	{
		bookmarks[i].removeAttribute('data-aktive');
		if(bookmarks[i] == o)
		{
			bookmarks[i].setAttribute('data-aktive','true');
		}
		else
		{
			bookmarks[i].setAttribute('data-aktive','false');
		}
	}
	if(o.firstChild)
	{
		if((o.firstChild.className == 'all')||(o.firstChild.className == 'today'))
		{
			searchEvent(o.firstChild);
		}
		else
		{
			showSearchLayer(o.firstChild);
		}
	}
}

/*---конец вывод мероприятий---*/