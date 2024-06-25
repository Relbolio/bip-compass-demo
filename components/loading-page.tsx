import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="animate-spin text-white w-8 h-8" />
    </div>
  );
};

export default LoadingPage;
