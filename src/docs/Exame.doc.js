/**
  * @swagger
  * /exame:
  *    get:
  *      tags:
  *        - Exame   
  *      summary: Listar os exames
  *      description: Faz a listagem dos exames cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do exame
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da exame
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Exame
  *      summary: Incluir exame
  *      description: Faz a inclusão da exame no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a novo exame a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    tipoexame_id:
  *                      type: number
  *      responses:
  *          200:
  *              description: Exame cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /exame/:id:
  *    get:
  *      tags:
  *        - Exame
  *      summary: Consulta exame.
  *      description: Retornar um exame específico do cadastro de exame.
  *    put:
  *      tags:
  *        - Exame   
  *      summary: Alterar exame
  *      description: Faz a alteração do registro do cadastrado de exame.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o exame a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome?:
  *                      type: string
  *                    tipoexame_id?:
  *                      type: number
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Exame alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Exame   
  *      summary: Excluir exame
  *      description: Faz a exclusão de um registro do cadastrado de exame.
  *      responses:
  *          200:
  *              description: Exame excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  