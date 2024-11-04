import { PollRepository } from "@/data/protocols/db/poll/poll-repository";
import { TemporalEvolution } from "@/domain/usecases/temporal-evolution";

export class TemporalEvolutionUseCase implements TemporalEvolution {
  constructor(private readonly pollRepository: PollRepository) {}

  async execute(): Promise<TemporalEvolution.Result> {
    const listPolls = await this.pollRepository.listPolls();
    return listPolls.map((poll) => {
      const candidates = poll.candidates.map((candidate) => {
        return {
          candidateId: candidate.candidateId,
          weightedVotes: candidate.weightedVotes,
          percentage: candidate.percentage,
        };
      });
      return { id: poll.id, date: poll.date, candidates };
    });
  }
}
