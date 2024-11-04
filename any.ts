const pesquisas = [
  {
    id: "1",
    data: "2024-11-01",
    municipio: { id: "101", nome: "Cidade A", habitantes: 15000 },
    candidatoVencedor: "C1", // ID do candidato
  },
  {
    id: "2",
    data: "2024-11-01",
    municipio: { id: "102", nome: "Cidade B", habitantes: 50000 },
    candidatoVencedor: "C1", // ID do candidato
  },
  {
    id: "3",
    data: "2024-11-01",
    municipio: { id: "103", nome: "Cidade C", habitantes: 800000 },
    candidatoVencedor: "C2", // ID do candidato
  },
];

// Pesos dos grupos de porte
const pesosPorGrupo = {
  "Grupo 1": 0.5,
  "Grupo 2": 1,
  "Grupo 3": 1.5,
  "Grupo 4": 2,
};

// Função para classificar o porte do município
const classificarPorte = (habitantes) => {
  if (habitantes <= 20000) return "Grupo 1";
  if (habitantes <= 100000) return "Grupo 2";
  if (habitantes <= 1000000) return "Grupo 3";
  return "Grupo 4";
};

const calcularIntencaoVotosNacional = (pesquisas) => {
  const resultadosNacionais = {};

  pesquisas.forEach((pesquisa) => {
    const { municipio, candidatoVencedor } = pesquisa;
    const grupo = classificarPorte(municipio.habitantes);
    const pesoGrupo = pesosPorGrupo[grupo];

    // Calcular votos ponderados para o candidato vencedor
    const votosPonderados = municipio.habitantes * pesoGrupo;

    // Adicionar votos ao candidato vencedor
    if (!resultadosNacionais[candidatoVencedor]) {
      resultadosNacionais[candidatoVencedor] = 0;
    }
    resultadosNacionais[candidatoVencedor] += votosPonderados;
  });

  // Calcular o total de votos ponderados
  const totalVotos = Object.values(resultadosNacionais).reduce(
    (total, votos) => total + votos,
    0
  );

  // Calcular porcentagem para cada candidato
  const porcentagens = {};
  for (const candidato in resultadosNacionais) {
    porcentagens[candidato] =
      (resultadosNacionais[candidato] / totalVotos) * 100;
  }

  return { resultadosNacionais, porcentagens };
};

// Executando o cálculo
const { resultadosNacionais, porcentagens } =
  calcularIntencaoVotosNacional(pesquisas);
console.log("Resultados Nacionais:", resultadosNacionais);
console.log("Porcentagens:", porcentagens);
