// dbCityRepository.ts
import { City } from "@/domain/entities";
import { CityRepository } from "@/data/protocols";
import { CityModel, CityDocument } from "./city.schema";

export class DBCityRepository implements CityRepository {
  async saveCities(cities: Array<City>): Promise<Array<City>> {
    const savedCities: Array<City> = [];
    await CityModel.deleteMany({});
    for (const city of cities) {
      const cityDoc = new CityModel(this.toEntity(city));
      const savedEntity = await cityDoc.save();
      const domainCity = this.toDomain(savedEntity);
      savedCities.push(domainCity);
    }
    return savedCities;
  }

  async findByName(name: string): Promise<City | null> {
    const cityDoc = await CityModel.findOne({ name }).exec();
    if (!cityDoc) {
      return null;
    }
    return cityDoc ? this.toDomain(cityDoc) : null;
  }

  async list(): Promise<Array<City>> {
    const cityDocs = await CityModel.find();
    return cityDocs.map((cityDoc) => this.toDomain(cityDoc));
  }

  private toEntity(city: City): Partial<CityDocument> {
    return {
      _id: city.id,
      name: city.name,
      state: city.state,
      population: city.population,
      group: city.group,
      updatedAt: city.updateAt,
    };
  }

  private toDomain(cityDoc: CityDocument): City {
    const city = new City(
      cityDoc.name,
      cityDoc.population,
      cityDoc.state,
      cityDoc._id.toString()
    );
    city.group = cityDoc.group;
    city.updateAt = cityDoc.updatedAt;
    return city;
  }
}
