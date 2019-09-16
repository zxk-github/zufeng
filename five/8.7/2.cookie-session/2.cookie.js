const http = require('http');
let crypto = require('crypto');
const queryString = require('querystring');
const secret = 'z'
const server = http.createServer((req, res) => {
    function setCookie() {
        let arr = [];
        return function(key, value, opts = {}) {
            let args = [];
            if(opts.httpOnly) {
                args.push('httpOnly=true');
            }
            if(opts.maxAge) {
                args.push(`max-age=${opts.maxAge}`);
            }
            if(opts.path) {
                args.push(`path=${opts.path}`)
            }
            if(opts.signed)  {
                // sha256加盐算法
                let sign = crypto.createHmac('sha256', secret).update(value+'').digest('base64').replace(/\/|\+|\=/g, '');
                value = value + '.' + sign;  // 原值+签名
            }
            arr.push(`${key}=${value};${args.join(';')}`)
            console.log(arr);
            res.setHeader('Set-cookie', arr);

        }
    }

    function getCookie(key, options = {}) {
        let value = queryString.parse(req.headers.cookie, '; ', '=')[key];
        console.log(value);
        if(value) {
            if(options.signed) {
                let [v, sign] = value.split('.');
                let newSign = crypto.createHmac('sha256', secret).update(v+'').digest('base64').replace(/\/|\+|\=/g, '');
                if(sign === newSign) {
                    return v;
                } else {
                    return '';
                }
            }
        } else {
            return '';
        }
    }
    

    if(req.url === '/read') {
        let count = getCookie('count', {signed: true});
        res.end(count);
    }

    if(req.url === '/write') {
        res.setCookie = setCookie();
        res.setCookie('count', '10', {maxAge: 10000, path: '/read', httpOnly: true, signed: true})
        res.setCookie('age', '12')
        return res.end('12')
    }
})

server.listen(3000)


