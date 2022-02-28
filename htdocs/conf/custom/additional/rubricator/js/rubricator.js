/*рубрикатор*/

var numrubdb="9";

function disPlayBranch(o)/*раскрытие/скрытие узлов рубрикатора*/
{
	var obj=o.parentNode.lastChild;
	if(obj.nodeName.toLowerCase()=='ul')
	{
		if(obj.className=="db")
		{
			obj.className="dn";
			o.parentNode.className="folder";
			o.title="Развернуть";
		}
		else
		{
			obj.className="db";
			o.parentNode.className="folder_";
			o.title="Свернуть";
		}
	}
}

function colorize(o)/*подсветка узлов и переход к поиску*/
{
	if(o.className=="colorized")
		o.className="decolorize";
	else
		o.className="colorized";
	searchWithRubricator();
}

function openBranches()/*раскрытие помеченных узлов рубрикатора после поиска*/
{
	if(take('rubricator').n!=null)
	{
		var arr=_rubricator.split('[END]');
		for(var i=0; i<arr.length; i++)
		{
			var obj=take('rub_'+arr[i]).n;
			obj.className='colorized';
			obj.title='Снять выделение';
			var par=obj.parentNode.parentNode;
			displayNode(par);
		}
	}
}

function displayNode(o)
{
	if(dbs[numDB].rdisplay=="outside")
	{
		if(o.parentNode.id!="rubricator")
		{
			o.className="db";
			o.parentNode.className='folder_';
			o.parentNode.firstChild.title='Свернуть';
			displayNode(o.parentNode.parentNode);
		}
		else
			return;
	}
	else
	{
		o.style.display="";
		if(o.id!="rubricator")
		{
			if((o.previousSibling)&&(o.previousSibling.nodeType==1))
			{
				o.previousSibling.className='folder_';
				o.previousSibling.title='Свернуть';
			}
			displayNode(o.parentNode);
		}
		else
			return;
	}
}

function searchWithRubricator()/*поиск с рубрикатором*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["search"].directory+'/search.php';
	var str="";
	var showstr="";
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
	var outfrm=outform;
	var ndb=numDB;
	if(typeof numrubdb != "undefined")
		ndb=numrubdb;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=_iddb;
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
	swfterm=str;
	//str=brackets(str);
	var term="";
	//term=prepareTerm(str);
	var flaghist=false;
	if(take('rubricator').n!=null)
	{
		var arr=take('rubricator').getsign('a',{className:'colorized'});
		if(arr.length>0)
		{
			var rstr="";
			var rsstr="<i>Рубрикатор</i> ";
			var rtstr="";
			if(typeof dbs[ndb]["rubricator"] != "undefined")
				rtstr=dbs[ndb]["rubricator"]+" ";
			else
			{
				rtstr=take('rub_label').n.value+" ";
				ndb=numdbBIBL;
				flaghist=true;
			}
			for(var i=0; i<arr.length; i++)
			{
				rstr+=replaceSymb(arr[i].id.substring(arr[i].id.indexOf('_')+1));
				//rtstr+="'"+replaceSymb(arr[i].innerHTML)+"'";
				//rtstr+=replaceSymb(arr[i].innerHTML);
				var valelem=take(arr[i].parentNode).tags('input')[0];
				var val=valelem.value.substring(2, valelem.value.lastIndexOf('$a'));
				rtstr+=val;
				rsstr+=replaceSymb(arr[i].innerHTML);
				if(i<arr.length-1)
				{
					rstr+='[END]';
					rsstr+=' И ';
					//rtstr+=' OR ';
					rtstr+=' AND ';
				}
			}
			querylist.push(["$rubricator",rstr]);
			//if(!flaghist)
			//{
			//	querylist.push(["$rshowstr",prepareShowstring(rsstr)]);
			//}
			//swfterm='[bracket]'+swfterm+'[/bracket]';
			//swfterm+=' AND [bracket]'+rtstr+'[/bracket]';
			//term='('+term+')';
			//term+=' AND ('+rtstr+')';
			swfterm+='[bracket]'+convertbrackets(replaceSlash(brackets(rtstr)))+'[/bracket]';
			term+=brackets(rtstr);
			//if(flaghist)
			//{
				str=swfterm;
				showstr=prepareShowstring(rsstr);
			//}
		}
	}
	if(term!="")
	{
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		querylist.push(["iddb",ndb]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(typeof solr!="undefined")
		{
			var fobj=prepareFacetsForBibliosearch();
			if(fobj != null)
			{
				if(lockedfilters != "")
				{
					term='('+term+') AND '+replaceS6(prepareTerm(fobj._bstr));
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
		}
		querylist.push(["query/body",term]);
		//if(!flaghist)
		//	querylist.push(["_history","yes"]);
		if(typeof _newrecs != "undefined")
			_newrecs="";
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
		callToRCP(gArr);
	}
}

/*конец рубрикатор*/