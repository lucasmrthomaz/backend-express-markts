# Todo Backend (Express)

Este é um projeto de backend para um aplicativo de gerenciamento de tarefas, desenvolvido com Node.js e Express.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **PrismaORM**: Framework Objeto Relacional para interagir com o banco de dados
- **Docker**: Para containerização da aplicação.
- **JWT (JSON Web Token)**: Para autenticação e autorização.
- **SQLite**: Banco de dados relacional leve utilizado para persistência.

## Como Iniciar o Projeto com Docker Compose

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. No diretório do projeto, execute o seguinte comando para iniciar os serviços:

   ```bash
   docker-compose up
   ```
3. A aplicação estará disponível em `http://localhost:3001`.
4. Para parar os serviços, utilize o comando:

   ```bash
   docker-compose down
   ```

## Endpoints

### Listar todos os TODOs (com paginação)

**GET** `localhost:3001/tasks`

#### Response:

- **200 OK**: Returns a list of all TODOs.

```json
{
	"tasks": [
		{
			"id": "550e8400-e29b-41d4-a716-446655440000",
			"createdAt": "2025-03-19T00:39:58.478Z",
			"title": "Create a new project",
			"description": "Implement user authentication",
			"status": "TODO"
		},
		{
			"id": "550e8400-e29b-41d4-a716-446655440001",
			"createdAt": "2025-03-19T00:39:58.478Z",
			"title": "Design the landing page",
			"description": "Design the landing page",
			"status": "TODO"
		},
		{
			"id": "550e8400-e29b-41d4-a716-446655440002",
			"createdAt": "2025-03-19T00:39:58.478Z",
			"title": "Set up CI/CD pipeline",
			"description": "Set up CI/CD pipeline",
			"status": "DONE"
		},
		{
			"id": "550e8400-e29b-41d4-a716-446655440003",
			"createdAt": "2025-03-19T00:39:58.478Z",
			"title": "Create a new feature",
			"description": "Create a new feature",
			"status": "TODO"
		}
	],
	"page": 1,
	"limit": 4,
	"totalTasks": 12,
	"totalPages": 3
}
```

## Autenticação

Para obter um token de autenticação, utilize o endpoint:

```
POST http://localhost:3001/auth/login
```

### Exemplo de Requisição

Envie um JSON no corpo da requisição com as credenciais de login, como no exemplo abaixo:

```json
{
  "email": "user.test@awesome.com",
  "password": "teste1234"
}
```

### Exemplo de Resposta

Se as credenciais forem válidas, a resposta será um token JWT com validade de 24 horas:

```json
{
  "token": "seu-token-jwt"
}
```

Utilize este token no cabeçalho `Authorization` para acessar os endpoints protegidos:

```
Authorization: Bearer seu-token-jwt
```

## Licença

Este projeto está licenciado sob a licença MIT.
