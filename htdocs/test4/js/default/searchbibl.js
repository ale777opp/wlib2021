/*------------------------------------------ поиск в библиографии ---------------------------------------------*/

/*живой поиск*/

function livesearch(o)
{
	typework="";
	var item=null;
	var lab="";
	if(typeof o !="undefined")
	{
		livsrc=item=o;
		livlabel=lab=o.className;
		typesearch="combined";
	}
	else
	{
		item=take('itemsimple').n;
		lab=item.parentNode.previousSibling.firstChild.lastChild.className.substring(1);
	}
	var div=take('livesearch');
	var val=item.value;
	var tmp=/^[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]+/;
	if(tmp.test(val))
		val=Trim2(val);
	if((val=="")||(val.length < 1))
	{
		div.hide();
		return;
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["label",lab]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["query",val]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,showLivWin);
}

function showLivWin(x)
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		/*WriteError(error)*/;
	}
	else
	{
		if(response[0]._indx_0!=null)
		{
			var div=take('livesearch');
			div.n.innerHTML="";
			var item=null;
			if(livsrc!=null)
				item=livsrc;
			else
				item=take('itemsimple').n;
			var j=0;
			for (var key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					if((j % 2)==0)
						cls='g';
					else
						cls='w';
					div.create('p',{className:cls,textNode:value._item,onmousedown:'function(){displayVoc(this)}'});
				}
				j++;
			}
			var h=take(item).geth();
			var w=take(item).getw();
			/*var poz=getAbsolutePosition(item);
			var X=poz.x;
			var y=poz.y+h;*/
			var X=elem_rect.x(item);
			var y=elem_rect.y(item)+h;
			div.show();
			div.setx(X);
			div.sety(y);
			div.setw(w);
		}
	}
}

function displayVoc(o)
{
	var text=o.innerHTML;
	var div=take('livesearch');
	var item=null;
	if(livsrc!=null)
		item=take(livsrc);
	else
		item=take('itemsimple');
	text=text.replace(/\(/gi,'[bracket]');
	text=text.replace(/\)/gi,'[/bracket]');
	text=text.replace(/\'/gi,'[apos]');
	text=text.replace(/\"/gi,'[quot]');
	text="'"+text+"'";
	item.conceal();
	item.n.value=text;
	div.hide();
	simpleSearch();
}

/*конец живой поиск*/

/*основные поисковые функции*/

function simpleSearchAll(l,arg)/*поиск во всех базах*/
{
	typework="searchallbases";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);
	var obj=null;
	if(typeof arg != "undefined")
	{
		obj=arg;
	}
	else
	{
		if(typeof l !="undefined")
			obj=createSearchString(l);
		else
			obj=createSearchString();
	}
	if(obj==null)
	{
		alert('Неверно задано поисковое предписание!');
		return;
	}
	typesearch="simple";
	var str=prepareStr(obj._str);
	showstr=prepareStr(obj._showstr);
	showstr=prepareShowstring(showstr);
	querylist.push(["$str",str]);
	querylist.push(["$showstr",showstr]);
	str=brackets(str);
	var term=prepareTerm(str);
	if(term.indexOf('\\\\\\') != -1)
		term=prepareStr(term);
	term=replaceS6(term);
	if((take('searchbox').n != null) && (take('searchbox').n.value != "")) 
		term=take('searchbox').n.value;
	var dbflag=false;
	for(var key in dbs)
	{
		if(dbs[key]["type"]!="AF")
		{
			if((key!="all")&&(key !="clean"))
			{
				if((typeof iddb[key] !="undefined")&&(((typeof l =="undefined")&&(searchlabel!="")&&(typeof dbs[key]["labels"][searchlabel]!="undefined"))||((typeof l !="undefined")&&(typeof dbs[key]["labels"][l]!="undefined"))))
				{
					if(typeof iddb[key][5] != "undefined")
					{
						var arr=iddb[key][5];
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i][0]=="067")
							{
								dbflag=true;
								break;
							}
						}
					}
					if(!dbflag)
					{
						querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
						querylist.push(["_version","1.1.0"]);
						querylist.push(["session",numsean]);
						querylist.push(["iddb",key]);
						querylist.push(["query",term]);
						gArr.push(["querylist",prepareQueryString(querylist,key)]);
						querylist.length=0;
					}
					dbflag=false;
				}
			}
		}
	}
	callToRCP(gArr);
}

function searchInBase(o)/*поиск в конкретной базе из окна поиска по всем базам*/
{
	typework="search";
	typesearch="simple";
	lockedfilters="";
	swfterm="";
	var howmuch=portion;
	var startfrom=0;
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var handler=modules["search"].directory+'/search.php';
	showstr=prepareStr(_showstr);
	showstr=prepareShowstring(showstr);
	var addlab=findaddlabel(_str);
	var str=brackets(_str);
	var term=prepareTerm(str);
	if(term.indexOf('\\\\\\') != -1)
		term=prepareStr(term);
	term=replaceS6(term);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",replaceSymb(str)]);
	numDB=o.id.substring(1);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=numdbBIBL;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	else
	{
		querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
		querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
		//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
	}
	querylist.push(["iddb",ndb]);
	querylist.push(["query/body",term]);
	if(typeof biblio!="undefined")
	{
		lockedfilters="";
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': startfrom}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		lockedfilters="";
		var count1=-1;
		var countscore=-1;
		for(var key in dbs[ndb]["labels"])
		{
			if(dbs[ndb]["labels"][key][4]=="true")
			{
				count1++;
				querylist.push(["facets["+count1+"]/type","terms"]);
				querylist.push(["facets["+count1+"]/name",key]);
				querylist.push(["facets["+count1+"]/field",key]);
				querylist.push(["facets["+count1+"]/limit","500"]);
				if(dbs[ndb]["labels"][key][5] != "undefined")
				{
					querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
					querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
				}
			}
			var score=parseInt(dbs[ndb]["labels"][key][7],10);
			if(score > 1)
			{
				countscore++;
				querylist.push(["boost["+countscore+"]/label",key]);
				querylist.push(["boost["+countscore+"]/score",score]);
			}
		}
		querylist.push(["$solr","yes"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if(typeof dbs[ndb].addqueries !="undefined")
	{
		var obj={};
		obj.term=term;
		obj.db=ndb;
		if(addlab != null)
			obj.label=addlab;
		var arr=prepareAddQuery(obj);
		if(arr!=null)
			Array.prototype.push.apply(gArr, arr);
	}
	callToRCP(gArr);
}

function simpleSearch(l,arg)/*основной поиск*/
{
	if(typeof arg == "undefined")
		lockedfilters="";
	swfterm="";
	if((typework=="searchallbases")||(numDB=='all'))
	{
		simpleSearchAll(l);
	}
	else
	{
		var addlab="";
		typework="search";
		var obj=null;
		if(typeof arg != "undefined")
		{
			obj=arg;
		}
		else
		{
			if(typeof l !="undefined")
				obj=createSearchString(l);
			else
				obj=createSearchString();
			if(typeof _sign != "undefined")
				_sign=undefined;
			if(typeof _newrecs != "undefined")
				_newrecs=undefined;
			if(typeof _month != "undefined")
				_month=undefined;
			if(typeof _year != "undefined")
				_year=undefined;
		}
		if(obj==null)
		{
			alert('Неверно задано поисковое предписание!');
			return;
		}
		var action="php";
		if(typeof biblio!="undefined")
			action="biblio";
		var handler=modules["search"].directory+'/search.php';
		showstr=prepareStr(obj._showstr);
		showstr=prepareShowstring(showstr);
		var str=obj._str;
		if(typeof obj._addlabel != "undefined")
			addlab=obj._addlabel;
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action",action]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",0]);
		querylist.push(["start",0]);
		querylist.push(["$start",0]);
		querylist.push(["$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		var outfrm=outform;
		var ndb=numDB;
		if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
			ndb=_iddb;
		if(typeof dbs[ndb].outform!="undefined")
			outfrm=dbs[ndb].outform;
		querylist.push(["$outform",outfrm]);
		var countforms=-1;
		querylist.push(["outformList["+(++countforms)+"]/outform",outfrm]);
		querylist.push(["outformList["+(++countforms)+"]/outform","LINEORD"]);
		if(outfrm=="SHORTFM")
		{
			querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMS"]);
			querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMSTR"]);
		}
		else
		{
			querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEEXEMPLARS"]);
			querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEECOPY"]);
			querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLELICENSE"]);
		}
		if((searchlabel=="")&&(typesearch == "simple"))
			searchlabel=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
		if(searchlabel!="")
		{
			querylist.push(["$searchlabel",searchlabel]);
		}
		if(searchtermin!="")
		{
			if(searchtermin.indexOf('*')!=-1)
				searchtermin=searchtermin.substring(0,searchtermin.indexOf('*'));
			querylist.push(["$searchtermin",searchtermin]);
		}
		querylist.push(["iddb",ndb]);
		str=brackets(str);
		var term=prepareTerm(str);
		if(term.indexOf('\\\\\\') != -1)
			term=prepareStr(term);
		term=replaceS6(term);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(typeof biblio!="undefined")
		{
			var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
			if(typeof obj._bstr!="undefined")
				bobj.filters=obj._bstr;
			gArr.push(["_bibliostr",JSON.stringify(bobj)]);
			gArr.push(["_session",numsean]);
			if(typeof obj._history!="undefined")
				querylist.push(["_history","yes"]);
			querylist.push(["$bibliosearch","yes"]);
		}
		if(typeof solr!="undefined")
		{
			if(lockedfilters != "")
			{
				term='('+term+') AND '+prepareTerm(obj._bstr);
			}
			if(typeof arg != "undefined")
			{
				if((typeof _sortlabel != "undefined")&&(typeof _sortdirect != "undefined"))
				{
					querylist.push(["query/label",_sortlabel]);
					querylist.push(["query/direct",_sortdirect]);
					querylist.push(["$sortlabel",_sortlabel]);
					querylist.push(["$sortdirect",_sortdirect]);
				}
			}
			var count1=-1;
			var countscore=-1;
			for(var key in dbs[ndb]["labels"])
			{
				if(dbs[ndb]["labels"][key][4]=="true")
				{
					count1++;
					querylist.push(["facets["+count1+"]/type","terms"]);
					querylist.push(["facets["+count1+"]/name",key]);
					querylist.push(["facets["+count1+"]/field",key]);
					querylist.push(["facets["+count1+"]/limit","500"]);
					if(dbs[ndb]["labels"][key][5] != "undefined")
					{
						querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
						querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
					}
				}
				if(typeof obj._exclude!="undefined")
				{
					var arr=obj._exclude;
					var count=0;
					for(var j=0; j<arr.length; j++)
					{
						if(key==arr[j][0])
						{
							querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);
							count++;
						}
					}
				}
				var score=parseInt(dbs[ndb]["labels"][key][7],10);
				if(score > 1)
				{
					countscore++;
					querylist.push(["boost["+countscore+"]/label",key]);
					querylist.push(["boost["+countscore+"]/score",score]);
				}
			}
			querylist.push(["$solr","yes"]);
			if((typeof obj._history!="undefined")||(lockedfilters!=""))
				querylist.push(["_history","yes"]);
		}
		if((take('searchbox').n != null) && (take('searchbox').n.value != "")) 
			term=take('searchbox').n.value;
		querylist.push(["query/body",term]);
		
		/*сортировка*/
		var label="0";
		if(typeof usesortlabel != "undefined")
			label=usesortlabel;
		if(typeof obj._sortlabel != "undefined")
			label=obj._sortlabel;
		var direct="asc";
		if((label=='PY')||(label=='DT'))
			direct="desc";
		if(typeof obj._sortdirect != "undefined")
			direct=obj._sortdirect;
		if(label!="0")
		{
			querylist.push(["query/label",label]);
			querylist.push(["query/direct",direct]);
			querylist.push(["$sortlabel",label]);
			querylist.push(["$sortdirect",direct]);
		}
		/*конец сортировка*/
		
		if(typesearch!='combined')
			typesearch='simple';
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		if(searchlabel!="")/*псевдофасеты для проекта rusfolknasledie*/
		{
			if(typeof dbs[ndb]["labels"][searchlabel][4]!="undefined")
			{
				if((dbs[ndb]["labels"][searchlabel][4]!="Y")&&(dbs[ndb]["labels"][searchlabel][4]!="N")&&(dbs[ndb]["labels"][searchlabel][4]!="true")&&(dbs[ndb]["labels"][searchlabel][4]!="false")&&(dbs[ndb]["labels"][searchlabel][4]!=""))
				{
					var arr=dbs[ndb]["labels"][searchlabel][4].split(',');
					for(var i=0; i<arr.length;i++)
					{
						querylist.length=0;
						querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
						querylist.push(["_version","1.2.0"]);
						querylist.push(["session",numsean]);
						querylist.push(["label",arr[i]]);
						querylist.push(["length",100]);	
						querylist.push(["iddb",ndb]);
						querylist.push(["query",searchtermin]);
						querylist.push(["$facetlabel",arr[i]]);
						querylist.push(["$facettermin",searchtermin]);
						querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);
						gArr.push(["querylist",prepareQueryString(querylist)]);
					}
				}
			}
		}
		livsrc=null;
		livlabel="";
		if(typeof dbs[ndb].addqueries !="undefined")
		{
			var obj={};
			obj.term=term;
			obj.db=ndb;
			if(addlab != "")
				obj.label=addlab;
			var arr=prepareAddQuery(obj);
			if(arr!=null)
				Array.prototype.push.apply(gArr, arr);
		}
		callToRCP(gArr);
	}
}

function nextSearch(c)/*основной поиск - вывод порций*/
{
	if(typeof _newrecs !="undefined")
	{
		searchNewRecs(numDB);
	}
	else
	{
	typework="search";
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		if((typeof _start!="undefined")&&(typeof _see =="undefined"))
			startfrom=_start;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var handler=modules["search"].directory+'/search.php';
	var str=prepareStr(_str);
	showstr=prepareStr(_showstr);
	showstr=prepareShowstring(showstr);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	if(typeof biblio!="undefined")
		querylist.push(["start",0]);
	else
		querylist.push(["start",startfrom]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_history","yes"]);
	if(typeof _lastdb!="undefined")
		numDB=_lastdb;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=_iddb;
	querylist.push(["iddb",ndb]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	//querylist.push(["_str",convertseef(str)]);
	var addlab=findaddlabel(str);
	var outfrm=outform;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	else
	{
		querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
		querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
		//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
	}
	if(typeof _searchtitle!="undefined")
		querylist.push(["$searchtitle",_searchtitle]);

	str=brackets(str);
	var term=prepareTerm(str);
	if(term.indexOf('\\\\\\') != -1)
		term=prepareStr(term);
	term=replaceS6(term);
	
	if(typeof _filterstr!="undefined")
	{
		querylist.push(["$filterstr",_filterstr]);
		querylist.push(["$filtersids",_filtersids]);
		querylist.push(["$fshowstr",_fshowstr]);
		var filterstr=brackets(_filterstr);
		filterstr=prepareTerm(filterstr);
		if(filterstr.indexOf('\\\\\\') != -1)
			filterstr=prepareStr(filterstr);
		filterstr=replaceS6(filterstr);
		term+=' AND '+filterstr;
	}
	if(typeof _rubricator !="undefined")
		querylist.push(["$rubricator",_rubricator]);
	if(typeof _rshowstr !="undefined")
		querylist.push(["$rshowstr",_rshowstr]);
	if(typeof _swfterm!="undefined")
	{
		swfterm=_swfterm;
		term=prepareTerm(swfterm);
		if(term.indexOf('\\\\\\') != -1)
			term=prepareStr(term);
		term=replaceS6(term);
	}
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	var label="0";
	var direct="asc";
	if(typeof _sortlabel !="undefined")
		label=_sortlabel;
	if(take('sortlab').n!=null)
		label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;
	if(typeof _direct !="undefined")
		direct=_direct;
	if((label=='PY')||(label=='DT'))
		direct="desc";
	if(label!="0")
	{
		querylist.push(["query/label",label]);
		querylist.push(["query/direct",direct]);
		//querylist.push(["$label",label]);
		querylist.push(["$sortlabel",label]);
		querylist.push(["$sortdirect",direct]);
	}
	if(typeof biblio!="undefined")
	{
		if(label!="0")
		{
			if((label=='DT')||(label=='PY'))
				term+=' SORTD '+label;
			else
				term+=' SORT '+label;
		}
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': startfrom}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
		//if(fobj!=null)
		//	querylist.push(["$facets",fobj._bshowstr]);
	}
	if(typeof solr!="undefined")
	{
		var fobj=prepareFacetsForBibliosearch();
		if(fobj != null)
		{
			if(lockedfilters != "")
			{
				var tmp=fobj._bstr;
				tmp=prepareTerm(tmp);
				if(tmp.indexOf('\\\\\\') != -1)
					tmp=prepareStr(tmp);
				tmp=replaceS6(tmp);
				term='('+term+') AND '+tmp;
			}
		}
		var count1=-1;
		var countscore=-1;
		for(var key in dbs[ndb]["labels"])
		{
			if(dbs[ndb]["labels"][key][4]=="true")
			{
				count1++;
				querylist.push(["facets["+count1+"]/type","terms"]);
				querylist.push(["facets["+count1+"]/name",key]);
				querylist.push(["facets["+count1+"]/field",key]);
				querylist.push(["facets["+count1+"]/limit","500"]);
				if(dbs[ndb]["labels"][key][5] != "undefined")
				{
					querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
					querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
				}
			}
			if((fobj != null)&&(typeof fobj._exclude!="undefined"))
			{
				var arr=fobj._exclude;
				var count=0;
				for(var j=0; j<arr.length; j++)
				{
					if(key==arr[j][0])
					{
						querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);
						count++;
					}
				}
			}
			var score=parseInt(dbs[ndb]["labels"][key][7],10);
			if(score > 1)
			{
				countscore++;
				querylist.push(["boost["+countscore+"]/label",key]);
				querylist.push(["boost["+countscore+"]/score",score]);
			}
		}
		querylist.push(["$solr","yes"]);
	}
	querylist.push(["query/body",term]);
	if((typeof _searchlabel != "undefined")&&(_searchlabel != ""))
	{
		querylist.push(["$searchlabel",_searchlabel]);
	}
	if(typeof _searchtermin != "undefined")
	{
		var stermin=prepareStr(_searchtermin);
		stermin=replaceSymb(_searchtermin);
		querylist.push(["$searchtermin",stermin]);
	}
	if(typeof _lightstring != "undefined")
	{
		savedstring=_lightstring;
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if((typeof _searchlabel != "undefined")&&(_searchlabel != ""))
	{
		if((typeof dbs[ndb]["labels"][_searchlabel]!="undefined")&&(typeof dbs[ndb]["labels"][_searchlabel][4]!="undefined"))
		{
			if((dbs[ndb]["labels"][_searchlabel][4]!="Y")&&(dbs[ndb]["labels"][_searchlabel][4]!="N")&&(dbs[ndb]["labels"][_searchlabel][4]!="true")&&(dbs[ndb]["labels"][_searchlabel][4]!="false")&&(dbs[ndb]["labels"][_searchlabel][4]!=""))
			{
				var arr=dbs[ndb]["labels"][_searchlabel][4].split(',');
				for(var i=0; i<arr.length;i++)
				{
					querylist.length=0;
					querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
					querylist.push(["_version","1.2.0"]);
					querylist.push(["session",numsean]);
					querylist.push(["label",arr[i]]);
					querylist.push(["length",100]);	
					querylist.push(["iddb",ndb]);
					querylist.push(["query",_searchtermin]);
					querylist.push(["$facetlabel",arr[i]]);
					querylist.push(["$facettermin",_searchtermin]);
					querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);
					gArr.push(["querylist",prepareQueryString(querylist)]);
				}
			}
		}
	}
	if(typeof dbs[ndb].addqueries !="undefined")
	{
		var obj={};
		obj.term=term;
		obj.db=ndb;
		if(addlab != null)
			obj.label=addlab;
		var arr=prepareAddQuery(obj);
		if(arr!=null)
			Array.prototype.push.apply(gArr, arr);
	}
	callToRCP(gArr);
	}
}

function showLable(o)/*поиск по подсвеченным полям в подробной форме вывода*/
{
	typework="search";
	swfterm="";
	lockedfilters="";
	var lab=o.className;
	if(lab=="AF")
	{
		//numDB=numdbf;
		/*костыль для ФЭМБ*/
		//if(o.firstChild.value.indexOf('MUAF')!=-1)
		//	numDB="6";
		//searchAF(o.firstChild.value,"ID");
		findAfBaseById(o.firstChild.value,o.previousSibling.firstChild.innerHTML);
		//getAnnotation(o.firstChild.value,"ID",null,o.previousSibling.firstChild.innerHTML);
	}
	else
	{
		var db=numDB;
		if(typeof _localiddb!="undefined")
			db=_iddb;
		//if(typeof dbs[db]["labels"][lab] =="undefined")/*костыль из-за бардака с метками*/
		/*{
			if(lab=="RP")
				lab="AC";
			if(lab=="TM")
				lab="SH";
		}*/
		if(dbs[db]["type"]=="AF")
			db=numdbBIBL;
		if(typeof dbs[db]["labels"][lab] !="undefined")
		{
			var action="php";
			if(typeof biblio!="undefined")
				action="biblio";
			var labtext=dbs[db]["labels"][lab][0];
			var howmuch=portion;
			var startfrom=0;
			var handler=modules["search"].directory+'/search.php';
			if(typeof _sign != "undefined")
				_sign=undefined;
			if(typeof _newrecs != "undefined")
				_newrecs=undefined;
			if(typeof _month != "undefined")
				_month=undefined;
			if(typeof _year != "undefined")
				_year=undefined;
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action",action]);
			gArr.push(["_errorhtml","error1"]);
			gArr.push(["_handler",handler]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.7.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["_start",startfrom]);
			querylist.push(["start",startfrom]);
			querylist.push(["$length",howmuch]);
			querylist.push(["length",howmuch]);
			/*if(typeof $lastdb!="undefined")
				numDB=$lastdb;
			var ndb=numDB;
			if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
				ndb=_iddb;*/
			querylist.push(["iddb",db]);
			numDB=db;
			var term="";
			var termtext="";
			term=(o.firstChild.nodeValue != null)?o.firstChild.nodeValue:o.firstChild.firstChild.nodeValue;
			termtext=(o.firstChild.nodeValue != null)?o.firstChild.nodeValue:o.firstChild.firstChild.nodeValue;
			if((o.parentNode)&&(o.parentNode.lastChild.nodeName.toLowerCase()=='input')&&(o.parentNode.lastChild.className=='searcht'))
			{
				term=o.parentNode.lastChild.value;
				term=convertseef(term);
			}
			else
			{
				term=replaceSymb(term);
				if(term.indexOf('(')!=-1)
					term="[apos]"+term+"[/apos]";
			}
			showstr=prepareStr("<i>"+labtext+" </i>"+termtext);
			showstr=prepareShowstring(showstr);
			var str="[bracket]"+lab+" "+term+"[/bracket]";
			var fstr=convertlightstring3(showstr);
			lightstring=fstr;
			querylist.push(["_showstr",showstr]);
			querylist.push(["_str",str]);
			term=prepareTerm(str);
			if(term.indexOf('\\\\\\') != -1)
				term=prepareStr(term);
			term=replaceS6(term);
			var outfrm=outform;
			//var ndb=numDB;
			//if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
			//	ndb=_iddb;
			if(typeof dbs[db].outform!="undefined")
				outfrm=dbs[db].outform;
			querylist.push(["$outform",outfrm]);
			querylist.push(["$searchlabel",lab]);
			querylist.push(["outformList[0]/outform",outfrm]);
			querylist.push(["outformList[1]/outform","LINEORD"]);
			if(outfrm=="SHORTFM")
			{
				querylist.push(["outformList[2]/outform","SHORTFMS"]);
				querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
			}
			else
			{
				querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
				querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
				//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
			}
			querylist.push(["query/body",term]);
			querylist.push(["query/params[0]/name","presence"]);
			querylist.push(["query/params[0]/value","INCLUDE"]);
			if(typeof biblio!="undefined")
			{
				lockedfilters="";
				var bobj={'query': term ,'databases':[db],'paging':{'limit': portion,'offset': startfrom}};
				var fobj=prepareFacetsForBibliosearch();
				if(fobj!=null)
					bobj.filters=fobj._bstr;
				gArr.push(["_bibliostr",JSON.stringify(bobj)]);
				gArr.push(["_session",numsean]);
				querylist.push(["$bibliosearch","yes"]);
				//if(fobj!=null)
				//	querylist.push(["$facets",fobj._bshowstr]);
			}
			if(typeof solr!="undefined")
			{
				lockedfilters="";
				var count1=-1;
				var countscore=-1;
				for(var key in dbs[db]["labels"])
				{
					if(dbs[db]["labels"][key][4]=="true")
					{
						count1++;
						querylist.push(["facets["+count1+"]/type","terms"]);
						querylist.push(["facets["+count1+"]/name",key]);
						querylist.push(["facets["+count1+"]/field",key]);
						querylist.push(["facets["+count1+"]/limit","500"]);
						if(dbs[db]["labels"][key][5] != "undefined")
						{
							querylist.push(["facets["+count1+"]/sort/entity",dbs[db]["labels"][key][5]]);
							querylist.push(["facets["+count1+"]/sort/order",dbs[db]["labels"][key][6]]);
						}
					}
					var score=parseInt(dbs[db]["labels"][key][7],10);
					if(score > 1)
					{
						countscore++;
						querylist.push(["boost["+countscore+"]/label",key]);
						querylist.push(["boost["+countscore+"]/score",score]);
					}
				}
				querylist.push(["$solr","yes"]);
			}
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist)]);
			if(typeof dbs[db].addqueries !="undefined")
			{
				var obj={};
				obj.term=term;
				obj.db=db;
				obj.label=lab;
				var arr=prepareAddQuery(obj);
				if(arr!=null)
					Array.prototype.push.apply(gArr, arr);
			}
			callToRCP(gArr);
		}
		else
		{
			alert('Метка '+lab+' отсутствует в системе!');
			return;
		}
	}
}

