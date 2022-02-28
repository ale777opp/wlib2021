/*репозиторий*/

function goToElement(o)
{
	var arr=take('infor').getpart(null,'div',{className:'anch'});
	for(var i=0; i< arr.length; i++)
	{
		take(arr[i]).delclass('anch');
	}
	var elem=take(o).n
	var el=elem.parentNode.parentNode;
	el.tabIndex=0;
	el.focus();
	el.scrollIntoView();
	take(el).addclass('anch');
	setTimeout(function()
	{
		take(el).delclass('anch');
		el.blur();
	}, 1000);
}

function seeFullRopoInfo(o,s)
{
	typework="search";
	typesearch="simple";
	numdb=numdbBIBL;
	var ind=prepareStr(o);
	var str="";
	var showstr="";
	if(typeof _str != "undefined")
	{
		str=prepareStr(_str);
		showstr=prepareShowstring(_str);
	}
	else
	{
		if(typeof s != "undefined")
		{
			str='[bracket]DT LE '+Year+''+mm+''+dd+'[/bracket]';
			showstr='Все публикации';
		}
	}
	if((typeof _iddb != "undefined") && (_iddb != numdbBIBL))
	{
		str="";
		showstr="";
	}
	if(str=="")
		str='[bracket]DT LE '+Year+''+mm+''+dd+'[/bracket]';
	if(showstr== "")
		showstr='Все публикации';
	showstr=prepareShowstring(showstr);
	var action="php";
	var handler=modules["search"].directory+'/addrepo.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_history","yes"]);
	querylist.push(["iddbIds[0]/iddb",numdbBIBL]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["outformList[0]/outform","FULLREPOTITL"]);
	querylist.push(["outformList[1]/outform","FULLREPOAUTH2"]);
	querylist.push(["outformList[2]/outform","FULLREPOSRC"]);
	querylist.push(["outformList[3]/outform","FULLREPOVYX"]);
	querylist.push(["outformList[4]/outform","FULLREPOANT"]);
	querylist.push(["outformList[5]/outform","FULLREPOKW"]);
	querylist.push(["outformList[6]/outform","FULLREPOLINK"]);
	querylist.push(["outformList[7]/outform","FULLREPOAFF2"]);
	querylist.push(["outformList[8]/outform","FULLREPOINFO"]);
	querylist.push(["outformList[9]/outform","FULLREPOPHOTO"]);
	querylist.push(["outformList[10]/outform","SEO_META_REPO"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}
function findInRepoAf(o,start)
{
	typework="search";
	numDB=numdbf;
	var length=portion;
	var str="*";
	var showstr="Все авторы";
	var term="";
	var fullview="";
	if(take('itemaf').n.value!="")
		str=take('itemaf').n.value;
	else
	{
		if((typeof o != "undefined") && (o != null))
		{
			if(typeof o != "string")
			{
				 if(typeof _str != "undefined")
				 {
					term=prepareTerm(_str);
					showstr=_showstr;
				 }
			}
			else
			{
				term="(ID "+replaceSymb(o)+")";
				fullview="yes";
			}
		}
	}
	if(term == "")
		term="(AU "+str+") NOT (ST 'd')";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["annotshort"].directory+'/annotshort.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["iddb",numdbf]);
	querylist.push(["$iddb",numdbf]);
	querylist.push(["$iddbaf",numdbf]);
	querylist.push(["session",numsean]);
	querylist.push(["length",length]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["$length",length]);
	querylist.push(["$label","AU"]);
	querylist.push(["$query",""]);
	querylist.push(["$body",""]);
	
	if(typeof start=="undefined")
		start=1;
	if(start > 1)
		querylist.push(["start",start]);
	querylist.push(["$start",start]);
	if(fullview != "")
	{
		querylist.push(["$fullview","yes"]);
		if(typesearch != "simple")
			querylist.push(["$str",_str]);		
	}
	else
	{
		querylist.push(["$str",convertbrackets(term)]);		
	}
	querylist.push(["query/mode","wordSet"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/direct","asc"]);
	querylist.push(["query/label","s1"]);
	querylist.push(["query/outforms[0]","AFREPO1"]);
	querylist.push(["query/outforms[1]","AFREPO2"]);
	if((typeof o != "undefined") && (o != null) && (typeof o == "string"))
	{
		querylist.push(["query/outforms[2]","AFREPO3"]);
		querylist.push(["query/outforms[3]","AFREPO4"]);
		querylist.push(["query/outforms[4]","AFREPO5"]);
	}
	else
	{
		querylist.push(["facets[0]/type","terms"]);
		querylist.push(["facets[0]/name","AU"]);
		querylist.push(["facets[0]/field","AU"]);
		querylist.push(["facets[0]/limit","500"]);
		querylist.push(["facets[1]/type","terms"]);
		querylist.push(["facets[1]/name","AFF"]);
		querylist.push(["facets[1]/field","AFF"]);
		querylist.push(["facets[1]/limit","500"]);	
	}
	typesearch="authority";
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function findFacetsForMainPage()
{
	typework="";
	var term="(DT LE "+Year+""+mm+""+dd+")";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$length",15]);
	querylist.push(["length",15]);
	querylist.push(["outformList[0]/outform","ORDERFORM"]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["iddb",numdbBIBL]);
	querylist.push(["query/body",term]);
	querylist.push(["_history","yes"]);
	querylist.push(["facets[0]/type","terms"]);
	querylist.push(["facets[0]/name","FG"]);
	querylist.push(["facets[0]/field","FG"]);
	querylist.push(["facets[0]/limit","500"]);
	querylist.push(["facets[0]/sort/entity",dbs[numdbBIBL]["labels"]["FG"][5]]);
	querylist.push(["facets[0]/sort/order",dbs[numdbBIBL]["labels"]["FG"][6]]);
	querylist.push(["facets[1]/type","terms"]);
	querylist.push(["facets[1]/name","AU"]);
	querylist.push(["facets[1]/field","AU"]);
	querylist.push(["facets[1]/limit","500"]);
	querylist.push(["facets[1]/sort/entity",dbs[numdbBIBL]["labels"]["AU"][5]]);
	querylist.push(["facets[1]/sort/order",dbs[numdbBIBL]["labels"]["AU"][6]]);
	querylist.push(["facets[2]/type","terms"]);
	querylist.push(["facets[2]/name","MSH"]);
	querylist.push(["facets[2]/field","MSH"]);
	querylist.push(["facets[2]/limit","500"]);
	querylist.push(["facets[2]/sort/entity",dbs[numdbBIBL]["labels"]["MSH"][5]]);
	querylist.push(["facets[2]/sort/order",dbs[numdbBIBL]["labels"]["MSH"][6]]);
	querylist.push(["facets[3]/type","terms"]);
	querylist.push(["facets[3]/name","PY"]);
	querylist.push(["facets[3]/field","PY"]);
	querylist.push(["facets[3]/limit","500"]);
	querylist.push(["facets[3]/sort/entity",dbs[numdbBIBL]["labels"]["PY"][5]]);
	querylist.push(["facets[3]/sort/order",dbs[numdbBIBL]["labels"]["PY"][6]]);
	querylist.push(["$solr","yes"]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackfindFacetsForMainPage);
}

function callbackfindFacetsForMainPage(x)/*предварительный поиск фасетов для главной страницы*/
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
		var count=0;
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('_facets')!=-1)
			{
				var div=take(value._name);
				var bucket=[];
				for (var prop in value)
				{
					var arg=value[prop]
					if(prop.indexOf('_buckets')!=-1)
					{
						bucket.push([arg._value,arg._count]);
					}
				}
				var xarr=[];
				var yarr=[];
				var x=0;
				var y=0;
				var z=0;
				var lbucket=bucket.length;
				for(var i=0; i<lbucket; i++)
				{
					xarr[x]=[value._name,bucket[i][0],bucket[i][1]];
					x++;
					z++;
					if(x % 5 == 0)
					{
						yarr[y]=xarr;
						x=0;
						y++;
						xarr=[];
					}
					if(z == lbucket)
					{
						if(xarr.length > 0)
							yarr[y]=xarr;
						x=0;
						y=0;
						z=0;
						xarr=[];
					}
				}
				var ycount=yarr.length;
				for(var j=0;j<ycount;j++)
				{
					var fdiv=null;
					if(j > 0)
						fdiv=div.create('div',{style:{display:'none'}});
					else
						fdiv=div.create('div',{style:{display:''}});
					if(j > 0)
					{
						var bdiv=fdiv.create('div',{className:'table even',onmousedown:'function(){facetsBack(this)}'});
						bdiv.create('span',{className:'td',textNode:'назад'});
						bdiv.create('span',{className:'td'});
					}
					var acount=yarr[j].length;
					for(var m=0;m < acount;m++)
					{
						var tdiv=fdiv.create('div',{className:'table'});
						tdiv.create('span',{'data-label':yarr[j][m][0],className:'td',textNode:yarr[j][m][1],onmousedown:'function(){callToSearch(this)}'});
						tdiv.create('i',{className:'td',textNode:yarr[j][m][2]});
					}
					if(lbucket>5)
					{
						if(acount==5)
						{
							if(typeof yarr[j+1] != undefined)
							{
								if(j<ycount)
								{
									var ndiv=fdiv.create('div',{className:'table else',onmousedown:'function(){facetsNext(this)}'});
									ndiv.create('span',{className:'td'});
									ndiv.create('span',{className:'td',textNode:'далее'});
								}
							}
						}
					}
				}
			}
		}
	}
}

function callToSearch(o)
{
	var l=o.getAttribute('data-label');
	var term=brackets(o.innerHTML);
	var obj={};
	obj._str='[bracket]'+l+' '+convertseef(term)+'[/bracket]';
	obj._showstr='<i>'+dbs[numDB]["labels"][l][0]+'</i> '+replaceSymb(term);
	searchlabel=l;
	simpleSearch(l,obj);
}

function openArticlesAuthor(o,inx)
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
	querylist.push(["length",3]);
	querylist.push(["iddb",numdbBIBL]);
	if(o != null)
		querylist.push(["$ind",o]);
	querylist.push(["query/body","(AUIDS "+inx+")"]);
	querylist.push(["$indx","(AUIDS "+inx+")"]);
	querylist.push(["outformList[0]/outform",dbs[numdbBIBL].outform]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackopenArticlesAuthor);
}

function callbackopenArticlesAuthor(x)
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
		for (var key in response[0])
		{
			var cont=take(_ind).n.parentNode;
			var doc=take(cont).create('div');
			var value = response[0][key];
			if(key.indexOf('result_')!=-1)
			{
				var value = response[0][key];
				var arr=value._SHOTREPO_0;
				var div=doc.create('div',{className:'searchrez'});
				var div1=div.create('div',{className:'output'});
				var j=0;
				for(var i=0; i<arr.length;i++)
				{
					var atext=arr[i];
					if(atext!="")
					{
						if((atext.indexOf('[INSERT]') == -1) && (atext.indexOf('[codes]') == -1))
						{
							if(j == 0)
							{
								div1.n.innerHTML+='<div class="red ft" title="Подробнее" onmousedown="seeFullRopoInfo(\''+value._id+'\')">'+atext+'</div>';
							}
							else
								div1.create('div',{textNode:atext});
							j++;
						}
					}
				}
				doc.n.innerHTML=parseBB(doc.n.innerHTML);
			}
		}
	}
}
