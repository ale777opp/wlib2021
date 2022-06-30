Vue.component('menu-select', {
props: {

},
template: '<div class="grid_container">\
    <select v-model="selected">\
    <option v-for="item in itemsMenu" :value="item.ref">{{ item.name }}</option>\
    </select>\
    <br>\
    <span>Выбранная ссылка: {{ selected }}</span>\
    </div>'
,
data() {
    return {
    selected: '#value_1',
    itemsMenu:[
    {name: 'item name 1', ref: '#value_1'},
    {name: 'item name 2', ref: '#value_2'},
    {name: 'item name 3', ref: '#value_3'},
    {name: 'item name 4', ref: '#value_4'},
    {name: 'item name 5', ref: '#value_5'},
    ]
    }
}
})

var menu = new Vue({
    el: '#mainMenu',
    data: {}
})    