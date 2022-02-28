/*---------------------------------- дополнительный новостной модуль ----------------------------*/

function switchSubSections(o,ndb,l)
{
	if(typeof _sign!="undefined")
		_sign=null;
	switch(o)
	{
		case "partnews": searchNewsSite(ndb,l,'all');
		break;
		case "partpub": searchPubThemeList(ndb,l);
		break;
		case "partphoto": searchPhotoThemeList(ndb,l);
		break;
		case "partnewrecs": searchNewRecs(ndb,'all');
		break;
		default:break;
	}
}

/*новости сайта*/

function searchNewsSite(ndb,l,sign,c)/*вывод новостей сайта*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	if((typeof l == "undefined")||(l == null))
		l=_label;
	if((typeof sign == "undefined")||(sign == null))
		sign=_sign;
	var howmuch="";
	var startfrom="";
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
	var handler=modules["search"].directory+'/_additional/newssite.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]"+l+" BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		showstr="<i>за </i>"+Year+" год";
	}
	else
	{
		str=prepareStr("[bracket]"+l+" LE [apos]"+y+""+mm+""+dd+"[apos][/bracket]");
		showstr="<i>Архив новостей </i>";
	}
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
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
	querylist.push(["$outform","SHORTNEWS"]);
	querylist.push(["outformList[0]/outform","SHORTNEWS"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$l",l]);
	querylist.push(["$sign",sign]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["query/label",l]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function addSeeNewsSite(ind,ndb)/*подробный вывод новости*/
{
	typework="search";
	var sign="all";
	if((typeof _sign!="undefined")&& (_sign != null))
		sign=_sign;
	var handler=modules["search"].directory+'/_additional/newssiteadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",ndb]);
	querylist.push(["outform","FULLNEWS"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

/*конец новости сайта*/

/*публикации*/

function searchPubThemeList(ndb,lab)/*список тем*/
{
	if(lab == 'PY')
	{
		searchPubTheme(null,ndb);
	}
	else
	{
		typework="search";
		var handler=modules["search"].directory+'/_additional/publicationslist.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
		querylist.push(["_version","1.2.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["$label",lab]);
		querylist.push(["label",lab]);
		querylist.push(["query",""]);
		querylist.push(["$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["iddb",ndb]);
		gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
		callToRCP(gArr);
	}
}

function searchPubTheme(obj,ndb,c)/*список публикаций по теме*/
{
	var o=null;
	var iddb="";
	if(ndb != null)
		iddb=ndb;
	else
		iddb=_iddb;
	var lab='TM';
	if(typeof _label != "undefined")
		lab=_label;
	var ttitle="";
	if(obj != null)
	{
		o=take(obj).n;
		ttitle=o.innerHTML;
	}
	else
	{
		if(typeof _sign != "undefined")
			ttitle=_sign;
	}
	var str=prepareStr("[bracket]"+lab+" "+ttitle+"[/bracket]");
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		if((typeof _sign != "undefined")&&(_sign != null))
			_sign=null;
		if(obj == null)
		{
			lab='PY';
			str=prepareStr("[bracket]PY LE [apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		}
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		str=_str;
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/publications.php';
	var showstr="<i>Тема</i> "+ttitle;
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPUB"]);
	querylist.push(["outformList[0]/outform","SHORTPUB"]);
	querylist.push(["iddb",iddb]);
	querylist.push(["$iddb",iddb]);
	querylist.push(["$label",lab]);
	querylist.push(["$sign",ttitle]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist,iddb)]);
	callToRCP(gArr);
}

function searchPublications(ndb,sign,c)/*архив публикаций*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	if((typeof sign == "undefined")||(sign == null))
		sign=_sign;
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		if(typeof _start!="undefined")
			startfrom=_start;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/publications.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]DT BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		showstr=prepareStr("<i>Дата </i> с "+dd+"."+mm+"."+y+" по "+dd+"."+mm+"."+Year);
	}
	else
	{
		str=prepareStr("[bracket]DT LE [apos]"+y+""+mm+""+dd+"[apos][/bracket]");
		showstr=prepareStr("<i>Дата </i> по "+dd+"."+mm+"."+y);
	}
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPUB"]);
	querylist.push(["outformList[0]/outform","SHORTPUB"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	if(sign=="all")
	{
		querylist.push(["$renew","yes"]);
	}
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function addPublications(ind,ndb)/*подробный вывод публикаций*/
{
	typework="search";
	var sign="all";
	if((typeof _sign!="undefined")&& (_sign != null))
		sign=_sign;
	var handler=modules["search"].directory+'/_additional/publicationsadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",ndb]);
	querylist.push(["outform","FULLPUB"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

/*конец публикации*/

/*фотогалерея*/

function searchPhotoThemeList(ndb,lab,c)/*разделы фотогалереи*/
{
	var howmuch="";
	var startfrom="";
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
	var handler=modules["search"].directory+'/_additional/photos.php';
	//var str=prepareStr("[bracket]"+lab+" ФОТОГАЛЕРЕЯ[/bracket]");
	var str=prepareStr("[bracket]"+lab+" LE [apos]"+Year+""+mm+""+dd+"[apos][/bracket] AND [bracket]IL 0[/bracket]");
	var showstr="<i>Тема</i> ФОТОГАЛЕРЕЯ";
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPHOTO"]);
	querylist.push(["outformList[0]/outform","SHORTPHOTO"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	/*querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);*/
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function searchPhoto(act,outf,ndb,sign,c)/*фотогалерея*/
{
	var handler=modules["search"].directory+'/_additional/photos.php';
	var howmuch="";
	var startfrom="";
	var actstr="";
	var actterm="";
	var outfrm="";
	var db="";
	var ssign="";
	if(sign!=null)
	{
		ssign=sign;
	}
	else
	{
		if((typeof _sign!="undefined")&& (_sign != null))
			ssign=_sign;		
	}
	if(c==null)
	{
		howmuch=portion;
		startfrom=0;
		actstr=act;
		actterm=act;
		db=ndb;
		outfrm=outf;
	}
	else
	{
		actstr=_actstr;
		actterm=actstr;
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		db=_iddb;
		outfrm=_outform;
	}
	actterm=actterm.replace(/\[quot\]/gi,'"');
	actterm=actterm.replace(/\[apos\]/gi,"'");
	actterm=actterm.replace(/\[backslash\]/gi,"\\");/*зависит от выходной формы*/
	//actterm=actterm.replace(/\[backslash\]/gi,"\\\\");
	typework="unknown";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_history","yes"]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["iddb",db]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",actterm]);
	querylist.push(["$actstr",actstr]);
	querylist.push(["$outform",outfrm]);
	if(ssign!="")
		querylist.push(["$sign",ssign]);
	querylist.push(["outformList[0]/outform",outfrm]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

function zoomImg(o)/*увеличение картинки в фотогалерее*/
{
	var src="";
	var title="";
	var fig=take(o).tags('input')[0];
	if(fig!=null)
		src=fig.value;
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

/*конец фотогалерея*/

/*------------------------------- конец дополнительный новостной модуль ----------------------------*/