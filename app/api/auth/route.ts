import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/add-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        return res.ok;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },
    async session({
      session,
      token
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user && token.sub) {
        // Aseguramos que el ID del usuario esté presente
        (session.user as { id: string }).id = token.sub;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };