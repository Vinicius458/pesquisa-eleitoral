import { ICronJob } from "@/data/protocols/cron/cron-job";
import { makeSaveCities } from "@/main/factories";
import cron from "node-cron";

export class CronJob implements ICronJob {
  constructor() {}
  async execute(): Promise<void> {
    cron.schedule("0 0 1 * *", async () => {
      const saveCitiesUseCase = await makeSaveCities();
      await saveCitiesUseCase.execute();
    });
  }
}
