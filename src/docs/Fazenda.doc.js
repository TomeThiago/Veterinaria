/**
  * @swagger
  * /fazenda:
  *    get:
  *      tags:
  *        - Fazenda   
  *      summary: Listar as fazendas
  *      description: Faz a listagem das fazendas cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da fazenda
  *        - in: cidade
  *          name: cidade
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da cidade
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da fazenda
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Fazenda
  *      summary: Incluir fazenda
  *      description: Faz a inclusão da fazenda no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova fazenda a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    telefone:
  *                      type: string
  *                    email:
  *                      type: string
  *                    cep:
  *                      type: string
  *                    endereco:
  *                      type: string
  *                    numero:
  *                      type: string
  *                    complemento:
  *                      type: string
  *                    ponto_referencia:
  *                      type: string
  *                    bairro:
  *                      type: string
  *                    cidade:
  *                      type: string
  *                    estado:
  *                      type: string
  *      responses:
  *          200:
  *              description: Fazenda cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /fazenda/:id:
  *    get:
  *      tags:
  *        - Fazenda
  *      summary: Consulta fazenda.
  *      description: Retornar uma fazenda específica do cadastro de fazenda.
  *    put:
  *      tags:
  *        - Fazenda   
  *      summary: Alterar fazenda
  *      description: Faz a alteração do registro do cadastrado de fazenda.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a fazenda a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome?:
  *                      type: string
  *                    telefone?:
  *                      type: string
  *                    email?:
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
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Fazenda alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Fazenda 
  *      summary: Excluir fazenda
  *      description: Faz a exclusão de um registro do cadastrado de fazenda.
  *      responses:
  *          200:
  *              description: Fazenda excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  