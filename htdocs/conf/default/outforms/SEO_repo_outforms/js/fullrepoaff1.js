var record = opacGlobal.arg.get('record');
var outform = '';

function main() {
  if (record.isHave('70?')) {
    var objAU = {};
    var obgOG = {};
    var listFields = record.filter('70?');
    for (var i = 0; i < listFields.size(); i++) {
      var field = listFields[i];
      
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
          });
        }*/
        if(obgOG.hasOwnProperty(valueOrg)) {
          var ind = obgOG[valueOrg].index;
          obgOG[valueOrg].cnt++;
        } else {
          var ind = Object.keys(obgOG).length + 1;
          obgOG[valueOrg] = {index: ind, cnt: 1};
        }
      });
    }
    for (key in obgOG) {
      var org = obgOG[key];
      outform += '[LINK][[anchor]'+org.index+'[anchT]'+org.index+'[/link]][/LINK]' + key + '\n';
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
