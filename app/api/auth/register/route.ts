import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/validators/user";
//@ts-ignore
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const { name, email, password } = RegisterSchema.parse(body);

    const exist = await db.user.findFirst({ where: { email } });

    if (exist)
      return new NextResponse("Podany email został już wykorzystany.", {
        status: 400,
      });

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Uzupełnij wszystkie pola formularza.", {
        status: 400,
      });
    }
    console.log(error);
    return new NextResponse(
      "Wystąpił nieznany błąd. Skontaktuj się z administratorem strony w celu wyjaśnienia.",
      { status: 500 },
    );
  }
}
