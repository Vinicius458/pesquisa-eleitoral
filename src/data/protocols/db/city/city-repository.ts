import { City } from "@/domain/entities";

export interface CityRepository {
  findByName(name: string): Promise<City | null>;
  saveCities(cities: Array<City>): Promise<Array<City>>;
  list(): Promise<Array<City>>;
}
