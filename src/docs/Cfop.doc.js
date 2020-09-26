/**
  * @swagger
  * /cfop:
  *    get:
  *      tags:
  *        - CFOP 
  *      summary: Listar os cfop
  *      description: Faz a listagem dos cfop cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: id
  *          type: string
  *          required: false
  *          description: Filtra pelo ID do cfop
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do cfop
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - CFOP   
  *      summary: Incluir cfop
  *      description: Faz a inclusão do cfop no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo cfop a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - id
  *                properties:
  *                    id:
  *                      type: string
  *                    descricao:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cfop cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /cfop/:id:
  *    get:
  *      tags:
  *        - CFOP
  *      summary: Consulta cfop.
  *      description: Retornar um cfop específico do cadastro de cfop.
  *    put:
  *      tags:
  *        - CFOP
  *      summary: Alterar cfop
  *      description: Faz a alteração do registro do cadastrado de cfop.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o cfop a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    id?:
  *                      type: string
  *                    descricao?:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cfop alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - CFOP
  *      summary: Excluir cfop
  *      description: Faz a exclusão de um registro do cadastrado de cfop.
  *      responses:
  *          200:
  *              description: Cfop excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  