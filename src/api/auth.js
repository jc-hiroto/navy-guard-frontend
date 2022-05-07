import instance from "./axios";

const getAccessToken = async (user_id, password) => {
  const response = await instance.post("/auth", {
    _id: user_id,
    password: password
  });
  return response.data;
}

const checkAccessToken = async (access_token) => {
  const response = await instance.get("/auth", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return response.data;
}

export { getAccessToken, checkAccessToken };
