/*---------------------------------------------- интерфейс ----------------------------------------------*/

function initd()/*инициализация страницы*/
{
	if(typeof error!="undefined")
		WriteError(error,'back');
	else
	{
		var cookiestring = 'numsean='+numsean+'; path=/';
		if(window.location.protocol == 'https:')
			cookiestring += ' secure=true; samesite=lax';
		document.cookie = cookiestring;
		if(typeof scrolllayer == "undefined")
			scrolllayer="searchdiv";
		scrollFloat.init(document.getElementById(scrolllayer));
		if(take('editq').n!=null)
		{
			if(take('expand_search').n!=null)
			{
				if(typeof _str != "undefined")
					take('editq').n.style.display="block";
			}
		}
		if(typeof _numDB!="undefined")
		{
			numDB=_numDB;
		}
		else if(typeof _iddb!="undefined")
		{
			numDB=_iddb;
		}
		else
		{
			if(take('bases_div').n!=null)
			{
				var barr=take('bases_div').getsign('input',{name: 'base'});
				if(barr.length>0)
					numDB=barr[0].value;
				else
				{
					if(take('bases_container').n!=null)
						numDB=take('bases_container').n.firstChild.className.substring(1);
				}
			}
		}
		if(typeof biblnumber!="undefined")
		{
			numdbBIBL=biblnumber;
		}
		if(take('bases_div').n!=null)
		{
			if(typeof take('bases_div').getsign('input',{value: numDB})[0]!="undefined")
			{
				var inp=take('bases_div').getsign('input',{value: numDB})[0];
				if(inp.type!="hidden")
					inp.checked=true;
			}
		}
		if(typeof _bodyclass!="undefined")
		{
			bodyclass=_bodyclass;
		}
		if(typeof _typesearch!="undefined")
		{
			typesearch=_typesearch;
		}
		if(typeof _typework!="undefined")
		{
			typework=_typework;
		}
		if(typeof _lockedstring!="undefined")
		{
			lockedstring=_lockedstring;
		}
		if(take('middle').n!=null)
		{
			var arr=take('middle').tags('input');
			for(var i=0; i<arr.length; i++)
				arr[i].onkeyup=KeyPress;
		}
		if(take('password').n!=null)
			take('password').n.onkeyup=KeyPress;
		if(take('readercode2').n!=null)
			take('readercode2').n.onkeyup=KeyPress;
		if(typeof numDB=="number")
			numDB=numDB+"";
		if(take('currdb').n!=null)
		{
			var currdb=take('currdb').n;
			if((typeof numdbAF!="undefined")&&(numDB==numdbAF)&&(dbs[numDB].switch_in_base!="in_base"))
			{
				if(currdb.nodeName.toLowerCase()=="span")
				{
					currdb.innerHTML=take('bases_container').n.firstChild.innerHTML;
					currdb.className=take('bases_container').n.firstChild.className;
				}
			}
			else
			{
				if(currdb.nodeName.toLowerCase()=="span")
				{
					if((typework=='searchallbases')&&(typeof dbs["all"]!= "undefined"))
						numDB='all';
					currdb.innerHTML=dbs[numDB]["alias"];
					currdb.className='i'+numDB;
				}
			}
		}
		if(typeof _addfilters!="undefined")
			addfilters=_addfilters;
		if(typeof _lockedfilters!="undefined")
			lockedfilters=_lockedfilters;
		if(typeof _swfterm!="undefined")
			swfterm=replaceSymb(_swfterm);
		var filtersdiv='filters_'+numDB;
		if(typeof _localiddb !="undefined")
		{
			numDB=_localiddb;
			filtersdiv='filters_'+_iddb;
		}
		if((typeof _sheet != "undefined") && (_sheet == "sheet_search_history_php"))
			numDB=numdbBIBL;
		if(typeof mapwidth != "undefined")
		{
			if(take('searchmap1').n!=null)
			{
				typesearch="combined";
				take('callsearchmap').hide();

				var w=take('searchmap1').n.getBoundingClientRect().width;
				var h=take('searchmap1').n.getBoundingClientRect().height;
				var k=parseFloat(w/mapwidth).toFixed(2);
				if(typeof setMap !="undefined")
					setMap('searchmap1','mapfull',null,k,w,h);
			}
			else
			{
				if(take('searchmap').n != null)
				{
					if(typeof setMap !="undefined")
						setMap('searchmap','mapfull');
				}
			}
		}
		chooseBase(numDB);
		if(take(filtersdiv).n!=null)
		{
			take(filtersdiv).show();
			if(typeof _addfilters!="undefined")
			{
				var afarr=addfilters.split('[END]');
				for(var i=0; i<afarr.length; i++)
				{
					if(afarr[i]!="")
					{
						var nextid=afarr[i].substring(afarr[i].indexOf('[NEXT]')+6,afarr[i].indexOf('[IND]'));
						var oid=afarr[i].substring(afarr[i].indexOf('[IND]')+5,afarr[i].indexOf('[CLASS]'));
						var cls=afarr[i].substring(afarr[i].indexOf('[CLASS]')+7,afarr[i].indexOf('[TEXT]'));
						var txt=afarr[i].substring(afarr[i].indexOf('[TEXT]')+6);
						var obj=take(nextid).n;
						if(obj!=null)
						{
							var par=obj.parentNode;
							var arr=take(par).tags('span');
							var flag=false;
							for(var j=0; j<arr.length; j++)
							{
								if(arr[j].innerHTML.toUpperCase()==txt.toUpperCase())
								{
									flag=true;
									break;
								}
								else
									flag=false;
							}
							if(!flag)
							{
								var div=take(par).create('div',{className:prepareTerm(cls)});
								var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:prepareTerm(txt),id:oid});
								div.create('i',{textNode:'0'});
								par.insertBefore(div.n,obj);
							}
						}
					}
				}
			}
			if(typeof _filtersids!="undefined")
			{
				var farr=_filtersids.split('[END]');
				for(var i=0; i<farr.length; i++)
				{
					if(take(farr[i]).n!=null)
					{
						take(farr[i]).n.className="checked";
						take(farr[i]).n.title="ОЧИСТИТЬ ФИЛЬТР";
						take(farr[i]).n.nextSibling.style.display="none";
					}
				}
			}
			filtersQuery();
		}
		if(typeof _rubricator !="undefined")
		{
			if(typeof openBranches !="undefined")
				openBranches();
		}
		flag45=findFlag45();
		if(take('readercode2').n!=null)
		{
			if(take('d1').n!=null)
			{
				take('d1').n.onblur=changeData;
				take('d1').n.onmouseup=changeData;
			}
			if(take('m1').n!=null)
			{
				take('m1').n.onblur=changeData;
				take('m1').n.onmouseup=changeData;
			}
			if(take('y1').n!=null)
			{
				take('y1').n.onblur=changeData;
				take('y1').n.onmouseup=changeData;
			}
		}
		if((typeof _typereg!="undefined")&&( _typereg!="regform")&&( _typereg!="_libreader"))
		{
			if(typeof getPrice !="undefined")
				getPrice();
		}
		if(typeof _vocobj!="undefined")
		{
			vocobj=_vocobj;
			writeRezult();
		}
		if(take('rcounter').n!=null)
		{
			if(typeof findBaseQuantity !="undefined")
				findBaseQuantity();
		}
		getBookInfo();
		if(take('facets_container').n != null)
		{
			if(take('facets_div').n != null)
			{
				take('facets_div').n.appendChild(take('facets_container').n);
				take('facets_div').show();
			}
		}
		if((typeof _outform != "undefined")&&(_outform.indexOf('PHOTO')!=-1))
		{
			findImages();
		}
		if(take('sconstruct_'+numDB).n != null)
		{
			getDataFromStorage();
		}
		if((typeof _newrecs != "undefined") && (_newrecs != ""))
		{
			take(document.body).addclass('newscalendar');
		}
		if(typeof _showsearchrez != "undefined")
		{
			var obj={};
			obj._str=_str;
			obj._showstr=_showstr;
			numDB=_iddb;
			simpleSearch(null,obj);
		}
	}
}

function chooseBase(o,ind)/*выбор БД*/
{
	if(typeof o=="string")
	{
		if((typesearch=="authority")&&(typeof prefind!="undefined"))
			o=numdbf;
		if(typework=="searchallbases")
		{
			o='all';
			if(take('iall').n != null)
				take('iall').n.checked=true;
		}
		if(o != "all")
		{
			if((typeof iddb[o] != "undefined")&&(iddb[o][0][3] != "AF"))
			{
				var dbflag=false;
				if(typeof iddb[o][5] != "undefined")
				{
					var arr=iddb[o][5];
					for(var i=0; i<arr.length; i++)
					{
						if(arr[i][0]=="067")
						{
							dbflag=true;
							break;
						}
					}
				}
				if((typeof dbs[o] =="undefined")||(dbflag))
					o=numDB=numdbBIBL;
				if(take('i'+dbs[o]["dbindex"]).n!=null)
					take('i'+dbs[o]["dbindex"]).n.checked=true;
				if(take('currdb').n!=null)
				{
					var currdb=take('currdb').n;
					if(currdb.nodeName.toLowerCase()=="span")
					{
						currdb.innerHTML=dbs[numDB]["alias"];
						currdb.className='i'+numDB;
					}
				}
			}
		}
	}
	else
	{
		if(typesearch != "expand")
			typesearch="simple";
		if(o.nodeName.toLowerCase()=='label')
			numDB=o.previousSibling.value;
		else
			numDB=o.nextSibling.className.substring(1);
		if(numDB=='all')
		{
			typework="searchallbases";
			typesearch="simple";
			if(take('editq').n!=null)
				take('editq').hide();
		}
		else
		{
			typework="search";
			if((ind!="")&&(ind=="ifundholders"))
				typesearch="fundholders";
			if(dbs[numDB].type=="AF")
			{
				typesearch="authority";
				if(take('editq').n!=null)
					take('editq').hide();
			}
			else
			{
				if(take('editq').n!=null)
					take('editq').n.style.display="block";
			}
		}
		vocobj="";
		lockedfilters="";
		if((take('searchhead').n!=null)||(take('vochead').n!=null))
			lockSrezults();
	}
	switchSearch(typesearch);
}

function findFlag45()/*проверка на операцию 045 - ввод штрихкода*/
{
	var db=numDB;
	if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
		db=_iddb;
	if(db=='all')
		db=numdbBIBL;
	var fl=false;
	if(typeof _flag45!="undefined")
	{
		fl=true;
	}
	else
	{
		if(take('labs_div_'+db).n!=null)
		{
			if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
			{
				if(iddb[db][0][3]=='BIBL')
				{
					if(typeof iddb[db][5] != "undefined")
					{
						var arr=iddb[db][5];
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i][0]=="045")
							{
								fl=true;
								break;
							}
						}
					}
				}
			}
		}
	}
	return fl;
}

