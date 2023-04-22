# Customer API 1.0.0
## Desafio Stone - Desenvolvedor Backend Node.JS Sênior 
### Alex Sander Nolaço da Silveira
https://www.linkedin.com/in/alexnolaco/

### Descrição
Realização de um cadastro performático e seguro para os clientes da empresa.

### Funcionalidades
- Salvar um cliente novo
- Atualizar um cliente existente
- Buscar um cliente por ID

### Stack
- NodeJS
- NestJS
- Axios
- Typescript

### Documentação
Neste repositório há uma pasta 'documentation' ao qual terá:
- Cenários de teste da API
- Collection do postman para testes

No diretório raiz da api em localhost:3000 se econtra a documentação OpenApi (Swagger) do projeto para aferição dos (schemas, body e parameters) de todas as rotas disponíveis do projeto.

# Instruções de construção e execução local
No diretório raiz do projeto execute:
```bash
 npm install
```

Após isso execute um dos comandos abaixo dependendo da necessidade:

```bash
# modo de desenvolvimento
 npm run start

# modo de observação (a cada alteração realiza o rebuild)
 npm run start:dev

# modo de produção
 npm run start:prod
```

### Testes locais

```bash
# Executar os testes unitários
npm run test

# Executar a cobertura de testes
npm run test:cov
```
 
# Processo de instalação em ambiente produtivo
Esta solução utiliza imagens docker para execução, tive o cuidado de criar um arquivo docker-compose para criação da topologia do projeto ao qual provisiona uma instancia do banco de dados Redis, o expõe na porta 6379 e em sequência provisiona uma instância da customerAPI expondo a porta 3000 deixando assim a aplicação pronta para consumo, você poderá utilizar a collection do postman que deixei na documentação para testes.

```bash
# Constroi
docker-compose build

# Executa
docker-compose up -d

# Constroi e executa
docker-compose up --build
```

