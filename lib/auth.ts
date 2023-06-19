import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "854863071653-2kogla3nh6d0h8ro1amnb2518irgv8rd.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
