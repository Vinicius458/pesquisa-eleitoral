import { adaptRoute } from "@/main/adapters";

import { Router } from "express";
import { makeElectionPollController } from "../factories/controllers/election-poll-controller";
import multer from "multer";

export default async (router: Router): Promise<void> => {
  const upload = multer({ storage: multer.memoryStorage() });
  const fileMiddleware = upload.single("file");
  const electionPollController = await makeElectionPollController();
  router.post(
    "/election-poll",
    fileMiddleware,
    adaptRoute(electionPollController)
  );
};
