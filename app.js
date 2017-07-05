const Hapi = require('hapi');
const Path = require('path')

const server = new Hapi.Server();

server.connection({
	host: "localhost",
	port: process.env.NODE_ENV || 3000
})

server.register(require('vision'), (err)=>{
	if(err){
		console.error(err);
	}

	server.views({
		engines: {
			ejs: require('ejs')
		},
		relativeTo: __dirname,
		path: 'views'

	})
})

server.route({
	method: "GET",
	path: "/",
	handler: function(req, reply){
		reply.view('home');
	}
})

server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Serving on ${server.info.uri}`);
})