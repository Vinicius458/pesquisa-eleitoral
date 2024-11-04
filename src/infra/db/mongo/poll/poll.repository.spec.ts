import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { DBPollRepository } from "./poll.repository"; // Ajuste o caminho se necessário
import { Poll } from "@/domain/entities/poll/poll";
import { PollModel } from "./poll.schema";

describe("DBPollRepository Integration Tests", () => {
  let mongoServer: MongoMemoryServer;
  let dbPollRepository: DBPollRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);

    dbPollRepository = new DBPollRepository();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await PollModel.deleteMany({});
  });

  it("should save a poll and retrieve it", async () => {
    const pollData = new Poll("1", "12/08/2022", [
      { candidateId: "c1", weightedVotes: 100, percentage: 50 },
      { candidateId: "c2", weightedVotes: 100, percentage: 50 },
    ]);

    const savedPoll = await dbPollRepository.savePoll(pollData);

    expect(savedPoll).toBeDefined();
    expect(savedPoll.id).toEqual(pollData.id);
    expect(savedPoll.date).toEqual(pollData.date);
    expect(savedPoll.candidates.length).toBe(2);

    const polls = await dbPollRepository.listPolls();
    expect(polls).toBeDefined();
    expect(polls.length).toBe(1);
    expect(polls[0].id).toEqual(savedPoll.id);
    expect(polls[0].date).toEqual(savedPoll.date);
    expect(polls[0].candidates.length).toBe(2);
  });

  it("should list polls and include the saved poll", async () => {
    const pollData = new Poll("2", "12/08/2022", [
      { candidateId: "c3", weightedVotes: 120, percentage: 60 },
      { candidateId: "c4", weightedVotes: 80, percentage: 40 },
    ]);

    await dbPollRepository.savePoll(pollData);

    const polls = await dbPollRepository.listPolls();
    expect(polls).toBeDefined();
    expect(polls.length).toBe(1);
    expect(polls[0].candidates[0].candidateId).toEqual("c3");
    expect(polls[0].candidates[1].candidateId).toEqual("c4");
    expect(polls[0].candidates[0].percentage).toEqual(60);
    expect(polls[0].candidates[1].percentage).toEqual(40);
  });
});
