/**
  * @swagger
  * /cor:
  *    get:
  *      tags:
  *        - Cor   
  *      summary: Listar as cores
  *      description: Faz a listagem das cores cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome da cor
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da cor
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Cor
  *      summary: Incluir cor
  *      description: Faz a inclusão da cor no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a nova cor a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cor cadastrada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /cor/:id:
  *    get:
  *      tags:
  *        - Cor
  *      summary: Consulta cor.
  *      description: Retornar uma cor específica do cadastro de cor.
  *    put:
  *      tags:
  *        - Cor   
  *      summary: Alterar cor
  *      description: Faz a alteração do registro do cadastrado de cor.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a cor a ser alterada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    status?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Cor alterada com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Cor   
  *      summary: Excluir cor
  *      description: Faz a exclusão de um registro do cadastrado de cor.
  *      responses:
  *          200:
  *              description: Cor excluida com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  