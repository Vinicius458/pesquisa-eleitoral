export interface ICronJob {
  execute(): Promise<void>;
}
