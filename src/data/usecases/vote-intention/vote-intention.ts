import { CityRepository } from "@/data/protocols";
import { PollRepository } from "@/data/protocols/db/poll/poll-repository";
import { Candidate } from "@/domain/entities/poll/candidate";
import { Poll } from "@/domain/entities/poll/poll";
import { VotingIntention } from "@/domain/usecases/voting-intention";

export class VoteIntentionUseCase implements VotingIntention {
  constructor(
    private readonly pollRepository: PollRepository,
    private readonly cityRepository: CityRepository
  ) {}

  async execute(data: VotingIntention.Params): Promise<void> {
    const electionResults: Record<string, number> = {};
    let pollId!: string;
    let pollDate!: string;

    for (const [index, poll] of data.entries()) {
      const { cityName, candidate } = poll;

      if (index === 0) {
        pollId = poll.id;
        pollDate = poll.date;
      }
      const city = await this.cityRepository.findByName(cityName);
      if (city) {
        const groupWeight = city.getWeightByPopulation();
        const weightedVotes = city.population * groupWeight;
        if (!electionResults[candidate]) {
          electionResults[candidate] = 0;
        }

        electionResults[candidate] += weightedVotes;
      }
    }

    const totalVotes = Object.values(electionResults).reduce(
      (total, votes) => total + votes,
      0
    );

    const results = Object.entries(electionResults).map(
      ([candidate, votes]) => {
        const percentage = parseFloat(((votes / totalVotes) * 100).toFixed(2));
        return new Candidate(candidate, votes, percentage);
      }
    );
    const poll = new Poll(pollId, pollDate, results);
    await this.pollRepository.savePoll(poll);
  }
}
