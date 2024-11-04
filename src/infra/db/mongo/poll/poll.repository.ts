import { PollDocument, PollModel } from "./poll.schema";
import { PollRepository } from "@/data/protocols/db/poll/poll-repository";
import { Poll } from "@/domain/entities/poll/poll";

export class DBPollRepository implements PollRepository {
  async savePoll(poll: Poll): Promise<Poll> {
    const newPoll = new PollModel(this.toEntity(poll));
    const savedEntity = await newPoll.save();
    return this.toDomain(savedEntity);
  }

  async listPolls() {
    const pollDocs = await PollModel.find();
    return pollDocs.map((pollDoc) => this.toDomain(pollDoc));
  }

  private toDomain(pollDoc: PollDocument): Poll {
    const account = new Poll(pollDoc._id, pollDoc.date, pollDoc.candidates);
    return account;
  }

  private toEntity(poll: Poll): PollDocument {
    return {
      _id: poll.id,
      date: poll.date,
      candidates: poll.candidates,
    };
  }
}
