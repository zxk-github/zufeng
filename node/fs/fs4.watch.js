const fs = require('fs');


// fs.watch('./a',{
//     recursive: true
// },(eventType, filename) => {
//     console.log(eventType, filename)
// })

fs.watchFile('./a', (curr, prev) => {
    
})

