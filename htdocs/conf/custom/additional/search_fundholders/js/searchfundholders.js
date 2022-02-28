/*----------------------------------- поиск библиотек-фондодержателей --------------------------------*/

function searchFundHolders(c,t)/*поиск библиотек*/
{
	typework="search";
	var howmuch=portion;
	var startfrom=0;
	var query='';
	var text='';
	var slab='AH';
	if(typeof dbs[numdbAF].search_label != "undefined")
		slab=dbs[numdbAF].search_label;
	if(typeof t=="undefined")
		text=take('iCA').n.value;
	else
		text=t;
	query='('+slab+' '+replaceSymb(text)+')';
	query='('+slab+' '+replaceSymb(text)+'*)';
	var showstr=prepareStr('<i>Везде</i> '+replaceSymb(text));
	if((typeof c!="undefined")&&(c !=null))
	{
		if(typeof _length !="undefined")
			howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		if(typeof _showstr !="undefined")
			showstr=prepareStr(_showstr);
		if(typeof _query !="undefined")
			query=prepareStr(_query);
	}
	query=replaceSymb(query);
	showstr=prepareShowstring(showstr);
	numDB=numdbAF;
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["findlib"].directory+'/findlib.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["length",howmuch]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$typesearch","fundholders"]);
	querylist.push(["_history","yes"]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["query/body",query]);
	querylist.push(["$query",query]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","TITLE"]);
	querylist.push(["query/outforms[1]","ADDRESS"]);
	querylist.push(["query/outforms[2]","BLK856"]);
	//querylist.push(["query/outforms[2]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function nextFh(c)/*поиск библиотек листание*/
{
	searchFundHolders(c);
}

/*-------------------------дополнительные функции-----------------*/

function findSigla(o)/*поиск библиотек в новом слое-окне*/
{
	typework="";
	siglaid=o.nextSibling;
	var howmuch=portion;
	var startfrom=0;
	var str=take('mysigla').n.value;
	if(siglaid.style.display=='none')
	{
		if(siglaid.innerHTML=="")
		{
			siglaid.innerHTML='<div class="progress small"><div></div></div>';
			o.className='wrapped_';
			take(siglaid).show();
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacafd:Find"]);
			querylist.push(["_version","1.0.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["iddb",numdbAF]);
			querylist.push(["start",startfrom]);
			querylist.push(["length",howmuch]);
			querylist.push(["_start",startfrom]);
			querylist.push(["$sstart",startfrom]);
			querylist.push(["$length",howmuch]);
			querylist.push(["$sigla",str]);
			querylist.push(["$ids",take('myids').n.value]);
			querylist.push(["query/body","(AH "+str+")"]);
			querylist.push(["viewOptions[0]",""]);
			querylist.push(["query/outforms[0]","TITLE"]);
			querylist.push(["query/outforms[1]","ADDRESS"]);
			querylist.push(["query/outforms[2]","SIGLA"]);
			querylist.push(["query/outforms[3]","BLK856"]);
			//querylist.push(["query/outforms[3]","BLKK856"]);//для СКК ЛИБНЕТ
			gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
			ajaxToRCP(gArr,callBackfindSigla);
		}
		else
		{
			o.className='wrapped_';
			take(siglaid).show();
		}
	}
	else
	{
		take(siglaid).hide();
		o.className='wrapped';
	}
}

function findSiglaNext(c)/*листание библиотек в новом слое-окне*/
{
	typework="";
	var howmuch=portion;
	var startfrom=0;
	if(typeof c!="undefined")
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	if(isNaN(startfrom))
		startfrom=0;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["length",howmuch]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$sigla",take('mysigla').n.value]);
	querylist.push(["$ids",take('myids').n.value]);
	querylist.push(["$sstart",startfrom]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["query/body","(AH "+take('mysigla').n.value+")"]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","TITLE"]);
	querylist.push(["query/outforms[1]","ADDRESS"]);
	querylist.push(["query/outforms[2]","SIGLA"]);
	querylist.push(["query/outforms[3]","BLK856"]);
	//querylist.push(["query/outforms[3]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	ajaxToRCP(gArr,callBackfindSigla);
}

function wPs(s,b)/*порции для листания библиотек в новом слое-окне*/
{
	var pages="";
	if(s==0)
		pages="";
	else
	{
		var N1=Math.ceil(s/portion);
		if(N1!= 1)
		{
			var N2=Math.ceil(N1/10);
			var N3=Math.ceil((b+1)/portion);
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
				pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt((N4-2)*10 + 1)+')">&lt;&lt; Пред.</a>&#160;';
			}
			for(;i1<=i2; i1++)
			{
				if(i1==N3)
				{
					pages+='&#160;<span class="now">'+i1+'</span>&#160;';
				}
				else
				{
					pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(i1)+')">'+i1+'</a>&#160;';
				}
			}
			if(N2 > N4)
			{
				pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(N4*10 + 1)+')">След. &gt;&gt;</a>&#160;';
			}
		}
	}
	return pages;
}

function callBackfindSigla(x)/*окно вывода резульатов поиска библиотек*/
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
		siglaid.innerHTML="";
		var sstr=take('searchquery').n.value;
		var count=0;
		var size=parseInt(response[0]._size,10);
		var pages=take(siglaid).create('div',{className:'pages'});
		var doc=take(siglaid).create('div',{className:'table w100', id:'siglatable'});
		var pages1=take(siglaid).create('div',{className:'pages'});
		if(size>0)
		{
			for(var arg in response[0])
			{
				if(arg.indexOf('_result_')!=-1)
				{
					var value=response[0][arg];
					var ind=value._id;
					var titl="";
					var addr="";
					var sigla="";
					var tr=doc.create('div',{className: 'row'});
					tr.create('div',{className:'td w3',textNode:(parseInt(_sstart,10)+count+1)});
					var td=tr.create('div',{className:'td'});
					var td1=tr.create('div',{id:ind,className:'td w20'});
					var ek="";
					var site="";
					var url="";
					var abis="";
					var skin="";
					var ndb="";
					for(var sign in value)
					{
						if(sign.indexOf('userforms_')!=-1)
						{
							var val=value[sign];
							var t=val._AFANNOTTEXT_0._title;
							for(var k in val._AFANNOTTEXT_0)
							{
								var v="";
								if(k.indexOf('entries_')!=-1)
									v=val._AFANNOTTEXT_0[k];
								switch(t)
								{
									case "Title":		if(typeof v._text!="undefined")
															titl=v._text;
														break;
									case "Addresse":	if(typeof v._text!="undefined")
															addr=v._text;
														break;
									case "Sigla":		if(typeof v._text!="undefined")
															sigla=v._text;
														break;
									case "Internet":	if(typeof v._text!="undefined")
														{
															var arr=v._text.split('[END]');
															if(arr[0]=='Интернет-сайт')
															{
																site=arr[1];
															}
															if(arr[0]=='Электронный каталог')
															{
																ek=arr[1];
															}
															if(arr[0]=='Поиск в ЭК')
															{
																url=arr[1];
															}
															if(arr[0]=='ABIS')
															{
																abis=arr[1];
															}
														}
														break;
									default:			break;
								}
							}
						}
					}
					if(url!="")
					{
						td.create('span',{className:'afsearchimg'});
						td.create('span',{title:'Перейти в библиотеку',textNode: titl,className:'f120 c8 u curs',onclick:'function(){openUrl(this,\''+sigla+'\',\''+abis+'\',\''+url+'\')}'});
					}
					else
						td.create('div',{textNode: titl,className:'f120 c8'});
					td.create('div',{className:'afsmall c6 pl20x',textNode:addr});
					if((sigla!="СКБР")&&(sigla!="СКЭР")&&(sigla!="КБД"))
					{
						td1.create('span',{className:'aflinkinfo p5x',textNode:'О библиотеке',onmousedown:'function(){showLibInfo(this.parentNode.id)}'});
						if(site!="")
							td1.create('a',{className:'aflinkinfo p5x',textNode:'Интернет-сайт',target:'_blank',href:site});
						if(ek!="")
							td1.create('a',{className:'aflinkinfo p5x',textNode:'Электронный каталог',target:'_blank',href:ek});
					}
					count++;
				}
			}
			pages.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));
			pages1.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));
		}
		else
		{
			doc.create('div',{textNode: 'Библиотеки не найдены.', style:{textAlign:'center'}});
		}
	}
}

