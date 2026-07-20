"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if(!accessToken){
      throw new Error("User Not Logdin")
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      //1 Authorization:accessToken as unknown as string
      Authorization: `${accessToken}`,
      // 3 Authorization:`Bearer ${accessToken}`

      // Cookie:`accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1day
      tags: ["my-profiles"],
    },
  });

  const result = res.json();
  console.log(result);
  return result;
};
