import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch user", error: err },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const role = req.headers.get("x-role") || "user";
  const body = await req.json();

  if ("diet" in body && role !== "nutritionist") {
    return NextResponse.json(
      { message: "Forbidden: insufficient permissions" },
      { status: 403 }
    );
  }

  try {
    const user = await User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update user", error: err },
      { status: 500 }
    );
  }
}
