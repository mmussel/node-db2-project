const express = require('express')
const server = express();
const carsRouter = require('../cars/cars-Router');

server.use(express.json());
server.use('/api/cars', carsRouter)

server.get('/', (req,res)=>{
    res.status(200).json({message: 'api is running correctly'})
})

module.exports = server;