import { ReadCsv, Result } from "@/data/protocols/csv/read-csv";
import { createReadStream } from "fs";
import csvParser from "csv-parser";
export class CsvParse implements ReadCsv {
  constructor() {}
  async execute(filePath: string): Promise<Result> {
    return new Promise((resolve, reject) => {
      const results: Result = [];

      createReadStream(filePath)
        .on("error", (error) => {
          reject(error);
        })
        .pipe(csvParser({ separator: ";" }))
        .on("data", (data) => {
          let idArray = Object.keys(data).map((poll) => [poll, data[poll]])[0];
          const id = idArray[1].trim();
          const item = {
            id,
            date: data["DATA_PESQUISA"],
            cityName: data["MUNICÍPIO"],
            state: data["ESTADO"],
            candidate: data["INTENÇÃO DE VOTO"],
          };
          results.push(item);
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
