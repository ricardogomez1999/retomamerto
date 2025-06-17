import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { isValidationError } from "@/lib/isValidationError";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const created = await User.create(body);
    return NextResponse.json(created, { status: 201 });
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
