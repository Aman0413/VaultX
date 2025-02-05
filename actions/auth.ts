"use server";

import { LoginSchema, SignupSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const parsedData = SignupSchema.safeParse(values);

  if (!parsedData.success) {
    return { success: false, message: "Invalid format" };
  }

  const { email, password, name } = parsedData.data;

  try {
    // check user in db
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { success: false, message: "Email already in use" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return { success: false, message: "Error while signup" };
    }

    return { success: true, message: "User created" };
  } catch (error) {
    return { success: false, message: "Error while signup", error };
  }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const parsedData = LoginSchema.safeParse(values);

  if (!parsedData.success) {
    return { success: false, message: "Invalid format" };
  }

  const { email, password } = parsedData.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }

    throw error;
  }
};