function historySearch(ind)/*поиск из истории поиска*/
{
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	var str=etb=handler=lab="";
	showstr="";
	var stri=take('str'+ind);
	var showstri=take('showstr'+ind);
	var etbi=take('etb'+ind);
	var outformi=take('outf'+ind);
	var handleri=take('hand'+ind);
	var outfrm=outform;
	if(etbi.n!=null)
	{
		numDB=etbi.n.innerHTML.substring(0,etbi.n.innerHTML.indexOf(':'));
		etb=etbi.n.innerHTML.substring(etbi.n.innerHTML.indexOf(':')+1);
	}
	if(stri.n!=null)
	{
		str=stri.n.innerHTML;
		var part=str.substring(0,str.indexOf(' '));
		lab=part.substring(part.lastIndexOf('[bracket]')+9);
		if(lab=='COD')
			lab='MS';
		if((lab=='AUIDS')||(lab=='ID'))
		{
			var count=-1;
			for(var key in dbs[numDB]["labels"])
			{
				count++;
				if(count==4)
				{
					lab=key;
					break;
				}
			}
		}
	}
	if((showstri.n!=null)&&(showstri.n.innerHTML!=""))
	{
		showstr=prepareStr(showstri.n.innerHTML);
	}
	if(handleri.n!=null)
		handler=handleri.n.innerHTML;

	showstr=prepareShowstring(showstr);
	lightstring=convertlightstring3(showstr);

	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	if(typeof _localiddb!="undefined")
		querylist.push(["iddb",_localiddb]);
	else
		querylist.push(["iddb",numDB]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["_history","yes"]);	
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	var addlab=findaddlabel(str);
	if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
		outfrm=dbs[numDB].outform;
	if(outformi.n!=null)
		if(outformi.n.innerHTML!="")
			outfrm=outformi.n.innerHTML;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	else
	{
		querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
		querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
		//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
	}
	str=brackets(str);
	var term=prepareTerm(str);
	if(term.indexOf('\\\\\\') != -1)
		term=prepareStr(term);
	term=replaceS6(term);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["$sortlabel",""]);
	querylist.push(["$searchlabel",lab]);
	if(typeof biblio!="undefined")
	{
		lockedfilters="";
		var bobj={'query': prepareTerm(str) ,'databases':[numDB],'paging':{'limit': portion,'offset': 0}};
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		lockedfilters="";
		var count1=-1;
		var countscore=-1;
		for(var key in dbs[numDB]["labels"])
		{
			if(dbs[numDB]["labels"][key][4]=="true")
			{
				count1++;
				querylist.push(["facets["+count1+"]/type","terms"]);
				querylist.push(["facets["+count1+"]/name",key]);
				querylist.push(["facets["+count1+"]/field",key]);
				querylist.push(["facets["+count1+"]/limit","500"]);
				if(dbs[numDB]["labels"][key][5] != "undefined")
				{
					querylist.push(["facets["+count1+"]/sort/entity",dbs[numDB]["labels"][key][5]]);
					querylist.push(["facets["+count1+"]/sort/order",dbs[numDB]["labels"][key][6]]);
				}
			}
			var score=parseInt(dbs[numDB]["labels"][key][7],10);
			if(score > 1)
			{
				countscore++;
				querylist.push(["boost["+countscore+"]/label",key]);
				querylist.push(["boost["+countscore+"]/score",score]);
			}
		}
		querylist.push(["$solr","yes"]);
	}
	if(str.indexOf('DT ')!=-1)
	{
		querylist.push(["query/label","DT"]);
		querylist.push(["query/direct","desc"]);
		querylist.push(["$sortlabel","DT"]);
		querylist.push(["$sortdirect","desc"]);
		querylist.push(["$direct","desc"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if(typeof dbs[numDB].addqueries !="undefined")
	{
		var obj={};
		obj.term=term;
		obj.db=numDB;
		if(addlab != null)
			obj.label=addlab;
		var arr=prepareAddQuery(obj);
		if(arr!=null)
			Array.prototype.push.apply(gArr, arr);
	}
	callToRCP(gArr);
}

function createSearchString(l)/*формирование поискового запроса*/
{
	var obj={_str:"",_showstr:""};
	if((typeof scrolllayer != "undefined")&&(scrolllayer=="left_frame"))
		typesearch='combined';
	lightstring="";
	savedstring="";
	lockedstring="";
	if((typesearch=='simple')||(typesearch=='combined')||((typeof l !="undefined")&&((l=='AUIDS')||(l=='COD'))))
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		var tmp="";
		if(typesearch=='combined')
		{
			if(showrubterm!="")
				tmp=showrubterm;
			if(livsrc!=null)
				tmp=livsrc.value;
			if(tmp=="")
				if(vocobj!="")
					tmp=take(vocobj).n.value;
		}
		else
			tmp=take('simple_search').getsign('input',{type:'text'})[0].value;
		if((tmp!='') && (tmp.length > 1))
		{
			var lab="";
			if(typesearch=='combined')
			{
				lab=livlabel;
				if(lab=="")
					if(vocobj!="")
						lab=take(vocobj).n.className;
			}
			else
				lab=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
			if(typeof l !="undefined")
				lab=l;
			if(typeof dbs[ndb]["labels"][lab]!="undefined")
			{
				var labtext=dbs[ndb]["labels"][lab][0];
				var tmpl=/'$/;
				if(tmpl.test(tmp))
				{
					tmp=tmp.substring(1,tmp.length-1);
					tmp=tmp.replace(/\' OR \'/gi,"[/apos] OR [apos]");
					tmp=tmp.replace(/\' AND \'/gi,"[/apos] AND [apos]");
					tmp=replaceSymb(tmp);
					tmp="[apos]"+tmp+"[/apos]";
				}
				lightarr.push(convertlightstring(tmp));
				if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8] != "undefined"))
					lab=dbs[ndb]["labels"][lab][8];
				searchlabel=lab;
				obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
				searchtermin=replaceSymb(tmp);
				if(showtext!="")
					obj._showstr+='<i>'+labtext+'</i> '+showtext;
				else
					obj._showstr+='<i>'+labtext+'</i> '+tmp;
			}
			else
				return null;
		}
		else
			return null;
	}
	else if(typesearch=='authority')
	{
		var tmp=take('authority_search').getsign('input',{type:'text'})[0].value;
		if((tmp!='') && (tmp.length > 1))
		{
			var lab=take('authority_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
			if(typeof l !="undefined")
				lab=l;
			var labtext=dbs[numDB]["labels"][lab][0];
			obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
			obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
		}
		else
			return null;
	}
	else if(typesearch=='expand')
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		var arri=take('expand_search').getsign('input',{className:'iLAB'});
		var arr=[];
		var count=0;
		var countl=0;
		for(var i=0; i<arri.length; i++)
		{
			if(arri[i].value!="")
			{
				arr.push(arri[i]);
				count++;
			}
		}
		for(var i=0; i<arr.length; i++)
		{
			var lab=null;
			var log=null;
			if(arr[i].parentNode.previousSibling.className=='opt1')
			{
				lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);
				log=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);
			}
			else
				lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);
			var term=arr[i].value;
			term=term.Trim();
			var term1=term2=tmp="";
			var labtext=dbs[ndb]["labels"][lab][0];
			if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8] != "undefined"))
				lab=dbs[ndb]["labels"][lab][8];
			if(i==0)
				searchlabel=lab;
			if((term.indexOf("' OR '")!=-1)||(term.indexOf("' AND '")!=-1)||(term.indexOf("' NOT '")!=-1))
			{
				term=term.substring(1,term.length-1);
				tmp=term.replace(new RegExp("' AND '",'g')," И ");
				tmp=tmp.replace(new RegExp("' OR '",'g')," ИЛИ ");
				obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
				var arr1=term.split('\' AND \'');
				for(var j=0; j<arr1.length; j++)
				{
					if(arr1[j]!="")
					{
						var arr2=arr1[j].split('\' OR \'');
						for(var z=0; z<arr2.length; z++)
						{
							term1+=arr2[z];
							if(z<(arr2.length-1))
								term1+="[/apos] OR [apos]";
						}
						if(j<(arr1.length-1))
							term1+="[/apos] AND [apos]";
					}
				}
				term1=term1.replace(/\' NOT \'/gi,"[/apos] NOT [apos]");
				term1="[apos]"+replaceSymb(term1)+"[/apos]"
			}
			else
			{
				var tmpl=/'$/;
				if(tmpl.test(term))
				{
					term1=term.substring(1,term.length-1);
					term1=replaceSymb(term1);
					if((term.indexOf("BETWEEN '")==-1)&&(term.indexOf("LE '")==-1)&&(term.indexOf("GE '")==-1))
						obj._showstr+='<i>'+labtext+'</i> '+term1;
					else
						obj._showstr+='<i>'+labtext+'</i> '+replaceSymb7(term);
					term1="[apos]"+term1+"[/apos]";
				}
				else
				{
					term1=replaceSymb(term);
					if((log!=null)&&(log!="EXACT"))
					{
						if(log=='ANY')
							term1=term1.replace(/\s{1,}/g,' OR ');
						else
							term1=term1.replace(/\s{1,}/g,' AND ');
					}
					var showterm=term1.replace(/ OR /g,' ИЛИ ');
					showterm=showterm.replace(/ AND /g,' И ');
					obj._showstr+='<i>'+labtext+'</i> '+showterm;
				}
			}
			if((term.indexOf("BETWEEN '")==-1)&&(term.indexOf("LE '")==-1)&&(term.indexOf("GE '")==-1))
			{
				lightarr.push(convertlightstring(term1));
				obj._str+='[bracket]'+lab+' '+term1+'[/bracket]';
				if(i==0)
					searchtermin=term1;
			}
			else
			{
				obj._str+='[bracket]'+lab+' '+convertlimits(term)+'[/bracket]';
				if(i==0)
					searchtermin=convertlimits(term);
			}
			if(count>1)
			{
				if(i<count-1)
				{
					if(arr[i].parentNode.parentNode.previousSibling.className=='logcontainer')
					{
						obj._str+= ' '+arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)+' ';
						obj._showstr+=' <i>'+dbs[ndb]["labels"][arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)][0]+'</i> ';
					}
					else
					{
						obj._str+= ' AND ';
						obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
					}
				}
			}
		}
		if((take('limits_'+ndb).n!=null)&&(take('limits_'+ndb).n.style.display!="none"))
		{
			var limits=take('limits_'+ndb).getsign('div',{className: 'limits_left'});
			for(var i=0; i<limits.length; i++)
			{
				var ltitle=limits[i].firstChild.innerHTML;
				if(limits[i].lastChild.className=="input")
				{
					if(limits[i].lastChild.firstChild.id.indexOf('one')!=-1)
					{
						var lobj=limits[i].lastChild.firstChild;
						if(lobj.value!="")
						{
							countl++;
							if(count > 0)
							{
								obj._str+= ' AND ';
								obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
							}
							obj._str+= '[bracket]'+lobj.className+' [apos]'+lobj.value+'[/apos][/bracket]';
							obj._showstr+='<i>'+ltitle+'</i> '+lobj.value;
						}
					}
					else
					{
						var lobj=take(limits[i]).tags('input');
						var first=lobj[0].value;
						var last=lobj[1].value;
						var lim=lobj[0].className;
						if(parseInt(first,10)>parseInt(last,10))
							return null;
						else
						{
							if(!isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
							{
								countl++;
								if(count > 0)
								{
									obj._str='[bracket]'+obj._str+ '[/bracket]';
									obj._str+= ' AND ';
									obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								}
								obj._str+='[bracket]'+lim+' BETWEEN [apos]'+first+'[/apos],[apos]'+last+'[/apos][/bracket]';
								obj._showstr+='<i>'+ltitle+' c</i> '+first+' <i>по</i> '+last;
							}
							if(!isNaN(parseInt(first,10))&&isNaN(parseInt(last,10)))
							{
								countl++;
								if(count > 0)
								{
									obj._str='[bracket]'+obj._str+ '[/bracket]';
									obj._str+= ' AND ';
									obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								}
								obj._str+='[bracket]'+lim+' GE [apos]'+first+'[/apos][/bracket]';
								obj._showstr+='<i>'+ltitle+' c</i> '+first+' ';
							}
							if(isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
							{
								countl++;
								if(count > 0)
								{
									obj._str='[bracket]'+obj._str+ '[/bracket]';
									obj._str+= ' AND ';
									obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								}
								obj._str+='[bracket]'+lim+' LE [apos]'+last+'[/apos][/bracket]';
								obj._showstr+='<i>'+ltitle+' по</i> '+last+' ';
							}
						}
					}
				}
				else
				{
					if(limits[i].lastChild.lastChild.className!="all")
					{
						countl++;
						if(count > 0)
						{
							obj._str='[bracket]'+obj._str+ '[/bracket]';
							obj._str+= ' AND ';
							obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
						}
						var lim=limits[i].lastChild.lastChild.className;
						var val=limits[i].lastChild.lastChild.innerHTML;
						obj._str+=convertbrackets(lim);
						obj._showstr+='<i>'+ltitle+'</i> '+val;
					}
				}
			}
		}
		if((count<1)&&(countl<1))
			return null;
	}
	else
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		if((typeof l !="undefined")&&(typeof fromaftobibl!="undefined")&&(l==fromaftobibl[0]))
		{
			var lab=l;
			var labtext=dbs[ndb]["labels"][lab][0];
			if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8] != "undefined"))
				lab=dbs[ndb]["labels"][lab][8];
			tmp=take('itemprof').n.value;
			lightarr.push(convertlightstring(tmp));
			obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
			obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
		}
		else
		{
			var par=take('expr').n;
			var tmp="";
			var tmp2="";
			var tmp3="";
			var tmp4="";
			var tmp6="";
			var ind="";
			if(par.childNodes.length==0)
			{
				if(take('itemprof').n.value!='')
					putLAB(take('sand').n);
				else
					return null;
			}
			for(var j=0; j<par.childNodes.length; j++)
			{
				if(par.childNodes[j].hasChildNodes())
				{
					var ind=par.childNodes[j].id;
					if(par.childNodes[j].innerHTML.indexOf('OR')!=-1)
						tmp3='OR';
					if(par.childNodes[j].innerHTML.indexOf('AND')!=-1)
						tmp3='AND';
					if(par.childNodes[j].innerHTML.indexOf('NOT')!=-1)
						tmp3='NOT';
					var and=take(ind).n.className;
					var arr=take(ind).getsign('span',{className: ind});
					if(arr.length>0)
					{
						for(var i=0; i<arr.length; i++)
						{
							if(ind=='FT')
							{
								tmp=arr[i].innerHTML.replace(/\s*-\s*/g,'-');
								tmp=tmp.replace(/\s{2,}/g,' ');
								tmp=replaceSymb(tmp);
								tmp6=tmp;
							}
							else if(ind=='PY')
							{
								tmp6=arr[i].innerHTML;
								tmp=arr[i].innerHTML.replace(/с \<b\>/i,"BETWEEN [apos]");
								tmp=tmp.replace(/\<\/b\> по \<b\>/i,"[/apos],[apos]");
								tmp=tmp.replace(/\<\/b\>/i,"[/apos]");
							}
							else
							{
								var tmp5=/'$/;
								if(tmp5.test(arr[i].innerHTML))
								{
									tmp=tmp6=arr[i].innerHTML.substring(1,arr[i].innerHTML.length-1);
									tmp=tmp.replace(/\' OR \'/gi,"[apos] OR [/apos]");
									tmp=tmp.replace(/\' AND \'/gi,"[apos] AND [/apos]");
									tmp=tmp.replace(/\' NOT \'/gi,"[apos] NOT [/apos]");
									tmp=replaceSymb(tmp);
									tmp="[apos]"+tmp+"[/apos]";
									tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");
									tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");
									tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");
								}
								else
								{
									tmp=tmp6=arr[i].innerHTML;
									tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");
									tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");
									tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");
									tmp=replaceSymb(tmp);
								}
							}
							tmp2+=tmp;
							tmp4+=tmp6;
							if(i!=(arr.length-1))
							{
								if(tmp3!='')
								{
									tmp2+=' '+tmp3+' ';
									tmp4+=dbs[ndb]["labels"][tmp3][0];
								}
							}
						}
						var labtext=dbs[ndb]["labels"][ind][0];
						if(and!="")
						{
							obj._str+=' '+and+' [bracket]'+ind+' '+tmp2+'[/bracket]';
							obj._showstr+=' <i>'+dbs[ndb]["labels"][and][0]+' '+labtext+'</i> '+tmp4;
						}
						else
						{
							obj._str+='[bracket]'+ind+' '+tmp2+'[/bracket]';
							obj._showstr+='<i>'+labtext+'</i> '+tmp4;
						}
						if(j==0)
						{
							searchlabel=ind;
							searchtermin=tmp2;
						}
						lightarr.push(convertlightstring(tmp2));
						tmp2=tmp=tmp6=tmp4="";
					}
				}
			}
		}
	}
	if((lightarr.length)&&(lightarr.length > 0))
		lightstring=lightarr.join(' ');
	searchtermin=convertlimits2(searchtermin);
	obj._str=convertlimits2(obj._str);
	if((typeof searchlabel != "undefined")&&(searchlabel != ""))
		obj._addlabel=searchlabel;
	return obj;
}

function SeeF(act,str,c)/*ссылки [SEEF]*/
{
	if(act==null)
		act=_id;
	else
		lockedfilters="";
	var actstr=act;
	//act=act.replace(/\[quot\]/gi,'"');
	//act=act.replace(/\[apos\]/gi,"'");
	//act=act.replace(/\[backslash\]/gi,"\\\\");//зависит от выходной формы
	//act=act.replace(/\[backslash\]/gi,"\\");
	act=prepareTerm(act);
	var actjson=JSON.parse(act);
	var term=actjson.query;
	term=convertseef(term);
	_newrecs="";
	var obj={};
	obj._str=term;
	obj._showstr=_showstr;
	if(typeof str != "undefined")
		obj._showstr=prepareShowstring(str);
	simpleSearch(null,obj);
	/*//term=prepareStr(term);
	//term=replaceSlash(term);
	//if((act.indexOf('RELATION')!=-1)&&(typeof str != "undefined")&& (str=='Статьи/части')&&(dbs[numDB].seef=="hierarchical"))
	//{
	//	showArticles(term);
	//}
	//else
	//{
		typework="search";
		var howmuch="";
		var startfrom="";
		//lockedfilters="";
		if(c==null)
		{
			howmuch=portion;
			startfrom=0;
		}
		else
		{
			howmuch=_length;
			startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		}
		var handler=modules["search"].directory+'/search.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
		querylist.push(["_version","2.5.0"]);
		querylist.push(["session",numsean]);
		var str=prepareStr(_str);
		showstr=prepareStr(_showstr);
		str=replaceSymb(str);
		showstr=prepareShowstring(showstr);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		querylist.push(["_history","yes"]);
		if(typeof _lightstring != "undefined")
		{
			savedstring=_lightstring;
		}
		querylist.push(["$see","SEEF"]);
		querylist.push(["$stopfilters","yes"]);
		querylist.push(["$length",howmuch]);
		querylist.push(["_start",startfrom]);
		querylist.push(["length",howmuch]);
		querylist.push(["start",startfrom]);
		querylist.push(["iddb",numDB]);
		querylist.push(["action","SEEF"]);
		var outfrm=outform;
		var ndb=numDB;
		if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
			ndb=_iddb;
		if(typeof dbs[ndb].outform!="undefined")
			outfrm=dbs[ndb].outform;
		if(typeof solr!="undefined")
		{
			var fobj=prepareFacetsForBibliosearch();
			if(fobj != null)
			{
				if(lockedfilters != "")
				{
					term='('+term+') AND '+prepareTerm(fobj._bstr);
				}
			}
			var count1=-1;
			var countscore=-1;
			for(var key in dbs[ndb]["labels"])
			{
				if(dbs[ndb]["labels"][key][4]=="true")
				{
					count1++;
					querylist.push(["facets["+count1+"]/type","terms"]);
					querylist.push(["facets["+count1+"]/name",key]);
					querylist.push(["facets["+count1+"]/field",key]);
					querylist.push(["facets["+count1+"]/limit","500"]);
					if(dbs[ndb]["labels"][key][5] != "undefined")
					{
						querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
						querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
					}
				}
				if((fobj != null)&&(typeof fobj._exclude!="undefined"))
				{
					var arr=fobj._exclude;
					var count=0;
					for(var j=0; j<arr.length; j++)
					{
						if(key==arr[j][0])
						{
							querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);
							count++;
						}
					}
				}
				var score=parseInt(dbs[ndb]["labels"][key][7],10);
				if(score > 1)
				{
					countscore++;
					querylist.push(["boost["+countscore+"]/label",key]);
					querylist.push(["boost["+countscore+"]/score",score]);
				}
			}
			querylist.push(["$solr","yes"]);
		}
		actjson.query=term;
		act=JSON.stringify(actjson);
		querylist.push(["id",act]);
		//querylist.push(["query/body",term]);
		//querylist.push(["query/body",act]);
		querylist.push(["$id",actstr]);
		querylist.push(["$outform",outfrm]);
		querylist.push(["outformList[0]/outform",outfrm]);
		querylist.push(["outformList[1]/outform","LINEORD"]);
		if(outfrm=="SHORTFM")
		{
			querylist.push(["outformList[2]/outform","SHORTFMS"]);
			querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
		}
		else
			querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	//}*/
}

function See(o,ind,act,c,rdb)/*ссылки [SEE*/
{
	if(ind==null)
		ind=_id;
	else
		lockedfilters="";
	if(act==null)
		act=_see;
	var indx=replaceSymb(ind);
	addid="see"+indx;
	if(((act=="SEEF")&&(take('see'+indx).n!=null))&&((typeof dbs[numDB].seef!="undefined")&&(dbs[numDB].seef=="hierarchical")))
	{
		if(take('see'+indx).n.style.display=='none')
		{
			if(take('see'+indx).n.innerHTML=='')
			{
				typework="";
				take('see'+indx).n.innerHTML='<div class="progress small"><div></div></div>';
				var gArr=new Array();
				var querylist=new Array();
				gArr.push(["_action","execute"]);
				gArr.push(["_html","stat"]);
				gArr.push(["_errorhtml","error"]);
				querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
				querylist.push(["_version","1.2.0"]);
				querylist.push(["session",numsean]);
				querylist.push(["label","YTV"]);
				querylist.push(["length",400]);	
				querylist.push(["iddb",numDB]);
				querylist.push(["query",ind]);
				querylist.push(["$tmp",indx]);
				if(typeof _localiddb!="undefined")
					gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
				else
					gArr.push(["querylist",prepareQueryString(querylist)]);
				ajaxToRCP(gArr,showSee2Win);
			}
		}
		showHide2(o,addid);
	}
	else
	{
		if(act=='SEEF')
		{
			SeeF(o,"",c);
		}
		else
		{
			typework="search";
			var howmuch="";
			var startfrom="";
			//lockedfilters="";
			if(c==null)
			{
				howmuch=portion;
				startfrom=0;
			}
			else
			{
				howmuch=_length;
				startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
			}
			var handler=modules["search"].directory+'/search.php';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","php"]);
			gArr.push(["_errorhtml","error1"]);
			gArr.push(["_handler",handler]);
			querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			var str=prepareStr(_str);
			showstr=prepareStr(_showstr);
			str=replaceSymb(str);
			showstr=prepareShowstring(showstr);
			querylist.push(["_showstr",showstr]);
			querylist.push(["_str",str]);
			querylist.push(["_history","yes"]);
			querylist.push(["_start",startfrom]);
			querylist.push(["$length",howmuch]);
			querylist.push(["$see",act]);
			var ndb=numDB;
			if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
				ndb=_iddb;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				querylist.push(["$lastdb",ndb]);
				ndb=rdb;
			}
			querylist.push(["start",startfrom]);
			querylist.push(["length",howmuch]);
			querylist.push(["action",act]);
			var outfrm=outform;
			if(typeof dbs[ndb].outform!="undefined")
				outfrm=dbs[ndb].outform;
			querylist.push(["$outform",outfrm]);
			querylist.push(["outformList[0]/outform",outfrm]);
			querylist.push(["outformList[1]/outform","LINEORD"]);
			if(outfrm=="SHORTFM")
			{
				querylist.push(["outformList[2]/outform","SHORTFMS"]);
				querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
			}
			else
			{
				querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
				querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
				//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
			}
			if(typeof solr!="undefined")
			{
				var count1=-1;
				var countscore=-1;
				for(var key in dbs[ndb]["labels"])
				{
					if(dbs[ndb]["labels"][key][4]=="true")
					{
						count1++;
						querylist.push(["facets["+count1+"]/type","terms"]);
						querylist.push(["facets["+count1+"]/name",key]);
						querylist.push(["facets["+count1+"]/field",key]);
						querylist.push(["facets["+count1+"]/limit","500"]);
						if(dbs[ndb]["labels"][key][5] != "undefined")
						{
							querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
							querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
						}
					}
					var score=parseInt(dbs[ndb]["labels"][key][7],10);
					if(score > 1)
					{
						countscore++;
						querylist.push(["boost["+countscore+"]/label",key]);
						querylist.push(["boost["+countscore+"]/score",score]);
					}
				}
				querylist.push(["$solr","yes"]);
			}
			/*var term='ID '+indx;
			if(typeof solr!="undefined")
			{
				var fobj=prepareFacetsForBibliosearch();
				if(fobj != null)
				{
					if(lockedfilters != "")
					{
						term='('+term+') AND '+prepareTerm(fobj._bstr);
					}
				}
				var count1=-1;
				for(var key in dbs[ndb]["labels"])
				{
					if(dbs[ndb]["labels"][key][4]=="true")
					{
						count1++;
						querylist.push(["facets["+count1+"]/type","terms"]);
						querylist.push(["facets["+count1+"]/name",key]);
						querylist.push(["facets["+count1+"]/field",key]);
						querylist.push(["facets["+count1+"]/limit","500"]);
						if(dbs[ndb]["labels"][key][5] != "undefined")
						{
							querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
							querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
						}
					}
					if((fobj != null)&&(typeof fobj._exclude!="undefined"))
					{
						var arr=fobj._exclude;
						var count=0;
						for(var j=0; j<arr.length; j++)
						{
							if(key==arr[j][0])
							{
								querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);
								count++;
							}
						}
					}
				}
				querylist.push(["$solr","yes"]);
			}*/
			querylist.push(["iddb",ndb]);
			querylist.push(["id",ind]);
			//querylist.push(["query/body",term]);
			querylist.push(["$id",indx]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
			callToRCP(gArr);
		}
	}
}

function showSee2Win(x)/*вывод томов/выпусков по годам*/
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
		var div=take('see'+_tmp);
		div.n.innerHTML="";
		if(response[0]._indx_0!=null)
		{
			var j=0;
			for (var key in response[0])
			{
				if(key.indexOf('indx_')!=-1)
				{
					var value = response[0][key];
					var item = value._item.split('[Y]');
					if(replaceSymb(item[0])==_tmp)
					{
						var span=div.create('span',{id:replaceSymb(value._item),className: 'see', data:'Всего выпусков: '+value._size,onmousedown:'function(){showIssues(this)}'});
						span.create('b',{textNode:item[1]});
						span.text(' г.');
						span.create('i',{className:'comma'});
						div.create('div',{className: 'issuediv',style:{display:'none'}});
						j++;
					}
				}
			}
			if(j==0)
				div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания', style:{textAlign:'center'}});
		}
		else
		{
			div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания', style:{textAlign:'center',margin:'40px 0 0 0'}});
		}
	}
}

