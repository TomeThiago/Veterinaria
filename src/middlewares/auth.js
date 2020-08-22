const jwt = require('jsonwebtoken');
const HTTPStatus = require('http-status');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(HTTPStatus.UNAUTHORIZED).send({ error: 'Não autorizado, token não informado.' });
  }

  const parts = authHeader.split(' ');

  if(!parts.length === 2){
    return res.status(HTTPStatus.UNAUTHORIZED).send({ error: 'Não autorizado, token mal informado.' });
  }

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme)) {
    return res.status(HTTPStatus.UNAUTHORIZED).send({ error: 'Não autorizado, token mal informado.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.status(HTTPStatus.UNAUTHORIZED).send({ error: 'Não autorizado, token expirado ou inválido.' });

    req.userIdLogado = decoded.id;
    return next();
  });
}