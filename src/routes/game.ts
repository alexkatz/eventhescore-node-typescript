import { RouteConfiguration } from 'hapi';
import * as Boom from 'boom';
import { pool } from '../pool';

const game: RouteConfiguration[] = [
    {
        method: 'GET',
        path: '/api/game',
        async handler(request, reply): Promise<void> {
            const client = await pool.connect();
            try {
                const { rows } = await client.query('SELECT * FROM dbo.TestProcedure()'); // TODO: no magic query strings, organize stored proc calls somehow...
                reply(rows);
            } catch (error) {
                console.log(error); // TODO: integrate logging...
                reply(Boom.badImplementation(error));
            } finally {
                client.release();
            }
        },
    },
];

export { game };