function showIssues(o)/*запрос на вывод томов/выпусков за год*/
{
	typework="";
	if(o.nextSibling.style.display=='none')
	{
		if(o.nextSibling.innerHTML=='')
		{
			o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["start",0]);
			querylist.push(["length",400]);
			querylist.push(["iddb",numDB]);
			querylist.push(["outformList[0]/outform","ISSUE"]);
			querylist.push(["query/body","YTV "+o.id]);
			if(typeof dbs[numDB]["labels"]["STVN"]!="undefined")
			{
				querylist.push(["query/label","STVN"]);
				querylist.push(["query/direct","asc"]);
			}
			querylist.push(["$tmp",o.id]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,showIssuesWin);
		}
		o.className+=' border';
		o.nextSibling.style.display='';
	}
	else
	{
		o.className='see';
		o.nextSibling.style.display='none';
	}
}

function showIssuesWin(x)/*вывод томов/выпусков за год*/
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
		var div=take(_tmp).n.nextSibling;
		div.innerHTML="";
		var j=0;
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var value = response[0][key];
				var ind=value._id;
				var item = value._ISSUE_0[0].split('[TULTIP]');
				var span=take(div).create('span',{id:'_'+replaceSymb(ind),className: 'issue', data:item[1],onmousedown:'function(){showRecords(this)}'});
				if(item[0]!="")
					span.create('b',{textNode:item[0]});
				else
					span.create('b',{textNode:item[1]});
				span.create('i',{className:'comma'});
				take(div).create('div',{className: 'recdiv',style:{display:'none'}});
				j++;
			}
		}
	}
}

