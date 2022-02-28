/*------------------------------------ поиск в АФ ---------------------------------------*/

function nextSearchAlfabetAuth()/*алфавитный список далее*/
{
	
	var howmuch=parseInt(_length,10);
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+howmuch;
	_query=_skipFirst=_lastterm;
	_firstterm=_firstterm+'[END]'+_query;
	searchAlfabetAuth(null,null,null,_label,_query,_firstterm,start);
}

function previousSearchAlfabetAuth(num)/*алфавитный список назад*/
{
	var howmuch=portion;
	if(typeof _length != "undefined")
		howmuch=parseInt(_length,10);
	var term="";
	if(typeof _query != "undefined")
		term=_query;
	var fterm="";
	var start=1;
	var label="";
	if(typeof _start!="undefined")
	{
		if(typeof num!="undefined")
			start=parseInt(_start,10);
		else
			start=parseInt(_start,10)-howmuch;
	}
	if(typeof _firstterm!="undefined")
	{
		var fterm=_firstterm;
		var newstr="";
		if(typeof num=="undefined")
		{
			var arr=_firstterm.split('[END]');
			if(arr.length>1)
				arr.pop();
			newstr=arr[arr.length-1];
			fterm=arr.join('[END]');
			term=_query=_skipFirst=newstr;
		}
	}
	if(typeof _term!="undefined")
		term=_term;
	searchAlfabetAuth(null,null,null,_label,term,fterm,start);
}

function searchAlfabetAuth(o,title,db,lab,term,fterm,start)/*алфавитный список*/
{
	if(typeof repointerface != "undefined")
	{
		findInRepoAf();
	}
	else
	{
		typework="search";
		var indxterms="";
		var fraftobibl=fromaftobibl[0];
		var treeview="";
		//if(typeof _treeview != "undefined")
		//	treeview=_treeview;
		if(typeof term=="undefined")
			term="";
		//if((o!=null)&&(typeof o!="undefined")&&(o.nodeName.toLowerCase()!="span"))
		if((o!=null)&&(typeof o!="undefined"))
		{
			term=o.innerHTML;
			//treeview="";
		}
		var length=portion;
		var viewoptions="useSearchableRef";
		var labname="";
		if((db==null)||(typeof db=="undefined"))
		{
			db=numDB;
		}
		if(typesearch == "professional")
		{
			typesearch = "authority";
		}
		//if((typeof dbs[db] !="undefined")&&(typeof dbs[db].afrubricator !="undefined")&&((parseInt(dbs[db].afrubricator,10)>2)&&(parseInt(dbs[db].afrubricator,10)<4)))
		if((typeof dbs[db] !="undefined")&&(typeof dbs[db].afrubricator !="undefined")&&((parseInt(dbs[db].afrubricator,10)>2)))
		{
			//if(typeof dbs[db].labels["SHM"]!="undefined")
			//{
				//lab="SHM";/*для иерархического вывода*/
				//labname="Рубрики верхнего уровня";/*для иерархического вывода*/
			//}
			if(typeof prefind=="undefined")
				fraftobibl='COD';
			length=50;
			viewoptions="meshNewTree";
		}
		//else
		//{
			if(typeof lab=="undefined")
				lab=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
			if((typeof dbs[db]["labels"]!="undefined")&&(typeof dbs[db]["labels"][lab]!="undefined"))
				labname=dbs[db]["labels"][lab][0];
		//}
		if((term=="")&&(take('itemaf').n.value!=""))
			term=take('itemaf').n.value;
		if(lab=="")
		{
			var arr=dbs[db]["labels"];
			for(var key in arr)
			{
				lab=key;
			}
			labname=dbs[db]["labels"][lab][0];
		}
		showstr=prepareStr('<span><i>'+labname+'</i> '+term+'</span>');
		showstr=prepareShowstring(showstr);
		term=convertbrackets(term);
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
		querylist.push(["_service","STORAGE:opacafd:List"]);
		querylist.push(["_version","1.3.0"]);
		querylist.push(["mode","alpha"]);
		querylist.push(["label",lab]);
		querylist.push(["$returntolist",term]);
		querylist.push(["$query",term]);
		querylist.push(["query",prepareTerm(term)]);
		querylist.push(["$listtype","letter"]);
		querylist.push(["$label",lab]);
		if(typeof start=="undefined")
			start=1;
		querylist.push(["$start",start]);
		if((typeof fterm!="undefined")&&(start>1))
		{
			querylist.push(["$skipFirst","true"]);
			querylist.push(["skipFirst","true"]);
			querylist.push(["$firstterm",fterm]);
			indxterms=prepareIndxTerms();
		}
		else
			querylist.push(["$firstterm",term]);
		if(indxterms!="")
			querylist.push(["$indxterms",indxterms]);
		querylist.push(["session",numsean]);
		querylist.push(["$length",length]);
		querylist.push(["length",length]);
		querylist.push(["iddb",db]);
		querylist.push(["$iddbaf",db]);
		if(title==null)
		{
			if(typeof _iddbtitle!="undefined")
				title=_iddbtitle;
			else
				title=dbs[db].alias;
		}
		querylist.push(["$iddbtitle",title]);
		querylist.push(["$typesearch",typesearch]);
		querylist.push(["$showstr",showstr]);
		querylist.push(["$vocobj","itemaf"]);
		querylist.push(["$andor","AND"]);
		querylist.push(["$fromaftobibl",fraftobibl]);
		querylist.push(["nextLevel","true"]);
		querylist.push(["viewOptions[0]",viewoptions]);
		querylist.push(["$viewOptions",viewoptions]);
		if(typeof _lang !="undefined")
			querylist.push(["$lang",_lang]);
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
		var title=term;
		if(typeof _firstterm != "undefined")
			title=_firstterm.substring(0,_firstterm.indexOf('[END]'));
		var obj={};
		obj.title=title;
		obj.type='Alfa';
		obj.iddb=db;
		obj.label=lab;
		obj.query=term;
		obj.queryname=term;
		putDataToStorage(db,obj);
		callToRCP(gArr);
	}
}

function nextFp(c)/*пермутационный список вперед*/
{
	var howmuch=_length;
	var startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	if(parseInt(dbs[_iddbaf].afrubricator,10)>0)
		simpleSearchAF(null,null,_label,_query,_body,startfrom);
	else
		vocsearchInAF(_label,_query,startfrom);
}

