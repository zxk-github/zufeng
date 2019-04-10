var fs = require('fs');
var EventEmiter = require('events');

class WriteStream extends EventEmiter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.pos = this.start; // 文件当前写入的索引
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 16*1024
        this.writing = false; // 表示内部正在写入数据
        this.length = 0; // 表示缓存区字节的长度
        this.fd = '';
        this.buffers = []; // 缓存区
        this.open(); // 打开文件
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if(err) {
                if(this.autoClose) {
                    this.distroy();
                }
                this.emit('error', err);
            } 

            this.fd = fd;
            this.emit('open');

        })
    }

    // 如果底层已经在写入数据的话,则必须将当前要写入数据放到缓存区
    write(chunk, encoding,  cb) {
        chunk = Buffer.isBuffer(chunk)? chunk : Buffer.from(chunk, this.encoding);
        let len = chunk.length;
        // 缓存区的长度加上当前写入的长度
        this.length += len;
        // 判断当前缓存区长度是不是小于最高水位线
        let ret = this.length < this.highWaterMark;
        
        if(this.writing) {
            // this.writing为true表示正在向底层写入数据,则当前数据必须放到缓存区中
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
        } else { 
            // 直接调用底层的写入方法进行写入
            // 在底层写完当前数据后 要清空缓存区
            // 第一次进入的时候,会走这里,写入的过程是一个异步的过程,当循环第二次的时候,就会走上面,然后把数据放进缓存区
            this.writing = true;
            this._write(chunk, encoding, () => this.clearBuffer())
        }
        return ret;
    }

    _write(chunk, encoding, cb) {
        if(typeof this.fd != 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
            if(err) {
                if(this.autoClose) {
                    this.distroy();
                    this.emit('error', err);
                }
            }

            this.pos += bytesWritten;
            // 写入多少字节缓存区就要减少多少字节
            this.length -= bytesWritten;
            cb && cb()
        })
    }

    clearBuffer() {
        let data = this.buffers.shift();
        if(data) {
            this._write(data.chunk, data.encoding, () => this.clearBuffer())
        } else {
            this.writing = false;
            // 缓存区清空了
            this.emit('drain')
            
        }
    }

    distroy() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
}

module.exports = WriteStream;



/**
 * 
 * 塞满了才会暂停 
 * 如果填充缓存区速度慢与写入速度 这样永远不会触发drain事件
 * 当每次读取的速度 低于缓存区的highwatermark 一般就不会触发drain事件
 *
 *  */







