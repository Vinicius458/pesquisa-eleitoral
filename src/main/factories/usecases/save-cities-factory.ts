import { SaveCities } from "@/domain/usecases/save-cities";
import { SaveCitiesUseCase } from "@/data/usecases/save-cities/save-cities";
import { IBGEApiClient } from "@/infra/http/ibgeApiClient";
import { DBCityRepository } from "@/infra/db/mongo/city/city.repository";

export const makeSaveCities = async (): Promise<SaveCities> => {
  const ibgeApi = new IBGEApiClient();
  const cityRepository = new DBCityRepository();
  return new SaveCitiesUseCase(ibgeApi, cityRepository);
};
