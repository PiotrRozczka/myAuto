"use server";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/lib/validators/user";
import { z } from "zod";
//@ts-ignore
import bcrypt from "bcryptjs";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const { name, email, password } = RegisterSchema.parse(values);

  try {
    const exist = await db.user.findFirst({ where: { email } });

    if (exist) {
      return { error: "Email already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Fill out all form fields." };
    }

    return {
      error:
        "Unknown error occurred. Contact the site administrator for clarification.",
    };
  }
};
