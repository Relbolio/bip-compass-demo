import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#313338] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default layout;
