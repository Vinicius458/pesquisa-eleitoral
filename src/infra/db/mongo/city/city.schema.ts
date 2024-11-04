import mongoose, { Schema, Document } from "mongoose";

export interface CityDocument extends Document {
  _id: string;
  name: string;
  state: string;
  population: number;
  group: number;
  updatedAt: Date;
}

const CitySchema = new Schema<CityDocument>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  population: { type: Number, required: true },
  group: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const CityModel = mongoose.model<CityDocument>("City", CitySchema);