function previoussimpleSearchAF()/*пермутационный список назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10);
	if(start<1)
		start=1;
	simpleSearchAF(null,null,_label,_query,null,start);
}

function simpleSearchAF(title,db,lab,term,fterm,start)/*пермутационный список*/
{
	var label="";
	typework="search";
	typesearch = "authority";
	var flagfirst=false;
	if(typeof _body!="undefined")
	{
		if(fterm==0)
			fterm=_body;
	}
	if((db==null)||(typeof db=="undefined"))
	{
		db=numDB;
	}
	if(typeof term=="undefined")
	{
		term=take('itemaf').n.value;
		if(term=="")
		{
			/*if(parseInt(dbs[db].afrubricator,10)>1)
			{
				searchAlfabetAuth();
			}
			else
			{*/
				alert('Введите термин для поиска!');
				return;
			/*}*/
		}
	}
	if(typeof repointerface != "undefined")
	{
		findInRepoAf(this,start);
	}
	else
	{
		if(title==null)
		{
			if(typeof _iddbtitle!="undefined")
				title=_iddbtitle;
			else
				title=dbs[db].alias;
		}
		if(typeof lab=="undefined")
		{
			label=take('labs_div_'+db).tags('div')[0].className.substring(1);
		}
		else
		{
			label=lab;
		}
		var length=portion;
		var viewoptions="useSearchableRef";
		var indxterms="";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
		querylist.push(["_service","STORAGE:opacafd:Find"]);
		querylist.push(["_version","1.3.0"]);
		querylist.push(["iddb",db]);
		querylist.push(["$iddbaf",db]);
		querylist.push(["$iddbtitle",title]);
		querylist.push(["session",numsean]);
		var fraftobibl=fromaftobibl[0];
		if((typeof lab=="undefined")&&(label!="ID"))
		{
			if(parseInt(dbs[db].afrubricator,10)>2)
			{
				if(typeof prefind=="undefined")
					fraftobibl='COD';
				viewoptions="meshNewTree";
				querylist.push(["nextLevel","true"]);
			}
			/*else
			{*/
				label=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
			/*}*/
			if((label == "SHM")||(label == "CMS")||(label == "CMSEN"))/*для иерархическог вывода MeSH*/
			{
				label="MS";
			}
		}

		querylist.push(["length",length]);
		querylist.push(["$length",length]);
		querylist.push(["$viewOptions",viewoptions]);
		querylist.push(["viewOptions[0]",viewoptions]);
		if((typeof fterm=="undefined")||(fterm==null))
		{
			if(typeof fterm=="undefined")
				flagfirst=true;
			term=convertbrackets(term);
			term=prepareStr(term);
			term=replaceSlash(term);
			if(typeof prefind=="undefined")
			{
				fterm=label+' '+term;
			}
			else
				fterm=term;
			if(label=='ID')
				fterm=label+' '+term;
		}
		else
		{
			indxterms=prepareIndxTerms();
			if(indxterms!="")
				querylist.push(["$indxterms",indxterms]);		
		}
		querylist.push(["$body",fterm]);
		querylist.push(["$label",label]);
		querylist.push(["$fromaftobibl",fraftobibl]);
		if(typeof start=="undefined")
			start=1;
		if(start > 1)
			querylist.push(["start",start]);
		if((typeof _biblid!="undefined")&&(arguments.length>0))
			querylist.push(["$biblid",replaceSymb(_biblid)]);
		if((typeof _str!="undefined")&&(arguments.length>0))
			querylist.push(["$str",replaceSymb(_str)]);
		showstr="";
		if((typeof _iddbbibl!="undefined")&&(arguments.length>0))
		{
			querylist.push(["$iddbbibl",_iddbbibl]);
			showstr='<span><i>Код</i> '+term+'</span>';
		}
		else
		{
			firstterm=term;
			if(!flagfirst)
			{
				if(typeof _ftitle !="undefined")
					firstterm=_ftitle;
			}
			showstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> '+firstterm+'</span>';
		}
		querylist.push(["$ftitle",replaceSymb(firstterm)]);
		querylist.push(["$returntolist",fterm]);
		showstr=prepareShowstring(showstr);
		querylist.push(["$start",start]);
		querylist.push(["$vocobj","itemaf"]);
		querylist.push(["$query",term]);
		querylist.push(["$showstr",showstr]);
		var andor=0;
		if(take('andor').n!=null)
		{
			if(take('andor').n.className=="AND")
				andor=1;
			else
				andor=0;
		}
		querylist.push(["$andor",andor]);
		if(typeof _lang !="undefined")
			querylist.push(["$lang",_lang]);
		querylist.push(["$typesearch","authority"]);
		querylist.push(["$listtype","permutation"]);
		querylist.push(["query/body",prepareTerm(fterm)]);
		querylist.push(["query/label","s1"]);
		querylist.push(["query/mode","wordSet"]);
		firstterm="";
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
		numDB=db;
		var obj={};
		obj.title=term;
		obj.type='Permutation';
		obj.iddb=numDB;
		obj.label=label;
		obj.query=term;
		obj.queryname=term;
		putDataToStorage(numDB,obj);
		callToRCP(gArr);
	}
}

function seeTreeM(o,c,l,q,pq,ll,k)/*запрос на рубрики в виде дерева*/
{
	typework="";
	treeobj=c;
	var plus=take(treeobj).n.previousSibling.firstChild;
	if(plus.nodeName.toLowerCase()=='input')
		plus=plus.nextSibling;
	if(take(treeobj).n.style.display=='none')
	{
		if(take(treeobj).n.innerHTML=='')
		{
			take(treeobj).n.innerHTML='<div class="progress small"><div></div></div>';
			var length=1000;
			var viewoptions="useSearchableRef";
			if(parseInt(dbs[numDB].afrubricator,10)>2)
			{
				viewoptions="meshNewTree";
			}
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacafd:View"]);
			querylist.push(["_version","1.7.0"]);
			/*querylist.push(["_version","1.3.0"]);*/
			querylist.push(["session",numsean]);
			querylist.push(["label",l]);
			querylist.push(["length",length]);
			querylist.push(["iddb",numDB]);
			querylist.push(["mode","meshtree"]);
			querylist.push(["query",q]);
			if(( o!=null) && (typeof o.firstChild!="undefined")&&(o.firstChild.name=='lang'))
				querylist.push(["lang",o.firstChild.value]);
			querylist.push(["$lastquery",pq]);
			querylist.push(["$level",ll]);
			/*var fraftobibl=fromaftobibl[0];
			if(parseInt(dbs[numDB].afrubricator,10)>2)
			{
				if(typeof prefind=="undefined")
					fraftobibl='COD';
			}
			querylist.push(["$fromaftobibl",fraftobibl]);*/
			querylist.push(["$fromaftobibl","COD"]);
			//if(typeof _treeview == "undefined")
			//{
				querylist.push(["nextLevel","true"]);
			//}
			querylist.push(["viewOptions[0]",viewoptions]);
			if(typeof _treeview == "undefined")
			{
				gArr.push(["querylist",prepareQueryString(querylist)]);
				ajaxToRCP(gArr,openTree);
			}
			else
			{
				if(typeof k !="undefined")
				{
					//querylist.push(["$fromnexttree","1"]);
					//querylist.push(["viewOptions[1]","childrenStop"]);
					//querylist.push(["nextLevel","true"]);
					gArr.push(["querylist",prepareQueryString(querylist)]);
					ajaxToRCP(gArr,openTreeView,pathactrcp,null,openTreeView,100);
				}
				else
				{
					gArr.push(["querylist",prepareQueryString(querylist)]);
					ajaxToRCP(gArr,openTreeView);
				}
			}
		}
		plus.className='afminusimg';
		take(treeobj).show();
	}
	else
	{
		take(treeobj).hide();
		plus.className='afplusimg';
	}
}

function nextSeeTreeM(o,c,l,q,m,ll)/*запрос на рубрики в виде дерева следующая порция*/
{
	typework="";
	treeobj=c;
	var lang="";
	if(( o!=null) && (typeof o.firstChild!="undefined")&&(o.firstChild.name=='lang'))
		lang=o.firstChild.value;
	o.parentNode.removeChild(o);
	var length=50;
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[numDB].afrubricator,10)>2)
	{
		viewoptions="meshNewTree";
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["label",l]);
	querylist.push(["length",length]);
	querylist.push(["iddb",numDB]);
	querylist.push(["mode","meshtree"]);
	if(typeof m!="undefined")
	{
		querylist.push(["start",q]);
		querylist.push(["query",m]);
		querylist.push(["$lastquery",m])
		querylist.push(["skipFirst","true"]);
	}
	else
	{
		querylist.push(["query",q]);
		querylist.push(["$lastquery",q])
	}
	if(lang!="")
		querylist.push(["lang",lang]);
	querylist.push(["$level",ll]);
	querylist.push(["$fromaftobibl","COD"]);
	querylist.push(["viewOptions[0]",viewoptions]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openTree);
}

