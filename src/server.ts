import * as Hapi from 'hapi';
import { Client } from 'pg';

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    async handler(request, reply): Promise<void> {
        try {
            const client = new Client({
                user: 'admin',
                host: 'localhost',
                database: 'eventhescore',
                password: 'admin',
                port: 5432,
            });
            await client.connect();
            const { rows } = await client.query('SELECT * FROM dbo.TestProcedure()');
            reply(rows);
        } catch (error) {
            console.log(error);
            reply();
        }
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
    if (err) { throw err; }
    console.log(`Server running at: ${server.info.uri}`);
});
