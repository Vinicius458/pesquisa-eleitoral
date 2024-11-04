import { DBCityRepository } from "@/infra/db/mongo/city/city.repository";
import { VotingIntention } from "@/domain/usecases/voting-intention";
import { VoteIntentionUseCase } from "@/data/usecases/vote-intention/vote-intention";
import { DBPollRepository } from "@/infra/db/mongo/poll/poll.repository";

export const makeVoteIntention = async (): Promise<VotingIntention> => {
  const pollRepository = new DBPollRepository();
  const cityRepository = new DBCityRepository();
  return new VoteIntentionUseCase(pollRepository, cityRepository);
};