function findFlag72(ndb)/*проверка на операцию 072 - регистрация во время заказа*/
{
	var db=numdbBIBL;
	if(typeof ndb!="undefined")
		db=ndb;
	var fl=false;
	if(take('labs_div_'+db).n!=null)
	{
		if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
		{
			if(iddb[db][0][3]=='BIBL')
			{
				if(typeof iddb[db][5] != "undefined")
				{
					var arr=iddb[db][5];
					for(var i=0; i<arr.length; i++)
					{
						if(arr[i][0]=="072")
						{
							fl=true;
							break;
						}
					}
				}
			}
		}
	}
	return fl;
}

function verifyLink()/*проверка на прописанные операции*/
{
	var harr={};
	var div=take('searchrezult');
	if(div.n!=null)
	{
		if((typeof _auth!="undefined")&&(typeof _linkstring!="undefined"))
		{
			var arr=_linkstring.split('[END]');
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i]!="")
				{
					var tmparr=arr[i].split('[ID]');
					harr[tmparr[0]]=tmparr[1];
				}
			}
			for(var key in harr)
			{
				var arr=div.getsign('p',{className:key});
				if(arr.length>0)
				{
					for(var i=0; i<arr.length; i++)
					{
						arr[i].style.display="";
					}
				}
			}
		}
	}
	else
	{
		return;
	}
}

function lockSrezults()/*блокировка результатов поиска при смене БД*/
{
	var div=take('disablediv');
	var par=take(document.body).getsign('div',{className:'col_content'})[0];
	var item=take('searchhead').n;
	var h=take(item).geth();
	var w=take(par).getw();
	var X=0;
	var y=0;
	if(div.n==null)
		div=take(par).create('div',{id:'disablediv'});
	div.setx(X);
	div.sety(y);
	div.setw(w);
	div.show();
	div.transparency(5);
}

function placeLabs()/*выбор точек доступа*/
{
	var ndb=numDB;
	var dtype="";
	if(dbs[ndb]!=null)
		dtype=dbs[ndb]["type"];
	if((dtype=='AF')&&(typeof prefind!="undefined"))
		ndb=numdbf;
	if(ndb=='all')
	{
		ndb=numdbBIBL;
	}
	var doc=take('labs_div_'+ndb);
	if(doc.n!=null)
	{
		var labs=doc.tags('div');
		if(dtype=="BIBL")
		{
			if(take('simple_search').n!=null)
			{
				var span=take('simple_search').tags('span')[0];
				if((typeof _searchlabel != "undefined")&&(typeof dbs[ndb]["labels"][_searchlabel]!="undefined"))
				{
					span.className="i"+_searchlabel;
					span.innerHTML=dbs[ndb]["labels"][_searchlabel][0];
				}
				else if((typeof _label != "undefined")&&(typeof dbs[ndb]["labels"][_label]!="undefined"))
				{
					span.className="i"+_label;
					span.innerHTML=dbs[ndb]["labels"][_label][0];
				}
				else
				{
					span.className=labs[0].className;
					span.innerHTML=labs[0].innerHTML;
				}
			}
			var sel=null;
			if(take('expand_search').n!=null)
			{
				var div=take('expand_search').getsign('div',{className: 'labcontainer'});
				if((typeof _vocobj != "undefined")&&(_typesearch=="expand")&&(vocobj != ""))
				{
					if(typeof _label != "undefined")
					{
						var obj=take(_vocobj).n;
						if(obj.parentNode.previousSibling.className=='opt1')
							sel=obj.parentNode.previousSibling.previousSibling.firstChild.lastChild;
						else
							sel=obj.parentNode.previousSibling.firstChild.lastChild;
						var lab=_label;
						if(typeof dbs[ndb]["labels"][_label] == "undefined")
						{
							lab=labs[1].className.substring(1);
						}
						sel.className="i"+lab;
						sel.innerHTML=dbs[ndb]["labels"][lab][0];
						var voc=obj.parentNode.parentNode.previousSibling;
						if(voc.className=='logcontainer')
							voc=voc.previousSibling;
						if((dbs[ndb]["labels"][lab][1]=="N")||(lab == "TEXT"))
						{
							voc.className='voc disabled';
							voc.onmousedown=function(){return false;};
						}
						else
						{
							voc.className='voc';
							voc.onmousedown=function(){showVoc(this);};
						}
					}
				}
				var count=0;
				if((labs[0].className=="iFT")||(labs[0].className=="iAH"))
					count=1;
				for(var i=0; i<div.length; i++)
				{
					var lcont=div[i].firstChild.firstChild.lastChild;
					if(lcont != sel)
					{
						if(typeof labs[count] !="undefined")
						{
							lcont.className=labs[count].className;
							lcont.innerHTML=labs[count].innerHTML;
							var lab=labs[count].className.substring(1);
							var voc=null;
							var par=null;
							if(div[i].previousSibling.className=='logcontainer')
							{
								par=div[i].previousSibling.previousSibling;
							}
							else
							{
								par=div[i].previousSibling;
							}
							if((par.nodeName.toLowerCase()=='b')||((par.nodeName.toLowerCase()=='input')))
								voc=par;
							if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab != "TEXT"))
							{
								voc.className='voc';
								voc.onmousedown=function(){showVoc(this);};
							}
							else
							{
								voc.className='voc disabled';
								voc.onmousedown=function(){return false;};
							}
							count++;
						}
					}
				}
			}
			if(take('professional_search').n!=null)
			{
				var span=take('professional_search').tags('span')[0];
				var lab=labs[0].className.substring(1);
				if((typeof _searchlabel != "undefined")&&(typeof dbs[ndb]["labels"][_searchlabel]!="undefined"))
				{
					lab=_searchlabel;
					span.className="i"+_searchlabel;
					span.innerHTML=dbs[ndb]["labels"][_searchlabel][0];
				}
				else
				{
					lab=labs[0].className.substring(1);
					span.className=labs[0].className;
					span.innerHTML=labs[0].innerHTML;
				}
				var voc=take('professional_search').getsign('b',{className: 'voc'})[0];
				if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab != "TEXT"))
				{
					voc.className='voc';
					voc.onmousedown=function(){showVoc(this);};
				}
				else
				{
					voc.className='voc disabled';
					voc.onmousedown=function(){return false;};
				}
				if(take('saf').n!=null)
				{
					if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
						take('saf').n.disabled=false;
					else
						take('saf').n.disabled=true;
				}
				
			}
			if(take('fulltext_search').n!=null)
			{
				var span=take('fulltext_search').tags('span')[0];
				if(typeof _lab=="undefined")
				{
					doc=take('fullt_div');
					labs=doc.tags('div');
					span.className=labs[0].className;
					span.innerHTML=labs[0].innerHTML;
				}
				else
				{
					var lab=take('fullt_div').getsign('div',{className:'i'+_lab})[0];
					span.className=lab.className;
					span.innerHTML=lab.innerHTML;
				}
			}
		}
		else
		{
			if(take('authority_search').n!=null)
			{
				var span=take('authority_search').tags('span')[0];
				//var voc=take('authority_search').getsign('input',{className: 'voc'})[0];
				var lab=labs[0].className.substring(1);
				span.className=labs[0].className;
				span.innerHTML=labs[0].innerHTML;
				var voclist=take('voclist').n;
				var vocaf=take('vocaf').n;
				//var voc=null;
				//if(parseInt(dbs[ndb].afrubricator,10)==1)
				//	voc=take('voclist').n;
				//if(parseInt(dbs[ndb].afrubricator,10)==0)
				//	voc=take('vocaf').n;
				//if(voc!=null)
				//{
					if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
					{
						//voc.className='voc';
						//if(voc.id=='vocaf')
						//	voc.onmousedown=function(){showVoc(this);};
						//else if(voc.id=='meshtree')
						//	voc.onmousedown=seeTreeView;
						//else
						//	voc.onmousedown=function(){findInAf(take('itemaf').n);};
						vocaf.className='voc';
						voclist.className='voc';
						vocaf.onmousedown=function(){showVoc(this);};
						voclist.onmousedown=function(){findInAf(take('itemaf').n);};
					}
					else
					{
						//voc.className='voc disabled';
						//voc.onmousedown=function(){return false;};
						vocaf.className='voc disabled';
						voclist.className='voc disabled';
						vocaf.onmousedown=function(){return false;};
						voclist.onmousedown=function(){return false;};
					}
				//}
			}
		}
	}
	setTimeout(function()
	{
	  	var arr=take('main').getsign('div',{className:'cross_'});
		var arr1=take('main').getsign('div',{className:'block_'});
		for(var i=0; i<arr.length; i++)
		{
			arr[i].className='cross';
		}
		for(var i=0; i<arr1.length; i++)
		{
			arr1[i].className='block';
		}
	}, 200);
}

function putLAB(o)/*поместить выражение в бокс для профессионального поиска*/
{
	var obj=take('itemprof').n;
	var val=obj.value;
	if(val==" ")
		val="";
	else
		val=val.Trim();
	var par=take('expr');
	var lab=obj.parentNode.previousSibling.firstChild.lastChild.className.substring(1);
	var doc=null;
	var and=o.id.substring(1).toUpperCase();
	var tie="";
	switch(and)
	{
		case 'AND':	tie='И'; break;
		case 'OR':	tie='ИЛИ'; break;
		case 'NOT':	tie='НЕ'; break;
		default: break;
	}
	if(par.n.innerHTML.indexOf(lab)!=-1)
		doc=take(lab);
	else
	{
		if(par.n.hasChildNodes())
			doc=par.create('span', {id: lab, className: and, title: tie});
		else
			doc=par.create('span', {id: lab});
	}
	if(doc.n.hasChildNodes())
		doc.n.innerHTML="";
	if(val!="")
	{
		var db=numDB;
		if(typeof _localiddb!="undefined")
			db=_iddb;
		doc.create('span',{textNode: dbs[db]["labels"][lab][0], className: 'fel'});
		doc.create('span',{className: lab, textNode: val});
	}
	else
		par.n.removeChild(doc.n);
	obj.value="";
}

