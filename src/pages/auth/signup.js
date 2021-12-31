/* eslint-disable @next/next/no-img-element */

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../services/axios";
import { AuthContext } from "../../contexts/AuthContext";

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const [avatarURL, setAvatarURL] = useState("");

  const showPreview = (event) => {
    if (event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);

      setAvatarURL(src);
    }
  };

  async function handleSignup(data) {

    console.log(data);

    await signUp(data);
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Cadastre-se agora
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              ou{" "}
              <Link href="/auth/signin">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  entre com uma conta existente
                </a>
              </Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleSignup)}
          >
            <div className="m-4">
              <label
                className="inline-block mb-2 text-gray-500"
                htmlFor="avatar"
              >
                Foto de perfil
              </label>
              <div className="items-center justify-center w-full">
                <div className=" flex flex-wrap justify-center">
                  <div className="relative">
                    <img
                      className="h-20 w-20 rounded-full ring-1 ring-white "
                      src={avatarURL || "https://i.pravatar.cc/"}
                      alt=""
                      htmlFor="avatar"
                    />

                    <label
                      htmlFor="avatar"
                      className="absolute bottom-0 -right-3 flex flex-col  items-center justify-center w-4 h-4 p-3 rounded-full ring-2 bg-indigo-600"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </div>
                      <input
                        type="file"
                        {...register("avatar")}
                        id="avatar"
                        name="avatar"
                        className="opacity-0"
                        accept="image/*"
                        onChange={(event) => showPreview(event)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço de E-mail"
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  {...register("username")}
                  id="name"
                  name="username"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nome"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Sua senha super secreta"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Cadastrar-se
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const { ["sinapse.token"]: token } = parseCookies(ctx);

//   if (token) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}
//   }
// };
