# API-PORTFÓLIO
API criada para o portfólio de projetos, com o intuito de mostrar as habilidades e conhecimentos adquiridos ao longo do tempo.

## Tecnologias utilizadas

**Back-end**
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

**Front-end**
- React
- React Router
- Axios
- Styled Components

**Ferramentas**
- Visual Studio Code
- Insomnia
- Git e GitHub
- Heroku
- Netlify

## Funcionalidades

Back-end:
- [x] Cadastro de usuários
- [x] Autenticação de usuários
- [x] Atualização de dados do usuário
- [ ] Adicionar, editar e excluir projetos (apenas administrador)
- [ ] Adicionar, editar e excluir comentários (apenas usuário)
- [ ] Curtir e descurtir projetos (apenas usuário)
- [ ] Curtir e descurtir comentários (apenas usuário)
- [ ] Listar projetos
- [ ] Listar comentários de um projeto

Front-end:
- [ ] Home page (Hero, sobre, tecnologias, contato)
- [ ] Página de projetos (listagem de projetos)
- [ ] Página de projeto (detalhes do projeto)
- [ ] Página de login
- [ ] Página de cadastro
- [ ] Página de perfil (editar dados)
- [ ] Página de administração (adicionar, editar e excluir projetos)

## Observações

Por se tratar de um projeto pessoal, não terá mais de um administrador, apenas um usuário administrador que terá permissão para adicionar, editar e excluir projetos.

## Autenticação

Para autenticação de usuários, será utilizado o JWT (JSON Web Token), onde o usuário irá se cadastrar e fazer login para obter um token de acesso. Este token será utilizado para acessar as rotas protegidas da aplicação.

## Permissões

- Administrador: poderá adicionar, editar e excluir projetos
- Usuário: poderá adicionar, editar e excluir comentários, curtir e descurtir projetos e comentários
- Visitante: poderá apenas visualizar os projetos e os comentários

## Rotas
### Usuários
- Registrar: POST /api/users/register
- Login: POST /api/users/login
- Exibir todos usuário: GET /api/users
- Buscar um usuário: GET /api/users/:id
- Atualizar perfil: PATCH /api/users/:id

### Projetos
- Listar todos: GET /api/projects
- Listar um: GET /api/projects/:id
- Adicionar: POST /api/projects (administrador)
- Atualizar: PUT /api/projects/:id (administrador)
- Excluir: DELETE /api/projects/:id (administrador)
- Curtir: PUT /api/projects/like/:id
- Descurtir: PUT /api/projects/unlike/:id
- Comentar: POST /api/projects/comment/:id
- Atualizar comentário: PUT /api/projects/comment/:id/:comment_id
- Excluir comentário: DELETE /api/projects/comment/:id/:comment_id
- Curtir comentário: PUT /api/projects/comment/like/:id/:comment_id
- Descurtir comentário: PUT /api/projects/comment/unlike/:id/:comment_id
- Listar comentários de um projeto: GET /api/projects/comments/:id

## Schemas

### User
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

### Project
```json
{
  "title": "string",
  "description": "string",
  "technologies": ["string"],
  "image": "string",
  "likes": ["string"],
  "comments": [
    {
      "user": "string",
      "text": "string",
      "likes": ["string"]
    }
  ]
}
```