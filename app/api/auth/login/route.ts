import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Users from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    const user = await Users.findOne({ email }).select("+password");

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...userSafe } = user.toObject();
    return NextResponse.json(
      { message: "Login successful", user: userSafe },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: String(err) }, { status: 500 });
  }
}
