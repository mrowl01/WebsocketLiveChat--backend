const WebSocketServer = require('ws').Server; 
const wss = new WebSocketServer({port:9090});

//keep track of clients
let clients = [];
let messages = [];

wss.on('connection', (connection)=>{
	clients.push(connection);
	connection.on('message', (message) =>{
		const data = JSON.parse(message);
		let formatted = [data.username + ':'+ data.message]
		console.log(formatted);
		messageDisplay(formatted);
		clients.forEach(client => client.send(JSON.stringify(messages)));
		
	})
})


const messageDisplay = (formatted) =>{
	if(messages.length > 10){
		let first = messages.shift();
		messages = [];
		messages.push(first);
	} else {
		messages.push(formatted);
	}
}