/**
  * @swagger
  * /grupo:
  *    get:
  *      tags:
  *        - Grupo  
  *      summary: Listar os grupos
  *      description: Faz a listagem dos grupos cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do grupo
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do grupo
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Grupo
  *      summary: Incluir grupo
  *      description: Faz a inclusão do grupo no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo grupo a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Grupo cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /grupo/:id:
  *    get:
  *      tags:
  *        - Grupo
  *      summary: Consulta grupo.
  *      description: Retornar um grupo específico do cadastro de grupo.
  *    put:
  *      tags:
  *        - Grupo   
  *      summary: Alterar grupo
  *      description: Faz a alteração do registro do cadastrado de grupo.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o grupo a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome?:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Grupo alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Grupo
  *      summary: Excluir grupo
  *      description: Faz a exclusão de um registro do cadastrado de grupo.
  *      responses:
  *          200:
  *              description: Grupo excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  