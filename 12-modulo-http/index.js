const http = require('http')

http.createServer((request,response) => {
    response.end('Helo World!')
})
.listen(5000, () => console.log('o servidor está rodando') )