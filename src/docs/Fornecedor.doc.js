/**
  * @swagger
  * /fornecedor:
  *    get:
  *      tags:
  *        - Fornecedor   
  *      summary: Listar os fornecedores
  *      description: Faz a listagem dos fornecedores cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do fornecedor
  *        - in: query
  *          name: cpf_cnpj
  *          type: string
  *          required: false
  *          description: Filtra pela CPF ou CNPJ do fornecedor
  *        - in: query
  *          name: rg_ie
  *          type: string
  *          required: false
  *          description: Filtra pela RG ou Inscrição Estadual do fornecedor
  *        - in: query
  *          name: cidade
  *          type: string
  *          required: false
  *          description: Filtra pela cidade do fornecedor
  *        - in: query
  *          name: estado
  *          type: string
  *          required: false
  *          description: Filtra pelo estado do fornecedor
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do fornecedor
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Fornecedor   
  *      summary: Incluir fornecedor
  *      description: Faz a inclusão do fornecedor no sistema.
  *      pafornecedor:
  *          - in: body
  *            description: Objeto JSON que representa o novo fornecedor a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                    - tipo_pessoa
  *                    - cpf_cnpj
  *                    - rg_ie
  *                properties:
  *                    nome:
  *                      type: string
  *                    tipo_pessoa:
  *                      type: string
  *                    cpf_cnpj:
  *                      type: string
  *                    rg_ie:
  *                      type: string
  *                    cep?:
  *                      type: string
  *                    endereco?:
  *                      type: string
  *                    numero?:
  *                      type: integer
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
  *                    contribuinte?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Fornecedor cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /fornecedor/:id:
  *    get:
  *      tags:
  *        - Fornecedor
  *      summary: Consultafornecedor.
  *      description: Retornar um fornecedor específico do cadastro de carfornecedor.
  *    put:
  *      tags:
  *        - Fornecedor   
  *      summary: Alterar fornecedor
  *      description: Faz a alteração do registro do cadastrado de cafornecedor.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa Fornecedor a ser alterado.
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
  *                    cep?:
  *                      type: string
  *                    endereco?:
  *                      type: string
  *                    numero?:
  *                      type: integer
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
  *                    contribuinte?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Fornecedor alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Fornecedor   
  *      summary: Excluir fornecedor
  *      description: Faz a exclusão de um registro do cadastrado de fornecedor.
  *      responses:
  *          200:
  *              description: Fornecedor excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  