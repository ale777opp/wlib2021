/*------------------------------------для проекта СКК ЛИБНЕТ------------------------------------*/

var culttype='CULTURE';

function addSeeCulture(ind,rdb)/*подробный вывод описания объектов культуры*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["collection"].directory+'/culture.php';
	if(typeof rdb!="undefined")
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","COLLECTION"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["outformList[1]/outform","CULTURE"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$culttype",culttype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showFormatСC(o)/*переключатель типов вывода подробного описания объектов культуры*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatСC('FULLFRMARC');};
						take('bfirst').n.value="Полное описание";
						take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};
						take('bsecond').n.value="Описание объекта культуры";
						take('formattitle').n.innerHTML="RUSMARC";
						culttype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};
						take('bsecond').n.value="Описание объекта культуры";
						take('formattitle').n.innerHTML="Полное описание";
						culttype='FULLFRMARC';
		break;
		case 'CULTURE': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatСC('FULLFRMARC');};
						take('bsecond').n.value="Полное описание";
						take('formattitle').n.innerHTML="Описание объекта культуры";
						culttype='CULTURE';
		break;
		default:break;
	}
}

function showItemСC(i,arg)/*запрос на вывод ссылок в подробном описании объектов культуры*/
{
	showFormatСC(culttype);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	var arr=arg.split("[END]");
	for(var j=0; j<arr.length; j++)
	{
		querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
		querylist.push(["_version","2.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["iddb",numDB]);
		querylist.push(["action","SEEF"]);
		querylist.push(["id",replaceS(arr[j])]);
		querylist.push(["$ind","alinkss"]);
		querylist.push(["outformList[0]/outform","SHOTFRM"]);
		querylist.push(["_history","yes"]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		querylist.length=0;
	}
	ajaxToRCP(gArr,callbackShowItemСC);
}

function callbackShowItemСC(x)/*вывод ссылок в подробном описании объектов культуры*/
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
		var div=take(_ind);
		div.n.innerHTML="";
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			for(var j=0; j<response.length; j++)
			{				
				for (var key in response[j])
				{
					if(key.indexOf('_result_')!=-1)
					{
						var value = response[j][key];
						var ind=replaceSymb(value._id);
						var arrcont=value._SHOTFRM_0;
						for(var i=0; i<arrcont.length;i++)
						{
							if(i==0)
							{
								var text=arrcont[i].replace(/\[b\]/gi,'');
								text=text.replace(/\[\/b\]/gi,'');
								div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeCulture("'+ind+'")};'});
								break;
							}
						}
					}
				}
			}
			take('incdiv').show();
		}
	}
}

var coltype='COLLECTION';

function addSeeCollection(ind,rdb,lab)/*подробный вывод коллекций*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["collection"].directory+'/collection.php';
	if((typeof rdb!="undefined")&&(rdb != null))
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	if(typeof lab !="undefined")
	{
		querylist.push(["iddb",numDB]);
		querylist.push(["start",0]);
		querylist.push(["length",1]);
		querylist.push(["query/body","("+lab+" '"+replaceSlash(prepareStr(ind))+"')"]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
	}
	else
	{
		querylist.push(["iddbIds[0]/id",ind]);
		querylist.push(["iddbIds[0]/iddb",numDB]);
	}
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","COLLECTION"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["outformList[1]/outform","COLLECTION"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$coltype",coltype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showResF(o)/*переключатель типов вывода подробного описания ресурсов*/
{
	showFormatС(o);
}

