const EventEmiter = require('events');
const fs = require('fs');

class PauseReadStream extends EventEmiter {
    constructor(path, options) {
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.mode = options.mode || 0o666;
        this.pos = this.start = options.start || 0;
        this.end = options.end;
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding;
        this.flags = options.flags || 'r';
        this.flowing = null;
        this.buffer = Buffer.alloc(this.highWaterMark);  // 每次读取大小 不是缓存区
        this.buffers = []; // 这才是缓存
        this.length = 0;
        this.open(); // 打开文件准备读取 

        this.on('newListener', (type, listener) => {
            
        })

    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if(err) {
                if(this.autoClose) {
                    this.distroy();
                    this.emit('err', err)
                }
            }
            this.fd = fd;
            this.emit('open');
            this.read(0);
        }) 
    }
    read(n) {
        // 0 填充缓存区 触发readable事件
        // 大0 小this.length 缓存区数据足够用 并且读取的数据大于0 可以直接区缓存区中拿
        let ret;
        if(0 < n < this.length) {
            ret = Buffer.alloc(n);
            let index = 0;
            let b ;
            while(null != (b = this.buffers.shift())) {
                for(let i = 0; i < b.length; i++) {
                    ret[index++] = b[i];
                    if(index == n) { // 已经填充完毕
                        b = b.slice(i);
                        this.buffers.unshift(b);
                        this.length -= n;
                        break;
                    }
                }
            }
        }
        if(this.length < this.highWaterMark) {
            fs.read(this.fd, this.buffer, 0, this.highWaterMark, null, (err, bytesRead) => {
                if(bytesRead) {
                    let b;
                    // this.buffer有可能不满,这时候需要截取
                    b = this.buffer.slice(0, bytesRead);
                    this.buffers.push(b);
                    // 让缓存区字节数量加实际读取的字节数
                    this.length += bytesRead;
                    this.emit('readable');
                } else {
                    this.emit('end');
                }
            })
        }
        return this.encoding? ret.toString(this.encoding) : ret;
    }

    distroy() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }

}

module.exports = PauseReadStream;



/**
 * 创建一个流之后 默认会进入暂停模式
 * 真实情况下,当一个可读流创建之后立刻进入暂停模式, 其实会立刻填充缓存区
 *  */