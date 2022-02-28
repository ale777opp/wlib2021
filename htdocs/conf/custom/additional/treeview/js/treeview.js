/*вывод дерева MeSH*/

function seeTreeView(o)/*вывод окна выбора языков дерева MeSH*/
{
	var par=o.parentNode;
	var elem=take('tree_lang_choice');
	if(elem.n != null)
	{
		par.removeChild(elem.n);
		take(par).switchclass('angle_','angle');
	}
	else
	{
		var x=take(o).getx();
		var y=take(o).gety();
		var h=take(o).geth();
		var w=take(o).getw();
		elem=take(par).create('div',{id:'tree_lang_choice'});
		elem.create('span',{className:'rus',textNode:'рус.',onmousedown:'function(){seeTreeViewList(this)}'});
		elem.create('span',{className:'eng',textNode:'eng.',onmousedown:'function(){seeTreeViewList(this)}'});
		elem.setw(w);
		elem.setx(x);
		elem.sety(y+h-1);
		take(par).switchclass('angle','angle_');
	}
}

function seeTreeViewList(o)/*запрос на вывод дерева MeSH*/
{
	typework="search";
	showstr="<span><i>Классы</i> MeSH</span>";
	var lab='CMS';
	if(o.className=='eng')
		lab='CMSEN';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
	querylist.push(["_service","STORAGE:opacafd:List"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["mode","alpha"]);
	querylist.push(["label",lab]);
	querylist.push(["query",""]);
	querylist.push(["session",numsean]);
	querylist.push(["length",50]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$label","CMS"]);
	querylist.push(["$fromaftobibl","COD"]);
	querylist.push(["$query",""]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["$treeview","yes"]);
	querylist.push(["$listtype","treeview"]);
	querylist.push(["$iddbtitle",dbs[numDB].alias]);
	querylist.push(["$length",50]);
	querylist.push(["$typesearch","authority"]);
	querylist.push(["$showstr",showstr]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	var obj={};
	obj.title='Список классов MeSH';
	obj.type='Tree';
	obj.iddb=numDB;
	obj.label=lab;
	obj.query='';
	obj.queryname='Список классов MeSH';
	putDataToStorage(numDB,obj);
	callToRCP(gArr);
}

function openTreeView(x,b)/*отображение дерева MeSH*/
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
			var arr=_linkstring.split('[END]');
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i]!="")
				{
					var tmparr=arr[i].split('[ID]');
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
						arr.push([v._label,v._query,v._title,hasNextLevel,vquery,count,exact,down]);
						start=v._query;
						if(typeof v._lang != "undefined")
							lang=v._lang;
						count++;
					}
				}
				if(count>0)
				{
					var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});
					var p=div.create('p',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});
					var spancont=null;
					var addterm='';
					if(typeof _treeview != "undefined")
						addterm='['+arr[0][1]+']';
					var inp=null;
					inp=p.create('input',{id:arr[0][1],type:'checkbox',className:arr[0][2],name:_fromaftobibl,value:arr[0][4],onclick:'function(){putAfTerms(this);}','data-down':arr[0][0]+' '+arr[0][1]+'*','data-exact':arr[0][0]+' '+arr[0][1]});
					if(arr[0][3]=="1")
					{
						var k="";
						var a="";
						if(b!=0)
						{
							k="100";
							a=",";
						}
						spancont=p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+''+k+'","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+'","'+nlevel+'"'+a+''+k+');}'});
						if(lang!="")
						{
							spancont.create('input',{type:'hidden','name':'lang',value:lang});
						}
						spancont.text(title);
						if(addterm!="")
							spancont.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
					}
					else
					{
						spancont=p.create('span',{className:'afbulletimg',textNode:title});
						if(addterm!="")
							spancont.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
					}
					p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){getAnnotation(this.parentNode);}'});
					p.create('input',{type:'checkbox',name:'ch',id:'ch'+arr[0][1]+''+num1+''+count,className:'afsearchimg',style:{position:'absolute',marginLeft:'-3000px',visibility:'hidden'}});
					p.create('label',{tabIndex:'0',title:'Искать в ...',className:'afsearchimg','for':'ch'+arr[0][1]+''+num1+''+count});
					var scont=p.create('span',{className:'tooltip'});
					scont.create('label',{className:'del','for':'ch'+arr[0][1]+''+num1+''+count});
					scont.create('span',{textNode:'Искать в: ',className:'titl mb5x'});
					scont.create('span',{textNode:'Локальные ресурсы',className:'u a curs ml20x p5x',onmousedown:'function(){searchTerm(this.parentNode.parentNode)}'});
					if(pubmed!="")
						scont.create('span',{onmousedown:'function(){window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed)+'\')}',textNode:'PubMed', className:'u a curs ml20x p5x'});
					if(ebsco!="")
						scont.create('span',{onmousedown:'function(){window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco)+'\')}',textNode:'EBSCO', className:'u a curs ml20x p5x'});
					div.create('div',{id:'add'+arr[0][1]+'_'+count+''+k,style:{display:'none'}});
				}
			}
			num1++;
		}
		if(!endvoc)
		{
			var s=cont.create('span',{title:'Далее',className:'nexttr',onmousedown:'function(){nextSeeTreeM(this,"'+treeobj+'","'+label+'","'+start+'","'+query+'","'+llevel+'");}'});
			s.create('span',{textNode:'Далее'});
		}
	}
}

