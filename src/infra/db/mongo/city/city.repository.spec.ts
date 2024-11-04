import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { DBCityRepository } from "./city.repository";
import { CityModel } from "./city.schema";
import { City } from "@/domain/entities";

describe("DBCityRepository", () => {
  let mongoServer: MongoMemoryServer;
  let cityRepository: DBCityRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    cityRepository = new DBCityRepository();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await CityModel.deleteMany({});
  });

  it("should save a list of cities", async () => {
    const cities = [
      new City("City1", 15000, "State1", "uuid-1"),
      new City("City2", 50000, "State1", "uuid-2"),
    ];
    cities[0].group = 1;
    cities[1].group = 2;

    const savedCities = await cityRepository.saveCities(cities);

    expect(savedCities).toHaveLength(2);
    expect(savedCities[0].id).toBe("uuid-1");
    expect(savedCities[0].name).toBe("City1");
  });

  it("should return a city when it exists", async () => {
    // Arrange
    const cities = [new City("City1", 15000, "State1", "uuid-1")];

    // Salvar a cidade no banco de dados

    await cityRepository.saveCities(cities);
    // Act
    const result = await cityRepository.findByName("City1");

    // Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(City);
    expect(result?.name).toBe(cities[0].name);
    expect(result?.population).toBe(cities[0].population);
    expect(result?.state).toBe(cities[0].state);
  });

  it("should return null when the city does not exist", async () => {
    // Act
    const result = await cityRepository.findByName("Cidade Inexistente");

    // Assert
    expect(result).toBeNull();
  });

  it("should list all cities", async () => {
    const cities = [
      new City("City8", 10000, "State4", "uuid-8"),
      new City("City9", 40000, "State4", "uuid-9"),
    ];
    cities[0].group = 1;
    cities[1].group = 2;

    await cityRepository.saveCities(cities);

    const cityList = await cityRepository.list();

    expect(cityList).toHaveLength(2);
    expect(cityList[0].name).toBe("City8");
  });
});
