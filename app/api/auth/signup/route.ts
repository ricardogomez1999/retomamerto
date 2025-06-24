import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { isValidationError } from "@/lib/isValidationError";

const SIGNUP_CODE = process.env.SIGNUP_CODE || "SECRET";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password, name, age, code } = await req.json();

  if (code !== SIGNUP_CODE) {
    return NextResponse.json(
      { message: "Invalid verification code" },
      { status: 403 }
    );
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const created = await User.create({ email, password: hashed, name, age });

    const match = await bcrypt.compare(password, hashed);

    const { password: _, ...userSafe } = created.toObject();
    return NextResponse.json(userSafe, { status: 201 });
  } catch (err: unknown) {
    if (isValidationError(err)) {
      return NextResponse.json(
        { message: "Validation Error", error: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      { status: 500 }
    );
  }
}
