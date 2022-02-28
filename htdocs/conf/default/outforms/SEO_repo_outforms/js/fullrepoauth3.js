var record = opacGlobal.arg.get('record');
var outform = '';

function main() {
  if (record.isHave('70?')) {
    var objAU = {};
    var obgOG = {};
    var listFields = record.filter('70?');
    for (var i = 0; i < listFields.size(); i++) {
      var field = listFields[i];
      
      var fam = field.isHave('a') ? field.filter('a')[0].content : null;
      var ini = field.isHave('b') ? field.filter('b')[0].content : null;
      var ino = field.isHave('g') ? field.filter('g')[0].content : null;
      var prof = field.isHave('c') ? field.filter('c')[0].content : '';
      var year = field.isHave('f') ? field.filter('f')[0].content : '';
      var authId = field.isHave('3') ? field.filter('3')[0].content : null;
      
      var key = fam || null;
      if (!key) {
        continue;
      }
      key+= ini ? ' '+ini : '';
      
      var hintAU = fam;
      hintAU += ino ? ' '+ino : '';
      hintAU += !ino && ini ? ' '+ini : '';
      hintAU += prof!='' && year!='' 
                  ? ' ('+ prof + '; ' + year +')'
                  : prof!='' || year!='' 
                  ? ' ('+ prof + year +')'
                  : '';
      
      if(objAU.hasOwnProperty(key)) {
        continue;
      } else {
        var author = objAU[key]= {link: [],hint: hintAU, idAf : authId};
      }
      
      //Получаем Аффилированость к разным организациям
      var aff = field.isHave('p') ? field.filter('p')[0].content : null;
      if (!aff) {
        continue;
      }
      arrAff = aff.split('|');
      arrAff.forEach(function(item) {
        // Разбор каждой структуры на подразделение и Организацию
        var data = item.split(':');
        var idOrg = null;
        var valueOrg = null;
        if (data.length >1) {
          idOrg = data[0];
          valueOrg = data[1];
        } else {
          valueOrg = data[0];
        }
        
        /*var arrOrg = valueOrg ? valueOrg.split('.') : null;
        if (arrOrg) {
          arrOrg.forEach(function(og) {
            if(obgOG.hasOwnProperty(og)) {
              var ind = obgOG[og].index;
              obgOG[og].cnt++;
            } else {
              var ind = Object.keys(obgOG).length + 1;
              obgOG[og] = {index: ind, cnt: 1};
            }
            if (author.link.indexOf(ind) == -1) {
              author.link.push(ind);
            }
          });
        }*/
        if(obgOG.hasOwnProperty(valueOrg)) {
          var ind = obgOG[valueOrg].index;
          obgOG[valueOrg].cnt++;
        } else {
          var ind = Object.keys(obgOG).length + 1;
          obgOG[valueOrg] = {index: ind, cnt: 1};
        }
        if (author.link.indexOf(ind) == -1) {
          author.link.push(ind);
        }
      });
    }
    for (key in objAU)
	{
      var auth = objAU[key];
      outform += auth.idAf ? '[AF]' + auth.idAf + '[/AF]' : '';
      outform += key;
	  
	  if(auth.link.length>0)
	  {
		  outform += '[LINK][';
		  for(var j=0;j<auth.link.length; j++)
		  {
			  if(j > 0)
				  outform += ',';
			  outform += '[link]'+auth.link[j]+'[linkT]'+auth.link[j]+'[/link]';
		  }
		  outform += '][/LINK]';
	  }
      outform += '[HINT]' + auth.hint + '[/HINT]' + '\n';
    }
  }
}

if (outform != '') {
  outform = 'Авторы:\n' + outform;
}

try {
  main();
} catch (err){
  outform += err;
}

// print("// RECORD #","\n");
// print(outform,"\n\n"); //Отладка 
opacGlobal.res.push('string', outform);
