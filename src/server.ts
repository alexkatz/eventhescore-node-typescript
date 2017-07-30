import * as Hapi from 'hapi';

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
        reply('Hello, world!');
    },
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler(request, reply) {
        const { name } = request.params;
        reply(`Hello, ${encodeURIComponent(name)}`);
    },
});

server.start(err => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
