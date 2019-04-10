/**
 * 写一个类,当文件读取器每读到一行就会触发newLine事件,当读取结束之后就会发射end事件
 * 
 *  */

let EventEmitter = require('events');
let util = require('util');
let fs = require('fs');

const NEW_LINE = 0x0A; // /n
const RETURN = 0x0D; // /r


function LineReader(path) {
    EventEmitter.call(this);
    this._reader = fs.createReadStream(path);

    // 当给一个对象添加一个新的监听函数的时候,会触发newListener事件,
    // 新添加对象的名字,和新添加对象的会调函数传入
    this.on('newListener', (type, listener) => {
        // 当添加newline事件的时候,开始读取文件
        if(type === 'newLine') {
            
            let buffers = [];
            // 当监听一个可读流的readable事件时,流会调用底层的读取文件api方法填充缓存区,填充完成之后,触发readable事件
            this._reader.on('readable', () => {
                let char; //Buffer类型 是一个只有一个字节的Buffer
                
                while(null != (char = this._reader.read(1))) {
                    switch(char[0]) {
                        case NEW_LINE:
                            this.emit('newLine', Buffer.from(buffers));
                            buffers.length = 0;
                            break;
                        case RETURN:
                            this.emit('newLine', Buffer.from(buffers));
                            buffers.length = 0;
                            let newChar = this._reader.read(1);
                            if(newChar !== NEW_LINE) {
                                buffers.push(newChar[0]);
                            }
                            break;
                        default:
                            buffers.push(char[0]);
                            break;
                    }
                }
            })
            this._reader.on('end', () => {
                this.emit('newLine', Buffer.from(buffers));
                this.emit('end')
            })
        }
    })    
}

util.inherits(LineReader, EventEmitter)

let lineReader = new LineReader('./demo1.txt');
lineReader.on('newLine', (data) => {
    console.log(data);
})

lineReader.on('end', () => {
    console.log('over')
})








