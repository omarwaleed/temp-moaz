const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.log(['error', 'database', 'read']);

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

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start((err)=>{
	if(err){
		throw err;
	}
	console.log(`Serving on ${server.info.uri}`);
})