function showRecords(o)/*запрос на вывод записи на том/выпуск*/
{
	typework="";
	if(o.nextSibling.style.display=='none')
	{
		if(o.nextSibling.innerHTML=='')
		{
			var outfrm=outform;
			if(typeof dbs[numDB].outform!="undefined")
				outfrm=dbs[numDB].outform;
			o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["start",0]);
			querylist.push(["length",portion]);
			querylist.push(["iddb",numDB]);
			querylist.push(["outformList[0]/outform",outfrm]);
			querylist.push(["$outform",outfrm]);
			var count=0;
			if(typeof _linkstring!="undefined")
				querylist.push(["outformList["+(++count)+"]/outform","LINEORD"]);
			if(outfrm=="SHORTFM")
			{
				querylist.push(["outformList["+(++count)+"]/outform","SHORTFMS"]);
				querylist.push(["outformList["+(++count)+"]/outform","SHORTFMSTR"]);
			}
			else
			{
				querylist.push(["outformList["+(++count)+"]/outform","AVAILABLEEXEMPLARS"]);
				querylist.push(["outformList["+(++count)+"]/outform","AVAILABLEECOPY"]);
				//querylist.push(["outformList["+(++count)+"]/outform","AVAILABLELICENSE"]);
			}
			querylist.push(["query/body","ID "+o.id.substring(1)]);
			querylist.push(["$tmp",o.id]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,showRecordsWin);
		}
		o.className+=' border';
		o.nextSibling.style.display='';
	}
	else
	{
		o.className='issue';
		o.nextSibling.style.display='none';
	}
}

