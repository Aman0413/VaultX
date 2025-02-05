import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const PasswordSchema = z.object({
  userId: z.string().cuid({ message: "Invalid user ID format" }),
  siteName: z
    .string()
    .min(2, { message: "Website name must be at least 2 characters long" }),
  siteURL: z
    .string()
    .url({ message: "Invalid website URL" })
    .min(2, { message: "Website name must be at least 2 characters long" })
    .optional(),
  username: z
    .string()
    .min(1, { message: "Username must be at least 1 characters long" }),
  password: z.string(),
});
