/**
  * @swagger
  * /atendimento/:atendimentoproduto_id/estoque:
  *    get:
  *      tags:
  *        - Atendimento Estoque
  *      summary: Listar os estoques do atendimento
  *      description: Faz a listagem dos estoques utilizados no atendimento cadastrado no sistema.
  *      parameters:
  *        - in: query
  *          name: estoque_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do estoque
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do estoque do atendimento
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Atendimento Estoque  
  *      summary: Incluir estoque no atendimento
  *      description: Faz a inclusão do estoque no atendimento no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo estoque no atendimento a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - id
  *                properties:
  *                    estoque_id:
  *                      type: number
  *      responses:
  *          200:
  *              description: Produto do atendimento cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /atendimento/:atendimentoproduto_id/estoque/:id:
  *    get:
  *      tags:
  *        - Atendimento Estoque
  *      summary: Consulta estoque do atendimento.
  *      description: Retornar um estoque do atendimento específico do cadastro de estoque atendimentos.
  *    put:
  *      tags:
  *        - Atendimento Estoque
  *      summary: Alterar estoque do atendimento
  *      description: Faz a alteração do registro do cadastrado de estoques do atendimento.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o produto a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    estoque_id?:
  *                      type: number
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Estoque do atendimento alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Atendimento Estoque
  *      summary: Excluir estoque do atendimento
  *      description: Faz a exclusão de um registro do cadastrado de atendimento.
  *      responses:
  *          200:
  *              description: Estoque do atendimento excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  