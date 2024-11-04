import { DBPollRepository } from "@/infra/db/mongo/poll/poll.repository";
import { TemporalEvolution } from "@/domain/usecases/temporal-evolution";
import { TemporalEvolutionUseCase } from "@/data/usecases/temporal-evolution/temporal-evolution";

export const makeTemporalEvolution = async (): Promise<TemporalEvolution> => {
  const pollRepository = new DBPollRepository();
  return new TemporalEvolutionUseCase(pollRepository);
};
