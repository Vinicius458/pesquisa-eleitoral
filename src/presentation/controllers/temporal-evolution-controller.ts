import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok, badRequest } from "@/presentation/helpers";
import { TemporalEvolution } from "@/domain/usecases/temporal-evolution";

export class TemporalEvolutionController implements Controller {
  constructor(private temporalEvolutionUseCase: TemporalEvolution) {}

  async handle(request: AddAcountController.Request): Promise<HttpResponse> {
    try {
      const result = await this.temporalEvolutionUseCase.execute();
      return ok(result);
    } catch (error: any) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace AddAcountController {
  export type Request = {
    file: Express.Multer.File;
  };
}