function showRecordsWin(x)/*вывод записи на том/выпуск*/
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
		var exquant=0;
		var ecopy=0;
		var lquantity=0;
		var iddbecopy=0;
		var idrececopy="";
		var accesstype="";
		var eurl="";
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var next=take(_tmp).n.nextSibling;
				var div=take(next);
				div.n.innerHTML="";
				var tab=div.create('div',{className:'table w100'});
				var row=tab.create('div',{className:'row'});
				var td4=row.create('div',{className:'td w88x vtop'});
				var td5=row.create('div',{className:'td vtop p10x'});
				var slids=[];
				var j=0;
				var library='';
				var value = response[0][key];
				var ind=value._id;
				var iddb=value._sourceIddb;
				var rdb=value._iddb;
				var outfrm=outform;
				var flagurl=false;
				var seeplace=false;
				if(typeof dbs[rdb].outform!="undefined")
					outfrm=dbs[rdb].outform;
				var imgsrc="";
				if((typeof dbs[rdb].additional.nophoto!="undefined")&&(dbs[rdb].additional.nophoto=="display"))
					imgsrc=pathimg+'/nophoto.png';
				var arrcont="";
				if(outfrm=='SHOTFORM')
					arrcont=value._SHOTFORM_0._content_0;
				else
					arrcont=eval('value._'+outfrm+'_0');
				var arr=[];
				if(typeof value._AVAILABLEEXEMPLARS_1 != "undefined")
					exquant=value._AVAILABLEEXEMPLARS_1._quantity;
				if(typeof value._AVAILABLEEXEMPLARS_0 != "undefined")
					exquant=value._AVAILABLEEXEMPLARS_0._quantity;
				if((typeof value._AVAILABLEECOPY_0 != "undefined") || (typeof value._AVAILABLEECOPY_1 != "undefined"))
				{
					var o=null;
					if(typeof value._AVAILABLEECOPY_0 != "undefined")
						o=value._AVAILABLEECOPY_0;
					else
						o=value._AVAILABLEECOPY_1;
					if(typeof o._ecopy != "undefined")
						ecopy=parseInt(o._ecopy,10);
					else
						ecopy=0;
					if(typeof o._iddbEcopy != "undefined")
						iddbecopy=parseInt(o._iddbEcopy,10);
					else
						iddbecopy=0;
					if(typeof o._quantity != "undefined")
						lquantity=parseInt(o._quantity,10);
					else
						lquantity=0;
					if(typeof o._idRecEcopy != "undefined")
						idrececopy=o._idRecEcopy;
					else
						idrececopy="";
					if(typeof o._accessType != "undefined")
						accesstype=o._accessType;
					else
						accesstype="";
				}
				if(typeof _linkstring!="undefined")
				{
					arr=value._LINEORD_1;					
				}
				for(var i=0; i<arrcont.length;i++)
				{
					var atext=arrcont[i];
					var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;
					if(tmp.test(atext))
						atext=atext.replace(tmp,'');
					atext=parseBB(atext);
					if(atext!="")
					{
						j++;
						if(j==1)
						{
							var outfrm=outform;
							if(typeof dbs[numDB].outform!="undefined")
								outfrm=dbs[numDB].outform;
							if(outfrm=='SHOTFRM')
							{
								td5.n.innerHTML+='<u class="fstr f120 lh140" title="подробнее" onmousedown=addSee(\''+replaceSlash(ind)+'\')>'+atext+'</u>';
							}
							else
								td5.n.innerHTML+='<div class="fstr">'+atext+'</div>';
						}
						else if(j==2)
						{
							td5.n.innerHTML+='<code>'+atext+'</code>';
						}
						else
						{
							if(arrcont[i].indexOf('[CONTENT]')!=-1)
							{
								slids.push(arrcont[i].substring(9));
							}
							if(arrcont[i].indexOf('[IMG]')!=-1)
							{
								imgsrc=arrcont[i].substring(5);
							}
							if(arrcont[i].indexOf('[INSERT]')!=-1)
							{
								var pos=arrcont[i].lastIndexOf('>');
								var span=td5.create('span',{className:'cb'});
								span.create('span',{className:'add1',onmousedown:'function (){showHide(this)}',textNode:'Включает'});
								var div=span.create('div',{style:{display:'none'}});
								div.n.innerHTML=parseBB(arrcont[i].substring(pos+1));
							}
							if(arrcont[i].indexOf('[URL]')!=-1)
							{
								var pos=arrcont[i].indexOf('<');
								var pos1=arrcont[i].indexOf('>');
								var pu=td5.create('div');
								if((typeof dbs[rdb].loadurl != "undefined")&&(dbs[rdb].loadurl=="link"))
								{
									var span=pu.create('span',{className: 'URL'});
									span.create('a',{target:'_blank',textNode:arrcont[i].substring(pos+1,pos1), href:''+arrcont[i].substring(pos1+1)});
								}
								else
								{
									pu.create('span',{className: 'URL u w180x',textNode:arrcont[i].substring(pos+1,pos1),onmousedown:'function (){loadFreeUrl(\''+replaceSlash(ind)+'\',\''+arrcont[i].substring(pos1+1)+'\',\''+rdb+'\');}'});
								}
								flagurl=true;
							}
							if(arrcont[i].indexOf('[SEEF]')!=-1)
							{
								var pos=arrcont[i].indexOf('<');
								var pos1=arrcont[i].indexOf('>');
								var titl=arrcont[i].substring(pos+1,pos1);
								if(titl.indexOf('Статьи')!=-1)
								{
									var ps=td5.create('div',{className:'pt10x'});
									ps.create('a',{id:ind+'articles',className: 'SEEF',textNode:titl, href:'javascript: SeeF(\''+convertseef(arrcont[i].substring(pos1+1))+'\',\''+titl+'\')'});
								}
							}
							if((arrcont[i].indexOf('[SEE6]')!=-1)||(arrcont[i].indexOf('[SEE7]')!=-1))
							{
								seeplace=true;
							}
						}
					}
				}
				if(outfrm=='SHOTFORM')
				{
					for (var arg in value._SHOTFORM_0)
					{
						if(arg.indexOf('_action_')!=-1)
						{
							var val = value._SHOTFORM_0[arg];
							if(val._id=="SEEF")
							{
								if(val._title.indexOf('Первый МГМУ')==-1)
								{
									if(val._title.indexOf('Оригинал')==-1)
									{
										var ps=td5.create('div',{className:'pt10x'});
										ps.create('a',{id:ind+'articles',className: 'SEEF',textNode:val._title, href:'javascript: SeeF(\''+convertseef(val._arg)+'\',\''+val._title+'\')'});
									}
								}							
							}
							if(val._id=='IMG')
							{
								imgsrc=val._arg;
							}
							if(val._id=='URL')
							{
								var pu=td5.create('div');
								if((typeof dbs[rdb].loadurl != "undefined")&&(dbs[rdb].loadurl=="link"))
								{
									var span=pu.create('span',{className: 'URL'});
									span.create('a',{target:'_blank',textNode:val._title, href:''+val._arg});
								}
								else
								{
									pu.create('span',{className: 'URL u w180x',textNode:val._title,onmousedown:'function (){loadFreeUrl(\''+replaceSlash(ind)+'\',\''+val._arg+'\',\''+rdb+'\');}'});
								}
								flagurl=true;
							}
						}
					}
				}
				if((typeof arr !="undefined")&&(arr.length>0))
				{
					if(outfrm != 'SHORTWEB')
					{
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i]!="")
							{
								var p=td5.create('p',{className:arr[i],style:{display:'none'}});
								var span=p.create('span',{style:{fontSize:'100%',marginLeft:'0px'},className:'url',onmousedown:'function () {showOrderWin(this,\''+rdb+'\',\''+replaceSlash(ind)+'\');}'});
								if(arr[i]=="043")
									span.text("Заказ документа");
								if(arr[i]=="058")
									span.text("Показать онлайн");
								if(arr[i]=="059")
									span.text("Заказать онлайн доступ");
								if(arr[i]=="065")
									span.text("Свободный доступ онлайн");
								if(arr[i]=="066")
									span.text("Заказать на биржу");
								if(arr[i]=="068")
									span.text("Внешний ресурс");
								if(arr[i]=="069")
									span.text("Показать онлайн (только в здании библиотеки)");
								if(arr[i]=="078")
									span.text("Свободный доступ онлайн");
								if(arr[i]=="070")
									span.text("Онлайн просмотр документа доступен абонентам ЭБА или в здании библиотеки");
								if(arr[i]=="077")
									span.text("Заказ онлайн доступа возможен только для абонентов ЭБА");
								if(arr[i]=="076")
									span.text("Доступ к документу возможен только в здании библиотеки");
								if(arr[i]=="079")
									span.text("Доступ к документу возможен для подписчиков Электронного абонемента ЦНМБ или зарегистрированных читателей библиотеки");
							}
						}
					}
					else
					{
						var opersarr=[];
						var harr=_linkstring.split('[END]');
						var linkarr={};
						for(var k=0; k<harr.length; k++)
						{
							if(harr[k]!="")
							{
								var tmparr=harr[k].split('[ID]');
								linkarr[tmparr[0]]=tmparr[1];
							}
						}
						for(var z=0; z<arr.length; z++)
						{
							if(arr[z]!="")
							{
								var p=td5.create('div',{className:'opercont'});
								if(typeof linkarr[arr[z]] != "undefined")
								{
									if((arr[z] == '043') && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if((arr[z]=="069")&&(ecopy > 0)&&(accesstype=="PAY") && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if((arr[z]=="070")&&(ecopy > 0)&&(accesstype=="PAY") && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if((arr[z]=="076") && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if(((arr[z]=="077")&&(ecopy==0)) && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if((arr[z]=="078")&&(ecopy > 0)&&(accesstype=="FREE"))
									{
										if((idrececopy != "") && (iddbecopy != ""))
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';
										else
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';
									}
									else if((arr[z]=="079")&&(ecopy > 0)&&(accesstype=="FREE") && (foldername == 'rusmed'))
									{
										opersarr.push(arr[z]);
									}
									else if((arr[z]=="079")&&(ecopy > 0)&&(accesstype=="FREE") && (foldername == 'newlib'))
									{
										p.n.innerHTML+='<div class="_'+arr[z]+'">Онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';
									}
									else if((arr[z]=="059")&&(ecopy==0))
									{
										p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';
									}
									else if((arr[z]=="058")&&(ecopy > 0)&&(accesstype=="PAY"))
									{
										if((idrececopy != "") && (iddbecopy != ""))
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';
										else
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';
									}
									else if(((arr[z]=="077")&&(ecopy==0)) && (foldername == 'newlib'))
									{
										p.n.innerHTML+='<div class="_'+arr[z]+'">Заказ на оцифровку и последующий онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';
									}
									else if(((arr[z]=="070")&&(ecopy > 0)&&(accesstype=="PAY")) && (foldername == 'newlib'))
									{
										p.n.innerHTML+='<div class="_'+arr[z]+'">Онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';
									}
									else
									{
										if((ecopy == 2) && (eurl != "") && (accesstype == "NOLIMITS"))
										{
											p.n.innerHTML+='<span onmousedown="loadFreeUrl(\''+idrececopy+'\',\''+eurl+'\',\''+iddbecopy+'\')" class="URL u w180x" title="открыть">Показать документ</span>';
										}
									}
								}
							}
						}
						var operstr=opersarr.join('|');
						if(opersarr.length > 0)
						{
							for(var g=0; g < opersarr.length; g++)
							{
								if(opersarr[g] == '070')
								{
									p.n.innerHTML+='<div><a data="Сервис доступен подписчикам Электронного абонемента ЦНМБ или В ЗДАНИИ БИБЛИОТЕКИ" class="operations _070" target="_blank" href="//emll.rucml.ru/section/sign">Заказать онлайн просмотр</a></div>';
								}
								else if(opersarr[g] == '076')
								{
									p.n.innerHTML+='<div><div data="Сервис доступен зарегистрированным читателям библиотеки" class="operations _076" onmousedown="createAuthLayer()">Заказать в читальный зал</div></div>';
								}
								else if(opersarr[g] == '077')
								{
									p.n.innerHTML+='<div><a data="Сервис доступен подписчикам Электронного абонемента ЦНМБ" class="operations _077" target="_blank" href="//emll.rucml.ru/section/sign">Заказать онлайн просмотр</a></div>';
								}
								else if(opersarr[g] == '043')
								{
									p.n.innerHTML+='<div><div class="operations _043" onmousedown="showOrderWin(\'043\',\''+iddb+'\',\''+replaceSlash(ind)+'\')">Заказать в читальный зал</div></div>';
								}
								else if(opersarr[g] == '069')
								{
									if((idrececopy != "") && (iddbecopy != ""))
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';
										else
											p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';
								}
								else
								{
									;
								}
							}
						}
					}
				}
				if(imgsrc!="")
				{
					var fig=td4.create('figure',{tabindex:'1'});
					fig.create('img',{border: '0',hSpace:'0',vSpace:'0', alt:'',title:'',src: imgsrc});
				}
				else
				{
					var s4=td4.create('span');
					var c4=s4.create('cite');
					var s41=c4.create('span',{tabIndex:'1', className:'book'});
					var u4=s41.create('ul',{className:'paperback_front'});
					u4.create('li');
					var u41=s41.create('ul',{className:'ruled_paper'});
					u41.create('li');
					u41.create('li');
					u41.create('li');
					u41.create('li');
					u41.create('li');
					var u42=s41.create('ul',{className:'paperback_back'});
					u42.create('li');
				}
				if(slids.length>0)
				{
					var span=td4.create('span',{className:'titleslides',onclick:'function(){showSlidesCont(this)}'});
					for(var i=0; i<slids.length; i++)
					{
						span.create('input',{type:'hidden', name:'tab', value:slids[i]});
					}
				}
				var today=new Date();
				var seconds=today.getTime();
				var libs1=[];
				var library='';
				var libtext='';
				if(typeof value._SHORTFMS_1 !="undefined")
				{
					if(value._SHORTFMS_1[0]!="")
					{
						if(value._SHORTFMS_1[0].indexOf('[/UR]')!="undefined")
						{
							libs1=value._SHORTFMS_1[0].split('[/UR]');
						}
						var countlibs=0;
						if(libs1.length > 0)
						{
							for(var i=0; i<libs1.length; i++)
							{
								if(libs1[i]!="")
								{
									var libs=libs1[i].split('[END]');
									var ur='';
									var loc='';
									for(var k=0; k<libs.length; k++)
									{
										if(libs[k]!="")
										{
											var tod=new Date();
											var sec=tod.getTime();
											var astr="";
											var bstr="";
											var istr="";
											var ssstr="";
											var tstr="";
											var austr="";
											if(libs[k].indexOf('[ITEM]') != -1)
											{
												istr=libs[k].substring(libs[k].indexOf('[ITEM]')+6,libs[k].indexOf('[/ITEM]'));
											}
											if(libs[k].indexOf('[BIBLID]') != -1)
											{
												bstr=libs[k].substring(libs[k].indexOf('[BIBLID]')+8,libs[k].indexOf('[/BIBLID]'));
											}
											if(libs[k].indexOf('[ADRESS]') != -1)
											{
												astr=libs[k].substring(libs[k].indexOf('[ADRESS]')+8,libs[k].indexOf('[/ADRESS]'));
											}
											if(libs[k].indexOf('[AUTHID]') != -1)
											{
												austr=libs[k].substring(libs[k].indexOf('[AUTHID]')+8,libs[k].indexOf('[/AUTHID]'));
											}
											if(libs[k].indexOf('[TITL]') != -1)
											{
												tstr=libs[k].substring(libs[k].indexOf('[TITL]')+6,libs[k].indexOf('[/TITL]'));
											}
											if(libs[k].indexOf('[UR]') != -1)
											{
												countlibs++;
												ur+='<div onclick="showHide1(this.parentNode.parentNode)" class="td"><p class="fstr lh120">'+tstr+'</p><p class="address"></p></div><div class="td w30 p5x" id="l_'+sec+'_'+countlibs+'_'+austr+'"><input type="hidden" class="titl" value="'+tstr+'"/><input type="hidden" id="ndb'+sec+'_'+countlibs+'_'+austr+'" class="item" value="'+istr+'"/><input type="hidden" class="biblid" id="biblid'+sec+'_'+countlibs+'_'+i+'" value="'+bstr+'"/><input type="hidden" class="authid" value="'+austr+'"/><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'map\')">Посмотреть на карте</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'avail\')">Уточнить наличие</span></div>';
											}
											else
											{
												countlibs++;
												loc+='<div class="row"><div class="td loc"><p><b>'+tstr+'</b></p><p class="address">'+astr+'</p></div><div class="td w30 p5x" id="l_'+sec+'_'+countlibs+'_'+austr+'"><input type="hidden" class="titl" value="'+tstr+'"/><input type="hidden" id="ndb'+sec+'_'+countlibs+'_'+austr+'" class="item" value="'+istr+'"/><input type="hidden" class="biblid" id="biblid'+sec+'_'+countlibs+'_'+i+'" value="'+bstr+'"/><input type="hidden" class="authid" value="'+austr+'"/><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'map\')">Посмотреть на карте</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'avail\')">Уточнить наличие</span></div></div>';
											}
										}
									}
									if(loc != "")
									{
										if(ur != "")
										{
											ur='<div class="row ur">'+ur+'</div>';
										}
										loc='<div class="level" style="display:none">'+loc+'</div>';
									}
									else
									{
										ur='<div class="row">'+ur+'</div>';
										loc='';
									}

									libtext+='<div class="level">'+ur+'</div>'+loc;
								}
							}
						}
					}
				}
				if(((typeof dbs[rdb].place != "undefined")||(libtext!=""))&&(!flagurl))
				{
					var tabs=td5.create('div',{className:'tabs'});
					var tabdivs=td5.create('div',{className:'tabdivs'});
					if((typeof dbs[rdb].place != "undefined")&&(libtext=="")&&(seeplace))
					{
						tabs.create('span',{textNode:'Местонахождение',className:'add1',title:'place',onmousedown:'function(){seePlace(this,\''+replaceSlash(ind)+'\','+seconds+','+iddb+')}'});
						tabdivs.create('div',{className:'adddiv',id:'place'+seconds,style:{display:'none'}});
					}
					if(libtext!="")
					{
						tabs.create('span',{textNode:'Библиотеки',className:'add2 border',title:'libraries',onmousedown:'function(){showHide2(this,\'lib'+seconds+'\')}'});
						var div=tabdivs.create('div',{className:'adddiv',id:'lib'+seconds});
						div.n.innerHTML=libtext;
					}
				}
			}
		}
		if(parseInt(exquant,10) > 0)
			verifyLink();
			//verifyLink(next);
		preloadImages(imgsrc);
	}
}

function showArticles(obj)/*запрос на вывод статей*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	/*querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",obj]);*/
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["query/body",obj]);
	/*var outfrm=outform;
	if(typeof dbs[numDB].outform!="undefined")
		outfrm=dbs[numDB].outform;
	querylist.push(["outformList[0]/outform",outfrm]);*/
	querylist.push(["outformList[0]/outform","SHOTFORM"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	var arg={};
	arg.cls='dialog2';
	arg.message="Статьи/части";
	showLayerWin('issueswin',arg);
	ajaxToRCP(gArr,showArticlesWin);
}

function showArticlesWin(x)/*вывод статей*/
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
		var doc=take('issueswinform');
		doc.n.innerHTML="";
		var j=0;
		if(parseInt(response[0]._size,10)>0)
		{
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var ind=value._id;
					var rdb=value._sourceIddb;
					var arrcont=value._SHOTFORM_0._content_0;
					/*var outfrm=outform;
					if(typeof dbs[rdb].outform!="undefined")
						outfrm=dbs[rdb].outform;
					var arrcont="";
					if(outfrm=='SHOTFORM')
						arrcont=value._SHOTFORM_0._content_0;
					else
						arrcont=eval('value._'+outfrm+'_0');*/
					var div=doc.create('div',{className:'searchrez size20'});
					var div1=div.create('div',{className:'output'});
					var j=-1;
					for(var i=0; i<arrcont.length;i++)
					{
						var atext=arrcont[i];
						var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;
						if(tmp.test(atext))
							atext=atext.replace(tmp,'');
						if(atext!="")
						{
							j++;
							if(j==0)
							{
								var div2=div1.create('div',{className:'clear_both'});
								div2.create('span',{className:'fleft mt5x mr5x',textNode:(j+1)+'. '});
								div2.n.innnerHTML+=atext;
							}
							else
							{
								if(atext.indexOf('<Аннотация:>') != -1)
								{
									var span=div1.create('span',{className:'cb'});
									span.n.innerHTML='<span class="add1" onmousedown="showHide(this)">Аннотация:</span><div class="i" style="display:none">'+atext.substring(atext.indexOf('<Аннотация:>')+12)+'</div>';
									
								}
								else
								{
									div1.create('p',{textNode:atext,style:{fontSize:'80%',margin:'5px'}});
								}
							}
						}
					}
					j++;
				}
			}
			doc.n.innerHTML=parseBB(doc.n.innerHTML);
		}
		else
		{
			doc.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные статьи/части данного выпуска/тома', style:{textAlign:'center',margin:'40px 0 0 0'}});
		}
	}
}

