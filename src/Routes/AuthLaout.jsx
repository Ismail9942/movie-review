import React from "react";
import { Outlet } from "react-router-dom";

const AuthLaout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLaout;
