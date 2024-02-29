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
18. Alteração no formato de execução com o TS [1]
19. Mudança em nomes de variáveis de ambiente
20. Instalação do pacote cors (para recuperação de dados de origens diferentes)
21. Instalação do pacote ```express-session``` (permite o armazenamento e recuperação de dados associados a um usuário durante sua interação com a aplicação)
22. Instalação do pacote ```body-parser``` (utilizado para analisar dados no corpo das solicitações, permitindo acesso a eles)
23. Instalação dos pacotes ```ejs```, ```url``` e ```path```, para testes
24. Uso do pacote chamado ```http-proxy-middleware``` para configurar um proxy no servidor Node.js
25. Depois dos testes, reformatação completa
26. Realização de testes no Insomnia
27. No arquivo [```databaseConnection```](src/config/databaseConnection.ts), criação de função de conexão, que retorna um cliente do MongoDB e um Banco de dados
28. Criação de rota para adição de novo usuário no arquivo [```loginRoute```](src/services/loginService.ts)
29. Adição de método para adicionar usuário ao banco de dados definido na conexão no arquivo [```loginController```](src/routes/loginRoute.ts)
30. Correção na estrutura MVC
31. Adição dos diretórios [api](api) e [public](public), além do arquivo [vercel.json](vercel.json), para o deploy
32. Teste de Deploy [2]
33. O Deploy falhou e foi excluído com o comando `vercel rm dolphin`
34. Mudança na estrutura e no provedor para o deploy: [Render](https://render.com/)
35. 

### Listagem de fontes ou referências de aprendizado

> **Artigos, vídeos e outras fontes:**
> - [How to Deploy MERN Application on Vercel? HOST Full-Stack MERN App to Vercel for Free | YouTube](https://www.youtube.com/watch?v=Cfi0mymfKiA&t=157s)
> - [Using Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel)
> - [How to Use Environment Files (.env) in Node.js - Tutorial (dotenv) | YouTube](https://www.youtube.com/watch?v=hZUNMYU4Kzo) 
> - [How to Create a Express/Node + React Project | Node Backend + React Frontend | YouTube](https://www.youtube.com/watch?v=w3vs4a03y3I&t=523s)
> - [Express cors middleware | Express](https://expressjs.com/en/resources/middleware/cors.html)
> - [How ro fix __dirname not defined ES module | Flavio Copes](https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/)
> - [SISTEMA DE LOGIN COM NODE JS | TUTORIAL DE JAVASCRIPT | YouTube](https://www.youtube.com/watch?v=rXWa9jtHu7g&t=583s)
> - [Deploy an Express API to Vercel | Coding Garden](https://www.youtube.com/watch?v=B-T69_VP2Ls&t=290s)

> **Plataformas para pesquisa:**
> - Google
> - ChatGPT
> - Github

**Conceitos ou princípios assumidos**
 
- Arquivos .env devem ser colocados na raíz de um projeto Node
- O novo padrão de commits é o presente no repositório [iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits).
- O TS pode ser compilado em JS com o comando: ```npx tsc```
- Uso do Render para o deploy
- [1]:

    Uso do comando ```npm run dev``` só foi permitido devido ao uso do script (no arquivo [```package.json```](package.json)):
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

    Além disso, a execução isolada de arquivos TS é feita com o comando ```tsx <nome-do-arquivo>.ts```. 
- [2]:

    Para acessar a Vercel, usa-se o comando `vercel login --github`, apar fazer o login via Github.
    Após isso, basta fazer a autenticação externa e retornar.
    
    No diretório [api](api), executa-se o comando `vercel --prod`, para iniciar o deploy. 
    Seguem-se a seguir as respostas ao questionário:
    ```
    Vercel CLI 33.5.2
    ? Set up and deploy “~\Documents\Programacao\Projeto\Dolphin_back\api”? [Y/n] y
    ? Which scope do you want to deploy to? <user projects>
    ? Link to existing project? [y/N] n
    ? What’s your project’s name? dolphin
    ? In which directory is your code located? ./
    Local settings detected in vercel.json:
    No framework detected. Default Project Settings:
    - Build Command: `npm run vercel-build` or `npm run build`
    - Development Command: None
    - Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
    - Output Directory: `public` if it exists, or `.`
      ? Want to modify these settings? [y/N] n
      🔗  Linked to lucs-projects-<code>/dolphin (created .vercel and added it to .gitignore)
      🔍  Inspect: https://vercel.com/<vercel-code> [3s]
      ✅  Production: https://dolphin-<code>.vercel.app [3s]
    ```
- Para realizar deploys no Render, basta acessar o [dashboard](https://dashboard.render.com/) na conta do Github onde o repositório
  está presente e clicar em `New +`. Basta escolher o tipo de projeto e adicionar suas especificações de deployment.
- Para este projeto, foi escolhida a opção **Web Service**, com carregamento e implantação a partir de um repositório Git,
  com as seguintes definições:
  - Name: Dolphin
  - Region: Frankfurt
  - Branch: develop (alterado posteriormente)
  - Root Directory: `/`
  - Runtime: Node
  - Build command: `yarn install && yarn build`
  - Start command: `node dist/app.js`
  - Instance Type: Free
  - Environment Variables: Added from the local .env file
  Após isso, basta clicar em "Create Web Service".