/**
  * @swagger
  * /estoque:
  *    get:
  *      tags:
  *        - Estoque   
  *      summary: Listar os estoques
  *      description: Faz a listagem das cores cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: produto_id
  *          type: integer
  *          required: false
  *          description: Filtra pelo ID do produto
  *        - in: query
  *          name: cfop_id
  *          type: string
  *          required: false
  *          description: Filtra pelo cfop do estoque
  *        - in: query
  *          name: forncedor_id
  *          type: integer
  *          required: false
  *          description: Filtra pelo ID do fornecedor do estoque
  *        - in: query
  *          name: validade
  *          type: string
  *          required: false
  *          description: Filtra pela validade do estoque
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da cor
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Estoque
  *      summary: Incluir estoque
  *      description: Faz a inclusão da estoque no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa um novo estoque a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - produto_id
  *                    - cfop_id
  *                    - fornecedor_id
  *                properties:
  *                    produto_id:
  *                      type: integer
  *                    cfop_id:
  *                      type: integer
  *                    quantidade:
  *                      type: integer
  *                    fornecedor_id:
  *                      type: integer
  *                    serie_nota?:
  *                      type: integer
  *                    numero_nota?:
  *                      type: integer
  *                    lote?:
  *                      type: string
  *                    validade?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Estoque cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /estoque/:id:
  *    get:
  *      tags:
  *        - Estoque
  *      summary: Consulta Estoque.
  *      description: Retornar um estoque específico do cadastro de estoque.
  *    put:
  *      tags:
  *        - Estoque   
  *      summary: Alterar estoque
  *      description: Faz a alteração do registro do cadastrado de estoque.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o estoque a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    produto_id?:
  *                      type: integer
  *                    cfop_id?:
  *                      type: integer
  *                    fornecedor_id?:
  *                      type: integer
  *                    serie_nota?:
  *                      type: integer
  *                    numero_nota?:
  *                      type: integer
  *                    lote?:
  *                      type: string
  *                    validade?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Estoque alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Estoque   
  *      summary: Excluir estoque
  *      description: Faz a exclusão de um registro do cadastrado de estoque.
  *      responses:
  *          200:
  *              description: Estoque excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  