function seeAdd(o,ind,c,rdb)/*запрос на подробный вывод*/
{
	typework="";
	addid="add"+c;
	if(take(addid).n.style.display=='none')
	{
		if(take(addid).n.innerHTML=='')
		{
			take(addid).n.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.3.0"]);
			querylist.push(["session",numsean]);
			var tmp=/\\{1,}/g;
			if(tmp.test(ind))
				ind=ind.replace(tmp,'\\');
			querylist.push(["iddbIds[0]/id",ind]);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			querylist.push(["iddbIds[0]/iddb",db]);
			var dboutff=outformfull;
			if((typeof dbs[db] !="undefined")&&(typeof dbs[db].outformfull !="undefined"))
				dboutff=dbs[db].outformfull;
			querylist.push(["outform",dboutff]);
			querylist.push(["_history","yes"]);
			querylist.push(["$iddb",db]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,displayAdd);
		}
	}
	showHide2(o,addid);
}

function displayAdd(x)/*подробный вывод в том же окне*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError('ajax');
	}
	else
	{
		var dboutff=outformfull;
		if((typeof dbs[_iddb] !="undefined")&&(typeof dbs[_iddb].outformfull !="undefined"))
			dboutff=dbs[_iddb].outformfull;
		var outf=eval('response[0]._result_0._'+dboutff+'_0');
		if(outf!=null)
		{
			var str="";
			var arr=outf;
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i]!="")
				{
					var term=arr[i];
					var pref=postf="";
					if(term.indexOf('<')!=-1)
					{
						term=term.replace(/</,' ');
						term=term.replace(/>/,' ');
						pref='<b>'+term.substring(0,term.indexOf(':')+1)+'</b>';
						postf=term.substring(term.indexOf(':')+1);
						term="";
					}
					str+='<p>'+pref+term+postf+'</p>';
				}
			}
			take(addid).n.innerHTML=parseBB(str);
		}
	}
}

function ajaxSee(ind,count,rdb)/*запрос на вывод Аннотация (ссылка [SEE4]*/
{
	typework="";
	seeid="SEE4"+count;
	if(take(seeid).n.style.display=='none')
	{
		if(take(seeid).n.innerHTML=="")
		{
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
			querylist.push(["_version","2.0.0"]);
			querylist.push(["session",numsean]);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			querylist.push(["iddb",db]);
			querylist.push(["id",ind]);
			querylist.push(["action","SEE4"]);
			querylist.push(["_history","yes"]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,displaySEE4);
		}
		else
		{
			take(seeid).show();
			take(seeid).n.previousSibling.className="add2";
		}
	}
	else
	{
		take(seeid).hide();
		take(seeid).n.previousSibling.className="add1";
	}
}

function displaySEE4(x)/*вывод Аннотация (ссылка [SEE4]*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError('ajax');
	}
	else
	{
		if(response[0]._result_0._SEE4_0!=null)
		{
			take(seeid).n.previousSibling.className="add2";
			take(seeid).show();
			take(seeid).n.innerHTML=response[0]._result_0._SEE4_0[0];
		}
	}
}

/*поиск в библиографии, связанный с поиском в АФ*/

function searchFromAfToBibl()/*поиск библиографии из авторитетных записей (по кнопке)*/
{
	var lab='AUIDS';
	var str="";
	showstr="";
	var cont=take('sconstruct_'+numDB);
	if(cont.n != null)
	{
		var arr=cont.getsign('span',{className:'sblock'});
		var terms=[];
		var shows=[];
		for(var i=0; i<arr.length; i++)
		{
			var span=take(arr[i]).tags('span')[0];
			var term=span.title;
			var show=span.innerHTML;
			if(i==0)
			{
				lab=span.getAttribute("data-label");
				if(lab=='QMS')
					lab='MS';
				terms.push(term.substring(1,term.length-1));
				shows.push(show);
			}
			else
			{
				var log=take(arr[i]).tags('select')[0];
				terms.push(' '+log.options[log.selectedIndex].value+' '+convertbrackets(term));
				shows.push(' <i>'+log.options[log.selectedIndex].text+'</i> '+show);
			}
			lightarr.push(convertlightstring(show));
		}
		str=terms.join("[/bracket]");
		var len=terms.length-1;
		if(len == 0)
			str="[bracket]"+str+"[/bracket]";
		else
		{
			for(var i=0; i<len; i++)
				str="[bracket]"+str;
		}
		putDataToStorage(numDB);
		if(typeof _iddbbibl!="undefined")
			numDB=_iddbbibl;
		else
			numDB=numdbBIBL;
		showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+shows.join("");
	}
	lightstring=lightarr.join(' ');
	str=prepareStr(str);
	var obj={};
	obj._str=convertseef(str);
	obj._showstr=showstr;
	if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
	{
		simpleSearchAll(lab,obj);
	}
	else
	{
		simpleSearch(lab,obj);
	}
}

function searchTerm(o,a,l)/*поиск библиографии из авторитетной записи (по иконке лупы)*/
{
	sessionStorage.clear();
	var lab='AUIDS';
	var str="";
	showstr="";
	if(typeof _iddbbibl!="undefined")
		numDB=_iddbbibl;
	else
		numDB=numdbBIBL;
	if(typeof o != "string")
	{
		var obj=take(o).getsign('input',{type:'checkbox'})[0];
		var down=obj.getAttribute("data-down");
		if((down != "")&&(down != null))
		{
			lab='COD';
			//str='[bracket]'+lab+' '+down+'[/bracket]';
			str='[bracket]'+down+'[/bracket]';
			if(obj.name=='QMS')
			{
				lab='MS';
				str='[bracket][bracket]'+lab+' '+obj.className.substring(obj.className.indexOf('/')+1)+'[/bracket] AND '+str+'[/bracket]';
			}
		}
		else
		{
			//str='[bracket]'+lab+' '+replaceSymb(obj.value)+'[/bracket]';
			str='[bracket]'+lab+' '+obj.value+'[/bracket]';
		}
		showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+obj.className;
		lightarr.push(convertlightstring(obj.className));
	}
	else
	{
		if(typeof l != "undefined")
		{
			lab=l;
		}
		//str='[bracket]'+lab+' '+replaceSymb(o)+'[/bracket]';
		str='[bracket]'+lab+' '+o+'[/bracket]';
		showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+a;
		lightarr.push(convertlightstring(a));
	}
	lightstring=lightarr.join(' ');
	var obj={};
	obj._str=convertseef(str);
	obj._showstr=showstr;
	if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
	{
		simpleSearchAll(lab,obj);
	}
	else
	{
		simpleSearch(lab,obj);
	}
}

function getAFStat()/*предварительный поиск библиографии из авторитетной записи*/
{
	typework="";
	var filter=take('infor').getsign('input',{'name':'stat'});
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	for(var j=0; j<filter.length; j++)
	{
		querylist.push(["queryList["+j+"]/iddb",numdbBIBL]);
		querylist.push(["queryList["+j+"]/query","(AUIDS '"+filter[j].value+"')"]);
		querylist.push(["queryList["+j+"]/queryId",filter[j].className]);
		querylist.push(["$"+filter[j].className,filter[j].value]);
	}
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackgetAFStat);
}

function callbackgetAFStat(x)/*предварительный поиск библиографии из авторитетной записи, вывод количества*/
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
		for (key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('resultList')!=-1)
			{
				var ind=value._queryId;
				var div=take(ind).n;
				div.innerHTML=value._size;
				if(parseInt(value._size,10) == 0)
				{
					div.removeAttribute('class');
					div.removeAttribute('title');
					div.removeAttribute('onmousedown');
				}
				take(div.parentNode).show();
				if(typeof repointerface != "undefined")
				{
					if(parseInt(value._size,10) > 0)
					{
						div.parentNode.innerHTML+=' <span class="f80">(посмотреть)</span>';
						var q=eval("_"+ind);
						openArticlesAuthor(ind,q);
					}
				}
			}
		}
	}
}

/*конец поиск в библиографии, связанный с поиском в АФ*/

/*словарь*/

function searchVoc(l,t,bd)/*поиск из словаря*/
{
	if(dbs[numDB].type=='AF')
		vocsearchInAF(l,t);
	else
	{
		var ndb=numDB;
		if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
			ndb=_iddb;
		if(typeof bd != "undefined")
			ndb=bd;
		typework="search";
		if(typesearch!='combined')
			typesearch='simple';
		lockedfilters="";
		swfterm="";
		t=t.replace(/\&nbsp\;/g,' ');
		var str="[bracket]"+l+" [apos]"+t+"[/apos][/bracket]";
		var action="php";
		if(typeof biblio!="undefined")
			action="biblio";
		showstr=prepareStr('<i>'+dbs[ndb]["labels"][l][0]+'</i> '+replaceSymb(t));
		showstr=prepareShowstring(showstr);
		var handler=modules["search"].directory+'/search.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action",action]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_param","1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",0]);
		querylist.push(["start",0]);
		querylist.push(["$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		var outfrm=outform;
		if(typeof dbs[ndb].outform!="undefined")
			outfrm=dbs[ndb].outform;
		querylist.push(["$outform",outfrm]);
		querylist.push(["$searchlabel",l]);
		querylist.push(["outformList[0]/outform",outfrm]);
		querylist.push(["outformList[1]/outform","LINEORD"]);
		if(outfrm=="SHORTFM")
		{
			querylist.push(["outformList[2]/outform","SHORTFMS"]);
			querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
		}
		else
		{
			querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
			querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
			//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
		}
		querylist.push(["iddb",ndb]);
		var term=prepareTerm(str);
		if(term.indexOf('\\\\\\') != -1)
			term=prepareStr(term);
		tern=replaceS6(term);
		querylist.push(["query/body",term]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);		
		if(typeof biblio!="undefined")
		{
			lockedfilters="";
			var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
			gArr.push(["_bibliostr",JSON.stringify(bobj)]);
			gArr.push(["_session",numsean]);
			querylist.push(["$bibliosearch","yes"]);
		}
		if(typeof solr!="undefined")
		{
			lockedfilters="";
			var count1=-1;
			var countscore=-1;
			for(var key in dbs[ndb]["labels"])
			{
				if(dbs[ndb]["labels"][key][4]=="true")
				{
					count1++;
					querylist.push(["facets["+count1+"]/type","terms"]);
					querylist.push(["facets["+count1+"]/name",key]);
					querylist.push(["facets["+count1+"]/field",key]);
					querylist.push(["facets["+count1+"]/limit","500"]);
					if(dbs[ndb]["labels"][key][5] != "undefined")
					{
						querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);
						querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);
					}
				}
				var score=parseInt(dbs[ndb]["labels"][key][7],10);
				if(score > 1)
				{
					countscore++;
					querylist.push(["boost["+countscore+"]/label",key]);
					querylist.push(["boost["+countscore+"]/score",score]);
				}
			}
			querylist.push(["$solr","yes"]);
		}
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
		if(typeof dbs[ndb].addqueries !="undefined")
		{
			var obj={};
			obj.term=term;
			obj.db=ndb;
			obj.label=l;
			var arr=prepareAddQuery(obj);
			if(arr!=null)
				Array.prototype.push.apply(gArr, arr);
		}
		callToRCP(gArr);
	}
}

