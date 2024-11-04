import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok, badRequest } from "@/presentation/helpers";
import { VotingIntention } from "@/domain/usecases/voting-intention";
import { ReadCsv } from "@/data/protocols/csv/read-csv";
import fs from "fs";
import os from "os";
import path from "path";

export class ElectionPollController implements Controller {
  constructor(
    private readCsv: ReadCsv,
    private voteIntention: VotingIntention
  ) {}

  async handle(request: AddAcountController.Request): Promise<HttpResponse> {
    try {
      if (!request.file) {
        badRequest;
        return badRequest({
          name: "FileNotProvide",
          message: "File not provided",
        });
      }

      const tempFilePath = path.join(os.tmpdir(), request.file.originalname);
      await fs.promises.writeFile(tempFilePath, request.file.buffer);
      const parsedData = await this.readCsv.execute(tempFilePath);
      await this.voteIntention.execute(parsedData);
      await fs.promises.unlink(tempFilePath);

      return ok({ message: "Poll registered successfully" });
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace AddAcountController {
  export type Request = {
    file: Express.Multer.File;
  };
}
