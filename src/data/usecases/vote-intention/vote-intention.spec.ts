import { VoteIntentionUseCase } from "./vote-intention";
import { CityRepository } from "@/data/protocols";
import { PollRepository } from "@/data/protocols/db/poll/poll-repository";
import { City } from "@/domain/entities/city/city";

describe("VoteIntentionUseCase", () => {
  let sut: VoteIntentionUseCase;
  let mockCityRepository: jest.Mocked<CityRepository>;
  let mockPollRepository: jest.Mocked<PollRepository>;

  beforeEach(() => {
    mockCityRepository = {
      saveCities: jest.fn(),
      findByName: jest.fn(),
      list: jest.fn(),
    } as jest.Mocked<CityRepository>;

    mockPollRepository = {
      savePoll: jest.fn(),
      listPolls: jest.fn(),
    } as jest.Mocked<PollRepository>;

    sut = new VoteIntentionUseCase(mockPollRepository, mockCityRepository);
  });

  it("should correctly calculate voting intentions and save them to the repository", async () => {
    mockCityRepository.findByName.mockImplementation((name: string) => {
      if (name === "City A") {
        const city: City = new City("City A", 20000, "SP", "1");
        return Promise.resolve(city);
      } else {
        if (name === "City B") {
          const city: City = new City("City B", 500000, "SP", "2");
          return Promise.resolve(city);
        }
        const city: City = new City("City C", 2000000, "SP", "3");
        return Promise.resolve(city);
      }
    });

    const votingData = [
      {
        id: "1",
        date: "2024-11-01",
        cityName: "City A",
        state: "SP",
        candidate: "C1",
      },
      {
        id: "2",
        date: "2024-11-01",
        cityName: "City B",
        state: "SP",
        candidate: "C1",
      },
      {
        id: "3",
        date: "2024-11-01",
        cityName: "City C",
        state: "SP",
        candidate: "C2",
      },
    ];

    await sut.execute(votingData);

    expect(mockPollRepository.savePoll).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        date: "2024-11-01",
      })
    );

    expect(mockPollRepository.savePoll).toHaveBeenCalledWith(
      expect.objectContaining({
        candidates: [
          { candidateId: "C1", percentage: 15.97, weightedVotes: 760000 },
          { candidateId: "C2", percentage: 84.03, weightedVotes: 4000000 },
        ],
      })
    );
  });

  it("should return empty results if no city is found", async () => {
    mockCityRepository.findByName.mockResolvedValue(null);

    const votingData = [
      {
        id: "1",
        date: "2024-11-01",
        cityName: "Nonexistent City",
        state: "SP",
        candidate: "C1",
      },
    ];

    await sut.execute(votingData);

    expect(mockPollRepository.savePoll).toHaveBeenCalledWith(
      expect.objectContaining({
        candidates: [],
        date: "2024-11-01",
        id: "1",
      })
    );
  });

  it("should throw an error if saving poll results fails", async () => {
    mockCityRepository.findByName.mockResolvedValue(
      new City("City A", 20000, "SP", "1")
    );
    mockPollRepository.savePoll.mockRejectedValue(new Error("Save error"));

    const votingData = [
      {
        id: "1",
        date: "2024-11-01",
        cityName: "City A",
        state: "SP",
        candidate: "C1",
      },
    ];

    await expect(sut.execute(votingData)).rejects.toThrow("Save error");
  });
});
