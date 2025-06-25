import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    photo: String,
    age: Number,
    sex: String,
    height: Number,
    currentWeight: Number,
    targetWeight: Number,
    weightHistory: [
      {
        weight: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    diet: String,
    gymRoutine: String,
    role: { type: String, enum: ["user", "nutritionist"], default: "user" },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
