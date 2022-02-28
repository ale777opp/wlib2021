/*------------ коллекции ---------*/

function chooseCollections(o)/*выделение цветом*/
{
	if(o.className=="colorized")
		o.className="decolorize";
	else
		o.className="colorized";
}

/*переход на страницу коллекций - новая версия*/
function showAllCollectionsNew(o,c)
{
	typework="search";
	if(typeof _newrecs != "undefined")
		_newrecs="";
	var db=coldb;
	var titl="Коллекции";
	var outfrm='COLLWEB';
	var str='';
	var showstr='';
	var listarr=[];
	var idslist='';
	var labrespref='';
	if(take('col_menu').n != null)
		listarr=take('col_menu').getsign('li',{className:'colorized'});
	if(o != null)
	{
		if(o.hasAttribute('data-marker'))
		{
			listarr=[];
			idslist='';
		}
		if(listarr.length > 0)
		{
			for(var i=0; i < listarr.length; i++)
			{
				str+='[bracket]'+listarr[i].getAttribute('data-label')+' [apos]'+listarr[i].innerHTML+'[apos][/bracket]';
				idslist+=listarr[i].id;
				if(i < (listarr.length-1))
				{
					str+=' OR ';
					idslist+='|';
				}
			}
		}
		else
		{
			str='[bracket]LPUB [apos]ПОДБОРКИ/КОЛЛЕКЦИИ[apos][/bracket]';
			if(o.hasAttribute('data-title'))
				titl=o.getAttribute('data-title');
		}
		if(o.hasAttribute('data-iddb'))
			db=o.getAttribute('data-iddb');
		if(o.hasAttribute('data-outform'))
			outfrm=o.getAttribute('data-outform');
		if(o.hasAttribute('data-labrespref'))
			labrespref=o.getAttribute('data-labrespref');
		showstr=prepareShowstring(str);
	}
	else
	{
		if(typeof _str != "undefined")
			str=_str;
		if(typeof _str != "undefined")
			showstr=_showstr;
		if(typeof _iddb != "undefined")
			db=_iddb;
		if(typeof _searchtitle != "undefined")
			titl= _searchtitle;
		if(typeof _outform != "undefined")
			outfrm=_outform;
		if(typeof _idslist != "undefined")
			idslist=_idslist;
		if(typeof _labrespref != "undefined")
			labrespref=_labrespref;
	}
	var startfrom=0;
	if(typeof c=="undefined")
	{
		startfrom=0;
	}
	else
	{
		startfrom=parseInt(portion,10)*(parseInt(c,10)-1);
	}
	var action="php";
	var handler=modules["all_collections"].directory+'/all_collections.php';
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
	querylist.push(["length",portion]);
	querylist.push(["$length",portion]);
	querylist.push(["iddb",db]);
	querylist.push(["$iddb",db]);
	querylist.push(["$labrespref",labrespref]);
	querylist.push(["$coltitle","Коллекции"]);
	querylist.push(["$labres",labres]);
	querylist.push(["$outform",outfrm]);
	querylist.push(["$str",convertseef(str)]);
	querylist.push(["$showstr",showstr]);
	if(idslist != '')
		querylist.push(["$idslist",idslist]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["query/body",prepareTerm(str)]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	querylist.length=0;
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.4.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",db]);
	querylist.push(["$iddb",db]);
	querylist.push(["$labsubcol",labsubcol]);
	querylist.push(["label",labcol]);
	querylist.push(["query",""]);
	querylist.push(["length",portion]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*ссылка "Документы" на странице коллекций*/
function showResources(o)
{
	var lab=o.getAttribute('data-label');
	var titl=o.getAttribute('data-title');
	var labrespref=o.getAttribute('data-labrespref');
	var obj={};
	if(o.hasAttribute('id'))
		obj._str='[bracket]'+lab+' '+labrespref+''+convertseef(o.id)+'[/bracket]';
	else
	{
		obj._str='[bracket]'+lab;
		obj._str+=' ';
		obj._str+=titl;
		obj._str+='[/bracket]';
	}
	obj._showstr='<i>Коллекция</i> ' + prepareShowstring(titl);
	if(typeof _showstr != "undefined")
		_sign=undefined;
	if(typeof _newrecs != "undefined")
		_newrecs=undefined;
	if(typeof _month != "undefined")
		_month=undefined;
	if(typeof _year != "undefined")
		_year=undefined;
	simpleSearch(lab,obj);
}


/*--------- конец коллекции ------*/