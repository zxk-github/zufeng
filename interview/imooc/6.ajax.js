function setUrl(json) {
    json.t = Math.random();
    var arr = [];

    
}

function ajax(json) {
    json = json || {};
    if(!json.url) {
        throw new Error('url不能为空');
    }
    json.type = json.type || 'get';
    json.time = json.time || 3000;
    json.data = json.data || {};

    let timer = null;
    let oAjax = null;
    if(window.XMLHttpRequest) {
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject('Microsoft.XMLHttp');
    }

    switch(json.type.toLowerCase() ){
        case 'get': 
            oAjax.open('get', json.url + '?' + setUrl(json.data), true);  //false 同步 true 异步
            oAjax.send();
            break;
        case 'post':
            oAjax.open('post', json.url, true);
            oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            oAjax.send(setUrl(json.data));
            break;
    }
    json.loading && json.loading();

    oAjax.onreadystatechange = function() {
        if(oAjax.state = 4) {
            json.complete && json.complete();
            if(oAjax.status >= 200 && oAjax.status < 300) {
                json.fnSuccess && json.fnSuccess();
            } else {
                json.fnFail && json.fnFail(oAjax.status);
            }
            clearTimeout(timer);
        }
    }
    timer = setTimeout(() => {
        oAjax.onreadystatechange = null;
        alert('网络超时')
    }, json.time);


}






function ajax(json) {
    if(!json.url) {
        throw new Error('缺少url');
    }
}







