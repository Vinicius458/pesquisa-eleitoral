import mongoose, { Schema } from "mongoose";

export interface CandidateDocument {
  candidateId: string;
  weightedVotes: number;
  percentage: number;
}

// Interface for the Poll
export interface PollDocument {
  _id: string;
  date: string;
  candidates: CandidateDocument[];
}

const candidateSchema = new Schema<CandidateDocument>(
  {
    candidateId: { type: String, required: true },
    weightedVotes: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const pollSchema = new Schema<PollDocument>({
  _id: { type: String, required: true },
  date: { type: String, required: true },
  candidates: [candidateSchema],
});

// Create the model for MongoDB
export const PollModel = mongoose.model("Poll", pollSchema);