function showVoc(item,label,sign)/*вывод словаря*/
{
	typework="search";
	lockedfilters="";
	var skipFirst="";
	var _vstr="";
	var query="";
	var start=0;
	var firstterm="";
	var indxterms="";
	var andor=0;
	var vocobj="";
	var savedterms="";
	var title="Словарь";
	var val=null;
	var str="";
	if(item!=null)
	{
		if(typeof _str!="undefined")
			_str="";
		skipFirst="";
		if((typeof scrolllayer !="undefined")&&(scrolllayer=="left_frame"))
		{
			if(typesearch!="combined")
				typesearch="combined";
			vocobj=item.previousSibling.id;
		}
		else
		{
			if(typesearch!="combined")
			{
				if(item.nextSibling.nodeType==1)
				{
					if(item.nextSibling.className=="logcontainer")
						vocobj=item.nextSibling.nextSibling.lastChild.firstChild.id;
					else
						//vocobj=take(item.parentNode).getsign('div',{className:'labcontainer'})[0].lastChild.firstChild.id;
						vocobj=item.nextSibling.lastChild.firstChild.id;
				}
			}
		}
		val=take(vocobj).n.value;
		if(val.indexOf("'")==0)
			val=val.substring(1,val.length-1);
		val=replaceSymb(val);
		val=prepareStr(val);
		str=query=firstterm=val;
		/*if(typesearch=="expand")
		{
			savedterms=prepareSavedTerms(vocobj);
			//savedterms=prepareStr(savedterms);
			alert('1 || '+savedterms);
		}*/
	}
	else
	{
		if(typeof _str!="undefined")
		{
			val=str=_str;
			if(str!="")
			{
				val=prepareStr(str);
				val=replaceSymb(str);
			}
		}
		if(typeof _title!="undefined")
			title=_title;
		if(take('andor').n != null)
		{
			if(take('andor').n.nodeName.toLowerCase()=='select')
				andor=take('andor').n.selectedIndex;
			else
			{
				if(take('andor').n.className=='OR')
					andor=0;
				else
					andor=1;
			}
		}
		indxterms=prepareIndxTerms();
		start=parseInt(_start,10);
		vocobj=_vocobj;
		if(sign==0)
		{
			start=parseInt(_start,10)-portion;
			if(start==0)
			{
				skipFirst="";
				var arr=_firstterm.split('[END]');
				query=firstterm=arr[0];
			}
			else
			{
				firstterm=_firstterm;
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipFirst=newstr;
			}
		}
		else
		{
			start=parseInt(_start,10)+portion;
			query=skipFirst=_lastterm;
			firstterm=_firstterm+'[END]'+query;
		}
	}
	if(label==null)
	{
		if(typesearch=="combined")
		{
			label=item.previousSibling.className;
		}
		else
		{
			if(item.nextSibling.className=="logcontainer")
				label=item.nextSibling.nextSibling.firstChild.firstChild.lastChild.className.substring(1);

			else
				//label=take(item.parentNode).getsign('div',{className:'labcontainer'})[0].firstChild.firstChild.lastChild.className.substring(1);
				label=item.nextSibling.firstChild.firstChild.lastChild.className.substring(1);
			//vocobj=take(item.parentNode).getsign('div',{className:'labcontainer'})[0].lastChild.firstChild.id;
						//vocobj=item.nextSibling.lastChild.firstChild.id;
		}
		if(label=='FT')
			return;
		var db=numDB;
		if(typeof _localiddb!="undefined")
			db=_iddb;
		if((val == null)||(val==""))
			_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> ВСЕ</span>';
		else
			_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> '+val+'</span>';
	}
	else
		_vstr=_showstr;
	_vstr=prepareStr(_vstr);
	_vstr=prepareShowstring(_vstr);
	showstr=_vstr;
	var handler=modules["voc"].directory+'/voc.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	if(dbs[numDB].type=="AF")
	{
		querylist.push(["_service","STORAGE:opacafd:List"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["mode","index"]);
	}
	else
	{
		querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
		querylist.push(["_version","1.4.0"]);
	}
	querylist.push(["session",numsean]);
	querylist.push(["$title",title]);
	querylist.push(["$label",label]);
	querylist.push(["label",label]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["$str",str]);
	//querylist.push(["$query",convertlimits2(query)]);
	querylist.push(["$query",convertseef(query)]);
	querylist.push(["$length",portion]);
	querylist.push(["query",val]);
	if(start != 0)
	{
		//if(typeof _lastterm != "undefined")
		//querylist.push(["start",query]);
		if((typeof solr != "undefined")&&(solr=="yes"))
			querylist.push(["start",start]);
			//querylist.push(["start",brackets(replaceSymb(query))]);
		else
			querylist.push(["start",brackets(replaceSymb(query))]);
			//querylist.push(["start",query]);
	}
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$andor",andor]);
	querylist.push(["$vocobj",vocobj]);
	if((typeof firstterm!="undefined")&&(firstterm!=""))
		querylist.push(["$firstterm",replaceSymb(firstterm)]);
	else
		querylist.push(["$firstterm",""]);
	if(typesearch=='professional')
	{
		var estr=take('expr').n.innerHTML;
		estr=estr.replace(/\"/g,'');
		querylist.push(["$expr",estr]);
	}
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	savedterms=prepareSavedTerms(vocobj);
	if(savedterms!="")
		querylist.push(["$savedterms",savedterms]);
	if((sign!=null)&&(skipFirst!=''))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function searchAlfabet(o,sign)/*вывод словаря по алфавиту*/
{
	typework="search";
	var skipFirst="";
	var _vstr="";
	var query="";
	var start=1;
	var firstterm="";
	var label="";
	var ndb=numDB;
	if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
		ndb=_iddb;
	if(o!=null)
	{
		query=firstterm=o.innerHTML;
		skipFirst="";
		if(typesearch=="combined")
			label="AH";
		else
			label=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
		if(label=='FT')
			label='TI';
	}
	else
	{
		if(typeof _label!="undefined")
			label=_label;
		start=parseInt(_start,10);
		if(sign==0)
		{
			start=parseInt(_start,10)-portion;
			if(start==1)
			{
				skipFirst="";
				query=firstterm;
			}
			else
			{
				firstterm=_firstterm;
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipFirst=newstr;
			}
		}
		else
		{
			start=parseInt(_start,10)+portion;
			query=skipFirst=_lastterm;
			firstterm=_firstterm+'[END]'+query;
		}
	}
	if(o!=null)
		_vstr='<span><i>'+dbs[ndb]["labels"][label][0]+'</i> '+o.innerHTML+'</span>';
	else
		_vstr=_showstr;
	_vstr=prepareStr(_vstr);
	_vstr=prepareShowstring(_vstr);
	showstr=_vstr;
	var handler=modules["voc"].directory+'/voc.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$label",label]);
	querylist.push(["label",label]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",showstr]);
	if((typeof query!="undefined")&&(query!=""))
	{
		var quer=prepareStr(query);
		quer=replaceSymb(quer);
		querylist.push(["query",quer]);
	}
	else
	{
		querylist.push(["query",""]);
	}
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$firstterm",replaceSymb(firstterm)]);
	//querylist.push(["$typesearch",typesearch]);
	//if(typesearch=='profs')
	if(typesearch=='professional')
	{
		var estr=take('expr').n.innerHTML;
		estr=estr.replace(/\"/g,'');
		querylist.push(["$expr",estr]);
	}
	/*if(typesearch=='simple')
		typesearch='expand';
	querylist.push(["$typesearch",typesearch]);*/
	if((sign!=null)&&(skipFirst!=''))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*конец словарь*/

/*история поисков - комбинация поисков*/

function putSearchToConstructor(o)
{
	if(take('searchbox').n != null)
	{
		var arr=take('srezults').getsign('span',{className:'tooltip1'});
		if(arr.length > 0)
		{
			var len=arr.length;
			for(var i=0; i<len; i++)
			{
				arr[i].parentNode.removeChild(arr[i]);
			}
		}
		var cont=take(o.parentNode);
		var tol=cont.create('span',{className:'tooltip1',style:{'top':0,'left':'20px',fontSize:'120%'}});
		tol.create('span',{id:'tooldel',className:'del',onmousedown:'function(){delTWin(this,1)}'});
		tol.create('span',{className:'titl mb15x ml5x',textNode:'Добавить в конструктор:'});
		if(take('searchbox').n.value!="")
		{
			var selcont=tol.create('span',{className:'mb20x ml5x'});
			var sel=selcont.create('select',{id:'andor',className:'andor2'});
			sel.create('option',{value:'AND',textNode:'И'});
			sel.create('option',{value:'OR',textNode:'ИЛИ'});
			sel.create('option',{value:'NOT',textNode:'НЕ'});
			selcont.text('логический оператор');
		}
		tol.create('input',{type:'button',className:'button3 db p5x ml5x',value:'Добавить',onmousedown:'function(){placeSearchToConstructor(this)}','data-index':o.id});
	}
}

function placeSearchToConstructor(o)
{
	if(take('searchbox').n != null)
	{
		var indx=o.getAttribute("data-index");
		var ind='str'+indx.substring(indx.indexOf('_'));
		var textind='showstr'+indx.substring(indx.indexOf('_'));
		var term=prepareTerm(brackets(take(ind).n.innerHTML));
		if(term.indexOf('\\\\\\') != -1)
			term=prepareStr(term);
		term=replaceS6(term);
		var termtext=prepareStr(take(textind).n.innerHTML);
		termtext=prepareShowstring(termtext);
		if(take('searchbox').n.value=="")
		{
			take('searchbox').n.value=term;
			take('termtextbox').n.innerHTML=termtext;
		}
		else
		{
			term=' '+take('andor').n.options[take('andor').n.selectedIndex].value+' ('+term+')';
			take('searchbox').n.value='('+take('searchbox').n.value+')'+term;
			termtext=' '+take('andor').n.options[take('andor').n.selectedIndex].text+' ' + termtext;
			take('termtextbox').n.innerHTML=take('termtextbox').n.innerHTML+''+termtext;
		}
		take('searchbox').n.focus();
	}
	delTWin(o,1)
}

function clearSearchConstructor()
{
	delete sessionStorage["searchbiblio"];
	if(take('searchbox').n != null)
	{
		take('searchbox').n.value="";
		take('termtextbox').n.innerHTML="";
	}
}

function searchFromConstructor()
{
	var lab=take('labs_div_'+numdbBIBL).n.firstChild.className.substring(1);
	var str="";
	showstr="";
	var cont=take('searchbox');
	if((cont.n != null)&&(cont.n.value != ""))
	{
		str=convertlimits2(cont.n.value);
		showstr=take('termtextbox').n.innerHTML;
		if(showstr=="")
			showstr=prepareShowstring(str);
		lightstring=convertlightstring3(showstr);
		var obj={};
		obj._str=str;
		obj._showstr=showstr;
		if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
		{
			simpleSearchAll(lab,obj);
		}
		else
		{
			simpleSearch(lab,obj);
		}
	}
	else
	{
		alert("Введите данные для поиска!");
		return;
	}
}

/*конец история поисков - комбинация поисков*/

/*фасеты*/

function appendFacet(o)/*добавление фасетов к поиску*/
{
	switch(o.className)
	{
		case "unchecked":	o.className="checked";
							o.title="ОТМЕНИТЬ";
		break;
		case "checked":		o.className="unchecked";
							o.title="УТОЧНИТЬ";
		break;
		default:break;
	}
	var term=o.innerHTML;
	var lab=o.parentNode.className;
	var role=o.parentNode.lastChild.className;
	var title=o.parentNode.parentNode.parentNode.firstChild.innerHTML;
	var tmp='[TITLE]'+title+'[NAME]'+lab+'[ROLE]'+role+'[VALUE]'+term;
	var str="";
	showstr="";
	var fstr="";
	var bstr="";
	var earr=[];
	var farr=[];
	var barr=[];
	if((typeof _str !="undefined") && (_str != ""))
		str=_str;
	else
	{
		if((typeof _swfterm != "undefined") && (_swfterm != ""))
			str=_swfterm;
	}
	if((!typeof _showstr !="undefined") && (_showstr != ""))
		showstr=_showstr;
	else
	{
		if((typeof _rshowstr != "undefined") && (_rshowstr != ""))
			showstr=_rshowstr;
	}
	if(lockedfilters!="")
		farr=lockedfilters.split('[END]');
	for(var i=0; i<farr.length; i++)
	{
		if(farr[i]!=tmp)
		{
			if(fstr!="")
				fstr+='[END]';
			fstr+=farr[i];
		}
	}
	if(o.className=="checked")
	{
		if(fstr!="")
			fstr+='[END]';
		fstr+=tmp;
	}
	lockedfilters=replaceSymb(fstr);
	if(typeof biblio != "undefined")
	{
		if(fstr!="")
		{
			farr=[];
			farr=fstr.split('[END]');
			for(var i=0; i<farr.length; i++)
			{
				var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));
				var bobj={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				barr.push(bobj);
			}
		}
		var aarr=[];
		farr=[];
		for(var i=0; i<barr.length; i++)
		{
			for(var key in barr[i])
			{
				if((typeof aarr[key] == "undefined") || (aarr[key].constructor !== Object))
				{
					aarr[key]={};
					aarr[key].name=key;
					aarr[key].isRole=barr[i][key].isRole;
					aarr[key].values=barr[i][key].values;
					farr.push(aarr[key]);
				}
				else
				{
					for(var j=0;j<barr[i][key].values.length; j++)
						aarr[key].values.push(barr[i][key].values[j]);
				}
			}
		}
	}
	if(typeof solr != "undefined")
	{
		if(lockedfilters!="")
		{
			farr=[];
			farr=lockedfilters.split('[END]');
			for(var i=0; i<farr.length; i++)
			{
				if(i > 0)
					bstr+=' AND ';
				var val=convertseef(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+val+'[apos][/bracket]';
				earr.push([farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]')),brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))]);
				lightarr.push(convertlightstring(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
			}
		}
	}
	var obj={};
	obj._str=str;
	obj._showstr=showstr;
	if(farr.length > 0)
	{
		if(typeof solr != "undefined")
		{
			obj._bstr=bstr;
			obj._exclude=earr;
		}
		else
			obj._bstr=farr;
		obj._history="yes";
		var fls=trimSpaces(lightarr.join(' '));
		var lls=convertlightstring2(fls);
		if(lls != null)
			savedstring=lls;
		if(savedstring != "")
		{
			if(lockedstring != "")
				savedstring=lockedstring+' '+savedstring;
		}
	}
	if(typeof _see != "undefined")
	{
		See(null,null,null);
	}
	else
		simpleSearch(lab,obj);
}

function prepareFacetsForBibliosearch()/*формирование запроса с фасетами*/
{
	var farr=[];
	var earr=[];
	var barr=[];
	var bstr="";
	if(lockedfilters!="")
	{
		farr=lockedfilters.split('[END]');
		if(typeof biblio != "undefined")
		{
			for(var i=0; i<farr.length; i++)
			{
				var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));
				var bobj={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				barr.push(bobj);
			}
			var aarr=[];
			farr=[];
			for(var i=0; i<barr.length; i++)
			{
				for(var key in barr[i])
				{
					if((typeof aarr[key] == "undefined") || (aarr[key].constructor !== Object))
					{
						aarr[key]={};
						aarr[key].name=key;
						aarr[key].isRole=barr[i][key].isRole;
						aarr[key].values=barr[i][key].values;
						farr.push(aarr[key]);
					}
					else
					{
						for(var j=0;j<barr[i][key].values.length; j++)
							aarr[key].values.push(barr[i][key].values[j]);
					}
				}
			}
		}
		if(typeof solr != "undefined")
		{
			for(var i=0; i<farr.length; i++)
			{
				if(i > 0)
					bstr+=' AND ';
				bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))+'[apos][/bracket]';
				earr.push([farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]')),brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))]);
				lightarr.push(convertlightstring(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
			}
		}
		var obj={};
		if(farr.length > 0)
		{
			if(typeof solr != "undefined")
			{
				obj._bstr=bstr;
				obj._exclude=earr;
			}
			else
				obj._bstr=farr;
			//savedstring=lightarr.join(' ');
			var fls=trimSpaces(lightarr.join(' '));
			var lls=convertlightstring2(fls);
			if(lls != null)
				savedstring=lls;
			if(savedstring != "")
			{
				if(lockedstring != "")
					savedstring=lockedstring+' '+savedstring;
			}
		}
		lockedfilters=replaceSymb(lockedfilters);
		return obj;
	}
	else
	{
		return null;
	}
}

function facetsBack(o)/*предыдущая порция*/
{
	take(o.parentNode.previousSibling).show();
	take(o.parentNode).hide();
}

function facetsNext(o)/*следующая порция*/
{
	take(o.parentNode.nextSibling).show();
	take(o.parentNode).hide();
}

/*конец фасеты*/

/*фильтры*/

function clearFilters(o)/*очистка выбранных фильтров*/
{
	var filters=take('filters_'+numDB).getsign('span',{className:'checked'});
	if(filters.length>0)
	{
		for(var j=0; j<filters.length; j++)
		{
			filters[j].className="unchecked";
		}
		searchWithFilters("","","");
	}
}

function putFilterPeriod()/*добавление фильтра-диапазона*/
{
	var first=take('ifrom').n;
	var last=take('ito').n;
	var lim=first.className;
	var ind=last.className;
	var obj=take(ind).n;
	var par=obj.parentNode;
	var cls="";
	var text="";
	if((parseInt(first.value,10)>parseInt(last.value,10))||
	(isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10))))
	{
		alert('Задан недопустимый период');
		return;
	}
	else
	{
		if(!isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" BETWEEN '"+first.value+"','"+last.value+"')";
			text+='c '+first.value+' по '+last.value;
		}
		if(!isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" GE '"+first.value+"')";
			text+='c '+first.value;
		}
		if(isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" LE '"+last.value+"')";
			text+='по '+last.value;
		}
		var today=new Date();
		var seconds=today.getTime();
		var oid='dinamic_'+numDB+'_'+seconds;
		var div=take(par).create('div',{className:cls});
		var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});
		//div.create('i',{textNode:'(0)'});
		div.create('i',{textNode:'0'});
		par.insertBefore(div.n,obj);
		var arg={};
		arg.next=ind;
		arg.ind=oid;
		arg.cname=cls;
		arg.itext=text;
		appendFilter(span.n,arg);
	}
}

function addFilterPeriod(o)/*окно для добавления фильтра-диапазона по годам*/
{
	var arg={'cls':'dialog2','message':'ДИАПАЗОН','target':self,'callback':'putFilterPeriod',callbackname:'Добавить','width':'500','height':'400'};
	showLayerWin('periodwin',arg);
	var div=take('periodwinform');
	div.n.innerHTML="";
	var cont=div.create('div',{className: 'period'});
	cont.create('span',{className: 'from', textNode: ' с '});
	var span=cont.create('span',{className: 'input'});
	span.create('input',{type: 'text', id: 'ifrom', value: '', maxLength: '4', className:o.parentNode.className});
	cont.create('span',{className: 'to', textNode: ' по '});
	var span1=cont.create('span',{className: 'input'});
	span1.create('input',{type: 'text', id: 'ito', value: '', maxLength: '4', className:o.id});
	var help=div.create('div',{style:{textAlign:'center',color:'#eee'}});
	help.create('span',{textNode: 'YYYY',style:{padding: '5px 30px 5px 20px'}});
	help.create('span',{textNode: 'YYYY',style:{padding: '5px 10px 5px 50px'}});
}

function addFilterVoc(v,item,label,sign)/*выбор фильтров из словаря*/
{
	var query="";
	var start=vocstart;
	vstr=v;
	if(item!=null)
	{
		fobject=item;
		var par=item.parentNode;
		var carr=take(par).getsign('span',{className:'checked'});
		cstr="";
		for(var i=0; i<carr.length; i++)
		{
			cstr+=carr[i].innerHTML;
			if(i<carr.length-1)
				cstr+='[END]';
		}
		var uarr=take(par).getsign('span',{className:'unchecked'});
		ustr="";
		for(var i=0; i<uarr.length; i++)
		{
			ustr+=uarr[i].innerHTML;
			if(i<uarr.length-1)
				ustr+='[END]';
		}
		skipfirst="";
		voclab=item.parentNode.className;
		endvoc="";
		vocstart=1;
		firstterm="";
		indxterms="";
		lastterm="";
		vvstr="";
		query=vvstr=firstterm="";
	}
	else
	{
		indxterms=prepareIndxTerms();
		start=parseInt(vocstart,10);
		if(sign==0)
		{
			start=start-portion;
			if(start==1)
			{
				skipfirst="";
				query=firstterm="";
			}
			else
			{
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipfirst=newstr;
			}
		}
		else
		{
			start=start+portion;
			query=skipfirst=lastterm;
			firstterm=firstterm+'[END]'+query;
		}
		voclab=label;
	}
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$label",voclab]);
	querylist.push(["label",voclab]);
	querylist.push(["$start",start]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["query",query]);
	querylist.push(["$vstr",vstr]);	
	querylist.push(["$vvstr",vvstr]);	
	querylist.push(["$cstr",cstr]);	
	querylist.push(["$ustr",ustr]);	
	querylist.push(["$firstterm",firstterm]);
	if((sign!=null)&&(skipfirst))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openFiltersWin);
}

function wwPages()/*листание словаря фильтров*/
{
	var pages='';
	if(skipfirst)
		pages+='<input type="button" class="button2" value="&#8249; Назад" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',0);"/>';
	if(!endvoc)
		pages+='<input type="button" class="button2" value="Далее &#8250;" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',1);"/>';
	return pages;
}

function putFilterVoc()/*добавление фильтра-словаря*/
{
	var today=new Date();
	var seconds=today.getTime();
	var arr=take('menu1').tags('code');
	var par=fobject.parentNode;
	var str="";
	for(var i=0; i<arr.length; i++)
	{
		var text=arr[i].innerHTML;
		if(voclab!="PF")
			text=text.toLowerCase();
		var oid='fixed_'+numDB+'_'+i+'_'+seconds;
		var div=take(par).create('div',{className:"("+voclab+" '"+text+"')"});
		var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});
		//div.create('i',{textNode:'(0)'});
		div.create('i',{textNode:'0'});
		par.insertBefore(div.n,fobject);
		str+="[NEXT]"+fobject.id+"[IND]"+oid+"[CLASS]"+"("+voclab+" '"+replaceSymb(text)+"')[TEXT]"+replaceSymb(text);
		if(i<arr.length-1)
			str+="[END]";
	}
	if(str!="")
	{
		if(addfilters!="")
			addfilters+="[END]"+str;
		else
			addfilters=str;
	}
	fobject=null;
	delLayerWin();
}

