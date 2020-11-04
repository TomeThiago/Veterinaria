/**
  * @swagger
  * /paciente/:paciente_id/exame/:pacienteexame_id/anexo:
  *    get:
  *      tags:
  *        - Anexo Exame   
  *      summary: Listar os anexos exame do paciente
  *      description: Faz a listagem dos anexos do exame do paciente cadastrados no sistema.
  *      parameters:
  *
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Anexo Exame
  *      summary: Incluir o anexo do exame do paciente
  *      description: Faz a inclusão do anexo do exame do paciente no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a novo anexo do exame do paciente a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    anexo:
  *                      type: number
  *      responses:
  *          200:
  *              description: Anexo do exame do paciente cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /paciente/:paciente_id/exame/:pacienteexame_id/anexo/:id:
  *    get:
  *      tags:
  *        - Anexo Exame
  *      summary: Consulta anexo do exame do paciente.
  *      description: Retornar um anexo do exame específico do paciente do cadastro de anexos.
  *    delete:
  *      tags:
  *        - Anexo Exame  
  *      summary: Excluir anexo do exame
  *      description: Faz a exclusão de um anexo do cadastrado de anexos do exames do paciente.
  *      responses:
  *          200:
  *              description: Anexo do exame excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  