/*новые поступления*/

function searchNews(num,ndb)/*новые поступления*/
{
	typework="search";
	var handler=modules["search"].directory+'/search.php';
	var today=new Date();
/*период - 2 месяца*/
	var twomonth=new Date(today.getTime()-86400000*60);
	var y1=twomonth.getFullYear();
	var d1=(twomonth.getDate()<10)?'0'+(twomonth.getDate()):twomonth.getDate();
	var m1=(twomonth.getMonth()+1<10)?'0'+(twomonth.getMonth()+1):twomonth.getMonth()+1;
	var lab="DT";
	if((typeof num !="undefined")&&(num != null))
	{
		//lab="DEZ";
		lab=num;
		y1=Year-1;
		m1=mm;
		d1=dd;
	}
	var str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y1+""+m1+""+d1+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
	var showstr=prepareStr("<i>Дата </i> с "+d1+"."+m1+"."+y1+" по "+dd+"."+mm+"."+Year);
/*конец период - 2 месяца*/
/*период - по текущий день*/
	//var str=prepareStr("[bracket]"+lab+" LE [apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
	//var showstr=prepareStr("<i>Дата </i> по "+dd+"."+mm+"."+Year);
/*конец период - по текущий день*/
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var term=prepareTerm(str);
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
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
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$renew","yes"]);
	if((typeof num !="undefined")&&(num != null))
	{
		querylist.push(["$searchtitle","Рекомендуем"]);
	}
	else
	{
		querylist.push(["$searchtitle","Новые поступления"]);
	}
	var db=numDB;
	if(typeof ndb !="undefined")
		db=ndb;
	if(typeof numdbNews != "undefined")
		db=numdbNews;
	var outfrm=outform;
	if(typeof dbs[db].outform!="undefined")
		outfrm=dbs[db].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	querylist.push(["iddb",db]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof biblio!="undefined")
	{
		var bobj={'query': term ,'databases':[db],'paging':{'limit': portion,'offset': 0}};
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		lockedfilters="";
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
			}
		}
		querylist.push(["$solr","yes"]);
	}
	var label=lab;
	var direct="asc";
	if(typeof _sortlabel !="undefined")
		label=_sortlabel;
	if(take('sortlab').n!=null)
		label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;
	if(typeof _direct !="undefined")
		direct=_direct;
	if((label=='PY')||(label=='DT'))
		direct="desc";
	querylist.push(["query/label",label]);
	querylist.push(["query/direct",direct]);
	querylist.push(["$sortlabel",label]);
	querylist.push(["$sortdirect",direct]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

function searchNewRecs(ndb,sign,c)/*новые поступления с календарем*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	var howmuch="";
	var startfrom="";
	var month="";
	var year="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/search.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]DT BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		month=mm;
		year=Year;
		showstr="<i>Новые поступления </i> с "+dd+"."+mm+"."+y+" по "+dd+"."+mm+"."+Year;
		sign=showstr;
	}
	else
	{
		if((typeof sign == "undefined")||(sign == null))
		{
			str=_str;
			showstr=_showstr;
			month=_month;
			year=_year;
			sign=_sign;
		}
		else
		{
			str=sign.str;
			showstr=sign.showstr;
			month=sign.m;
			year=sign.y;
			sign=showstr;
		}
	}
	if(typeof _sign != "undefined")
		_sign=sign;
	if(typeof _month != "undefined")
		_month=month;
	if(typeof _year != "undefined")
		_year=year;
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var term=prepareTerm(str);
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
	querylist.push(["_str",str]);
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
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	if(month!="")
		querylist.push(["$month",month]);
	if(year!="")
		querylist.push(["$year",year]);
	querylist.push(["_history","yes"]);
	if(typeof biblio!="undefined")
	{
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
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
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["$newrecs",handler]);
	querylist.push(["$searchtitle","Новые поступления"]);
	var label="DT";
	var direct="asc";
	if(typeof _sortlabel !="undefined")
		label=_sortlabel;
	if(take('sortlab').n!=null)
		label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;
	if(typeof _direct !="undefined")
		direct=_direct;
	if((label=='PY')||(label=='DT'))
		direct="desc";
	querylist.push(["query/label",label]);
	querylist.push(["query/direct",direct]);
	querylist.push(["$sortlabel",label]);
	querylist.push(["$sortdirect",direct]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function setEvent(y,m)/*новые поступления из календаря*/
{
	var y1=0;
	var m1=0;
	var flagyear=false;
	if(typeof y == "object")
	{
		y1=parseInt(take('y_10').n.className,10);
		m1=parseInt(take('m_10').n.className,10);
		if(y.id == 'y_10')
			flagyear=true;
	}
	else
	{
		y1=parseInt(y,10);
		m1=parseInt(m,10);
	}
	if(typeof _newrecs != "undefined")
	{
		var validnumber;
		if(m1==1)
			(isLeapyear(y1))?validnumber=29:validnumber=28;
		else if((m1==3)||(m1==5)||(m1==8)||(m1==10))
			validnumber=30;
		else
			validnumber=31;
		var m2=(m1+1<10)?'0'+(m1+1):m1+1;
		var str="";
		var showstr="";
		if(flagyear)
		{
			str="[bracket]DT BETWEEN [apos]"+y1+"0101[apos],[apos]"+y1+"1231[apos][/bracket]";
			showstr="<i>Новые поступления за </i> "+y1+" год";
		}
		else
		{
			str="[bracket]DT BETWEEN [apos]"+y1+""+m2+"01[apos],[apos]"+y1+""+m2+""+validnumber+"[apos][/bracket]";
			showstr="<i>Новые поступления за "+months[m1]+"</i> "+y1+" года";
		}
		var arg={};
		arg.str=str;
		arg.showstr=showstr;
		arg.m=m2;
		arg.y=y1;
		searchNewRecs(_iddb,arg);
	}
}

/*конец новые поступления*/