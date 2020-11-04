/**
  * @swagger
  * /tutor/:tutor_id/contatotutor:
  *    get:
  *      tags:
  *        - Tutor  
  *      summary: Listar os contatos do tutor
  *      description: Faz a listagem dos contatos do tutor cadastrados no sistema.
  *      parameters:
  *        - in: query
  *          name: tipo
  *          type: string
  *          required: false
  *          description: Filtra pelo tipo do contato
  *        - in: query
  *          name: status
  *          type: string
  *          required: false
  *          description: Filtra pela situação do contato
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
  *      summary: Incluir contato para o tutor
  *      description: Faz a inclusão do contato para o tutor no sistema.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o novo contato do tutor a ser cadastrado
  *            schema:
  *                type: object
  *                required:
  *                    - tipo
  *                    - contato
  *                properties:
  *                    tipo:
  *                      type: string
  *                    contato:
  *                      type: string
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Contato cadastrado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor  
  *
  * /tutor/:tutor_id/contatotutor/:id:
  *    get:
  *      tags:
  *        - Tutor
  *      summary: Consulta contato específico do tutor.
  *      description: Retornar um contato específico do cadastro de contato do tutor.
  *    put:
  *      tags:
  *        - Tutor 
  *      summary: Alterar contato do tutor
  *      description: Faz a alteração do registro do cadastrado de tutor.
  *      parameters:
  *          - in: body
  *            description: Objeto JSON que representa o contato do tutor a ser alterado.
  *            schema:
  *                type: object
  *                required:
  *                    - nome
  *                properties:
  *                    tipo?:
  *                      type: string
  *                    contato?:
  *                      type: string 
  *                    observacao?:
  *                      type: string
  *      responses:
  *          200:
  *              description: Contato alterado com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  *    delete:
  *      tags:
  *        - Tutor
  *      summary: Excluir o contato do tutor
  *      description: Faz a exclusão de um registro do cadastrado de contato do tutor.
  *      responses:
  *          200:
  *              description: Tutor excluido com sucesso 
  *          401:
  *              description: Token inválido
  *          500:
  *              description: Erro no servidor
  */  