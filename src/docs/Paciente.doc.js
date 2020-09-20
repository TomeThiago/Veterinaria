/**
  * @swagger
  * /paciente:
  *    get:
  *      tags:
  *        - Paciente  
  *      summary: Listar os pacientes
  *      description: Faz a listagem dos pacientes cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do paciente
  *        - in: query
  *          name: tutor_id
  *          type: integer
  *          required: false
  *          description: Filtra pelo ID do tutor
  *        - in: query
  *          name: fazenda_id
  *          type: integer
  *          required: false
  *          description: Filtra pelo ID da fazenda
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do paciente
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Paciente
  *      summary: Incluir paciente
  *      description: Faz a inclusão do paciente no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo paciente a ser cadastrado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                    - sexo
  *                    - tutor_id
  *                    - especie_id
  *                    - raca_id
  *                    - pelagem_id
  *                    - cor_id
  *                    - fazenda_id
  *                    - porte
  *                    - castrado
  *                    - microchipado
  *                    - pedigree
  *                    - peso
  *                    - pratica_atividade_esportiva
  *                properties:
  *                    nome:
  *                      type: string
  *                    tutor_id:
  *                      type: integer
  *                    foto:
  *                      type: string
  *                    data_nascimento:
  *                      type: string
  *                    sexo:
  *                      type: string
  *                    especie_id:
  *                      type: integer
  *                    raca_id:
  *                      type: integer
  *                    pelagem_id:
  *                      type: string
  *                    cor_id:
  *                      type: string
  *                    porte:
  *                      type: string
  *                    castrado:
  *                      type: string
  *                    microchipado:
  *                      type: string
  *                    numero_chip:
  *                      type: string
  *                    peso:
  *                      type: number
  *                    fazenda_id:
  *                      type: integer
  *                    pratica_atividade_esportiva:
  *                      type: string
  *                    atividade_esportiva:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cor cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /paciente/:id:
  *    get:
  *      tags:
  *        - Paciente
  *      summary: Consulta paciente
  *      description: Retornar um paciente específico do cadastro de paciente.
  *    put:
  *      tags:
  *        - Paciente
  *      summary: Alterar paciente
  *      description: Faz a alteração do registro do cadastrado de paciente.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o paciente a ser alterado.
  *            schema:
  *                type: object
  *                properties:
  *                    nome?:
  *                      type: string
  *                    tutor_id?:
  *                      type: integer
  *                    foto?:
  *                      type: string
  *                    data_nascimento?:
  *                      type: string
  *                    sexo?:
  *                      type: string
  *                    especie_id?:
  *                      type: integer
  *                    raca_id?:
  *                      type: integer
  *                    pelagem_id?:
  *                      type: string
  *                    cor_id?:
  *                      type: string
  *                    porte?:
  *                      type: string
  *                    castrado?:
  *                      type: string
  *                    microchipado?:
  *                      type: string
  *                    numero_chip?:
  *                      type: string
  *                    peso?:
  *                      type: number
  *                    fazenda_id?:
  *                      type: integer
  *                    pratica_atividade_esportiva?:
  *                      type: string
  *                    atividade_esportiva?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Paciente alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Paciente
  *      summary: Excluir paciente
  *      description: Faz a exclusão de um registro do cadastrado de paciente.
  *      responses:
  *          200:
  *              description: Paciente excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  