import { Schema, models, model } from "mongoose";

const VoteSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidates",
      unique: true,
    },
    firstPlace: { type: Schema.Types.ObjectId, ref: "Candidates" },
    secondPlace: { type: Schema.Types.ObjectId, ref: "Candidates" },
    thirdPlace: { type: Schema.Types.ObjectId, ref: "Candidates" },
  },
  { timestamps: true }
);

export default models.Vote || model("Vote", VoteSchema);
