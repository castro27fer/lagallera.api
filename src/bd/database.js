
let STREAMS = [];
let CLIENTS = [];


class user {

    constructor(props){

        this.id = props.id;
        this.name = props.name;
        this.lastName = props.lastName;
        this.email = props.email;
        this.password = props.password;
        this.active = props.password;

    }
}

//declare stream
class stream{

    id = null;
    title = null;
    description = null;
    emisor = null;
    room = null;
    status = "CREATED";
    spectators = [];

    constructor(props){

        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.emisor = props.emisor;
        this.room = props.room;
    }

}

//declare spectator
class spectator{

    id = null;
    userId = null;
    socketId = null;
    streamId = null;

    constructor(props){
        this.id = props.id;
        this.userId = props.userId;
        this.socketId = props.socketId;
        this.streamId = props.streamId;
    }
}

//list of users
const users = [
    new user({
        id:1,
        name:"Fernando Osmar",
        lastName:"Castro Martínez",
        email:"jf3r123@gmail.com",
        password:"$2b$10$YHwijPgwmt/LaDMfbUqFq.TKYdYL9SYJtQo9wH1obs6Qjs5Plrv7C",
        active:true
    }),
    new user({
        id:2,
        name:"Mario David",
        lastName:"Arana Martínez",
        email:"marana@gmail.com",
        password:"$2b$10$d1Hn7BmmIf.2lyaoG6U8ROAWy2O8RNgP0MsV.shiGH7LKPt2fodnS",
        active:true
    })
];

const streams = [
    new stream({
        id:25725,
        title:"Stream 1",
        description:"Stream 1 Description",
        emisor:1,
        room:"room1"
    })
]

module.exports = {
    users,
    STREAMS, //live on
    CLIENTS,
}