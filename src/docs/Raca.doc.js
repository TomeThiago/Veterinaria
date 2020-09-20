/**
  * @swagger
  * /raca:
  *    get:
  *      tags:
  *        - Raça   
  *      summary: Listar as raças
  *      description: Faz a listagem das raças cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da raça
  *        - in: query
  *          name: especie_id
  *          type: integer
  *          required: false
  *          description: Filtra pelo ID da espécie
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da raça
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Raça
  *      summary: Incluir raça
  *      description: Faz a inclusão da raça no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova raça a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    especie_id:
  *                      type: integer
  *      responses:
  *          200:
  *              description: Raça cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /raca/:id:
  *    get:
  *      tags:
  *        - Raça
  *      summary: Consulta raça.
  *      description: Retornar uma raça específica do cadastro de raça.
  *    put:
  *      tags:
  *        - Raça   
  *      summary: Alterar raça
  *      description: Faz a alteração do registro do cadastrado de raça.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a raça a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    especie_id?:
  *                      type: integer
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Raça alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Raça   
  *      summary: Excluir raça
  *      description: Faz a exclusão de um registro do cadastrado de raça.
  *      responses:
  *          200:
  *              description: Raça excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  