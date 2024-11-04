import { adaptRoute } from "@/main/adapters";
import { Router } from "express";
import { makeTemporalEvolutionController } from "../factories";

export default async (router: Router): Promise<void> => {
  const temporalEvolutionController = await makeTemporalEvolutionController();
  router.get("/temporal-evolution", adaptRoute(temporalEvolutionController));
};
