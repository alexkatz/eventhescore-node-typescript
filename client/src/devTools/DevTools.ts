let DevTools;
if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-var-requires
    DevTools = require('./DevTools.dev');
}

// tslint:disable-next-line:no-default-export
export default DevTools;