function PutLabValue(o)/*замена точек доступа*/
{
	var ndb=numDB;
	if(o.parentNode.className=="options2")
		ndb=o.className.substring(1);
	var dtype="";
	if(dbs[ndb]!=null)
		dtype=dbs[ndb]["type"];
	if((dtype=='AF')&&(typeof prefind!="undefined"))
		ndb=numdbf;
	numDB=ndb;
	var obj=menu.lastChild;
	var lab=o.className.substring(1);
	var img=menu.firstChild;
	var inp=null;
	var s="";
	obj.className=o.className;
	obj.innerHTML=o.innerHTML;	
	if(menu.className.indexOf('_')!=-1)
		menu.className=menu.className.substring(0,menu.className.length-1);
	if(obj.id=='currdb')
		chooseBase(img,o.id);
	if(menu.parentNode.nextSibling!=null)
	{
		if((img.className!='log')&&(img.className!='stype')&&(typesearch!="combined"))
		{
			if(menu.parentNode.nextSibling.nodeType==1)
			{
				inp=menu.parentNode.nextSibling.firstChild;
				inp.focus();
			}
		}
	}
	if((typesearch!="simple")&&(menu.parentNode.className!="limits_left")&&(menu.parentNode.className!="opt2")&&(menu.parentNode.className!="opt1")&&(menu.parentNode.className!="andor"))
	{
		if(dbs[ndb]["type"]=='BIBL')
		{
			var voc=null;
			if(menu.parentNode.previousSibling)
				voc=menu.parentNode.previousSibling;
			else
				voc=menu.parentNode.parentNode.previousSibling;
			if(voc.className=='logcontainer')
				voc=voc.previousSibling;
			if(voc.nodeName.toLowerCase()!='input')
			{
				if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab != "TEXT"))
				{
					voc.className='voc';
					voc.onmousedown=function(){showVoc(this);};
				}
				else
				{
					voc.className='voc disabled';
					voc.onmousedown=function(){return false;};
				}
			}
		}
		if(typeof dbs[ndb]["labels"]!="undefined")
		{
			if(dbs[ndb]["type"]=='BIBL')
			{
				if(take('saf').n!=null)
				{
					if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
						take('saf').n.disabled=false;
					else
						take('saf').n.disabled=true;
				}
			}
			else
			{
				if(take('authority_search').n!=null)
				{
					var voclist=take('voclist').n;
					var vocaf=take('vocaf').n;
					/*var voc=null;
					if(parseInt(dbs[ndb].afrubricator,10)==1)
						voc=take('voclist').n;
					if(parseInt(dbs[ndb].afrubricator,10)==0)
						voc=take('vocaf').n;
					if(voc!=null)
					{*/
						if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
						{
							/*voc.className='voc';
							if(voc.id=='vocaf')
								voc.onmousedown=function(){showVoc(this);};
							else
								voc.onmousedown=function(){findInAf(take('itemaf').n);};*/
							vocaf.className='voc';
							voclist.className='voc';
							vocaf.onmousedown=function(){showVoc(this);};
							voclist.onmousedown=function(){findInAf(take('itemaf').n);};
						}
						else
						{
							vocaf.className='voc disabled';
							voclist.className='voc disabled';
							vocaf.onmousedown=function(){return false;};
							voclist.onmousedown=function(){return false;};
						}
					/*}*/
				}
			}
		}
	}
}

function clearSearch(o)/*очистка поисковой формы*/
{
	if(take('middle').n!=null)
	{
		var arr=take('middle').getsign('input',{type: 'text'});
		for(var i=0; i<arr.length; i++)
		{
			if((arr[i].id=='itemsimple')&&(typesearch=='simple')||((typesearch=='expand')&&(arr[i].id!='itemsimple')&&(typeof o == "undefined")))
				continue;
			else
				arr[i].value="";
		}
		if(take('expr').n!=null)
			take('expr').n.innerHTML="";
	}
	editqueryflag=false;
}