function openTree(x)/*отображение рубрик в виде дерева*/
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
		var cont=take(treeobj);
		cont.n.innerHTML='';
		var num1=0;
		if(((typeof _listtype!="undefined")&&(_listtype!="letter"))&&(typeof _mlabel!="undefined")&&(_mlabel=="COD")||(typeof _fromnexttree!="undefined"))
		{
			var par=cont.n.parentNode.parentNode;
			var k=parseInt(par.id.substring(2),10)+1;
			if(!isNaN(k))
			{
				var arr=take('srezults').getsign('div',{align:'left'});
				var len=arr.length
				for(var i=k; i<len; i++)
				{
					par.parentNode.removeChild(arr[i]);
				}
			}
		}
		var query=response[0]._next_0._query;
		var label=response[0]._next_0._label;
		var start=replaceSymb(response[0]._next_0._start);
		var lang="";
		var endvoc=false;
		var llevel=parseInt(_level,10);
		if(typeof response[0]._end!="undefined")
			endvoc=true;
		var harr={};
		if(typeof _linkstring!="undefined")
		{
			var aarr=_linkstring.split('[END]');
			for(var i=0; i<aarr.length; i++)
			{
				if(aarr[i]!="")
				{
					var tmparr=aarr[i].split('[ID]');
					harr[tmparr[0]]=tmparr[1];
				}
			}
		}
		for(arg in response[0])
		{
			if(arg.indexOf('result_')!=-1)
			{
				var value=response[0][arg];
				var level=value._level;
				var ind=value._id;
				var vquery=ind;
				var clevel=parseInt(level,10);
				var nlevel=parseInt(llevel,10)+1;
				var count=0;
				var pubmed="";
				var ebsco="";
				if(typeof value._AFSHORTFORM_0._originalTermin!="undefined")
				{
					pubmed=value._AFSHORTFORM_0._originalTermin+"[MeSH Terms]";
					if((typeof _auth!="undefined")&&(typeof harr["068"] != "undefined"))
					{
						ebsco="(MH "+value._AFSHORTFORM_0._originalTermin+")";
					}
				}
				var arr=[];
				var title=value._AFSHORTFORM_0._title_0[0];
				var hasNextLevel = "0";
				for (prop in value._AFSHORTFORM_0)
				{
					var exact="";
					var down="";
					if(typeof value._AFSHORTFORM_0._meshQuery!="undefined")
						exact=value._AFSHORTFORM_0._meshQuery;
					if(typeof value._AFSHORTFORM_0._meshQuery!="undefined")
						down=value._AFSHORTFORM_0._meshDownQuery;
					if(prop.indexOf('meshCodes_')!=-1)
					{
						var v=value._AFSHORTFORM_0[prop];
						if(typeof v._hasNextLevel!="undefined")
							hasNextLevel = "1";
						else
							hasNextLevel = "0";
						if((_lastquery!=v._query)&&(query!=v._query))
						{
							if(typeof v._main=="undefined")
							{
								arr.push([v._label,v._query,title,hasNextLevel,vquery,exact,down]);
								start=v._query;
								if(typeof v._lang != "undefined")
									lang=v._lang;
								count++;
							}
						}
					}
				}
				if(count>0)
				{
					var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});
					var p=div.create('div',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});
					var spancont=null;
					var inp=null;
					inp=p.create('input',{id:arr[0][1],type:'checkbox',className:arr[0][2],name:_fromaftobibl,value:arr[0][4],onclick:'function(){putAfTerms(this);}','data-down':arr[0][0]+' '+arr[0][1]+'*','data-exact':arr[0][0]+' '+arr[0][1]});
					if(arr[0][3]=="1")
					{
						spancont=p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+'","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+'","'+level+'");}'});
						if(lang!="")
						{
							spancont.create('input',{type:'hidden','name':'lang',value:lang});
						}
						spancont.text(title);
					}
					else
					{
						spancont=p.create('span',{className:'afbulletimg',textNode:title});
					}
					p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){getAnnotation(this.parentNode);}'});
					p.create('input',{type:'checkbox',name:'ch',id:'ch'+arr[0][1]+''+num1+''+count,className:'afsearchimg',style:{position:'absolute',marginLeft:'-3000px',visibility:'hidden'}});
					p.create('label',{tabIndex:'0',title:'Искать в ...',className:'afsearchimg','for':'ch'+arr[0][1]+''+num1+''+count});
					var scont=p.create('span',{className:'tooltip'});
					scont.create('label',{className:'del','for':'ch'+arr[0][1]+''+num1+''+count});
					scont.create('span',{textNode:'Искать в: ',className:'titl mb5x'});
					scont.create('span',{textNode:'Локальные ресурсы',className:'u a curs ml20x p5x',onmousedown:'function(){searchTerm(this.parentNode.parentNode)}'});
					if(pubmed!="")
						scont.create('span',{onmousedown:'function(){window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeVal(pubmed)+'\')}',textNode:'PubMed', className:'u a curs ml20x p5x'});
					if(ebsco!="")
						scont.create('span',{onmousedown:'function(){window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeVal(ebsco)+'\')}',textNode:'EBSCO', className:'u a curs ml20x p5x'});
					div.create('div',{id:'add'+arr[0][1]+'_'+count,style:{display:'none'}});
				}
			}
			num1++;
		}
		if(!endvoc)
		{
			var s=cont.create('span',{title:'Далее',className:'nexttr',onmousedown:'function(){nextSeeTreeM(this,"'+treeobj+'","'+label+'","'+start+'","'+query+'","'+llevel+'");}'});
			s.create('span',{textNode:'Далее',className:'nexttree'});
		}
	}
}

