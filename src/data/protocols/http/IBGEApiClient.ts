import { City } from "@/domain/entities";

export interface IBGEApiClientInterface {
  getCityPopulation(): Promise<Array<City>>;
}
