// /app/lib/auth/getCurrentUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}