require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerDoc = require('./swaggerDoc');

require('./database')

const app = express();

const routes = require('./routes');
swaggerDoc(app);

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(routes);

const server = app.listen(process.env.PORT || 3000);
console.log(`Servidor iniciado com sucesso na porta ${server.address().port}!`);