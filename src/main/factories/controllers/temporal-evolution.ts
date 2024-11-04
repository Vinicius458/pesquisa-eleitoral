import { Controller } from "@/presentation/protocols";
import { makeTemporalEvolution } from "../usecases";
import { TemporalEvolutionController } from "@/presentation/controllers/temporal-evolution-controller";

export const makeTemporalEvolutionController =
  async (): Promise<Controller> => {
    const makeTemporalEvolutionUseCase = await makeTemporalEvolution();
    const controller = new TemporalEvolutionController(
      makeTemporalEvolutionUseCase
    );
    return controller;
  };
