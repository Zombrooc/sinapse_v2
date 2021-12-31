import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { getAPIClient } from "../services/axios";

import {
  recoverUserInformation,
  signInRequest,
  signUpRequest,
} from "../services/auth";
import api from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "sinapse.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }) {
    const response = await signInRequest({
      email,
      password,
    });

    if (
      response?.token !== undefined &&
      response?.user !== undefined &&
      response?.user.id !== undefined
    ) {
      setCookie(undefined, "sinapse.token", token, {
        maxAge: 60 * 60 * 1,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user);

      Router.push("/dashboard", "/dashboard");
    } else if (response?.error) {
      console.log(response.error);

      Router.push(
        `/auth/signin?error=true&message=${response.message}`,
        `/auth/signin?error=true&message=${response.message}`
      );

      window.location.pathname = `/auth/signin?error=true&message=${response.message}`;

      // return response.error;
    }
  }

  async function signUp({ username, email, password }) {
    await signUpRequest({
      email,
      password,
      username,
    });

    Router.push("/auth/signin");
  }

  async function logOut() {
    await api.post("/users/logout");

    setUser(null);
    setCookie(undefined, "sinapse.token", "", {
      maxAge: 0,
    });
    Router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
