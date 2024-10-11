
require("dotenv").config({path:"./.env"});
// const dataBaseSync = require("./database/dataBaseSync.js");
const app = require('./app.js');

//starting the server 
const port = process.env.PORT;

async function main(){
     try{
       
        // dataBaseSync(false);
        
        app.listen(port, ()=>{
            console.log("starting server " + port);
        });
    }
    catch(error){
        console.error("not starting server", error);
    }
}

main();