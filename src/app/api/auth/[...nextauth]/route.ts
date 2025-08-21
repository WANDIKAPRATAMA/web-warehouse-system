import { authOptions } from "@/lib/services/next-auth-service";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
