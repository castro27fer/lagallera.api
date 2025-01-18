
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

module.exports = {
    users,
    STREAMS, //live on
    CLIENTS,
}