
// 3. 解析 URL Params 为对象
let url = 'http://www.domain.com/?user=';

/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
  
function toChangeNumber(value) {
  if(value === ''){
    return value;
  }
  let num = Number(value);
  if(isNaN(num)) {
    return value
  } else {
    return num
  }
}
function parseParam(url) {
  let query = url.split('?')[1];
  if(!query) {
    return {}
  }
  let params = {};
  query = query.split('&');
  query.forEach(p => {
    if(!p.includes('=')) {
      params[p] = true;
    } else {
      let [key, value] = p.split('=');
      value = decodeURIComponent(value);
      if(params[key]) {
        params[key] = [params[key]];
        params[key].push(toChangeNumber(value));
      } else {
        params[key] = toChangeNumber(value);
      }
    }
  });
  return params;
}

console.log(parseParam(url));

