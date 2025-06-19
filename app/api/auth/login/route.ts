import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Users from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no valido" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      { status: 500 }
    );
  }
}
