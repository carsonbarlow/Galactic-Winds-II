'use strict';

const fs = require('fs');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

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
    path: '/{param*}',
    handler: function (request, reply) {
      reply.file('graphic-builder/'+request.params.param);
    }
  });

  server.route({
    method: 'POST',
    path: '/save',
    handler: function (request, reply){
      fs.writeFile("saved_svg_data.txt", request.payload.content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        reply('compressed data successfully saved');
      }); 
    }
  });

  server.route({
    method: 'GET',
    path: '/load',
    handler: function (request, reply) {
      fs.readFile('saved_svg_data.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log('data successfully retireved');
        reply(data);
      });
    }
  });



});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});


