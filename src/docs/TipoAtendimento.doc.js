/**
  * @swagger
  * /tipoatendimento:
  *    get:
  *      tags:
  *        - Tipo Atendimento
  *      summary: Listar os tipos de atendimento
  *      description: Faz a listagem dos tipos de atendimento cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do tipo do atendimento
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do tipo do atendimento
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Tipo Atendimento   
  *      summary: Incluir tipo atendimento
  *      description: Faz a inclusão do tipo atendimento no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo tipo atendimento a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    tempo_estimado:
  *                      type: number
  *      responses:
  *          200:
  *              description: Tipo Atendimento cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /tipoatendimento/:id:
  *    get:
  *      tags:
  *        - Tipo Atendimento
  *      summary: Consulta tipo atentimento.
  *      description: Retornar um tipo atendimento específico do cadastro de tipo atendimento.
  *    put:
  *      tags:
  *        - Tipo Atendimento   
  *      summary: Alterar tipo atendimento
  *      description: Faz a alteração do registro do cadastrado de tipo atendimento.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o tipo atendimento a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome?:
  *                      type: string
  *                    tempo_estimado?:
  *                      type: number
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Tipo atendimento alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Tipo Atendimento   
  *      summary: Excluir tipo atendimento
  *      description: Faz a exclusão de um registro do cadastrado de tipo atendimento.
  *      responses:
  *          200:
  *              description: Tipo atendimento excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  