function getAnnotation(o,l,db,num)/*аннотация*/
{
	var lab="";
	var ind="";
	var query="";
	if((typeof l!="undefined")&&(l!=null))
		lab=l;
	else
		lab=_label;
	var queryname="";
	if(typeof o!="string")
	{
		ind=o.id;
		if(typeof(_query)!="undefined")
			query=replaceSlash(_query);
		var t=take(o).tags('input')[0];
		if(t!=null)
			queryname=t.className;
	}
	else
	{
		ind=o;
		query=replaceSlash(o);
		if((typeof num != "undefined")&&(num != 1))
		{
			queryname=num;
		}
	}
	if(typeof _handler != "undefined")
		vocsearchInAF('ID',ind);
	else
	{
		if((typeof db!="undefined")&&(db!=null))
			iddbbibl=db;
		else
		{
			if(typeof _iddbbibl!="undefined")
				iddbbibl=_iddbbibl;
		}
		typework="search";
		vocobj="itemaf";
		
		var handler=modules["annotation"].directory+'/annotation.php';
		var viewoptions="useSearchableRef";
		if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>2))
		{
			viewoptions="meshNewTree";
		}
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacafd:View"]);
		querylist.push(["_version","1.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["$iddbaf",numDB]);
		querylist.push(["$iddbtitle",dbs[numDB].alias]);
		querylist.push(["$fromaftobibl",fromaftobibl[0]]);
		querylist.push(["$vocobj",vocobj]);
		querylist.push(["$label",lab]);
		querylist.push(["iddb",numDB]);
		querylist.push(["id",ind]);
		querylist.push(["mode","annotation"]);
		if(viewoptions=="meshNewTree")
		{
			querylist.push(["blockform","ANNOT_BLOCKS_MESH2"]);
		}
		if(typeof num == "undefined")
		{
			var len=portion;
			var start=1;
			if(typeof _length!="undefined")
				len=parseInt(_length,10);
			if(typeof _start!="undefined")
				start=_start;
			querylist.push(["$start",start]);
			querylist.push(["$length",len]);
			querylist.push(["$query",query]);
			if(typeof _listtype=="undefined")
			{
				if(typeof _treeview!="undefined")
					_listtype="treeview";
				else
					_listtype="permutation";
			}
			querylist.push(["$listtype",_listtype]);
			if(typeof _lang != "undefined")
				querylist.push(["$lang",_lang]);
			if(typeof _mode!="undefined")
				querylist.push(["$mode",_mode]);
			if(typeof _biblid!="undefined")
				querylist.push(["$biblid",replaceSymb(_biblid)]);
			if(iddbbibl!="")
				querylist.push(["$iddbbibl",iddbbibl]);
			if(typeof _treeview !="undefined")
				querylist.push(["$treeview",_treeview]);	
			else
			{
				if(typeof _returntolist!="undefined")
				{
					querylist.push(["$returntolist",replaceSlash(_returntolist)]);	
				}
			}
			if(typeof _str!="undefined")
			{
				var str=prepareStr(_str);
				str=replaceSymb(str);
				querylist.push(["$str",str]);
			}
			if(typeof _firstterm!="undefined")
			{
				querylist.push(["$firstterm",prepareStr(_firstterm)]);
			}
			if(typeof _ftitle!="undefined")
				querylist.push(["$ftitle",replaceSymb(_ftitle)]);
			if(typeof _skipFirst!="undefined")
				querylist.push(["$skipFirst","true"]);
		}
		showstr=prepareShowstring('<span>'+queryname+'</span>');
		typesearch="authority";
		querylist.push(["$showstr",showstr]);
		querylist.push(["$viewOptions",viewoptions]);
		querylist.push(["viewOptions[0]",viewoptions]);
		if(iddbbibl!="")
			gArr.push(["querylist",prepareQueryString(querylist,dbs[iddbbibl].afsearch)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		var obj={};
		obj.title=ind;
		obj.type='Annotation';
		obj.iddb=numDB;
		obj.label="AUIDS";
		obj.query=ind;
		obj.queryname=queryname;
		putDataToStorage(numDB,obj);
		callToRCP(gArr);
	}
}

function seeAlso(o,c,cp,cv,num)/*ссылка см.также*/
{
	var ind="";
	var queryname="";
	if(typeof o != "string")
	{
		ind=o.id;
		var t=take(o).tags('input')[0];
		if(t!=null)
			queryname=t.className;
	}
	else
	{
		ind=o;
		if(typeof num != "undefined")
			queryname=num;
	}
	var query="";
	if(typeof _query != "undefined")
		query=replaceSymb(_query);
	
	typework="search";
	vocobj="itemaf";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["tree"].directory+'/tree.php']);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["$iddbtitle",dbs[numDB].alias]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$vocobj",vocobj]);
	var lab='ID';
	if(typeof _label!="undefined")
		lab=_label;
	querylist.push(["$label",lab]);
	querylist.push(["iddb",numDB]);
	querylist.push(["id",ind]);
	querylist.push(["mode","see"]);
	if(c!=null)
		querylist.push(["codes[0]",c]);
	else
	{
		if((typeof cp != "undefined")&&(cp != null))
			querylist.push(["codes[0]/codePos",cp]);
		if((typeof cv != "undefined")&&(cv != null))
			querylist.push(["codes[0]/codeVal",cv]);
	}
	if(typeof num == "undefined")
	{
		var len=portion;
		var start=1;
		if(typeof _length != "undefined")
			len=_length;
		if(typeof _start!="undefined")
			start=_start;
		querylist.push(["$start",start]);
		querylist.push(["$length",len]);
		if(query != "")
			querylist.push(["$query",query]);
		if(typeof _listtype=="undefined")
		{
			if(typeof _treeview!="undefined")
				_listtype="treeview";
			else
				_listtype="permutation";
		}
		querylist.push(["$listtype",_listtype]);
		if(typeof _mode!="undefined")
			querylist.push(["$mode",_mode]);
		if(typeof _lang != "undefined")
			querylist.push(["$lang",_lang]);
		if(typeof _biblid!="undefined")
			querylist.push(["$biblid",replaceSymb(_biblid)]);
		if(typeof _iddbbibl!="undefined")
			querylist.push(["$iddbbibl",_iddbbibl]);
		if(typeof _treeview !="undefined")
			querylist.push(["$treeview",_treeview]);	
		else
		{
			if(typeof _returntolist!="undefined")
			{
				querylist.push(["$returntolist",replaceSlash(_returntolist)]);	
			}
		}
		if(typeof _str!="undefined")
		{
			var str=prepareStr(_str);
			str=replaceSymb(str);
			querylist.push(["$str",str]);
		}
	}
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[numDB].afrubricator,10)>2)
		viewoptions="meshNewTree";
	showstr=prepareShowstring('<span>'+queryname+'</span>');
	typesearch="authority";
	querylist.push(["$showstr",showstr]);
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	var obj={};
	obj.title=ind;
	obj.type='Also';
	obj.iddb=numDB;
	obj.label='AUIDS';
	obj.query=ind;
	obj.queryname=queryname;
	if(c!=null)
		obj.code=c;
	else
	{
		if(typeof cp != "undefined")
			obj.codepos=cp;
		if(typeof cv != "undefined")
			obj.codeval=cv;
	}
	putDataToStorage(numDB,obj);
	callToRCP(gArr);
}

function seeAlsoOtherLanguage(o,c,cp,cv,num)/*ссылка см.также на другом языке*/
{
	var ind="";
	var queryname="";
	if(typeof o != "string")
	{
		ind=o.id;
		var t=take(o).tags('input')[0];
		if(t!=null)
			queryname=t.className;
	}
	else
	{
		ind=o;
		if(typeof num != "undefined")
			queryname=num;
	}
	var query="";
	if(typeof _query != "undefined")
		query=replaceSymb(_query);
	
	typework="search";
	vocobj="itemaf";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["tree"].directory+'/tree.php']);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["$iddbtitle",dbs[numDB].alias]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$vocobj",vocobj]);
	var lab='ID';
	if(typeof _label!="undefined")
		lab=_label;
	querylist.push(["$label",lab]);
	querylist.push(["iddb",numDB]);
	querylist.push(["id",ind]);
	querylist.push(["mode","seeOtherLanguage"]);
	if(c!=null)
		querylist.push(["codes[0]",c]);
	else
	{
		if((typeof cp != "undefined")&&(cp != null))
			querylist.push(["codes[0]/codePos",cp]);
		if((typeof cv != "undefined")&&(cv != null))
			querylist.push(["codes[0]/codeVal",cv]);
	}
	if(typeof num == "undefined")
	{
		var len=portion;
		var start=1;
		if(typeof _length != "undefined")
			len=_length;
		if(typeof _start!="undefined")
			start=_start;
		querylist.push(["$start",start]);
		querylist.push(["$length",len]);
		if(query != "")
			querylist.push(["$query",query]);
		if(typeof _listtype=="undefined")
		{
			if(typeof _treeview!="undefined")
				_listtype="treeview";
			else
				_listtype="permutation";
		}
		querylist.push(["$listtype",_listtype]);
		if(typeof _mode!="undefined")
			querylist.push(["$mode",_mode]);
		if(typeof _lang != "undefined")
			querylist.push(["$lang",_lang]);
		if(typeof _biblid!="undefined")
			querylist.push(["$biblid",replaceSymb(_biblid)]);
		if(typeof _iddbbibl!="undefined")
			querylist.push(["$iddbbibl",_iddbbibl]);
		if(typeof _treeview !="undefined")
			querylist.push(["$treeview",_treeview]);	
		else
		{
			if(typeof _returntolist!="undefined")
			{
				querylist.push(["$returntolist",replaceSlash(_returntolist)]);	
			}
		}
		if(typeof _str!="undefined")
		{
			var str=prepareStr(_str);
			str=replaceSymb(str);
			querylist.push(["$str",str]);
		}
	}
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[numDB].afrubricator,10)>2)
		viewoptions="meshNewTree";
	showstr=prepareShowstring('<span>'+queryname+'</span>');
	typesearch="authority";
	querylist.push(["$showstr",showstr]);
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	var obj={};
	obj.title=ind;
	obj.type='Other';
	obj.iddb=numDB;
	obj.label='AUIDS';
	obj.query=ind;
	obj.queryname=queryname;
	if(c!=null)
		obj.code=c;
	else
	{
		if(typeof cp != "undefined")
			obj.codepos=cp;
		if(typeof cv != "undefined")
			obj.codeval=cv;
	}
	putDataToStorage(numDB,obj);
	callToRCP(gArr);
}

