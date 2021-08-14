const Hapi = require('@hapi/hapi');
const nanoid = require('nanoid');
const router = require('./router.js');
const init = async () => {
    const server = Hapi.server({
        port: 2000,
        host: 'localhost',
    });
    await server.start();
    server.route(router)
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();