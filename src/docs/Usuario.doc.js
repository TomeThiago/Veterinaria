/**
  * @swagger
  * /usuario:
  *    get:
  *      tags:
  *        - Usuário   
  *      summary: Listar os usuários 
  *      description: Faz a listagem dos usuários cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do usuário
  *        - in: query
  *          name: cargo_id
  *          type: integer
  *          minimun: 1
  *          required: false
  *          description: Filtra pelo ID do cargo do usuário
  *        - in: query
  *          name: email
  *          type: string
  *          required: false
  *          description: Filtra pelo email do usuário
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Usuário   
  *      summary: Incluir usuário
  *      description: Faz a inclusão do usuário no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo usuário a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - email
  *                    - senha
  *                properties:
  *                    nome:
  *                      type: string
  *                    email:
  *                      type: string
  *                    senha:
  *                      type: string
  *                    cargo_id:
  *                      type: integer
  *                    administrador:
  *                      type: boolean
  *                      default: false 
  *                    status:
  *                      type: string
  *                      enum: [Ativo, Inativo]
  *      responses:
  *          200:
  *              description: Usuário cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /usuario/:id:
  *    get:
  *      tags:
  *        - Usuário
  *      summary: Retornar um usuário específico do cadastro de usuário
  *    put:
  *      tags:
  *        - Usuário   
  *      summary: Alterar usuário
  *      description: Faz a alteração do registro do cadastrado de usuário.
  *      parameters:
  *          - in: header 
  *            name: user_id
  *            required: true
  *            schema:
  *               type: string
  *      responses:
  *          200:
  *              description: Usuário alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Usuário   
  *      summary: Excluir usuário
  *      description: Faz a exclusão de um registro do cadastrado de usuário.
  *      responses:
  *          200:
  *              description: Usuário excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  