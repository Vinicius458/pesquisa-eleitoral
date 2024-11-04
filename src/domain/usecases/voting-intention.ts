export interface VotingIntention {
  execute(data: VotingIntention.Params): Promise<void>;
}

export namespace VotingIntention {
  export type Params = Array<{
    id: string;
    date: string;
    cityName: string;
    state: string;
    candidate: string;
  }>;
}