function editQuery()/*искать в найденном (редактировать поисковое выражение)*/
{
	var db=numDB;
	if(typeof _str!="undefined")
	{
		if(typesearch=="fulltext")
		{
			var lab=_str.substring(_str.indexOf('bracket]')+8,_str.indexOf(' '));
			var term=_str.substring(_str.indexOf(' ')+1,_str.indexOf('[/bracket'));
			var labs=take('fulltext_search').getsign('div',{className:'select'});
			var fields=take('fulltext_search').getsign('input',{className:'iLAB'});
			labs[0].lastChild.className="i"+lab;
			labs[0].lastChild.innerHTML=dbs[db]["labels"][lab][0];
			fields[0].value=term;
		}
		else
		{
			if(take('expand_search').n!=null)
			{
				switchSearch("expand");
				var res=[];
				var arr=[];
				var tmp=/(\[\/bracket\] AND \[bracket\])|(\[\/bracket\] OR \[bracket\])|(\[\/bracket\] NOT \[bracket\])/;
				if(tmp.test(_str))
					arr=_str.split(tmp);
				else
					arr.push(_str);
				var ties=take('expand_search').getsign('div',{className:'select1'});
				var labs=take('expand_search').getsign('div',{className:'select'});
				var fields=take('expand_search').getsign('input',{className:'iLAB'});
				var vocs=take('expand_search').getpart(null,'b',{className:'voc'});
				var count=fields.length;
				for(var i=0; i<arr.length; i++)
				{
					if((arr[i]!="")&&(typeof arr[i]!="undefined"))
					{
						res.push(trimBrackets(arr[i]));
					}
				}
				var strres=res.join(' ');
				res=[];
				res=strres.split('|');
				var len=res.length;
				if(take('limits_'+db).n!=null)
				{
					var limits=take('limits_'+db).getsign('div',{className: 'limits_left'});
					for(var j=0; j<len; j++)
					{
						if(typeof res[j] != "undefined")
						{
							var lab="";
							var term=prepareTerm(res[j]);
							term=term.Trim();
							var tie=term.substring(0,term.indexOf(' '));
							term=term.substring(term.indexOf(' ')+1);
							lab=term.substring(0,term.indexOf(' '));
							term=term.substring(term.indexOf(' ')+1);
							for(var i=0; i<limits.length; i++)
							{
								if(limits[i].lastChild.className=="input")
								{
									var lobj=take(limits[i]).tags('input');
									var lim=lobj[0].className;
									if(lim==lab)
									{
										delete res[j];
										if(term.indexOf('BETWEEN ')!=-1)
										{
											term=term.substring(term.indexOf(' ')+1);
											var tmp=term.split(',');
											lobj[0].value=tmp[0].substring(1,tmp[0].length-1);
											lobj[1].value=tmp[1].substring(1,tmp[1].length-1);
										}
										if(term.indexOf('GE ')!=-1)
										{
											lobj[0].value=term.substring(term.indexOf("'")+1,term.length-1);
										}
										if(term.indexOf('LE ')!=-1)
										{
											lobj[1].value=term.substring(term.indexOf("'")+1,term.length-1);
										}
										take('limits_search').n.className='limits_';
										take('limits_'+db).show();
										break;
									}
								}
								else
								{
									if(limits[i].lastChild.id.indexOf('l_'+db+'_')!=-1)
									{
										var div=take(limits[i].lastChild.id+'_opt');
										if(div.n!=null)
										{
											var arr=div.tags('div');
											for(var k=0; k<arr.length; k++)
											{
												var tmp=arr[k].className;
												var tmp1=lab+' '+term;
												tmp=tmp.replace(/\(/g,'');
												tmp=tmp.replace(/\)/g,'');
												if(tmp1==tmp)
												{
													delete res[j];
													take('limits_search').n.className='limits_';
													take('limits_'+db).show();
													limits[i].lastChild.lastChild.className=arr[k].className;
													limits[i].lastChild.lastChild.innerHTML=arr[k].innerHTML;
													break;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				for(var i=0; i<count; i++)
				{
					var lab="";
					var term="";
					if(typeof res[i]!="undefined")
					{
						term=prepareTerm(res[i]);
						if(i==0)
						{
							lab=term.substring(0,term.indexOf(' '));
							term=term.substring(term.indexOf(' ')+1);
						}
						else
						{
							term=term.Trim();
							var tie=term.substring(0,term.indexOf(' '));
							term=term.substring(term.indexOf(' ')+1);
							lab=term.substring(0,term.indexOf(' '));
							term=term.substring(term.indexOf(' ')+1);
							if(ties.length>0)
							{
								if(tie!="")
								{
									ties[i-1].lastChild.className="i"+tie;
									ties[i-1].lastChild.innerHTML=dbs[db]["labels"][tie][0];
								}
							}
						}
						if(typeof dbs[db]["labels"][lab]!="undefined")
						{
							labs[i].lastChild.className="i"+lab;
							labs[i].lastChild.innerHTML=dbs[db]["labels"][lab][0];
							fields[i].value=term;
							vocs[i].className='voc';
						}
					}
				}
				editqueryflag=true;
			}
		}
	}
}

function switchSearch(obj)/*переключение между поисковыми режимами*/
{
	if(take('main').n!=null)
	{
		var o="";
		if(typeof obj!="string")
		{
			o=obj.id;
			editqueryflag=false
		}
		else
		{
			o=obj;
		}
		if(numDB=='all')
			editqueryflag=false;
		if((o=='fulltext')||(o=='fundholders')||(o=='authority')||(typework=="searchallbases"))
			editqueryflag=false;
		var bl=take('main').getsign('div',{className:'baselimits'});
		var ls=take('limits_search');
		if(editqueryflag==false)
		{
			clearSearch();
			var ss=take('simple_search');
			var es=take('expand_search');
			var ps=take('professional_search');
			var fh=take('fundholders_search');
			var fts=take('fulltext_search');
			var as=take('authority_search');
			var s=take('simple');
			var e=take('expand');
			var p=take('professional');
			var f=take('fundholders');
			var ft=take('fulltext');
			var sb=take('sbuttons');
			switch(o)
			{
				case 'simple':	if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
								{
									if(typeof dbs['all'] !="undefined")
										numDB='all';
									else
										numDB=numdbBIBL;
									if(biblcounter >= 1)
									{
										if(take('i'+dbs[numDB]["dbindex"]).n!=null)
										{
											if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
												take('i'+dbs[numDB]["dbindex"]).n.checked=true;
											else
											{
												take('currdb').n.innerHTML=dbs[numDB]["alias"];
												take('currdb').n.className='i'+numDB;
											}
										}
									}
								}
								if(es.n!=null)
								{
									es.hide();
									if((numDB!="all")&&(typework!="searchallbases"))
									{
										e.show();
										e.n.className="sel";
									}
									else
										e.hide();
								}
								if(ps.n!=null)
								{
									ps.hide();
									if((numDB!="all")&&(typework!="searchallbases"))
									{
										p.show();
										p.n.className="sel";
									}
									else
										p.hide();
								}
								if(fh.n!=null)
								{
									fh.hide();
									if(f.n!=null)
									{
										if(f.n.nodeName.toLowerCase()=='span')
											f.n.className="sel";
										f.show();
									}
								}
								if(ls.n!=null)
								{
									ls.hide();
									ls.n.className='limits';
									for(var i=0;i<bl.length;i++)
									{
										take(bl[i]).hide();
									}
								}
								if(sb.n!=null)
								{
									sb.hide();
								}
								if(as.n!=null)
									as.hide();
								if(ss.n!=null)
								{
									ss.show();
									s.show();
									s.n.className="sel_";
									ss.getsign('input',{type:'text'})[0].focus();
								}
								if(typeof fulltextbase!="undefined")
								{
									if(numDB==fulltextbase)
									{
										ft.show();
										ft.n.className="sel";
										fts.hide();
									}
									else
									{
										ft.hide();
										fts.hide();
									}
								}
								typesearch='simple';
				break;
				case 'expand':	if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
								{
									if(typeof dbs['all'] !="undefined")
										numDB='all';
									else
										numDB=numdbBIBL;
									if(biblcounter >= 1)
									{
										if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
											take('i'+dbs[numDB]["dbindex"]).n.checked=true;
										else
										{
											take('currdb').n.innerHTML=dbs[numDB]["alias"];
											take('currdb').n.className='i'+numDB;
										}
									}
								}
								if(ss.n!=null)
								{
									ss.hide();
									s.n.className="sel";
								}
								if(ps.n!=null)
								{
									ps.hide();
									p.n.className="sel";
								}
								if(take('limits_'+numDB).n!=null)
								{
									if(ls.n!=null)
									{
										ls.show();
										ls.n.className='limits';
									}
									for(var i=0;i<bl.length;i++)
									{
										take(bl[i]).hide();
									}
								}
								if(fh.n!=null)
								{
									fh.hide();
									if(f.n!=null)
									{
										if(f.n.nodeName.toLowerCase()=='span')
											f.n.className="sel";
										f.show();
									}
								}
								if(sb.n!=null)
								{
									sb.show();
								}
								if(as.n!=null)
									as.hide();
								if(typeof fulltextbase!="undefined")
								{
									if(numDB==fulltextbase)
									{
										ft.show();
										ft.n.className="sel";
									}
									else
										ft.hide();
								}
								if(typeof fulltextbase!="undefined")
								{
									if(numDB==fulltextbase)
									{
										ft.show();
										ft.n.className="sel";
										fts.hide();
									}
									else
									{
										ft.hide();
										fts.hide();
									}
								}
								if(es.n!=null)
								{
									es.show();
									e.n.className="sel_";
									typesearch='expand';
									es.getsign('input',{type:'text'})[0].focus();
								}
				break;
				case 'professional':	if(ss.n!=null)
								{
									ss.hide();
									s.n.className="sel";
								}
								if(es.n!=null)
								{
									es.hide();
									e.n.className="sel";
								}
								if(ls.n!=null)
								{
									ls.hide();
									ls.n.className='limits';
									for(var i=0;i<bl.length;i++)
									{
										take(bl[i]).hide();
									}
								}
								if(fh.n!=null)
								{
									fh.hide();
									if(f.n!=null)
									{
										if(f.n.nodeName.toLowerCase()=='span')
											f.n.className="sel";
										f.show();
									}
								}
								if(sb.n!=null)
								{
									sb.hide();
								}
								if(as.n!=null)
									as.hide();
								if(typeof fulltextbase!="undefined")
								{
									if(numDB==fulltextbase)
									{
										ft.show();
										ft.n.className="sel";
										fts.hide();
									}
									else
									{
										ft.hide();
										fts.hide();
									}
								}
								if(ps.n!=null)
								{
									ps.show();
									p.n.className="sel_";
									typesearch='professional';
									ps.getsign('input',{type:'text'})[0].focus();
								}
				break;
				case 'fundholders':	if(ss.n!=null)
								{
									ss.hide();
									s.n.className="sel";
									s.show();
								}
								if(es.n!=null)
								{
									es.hide();
									e.n.className="sel";
									e.hide();
								}
								if(ps.n!=null)
								{
									ps.hide();
									p.n.className="sel";
									p.hide();
								}
								if(ls.n!=null)
								{
									ls.hide();
									ls.n.className='limits';
									for(var i=0;i<bl.length;i++)
									{
										take(bl[i]).hide();
									}
								}
								if(sb.n!=null)
								{
									sb.hide();
								}
								if(as.n!=null)
									as.hide();
								if(typeof fulltextbase!="undefined")
								{
									if(numDB==fulltextbase)
									{
										ft.show();
										ft.n.className="sel";
										fts.hide();
									}
									else
									{
										ft.hide();
										fts.hide();
									}
								}
								if(fh.n!=null)
								{
									fh.show();
									if(f.n!=null)
									{
										if(f.n.nodeName.toLowerCase()=='input')
										{
											s.n.className="sel__";
											e.n.className="sel__";
											if(p.n!=null)
												p.n.className="sel__";
										}
										else
										{
											s.n.className="sel";
											e.n.className="sel";
											if(p.n!=null)
												p.n.className="sel";
											f.n.className="sel_";
										}
									}
									typesearch='fundholders';
									fh.getsign('input',{type:'text'})[0].focus();
								}
				break;
				case 'fulltext':	if(fh.n!=null)
									{
										fh.hide();
										if(f.n!=null)
										{
											if(f.n.nodeName.toLowerCase()=='span')
											{
												f.n.className="sel";
												f.hide();
											}
										}
									}
									if(ls.n!=null)
									{
										ls.hide();
										ls.n.className='limits';
										for(var i=0;i<bl.length;i++)
										{
											take(bl[i]).hide();
										}
									}
									if(ss.n!=null)
									{
										ss.hide();
										s.n.className="sel";
									}
									if(es.n!=null)
									{
										es.hide();
										e.n.className="sel";
									}
									if(ps.n!=null)
									{
										ps.hide();
										p.n.className="sel";
									}
									if(as.n!=null)
										as.hide();
									if(typeof fulltextbase!="undefined")
									{
										if(numDB==fulltextbase)
										{
											ft.show();
											ft.n.className="sel_";
											fts.show();
											typesearch='fulltext';
											fts.getsign('input',{type:'text'})[0].focus();
										}
										else
										{
											ft.hide();
											fts.hide();
										}
									}
				break;
				case 'authority':	if(sb.n!=null)
										sb.hide();
									if(fh.n!=null)
									{
										fh.hide();
										if(f.n!=null)
										{
											if(f.n.nodeName.toLowerCase()=='span')
												f.n.className="sel";
											f.hide();
										}
									}
									if(ls.n!=null)
									{
										ls.hide();
										ls.n.className='limits';
										for(var i=0;i<bl.length;i++)
										{
											take(bl[i]).hide();
										}
									}
									if(ss.n!=null)
									{
										ss.hide();
										s.n.className="sel";
										s.hide();
									}
									if(es.n!=null)
									{
										es.hide();
										e.n.className="sel";
										e.hide();
									}
									if(ps.n!=null)
									{
										ps.hide();
										p.n.className="sel";
										p.hide();
									}
									if(fts.n!=null)
									{
										fts.hide();
										ft.hide();
									}
									if(as.n!=null)
									{
										var opt=as.getsign('div',{className:'opt'})[0];
										var list=take('voclist');
										var voc=take('vocaf');
										var mt=take('meshtree');
										var ndb=numDB;
										if(typeof prefind != "undefined")
										{
											ndb=numdbf;
											if(take('i'+dbs[ndb]["dbindex"]).n.nodeName.toLowerCase()=='input')
												take('i'+dbs[ndb]["dbindex"]).n.checked=true;
											else
											{
												take('currdb').n.innerHTML=dbs[ndb]["alias"];
												take('currdb').n.className='i'+ndb;
											}
										}
										if(take('labs_div_'+ndb).n!=null)
										{
											var divarr=take('labs_div_'+ndb).tags('div');
											//if((divarr.length<2)||(parseInt(dbs[ndb].afrubricator,10)>2))
											if(divarr.length<2)
											{
												take(opt).hide();
											}
											else
												take(opt).show();
											if(parseInt(dbs[ndb].afrubricator,10)>0)
											{
												if(parseInt(dbs[ndb].afrubricator,10)>1)
												{
													if(parseInt(dbs[ndb].afrubricator,10)<4)
													{
														list.hide();
														take('afalfabet').show();
													}
													else
													{
														list.show();
														take('afalfabet').hide();
													}
													voc.hide();
													if(parseInt(dbs[ndb].afrubricator,10)>3)
														mt.show();
													else
														mt.hide();
												}
												else
												{
													list.show();
													voc.hide();
													take('afalfabet').hide();
													mt.hide();
												}
											}
											else
											{
												voc.show();
												list.hide();
												take('afalfabet').hide();
												mt.hide();
											}
											/*if(parseInt(dbs[ndb].afrubricator,10)>1)
											{
												list.hide();
												take('afalfabet').show();
												voc.hide();
											}
											else
											{
												if(parseInt(dbs[ndb].afrubricator,10)>0)
												{
													list.show();
													voc.hide();
												}
												else
												{
													voc.show();
													list.hide();
												}
												take('afalfabet').hide();
											}*/
										}
										else
										{
											voc.hide();
											take('afalfabet').hide();
											take(opt).hide();
											list.hide();
											mt.hide();
										}
										typesearch='authority';
										as.show();
										as.getsign('input',{type:'text'})[0].focus();
									}
				break;
				default: break;
			}
		}
		else
		{
			if(take('limits_'+numDB).n!=null)
			{
				if(ls.n!=null)
				{
					ls.show();
					ls.n.className='limits';
				}
				for(var i=0;i<bl.length;i++)
				{
					take(bl[i]).hide();
				}
			}
			else
			{
				if(ls.n!=null)
				{
					ls.hide();
					ls.n.className='limits';
				}
			}
		}
		if((take('callsearchmap').n != null) && (getCurrStyle(take('callsearchmap').n).display != "none"))
		{
			take('callsearchmap').n.className='sel';
			if(take('searchmap').n != null)
			{
				take('map_container').n.className='map_hide';
				if(take('searchmap').n != null)
					take('searchmap').n.className='map_hide';
			}
		}
		placeLabs();
	}
}

function writeRezult()/*сохранение выбранных значений при листании словаря*/
{
	//vocobj=_vocobj;
	var doc=take('menu1');
	var but=take('fromaftobibl');
	if(doc.n!=null)
	{
		if(typeof _savedterms!="undefined")
		{
			var arr=_savedterms.split("[END]");
			for(var j=0; j < arr.length; j++)
			{
				if(arr[j]!="")
				{
					//var ind=arr[j].substring(arr[j].indexOf("[")+1,arr[j].indexOf("]"));
					//var lab=arr[j].substring(arr[j].lastIndexOf("[")+1,arr[j].lastIndexOf("]"));
					var term=arr[j].substring(arr[j].lastIndexOf("]")+1);
					var ind=arr[j].substring(arr[j].indexOf("[ID]")+4,arr[j].indexOf("[LABEL]"));
					var lab=arr[j].substring(arr[j].indexOf("[LABEL]")+7,arr[j].indexOf("[TERMIN]"));
					var term=arr[j].substring(arr[j].indexOf("[TERMIN]")+8);
					term=prepareTerm(term);
					/*var tmp=/^\\\'/;
					var tmp1=/\\\'$/;
					var tmp2=/\\\' OR \\\'/g;
					var tmp3=/\\\' AND \\\'/g;
					if(tmp.test(term))
						term=term.replace(tmp,"'");
					if(tmp1.test(term))
						term=term.replace(tmp1,"'");
					if(tmp2.test(term))
						term=term.replace(tmp2,"' OR '");
					if(tmp3.test(term))
						term=term.replace(tmp3,"' AND '");*/
					var o=take(ind).n;
					o.value=term;
					var sel=null;
					if(o.parentNode.previousSibling.className=='opt1')
						sel=o.parentNode.previousSibling.previousSibling.firstChild.lastChild;
					else
						sel=o.parentNode.previousSibling.firstChild.lastChild;
					sel.className="i"+lab;
					sel.innerHTML=dbs[numDB]["labels"][lab][0];
				}
			}
		}
		typevoc=true;
		if(typeof _expr!="undefined")
			take('expr').n.innerHTML=_expr;
		if((typesearch != "authority")&&(typesearch != "fundholders"))
			addVoc(1);
		if(doc.n.childNodes.length>1)
		{
			doc.show();
			if(but.n!=null)
				but.visualise();
		}
	}
	showInterface();
}

function showInterface()/*проверка доступности кнопок в зависимости от выбранной метки*/
{
	if(typesearch=="combined")
		return;
	//vocobj=_vocobj;
	var obj=take(vocobj).n;
	var sel=null;
	var voc=null;
	if(obj.parentNode.previousSibling.className=='opt1')
		sel=obj.parentNode.previousSibling.previousSibling.firstChild.lastChild;
	else
		sel=obj.parentNode.previousSibling.firstChild.lastChild;
	var labsel="";
	if(typeof _label !="undefined")
		labsel=_label;
	if((_label=="CMS")||(_label=="CMSEN")||(_label=="AUIDS")||(_label=="ID"))
	{
		labsel=_label=take('labs_div_'+numDB).tags('div')[0].className.substring(1);
	}
	//if((_label=="SHM")||(_label=="CMS"))/*для иерархическог вывода MeSH*/
	//{
	//	_label=="MS";
	//	labsel="MS";
	//}
	//if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB]["labels"][labsel]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10) < 4))
	if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB]["labels"][labsel]!="undefined"))
	{
		sel.innerHTML=dbs[numDB]["labels"][labsel][0];
		sel.className="i"+labsel;
		if(dbs[numDB]["type"]=='BIBL')
		{
			voc=obj.parentNode.parentNode.previousSibling;
			if(voc.className=='logcontainer')
				voc=voc.previousSibling;
			if((dbs[numDB]["labels"][labsel][1]=="N")||(labsel == "TEXT"))
			{
				voc.className='voc disabled';
				voc.onmousedown=function(){return false;};
			}
			else
			{
				voc.className='voc';
				voc.onmousedown=function(){showVoc(this);};
			}
			if(take('saf').n!=null)
			{
				if(dbs[numDB]["labels"][labsel][2]=="N")
					take('saf').n.disabled=true;
				else
					take('saf').n.disabled=false;
			}
		}
		else
		{
			if(take('authority_search').n!=null)
			{
				//var voc=null;
				//if(parseInt(dbs[numDB].afrubricator,10)==1)
				//	voc=take('voclist').n;
				//if(parseInt(dbs[numDB].afrubricator,10)==0)
				//	voc=take('vocaf').n;
				var voclist=take('voclist').n;
				var vocaf=take('vocaf').n;
				/*if(voc!=null)
				{*/
					if(dbs[numDB]["labels"][labsel][2]!="N")
					{
						vocaf.className='voc';
						voclist.className='voc';
						vocaf.onmousedown=function(){showVoc(this);};
						voclist.onmousedown=function(){findInAf(take('itemaf').n);};
					}
					else
					{
						//voc.className='voc';
						//if(voc.id=='vocaf')
						//	voc.onmousedown=function(){showVoc(this);};
						//else
						//	voc.onmousedown=function(){findInAf(take('itemaf').n);};
						vocaf.className='voc disabled';
						voclist.className='voc disabled';
						vocaf.onmousedown=function(){return false;};
						voclist.onmousedown=function(){return false;};
					}
				/*}*/
			}
		}
	}
}

function prepareIndxTerms()/*словарь - подготовка добавленных элементов к поиску*/
{
	var str="";
	if(take('menu1').n!=null)
	{
		var arr=take('menu1').tags('code');
		for(var i=0; i<arr.length; i++)
		{
			str+=arr[i].id+'|'+replaceSymb(arr[i].innerHTML);
			if(i<arr.length-1)
				str+='[END]';
		}
	}
	return str;
}

function prepareSavedTerms(o)/*словарь - подготовка сохраненных элементов к поиску*/
{
	var arr=take('expand_search').getsign('input',{className: 'iLAB'});
	var str="";
	for(var i=0; i<arr.length; i++)
	{
		if((arr[i].id!=o)&&(arr[i].value!=""))
		{
			var lab="";
			if(arr[i].parentNode.previousSibling.className=='opt1')
				lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);
			else
				lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);
			str+='[ID]'+arr[i].id+'[LABEL]'+lab+'[TERMIN]'+convertseef(arr[i].value);
			if(i<arr.length-1)
				str+='[END]';
		}
	}
	return str;
}

function putTerms(o)/*словарь - помещение добавленных элементов в скрытый слой*/
{
	var doc=take('menu1');
	switch(o.checked)
	{
		case true:	if(o.value!="")
					{
						if(take('_'+o.id).n==null)
							doc.create('code', {textNode: o.value, id: '_'+o.id});
					}
					if(doc.n.childNodes.length>1)
					{
						doc.show();
					}
		break;
		case false:	if(take('_'+o.id).n!=null)
						doc.n.removeChild(take('_'+o.id).n);
					if(doc.n.childNodes.length<2)
					{
						doc.hide();
					}
		break;
		default: break;
	}
	addVoc(1);
}

function addVoc(num)/*словарь - выбор добавленных элементов из скрытого слоя*/
{
	if(typeof num == "undefined")
	{
		if(take('menu1').n.childNodes.length==1)
		{
			alert("Выберите элемент из списка!");
			return;
		}
	}
	if(take('menu1').n.childNodes.length>1)
	{
		var obj=take(vocobj).n;
		if(obj != null)
			obj.value="";
		var andor=take('andor').n.className;
		if(take('andor1').n !=null)
			andor=take('andor1').n.options[take('andor1').n.selectedIndex].value;
		var arr=take('menu1').tags('code');
		for(var i=0; i<arr.length; i++)
		{
			var term=arr[i].innerHTML;
			if(obj != null)
			{
				if((vocobj=="itemprof")||(vocobj=="itemaf"))
					obj.value+=term;
				else
					obj.value+="'"+prepareTerm(term)+"'";
				if(i!=(arr.length-1))
					obj.value+=' '+andor+' ';
			}
		}
	}
}

function showLimits(o)/*открытие/скрытие ограничений*/
{
	if(o.className.indexOf('_')!=-1)
	{
		take(o.className.substring(0,o.className.length-1)+'_'+numDB).hide();
		o.className=o.className.substring(0,o.className.length-1);
	}
	else
	{
		take(o.className+'_'+numDB).show();
		o.className=o.className+'_';
	}
}

function Mark(o)/*пометить записи в результатах поиска*/
{
	var arr=take('searchrezult').getsign('input',{name: 'marker'});
	if(o.checked)
	{
		for(var i=0; i < arr.length; i++)
			arr[i].checked=true;
	}
	else
	{
		for(var i=0; i < arr.length; i++)
			arr[i].checked=false;
	}
}

function Marklist(o)/*пометить записи в списке литературы*/
{
	var arr=take('tableorder').getsign('input',{type: 'checkbox'});
	if(o.checked)
	{
		for(var i=0; i < arr.length; i++)
		{
			arr[i].checked=true;
			if(arr[i].id!='mark')
				arr[i].parentNode.parentNode.className='checked';
		}
	}
	else
	{
		for(var i=0; i < arr.length; i++)
		{
			arr[i].checked=false;
			if(arr[i].id!='mark')
				arr[i].parentNode.parentNode.className='unchecked';
		}
	}
	countList();
}

function countList()/*подсчет помеченных записей в списке литературы*/
{
	var arr=take('tableorder').getsign('input',{type: 'checkbox'});
	var count=0;
	for(var i=0; i < arr.length; i++)
	{
		if(arr[i].checked==true)
		{
			if(arr[i].id!='mark')
			{
				count++;
				arr[i].parentNode.nextSibling.innerHTML=count;
				arr[i].parentNode.parentNode.className="checked";
			}
		}
		else
		{
			if(arr[i].id!='mark')
			{
				arr[i].parentNode.nextSibling.innerHTML="";
				arr[i].parentNode.parentNode.className="unchecked";
			}
		}
	}
	if(take('marked').n!=null)
		take('marked').n.innerHTML=count;
}

function closeMenu(e)/*закрытие списка точек доступа*/
{
	var obj=getSrc(e);
	var s="";
	if((obj.parentNode)&&(obj.parentNode==menu)&&(obj.parentNode.className.indexOf('_')!=-1)||(obj.className.indexOf('options') != -1))
		return;
	if(menu!=null)
	{
		var ld=take(document.body).getsign('div',{className: 'options'});
		for(var i=0; i<ld.length; i++)
			take(ld[i]).hide();
		if(take('bases_container').n!=null)
			take('bases_container').hide();
		if(take('handbook_container').n!=null)
			take('handbook_container').hide();
		if(take('logic_div').n!=null)
			take('logic_div').hide();
		if(take('andor_div').n!=null)
			take('andor_div').hide();
		if(take('voc_div').n!=null)
			take('voc_div').hide();
		if(take('searchdiv').n!=null)
		{
			var arr1=take('searchdiv').getpart(null,'div',{className:'select'});
			for(var i=0; i<arr1.length; i++)
			{
				if(arr1[i].className.indexOf('_')!=-1)
					arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);
			}
		}
	}
	if(take('livesearch').n!=null)
		take('livesearch').hide();
}

document.onmouseup=closeMenu;

function showOptions(o,ind)/*открытие списка точек доступа*/
{
	var next=null;
	var par=take(o.parentNode);
	var s="";
	var ndb=numDB;
	var dtype="";
	if(dbs[ndb]!=null)
		dtype=dbs[ndb]["type"];
	if((dtype=='AF')&&(typeof prefind!="undefined"))
		ndb=numdbf;
	if((ind=='logic_div')||(ind=='andor_div'))
	{
		s=1;
		next=take(ind);
	}
	else if(ind=='voc_div')
	{
		next=take(ind);
	}
	else if(ind=='labs_div')
		next=take(ind+'_'+ndb);
	else if(ind=='fullt_div')
		next=take(ind);
	else if(ind=='handbook')
		next=take('handbook_container');
	else if(ind=='bases_div')
		next=take('bases_container');
	else
		next=take(o.parentNode.id+'_opt');
	var h=par.geth();
	var w=par.getw();
	var x=elem_rect.x(par.n);
	var y=elem_rect.y(par.n)+h;
	if(par.n.className.indexOf('_')==-1)
	{
		if(next.n.parentNode.nodeName.toLowerCase()!='body')
		{
			x=0;
			y=h;
		}
		var arr=take(document.body).getpart(null,'div',{className:'options'});
		for(var i=0; i<arr.length; i++)
		{
			take(arr[i]).hide();
		}
		var arr1=take('searchdiv').getpart(null,'div',{className:'select'});
		for(var i=0; i<arr1.length; i++)
		{
			if(arr1[i].className.indexOf('_')!=-1)
				arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);
		}
		next.show();
		next.setx(x);
		next.sety(y);
		if(typeof ind=="undefined")
			next.setw(w);
		par.n.className=par.n.className+'_';
		menu=par.n;
		if(ind=='handbook')
			showHBRegions();
	}
	else
	{
		next.hide();
		par.n.className=par.n.className.substring(0,par.n.className.length-1);
		menu=null;
		next=null;
	}
}

function prepareAddQuery(obj)/*отправка дополнительных запросов*/
{
	var arr=dbs[obj.db].addqueries;
	var qarr=new Array();
	var qlist=new Array();
	var qservice="STORAGE:opacfindd:FindView";
	var qversion="2.7.0";
	typework="addqueries";
	for(var i=0; i<arr.length; i++)
	{
		var term=obj.term;
		var outfrm=outform;
		if(typeof dbs[obj.db].outform!="undefined")
			outfrm=dbs[obj.db].outform;
		if(typeof arr[i].addoutform!="undefined")
			outfrm=arr[i].addoutform;
		
		if(typeof arr[i].addquery != "undefined")
			term+=' '+arr[i].addquery;

		if((typeof arr[i].addservice != "undefined")&&(arr[i].addservice.indexOf('FindSize') != -1))
		{
			var dbarr=arr[i].addnumber.split(',');
			qlist.length=0;
			qlist.push(["_service",arr[i].addservice]);
			qlist.push(["_version",arr[i].addversion]);
			qlist.push(["session",numsean]);
			if(dbarr[0] == 'all')
			{
				dbarr=[];
				for(var x in dbs)
				{
					if((x != obj.db)&&(!isNaN(parseInt(x,10))))
					{
						dbarr.push(x);
					}
				}
			}
			for(var k=0; k < dbarr.length; k++)
			{
				qlist.push(["queryList["+k+"]/iddb",dbarr[k].Trim()]);
				qlist.push(["queryList["+k+"]/query",term]);
			}
			if(typeof arr[i].addtitle != "undefined")
				qlist.push(["$addtitle",arr[i].addtitle]);
			qarr.push(["querylist",prepareQueryString(qlist,dbarr[0].Trim())]);
		}
		else if((typeof arr[i].addservice != "undefined")&&(arr[i].addservice.indexOf('IndexView') != -1))
		{
			if((typeof arr[i].addlabel != "undefined")&&(arr[i].addlabel != "")&&(typeof obj.label != "undefined")&&(arr[i].addlabel == obj.label))
			{
				qlist.length=0;
				var query="";
				if(typeof arr[i].addquery != "undefined")
					query=arr[i].addquery;
				qlist.push(["_service",arr[i].addservice]);
				qlist.push(["_version",arr[i].addversion]);
				qlist.push(["session",numsean]);
				qlist.push(["iddb",arr[i].addnumber]);
				qlist.push(["label",arr[i].addlabel]);
				qlist.push(["length",portion]);
				qlist.push(["query",query]);
				qlist.push(["$addlabel",arr[i].addlabel]);
				if(typeof arr[i].addtitle != "undefined")
					qlist.push(["$addtitle",arr[i].addtitle]);
				qarr.push(["querylist",prepareQueryString(qlist,arr[i].addnumber)]);
			}
		}
		else
		{
			if((typeof arr[i].addlabel != "undefined")&&(arr[i].addlabel != "")&&(typeof obj.label != "undefined")&&(arr[i].addlabel == obj.label))
			{
				qlist.length=0;
				qlist.push(["_service",qservice]);
				qlist.push(["_version",qversion]);
				qlist.push(["session",numsean]);
				qlist.push(["iddb",arr[i].addnumber]);
				qlist.push(["start",0]);
				qlist.push(["length",portion]);
				qlist.push(["outformList[0]/outform",outfrm]);
				qlist.push(["query/body",term]);
				if(typeof arr[i].addtitle != "undefined")
					qlist.push(["$addtitle",arr[i].addtitle]);
				qlist.push(["$addoutform",outfrm]);
				qarr.push(["querylist",prepareQueryString(qlist,arr[i].addnumber)]);
			}
		}
	}
	if(qarr.length > 0)
		return qarr;
	return null;
}

function changeData(e)/*проверка правильности введенной даты*/
{
	if(take('timeordcontainer').n!=null)
		take('timeordcontainer').hide();
	correctVal(e);
	viewNext();
}

function zoomPicture(o)/*увеличение картинки*/
{
	var src="";
	var title="";
	var fig=take(o).tags('figure')[0];
	if(fig!=null)
		src=fig.firstChild.src;
	var figc=take(o).tags('figcaption')[0];
	if(figc!=null)
		title='<span>'+figc.innerHTML+'</span>';
	var arg={};
	arg.cls='dialog3';
	arg.message=" ";
	arg.divframe=1;
	arg.target=self;
	showLayerWin('zoomwin',arg);
	self.frames["zoomwinframe"].document.open();
	self.frames["zoomwinframe"].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><style type="text/css">img {height: 100% !important;} body {margin:0; padding:0; text-align:center;} span {display:table-cell; vertical-align:middle; text-align:center; font-size:13px; font-family:sans-serif; color: #fff; padding: 10px 10% 10px 10%;} div { display:table; vertical-align:middle; background:rgba(51,51,51,0.7); height:80px; position:absolute; bottom:10px; left:0; width:100%;} span > b {display:block;}</style></head><body><img src="'+src+'"/><div>'+title+'</div></body></html>');
	self.frames["zoomwinframe"].document.close();
}

function preloadImages(imgs)/*предварительная загрузка картинок*/
{
	var images=[];
	if(typeof imgs=="string")
		images.push(imgs);
	else
		images=imgs;
	for(i = 0; i < images.length; i++)
	{
		img = new Image();
		img.src = images[i];
	}
}

function getBookInfo()/*поиск обложек в GoogleBooks*/
{
	if(take('searchrezult').n!=null)
	{
		var arr=take('searchrezult').getsign('input',{className:'isbn'});
		if((typeof arr!="undefined")&&(arr.length>0))
		{
			var str="";
			for(var i=0; i<arr.length; i++)
			{
				str+='ISBN'+arr[i].value;
				if(i<arr.length-1)
					str+=',';
			}
			take('searchrezult').create('script',{src:'https://books.google.com/books?jscmd=viewapi&bibkeys='+str+'&callback=bookinfo'});
		}
	}
}

function bookinfo(x)/*вывод обложек GoogleBooks*/
{
	if(typeof x!="undefined")
	{
		//var str="";
		for(arg in x)
		{
			//str += arg+": "+ x[arg]+"\r\n"; 
			var value=x[arg];
			//var img=take(arg);
			var arr=take('infor').getsign('cite',{id:arg});
			for(var i=0; i<arr.length; i++)
			{
				var img=take(arr[i]);
				if(img.n!=null)
				{
					var par=img.n.parentNode;
					if(typeof value.thumbnail_url!="undefined")
					{
						value.thumbnail_url=value.thumbnail_url.replace(/zoom=5/ig,'zoom=1');
						var fig=take(par).create('figure',{tabindex:'1'});
						fig.create('img',{border:'0',hSpace:'0',vSpace:'0',alt:'',title:'',src:value.thumbnail_url.replace(/\u0026/ig,'&')});
						par.removeChild(img.n);
					}
					if(typeof value.info_url!="undefined")
					{
						take(par).create('a',{className:'gb',href:value.info_url.replace(/\u0026/ig,'&'),target:'_blank',textNode:'GoogleBooks'});
					}
				}
			}
		}
	/*var win=window.open();
	win.document.open();
	win.document.write(str);
	win.document.close();*/
	}
}

function showSlidesCont(o)/*слайдер - содержание документа*/
{
	var arg={'cls':'dialog2','target': self, 'message':'СОДЕРЖАНИЕ','forlinks':'1','divframe':'1'};
	showLayerWin('slidswin',arg);
	var arr=take(o).getsign('input',{type:'hidden'});
	var len=arr.length;
	var cssrule1='';
	var cssrule2='';
	var cssrule3='';
	var cssrule4='';
	var slides='';
	var div=take(document.body).create('div',{id:'slidescont'});
	div.hide();
	var styles=div.create('style',{type:'text/css'});
	var wrapper=div.create('div',{className:'wrapper hidden', id:'wrapper'});
	var panel=wrapper.create('div',{className:'panel'});
	div.create('div',{className:'lpanel'});
	div.create('div',{className:'rpanel'});
	var t=-40;
	var t1=-40;
	var tdelta=10;
	var h=180;
	var h1=180;
	var hdelta=-20;
	var l=-8;
	var ldelta=12;
	var l1=-28;
	var l1delta=-4;
	var len1=len;
	var k=0;
	for(var i=0; i<len; i++)
	{
		if(i==0)
			wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1),checked:'checked'});
		else
			wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1)});
		panel.create('label',{'for':'slide'+(i+1)});
		cssrule1+='input:nth-of-type('+(i+1)+'):checked ~ .panel label:nth-child('+(i+1)+'),';
		cssrule2+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(i+1)+'),';
		cssrule3+='input:nth-of-type('+(i+1)+'):checked ~ label:nth-of-type('+(i+2)+'),';
	}
	cssrule1+='input:nth-of-type('+len+'):checked ~ .panel label:nth-child('+len+') { background: #333; border-color: #fff; }';
	cssrule2+='input:nth-of-type('+len+'):checked ~ img:nth-of-type('+len+') { opacity: 1;z-index: '+(len+1)+';transform: scale(1); }';
	cssrule3+='input:nth-of-type('+len+'):checked ~ label:nth-of-type(1) { z-index: '+(len+1)+'; }';
	for(var i=0; i<len; i++)
	{
		wrapper.create('img',{src:arr[i].value,className:'ims'});
		for(var j=i; j<(len-1)+i; j++)
		{
			if((j+2)<=len)
			{
				cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(j+2)+') {top:'+t+'%; left:'+l+'%;height: '+h+'%;z-index:'+len1+';}';
				t+=tdelta;
				h+=hdelta;
				l+=ldelta;
			}
			else
			{
				cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(k+1)+') {top:'+t1+'%; left:'+l1+'%;height: '+h1+'%;z-index:'+len1+';}';
				t1+=tdelta;
				h1+=hdelta;
				l1+=l1delta;
				k++;
			}
			len1--;
		}
		len1=len;
		t1=t=-40;
		h1=h=180;
		l=-8;
		l1=-28;
		k=0;
	}
	for(var i=0; i<len; i++)
	{
		var lab=wrapper.create('label',{'for':'slide'+(i+1)});
		lab.create('img',{src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='})
	}
	wrapper.n.appendChild(panel.n);
	styles.n.innerHTML=cssrule1+' '+cssrule2+' '+cssrule3+' '+cssrule4;
	self.frames["slidswinframe"].document.open();
	self.frames["slidswinframe"].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><link href="/'+foldername+'/'+foldername+'/css/_additional/slides.css" type="text/css" rel="stylesheet"/><script>function preloadImages(){var arr=document.getElementsByTagName("img"); document.body.removeChild(document.getElementById("loader"));} window.onload=preloadImages;</script></head><body>'+div.n.innerHTML.replace(/checked="checked"/,'checked')+'<div id="loader"><div class="progress"><div></div></div></div></body></html>');
	self.frames["slidswinframe"].document.close();
	div.n.parentNode.removeChild(div.n);
}

var scrollFloat = function()/*фиксация поискового слоя при прокрутке страницы*/
{
	var app = {};
    app.init = function init(node)
	{
		if(node && node.nodeType == 1)	
			handleWindowScroll(node);
    };

    function handleWindowScroll(floatElement)
	{
		var floatElementWrapper = null, realTop = 0, deltaTop = 0, marginTop = 0, marginBottom = 0;
		var addElement=take('main').getpart(null,'div',{id:'infor'})[0];
		window.onscroll = function ()
		{

			var flagpos=getCurrStyle(floatElement).position == "sticky";
		
			if(!flagpos)
			{
				if(floatElement.id=='left_frame')
				{
					var floatElementRect = floatElement.getBoundingClientRect(), StopPos = take(document.body).getpart(null,'div',{id:'infor'})[0].getBoundingClientRect().bottom;
					if (floatElementRect.bottom < StopPos)
					{
						if (floatElementWrapper == null)
						{
							var floatElementStyle = getComputedStyle(floatElement, ''), s = '';
							for (var i = 0; i < floatElementStyle.length; i++)
							{
								if (floatElementStyle[i].indexOf('overflow') == 0 || floatElementStyle[i].indexOf('padding') == 0 || floatElementStyle[i].indexOf('border') == 0 || floatElementStyle[i].indexOf('outline') == 0 || floatElementStyle[i].indexOf('box-shadow') == 0 || floatElementStyle[i].indexOf('background') == 0)
								{
									s += floatElementStyle[i] + ': ' +floatElementStyle.getPropertyValue(floatElementStyle[i]) + '; '
								}
							}
							floatElementWrapper = document.createElement('div');
							floatElementWrapper.className = "stop";
							floatElementWrapper.style.cssText = s + ' box-sizing: border-box; width: ' + floatElement.offsetWidth + 'px;';
							floatElement.insertBefore(floatElementWrapper, floatElement.firstChild);
							var l = floatElement.childNodes.length;
							for (var i = 1; i < l; i++)
							{
								floatElementWrapper.appendChild(floatElement.childNodes[1]);
							}
							floatElement.style.height = floatElementWrapper.getBoundingClientRect().height + 'px';
							floatElement.style.padding = '0';
							floatElement.style.border = '0';
						}
						var floatElementWrapperRect = floatElementWrapper.getBoundingClientRect(), floatElementHeight = floatElementRect.top + floatElementWrapperRect.height, areaHeight = document.documentElement.clientHeight, deltaStop = Math.round(floatElementHeight - StopPos), deltaArea = Math.round(floatElementHeight - areaHeight);
						if (floatElementWrapperRect.height > areaHeight)
						{
							if (floatElementRect.top < realTop)
							{
								if(take('go-to-top').n!=null)
									take('go-to-top').n.className='vis';
								if (deltaArea + marginBottom > deltaStop)
								{
									if (floatElementWrapperRect.bottom - areaHeight + marginBottom <= 0)
									{
										floatElementWrapper.className = 'sticky';
										floatElementWrapper.style.top = Math.round(areaHeight - floatElementWrapperRect.height - marginBottom) + 'px';
										deltaTop = Math.round(marginBottom + floatElementRect.top + floatElementWrapperRect.height - areaHeight);
										marginTop=Math.round(areaHeight - floatElementWrapperRect.height - marginBottom);
									}
								}
								else
								{
									floatElementWrapper.className = 'stop';
									floatElementWrapper.style.top = - deltaStop +'px';
									deltaTop = deltaStop;
								}
							}
							else
							{
								deltaTop = Math.round(floatElementRect.top - marginTop);
								if (floatElementRect.top - marginTop <= 0)
								{
									if (floatElementWrapperRect.top - marginTop >= 0)
									{
										floatElementWrapper.className = 'sticky';
										floatElementWrapper.style.top = marginTop + 'px';
									}
									else
									{
										floatElementWrapper.className = 'stop';
										floatElementWrapper.style.top = - deltaTop + 'px';
									}
								}
								else
								{
									floatElementWrapper.className = '';
									floatElementWrapper.style.top = '';
									deltaTop = 0;
									if(take('go-to-top').n!=null)
										take('go-to-top').n.className='invis';
								}
							}
							realTop = floatElementRect.top;
						}
						else
						{
							if ((floatElementRect.top - marginTop) <= 0)
							{
								if(take('go-to-top').n!=null)
									take('go-to-top').n.className='vis';
								if ((floatElementRect.top - marginTop) <= deltaStop)
								{
									floatElementWrapper.className = 'stop';
									floatElementWrapper.style.top = - deltaStop +'px';
								}
								else
								{
									floatElementWrapper.className = 'sticky';
									floatElementWrapper.style.top = marginTop + 'px';
								}
							}
							else
							{
								floatElementWrapper.className = '';
								floatElementWrapper.style.top = '';
								if(take('go-to-top').n!=null)
									take('go-to-top').n.className='invis';
							}
						}
						window.addEventListener('resize', function() { floatElement.children[0].style.width = getComputedStyle(floatElement,'').width }, false);
					}
				}
				else
				{
					if(take('livesearch').n!=null)
						take('livesearch').hide();
					if(pageOffset().y > floatElement.offsetTop)
					{
						take(floatElement).addclass('fixed');
						floatElement.style.top = '0';
						if(take('go-to-top').n!=null)
						{
							take('go-to-top').delclass('invis');
							take('go-to-top').addclass('vis');
						}
						var arr=take(document.body).getpart(null,'div',{className:'options'});
						for(var i=0; i<arr.length; i++)
						{
							take(arr[i]).hide();
						}
						var arr1=take(document.body).getpart(null,'div',{className:'select'});
						for(var i=0; i<arr1.length; i++)
						{
							if(arr1[i].className.indexOf('_')!=-1)
								arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);
						}
						if(take('header').n!=null)
						{
							take('header').addclass('invis');
						}
						if(take('search_head_layer').n!=null)
						{
							take('search_head_layer').addclass('invis');
						}
						if(take('tab_to_switch_search').n!=null)
						{
							take('tab_to_switch_search').addclass('invis');
						}
					}
					else
					{
						take(floatElement).delclass('fixed');
						floatElement.style.top = '';
						if(take('go-to-top').n!=null)
						{
							take('go-to-top').delclass('vis');
							take('go-to-top').addclass('invis');
						}
						if(take('header').n!=null)
						{
							take('header').delclass('invis');
						}
						if(take('search_head_layer').n!=null)
						{
							take('search_head_layer').delclass('invis');
						}
						if(take('tab_to_switch_search').n!=null)
						{
							take('tab_to_switch_search').delclass('invis');
						}
					}
				}
			}
			else
			{
				if(pageOffset().y > addElement.offsetTop)
				{
					take(floatElement).addclass('wscroll');
					if(take('go-to-top').n!=null)
					{
						take('go-to-top').delclass('invis');
						take('go-to-top').addclass('vis');
					}
					var arr=take(document.body).getpart(null,'div',{className:'options'});
					for(var i=0; i<arr.length; i++)
					{
						take(arr[i]).hide();
					}
					var arr1=take(document.body).getpart(null,'div',{className:'select'});
					for(var i=0; i<arr1.length; i++)
					{
						if(arr1[i].className.indexOf('_')!=-1)
							arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);
					}
					if(take('header').n!=null)
					{
						take('header').addclass('invis');
					}
					if(take('search_head_layer').n!=null)
					{
						take('search_head_layer').addclass('invis');
					}
					if(take('tab_to_switch_search').n!=null)
					{
						take('tab_to_switch_search').addclass('invis');
					}
				}
				else
				{
					take(floatElement).delclass('wscroll');
					if(take('go-to-top').n!=null)
					{
						take('go-to-top').delclass('vis');
						take('go-to-top').addclass('invis');
					}
					if(take('header').n!=null)
					{
						take('header').delclass('invis');
					}
					if(take('search_head_layer').n!=null)
					{
						take('search_head_layer').delclass('invis');
					}
					if(take('tab_to_switch_search').n!=null)
					{
						take('tab_to_switch_search').delclass('invis');
					}
				}
			}
		};
    }
    return app;
}();

