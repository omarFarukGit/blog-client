import { cookies } from "next/headers";

export const getPremiumNews = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();

  return result;
};
