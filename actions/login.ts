"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { db } from "@/lib/db";
import { LoginSchema } from "@/lib/validators/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  console.log(email, password, existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Nieprawidłowe dane logowania." };
  }

  try {
    console.log("trying to sign in");

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Nieprawidłowe dane logowania." };
        default:
          return { error: "Coś poszło nie tak!" };
      }
    }

    throw error;
  }
};
