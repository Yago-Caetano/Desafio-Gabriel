# Employees-Management

Projeto do backend para o protótipo do projeto "Gestão de funcionários"

## Antes de executar

Instale as dependencias do projeto, para isso digite o seguinte comando no terminal:

```
    npm install
```

### Configurar o ambiente

O projeto utiliza variaveis de ambientes para a parametrização do servidor. Você pode configurar as variaveis em seu sistema operacional, ou se preferir, utilize um arquivo **.env**.

Recomendamentos o uso do arquivo **.env** neste repositório.

As variaveis de ambientes requeridas são apresentadas abaixo.

```
DATABASE_HOST = 'endereço do banco de ados'
DATABASE_USER = 'nome do usuário'
DATABASE_PASS = 'senha de conexão'
DATABASE_SCHEMA = 'Nome do schema a ser utilizada'
DATABASE_PORT = 'Porta de conexão com database'
PORT = 'Valor da porta a ser exposta'
API_VERSION = 'indica a versão da API (valor numerico)'
```

abaixo é apresentado um exemplo

```
DATABASE_HOST = 'localhost'
DATABASE_USER = 'user'
DATABASE_PASS = 'psw'
DATABASE_SCHEMA = 'mSchema'
DATABASE_PORT = 3306
PORT = '3333'
API_VERSION = 1

```

## Documentação da API

A documentação da API foi feita utilizando o swagger e pode ser encontrada [aqui](./docs/api_swagger.yaml)