function goToTop()/*кнопка "вверх"*/
{
	var t,s;
	s=document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
	t=setInterval(function(){if(s>0)window.scroll(0,s-=50);else clearInterval(t)},50);
}

function KeyPress(e)/*запуск функций по нажатию клавиш*/
{
	var Src=getSrc(e);
	var Key=getCode(e);
	if(Key==13)
	{
		if(Src.nodeName.toLowerCase()=='input')
		{
			if(Src.id=='iCA')
				searchFundHolders();
			else if(Src.id=='mylib')
				findMyLibrary();
			else if(Src.id=='itemaf')
				findInAf();
			else if(Src.id=='itemfulltxt')
				fulltextSearch();
			else if(Src.id=='password')
				doAuthorization();
			else if(Src.id=='readercode2')
				doRegistration();
			else
			{
				if((Src.id=='itemsimple')||(Src.parentNode.className=="itemcombined")||(Src.id=='itemprof')||(Src.id=='item0')||(Src.id=='item1')||(Src.id=='item2'))
					simpleSearch();
				else
					return;
			}
			return false;
		}
	}
	else if(Src.id=="itemsimple")
	{
			if(numDB!="all")
			{
				var db=numDB;
				if(typeof _localiddb!="undefined")
					db=_iddb;
				var mark=take('itemsimple').n.parentNode.previousSibling.firstChild.lastChild.className.substring(1);
				if((typeof dbs[db]["labels"][mark]!="undefined")&&(dbs[db]["labels"][mark][1]=="Y"))
					livesearch();
			}
	}
	else if(Src.parentNode.className=="itemcombined")
	{
		typesearch="combined";
		livesearch(Src);
	}
	else
		return;
}