function seeMeshTree(o,l,q,skip,start,mterm,qn)/*дерево MeSH*/
{
	var queryname="";
	if(typeof qn != "undefined")
		queryname=qn;
	else
	{
		if(typeof _query != "undefined")
			queryname=replaceSymb(_query);
	}
	typework="search";
	var length=50;
	var viewoptions="meshNewTree";
	var handler=modules["letter"].directory+'/letter.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	if((typeof start=="undefined")||(start==null))
		start=1;
	querylist.push(["$start",start]);
	querylist.push(["$iddbaf",numDB]);
	if(typeof _iddbtitle!="undefined")
		querylist.push(["$iddbtitle",_iddbtitle]);
	querylist.push(["$label",_label]);
	if(vocobj!="")
		querylist.push(["$vocobj",vocobj]);
	querylist.push(["$mlabel",l]);
	querylist.push(["label",l]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["length",length]);
	querylist.push(["$length",length]);
	querylist.push(["iddb",numDB]);
	querylist.push(["mode","meshtree"]);
	if(((typeof skip!="undefined")&&(skip!=null))&&(start>1))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if((typeof skip!="undefined")&&(skip!=null))
		querylist.push(["$mterm",skip]);
	else
		querylist.push(["$mterm",q]);
	if((typeof mterm!="undefined")&&(mterm!=null))
		querylist.push(["start",mterm]);
	querylist.push(["query",q]);
	var lang="";
	if(typeof o != "string")
	{
		if((o!=null) && (typeof o.firstChild!="undefined") && (o.firstChild.name=='lang'))
		{
			lang=o.firstChild.value;
		}
		else
		{
			if(typeof _lang != "undefined")
			{
				lang=_lang;
			}
		}
	}
	else
	{
		lang=o;
	}
	if(lang != "")
	{
		querylist.push(["lang",lang]);
		querylist.push(["$lang",lang]);
	}
	querylist.push(["$code",q]);
	querylist.push(["$query",queryname]);
	querylist.push(["$andor",0]);
	querylist.push(["$typesearch",typesearch]);
	if(typeof _listtype != "undefined")
		querylist.push(["$listtype",_listtype]);
	if(typeof _firstterm!="undefined")
		querylist.push(["$firstterm",_firstterm]);
	if(typeof _mode!="undefined")
		querylist.push(["$mode",_mode]);
	if(typeof _biblid!="undefined")
		querylist.push(["$biblid",replaceSymb(_biblid)]);
	showstr=prepareStr(_showstr);
	if(typeof _iddbbibl!="undefined")
	{
		querylist.push(["$iddbbibl",_iddbbibl]);
		showstr=prepareStr('<span><i>Код</i> '+queryname+'</span>');
	}
	if(typeof qn != "undefined")
		showstr=prepareStr('<span><i>Код</i> '+queryname+'</span>');
	//else
	//{
		//if((typeof _returntolist!="undefined")&&(_returntolist!=""))
		if(typeof _returntolist!="undefined")
		{
			if(typeof qn == "undefined")
				querylist.push(["$returntolist",replaceSymb(_returntolist)]);	
		}
		//showstr=prepareStr(_showstr);
	//}
	showstr=prepareShowstring(showstr);
	querylist.push(["$showstr",showstr]);
	if(typeof _str!="undefined")
	{
		var str=prepareStr(_str);
		str=replaceSymb(str);
		querylist.push(["$str",str]);
	}
	querylist.push(["$fromnexttree","1"]);
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	
	var obj={};
	if(lang != "")
		obj.lang=lang;
	obj.title=q;
	obj.type='NewMeshTree';
	obj.iddb=numDB;
	obj.label=l;
	obj.query=q;
	obj.queryname=queryname;
	putDataToStorage(numDB,obj);
	
	callToRCP(gArr);
}

function previousTree()/*дерево MeSH назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)-30;
	if(start<1)
		start=1;
	var arr=_mterm.split('[END]');
	arr.pop();
	var newstr=arr[arr.length-1];
	_mterm=arr.join('[END]');
	seeMeshTree(null,_mlabel,_code,_mterm,start,newstr);
}

function nextTree(l)/*дерево MeSH вперед*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+30;
	_mterm=_mterm+'[END]'+l;
	seeMeshTree(null,_mlabel,_code,_mterm,start,l);
}

function findAfBaseById(o,txt)
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["label","ID"]);
	querylist.push(["$label","ID"]);
	querylist.push(["length",portion]);
	querylist.push(["mode","AllBasePrefind"]);
	querylist.push(["searchType","find"]);
	querylist.push(["term",o]);
	querylist.push(["$term",o]);
	querylist.push(["$txt",txt]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,backfindAfBaseById);
}

function backfindAfBaseById(x)
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
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_prefind_')!=-1)
			{
				if(value._size!="0")
				{
					numDB=value._iddb;
					getAnnotation(_term,_label,null,_txt);
					break;
				}
			}
		}
	}
}

function searchAF(o)/*поиск в АФ из библиографии*/
{
	typework="";
	var term="";
	var label="";
	var label1="";
	var searchtype="list";
	if(typesearch=="authority")
	{
		term=take('itemaf').n.value;
		label = label1 = take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
		if(typeof prefind != "undefined")
		{
			if(label1 == "AH")
				label1 = "SH";
		}
	}
	else
	{
		term=take('itemprof').n.value;
		label = label1 = take('itemprof').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
	}
	if((typeof o == "undefined")||(o == null))
	{
		searchtype="find";
		if(term=="")
		{
			alert("Неверно задано поисковое предписание!");
			return;
		}
	}
	term=replaceSymb(term);
	term=brackets(term);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.1.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["searchType",searchtype]);
	querylist.push(["mode","searchfrombibl"]);
	querylist.push(["term",term]);
	querylist.push(["label",label1]);
	querylist.push(["$term",term]);
	querylist.push(["$label",label]);
	querylist.push(["iddb",numdbBIBL]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	var arg={};
	arg.target=self;
	arg.cls='loader';
	showLayerWin('loaderwin',arg);
	ajaxToRCP(gArr,openAuthWin);
}

