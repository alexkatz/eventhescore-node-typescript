import * as Hapi from 'hapi';
import * as Path from 'path';
import { routes } from './routes/routes';

const api: Hapi.PluginFunction<void> = (server, options, next) => {
    server.route(routes); // for now, one plugin for all routes...
    server.ext('onPostHandler', (request, reply) => { // returns index.html for all non-api requests
        const { response } = request;
        if (response.isBoom && response.output.statusCode === 404) {
            reply.file(Path.join(__dirname, '../client/build/index.html'));
        }
        return reply.continue();
    });
    next();
};

api.attributes = {
    name: 'api',
    version: '0.1',
};

export { api };
