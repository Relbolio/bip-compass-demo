import AgencyForm from "@/components/forms/agency-form";
import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or create account to get back to your platform!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <>
            <LoginForm />
          </>
          {/* <AgencyForm /> */}
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/bip-logo.png" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
};

export default LoginPage;
