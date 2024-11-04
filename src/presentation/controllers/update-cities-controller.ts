import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { SaveCities } from "@/domain/usecases/save-cities";

export class UpdateCitiesController implements Controller {
  constructor(private saveCitiesUseCase: SaveCities) {}

  async handle(): Promise<HttpResponse> {
    try {
      const saveCities = await this.saveCitiesUseCase.execute();

      return ok(saveCities);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
