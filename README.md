# :beer: backend-api-beerpunk

API Rest para salvar dados do usuario projeto beer punk.


## :globe_with_meridians: Deploy do projeto

-   Você pode fazer requests para o projeto já em produção, usando esta documentação [aqui](https://documenter.getpostman.com/view/25678761/2s9YJbzMuq), onde lista todos os endpoints.
-   Como ambiente de produção, foi utilizado a plataforma Render


## :exclamation: Possíveis melhorias

-   Configurar Docker para agilizar deploy
-   Fazer integração da API Beer Punk pela api


## :wrench: Rodando o projeto

-   Clone este repositório.
-   Instale todas as dependências usando o comando `npm i`.
-   Crie o banco de dados postgre
-   Configure as variaveis de ambiente de acordo com o arquivo `src/config/databaseConfig.ts`
-   Rode o projeto com comando `npm run start:dev`


### Scripts

-   `npm start:dev` - Inicia o servidor em modo de desenvolvimento
-   `npm run lint` - Identa e padroniza o projeto com base nas configurações do eslint e prettier
-   `npm run test` - Executa os testes de integração utilizando jest


## :fire: Tecnologias usadas

-   Express
-   NodeJS
-   Jest
-   Supertest
-   Bcrypt
-   TypeORM
