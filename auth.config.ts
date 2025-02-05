import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./actions/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedData = LoginSchema.safeParse(credentials);
        if (parsedData.success) {
          const { email, password } = parsedData.data;

          const user = await getUserByEmail(email);

          // if user use github or google signin that's why !user.password
          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