function showFormatС(o) /*переключатель типов вывода подробного описания коллекций*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('structure_output').hide();
						take('incdiv').visualise();
						take('linkdiv').show();
						take('docsdiv').show();
						take('COLLECTION').show();
						take('FULLFRMARC').show();
						take('RUSMARC').hide();
						take('STRUCTURE').show();
						take('formattitle').n.innerHTML="RUSMARC";
						coltype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('structure_output').hide();
						take('incdiv').visualise();
						take('linkdiv').show();
						take('docsdiv').show();
						take('COLLECTION').show();
						take('FULLFRMARC').hide();
						take('RUSMARC').show();
						take('STRUCTURE').show();
						take('formattitle').n.innerHTML="Полное описание";
						coltype='FULLFRMARC';
		break;
		case 'COLLECTION': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('structure_output').hide();
						take('incdiv').visualise();
						take('linkdiv').show();
						take('docsdiv').show();
						take('COLLECTION').hide();
						take('FULLFRMARC').show();
						take('RUSMARC').show();
						take('STRUCTURE').show();
						take('formattitle').n.innerHTML="Описание";
						coltype='COLLECTION';
		break;
		case 'STRUCTURE': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').hide();
						take('structure_output').show();
						take('incdiv').conceal();
						take('linkdiv').hide();
						take('docsdiv').hide();
						take('COLLECTION').show();
						take('FULLFRMARC').show();
						take('RUSMARC').show();
						take('STRUCTURE').hide();
						take('formattitle').n.innerHTML="Структура";
						coltype='COLLECTION';
		break;
		default:break;
	}
}

function showSeefA(o,db,arg)/*запрос на скрытие/отображение ссылок Включает коллекции*/
{
	var act=arg.replace(/\[quot\]/gi,'"');
	act=act.replace(/\[apos\]/gi,"'");
	act=act.replace(/\[backslash\]/gi,"\\");
	//act=replaceSlash(prepareStr(act));
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",db]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",act]);
	querylist.push(["$ind",o]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackShowSeefA);
}

function callbackShowSeefA(x)/*скрытие/отображение ссылок Включает коллекции*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		;
	}
	else
	{
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			var ind=replaceSymb(_ind);
			take(ind).show();
		}
	}
}

function showItemС(i,db,arg)/*запрос на вывод ссылок в подробном описании коллекций*/
{
	var act=arg.replace(/\[quot\]/gi,'"');
	act=act.replace(/\[apos\]/gi,"'");
	act=act.replace(/\[backslash\]/gi,"\\");
	//act=replaceSlash(prepareStr(act));
	showFormatС(i);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",db]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",act]);
	querylist.push(["$ind","alinkss"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackShowItemС);
}

function callbackShowItemС(x)/*вывод ссылок в подробном описании коллекций*/
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
		var div=take(_ind);
		div.n.innerHTML="";
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var ind=replaceSymb(value._id);
					var arrcont=value._SHOTFRM_0;
					for(var i=0; i<arrcont.length;i++)
					{
						if(i==0)
						{
							var text=arrcont[i].replace(/\[b\]/gi,'');
							text=text.replace(/\[\/b\]/gi,'');
							if(text.indexOf('[/type]')!=-1)
								text=text.substring(text.indexOf('[/type]')+7);
							div.create('p',{textNode:text,className:'b u red f80',onclick:'function(){addSeeCollection("'+ind+'")};'});
							break;
						}
					}
				}
			}
			take('incdiv').show();
		}
	}
}

function showCallResources()/*вывод ресурсов коллекции*/
{
	var obj={};
	obj._str='[bracket]RSR RESOURCE-'+convertseef(this.lastChild.value)+'[/bracket]';
	obj._showstr='<i>Ресурсы коллекции </i> '+this.parentNode.firstChild.innerHTML;
	simpleSearch('RSR',obj);
}

function prefindResources(o)/*запрос на предварительный подсчет количества ресурсов в коллекции*/
{
	var ind=replaceSymb(o);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["queryList[0]/iddb",numDB]);
	querylist.push(["queryList[0]/query","(RSR RESOURCE-"+ind+")"]);
	querylist.push(["queryList[0]/queryId","res_"+o]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackPrefindResources);
}

function callbackPrefindResources(x)/*вывод количества ресурсов в коллекции*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		;
	}
	else
	{
		for (key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('resultList')!=-1)
			{
				var ind=replaceSymb(value._queryId);
				var div=take(ind);
				if(div.n!=null)
					div.n.firstChild.innerHTML=value._size;
			}
		}
	}
}

function findSubStructure(o)/*запрос на вывод краткого описания коллекции на экране структуры*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["$tmp",o.id]);
	querylist.push(["$outform",'COLLECTION']);
	querylist.push(["outformList[0]/outform",'COLLECTION']);
	querylist.push(["iddbIds[0]/id",o.tmp]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,backfindSubStructure,pathactrcp,null,backfindSubStructure,o);
}

function backfindSubStructure(x,o)/*вывод краткого описания коллекции на экране структуры*/
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
		var doc=take('add'+o.id);
		doc.n.innerHTML="";
		doc.n.parentNode.className='minusimg';
		doc.n.parentNode.firstChild.onmousedown=showHideStructure;
		var j=0;
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('result_')!=-1)
			{
				var arr=eval('value._'+_outform+'_0');
				for(var i=0; i<arr.length; i++)
				{
					if((arr[i].indexOf('[SEE') == -1)&&(arr[i].indexOf('[name]') == -1)&&(arr[i].indexOf('[ind]') == -1)&&(arr[i].indexOf('[URL]') == -1))
					{
						var tmp=arr[i];
						var cls='f80';
						if(j==0)
						{
							if(tmp.indexOf('[/type]')!=-1)
								tmp=tmp.substring(tmp.indexOf('[/type]')+7);
							cls='f100 c6';
						}
						doc.create('div',{textNode:tmp,className:'m5x '+cls+' lh160'});
						j++;
					}
				}
			}
		}
		var doctext=doc.n.innerHTML;
		doc.n.innerHTML=parseBB(doctext);
	}
}