function openAuthWin(x)/*окно поиска в АФ из библиографии*/
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
		var count=0;
		var cont=take('main');
		var continner=cont.create('div',{id:'continner',style:{display:'none'}});
		var adb="";
		var alab="";
		var aterm="";
		var sterm="";
		var body="";
		var title="";
		var flag=false;
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_afList_')!=-1)
			{
				if(typeof value._empty=="undefined")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
					{
						alab=value._label;
						aterm=value._query;
						title=value._title;
						var div=continner.create('div',{className:cls});
						div.create('input',{type: 'hidden', id:'af_'+adb, name: alab, value: aterm});
						div.create('u',{title: 'перейти', textNode: title,className:'big',onmousedown:'function(){searchAlfabetAuth(null,\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});
						count++;
						flag=false;
					}
				}
			}
			if(arg.indexOf('_prefind_')!=-1)
			{
				if(value._size!="0")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
					{
						title=value._title;
						aterm=value._query_0._body;
						alab=_label;
						firstterm=_term;
						var div=continner.create('div',{className:cls});
						div.create('input',{type: 'hidden', id:'af_'+adb, name: alab, value: aterm});
						div.create('u',{title: 'перейти', textNode: title,className:'big',onmousedown:'function(){simpleSearchAF(\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});
						count++;
						flag=true;
					}
				}
			}
		}
		if(count==1)
		{
			if(typesearch == "professional")
			{
				_label=alab;
				_iddb=adb;
				_term=aterm;
			}
			if(flag)
				simpleSearchAF(title,adb,alab,aterm);
			else
				searchAlfabetAuth(null,title,adb,alab,aterm);				
		}
		else
		{
			var arg={};
			arg.cls='dialog2';
			arg.message='ЕАФ';
			arg.target=self;
			arg.width='500';
			arg.height='400';
			showLayerWin('authwin',arg);
			var doc=take('authwinform');
			doc.n.innerHTML="";
			if(count==0)
			{
				doc.create('p',{textNode:'По вашему запросу ничего не найдено.', style:{font: 'normal 10pt Verdana', textAlign: 'center'}});
			}
			else
			{
				doc.n.appendChild(take('continner').n);
			}
			take('continner').show();
		}
	}
}

function nextFindInAf()/*поиск в АФ определитель алф. и перм. списков вперед*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+portion;
	_query=_skipFirst=_lastterm;
	_firstterm=_firstterm+'[END]'+_query;
	findInAf(_iddbtitle,_iddbaf,_label,_query,_firstterm,start);
}

function previousFindInAf()/*поиск в АФ определитель алф. и перм. списков назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)-portion;
	if(start<1)
		start=1;
	var arr=_firstterm.split('[END]');
	arr.pop();
	var newstr=arr[arr.length-1];
	var fterm=arr.join('[END]');
	_query=_skipFirst=newstr;
	findInAf(_iddbtitle,_iddbaf,_label,_query,fterm,start);
}

function findInAf(o)/*поиск в АФ определитель алф. и перм. списков*/
{
	if(parseInt(dbs[numDB].afrubricator,10)>0)
	{
		if(typeof o=="number")
		{
			if((typeof _listtype!="undefined")&&(_listtype=="permutation"))
				previoussimpleSearchAF();
			else
				previousSearchAlfabetAuth(1);
		}
		else
		{
			if(typeof prefind != "undefined")
				searchAF(o);
			else
			{
				if(typeof o =="object")
					searchAlfabetAuth(o);
				else
					simpleSearchAF();
			}
		}
	}
	else
	{
		vocsearchInAF();
	}
}

function getAfList(o)/*предварительный поиск по всем АФ из библиографии*/
{
	typework="";
	var val=o.nextSibling.value;
	var num=val.substring(val.indexOf('[NUM]')+5,val.indexOf('[/NUM]'));
	var i1=val.substring(val.indexOf('[I1]')+4,val.indexOf('[/I1]'));
	var i2=val.substring(val.indexOf('[I2]')+4,val.indexOf('[/I2]'));
	var value=val.substring(val.indexOf('[VALUE]')+7,val.indexOf('[/VALUE]'));
	if(value.indexOf('$2')!=-1)
		value=value.substring(0,value.indexOf('$2'));
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.0.0"]);
	/*querylist.push(["_version","1.7.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["mode","fieldToQuery"]);
	querylist.push(["field/i1",i1]);
	querylist.push(["field/i2",i2]);
	querylist.push(["field/num",num]);
	querylist.push(["$iddbbibl",numDB]);
	var tmp=/\\{1,}/g;
	if(tmp.test(value))
		value=value.replace(tmp,'\\');
	querylist.push(["field/value",value]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	var arg={};
	arg.target=self;
	arg.cls='loader';
	showLayerWin('loaderwin',arg);
	ajaxToRCP(gArr,openAfListWin);
}

function openAfListWin(x)/*окно предварительного поиска по всем АФ из библиографии*/
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
		var count=0;
		var cont=take('main');
		var continner=null;
		if(take('continner').n!=null)
		{
			continner=take('continner');
			continner.n.innerHTML="";
		}
		else
			continner=cont.create('div',{id:'continner',style:{display:'none'}});
		var adb="";
		var atitle="";
		var abody="";
		var alab="";
		var aterm="";
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_prefind_')!=-1)
			{
				if(value._size!="0")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					atitle=value._title;
					abody=value._query_0._body;
					alab=value._query_0._parsed_0._label;
					aterm=value._query_0._parsed_0._content;
					var tmp=/\\{1,}/g;
					if(tmp.test(aterm))
						aterm=aterm.replace(tmp,'\\');
					var div=continner.create('div',{className:cls});
					div.create('input',{type: 'hidden', id:'af_'+adb, name:alab, value:aterm});
					//div.create('u',{textNode:atitle,className:'big',onclick:'function(){findAnnotation(\"'+atitle+'\",\"'+adb+'\",\"'+alab+'\",\"'+replaceSymb(aterm)+'\",\"'+_iddbbibl+'\");}'});
					div.create('u',{title: 'перейти', textNode: atitle,className:'big',onmousedown:'function(){simpleSearchAF(\"'+atitle+'\",\"'+adb+'\",\"'+alab+'\",\"'+replaceSymb(aterm)+'\");}'});
					count++;
				}
			}
		}
		if(count==1)
		{
			simpleSearchAF(atitle,adb,alab,replaceSymb(aterm));
		}
		else
		{
			delLayerWin();
			var arg={};
			arg.cls='dialog2';
			arg.message='ЕАФ';
			arg.target=self;
			arg.width='500';
			arg.height='400';
			showLayerWin('authwin',arg);
			var doc=take('authwinform');
			doc.n.innerHTML="";
			if(count==0)
			{
				doc.create('p',{textNode:'По вашему запросу ничего не найдено.', style:{font: 'normal 10pt Verdana', textAlign: 'center'}});
			}
			else
			{
				doc.n.appendChild(take('continner').n);
			}
			take('continner').show();
		}
	}
}

