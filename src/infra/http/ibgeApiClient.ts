// src/infrastructure/api/IBGEApiClient.ts
import { IBGEApiClientInterface } from "@/data/protocols/http/IBGEApiClient";
import { City } from "@/domain/entities";
import axios from "axios";

export class IBGEApiClient implements IBGEApiClientInterface {
  async getCityPopulation(): Promise<Array<City>> {
    const response = await axios.get(
      `http://servicodados.ibge.gov.br/api/v1/localidades/municipios`
    );

    const result: Array<City> = response.data.map((city: any) => {
      const population = this.generateRandomPopulation();
      return new City(
        city.nome,
        population,
        city.microrregiao.mesorregiao.UF.sigla,
        city.id
      );
    });
    return result;
  }

  private generateRandomPopulation(): number {
    return Math.floor(Math.random() * 12000000);
  }
}
