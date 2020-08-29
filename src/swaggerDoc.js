const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Documentação API SystemVet',
      version: '1.0.0',
      description: 'Esta documentação tem por finalidade auxiliar a integração entre a API e o sistema web SystemVet',
    },
    host: 'https://systemvet.herokuapp.com',
    basePath: '/',
  },
  produces: ["application/json"],
  schemes: ["http"],
  apis: [
    path.resolve(__dirname, 'docs', '*.doc.js'),
  ]
};

const specs = swaggerJsdoc(options);

specs.security = [
  {
    Bearer: []
  }
];

specs.securityDefinitions = {
  Bearer: {
      name: "Authorization",
      in: "header",
      type: "apiKey",
      description:
        "Coloque seu token JWT com a palavra Bearer (e um espaço)."
  }
};

module.exports = (app) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
}