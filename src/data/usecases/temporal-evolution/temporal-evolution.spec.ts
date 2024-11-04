import { Poll } from "@/domain/entities";
import { TemporalEvolutionUseCase } from "./temporal-evolution";
import { PollRepository } from "@/data/protocols/db/poll/poll-repository";
import { Candidate } from "@/domain/entities/poll/candidate";

describe("TemporalEvolutionUseCase", () => {
  let pollRepository: jest.Mocked<PollRepository>;
  let sut: TemporalEvolutionUseCase;

  beforeEach(() => {
    pollRepository = {
      listPolls: jest.fn(),
    } as unknown as jest.Mocked<PollRepository>;

    sut = new TemporalEvolutionUseCase(pollRepository);
  });

  it("should return the list of polls with candidates' weighted votes and percentage", async () => {
    const candidate1 = new Candidate("C1", 100, 60);
    const candidate2 = new Candidate("C2", 50, 30);
    const poll = new Poll("poll1", "2024-11-01", [candidate1, candidate2]);
    const mockPolls = [poll];

    pollRepository.listPolls.mockResolvedValue(mockPolls);

    const result = await sut.execute();

    expect(result).toEqual([
      {
        id: "poll1",
        date: "2024-11-01",
        candidates: [
          { candidateId: "C1", weightedVotes: 100, percentage: 60 },

          { candidateId: "C2", weightedVotes: 50, percentage: 30 },
        ],
      },
    ]);

    expect(pollRepository.listPolls).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array if no polls are found", async () => {
    pollRepository.listPolls.mockResolvedValue([]);

    const result = await sut.execute();

    expect(result).toEqual([]);
  });
});
