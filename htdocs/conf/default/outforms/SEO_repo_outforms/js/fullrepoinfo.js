var record = opacGlobal.arg.get('record');
var outform = '';

/**
  * Функция возвращает зачение из Справочников ОПАКА.
  */
function getHandbookData(format, type, name, value) { //"RUSMARC",'AF','SUB5_3', 'd'
  try {
    var hands = opacGlobal.settings.handbooks;
    var handbook = hands ? hands.get(format, type, name) : null;
    if (handbook) {
      return handbook.getKeyValue(value);
    } else {
      throw {message: 'Справочник не найден!'};
    }
  } catch(e) {
    // return 'ОШИБКА'
    throw 'Параметры: '+format+', '+type+', '+name+', '+value+'\nОшибка:\n'+ e.message;
  }
}

function main() {
  if (record.isHave('101')) {
    var field = record.filter('101')[0];
    var lang = field.isHave('a') ? getHandbookData('RUSMARC', 'BIBL', '990', field.filter('a')[0].content) : null;
    if (lang) {
      outform += '<b>Язык текста: </b>'+lang+'\n';
    }
  }
  
  var isbn = null;
  if (record.isHave('010')) {
    var field = record.filter('010')[0];
    if (field.isHave('a')){
      isbn = field.filter('a').content;
    }
  } else if (record.isHave('463')) {
    var embedded = record.filter('463')[0];
    var listFields = embedded.filter('1');
    for (var i = 0; i < listFields.size(); i++) {
      var field = listFields[i].content;
      if (field.number == '010') {
        if (field.isHave('a')){
          isbn = field.filter('a')[0].content;
        }
      }
    }
  }
  if (isbn) {
    outform += '<b>ISBN: </b>'+isbn+'\n';
  }
  
  var issn = null;
  if (record.isHave('011')) {
    var field = record.filter('011')[0];
    if (field.isHave('a')){
      issn = field.filter('a').content;
    }
  } else if (record.isHave('461')) {
    var embedded = record.filter('461')[0];
    var listFields = embedded.filter('1');
    if (listFields.size() > 0) {
      for (var i = 0; i < listFields.size(); i++) {
        var field = listFields[i].content;
        if (field.number == '011') {
          if (field.isHave('a')){
            issn = field.filter('a')[0].content;
          }
        }
      }
    }
  }
  if (issn) {
    outform += '<b>ISSN: </b>'+issn+'\n';
  }
  
  if(record.isHave('3')){
    var uid = record.filter('003')[0].content;
    outform += '[URL:view=copy;title=Постоянный идентификатор ресурса: '+uid+']<//repo.rucml.ru/record/'+uid+'>\n';
  }
  
}

if (outform != '') {
  outform = '<b>Информация о документе: </b>\n' + outform;
}

try {
  main();
} catch (err){
  outform += err;
}

// print("// RECORD #","\n");
// print(outform,"\n\n"); //Отладка 
opacGlobal.res.push('string', outform);
