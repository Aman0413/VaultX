"use server";
import * as z from "zod";
import { prisma } from "@/lib/db";
import { PasswordSchema } from "@/schemas";
import CryptoJS from "crypto-js";

const secretKey = process.env.ENCRYPTION_SECRET!;

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

const handlePassword = (
  password: string,
  operation: "encrypt" | "decrypt" = "encrypt"
) => {
  if (operation === "encrypt") {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  } else if (operation === "decrypt") {
    const bytes = CryptoJS.AES.decrypt(password, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    throw new Error("Invalid operation. Please use 'encrypt' or 'decrypt'.");
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
