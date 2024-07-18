import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
  },
  
})