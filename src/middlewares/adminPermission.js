const HTTPStatus = require('http-status');
const { isAdmin } = require('../validation/isValidation');

module.exports = async (req, res, next) => {
  
  if (! await isAdmin(req.userIdLogado)) { //Se não achar ele não é administrador
    return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
  }

  return next();
}