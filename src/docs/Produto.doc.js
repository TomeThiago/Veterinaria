/**
  * @swagger
  * /produto:
  *    get:
  *      tags:
  *        - Produto   
  *      summary: Listar os produtos
  *      description: Faz a listagem dos produtos cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: descricao
  *          type: string
  *          required: false
  *          description: Filtra pela descricao do produto
  *        - in: query
  *          name: grupo_id
  *          type: int
  *          required: false
  *          description: Filtra pelo ID do grupo vinculado ao produto
  *        - in: query
  *          name: vacina
  *          type: string
  *          required: false
  *          description: Filtra se o produto é vacina ou não
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
  *        - Produto
  *      summary: Incluir produto
  *      description: Faz a inclusão da produto no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo produto a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - descricao
  *                    - preco_custo
  *                    - grupo_id
  *                    - vacina
  *                properties:
  *                    descricao:
  *                      type: string
  *                    preco_custo:
  *                      type: number
  *                    grupo_id:
  *                      type: integer
  *                    vacina:
  *                      type: string
  *      responses:
  *          200:
  *              description: Produto cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /produto/:id:
  *    get:
  *      tags:
  *        - Produto
  *      summary: Consulta produto.
  *      description: Retornar uma produto específico do cadastro de produto.
  *    put:
  *      tags:
  *        - Produto
  *      summary: Alterar produto
  *      description: Faz a alteração do registro do cadastrado de produto.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o produto a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    descricao?:
  *                      type: string
  *                    preco_custo?:
  *                      type: number
  *                    grupo_id?:
  *                      type: integer
  *                    vacina?:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Produto alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Produto  
  *      summary: Excluir produto
  *      description: Faz a exclusão de um registro do cadastrado de produto.
  *      responses:
  *          200:
  *              description: Produto excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  