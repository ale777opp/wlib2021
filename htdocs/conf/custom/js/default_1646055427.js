
function openBlindPanel()
{var obj=take('blind_panel').n;var cont=take(document.body);var cls=(typeof _sheet!="undefined")?_sheet:"";if(obj.className=="blind_hide")
{obj.className="blind_show";cont.hasclass('blind_panel')?'':cont.addclass('blind_panel');toStandartSettings(take('standart_set').n);}
else
{obj.className="blind_hide";}}
function switchToBlindVersion(o)
{var cont=take(document.body);var elem=take(o.parentNode).tags('input');for(var i=0;i<elem.length;i++)
{if(cont.hasclass(elem[i].name+'_'+i))
cont.delclass(elem[i].name+'_'+i);}
cont.addclass(o.name+'_'+o.value);bodyclass=cont.n.className;}
function toNormalVersion()
{var cont=take(document.body);var obj=take('blind_panel').n;obj.className="blind_hide";cont.n.className=(typeof _sheet!="undefined")?_sheet:"";bodyclass="";}
function toStandartSettings(o)
{var val="";if(o.hasAttribute('data-value'))
val=o.getAttribute('data-value');var cont=take(document.body);if(val!="")
cont.n.className=val;bodyclass=cont.n.className;}
function seePlace(o,ind,c,rdb)
{addid="place"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div class="progress small"><div></div></div>';var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
if((typeof dbs[numDB].groupplace!="undefined")&&(dbs[numDB].groupplace!=""))
{seePlaceGr(ind,db,"SEE7SIGLA");}
else
{seePlaceEx(null,ind,db,"SEE7BB");}}}
showHide2(o,addid);}
function seePlaceEx(o,ind,rdb,outf,sigla,c)
{if(typeof c!="undefined")
addid=c;if((o==null)||((o!=null)&&(o.nextSibling.innerHTML=='')))
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:MoveCopies"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",rdb]);querylist.push(["idbr",ind]);querylist.push(["copyform",outf]);querylist.push(["writeoff","false"]);if(typeof sigla!="undefined")
querylist.push(["sigla",sigla]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,rdb)]);ajaxToRCP(gArr,displayPlace);}
if(o!=null)
showHide1(o);}
function seePlaceGr(ind,rdb,outf)
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",400]);querylist.push(["iddb",rdb]);querylist.push(["outformList[0]/outform",outf]);querylist.push(["query/body","ID "+replaceSlash(ind)]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,rdb)]);ajaxToRCP(gArr,displayGrouppedPlace);}
function displayGrouppedPlace(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var str="";var div=take(addid);if(parseInt(response[0]._size,10)>0)
{var iddb=response[0]._result_0._sourceIddb;var ind=replaceSlash(response[0]._result_0._id);for(var key in response[0]._result_0)
{var value=response[0]._result_0[key];if(key.indexOf('_SEE7SIGLA')!=-1)
{var len=value.length;for(var i=0;i<len;i++)
{if(value[i]!="")
{var indx='ex'+replaceSymb7(ind)+''+i;str+='<div class="siglas"><div onmousedown="seePlaceEx(this,\''+ind+'\',\''+iddb+'\',\'SEE7FUNDS\',\''+value[i]+'\',\''+indx+'\')">'+value[i]+'</div><div class="ex" id="'+indx+'"></div></div>';}}}}}
else
{str+='<div class="acenter f80 p20x">Экземпляры не найдены</div>';}
div.n.innerHTML=str;}}
function displayPlace(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var str="";var count=0;var obj1={};var div=take(addid);for(var key in response[0])
{var value=response[0][key];if(key.indexOf('copies_')!=-1)
{obj1[count]={};obj1[count].COPYINFO="";for(var arg in value)
{var val=value[arg];if(arg.indexOf('_inventory')!=-1)
obj1[count].INVENTORY=val;if(arg.indexOf('_barcode')!=-1)
obj1[count].CODE=val;if(arg.indexOf('_location')!=-1)
obj1[count].STATUS=val;if(arg.indexOf('_copyinfo')!=-1)
{obj1[count].COPYINFO=val[0];}}
count++;}}
if(count>0)
{for(var i=0;i<count;i++)
{str+='<div class="w100 f80 p10x"><b>'+(i+1)+'. Статус </b>: <span class="red">'+obj1[i].STATUS+'</span></div>';str+='<div class="table w100">';str+='<div class="row b bge"><div class="td f80 w30 p10x">Инвентарный номер</div><div class="td f80 w30 p10x">Код</div><div class="td f80 p10x">Сведения об экземпляре</div></div>';str+='<div class="row b1e"><div class="td f80 w30 p10x">'+obj1[i].INVENTORY+'</div><div class="td f80 w30 p10x">'+obj1[i].CODE+'</div><div class="td f80 p10x">'+parseBB(obj1[i].COPYINFO)+'</div></div>';str+='</div>';}}
else
{str+='<div class="acenter f80 p20x">Экземпляры не найдены</div>';}
div.n.innerHTML=str;div.show();}
addid="";}
function seeBibcard(o,ind,c,rdb)
{typework="";addid="bib"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div style="position:absolute;top:0" class="progress small"><div></div></div>';var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
var gArr=new Array();gArr.push(["userId",identif]);gArr.push(["session",numsean]);gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/bibcard.xsl"]);gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);gArr.push(["_service","STORAGE:opacfindd:FindView"]);gArr.push(["_version","2.3.0"]);gArr.push(["outformList[0]/outform","bibcard"]);gArr.push(["outformList[0]/bibcardType","formatted"]);if(typeof dbs[numDB].bibcardtype!="undefined")
gArr.push(["outformList[0]/bibcardName",dbs[numDB].bibcardtype]);gArr.push(["iddbIds[0]/iddb",db]);var tmp=/\\{1,}/g;if(tmp.test(ind))
ind=ind.replace(tmp,'\\');gArr.push(["iddbIds[0]/id",ind]);var ifrm=take(addid).create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:'520px',height:'330px',border:'0',frameBorder:'0',marginWidth:'0',marginHeight:'0',scrolling:'no'},src:'about:blank'});var fdoc=ifrm.n.contentDocument||ifrm.n.contentWindow.document;fdoc.open();fdoc.close();callToRCP(gArr,ifrm.n,"/cgiopac/opacg/direct.exe");}}
showHide2(o,addid);}
function seeRusmarc(o,ind,c,rdb)
{typework="";addid="rusm"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div style="position:absolute;top:0" class="progress small"><div></div></div>';var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error1"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);var tmp=/\\{1,}/g;if(tmp.test(ind))
ind=ind.replace(tmp,'\\');querylist.push(["iddbIds[0]/id",ind]);querylist.push(["iddbIds[0]/iddb",db]);querylist.push(["outformList[0]/outform","UNIMARC"]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,backSeeRusmarc);}}
showHide2(o,addid);}
function backSeeRusmarc(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError('ajax');}
else
{take(addid).n.innerHTML="";for(key in response[0])
{var value=response[0][key];if(key.indexOf('result_')!=-1)
{if(typeof value._error_0!="undefined")
{take(addid).create('p',{className:'warn',textNode:value._error_0[0]});break;}
else
{var arr=value._UNIMARC_0;for(var i=0;i<arr.length;i++)
{take(addid).create('p',{textNode:arr[i],style:{fontFamily:'monospace',marginBottom:'0'}});}}}}}}
function reSize(y)
{var div=take(addid);var ifr=div.n.lastChild;try
{div.n.innerHTML=ifr.contentDocument.getElementById('cont').innerHTML;}
catch(e){}
addid="";}
var curDate=new Date();var Month=curDate.getMonth();var Year=curDate.getFullYear();var maxYear=Year+1;var minYear=1920;var validd1=31;var validm=12;var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var cd=Year+mm+dd;function isLeapyear(theyear)
{return(!(theyear%4)&&(theyear%100||!(theyear%400)))?true:false;}
function setValidDay(v,y,ind)
{var validnumber;if(v=='02')
(isLeapyear(y))?validnumber=29:validnumber=28;else if((v=='04')||(v=='06')||(v=='09')||(v=='11'))
validnumber=30;else
validnumber=31;if((parseInt(take(ind).n.value,10)>validnumber)||(take(ind).n.value.length<2))
take(ind).n.value=validnumber;}
var monthDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);var months=new Array('Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь');var cobj=null;function CreateCal(e)
{var obj=new calObj(getSrc(e).id);obj.calPrint(e);}
function CreateCal2(e)
{var obj=new calObj(getSrc(e).id,'2005',maxYear);obj.calPrint(e);}
function CreateCal1(e)
{var obj=new calObj(getSrc(e).id,'1920');obj.calPrint(e);}
function calObj(ind,minyear,maxyear,closebut,cls)
{this.id="_"+ind;this.year=Year;this.month=Month;this.day=curDate.getDate();this.minyear=minyear||minYear;this.maxyear=maxyear||maxYear;this.className=cls||"calendar";this.closebut=closebut||true;this.years=new Array();var len=this.maxyear-this.minyear;this.week=new Array('Пн','Вт','Ср','Чт','Пт','Сб','Вс');this.setCal=setCal;this.calPrint=calPrint;this.fillCels=fillCels;maxYear=this.maxyear;minYear=this.minyear;}
function fillCels(e)
{var par=this.parentNode.parentNode;var ind=getSrc(e).parentNode.id.substring(getSrc(e).parentNode.id.indexOf('_')+1);var y=parseInt(take('y_'+ind).n.value);var m=(parseInt(take('m_'+ind).n.className)+1<10)?'0'+(parseInt(take('m_'+ind).n.className)+1):parseInt(take('m_'+ind).n.className)+1;var dd=getSrc(e).innerHTML;dd=(parseInt(dd)+1<10)?'0'+(parseInt(dd)):parseInt(dd);take('d'+ind).n.value=dd;take('m'+ind).n.value=m;take('y'+ind).n.value=y;putDT(e);calDel(par.id);}
function setCal(e)
{var par=take('numeric'+cobj.id);par.n.innerHTML="";var nDate=new Date(Year,Month,0);if(isLeapyear(Year))
monthDays[1]=29;else
monthDays[1]=28;var days=monthDays[Month];var start=nDate.getDay();days+=start;var i=0;for(i=0;i<start;i++)
par.create('span',{className:'empty',textNode:'.'});for(i=start;i<days;i++)
{var cls;if((i%7==5)||(i%7==6))
cls='rest';else
cls='work';var span=par.create('span',{textNode:(i-start+1),className:cls,title:' выбрать ',onmousedown:'fillCels'});if((i-start+1)==curDate.getDate())
{span.n.className='now';}}
if(((i%7)<7)&&(i%7)!=0)
{for(var j=(i%7);j<7;j++)
par.create('span',{className:'empty',textNode:'.'});}
take('m'+cobj.id).n.className=Month;take('m'+cobj.id).n.innerHTML=months[Month];take('y'+cobj.id).n.value=Year;}
function putCMonth(e)
{var obj=getSrc(e);var elem=obj.parentNode;var par=elem.parentNode;var mobj=take(elem.id.substring(1)).n;Month=mobj.className=obj.className;mobj.innerHTML=obj.innerHTML;par.removeChild(elem);}
function changeMonth(e)
{var elem=getSrc(e);var par=elem.parentNode;var cmo=take(par).create('ul',{id:'m'+elem.id,className:'cselect'});for(var i=0;i<months.length;i++)
{var opt=cmo.create('li',{textNode:months[i],className:i,onmousedown:'putCMonth'});if(i==Month)
opt.n.className='active';}}
function calPrint(e)
{calDel(this.id);cobj=this;var elem=take(document.body).create('div',{id:this.id,className:this.className});if(this.closebut)
{var header=elem.create('div',{className:'close'});header.create('span',{textNode:'X',title:'Закрыть',className:'del',onmousedown:'function(){calDel("'+this.id+'");};'});}
var top=elem.create('div',{className:'top'});top.create('span',{className:'arl',title:'назад',onclick:'setMounth',textNode:'<'});top.create('span',{id:'m'+this.id,title:'изменить',textNode:months[this.month],className:this.month,onmousedown:'changeMonth'});top.create('span',{className:'arr',title:'вперед',onclick:'setMounth',textNode:'>'});top.create('span',{className:'arl',title:'назад',onclick:'setYear',textNode:'<'});top.create('input',{type:'text',title:'изменить',id:'y'+this.id,value:this.year,maxLength:'4',onkeyup:'setYear',onblur:'setYear'});top.create('span',{className:'arr',title:'вперед',onclick:'setYear',textNode:'>'});var days=elem.create('div',{className:'days'});var len=this.week.length;for(var i=0;i<len;i++)
{days.create('span',{textNode:this.week[i]});}
var num=elem.create('div',{id:'numeric'+this.id});this.setCal(e);X=getX(e);Y=getY(e);var r=(isIE)?parseInt(document.body.clientWidth-X):parseInt(window.innerWidth-X);var t=(isIE)?parseInt(document.body.clientHeight-Y):parseInt(window.innerHeight-Y);var w=elem.getw();var h=elem.geth();var sX=sY=0;if(r<w)sX=parseInt(X-w);else sX=parseInt(X);if(t<h)sY=parseInt(Y-h);else sY=parseInt(Y);elem.setx(sX);elem.sety(sY);}
function setMounth(e)
{var c=0;if(getSrc(e).className=='arr')
c=1;var oldm=parseInt(take('m'+cobj.id).n.className);var curm=(c==0)?oldm-1:oldm+1;if(curm>11)
{curm=0;}
if(curm<0)
{curm=11;}
Month=curm;setCal(e);}
function setYear(e)
{var cury=Year;if(getSrc(e).nodeName.toLowerCase()=='input')
{if(getSrc(e).value.length<4)
return;else
cury=getSrc(e).value;}
else
{var c=0;if(getSrc(e).className=='arr')
c=1;var oldy=parseInt(take('y'+cobj.id).n.value);var cury=(c==0)?oldy-1:oldy+1;}
if((cury>maxYear)||(cury<minYear))
cury=curDate.getFullYear();Year=cury;setCal(e);}
function calDel(ind)
{var div=take(ind).n;if(div!=null)
{div.parentNode.removeChild(div);curDate=new Date();Month=curDate.getMonth();Year=curDate.getFullYear();}
else
return;cobj=null;}
function correctVal(e)
{var elem=getSrc(e);if(elem.nodeName.toLowerCase()!='input')
return;var val=elem.value;if(!IsInt(val))
{alert('Значение должно быть цифровым!');elem.focus();return;}
var pref=getSrc(e).id.substring(0,1);var tail=getSrc(e).id.substring(1,getSrc(e).id.length);var etype=(!isIE)?e.type:window.event.type;switch(pref)
{case'd':if(((val=='')||(val.length<2))&&(etype=="blur"))
elem.value=dd;if(val.length==2)
{if((parseInt(val,10)>validd1)||(parseInt(val,10)==0))
elem.value=dd;if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.value="0"+parseInt(val,10);var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;if(take('m'+tail).n.value!="")
setValidDay(take('m'+tail).n.value,y,'d'+tail);if((getCode(e)==39)&&(etype!="blur"))
take('m'+tail).n.focus();}
break;case'm':if((take('d'+tail).n.value.length<2)||(parseInt(take('d'+tail).n.value)>validd1))
take('d'+tail).n.value=dd;if(((val=='')||(val.length<2))&&(etype=="blur"))
elem.value=mm;if(val.length==2)
{var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;if((parseInt(val,10)>validm)||(parseInt(val,10)==0))
elem.value=mm;if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.val="0"+parseInt(val,10);setValidDay(parseInt(val,10),y,'d'+tail);if((getCode(e)==37)&&(etype!="blur"))
take('d'+tail).n.focus();if((getCode(e)==39)&&(etype!="blur"))
take('y'+tail).n.focus();}
break;case'y':if(take('m'+tail).n.value.length<2)
take('m'+tail).n.value=mm;if(take('d'+tail).n.value.length<2)
take('d'+tail).n.value=dd;if(((val=='')||(parseInt(val,10)<minYear)||(parseInt(val,10)>maxYear))&&(etype=="blur"))
elem.value=Year;setValidDay(take('m'+tail).n.value,parseInt(elem.value,10),'d'+tail);if((getCode(e)==37)&&(etype!="blur"))
take('m'+tail).n.focus();break;case'h':if((val=='')||(val.length<2))
elem.value='00';if(val.length==2)
{if((parseInt(val,10)>23)||(parseInt(val,10)==0))
elem.value='00';if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.value="0"+parseInt(val,10);}
break;case's':if(take('h'+tail).n.value.length<2)
take('h'+tail).n.value='00';if((val=='')||(val.length<2))
elem.value='00';if(val.length==2)
{if((parseInt(val,10)>59)||(parseInt(val,10)==0))
elem.value='00';if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.val="0"+parseInt(val,10);}
break;default:break;}}
function setValidDate(y,m,d)
{var str="";if((y.length<4)||(parseInt(y,10)<parseInt(Year,10))||(parseInt(y,10)>parseInt(maxYear,10)))
y=Year;str+=y;if(m.length<2)
m='0'+m;else
{if(parseInt(m,10)>12)
m='12';}
str+=m;if(d.length<2)
d='0'+d;else
{var vd=findDay(y,m);if(parseInt(d,10)>vd)
d=vd;}
str+=d;if(parseInt(str)<parseInt(cd))
str=cd;return str;}
function findDay(y,m)
{var validnumber;if(m=='02')
(isLeapyear(y))?validnumber=29:validnumber=28;else if((m=='04')||(m=='06')||(m=='09')||(m=='11'))
validnumber=30;else
validnumber=31;return validnumber;}
function putDT(e)
{if(getSrc(e).nodeName.toLowerCase()!='span')
correctVal(e);viewNext();}
function viewNext()
{limitOrderData();if(take('inext').n!=null)
take('inext').show();if(take('timeordcontainer').n!=null)
take('timeordcontainer').hide();if(take('iconfirm').n!=null)
take('iconfirm').hide();}
function IsInt(val)
{var temp=/\d/;for(var i=0;i<val.length;i++)
{if(!temp.test(val.charAt(i)))
{return false;}}
return true;}
var orderlimit=null;function limitOrderData()
{if(orderlimit!=null)
{if((take('inext').n!=null)&&(take('timeordcontainer').n!=null))
{var currd=curDate.getTime();var limitdate=curDate.getTime()+orderlimit;var inputdate=(new Date(take('y11').n.value,parseInt(take('m11').n.value,10)-1,take('d11').n.value)).getTime();if((limitdate<inputdate)||(currd>inputdate))
{inputdate=limitdate;}
var dd=(new Date(inputdate)).getDate()+'';var mm=((new Date(inputdate)).getMonth()+1)+'';var yy=(new Date(inputdate)).getFullYear();if(dd.length<2)
dd='0'+dd;if(mm.length<2)
mm='0'+mm;take('y11').n.value=yy;take('m11').n.value=mm;take('d11').n.value=dd;}}}
function setEventMonth(o)
{var elem=take('m_10').n;var cl=parseInt(elem.className,10);if(o.className=="arl")
{if(cl>0)
{elem.className=cl-1;elem.innerHTML=months[cl-1];}}
else
{if(cl<11)
{elem.className=cl+1;elem.innerHTML=months[cl+1];}}
setEventMonthes();}
function setEventYear(o)
{var elem=take('y_10').n;var cl=parseInt(elem.className,10);var y=(new Date).getFullYear();if(o.className=="arr")
{if(cl<y)
{elem.className=cl+1;elem.innerHTML=cl+1;}}
else
{elem.className=cl-1;elem.innerHTML=cl-1;}
setEventMonthes();}
function setEventMonthes()
{var elem=take('numeric_10');var y1=(new Date).getFullYear();var m1=(new Date).getMonth();var y=take('y_10');var m=take('m_10');elem.n.innerHTML="";for(var i=11;i>=0;i--)
{var cls='';if(y1==parseInt(y.n.className,10))
{if(i<=parseInt(m1,10))
{cls='u red curs';}
else
{cls='';}}
else
{cls='u red curs';}
if(cls!="")
{elem.create('span',{className:cls,onmousedown:'function(){setEvent(\''+parseInt(y.n.className,10)+'\',\''+i+'\')}',textNode:months[i]});}
else
{elem.create('span',{textNode:months[i]});}}}
function copyToClip(o)
{o.parentNode.firstChild.select();try
{if(document.execCommand("copy"))
{alert('Ссылка скопирована в буфер обмена');}}
catch(e)
{alert('Не удалось скопировать адрес ссылки в буфер обмена');}}
var servername="opac64-test.liart.local";var outform="SHOTFORM";var outformfull="FULLFORM";var uselight="yes";var foldername="test4";var pathactrcp="/t4request";var pathcss="/test4/test4/css";var pathjs="/test4/test4/js";var pathimg="/test4/test4/img";var pathhtml="/test4/test4/html";var pathdoc="/test4/test4/documents";var pathrubricator="/test4/test4/rubricator";var listlit="yes";var dbs=[];dbs["425"]=[];dbs["425"]["type"]="BIBL";dbs["425"]["mode"]="LOCAL";dbs["425"]["alias"]="БД Ресурсы Интернет";dbs["425"]["dbindex"]="interres";dbs["425"]["outform"]="SHOTFORM";dbs["425"]["outformfull"]="FULLFRM";dbs["425"]["loadurl"]="stat";dbs["425"]["seef"]="hierarchical";dbs["425"]["bibcard"]="show";dbs["425"]["rusmarc"]="show";dbs["425"]["place"]="show";dbs["425"]["additional"]=[];dbs["425"]["additional"]["raitings"]="";dbs["425"]["additional"]["comments"]="";dbs["425"]["additional"]["social"]="display";dbs["425"]["additional"]["scopy"]="display";dbs["425"]["additional"]["nophoto"]="display";dbs["425"]["labels"]=[];dbs["425"]["labels"]["AND"]=[" И ","",""];dbs["425"]["labels"]["OR"]=[" ИЛИ ","",""];dbs["425"]["labels"]["NOT"]=[" НЕ ","",""];dbs["425"]["labels"]["FT"]=["Все поля","N","N","N","false","count","desc","1","FT"];dbs["425"]["labels"]["AU"]=["Индивид. автор, редактор, составитель и др.","Y","Y","N","false","count","desc","1","AU"];dbs["425"]["labels"]["TI"]=["Заглавие","Y","N","N","false","count","desc","1","TI"];dbs["425"]["labels"]["SO"]=["Заглавие источника","Y","N","N","false","count","desc","1","SO"];dbs["425"]["labels"]["CA"]=["Коллективный автор","Y","Y","N","false","count","desc","1","CA"];dbs["425"]["labels"]["FA"]=["Родовое имя","Y","Y","N","false","count","desc","1","FA"];dbs["425"]["labels"]["TU"]=["Унифицированное заглавие","Y","N","N","false","count","desc","1","TU"];dbs["425"]["labels"]["SE"]=["Серия","Y","N","N","false","count","desc","1","SE"];var numdbBIBL="425";var numdbf="0";function initd()
{if(typeof error!="undefined")
WriteError(error,'back');else
{var cookiestring='numsean='+numsean+'; path=/';if(window.location.protocol=='https:')
cookiestring+=' secure=true; samesite=lax';document.cookie=cookiestring;if(typeof scrolllayer=="undefined")
scrolllayer="searchdiv";scrollFloat.init(document.getElementById(scrolllayer));if(take('editq').n!=null)
{if(take('expand_search').n!=null)
{if(typeof _str!="undefined")
take('editq').n.style.display="block";}}
if(typeof _numDB!="undefined")
{numDB=_numDB;}
else if(typeof _iddb!="undefined")
{numDB=_iddb;}
else
{if(take('bases_div').n!=null)
{var barr=take('bases_div').getsign('input',{name:'base'});if(barr.length>0)
numDB=barr[0].value;else
{if(take('bases_container').n!=null)
numDB=take('bases_container').n.firstChild.className.substring(1);}}}
if(typeof biblnumber!="undefined")
{numdbBIBL=biblnumber;}
if(take('bases_div').n!=null)
{if(typeof take('bases_div').getsign('input',{value:numDB})[0]!="undefined")
{var inp=take('bases_div').getsign('input',{value:numDB})[0];if(inp.type!="hidden")
inp.checked=true;}}
if(typeof _bodyclass!="undefined")
{bodyclass=_bodyclass;}
if(typeof _typesearch!="undefined")
{typesearch=_typesearch;}
if(typeof _typework!="undefined")
{typework=_typework;}
if(typeof _lockedstring!="undefined")
{lockedstring=_lockedstring;}
if(take('middle').n!=null)
{var arr=take('middle').tags('input');for(var i=0;i<arr.length;i++)
arr[i].onkeyup=KeyPress;}
if(take('password').n!=null)
take('password').n.onkeyup=KeyPress;if(take('readercode2').n!=null)
take('readercode2').n.onkeyup=KeyPress;if(typeof numDB=="number")
numDB=numDB+"";if(take('currdb').n!=null)
{var currdb=take('currdb').n;if((typeof numdbAF!="undefined")&&(numDB==numdbAF)&&(dbs[numDB].switch_in_base!="in_base"))
{if(currdb.nodeName.toLowerCase()=="span")
{currdb.innerHTML=take('bases_container').n.firstChild.innerHTML;currdb.className=take('bases_container').n.firstChild.className;}}
else
{if(currdb.nodeName.toLowerCase()=="span")
{if((typework=='searchallbases')&&(typeof dbs["all"]!="undefined"))
numDB='all';currdb.innerHTML=dbs[numDB]["alias"];currdb.className='i'+numDB;}}}
if(typeof _addfilters!="undefined")
addfilters=_addfilters;if(typeof _lockedfilters!="undefined")
lockedfilters=_lockedfilters;if(typeof _swfterm!="undefined")
swfterm=replaceSymb(_swfterm);var filtersdiv='filters_'+numDB;if(typeof _localiddb!="undefined")
{numDB=_localiddb;filtersdiv='filters_'+_iddb;}
if((typeof _sheet!="undefined")&&(_sheet=="sheet_search_history_php"))
numDB=numdbBIBL;if(typeof mapwidth!="undefined")
{if(take('searchmap1').n!=null)
{typesearch="combined";take('callsearchmap').hide();var w=take('searchmap1').n.getBoundingClientRect().width;var h=take('searchmap1').n.getBoundingClientRect().height;var k=parseFloat(w/mapwidth).toFixed(2);if(typeof setMap!="undefined")
setMap('searchmap1','mapfull',null,k,w,h);}
else
{if(take('searchmap').n!=null)
{if(typeof setMap!="undefined")
setMap('searchmap','mapfull');}}}
chooseBase(numDB);if(take(filtersdiv).n!=null)
{take(filtersdiv).show();if(typeof _addfilters!="undefined")
{var afarr=addfilters.split('[END]');for(var i=0;i<afarr.length;i++)
{if(afarr[i]!="")
{var nextid=afarr[i].substring(afarr[i].indexOf('[NEXT]')+6,afarr[i].indexOf('[IND]'));var oid=afarr[i].substring(afarr[i].indexOf('[IND]')+5,afarr[i].indexOf('[CLASS]'));var cls=afarr[i].substring(afarr[i].indexOf('[CLASS]')+7,afarr[i].indexOf('[TEXT]'));var txt=afarr[i].substring(afarr[i].indexOf('[TEXT]')+6);var obj=take(nextid).n;if(obj!=null)
{var par=obj.parentNode;var arr=take(par).tags('span');var flag=false;for(var j=0;j<arr.length;j++)
{if(arr[j].innerHTML.toUpperCase()==txt.toUpperCase())
{flag=true;break;}
else
flag=false;}
if(!flag)
{var div=take(par).create('div',{className:prepareTerm(cls)});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:prepareTerm(txt),id:oid});div.create('i',{textNode:'0'});par.insertBefore(div.n,obj);}}}}}
if(typeof _filtersids!="undefined")
{var farr=_filtersids.split('[END]');for(var i=0;i<farr.length;i++)
{if(take(farr[i]).n!=null)
{take(farr[i]).n.className="checked";take(farr[i]).n.title="ОЧИСТИТЬ ФИЛЬТР";take(farr[i]).n.nextSibling.style.display="none";}}}
filtersQuery();}
if(typeof _rubricator!="undefined")
{if(typeof openBranches!="undefined")
openBranches();}
flag45=findFlag45();if(take('readercode2').n!=null)
{if(take('d1').n!=null)
{take('d1').n.onblur=changeData;take('d1').n.onmouseup=changeData;}
if(take('m1').n!=null)
{take('m1').n.onblur=changeData;take('m1').n.onmouseup=changeData;}
if(take('y1').n!=null)
{take('y1').n.onblur=changeData;take('y1').n.onmouseup=changeData;}}
if((typeof _typereg!="undefined")&&(_typereg!="regform")&&(_typereg!="_libreader"))
{if(typeof getPrice!="undefined")
getPrice();}
if(typeof _vocobj!="undefined")
{vocobj=_vocobj;writeRezult();}
if(take('rcounter').n!=null)
{if(typeof findBaseQuantity!="undefined")
findBaseQuantity();}
getBookInfo();if(take('facets_container').n!=null)
{if(take('facets_div').n!=null)
{take('facets_div').n.appendChild(take('facets_container').n);take('facets_div').show();}}
if((typeof _outform!="undefined")&&(_outform.indexOf('PHOTO')!=-1))
{findImages();}
if(take('sconstruct_'+numDB).n!=null)
{getDataFromStorage();}
if((typeof _newrecs!="undefined")&&(_newrecs!=""))
{take(document.body).addclass('newscalendar');}
if(typeof _showsearchrez!="undefined")
{var obj={};obj._str=_str;obj._showstr=_showstr;numDB=_iddb;simpleSearch(null,obj);}}}
function chooseBase(o,ind)
{if(typeof o=="string")
{if((typesearch=="authority")&&(typeof prefind!="undefined"))
o=numdbf;if(typework=="searchallbases")
{o='all';if(take('iall').n!=null)
take('iall').n.checked=true;}
if(o!="all")
{if((typeof iddb[o]!="undefined")&&(iddb[o][0][3]!="AF"))
{var dbflag=false;if(typeof iddb[o][5]!="undefined")
{var arr=iddb[o][5];for(var i=0;i<arr.length;i++)
{if(arr[i][0]=="067")
{dbflag=true;break;}}}
if((typeof dbs[o]=="undefined")||(dbflag))
o=numDB=numdbBIBL;if(take('i'+dbs[o]["dbindex"]).n!=null)
take('i'+dbs[o]["dbindex"]).n.checked=true;if(take('currdb').n!=null)
{var currdb=take('currdb').n;if(currdb.nodeName.toLowerCase()=="span")
{currdb.innerHTML=dbs[numDB]["alias"];currdb.className='i'+numDB;}}}}}
else
{if(typesearch!="expand")
typesearch="simple";if(o.nodeName.toLowerCase()=='label')
numDB=o.previousSibling.value;else
numDB=o.nextSibling.className.substring(1);if(numDB=='all')
{typework="searchallbases";typesearch="simple";if(take('editq').n!=null)
take('editq').hide();}
else
{typework="search";if((ind!="")&&(ind=="ifundholders"))
typesearch="fundholders";if(dbs[numDB].type=="AF")
{typesearch="authority";if(take('editq').n!=null)
take('editq').hide();}
else
{if(take('editq').n!=null)
take('editq').n.style.display="block";}}
vocobj="";lockedfilters="";if((take('searchhead').n!=null)||(take('vochead').n!=null))
lockSrezults();}
switchSearch(typesearch);}
function findFlag45()
{var db=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
db=_iddb;if(db=='all')
db=numdbBIBL;var fl=false;if(typeof _flag45!="undefined")
{fl=true;}
else
{if(take('labs_div_'+db).n!=null)
{if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
{if(iddb[db][0][3]=='BIBL')
{if(typeof iddb[db][5]!="undefined")
{var arr=iddb[db][5];for(var i=0;i<arr.length;i++)
{if(arr[i][0]=="045")
{fl=true;break;}}}}}}}
return fl;}
function findFlag72(ndb)
{var db=numdbBIBL;if(typeof ndb!="undefined")
db=ndb;var fl=false;if(take('labs_div_'+db).n!=null)
{if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
{if(iddb[db][0][3]=='BIBL')
{if(typeof iddb[db][5]!="undefined")
{var arr=iddb[db][5];for(var i=0;i<arr.length;i++)
{if(arr[i][0]=="072")
{fl=true;break;}}}}}}
return fl;}
function verifyLink()
{var harr={};var div=take('searchrezult');if(div.n!=null)
{if((typeof _auth!="undefined")&&(typeof _linkstring!="undefined"))
{var arr=_linkstring.split('[END]');for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var tmparr=arr[i].split('[ID]');harr[tmparr[0]]=tmparr[1];}}
for(var key in harr)
{var arr=div.getsign('p',{className:key});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{arr[i].style.display="";}}}}}
else
{return;}}
function lockSrezults()
{var div=take('disablediv');var par=take(document.body).getsign('div',{className:'col_content'})[0];var item=take('searchhead').n;var h=take(item).geth();var w=take(par).getw();var X=0;var y=0;if(div.n==null)
div=take(par).create('div',{id:'disablediv'});div.setx(X);div.sety(y);div.setw(w);div.show();div.transparency(5);}
function placeLabs()
{var ndb=numDB;var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;if(ndb=='all')
{ndb=numdbBIBL;}
var doc=take('labs_div_'+ndb);if(doc.n!=null)
{var labs=doc.tags('div');if(dtype=="BIBL")
{if(take('simple_search').n!=null)
{var span=take('simple_search').tags('span')[0];if((typeof _searchlabel!="undefined")&&(typeof dbs[ndb]["labels"][_searchlabel]!="undefined"))
{span.className="i"+_searchlabel;span.innerHTML=dbs[ndb]["labels"][_searchlabel][0];}
else if((typeof _label!="undefined")&&(typeof dbs[ndb]["labels"][_label]!="undefined"))
{span.className="i"+_label;span.innerHTML=dbs[ndb]["labels"][_label][0];}
else
{span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}}
var sel=null;if(take('expand_search').n!=null)
{var div=take('expand_search').getsign('div',{className:'labcontainer'});if((typeof _vocobj!="undefined")&&(_typesearch=="expand")&&(vocobj!=""))
{if(typeof _label!="undefined")
{var obj=take(_vocobj).n;if(obj.parentNode.previousSibling.className=='opt1')
sel=obj.parentNode.previousSibling.previousSibling.firstChild.lastChild;else
sel=obj.parentNode.previousSibling.firstChild.lastChild;var lab=_label;if(typeof dbs[ndb]["labels"][_label]=="undefined")
{lab=labs[1].className.substring(1);}
sel.className="i"+lab;sel.innerHTML=dbs[ndb]["labels"][lab][0];var voc=obj.parentNode.parentNode.previousSibling;if(voc.className=='logcontainer')
voc=voc.previousSibling;if((dbs[ndb]["labels"][lab][1]=="N")||(lab=="TEXT"))
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
else
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}}}
var count=0;if((labs[0].className=="iFT")||(labs[0].className=="iAH"))
count=1;for(var i=0;i<div.length;i++)
{var lcont=div[i].firstChild.firstChild.lastChild;if(lcont!=sel)
{if(typeof labs[count]!="undefined")
{lcont.className=labs[count].className;lcont.innerHTML=labs[count].innerHTML;var lab=labs[count].className.substring(1);var voc=null;var par=null;if(div[i].previousSibling.className=='logcontainer')
{par=div[i].previousSibling.previousSibling;}
else
{par=div[i].previousSibling;}
if((par.nodeName.toLowerCase()=='b')||((par.nodeName.toLowerCase()=='input')))
voc=par;if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab!="TEXT"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
count++;}}}}
if(take('professional_search').n!=null)
{var span=take('professional_search').tags('span')[0];var lab=labs[0].className.substring(1);if((typeof _searchlabel!="undefined")&&(typeof dbs[ndb]["labels"][_searchlabel]!="undefined"))
{lab=_searchlabel;span.className="i"+_searchlabel;span.innerHTML=dbs[ndb]["labels"][_searchlabel][0];}
else
{lab=labs[0].className.substring(1);span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}
var voc=take('professional_search').getsign('b',{className:'voc'})[0];if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab!="TEXT"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
if(take('saf').n!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
take('saf').n.disabled=false;else
take('saf').n.disabled=true;}}
if(take('fulltext_search').n!=null)
{var span=take('fulltext_search').tags('span')[0];if(typeof _lab=="undefined")
{doc=take('fullt_div');labs=doc.tags('div');span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}
else
{var lab=take('fullt_div').getsign('div',{className:'i'+_lab})[0];span.className=lab.className;span.innerHTML=lab.innerHTML;}}}
else
{if(take('authority_search').n!=null)
{var span=take('authority_search').tags('span')[0];var lab=labs[0].className.substring(1);span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;var voclist=take('voclist').n;var vocaf=take('vocaf').n;if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
{vocaf.className='voc';voclist.className='voc';vocaf.onmousedown=function(){showVoc(this);};voclist.onmousedown=function(){findInAf(take('itemaf').n);};}
else
{vocaf.className='voc disabled';voclist.className='voc disabled';vocaf.onmousedown=function(){return false;};voclist.onmousedown=function(){return false;};}}}}
setTimeout(function()
{var arr=take('main').getsign('div',{className:'cross_'});var arr1=take('main').getsign('div',{className:'block_'});for(var i=0;i<arr.length;i++)
{arr[i].className='cross';}
for(var i=0;i<arr1.length;i++)
{arr1[i].className='block';}},200);}
function putLAB(o)
{var obj=take('itemprof').n;var val=obj.value;if(val==" ")
val="";else
val=val.Trim();var par=take('expr');var lab=obj.parentNode.previousSibling.firstChild.lastChild.className.substring(1);var doc=null;var and=o.id.substring(1).toUpperCase();var tie="";switch(and)
{case'AND':tie='И';break;case'OR':tie='ИЛИ';break;case'NOT':tie='НЕ';break;default:break;}
if(par.n.innerHTML.indexOf(lab)!=-1)
doc=take(lab);else
{if(par.n.hasChildNodes())
doc=par.create('span',{id:lab,className:and,title:tie});else
doc=par.create('span',{id:lab});}
if(doc.n.hasChildNodes())
doc.n.innerHTML="";if(val!="")
{var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;doc.create('span',{textNode:dbs[db]["labels"][lab][0],className:'fel'});doc.create('span',{className:lab,textNode:val});}
else
par.n.removeChild(doc.n);obj.value="";}
function PutLabValue(o)
{var ndb=numDB;if(o.parentNode.className=="options2")
ndb=o.className.substring(1);var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;numDB=ndb;var obj=menu.lastChild;var lab=o.className.substring(1);var img=menu.firstChild;var inp=null;var s="";obj.className=o.className;obj.innerHTML=o.innerHTML;if(menu.className.indexOf('_')!=-1)
menu.className=menu.className.substring(0,menu.className.length-1);if(obj.id=='currdb')
chooseBase(img,o.id);if(menu.parentNode.nextSibling!=null)
{if((img.className!='log')&&(img.className!='stype')&&(typesearch!="combined"))
{if(menu.parentNode.nextSibling.nodeType==1)
{inp=menu.parentNode.nextSibling.firstChild;inp.focus();}}}
if((typesearch!="simple")&&(menu.parentNode.className!="limits_left")&&(menu.parentNode.className!="opt2")&&(menu.parentNode.className!="opt1")&&(menu.parentNode.className!="andor"))
{if(dbs[ndb]["type"]=='BIBL')
{var voc=null;if(menu.parentNode.previousSibling)
voc=menu.parentNode.previousSibling;else
voc=menu.parentNode.parentNode.previousSibling;if(voc.className=='logcontainer')
voc=voc.previousSibling;if(voc.nodeName.toLowerCase()!='input')
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N")&&(lab!="TEXT"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}}}
if(typeof dbs[ndb]["labels"]!="undefined")
{if(dbs[ndb]["type"]=='BIBL')
{if(take('saf').n!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
take('saf').n.disabled=false;else
take('saf').n.disabled=true;}}
else
{if(take('authority_search').n!=null)
{var voclist=take('voclist').n;var vocaf=take('vocaf').n;if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
{vocaf.className='voc';voclist.className='voc';vocaf.onmousedown=function(){showVoc(this);};voclist.onmousedown=function(){findInAf(take('itemaf').n);};}
else
{vocaf.className='voc disabled';voclist.className='voc disabled';vocaf.onmousedown=function(){return false;};voclist.onmousedown=function(){return false;};}}}}}}
function clearSearch(o)
{if(take('middle').n!=null)
{var arr=take('middle').getsign('input',{type:'text'});for(var i=0;i<arr.length;i++)
{if((arr[i].id=='itemsimple')&&(typesearch=='simple')||((typesearch=='expand')&&(arr[i].id!='itemsimple')&&(typeof o=="undefined")))
continue;else
arr[i].value="";}
if(take('expr').n!=null)
take('expr').n.innerHTML="";}
editqueryflag=false;}
function editQuery()
{var db=numDB;if(typeof _str!="undefined")
{if(typesearch=="fulltext")
{var lab=_str.substring(_str.indexOf('bracket]')+8,_str.indexOf(' '));var term=_str.substring(_str.indexOf(' ')+1,_str.indexOf('[/bracket'));var labs=take('fulltext_search').getsign('div',{className:'select'});var fields=take('fulltext_search').getsign('input',{className:'iLAB'});labs[0].lastChild.className="i"+lab;labs[0].lastChild.innerHTML=dbs[db]["labels"][lab][0];fields[0].value=term;}
else
{if(take('expand_search').n!=null)
{switchSearch("expand");var res=[];var arr=[];var tmp=/(\[\/bracket\] AND \[bracket\])|(\[\/bracket\] OR \[bracket\])|(\[\/bracket\] NOT \[bracket\])/;if(tmp.test(_str))
arr=_str.split(tmp);else
arr.push(_str);var ties=take('expand_search').getsign('div',{className:'select1'});var labs=take('expand_search').getsign('div',{className:'select'});var fields=take('expand_search').getsign('input',{className:'iLAB'});var vocs=take('expand_search').getpart(null,'b',{className:'voc'});var count=fields.length;for(var i=0;i<arr.length;i++)
{if((arr[i]!="")&&(typeof arr[i]!="undefined"))
{res.push(trimBrackets(arr[i]));}}
var strres=res.join(' ');res=[];res=strres.split('|');var len=res.length;if(take('limits_'+db).n!=null)
{var limits=take('limits_'+db).getsign('div',{className:'limits_left'});for(var j=0;j<len;j++)
{if(typeof res[j]!="undefined")
{var lab="";var term=prepareTerm(res[j]);term=term.Trim();var tie=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);for(var i=0;i<limits.length;i++)
{if(limits[i].lastChild.className=="input")
{var lobj=take(limits[i]).tags('input');var lim=lobj[0].className;if(lim==lab)
{delete res[j];if(term.indexOf('BETWEEN ')!=-1)
{term=term.substring(term.indexOf(' ')+1);var tmp=term.split(',');lobj[0].value=tmp[0].substring(1,tmp[0].length-1);lobj[1].value=tmp[1].substring(1,tmp[1].length-1);}
if(term.indexOf('GE ')!=-1)
{lobj[0].value=term.substring(term.indexOf("'")+1,term.length-1);}
if(term.indexOf('LE ')!=-1)
{lobj[1].value=term.substring(term.indexOf("'")+1,term.length-1);}
take('limits_search').n.className='limits_';take('limits_'+db).show();break;}}
else
{if(limits[i].lastChild.id.indexOf('l_'+db+'_')!=-1)
{var div=take(limits[i].lastChild.id+'_opt');if(div.n!=null)
{var arr=div.tags('div');for(var k=0;k<arr.length;k++)
{var tmp=arr[k].className;var tmp1=lab+' '+term;tmp=tmp.replace(/\(/g,'');tmp=tmp.replace(/\)/g,'');if(tmp1==tmp)
{delete res[j];take('limits_search').n.className='limits_';take('limits_'+db).show();limits[i].lastChild.lastChild.className=arr[k].className;limits[i].lastChild.lastChild.innerHTML=arr[k].innerHTML;break;}}}}}}}}}
for(var i=0;i<count;i++)
{var lab="";var term="";if(typeof res[i]!="undefined")
{term=prepareTerm(res[i]);if(i==0)
{lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);}
else
{term=term.Trim();var tie=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);if(ties.length>0)
{if(tie!="")
{ties[i-1].lastChild.className="i"+tie;ties[i-1].lastChild.innerHTML=dbs[db]["labels"][tie][0];}}}
if(typeof dbs[db]["labels"][lab]!="undefined")
{labs[i].lastChild.className="i"+lab;labs[i].lastChild.innerHTML=dbs[db]["labels"][lab][0];fields[i].value=term;vocs[i].className='voc';}}}
editqueryflag=true;}}}}
function switchSearch(obj)
{if(take('main').n!=null)
{var o="";if(typeof obj!="string")
{o=obj.id;editqueryflag=false}
else
{o=obj;}
if(numDB=='all')
editqueryflag=false;if((o=='fulltext')||(o=='fundholders')||(o=='authority')||(typework=="searchallbases"))
editqueryflag=false;var bl=take('main').getsign('div',{className:'baselimits'});var ls=take('limits_search');if(editqueryflag==false)
{clearSearch();var ss=take('simple_search');var es=take('expand_search');var ps=take('professional_search');var fh=take('fundholders_search');var fts=take('fulltext_search');var as=take('authority_search');var s=take('simple');var e=take('expand');var p=take('professional');var f=take('fundholders');var ft=take('fulltext');var sb=take('sbuttons');switch(o)
{case'simple':if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
{if(typeof dbs['all']!="undefined")
numDB='all';else
numDB=numdbBIBL;if(biblcounter>=1)
{if(take('i'+dbs[numDB]["dbindex"]).n!=null)
{if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[numDB]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[numDB]["alias"];take('currdb').n.className='i'+numDB;}}}}
if(es.n!=null)
{es.hide();if((numDB!="all")&&(typework!="searchallbases"))
{e.show();e.n.className="sel";}
else
e.hide();}
if(ps.n!=null)
{ps.hide();if((numDB!="all")&&(typework!="searchallbases"))
{p.show();p.n.className="sel";}
else
p.hide();}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(ss.n!=null)
{ss.show();s.show();s.n.className="sel_";ss.getsign('input',{type:'text'})[0].focus();}
if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
typesearch='simple';break;case'expand':if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
{if(typeof dbs['all']!="undefined")
numDB='all';else
numDB=numdbBIBL;if(biblcounter>=1)
{if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[numDB]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[numDB]["alias"];take('currdb').n.className='i'+numDB;}}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(ps.n!=null)
{ps.hide();p.n.className="sel";}
if(take('limits_'+numDB).n!=null)
{if(ls.n!=null)
{ls.show();ls.n.className='limits';}
for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(sb.n!=null)
{sb.show();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";}
else
ft.hide();}
if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(es.n!=null)
{es.show();e.n.className="sel_";typesearch='expand';es.getsign('input',{type:'text'})[0].focus();}
break;case'professional':if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(es.n!=null)
{es.hide();e.n.className="sel";}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(ps.n!=null)
{ps.show();p.n.className="sel_";typesearch='professional';ps.getsign('input',{type:'text'})[0].focus();}
break;case'fundholders':if(ss.n!=null)
{ss.hide();s.n.className="sel";s.show();}
if(es.n!=null)
{es.hide();e.n.className="sel";e.hide();}
if(ps.n!=null)
{ps.hide();p.n.className="sel";p.hide();}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(fh.n!=null)
{fh.show();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='input')
{s.n.className="sel__";e.n.className="sel__";if(p.n!=null)
p.n.className="sel__";}
else
{s.n.className="sel";e.n.className="sel";if(p.n!=null)
p.n.className="sel";f.n.className="sel_";}}
typesearch='fundholders';fh.getsign('input',{type:'text'})[0].focus();}
break;case'fulltext':if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
{f.n.className="sel";f.hide();}}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(es.n!=null)
{es.hide();e.n.className="sel";}
if(ps.n!=null)
{ps.hide();p.n.className="sel";}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel_";fts.show();typesearch='fulltext';fts.getsign('input',{type:'text'})[0].focus();}
else
{ft.hide();fts.hide();}}
break;case'authority':if(sb.n!=null)
sb.hide();if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.hide();}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";s.hide();}
if(es.n!=null)
{es.hide();e.n.className="sel";e.hide();}
if(ps.n!=null)
{ps.hide();p.n.className="sel";p.hide();}
if(fts.n!=null)
{fts.hide();ft.hide();}
if(as.n!=null)
{var opt=as.getsign('div',{className:'opt'})[0];var list=take('voclist');var voc=take('vocaf');var mt=take('meshtree');var ndb=numDB;if(typeof prefind!="undefined")
{ndb=numdbf;if(take('i'+dbs[ndb]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[ndb]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[ndb]["alias"];take('currdb').n.className='i'+ndb;}}
if(take('labs_div_'+ndb).n!=null)
{var divarr=take('labs_div_'+ndb).tags('div');if(divarr.length<2)
{take(opt).hide();}
else
take(opt).show();if(parseInt(dbs[ndb].afrubricator,10)>0)
{if(parseInt(dbs[ndb].afrubricator,10)>1)
{if(parseInt(dbs[ndb].afrubricator,10)<4)
{list.hide();take('afalfabet').show();}
else
{list.show();take('afalfabet').hide();}
voc.hide();if(parseInt(dbs[ndb].afrubricator,10)>3)
mt.show();else
mt.hide();}
else
{list.show();voc.hide();take('afalfabet').hide();mt.hide();}}
else
{voc.show();list.hide();take('afalfabet').hide();mt.hide();}}
else
{voc.hide();take('afalfabet').hide();take(opt).hide();list.hide();mt.hide();}
typesearch='authority';as.show();as.getsign('input',{type:'text'})[0].focus();}
break;default:break;}}
else
{if(take('limits_'+numDB).n!=null)
{if(ls.n!=null)
{ls.show();ls.n.className='limits';}
for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
else
{if(ls.n!=null)
{ls.hide();ls.n.className='limits';}}}
if((take('callsearchmap').n!=null)&&(getCurrStyle(take('callsearchmap').n).display!="none"))
{take('callsearchmap').n.className='sel';if(take('searchmap').n!=null)
{take('map_container').n.className='map_hide';if(take('searchmap').n!=null)
take('searchmap').n.className='map_hide';}}
placeLabs();}}
function writeRezult()
{var doc=take('menu1');var but=take('fromaftobibl');if(doc.n!=null)
{if(typeof _savedterms!="undefined")
{var arr=_savedterms.split("[END]");for(var j=0;j<arr.length;j++)
{if(arr[j]!="")
{var term=arr[j].substring(arr[j].lastIndexOf("]")+1);var ind=arr[j].substring(arr[j].indexOf("[ID]")+4,arr[j].indexOf("[LABEL]"));var lab=arr[j].substring(arr[j].indexOf("[LABEL]")+7,arr[j].indexOf("[TERMIN]"));var term=arr[j].substring(arr[j].indexOf("[TERMIN]")+8);term=prepareTerm(term);var o=take(ind).n;o.value=term;var sel=null;if(o.parentNode.previousSibling.className=='opt1')
sel=o.parentNode.previousSibling.previousSibling.firstChild.lastChild;else
sel=o.parentNode.previousSibling.firstChild.lastChild;sel.className="i"+lab;sel.innerHTML=dbs[numDB]["labels"][lab][0];}}}
typevoc=true;if(typeof _expr!="undefined")
take('expr').n.innerHTML=_expr;if((typesearch!="authority")&&(typesearch!="fundholders"))
addVoc(1);if(doc.n.childNodes.length>1)
{doc.show();if(but.n!=null)
but.visualise();}}
showInterface();}
function showInterface()
{if(typesearch=="combined")
return;var obj=take(vocobj).n;var sel=null;var voc=null;if(obj.parentNode.previousSibling.className=='opt1')
sel=obj.parentNode.previousSibling.previousSibling.firstChild.lastChild;else
sel=obj.parentNode.previousSibling.firstChild.lastChild;var labsel="";if(typeof _label!="undefined")
labsel=_label;if((_label=="CMS")||(_label=="CMSEN")||(_label=="AUIDS")||(_label=="ID"))
{labsel=_label=take('labs_div_'+numDB).tags('div')[0].className.substring(1);}
if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB]["labels"][labsel]!="undefined"))
{sel.innerHTML=dbs[numDB]["labels"][labsel][0];sel.className="i"+labsel;if(dbs[numDB]["type"]=='BIBL')
{voc=obj.parentNode.parentNode.previousSibling;if(voc.className=='logcontainer')
voc=voc.previousSibling;if((dbs[numDB]["labels"][labsel][1]=="N")||(labsel=="TEXT"))
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
else
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
if(take('saf').n!=null)
{if(dbs[numDB]["labels"][labsel][2]=="N")
take('saf').n.disabled=true;else
take('saf').n.disabled=false;}}
else
{if(take('authority_search').n!=null)
{var voclist=take('voclist').n;var vocaf=take('vocaf').n;if(dbs[numDB]["labels"][labsel][2]!="N")
{vocaf.className='voc';voclist.className='voc';vocaf.onmousedown=function(){showVoc(this);};voclist.onmousedown=function(){findInAf(take('itemaf').n);};}
else
{vocaf.className='voc disabled';voclist.className='voc disabled';vocaf.onmousedown=function(){return false;};voclist.onmousedown=function(){return false;};}}}}}
function prepareIndxTerms()
{var str="";if(take('menu1').n!=null)
{var arr=take('menu1').tags('code');for(var i=0;i<arr.length;i++)
{str+=arr[i].id+'|'+replaceSymb(arr[i].innerHTML);if(i<arr.length-1)
str+='[END]';}}
return str;}
function prepareSavedTerms(o)
{var arr=take('expand_search').getsign('input',{className:'iLAB'});var str="";for(var i=0;i<arr.length;i++)
{if((arr[i].id!=o)&&(arr[i].value!=""))
{var lab="";if(arr[i].parentNode.previousSibling.className=='opt1')
lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);else
lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);str+='[ID]'+arr[i].id+'[LABEL]'+lab+'[TERMIN]'+convertseef(arr[i].value);if(i<arr.length-1)
str+='[END]';}}
return str;}
function putTerms(o)
{var doc=take('menu1');switch(o.checked)
{case true:if(o.value!="")
{if(take('_'+o.id).n==null)
doc.create('code',{textNode:o.value,id:'_'+o.id});}
if(doc.n.childNodes.length>1)
{doc.show();}
break;case false:if(take('_'+o.id).n!=null)
doc.n.removeChild(take('_'+o.id).n);if(doc.n.childNodes.length<2)
{doc.hide();}
break;default:break;}
addVoc(1);}
function addVoc(num)
{if(typeof num=="undefined")
{if(take('menu1').n.childNodes.length==1)
{alert("Выберите элемент из списка!");return;}}
if(take('menu1').n.childNodes.length>1)
{var obj=take(vocobj).n;if(obj!=null)
obj.value="";var andor=take('andor').n.className;if(take('andor1').n!=null)
andor=take('andor1').n.options[take('andor1').n.selectedIndex].value;var arr=take('menu1').tags('code');for(var i=0;i<arr.length;i++)
{var term=arr[i].innerHTML;if(obj!=null)
{if((vocobj=="itemprof")||(vocobj=="itemaf"))
obj.value+=term;else
obj.value+="'"+prepareTerm(term)+"'";if(i!=(arr.length-1))
obj.value+=' '+andor+' ';}}}}
function showLimits(o)
{if(o.className.indexOf('_')!=-1)
{take(o.className.substring(0,o.className.length-1)+'_'+numDB).hide();o.className=o.className.substring(0,o.className.length-1);}
else
{take(o.className+'_'+numDB).show();o.className=o.className+'_';}}
function Mark(o)
{var arr=take('searchrezult').getsign('input',{name:'marker'});if(o.checked)
{for(var i=0;i<arr.length;i++)
arr[i].checked=true;}
else
{for(var i=0;i<arr.length;i++)
arr[i].checked=false;}}
function Marklist(o)
{var arr=take('tableorder').getsign('input',{type:'checkbox'});if(o.checked)
{for(var i=0;i<arr.length;i++)
{arr[i].checked=true;if(arr[i].id!='mark')
arr[i].parentNode.parentNode.className='checked';}}
else
{for(var i=0;i<arr.length;i++)
{arr[i].checked=false;if(arr[i].id!='mark')
arr[i].parentNode.parentNode.className='unchecked';}}
countList();}
function countList()
{var arr=take('tableorder').getsign('input',{type:'checkbox'});var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].checked==true)
{if(arr[i].id!='mark')
{count++;arr[i].parentNode.nextSibling.innerHTML=count;arr[i].parentNode.parentNode.className="checked";}}
else
{if(arr[i].id!='mark')
{arr[i].parentNode.nextSibling.innerHTML="";arr[i].parentNode.parentNode.className="unchecked";}}}
if(take('marked').n!=null)
take('marked').n.innerHTML=count;}
function closeMenu(e)
{var obj=getSrc(e);var s="";if((obj.parentNode)&&(obj.parentNode==menu)&&(obj.parentNode.className.indexOf('_')!=-1)||(obj.className.indexOf('options')!=-1))
return;if(menu!=null)
{var ld=take(document.body).getsign('div',{className:'options'});for(var i=0;i<ld.length;i++)
take(ld[i]).hide();if(take('bases_container').n!=null)
take('bases_container').hide();if(take('handbook_container').n!=null)
take('handbook_container').hide();if(take('logic_div').n!=null)
take('logic_div').hide();if(take('andor_div').n!=null)
take('andor_div').hide();if(take('voc_div').n!=null)
take('voc_div').hide();if(take('searchdiv').n!=null)
{var arr1=take('searchdiv').getpart(null,'div',{className:'select'});for(var i=0;i<arr1.length;i++)
{if(arr1[i].className.indexOf('_')!=-1)
arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);}}}
if(take('livesearch').n!=null)
take('livesearch').hide();}
document.onmouseup=closeMenu;function showOptions(o,ind)
{var next=null;var par=take(o.parentNode);var s="";var ndb=numDB;var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;if((ind=='logic_div')||(ind=='andor_div'))
{s=1;next=take(ind);}
else if(ind=='voc_div')
{next=take(ind);}
else if(ind=='labs_div')
next=take(ind+'_'+ndb);else if(ind=='fullt_div')
next=take(ind);else if(ind=='handbook')
next=take('handbook_container');else if(ind=='bases_div')
next=take('bases_container');else
next=take(o.parentNode.id+'_opt');var h=par.geth();var w=par.getw();var x=elem_rect.x(par.n);var y=elem_rect.y(par.n)+h;if(par.n.className.indexOf('_')==-1)
{if(next.n.parentNode.nodeName.toLowerCase()!='body')
{x=0;y=h;}
var arr=take(document.body).getpart(null,'div',{className:'options'});for(var i=0;i<arr.length;i++)
{take(arr[i]).hide();}
var arr1=take('searchdiv').getpart(null,'div',{className:'select'});for(var i=0;i<arr1.length;i++)
{if(arr1[i].className.indexOf('_')!=-1)
arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);}
next.show();next.setx(x);next.sety(y);if(typeof ind=="undefined")
next.setw(w);par.n.className=par.n.className+'_';menu=par.n;if(ind=='handbook')
showHBRegions();}
else
{next.hide();par.n.className=par.n.className.substring(0,par.n.className.length-1);menu=null;next=null;}}
function prepareAddQuery(obj)
{var arr=dbs[obj.db].addqueries;var qarr=new Array();var qlist=new Array();var qservice="STORAGE:opacfindd:FindView";var qversion="2.7.0";typework="addqueries";for(var i=0;i<arr.length;i++)
{var term=obj.term;var outfrm=outform;if(typeof dbs[obj.db].outform!="undefined")
outfrm=dbs[obj.db].outform;if(typeof arr[i].addoutform!="undefined")
outfrm=arr[i].addoutform;if(typeof arr[i].addquery!="undefined")
term+=' '+arr[i].addquery;if((typeof arr[i].addservice!="undefined")&&(arr[i].addservice.indexOf('FindSize')!=-1))
{var dbarr=arr[i].addnumber.split(',');qlist.length=0;qlist.push(["_service",arr[i].addservice]);qlist.push(["_version",arr[i].addversion]);qlist.push(["session",numsean]);if(dbarr[0]=='all')
{dbarr=[];for(var x in dbs)
{if((x!=obj.db)&&(!isNaN(parseInt(x,10))))
{dbarr.push(x);}}}
for(var k=0;k<dbarr.length;k++)
{qlist.push(["queryList["+k+"]/iddb",dbarr[k].Trim()]);qlist.push(["queryList["+k+"]/query",term]);}
if(typeof arr[i].addtitle!="undefined")
qlist.push(["$addtitle",arr[i].addtitle]);qarr.push(["querylist",prepareQueryString(qlist,dbarr[0].Trim())]);}
else if((typeof arr[i].addservice!="undefined")&&(arr[i].addservice.indexOf('IndexView')!=-1))
{if((typeof arr[i].addlabel!="undefined")&&(arr[i].addlabel!="")&&(typeof obj.label!="undefined")&&(arr[i].addlabel==obj.label))
{qlist.length=0;var query="";if(typeof arr[i].addquery!="undefined")
query=arr[i].addquery;qlist.push(["_service",arr[i].addservice]);qlist.push(["_version",arr[i].addversion]);qlist.push(["session",numsean]);qlist.push(["iddb",arr[i].addnumber]);qlist.push(["label",arr[i].addlabel]);qlist.push(["length",portion]);qlist.push(["query",query]);qlist.push(["$addlabel",arr[i].addlabel]);if(typeof arr[i].addtitle!="undefined")
qlist.push(["$addtitle",arr[i].addtitle]);qarr.push(["querylist",prepareQueryString(qlist,arr[i].addnumber)]);}}
else
{if((typeof arr[i].addlabel!="undefined")&&(arr[i].addlabel!="")&&(typeof obj.label!="undefined")&&(arr[i].addlabel==obj.label))
{qlist.length=0;qlist.push(["_service",qservice]);qlist.push(["_version",qversion]);qlist.push(["session",numsean]);qlist.push(["iddb",arr[i].addnumber]);qlist.push(["start",0]);qlist.push(["length",portion]);qlist.push(["outformList[0]/outform",outfrm]);qlist.push(["query/body",term]);if(typeof arr[i].addtitle!="undefined")
qlist.push(["$addtitle",arr[i].addtitle]);qlist.push(["$addoutform",outfrm]);qarr.push(["querylist",prepareQueryString(qlist,arr[i].addnumber)]);}}}
if(qarr.length>0)
return qarr;return null;}
function changeData(e)
{if(take('timeordcontainer').n!=null)
take('timeordcontainer').hide();correctVal(e);viewNext();}
function zoomPicture(o)
{var src="";var title="";var fig=take(o).tags('figure')[0];if(fig!=null)
src=fig.firstChild.src;var figc=take(o).tags('figcaption')[0];if(figc!=null)
title='<span>'+figc.innerHTML+'</span>';var arg={};arg.cls='dialog3';arg.message=" ";arg.divframe=1;arg.target=self;showLayerWin('zoomwin',arg);self.frames["zoomwinframe"].document.open();self.frames["zoomwinframe"].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><style type="text/css">img {height: 100% !important;} body {margin:0; padding:0; text-align:center;} span {display:table-cell; vertical-align:middle; text-align:center; font-size:13px; font-family:sans-serif; color: #fff; padding: 10px 10% 10px 10%;} div { display:table; vertical-align:middle; background:rgba(51,51,51,0.7); height:80px; position:absolute; bottom:10px; left:0; width:100%;} span > b {display:block;}</style></head><body><img src="'+src+'"/><div>'+title+'</div></body></html>');self.frames["zoomwinframe"].document.close();}
function preloadImages(imgs)
{var images=[];if(typeof imgs=="string")
images.push(imgs);else
images=imgs;for(i=0;i<images.length;i++)
{img=new Image();img.src=images[i];}}
function getBookInfo()
{if(take('searchrezult').n!=null)
{var arr=take('searchrezult').getsign('input',{className:'isbn'});if((typeof arr!="undefined")&&(arr.length>0))
{var str="";for(var i=0;i<arr.length;i++)
{str+='ISBN'+arr[i].value;if(i<arr.length-1)
str+=',';}
take('searchrezult').create('script',{src:'https://books.google.com/books?jscmd=viewapi&bibkeys='+str+'&callback=bookinfo'});}}}
function bookinfo(x)
{if(typeof x!="undefined")
{for(arg in x)
{var value=x[arg];var arr=take('infor').getsign('cite',{id:arg});for(var i=0;i<arr.length;i++)
{var img=take(arr[i]);if(img.n!=null)
{var par=img.n.parentNode;if(typeof value.thumbnail_url!="undefined")
{value.thumbnail_url=value.thumbnail_url.replace(/zoom=5/ig,'zoom=1');var fig=take(par).create('figure',{tabindex:'1'});fig.create('img',{border:'0',hSpace:'0',vSpace:'0',alt:'',title:'',src:value.thumbnail_url.replace(/\u0026/ig,'&')});par.removeChild(img.n);}
if(typeof value.info_url!="undefined")
{take(par).create('a',{className:'gb',href:value.info_url.replace(/\u0026/ig,'&'),target:'_blank',textNode:'GoogleBooks'});}}}}}}
function showSlidesCont(o)
{var arg={'cls':'dialog2','target':self,'message':'СОДЕРЖАНИЕ','forlinks':'1','divframe':'1'};showLayerWin('slidswin',arg);var arr=take(o).getsign('input',{type:'hidden'});var len=arr.length;var cssrule1='';var cssrule2='';var cssrule3='';var cssrule4='';var slides='';var div=take(document.body).create('div',{id:'slidescont'});div.hide();var styles=div.create('style',{type:'text/css'});var wrapper=div.create('div',{className:'wrapper hidden',id:'wrapper'});var panel=wrapper.create('div',{className:'panel'});div.create('div',{className:'lpanel'});div.create('div',{className:'rpanel'});var t=-40;var t1=-40;var tdelta=10;var h=180;var h1=180;var hdelta=-20;var l=-8;var ldelta=12;var l1=-28;var l1delta=-4;var len1=len;var k=0;for(var i=0;i<len;i++)
{if(i==0)
wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1),checked:'checked'});else
wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1)});panel.create('label',{'for':'slide'+(i+1)});cssrule1+='input:nth-of-type('+(i+1)+'):checked ~ .panel label:nth-child('+(i+1)+'),';cssrule2+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(i+1)+'),';cssrule3+='input:nth-of-type('+(i+1)+'):checked ~ label:nth-of-type('+(i+2)+'),';}
cssrule1+='input:nth-of-type('+len+'):checked ~ .panel label:nth-child('+len+') { background: #333; border-color: #fff; }';cssrule2+='input:nth-of-type('+len+'):checked ~ img:nth-of-type('+len+') { opacity: 1;z-index: '+(len+1)+';transform: scale(1); }';cssrule3+='input:nth-of-type('+len+'):checked ~ label:nth-of-type(1) { z-index: '+(len+1)+'; }';for(var i=0;i<len;i++)
{wrapper.create('img',{src:arr[i].value,className:'ims'});for(var j=i;j<(len-1)+i;j++)
{if((j+2)<=len)
{cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(j+2)+') {top:'+t+'%; left:'+l+'%;height: '+h+'%;z-index:'+len1+';}';t+=tdelta;h+=hdelta;l+=ldelta;}
else
{cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(k+1)+') {top:'+t1+'%; left:'+l1+'%;height: '+h1+'%;z-index:'+len1+';}';t1+=tdelta;h1+=hdelta;l1+=l1delta;k++;}
len1--;}
len1=len;t1=t=-40;h1=h=180;l=-8;l1=-28;k=0;}
for(var i=0;i<len;i++)
{var lab=wrapper.create('label',{'for':'slide'+(i+1)});lab.create('img',{src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='})}
wrapper.n.appendChild(panel.n);styles.n.innerHTML=cssrule1+' '+cssrule2+' '+cssrule3+' '+cssrule4;self.frames["slidswinframe"].document.open();self.frames["slidswinframe"].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><link href="/'+foldername+'/'+foldername+'/css/_additional/slides.css" type="text/css" rel="stylesheet"/><script>function preloadImages(){var arr=document.getElementsByTagName("img"); document.body.removeChild(document.getElementById("loader"));} window.onload=preloadImages;</script></head><body>'+div.n.innerHTML.replace(/checked="checked"/,'checked')+'<div id="loader"><div class="progress"><div></div></div></div></body></html>');self.frames["slidswinframe"].document.close();div.n.parentNode.removeChild(div.n);}
var scrollFloat=function()
{var app={};app.init=function init(node)
{if(node&&node.nodeType==1)
handleWindowScroll(node);};function handleWindowScroll(floatElement)
{var floatElementWrapper=null,realTop=0,deltaTop=0,marginTop=0,marginBottom=0;var addElement=take('main').getpart(null,'div',{id:'infor'})[0];window.onscroll=function()
{var flagpos=getCurrStyle(floatElement).position=="sticky";if(!flagpos)
{if(floatElement.id=='left_frame')
{var floatElementRect=floatElement.getBoundingClientRect(),StopPos=take(document.body).getpart(null,'div',{id:'infor'})[0].getBoundingClientRect().bottom;if(floatElementRect.bottom<StopPos)
{if(floatElementWrapper==null)
{var floatElementStyle=getComputedStyle(floatElement,''),s='';for(var i=0;i<floatElementStyle.length;i++)
{if(floatElementStyle[i].indexOf('overflow')==0||floatElementStyle[i].indexOf('padding')==0||floatElementStyle[i].indexOf('border')==0||floatElementStyle[i].indexOf('outline')==0||floatElementStyle[i].indexOf('box-shadow')==0||floatElementStyle[i].indexOf('background')==0)
{s+=floatElementStyle[i]+': '+floatElementStyle.getPropertyValue(floatElementStyle[i])+'; '}}
floatElementWrapper=document.createElement('div');floatElementWrapper.className="stop";floatElementWrapper.style.cssText=s+' box-sizing: border-box; width: '+floatElement.offsetWidth+'px;';floatElement.insertBefore(floatElementWrapper,floatElement.firstChild);var l=floatElement.childNodes.length;for(var i=1;i<l;i++)
{floatElementWrapper.appendChild(floatElement.childNodes[1]);}
floatElement.style.height=floatElementWrapper.getBoundingClientRect().height+'px';floatElement.style.padding='0';floatElement.style.border='0';}
var floatElementWrapperRect=floatElementWrapper.getBoundingClientRect(),floatElementHeight=floatElementRect.top+floatElementWrapperRect.height,areaHeight=document.documentElement.clientHeight,deltaStop=Math.round(floatElementHeight-StopPos),deltaArea=Math.round(floatElementHeight-areaHeight);if(floatElementWrapperRect.height>areaHeight)
{if(floatElementRect.top<realTop)
{if(take('go-to-top').n!=null)
take('go-to-top').n.className='vis';if(deltaArea+marginBottom>deltaStop)
{if(floatElementWrapperRect.bottom-areaHeight+marginBottom<=0)
{floatElementWrapper.className='sticky';floatElementWrapper.style.top=Math.round(areaHeight-floatElementWrapperRect.height-marginBottom)+'px';deltaTop=Math.round(marginBottom+floatElementRect.top+floatElementWrapperRect.height-areaHeight);marginTop=Math.round(areaHeight-floatElementWrapperRect.height-marginBottom);}}
else
{floatElementWrapper.className='stop';floatElementWrapper.style.top=-deltaStop+'px';deltaTop=deltaStop;}}
else
{deltaTop=Math.round(floatElementRect.top-marginTop);if(floatElementRect.top-marginTop<=0)
{if(floatElementWrapperRect.top-marginTop>=0)
{floatElementWrapper.className='sticky';floatElementWrapper.style.top=marginTop+'px';}
else
{floatElementWrapper.className='stop';floatElementWrapper.style.top=-deltaTop+'px';}}
else
{floatElementWrapper.className='';floatElementWrapper.style.top='';deltaTop=0;if(take('go-to-top').n!=null)
take('go-to-top').n.className='invis';}}
realTop=floatElementRect.top;}
else
{if((floatElementRect.top-marginTop)<=0)
{if(take('go-to-top').n!=null)
take('go-to-top').n.className='vis';if((floatElementRect.top-marginTop)<=deltaStop)
{floatElementWrapper.className='stop';floatElementWrapper.style.top=-deltaStop+'px';}
else
{floatElementWrapper.className='sticky';floatElementWrapper.style.top=marginTop+'px';}}
else
{floatElementWrapper.className='';floatElementWrapper.style.top='';if(take('go-to-top').n!=null)
take('go-to-top').n.className='invis';}}
window.addEventListener('resize',function(){floatElement.children[0].style.width=getComputedStyle(floatElement,'').width},false);}}
else
{if(take('livesearch').n!=null)
take('livesearch').hide();if(pageOffset().y>floatElement.offsetTop)
{take(floatElement).addclass('fixed');floatElement.style.top='0';if(take('go-to-top').n!=null)
{take('go-to-top').delclass('invis');take('go-to-top').addclass('vis');}
var arr=take(document.body).getpart(null,'div',{className:'options'});for(var i=0;i<arr.length;i++)
{take(arr[i]).hide();}
var arr1=take(document.body).getpart(null,'div',{className:'select'});for(var i=0;i<arr1.length;i++)
{if(arr1[i].className.indexOf('_')!=-1)
arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);}
if(take('header').n!=null)
{take('header').addclass('invis');}
if(take('search_head_layer').n!=null)
{take('search_head_layer').addclass('invis');}
if(take('tab_to_switch_search').n!=null)
{take('tab_to_switch_search').addclass('invis');}}
else
{take(floatElement).delclass('fixed');floatElement.style.top='';if(take('go-to-top').n!=null)
{take('go-to-top').delclass('vis');take('go-to-top').addclass('invis');}
if(take('header').n!=null)
{take('header').delclass('invis');}
if(take('search_head_layer').n!=null)
{take('search_head_layer').delclass('invis');}
if(take('tab_to_switch_search').n!=null)
{take('tab_to_switch_search').delclass('invis');}}}}
else
{if(pageOffset().y>addElement.offsetTop)
{take(floatElement).addclass('wscroll');if(take('go-to-top').n!=null)
{take('go-to-top').delclass('invis');take('go-to-top').addclass('vis');}
var arr=take(document.body).getpart(null,'div',{className:'options'});for(var i=0;i<arr.length;i++)
{take(arr[i]).hide();}
var arr1=take(document.body).getpart(null,'div',{className:'select'});for(var i=0;i<arr1.length;i++)
{if(arr1[i].className.indexOf('_')!=-1)
arr1[i].className=arr1[i].className.substring(0,arr1[i].className.length-1);}
if(take('header').n!=null)
{take('header').addclass('invis');}
if(take('search_head_layer').n!=null)
{take('search_head_layer').addclass('invis');}
if(take('tab_to_switch_search').n!=null)
{take('tab_to_switch_search').addclass('invis');}}
else
{take(floatElement).delclass('wscroll');if(take('go-to-top').n!=null)
{take('go-to-top').delclass('vis');take('go-to-top').addclass('invis');}
if(take('header').n!=null)
{take('header').delclass('invis');}
if(take('search_head_layer').n!=null)
{take('search_head_layer').delclass('invis');}
if(take('tab_to_switch_search').n!=null)
{take('tab_to_switch_search').delclass('invis');}}}};}
return app;}();function goToTop()
{var t,s;s=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;t=setInterval(function(){if(s>0)window.scroll(0,s-=50);else clearInterval(t)},50);}
function KeyPress(e)
{var Src=getSrc(e);var Key=getCode(e);if(Key==13)
{if(Src.nodeName.toLowerCase()=='input')
{if(Src.id=='iCA')
searchFundHolders();else if(Src.id=='mylib')
findMyLibrary();else if(Src.id=='itemaf')
findInAf();else if(Src.id=='itemfulltxt')
fulltextSearch();else if(Src.id=='password')
doAuthorization();else if(Src.id=='readercode2')
doRegistration();else
{if((Src.id=='itemsimple')||(Src.parentNode.className=="itemcombined")||(Src.id=='itemprof')||(Src.id=='item0')||(Src.id=='item1')||(Src.id=='item2'))
simpleSearch();else
return;}
return false;}}
else if(Src.id=="itemsimple")
{if(numDB!="all")
{var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;var mark=take('itemsimple').n.parentNode.previousSibling.firstChild.lastChild.className.substring(1);if((typeof dbs[db]["labels"][mark]!="undefined")&&(dbs[db]["labels"][mark][1]=="Y"))
livesearch();}}
else if(Src.parentNode.className=="itemcombined")
{typesearch="combined";livesearch(Src);}
else
return;}
function setElastic(o)
{var n=take(o.parentNode).getsign('div',{className:'elastic'})[0];var v=o.value;v=v.replace(/\n/g,'<br/>');n.innerHTML=v+'&nbsp;';var h=n.scrollHeight;if(h>100)
{o.style.height=h+'px';}
else
o.style.height='100px';}
function loadFreeUrl(o,url,rdb)
{if(url.indexOf('/reg?WW=')!=-1)
{var arg={'cls':'dialog2','target':self,'message':'Номер читательского билета:','width':'400','height':'250'};showLayerWin('elwin2',arg);var doc=take('elwin2div');doc.n.innerHTML="Переход возможен только для читателей зарегистрировавших свою электронную почту";var frm=doc.create('form',{style:{width:'100%',height:'100%',textAlign:'center',background:'fafaf1'}});var div=frm.create('div',{style:{padding:'20px'}});var div1=frm.create('div');div.create('input',{type:'text',id:'chelreadercode',value:'',style:{width:'200px',padding:'5px'}});div1.create('input',{type:'button',value:'Перейти',onclick:'function() {doLoadFreeUrl(\''+o+'\',\''+url+'\',\''+rdb+'\');}',style:{padding:'5px',margin:'0 5px'}});div1.create('input',{type:'button',value:'Закрыть',onclick:'function() {delLayerWin(\'elwin2\');}',style:{padding:'5px',margin:'0 5px'}});}
else
{doLoadFreeUrl(o,url,rdb);}}
function doLoadFreeUrl(o,url,rdb)
{typework="";var html="url";var FUcode="";var elementFU=take('chelreadercode');if(elementFU&&elementFU.n)
FUcode=elementFU.n.value;if(url.indexOf('/reg?WW=')!=-1)
{html="url1";if(FUcode=="")
{alert('Введите код читателя!');return;}}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html",html]);gArr.push(["_errorhtml","error1"]);querylist.push(["_service","STORAGE:opacholdd:Edd"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);var db=numDB;if(typeof rdb!="undefined")
{db=rdb;}
querylist.push(["iddb",db]);querylist.push(["idbr",replaceSymb(o)]);querylist.push(["$docurl",url]);querylist.push(["$numsean",numsean]);querylist.push(["$identif",identif]);if(FUcode!="")
{querylist.push(["$FU",FUcode]);delLayerWin('elwin2');}
querylist.push(["idEd",url]);querylist.push(["mode","STATIST_ONLINE"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr,"_blank");}
function delTWin(o,c)
{if(typeof c=="undefined")
{var ind=o.parentNode.lastChild.getAttribute("data-index");if((ind!="")&&(ind!=null))
{if(take(ind).n!=null)
{if(take(ind).n.checked)
take(ind).n.checked=false;}}}
o.parentNode.parentNode.removeChild(o.parentNode);}
function switchTypeSearch(o)
{var cont=take(document.body);var inp1=take('bs').getsign('input',{'name':'query'})[0];var inp2=take('itemsimple').n;if(o.className=='opac')
{if(cont.hasclass('body_discovery'))
cont.delclass('body_discovery');cont.addclass('body_opac');if(inp1!=null)
{if(inp2!=null)
{numDB=numdbBIBL;typework="search";typesearch="simple";editqueryflag=false;switchSearch("simple");if(take('currdb').n!=null)
{var currdb=take('currdb').n;if(currdb.nodeName.toLowerCase()=="span")
{currdb.innerHTML=dbs[numDB]["alias"];currdb.className='i'+numDB;}}
var lab=take('labs_div_'+numDB).n.firstChild.className.substring(1);var span=take('simple_search').tags('span')[0];span.className="i"+lab;span.innerHTML=dbs[numDB]["labels"][lab][0];if(inp1.value!="")
{_bibliostring="";inp2.value=inp1.value;}}}}
else
{if(cont.hasclass('body_opac'))
cont.delclass('body_opac');cont.addclass('body_discovery');if(inp1!=null)
{if((typeof _bibliostring!="undefined")&&(_bibliostring!=""))
{inp1.focus();inp1.value=_bibliostring;take(inp1).initevent('input');take(inp1).initevent('change');}}}}
function copySearchToClip(o)
{var term=o.parentNode.firstChild.value;var showstr=_showstr.replace(/\<i\>/gi,'');showstr=showstr.replace(/\<\/i\>/gi,'');var tmp=convertlinksearchstr(_str);var str='&query='+encodeVal(prepareTerm(tmp))+'&querytext='+encodeVal(showstr);term=term+''+str;o.parentNode.firstChild.value=term;o.parentNode.firstChild.select();try
{if(document.execCommand("copy"))
{alert('Ссылка скопирована в буфер обмена');}}
catch(e)
{alert('Не удалось скопировать адрес ссылки в буфер обмена');}}
function mailSendToEBA()
{if((take('mail').n.value=="")||(take('subject').n.value=="")||(take('fio').n.value==""))
{alert("Вы не заполнили все поля или заполнили их неправильно!");return;}
var readermail=(take('mail').n!=null)?take('mail'):null;var subj=(take('subject').n!=null)?take('subject').n.value:null;var fio=(take('fio').n!=null)?take('fio').n.value:null;fio="\n\n"+fio;var mess=(take('itbody').n!=null)?take('itbody').n.value:null;var gArr=new Array();gArr.push(["_from",readermail.n.value]);gArr.push(["_answer","ok"]);gArr.push(["_subject",subj]);gArr.push(["_body",fio+"\n"+subj+"\n"+mess+"\n\n"]);ajaxToRCP(gArr,msendedOK,"/opacg/html/circle/php/mail.php");readermail=subj=fio=mess=null;}
function msendedOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var answere=take('answere').n.value;var msg="";var callback='reAnswere';if(take('msg').n!=null)
msg=take('msg').n.value;if(take('callback').n!=null)
callback=take('callback').n.value;var arg={'cls':'dialog2','message':msg,'width':'500','height':'400'};arg.dispatcher=callback;showLayerWin('confirmwin',arg);var doc=take('confirmwinform');doc.n.innerHTML="";doc.create('div',{textNode:answere,className:'red',style:{margin:'50px 10px 0px 10px',fontSize:'140%',textAlign:'center'}});setTimeout(eval(callback),1000);}}
function ieslider(o)
{if(document.all&&!document.addEventListener)
{var ind=o.id;switch(ind)
{case'lab1':take('slider1').visualise();take('lab3').visualise();take('slider2').conceal();take('slider3').conceal();take('lab1').conceal();take('lab2').conceal();take('lab4').conceal();break;case'lab2':take('slider2').visualise();take('lab4').visualise();take('lab1').visualise();take('slider1').conceal();take('slider3').conceal();take('lab3').conceal();take('lab2').conceal();break;case'lab3':take('slider2').visualise();take('lab4').visualise();take('lab1').visualise();take('slider1').conceal();take('slider3').conceal();take('lab3').conceal();take('lab2').conceal();break;case'lab4':take('slider3').visualise();take('lab2').visualise();take('slider2').conceal();take('slider1').conceal();take('lab1').conceal();take('lab3').conceal();take('lab4').conceal();break;case'lab5':take('slider4').visualise();take('lab6').visualise();take('slider2').conceal();take('slider1').conceal();take('slider3').conceal();take('lab1').conceal();take('lab3').conceal();take('lab4').conceal();break;default:break;}}
else
return;}
function initnum()
{var arr=take(document.body).getsign('td',{className:'num'});for(var j=0;j<arr.length;j++)
{if((j%2)==0)
arr[j].parentNode.className="g";else
arr[j].parentNode.className="w";take(arr[j]).text(parseInt(arr[j].parentNode.previousSibling.firstChild.firstChild.nodeValue)+1);}}
function seeAddS(o)
{var doc=o.nextSibling;if(doc.style.display=="none")
{o.className=(o.className=='seeadd')?'seeaddaktive':'seeaddaktive1';doc.style.display="";}
else
{o.className=(o.className=='seeaddaktive')?'seeadd':'seeadd1';doc.style.display="none";}}
function findImages()
{var arr=take('infor').getsign('input',{'name':'img'});if(arr.length>0)
preloadImages(arr);}
function getCookies(thecookiename)
{var cookies=false;var all=document.cookie;if(all==="")
return cookies;else
{var list=all.split("; ");for(var i=0;i<list.length;i++)
{var cookie=list[i];var name=cookie.substring(0,cookie.indexOf("="));if(name==thecookiename)
{cookies=true;break;}}
return cookies;}}
var modules={"annotation":{"directory":"af"},"annotshort":{"directory":"af"},"letter":{"directory":"af"},"tree":{"directory":"af"},"bookrating":{"directory":"bookrating/_additional"},"bookrating.html":{"directory":"bookrating/_ratings"},"ebookrating":{"directory":"ebookrating/_additional"},"ebookrating.html":{"directory":"ebookrating/_ratings"},"ebs":{"directory":"ebs"},"LAN":{"directory":"ebs"},"findlib":{"directory":"fundholders"},"sigla":{"directory":"fundholders"},"alllists":{"directory":"privat/list"},"list":{"directory":"privat/list"},"print_orders.xsl":{"directory":"list/xsl"},"libcard":{"directory":"privat/orders"},"order":{"directory":"privat/orders"},"personstat":{"directory":"privat/stat"},"stataddindivid":{"directory":"privat/stat"},"statdigit":{"directory":"privat/stat"},"statindivid":{"directory":"privat/stat"},"statindividadd":{"directory":"privat/stat"},"statindividaddwide":{"directory":"privat/stat"},"reg":{"directory":"privat/_additional"},"readerhistory":{"directory":"readerhistory"},"add":{"directory":"search"},"addrepo":{"directory":"search"},"allbases":{"directory":"search"},"archiv":{"directory":"search"},"collection":{"directory":"search"},"culture":{"directory":"search"},"fulltext":{"directory":"search"},"history":{"directory":"search"},"search":{"directory":"search"},"voc":{"directory":"search"},"all_collections":{"directory":"search/_additional"},"calendar":{"directory":"search/_additional"},"find":{"directory":"search/_additional"},"newrecs":{"directory":"search/_additional"},"newssite":{"directory":"search/_additional"},"newssiteadd":{"directory":"search/_additional"},"photos":{"directory":"search/_additional"},"photosadd":{"directory":"search/_additional"},"photoslist":{"directory":"search/_additional"},"publications":{"directory":"search/_additional"},"publicationsadd":{"directory":"search/_additional"},"publicationslist":{"directory":"search/_additional"},"seo_authors":{"directory":"search/_additional"},"seo_records":{"directory":"search/_additional"},"structure":{"directory":"search/_additional"},"":{}};var pages={"bookrating":{"directory":"bookrating","name":"Популярное","mapping":"text","display":"yes"},"ebookrating":{"directory":"ebookrating","name":"Популярные электронные книги","mapping":"text","display":"yes"},"news":{"directory":"news","name":"НОВОСТИ","mapping":"text","display":"yes"},"about":{"directory":"about","name":"О БИБЛИОТЕКЕ","mapping":"text","display":"yes"},"help":{"directory":"help","name":"Помощь","mapping":"text","display":"yes"},"index":{"directory":"index","name":"Главная","mapping":"image","display":"no"},"privat":{"directory":"privat","name":"Авторизация","mapping":"text","display":"yes"}};function doAuthorization(l,p)
{var curDate=new Date();if(typeof l!="string")
l=take('login').n.value;if(typeof p!="string")
p=take('password').n.value;if((l=="")||(p==""))
{alert("Вы не заполнили все поля или заполнили их неправильно!");return;}
typework="authorization";var gArr=new Array();var querylist=new Array();gArr.push(["_logintype","LOGIN"]);gArr.push(["_login",trimSpaces(l.toUpperCase())]);gArr.push(["_password",trimSpaces(p)]);gArr.push(["_auth",curDate.getTime()]);gArr.push(["_userinfo","yes"]);if(typeof _str!="undefined")
{var str=_str;gArr.push(["_showsearchrez","yes"]);if(take('change_search_string').n!=null)
str='[bracket]ID '+take('change_search_string').n.value+'[/bracket]';if(lockedfilters!="")
{var bstr="";farr=[];farr=lockedfilters.split('[END]');for(var i=0;i<farr.length;i++)
{if(i>0)
bstr+=' AND ';var val=convertseef(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+val+'[apos][/bracket]';}
str='[bracket]'+str+'[/bracket] AND '+convertseef(bstr);}
gArr.push(["_str",str]);if(typeof _showstr!="undefined")
gArr.push(["_showstr",_showstr]);if(typeof _iddb!="undefined")
gArr.push(["_iddb",_iddb]);}
callToRCP(gArr,"_self",'/'+foldername+'/');}
function openRegistrWin(x,arg)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var isn="";var tmp=/^0\s*/;if(tmp.test(answere))
{isn=answere.substring(answere.lastIndexOf(' ')+1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg2",""]);gArr.push(["arg4","USER"]);gArr.push(["arg5","REA"]);gArr.push(["arg6",isn]);gArr.push(["arg8","FDT_SPACE"]);ajaxToRCP(gArr,openRegistrWinOk,null,null,null,arg);}
else
{var error={};error._message_0=answere;error._action_1="";delLayerWin();WriteError(error);}}}
function openRegistrWinOk(x,obj)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var doc=take('loaderwinform');var arr=answere.split('[END]');var text1="";var mail="";var ep="";var log="";for(var i=0;i<arr.length;i++)
{if(arr[i].substring(0,3)=='AO:')
{text1=arr[i].substring(3);}
if(arr[i].substring(0,3)=='AY:')
{log=arr[i].substring(3);if((typeof obj!="undefined")&&(obj!=null)&&(obj!='0'))
obj.log=log;}
if(arr[i].substring(0,3)=='AI:')
{mail=arr[i].substring(3);}
if(arr[i].substring(0,3)=='EP:')
{ep=arr[i].substring(3);}}
delLayerWin();if(typeof obj=="object")
_typereg=obj._typereg;if(typeof _typereg=="undefined")
{var arg={};arg.cls='dialog2';arg.target=self;arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var text2=take('reganswere').n.value;var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:text1});p.text(text2);}
else if(_typereg=="regform")
{sendConfirm(text1,mail,obj);}
else if(_typereg=="_promo")
{if(typeof prolongSign!="undefined")
prolongSign(ep);}
else
{if(typeof sendBill!="undefined")
sendBill(text1,mail);}}}
function sendConfirm(fio,mail,obj)
{var log="";if(take('AY').n!=null)
log=take('AY').n.value;if(typeof obj=="object")
log=obj.log;var pass="";if(take('readercode').n!=null)
pass=take('readercode').n.value;if(typeof obj=="object")
pass=obj.pass;var gArr=new Array();gArr.push(["_to",mail]);gArr.push(["_subject","Подтверждение регистрации"]);gArr.push(["_fio",fio]);gArr.push(["_body","\nЗдравствуйте, "+fio+". Вы успешно зарегистрировались в системе.\nВаши регистрационные данные для входа в электронный каталог:\nЛогин: "+log+", Пароль: "+pass+". Для получения читательского билета обратитесь в Отдел регистрации Библиотеки.\n\n"]);ajaxToRCP(gArr,confirmsendedOK,"/opacg/html/circle/php/mail.php",null,null,fio);}
function confirmsendedOK(x,fio)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:fio});p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслано подтверждение регистрации.');}}
function showHistory()
{if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A")&&(typeof _auth!="undefined"))
{typework="history";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["history"].directory+'/history.php']);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);querylist.push(["$fio",AO]);if((typeof repointerface!="undefined")&&(typeof mmenu!="undefined")&&(typeof mmenu["058"]!="undefined"))
{querylist.push(["$repoauthor","yes"]);if((typeof AL!="undefined")&&(AL!="")&&(AL!="N/A"))
querylist.push(["$profile",AL]);}
if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["$typework",typework]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
else
{goToLocation('history');}}
function myHands()
{if(flag45)
{var arg={'cls':'dialog2','message':'КНИГИ НА РУКАХ','target':self,'callback':'callmyHands',callbackname:'Искать','width':'400','height':'250'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('b',{textNode:'Код читателя'});cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});}
else
{callmyHands();}}
function callmyHands()
{typework="privat";var handler=modules["order"].directory+'/libcard.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);var fio="";if(typeof _fio!="undefined")
fio=_fio;var code=""
if(flag45)
{if((take('icdr').n!=null)&&(take('icdr').n.value!=""))
code=take('icdr').n.value;else
{alert('Введите код!');return;}}
else
{if(typeof AO!="undefined")
fio=AO;if(typeof FU!="undefined")
code=FU;}
querylist.push(["code",code]);querylist.push(["formBibl",'GIVEFORM']);querylist.push(["$fio",fio]);querylist.push(["$reader",code]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function prolong()
{typework="";var arg={'cls':'dialog2','message':'ПРОДЛИТЬ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:ToProlong"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["status",'PROLONG']);var arr=take('searchrezult').getsign('input',{type:'checkbox'});var count=0;var adb="";for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{querylist.push(["codeDoc["+count+"]",arr[i].value]);count++;}}
if(count==0)
{alert('Выберите документ!');return;}
if(confirm('Изменить дату возврата?'))
{querylist.push(["groupBooks","false"]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);showLayerWin('orderwin',arg);ajaxToRCP(gArr,prolongOK);}}
function prolongOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{take('orderwinform').n.innerHTML='<div class="acenter">Дата возврата изменена.</div>';if(typeof _reader!="undefined")
take('orderwinform').n.innerHTML+='<input type="hidden" id="icdr" value="'+_reader+'"/>';setTimeout('callmyHands()',1000);}}
function printClaim()
{if(printTab())
{var arg={'cls':'dialog2','message':'ПЕЧАТЬ ТРЕБОВАНИЙ','target':self,'callback':'printClaimStart',callbackname:'Печать','width':'400','height':'300'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});var div1=cont.create('div',{className:'mt10x'});var div2=cont.create('div',{className:'mt5x mb20x'});div1.create('span',{textNode:'Код читателя:',className:'redstar'});var icdr=div1.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});div2.create('span',{textNode:'Место выдачи:'});div2.create('input',{type:'text',maxLength:25,value:'',id:'icdr1',name:'icdr1'});cont.create('i',{textNode:'Обязательно к заполнению',className:'redstar'});icdr.n.focus();}}
function printClaimStart()
{if(take('icdr').n.value!="")
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["code",take('icdr').n.value]);if(take('icdr1').n.value!="")
querylist.push(["$place",take('icdr1').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackprintClaim);}
else
{alert('Не введен код');return;}}
function callbackprintClaim(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError();}
else
{var code="";var fio="";if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
{if(typeof response[0]._reader_0._visitor_0!="undefined")
{var arr=response[0]._reader_0._visitor_0;for(var i=0;i<arr.length;i++)
{if(arr[i].indexOf('FU:')!=-1)
{code=arr[i].substring(arr[i].indexOf('FU:')+3);}
if(arr[i].indexOf('AO:')!=-1)
{fio=arr[i].substring(arr[i].indexOf('AO:')+3);}}
if(code!="")
{typework="";var year=curDate.getFullYear();var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var hour=(curDate.getHours()<10)?'0'+(curDate.getHours()):curDate.getHours();var minut=(curDate.getMinutes()<10)?'0'+(curDate.getMinutes()):curDate.getMinutes();var second=(curDate.getSeconds()<10)?'0'+(curDate.getSeconds()):curDate.getSeconds();var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/privat/list/xsl/print_orders.xsl"]);gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","3.0.0"]);var sess=numsean;if((take('realnsean').n!=null)&&(take('realnsean').n.value!=""))
sess=take('realnsean').n.value;querylist.push(["session",sess]);querylist.push(["outform","REQUEST"]);querylist.push(["mode","view"]);querylist.push(["sortBy","NOTHING"]);querylist.push(["sortDirect","asc"]);querylist.push(["$height",window.innerHeight-200]);querylist.push(["$code",code]);querylist.push(["$fio",fio]);querylist.push(["$date",day+'.'+month+'.'+year]);querylist.push(["$time",hour+':'+minut+':'+second]);if(typeof _place!="undefined")
querylist.push(["$place",_place]);var arr=take('tableorder').getsign('input',{name:'marker'});var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].checked)
{querylist.push(["query["+count+"]/id",arr[i].value]);querylist.push(["query["+count+"]/db",arr[i].className]);count++;}}
if(count==0)
{alert('Не выбраны записи!');return false;}
if(take('excel').n!=null)
take('excel').n.parentNode.removeChild(take('excel').n);var arg={'cls':'dialog2','target':self,'message':'ПЕЧАТЬ ТРЕБОВАНИЙ','divframe':'1','forlinks':'1'};delLayerWin();showLayerWin('recordswin',arg);self.frames["recordswinframe"].document.open();self.frames["recordswinframe"].document.close();gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr,self.frames["recordswinframe"],"/cgiopac/opacg/settings.exe");}
else
WriteError();}
else
WriteError();}
else
WriteError();}}
function toOrderList(ind)
{typework="";var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","add"]);querylist.push(["outform","ORDERFORM"]);var count=0;if(typeof ind!="undefined")
{querylist.push(["query[0]/db",numDB]);querylist.push(["query[0]/id",ind]);count++;}
else
{var arr=take('searchrezult').getsign('input',{name:'marker'});for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{querylist.push(["query["+count+"]/db",numDB]);querylist.push(["query["+count+"]/id",prepareStr(arr[i].value)]);count++;}}}
if(count==0)
{alert('Не выбраны записи!');return;}
showLayerWin('orderwin',arg);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);ajaxToRCP(gArr,createMess);}
function createMess(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var str='';if(parseInt(response[0]._new)>0)
str+='<div class="mess">Добавлено записей: <b>'+response[0]._new+'</b>.</div>';else
str+='<div class="mess">Документ уже добавлен в список.</div>';str+='<div class="mess">Текущий размер списка: <b>'+response[0]._total+'</b>.</div>';str+='<div class="mess">Для просмотра  выбранных записей выберите пункт меню<br/><b>&laquo;СПИСОК ЛИТЕРАТУРЫ&raquo;</b>.</div><br/>';take('orderwinform').n.innerHTML=str;setTimeout('delLayerWin()',1000);}}
function showOrderList(c,s)
{typework="privat";var liststartfrom=0;var listhowmuch=portion;if(s==null)
s=numsean;if(take('portionlist').n!=null)
listhowmuch=take('portionlist').n.options[take('portionlist').n.selectedIndex].value;if(c!=null)
liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["list"].directory+'/list.php']);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",s]);querylist.push(["$session",s]);querylist.push(["mode","view"]);querylist.push(["outform","ORDERFORM"]);querylist.push(["$liststartfrom",liststartfrom]);querylist.push(["length",listhowmuch]);querylist.push(["$length",listhowmuch]);querylist.push(["sortBy","NOTHING"]);querylist.push(["start",liststartfrom]);if((typeof repointerface!="undefined")&&(typeof mmenu!="undefined")&&(typeof mmenu["058"]!="undefined"))
{querylist.push(["$repoauthor","yes"]);if((typeof AL!="undefined")&&(AL!="")&&(AL!="N/A"))
querylist.push(["$profile",AL]);}
var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
querylist.push(["$fio",fio]);if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["sortDirect","asc"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function showAllLists(c)
{typework="privat";numDB=numdbBIBL;var liststartfrom=0;var listhowmuch=portion;if(c==null)
liststartfrom='';else
liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["alllists"].directory+'/alllists.php']);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","list"]);querylist.push(["outform","ORDERFORM"]);querylist.push(["length",listhowmuch]);querylist.push(["$length",listhowmuch]);querylist.push(["sortDirect","desc"]);querylist.push(["start",liststartfrom]);if((typeof repointerface!="undefined")&&(typeof mmenu!="undefined")&&(typeof mmenu["058"]!="undefined"))
{querylist.push(["$repoauthor","yes"]);if((typeof AL!="undefined")&&(AL!="")&&(AL!="N/A"))
querylist.push(["$profile",AL]);}
var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
querylist.push(["$fio",fio]);if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["$liststartfrom",liststartfrom]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function ordersSearch2()
{var arg={'cls':'dialog2','message':'Список заказов','target':self,'callback':'openListOfOrders',callbackname:'Искать','width':'500','height':'400'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('span',{textNode:'Дата выполнения заказа'});cont.create('span',{className:'from',textNode:' с '});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});cont.create('br',{clear:'all'});cont.create('br',{clear:'all'});cont.create('span',{className:'to',textNode:' по '});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});if(flag45)
{var div=cont.create('div');div.create('b',{textNode:'Код читателя'});var icdr=div.create('input',{type:'text',tabIndex:'1',maxLength:25,value:'',id:'icdr',name:'icdr'});if((typeof extra!="undefined")&&(extra!="")&&(extra!="OFF"))
{var div2=cont.create('div');div2.create('b',{textNode:'или Дополнительный критерий'});div2.create('input',{type:'text',tabIndex:'2',maxLength:25,value:'',id:'iextra',name:'iextra'});}
if((typeof password!="undefined")&&(password!="")&&(password!="OFF"))
{var div1=cont.create('div');div1.create('b',{textNode:'Пароль'});div1.create('input',{type:'password',tabIndex:'2',maxLength:25,value:'',id:'ipassword',name:'ipassword'});}
icdr.n.focus();}}
function openListOfOrders()
{typework="privat";var loggin=identif.toLowerCase();var fio="";if(flag45)
{if(take('icdr').n.value!="")
loggin=take('icdr').n.value;else
{alert('Введите код читателя!');return;}}
else
{loggin=eval(login);if(typeof AO!="undefined")
fio=AO;}
var ty1=take('y1').n.value;var tm1=take('m1').n.value;var td1=take('d1').n.value;var ty2=take('y2').n.value;var tm2=take('m2').n.value;var td2=take('d2').n.value;var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;if(inputdata2<inputdata1)
{alert('Неверно задан временной интервал!');}
else
{var handler=modules["order"].directory+'/order.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);if((typeof login!="undefined")&&(typeof AY!="undefined")&&(login=="AY"))
querylist.push(["login",loggin.toUpperCase()]);else if((typeof login!="undefined")&&(typeof ET!="undefined")&&(login=="ET"))
querylist.push(["codenlr",loggin]);else
querylist.push(["reader",loggin]);querylist.push(["date[0]",inputdata1]);querylist.push(["date[1]",inputdata2]);querylist.push(["$date0",inputdata1]);querylist.push(["$date1",inputdata2]);querylist.push(["$reader",loggin]);querylist.push(["$fio",fio]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}}
function ordersSearch()
{typework="privat";if(typeof repointerface!="undefined")
{showOrderList();}
else
{flag45=findFlag45();if(flag45)
{ordersSearch2();}
else
{if(typeof flagUnload!="undefined")
flagUnload=null;var inputdata1=Year+''+mm+''+dd;var handler=modules["order"].directory+'/order.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);if((typeof login!="undefined")&&((login!="FU")||(login=="FU")&&(typeof FU!="undefined")))
{var loggin=identif.toLowerCase();if(typeof _reader!="undefined")
loggin=_reader;else
loggin=eval(login);if(login=="AY")
querylist.push(["login",loggin.toUpperCase()]);else if(login=="ET")
querylist.push(["codenlr",loggin]);else
querylist.push(["reader",loggin]);}
else
{alert('Операция невозможна для данного пользователя');return;}
querylist.push(["date[0]",inputdata1]);querylist.push(["date[1]",inputdata1]);querylist.push(["$date0",inputdata1]);querylist.push(["$date1",inputdata1]);querylist.push(["$reader",loggin]);if(typeof AO!="undefined")
querylist.push(["$fio",AO]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}}}
function listPrint()
{if(printTab())
window.print();}
function loadWord()
{typework="";if(printTab())
{var str=take('excel').n.innerHTML;var head='<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ЗАКАЗ</title></head><body>';str=head+str+'</body></html>';var gArr=new Array();gArr.push(["_action","export"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_numsean",numsean]);gArr.push(["_ext",".rtf"]);gArr.push(["_mode","screen"]);gArr.push(["_text",str]);callToRCP(gArr);}}
function printTab()
{var div;if(take('excel').n==null)
div=take(document.body).create('div',{id:'excel'});else
div=take('excel');div.n.innerHTML="";countList();var tab=div.create('div',{id:'tabord'});var head=tab.create('div',{style:{textAlign:'center',fontWeight:'bold'},textNode:'Список литературы'});var cont=tab.create('ol');var elem=take('tableorder').n;var arr=elem.childNodes[1].childNodes;var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].className=='checked')
{var text=arr[i].childNodes[2].innerText||arr[i].childNodes[2].textContent;cont.create('li',{textNode:text});count++;}}
if(count==0)
{alert('Не выбраны записи!');return false;}
return true;}
function listDel()
{typework="";var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","clear"]);var arr=take('tableorder').getsign('input',{type:'checkbox'});var count=0;var adb="";for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{adb=arr[i].className;querylist.push(["query["+count+"]/db",adb]);numDB=adb;querylist.push(["query["+count+"]/id",arr[i].value]);count++;}}
if(count==0)
{alert('Не выбраны записи!');return;}
if(confirm('Удалить выбранные записи?'))
{showLayerWin('orderwin',arg);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);ajaxToRCP(gArr,delMess);}}
function delMess(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var str='';str+='<div class="mess">Операция успешно завершена.</div><br/>';take('orderwinform').n.innerHTML=str;setTimeout('showOrderList()',1000);}}
function closeSession()
{goToLocation('close');}
function myBooks()
{var arg={'cls':'dialog2','target':self,'message':'ИСТОРИЯ ВЫДАЧ','callback':'callReaderHistory','callbackname':'Показать','width':'500','height':'400'};showLayerWin('recordswin',arg);var doc=take('recordswinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('span',{textNode:'Дата выполнения заказа'});cont.create('span',{className:'from',textNode:' с '});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});cont.create('br',{clear:'all'});cont.create('br',{clear:'all'});cont.create('span',{className:'to',textNode:' по '});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});if(flag45)
{cont.create('b',{textNode:'Код читателя'});var icdr=cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});icdr.n.focus();}}
function callReaderHistory()
{var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;var code="";if(inputdata2<inputdata1)
{alert('Неверно задан временной интервал!');return;}
if(flag45)
{if(take('icdr').n.value!="")
code=take('icdr').n.value;else
{alert('Введите код читателя!');return;}}
else
{code=FU;}
typework="";delLayerWin();var arg={'cls':'dialog2','target':self,'message':'История выдач','divframe':'1','forlinks':'1'};showLayerWin('recordswin',arg);self.frames["recordswinframe"].document.open();self.frames["recordswinframe"].document.close();trg=self.frames["recordswinframe"];var gArr=new Array();gArr.push(["_inputdata1",inputdata1]);gArr.push(["_inputdata2",inputdata2]);gArr.push(["_code",code]);gArr.push(["_height",window.innerHeight-200]);callToRCP(gArr,trg,pathhtml+'/_modules/readerhistory/readerhistory.php');}
function callBookRating()
{var ifr=null;if(take('nframe').n!=null)
ifr=take('nframe');else
ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0',marginWidth:'0',border:'0',style:{margin:'0px',padding:'0px',width:'1px',height:'1px'},id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;idoc.open();idoc.close();ifr.n.src=pathhtml+'/_modules/bookrating/_additional/bookrating.php';var arg={};arg.cls='loader';showLayerWin('loader1win',arg);}
function callEBookRating()
{var ifr=null;if(take('nframe').n!=null)
ifr=take('nframe');else
ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0',marginWidth:'0',border:'0',style:{margin:'0px',padding:'0px',width:'1px',height:'1px'},id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;idoc.open();idoc.close();ifr.n.src=pathhtml+'/_modules/ebookrating/_additional/ebookrating.php';var arg={};arg.cls='loader';showLayerWin('loader1win',arg);}
function findInLocal()
{typework="authorization";var gArr=new Array();var querylist=new Array();gArr.push(["_logintype","LOGIN"]);gArr.push(["_login",(take('AY').n.value).toUpperCase()]);gArr.push(["_password",take('readercode').n.value]);gArr.push(["_iddb",_iddb]);gArr.push(["_id",replaceSymb(_lind)]);gArr.push(["_codemenu",_codemenu]);callToRCP(gArr,"_self",'/reg');}
function reAuth()
{var flag72=findFlag72(numDB);if((flag72)&&(typeof _lind!="undefined"))
{findInLocal();}
else
{goToLocation('index');}}
function reAnswere()
{goToLocation('contacts');}
var isIE=(navigator.userAgent.indexOf('MSIE')!=-1)&&(!window.opera)?true:false;var curs=(document.compatMode=='CSS1Compat')?'pointer':'hand';var docEl=null;var arrwin=[];var countwin=0;var frmh=1000;var movable=false;var _x=0;var _y=0;var scalable=false;var __x,__y,__xx,__yy,__l,__t,__r,__b,__w,__h,sw,sh,cx,cy,dx,dy,xm,ym;var wraparr=new Array();var price="0";var typesearch="simple";var typework="";var skipfirst="";var voclab="";var endvoc="";var vocobj="";var vocstart=1;var firstterm="";var indxterms="";var andor=0;var lastterm="";var vstr="";var vvstr="";var cstr="";var ustr="";var fobject=null;var menu=null;var addfilters="";var lockedfilters="";var swfterm="";var addid="";var seeid="";var flag45=false;var portion=15;var begin=1;var portioncount=0;var portionarr=[];var quant=0;var promocod="";var readerobj=null;var treeobj=null;var rez=[];var siglaid=null;var basequant="";var realdbaf="";var iddbbibl="";var editqueryflag=false;var searchlabel='';var searchtermin='';var scrollobj=null;var showtext="";var showrubterm="";var livsrc=null;var livlabel="";var lightarr=[];var lightstring="";var savedstring="";var lockedstring="";var bodyclass="";var titlesearch="";var searchurl="";var imgurl="";var showstr="";var pretexts=[];pretexts["без"]="";pretexts["безо"]="";pretexts["близ"]="";pretexts["вне"]="";pretexts["для"]="";pretexts["изо"]="";pretexts["или"]="";pretexts["меж"]="";pretexts["над"]="";pretexts["обо"]="";pretexts["ото"]="";pretexts["под"]="";pretexts["подо"]="";pretexts["пред"]="";pretexts["предо"]="";pretexts["при"]="";pretexts["про"]="";pretexts["ради"]="";pretexts["чем"]="";function getSrc(e)
{if(e)
return e.target;else
return event.srcElement||docEl.event.srcElement;}
function getCode(e)
{e=(e)?e:(event||docEl.event);var code=e.keyCode;return code;}
function getEtype(e)
{e=(e)?e:(event||docEl.event);return e.type;}
function getCtrl(e)
{e=(e)?e:(event||docEl.event);var code=e.ctrlKey;return code;}
function getBody()
{if(document.documentElement)
return document.documentElement;else
return document.body;}
function getX(e)
{var doc=getBody();if(e)
return e.pageX;else
if(isIE)
return event.clientX+doc.scrollLeft;else
return event.clientX;}
function getY(e)
{var doc=getBody();if(e)
return parseInt(e.pageY);else
if(isIE)
return event.clientY+doc.scrollTop;else
return event.clientY;}
function getXY(e)
{var x=0,y=0;if(!e)e=window.event;if(e.pageX||e.pageY)
{x=e.pageX;y=e.pageY;}
else if(e.clientX||e.clientY)
{x=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft;y=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop;}
return{"x":x,"y":y};}
var elem_rect={x:function(elem){var b=document.body,e=document.documentElement,x=window.pageXOffset||e.scrollLeft||b.scrollLeft,c=e.clientLeft||b.clientLeft||0;return Math.round(elem.getBoundingClientRect().left+x-c);},y:function(elem){var b=document.body,e=document.documentElement,y=window.pageYOffset||e.scrollTop||b.scrollTop,c=e.clientTop||b.clientTop||0;return Math.round(elem.getBoundingClientRect().top+y-c);}}
function getAbsolutePosition(elem)
{var obj={x:0,y:0};while(elem)
{obj.x+=elem.offsetLeft;obj.y+=elem.offsetTop;elem=elem.offsetParent;}
return obj;}
function pageOffset()
{var obj={x:0,y:0};if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
obj.x+=docEl.pageXOffset||docEl.document.documentElement.scrollLeft||docEl.document.body.scrollLeft;obj.y+=docEl.pageYOffset||docEl.document.documentElement.scrollTop||docEl.document.body.scrollTop;return obj;}
function getOffset(elem)
{if(elem.getBoundingClientRect)
{return getOffsetRect(elem);}
else
{return getOffsetSum(elem);}}
function getOffsetSum(elem)
{var top=0,left=0;while(elem)
{top=top+parseInt(elem.offsetTop);left=left+parseInt(elem.offsetLeft);elem=elem.offsetParent;}
return{top:top,left:left};}
function getOffsetRect(elem)
{var box=elem.getBoundingClientRect();var body=document.body;var docElem=document.documentElement;var scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop;var scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft;var clientTop=docElem.clientTop||body.clientTop||0;var clientLeft=docElem.clientLeft||body.clientLeft||0;var top=box.top+scrollTop-clientTop;var left=box.left+scrollLeft-clientLeft;return{top:Math.round(top),left:Math.round(left)};}
function getCurrStyle(obj)
{if(obj.currentStyle)
return obj.currentStyle;else
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
return docEl.getComputedStyle(obj,null);}}
function addslash(v)
{var ret="";for(var i=0;i<v.length;i++)
{if("\\^$*+?{}[]().:!=|-,/".indexOf(v.charAt(i))!=-1)
{ret+="\\"+v.charAt(i);}
else
{ret+=v.charAt(i);}}
return ret;}
function replaceSlash(val)
{val=val.replace(/\\/g,'\\\\');return val;}
function encodeVal(s)
{var encodeval=encodeURIComponent(s);encodeval=encodeval.replace(/~/g,'%7E');encodeval=encodeval.replace(/!/g,'%21');encodeval=encodeval.replace(/\(/g,'%28');encodeval=encodeval.replace(/\)/g,'%29');encodeval=encodeval.replace(/'/g,'%27');encodeval=encodeval.replace(/\%20/g,'+');return encodeval;}
function delbrackets(val)
{val=val.replace(/\\\(/g,'(');val=val.replace(/\\\)/g,')');return val;}
function brackets(val)
{val=val.replace(/\(/g,'\\(');val=val.replace(/\)/g,'\\)');return val;}
function convertbrackets(val)
{val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');val=val.replace(/\'/g,'[apos]');val=val.replace(/\"/g,'[quot]');return val;}
function convertseef(val)
{val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');val=val.replace(/\'/g,'[apos]');val=val.replace(/\"/g,'[quot]');val=val.replace(/\\/g,'[backslash]');return val;}
function prepareTerm1(val)
{val=val.replace(/\[apos\]/g,"'");val=val.replace(/\[\/apos\]/g,"'");val=val.replace(/\[quot\]/g,'"');val=val.replace(/\[bracket\]/g,"");val=val.replace(/\[\/bracket\]/g,"");return val;}
function prepareTerm(val)
{val=val.replace(/\[backslash\]\[apos\]/g,"\\\'");val=val.replace(/\[backslash\]\[quot\]/g,'\\\"');val=val.replace(/\[apos\]/g,"'");val=val.replace(/\[\/apos\]/g,"'");val=val.replace(/\[quot\]/g,'"');val=val.replace(/\&quot;/g,'"');val=val.replace(/\&amp;/g,'&');val=val.replace(/\[backslash\]/g,'\\\\');val=val.replace(/\[bracket\]/g,"(");val=val.replace(/\[\/bracket\]/g,")");return val;}
function prepareTerm2(val)
{val=val.replace(/\(/g,'');val=val.replace(/\)/g,'');val=val.replace(/\,/g,'');val=val.replace(/\[/g,'');val=val.replace(/\]/g,'');val=val.replace(/&amp;/g,'&');return val;}
function convertlimits(val)
{val=val.replace(/\'/g,'[apos]');val=val.replace(/\"/g,'[quot]');val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');return val;}
function convertlimits2(val)
{val=val.replace(/\\\\/g,'[backslash]');val=val.replace(/\\\'/g,'[apos]');val=val.replace(/\\\"/g,'[quot]');val=val.replace(/\'/g,'[apos]');val=val.replace(/\"/g,'[quot]');val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');var tmp=/\\{1,}\[/g;if(tmp.test(val))
val=val.replace(tmp,'[');return val;}
function convertlinksearchstr(val)
{val=val.replace(/\[apos\]/g," ");val=val.replace(/\[\/apos\]/g," ");return val;}
function convertlightstring(val)
{val=val.replace(/\[apos\] AND \[apos\]/g," ");val=val.replace(/\[apos\] OR \[apos\]/g," ");val=val.replace(/\[apos\] NOT \[apos\]/g," ");val=val.replace(/\[\/apos\] AND \[apos\]/g," ");val=val.replace(/\[\/apos\] OR \[apos\]/g," ");val=val.replace(/\[\/apos\] NOT \[apos\]/g," ");val=val.replace(/\[\/bracket\] AND \[bracket\]/g," ");val=val.replace(/\[\/bracket\] OR \[bracket\]/g," ");val=val.replace(/\[\/bracket\] NOT \[bracket\]/g," ");val=val.replace(/\[apos\]/g," ");val=val.replace(/\[\/apos\]/g," ");val=val.replace(/\[quot\]/g,' ');val=val.replace(/\&quot;/g,' ');val=val.replace(/\'/g,' ');val=val.replace(/\"/g,' ');val=val.replace(/\\/g,' ');val=val.replace(/\./g,' ');val=val.replace(/\-/g,' ');val=val.replace(/\,/g,' ');val=val.replace(/\*/g,' ');val=val.replace(/\[backslash\]/g,' ');val=val.replace(/\[bracket\]/g," ");val=val.replace(/\[\/bracket\]/g," ");val=val.replace(/\[/g,' ');val=val.replace(/\]/g,' ');val=val.replace(/\(/g,' ');val=val.replace(/\)/g,' ');val=val.replace(/\#/g,' ');val=val.replace(/\$/g,' ');val=val.replace(/\s{1,}/g," ");return val;}
function findaddlabel(val)
{var lstr="";var farr=val.split(' ');for(var i=0;i<farr.length;i++)
{var elem=trimSpaces(farr[i]);if(elem.indexOf('[bracket]')!=-1)
elem=elem.substring(elem.lastIndexOf('[bracket]')+9);if((elem!="")&&(typeof dbs[numdbBIBL]["labels"][elem]!="undefined"))
{lstr=elem;break;}}
if(lstr!="")
return lstr;else
return null;}
function convertlightstring1(val)
{var lstr="";var count=0;for(var i=0;i<val.length;i++)
{var elem=trimSpaces(val[i]);if((elem!="")&&(typeof dbs[numdbBIBL]["labels"][elem]=="undefined"))
{if(count>0)
lstr+=' ';lstr+=elem;count++;}}
return lstr;}
function convertlightstring2(val)
{var farr=val.split(' ');var flarr=[];var count=0;for(var i=0;i<farr.length;i++)
{var elem=trimSpaces(farr[i]);if(elem.length>2)
{if(typeof pretexts[elem.toLowerCase()]=="undefined")
{if(elem.length>4)
flarr[count]=elem.substring(0,elem.length-2);else
flarr[count]=elem.substring(0,elem.length-1);count++;}}}
var lstr=flarr.join(' ');if(count>0)
return lstr;else
return null;}
function convertlightstring3(val)
{var str=convertlightstring(val);var lstr="";var larr=str.split('</i>');var count=0;for(var i=0;i<larr.length;i++)
{if(larr[i]!="")
{var elem="";if(larr[i].indexOf('<i>')!=-1)
elem=larr[i].substring(0,larr[i].indexOf('<i>'));else
elem=larr[i];if(elem!="")
{var earr=elem.split(' ');for(var j=0;j<earr.length;j++)
{if(earr[j]!="")
{if(earr[j].length>2)
{if(/[0-9]/.test(earr[j])==false)
{if(typeof pretexts[earr[j].toLowerCase()]=="undefined")
{if(count>0)
lstr+=' ';lstr+=earr[j];count++;}}}}}}}}
return lstr;}
function escapeRegExp(stringToGoIntoTheRegex)
{return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}
function prepareShowstring(s)
{if(s.indexOf('[bracket]')!=-1)
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=_iddb;if(typeof dbs[ndb]!="undefined")
{for(var key in dbs[ndb]["labels"])
{var tmp1=escapeRegExp('[bracket]'+key+' ');var tmp2='[bracket]'+dbs[ndb]["labels"][key][0]+' ';s=s.replace(new RegExp(tmp1,'g'),tmp2);}}}
s=s.replace(/ NOT /g,' НЕ ');s=s.replace(/ AND /g,' И ');s=s.replace(/ OR /g,' ИЛИ ');s=s.replace(/\[apos\]/g,' ');s=s.replace(/\[\/apos\]/g,' ');s=s.replace(/\[br\]/g,' ');s=s.replace(/\[quot\]/g,' ');s=s.replace(/\[bracket\]/g,' ');s=s.replace(/\[backslash\]/g,' ');s=s.replace(/\[\/bracket\]/g,' ');s=s.replace(/\&quot\;/g,' ');s=s.replace(/\"/g,' ');s=s.replace(/\'/g,' ');s=s.replace(/\\/g,' ');s=s.replace(/\(/g,' ');s=s.replace(/\)/g,' ');s=s.replace(/\[/g,' ');s=s.replace(/\]/g,' ');s=s.replace(/\s{1,}/g," ");return s;}
function prepareStr(s)
{var tmp=/\\{1,}/g;if(tmp.test(s))
s=s.replace(tmp,'\\');return s;}
function replaceS(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/&quot;/g,'"');val=val.replace(/&apos;/g,"'");val=val.replace(/&#034;/g,'"');val=val.replace(/&#039;/g,"'");return val;}
function replaceSymb(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');val=val.replace(/\'/g,"\\\'");return val;}
function replaceSymb1(val)
{val=val.replace(/\&/g,'[amp]');return val;}
function replaceSymb2(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');return val;}
function replaceSymb3(val)
{val=val.replace(/\'/g,'');val=val.replace(/\"/g,'');return val;}
function replaceSymb4(val)
{val=val.replace(/\'/g,'&apos;');val=val.replace(/\"/g,'&quot;');return val;}
function replaceSymb5(val)
{val=val.replace(/\'/g,"\\'");val=val.replace(/\"/g,'\\"');return val;}
function replaceSymb7(val)
{val=val.replace(/\'/g,'');val=val.replace(/\"/g,'');val=val.replace(/\\/g,'');return val;}
function replaceS6(val)
{val=val.replace(/([a-zA-Zа-яА-ЯёЁ]|[0-9]+)\'([a-zA-Zа-яА-ЯёЁ]|[0-9]+)/g,"$1\\\'$2");val=val.replace(/\'\'/g,"'\\\'");val=val.replace(/\"/g,'\\\"');val=val.replace(/([a-zA-Zа-яА-ЯёЁ]|[0-9]+)\\([a-zA-Zа-яА-ЯёЁ]|[0-9]+)/g,"$1\\\\$2");return val;}
function replaceMail(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');val=val.replace(/\'/g,"\\\'");val=val.replace(/\@/g,'[at]');val=val.replace(/\&/g,'[amp]');return val;}
function trimBrackets(val)
{var tmp=/(^\s*\[\/*bracket\]\s*)|(\s*\[\/*bracket\]\s*$)/;while(tmp.test(val))
{val=val.replace(tmp,'');}
if((val!='OR')&&(val!='AND')&&(val!='NOT'))
val=val+'|';return val;}
function Trim2(val)
{val=val.replace(/[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]/g,'');return val;}
function trimSpaces(val)
{val=val.replace(/^\s*/g,'');val=val.replace(/\s*$/g,'');val=val.replace(/\s{1,}/g," ");return val;}
function Trim1(val)
{val=val.replace(/\.* *\, *`\-*/g,'');val=val.replace(/\.* *\, *\-*/g,'');val=val.replace(/\.* *\, *\-*/g,'');val=val.replace(/\. *\-*/g,'');val=val.replace(/^\. */g,'');return val;}
function Trim()
{var val=new String(this);val=val.replace(/^\s*/g,'');val=val.replace(/\s*$/g,'');return val;}
String.prototype.Trim=Trim;Array.prototype.clean=function()
{this.forEach(function(el,b,c)
{if(el==undefined||el==null||el=="")
c.splice(b,1);});}
function findParent(el,cls)
{while((el=el.parentNode)&&el.className.indexOf(cls)<0);return el;}
var bbcodes={"(\\[i class=)(\\w+)(\\])":"<span class=\"$2\" onclick=\"showLable(this)\">","[em]":"<em>","[/em]":"</em>","[b]":"<b>","[/b]":"</b>","[u]":"<u>","[/u]":"</u>","[br]":"<br/>","[br/]":"<br/>","[/br]":"","[hr]":"<hr/>","[hr/]":"<hr/>","[div]":"<div>","[/div]":"</div>","[ANNOT]":"<div class=\"annot\">","[/ANNOT]":"</div>","[PHOTOTEXT]":"<div class=\"phototext\">","[/PHOTOTEXT]":"</div>","[VIDEOTEXT]":"<div class=\"videotext\">","[/VIDEOTEXT]":"</div>","[AUDIOTEXT]":"<div class=\"audiotext\">","[/AUDIOTEXT]":"</div>","[p]":"<p>","[/p]":"</p>","[ul]":"<ul class=\"bbc\">","[/ul]":"</ul>","[ol]":"<ol>","[/ol]":"</ol>","[li]":"<li>","[/li]":"</li>","[dl]":"<dl>","[/dl]":"</dl>","[dt]":"<dt>","[/dt]":"</dt>","[dd]":"<dd>","[/dd]":"</dd>","[url]":"<a target=\"_blank\" href=\"","[/url]":"\">","[/urla]":"</a>","[size=20]":"<span class=\"size20\">","[size=18]":"<span class=\"size18\">","[/size]":"</span>","[lev0]":"<div class=\"space0\">","[/lev0]":"</div>","[lev1]":"<div class=\"space1\" data-title=\"увеличить\" onclick=\"zoomPicture(this)\">","[/lev1]":"</div>","[lev2]":"<div class=\"space2\">","[/lev2]":"</div>","[lev3]":"<span class=\"lev3\">","[/lev3]":"</span>","[indent]":"<span class=\"indent\">","[/indent]":"</span>","[quote]":"<blockquote>","[/quote]":"</blockquote>","[i]":"<span class=\"i\">","[/i]":"</span>","[color=red]":"<span class=\"red\">","[color=blue]":"<span class=\"blue\">","[color=orange]":"<span class=\"orange\">","[color=violet]":"<span class=\"violet\">","[/color]":"</span>","[big]":"<span class=\"big\">","[/big]":"</span>","[show]":"<img src=\"","[/show]":"\" hspace=\"10\" vspace=\"10\" align=\"right\" height=\"100\" />","[img]":"<img src=\"","[/img]":"\" hspace=\"10\" vspace=\"10\" align=\"right\" height=\"100\" />","[objT]":"<figcaption>","[/objT]":"</figcaption>","[h1]":"<div style=\"float:left\">","[/h1]":"</div>","[obj]":"<video src=\"","[/obj]":"\" controls></video>","[video]":"<video src=\"","[/video]":"\" controls></video>","[audio]":"<audio src=\"","[/audio]":"\" controls></audio>","[photo]":"<figure tabindex=\"1\"><img src=\"","[/photo]":"\" title=\"\" alt=\"\" border=\"0\" hspace=\"0\" vspace=\"0\"/></figure>","[uri]":"<a target=\"_blank\" href=\"","[uriT]":"\">","[/a]":"</a>","[/uri]":"</a>","[iframe":"<iframe","][/iframe]":"></iframe>","[amp]":"&","[space] [/space]":"; ","[hide]":"<input class=\"searcht\" type=\"hidden\" value=\"","[/hide]":"\"/>","[code class=AF]":"<span class=\"AF\" title=\"см. в Авторитетном файле\" onclick=\"showLable(this)\"><input type=\"hidden\" value=\"","[/code]":"\"/></span>"};function parseBB(v)
{var count=0;for(var key in bbcodes)
{if(count==0)
{var tmp1=eval("/"+key+"/gi");if(tmp1.test(v))
{v=v.replace(tmp1,bbcodes[key]);}}
else
{var tmp=eval("/"+addslash(key)+"/gi");if(tmp.test(v))
{v=v.replace(tmp,bbcodes[key]);}}
count++;}
return v;}
function deleteBB(v)
{for(var key in bbcodes)
{var tmp=eval("/"+addslash(key)+"/gi");if(tmp.test(v))
{v=v.replace(tmp,"");}}
return v;}
function IsAlfaDigit(val)
{var temp=/\w/;var len=val.length;for(var i=0;i<len;i++)
{if(!temp.test(val.charAt(i)))
{return false;}}
return true;}
function makearr(a,s)
{arr=a.split(s);for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{if(arr[i].indexOf(s)==-1)
rez.push(arr[i]);else
rez.push(makearr(arr[i]));}}
return rez;}
function findArrIndex(k,arr)
{var l=arr.length;for(var i=0;i<l;i++)
{if(arr[i][1].id==k)
{return i;}}
return-1;}
function unique(u)
{var result=[],i=0,j=0,length=u.length;while(i<length)
{var I=u[i++][0],k=j;while(k--&&result[k][0]!==I);if(k<0)result[j++]=[I,u[i-1][1]];}
return result;}
function getcNode(rNode)
{var cNode=null;if(rNode.hasChildNodes())
{var children=rNode.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{cNode=children[j];break;}}}
return cNode;}
function getcNodeByName(rNode,name)
{var cNode=null;if(rNode.hasChildNodes())
{var children=rNode.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{if(children[j].nodeName.toLowerCase()==name)
{cNode=children[j];break;}}}}
return cNode;}
function sendForm(queryArr,target,action,method,width,height)
{this.queryArr=queryArr;this.target=target||"_self";this.action=action||pathactrcp;this.method=method||"post";this.width=width||screen.availWidth;this.height=height||screen.availHeight;this.formSubmit=formSubmit;this.ajaxForm=ajaxForm;}
function formSubmit()
{var today=new Date();var seconds=today.getTime();var NameWin="n"+seconds+Math.floor(Math.random()*9999);var Scr="alwaysRaised=yes,menubar=yes,width="+this.width+",height="+this.height+",left="+parseInt(((screen.availWidth-1)-this.width)/2)+",top="+parseInt(((screen.availHeight-1)-this.height)/2)+",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";var doc,src;if(typeof this.target=="string")
{switch(this.target)
{case"_new":var win=window.open('',NameWin);if(win!=null)
{doc=win.document;src=win.name;doc.open();doc.write('<html><head><title>send</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta http-equiv="cache-control" content="no-cache"/></head><body style="background: #fff; font: bold 18px Times, serif; color: red; text-align: center;"><p>Пожалуйста, подождите...</p></body></html>');doc.close();}
else
{alert("Невозможно завершить операцию!\nВаш броузер блокирует всплывающие окна.");return;}
break;default:doc=document;src=this.target;break;}}
else
{if((this.target.window)&&(this.target.window.document))
doc=this.target.window.document;else
doc=this.target.contentDocument||this.target.contentWindow.document;if((this.target.window)&&(this.target.window.name))
src=this.target.window.name;else
src=this.target.name;}
if(typework!="")
{if((typework=="authorization")||(typework.indexOf('template')!=-1))
this.queryArr.push(["_oldsean",numsean]);else
this.queryArr.push(["_numsean",numsean]);}
if(typeof _auth!="undefined")
this.queryArr.push(["_auth",_auth]);var cont=take(document.body);if(cont.hasclass('blind_panel'))
{if((typeof _sheet!="undefined")&&(cont.hasclass(_sheet)))
cont.delclass(_sheet);bodyclass=document.body.className;}
else
bodyclass="";if(bodyclass!="")
this.queryArr.push(["_bodyclass",bodyclass]);var frm=doc.createElement('form');for(var i=0;i<this.queryArr.length;i++)
{var field=doc.createElement('input');field.type="hidden";field.name=this.queryArr[i][0];field.value=this.queryArr[i][1];frm.appendChild(field);}
doc.body.appendChild(frm);frm.action=this.action;frm.method=this.method;frm.target=src;frm.submit();}
var ajaxForm={XHRobj:function()
{try
{return new XMLHttpRequest()||new window.XDomainRequest();}
catch(e){}
try
{return new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){}
try
{return new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){}
return null;},send:function(arr,callback,act,hdr,callerror,add,json,method)
{var xhr=ajaxForm.XHRobj();var pstr="";if(act==null)
act=pathactrcp;if(arr!=null)
pstr=serializeData(arr);else
{if((typeof json!="undefined")&&(json!=0))
pstr=json;}
if(xhr)
{xhr.onreadystatechange=function()
{if(xhr.readyState==4)
{if(xhr.status==200)
{if(callback!=null)
{callback(xhr,add);}
xhr=null;}
else
{if(callerror!=null)
{callerror(xhr);}}}}
if(pstr!="")
{if(typeof method=="undefined")
method="post";xhr.open(method,act,true);if((typeof hdr=="undefined")||(hdr==null))
{xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");}
else
{for(var i=0;i<hdr.length;i++)
{xhr.setRequestHeader(hdr[i].name,hdr[i].value);}}
xhr.send(pstr);}
else
{xhr.open("get",act,true);if((typeof hdr!="undefined")&&(hdr!=null))
{for(var i=0;i<hdr.length;i++)
{xhr.setRequestHeader(hdr[i].name,hdr[i].value);}}
xhr.send(null);}}}};function serializeData(arr)
{var qstr="";for(var i=0;i<arr.length;i++)
{qstr+=arr[i][0]+"="+encodeURIComponent(arr[i][1]);if(i<arr.length-1)
qstr+="&";}
return qstr;}
function prepareQueryString(arr,ndb)
{if(typeof ndb!="undefined")
arr=addGlobalsToQuery(arr,ndb);else
arr=addGlobalsToQuery(arr);var qstr="";for(var i=0;i<arr.length;i++)
{qstr+="<"+arr[i][0]+">"+arr[i][1];if(i<arr.length-1)
qstr+="[separator]";}
return qstr;}
function addGlobalsToQuery(arr,ndb)
{var db=numdbBIBL;if(typeof numDB!="undefined")
{db=numDB;}
else
{if(typeof _localiddb!="undefined")
db=_iddb;}
if(typeof ndb!="undefined")
{db=ndb;}
if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["brokerid"]!="undefined"))
{arr.push(["_brokerid",dbs[db]["brokerid"]]);arr.push(["$brokerid",db+":"+dbs[db]["brokerid"]]);}
if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["fundlogin"]!="undefined"))
{arr.push(["userId",dbs[db]["fundlogin"]]);}
else
{arr.push(["userId",identif]);}
if(typework!="")
{if(typework=="search")
{var larr=[];var lstr="";if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
{if(typeof iddb[db][5]!="undefined")
{larr=iddb[db][5];for(var i=0;i<larr.length;i++)
{if((larr[i][0]=="043")||(larr[i][0]=="058")||(larr[i][0]=="059")||(larr[i][0]=="076")||(larr[i][0]=="066")||(larr[i][0]=="068")||(larr[i][0]=="069")||(larr[i][0]=="070")||(larr[i][0]=="077")||(larr[i][0]=="078")||(larr[i][0]=="079"))
lstr+=larr[i][0]+'[ID]'+larr[i][1]+'[END]';}}}
if(lstr!="")
arr.push(["$linkstring",lstr]);if((typesearch=="simple")||(typesearch=="expand")||(typesearch=="professional")||(typesearch=="fulltext")||(typesearch=="combined"))
{if(typeof SearchLevels!="undefined")
{for(var i=0;i<SearchLevels.length;i++)
arr.push(["level["+i+"]",SearchLevels[i]]);}
arr.push(["highlight/limit",portion]);arr.push(["highlight/fields[0]","TEXT"]);}
if(lockedfilters!="")
arr.push(["$lockedfilters",lockedfilters]);if(swfterm!="")
arr.push(["$swfterm",swfterm]);if(typeof usesort!="undefined")
{arr.push(["$usesort",usesort]);if(typeof usesortlabel!="undefined")
arr.push(["$usesortlabel",usesortlabel]);}
arr.push(["$typesearch",typesearch]);if((typeof _newrecs!="undefined")&&(_newrecs!=""))
arr.push(["$newrecs",_newrecs]);if(typeof _month!="undefined")
arr.push(["$month",_month]);if(typeof _year!="undefined")
arr.push(["$year",_year]);if((typeof _sign!="undefined")&&(_sign!=null))
arr.push(["$sign",_sign]);}
if(showstr!="")
{arr.push(["$bibliostring",convertlightstring3(showstr)]);}
if(typeof uselight!="undefined")
{if(lightstring!="")
{var fls=trimSpaces(lightstring);var lls=convertlightstring2(fls);if(lls!=null)
{arr.push(["$lightstring",lls.toLowerCase()]);arr.push(["$lockedstring",lls.toLowerCase()])}}
else
{if(lockedstring!="")
{arr.push(["$lockedstring",lockedstring.toLowerCase()]);if(savedstring!="")
arr.push(["$lightstring",savedstring.toLowerCase()]);else
arr.push(["$lightstring",lockedstring.toLowerCase()]);}}}
if(typeof _localiddb!="undefined")
{arr.push(["$localiddb",_localiddb]);arr.push(["_iddb",_iddb]);}
else
{if(typework=="searchallbases")
arr.push(["_iddb",numdbBIBL]);else
arr.push(["_iddb",db]);}
if(typeof _skin!="undefined")
arr.push(["$skin",_skin]);if(typeof _ltitle!="undefined")
arr.push(["$ltitle",replaceSymb(_ltitle)]);if(typeof _lind!="undefined")
arr.push(["$lind",replaceSymb(_lind)]);if(typeof _laddress!="undefined")
arr.push(["$laddress",replaceSymb(_laddress)]);if(typeof _sigla!="undefined")
arr.push(["$sigla",_sigla]);if(typeof _site!="undefined")
arr.push(["$site",_site]);if(typeof _elcat!="undefined")
arr.push(["$elcat",_elcat]);if(addfilters!="")
{addfilters=addfilters.replace(/\"/g,'\\\"');addfilters=prepareStr(addfilters);arr.push(["$addfilters",addfilters]);}
arr.push(["$typework",typework]);}
if(basequant!="")
arr.push(["$basequant",basequant]);else
{if(typeof _basequant!="undefined")
arr.push(["$basequant",_basequant]);}
if(flag45)
arr.push(["$flag45","yes"]);return arr;}
function callToRCP(qArr,trg,pathactrcp,method,w,h)
{var qFrm=new sendForm(qArr,trg,pathactrcp,method,w,h);qFrm.formSubmit();qFrm=null;}
function ajaxToRCP(qArr,collback,act,hdr,collerror,add,json,method)
{if(typeof add=="undefined")
add=0;if(typeof json=="undefined")
json=0;var qFrm=new sendForm(qArr,collback,act,hdr,collerror,add,json,method);qFrm.ajaxForm.send(qArr,collback,act,hdr,collerror,add,json,method);qFrm=null;}
function _take(arg)
{this.d=document;if(docEl!=null)
this.d=docEl.document;if(typeof arg=='string')
this.n=this.d.getElementById(arg);else
this.n=arg;}
_take.prototype={text:function(arg)
{var chld=new _take(this.d.createTextNode(arg));this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},create:function(tag,arg)
{var chld=new _take(this.d.createElement(tag));for(var key in arg)
{var value=arg[key];if(key=='textNode')
chld.n.appendChild(this.d.createTextNode(value));else if(key=='className')
eval('chld.n.'+key+'=value');else if(key.substring(0,2)=='on')
eval('chld.n.'+key+'='+value);else if(key=='style')
{for(prop in value)
eval('chld.n.'+key+'.'+prop+'=value[prop]');}
else
{chld.n.setAttribute(key,value);}}
this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},createNS:function(NS,tag,arg)
{var chld=new _take(this.d.createElementNS(NS,tag));for(var key in arg)
{var value=arg[key];if(key.substring(0,2)=='on')
eval('chld.n.'+key+'='+value);else if(key=='style')
{for(prop in value)
eval('chld.n.'+key+'.'+prop+'=value[prop]');}
else
{var attr=this.d.createAttribute(key);chld.n.setAttributeNS(null,key,value);}}
this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},tags:function(tag)
{if(this.n!=null)
return this.n.getElementsByTagName(tag.toLowerCase());else
return;},setattr:function(NS,attr,val)
{if(this.n!=null)
{if(NS!=null)
{this.n.removeAttributeNS(null,attr)
return this.n.setAttributeNS(null,attr,val);}
else
{this.n.removeAttribute(attr)
return this.n.setAttribute(attr,val);}}
else
return;},getpart:function(NS,tag,sign)
{if(this.n!=null)
{var arr=new Array();var parr=[];if(NS!=null)
parr=this.d.getElementsByTagNameNS(NS,tag.toLowerCase());else
parr=this.n.getElementsByTagName(tag.toLowerCase());for(var i=0;i<parr.length;i++)
{for(var key in sign)
{if(eval("parr[i]."+key).indexOf(sign[key])!=-1)
arr.push(parr[i]);}}
try
{return arr;}
finally
{arr=null;}}},hasclass:function(sign)
{if(this.n!=null)
{var elcl=this.n.className;return(elcl.length>0&&(elcl==sign||new RegExp("(^|\\s)"+sign+"(\\s|$)").test(elcl)));}},addclass:function(sign)
{if(this.n!=null)
{if(!(new _take(this.n)).hasclass(sign))
this.n.className+=(this.n.className?' ':'')+sign;}},delclass:function(sign)
{if(this.n!=null)
{if((new _take(this.n)).hasclass(sign))
this.n.className=this.n.className.replace(new RegExp("(^|\\s+)"+sign+"(\\s+|$)"),' ').Trim();}},switchclass:function(sign1,sign2)
{if(this.n!=null)
{var obj=new _take(this.n);if(obj.hasclass(sign1))
{obj.delclass(sign1);obj.addclass(sign2);}
else
{obj.delclass(sign2);obj.addclass(sign1);}}},getsign:function(tag,sign)
{if(this.n!=null)
{var arr=new Array();var parr=this.n.getElementsByTagName(tag.toLowerCase());for(var i=0;i<parr.length;i++)
{for(var key in sign)
{if(key=='className')
{var tmp=new RegExp("(^|\\s)"+sign[key]+"(\\s|$)");if(tmp.test(parr[i].className))
arr.push(parr[i]);}
else
{if(sign[key]=='')
{if(eval("parr[i]."+key))
arr.push(parr[i]);}
else
{if(eval("parr[i]."+key)==sign[key])
arr.push(parr[i]);}}}}
try
{return arr;}
finally
{arr=null;}}},getx:function()
{if(this.n!=null)
return this.n.offsetLeft;else
return;},gety:function()
{if(this.n!=null)
return this.n.offsetTop;else
return;},getw:function()
{if(this.n!=null)
return this.n.offsetWidth;else
return;},geth:function()
{if(this.n!=null)
return this.n.offsetHeight;else
return;},getb:function()
{if(this.n!=null)
return this.n.offsetHeight+this.n.offsetTop;else
return;},getr:function()
{if(this.n!=null)
return this.n.offsetWidth+this.n.offsetLeft;else
return;},setx:function(x)
{if(this.n!=null)
return this.n.style.left=x+"px";else
return;},sety:function(y)
{if(this.n!=null)
return this.n.style.top=y+"px";else
return;},setw:function(w)
{if(this.n!=null)
return this.n.style.width=w+"px";else
return;},seth:function(h)
{if(this.n!=null)
return this.n.style.height=h+"px";else
return;},transparency:function(arg)
{if(this.n!=null)
{var support="opacity"in this.n.style;if(support)
return(arg!=10)?this.n.style.opacity='0.'+arg:this.n.style.opacity='10';else
return(arg!=10)?this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+'0)':this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=100)';}
else
return;},fade:function(arg)
{if(this.n!=null)
{var support="opacity"in this.n.style;if(support)
return this.n.style.opacity=arg/100;else
return this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+')';}
else
return;},visualise:function()
{if(this.n!=null)
return this.n.style.visibility="visible";else
return;},conceal:function()
{if(this.n!=null)
return this.n.style.visibility="hidden";else
return;},show:function()
{if(this.n!=null)
return this.n.style.display="";else
return;},hide:function()
{if(this.n!=null)
return this.n.style.display="none";else
return;},addevent:function(e,t,f)
{if(this.d.addEventListener)
this.d.addEventListener(e,t,false);else
eval('this.d'+'.on'+e+'='+'t');},stopevent:function(event)
{if(this.d.stopPropagation)
this.d.stopPropagation();else
this.d.cancelBubble=true;},delevent:function(t,f)
{if(this.d.attachEvent)
this.d.detachEvent('on'+t,f,true);else
this.d.removeEventListener(t,f,false);},initevent:function(e)
{var event=this.d.createEvent('Event');event.initEvent(e,true,true);this.n.dispatchEvent(event);}};function take(arg)
{return new _take(arg);}
var delta_x=0;var delta_y=0;var delta_w=0;var delta_h=0;var w_block=0;var h_block=0;function startMove(e)
{movable=true;var o;var c;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;c=e.srcElement;o=e.srcElement.parentNode.parentNode;x=e.clientX;y=e.clientY;}
else
{c=e.target;o=e.target.parentNode.parentNode;x=e.pageX;y=e.pageY;}
if(c.className=='pheader')
{delta_x=o.offsetLeft-x;delta_y=o.offsetTop-y;o.onmousemove=moveThis;}}
function stopMove(e)
{movable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function moveThis(e)
{if(!movable)
return;var o;var c;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;c=e.srcElement;o=e.srcElement.parentNode.parentNode;x=e.clientX;y=e.clientY;}
else
{c=e.target;o=e.target.parentNode.parentNode;x=e.pageX;y=e.pageY;}
if(docEl.getSelection)
docEl.getSelection().removeAllRanges();else
if(docEl.document.selection&&docEl.document.selection.clear)
docEl.document.selection.clear();if(c.className=='pheader')
{o.style.top=delta_y+y+"px";o.style.left=delta_x+x+"px";}}
function startScale(e)
{scalable=true;var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;x=e.clientX;y=e.clientY;}
else
{o=e.target;x=e.pageX;y=e.pageY;}
if(o.className.indexOf('dialog')!=-1)
{var obj=take(o);__l=obj.getx();__t=obj.gety();__x=x+pageOffset().x-obj.getx();__y=y+pageOffset().y-obj.gety();__w=obj.getw();__h=obj.geth();__r=obj.getr();__b=obj.getb();__xx=x+pageOffset().x;__yy=y+pageOffset().y;obj=null;o.onmousemove=toScale;}}
function stopScale(e)
{scalable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function toScale(e)
{if(!scalable)
return;var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;x=e.clientX;y=e.clientY;}
else
{o=e.target;x=e.pageX;y=e.pageY;}
if(docEl.getSelection)
docEl.getSelection().removeAllRanges();else
if(docEl.document.selection&&docEl.document.selection.clear)
docEl.document.selection.clear();if(o.className.indexOf('dialog')!=-1)
{var obj=take(o);var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:window.innerHeight;var w=(isIE)?docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth:docEl.innerWidth;var oX=parseInt(o.style.left);var oY=parseInt(o.style.top);var oW=o.offsetWidth;var oH=o.offsetHeight;cx=e.clientX+pageOffset().x;cy=e.clientY+pageOffset().y;dx=cx-__x;dy=cy-__y;xm=__r-oW/2;ym=__b-oH/2;var minw=100;var minh=100;if((cx==xm)||(cy==ym))
{obj=null;return;}
if(cx<xm)
{sw=__r-dx;}
if(cx>xm)
{sw=__w+(cx-__xx);dx=oX;}
if(cy>ym)
{sh=__h+(cy-__yy);dy=__t;}
if(cy<ym)
{sh=__b-dy;}
if(obj.gety()<pageOffset().y)
{dy=pageOffset().y;sh=__b-dy;}
if(obj.getx()<pageOffset().x)
{dx=pageOffset().x;sw=__r-dx;}
if((obj.getr()-pageOffset().x)>w)
sw=w-__l-5;if((obj.getb()-pageOffset().y)>h)
sh=h-__t-5;if((sw>minw)&&(sh>minh))
{obj.setx(dx);obj.sety(dy);obj.setw(sw);obj.seth(sh);var fobj=take(o.firstChild);var lobj=take(o.firstChild.lastChild);fobj.setw(sw-10);fobj.seth(sh-10);lobj.setw(sw-10);lobj.seth(sh-35);__r=dx+sw;__b=dy+sh;__l=dx;__t=dy;__w=sw;__h=sh;__xx=cx;__yy=cy;fobj=null;lobj=null;obj=null;}}}
function stopEffects(e)
{movable=false;scalable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function unWrapLayer(e)
{stopEffects(e);var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;}
else
o=e.target;o.className='wrap';o.onmousedown=wrapLayer;o.title='Развернуть';var doc=o.parentNode.parentNode.parentNode;var tdoc=take(doc);var ind=doc.id;hideBgDiv(ind+'bgdiv');if(typeof(wraparr[ind])=='undefined')
wraparr[ind]=new Array();if(wraparr[ind].length!=0)
wraparr[ind].length=0;wraparr[ind]=([tdoc.getw(),tdoc.geth()]);tdoc.seth(40);var fobj=take(doc.firstChild);var lobj=take(doc.lastChild);var llobj=take(doc.lastChild.lastChild);fobj.seth(40);lobj.seth(32);llobj.hide();tdoc.setx(0);var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:docEl.innerHeight;tdoc.sety(h-40);doc.style.overflow='hidden';tdoc=fobj=lobj=llobj=null;}
function wrapLayer(e)
{stopEffects(e);var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;}
else
o=e.target;o.className='unwrap';o.onmousedown=unWrapLayer;o.title='Свернуть';var doc=o.parentNode.parentNode.parentNode;var tdoc=take(doc);var ind=doc.id;showBgDiv(ind+'bgdiv');var y=(isIE)?((docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight)-wraparr[ind][1])/2:(docEl.innerHeight-wraparr[ind][1])/2;var x=(isIE)?((docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth)-wraparr[ind][0])/2:(docEl.innerWidth-wraparr[ind][0])/2;tdoc.setx(x);tdoc.sety(y);var fobj=take(doc.firstChild);var lobj=take(doc.lastChild);var llobj=take(doc.lastChild.lastChild);fobj.seth(wraparr[ind][1]);lobj.seth(wraparr[ind][1]-10);llobj.show();tdoc.seth(wraparr[ind][1]);tdoc.setw(wraparr[ind][0]);var i=0;for(var key in wraparr)
{if(key==ind)
{wraparr.splice(i,1);break;}
i++;}
tdoc=fobj=lobj=llobj=null;}
function delLayerWin()
{try
{var i=arrwin.length-1;var par=arrwin[i][0];var div=arrwin[i][1];var arg=arrwin[i][2];arrwin.splice(i,1);countwin--;deleteBgDiv(div);par.removeChild(div);var body=(docEl!=null)?docEl.document.body:document.body;if(countwin<1)
body.style.overflow='';var calendar=take(body).getsign('div',{className:'calendar'});var len=calendar.length;if(len>0)
{for(var i=0;i<len;i++)
{body.removeChild(calendar[i]);}}
if(arg!="")
eval(arg);if(countwin<1)
{if(scrollobj!=null)
{scrollobj.scrollIntoView();}
scrollobj=null;}}
catch(e){};}
function createBgDiv(ind,count)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
var container=docEl.document.body;var tcontainer=take(container);var bgdiv=tcontainer.create('div',{id:ind,className:'bgdiv',style:{position:'absolute',top:'0px',left:'0px',width:container.scrollWidth+'px',height:container.scrollHeight+'px',zIndex:99999+count}});bgdiv.transparency(5);if(isIE)
{var div=take(ind);if(div.n.previousSibling)
{if((div.n.previousSibling.previousSibling)&&(div.n.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.previousSibling.previousSibling;var tpar=take(par);tpar.hide();tpar=null;}}
div=null;}
return bgdiv;}
function deleteBgDiv(ind)
{if(typeof ind!="string")
ind=ind.previousSibling;var div=take(ind);if(div.n!=null)
{if(isIE)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.show();tpar=null;}}
div.n.parentNode.removeChild(div.n);div=null;}
return;}
function hideBgDiv(ind)
{var div=take(ind);if(div.n!=null)
{div.hide();if(isIE)
{if(div.n.parentNode)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.show();tpar=null;}}}}
div=null;return;}
function showBgDiv(ind)
{var div=take(ind);if(div.n!=null)
{div.show();if(isIE)
{if(div.n.parentNode)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.hide();tpar=null;}}}}
div=null;return;}
function showLayerWin(ind,arg)
{var msg=layopen=layclose=divframe=callback=disabled="";var t=w=h=len=0;var src="about:blank";var scrolling="no";var callbackname="Выполнить";var cls="dialog";var browsed="";var forlinks="";var closename="Закрыть";var multipart="application/x-www-form-urlencoded";var dispatcher="closeThisWin";var closeel=null;docEl=self;if(arg!=null)
{for(var key in arg)
{var value=arg[key];if(key=='target')
docEl=eval(value);if(key=='cls')
cls=value;if(key=='browsed')
browsed=value;if(key=='forlinks')
forlinks=value;if(key=='message')
msg=value;if(key=='src')
src=value;else if(key=='width')
w=value;else if(key=='height')
h=value;else if(key=='layopen')
layopen=value;else if(key=='layclose')
layclose=value;else if(key=='divframe')
divframe=value;else if(key=='scrolling')
scrolling=value;else if(key=='callback')
callback=value;else if(key=='callbackname')
callbackname=value;else if(key=='closename')
closename=value;else if(key=='multipart')
multipart=value;else if(key=='dispatcher')
dispatcher=value;else if(key=='disabled')
disabled=value;}
if(layopen!="")
eval(layopen);}
if(browsed=="")
{docEl.scrollTo(0,0);docEl.document.body.style.overflow='hidden';}
var ww=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.clientWidth:docEl.document.body.clientWidth;var dl=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.scrollLeft:docEl.document.body.scrollLeft;var dt=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.scrollTop:docEl.document.body.scrollTop;var hw=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.clientHeight:docEl.document.body.clientHeight;var container=(docEl!=null)?docEl.document.body:document.body;var tcontainer=take(container);if(browsed=="")
{if(w=="")
w=ww-20;else
{if(w.indexOf('%')!=-1)
w=ww/100*(w.substring(0,w.length-1));}
if(h=="")
h=hw-20;else
{if(h.indexOf('%')!=-1)
h=hw/100*(h.substring(0,h.length-1));}
len=(ww-w)/2+dl;t=(hw-h)/2+dt;}
else
{w=ww-2;h=hw-2;len=10+dl;t=1+dt;}
if(forlinks!="")
{w=w-100;len=len+50;}
var inner=null;var bgdiv=null;var div=null;if(cls.indexOf('dialog')!=-1)
{if(browsed!="")
{if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1)
{w=screen.availWidth-10;h=screen.availHeight-60;}
div=tcontainer.create('div',{className:'dialog3',style:{background:'#fff',width:w+'px',height:(h-30)+'px',zIndex:99999+countwin+1,overflow:'hidden',margin:'0px',padding:'0px'},id:ind+''+countwin});inner=div.create('div',{style:{border:'none',margin:'0px',padding:'0px',background:'#fff',width:w+'px',height:(h-30)+'px',overflow:'hidden',cursor:'default',zIndex:99999+countwin+2}});closeel=1;}
else
{bgdiv=createBgDiv(ind+''+countwin+'bgdiv',countwin);div=tcontainer.create('div',{className:cls,style:{width:w+'px',height:h+'px',zIndex:99999+countwin+1,overflow:'hidden',margin:'0px',padding:'0px',cursor:'se-resize'},id:ind+''+countwin,onmousedown:'startScale',onmouseup:'stopScale',onmouseout:'stopScale',onmouseover:'stopScale'});var inner=div.create('div',{style:{border:'none',margin:'5px',padding:'0px',width:(w-10)+'px',height:(h-10)+'px',overflow:'hidden',cursor:'default',zIndex:99999+countwin+2}});var p=inner.create('p',{textNode:msg,className:'pheader',style:{textAlign:'center',zIndex:99999+countwin+3},onmousedown:'startMove',onmouseup:'stopMove',onmouseout:'stopMove',onmouseover:'stopMove'});p.create('span',{textNode:'X',title:'Закрыть',className:'del',onmousedown:dispatcher});p.create('span',{textNode:'_',title:'Свернуть',className:'unwrap',onmousedown:unWrapLayer});}
if(divframe!="")
{var theh=(browsed!="")?(h-30):(h-35);var thew=(browsed!="")?w:(w-10);var ifr=null;if(forlinks=="")
{ifr=inner.create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:thew+'px',height:theh+'px',zIndex:99999+countwin+4},border:'0',frameBorder:'0',marginWidth:'0',marginHeight:'0',scrolling:scrolling,src:src});}
else
{ifr=inner.create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:(w-10)+'px',height:(h-125)+'px',zIndex:99999+countwin+4},frameborder:'0',marginwidth:'0',marginheight:'0',scrolling:scrolling,src:src});var pin=inner.create('p',{style:{textAlign:'center',marginTop:'10px'}});pin.create('input',{className:'button2',id:'closebut',value:closename,onmousedown:dispatcher,type:'button'});pin=null;}
ifr=null;}
else
{var frm=null;frm=inner.create('form',{id:ind+'form',enctype:multipart,onsubmit:'function(){return false;}',className:'winform',style:{cursor:'default',margin:'0px',padding:'0px',overflow:'auto',width:'100%',height:(h-100)+'px'}});var lpc=frm.create('div',{style:{font:'normal 10pt/24pt Arial',padding:'10px 0 10px 50px'},textNode:'Пожалуйста, подождите ...'});lpc.n.innerHTML+='<div class="progress small"><div></div></div>';var pin=null;if(forlinks=="")
{pin=inner.create('p',{style:{textAlign:'center',paddingTop:'10px'}});if(callback!="")
{if(disabled!="")
pin.create('input',{className:'button',id:'callbut',value:callbackname,onkeyup:callback,onmousedown:callback,type:'button',disabled:'true'});else
pin.create('input',{className:'button',id:'callbut',value:callbackname,onkeyup:callback,onmousedown:callback,type:'button'});}
pin.create('input',{className:'button2',id:'closebut',value:closename,onmousedown:dispatcher,type:'button'});}
frm=pin=null;}}
else
{var div=tcontainer.create('div',{className:cls,style:{zIndex:99999+countwin+1,margin:'0px',padding:'0px'},id:ind+''+countwin});var frm=div.create('form',{id:ind+'form'});if(cls!='loader')
{var lpc=frm.create('div',{style:{font:'normal 10pt/24pt Arial',padding:'10px 0 10px 50px'},textNode:'Пожалуйста, подождите ...'});lpc.n.innerHTML+='<div class="progress small"><div></div></div>';}
else
{var lpc=frm.create('div',{style:{width:'100%',height:'100%'}});lpc.n.innerHTML+='<div class="progress"><div></div></div>';}}
if(closeel==null)
div.addevent('keyup',eval(dispatcher));arrwin[countwin]=[div.n.parentNode,div.n,layclose];countwin++;frmh=container.clientHeight||window.innerHeight;if(browsed=="")
{container.style.overflow="hidden";}
div.setx(len);div.sety(t);tcontainer=bgdiv=div=inner=p=null;return;}
function closeThisWin(event)
{stopEffects(event);var etype=getEtype(event).toLowerCase();if(etype=='keyup')
{var Key=getCode(event);if(Key==27)
{delLayerWin();return false;}
else
return;}
else
{delLayerWin();return false;}}
function printErrAjax(ind,root)
{var arg={'message':'ОШИБКА','target':self,'width':'590','height':'450'};showLayerWin(ind,arg);var div=take(ind+'form');div.n.innerHTML="";div.create('div',{id:'type11',textNode:'ОШИБКА'});var mess=div.create('div',{id:'message11'});var act=div.create('div',{id:'action11'});if(root.hasChildNodes())
{var children=root.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{if(children[j].nodeName=='message')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
{var text=kids[i].text||kids[i].textContent;mess.create('p',{textNode:text});}}}
if(children[j].nodeName=='action')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
{var text=kids[i].text||kids[i].textContent;act.create('p',{textNode:text});}}}
if(children[j].nodeName=='reason')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='message'))
{var kinds=kids[i].childNodes;for(var z=0;z<kinds.length;z++)
{if((kinds[z].nodeType==1)&&(kinds[z].nodeName=='entry'))
{var text=kinds[z].text||kinds[z].textContent;mess.create('p',{textNode:text});}}}}}}}}
else
{mess.create('p',{textNode:'Неизвестная ошибка выполнения.'});act.create('p',{textNode:'Обратитесь к администратору системы'});}
div=mess=act=null;}
function WriteError(t,h)
{if(typeof t!="object")
{t={};t._message_0="Указанный пользователь в системе не зарегистрирован.";t._action_1="Введите правильные данные";}
else
{if(typeof t._action_1=="undefined")
t._action_1="Введите правильные данные";}
var arg={'cls':'dialog2','message':'ОШИБКА','target':self,'width':'500','height':'400'};if(typeof h=="string")
{if(h=='index')
{arg["dispatcher"]="function c(){goToLocation('index');}";}
else
{arg["dispatcher"]='historyBack';}}
showLayerWin('errorwin',arg);var div=take('errorwinform');div.n.innerHTML="";div.create('p',{textNode:t._message_0});div.create('p',{textNode:t._action_1});}
function historyBack()
{history.go(-1);}
function disPlay(o)
{if(o.parentNode.nextSibling!=null)
{var obj=o.parentNode.nextSibling;if(obj.style.display!="none")
{obj.style.display="none";o.parentNode.className="folder";o.title="Развернуть";}
else
{obj.style.display="";o.parentNode.className="folder_";o.title="Свернуть";}}}
function showHide2(o,ind)
{var par=o.parentNode;var next=par.nextSibling;var cls=o.className;if(par.className=='tabs')
{var parr=take(par).tags('span');var narr=take(next).getsign('div',{className:'adddiv'});for(var i=0;i<parr.length;i++)
{parr[i].className='add1';}
for(var i=0;i<narr.length;i++)
{narr[i].style.display='none';}}
if(cls=='add1')
{o.className='add2 border';take(ind).n.style.display='';}
else
{o.className='add1';take(ind).n.style.display='none';}}
function showHide1(o)
{var obj=o.nextSibling;if(obj!=null)
{obj.style.display=(obj.style.display=="none")?"":"none";o.title=(o.title=="Развернуть")?"Свернуть":"Развернуть";o.className=(o.className.indexOf('_')!=-1)?o.className.substring(0,o.className.indexOf('_')):o.className+'_';}}
function toggleWrap(o)
{var obj=take(o.parentNode);obj.switchclass('wrap','unwrap');}
function showHide(o)
{if(o.nextSibling!=null)
{var obj=o.nextSibling;if(obj.style.display!="none")
{obj.style.display="none";o.className="add1";o.title="Развернуть";}
else
{obj.style.display="";o.className="add2";o.title="Свернуть";}}}
function showHideM(o,g)
{var obj=take(o);if(obj.n.className.indexOf('_')!=-1)
{obj.n.className=obj.n.className.substring(0,obj.n.className.indexOf('_'));}
else
{obj.n.className=obj.n.className+'_';}
if(typeof g!="undefined")
{var obj1=take(g);if(obj1.n.className.indexOf('_')!=-1)
{obj1.n.className=obj1.n.className.substring(0,obj1.n.className.indexOf('_'));}
else
{obj1.n.className=obj1.n.className+'_';}}}
function goToLocation(o,lind)
{if((o.indexOf('regform')!=-1)&&(typeof regfromlayer!="undefined"))
{createRegLayer();return;}
else if((o.indexOf('privat')!=-1)&&(typeof regfromlayer!="undefined"))
{createAuthLayer();return;}
else
{var fr=take(document.body).create('form',{method:'POST',action:'/'+foldername+'/'});if((typeof o=="string")&&(o.indexOf('close')==-1))
{if(typeof numsean!="undefined")
fr.create('input',{type:'hidden',name:'_numsean',value:numsean});if(typeof _localiddb!="undefined")
{fr.create('input',{type:'hidden',name:'_localiddb',value:_localiddb});fr.create('input',{type:'hidden',name:'_iddb',value:_iddb});}
else
fr.create('input',{type:'hidden',name:'_iddb',value:numDB});if(typeof _skin!="undefined")
fr.create('input',{type:'hidden',name:'_skin',value:_skin});if(typeof _ltitle!="undefined")
fr.create('input',{type:'hidden',name:'_ltitle',value:replaceSymb(_ltitle)});if(typeof _lind!="undefined")
fr.create('input',{type:'hidden',name:'_lind',value:replaceSymb(_lind)});if(typeof lind!="undefined")
fr.create('input',{type:'hidden',name:'_lind',value:replaceSymb(lind)});if(typeof _laddress!="undefined")
fr.create('input',{type:'hidden',name:'_laddress',value:replaceSymb(_laddress)});if(typeof _sigla!="undefined")
fr.create('input',{type:'hidden',name:'_sigla',value:_sigla});if(typeof _site!="undefined")
fr.create('input',{type:'hidden',name:'_site',value:_site});if(typeof _elcat!="undefined")
fr.create('input',{type:'hidden',name:'_elcat',value:_elcat});if(addfilters!="")
{addfilters=addfilters.replace(/\"/g,'\\\"');addfilters=prepareStr(addfilters);fr.create('input',{type:'hidden',name:'_addfilters',value:addfilters});}
if(typeof _linkstring!="undefined")
fr.create('input',{type:'hidden',name:'_linkstring',value:_linkstring});if(typeof _cataloguer!="undefined")
fr.create('input',{type:'hidden',name:'_cataloguer',value:_cataloguer});if(typeof _typework!="undefined")
fr.create('input',{type:'hidden',name:'_typework',value:_typework});if(basequant!="")
fr.create('input',{type:'hidden',name:'_basequant',value:basequant});else
{if(typeof _basequant!="undefined")
fr.create('input',{type:'hidden',name:'_basequant',value:_basequant});}
var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
else
fr.create('input',{type:'hidden',name:'_flag45',value:'yes'});fr.create('input',{type:'hidden',name:'fio',value:fio});if(o.indexOf('individual')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('promo')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('regform')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('privat')!=-1)
{if(typeof _str!="undefined")
fr.create('input',{type:'hidden',name:'_str',value:_str});if(typeof _showstr!="undefined")
fr.create('input',{type:'hidden',name:'_showstr',value:_showstr});}
if((typeof codeMenu!="undefined")&&(codeMenu!=""))
fr.create('input',{type:'hidden',name:'_codemenu',value:codeMenu});if(o.indexOf('index')==-1)
{if((o.indexOf('history')==-1)&&(o.indexOf('sigla')==-1)&&(o.indexOf('participants')==-1))
{if(typeof pages[o]!="undefined")
fr.create('input',{type:'hidden',name:'p',value:pages[o].directory+'/'+o});}
else
{if(o.indexOf('participants')!=-1)
{searchFundHolders(null,'Юр. Лицо');return;}
else if(o.indexOf('sigla')!=-1)
{openSigla(null,_localiddb,_skin);return;}
else
{if(typeof modules[o]!="undefined")
fr.create('input',{type:'hidden',name:'m',value:modules[o].directory+'/'+o+'.php'});}}}
if((o.indexOf('teacher')!=-1)||(o.indexOf('student')!=-1))
fr.create('input',{type:'hidden',name:'typecat',value:o});if(typeof _auth!="undefined")
fr.create('input',{type:'hidden',name:'_auth',value:_auth});if(typeof _repoauthor!="undefined")
fr.create('input',{type:'hidden',name:'_repoauthor',value:_repoauthor});if(typeof _profile!="undefined")
fr.create('input',{type:'hidden',name:'_profile',value:_profile});var cont=take(document.body);if(cont.hasclass('blind_panel'))
{if((typeof _sheet!="undefined")&&(cont.hasclass(_sheet)))
cont.delclass(_sheet);bodyclass=document.body.className;}
else
bodyclass="";if(bodyclass!="")
fr.create('input',{type:'hidden',name:'_bodyclass',value:bodyclass});if(typeof _rubricator!="undefined")
fr.create('input',{type:'hidden',name:'_rubricator',value:_rubricator});}
fr.n.submit();}}
var onloadfuncs=new Array();function registrOnloadFunctions(func)
{var oldonload=window.onload;if(typeof window.onload!='function')
{window.onload=func;}
else
{onloadfuncs.push(oldonload);onloadfuncs.push(func);window.onload=function()
{for(i=0;i<onloadfuncs.length;i++)
{onloadfuncs[i]();}}}}
function livesearch(o)
{typework="";var item=null;var lab="";if(typeof o!="undefined")
{livsrc=item=o;livlabel=lab=o.className;typesearch="combined";}
else
{item=take('itemsimple').n;lab=item.parentNode.previousSibling.firstChild.lastChild.className.substring(1);}
var div=take('livesearch');var val=item.value;var tmp=/^[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]+/;if(tmp.test(val))
val=Trim2(val);if((val=="")||(val.length<1))
{div.hide();return;}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label",lab]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["query",val]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showLivWin);}
function showLivWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{;}
else
{if(response[0]._indx_0!=null)
{var div=take('livesearch');div.n.innerHTML="";var item=null;if(livsrc!=null)
item=livsrc;else
item=take('itemsimple').n;var j=0;for(var key in response[0])
{var value=response[0][key];if(key.indexOf('indx_')!=-1)
{if((j%2)==0)
cls='g';else
cls='w';div.create('p',{className:cls,textNode:value._item,onmousedown:'function(){displayVoc(this)}'});}
j++;}
var h=take(item).geth();var w=take(item).getw();var X=elem_rect.x(item);var y=elem_rect.y(item)+h;div.show();div.setx(X);div.sety(y);div.setw(w);}}}
function displayVoc(o)
{var text=o.innerHTML;var div=take('livesearch');var item=null;if(livsrc!=null)
item=take(livsrc);else
item=take('itemsimple');text=text.replace(/\(/gi,'[bracket]');text=text.replace(/\)/gi,'[/bracket]');text=text.replace(/\'/gi,'[apos]');text=text.replace(/\"/gi,'[quot]');text="'"+text+"'";item.conceal();item.n.value=text;div.hide();simpleSearch();}
function simpleSearchAll(l,arg)
{typework="searchallbases";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);var obj=null;if(typeof arg!="undefined")
{obj=arg;}
else
{if(typeof l!="undefined")
obj=createSearchString(l);else
obj=createSearchString();}
if(obj==null)
{alert('Неверно задано поисковое предписание!');return;}
typesearch="simple";var str=prepareStr(obj._str);showstr=prepareStr(obj._showstr);showstr=prepareShowstring(showstr);querylist.push(["$str",str]);querylist.push(["$showstr",showstr]);str=brackets(str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);if((take('searchbox').n!=null)&&(take('searchbox').n.value!=""))
term=take('searchbox').n.value;var dbflag=false;for(var key in dbs)
{if(dbs[key]["type"]!="AF")
{if((key!="all")&&(key!="clean"))
{if((typeof iddb[key]!="undefined")&&(((typeof l=="undefined")&&(searchlabel!="")&&(typeof dbs[key]["labels"][searchlabel]!="undefined"))||((typeof l!="undefined")&&(typeof dbs[key]["labels"][l]!="undefined"))))
{if(typeof iddb[key][5]!="undefined")
{var arr=iddb[key][5];for(var i=0;i<arr.length;i++)
{if(arr[i][0]=="067")
{dbflag=true;break;}}}
if(!dbflag)
{querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",key]);querylist.push(["query",term]);gArr.push(["querylist",prepareQueryString(querylist,key)]);querylist.length=0;}
dbflag=false;}}}}
callToRCP(gArr);}
function searchInBase(o)
{typework="search";typesearch="simple";lockedfilters="";swfterm="";var howmuch=portion;var startfrom=0;var action="php";if(typeof biblio!="undefined")
action="biblio";var handler=modules["search"].directory+'/search.php';showstr=prepareStr(_showstr);showstr=prepareShowstring(showstr);var addlab=findaddlabel(_str);var str=brackets(_str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["_showstr",showstr]);querylist.push(["_str",replaceSymb(str)]);numDB=o.id.substring(1);var outfrm=outform;var ndb=numDB;if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
ndb=numdbBIBL;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
querylist.push(["iddb",ndb]);querylist.push(["query/body",term]);if(typeof biblio!="undefined")
{lockedfilters="";var bobj={'query':term,'databases':[ndb],'paging':{'limit':portion,'offset':startfrom}};var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
bobj.filters=fobj._bstr;gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{lockedfilters="";var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if(typeof dbs[ndb].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=ndb;if(addlab!=null)
obj.label=addlab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}
function simpleSearch(l,arg)
{if(typeof arg=="undefined")
lockedfilters="";swfterm="";if((typework=="searchallbases")||(numDB=='all'))
{simpleSearchAll(l);}
else
{var addlab="";typework="search";var obj=null;if(typeof arg!="undefined")
{obj=arg;}
else
{if(typeof l!="undefined")
obj=createSearchString(l);else
obj=createSearchString();if(typeof _sign!="undefined")
_sign=undefined;if(typeof _newrecs!="undefined")
_newrecs=undefined;if(typeof _month!="undefined")
_month=undefined;if(typeof _year!="undefined")
_year=undefined;}
if(obj==null)
{alert('Неверно задано поисковое предписание!');return;}
var action="php";if(typeof biblio!="undefined")
action="biblio";var handler=modules["search"].directory+'/search.php';showstr=prepareStr(obj._showstr);showstr=prepareShowstring(showstr);var str=obj._str;if(typeof obj._addlabel!="undefined")
addlab=obj._addlabel;var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);var countforms=-1;querylist.push(["outformList["+(++countforms)+"]/outform",outfrm]);querylist.push(["outformList["+(++countforms)+"]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMS"]);querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEECOPY"]);querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLELICENSE"]);}
if((searchlabel=="")&&(typesearch=="simple"))
searchlabel=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(searchlabel!="")
{querylist.push(["$searchlabel",searchlabel]);}
if(searchtermin!="")
{if(searchtermin.indexOf('*')!=-1)
searchtermin=searchtermin.substring(0,searchtermin.indexOf('*'));querylist.push(["$searchtermin",searchtermin]);}
querylist.push(["iddb",ndb]);str=brackets(str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);if(typeof biblio!="undefined")
{var bobj={'query':term,'databases':[ndb],'paging':{'limit':portion,'offset':0}};if(typeof obj._bstr!="undefined")
bobj.filters=obj._bstr;gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);if(typeof obj._history!="undefined")
querylist.push(["_history","yes"]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{if(lockedfilters!="")
{term='('+term+') AND '+prepareTerm(obj._bstr);}
if(typeof arg!="undefined")
{if((typeof _sortlabel!="undefined")&&(typeof _sortdirect!="undefined"))
{querylist.push(["query/label",_sortlabel]);querylist.push(["query/direct",_sortdirect]);querylist.push(["$sortlabel",_sortlabel]);querylist.push(["$sortdirect",_sortdirect]);}}
var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
if(typeof obj._exclude!="undefined")
{var arr=obj._exclude;var count=0;for(var j=0;j<arr.length;j++)
{if(key==arr[j][0])
{querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);count++;}}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);if((typeof obj._history!="undefined")||(lockedfilters!=""))
querylist.push(["_history","yes"]);}
if((take('searchbox').n!=null)&&(take('searchbox').n.value!=""))
term=take('searchbox').n.value;querylist.push(["query/body",term]);var label="0";if(typeof usesortlabel!="undefined")
label=usesortlabel;if(typeof obj._sortlabel!="undefined")
label=obj._sortlabel;var direct="asc";if((label=='PY')||(label=='DT'))
direct="desc";if(typeof obj._sortdirect!="undefined")
direct=obj._sortdirect;if(label!="0")
{querylist.push(["query/label",label]);querylist.push(["query/direct",direct]);querylist.push(["$sortlabel",label]);querylist.push(["$sortdirect",direct]);}
if(typesearch!='combined')
typesearch='simple';if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if(searchlabel!="")
{if(typeof dbs[ndb]["labels"][searchlabel][4]!="undefined")
{if((dbs[ndb]["labels"][searchlabel][4]!="Y")&&(dbs[ndb]["labels"][searchlabel][4]!="N")&&(dbs[ndb]["labels"][searchlabel][4]!="true")&&(dbs[ndb]["labels"][searchlabel][4]!="false")&&(dbs[ndb]["labels"][searchlabel][4]!=""))
{var arr=dbs[ndb]["labels"][searchlabel][4].split(',');for(var i=0;i<arr.length;i++)
{querylist.length=0;querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label",arr[i]]);querylist.push(["length",100]);querylist.push(["iddb",ndb]);querylist.push(["query",searchtermin]);querylist.push(["$facetlabel",arr[i]]);querylist.push(["$facettermin",searchtermin]);querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);gArr.push(["querylist",prepareQueryString(querylist)]);}}}}
livsrc=null;livlabel="";if(typeof dbs[ndb].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=ndb;if(addlab!="")
obj.label=addlab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}}
function nextSearch(c)
{if(typeof _newrecs!="undefined")
{searchNewRecs(numDB);}
else
{typework="search";var howmuch="";var startfrom="";if(typeof c=="undefined")
{howmuch=portion;startfrom=0;if((typeof _start!="undefined")&&(typeof _see=="undefined"))
startfrom=_start;}
else
{howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);}
var action="php";if(typeof biblio!="undefined")
action="biblio";var handler=modules["search"].directory+'/search.php';var str=prepareStr(_str);showstr=prepareStr(_showstr);showstr=prepareShowstring(showstr);var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);if(typeof biblio!="undefined")
querylist.push(["start",0]);else
querylist.push(["start",startfrom]);querylist.push(["$stopfilters","yes"]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["_history","yes"]);if(typeof _lastdb!="undefined")
numDB=_lastdb;var ndb=numDB;if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;querylist.push(["iddb",ndb]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var addlab=findaddlabel(str);var outfrm=outform;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
if(typeof _searchtitle!="undefined")
querylist.push(["$searchtitle",_searchtitle]);str=brackets(str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);if(typeof _filterstr!="undefined")
{querylist.push(["$filterstr",_filterstr]);querylist.push(["$filtersids",_filtersids]);querylist.push(["$fshowstr",_fshowstr]);var filterstr=brackets(_filterstr);filterstr=prepareTerm(filterstr);if(filterstr.indexOf('\\\\\\')!=-1)
filterstr=prepareStr(filterstr);filterstr=replaceS6(filterstr);term+=' AND '+filterstr;}
if(typeof _rubricator!="undefined")
querylist.push(["$rubricator",_rubricator]);if(typeof _rshowstr!="undefined")
querylist.push(["$rshowstr",_rshowstr]);if(typeof _swfterm!="undefined")
{swfterm=_swfterm;term=prepareTerm(swfterm);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);}
querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);var label="0";var direct="asc";if(typeof _sortlabel!="undefined")
label=_sortlabel;if(take('sortlab').n!=null)
label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;if(typeof _direct!="undefined")
direct=_direct;if((label=='PY')||(label=='DT'))
direct="desc";if(label!="0")
{querylist.push(["query/label",label]);querylist.push(["query/direct",direct]);querylist.push(["$sortlabel",label]);querylist.push(["$sortdirect",direct]);}
if(typeof biblio!="undefined")
{if(label!="0")
{if((label=='DT')||(label=='PY'))
term+=' SORTD '+label;else
term+=' SORT '+label;}
var bobj={'query':term,'databases':[ndb],'paging':{'limit':portion,'offset':startfrom}};var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
bobj.filters=fobj._bstr;gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
{if(lockedfilters!="")
{var tmp=fobj._bstr;tmp=prepareTerm(tmp);if(tmp.indexOf('\\\\\\')!=-1)
tmp=prepareStr(tmp);tmp=replaceS6(tmp);term='('+term+') AND '+tmp;}}
var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
if((fobj!=null)&&(typeof fobj._exclude!="undefined"))
{var arr=fobj._exclude;var count=0;for(var j=0;j<arr.length;j++)
{if(key==arr[j][0])
{querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);count++;}}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
querylist.push(["query/body",term]);if((typeof _searchlabel!="undefined")&&(_searchlabel!=""))
{querylist.push(["$searchlabel",_searchlabel]);}
if(typeof _searchtermin!="undefined")
{var stermin=prepareStr(_searchtermin);stermin=replaceSymb(_searchtermin);querylist.push(["$searchtermin",stermin]);}
if(typeof _lightstring!="undefined")
{savedstring=_lightstring;}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if((typeof _searchlabel!="undefined")&&(_searchlabel!=""))
{if((typeof dbs[ndb]["labels"][_searchlabel]!="undefined")&&(typeof dbs[ndb]["labels"][_searchlabel][4]!="undefined"))
{if((dbs[ndb]["labels"][_searchlabel][4]!="Y")&&(dbs[ndb]["labels"][_searchlabel][4]!="N")&&(dbs[ndb]["labels"][_searchlabel][4]!="true")&&(dbs[ndb]["labels"][_searchlabel][4]!="false")&&(dbs[ndb]["labels"][_searchlabel][4]!=""))
{var arr=dbs[ndb]["labels"][_searchlabel][4].split(',');for(var i=0;i<arr.length;i++)
{querylist.length=0;querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label",arr[i]]);querylist.push(["length",100]);querylist.push(["iddb",ndb]);querylist.push(["query",_searchtermin]);querylist.push(["$facetlabel",arr[i]]);querylist.push(["$facettermin",_searchtermin]);querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);gArr.push(["querylist",prepareQueryString(querylist)]);}}}}
if(typeof dbs[ndb].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=ndb;if(addlab!=null)
obj.label=addlab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}}
function showLable(o)
{typework="search";swfterm="";lockedfilters="";var lab=o.className;if(lab=="AF")
{findAfBaseById(o.firstChild.value,o.previousSibling.firstChild.innerHTML);}
else
{var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;if(dbs[db]["type"]=="AF")
db=numdbBIBL;if(typeof dbs[db]["labels"][lab]!="undefined")
{var action="php";if(typeof biblio!="undefined")
action="biblio";var labtext=dbs[db]["labels"][lab][0];var howmuch=portion;var startfrom=0;var handler=modules["search"].directory+'/search.php';if(typeof _sign!="undefined")
_sign=undefined;if(typeof _newrecs!="undefined")
_newrecs=undefined;if(typeof _month!="undefined")
_month=undefined;if(typeof _year!="undefined")
_year=undefined;var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["iddb",db]);numDB=db;var term="";var termtext="";term=(o.firstChild.nodeValue!=null)?o.firstChild.nodeValue:o.firstChild.firstChild.nodeValue;termtext=(o.firstChild.nodeValue!=null)?o.firstChild.nodeValue:o.firstChild.firstChild.nodeValue;if((o.parentNode)&&(o.parentNode.lastChild.nodeName.toLowerCase()=='input')&&(o.parentNode.lastChild.className=='searcht'))
{term=o.parentNode.lastChild.value;term=convertseef(term);}
else
{term=replaceSymb(term);if(term.indexOf('(')!=-1)
term="[apos]"+term+"[/apos]";}
showstr=prepareStr("<i>"+labtext+" </i>"+termtext);showstr=prepareShowstring(showstr);var str="[bracket]"+lab+" "+term+"[/bracket]";var fstr=convertlightstring3(showstr);lightstring=fstr;querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);var outfrm=outform;if(typeof dbs[db].outform!="undefined")
outfrm=dbs[db].outform;querylist.push(["$outform",outfrm]);querylist.push(["$searchlabel",lab]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);if(typeof biblio!="undefined")
{lockedfilters="";var bobj={'query':term,'databases':[db],'paging':{'limit':portion,'offset':startfrom}};var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
bobj.filters=fobj._bstr;gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{lockedfilters="";var count1=-1;var countscore=-1;for(var key in dbs[db]["labels"])
{if(dbs[db]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[db]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[db]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[db]["labels"][key][6]]);}}
var score=parseInt(dbs[db]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if(typeof dbs[db].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=db;obj.label=lab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}
else
{alert('Метка '+lab+' отсутствует в системе!');return;}}}
function historySearch(ind)
{typework="search";var gArr=new Array();var querylist=new Array();var str=etb=handler=lab="";showstr="";var stri=take('str'+ind);var showstri=take('showstr'+ind);var etbi=take('etb'+ind);var outformi=take('outf'+ind);var handleri=take('hand'+ind);var outfrm=outform;if(etbi.n!=null)
{numDB=etbi.n.innerHTML.substring(0,etbi.n.innerHTML.indexOf(':'));etb=etbi.n.innerHTML.substring(etbi.n.innerHTML.indexOf(':')+1);}
if(stri.n!=null)
{str=stri.n.innerHTML;var part=str.substring(0,str.indexOf(' '));lab=part.substring(part.lastIndexOf('[bracket]')+9);if(lab=='COD')
lab='MS';if((lab=='AUIDS')||(lab=='ID'))
{var count=-1;for(var key in dbs[numDB]["labels"])
{count++;if(count==4)
{lab=key;break;}}}}
if((showstri.n!=null)&&(showstri.n.innerHTML!=""))
{showstr=prepareStr(showstri.n.innerHTML);}
if(handleri.n!=null)
handler=handleri.n.innerHTML;showstr=prepareShowstring(showstr);lightstring=convertlightstring3(showstr);var action="php";if(typeof biblio!="undefined")
action="biblio";gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);if(typeof _localiddb!="undefined")
querylist.push(["iddb",_localiddb]);else
querylist.push(["iddb",numDB]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["_history","yes"]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var addlab=findaddlabel(str);if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
outfrm=dbs[numDB].outform;if(outformi.n!=null)
if(outformi.n.innerHTML!="")
outfrm=outformi.n.innerHTML;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
str=brackets(str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);querylist.push(["$sortlabel",""]);querylist.push(["$searchlabel",lab]);if(typeof biblio!="undefined")
{lockedfilters="";var bobj={'query':prepareTerm(str),'databases':[numDB],'paging':{'limit':portion,'offset':0}};gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{lockedfilters="";var count1=-1;var countscore=-1;for(var key in dbs[numDB]["labels"])
{if(dbs[numDB]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[numDB]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[numDB]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[numDB]["labels"][key][6]]);}}
var score=parseInt(dbs[numDB]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
if(str.indexOf('DT ')!=-1)
{querylist.push(["query/label","DT"]);querylist.push(["query/direct","desc"]);querylist.push(["$sortlabel","DT"]);querylist.push(["$sortdirect","desc"]);querylist.push(["$direct","desc"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if(typeof dbs[numDB].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=numDB;if(addlab!=null)
obj.label=addlab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}
function createSearchString(l)
{var obj={_str:"",_showstr:""};if((typeof scrolllayer!="undefined")&&(scrolllayer=="left_frame"))
typesearch='combined';lightstring="";savedstring="";lockedstring="";if((typesearch=='simple')||(typesearch=='combined')||((typeof l!="undefined")&&((l=='AUIDS')||(l=='COD'))))
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;var tmp="";if(typesearch=='combined')
{if(showrubterm!="")
tmp=showrubterm;if(livsrc!=null)
tmp=livsrc.value;if(tmp=="")
if(vocobj!="")
tmp=take(vocobj).n.value;}
else
tmp=take('simple_search').getsign('input',{type:'text'})[0].value;if((tmp!='')&&(tmp.length>1))
{var lab="";if(typesearch=='combined')
{lab=livlabel;if(lab=="")
if(vocobj!="")
lab=take(vocobj).n.className;}
else
lab=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(typeof l!="undefined")
lab=l;if(typeof dbs[ndb]["labels"][lab]!="undefined")
{var labtext=dbs[ndb]["labels"][lab][0];var tmpl=/'$/;if(tmpl.test(tmp))
{tmp=tmp.substring(1,tmp.length-1);tmp=tmp.replace(/\' OR \'/gi,"[/apos] OR [apos]");tmp=tmp.replace(/\' AND \'/gi,"[/apos] AND [apos]");tmp=replaceSymb(tmp);tmp="[apos]"+tmp+"[/apos]";}
lightarr.push(convertlightstring(tmp));if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8]!="undefined"))
lab=dbs[ndb]["labels"][lab][8];searchlabel=lab;obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';searchtermin=replaceSymb(tmp);if(showtext!="")
obj._showstr+='<i>'+labtext+'</i> '+showtext;else
obj._showstr+='<i>'+labtext+'</i> '+tmp;}
else
return null;}
else
return null;}
else if(typesearch=='authority')
{var tmp=take('authority_search').getsign('input',{type:'text'})[0].value;if((tmp!='')&&(tmp.length>1))
{var lab=take('authority_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(typeof l!="undefined")
lab=l;var labtext=dbs[numDB]["labels"][lab][0];obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);}
else
return null;}
else if(typesearch=='expand')
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;var arri=take('expand_search').getsign('input',{className:'iLAB'});var arr=[];var count=0;var countl=0;for(var i=0;i<arri.length;i++)
{if(arri[i].value!="")
{arr.push(arri[i]);count++;}}
for(var i=0;i<arr.length;i++)
{var lab=null;var log=null;if(arr[i].parentNode.previousSibling.className=='opt1')
{lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);log=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);}
else
lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);var term=arr[i].value;term=term.Trim();var term1=term2=tmp="";var labtext=dbs[ndb]["labels"][lab][0];if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8]!="undefined"))
lab=dbs[ndb]["labels"][lab][8];if(i==0)
searchlabel=lab;if((term.indexOf("' OR '")!=-1)||(term.indexOf("' AND '")!=-1)||(term.indexOf("' NOT '")!=-1))
{term=term.substring(1,term.length-1);tmp=term.replace(new RegExp("' AND '",'g')," И ");tmp=tmp.replace(new RegExp("' OR '",'g')," ИЛИ ");obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);var arr1=term.split('\' AND \'');for(var j=0;j<arr1.length;j++)
{if(arr1[j]!="")
{var arr2=arr1[j].split('\' OR \'');for(var z=0;z<arr2.length;z++)
{term1+=arr2[z];if(z<(arr2.length-1))
term1+="[/apos] OR [apos]";}
if(j<(arr1.length-1))
term1+="[/apos] AND [apos]";}}
term1=term1.replace(/\' NOT \'/gi,"[/apos] NOT [apos]");term1="[apos]"+replaceSymb(term1)+"[/apos]"}
else
{var tmpl=/'$/;if(tmpl.test(term))
{term1=term.substring(1,term.length-1);term1=replaceSymb(term1);if((term.indexOf("BETWEEN '")==-1)&&(term.indexOf("LE '")==-1)&&(term.indexOf("GE '")==-1))
obj._showstr+='<i>'+labtext+'</i> '+term1;else
obj._showstr+='<i>'+labtext+'</i> '+replaceSymb7(term);term1="[apos]"+term1+"[/apos]";}
else
{term1=replaceSymb(term);if((log!=null)&&(log!="EXACT"))
{if(log=='ANY')
term1=term1.replace(/\s{1,}/g,' OR ');else
term1=term1.replace(/\s{1,}/g,' AND ');}
var showterm=term1.replace(/ OR /g,' ИЛИ ');showterm=showterm.replace(/ AND /g,' И ');obj._showstr+='<i>'+labtext+'</i> '+showterm;}}
if((term.indexOf("BETWEEN '")==-1)&&(term.indexOf("LE '")==-1)&&(term.indexOf("GE '")==-1))
{lightarr.push(convertlightstring(term1));obj._str+='[bracket]'+lab+' '+term1+'[/bracket]';if(i==0)
searchtermin=term1;}
else
{obj._str+='[bracket]'+lab+' '+convertlimits(term)+'[/bracket]';if(i==0)
searchtermin=convertlimits(term);}
if(count>1)
{if(i<count-1)
{if(arr[i].parentNode.parentNode.previousSibling.className=='logcontainer')
{obj._str+=' '+arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)+' ';obj._showstr+=' <i>'+dbs[ndb]["labels"][arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)][0]+'</i> ';}
else
{obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}}}}
if((take('limits_'+ndb).n!=null)&&(take('limits_'+ndb).n.style.display!="none"))
{var limits=take('limits_'+ndb).getsign('div',{className:'limits_left'});for(var i=0;i<limits.length;i++)
{var ltitle=limits[i].firstChild.innerHTML;if(limits[i].lastChild.className=="input")
{if(limits[i].lastChild.firstChild.id.indexOf('one')!=-1)
{var lobj=limits[i].lastChild.firstChild;if(lobj.value!="")
{countl++;if(count>0)
{obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}
obj._str+='[bracket]'+lobj.className+' [apos]'+lobj.value+'[/apos][/bracket]';obj._showstr+='<i>'+ltitle+'</i> '+lobj.value;}}
else
{var lobj=take(limits[i]).tags('input');var first=lobj[0].value;var last=lobj[1].value;var lim=lobj[0].className;if(parseInt(first,10)>parseInt(last,10))
return null;else
{if(!isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
{countl++;if(count>0)
{obj._str='[bracket]'+obj._str+'[/bracket]';obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}
obj._str+='[bracket]'+lim+' BETWEEN [apos]'+first+'[/apos],[apos]'+last+'[/apos][/bracket]';obj._showstr+='<i>'+ltitle+' c</i> '+first+' <i>по</i> '+last;}
if(!isNaN(parseInt(first,10))&&isNaN(parseInt(last,10)))
{countl++;if(count>0)
{obj._str='[bracket]'+obj._str+'[/bracket]';obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}
obj._str+='[bracket]'+lim+' GE [apos]'+first+'[/apos][/bracket]';obj._showstr+='<i>'+ltitle+' c</i> '+first+' ';}
if(isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
{countl++;if(count>0)
{obj._str='[bracket]'+obj._str+'[/bracket]';obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}
obj._str+='[bracket]'+lim+' LE [apos]'+last+'[/apos][/bracket]';obj._showstr+='<i>'+ltitle+' по</i> '+last+' ';}}}}
else
{if(limits[i].lastChild.lastChild.className!="all")
{countl++;if(count>0)
{obj._str='[bracket]'+obj._str+'[/bracket]';obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}
var lim=limits[i].lastChild.lastChild.className;var val=limits[i].lastChild.lastChild.innerHTML;obj._str+=convertbrackets(lim);obj._showstr+='<i>'+ltitle+'</i> '+val;}}}}
if((count<1)&&(countl<1))
return null;}
else
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;if((typeof l!="undefined")&&(typeof fromaftobibl!="undefined")&&(l==fromaftobibl[0]))
{var lab=l;var labtext=dbs[ndb]["labels"][lab][0];if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(typeof dbs[ndb]["labels"][lab][8]!="undefined"))
lab=dbs[ndb]["labels"][lab][8];tmp=take('itemprof').n.value;lightarr.push(convertlightstring(tmp));obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);}
else
{var par=take('expr').n;var tmp="";var tmp2="";var tmp3="";var tmp4="";var tmp6="";var ind="";if(par.childNodes.length==0)
{if(take('itemprof').n.value!='')
putLAB(take('sand').n);else
return null;}
for(var j=0;j<par.childNodes.length;j++)
{if(par.childNodes[j].hasChildNodes())
{var ind=par.childNodes[j].id;if(par.childNodes[j].innerHTML.indexOf('OR')!=-1)
tmp3='OR';if(par.childNodes[j].innerHTML.indexOf('AND')!=-1)
tmp3='AND';if(par.childNodes[j].innerHTML.indexOf('NOT')!=-1)
tmp3='NOT';var and=take(ind).n.className;var arr=take(ind).getsign('span',{className:ind});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{if(ind=='FT')
{tmp=arr[i].innerHTML.replace(/\s*-\s*/g,'-');tmp=tmp.replace(/\s{2,}/g,' ');tmp=replaceSymb(tmp);tmp6=tmp;}
else if(ind=='PY')
{tmp6=arr[i].innerHTML;tmp=arr[i].innerHTML.replace(/с \<b\>/i,"BETWEEN [apos]");tmp=tmp.replace(/\<\/b\> по \<b\>/i,"[/apos],[apos]");tmp=tmp.replace(/\<\/b\>/i,"[/apos]");}
else
{var tmp5=/'$/;if(tmp5.test(arr[i].innerHTML))
{tmp=tmp6=arr[i].innerHTML.substring(1,arr[i].innerHTML.length-1);tmp=tmp.replace(/\' OR \'/gi,"[apos] OR [/apos]");tmp=tmp.replace(/\' AND \'/gi,"[apos] AND [/apos]");tmp=tmp.replace(/\' NOT \'/gi,"[apos] NOT [/apos]");tmp=replaceSymb(tmp);tmp="[apos]"+tmp+"[/apos]";tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");}
else
{tmp=tmp6=arr[i].innerHTML;tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");tmp=replaceSymb(tmp);}}
tmp2+=tmp;tmp4+=tmp6;if(i!=(arr.length-1))
{if(tmp3!='')
{tmp2+=' '+tmp3+' ';tmp4+=dbs[ndb]["labels"][tmp3][0];}}}
var labtext=dbs[ndb]["labels"][ind][0];if(and!="")
{obj._str+=' '+and+' [bracket]'+ind+' '+tmp2+'[/bracket]';obj._showstr+=' <i>'+dbs[ndb]["labels"][and][0]+' '+labtext+'</i> '+tmp4;}
else
{obj._str+='[bracket]'+ind+' '+tmp2+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+tmp4;}
if(j==0)
{searchlabel=ind;searchtermin=tmp2;}
lightarr.push(convertlightstring(tmp2));tmp2=tmp=tmp6=tmp4="";}}}}}
if((lightarr.length)&&(lightarr.length>0))
lightstring=lightarr.join(' ');searchtermin=convertlimits2(searchtermin);obj._str=convertlimits2(obj._str);if((typeof searchlabel!="undefined")&&(searchlabel!=""))
obj._addlabel=searchlabel;return obj;}
function SeeF(act,str,c)
{if(act==null)
act=_id;else
lockedfilters="";var actstr=act;act=prepareTerm(act);var actjson=JSON.parse(act);var term=actjson.query;term=convertseef(term);_newrecs="";var obj={};obj._str=term;obj._showstr=_showstr;if(typeof str!="undefined")
obj._showstr=prepareShowstring(str);simpleSearch(null,obj);}
function See(o,ind,act,c,rdb)
{if(ind==null)
ind=_id;else
lockedfilters="";if(act==null)
act=_see;var indx=replaceSymb(ind);addid="see"+indx;if(((act=="SEEF")&&(take('see'+indx).n!=null))&&((typeof dbs[numDB].seef!="undefined")&&(dbs[numDB].seef=="hierarchical")))
{if(take('see'+indx).n.style.display=='none')
{if(take('see'+indx).n.innerHTML=='')
{typework="";take('see'+indx).n.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label","YTV"]);querylist.push(["length",400]);querylist.push(["iddb",numDB]);querylist.push(["query",ind]);querylist.push(["$tmp",indx]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showSee2Win);}}
showHide2(o,addid);}
else
{if(act=='SEEF')
{SeeF(o,"",c);}
else
{typework="search";var howmuch="";var startfrom="";if(c==null)
{howmuch=portion;startfrom=0;}
else
{howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);}
var handler=modules["search"].directory+'/search.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);var str=prepareStr(_str);showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["_history","yes"]);querylist.push(["_start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["$see",act]);var ndb=numDB;if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if((typeof rdb!="undefined")&&(rdb!=""))
{querylist.push(["$lastdb",ndb]);ndb=rdb;}
querylist.push(["start",startfrom]);querylist.push(["length",howmuch]);querylist.push(["action",act]);var outfrm=outform;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
if(typeof solr!="undefined")
{var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
querylist.push(["iddb",ndb]);querylist.push(["id",ind]);querylist.push(["$id",indx]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,ndb)]);callToRCP(gArr);}}}
function showSee2Win(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take('see'+_tmp);div.n.innerHTML="";if(response[0]._indx_0!=null)
{var j=0;for(var key in response[0])
{if(key.indexOf('indx_')!=-1)
{var value=response[0][key];var item=value._item.split('[Y]');if(replaceSymb(item[0])==_tmp)
{var span=div.create('span',{id:replaceSymb(value._item),className:'see',data:'Всего выпусков: '+value._size,onmousedown:'function(){showIssues(this)}'});span.create('b',{textNode:item[1]});span.text(' г.');span.create('i',{className:'comma'});div.create('div',{className:'issuediv',style:{display:'none'}});j++;}}}
if(j==0)
div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания',style:{textAlign:'center'}});}
else
{div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания',style:{textAlign:'center',margin:'40px 0 0 0'}});}}}
function showIssues(o)
{typework="";if(o.nextSibling.style.display=='none')
{if(o.nextSibling.innerHTML=='')
{o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",400]);querylist.push(["iddb",numDB]);querylist.push(["outformList[0]/outform","ISSUE"]);querylist.push(["query/body","YTV "+o.id]);if(typeof dbs[numDB]["labels"]["STVN"]!="undefined")
{querylist.push(["query/label","STVN"]);querylist.push(["query/direct","asc"]);}
querylist.push(["$tmp",o.id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showIssuesWin);}
o.className+=' border';o.nextSibling.style.display='';}
else
{o.className='see';o.nextSibling.style.display='none';}}
function showIssuesWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take(_tmp).n.nextSibling;div.innerHTML="";var j=0;for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=value._id;var item=value._ISSUE_0[0].split('[TULTIP]');var span=take(div).create('span',{id:'_'+replaceSymb(ind),className:'issue',data:item[1],onmousedown:'function(){showRecords(this)}'});if(item[0]!="")
span.create('b',{textNode:item[0]});else
span.create('b',{textNode:item[1]});span.create('i',{className:'comma'});take(div).create('div',{className:'recdiv',style:{display:'none'}});j++;}}}}
function showRecords(o)
{typework="";if(o.nextSibling.style.display=='none')
{if(o.nextSibling.innerHTML=='')
{var outfrm=outform;if(typeof dbs[numDB].outform!="undefined")
outfrm=dbs[numDB].outform;o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["$outform",outfrm]);var count=0;if(typeof _linkstring!="undefined")
querylist.push(["outformList["+(++count)+"]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList["+(++count)+"]/outform","SHORTFMS"]);querylist.push(["outformList["+(++count)+"]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList["+(++count)+"]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList["+(++count)+"]/outform","AVAILABLEECOPY"]);}
querylist.push(["query/body","ID "+o.id.substring(1)]);querylist.push(["$tmp",o.id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showRecordsWin);}
o.className+=' border';o.nextSibling.style.display='';}
else
{o.className='issue';o.nextSibling.style.display='none';}}
function showRecordsWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var exquant=0;var ecopy=0;var lquantity=0;var iddbecopy=0;var idrececopy="";var accesstype="";var eurl="";for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var next=take(_tmp).n.nextSibling;var div=take(next);div.n.innerHTML="";var tab=div.create('div',{className:'table w100'});var row=tab.create('div',{className:'row'});var td4=row.create('div',{className:'td w88x vtop'});var td5=row.create('div',{className:'td vtop p10x'});var slids=[];var j=0;var library='';var value=response[0][key];var ind=value._id;var iddb=value._sourceIddb;var rdb=value._iddb;var outfrm=outform;var flagurl=false;var seeplace=false;if(typeof dbs[rdb].outform!="undefined")
outfrm=dbs[rdb].outform;var imgsrc="";if((typeof dbs[rdb].additional.nophoto!="undefined")&&(dbs[rdb].additional.nophoto=="display"))
imgsrc=pathimg+'/nophoto.png';var arrcont="";if(outfrm=='SHOTFORM')
arrcont=value._SHOTFORM_0._content_0;else
arrcont=eval('value._'+outfrm+'_0');var arr=[];if(typeof value._AVAILABLEEXEMPLARS_1!="undefined")
exquant=value._AVAILABLEEXEMPLARS_1._quantity;if(typeof value._AVAILABLEEXEMPLARS_0!="undefined")
exquant=value._AVAILABLEEXEMPLARS_0._quantity;if((typeof value._AVAILABLEECOPY_0!="undefined")||(typeof value._AVAILABLEECOPY_1!="undefined"))
{var o=null;if(typeof value._AVAILABLEECOPY_0!="undefined")
o=value._AVAILABLEECOPY_0;else
o=value._AVAILABLEECOPY_1;if(typeof o._ecopy!="undefined")
ecopy=parseInt(o._ecopy,10);else
ecopy=0;if(typeof o._iddbEcopy!="undefined")
iddbecopy=parseInt(o._iddbEcopy,10);else
iddbecopy=0;if(typeof o._quantity!="undefined")
lquantity=parseInt(o._quantity,10);else
lquantity=0;if(typeof o._idRecEcopy!="undefined")
idrececopy=o._idRecEcopy;else
idrececopy="";if(typeof o._accessType!="undefined")
accesstype=o._accessType;else
accesstype="";}
if(typeof _linkstring!="undefined")
{arr=value._LINEORD_1;}
for(var i=0;i<arrcont.length;i++)
{var atext=arrcont[i];var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;if(tmp.test(atext))
atext=atext.replace(tmp,'');atext=parseBB(atext);if(atext!="")
{j++;if(j==1)
{var outfrm=outform;if(typeof dbs[numDB].outform!="undefined")
outfrm=dbs[numDB].outform;if(outfrm=='SHOTFRM')
{td5.n.innerHTML+='<u class="fstr f120 lh140" title="подробнее" onmousedown=addSee(\''+replaceSlash(ind)+'\')>'+atext+'</u>';}
else
td5.n.innerHTML+='<div class="fstr">'+atext+'</div>';}
else if(j==2)
{td5.n.innerHTML+='<code>'+atext+'</code>';}
else
{if(arrcont[i].indexOf('[CONTENT]')!=-1)
{slids.push(arrcont[i].substring(9));}
if(arrcont[i].indexOf('[IMG]')!=-1)
{imgsrc=arrcont[i].substring(5);}
if(arrcont[i].indexOf('[INSERT]')!=-1)
{var pos=arrcont[i].lastIndexOf('>');var span=td5.create('span',{className:'cb'});span.create('span',{className:'add1',onmousedown:'function (){showHide(this)}',textNode:'Включает'});var div=span.create('div',{style:{display:'none'}});div.n.innerHTML=parseBB(arrcont[i].substring(pos+1));}
if(arrcont[i].indexOf('[URL]')!=-1)
{var pos=arrcont[i].indexOf('<');var pos1=arrcont[i].indexOf('>');var pu=td5.create('div');if((typeof dbs[rdb].loadurl!="undefined")&&(dbs[rdb].loadurl=="link"))
{var span=pu.create('span',{className:'URL'});span.create('a',{target:'_blank',textNode:arrcont[i].substring(pos+1,pos1),href:''+arrcont[i].substring(pos1+1)});}
else
{pu.create('span',{className:'URL u w180x',textNode:arrcont[i].substring(pos+1,pos1),onmousedown:'function (){loadFreeUrl(\''+replaceSlash(ind)+'\',\''+arrcont[i].substring(pos1+1)+'\',\''+rdb+'\');}'});}
flagurl=true;}
if(arrcont[i].indexOf('[SEEF]')!=-1)
{var pos=arrcont[i].indexOf('<');var pos1=arrcont[i].indexOf('>');var titl=arrcont[i].substring(pos+1,pos1);if(titl.indexOf('Статьи')!=-1)
{var ps=td5.create('div',{className:'pt10x'});ps.create('a',{id:ind+'articles',className:'SEEF',textNode:titl,href:'javascript: SeeF(\''+convertseef(arrcont[i].substring(pos1+1))+'\',\''+titl+'\')'});}}
if((arrcont[i].indexOf('[SEE6]')!=-1)||(arrcont[i].indexOf('[SEE7]')!=-1))
{seeplace=true;}}}}
if(outfrm=='SHOTFORM')
{for(var arg in value._SHOTFORM_0)
{if(arg.indexOf('_action_')!=-1)
{var val=value._SHOTFORM_0[arg];if(val._id=="SEEF")
{if(val._title.indexOf('Первый МГМУ')==-1)
{if(val._title.indexOf('Оригинал')==-1)
{var ps=td5.create('div',{className:'pt10x'});ps.create('a',{id:ind+'articles',className:'SEEF',textNode:val._title,href:'javascript: SeeF(\''+convertseef(val._arg)+'\',\''+val._title+'\')'});}}}
if(val._id=='IMG')
{imgsrc=val._arg;}
if(val._id=='URL')
{var pu=td5.create('div');if((typeof dbs[rdb].loadurl!="undefined")&&(dbs[rdb].loadurl=="link"))
{var span=pu.create('span',{className:'URL'});span.create('a',{target:'_blank',textNode:val._title,href:''+val._arg});}
else
{pu.create('span',{className:'URL u w180x',textNode:val._title,onmousedown:'function (){loadFreeUrl(\''+replaceSlash(ind)+'\',\''+val._arg+'\',\''+rdb+'\');}'});}
flagurl=true;}}}}
if((typeof arr!="undefined")&&(arr.length>0))
{if(outfrm!='SHORTWEB')
{for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var p=td5.create('p',{className:arr[i],style:{display:'none'}});var span=p.create('span',{style:{fontSize:'100%',marginLeft:'0px'},className:'url',onmousedown:'function () {showOrderWin(this,\''+rdb+'\',\''+replaceSlash(ind)+'\');}'});if(arr[i]=="043")
span.text("Заказ документа");if(arr[i]=="058")
span.text("Показать онлайн");if(arr[i]=="059")
span.text("Заказать онлайн доступ");if(arr[i]=="065")
span.text("Свободный доступ онлайн");if(arr[i]=="066")
span.text("Заказать на биржу");if(arr[i]=="068")
span.text("Внешний ресурс");if(arr[i]=="069")
span.text("Показать онлайн (только в здании библиотеки)");if(arr[i]=="078")
span.text("Свободный доступ онлайн");if(arr[i]=="070")
span.text("Онлайн просмотр документа доступен абонентам ЭБА или в здании библиотеки");if(arr[i]=="077")
span.text("Заказ онлайн доступа возможен только для абонентов ЭБА");if(arr[i]=="076")
span.text("Доступ к документу возможен только в здании библиотеки");if(arr[i]=="079")
span.text("Доступ к документу возможен для подписчиков Электронного абонемента ЦНМБ или зарегистрированных читателей библиотеки");}}}
else
{var opersarr=[];var harr=_linkstring.split('[END]');var linkarr={};for(var k=0;k<harr.length;k++)
{if(harr[k]!="")
{var tmparr=harr[k].split('[ID]');linkarr[tmparr[0]]=tmparr[1];}}
for(var z=0;z<arr.length;z++)
{if(arr[z]!="")
{var p=td5.create('div',{className:'opercont'});if(typeof linkarr[arr[z]]!="undefined")
{if((arr[z]=='043')&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if((arr[z]=="069")&&(ecopy>0)&&(accesstype=="PAY")&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if((arr[z]=="070")&&(ecopy>0)&&(accesstype=="PAY")&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if((arr[z]=="076")&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if(((arr[z]=="077")&&(ecopy==0))&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if((arr[z]=="078")&&(ecopy>0)&&(accesstype=="FREE"))
{if((idrececopy!="")&&(iddbecopy!=""))
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';else
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';}
else if((arr[z]=="079")&&(ecopy>0)&&(accesstype=="FREE")&&(foldername=='rusmed'))
{opersarr.push(arr[z]);}
else if((arr[z]=="079")&&(ecopy>0)&&(accesstype=="FREE")&&(foldername=='newlib'))
{p.n.innerHTML+='<div class="_'+arr[z]+'">Онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';}
else if((arr[z]=="059")&&(ecopy==0))
{p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';}
else if((arr[z]=="058")&&(ecopy>0)&&(accesstype=="PAY"))
{if((idrececopy!="")&&(iddbecopy!=""))
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';else
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';}
else if(((arr[z]=="077")&&(ecopy==0))&&(foldername=='newlib'))
{p.n.innerHTML+='<div class="_'+arr[z]+'">Заказ на оцифровку и последующий онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';}
else if(((arr[z]=="070")&&(ecopy>0)&&(accesstype=="PAY"))&&(foldername=='newlib'))
{p.n.innerHTML+='<div class="_'+arr[z]+'">Онлайн просмотр документа доступен подписчикам Электронного абонемента ЦНМБ после авторизации</div>';}
else
{if((ecopy==2)&&(eurl!="")&&(accesstype=="NOLIMITS"))
{p.n.innerHTML+='<span onmousedown="loadFreeUrl(\''+idrececopy+'\',\''+eurl+'\',\''+iddbecopy+'\')" class="URL u w180x" title="открыть">Показать документ</span>';}}}}}
var operstr=opersarr.join('|');if(opersarr.length>0)
{for(var g=0;g<opersarr.length;g++)
{if(opersarr[g]=='070')
{p.n.innerHTML+='<div><a data="Сервис доступен подписчикам Электронного абонемента ЦНМБ или В ЗДАНИИ БИБЛИОТЕКИ" class="operations _070" target="_blank" href="//emll.rucml.ru/section/sign">Заказать онлайн просмотр</a></div>';}
else if(opersarr[g]=='076')
{p.n.innerHTML+='<div><div data="Сервис доступен зарегистрированным читателям библиотеки" class="operations _076" onmousedown="createAuthLayer()">Заказать в читальный зал</div></div>';}
else if(opersarr[g]=='077')
{p.n.innerHTML+='<div><a data="Сервис доступен подписчикам Электронного абонемента ЦНМБ" class="operations _077" target="_blank" href="//emll.rucml.ru/section/sign">Заказать онлайн просмотр</a></div>';}
else if(opersarr[g]=='043')
{p.n.innerHTML+='<div><div class="operations _043" onmousedown="showOrderWin(\'043\',\''+iddb+'\',\''+replaceSlash(ind)+'\')">Заказать в читальный зал</div></div>';}
else if(opersarr[g]=='069')
{if((idrececopy!="")&&(iddbecopy!=""))
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddbecopy+'\',\''+replaceSlash(idrececopy)+'\')">'+linkarr[arr[z]]+'</span></div>';else
p.n.innerHTML+='<div class="_'+arr[z]+'"><span class="url" onmousedown="showOrderWin(this,\''+iddb+'\',\''+replaceSlash(ind)+'\')">'+linkarr[arr[z]]+'</span></div>';}
else
{;}}}}}
if(imgsrc!="")
{var fig=td4.create('figure',{tabindex:'1'});fig.create('img',{border:'0',hSpace:'0',vSpace:'0',alt:'',title:'',src:imgsrc});}
else
{var s4=td4.create('span');var c4=s4.create('cite');var s41=c4.create('span',{tabIndex:'1',className:'book'});var u4=s41.create('ul',{className:'paperback_front'});u4.create('li');var u41=s41.create('ul',{className:'ruled_paper'});u41.create('li');u41.create('li');u41.create('li');u41.create('li');u41.create('li');var u42=s41.create('ul',{className:'paperback_back'});u42.create('li');}
if(slids.length>0)
{var span=td4.create('span',{className:'titleslides',onclick:'function(){showSlidesCont(this)}'});for(var i=0;i<slids.length;i++)
{span.create('input',{type:'hidden',name:'tab',value:slids[i]});}}
var today=new Date();var seconds=today.getTime();var libs1=[];var library='';var libtext='';if(typeof value._SHORTFMS_1!="undefined")
{if(value._SHORTFMS_1[0]!="")
{if(value._SHORTFMS_1[0].indexOf('[/UR]')!="undefined")
{libs1=value._SHORTFMS_1[0].split('[/UR]');}
var countlibs=0;if(libs1.length>0)
{for(var i=0;i<libs1.length;i++)
{if(libs1[i]!="")
{var libs=libs1[i].split('[END]');var ur='';var loc='';for(var k=0;k<libs.length;k++)
{if(libs[k]!="")
{var tod=new Date();var sec=tod.getTime();var astr="";var bstr="";var istr="";var ssstr="";var tstr="";var austr="";if(libs[k].indexOf('[ITEM]')!=-1)
{istr=libs[k].substring(libs[k].indexOf('[ITEM]')+6,libs[k].indexOf('[/ITEM]'));}
if(libs[k].indexOf('[BIBLID]')!=-1)
{bstr=libs[k].substring(libs[k].indexOf('[BIBLID]')+8,libs[k].indexOf('[/BIBLID]'));}
if(libs[k].indexOf('[ADRESS]')!=-1)
{astr=libs[k].substring(libs[k].indexOf('[ADRESS]')+8,libs[k].indexOf('[/ADRESS]'));}
if(libs[k].indexOf('[AUTHID]')!=-1)
{austr=libs[k].substring(libs[k].indexOf('[AUTHID]')+8,libs[k].indexOf('[/AUTHID]'));}
if(libs[k].indexOf('[TITL]')!=-1)
{tstr=libs[k].substring(libs[k].indexOf('[TITL]')+6,libs[k].indexOf('[/TITL]'));}
if(libs[k].indexOf('[UR]')!=-1)
{countlibs++;ur+='<div onclick="showHide1(this.parentNode.parentNode)" class="td"><p class="fstr lh120">'+tstr+'</p><p class="address"></p></div><div class="td w30 p5x" id="l_'+sec+'_'+countlibs+'_'+austr+'"><input type="hidden" class="titl" value="'+tstr+'"/><input type="hidden" id="ndb'+sec+'_'+countlibs+'_'+austr+'" class="item" value="'+istr+'"/><input type="hidden" class="biblid" id="biblid'+sec+'_'+countlibs+'_'+i+'" value="'+bstr+'"/><input type="hidden" class="authid" value="'+austr+'"/><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'map\')">Посмотреть на карте</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'avail\')">Уточнить наличие</span></div>';}
else
{countlibs++;loc+='<div class="row"><div class="td loc"><p><b>'+tstr+'</b></p><p class="address">'+astr+'</p></div><div class="td w30 p5x" id="l_'+sec+'_'+countlibs+'_'+austr+'"><input type="hidden" class="titl" value="'+tstr+'"/><input type="hidden" id="ndb'+sec+'_'+countlibs+'_'+austr+'" class="item" value="'+istr+'"/><input type="hidden" class="biblid" id="biblid'+sec+'_'+countlibs+'_'+i+'" value="'+bstr+'"/><input type="hidden" class="authid" value="'+austr+'"/><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'site\')">О библиотеке</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'map\')">Посмотреть на карте</span><span class="aflinkinfo" onclick="showLibInfo(this,'+countlibs+',\'avail\')">Уточнить наличие</span></div></div>';}}}
if(loc!="")
{if(ur!="")
{ur='<div class="row ur">'+ur+'</div>';}
loc='<div class="level" style="display:none">'+loc+'</div>';}
else
{ur='<div class="row">'+ur+'</div>';loc='';}
libtext+='<div class="level">'+ur+'</div>'+loc;}}}}}
if(((typeof dbs[rdb].place!="undefined")||(libtext!=""))&&(!flagurl))
{var tabs=td5.create('div',{className:'tabs'});var tabdivs=td5.create('div',{className:'tabdivs'});if((typeof dbs[rdb].place!="undefined")&&(libtext=="")&&(seeplace))
{tabs.create('span',{textNode:'Местонахождение',className:'add1',title:'place',onmousedown:'function(){seePlace(this,\''+replaceSlash(ind)+'\','+seconds+','+iddb+')}'});tabdivs.create('div',{className:'adddiv',id:'place'+seconds,style:{display:'none'}});}
if(libtext!="")
{tabs.create('span',{textNode:'Библиотеки',className:'add2 border',title:'libraries',onmousedown:'function(){showHide2(this,\'lib'+seconds+'\')}'});var div=tabdivs.create('div',{className:'adddiv',id:'lib'+seconds});div.n.innerHTML=libtext;}}}}
if(parseInt(exquant,10)>0)
verifyLink();preloadImages(imgsrc);}}
function showArticles(obj)
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["query/body",obj]);querylist.push(["outformList[0]/outform","SHOTFORM"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);var arg={};arg.cls='dialog2';arg.message="Статьи/части";showLayerWin('issueswin',arg);ajaxToRCP(gArr,showArticlesWin);}
function showArticlesWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var doc=take('issueswinform');doc.n.innerHTML="";var j=0;if(parseInt(response[0]._size,10)>0)
{for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=value._id;var rdb=value._sourceIddb;var arrcont=value._SHOTFORM_0._content_0;var div=doc.create('div',{className:'searchrez size20'});var div1=div.create('div',{className:'output'});var j=-1;for(var i=0;i<arrcont.length;i++)
{var atext=arrcont[i];var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;if(tmp.test(atext))
atext=atext.replace(tmp,'');if(atext!="")
{j++;if(j==0)
{var div2=div1.create('div',{className:'clear_both'});div2.create('span',{className:'fleft mt5x mr5x',textNode:(j+1)+'. '});div2.n.innnerHTML+=atext;}
else
{if(atext.indexOf('<Аннотация:>')!=-1)
{var span=div1.create('span',{className:'cb'});span.n.innerHTML='<span class="add1" onmousedown="showHide(this)">Аннотация:</span><div class="i" style="display:none">'+atext.substring(atext.indexOf('<Аннотация:>')+12)+'</div>';}
else
{div1.create('p',{textNode:atext,style:{fontSize:'80%',margin:'5px'}});}}}}
j++;}}
doc.n.innerHTML=parseBB(doc.n.innerHTML);}
else
{doc.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные статьи/части данного выпуска/тома',style:{textAlign:'center',margin:'40px 0 0 0'}});}}}
function seeAdd(o,ind,c,rdb)
{typework="";addid="add"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);var tmp=/\\{1,}/g;if(tmp.test(ind))
ind=ind.replace(tmp,'\\');querylist.push(["iddbIds[0]/id",ind]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddbIds[0]/iddb",db]);var dboutff=outformfull;if((typeof dbs[db]!="undefined")&&(typeof dbs[db].outformfull!="undefined"))
dboutff=dbs[db].outformfull;querylist.push(["outform",dboutff]);querylist.push(["_history","yes"]);querylist.push(["$iddb",db]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,displayAdd);}}
showHide2(o,addid);}
function displayAdd(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError('ajax');}
else
{var dboutff=outformfull;if((typeof dbs[_iddb]!="undefined")&&(typeof dbs[_iddb].outformfull!="undefined"))
dboutff=dbs[_iddb].outformfull;var outf=eval('response[0]._result_0._'+dboutff+'_0');if(outf!=null)
{var str="";var arr=outf;for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var term=arr[i];var pref=postf="";if(term.indexOf('<')!=-1)
{term=term.replace(/</,' ');term=term.replace(/>/,' ');pref='<b>'+term.substring(0,term.indexOf(':')+1)+'</b>';postf=term.substring(term.indexOf(':')+1);term="";}
str+='<p>'+pref+term+postf+'</p>';}}
take(addid).n.innerHTML=parseBB(str);}}}
function ajaxSee(ind,count,rdb)
{typework="";seeid="SEE4"+count;if(take(seeid).n.style.display=='none')
{if(take(seeid).n.innerHTML=="")
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddb",db]);querylist.push(["id",ind]);querylist.push(["action","SEE4"]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,displaySEE4);}
else
{take(seeid).show();take(seeid).n.previousSibling.className="add2";}}
else
{take(seeid).hide();take(seeid).n.previousSibling.className="add1";}}
function displaySEE4(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError('ajax');}
else
{if(response[0]._result_0._SEE4_0!=null)
{take(seeid).n.previousSibling.className="add2";take(seeid).show();take(seeid).n.innerHTML=response[0]._result_0._SEE4_0[0];}}}
function searchFromAfToBibl()
{var lab='AUIDS';var str="";showstr="";var cont=take('sconstruct_'+numDB);if(cont.n!=null)
{var arr=cont.getsign('span',{className:'sblock'});var terms=[];var shows=[];for(var i=0;i<arr.length;i++)
{var span=take(arr[i]).tags('span')[0];var term=span.title;var show=span.innerHTML;if(i==0)
{lab=span.getAttribute("data-label");if(lab=='QMS')
lab='MS';terms.push(term.substring(1,term.length-1));shows.push(show);}
else
{var log=take(arr[i]).tags('select')[0];terms.push(' '+log.options[log.selectedIndex].value+' '+convertbrackets(term));shows.push(' <i>'+log.options[log.selectedIndex].text+'</i> '+show);}
lightarr.push(convertlightstring(show));}
str=terms.join("[/bracket]");var len=terms.length-1;if(len==0)
str="[bracket]"+str+"[/bracket]";else
{for(var i=0;i<len;i++)
str="[bracket]"+str;}
putDataToStorage(numDB);if(typeof _iddbbibl!="undefined")
numDB=_iddbbibl;else
numDB=numdbBIBL;showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+shows.join("");}
lightstring=lightarr.join(' ');str=prepareStr(str);var obj={};obj._str=convertseef(str);obj._showstr=showstr;if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
{simpleSearchAll(lab,obj);}
else
{simpleSearch(lab,obj);}}
function searchTerm(o,a,l)
{sessionStorage.clear();var lab='AUIDS';var str="";showstr="";if(typeof _iddbbibl!="undefined")
numDB=_iddbbibl;else
numDB=numdbBIBL;if(typeof o!="string")
{var obj=take(o).getsign('input',{type:'checkbox'})[0];var down=obj.getAttribute("data-down");if((down!="")&&(down!=null))
{lab='COD';str='[bracket]'+down+'[/bracket]';if(obj.name=='QMS')
{lab='MS';str='[bracket][bracket]'+lab+' '+obj.className.substring(obj.className.indexOf('/')+1)+'[/bracket] AND '+str+'[/bracket]';}}
else
{str='[bracket]'+lab+' '+obj.value+'[/bracket]';}
showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+obj.className;lightarr.push(convertlightstring(obj.className));}
else
{if(typeof l!="undefined")
{lab=l;}
str='[bracket]'+lab+' '+o+'[/bracket]';showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+a;lightarr.push(convertlightstring(a));}
lightstring=lightarr.join(' ');var obj={};obj._str=convertseef(str);obj._showstr=showstr;if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
{simpleSearchAll(lab,obj);}
else
{simpleSearch(lab,obj);}}
function getAFStat()
{typework="";var filter=take('infor').getsign('input',{'name':'stat'});var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);for(var j=0;j<filter.length;j++)
{querylist.push(["queryList["+j+"]/iddb",numdbBIBL]);querylist.push(["queryList["+j+"]/query","(AUIDS '"+filter[j].value+"')"]);querylist.push(["queryList["+j+"]/queryId",filter[j].className]);querylist.push(["$"+filter[j].className,filter[j].value]);}
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackgetAFStat);}
function callbackgetAFStat(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{for(key in response[0])
{var value=response[0][key];if(key.indexOf('resultList')!=-1)
{var ind=value._queryId;var div=take(ind).n;div.innerHTML=value._size;if(parseInt(value._size,10)==0)
{div.removeAttribute('class');div.removeAttribute('title');div.removeAttribute('onmousedown');}
take(div.parentNode).show();if(typeof repointerface!="undefined")
{if(parseInt(value._size,10)>0)
{div.parentNode.innerHTML+=' <span class="f80">(посмотреть)</span>';var q=eval("_"+ind);openArticlesAuthor(ind,q);}}}}}}
function searchVoc(l,t,bd)
{if(dbs[numDB].type=='AF')
vocsearchInAF(l,t);else
{var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof bd!="undefined")
ndb=bd;typework="search";if(typesearch!='combined')
typesearch='simple';lockedfilters="";swfterm="";t=t.replace(/\&nbsp\;/g,' ');var str="[bracket]"+l+" [apos]"+t+"[/apos][/bracket]";var action="php";if(typeof biblio!="undefined")
action="biblio";showstr=prepareStr('<i>'+dbs[ndb]["labels"][l][0]+'</i> '+replaceSymb(t));showstr=prepareShowstring(showstr);var handler=modules["search"].directory+'/search.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_param","1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["$searchlabel",l]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
querylist.push(["iddb",ndb]);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);tern=replaceS6(term);querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);if(typeof biblio!="undefined")
{lockedfilters="";var bobj={'query':term,'databases':[ndb],'paging':{'limit':portion,'offset':0}};gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{lockedfilters="";var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,ndb)]);if(typeof dbs[ndb].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=ndb;obj.label=l;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}}
function showVoc(item,label,sign)
{typework="search";lockedfilters="";var skipFirst="";var _vstr="";var query="";var start=0;var firstterm="";var indxterms="";var andor=0;var vocobj="";var savedterms="";var title="Словарь";var val=null;var str="";if(item!=null)
{if(typeof _str!="undefined")
_str="";skipFirst="";if((typeof scrolllayer!="undefined")&&(scrolllayer=="left_frame"))
{if(typesearch!="combined")
typesearch="combined";vocobj=item.previousSibling.id;}
else
{if(typesearch!="combined")
{if(item.nextSibling.nodeType==1)
{if(item.nextSibling.className=="logcontainer")
vocobj=item.nextSibling.nextSibling.lastChild.firstChild.id;else
vocobj=item.nextSibling.lastChild.firstChild.id;}}}
val=take(vocobj).n.value;if(val.indexOf("'")==0)
val=val.substring(1,val.length-1);val=replaceSymb(val);val=prepareStr(val);str=query=firstterm=val;}
else
{if(typeof _str!="undefined")
{val=str=_str;if(str!="")
{val=prepareStr(str);val=replaceSymb(str);}}
if(typeof _title!="undefined")
title=_title;if(take('andor').n!=null)
{if(take('andor').n.nodeName.toLowerCase()=='select')
andor=take('andor').n.selectedIndex;else
{if(take('andor').n.className=='OR')
andor=0;else
andor=1;}}
indxterms=prepareIndxTerms();start=parseInt(_start,10);vocobj=_vocobj;if(sign==0)
{start=parseInt(_start,10)-portion;if(start==0)
{skipFirst="";var arr=_firstterm.split('[END]');query=firstterm=arr[0];}
else
{firstterm=_firstterm;var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipFirst=newstr;}}
else
{start=parseInt(_start,10)+portion;query=skipFirst=_lastterm;firstterm=_firstterm+'[END]'+query;}}
if(label==null)
{if(typesearch=="combined")
{label=item.previousSibling.className;}
else
{if(item.nextSibling.className=="logcontainer")
label=item.nextSibling.nextSibling.firstChild.firstChild.lastChild.className.substring(1);else
label=item.nextSibling.firstChild.firstChild.lastChild.className.substring(1);}
if(label=='FT')
return;var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;if((val==null)||(val==""))
_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> ВСЕ</span>';else
_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> '+val+'</span>';}
else
_vstr=_showstr;_vstr=prepareStr(_vstr);_vstr=prepareShowstring(_vstr);showstr=_vstr;var handler=modules["voc"].directory+'/voc.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);if(dbs[numDB].type=="AF")
{querylist.push(["_service","STORAGE:opacafd:List"]);querylist.push(["_version","1.0.0"]);querylist.push(["mode","index"]);}
else
{querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.4.0"]);}
querylist.push(["session",numsean]);querylist.push(["$title",title]);querylist.push(["$label",label]);querylist.push(["label",label]);querylist.push(["$start",start]);querylist.push(["$showstr",showstr]);querylist.push(["$str",str]);querylist.push(["$query",convertseef(query)]);querylist.push(["$length",portion]);querylist.push(["query",val]);if(start!=0)
{if((typeof solr!="undefined")&&(solr=="yes"))
querylist.push(["start",start]);else
querylist.push(["start",brackets(replaceSymb(query))]);}
querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["$andor",andor]);querylist.push(["$vocobj",vocobj]);if((typeof firstterm!="undefined")&&(firstterm!=""))
querylist.push(["$firstterm",replaceSymb(firstterm)]);else
querylist.push(["$firstterm",""]);if(typesearch=='professional')
{var estr=take('expr').n.innerHTML;estr=estr.replace(/\"/g,'');querylist.push(["$expr",estr]);}
if(indxterms!="")
querylist.push(["$indxterms",indxterms]);savedterms=prepareSavedTerms(vocobj);if(savedterms!="")
querylist.push(["$savedterms",savedterms]);if((sign!=null)&&(skipFirst!=''))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function searchAlfabet(o,sign)
{typework="search";var skipFirst="";var _vstr="";var query="";var start=1;var firstterm="";var label="";var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=_iddb;if(o!=null)
{query=firstterm=o.innerHTML;skipFirst="";if(typesearch=="combined")
label="AH";else
label=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(label=='FT')
label='TI';}
else
{if(typeof _label!="undefined")
label=_label;start=parseInt(_start,10);if(sign==0)
{start=parseInt(_start,10)-portion;if(start==1)
{skipFirst="";query=firstterm;}
else
{firstterm=_firstterm;var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipFirst=newstr;}}
else
{start=parseInt(_start,10)+portion;query=skipFirst=_lastterm;firstterm=_firstterm+'[END]'+query;}}
if(o!=null)
_vstr='<span><i>'+dbs[ndb]["labels"][label][0]+'</i> '+o.innerHTML+'</span>';else
_vstr=_showstr;_vstr=prepareStr(_vstr);_vstr=prepareShowstring(_vstr);showstr=_vstr;var handler=modules["voc"].directory+'/voc.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["$label",label]);querylist.push(["label",label]);querylist.push(["$start",start]);querylist.push(["$showstr",showstr]);if((typeof query!="undefined")&&(query!=""))
{var quer=prepareStr(query);quer=replaceSymb(quer);querylist.push(["query",quer]);}
else
{querylist.push(["query",""]);}
querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["$firstterm",replaceSymb(firstterm)]);if(typesearch=='professional')
{var estr=take('expr').n.innerHTML;estr=estr.replace(/\"/g,'');querylist.push(["$expr",estr]);}
if((sign!=null)&&(skipFirst!=''))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function putSearchToConstructor(o)
{if(take('searchbox').n!=null)
{var arr=take('srezults').getsign('span',{className:'tooltip1'});if(arr.length>0)
{var len=arr.length;for(var i=0;i<len;i++)
{arr[i].parentNode.removeChild(arr[i]);}}
var cont=take(o.parentNode);var tol=cont.create('span',{className:'tooltip1',style:{'top':0,'left':'20px',fontSize:'120%'}});tol.create('span',{id:'tooldel',className:'del',onmousedown:'function(){delTWin(this,1)}'});tol.create('span',{className:'titl mb15x ml5x',textNode:'Добавить в конструктор:'});if(take('searchbox').n.value!="")
{var selcont=tol.create('span',{className:'mb20x ml5x'});var sel=selcont.create('select',{id:'andor',className:'andor2'});sel.create('option',{value:'AND',textNode:'И'});sel.create('option',{value:'OR',textNode:'ИЛИ'});sel.create('option',{value:'NOT',textNode:'НЕ'});selcont.text('логический оператор');}
tol.create('input',{type:'button',className:'button3 db p5x ml5x',value:'Добавить',onmousedown:'function(){placeSearchToConstructor(this)}','data-index':o.id});}}
function placeSearchToConstructor(o)
{if(take('searchbox').n!=null)
{var indx=o.getAttribute("data-index");var ind='str'+indx.substring(indx.indexOf('_'));var textind='showstr'+indx.substring(indx.indexOf('_'));var term=prepareTerm(brackets(take(ind).n.innerHTML));if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);var termtext=prepareStr(take(textind).n.innerHTML);termtext=prepareShowstring(termtext);if(take('searchbox').n.value=="")
{take('searchbox').n.value=term;take('termtextbox').n.innerHTML=termtext;}
else
{term=' '+take('andor').n.options[take('andor').n.selectedIndex].value+' ('+term+')';take('searchbox').n.value='('+take('searchbox').n.value+')'+term;termtext=' '+take('andor').n.options[take('andor').n.selectedIndex].text+' '+termtext;take('termtextbox').n.innerHTML=take('termtextbox').n.innerHTML+''+termtext;}
take('searchbox').n.focus();}
delTWin(o,1)}
function clearSearchConstructor()
{delete sessionStorage["searchbiblio"];if(take('searchbox').n!=null)
{take('searchbox').n.value="";take('termtextbox').n.innerHTML="";}}
function searchFromConstructor()
{var lab=take('labs_div_'+numdbBIBL).n.firstChild.className.substring(1);var str="";showstr="";var cont=take('searchbox');if((cont.n!=null)&&(cont.n.value!=""))
{str=convertlimits2(cont.n.value);showstr=take('termtextbox').n.innerHTML;if(showstr=="")
showstr=prepareShowstring(str);lightstring=convertlightstring3(showstr);var obj={};obj._str=str;obj._showstr=showstr;if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
{simpleSearchAll(lab,obj);}
else
{simpleSearch(lab,obj);}}
else
{alert("Введите данные для поиска!");return;}}
function appendFacet(o)
{switch(o.className)
{case"unchecked":o.className="checked";o.title="ОТМЕНИТЬ";break;case"checked":o.className="unchecked";o.title="УТОЧНИТЬ";break;default:break;}
var term=o.innerHTML;var lab=o.parentNode.className;var role=o.parentNode.lastChild.className;var title=o.parentNode.parentNode.parentNode.firstChild.innerHTML;var tmp='[TITLE]'+title+'[NAME]'+lab+'[ROLE]'+role+'[VALUE]'+term;var str="";showstr="";var fstr="";var bstr="";var earr=[];var farr=[];var barr=[];if((typeof _str!="undefined")&&(_str!=""))
str=_str;else
{if((typeof _swfterm!="undefined")&&(_swfterm!=""))
str=_swfterm;}
if((!typeof _showstr!="undefined")&&(_showstr!=""))
showstr=_showstr;else
{if((typeof _rshowstr!="undefined")&&(_rshowstr!=""))
showstr=_rshowstr;}
if(lockedfilters!="")
farr=lockedfilters.split('[END]');for(var i=0;i<farr.length;i++)
{if(farr[i]!=tmp)
{if(fstr!="")
fstr+='[END]';fstr+=farr[i];}}
if(o.className=="checked")
{if(fstr!="")
fstr+='[END]';fstr+=tmp;}
lockedfilters=replaceSymb(fstr);if(typeof biblio!="undefined")
{if(fstr!="")
{farr=[];farr=fstr.split('[END]');for(var i=0;i<farr.length;i++)
{var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));var bobj={};bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));barr.push(bobj);}}
var aarr=[];farr=[];for(var i=0;i<barr.length;i++)
{for(var key in barr[i])
{if((typeof aarr[key]=="undefined")||(aarr[key].constructor!==Object))
{aarr[key]={};aarr[key].name=key;aarr[key].isRole=barr[i][key].isRole;aarr[key].values=barr[i][key].values;farr.push(aarr[key]);}
else
{for(var j=0;j<barr[i][key].values.length;j++)
aarr[key].values.push(barr[i][key].values[j]);}}}}
if(typeof solr!="undefined")
{if(lockedfilters!="")
{farr=[];farr=lockedfilters.split('[END]');for(var i=0;i<farr.length;i++)
{if(i>0)
bstr+=' AND ';var val=convertseef(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+val+'[apos][/bracket]';earr.push([farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]')),brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))]);lightarr.push(convertlightstring(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));}}}
var obj={};obj._str=str;obj._showstr=showstr;if(farr.length>0)
{if(typeof solr!="undefined")
{obj._bstr=bstr;obj._exclude=earr;}
else
obj._bstr=farr;obj._history="yes";var fls=trimSpaces(lightarr.join(' '));var lls=convertlightstring2(fls);if(lls!=null)
savedstring=lls;if(savedstring!="")
{if(lockedstring!="")
savedstring=lockedstring+' '+savedstring;}}
if(typeof _see!="undefined")
{See(null,null,null);}
else
simpleSearch(lab,obj);}
function prepareFacetsForBibliosearch()
{var farr=[];var earr=[];var barr=[];var bstr="";if(lockedfilters!="")
{farr=lockedfilters.split('[END]');if(typeof biblio!="undefined")
{for(var i=0;i<farr.length;i++)
{var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));var bobj={};bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));barr.push(bobj);}
var aarr=[];farr=[];for(var i=0;i<barr.length;i++)
{for(var key in barr[i])
{if((typeof aarr[key]=="undefined")||(aarr[key].constructor!==Object))
{aarr[key]={};aarr[key].name=key;aarr[key].isRole=barr[i][key].isRole;aarr[key].values=barr[i][key].values;farr.push(aarr[key]);}
else
{for(var j=0;j<barr[i][key].values.length;j++)
aarr[key].values.push(barr[i][key].values[j]);}}}}
if(typeof solr!="undefined")
{for(var i=0;i<farr.length;i++)
{if(i>0)
bstr+=' AND ';bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' [apos]'+brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))+'[apos][/bracket]';earr.push([farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]')),brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))]);lightarr.push(convertlightstring(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));}}
var obj={};if(farr.length>0)
{if(typeof solr!="undefined")
{obj._bstr=bstr;obj._exclude=earr;}
else
obj._bstr=farr;var fls=trimSpaces(lightarr.join(' '));var lls=convertlightstring2(fls);if(lls!=null)
savedstring=lls;if(savedstring!="")
{if(lockedstring!="")
savedstring=lockedstring+' '+savedstring;}}
lockedfilters=replaceSymb(lockedfilters);return obj;}
else
{return null;}}
function facetsBack(o)
{take(o.parentNode.previousSibling).show();take(o.parentNode).hide();}
function facetsNext(o)
{take(o.parentNode.nextSibling).show();take(o.parentNode).hide();}
function clearFilters(o)
{var filters=take('filters_'+numDB).getsign('span',{className:'checked'});if(filters.length>0)
{for(var j=0;j<filters.length;j++)
{filters[j].className="unchecked";}
searchWithFilters("","","");}}
function putFilterPeriod()
{var first=take('ifrom').n;var last=take('ito').n;var lim=first.className;var ind=last.className;var obj=take(ind).n;var par=obj.parentNode;var cls="";var text="";if((parseInt(first.value,10)>parseInt(last.value,10))||(isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10))))
{alert('Задан недопустимый период');return;}
else
{if(!isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
{cls+="("+lim+" BETWEEN '"+first.value+"','"+last.value+"')";text+='c '+first.value+' по '+last.value;}
if(!isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10)))
{cls+="("+lim+" GE '"+first.value+"')";text+='c '+first.value;}
if(isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
{cls+="("+lim+" LE '"+last.value+"')";text+='по '+last.value;}
var today=new Date();var seconds=today.getTime();var oid='dinamic_'+numDB+'_'+seconds;var div=take(par).create('div',{className:cls});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});div.create('i',{textNode:'0'});par.insertBefore(div.n,obj);var arg={};arg.next=ind;arg.ind=oid;arg.cname=cls;arg.itext=text;appendFilter(span.n,arg);}}
function addFilterPeriod(o)
{var arg={'cls':'dialog2','message':'ДИАПАЗОН','target':self,'callback':'putFilterPeriod',callbackname:'Добавить','width':'500','height':'400'};showLayerWin('periodwin',arg);var div=take('periodwinform');div.n.innerHTML="";var cont=div.create('div',{className:'period'});cont.create('span',{className:'from',textNode:' с '});var span=cont.create('span',{className:'input'});span.create('input',{type:'text',id:'ifrom',value:'',maxLength:'4',className:o.parentNode.className});cont.create('span',{className:'to',textNode:' по '});var span1=cont.create('span',{className:'input'});span1.create('input',{type:'text',id:'ito',value:'',maxLength:'4',className:o.id});var help=div.create('div',{style:{textAlign:'center',color:'#eee'}});help.create('span',{textNode:'YYYY',style:{padding:'5px 30px 5px 20px'}});help.create('span',{textNode:'YYYY',style:{padding:'5px 10px 5px 50px'}});}
function addFilterVoc(v,item,label,sign)
{var query="";var start=vocstart;vstr=v;if(item!=null)
{fobject=item;var par=item.parentNode;var carr=take(par).getsign('span',{className:'checked'});cstr="";for(var i=0;i<carr.length;i++)
{cstr+=carr[i].innerHTML;if(i<carr.length-1)
cstr+='[END]';}
var uarr=take(par).getsign('span',{className:'unchecked'});ustr="";for(var i=0;i<uarr.length;i++)
{ustr+=uarr[i].innerHTML;if(i<uarr.length-1)
ustr+='[END]';}
skipfirst="";voclab=item.parentNode.className;endvoc="";vocstart=1;firstterm="";indxterms="";lastterm="";vvstr="";query=vvstr=firstterm="";}
else
{indxterms=prepareIndxTerms();start=parseInt(vocstart,10);if(sign==0)
{start=start-portion;if(start==1)
{skipfirst="";query=firstterm="";}
else
{var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipfirst=newstr;}}
else
{start=start+portion;query=skipfirst=lastterm;firstterm=firstterm+'[END]'+query;}
voclab=label;}
typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["$label",voclab]);querylist.push(["label",voclab]);querylist.push(["$start",start]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["query",query]);querylist.push(["$vstr",vstr]);querylist.push(["$vvstr",vvstr]);querylist.push(["$cstr",cstr]);querylist.push(["$ustr",ustr]);querylist.push(["$firstterm",firstterm]);if((sign!=null)&&(skipfirst))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(indxterms!="")
querylist.push(["$indxterms",indxterms]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,openFiltersWin);}
function wwPages()
{var pages='';if(skipfirst)
pages+='<input type="button" class="button2" value="&#8249; Назад" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',0);"/>';if(!endvoc)
pages+='<input type="button" class="button2" value="Далее &#8250;" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',1);"/>';return pages;}
function putFilterVoc()
{var today=new Date();var seconds=today.getTime();var arr=take('menu1').tags('code');var par=fobject.parentNode;var str="";for(var i=0;i<arr.length;i++)
{var text=arr[i].innerHTML;if(voclab!="PF")
text=text.toLowerCase();var oid='fixed_'+numDB+'_'+i+'_'+seconds;var div=take(par).create('div',{className:"("+voclab+" '"+text+"')"});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});div.create('i',{textNode:'0'});par.insertBefore(div.n,fobject);str+="[NEXT]"+fobject.id+"[IND]"+oid+"[CLASS]"+"("+voclab+" '"+replaceSymb(text)+"')[TEXT]"+replaceSymb(text);if(i<arr.length-1)
str+="[END]";}
if(str!="")
{if(addfilters!="")
addfilters+="[END]"+str;else
addfilters=str;}
fobject=null;delLayerWin();}
function openFiltersWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{if(take('vocwinform').n!=null)
delLayerWin();var arg={};vstr=_vstr;arg.cls='dialog2';arg.message=vstr;arg.callback='putFilterVoc';arg.target=self;arg.width="500";arg.height="400";arg.callbackname='Добавить';showLayerWin('vocwin',arg);var doc=take('vocwinform');doc.n.innerHTML="";if(response[0]._indx_0!=null)
{if(typeof _str!="undefined")
vvstr=_str;if(typeof _skipFirst!="undefined")
skipfirst=_skipFirst;if(typeof _firstterm!="undefined")
firstterm=_firstterm;if(response[0]._end!=null)
endvoc=true;else
endvoc=false;voclab=_label;vocstart=parseInt(_start);var str='';var i=-1;var pages=wwPages();var menu='<div id="scont" class="scont">'+pages+'</div>';doc.n.innerHTML=menu;var tabbeg='<center><table cellspacing="0">';var tabend='</table></center>';var scont=take('scont');var menu1=scont.create('div',{id:'menu1',style:{display:'none'}});menu1.create('input',{type:'hidden',id:'andor',name:'andor',value:'OR'});if(typeof _indxterms!="undefined")
{indxterms=_indxterms;var arr=indxterms.split('[END]');for(var j=0;j<arr.length;j++)
{if(arr[j]!="")
menu1.create('code',{style:{display:'none'},textNode:replaceSymb(arr[j].substring(arr[j].indexOf('|')+1)).replace(/&quot;/g,'"'),id:arr[j].substring(0,arr[j].indexOf('|'))});}}
for(var key in response[0])
{var value=response[0][key];if(key.indexOf('indx_')!=-1)
{i++;var flag="";var flag2="";if(menu1.n.childNodes.length>1)
{var childs=menu1.n.childNodes;for(var j=0;j<childs.length;j++)
{if(childs[j].id=='_'+(vocstart+i))
{flag='checked="true"';break;}}}
var term=value._item;var carr=_cstr.split('[END]');for(var j=0;j<carr.length;j++)
{if(carr[j].toUpperCase()==term)
{flag='checked="true"';flag2='disabled="true"';break;}}
var uarr=_ustr.split('[END]');for(var j=0;j<uarr.length;j++)
{if(uarr[j].toUpperCase()==term)
{flag='checked="true"';flag2='disabled="true"';break;}}
if((i%2)==0)
str+='<tr class="searchrez3">';else
str+='<tr class="searchrez2">';str+='<td width="5%" ><input id="'+(vocstart+i)+'" type="checkbox" '+flag+' '+flag2+' class="addbox" name="'+_label+'"  value="'+replaceSymb4(term)+'" onclick="putTerms(this)"/><span style="display: none">'+term+'</span></td><td>'+term+'</td></tr>';lastterm=_lastterm=term;}}
doc.n.innerHTML+=tabbeg+str+tabend;}
else
{doc.create('p',{textNode:'Доступные фильтры не найдены.'});}}}
function appendFilter(o,arg)
{switch(o.className)
{case"unchecked":o.className="checked";o.title="ОЧИСТИТЬ ФИЛЬТР";break;case"checked":o.className="unchecked";o.title="ФИЛЬТРОВАТЬ";break;default:break;}
var filterstr="";var filtersids="";var fshowstr="";fstrarr=[];fidsarr=[];fshowarr=[];var ndb=numDB;if(typeof _localiddb!="undefined")
ndb=_iddb;var arr=take('filters_'+ndb).getsign('div',{className:'filters'});for(var i=0;i<arr.length;i++)
{var filters=take(arr[i]).getsign('span',{className:'checked'});if(filters.length>0)
{var str="";showstr='<i>'+arr[i].firstChild.innerHTML.toLowerCase()+'</i> ';for(var j=0;j<filters.length;j++)
{str+=convertlimits(filters[j].parentNode.className);fidsarr.push(filters[j].id);showstr+=filters[j].innerHTML;if(j<filters.length-1)
{str+=' OR ';showstr+=' ИЛИ ';}}
fstrarr.push(str);fshowarr.push(showstr);}}
if(fstrarr.length>0)
{filtersids=fidsarr.join('[END]');if(fstrarr.length>1)
{filterstr='[bracket]'+fstrarr.join('[/bracket] AND [bracket]')+'[/bracket]';fshowstr=fshowarr.join(' И ');}
else
{filterstr='[bracket]'+fstrarr[0]+'[/bracket]';fshowstr=fshowarr[0];}}
else
{filterstr="";filtersids="";fshowstr="";}
if(typeof arg!="undefined")
searchWithFilters(filterstr,filtersids,fshowstr,fstrarr,arg);else
searchWithFilters(filterstr,filtersids,fshowstr,fstrarr);}
function searchWithFilters(filterstr,filtersids,fshowstr,fstrarr,arg)
{typework="search";lockedfilters="";swfterm="";var handler=modules["search"].directory+'/search.php';var str="";var showstr="";if(_str!="")
{str=_str;}
else
{str=_swfterm;}
if(_showstr!="")
{showstr=_showstr;}
else
{showstr=_rshowstr;}
str=prepareStr(str);showstr=prepareStr(showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var addlab=findaddlabel(str);var outfrm=outform;var ndb=numDB;if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
ndb=numdbBIBL;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList[2]/outform","AVAILABLEEXEMPLARS"]);querylist.push(["outformList[3]/outform","AVAILABLEECOPY"]);}
swfterm=str;str=brackets(str);var term=prepareTerm(str);if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);if(filterstr!="")
{if(typeof arg!="undefined")
{var addstr='[NEXT]'+arg.next+'[IND]'+arg.ind+'[CLASS]'+convertlimits(arg.cname)+'[TEXT]'+arg.itext;addfilters=addfilters+'[END]'+addstr;}
filterstr=replaceSymb(filterstr);querylist.push(["$filterstr",filterstr]);querylist.push(["$filtersids",filtersids]);querylist.push(["$fshowstr",prepareShowstring(fshowstr)]);filterstr=brackets(filterstr);filterstr=prepareTerm(filterstr);if(filterstr.indexOf('\\\\\\')!=-1)
filterstr=prepareStr(filterstr);for(var i=0;i<fstrarr.length;i++)
{var elem=replaceSymb(fstrarr[i]);swfterm='[bracket][bracket]'+swfterm+'[/bracket] AND [bracket]'+elem+'[/bracket][/bracket]';elem=brackets(elem);elem=prepareTerm(elem);if(elem.indexOf('\\\\\\')!=-1)
elem=prepareStr(elem);term='(('+term+') AND ('+elem+'))';}}
term=replaceS6(term);if(typeof _rubricator!="undefined")
querylist.push(["$rubricator",_rubricator]);querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);if(typeof dbs[numDB].addqueries!="undefined")
{var obj={};obj.term=term;obj.db=ndb;if(addlab!=null)
obj.label=addlab;var arr=prepareAddQuery(obj);if(arr!=null)
Array.prototype.push.apply(gArr,arr);}
callToRCP(gArr);}
function filtersQuery()
{typework="";if((typeof _size!="undefined")&&(parseInt(_size,10)>0))
{if(typeof _stopfilters=="undefined")
{var str=replaceSymb(_str);str=brackets(str);var term=prepareTerm(str);if(typeof _swfterm!="undefined")
{term=brackets(_swfterm);term=prepareTerm(term);}
if(term.indexOf('\\\\\\')!=-1)
term=prepareStr(term);term=replaceS6(term);var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});for(var j=0;j<filter.length;j++)
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["queryList[0]/iddb",numDB]);querylist.push(["queryList[0]/query","("+term+") AND ("+filter[j].parentNode.className+")"]);querylist.push(["queryList[0]/queryId",filter[j].id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackfiltersquery);}}
else
{if(typeof _see=="undefined")
{if(lockedfilters!="")
{var arr=lockedfilters.split('[END]');var len=arr.length;for(var i=0;i<len;i++)
{if(arr[i]!="")
{var ids=arr[i].split('[ID]');if(take(ids[0]).n!=null)
{take(ids[0]).n.nextSibling.innerHTML=ids[1];}}}}}}}}
function callbackfiltersquery(x)
{eval(x.responseText);if(typeof error!="undefined")
{;}
else
{var str='';for(var key in response[0])
{var value=response[0][key];if(key.indexOf('resultList')!=-1)
{take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML=response[0]._resultList_0._size;str+=response[0]._resultList_0._queryId+'[ID]'+response[0]._resultList_0._size+'[END]';}}
lockedfilters+=str;}}
function callAddQuery(o)
{;}
function searchInCollection(o)
{numDB=numdbBIBL;lockedfilters="";var lab=o.className;var term=take(o).getsign('input',{type:'hidden'})[0].value;var obj={};obj._str='[bracket]'+lab+' '+replaceSymb(term)+'[/bracket]';obj._showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(term);if(typeof _sign!="undefined")
_sign=undefined;if(typeof _newrecs!="undefined")
_newrecs=undefined;if(typeof _month!="undefined")
_month=undefined;if(typeof _year!="undefined")
_year=undefined;simpleSearch(lab,obj);}
function searchItem(o)
{var lab='ID';var labtitle='Идентификатор записи';var iddb=o.getAttribute('data-iddb');var term=o.getAttribute('data-id');var title=prepareShowstring(term);if(o.hasAttribute('data-label'))
{lab=o.getAttribute('data-label');labtitle=dbs[iddb]["labels"][lab][0];}
if(o.hasAttribute('data-title'))
title=o.getAttribute('data-title');numDB=iddb;var obj={};obj._str='[bracket]'+lab+' '+convertseef(term)+'[/bracket]';obj._showstr='<i>'+labtitle+'</i> '+title;if(typeof _sign!="undefined")
_sign=undefined;if(typeof _newrecs!="undefined")
_newrecs=undefined;if(typeof _month!="undefined")
_month=undefined;if(typeof _year!="undefined")
_year=undefined;simpleSearch(lab,obj);}
var numberNdb='020';function viewAllNews()
{var db=numdbBIBL;if(typeof newsdb!="undefined")
db=newsdb;var lab="DT";if(typeof newslabel!="undefined")
lab=newslabel;if((typeof newscalendar!="undefined")&&(newscalendar=="yes"))
searchNewRecs(db,"all");else
{if(typeof newstitle!="undefined")
searchNews(lab,db,newstitle);else
searchNews(lab,db);}}
function searchNews(num,ndb,titl,marker)
{typework="search";var handler=modules["search"].directory+'/search.php';var today=new Date();var lab="DT";if(typeof newslabel!="undefined")
lab=newslabel;if((typeof num!="undefined")&&(num!=null))
lab=num;var ntitle="Новые поступления";if(typeof newstitle!="undefined")
ntitle=newstitle;if(typeof titl!="undefined")
ntitle=titl;var direct="desc";var y=Year-1;var str="";var showstr="";if(typeof marker!="undefined")
{str=prepareStr("[bracket]"+lab+" "+numberNdb+"[/bracket]");ntitle=titl;showstr=prepareStr("<i>"+ntitle+" </i> на "+dd+"."+mm+"."+Year);}
else
{str=prepareStr("[bracket]"+lab+" LE [apos]"+Year+""+mm+""+dd+"[apos][/bracket]");showstr=prepareStr("<i>"+ntitle+" </i> по "+dd+"."+mm+"."+Year);if(typeof newsperiod!="undefined")
{if(newsperiod=="0")
{str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y+"[apos],[apos]"+Year+"[apos][/bracket]");showstr=prepareStr("<i>"+ntitle+" </i> с "+y+" по "+Year);}
if(newsperiod=="2")
{var twomonth=new Date(today.getTime()-86400000*60);var y1=twomonth.getFullYear();var d1=(twomonth.getDate()<10)?'0'+(twomonth.getDate()):twomonth.getDate();var m1=(twomonth.getMonth()+1<10)?'0'+(twomonth.getMonth()+1):twomonth.getMonth()+1;str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y1+""+m1+""+d1+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");showstr=prepareStr("<i>"+ntitle+" </i> с "+d1+"."+m1+"."+y1+" по "+dd+"."+mm+"."+Year);}}
if((typeof nshowstr!="undefined")&&(nshowstr!="")&&(typeof newsstring!="undefined")&&(newsstring!=""))
{str=convertbrackets(newsstring);showstr="<i>"+nshowstr+"</i>";}
if(typeof newsrestriction!="undefined")
str+=convertbrackets(newsrestriction);}
str=replaceSymb(str);showstr=prepareShowstring(showstr);var term=prepareTerm(str);var action="php";if(typeof biblio!="undefined")
action="biblio";var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);if((typeof renew!="undefined")&&(renew!=""))
querylist.push(["$renew","yes"]);if(typeof newsrestriction!="undefined")
querylist.push(["$newsrestriction",convertbrackets(newsrestriction)]);if(typeof marker!="undefined")
querylist.push(["$marker","red"]);if(typeof newsquant!="undefined")
querylist.push(["$newsquant",newsquant]);if(typeof newspath!="undefined")
querylist.push(["$newspath",newspath]);querylist.push(["$searchtitle",ntitle]);var db=numDB;if(typeof ndb!="undefined")
db=ndb;if(typeof numdbNews!="undefined")
db=numdbNews;var outfrm=outform;if(typeof dbs[db].outform!="undefined")
outfrm=dbs[db].outform;querylist.push(["$outform",outfrm]);var countforms=-1;querylist.push(["outformList["+(++countforms)+"]/outform",outfrm]);querylist.push(["outformList["+(++countforms)+"]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMS"]);querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEEXEMPLARS"]);}
if(typeof newsoutform!="undefined")
{querylist.push(["$newsoutform",newsoutform]);querylist.push(["outformList["+(++countforms)+"]/outform",newsoutform]);}
querylist.push(["iddb",db]);querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);if(typeof biblio!="undefined")
{var bobj={'query':term,'databases':[db],'paging':{'limit':portion,'offset':0}};gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof solr!="undefined")
{lockedfilters="";var count1=-1;var countscore=-1;for(var key in dbs[db]["labels"])
{if(dbs[db]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[db]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[db]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[db]["labels"][key][6]]);}}
var score=parseInt(dbs[db]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}
var label=lab;if(typeof sortnewslabel!="undefined")
label=sortnewslabel;if(typeof _sortlabel!="undefined")
label=_sortlabel;if(take('sortlab').n!=null)
label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;if(typeof _direct!="undefined")
direct=_direct;if((label=='PY')||(label=='DT'))
direct="desc";querylist.push(["query/label",label]);querylist.push(["query/direct",direct]);querylist.push(["$sortlabel",label]);querylist.push(["$sortdirect",direct]);gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr);}
function searchNewRecs(ndb,sign,c)
{if((typeof ndb=="undefined")||(ndb==null))
ndb=_iddb;var howmuch="";var startfrom="";var month="";var year="";if(typeof c=="undefined")
{howmuch=portion;startfrom=0;}
else
{howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);}
typework="search";var handler=modules["search"].directory+'/search.php';if(typeof newsasmodule!="undefined")
handler=modules["search"].directory+'/_additional/newrecs.php';var y=Year-1;var str="";var showstr="";var flagrenew=false;var lab="DT";var ntitle="Новые поступления";var nstr="";if((typeof newstitle!="undefined")&&(newstitle!=""))
ntitle=newstitle;if(typeof newslabel!="undefined")
lab=newslabel;if(sign=="all")
{if((typeof nshowstr!="undefined")&&(nshowstr!="")&&(typeof newsstring!="undefined")&&(newsstring!=""))
{nstr=str=convertbrackets(newsstring);showstr="<i>"+nshowstr+"</i>";}
else
{str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");showstr="<i>"+ntitle+" </i> с "+dd+"."+mm+"."+y+" по "+dd+"."+mm+"."+Year;sign=showstr;flagrenew=true;}
month=mm;year=Year;if(typeof newsrestriction!="undefined")
str+=convertbrackets(newsrestriction);}
else
{if((typeof sign=="undefined")||(sign==null))
{str=_str;showstr=_showstr;month=_month;year=_year;sign=_sign;}
else
{if((typeof sign.nstr!="undefined")&&(typeof sign.nshowstr!="undefined"))
{nstr=sign.nstr;nshowstr=sign.nshowstr;}
str=sign.str;showstr=sign.showstr;month=sign.m;year=sign.y;sign=showstr;if(typeof _newsrestriction!="undefined")
str+=_newsrestriction;}}
if(typeof _sign!="undefined")
_sign=sign;if(typeof _month!="undefined")
_month=month;if(typeof _year!="undefined")
_year=year;var action="php";if(typeof biblio!="undefined")
action="biblio";var term=prepareTerm(str);var gArr=new Array();var querylist=new Array();gArr.push(["_action",action]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.7.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);if(typeof newsrestriction!="undefined")
{if(typeof _newsrestriction!="undefined")
querylist.push(["$newsrestriction",_newsrestriction]);else
querylist.push(["$newsrestriction",convertbrackets(newsrestriction)]);}
if((typeof nshowstr!="undefined")&&(nshowstr!="")&&(typeof nstr!="undefined")&&(nstr!=""))
{querylist.push(["$nstr",nstr]);querylist.push(["$nshowstr",nshowstr]);}
if((typeof _nshowstr!="undefined")&&(_nshowstr!="")&&(typeof _nstr!="undefined")&&(_nstr!=""))
{querylist.push(["$nstr",_nstr]);querylist.push(["$nshowstr",_nshowstr]);}
var outfrm=outform;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);var countforms=-1;querylist.push(["outformList["+(++countforms)+"]/outform",outfrm]);querylist.push(["outformList["+(++countforms)+"]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMS"]);querylist.push(["outformList["+(++countforms)+"]/outform","SHORTFMSTR"]);}
else
{querylist.push(["outformList["+(++countforms)+"]/outform","AVAILABLEEXEMPLARS"]);}
if(typeof newsoutform!="undefined")
{querylist.push(["$newsoutform",newsoutform]);querylist.push(["outformList["+(++countforms)+"]/outform",newsoutform]);}
querylist.push(["iddb",ndb]);querylist.push(["$iddb",ndb]);querylist.push(["$sign",sign]);if(month!="")
querylist.push(["$month",month]);if(year!="")
querylist.push(["$year",year]);querylist.push(["_history","yes"]);if(typeof biblio!="undefined")
{var bobj={'query':term,'databases':[ndb],'paging':{'limit':portion,'offset':0}};var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
bobj.filters=fobj._bstr;gArr.push(["_bibliostr",JSON.stringify(bobj)]);gArr.push(["_session",numsean]);querylist.push(["$bibliosearch","yes"]);}
if(typeof newsasmodule=="undefined")
{if(typeof solr!="undefined")
{var fobj=prepareFacetsForBibliosearch();if(fobj!=null)
{if(lockedfilters!="")
{term='('+term+') AND '+prepareTerm(fobj._bstr);}}
var count1=-1;var countscore=-1;for(var key in dbs[ndb]["labels"])
{if(dbs[ndb]["labels"][key][4]=="true")
{count1++;querylist.push(["facets["+count1+"]/type","terms"]);querylist.push(["facets["+count1+"]/name",key]);querylist.push(["facets["+count1+"]/field",key]);querylist.push(["facets["+count1+"]/limit","500"]);if(dbs[ndb]["labels"][key][5]!="undefined")
{querylist.push(["facets["+count1+"]/sort/entity",dbs[ndb]["labels"][key][5]]);querylist.push(["facets["+count1+"]/sort/order",dbs[ndb]["labels"][key][6]]);}}
if((fobj!=null)&&(typeof fobj._exclude!="undefined"))
{var arr=fobj._exclude;var count=0;for(var j=0;j<arr.length;j++)
{if(key==arr[j][0])
{querylist.push(["facets["+count1+"]/excludeTerms["+count+"]",delbrackets(arr[j][1])]);count++;}}}
var score=parseInt(dbs[ndb]["labels"][key][7],10);if(score>1)
{countscore++;querylist.push(["boost["+countscore+"]/label",key]);querylist.push(["boost["+countscore+"]/score",score]);}}
querylist.push(["$solr","yes"]);}}
querylist.push(["query/body",term]);querylist.push(["query/params[0]/name","presence"]);querylist.push(["query/params[0]/value","INCLUDE"]);querylist.push(["$newrecs",handler]);querylist.push(["$searchtitle",ntitle]);if(flagrenew)
{querylist.push(["$renew","yes"]);if(typeof newsquant!="undefined")
querylist.push(["$newsquant",newsquant]);if(typeof newspath!="undefined")
querylist.push(["$newspath",newspath]);}
var label=lab;if(typeof sortnewslabel!="undefined")
label=sortnewslabel;if(typeof _sortlabel!="undefined")
label=_sortlabel;if(take('sortlab').n!=null)
label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;var direct="asc";if(typeof _direct!="undefined")
direct=_direct;if((label=='PY')||(label=='DT'))
direct="desc";querylist.push(["query/label",label]);querylist.push(["query/direct",direct]);querylist.push(["$sortlabel",label]);querylist.push(["$sortdirect",direct]);gArr.push(["querylist",prepareQueryString(querylist,ndb)]);callToRCP(gArr);}
function setEvent(y,m)
{var ntitle="Новые поступления";if(typeof newstitle!="undefined")
ntitle=newstitle;var y1=0;var m1=0;var flagyear=false;if(typeof y=="object")
{y1=parseInt(take('y_10').n.className,10);m1=parseInt(take('m_10').n.className,10);if(y.id=='y_10')
flagyear=true;}
else
{y1=parseInt(y,10);m1=parseInt(m,10);}
if(typeof _newrecs!="undefined")
{var validnumber;if(m1==1)
(isLeapyear(y1))?validnumber=29:validnumber=28;else if((m1==3)||(m1==5)||(m1==8)||(m1==10))
validnumber=30;else
validnumber=31;var m2=(m1+1<10)?'0'+(m1+1):m1+1;var str="";var showstr="";var arg={};if((typeof _nshowstr!="undefined")&&(_nshowstr!="")&&(typeof _nstr!="undefined")&&(_nstr!=""))
{arg.nstr=_nstr;arg.nshowstr=_nshowstr;str=_nstr+' AND ';ntitle=_nshowstr;}
if(flagyear)
{str+="[bracket]DT BETWEEN [apos]"+y1+"0101[apos],[apos]"+y1+"1231[apos][/bracket]";showstr+="<i>"+ntitle+" за </i> "+y1+" год";}
else
{str+="[bracket]DT BETWEEN [apos]"+y1+""+m2+"01[apos],[apos]"+y1+""+m2+""+validnumber+"[apos][/bracket]";showstr="<i>"+ntitle+" за "+months[m1]+"</i> "+y1+" года";}
arg.str=str;arg.showstr=showstr;arg.m=m2;arg.y=y1;searchNewRecs(_iddb,arg);}}
var Share={Url:function(o,purl,pimg,pdesc)
{if(typeof purl=="undefined")
{this.titl=document.title;var meta=document.getElementsByTagName('meta');for(var i=0;i<meta.length;i++)
{if(meta[i].name.toLowerCase()=="description")
{this.desc=meta[i].content;break;}}
this.URL='http://'+servername+'/'+foldername;this.IMG='http://'+servername+''+pathimg+'/logo_big.png';}
else
{if(pimg=="")
{if(o.parentNode.parentNode.firstChild.firstChild.nodeName.toLowerCase()=='figure')
{pimg=o.parentNode.parentNode.firstChild.firstChild.firstChild.src;}}
this.URL=purl;this.IMG=pimg;this.desc=replaceSymb3(pdesc);if(this.desc.indexOf('[/size]')!=-1)
{this.titl=this.desc.substring(this.desc.indexOf('[size=20]')+9,this.desc.indexOf('[/size]'));this.desc=this.desc.substring(this.desc.indexOf('[/size]')+7);this.desc=deleteBB(this.desc);}
else
this.titl=this.desc;}
this.caller=eval('this.'+o.className);this.caller();},vkontakte:function()
{url='https://vk.com/share.php?';url+='url='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&description='+encodeURIComponent(this.desc);url+='&image='+encodeURIComponent(this.IMG);url+='&noparse=true';Share.popup(url);},facebook:function()
{url='https://www.facebook.com/share.php?display=popup&';url+='u='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&picture='+encodeURIComponent(this.IMG);url+='&description='+encodeURIComponent(this.desc);Share.popup(url);},odnoklassniki:function()
{url='https://connect.ok.ru/offer?';url+='url='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&description='+encodeURIComponent(this.desc);Share.popup(url);},twitter:function()
{url='https://twitter.com/intent/tweet?';url+='text='+encodeURIComponent(this.titl);url+='&url='+encodeURIComponent(this.URL);url+='&hashtags='+encodeURIComponent('это интересно');Share.popup(url);},popup:function(url)
{var Scr="alwaysRaised=yes,menubar=yes,width=600,height=400,left="+parseInt(((screen.availWidth-1)-600)/2)+",top="+parseInt(((screen.availHeight-1)-400)/2)+",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";var win=window.open(url,'',Scr);}};