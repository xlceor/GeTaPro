import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { User } from 'next-auth';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      // Aquí podrías insertar al usuario en Supabase si es necesario
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      return res.ok;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };