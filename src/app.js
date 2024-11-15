require("dotenv").config({path:"./.env"});

const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('node:http');
const { createSocketIO } = require("./modules/socket.js");

const app = express();
const server = createServer(app);

const FRONTEND = process.env.APP_HOST;
const TEST = process.env.TEST;

//settings 
app.set("port",process.env.PORT);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors({ origin: [FRONTEND,TEST], optionsSuccessStatus: 200 }));
  
app.get("/",(req,res) =>{
    res.json({"lagallera.com":"Bienvenido a la gallera..."});
});

app.use("/api",require("./router/routes.js"));

app.use('/assets', express.static(`${__dirname}/assets`));

createSocketIO(server);

module.exports = server;