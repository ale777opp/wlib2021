/*не обнаружено проектов, где используются эти функции*/

function fulltextSearch(nm)/*поиск по полному тексту unused*/
{
	typework="search";
	if(((take('itemfulltxt').n==null)||(take('itemfulltxt').n.value==""))&&(nm==null))
	{
		return;
	}
	var ftxt="";
	var str="";
	var showstr="";
	var val=take('itemfulltxt').n.value;
	var lab=take('fulltext_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
	var startfrom=1;
	var howmuch=portion;
	if(nm!=null)
	{
		if(typeof _str!="undefined")
			str=_str;
		startfrom=nm;
		ftxt=replaceSymb(str);
		showstr=_showstr;
		ftxt=ftxt.replace(/\[\/bracket\]/g,"");
		ftxt=ftxt.replace(/\[bracket\]/g,"");
		ftxt=ftxt.replace(/^FR /,'');
		ftxt=ftxt.replace(/^KS /,'');
	}
	else
	{
		val=val.Trim();
		showstr=str=ftxt=val;
		str="[bracket]"+lab+" "+replaceSymb(str)+"[/bracket]";
		showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(showstr);
	}
	str=prepareStr(str);
	showstr=prepareStr(showstr);
	ftxt=prepareStr(ftxt);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var ftarr=[];
	var bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ft:text-contains($rec/TEXT, "%search%") order by $rec/ID return $rec/ID';
	if(lab=='KS')
	{
		if(ftxt.indexOf(' ')!=-1)
			ftarr=ftxt.split(' ');
		bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ';
		if(ftarr.length==0)
			bd+='ft:text-contains($rec/TEXT, "'+ftxt+'")';
		else
		{
			for(var i=0; i<ftarr.length; i++)
			{
				bd+='ft:text-contains($rec/TEXT, "'+ftarr[i]+'")';
				if(i<ftarr.length-1)
					bd+=' and ';
			}
		}
		ftxt='1';
		bd+=' order by $rec/ID return $rec/ID';
	}
	var unesc=encodeVal(bd);
	var handler=modules["fulltext"].directory+'/fulltext.php';
	var outfrm=outform;
	if(typeof dbs[fulltextbase].outform!="undefined")
		outfrm=dbs[fulltextbase].outform;
	var fArr=new Array();
	fArr.push(["_action","fulltext"]);
	fArr.push(["_errorhtml","error1"]);
	fArr.push(["_handler",handler]);
	fArr.push(["_body",unesc]);
	fArr.push(["_start",startfrom]);
	fArr.push(["_session",numsean]);
	fArr.push(["_userId",identif]);
	fArr.push(["_outform",outfrm]);
	fArr.push(["_length",howmuch]);
	fArr.push(["_showstr",showstr]);
	fArr.push(["_str",str]);
	fArr.push(["_typesearch","fulltext"]);	
	fArr.push(["_label",lab]);
	fArr.push(["_iddb",fulltextbase]);
	fArr.push(["_service","STORAGE:opacfindd:FindView"]);
	fArr.push(["_version","2.0.0"]);
	fArr.push(["_history","yes"]);
	fArr.push(["db","fulltext"]);
	fArr.push(["title","Полнотекстовый поиск"]);
	fArr.push(["args[0]/name","search"]);
	fArr.push(["args[0]/value",ftxt]);
	fArr.push(["vars[0]/description","Поисковый термин"]);
	fArr.push(["vars[0]/name","search"]);
	fArr.push(["vars[0]/type","var"]);
	fArr.push(["length",howmuch]);
	fArr.push(["start",startfrom]);
	fArr.push(["portion[0]",portion]);
	callToRCP(fArr);
}


function See8(ind,rdb)/*unused*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["search"].directory+'/search.php';
	var indx=replaceSymb(ind);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error3"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	var db=numDB;
	if((typeof rdb!="undefined")&&(rdb!=""))
	{
		db=rdb;
	}
	querylist.push(["iddbIds[0]/iddb",db]);
	querylist.push(["iddbIds[0]/id",indx]);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
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
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$see","SEE8"]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
	var trg=self;
	if(parent.take('recordswin'+''+(parent.countwin-1)).n == null)
	{
		var arg={'cls':'dialog2','target': self, 'message':'ПРОСМОТР ЗАПИСЕЙ','divframe':'1','forlinks':'1'};
		showLayerWin('recordswin',arg);
		self.frames[0].document.open();
		self.frames[0].document.close();
		trg=self.frames[0];
	}
	callToRCP(gArr,trg);
}

function callNewBooks(ndb)/*запрос на вывод новых поступлений при загрузке страницы - unused*/
{
	if(typeof ndb == "undefined")
		ndb=numDB;
	typework="";
	var y=Year-1;
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
	var outfrm=outform;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	//querylist.push(["outformList[1]/outform","LINEORD"]);
	querylist.push(["iddb",ndb]);
	/*querylist.push(["query/body","(PY BETWEEN '"+y+""+mm+""+dd+"','"+Year+""+mm+""+dd+"')"]);
	querylist.push(["query/label","PY"]);*/
	querylist.push(["query/body","(DT LE '"+Year+""+mm+""+dd+"')"]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callBackNewBooks);
}


function callBackNewBooks(x)/*вывод новых поступлений при загрузке страницы - unused*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
		WriteError(error);
	else
	{
		var par=take('newscontainer');
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('result_')!=-1)
			{
				var arr=value._ORDERFORM_0;
				var div=par.create('div',{className:'newrecs'});
				var ns=null;
				for(var i=0; i<arr.length-1; i++)
				{
					ns=div.create('div',{textNode:arr[i],className:'newssign'});
				}
				str+='</div>';
			}
		}
		par.create('div',{title:'еще',textNode:'еще',className:'newselse',onmousedown:'function(){searchNews()}'});
	}
}
