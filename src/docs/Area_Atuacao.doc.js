/**
  * @swagger
  * /areaatuacao:
  *    get:
  *      tags:
  *        - Área Atuação   
  *      summary: Listar as áreas de atuação.
  *      description: Faz a listagem das áreas de atuação cadastradas no sistema.
  *      parameters:
  *        - in: query
  *          name: nome
  *          type: string
  *          required: false
  *          description: Filtra pelo nome do área de atuação
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação da área de atuação
  *      responses:
  *          200:
  *              description: Resposta Bem Sucedida 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    post:
  *      tags:
  *        - Área Atuação   
  *      summary: Incluir área de atuação.
  *      description: Faz a inclusão da área de atuação no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa uma nova área de atuação a ser cadastrada.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *      responses:
  *          200:
  *              description: Área de atuação cadastrada com sucesso
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /areaatuacao/:id:
  *    get:
  *      tags:
  *        - Área Atuação
  *      summary: Consulta área de atuação.
  *      description: Retornar uma área de atuação específica do cadastro de área de atuação.
  *    put:
  *      tags:
  *        - Área Atuação   
  *      summary: Alterar cargo
  *      description: Faz a alteração do registro do cadastrado de área de atuação.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa a área de atuação a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    nome:
  *                      type: string
  *                    status:
  *                      type: string
  *      responses:
  *          200:
  *              description: Área de atuação alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Área Atuação   
  *      summary: Excluir área de atuação
  *      description: Faz a exclusão de um registro do cadastrado de área de atuação.
  *      responses:
  *          200:
  *              description: Área de atuação excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  