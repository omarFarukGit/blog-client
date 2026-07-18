"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LogingForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "user login successfully");
    }
    if (!state.success) {
      toast.error("login faild");
    }
  }, [state]);
  return (
    <form action={action} className="space-y-4">
      <Card className=" p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter your Email"
          required
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        ></Input>
        <Button type="submit">{pending ? "submiting.." : "login"}</Button>
      </Card>
    </form>
  );
};

export default LogingForm;
