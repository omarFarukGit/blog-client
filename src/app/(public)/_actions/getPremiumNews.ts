"use server";
import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const searchTerm = `${query?.searchTerm ? `?searchTerm=${query.searchTerm}` : ""}`;
  // const params = new URLSearchParams();
  // if (query && query.searchTerm) {
  //   params.set("searchTerm", query.searchTerm as string);
  // }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/premium${searchTerm}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },

      // cache: "force-cache",
      // next: {
      //   revalidate: 60 * 60 * 24,
      //   tags: ["premium-posts"],
      // },
    },
  );

  const result = await res.json();
  console.log(result, "pre");

  return result;
};
