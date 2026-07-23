"use server";

import { cookies } from "next/headers";

export const geNewAccessToken = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if(!refreshToken){
      throw new Error("User Not Logdin")
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
    method:"POST",
    headers: {
      Cookie:`accessToken=${refreshToken}`
    },
    cache:'no-cache'
  });

  const result = await res.json();
  console.log(result);
  return result;
};
