'use server'
import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/subcription/status`, {
    headers: {
      Authorization: `${accessToken}`,
    }
  });

  const result = await res.json();

  return result;
};
