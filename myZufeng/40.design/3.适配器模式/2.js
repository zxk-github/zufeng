// 使用： 
// 适配参数，返回值的适配


function ajax(options) {
    let defaultOptions = {
        method: 'GET',
        dataType: 'json'
    }
    for(let key in options) {
        defaultOptions[key] = options[key]
    }
    console.log(defaultOptions);
}

function transformJson(data) {
    return JSON.parse(data)
}

ajax({
    url: 'www.baidu.com',
    methods: 'POST',
    success(data) {
        let data = transformJson(data)
    }
})
