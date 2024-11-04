export interface TemporalEvolution {
  execute(): Promise<TemporalEvolution.Result>;
}

export namespace TemporalEvolution {
  export type Result = Array<{
    id: string;
    date: string;
    candidates: Array<Candidate>;
  }>;

  type Candidate = {
    candidateId: string;
    weightedVotes: number;
    percentage: number;
  };
}
