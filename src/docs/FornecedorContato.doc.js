/**
  * @swagger
  * /fornecedor/:fornecedor_id/contatofornecedor:
  *    get:
  *      tags:
  *        - Fornecedor  
  *      summary: Listar os contatos do fornecedor
  *      description: Faz a listagem dos contatos do fornecedor cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: tipo
  *          type: string
  *          required: false
  *          description: Filtra pelo tipo do contato
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do contato
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Fornecedor
  *      summary: Incluir contato para o fornecedor
  *      description: Faz a inclusão do contato para o fornecedor no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo contato do fornecedor a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - tipo
  *                    - contato
  *                properties:
  *                    tipo:
  *                      type: string
  *                    contato:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Contato cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /fornecedor/:fornecedor_id/contatofornecedor/:id:
  *    get:
  *      tags:
  *        - Fornecedor
  *      summary: Consulta contato específico do fornecedor.
  *      description: Retornar um contato específico do cadastro de contato do fornecedor.
  *    put:
  *      tags:
  *        - Fornecedor
  *      summary: Alterar contato do fornecedor
  *      description: Faz a alteração do registro do cadastrado de fornecedor.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o contato do fornecedor a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    tipo?:
  *                      type: string
  *                    contato?:
  *                      type: string 
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Contato alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Fornecedor
  *      summary: Excluir o contato do fornecedor
  *      description: Faz a exclusão de um registro do cadastrado de contato do fornecedor.
  *      responses:
  *          200:
  *              description: Fornecedor excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  