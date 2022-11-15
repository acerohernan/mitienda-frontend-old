import { BASE_URL, fecthData } from "..";
import { LoginFormValues, SignUpFormValues } from "./types";

const headers = () => ({
  "Content-Type": "application/json",
});

export const signUp = (data: SignUpFormValues) =>
  fecthData.post(`${BASE_URL}/tenant/auth/signup`, data, {
    headers: headers(),
  });

export const login = (data: LoginFormValues) =>
  fecthData.post(`/api/tenant/auth/login`, data, {
    headers: headers(),
  });
