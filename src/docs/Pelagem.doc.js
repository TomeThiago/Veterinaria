/**
  * @swagger
  * /pelagem:
  *    get:
  *      tags:
  *        - Pelagem   
  *      summary: Listar as pelagens
  *      description: Faz a listagem das pelagens cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da pelagem
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da pelagem
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Pelagem
  *      summary: Incluir pelagem
  *      description: Faz a inclusão da pelagem no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova pelagem a ser cadastrada
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Pelagem cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /pelagem/:id:
  *    get:
  *      tags:
  *        - Pelagem
  *      summary: Consulta pelagem.
  *      description: Retornar uma pelagem específica do cadastro de pelagem.
  *    put:
  *      tags:
  *        - Pelagem   
  *      summary: Alterar pelagem
  *      description: Faz a alteração do registro do cadastrado de pelagem.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a pelagem a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Pelagem alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Pelagem
  *      summary: Excluir pelagem
  *      description: Faz a exclusão de um registro do cadastrado de pelagem.
  *      responses:
  *          200:
  *              description: Pelagem excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  