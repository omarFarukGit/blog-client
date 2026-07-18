import React from "react";
import LogingForm from "../_components/logingForm";

const LogingPage = () => {
  return (
    <>
      <div className=" flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-4 shadow-lg">
          {/* From Text  */}
          <div className=" space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* From  */}
          <LogingForm />
        </div>
      </div>
    </>
  );
};

export default LogingPage;
