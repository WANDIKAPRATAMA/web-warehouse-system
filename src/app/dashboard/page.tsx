import { authOptions } from "@/lib/services/next-auth-service";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ Page ~ session:", session);
  return <>Succes on Dashboard Page</>;
}
