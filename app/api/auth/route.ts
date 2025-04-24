// app/api/auth/route.ts

import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth/authOptions';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };