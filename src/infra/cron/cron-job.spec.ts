import cron from "node-cron";
import { CronJob } from "./cron-job";
import { makeSaveCities } from "@/main/factories";

jest.mock("node-cron", () => ({
  schedule: jest.fn(),
}));
jest.mock("@/main/factories", () => ({
  makeSaveCities: jest.fn(),
}));

describe("CronJob", () => {
  it("should schedule the job with the correct cron expression and call the use case", async () => {
    const mockSaveCitiesUseCase = {
      execute: jest.fn(),
    };
    (makeSaveCities as jest.Mock).mockResolvedValue(mockSaveCitiesUseCase);

    const cronJob = new CronJob();
    await cronJob.execute();

    expect(cron.schedule).toHaveBeenCalledWith(
      "0 0 1 * *",
      expect.any(Function)
    );

    const scheduledFunction = (cron.schedule as jest.Mock).mock.calls[0][1];
    await scheduledFunction();

    expect(mockSaveCitiesUseCase.execute).toHaveBeenCalled();
  });
});
