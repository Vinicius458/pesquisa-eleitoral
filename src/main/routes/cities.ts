import { adaptRoute } from "@/main/adapters";
import { makeUpdateCitiesController } from "@/main/factories";

import { Router } from "express";

export default async (router: Router): Promise<void> => {
  const updateCitiesController = await makeUpdateCitiesController();
  router.post("/update-cities", adaptRoute(updateCitiesController));
};
