import { ResetForm } from "@/components/auth/reset-form";
import Image from "next/image";

const ResetPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Reset your Password
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Reset your pasword and Login again!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ResetForm />
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/bip-logo.png" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
};

export default ResetPage;
