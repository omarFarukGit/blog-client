"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginSate = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (privState: LoginSate, formData: FormData) => {
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookiStore = await cookies();

    cookiStore.set("accessToken", result.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookiStore.set("refreshToken", result.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    redirect("/dashboard"); //server
  }

  console.log(result);

  return result;
};
