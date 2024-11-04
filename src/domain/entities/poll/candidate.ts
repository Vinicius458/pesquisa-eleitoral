export class Candidate {
  constructor(
    public readonly candidateId: string,
    public weightedVotes: number,
    public percentage: number
  ) {}
}
