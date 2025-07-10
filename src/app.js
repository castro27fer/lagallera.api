require("dotenv").config({path:"./.env"});

const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const socketRouter = require("./router/socketIO.route.js");

//COSTANTE
const FRONTEND = process.env.APP_HOST;
const TEST = process.env.TEST;
const environment = process.env.ENVIRONMENT;

//Starting Servers
const app = express();
const httpServer = createServer(app);

const ioServer = new Server(httpServer,{
    cookie: true,
    path: '/socket.io',
    cors: {
        origin: FRONTEND, 
        methods: ['GET', 'POST'],
        credentials: true,
      },
});

ioServer.on("connection",(socket) => socketRouter(socket,ioServer));

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
console.log(FRONTEND)
//app.use(cors({ origin: [FRONTEND,TEST], optionsSuccessStatus: 200 }));
const allowedOrigins = [FRONTEND, 'http://192.168.1.12:3003'];

app.use(cors({
    origin: function (origin, callback) {
        console.log(origin,allowedOrigins);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
app.use(environment === "PRODUCCTION" ? "" : "/api",require("./router/routes.js"));

app.use('/assets', express.static(`${__dirname}/assets`));

module.exports = {
    httpServer
};