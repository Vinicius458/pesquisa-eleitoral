import { Candidate } from "./candidate";

export class Poll {
  constructor(
    public readonly id: string,
    public readonly date: string,
    public readonly candidates: Candidate[]
  ) {}

  // Método para adicionar um candidato à pesquisa
  addCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
  }

  // Método para calcular a porcentagem dos votos ponderados
  calculatePercentages(): void {
    const totalVotes = this.candidates.reduce(
      (sum, candidate) => sum + candidate.weightedVotes,
      0
    );
    this.candidates.forEach((candidate) => {
      candidate.percentage = totalVotes
        ? (candidate.weightedVotes / totalVotes) * 100
        : 0;
    });
  }

  // Método para atualizar os votos ponderados de um candidato
  updateWeightedVotes(candidateId: string, newVotes: number): void {
    const candidate = this.candidates.find(
      (c) => c.candidateId === candidateId
    );
    if (candidate) {
      candidate.weightedVotes = newVotes;
    }
  }
}
