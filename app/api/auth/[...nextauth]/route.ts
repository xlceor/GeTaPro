// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth/authOptions';

console.log("Llamando a NextAuth")
console.log(process.env.NEXTAUTH_URL!)

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };