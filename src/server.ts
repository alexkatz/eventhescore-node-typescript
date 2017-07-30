import * as Hapi from 'hapi';
import * as PG from 'pg';

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    async handler(request, reply): Promise<void> {
        const pool = new PG.Pool({
            user: 'admin',
            host: 'localhost',
            database: 'eventhescore',
            password: 'admin',
            port: 5432,
        });
        const { rows } = await pool.query('SELECT * FROM dbo.TestProcedure()');
        
        reply(rows);
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
