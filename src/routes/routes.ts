import { game } from './game';
import { auth } from './auth';

const routes = [
    ...game,
    ...auth,
];

export { routes };
