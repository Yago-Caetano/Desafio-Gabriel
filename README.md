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
DATABASE_SCHEMA = 'db_desafio'
DATABASE_PORT = 3306
PORT = '3333'
API_VERSION = 1

```

### Configuracao banco de dados

O script para a criação do banco de dados encontra-se [aqui](./sql/db_desafio.sql)



## Acessando a aplicação

Para acessar o aplicativo, basta abrir o navegador no endereço abaixo:

```
    localhost:{Porta definida no arquivo ".env"}
```

## Link do video

E possivel ver o video [aqui](youtube.com)