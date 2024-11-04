import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { SaveCities } from "@/domain/usecases/save-cities";

export class UpdateCitiesController implements Controller {
  constructor(private saveCitiesUseCase: SaveCities) {}

  async handle(): Promise<HttpResponse> {
    try {
      await this.saveCitiesUseCase.execute();
      return ok({ message: "City ​​updated successfully" });
    } catch (error: any) {
      return serverError(error);
    }
  }
}
