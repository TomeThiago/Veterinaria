/**
  * @swagger
  * /atendimento/:atendimento_id/produtos:
  *    get:
  *      tags:
  *        - Atendimento Produto 
  *      summary: Listar os produtos do atendimento
  *      description: Faz a listagem dos produtos utilizados no atendimento cadastrado no sistema.
  *      parameters:
  *        - in: query
  *          name: produto_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do produto
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do produto
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Atendimento Produto   
  *      summary: Incluir produto no atendimento
  *      description: Faz a inclusão do produto no atendimento no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo produto no atendimento a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - id
  *                properties:
  *                    produto_id:
  *                      type: number
  *                    quantidade:
  *                      type: number
  *      responses:
  *          200:
  *              description: Produto do atendimento cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /atendimento/:atendimento_id/produtos/:id:
  *    get:
  *      tags:
  *        - Atendimento Produto
  *      summary: Consulta produto do atendimento.
  *      description: Retornar um produto do atendimento específico do cadastro de produtos atendimentos.
  *    put:
  *      tags:
  *        - Atendimento Produto
  *      summary: Alterar produto do atendimento
  *      description: Faz a alteração do registro do cadastrado de produtos do atendimento.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o produto a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    produto_id?:
  *                      type: number
  *                    quantidade?:
  *                      type: number
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Produto do atendimento alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Atendimento Produto
  *      summary: Excluir produto do atendimento
  *      description: Faz a exclusão de um registro do cadastrado de atendimento.
  *      responses:
  *          200:
  *              description: Produto do atendimento excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  