function showAnnotationTree(o)/*запрос на просмотр аннотации из дерева MeSH*/
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
	querylist.push(["iddb",numDB]);
	querylist.push(["id",o]);
	querylist.push(["mode","annotation"]);
	querylist.push(["viewOptions[0]","meshNewTree"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openAnnotTreeWin);
}

function openAnnotTreeWin(x)/*отображение аннотации из дерева MeSH*/
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
		if(take('infowinform').n==null)
		{
			var arg={'cls':'dialog2','message': 'Информация','width':'95%','height':'95%'};
			showLayerWin('infowin',arg);
		}
		var doc=take('infowinform');
		doc.n.innerHTML="";
		var div=doc.create('div',{id:'srezults1',style:{margin:'0 0 0 40px'}});
		var div0=div.create('div',{className:'searchhead'});
		div0.create('input',{id:'meshannotbutton',type:'button',className:'button2',value:'Искать в каталоге',onmousedown:'searchFromAfToBibl',style:{visibility:'hidden',margin:'0 10px'}});
		//var m1=div0.create('div',{className:'menu1',style:{display:'none'}});
		//var a1=m1.create('div',{className:'andor'});
		var s1=div0.create('select',{id:'andor1',style:{visibility:'hidden',textAlign:'center'}});
		s1.create('option',{value:'OR',textNode:'ИЛИ'});
		s1.create('option',{value:'AND',textNode:'И'});
		var div1=div.create('div');
		var div2=div.create('div',{style:{padding:'20px'}});
		var arr=[];
		var count=0;
		var num=0;
		var num1=0;
		var meshid='';
		var pubmedorigin="";
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
		for(var arg in response[0])
		{
			if(arg.indexOf('_result_')!=-1)
			{
				num++;
				var value=response[0][arg];
				var pubmed="";
				var ebsco="";
				var searchbox=null;
				if(typeof value._AFHEADFORM_0!="undefined")
				{
					if(typeof value._AFHEADFORM_0._originalTermin!="undefined")
					{
						pubmedorigin=value._AFHEADFORM_0._originalTermin;
						pubmed=value._AFHEADFORM_0._originalTermin+"[MeSH Terms]";
						if((typeof _auth!="undefined")&&(typeof harr["068"] != "undefined"))
						{
							ebsco="(MH "+value._AFHEADFORM_0._originalTermin+")";
						}
						var p=div1.create('p',{className:'aftitle',id:value._AFHEADFORM_0._id,style:{margin:'0px',padding:'0px'}});
						p.create('input',{id:value._AFHEADFORM_0._id,type:'checkbox',className:value._AFHEADFORM_0._title,name:'AUIDS',value:value._AFHEADFORM_0._id,style:{margin:'0 5px 0 10px'},onclick:'function(){putAfTerms(this);}'});
						p.create('span',{textNode:value._AFHEADFORM_0._title,style:{fontWeight:'bold',textNransform:'uppercase',marginRight:'10px'}});
						p.create('input',{type:'checkbox',name:'ch',id:'ch'+num1,className:'afsearchimg',style:{position:'absolute',marginLeft:'-3000px',visibility:'hidden'}});
						p.create('label',{tabIndex:'0',title:'Искать в ...',className:'afsearchimg','for':'ch'+num1});
						var scont=p.create('span',{className:'tooltip'});
						scont.create('label',{className:'del','for':'ch'+num1});
						scont.create('span',{textNode:'Искать в: ',className:'titl mb5x'});
						scont.create('span',{textNode:'Локальные ресурсы',className:'u a curs ml20x p5x',onmousedown:'function(){searchTerm(this.parentNode.parentNode.id,this.parentNode.parentNode.childNodes[1].innerHTML,\'AUIDS\')}'});
						if(pubmed!="")
							scont.create('span',{onmousedown:'function(){window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed)+'\')}',textNode:'PubMed', className:'u a curs ml20x p5x'});
						if(ebsco!="")
							scont.create('span',{onmousedown:'function(){window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco)+'\')}',textNode:'EBSCO', className:'u a curs ml20x p5x'});
					}
					pubmed="";
					ebsco="";
				}
				for (var prop in value)
				{
					if(prop.indexOf('AFANNOT')!=-1)
					{
						var val=value[prop];
						var use="";
						var mode="";
						var action="";
						for (var k in val)
						{
							var v=val[k];
							var p1=null;
							var spancont=null;
							if(k=="_use")
								use=v;
							if(k=="_mode")
								mode=v;
							if(k=="_action")
								action=v;
							if(k=="_title")
							{
								var dnum=div2.create('div');
								var inum=dnum.create('input',{className:'wr',type:'checkbox',name:'wi'+num,id:'wi'+num});
								dnum.create('label',{className:'wrapped','for':'wi'+num,textNode:v});
								dnum.create('div',{className:'expl1',id:'expl'+num});
							}
							if(k.indexOf('_entries_')!=-1)
							{
								num1++;
								p1=take('expl'+num).create('p',{className:'afsmall'});
								if((use=='search')||(use=='insert'))
								{
									if(typeof v._id != "undefined")
									{
										p1.create('input',{id:v._id,type:'checkbox',className:v._text,name:'AUIDS',value:v._id,style:{margin:'0 5px 0 0'},onclick:'function(){putAfTerms(this);}'});
									}
									else
									{
										p1.create('span',{textNode:'- '});
									}
								}
								else
								{
									p1.create('span',{textNode:'- '});
								}
								p1.create('span',{textNode:v._text});
							}
							if(k.indexOf('_references_')!=-1)
							{
								num1++;
								p1=take('expl'+num).create('p',{className:'afsmall'});
								if((use=='search')||(use=='insert'))
								{
									if(typeof v._id != "undefined")
									{
										p1.create('input',{id:v._id,type:'checkbox',className:v._text,name:'AUIDS',value:v._id,style:{margin:'0 5px 0 0'},onclick:'function(){putAfTerms(this);}'});
									}
									else
									{
										p1.create('span',{textNode:'- '});
									}
								}
								else
								{
									if(action != 'mesh3')
										p1.create('span',{textNode:'- '});
								}
								if(typeof v._blocked != "undefined")
								{
									p1.create('span',{textNode:v._title});
								}
								else if((typeof v._id != "undefined")&&(mode=='direct'))
								{
									spancont=p1.create('span',{id:v._id,className:'afbig'});
									spancont.create('input',{id:v._id,type:'checkbox',className:v._title,name:'AUIDS',value:v._id,style:{margin:'0 5px 0 0'},onclick:'function(){putAfTerms(this);}'});
									spancont.create('span',{style:{marginRight:'10px'},textNode:v._title,title:'Аннотация',onmousedown:'function(){showAnnotationTree(this.parentNode.id);}'});
								}
								else if((typeof v._query != "undefined")&&(mode=='indirect')&&(action=='mesh3'))
								{
									if(count == 0)
									{
										meshid='expl'+num;
									}
									arr.push([v._label,v._query,v._lang]);
									count++;
								}
								else
								{
									spancont=p1.create('span',{textNode:v._title});
								}
								if((typeof v._originalTermin != "undefined")&&(action!='mesh3'))
								{
									pubmed=v._originalTermin+"[MeSH Terms]";
									if(action=='annotation')
									{
										if(pubmedorigin!="")
											pubmed=pubmedorigin+'[MeSH Terms] AND '+v._originalTermin+'[MeSH Subheading]';
									}
									if((typeof _auth!="undefined")&&(typeof harr["068"] != "undefined"))
									{
										ebsco='(MH '+v._originalTermin+')';
										if(action=='annotation')
										{
											if(pubmedorigin!="")
												ebsco='(MH '+pubmedorigin+') AND (MW '+v._originalTermin+')';
										}
									}
									spancont.create('input',{type:'checkbox',name:'ch',id:'ch'+num1,className:'afsearchimg',style:{position:'absolute',marginLeft:'-3000px',visibility:'hidden'}});
									spancont.create('label',{tabIndex:'0',title:'Искать в ...',className:'afsearchimg','for':'ch'+num1});
									var scont=spancont.create('span',{className:'tooltip'});
									scont.create('label',{className:'del','for':'ch'+num1});
									scont.create('span',{textNode:'Искать в: ',className:'titl mb5x'});
									if(typeof v._id !="undefined")
										scont.create('span',{textNode:'Локальные ресурсы',className:'u a curs ml20x p5x',onmousedown:'function(){searchTerm(this.parentNode.parentNode.id,this.parentNode.parentNode.childNodes[1].innerHTML,\'AUIDS\')}'});
									if(pubmed!="")
										scont.create('span',{onmousedown:'function(){window.open(\'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed)+'\')}',textNode:'PubMed', className:'u a curs ml20x p5x'});
									if(ebsco!="")
										scont.create('span',{onmousedown:'function(){window.open(\'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco)+'\')}',textNode:'EBSCO', className:'u a curs ml20x p5x'});
								}
							}
						}
						if(action != 'mesh3')
							take('wi'+num).n.checked=true;
					}
				}
			}
		}
		if(count > 0)
		{
			seeTreeMM(meshid,arr);
		}
	}
}

