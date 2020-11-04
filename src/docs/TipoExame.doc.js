/**
  * @swagger
  * /tipoexame:
  *    get:
  *      tags:
  *        - Tipo Exame
  *      summary: Listar os tipos de exames
  *      description: Faz a listagem dos tipos de exames cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do tipo do exame
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do tipo do exame
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Tipo Exame   
  *      summary: Incluir tipo exame
  *      description: Faz a inclusão do tipo exame no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo tipo exame a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Tipo Exame cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /tipoexame/:id:
  *    get:
  *      tags:
  *        - Tipo Exame
  *      summary: Consulta tipo exame.
  *      description: Retornar um tipo exame específico do cadastro de tipo exame.
  *    put:
  *      tags:
  *        - Tipo Exame   
  *      summary: Alterar tipo exame
  *      description: Faz a alteração do registro do cadastrado de tipo exame.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o tipo exame a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    status:
  *                      type: string
  *      responses:
  *          200:
  *              description: Tipo exame alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Tipo Exame   
  *      summary: Excluir tipo exame
  *      description: Faz a exclusão de um registro do cadastrado de tipo exame.
  *      responses:
  *          200:
  *              description: Tipo exame excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  