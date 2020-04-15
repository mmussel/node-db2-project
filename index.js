const server = require('./api/server');
const port = process.env.PORT || 5010;

server.listen(port , ()=> {
    console.log(`listening on port ${port}`)
})