/**
  * @swagger
  * /movimentaestoque:
  *    get:
  *      tags:
  *        - Movimenta Estoque 
  *      summary: Listar as movimentações feitas
  *      description: Faz a listagem das movimentações efetuadas no sistema.
  *      parameters:
  *        - in: query
  *          name: estoque_id
  *          type: string
  *          required: false
  *          description: Filtra pelo ID do estoque
  *        - in: query
  *          name: tipo
  *          type: string
  *          required: false
  *          description: Filtra pelo tipo da movimentação
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Movimenta Estoque   
  *      summary: Movimenta estoque
  *      description: Faz a movimentação do estoque no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o movimento a ser efetuado
  *            schema:
  *                type: object
  *                required:
  *                    - estoque_id
  *                    - tipo
  *                    - quantidade
  *                properties:
  *                    estoque_id:
  *                      type: integer
  *                    tipo:
  *                      type: string
  *                    quantidade:
  *                      type: decimal
  *      responses:
  *          200:
  *              description: Movimentação efetuada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /movimentaestoque/:id:
  *    get:
  *      tags:
  *        - Movimenta Estoque
  *      summary: Consulta movimentação de estoque.
  *      description: Retornar uma movimentação de estoque específica.
  */  