function showLibInfo(o,num,sign)/*запрос вывода информации о библиотеке*/
{
	typework="";
	var ind="";
	var indx="";
	var titl="";
	var addr="";
	var ndb="";
	var biblid="";
	if(typeof o != "string")
	{
		ind=o.parentNode.id;
		indx=o.parentNode.id.substring(o.parentNode.id.lastIndexOf('_')+1);
		titl=take(o.parentNode).getsign('input',{className:'titl'})[0].value;
		addr=take(o.parentNode).getsign('input',{className:'addr'})[0].value;
		ndb=take(o.parentNode).getsign('input',{className:'item'})[0].value;
		biblid=take(o.parentNode).getsign('input',{className:'biblid'})[0].value;
	}
	else
	{
		ind=o;
		indx=o.substring(o.lastIndexOf('_')+1);
		if(take(o).n != null)
		{
			if(take(o).getsign('input',{className:'titl'}).length > 0)
				titl=take(o).getsign('input',{className:'titl'})[0].value;
			else
				titl=take(o).n.innerHTML;
		}
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	//querylist.push(["id",indx]);
	querylist.push(["id",prepareStr(indx)]);
	querylist.push(["length",portion]);
	querylist.push(["$length",portion]);
	querylist.push(["$start",1]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["mode","OUTRECORD"]);
	querylist.push(["outforms[0]","BLK856"]);
	//if(typeof num == "undefined")
	//{
		querylist.push(["outforms[1]","TITLE"]);
		querylist.push(["outforms[2]","ADDRESS"]);
		querylist.push(["outforms[3]","BLK305"]);
		querylist.push(["outforms[4]","BLK300"]);
		querylist.push(["outforms[5]","BLOCK310"]);
		querylist.push(["outforms[6]","BLOCK320"]);
		querylist.push(["outforms[7]","BLOCK330"]);
		querylist.push(["outforms[8]","BLOCK340"]);
		querylist.push(["outforms[9]","BLOCK4"]);
		querylist.push(["outforms[10]","BLOCK5"]);
		querylist.push(["outforms[11]","BLOCK7"]);
	//}
	//else
	//{
		querylist.push(["$ind",ind]);
		querylist.push(["$titl",titl]);
		if(typeof sign != "undefined")
		{
			querylist.push(["$sign",sign]);
			if(addr != "")
				querylist.push(["$addr",addr]);
			if(sign=='avail')
			{
				querylist.push(["$biblid",replaceSymb(biblid)]);
				querylist.push(["$ndb",ndb]);
			}
		}
		else
			take(ind).n='<div class="progress small"><div></div></div>';
	//}
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	ajaxToRCP(gArr,openInfoWin);
}

function openInfoWin(x)/*отображение информации о библиотеке*/
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
		var titl='';
		var addr='';
		var ek='';
		var ekurl='';
		var site='';
		var img='';
		var sigla='';
		var map='';
		var abis='';
		var doc=null;
		var div=null;
		var outer=null;
		var inner=null;
		if(typeof _sign == "undefined")
		{
			if(typeof _ind != "undefined")
			{
				doc=take(_ind);
			}
			else
			{
				if(take('infowinform').n==null)
				{
					var arg={'cls':'dialog2','message': 'Информация','cls':'dialog2','width':'95%','height':'95%'};
					showLayerWin('infowin',arg);
				}
				doc=take('infowinform');
			}
			if(doc.n != null)
			{
				doc.n.innerHTML="";
				div=doc.create('div',{className:'infores'});
				outer=div.create('div',{className:'infores'});
				inner=div.create('div',{className:'infores'});
			}
		}
		for(var arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_result_')!=-1)
			{
				var val=value._AFANNOTTEXT_0;
				for(term in val)
				{
					var afv=val[term];
					if(term.indexOf('_entries_')!=-1)
					{
						if(val._title=='Internet')
						{
							var arr=afv._text.split('[END]');
							if(arr[0]=='Интернет-сайт')
							{
								site=arr[1];
							}
							if(arr[0]=='Электронный каталог')
							{
								ek=arr[1];
							}
							if(arr[0]=='Поиск в ЭК')
							{
								ekurl=arr[1];
							}
							if(arr[0]=='Посмотреть на карте')
							{
								map=arr[1];
							}
							if(arr[0]=='ABIS')
							{
								abis=arr[1];
							}
							if(arr[0]=='IMG')
							{
								img=arr[1];
							}
							if(arr[0].indexOf('Каталог ')!=-1)
							{
								sigla=arr[2];
							}
						}
						else if(val._title=='Title')
						{
							titl=val._entries_0._text;
						}
						else if(val._title=='Addresse')
						{
							addr=val._entries_0._text;
						}
						else
						{
							if(inner.n != null)
								inner.create('p',{textNode:replaceSymb(afv._text)});
						}
					}
				}
				if(typeof _ind == "undefined")
				{
					if(typeof value._AFANNOTREF_0!="undefined")
					{
						if(inner.n != null)
						{
							var ref=inner.create('div',{className:'ml120x'});
							var v=value._AFANNOTREF_0;
							if(typeof v._title!="undefined")
							{
								if(v._title=="См. также более узкое понятие:")
								{
									ref.create('p',{textNode:'Включает:',className:'b pt5px pb5px'});
								}
								if(v._title=="См. также более широкое понятие:")
								{
									ref.create('p',{textNode:'Входит в:',className:'b pt5px pb5px'});
								}
							}
							for(t in v)
							{
								var args=v[t];
								if(t.indexOf('_references_')!=-1)
								{
									if(typeof args._biblQuery!="undefined")
									{
										ref.create('p',{textNode:replaceSymb(args._biblQuery),className:'aflinkinfo',onclick:'function(){showLibInfo(\''+replaceSymb(args._id)+'\');}'});
									}
								}
							}
						}
					}
				}
			}
		}
		if(typeof _sign == "undefined")
		{
			if((outer != null)&&(outer.n != null))
			{
				if(typeof _ind == "undefined")
				{
					outer.create('img',{src:pathimg+'/lib.png',align:'left',style:{margin:'0 20px 10px 0'}});
				}
				if(typeof _ind == "undefined")
				{
					outer.create('p',{className:'fstr',textNode:titl});
					if((sigla.indexOf('ЗАО')==-1)&&(sigla.indexOf('ВАО')==-1)&&(sigla.indexOf('СЗАО')==-1)&&(sigla.indexOf('СВАО')==-1))
					{
						var p1=outer.create('p');
						p1.create('b',{textNode:'Адрес: '});
						p1.text(addr);
					}
				}
				if(site!="")
				{
					var p=outer.create('p');
					p.create('a',{target:'_blank',href:site,textNode:'Сайт библиотеки'});
				}
				if(map!="")
				{
					var p=outer.create('p');
					p.create('a',{target:'_blank',href:map,textNode:'Посмотреть на карте'});
				}
				if(ek!="")
				{
					var p=outer.create('p');
					p.create('a',{target:'_blank',href:ek,textNode:'Уточнить наличие'});
				}
			}
		}
		else
		{
			if(_sign == 'site')
			{
				if(site!="")
				{
					window.open(site);
				}
				else
				{
					if(take('infowinform').n==null)
					{
						var arg={'cls':'dialog2','message': 'Информация','cls':'dialog2','width':'95%','height':'95%'};
						showLayerWin('infowin',arg);
					}
					var doc=take('infowinform');
					doc.n.innerHTML="";
					var div=doc.create('div',{className:'infores'});
					var outer=div.create('div',{className:'infores'});
					var inner=div.create('div',{className:'infores'});
					outer.create('img',{src:pathimg+'/lib.png',align:'left',style:{margin:'0 20px 10px 0'}});
					for(arg in response[0])
					{
						var value=response[0][arg];
						if(arg.indexOf('_result_')!=-1)
						{
							var val=value._AFANNOTTEXT_0;
							for(term in val)
							{
								var afv=val[term];
								if(term.indexOf('_entries_')!=-1)
								{
									if(val._title=='Title')
									{
										titl=val._entries_0._text;
									}
									else if(val._title=='Addresse')
									{
										addr=val._entries_0._text;
									}
									else
									{
										if(val._title=='Internet')
										{
											var arr=afv._text.split('[END]');
											if(arr[0]=='Посмотреть на карте')
											{
												map=arr[1];
											}
										}
										else
										{
											inner.create('p',{textNode:replaceSymb(afv._text)});
										}
									}
								}
							}
							if(typeof value._AFANNOTREF_0!="undefined")
							{
								var ref=inner.create('div',{className:'ml120x'});
								var v=value._AFANNOTREF_0;
								if(typeof v._title!="undefined")
								{
									ref.create('p',{textNode:v._title,className:'b pt5px pb5px'});
								}
								for(t in v)
								{
									var args=v[t];
									if(t.indexOf('_references_')!=-1)
									{
										if(typeof args._biblQuery!="undefined")
										{
											ref.create('p',{id:replaceSymb(args._id),textNode:replaceSymb(args._biblQuery),className:'aflinkinfo',onmousedown:'function(){showLibInfo(\''+replaceSymb(args._id)+'\',null,\'site\');}'});
										}
									}
								}
							}
						}
					}
					outer.create('p',{className:'fstr',textNode:titl});
					if(addr != "")
					{
						var p=outer.create('p');
						p.create('b',{textNode:'Адрес: '});
						p.text(addr);
					}
					if(map!="")
					{
						outer.create('p',{id:replaceSymb(response[0]._id),textNode:'Посмотреть на карте', className:'aflinkinfo', onmousedown:'function(){showLibInfo(\''+replaceSymb(response[0]._id)+'\',null,\'map\');}'});
					}
				}
			}
			if(_sign == 'map')
			{
				if(map!="")
				{
					window.open(map);
				}
				else
				{
					if(typeof _titl!="undefined")
					{
						var term=_titl;
						if(typeof _addr!="undefined")
							term+=' '+_addr;
						var thelink='http://maps.yandex.ru/?&source=wizgeo&text=';
						thelink+=encodeURIComponent(term);
						window.open(thelink);
					}
				}
			}
			if(_sign == 'avail')
			{
				if((ekurl!="")&&(abis != "")&&((typeof _biblid !="undefined")&&(_biblid != "")))
				{
					var expression='(ID '+replaceSymb(prepareStr(_biblid))+')'
					var today=new Date();
					var ParmScr="menubar=no,width=" + (screen.width - 12) +
					",height=" + (screen.height - 130) +
					",left=0,top=0,resizable=yes,toolbar=no,location=no,scrollbars=yes,directories=no,status=yes";
					var url=ekurl.split("?")[0];
					var hashstr=ekurl.split("?")[1];
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
					'<input type="hidden" name="_searchstr" value="/opacg/freesearch.html?'+ssearchstr[2]+'&value='+encodeURIComponent(expression)+'"/>'+
					'<input type="hidden" name="TypeAccess" value="PayAccess"/></form>'+
					'</body></html>');
					win.document.close();
				}
				else
				{
					if(ek != "")
					{
						window.open(ek);
					}
					else
					{
						if((typeof _biblid !="undefined")&&(typeof _ndb !="undefined"))
						{
							var ndb=parseInt(_ndb.substring(3));
							if(typeof _auth != "undefined")
							{
								_codemenu="043";
								showOrderWin(_codemenu,ndb,_biblid);
							}
							else
							{
								var url="/opacg2/";
								var txt=encodeURIComponent(replaceSlash(prepareStr(_biblid)));
								url+="?iddb="+ndb+"&label=ID&queryBody="+txt+"&_action=bibl%3Asearch%3Aprofessional";
								window.open(url);
							}
						}
					}
				}
			}
		}
	}
}

