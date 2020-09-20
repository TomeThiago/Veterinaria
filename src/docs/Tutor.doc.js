/**
  * @swagger
  * /tutor:
  *    get:
  *      tags:
  *        - Tutor  
  *      summary: Listar os tutores
  *      description: Faz a listagem dos tutores cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do tutor
  *        - in: query
  *          name: sexo
  *          type: string
  *          required: false
  *          description: Filtra pelo sexo do tutor
  *        - in: query
  *          name: cidade
  *          type: string
  *          required: false
  *          description: Filtra pela cidade do tutor
  *        - in: query
  *          name: estado
  *          type: string
  *          required: false
  *          description: Filtra pelo estado do tutor
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do tutor
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Tutor
  *      summary: Incluir tutor
  *      description: Faz a inclusão do tutor no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo tutor a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                    - tipo_pessoa
  *                    - cpf_cnpj
  *                    - rg_ie
  *                    - nacionalidade
  *                    - sexo
  *                    - data_nascimento
  *                properties:
  *                    nome:
  *                      type: string
  *                    tipo_pessoa:
  *                      type: string
  *                    cpf_cnpj:
  *                      type: string
  *                    rg_ie:
  *                      type: string
  *                    nacionalidade:
  *                      type: string
  *                    sexo:
  *                      type: string
  *                    data_nascimento:
  *                      type: string
  *                    cep?:
  *                      type: string
  *                    endereco?:
  *                      type: string
  *                    numero?:
  *                      type: string
  *                    complemento?:
  *                      type: string
  *                    ponto_referencia?:
  *                      type: string
  *                    bairro?:
  *                      type: string
  *                    cidade?:
  *                      type: string
  *                    estado?:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Tutor cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /tutor/:id:
  *    get:
  *      tags:
  *        - Tutor
  *      summary: Consulta tutor.
  *      description: Retornar um tutor específico do cadastro de tutor.
  *    put:
  *      tags:
  *        - Tutor 
  *      summary: Alterar tutor
  *      description: Faz a alteração do registro do cadastrado de tutor.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o tutor a ser alterads.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome?:
  *                      type: string
  *                    tipo_pessoa?:
  *                      type: string
  *                    cpf_cnpj?:
  *                      type: string
  *                    rg_ie?:
  *                      type: string
  *                    nacionalidade?:
  *                      type: string
  *                    sexo?:
  *                      type: string
  *                    data_nascimento?:
  *                      type: date
  *                    cep?:
  *                      type: string
  *                    endereco?:
  *                      type: string
  *                    numero?:
  *                      type: string
  *                    complemento?:
  *                      type: string
  *                    ponto_referencia?:
  *                      type: string
  *                    bairro?:
  *                      type: string
  *                    cidade?:
  *                      type: string
  *                    estado?:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Tutor alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Tutor
  *      summary: Excluir tutor
  *      description: Faz a exclusão de um registro do cadastrado de tutor.
  *      responses:
  *          200:
  *              description: Tutor excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  