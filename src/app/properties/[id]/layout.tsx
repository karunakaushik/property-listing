import React, { ReactNode } from "react";

function Layout({ children }: { children?: ReactNode }) {
  return <div className="w-full flex p-4 justify-center">{children}</div>;
}

export default Layout;