function searchLibRecs(o)/*поиск в библ. базах по сигле*/
{
	var sigla=take(o.parentNode).getsign('input',{'name':'sigla'})[0].value;
	if(sigla != "")
	{
		var label='PFO';
		if(typeof dbs[numdbAF].bibl_search_label != "undefined")
			label=dbs[numdbAF].bibl_search_label;
		var arg={};
		arg._str='[bracket]'+label+' '+sigla+'[/bracket]';
		arg._showstr='<i>Местонахождение </i>'+sigla;
		numDB=numdbBIBL;
		if(biblcounter==1)
			simpleSearch(label,arg);
		else
			simpleSearchAll(label,arg);
	}
	else
	{
		alert('Невозможно осуществить поиск. Отсутствует сигла');
	}
}

function checkAvail(o,ndb,skin,c)/*уточнить наличие для СК*/
{
	typework="";
	var ind=o.parentNode.parentNode.parentNode.parentNode.id+'search';
	var howmuch=portion;
	var startfrom=0;
	var biblid=take('biblid'+c).n.value;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["start",startfrom]);
	querylist.push(["length",howmuch]);
	querylist.push(["_start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$biblid",biblid]);
	querylist.push(["$ind",ind]);
	querylist.push(["query/body","(ID '"+o.parentNode.id+"')"]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","BLK856"]);
	//querylist.push(["query/outforms[0]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callBackCheckAvail);
}