function seeCollTreeView(o)/*запрос на вывод структуры коллекции*/
{
	if(take('structure_output').n.hasChildNodes())
	{
		showFormatС('STRUCTURE');
	}
	else
	{
		showFormatС('STRUCTURE');
		take('structure_output').n.innerHTML='<div class="progress small"><div></div></div>';
		//var path='http://194.226.24.48/reports/plugins/collection_hierarchy?db=12&id='+prepareStr(o);
		var title=take('coltitleres').n.value;
		title=title.toUpperCase();
		var obj={};
		obj.id=o;
		var gArr=new Array();
		//gArr.push(["collind",1]);
		gArr.push(["collind",o]);
		gArr.push(["colltitle",title]);
		var path='//'+location.host+''+pathhtml+'/_modules/'+modules["structure"].directory+'/structure.php'
		ajaxToRCP(gArr,backSeeCollTreeView,path,null,backSeeCollTreeView,obj);
	}
}

function backSeeCollTreeView(x,o)/*вывод структуры коллекции*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	//try
	//{
		eval(x.responseText);
		if(typeof error!="undefined")
		{
			WriteError(error);
		}
		else
		{
			var doc=take('structure_output');
			var margin=10;
			doc.n.innerHTML="";
			var count=0;
			for(var key in rezult.collection)
			{
				var value = rezult.collection[key];
				if(value.nm=="undefined")
				{
					alert('Не удалось получить структуру коллекции!');
					return;
				}
				else
				{
					count++;
					var div=doc.create('div',{className:'simpleimg',style:{marginTop:'10px',marginLeft:margin+'px'}});
					var p=div.create('div',{textNode:value.nm,className:'b c6 curs',id:'col'+count+'_'+key,onmousedown:'displaySubStructure',style:{display:'inline-block'}});
					if(((typeof value.afId != "undefined")&&(value.afId != ""))&&((typeof value.size != "undefined")&&(parseInt(value.size,10)>0)))
					{
						var u=div.create('u',{textNode:value.size,title:'Документы',onmousedown:'showCallResources',className:'b c9 ml15x'});
						u.create('input',{type:'hidden',value:value.afId});
					}
					if(o.id==key)
					{
						p.n.className='b red curs';
					}
					if(typeof value.child!="undefined")
					{
						for(var arg in value.child)
						{
							var val = value.child[arg];
							if(typeof val.nm != "undefined")
							{
								count++;
								div.n.className='minusimg';
								var div1=div.create('div',{className:'plusimg',style:{marginTop:'10px',marginLeft:(margin*2)+'px'}});
								var p1=div1.create('div',{textNode:val.nm,className:'b c6 curs',id:'col'+count+'_'+arg,onmousedown:'displaySubStructure',style:{display:'inline-block'}});
								if(((typeof val.afId != "undefined")&&(val.afId != ""))&&((typeof val.size != "undefined")&&(parseInt(val.size,10)>0)))
								{
									var u=div1.create('u',{textNode:val.size,title:'Документы',onmousedown:'showCallResources',className:'b c9 ml15x'});
									u.create('input',{type:'hidden',value:val.afId});
								}
								if(o.id==arg)
								{
									p1.n.className='b red curs';
								}
								p.n.onmousedown=showHideStructure;
								if(typeof val.child!="undefined")
								{
									for(var sign in val.child)
									{
										var v = val.child[sign];
										if(typeof v.nm != "undefined")
										{
											count++;
											div1.n.className='minusimg';
											var div2=div1.create('div',{className:'plusimg',style:{marginTop:'10px',marginLeft:(margin*3)+'px'}});
											var p2=div2.create('div',{textNode:v.nm,className:'b c6 curs',id:'col'+count+'_'+sign,onmousedown:'displaySubStructure',style:{display:'inline-block'}});
											if(((typeof v.afId != "undefined")&&(v.afId != ""))&&((typeof v.size != "undefined")&&(parseInt(v.size,10)>0)))
											{
												var u=div2.create('u',{textNode:v.size,title:'Документы',onmousedown:'showCallResources',className:'b c9 ml15x'});
												u.create('input',{type:'hidden',value:v.afId});
											}
											if(o.id==sign)
											{
												p2.n.className='b red curs';
											}
											p1.n.onmousedown=showHideStructure;
											if(typeof v.child!="undefined")
											{
												for(var s in v.child)
												{
													var c = v.child[s];
													if(typeof c.nm != "undefined")
													{
														count++;
														div2.n.className='minusimg';
														var div3=div2.create('div',{className:'plusimg',style:{marginTop:'10px',marginLeft:(margin*4)+'px'}});
														var p3=div2.create('div',{textNode:c.nm,className:'b c6 curs',id:'col'+count+'_'+s,onmousedown:'displaySubStructure',style:{display:'inline-block'}});
														if(((typeof c.afId != "undefined")&&(c.afId != ""))&&((typeof c.size != "undefined")&&(parseInt(c.size,10)>0)))
														{
															var u=div3.create('u',{textNode:c.size,title:'Документы',onmousedown:'showCallResources',className:'b c9 ml15x'});
															u.create('input',{type:'hidden',value:c.afId});
														}
														if(o.id==s)
														{
															p3.n.className='b red curs';
														}
														p2.n.onmousedown=showHideStructure;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	/*}
	catch(e)
	{
		alert(e.description);
	}*/
}

