/**
  * @swagger
  * /especie:
  *    get:
  *      tags:
  *        - Espécie   
  *      summary: Listar as espécies
  *      description: Faz a listagem das espécies cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da espécie
    *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da espécie
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Espécie
  *      summary: Incluir espécie
  *      description: Faz a inclusão da espécie no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova espécie a ser cadastrada
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Espécie cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /especie/:id:
  *    get:
  *      tags:
  *        - Espécie
  *      summary: Consulta espécie.
  *      description: Retornar uma espécie específica do cadastro de espécie.
  *    put:
  *      tags:
  *        - Espécie
  *      summary: Alterar espécie
  *      description: Faz a alteração do registro do cadastrado de espécie.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a espécie a ser alterada.
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
  *              description: Espécie alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Espécie  
  *      summary: Excluir espécie
  *      description: Faz a exclusão de um registro do cadastrado de espécie.
  *      responses:
  *          200:
  *              description: Espécie excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  