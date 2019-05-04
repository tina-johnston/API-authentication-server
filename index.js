//import express from 'express'
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

//DB setup
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true })
//{ useNewUrlParser: true }

//app set up
//morgan logging requests for debugging
//both middleware in express
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

//parse incoming requests

//server set up
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('server lisening on', port)