function showHideStructure()/*отображение/скрытие узлов структуры коллекции*/
{
	var par=this.parentNode;
	par.className=(par.className=='minusimg')?'plusimg':'minusimg';
	var arr = par.childNodes;
	for(var i=0; i<arr.length; i++)
	{
		if((arr[i].nodeType==1)&&((arr[i].className.indexOf('simg') != -1)||(arr[i].id.indexOf('addcol')!=-1)))
		{
			if(par.className=='minusimg')
				arr[i].style.display='';
			else
				arr[i].style.display='none';
		}
	}
}

function displaySubStructure()/*запрос на вывод подколлекций*/
{
	var obj={};
	obj.id=this.id;
	obj.tmp=this.id.substring(this.id.indexOf('_')+1);
	var par=take(obj.id).n.parentNode;
	typework="";
	var div=take('add'+obj.id);
	if(div.n==null)
		div=take(par).create('div',{id:'add'+obj.id});
	div.n.innerHTML='<div class="progress small"><div></div></div>';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["label","COINK"]);
	querylist.push(["length",50]);	
	querylist.push(["iddb",numDB]);
	querylist.push(["query",obj.tmp]);
	querylist.push(["$tmp",obj.id]);
	querylist.push(["$ind",obj.tmp]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackDisplaySubStructure,pathactrcp,null,callbackDisplaySubStructure,obj);
}

function callbackDisplaySubStructure(x,o)/*вывод подколлекций*/
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
		var doc=take('add'+_tmp);
		var margin=10;
		var item="";
		var arr=[];
		for (var key in response[0])
		{
			if(key.indexOf('indx_')!=-1)
			{
				var value = response[0][key];
				if(value._item.indexOf(_ind+'[C]') != -1)
					item=value._item.substring(0,value._item.indexOf('[C]'));
				if(value._item.indexOf(_ind+'[D]') != -1)
				{
					arr.push(value._item.substring(value._item.indexOf('[D]')+3));
				}
			}
		}
		if(arr.length > 0)
		{
			doc.n.innerHTML="";
			doc.n.parentNode.className='minusimg';
			doc.n.parentNode.firstChild.onmousedown=showHideStructure;
			for(var i=0; i<arr.length; i++)
			{
				var elem=arr[i].split('[|]');
				var term=elem[0].split('[A]')
				var ind=term[0];
				var title=elem[1];
				var af="";
				if((typeof term[1]!="undefined")&&(term[1]!=""))
					af=term[1];
				var div=doc.create('div',{className:'plusimg',style:{marginTop:'10px',marginLeft:margin+'px'}});
				var p=div.create('div',{textNode:title,className:'b c6 curs',id:'col'+i+'_'+ind,onmousedown:'displaySubStructure',style:{display:'inline-block'}});
				if(af != "")
				{
					var u=div.create('u',{id:'res_'+replaceSymb(af),title:'Документы',onmousedown:'showCallResources',className:'b c9 ml15x'});
					u.create('span',{textNode:'См. документы'});
					u.create('input',{type:'hidden',value:af});
					prefindResources(af);
				}
			}
		}
		else
		{
			findSubStructure(o);			
		}
	}
}

