/*для поиска типа combined выпадающий список из справочного файла для проекта Нематериальное наследие*/

function showHBRegions()
{
	typework="";
	if(take('handbook_container').n!=null)
	{
		if(take('handbook_container').n.childNodes.length==1)
		{
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_ctype","text/xml; charset=utf-8"]);
			querylist.push(["_service","STORAGE:opacsettingd:HandbookView"]);
			querylist.push(["_version","1.0.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["format","RUSMARC"]);
			querylist.push(["type","BIBL"]);
			querylist.push(["name[0]",handbookname]);
			querylist.push(["_xmlstring","handbook"]);
			gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,callBackShowHBRegions);
		}
	}
}

function callBackShowHBRegions(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	if(x.responseXML == null)
	{
		eval(x.responseText);
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var xml = x.responseXML;
		var xmlDoc=xml.documentElement;
		if(xmlDoc==null)
		{
			eval(x.responseText);
			if(typeof error!="undefined")
				WriteError(error);
		}
		else
		{
			var root=getcNode(xmlDoc);
			var doc=take('handbook_container');
			doc.n.innerHTML="";
			if(root.hasChildNodes())
			{
				var kids=root.childNodes;
				for(var i=0; i<kids.length; i++)
				{
					if(kids[i].nodeType==1)
					{
						doc.create('div',{className:kids[i].getAttribute('value'),textNode:kids[i].getAttribute('title'),onmousedown:'function(){searchHBRegions(this)}'});
					}
				}
			}
		}
	}
}

function searchHBRegions(o)
{
	showrubterm=o.className;
	showtext=o.innerHTML;
	simpleSearch(handbooklabel);
}

/*конец для поиска типа combined выпадающий список из справочного файла для проекта Нематериальное наследие*/

function searchWithFacet(o)/*имитация фасетов без solr или bibliosearch средствами ADABAS*/
{
	typework="search";
	typesearch="combined";
	var handler=modules["search"].directory+'/search.php';
	livsrc=null;
	livlabel="";
	var term=o.innerHTML;
	var lab=o.className;
	var slab=take(o.parentNode.parentNode.parentNode).getsign('input',{className:'label'})[0].value;
	var sterm=take(o.parentNode.parentNode.parentNode).getsign('input',{className:'termin'})[0].value;
	var str='[bracket]'+slab+' '+sterm+'*[/bracket]'+' AND [bracket]'+lab+' '+term+'*[/bracket]';
	var showstr=_showstr+' и <i>'+dbs[numDB]["labels"][lab][0]+'</i> '+term;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
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
	//querylist.push(["_history","yes"]);	
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
		outfrm=dbs[numDB].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	str=brackets(str);
	querylist.push(["query/body",prepareTerm(str)]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function seeAddNN(ind)/*запрос на подробный вывод для проекта Нематериальное наследие*/
{
	typework="";
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
	if(typeof _str=="undefined")
		db=numdbBIBL;
	querylist.push(["iddbIds[0]/iddb",db]);
	var dboutff=outformfull;
	if((typeof dbs[db] !="undefined")&&(typeof dbs[db].outformfull !="undefined"))
		dboutff=dbs[db].outformfull;
	//querylist.push(["outform",dboutff]);
	querylist.push(["outform","FULLTEST"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",db]);
	scrollobj=take(replaceSlash(ind)).n;
	var arg={};
	arg.cls='dialog2';
	arg.message=" ";
	showLayerWin('addnnwin',arg);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackseeAddNN);
}

function callbackseeAddNN(x)/*подробный вывод для проекта Нематериальное наследие*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		var lastscrollobj=scrollobj;
		scrollobj=null;
		delLayerWin();
		scrollobj=lastscrollobj;
		WriteError(error);
	}
	else
	{
		var doc=take('addnnwinform');
		doc.n.innerHTML="";
		if(parseInt(response[0]._size,10)>0)
		{
			var img=pathimg+'/nofoto2.gif';
			var bibcard='';
			var bibres='';
			var addres='';
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var arr=value._FULLTEST_0[0].split('[END]');
					bibres+='<div class="bibres">';
					if(arr[0]!='')
					{
						img=arr[0].substring(arr[0].indexOf('[show]')+6,arr[0].indexOf('[/show]'));
/*только для проекта rusfolknasledie
						if(img.indexOf('http:')==-1)
								img='http://ih-clone.rucml.ru'+img;
конец только для проекта rusfolknasledie*/
							}
					if(arr[1]!='')
					{
						var annot='';
						var pref='';
						var postf='';
						var title='';
						if(arr[1].indexOf('[ANNOT]')!=-1)
						{
							annot=arr[1].substring(arr[1].indexOf('[ANNOT]')+7,arr[1].indexOf('[/ANNOT]'));
							pref=arr[1].substring(0,arr[1].indexOf('[ANNOT]'));
							postf=arr[1].substring(arr[1].indexOf('[/ANNOT]')+8);
							if(pref.indexOf('[TITLE]')!=-1)
								title='<div class="TITLE">'+pref.substring(pref.indexOf('[TITLE]')+7,pref.indexOf('[/TITLE]'))+'</div>';
						}
						else
						{
							pref=arr[1].substring(0,arr[1].indexOf('[TITLE]'));
							postf=arr[1].substring(arr[1].indexOf('[/TITLE]')+8);
							title='<div class="TITLE">'+arr[1].substring(arr[1].indexOf('[TITLE]')+7,arr[1].indexOf('[/TITLE]'))+'</div>';
						}
						var titlelogo='';
						if(pref.indexOf('[titleLogo]')!=-1)
							titlelogo='<div class="titlelogo">'+pref.substring(pref.indexOf('[titleLogo]')+11,pref.indexOf('[/titleLogo]'))+'</div>';
						var passport='';
						if(pref.indexOf('[passport]')!=-1)
							passport='<div class="passport">'+pref.substring(pref.indexOf('[passport]')+10,pref.indexOf('[/passport]'))+'</div>';
						var rubric='';
						if(pref.indexOf('[RUBRIC]')!=-1)
							rubric='<div class="rubric">'+pref.substring(pref.indexOf('[RUBRIC]')+8,pref.indexOf('[/RUBRIC]'))+'</div>';
						var tmp1=/\[RUB\]/gi;
						var tmp2=/\[\/RUB\]\<p\>/gi;
						if(tmp1.test(arr[1]))
						{
							rubric=rubric.replace(tmp1,'<p class="rubricator"  onmousedown="searchCLR2(this)" id="');
							rubric=rubric.replace(tmp2,'">');
						}
						var tclass="";
						if(titlelogo!="")
							tclass=' tooltip';
						annot='<div class="shotform'+tclass+'"><img src="'+img+'"/>'+passport+'</div>'+titlelogo+''+title+''+rubric+'<p class="annot">'+annot;
						bibres+=parseBB(annot)+'</p>';
						bibres+=parseBB(postf);
					}
					bibres+='</div>';
/*только для проекта rusfolknasledie
					var tmp=/ src="\//g;
					var tmp1=/ href="\//g;
					var tmp2=/file=\//g;
					if(tmp.test(bibres))
					{
						bibres=bibres.replace(tmp,' src="http://ih-clone.rucml.ru/');
					}
					if(tmp1.test(bibres))
					{
						bibres=bibres.replace(tmp1,' href="http://ih-clone.rucml.ru/');
					}
					if(tmp2.test(bibres))
					{
						bibres=bibres.replace(tmp2,'file=http://ih-clone.rucml.ru/');
					}
конец только для проекта rusfolknasledie*/
					for(i=2; i<arr.length-1; i++)
					{
						if(arr[i]!='')
						{
							addres+='<div class="addres">';
							var addarr=arr[i].split('</p>');
							for(j=0; j<addarr.length; j++)
							{
								if(addarr[j].indexOf('[big]')!=-1)
								{
									addres+='<div title="Развернуть" onclick="showHide1(this);" class="wrapped">'+addarr[j].substring(addarr[j].indexOf('[big]')+5,addarr[j].indexOf('[/big]'))+'</p></div><div class="expl" style="display:none">';
								}
								else
								{
									if(addarr[j]!='')
									{
										if(addarr[j].indexOf('[AF]')!=-1)
										{
											var from=addarr[j].substring(addarr[j].indexOf('[AF]'),addarr[j].indexOf('[/AF]')+5);
											var ind=addarr[j].substring(addarr[j].indexOf('[AF]')+4,addarr[j].indexOf('[/AF]'));
											var to='<span class="a"  onmousedown="vocsearchInAF(\'ID\',\''+replaceSymb(ind)+'\')">См. в авторитетном файле</span>'
											addarr[j]=addarr[j].replace(from,to);
										}
										addres+=''+addarr[j]+'</p>';
									}
								}
							}
							addres+='</div></div>';
						}
					}
				}
			}
			doc.n.innerHTML='<div class="addnndiv table"><div class="row"><div class="td">'+bibres+'<div class="spacer"></div><hr/></div></div><div class="row"><div class="td">'+parseBB(addres)+'</div></div></div>';
		}
		else
		{
			doc.create('p',{textNode:'Запись с данным идентификатором не найдена.', style:{textAlign:'center',margin:'50px 0 0 0'}});
		}
	}
}
