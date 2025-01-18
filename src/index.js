
require("dotenv").config({path:"./.env"});
// const dataBaseSync = require("./database/dataBaseSync.js");
const { httpServer } = require('./app.js');


//starting the server 
const portHttp = process.env.PORT;

async function main(){
     try{
       
        // dataBaseSync(false);
        
        httpServer.listen(portHttp, ()=>{
            console.log("starting server http " + portHttp);
        });

      
    }
    catch(error){
        console.error("not starting server", error);
    }
}

main();