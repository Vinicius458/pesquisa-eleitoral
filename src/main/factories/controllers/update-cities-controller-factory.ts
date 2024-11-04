import { Controller } from "@/presentation/protocols";
import { makeSaveCities } from "@/main/factories";
import { UpdateCitiesController } from "@/presentation/controllers/update-cities-controller";

export const makeUpdateCitiesController = async (): Promise<Controller> => {
  const makeSaveCitiesUseCase = await makeSaveCities();
  const controller = new UpdateCitiesController(makeSaveCitiesUseCase);
  return controller;
};