function seeTreeMM(c,a)
{
	numDB=_iddb;
	typework="";
	treeobj=c;
	take(treeobj).n.innerHTML='<div class="progress small"><div></div></div>';
	var length=1000;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	for(var i=0; i<a.length; i++)
	{
		var arr1=a[i][1].split('.');
		querylist.push(["_service","STORAGE:opacafd:View"]);
		querylist.push(["_version","1.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["label",a[i][0]]);
		querylist.push(["length",length]);
		querylist.push(["iddb",numDB]);
		querylist.push(["mode","meshtree"]);
		querylist.push(["query",a[i][1]]);
		querylist.push(["lang",a[i][2]]);
		querylist.push(["$lastquery"+[i],a[i][1]]);
		querylist.push(["$level"+[i],arr1.length]);
		querylist.push(["$fromaftobibl","COD"]);
		querylist.push(["viewOptions[0]","meshNewTree"]);
		querylist.push(["viewOptions[1]","childrenStop"]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		querylist.length=0;
	}
	//ajaxToRCP(gArr,openTreeViewM,pathactrcp,null,openTreeViewM,100);
	ajaxToRCP(gArr,openTreeViewM);
}

function openTreeViewM(x)/*отображение дерева MeSH*/
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
		var cont1=take(treeobj);
		cont1.n.innerHTML='';
		var num1=0;
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
		for(var j=0; j<response.length; j++)
		{
			var cont=cont1.create('div',{className:'annotmeshtree'});
			var lang="";
			var endvoc=false;
			if(typeof response[j]._end!="undefined")
				endvoc=true;
			var mainobj=null;
			for(arg in response[j])
			{
				var mquery=eval('_lastquery'+j);
				if(mquery.indexOf('.')!=-1)
					mquery=mquery.substring(0,mquery.indexOf('.'));
				if(arg.indexOf('result_')!=-1)
				{
					var value=response[j][arg];
					var ind=value._id;
					var vquery=ind;
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
						num1++;
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
							if(v._query.indexOf(mquery)!=-1)
							{
								if(typeof v._main=="undefined")
								{
									arr.push([v._label,v._query,v._title,hasNextLevel,vquery,v._level,null,exact,down]);
									count++;
								}
								else
								{
									mainobj='mainobj'+v._query;
									arr.push([v._label,v._query,v._title,hasNextLevel,vquery,v._level,1,exact,down]);
									count++;
								}
								if(typeof v._lang != "undefined")
									lang=v._lang;
							}
						}
					}
					if(count>0)
					{
						var div=cont.create('div',{className:'par',style:{margin:'0px 0px 0px '+(arr[0][5]*45)+'px'}});
							var p=div.create('p',{className:'aftitle',id:ind});
							var addterm='['+arr[0][1]+']';
							var inp=p.create('input',{id:arr[0][1],type:'checkbox',className:arr[0][2],name:_fromaftobibl,value:arr[0][4],onclick:'function(){putAfTerms(this);}','data-down':arr[0][0]+' '+arr[0][1]+'*','data-exact':arr[0][0]+' '+arr[0][1]});
							if((arr[0][6] == null)||(typeof arr[0][6] == "undefined"))
								inp.conceal();
							if(arr[0][3]=="1")
							{
								var span=p.create('span',{'data-level':arr[0][5],className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+'100","'+arr[0][0]+'","'+arr[0][1]+'","'+arr[0][1]+'",'+arr[0][5]+',100);}'});
								if(lang!="")
								{
									span.create('input',{type:'hidden','name':'lang',value:lang});
								}
								span.text(title);
								if(addterm!="")
									span.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
								if((typeof arr[0][6] != "undefined")&&(arr[0][6] != null))
								{
									span.n.style.fontSize="140%";
									span.n.className='afminusimg';
									span.n.onmousedown=function(){return false;};
									span.n.id='mainobj'+arr[0][1];
								}
							}
							else
							{
								var span=p.create('span',{'data-level':arr[0][5],className:'afbulletimg',textNode:title});
								if(addterm!="")
									span.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
								if((typeof arr[0][6] != "undefined")&&(arr[0][6] != null))
								{
									span.n.style.fontSize="140%";
									span.n.id='mainobj'+addterm.substring(1,addterm.length-1);
								}
							}
							p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){getAnnotation(this.parentNode);}'});
							p.create('input',{type:'checkbox',name:'ch',id:'ch'+num1+''+arr[0][1],className:'afsearchimg',style:{position:'absolute',marginLeft:'-3000px',visibility:'hidden'}});
							p.create('label',{tabIndex:'0',title:'Искать в ...',className:'afsearchimg','for':'ch'+num1+''+arr[0][1]});
							var scont=p.create('span',{className:'tooltip'});
							scont.create('label',{className:'del','for':'ch'+num1+''+arr[0][1]});
							scont.create('span',{textNode:'Искать в: ',className:'titl mb5x'});
							scont.create('span',{textNode:'Локальные ресурсы',className:'u a curs ml20x p5x',onmousedown:'function(){searchTerm(this.parentNode.parentNode)}'});
							if(pubmed!="")
								scont.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'PubMed', className:'ml20x p5x'});
							if(ebsco!="")
								scont.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'EBSCO', className:'ml20x p5x'});
							div.create('div',{id:'add'+arr[0][1]+'_'+count+'100',style:{display:'none'}});
					}
				}
			}
			if(take(mainobj).n!=null)
			{
				var o=take(mainobj).n.parentNode.parentNode;
				var child=cont.getsign('div',{className:'par'});
				for(var z=0; z<child.length; z++)
				{
					if(child[z] == o)
						break;
					else
					{
						var s=take(child[z]).getsign('span',{className:'afplusimg'})[0];
						if(typeof s != "undefined")
						{
							var sl=s.getAttribute("data-level");
							var ml=take(mainobj).n.getAttribute("data-level");
							if(sl != ml)
							{
								s.className='afminusimg';
								s.onmousedown=function(){return false;};
							}
						}
					}
				}
			}
		}
	}
}