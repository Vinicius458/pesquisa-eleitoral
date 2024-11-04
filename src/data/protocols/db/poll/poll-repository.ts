import { Poll } from "@/domain/entities/poll/poll";

export interface PollRepository {
  savePoll(poll: Poll): Promise<Poll>;
  listPolls(): Promise<Array<Poll>>;
}
