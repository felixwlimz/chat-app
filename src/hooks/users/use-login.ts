import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export type LoginRequest = {
  email : string 
  password : string 
}

export default function useLogin() {

  const loginUser = useCallback(
    async (req: LoginRequest) => {
      const login = await ky.post("https://forum-api.dicoding.dev/v1/login", {
        json : req,
      });
      return await login.json();
    },
    []
  );

  const {
    mutate: loginMutate,
  } = useMutation({
    mutationFn: loginUser,
  });

  return { loginMutate };
}
