"use client";

import { Session, SessionProvider } from "next-auth/react";

//create context and add user details

const AuthProvider = ({ children }) => {
  return <SessionProvider session={Session}>{children}</SessionProvider>;
};

export default AuthProvider;
