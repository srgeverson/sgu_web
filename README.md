# SGU Web - Sistema de Gerenciamento de Usuários
Esta aplicação irá gerir os usuários cadastrados.

### Pré-requisitos

💡Para que esta aplicação depende da [api_node](https://github.com/srgeverson/api_node) rodando, então siga os passos contidos no README.

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/)). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

💡O arquivo ".ENV" que aqui é orientado a ser criado é para ambiente de teste e utilização no docker, caso seja criado um ambiente manualmete crie as variáveis normalmente com os comando <b>export no linux</b> e <b>set para windows</b> com <b>terminal ou cmd</b> respectivamente.

### 🛠️ Comando executado durante a construção da aplicação

```bash
# Instalar o react e o next [https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started).
$ npx create-react-app sac-web

# Instala o gerenciador de rotas [Router DOM](https://v5.reactrouter.com/web/guides/quick-start).
$ npm install react-router-dom --save

# Instala o gerenciador de histórico de navegação.
$ npm install history --save

# Instalar o Bootstrap utilizando reactstrap: https://reactstrap.github.io/
$ npm install bootstrap --save
$ npm install reactstrap --save

# Redux compartilha estados entre componentes
$ npm install redux react-redux redux-thunk --save

# Realizar chamada para API
$ npm install axios --save

#
$ npm install @mui/material @emotion/react @emotion/styled

# Instalar a biblioteca de icones
$ npm install @mui/icons-material --save

# Manipular datas
$ npm install date-fns --save

# Validar o e-mail
$ npm install validator --save

# Carregando variáveis de ambiente de um arquivo .env para process.env.
$ npm install dotenv --save

# Criando o arquivo que armazenará as variáveis necessárias para a aplicação executar.
$ touch .ENV

# Crie as variáveis de ambiente iniciais como mostra a seguir:
$ PUBLIC_URL='URL da aplicação em produção.'
$ PORT='Porta da aplicação em produção.'
$ SERVER_URL='URL da API.'
$ SERVER_PORT='Porta da API.'

# Gráficos do googgle
$ npm install react-google-charts --save

# Autenticação Base64
$ npm install --save base-64

# Adicione as credenciais do grant_type password do do authorization server no arquivo .env
$ CLIENT_ID='Nome de usuário para a autenticação da API.'
$ CLIENT_SECRET='Senha de usuário para a autenticação da API.'

# Deploy GitHub Pages
$ npm install --save-dev gh-pages

# Rodar o projeto
$ npm start

```

#### 🧭 Executando a aplicação
```bash

# Clone este repositório
$ git clone https://github.com/srgeverson/sgu_web.git

# Acesse a pasta do projeto no terminal/cmd
$ cd sgu_web/

# Instale as dependências
$ npm install

# Execute a aplicação web
$ npm start

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autores

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## 📌 Versão ainda em desenvolvimento

É utilizado o [Github](https://github.com/) para controle de versão.