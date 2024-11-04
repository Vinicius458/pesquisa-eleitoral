import { setupApp } from "./config/app";
import "dotenv/config";
import env from "@/main/config/env";
import { connectDatabase } from "@/infra/db/mongo/config";
import { CronJob } from "@/infra/cron/cron-job";

const port: number = Number(env.port) || 3000;
const app = setupApp();
async function initializeApp() {
  await connectDatabase();
  const cronJob = new CronJob();
  await cronJob.execute();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
initializeApp();
