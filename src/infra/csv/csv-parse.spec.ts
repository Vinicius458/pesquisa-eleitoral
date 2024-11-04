import fs from "fs";
import path from "path";
import { CsvParse } from "./csv-parse"; // ajuste o caminho se necessário
import { Result } from "@/data/protocols/csv/read-csv";

const createTempCsvFile = (filePath: string, data: string) => {
  fs.writeFileSync(filePath, data);
};

const deleteTempCsvFile = (filePath: string) => {
  fs.unlinkSync(filePath);
};

describe("CsvParse Integration Test", () => {
  const csvParser = new CsvParse();
  const tempFilePath = path.join(__dirname, "temp_test_file.csv");

  beforeAll(() => {
    const csvData = `id;"DATA_PESQUISA";"MUNICÍPIO";ESTADO;INTENÇÃO DE VOTO
    1;2024-11-01;Cidade A;SP;C1
    2;2024-11-01;Cidade B;MG;C2
    3;2024-11-01;Cidade C;RJ;C1`;
    createTempCsvFile(tempFilePath, csvData);
  });

  afterAll(() => {
    deleteTempCsvFile(tempFilePath);
  });

  it("should parse CSV data correctly", async () => {
    const result: Result = await csvParser.execute(tempFilePath);

    const expectedResult: Result = [
      {
        id: "1",
        date: "2024-11-01",
        cityName: "Cidade A",
        state: "SP",
        candidate: "C1",
      },
      {
        id: "2",
        date: "2024-11-01",
        cityName: "Cidade B",
        state: "MG",
        candidate: "C2",
      },
      {
        id: "3",
        date: "2024-11-01",
        cityName: "Cidade C",
        state: "RJ",
        candidate: "C1",
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should throw an error if the file does not exist", async () => {
    await expect(csvParser.execute("non_existent_file.csv")).rejects.toThrow();
  });
});
