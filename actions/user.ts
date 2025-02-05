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
    // const data = await prisma.password.create({
    //   data: {
    //     userId,
    //     siteName,
    //     siteURL,
    //     username,
    //     password: encryptPassword,
    //   },
    // });

    // if (!data) {
    //   return { success: false, message: "Error file saving credentails" };
    // }

    return {
      success: true,
      message: "Credentails saved",
      parsedData,
      encryptPassword,
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