function setElastic(o)/*резиновая textarea*/
{
	var n=take(o.parentNode).getsign('div',{className:'elastic'})[0];
	var v=o.value;
	v=v.replace(/\n/g,'<br/>');
	n.innerHTML=v+'&nbsp;';
	var h=n.scrollHeight;
	if(h>100)
	{
		o.style.height=h+'px';
	}
	else
		o.style.height='100px';
}

function loadFreeUrl(o,url,rdb)/*открытие ссылки на документ с вводом штрихкода*/
{
	if(url.indexOf('/reg?WW=')!=-1)
	{
		var arg={'cls':'dialog2','target': self,'message':'Номер читательского билета:','width':'400','height':'250'};
		showLayerWin('elwin2',arg);
		var doc=take('elwin2div');
		doc.n.innerHTML="Переход возможен только для читателей зарегистрировавших свою электронную почту";
		var frm=doc.create('form',{style: {width: '100%', height: '100%', textAlign:'center', background:'fafaf1'}});
		var div=frm.create('div',{style:{padding:'20px'}});
		var div1=frm.create('div');
		div.create('input',{type:'text',id:'chelreadercode',value:'',style:{width:'200px',padding:'5px'}});
		div1.create('input',{type:'button', value:'Перейти', onclick:'function() {doLoadFreeUrl(\''+o+'\',\''+url+'\',\''+rdb+'\');}', style:{padding:'5px',margin:'0 5px'}});
		div1.create('input',{type:'button', value:'Закрыть', onclick:'function() {delLayerWin(\'elwin2\');}', style:{padding:'5px',margin:'0 5px'}});
	}
	else
	{
		doLoadFreeUrl(o,url,rdb);
	}
}

