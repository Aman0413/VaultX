"use server";
import * as z from "zod";
import { prisma } from "@/lib/db";
import { PasswordSchema } from "@/schemas";
import { handlePassword } from "@/utils";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const savepassword = async (values: z.infer<typeof PasswordSchema>) => {
  const parsedData = PasswordSchema.safeParse(values);

  if (!parsedData.success) {
    return { success: false, message: "Invalid format" };
  }

  const { userId, siteName, siteURL, password, username } = parsedData.data;

  const encryptPassword = handlePassword(password, "encrypt");

  try {
    // fetch userId based on email
    const user = await prisma.user.findFirst({
      where: {
        email: userId,
      },
    });

    if (!user) {
      return { success: false, message: "user not fount" };
    }

    const data = await prisma.password.create({
      data: {
        userId: user?.id,
        siteName,
        siteURL,
        username,
        password: encryptPassword,
      },
    });

    if (!data) {
      return { success: false, message: "Error file saving credentails" };
    }

    return {
      success: true,
      message: "Credentails saved",
    };
  } catch (error) {
    return { success: false, message: "Error while saving credentails", error };
  }
};

export const allCredentails = async (email: string) => {
  try {
    if (email === "" || email === undefined || !email) {
      return { success: false, message: "Please provide email", data: [] };
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "No user found", data: [] };
    }

    const credentials = await prisma.password.findMany({
      where: {
        userId: user?.id,
      },
    });

    if (!credentials) {
      return { success: false, message: "No credentails found", data: [] };
    }
    return { success: true, message: " credentails found", data: credentials };
  } catch (error) {
    return { success: false, message: "No Credentails", error, data: [] };
  }
};

export const updateCredentails = async (
  id: string,
  values: z.infer<typeof PasswordSchema>,
  userId: string
) => {
  try {
    if (!id) {
      return { success: false, message: "Id is required" };
    }
    const parsedData = PasswordSchema.safeParse(values);

    if (!parsedData.success) {
      return { success: false, message: "Invalid format" };
    }

    const credentails = await prisma.password.update({
      where: {
        id: id,
      },
      data: {
        userId: userId,
        siteName: parsedData.data.siteName,
        siteURL: parsedData.data.siteURL,
        username: parsedData.data.username,
        password: parsedData.data.password,
      },
    });

    return { success: true, message: "Updated", credentails };
  } catch (error) {
    return { success: false, message: "user not fount", error };
  }
};
