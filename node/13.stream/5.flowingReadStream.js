const EventEmiter = require('events');
const fs = require('fs');

class FlowingReadStream extends EventEmiter {
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
        this.open(); // 打开文件准备读取 

        this.on('newListener', (type, listener) => {
            if(type === 'data') {
                // 如果是监听到date事件,流就会自动切换到流动模式
                this.flowing = true;
                this.read();
            }
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
        }) 
    }

    read() {
        if(typeof this.fd != 'number') {
            return this.once('open', () => this.read());
        }
        let howMuchToRead = this.end? Math.min(this.end - this.pos + 1, this.highWaterMark): this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytes) => {
            // bytes 实际读取到的字节数
            if(err) {
                if(autoClose) {
                    this.distroy();
                    return this.emit('error', err);
                }
            }

            if(bytes) {
                let data = this.buffer.slice(0, bytes);
                data = this.encoding? data.toString(this.encoding) : data;
                this.pos += bytes;
                this.emit('data', data);
                
                if(this.end && this.pos > this.end) {
                    
                    return this.endFn();
                } else {
                    this.read();
                }
            } else {
                return this.endFn();
            }
        })
    }

    endFn() {
        this.emit('end');
        this.distroy();
    }
    distroy() {
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }





}

module.exports = FlowingReadStream;