var archtype='ARCHIVE';

function addSeeArchive(ind,rdb)/*подробный вывод архивных материалов*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["archiv"].directory+'/archiv.php';
	if(typeof rdb!="undefined")
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","ARCHIV"]);
	querylist.push(["outformList[0]/outform","SHOTFORM"]);
	querylist.push(["outformList[1]/outform","ARCHIV"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$archtype",archtype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showItem(i,arg)/*запрос на вывод ссылок в подробном описании архивных материалов*/
{
	showFormat(i);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",replaceS(arg)]);
	querylist.push(["$ind","alinkss"]);
	querylist.push(["outformList[0]/outform","SHOTARCHIV"]);
	querylist.push(["outformList[1]/outform","SHOTFORM"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackShowItem);
}

function callbackShowItem(x)/*вывод ссылок в подробном описании архивных материалов*/
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
		var div=take(_ind);
		div.n.innerHTML="";
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var value = response[0][key];
				var ind=replaceSymb(value._id);
				var arrcont=value._SHOTFORM_0._content_0;
				for(var i=0; i<arrcont.length;i++)
				{
					if(i==0)
					{
						var text=arrcont[i].replace(/\[b\]/gi,'');
						text=text.replace(/\[\/b\]/gi,'');
						div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeArchive("'+ind+'")};'});
						break;
					}
				}
			}
		}
	}
}

