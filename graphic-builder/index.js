'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         reply('Hello, world!');
//     }
// });

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('graphic-builder/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/script.js',
        handler: function (request, reply) {
            reply.file('graphic-builder/script.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/style.css',
        handler: function (request, reply) {
            reply.file('graphic-builder/style.css');
        }
    });
});




server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});