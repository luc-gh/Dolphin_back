## Changelog

Aqui ocorrerá a listagem de mudanças no projeto e explicações ou considerações sobre ele.

### Listagem de alterações

1. Criação do projeto
2. Adição da licença
3. Correção de nome
4. Organização de diretórios
5. Criação dos modelos de usuário e nota
6. Início do processo de documentação
7. Adição de variáveis de ambiente, não incluídas no repositório remoto
8. Configuração de conexão com banco de dados, com as variáveis de ambiente
9. Falha na conexão (interna), seguida de correção e sucesso na conexão
10. Adição de documentação básica, externa à oficial
11. Alteração no padrão de commits 
12. Instalação do TypeScript como uma dependência de desenvolvimento
13. Instalação do TS com o comando: ```npm install --save-dev typescript```
14. Criação de um arquivo de configuração do TS com o comando: ```npx tsc --init```
15. Instalação de definições de tipo para Axios, Mongoose e Express 
16. Substituição de todos os arquivos JavaScript por arquivos TypeScript
17. Reformatação de projeto e adição de scripts de execução no arquivo [```package.json```](package.json)
18. Alteração no formato de execução com o TS: 
    > Uso do comando ```npm run dev``` só foi permitido devido ao uso do script (no arquivo [```package.json```](package.json)):
    ```
    (...)
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/app.ts",
    "dev": "tsx watch src/app.ts",
    "build": "tsc"
    }, 
    "type": "module",
    (...)
    ``` 
    > 
    > Além disso, a execução isolada de arquivos TS é feita com o comando ```tsx <nome-do-arquivo>.ts```. 
19. Mudança em nomes de variáveis de ambiente
20. Instalação do pacote cors (para recuperação de dados de origens diferentes)
21. Instalação do pacote ```express-session``` (permite o armazenamento e recuperação de dados associados a um usuário durante sua interação com a aplicação)
22. Instalação do pacote ```body-parser``` (utilizado para analisar dados no corpo das solicitações, permitindo acesso a eles)
23. Instalação dos pacotes ```ejs```, ```url``` e ```path```, para testes
24. Uso do pacote chamado ```http-proxy-middleware``` para configurar um proxy no servidor Node.js

### Listagem de fontes ou referências de aprendizado

> **Artigos, vídeos e outras fontes:**
> - [How to Deploy MERN Application on Vercel? HOST Full-Stack MERN App to Vercel for Free | YouTube](https://www.youtube.com/watch?v=Cfi0mymfKiA&t=157s)
> - [How to Use Environment Files (.env) in Node.js - Tutorial (dotenv) | YouTube](https://www.youtube.com/watch?v=hZUNMYU4Kzo) 
> - [How to Create a Express/Node + React Project | Node Backend + React Frontend | YouTube](https://www.youtube.com/watch?v=w3vs4a03y3I&t=523s)
> - [Express cors middleware | Express](https://expressjs.com/en/resources/middleware/cors.html)
> - [How ro fix __dirname not defined ES module | Flavio Copes](https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/)
> - [SISTEMA DE LOGIN COM NODE JS | TUTORIAL DE JAVASCRIPT | YouTube](https://www.youtube.com/watch?v=rXWa9jtHu7g&t=583s)

> **Plataformas para pesquisa:**
> - Google
> - ChatGPT
> - Github

> **Conceitos ou princípios assumidos**
> 
> - Arquivos .env devem ser colocados na raíz de um projeto Node
> - O novo padrão de commits é o presente no repositório [iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits).
> - O TS pode ser compilado em JS com o comando: ```npx tsc```
> - 