function showFormat(o)/*переключатель типов вывода подробного описания архивных материал*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormat('FULLFRMARC');};
						take('bfirst').n.value="Полное описание";
						take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};
						take('bsecond').n.value="Архивное описание";
						take('formattitle').n.innerHTML="RUSMARC";
						archtype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('bfirst').n.onclick=function(){showFormat('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};
						take('bsecond').n.value="Архивное описание";
						take('formattitle').n.innerHTML="Полное описание";
						archtype='FULLFRMARC';
		break;
		case 'ARCHIVE': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormat('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormat('FULLFRMARC');};
						take('bsecond').n.value="Полное описание";
						take('formattitle').n.innerHTML="Архивное описание";
						archtype='ARCHIVE';
		break;
		default:break;
	}
}

function addSee(ind)/*подробный вывод библиографии в новом окне(смена основного окна)*/
{
	typework="search";
	if(typeof ind=="undefined")
		ind=_biblid;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["add"].directory+'/add.php']);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	ind=prepareStr(ind);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["outformList[0]/outform","FULLFRM1"]);
	querylist.push(["outformList[1]/outform","FULLFRM2S"]);
	querylist.push(["outformList[2]/outform","FULLFRM3"]);
	querylist.push(["outformList[3]/outform","FULLFRM4"]);
	querylist.push(["outformList[4]/outform","FULLFRM5"]);
	querylist.push(["outformList[5]/outform","FULLFRM6"]);
	querylist.push(["outformList[6]/outform","BIBREF"]);
	querylist.push(["iddbIds[0]/id",ind]);
	if(typeof _iddbbibl !="undefined")
		numDB=_iddbbibl;
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["$iddbbibl",numDB]);
	if(typeof _start != "undefined")
		querylist.push(["$start",_start]);
	else
	{
		if((typeof _typesearch !="undefined")&&(_typesearch=="fulltext"))
		{
			if(typeof _prev != "undefined")
				querylist.push(["$prev",_prev]);
			if(typeof _next != "undefined")
				querylist.push(["$next",_next]);
		}
	}
	querylist.push(["$showstr",showstr]);
	querylist.push(["$str",str]);
	querylist.push(["$biblid",replaceSymb(ind)]);
	querylist.push(["$stopfilters","yes"]);
	if(typeof _rubricator !="undefined")
		querylist.push(["$rubricator",_rubricator]);
	if(typeof _rshowstr !="undefined")
		querylist.push(["$rshowstr",_rshowstr]);
	if(typeof _filterstr !="undefined")
		querylist.push(["$filterstr",_filterstr]);
	if(typeof _filtersids !="undefined")
		querylist.push(["$filtersids",_filtersids]);
	if(typeof _fshowstr !="undefined")
		querylist.push(["$fshowstr",_fshowstr]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function addLibToSearch(o)/*добавить фильтр к поиску - проект СКК ЛИБНЕТ*/
{
	var sigla=o.nextSibling.value;
	if(sigla!="")
	{
		var today=new Date();
		var seconds=today.getTime();
		var str="[NEXT]addfilterobj[IND]filter_1_"+seconds+"_"+seconds+"[CLASS](PF "+sigla+")[TEXT]"+sigla;
		if(typeof _addfilters!="undefined")
			addfilters=_addfilters+"[END]"+str;
		else
			addfilters=str;
		alert('Фильтр добавлен');
		//switchSearch('simple');
	}
	else
	{
		alert('Невозможно добавить фильтр к поиску. Отсутствует сигла');
	}
}

function openUrl(o,sigla,abis,searchstr)/*переход в каталог библиотеки для проекта СКК*/
{
	var searchquery=take('searchquery').n.value;
	var expression="", SB="", AU="", TI="", PY="";
	if(searchquery.indexOf('[NI]')!=-1)
	{
		SB=searchquery.substring(searchquery.indexOf('[NI]')+4,searchquery.indexOf('[/NI]'));
		if((SB.indexOf('X')!=-1)||(SB.indexOf('Х')!=-1)||(SB.indexOf('(')!=-1)||(SB.indexOf(')')!=-1)||(SB.indexOf('[')!=-1)||(SB.indexOf(']')!=-1))
			SB="";
	}
	if(searchquery.indexOf('[RP]')!=-1)
		AU=searchquery.substring(searchquery.indexOf('[RP]')+4,searchquery.indexOf('[/RP]'));
	if(searchquery.indexOf('[TITL]')!=-1)
		TI=searchquery.substring(searchquery.indexOf('[TITL]')+6,searchquery.indexOf('[/TITL]'));
	if(searchquery.indexOf('[PY]')!=-1)
		PY=searchquery.substring(searchquery.indexOf('[PY]')+4,searchquery.indexOf('[/PY]'));
	PY=PY.replace(/\[/g,'');
	PY=PY.replace(/\]/g,'');
	if((PY.indexOf('#')!=-1)||(PY.indexOf('|')!=-1))
	{
		PY="";
	}
	else
	{
		if(isNaN(parseInt(PY)))
		{
			PY="";
		}
	}
	var AND="";
	if(abis=="OPAC")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'\\(');
			AU=AU.replace(/\)/g,'\\)');
			if(sigla.toUpperCase()=='ЦНМБ')
				expression+='(RP '+replaceSymb3(AU)+')';
			else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
				expression+='(AC '+replaceSymb3(AU)+')';
			else
				expression+='(AU '+replaceSymb3(AU)+')';
			AND=" AND ";
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'\\(');
			TI=TI.replace(/\)/g,'\\)');
			if(sigla=='ЦНМБ')
				expression+=AND+'(TITL '+replaceSymb3(TI)+')';
			else
				expression+=AND+'(TI '+replaceSymb3(TI)+')';
			AND=" AND ";
		}
		if(PY!="")
		{
			expression+=AND+"(PY '"+PY+"')";
		}
		var today=new Date();
		var ParmScr="menubar=no,width=" + (screen.width - 12) +
		",height=" + (screen.height - 130) +
		",left=0,top=0,resizable=yes,toolbar=no,location=no,scrollbars=yes,directories=no,status=yes";
		var tmp=/\[d\]/g;
		if(tmp.test(searchstr))
			searchstr=searchstr.replace(tmp,'$');
		var url=searchstr.split("?")[0];
		var hashstr=searchstr.split("?")[1];
		var ssearchstr=hashstr.split("&");
		var arg0=ssearchstr[0].split("=")[1];
		var arg1=ssearchstr[1].split("=")[1];
		var cgi="/cgiopac";
		var win=window.open("", "opac"+Math.floor(Math.random()*9999)+today.getTime(), ParmScr);
		win.document.open();
		win.document.writeln('<html><head><title>OPAC-Global</title>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
		'</head><body bgcolor="#FAFAF1" onload="document.forms[0].submit()">'+
		'<p style="color: red; font: bold 14pt serif; text-align: center">Пожалуйста, подождите...</p>'+
		'<form name="reg" id="reg" action="'+url+cgi+'/opacg/opac.exe" method="post">'+
		'<input type="hidden" name="arg0" value="'+arg0+'"/>'+
		'<input type="hidden" name="arg1" value="'+arg1+'"/>'+
		'<input type="hidden" name="_searchstr" value="/opacg/freesearch.html?'+ssearchstr[2]+'&'+ssearchstr[3]+encodeURIComponent(expression)+'"/>'+
		'<input type="hidden" name="TypeAccess" value="PayAccess"/></form>'+
		'</body></html>');
		win.document.close();
	}
	else if(abis=="OPAC2")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'\\(');
			AU=AU.replace(/\)/g,'\\)');
			if(sigla.toUpperCase()=='ЦНМБ')
				expression+='(RP '+replaceSymb3(AU)+')';
			else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
				expression+='(AC '+replaceSymb3(AU)+')';
			else
				expression+='(AU '+replaceSymb3(AU)+')';
			AND=" AND ";
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'\\(');
			TI=TI.replace(/\)/g,'\\)');
			if(sigla=='ЦНМБ')
				expression+=AND+'(TITL '+replaceSymb3(TI)+')';
			else
				expression+=AND+'(TI '+replaceSymb3(TI)+')';
			AND=" AND ";
		}
		if(PY!="")
		{
			expression+=AND+"(PY '"+PY+"')";
		}
		window.open(searchstr+encodeURIComponent(expression), "");
	}
	else if(abis=="WLIB")
	{
		var expression="";
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU+=" ";
			expression+=replaceSymb(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI+=" ";
			expression+=replaceSymb(TI);
		}
		if(PY!="")
		{
			expression+=PY;
		}
		window.open(searchstr+encodeURIComponent(expression), "");
	}
	else if(abis=="WLIB1")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU=replaceSymb3(AU);
			expression+='&AC='+encodeURIComponent(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI=replaceSymb3(TI);
			expression+='&TI='+encodeURIComponent(TI);
		}
		if(PY!="")
		{
			expression+='&PY='+PY;
		}
		window.open(searchstr+expression, "");
	}
	else if(abis=="WLIB3")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU=replaceSymb3(AU);
			expression+='&RP='+encodeURIComponent(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI=replaceSymb3(TI);
			expression+='&TITL='+encodeURIComponent(TI);
		}
		if(PY!="")
		{
			expression+='&PY='+PY;
		}
		window.open(searchstr+expression, "");
	}
	else if(abis=="VGBIL")
	{
		var expression=searchstr;
		var myids=take('myids').n.value.split('[SIGLA]');
		var ind=myids[0].substring(myids[0].lastIndexOf('-')+1);
		expression+=ind;
		window.open(expression, "");
	}
	else if(abis=="BEN")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="SAMARA")
	{
		var expression=searchstr;
		var str="";
		var v0="&tag_100a,700a=", v1="&tag_245a=", v2="&tag_260c=";
		if(AU!="")
			v0+=encodeVal(AU);
		if(TI!="")
			v1+=encodeVal(TI);
		if(PY!="")
		{
			v2+=PY;
		}
		str=v0+v1+v2;
		window.open(expression+str, "");
	}
	else if((abis=="ALEF")||(abis=="SIGLA"))
	{
		var expression=searchstr;
		var str="";
		var v0="&v0=", v1="&v1=", v2="&v2=", ys="&ys=", ye="&ye=";
		if(SB!="")
			v0+=SB;
		if(AU!="")
			v1+=encodeVal(AU);
		if(TI!="")
			v2+=encodeVal(TI);
		if(PY!="")
		{
			ys+=PY;
			ye+=PY;
		}
		str=v0+v1+v2+ys;
		window.open(expression+str, "");
	}
	else if(abis=="ALANIA")
	{
		var expression=searchstr;
		var str="";
		var par1_value="&par1_value=", par3_value="&par3_value=", par5_value="&par5_value=";
		if(AU!="")
			par1_value+=encodeVal(AU);
		if(TI!="")
			par3_value+=encodeVal(TI);
		if(PY!="")
		{
			par5_value+=PY;
		}
		str=par1_value+par3_value+par5_value;
		window.open(expression+str, "");
	}
	else if(abis=="PRIMO")
	{
		var expression=searchstr;
		var str="";
		var v0="&vl(freeText0)=", v1="&vl(boolOperator0)=AND", v2="&vl(freeText1)=", ys="&vl(boolOperator1)=AND", ye="&vl(freeText2)=";
		if(AU!="")
			v0+=encodeVal(AU);
		if(TI!="")
			v2+=encodeVal(TI);
		if(PY!="")
		{
			ye+=PY;
		}
		str=v0+v1+v2+ys+ye;
		window.open(expression+str, "");
	}
	else if(abis=="KPRSL")
	{
		var expression=searchstr;
		var str="";
		var v0="&TIP=", v1="";
		if(TI!="")
			v0+=encodeVal(TI);
		if(PY!="")
		{
			v1+="&PY="+PY;
		}
		str=v0+v1;
		window.open(expression+str, "");
	}
	else if(abis=="IRBIS")
	{
		var expression=searchstr;
		var str="";
		var AND="";
		if(SB!="")
		{
			str+="(<.>B="+SB+"<.>)";
			AND='%2B';
		}
		if(AU!="")
		{
			str+=AND+"(<.>A="+encodeVal(AU)+"$<.>)";
			AND='*';
		}
		if(TI!="")
		{
			str+=AND+"(<.>T="+encodeVal(TI)+"$<.>)";
			AND='*';
		}
		if(PY!="")
		{
			str+=AND+"(<.>G="+PY+"$<.>)";
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="IRBIS2")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="IRBIS1")
	{
		var expression=searchstr;
		var str="";
		var AND="";
		if(AU!="")
		{
			str+="(<.>A="+AU+"$<.>)";
			AND='*';
		}
		if(TI!="")
		{
			str+=AND+"(<.>T="+TI+"$<.>)";
			AND='*';
		}
		if(PY!="")
		{
			str+=AND+"(<.>G="+PY+"$<.>)";
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="IRBIS3")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&term_1="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&term_2="+encodeVal(TI);
		}
		if(PY!="")
			str+="&term_3="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="FOLIANT")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&DATA0="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&DATA1="+encodeVal(TI);
		}
		if(PY!="")
			str+="&DATA2="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="MARC")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&T1="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&T2="+encodeVal(TI);
		}
		if(PY!="")
			str+="&T3="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="BIBCOM")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="criteria=and.author.words."+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&criteria=and.title.words."+encodeVal(TI);
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="MCBS")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="RCOIT")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			AU="&arrFilter_pf"+encodeVal("[OUTPUT_AUTHORS]")+"="+encodeVal(AU);
			str+=AU;
		}
		if(TI!="")
		{
			TI="&arrFilter_ff"+encodeVal("[NAME]")+"="+encodeVal(TI);
			str+=TI;
		}
		if(PY!="")
		{
			PY="&arrFilter_pf"+encodeVal("[YEAR]")+"="+encodeVal(PY);
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="RUSLAN")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="FOXPRO")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="ASBIBL3")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="UBONLINE")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="ABSOTEK")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="MARC1")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			AU="author="+encodeVal(AU);
			str+=AU;
		}
		if(TI!="")
		{
			TI="&title="+encodeVal(TI);
			str+=TI;
		}
		if(PY!="")
		{
			PY="&data="+encodeVal(PY);
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="CNSHB")
	{
		var expression=searchstr;
		var str="";
		var ID="";
		if(searchquery.indexOf('[ID]')!=-1)
			ID=searchquery.substring(searchquery.indexOf('[ID]')+4,searchquery.indexOf('[/ID]'));
		if(ID!="")
			str+="&trn="+ID;
		if(AU!="")
		{
			AU="&au="+AU;
			str+=AU;
		}
		if(TI!="")
		{
			TI="&ti="+TI;
			str+=TI;
		}
		if(PY!="")
		{
			PY="&ya="+PY;
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="PRLIB")
	{
		var expression=searchstr;
		var str='';
		if(AU!="")
		{
			str+='{';
			str+='"id":"sf_au_en","field":"sf_au_en","type":"string","input":"text","operator":"equal","value":"'+AU+'"}';
		}
		if(TI!="")
		{
			if(AU!="")
				str+=',';
			str+='{';
			str+='"id":"sf_ti","field":"sf_ti","type":"string","input":"text","operator":"equal","value":"'+TI+'"}';
		}
		str='{"condition":"AND","rules":['+str+'],"valid":true}';
		expression+=encodeVal(str);
		window.open(expression, "");
	}
	else
		return;
}

/*---------------------------------конец для проекта СКК ЛИБНЕТ---------------------------------*/
