import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button fontfamily="Arial" type="submit" class="hover:bg-gray-600 rounded-md text-xl pt-3 pr-3 pb-3 pl-3
  bg-gray-800 font-semibold text-white w-full text-center" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;