/**
  * @swagger
  * /paciente/:paciente_id/exame:
  *    get:
  *      tags:
  *        - Paciente Exame   
  *      summary: Listar os exames do paciente
  *      description: Faz a listagem dos exames do paciente cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: tipoexame_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do tipo do exame
  *        - in: query
  *          name: exame_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do exame
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do exame do paciente
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Paciente Exame
  *      summary: Incluir exame do paciente
  *      description: Faz a inclusão do exame do paciente no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a novo exame do paciente a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    tipoexame_id:
  *                      type: number
  *                    exame_id:
  *                      type: number
  *                    realizado:
  *                      type: string
  *                    realizado_interno:
  *                      type: string
  *                    diagnostico:
  *                      type: string
  *                    observacao:
  *                      type: string
  *      responses:
  *          200:
  *              description: Exame do paciente cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /paciente/:paciente_id/exame/:id:
  *    get:
  *      tags:
  *        - Paciente Exame
  *      summary: Consulta exame do paciente.
  *      description: Retornar um exame específico do paciente do cadastro de exame.
  *    put:
  *      tags:
  *        - Paciente Exame   
  *      summary: Alterar exame do paciente
  *      description: Faz a alteração do registro do cadastrado de exame do paciente.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o exame do paciente a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    tipoexame_id?:
  *                      type: number
  *                    exame_id?:
  *                      type: number
  *                    realizado?:
  *                      type: string
  *                    realizado_interno?:
  *                      type: string
  *                    diagnostico?:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Exame do paciente alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Paciente Exame   
  *      summary: Excluir exame
  *      description: Faz a exclusão de um registro do cadastrado de exames do paciente.
  *      responses:
  *          200:
  *              description: Exame excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  