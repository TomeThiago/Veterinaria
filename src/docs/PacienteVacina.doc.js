/**
  * @swagger
  * /paciente/:paciente_id/vacina:
  *    get:
  *      tags:
  *        - Paciente Vacina
  *      summary: Listar as vacinas do paciente
  *      description: Faz a listagem das vacinas do paciente cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: vacina_id
  *          type: string
  *          required: false
  *          description: Filtra pelo ID da vacina
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da vacina do paciente
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Paciente Vacina   
  *      summary: Incluir vacina do paciente
  *      description: Faz a inclusão da vacina no cadastro do paciente no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova vacina a ser cadastrado no paciente
  *            schema:
  *                type: object
  *                required:
  *                    - vacina_id
  *                properties:
  *                    vacina_id:
  *                      type: number
  *                    data_vacina:
  *                      type: string
  *      responses:
  *          200:
  *              description: Vacina cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /paciente/:paciente_id/vacina/:id:
  *    get:
  *      tags:
  *        - Paciente Vacina
  *      summary: Consulta vacina do paciente.
  *      description: Retornar uma vacina específica do cadastro de vacinas do paciente.
  *    put:
  *      tags:
  *        - Paciente Vacina   
  *      summary: Alterar vacina do paciente
  *      description: Faz a alteração da vacina do cadastrado de vacinas do paciente.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a vacina do paciente a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    vacina_id?:
  *                      type: number
  *                    data_vacina?:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Vacina do paciente alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Paciente Vacina   
  *      summary: Excluir vacina do paciente
  *      description: Faz a exclusão de um registro do cadastrado de vacinas do paciente.
  *      responses:
  *          200:
  *              description: Vacinas do paciente excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  