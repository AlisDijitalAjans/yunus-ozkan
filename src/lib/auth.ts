import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock user — ileride Turso SQLite ile değiştirilecek
        if (
          credentials?.email === "reklam@alisdijital.com" &&
          credentials?.password === "123123"
        ) {
          return {
            id: "1",
            name: "Alis Dijital",
            email: "reklam@alisdijital.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "yunus-ozkan-insaat-secret-key-dev",
};
