import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";
import { LoginRequest } from "./use-login";

export type RegisterRequest = {
  name: string;
} & LoginRequest;

export default function useRegister() {
  const createUser = useCallback(async (req: RegisterRequest) => {
    const register = await ky.post(
      "https://forum-api.dicoding.dev/v1/register",
      {
        json : req,
      }
    );
    return await register.json();
  }, []);

  const { mutate: register } = useMutation({
    mutationFn: createUser,
  });

  return { register };
}
