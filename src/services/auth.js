import api from "./api";

export async function signInRequest(data) {
  console.log(data);

  const response = await api.post("/users/authenticate", data);

  if (response.data.token && response.data.user && response.data.user.id) {
    return {
      user: {
        ...response.data.user,
      },
      token: response.data.token.token,
    };
  } else {
    return response.data.error;
  }
}

export async function signUpRequest(data) {
  const response = await api.post("/users", data);

  return {
    user: {
      ...response.data.user,
    },
  };
}

export async function recoverUserInformation() {
  const userData = await api.get("/users");

  return {
    user: {
      ...userData.data,
    },
  };
}
