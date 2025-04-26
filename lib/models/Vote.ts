import { Schema, models, model } from "mongoose";

const VoteSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      unique: true,
    },
    firstPlace: { type: Schema.Types.ObjectId, ref: "Candidate" },
    secondPlace: { type: Schema.Types.ObjectId, ref: "Candidate" },
    thirdPlace: { type: Schema.Types.ObjectId, ref: "Candidate" },
  },
  { timestamps: true }
);

export default models.Vote || model("Vote", VoteSchema);
