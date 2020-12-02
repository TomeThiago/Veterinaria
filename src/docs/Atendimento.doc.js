/**
  * @swagger
  * /atendimento:
  *    get:
  *      tags:
  *        - Atendimento 
  *      summary: Listar os atendimentos
  *      description: Faz a listagem dos atendimentos cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: paciente_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do paciente
  *        - in: query
  *          name: tutor_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do tutor
  *        - in: query
  *          name: tipo_atendimento_id
  *          type: number
  *          required: false
  *          description: Filtra pelo ID do tipo do atendimento
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
  *        - Atendimento   
  *      summary: Incluir atendimento
  *      description: Faz a inclusão do atendimento no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo atendimento a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - id
  *                properties:
  *                    anamnese?:
  *                      type: string
  *                    ultimos_tratamentos?:
  *                      type: string
  *                    paciente_id:
  *                      type: number  
  *                    tipotutor:
  *                      type: string
  *                    tutor_id:
  *                      type: number
  *                    tipo_atendimento_id:
  *                      type: number
  *                    inicio?:
  *                      type: string
  *                    termino?:
  *                      type: string
  *                    inicio_previsto:
  *                      type: string
  *                    tempo_previsto:
  *                      type: number
  *                    diagnostico?:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *                    peso_animal?:
  *                      type: number
  *      responses:
  *          200:
  *              description: Atendimento cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /atendimento/:id:
  *    get:
  *      tags:
  *        - Atendimento
  *      summary: Consulta atendimento.
  *      description: Retornar um atendimento específico do cadastro de atendimento.
  *    put:
  *      tags:
  *        - Atendimento
  *      summary: Alterar atendimento
  *      description: Faz a alteração do registro do cadastrado de atendimento.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o atendimento a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                properties:
  *                    anamnese?:
  *                      type: string
  *                    ultimos_tratamentos?:
  *                      type: string
  *                    paciente_id?:
  *                      type: number  
  *                    tipotutor?:
  *                      type: string
  *                    tutor_id?:
  *                      type: number
  *                    tipo_atendimento_id?:
  *                      type: number
  *                    inicio?:
  *                      type: string
  *                    termino?:
  *                      type: string
  *                    inicio_previsto?:
  *                      type: string
  *                    tempo_previsto?:
  *                      type: number
  *                    diagnostico?:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *                    peso_animal?:
  *                      type: number
  *                    status:
  *                      type: string
  *      responses:
  *          200:
  *              description: Atendimento alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Atendimento
  *      summary: Excluir atendimento
  *      description: Faz a exclusão de um registro do cadastrado de atendimento.
  *      responses:
  *          200:
  *              description: Atendimento excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  