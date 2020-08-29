/**
  * @swagger
  * /cargo:
  *    get:
  *      tags:
  *        - Cargo   
  *      summary: Listar os cargos
  *      description: Faz a listagem dos cargos cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do cargo
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Cargo   
  *      summary: Incluir cargo
  *      description: Faz a inclusão do cargo no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo cargo a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    descricao:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cargo cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /cargo/:id:
  *    get:
  *      tags:
  *        - Cargo
  *      summary: Consulta cargo.
  *      description: Retornar um cargo específico do cadastro de cargo.
  *    put:
  *      tags:
  *        - Cargo   
  *      summary: Alterar cargo
  *      description: Faz a alteração do registro do cadastrado de cargo.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o cargo a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    descricao:
  *                      type: string
  *                    status:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cargo alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Cargo   
  *      summary: Excluir cargo
  *      description: Faz a exclusão de um registro do cadastrado de cargo.
  *      responses:
  *          200:
  *              description: Cargo excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  