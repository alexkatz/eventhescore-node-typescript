import { RouteConfiguration } from 'hapi';
import { AuthData } from '../../client/src/auth/models';

const auth: RouteConfiguration[] = [
    {
        method: 'POST',
        path: '/api/auth',
        config: { auth: false },
        async handler(request, reply) {
            const { payload: user }: { payload: AuthData} = request;
            console.log(user);
        },
    },
];

export { auth };
