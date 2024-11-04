// src/domain/usecases/SaveCitiesUseCase.test.ts

import { SaveCitiesUseCase } from "./save-cities";
import { CityRepository } from "@/data/protocols";
import { IBGEApiClientInterface } from "@/data/protocols/http/IBGEApiClient";
import { City } from "@/domain/entities/city/city";

describe("SaveCitiesUseCase", () => {
  let saveCitiesUseCase: SaveCitiesUseCase;
  let ibgeApiClientMock: jest.Mocked<IBGEApiClientInterface>;
  let cityRepositoryMock: jest.Mocked<CityRepository>;

  beforeEach(() => {
    ibgeApiClientMock = {
      getCityPopulation: jest.fn(),
    } as jest.Mocked<IBGEApiClientInterface>;

    cityRepositoryMock = {
      saveCities: jest.fn(),
      findByName: jest.fn(),
      list: jest.fn(),
    } as jest.Mocked<CityRepository>;

    saveCitiesUseCase = new SaveCitiesUseCase(
      ibgeApiClientMock,
      cityRepositoryMock
    );
  });

  it("should fetch cities from IBGE API and save them in the repository", async () => {
    // Mock the response from the IBGE API
    const mockCitiesData = [
      { id: "1", name: "City1", population: 50000, state: "SP" },
      { id: "2", name: "City2", population: 150000, state: "RJ" },
    ].map((city) => new City(city.name, city.population, city.state, city.id));
    ibgeApiClientMock.getCityPopulation.mockResolvedValue(mockCitiesData);

    await saveCitiesUseCase.execute();

    expect(ibgeApiClientMock.getCityPopulation).toHaveBeenCalled();

    const expectedCities = mockCitiesData.map(
      (data) => new City(data.name, data.population, data.state, data.id)
    );
    expect(cityRepositoryMock.saveCities).toHaveBeenCalledWith(expectedCities);
  });

  it("should not save any cities if IBGE API returns an empty array", async () => {
    ibgeApiClientMock.getCityPopulation.mockResolvedValue([]);

    await saveCitiesUseCase.execute();

    expect(cityRepositoryMock.saveCities).not.toHaveBeenCalled();
  });
});
