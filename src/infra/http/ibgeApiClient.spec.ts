// src/infrastructure/api/IBGEApiClient.integration.test.ts
import { IBGEApiClient } from "./ibgeApiClient";

describe("IBGEApiClient Integration Test", () => {
  let ibgeApiClient: IBGEApiClient;

  beforeEach(() => {
    ibgeApiClient = new IBGEApiClient();
  });

  it("should fetch city population from IBGE API", async () => {
    const population = await ibgeApiClient.getCityPopulation();
    expect(population.length).toBeGreaterThan(0);
  });
});
