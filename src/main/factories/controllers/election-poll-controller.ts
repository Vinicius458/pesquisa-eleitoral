import { Controller } from "@/presentation/protocols";
import { makeVoteIntention } from "../usecases";
import { ElectionPollController } from "@/presentation/controllers/election-poll-controller";
import { CsvParse } from "@/infra/csv/csv-parse";

export const makeElectionPollController = async (): Promise<Controller> => {
  const makeVoteIntentionUseCase = await makeVoteIntention();
  const readCsv = new CsvParse();
  const controller = new ElectionPollController(
    readCsv,
    makeVoteIntentionUseCase
  );
  return controller;
};
