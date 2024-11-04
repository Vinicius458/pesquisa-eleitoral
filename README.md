# Documentação da API de Pesquisa Eleitoral
## Visão Geral
Esta aplicação foi desenvolvida e tem como objetivo estimar a intenção de votos nas eleições para presidente do Brasil. A aplicação considera as diferenças de intenção de votos entre municípios de diferentes portes e permite a sincronização de dados com uma base externa, utilizando dados do IBGE.

## Estrutura da Arquitetura
O sistema é dividido em serviços desacoplados, no qual respeitam designs e arquitetura, tais como domain driven design, clean architecture e SOLID.
- Node.js e express para a implementação da API, ideal para o padrão do projeto.
- MongoDB como banco de dados não relacional para persistência. Escolhido em razões de flexibilidade, ideal para dados que podem mudar ou variar em estrutura. No caso de pesquisas eleitorais, onde diferentes pesquisas podem incluir campos adicionais ou diferentes formatos de dados, essa flexibilidade é benéfica.
- Docker e Docker Compose para orquestração e gerenciamento de contêineres, o que facilita o desenvolvimento e a implantação.
- Utilização de outros design patter como Abstract Factory, Adapters, TDD.

## Funcionalidades

- **Sincronização de Dados**: A aplicação sincroniza os dados da base de municípios e estados brasileiros, e pode ser acionada manualmente pelo usuário através da uma requisição POST na API ou automaticamnente através de uma função cron pré agendada mensalmente.
  
- **Importação de Pesquisas Eleitorais**: O sistema pode importar arquivos CSV, contendo listas de intenção de votos, que incluem informações sobre o ID da pesquisa, data, município, estado e intenção de voto para cada candidato.

- **Cálculo de Intenção de Votos**: A aplicação calcula a intenção de votos para cada candidato com base no porte de cada município e no estado. Os cálculos são ponderados conforme a quantidade de habitantes da região.

- **Lista Evolução**: Através de um requisição GET, podemos acompanhar a evolução temporal das intenções de votos, permitindo uma visualização em quantidades e porcentagem.

## Explicação
### Sincronização de Dados
Para este serviço, foi criada uma rota na API e uma função pré agendada(cron) que, ao ser chamada, invoca um serviço que se conecta à API do IBGE(camada infra) para obter dados de localidades. No entanto, foi identificado um problema: a API não fornece informações sobre o número de habitantes. Para contornar essa limitação, estou gerando números aleatórios entre um até 12 milhões, para substituir esses dados. Dessa forma, todos os campos serão corretamente persistidos no banco de dados.

### Importação de Pesquisas Eleitorais
Foi implementada uma camada externa CSV responsável por converter os campos do arquivo CSV para o formato TypeScript, utilizando uma biblioteca específica. Os dados convertidos são, então, enviados para o use case para o cálculo dos votos.

### Cálculo de Intenção de Votos
1. Coleta de Dados: Primeiro, os dados das pesquisas eleitorais são importados e incluem informações como o ID da pesquisa, a data, o município, o estado e a intenção de voto para cada candidato.
2. Busca da cidade: Dentro da lista de cada cidade, é feito um **findByName** no repositório de cidades, através do resultado deste find conseguimos saber o peso da população de acordo com o grupo daquela cidade
3. Cálculo da intenção de votos:
   - Para cada candidato em uma pesquisa, a intenção de voto é ponderada pelo peso correspondente ao grupo do município em que os votos foram registrados.
   - O cálculo é feito da seguinte maneira: Intenção de Voto Ponderada = Intenção de Voto × Peso do Grupo
   - A intenção de voto ponderada é então acumulada para cada candidato em todos os municípios.
4. Total de votos: é realizado a somatório do total obtido entre ambos os candidatos.
5. Porcentagem de votos:  a partir do valor total de votos, conseguimos calcular a porcentagem de votos de cada candidato, o calculo realizado foi: (votes / totalVotes) * 100.
6. Persistência dos resultados: Os resultados calculados são persistidos no banco de dados, garantindo que todas as informações estejam disponíveis para análises futuras e visualização.

### Lista Evolução das Pesquisas
Nessa requisição, todas as pesquisas respectivamente com os calculos de cada candidato, data e id são listados, do reposotório de votação, podendo ser utilizados para mostrar uma evolução na linha do tempo das pesquisas de candidatura.
   
## Configuração e Instalação
Para configurar e rodar o sistema, siga os passos abaixo:
1. Clone o repositório do projeto.
   ```bash
     git clone https://github.com/Vinicius458/pesquisa-eleitoral.git
   
2. Crie um arquivo .env com as seguintes variáveis:
   ```bash
   # Banco de dados Mongo
    MONGO_URI=mongodb://mongodb:27017/poll
   
   # Server
   PORT=3000




 3. Execute o comando para iniciar os contêineres:
    ```bash
    docker-compose up --build

 4. A aplicação estará disponível na porta 3000.

## API Endpoints
1. **POST /api/update-cities** - Atualiza as informações de município.
   ```bash
   POST /api/update-cities
   Content-Type: application/json
      
2. **POST  /api/election-poll** - Realiza a importação de Pesquisas Eleitorais.
      ```bash
      POST /api/election-poll
      Content-Type: multipart/form-data

      **ARQUIVO CSV**

3. **GET  /api/temporal-evolution** - Lista Evolução das Pesquisas.
   ```bash
   GET /api/temporal-evolution
   Content-Type: application/json

   EX:
   [
	  {
		"id": "P6",
		"date": "09/10/2022",
		"candidates": [
			{
				"candidateId": "A",
				"weightedVotes": 12149783256,
				"percentage": 49.49
			},
			{
				"candidateId": "B",
				"weightedVotes": 12401533740.5,
				"percentage": 50.51
			}
		 ]
	  }
   ]