function openFiltersWin(x)/*окно для добавления фильтра из словаря*/
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
		if(take('vocwinform').n!=null)
			delLayerWin();
		var arg={};
		vstr=_vstr;
		arg.cls='dialog2';
		arg.message=vstr;
		arg.callback='putFilterVoc';
		arg.target=self;
		arg.width="500";
		arg.height="400";
		arg.callbackname='Добавить';
		showLayerWin('vocwin',arg);
		var doc=take('vocwinform');
		doc.n.innerHTML="";
		if(response[0]._indx_0!=null)
		{
			if(typeof _str!="undefined")
				vvstr=_str;
			if(typeof _skipFirst!="undefined")
				skipfirst=_skipFirst;
			if(typeof _firstterm!="undefined")
				firstterm=_firstterm;
			if(response[0]._end!=null)
				endvoc=true;
			else
				endvoc=false;
			voclab=_label;
			vocstart=parseInt(_start);
			var str='';
			var i=-1;
			var pages=wwPages();
			var menu='<div id="scont" class="scont">'+pages+'</div>';
			doc.n.innerHTML=menu;
			var tabbeg='<center><table cellspacing="0">';
			var tabend='</table></center>';
			var scont=take('scont');
			var menu1=scont.create('div',{id:'menu1',style:{display:'none'}});
			menu1.create('input',{type:'hidden',id:'andor',name:'andor',value:'OR'});
			if(typeof _indxterms!="undefined")
			{
				indxterms=_indxterms;
				var arr=indxterms.split('[END]');
				for(var j=0; j < arr.length; j++)
				{
					if(arr[j]!="")
						menu1.create('code',{style:{display:'none'},textNode: replaceSymb(arr[j].substring(arr[j].indexOf('|')+1)).replace(/&quot;/g,'"'),id: arr[j].substring(0,arr[j].indexOf('|'))});
				}
			}
			for (var key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					i++;
					var flag="";
					var flag2="";
					if(menu1.n.childNodes.length>1)
					{
						var childs=menu1.n.childNodes;
						for(var j=0; j<childs.length; j++)
						{
							if(childs[j].id=='_'+(vocstart+i))
							{
								flag='checked="true"';
								break;
							}
						}
					}
					var term=value._item;
					var carr=_cstr.split('[END]');
					for(var j=0; j<carr.length; j++)
					{
						if(carr[j].toUpperCase()==term)
						{
							flag='checked="true"';
							flag2='disabled="true"';
							break;
						}
					}
					var uarr=_ustr.split('[END]');
					for(var j=0; j<uarr.length; j++)
					{
						if(uarr[j].toUpperCase()==term)
						{
							flag='checked="true"';
							flag2='disabled="true"';
							break;
						}
					} 
					if((i % 2)==0)
						str+='<tr class="searchrez3">';
					else
						str+='<tr class="searchrez2">';
					str+='<td width="5%" ><input id="'+(vocstart+i)+'" type="checkbox" '+flag+' '+flag2+' class="addbox" name="'+_label+'"  value="'+replaceSymb4(term)+'" onclick="putTerms(this)"/><span style="display: none">'+term+'</span></td><td>'+term+'</td></tr>';
					lastterm=_lastterm=term;
				}
			}
			doc.n.innerHTML+=tabbeg+str+tabend;
		}
		else
		{
			doc.create('p',{textNode: 'Доступные фильтры не найдены.'});
		}
	}
}

function appendFilter(o,arg)/*добавление фильтра к поиску*/
{
	switch(o.className)
	{
		case "unchecked":	o.className="checked";
							o.title="ОЧИСТИТЬ ФИЛЬТР";
		break;
		case "checked":		o.className="unchecked";
							o.title="ФИЛЬТРОВАТЬ";
		break;
		default:break;
	}
	var filterstr="";
	var filtersids="";
	var fshowstr="";
	fstrarr=[];
	fidsarr=[];
	fshowarr=[];
	var ndb=numDB;
	if(typeof _localiddb!="undefined")
		ndb=_iddb;
	var arr=take('filters_'+ndb).getsign('div',{className: 'filters'});
	for(var i=0; i<arr.length; i++)
	{
		var filters=take(arr[i]).getsign('span',{className:'checked'});
		if(filters.length>0)
		{
			var str="";
			showstr='<i>'+arr[i].firstChild.innerHTML.toLowerCase()+'</i> ';
			for(var j=0; j<filters.length; j++)
			{
				str+=convertlimits(filters[j].parentNode.className);
				fidsarr.push(filters[j].id);
				showstr+=filters[j].innerHTML;
				if(j<filters.length-1)
				{
					str+=' OR ';
					showstr+=' ИЛИ ';
				}
			}
			fstrarr.push(str);
			fshowarr.push(showstr);
		}
	}
	if(fstrarr.length>0)
	{
		filtersids=fidsarr.join('[END]');
		if(fstrarr.length>1)
		{
			filterstr='[bracket]'+fstrarr.join('[/bracket] AND [bracket]')+'[/bracket]';
			fshowstr=fshowarr.join(' И ');
		}
		else
		{
			filterstr='[bracket]'+fstrarr[0]+'[/bracket]';
			fshowstr=fshowarr[0];
		}
	}
	else
	{
		filterstr="";
		filtersids="";
		fshowstr="";
	}
	if(typeof arg!="undefined")
		searchWithFilters(filterstr,filtersids,fshowstr,fstrarr,arg);
	else
		searchWithFilters(filterstr,filtersids,fshowstr,fstrarr);
}

function searchWithFilters(filterstr,filtersids,fshowstr,fstrarr,arg)/*поиск с фильтрами*/
{
	typework="search";
	lockedfilters="";
	swfterm="";
	var handler=modules["search"].directory+'/search.php';
	var str="";
	var showstr="";
	if(_str!="")
	{
		str=_str;
	}
	else
	{
		str=_swfterm;
	}
	if(_showstr!="")
	{
		showstr=_showstr;
	}
	else
	{
		showstr=_rshowstr;
	}
	str=prepareStr(str);
	showstr=prepareStr(showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	var addlab=findaddlabel(str);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=numdbBIBL;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	else
	{
		querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);
		querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);
		//querylist.push(["outformList[4]/outform","AVAILABLELICENSE"]);
	}
	swfterm=str;
	str=brackets(str);
	var term=prepareTerm(str);
	if(term.indexOf('\\\\\\') != -1)
		term=prepareStr(term);		
	if(filterstr!="")
	{
		if(typeof arg!="undefined")
		{
			var addstr='[NEXT]'+arg.next+'[IND]'+arg.ind+'[CLASS]'+convertlimits(arg.cname)+'[TEXT]'+arg.itext;
			addfilters=addfilters+'[END]'+addstr;
		}
		filterstr=replaceSymb(filterstr);
		querylist.push(["$filterstr",filterstr]);
		querylist.push(["$filtersids",filtersids]);
		querylist.push(["$fshowstr",prepareShowstring(fshowstr)]);
		filterstr=brackets(filterstr);
		filterstr=prepareTerm(filterstr);
		if(filterstr.indexOf('\\\\\\') != -1)
			filterstr=prepareStr(filterstr);
		for(var i=0; i<fstrarr.length; i++)
		{
			var elem=replaceSymb(fstrarr[i]);
			swfterm='[bracket][bracket]'+swfterm+'[/bracket] AND [bracket]'+elem+'[/bracket][/bracket]';
			elem=brackets(elem);
			elem=prepareTerm(elem);
			if(elem.indexOf('\\\\\\') != -1)
				elem=prepareStr(elem);
			term='(('+term+') AND ('+elem+'))';
		}
	}
	term=replaceS6(term);
	if(typeof _rubricator!="undefined")
		querylist.push(["$rubricator",_rubricator]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if(typeof dbs[numDB].addqueries !="undefined")
	{
		var obj={};
		obj.term=term;
		obj.db=ndb;
		if(addlab != null)
			obj.label=addlab;
		var arr=prepareAddQuery(obj);
		if(arr!=null)
			Array.prototype.push.apply(gArr, arr);
	}
	callToRCP(gArr);
}

function filtersQuery()/*запрос на вывод фильтров*/
{
	typework="";
	if((typeof _size!= "undefined")&&(parseInt(_size,10)>0))
	{
		if(typeof _stopfilters=="undefined")
		{
			var str=replaceSymb(_str);
			str=brackets(str);
			var term=prepareTerm(str);
			if(typeof _swfterm!="undefined")
			{
				term=brackets(_swfterm);
				term=prepareTerm(term);
			}
			if(term.indexOf('\\\\\\') != -1)
				term=prepareStr(term);
			term=replaceS6(term);
			var ndb=numDB;
			if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
				ndb=_iddb;
			var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});
			var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});
			for(var j=0; j<filter.length; j++)
			{
				var gArr=new Array();
				var querylist=new Array();
				gArr.push(["_action","execute"]);
				gArr.push(["_html","stat"]);
				gArr.push(["_errorhtml","error"]);
				querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
				querylist.push(["_version","1.2.0"]);
				querylist.push(["session",numsean]);
				querylist.push(["queryList[0]/iddb",numDB]);
				querylist.push(["queryList[0]/query","("+term+") AND ("+filter[j].parentNode.className+")"]);
				querylist.push(["queryList[0]/queryId",filter[j].id]);
				if(typeof _localiddb!="undefined")
					gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
				else
					gArr.push(["querylist",prepareQueryString(querylist)]);
				ajaxToRCP(gArr,callbackfiltersquery);
			}
		}
		else
		{
			if(typeof _see=="undefined")
			{
				if(lockedfilters!="")
				{
					var arr=lockedfilters.split('[END]');
					var len=arr.length;
					for(var i=0; i<len; i++)
					{
						if(arr[i]!="")
						{
							var ids=arr[i].split('[ID]');
							if(take(ids[0]).n!=null)
							{
								//take(ids[0]).n.nextSibling.innerHTML='('+ids[1]+')';
								take(ids[0]).n.nextSibling.innerHTML=ids[1];
							}
						}
					}
				}
			}
		}
	}
}

function callbackfiltersquery(x)/*вывод фильтров*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		/*WriteError(error)*/;
	}
	else
	{
		var str='';
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('resultList')!=-1)
			{
				//take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML='('+response[0]._resultList_0._size+')';
				take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML=response[0]._resultList_0._size;
				str+=response[0]._resultList_0._queryId+'[ID]'+response[0]._resultList_0._size+'[END]';
			}
		}
		lockedfilters+=str;
	}
}

/*конец фильтры*/

/*конец основные поисковые функции*/

/*---------------------------------------------------дополнительные поисковые функции-------------------------------------*/

function callAddQuery(o)/*дополнительные запросы - поиск найденного в других интерфейсах*/
{
	;
}

function searchInCollection(o)/*вывод коллекций*/
{
	numDB=numdbBIBL;
	lockedfilters="";
	var lab=o.className;
	var term=take(o).getsign('input',{type:'hidden'})[0].value;
	var obj={};
	obj._str='[bracket]'+lab+' '+replaceSymb(term)+'[/bracket]';
	obj._showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(term);
	if(typeof _sign != "undefined")
		_sign=undefined;
	if(typeof _newrecs != "undefined")
		_newrecs=undefined;
	if(typeof _month != "undefined")
		_month=undefined;
	if(typeof _year != "undefined")
		_year=undefined;
	simpleSearch(lab,obj);
}

/*переход в подколлекцию с главной страницы, либо переход к записи по id*/
function searchItem(o)
{
	var lab='ID';
	var labtitle='Идентификатор записи';
	var iddb=o.getAttribute('data-iddb');
	var term=o.getAttribute('data-id');
	var title=prepareShowstring(term);
	if(o.hasAttribute('data-label'))
	{
		lab=o.getAttribute('data-label');
		labtitle=dbs[iddb]["labels"][lab][0];
	}
	if(o.hasAttribute('data-title'))
		title=o.getAttribute('data-title');
	/*if(typeof _lastdb != "undefined")
		_lastdb=iddb;
	else
		window._lastdb=iddb;*/
	numDB=iddb;
	var obj={};
	obj._str='[bracket]'+lab+' '+convertseef(term)+'[/bracket]';
	obj._showstr='<i>'+labtitle+'</i> '+title;
	if(typeof _sign != "undefined")
		_sign=undefined;
	if(typeof _newrecs != "undefined")
		_newrecs=undefined;
	if(typeof _month != "undefined")
		_month=undefined;
	if(typeof _year != "undefined")
		_year=undefined;
	simpleSearch(lab,obj);
}


/*----------------------------------------------конец дополнительные поисковые функции-------------------------------------*/

/*---------------------------------------------- конец поиск в библиографии ---------------------------------------------------*/