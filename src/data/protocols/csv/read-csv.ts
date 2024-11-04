export interface ReadCsv {
  execute(filePath: string): Promise<Result>;
}

export type Result = Array<{
  id: string;
  date: string;
  cityName: string;
  state: string;
  candidate: string;
}>;
