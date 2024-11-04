import { setupApp } from "./config/app";
import "dotenv/config";
import env from "@/main/config/env";
import { connectDatabase } from "@/infra/db/mongo/config";

const port: number = Number(env.port) || 3000;
const app = setupApp();
async function initializeApp() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
initializeApp();
