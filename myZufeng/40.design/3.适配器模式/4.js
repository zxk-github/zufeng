// var $ = require('jquery');
const fetch = require('fetch');

$.ajax({
    url, 
    type: 'GET',
    dataType: 'json',
    data: {
        id: 1
    }
})

window.$ = {
    ajax: function(options) {
        fetch(options.url, {
            method: options.type || 'GET',
            body: JSON.stringify(options.data || {})
        })
    }
}

// vue的计算属性也是一个适配器



