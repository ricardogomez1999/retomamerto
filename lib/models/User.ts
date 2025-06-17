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
    diet: String,
    gymRoutine: String,
    role: { type: String, enum: ["user", "nutritionist"], default: "user" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = await import("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default models.User || model("User", UserSchema);
