import { Schema, models, model } from "mongoose";

const CandidateSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    photo: String,
    description: String,
  },
  { timestamps: true }
);

export default models.Candidate || model("Candidate", CandidateSchema);
