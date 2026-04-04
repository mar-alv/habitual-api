<h1 align='center'>habitual-api</h1>

<div align='center'>

  [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

</div>

## 📚 Sumário
- [❕ Sobre](#about)
- [📖 Instruções](#instructions)
	- [📥 Instalar](#install)
	- [🚀 Rodar Localmente](#locally)
	- [📋 Rodar Testes Unitários](#unit-tests)
	- [🏁 Rodar Testes End-To-End](#e2e-tests)
	- [📔 Rodar Storybook](#storybook)
- [⚡ Endpoints](#endpoints)
- [📂 Estrutura](#structure)
- [🧰 Tecnologias](#technologies)
- [📸 Prints e 🎥 Gravações](#screenshots-prints)
- [👤 Autor](#author)
- [📄 Licença](#license)

### <a id='about' style='text-decoration: none; color: inherit;'>❕ Sobre</a>
Projeto para a aula de Engenharia de Software: Projeto e Desenvolvimento da Unisinos, onde criamos uma aplicação para acompanhamento de hábitos de um usuário.

### <a id='instructions' style='text-decoration: none; color: inherit;'>📖 Instruções</a>
#### <a id='install' style='text-decoration: none; color: inherit;'>📥 Instalar</a>
Cole o 1º comando em um terminal aberto dentro da pasta de sua preferência para clonar o projeto
```sh
https://github.com/mar-alv/habitual-api.git
```

Em seguida rode uma das versões do 2º comando para instalar as dependências
```sh
npm i
```
```sh
npm install
```

#### <a id='locally' style='text-decoration: none; color: inherit;'>🚀 Rodar Localmente</a>
Cole o comando em um terminal, a aplicação estará disponível na porta 3333
```sh
npm run dev
```

#### <a id='endpoints' style='text-decoration: none; color: inherit;'>⚡ Endpoints</a>

Para fazer requisições ao servidor com 🥧 HTTPie diretamente do terminal, é necessário seguir o guia de instalação da CLI

---

##### 🆕 Criar hábito (POST /habits)
Cria um novo hábito

```sh
curl -X POST http://localhost:3333/habits \
-h "Content-Type: application/json" \
-d '{
  "name": "Beber água",
  "description": "Beber 2L por dia",
  "frequency": "daily",
  "targetPerPeriod": 2
}'
````

Com 🥧 HTTPie

```sh
http POST http://localhost:3333/habits < httpie/post.json
```

Respostas

```
HTTP/1.1 200 OK

{
  "id": "...",
  "name": "...",
  "frequency": "daily",
  ...
}

HTTP/1.1 400 Bad Request
```

---

##### 📋 Listar hábitos (GET /habits)

Retorna todos os hábitos

```sh
curl -X GET http://localhost:3333/habits
```

```sh
http GET http://localhost:3333/habits
```

Respostas

```
HTTP/1.1 200 OK

[
  {
    "id": "...",
    "name": "...",
    ...
  }
]
```

---

##### ✏️ Atualizar hábito (PATCH /habits/:id)

Atualiza parcialmente um hábito

```sh
curl -X PATCH http://localhost:3333/habits/{id} \
-h "Content-Type: application/json" \
-d '{"name": "Novo nome"}'
```

```sh
http PATCH http://localhost:3333/habits/{id} < httpie/patch.json
```

Respostas

```
HTTP/1.1 200 OK

HTTP/1.1 400 Bad Request

HTTP/1.1 404 Not Found
```

---

##### ❌ Deletar hábito (DELETE /habits/:id)

```sh
curl -X DELETE http://localhost:3333/habits/{id}
```

```sh
http DELETE http://localhost:3333/habits/{id}
```

Respostas

```
HTTP/1.1 200 OK

{
  "success": true
}

HTTP/1.1 404 Not Found
```

---

##### 📝 Registrar progresso (POST /habits/:id/logs)

Cria ou atualiza o log de um hábito em uma data

```sh
curl -X POST http://localhost:3333/habits/{id}/logs \
-h "Content-Type: application/json" \
-d '{
  "date": "2026-01-01",
  "completed": true,
  "value": 1
}'
```

```sh
http POST http://localhost:3333/habits/{id}/logs < httpie/log.json
```

Respostas

```
HTTP/1.1 200 OK

{
  "id": "...",
  "habitId": "...",
  "date": "...",
  "completed": true
}

HTTP/1.1 400 Bad Request
```

---

##### 🚫 Rota não existente

```
HTTP/1.1 404 Not Found

"Route not found"
```

#### <a id='structure' style='text-decoration: none; color: inherit;'>📂 Estrutura</a>
```
│ prisma/
│   ├── migrations/
│   │     └── ...
│   └── ...
│ src/
│   ├── infra/
│   │   └── db/
│   │       └── ...
│   │
│   ├── modules/
│   │   └── habits/
│   │       └── ...
│   │
│   ├── repositories/
│   │   └── ...
│   │
│   ├── shared/
│   │   └── ...
│   │
│   ├── app.ts
│   └── server.ts
```

### <a id='technologies' style='text-decoration: none; color: inherit;'>🧰 Tecnologias</a>
#### Framework Back-end
[![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScri3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

#### Banco de Dados
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

#### Utilidades
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=.env&logoColor=black)](https://github.com/motdotla/dotenv)
[![TSX](https://img.shields.io/badge/tsx-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.npmjs.com/package/tsx)
[![Zod](https://img.shields.io/badge/Zod-007ACC?style=for-the-badge&logo=superman&logoColor=white)](https://zod.dev/)

### <a id='license' style='text-decoration: none; color: inherit;'>📄 Licença</a>
Licenciado via [MIT](../LICENSE)