function callBackCheckAvail(x)/*вывод информации о наличии для СК*/
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
		var ek="";
		var url="";
		var abis="";
		if(typeof response[0]._result_0._userforms_0._AFANNOTTEXT_0!="undefined")
		{
			for (sign in response[0]._result_0._userforms_0._AFANNOTTEXT_0)
			{
				var val = response[0]._result_0._userforms_0._AFANNOTTEXT_0[sign];
				if(sign.indexOf('_entries_')!=-1)
				{
					var arr=val._text.split('[END]');
					var arr=val._text.split('[END]');
					if(arr[0]=='Электронный каталог')
					{
						ek=arr[1];
					}
					if(arr[0]=='Поиск в ЭК')
					{
						url=arr[1];
					}
					if(arr[0]=='ABIS')
					{
						abis=arr[1];
					}
				}
			}
		}
		if((url!="")&&(ek!="")&&(abis!=""))
		{
			var searchquery=take(_ind).n.value;
			var SB="", AU="", TI="", PY="";
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
			var str="";
			if(abis=="OPAC2")
			{
				var biblid=_biblid;
				biblid=biblid.substring(biblid.lastIndexOf('-')+1);//если 713 поле
				var expression="(ID '"+replaceSlash(prepareStr(biblid))+"')";
				window.open(url+''+encodeVal(expression), "");
			}
			else if(abis=="JIRBIS")
			{
				var biblid=_biblid;
				biblid=biblid.substring(biblid.lastIndexOf('-')+1);
				var expression=replaceSlash(prepareStr(biblid));
				window.open(url+''+encodeVal(expression), "");
			}
			else if(abis=="MEGAPRO")
			{
				if(SB!="")
				{
					str="&lookfor0%5B%5D="+encodeVal(SB)+"&type0%5B%5D=ISN";
				}
				else
				{
					if(AU!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(AU)+"&type0%5B%5D=Author";
					}
					if(TI!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(TI)+"&type0%5B%5D=Title";
					}
					if(PY!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(PY)+"&type0%5B%5D=year";
					}
				}
				window.open(url+''+str, "");
			}
			else if(abis=="MEGAPRO1")
			{
				if(SB!="")
				{
					str="&term_0="+encodeVal(SB);
				}
				else
				{
					if(AU!="")
					{
						str+="&term_1="+encodeVal(AU);
					}
					if(TI!="")
					{
						str+="&term_2="+encodeVal(TI);
					}
					if(PY!="")
					{
						str+="&filter_dateFrom="+encodeVal(PY)+"&filter_dateTo="+encodeVal(PY);
					}
				}
				window.open(url+''+str, "");
			}
			else if(abis=="MARC")
			{
				if(AU!="")
				{
					str+="&T1="+encodeVal(AU);
				}
				if(TI!="")
				{
					str+="&T2="+encodeVal(TI);
				}
				window.open(url+''+str, "");
			}
			else if(abis=="IRBIS")
			{
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
				window.open(url+''+str, "");
			}
			else
			{
				window.open(url, "");
			}
		}
		else
		{
			alert('Невозможно перейти в локальный каталог.');
		}
	}
}

/*---------------дополнительные функции-----------------------------------*/

function lookAtMap(o)/*посмотреть на карте для проекта СКБМ*/
{
	var thelink='http://maps.yandex.ru/?&source=wizgeo&text=';
	/*var addr=take(o.parentNode).getsign('input',{className:'addr'})[0].value;
	thelink+=encodeURIComponent(addr);*/
	var tstr=take(o.parentNode).getsign('input',{className:'tstr'})[0].value;
	thelink+=encodeURIComponent(tstr);
	window.open(thelink, "");
}

/*-------------------------------- конец поиск библиотек-фондодержателей ------------------------------*/