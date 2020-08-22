/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - Autenticação
 *      summary: Autenticar usuário
 *      description: Endpoint responsável por verificar se as credenciais enviadas são liberadas para utilizar a API e gerar o token de autenticação
 *      parameters:
 *          - in: body
 *            description: Email e senha para verificar as credenciais.
 *            schema:
 *                type: object
 *                required:
 *                    - email
 *                      senha
 *                properties:
 *                    email:
 *                      type: string
 *                    senha:
 *                      type: string
 *      responses:
 *          200:
 *              description: Requisição executada com sucesso e retorna do token
 *          500:
 *              description: Erro no servidor do usuário!      
 */