function vocsearchInAF(l,t,c,r)/*вывод словаря*/
{
	typework="search";
	typesearch = "authority";
	var apos="'";
	var renew="";
	if(typeof l == "undefined")
		l = take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
	if(typeof t == "undefined")
	{
		t=take('itemaf').n.value;
		apos="";
	}
	if(typeof r != "undefined")
	{
		renew="yes";
	}
	var term=prepareStr(t);
	term=replaceSymb(term);
	var query=term;
	term="("+l+" "+apos+""+term+""+apos+")";
	if(dbs[numDB].type!="AF")
		numDB=numdbf;
	showstr=prepareStr('<i>'+dbs[numDB]["labels"][l][0]+'</i> '+t);
	showstr=prepareShowstring(showstr);
	if(l == 'ID')
	{
		if(typeof _showstr != "undefined")
			showstr=_showstr;
	}
	var start=0;
	if((typeof c != "undefined")&&(c!=null))
		start=c;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["annotshort"].directory+'/annotshort.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.3.0"]);
	/*querylist.push(["_version","1.0.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["start",start]);
	querylist.push(["length",portion]);
	var title=dbs[numDB].alias
	if(typeof _iddbtitle!="undefined")
		title=_iddbtitle;
	querylist.push(["$iddbtitle",title]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$length",portion]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["$label",l]);
	querylist.push(["$body",term]);
	querylist.push(["$query",query]);
	querylist.push(["$handler","annotshort"]);
	querylist.push(["$typesearch","authority"]);
	if(renew != "")
		querylist.push(["$renew","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","s1"]);
	querylist.push(["query/outforms[0]","BLOCK856"]);
	querylist.push(["query/outforms[1]","AFTITLE"]);
	querylist.push(["query/outforms[2]","SYNONYMS"]);
	querylist.push(["query/outforms[3]","BLOCK300"]);
	querylist.push(["query/outforms[4]","BLOCK305"]);
	querylist.push(["query/outforms[5]","BLOCK310"]);
	querylist.push(["query/outforms[6]","BLOCK320"]);
	querylist.push(["query/outforms[7]","BLOCK330"]);
	querylist.push(["query/outforms[8]","BLOCK340"]);
	querylist.push(["query/outforms[9]","BLOCK5"]);
	querylist.push(["query/outforms[10]","BLOCK640"]);
	querylist.push(["query/outforms[11]","BLOCK7"]);
	querylist.push(["query/outforms[12]","BLOCK810"]);
	querylist.push(["query/outforms[13]","BLOCK830"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*------------------ конструктор поискового выражения -------------------*/

function delSCTerm(o)/*АФ - удаление элемента из конструктора*/
{
	//if(take(o).n != null)
	//{
		var ind=(typeof o == "string") ? o: o.id;
		if(confirm('Удалить '+take('_'+ind).n.innerHTML))
		{
			if(take('_'+ind).n.parentNode == take('sconstruct_'+numDB).n.firstChild)
			{
				if(take('sconstruct_'+numDB).n.firstChild.nextSibling != null)
					take('sconstruct_'+numDB).n.firstChild.nextSibling.removeChild(take('sconstruct_'+numDB).n.firstChild.nextSibling.firstChild);
			}
			delTWin(take('_'+ind).n,'1');
			if(take(o).n != null)
				take(o).n.checked=false;
		}
		else
		{
			if(take(o).n != null)
				take(o).n.checked=true;
		}
	//}
}

function putAfTerms(o)/*АФ - конструктор поискового выражения*/
{
	switch(o.checked)
	{

		case true:	if(take('srezults').n!=null)
					{
						var arr=take('srezults').getsign('span',{className:'tooltip1'});
						if(arr.length > 0)
						{
							var len=arr.length;
							for(var i=0; i<len; i++)
							{
								arr[i].parentNode.firstChild.checked=false;
								arr[i].parentNode.removeChild(arr[i]);
							}
						}
					}
					var cont=take(o.parentNode);
					var tol=cont.create('span',{className:'tooltip1'});
					tol.create('span',{id:'tooldel',className:'del',onmousedown:'function(){delTWin(this)}'});
					tol.create('span',{className:'titl mb10x ml5x',textNode:'Поиск термина в локальных ресурсах'});
					tol.create('span',{className:'titl mb15x ml5x',textNode:'Добавить к поисковому выражению:'});
					var exact=o.getAttribute("data-exact");
					var down=o.getAttribute("data-down");
					if((exact != "")&&(exact != null))
					{
						var check=tol.create('span',{className:'mb10x ml5x'});
						check.create('input',{type:'checkbox','name':'exact',id:'exact',value:''});
						check.text('Не включать нижестоящие термины');
					}
					var cont=take('sconstruct_'+numDB);
					if(cont.n != null)
					{
						if(cont.n.childNodes.length >0)
						{
							var selcont=tol.create('span',{className:'mb10x ml5x'});
							var sel=selcont.create('select',{id:'andor',className:'andor2'});
							sel.create('option',{value:'AND',textNode:'И'});
							sel.create('option',{value:'OR',textNode:'ИЛИ'});
							sel.create('option',{value:'NOT',textNode:'НЕ'});
							selcont.text('логический оператор');
						}
					}
					if((exact != "")&&(exact != null))
						tol.create('input',{type:'button',className:'button3 db p5x ml5x',value:'Добавить',onmousedown:'function(){putToConstruct(this)}','data-label':o.name,'data-title':o.className,'data-index':o.id,'data-value':o.value,'data-exact':exact,'data-down':down});
					else if((down != "")&&(down != null))
						tol.create('input',{type:'button',className:'button3 db p5x ml5x',value:'Добавить',onmousedown:'function(){putToConstruct(this)}','data-label':o.name,'data-title':o.className,'data-index':o.id,'data-value':o.value,'data-down':down});
					else
						tol.create('input',{type:'button',className:'button3 db p5x ml5x',value:'Добавить',onmousedown:'function(){putToConstruct(this)}','data-label':o.name,'data-title':o.className,'data-index':o.id,'data-value':o.value});
		break;
		case false: if(take('_'+o.id).n != null)
					{
						delSCTerm(o);
					}
		break;
		default: break;
	}
}

function putToConstruct(o)/*АФ - помещение элемента в конструктор поискового выражения*/
{
	var cont=take('sconstruct_'+numDB);
	if(cont.n != null)
	{
		var sspan=cont.create('span',{className:'sblock'});
		if(cont.n.childNodes.length >1)
		{
			var ssel=sspan.create('select',{className:'andor2'});
			ssel.create('option',{value:'AND',textNode:'И'});
			ssel.create('option',{value:'OR',textNode:'ИЛИ'});
			ssel.create('option',{value:'NOT',textNode:'НЕ'});
			ssel.n.options[take('andor').n.selectedIndex].selected=true;
		}
		var ind=o.getAttribute("data-index");
		var titl=o.getAttribute("data-title");
		var lab=o.getAttribute("data-label");
		var val=o.getAttribute("data-value");
		var exact=o.getAttribute("data-exact");
		var down=o.getAttribute("data-down");
		var term='(AUIDS '+replaceSymb(val)+')';
		if(take('exact').n != null)
		{
			if(take('exact').n.checked)
				term='('+exact+')';
			else
				term='('+down+')';
		}
		else
		{
			if((down != "")&&(down != null))
				term='(COD '+down+')';
		}
		if(lab == 'QMS')
			term='(MS '+titl.substring(titl.indexOf('/')+1)+') AND '+term;
		sspan.create('code',{title:'Удалить',textNode:'Х',onclick:'function(){delSCTerm(\''+replaceSymb(ind)+'\')}'});
		sspan.create('span',{className:'sterm',id:'_'+ind,textNode:titl,'data-label':lab,'data-value':val,title:term});
		delTWin(take('tooldel').n,'1');
	}
}

function putDataToStorage(db,o)/*АФ - заполнение sessionStorage из конструктора*/
{
	if(typeof o != "undefined")
	{
		var obj = JSON.parse(sessionStorage.getItem('query'));
		if(obj==null)
			obj={};
		var qterm=o.title;
		qterm=qterm.replace(/\s/g,'_');
		var key='q_'+db+'_'+o.label+'_'+o.type+'_'+qterm;
		if(typeof obj[key]=="undefined")
		{
			obj[key]={'iddb':o.iddb,'type':o.type,'label':o.label,'queryname':o.queryname,'query':o.query};
			if(typeof o.code != "undefined")
				obj[key].code=o.code;
			if(typeof o.codepos != "undefined")
				obj[key].codepos=o.codepos;
			if(typeof o.codeval != "undefined")
				obj[key].codeval=o.codeval;
			if(typeof o.lang != "undefined")
				obj[key].lang=o.lang;
			try
			{
				sessionStorage.setItem("query",JSON.stringify(obj));
			}
			catch(e){};
		}
	}
	if(take('search_constructor').n != null)
	{
		var cont=take('search_constructor').getpart(null,'div',{id:'sconstruct_'})[0];
		var ndb=cont.id.substring(cont.id.indexOf('_')+1);
		if((cont != null)&&(cont.innerHTML != ""))
		{
			var arg = JSON.parse(sessionStorage.getItem('searchbox_'+ndb));
			var terms=[];
			if(arg==null)
				arg=[];
			var arr=take(cont).getsign('span',{className:'sblock'});
			for(var i=0; i<arr.length; i++)
			{
				var span=take(arr[i]).tags('span')[0];
				var term=span.title;
				var show=span.innerHTML;
				var ind=span.id;
				var slabel=span.getAttribute("data-label");
				var sval=span.getAttribute("data-value");
				if(i==0)
				{
					terms.push(["",ind,term,show,slabel,sval]);
				}
				else
				{
					var log=take(arr[i]).tags('select')[0];
					terms.push([log.selectedIndex,ind,term,show,slabel,sval]);
				}
			}
			arg=terms;
			try
			{
				sessionStorage.setItem('searchbox_'+ndb,JSON.stringify(arg));
			}
			catch(e){};
		}
	}
}

function getDataFromStorage()/*АФ - заполнение конструктора и истории действий из sessionStorage*/
{
	var cont=take('sconstruct_'+numDB);
	var arg = JSON.parse(sessionStorage.getItem('searchbox_'+numDB));
	if(arg!=null)
	{
		for(var i=0; i<arg.length; i++)
		{
			var ind=arg[i][1].substring(1);
			var sspan=cont.create('span',{className:'sblock'});
			if(i>0)
			{
				var ssel=sspan.create('select',{className:'andor2'});
				ssel.create('option',{value:'AND',textNode:'И'});
				ssel.create('option',{value:'OR',textNode:'ИЛИ'});
				ssel.create('option',{value:'NOT',textNode:'НЕ'});
				ssel.n.options[arg[i][0]].selected=true;
			}
			//sspan.create('span',{className:'sterm',id:arg[i][1],textNode:arg[i][3],title:arg[i][2],'data-label':arg[i][4],'data-value':arg[i][5]});
			sspan.create('code',{title:'Удалить',textNode:'Х',onclick:'function(){delSCTerm(\''+replaceSymb(ind)+'\')}'});
			sspan.create('span',{className:'sterm',id:arg[i][1],textNode:arg[i][3],'data-label':arg[i][4],'data-value':arg[i][5],title:arg[i][2]});

			if(take(ind).n != null)
				take(ind).n.checked=true;
		}
	}
	var hist=take('shist');
	var key = JSON.parse(sessionStorage.getItem('query'));
	if(key!=null)
	{
		for(var k in key)
		{
			var value=key[k];
			var type="";
			var term="";
			if(value.type=='Tree')
			{
				type='Дерево';
				term=dbs[value.iddb].alias+' '+type+' '+dbs[value.iddb]["labels"][value.label][0]+' '+value.queryname;
			}
			else if(value.type=='Annotation')
			{
				type='Аннотация';
				term=dbs[value.iddb].alias+' '+type+' '+value.queryname;
			}
			else if(value.type=='Also')
			{
				type='См. также';
				term=dbs[value.iddb].alias+' '+type+' '+value.queryname;
			}
			else if(value.type=='Other')
			{
				type='См. также на другом языке';
				term=dbs[value.iddb].alias+' '+type+' '+value.queryname;
			}
			else if(value.type=='Permutation')
			{
				type='Пермутационный список';
				term=dbs[value.iddb].alias+' '+type+' '+dbs[value.iddb]["labels"][value.label][0]+' '+value.queryname;
			}
			else if(value.type=='NewMeshTree')
			{
				type='Дерево';
				term=dbs[value.iddb].alias+' '+type+' '+dbs[value.iddb]["labels"][value.label][0]+' '+value.queryname;
			}
			else
			{
				type='Алфавитный список';
				term=dbs[value.iddb].alias+' '+type+' '+dbs[value.iddb]["labels"][value.label][0]+' '+value.queryname;
			}
			var span=hist.create('span',{'data-type':value.type,'data-label':value.label,'data-iddb':value.iddb,'data-query':value.query,'data-queryname':value.queryname,className:value.type,textNode:term,onmousedown:'function(){requestToAf(this);}'});
			if(typeof value.code != "undefined")
				span.n.setAttribute('data-code',value.code);
			if(typeof value.codepos != "undefined")
				span.n.setAttribute('data-codepos',value.codepos);
			if(typeof value.codeval != "undefined")
				span.n.setAttribute('data-codeval',value.codeval);
			if(typeof value.lang != "undefined")
				span.n.setAttribute('data-lang',value.lang);
		}
	}
}

function requestToAf(o)
{
	var type=o.getAttribute('data-type');
	var iddb=o.getAttribute('data-iddb');
	var query=o.getAttribute('data-query');
	var queryname=o.getAttribute('data-queryname');
	var label=o.getAttribute('data-label');
	var code=o.getAttribute('data-code');
	var codepos=o.getAttribute('data-codepos');
	var codeval=o.getAttribute('data-codeval');
	var lang="";
	if(o.hasAttribute('data-lang'))
		lang=o.getAttribute('data-lang');
	numDB=iddb;
	switch(type)
	{
		case 'Annotation': getAnnotation(query,label,null,queryname);
		break;
		case 'Also': seeAlso(query,code,codepos,codeval,queryname);
		break;
		case 'Other': seeAlsoOtherLanguage(query,code,codepos,codeval,queryname);
		break;
		case 'Alfa': searchAlfabetAuth(null,dbs[iddb].alias,iddb,label,query);
		break;
		case 'Permutation': simpleSearchAF(dbs[iddb].alias,iddb,label,query);
		break;
		case 'Tree': seeTreeView(o);
		break;
		case 'NewMeshTree': seeMeshTree(lang,label,query,null,null,null,queryname);
		break;
		default:break;
	}
}

function clearSearchBox(db)
{
	delete sessionStorage['searchbox_'+db];
	if(take('sconstruct_'+db).n != null)
	{
		take('sconstruct_'+db).n.innerHTML="";
	}
}

function clearActivities()
{
	delete sessionStorage["query"];
	if(take('shist').n != null)
	{
		take('shist').n.innerHTML="";
	}
}

/*--------------- конец конструктор поискового выражения -----------------*/

/*-------------------------дополнительные функции-----------------*/

function findAnnotation(atitle,adb,alab,aterm,ndb)/*unused*/
{
	numDB=adb;
	getAnnotation(aterm,alab,ndb);
}

/*---------------дополнительные функции-----------------------------------*/

/*------------------------------------ конец поиск в АФ ---------------------------------------*/