function doLoadFreeUrl(o,url,rdb)/*открытие ссылки на документ через статистику*/
{
	typework="";
	var html="url";
	var FUcode="";
	var elementFU=take('chelreadercode');
	if(elementFU && elementFU.n)
		FUcode=elementFU.n.value;
	if(url.indexOf('/reg?WW=')!=-1)
	{
		html="url1";
		if(FUcode=="")
		{
			alert('Введите код читателя!');
			return;
		}
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html",html]);
	gArr.push(["_errorhtml","error1"]);
	querylist.push(["_service","STORAGE:opacholdd:Edd"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	var db=numDB;
	if(typeof rdb!="undefined")
	{
		db=rdb;
	}
	querylist.push(["iddb",db]);
	querylist.push(["idbr",replaceSymb(o)]);
	querylist.push(["$docurl",url]);
	querylist.push(["$numsean",numsean]);
	querylist.push(["$identif",identif]);
	if(FUcode!="")
	{
		querylist.push(["$FU",FUcode]);
		delLayerWin('elwin2');
	}
	querylist.push(["idEd",url]);
	querylist.push(["mode","STATIST_ONLINE"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr,"_blank");
}

function delTWin(o,c)/*поисковый конструктор (история поисков) - удаление слоя-окна с выбором логического оператора*/
{
	if(typeof c == "undefined")
	{
		var ind=o.parentNode.lastChild.getAttribute("data-index");
		if((ind != "")&&(ind != null))
		{
			if(take(ind).n != null)
			{
				if(take(ind).n.checked)
					take(ind).n.checked=false;
			}
		}
	}
	o.parentNode.parentNode.removeChild(o.parentNode);
}

function switchTypeSearch(o)/*виджет библиопоиска - переключение между вкладками*/
{
	var cont=take(document.body);
	var inp1=take('bs').getsign('input',{'name':'query'})[0];
	var inp2=take('itemsimple').n;
	if(o.className=='opac')
	{
		if(cont.hasclass('body_discovery'))
			cont.delclass('body_discovery');
		cont.addclass('body_opac');
		if(inp1 != null)
		{
			if(inp2 != null)
			{
				numDB=numdbBIBL;
				typework="search";
				typesearch="simple";
				//chooseBase(numDB);
				editqueryflag=false;
				switchSearch("simple");
				if(take('currdb').n!=null)
				{
					var currdb=take('currdb').n;
					if(currdb.nodeName.toLowerCase()=="span")
					{
						currdb.innerHTML=dbs[numDB]["alias"];
						currdb.className='i'+numDB;
					}
				}
				var lab=take('labs_div_'+numDB).n.firstChild.className.substring(1);
				var span=take('simple_search').tags('span')[0];
				span.className="i"+lab;
				span.innerHTML=dbs[numDB]["labels"][lab][0];
				if(inp1.value != "")
				{
					_bibliostring="";
					inp2.value = inp1.value;
				}
			}
		}
	}
	else
	{
		if(cont.hasclass('body_opac'))
			cont.delclass('body_opac');
		cont.addclass('body_discovery');
		if(inp1 != null)
		{
			if((typeof _bibliostring != "undefined")&&(_bibliostring != ""))
			{
				inp1.focus();
				inp1.value=_bibliostring;
				take(inp1).initevent('input');
				take(inp1).initevent('change');
			}
		}
	}
}

/*------------ скопировать ссылку на поиск в буфер обмена ---------*/

function copySearchToClip(o)
{
	var term=o.parentNode.firstChild.value;
	var showstr=_showstr.replace(/\<i\>/gi,'');
	showstr=showstr.replace(/\<\/i\>/gi,'');
	var tmp=convertlinksearchstr(_str);
	//var str='&query='+encodeURIComponent(prepareTerm(_str))+'&querytext='+encodeURIComponent(showstr);
	var str='&query='+encodeVal(prepareTerm(tmp))+'&querytext='+encodeVal(showstr);
	term=term+''+str;
	o.parentNode.firstChild.value=term;
	o.parentNode.firstChild.select();
	try
	{
		if(document.execCommand("copy"))
		{
			alert('Ссылка скопирована в буфер обмена');
		}
	}
	catch(e)
	{
		alert('Не удалось скопировать адрес ссылки в буфер обмена');
	}
}

/*---------------------------------------------------дополнительные функции-------------------------------------*/

function mailSendToEBA()/*отправка почтового сообщения*/
{
	if((take('mail').n.value=="")||(take('subject').n.value=="")||(take('fio').n.value==""))
	{
		alert("Вы не заполнили все поля или заполнили их неправильно!");
		return;
	}
	var readermail=(take('mail').n!=null)?take('mail'):null;
	var subj=(take('subject').n!=null)?take('subject').n.value:null;
	var fio=(take('fio').n!=null)?take('fio').n.value:null;
	fio="\n\n"+fio;
	var mess=(take('itbody').n!=null)?take('itbody').n.value:null;
	var gArr=new Array();
	gArr.push(["_from",readermail.n.value]);
	gArr.push(["_answer","ok"]);
	gArr.push(["_subject",subj]);
	gArr.push(["_body",fio+"\n"+subj+"\n"+mess+"\n\n"]);
	//ajaxToRCP(gArr,msendedOK,foldername+"/html/_modules/"+modules["mail"].directory+"/mail.php");
	ajaxToRCP(gArr,msendedOK,"/opacg/html/circle/php/mail.php");
	readermail=subj=fio=mess=null;
}

function msendedOK(x)/*подтверждение отправки почтового сообщения*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var answere=take('answere').n.value;
		var msg="";
		var callback='reAnswere';
		if(take('msg').n!=null)
			msg=take('msg').n.value;
		if(take('callback').n!=null)
			callback=take('callback').n.value;
		var arg={'cls':'dialog2','message':msg,'width':'500','height':'400'};
		arg.dispatcher=callback;
		showLayerWin('confirmwin',arg);
		var doc=take('confirmwinform');
		doc.n.innerHTML="";
		doc.create('div',{textNode:answere,className:'red',style:{margin:'50px 10px 0px 10px',fontSize:'140%',textAlign:'center'}});
		setTimeout(eval(callback),1000);
	}
}

function ieslider(o)/*слайдер для IE8*/
{
	if(document.all && !document.addEventListener)
	{
		var ind=o.id;
		switch(ind)
		{
			case 'lab1': take('slider1').visualise(); take('lab3').visualise(); take('slider2').conceal(); take('slider3').conceal(); take('lab1').conceal(); take('lab2').conceal(); take('lab4').conceal();
			break;
			case 'lab2': take('slider2').visualise(); take('lab4').visualise(); take('lab1').visualise(); take('slider1').conceal(); take('slider3').conceal(); take('lab3').conceal(); take('lab2').conceal();
			break;
			case 'lab3': take('slider2').visualise(); take('lab4').visualise(); take('lab1').visualise(); take('slider1').conceal(); take('slider3').conceal(); take('lab3').conceal(); take('lab2').conceal();
			break;
			case 'lab4': take('slider3').visualise(); take('lab2').visualise(); take('slider2').conceal(); take('slider1').conceal(); take('lab1').conceal(); take('lab3').conceal(); take('lab4').conceal();
			break;
			case 'lab5': take('slider4').visualise(); take('lab6').visualise(); take('slider2').conceal(); take('slider1').conceal(); take('slider3').conceal(); take('lab1').conceal(); take('lab3').conceal(); take('lab4').conceal();
			break;
			default: break;
		}
		//take(o).conceal();
	}
	else
		return;
}

function initnum()/*нумерация строк в таблице*/
{
	var arr=take(document.body).getsign('td',{className: 'num'});
	for (var j=0; j<arr.length; j++)
	{
		if((j % 2)==0)
			arr[j].parentNode.className="g";
		else
			arr[j].parentNode.className="w";
		take(arr[j]).text(parseInt(arr[j].parentNode.previousSibling.firstChild.firstChild.nodeValue)+1);
	}
}

function seeAddS(o)/*unused*/
{
	var doc=o.nextSibling;
	if(doc.style.display=="none")
	{
		o.className=(o.className=='seeadd')?'seeaddaktive':'seeaddaktive1';
		doc.style.display="";
	}
	else
	{
		o.className=(o.className=='seeaddaktive')?'seeadd':'seeadd1';
		doc.style.display="none";
	}
}

function findImages()/*модуль фотогалерея*/
{
	var arr=take('infor').getsign('input',{'name':'img'});
	if(arr.length>0)
		preloadImages(arr);
}

function getCookies(thecookiename)/*unused*/
{
	var cookies = false;
	var all = document.cookie;
	if (all === "")
		return cookies;
	else
	{
		var list = all.split("; ");
		for(var i = 0; i < list.length; i++)
		{
			var cookie = list[i];
			var name = cookie.substring(0,cookie.indexOf("="));
			if(name==thecookiename)
			{
				cookies=true;
				break;
			}
		}
		return cookies;
	}
}

/*----------------------------------------------конец дополнительные функции-------------------------------------*/

/*--------------------------------------------------- конец интерфейс --------------------------------------------------*/