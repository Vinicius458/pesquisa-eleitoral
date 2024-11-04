import { CityRepository } from "@/data/protocols";
import { IBGEApiClientInterface } from "@/data/protocols/http/IBGEApiClient";
import { City } from "@/domain/entities/city/city";
import { SaveCities } from "@/domain/usecases/save-cities";

export class SaveCitiesUseCase implements SaveCities {
  constructor(
    private readonly ibgeApiClient: IBGEApiClientInterface,
    private readonly cityRepository: CityRepository
  ) {}

  async execute(): Promise<void> {
    const citiesData = await this.ibgeApiClient.getCityPopulation();
    const cities = citiesData.map(
      (data) => new City(data.name, data.population, data.state, data.id)
    );

    if (cities.length > 0) await this.cityRepository.saveCities(cities);
  }
}
