import { BASE_URL, fecthData } from "..";
import {
  LoginFormValues,
  SignUpFormValues,
  UpdateStoreFormValues,
  UpdateStoreSocialFormValues,
} from "./types";

export const signUp = (data: SignUpFormValues) =>
  fecthData.post(`${BASE_URL}/tenant/auth/signup`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const login = (data: LoginFormValues) =>
  fecthData.post(`/api/tenant/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const logout = () => fecthData.delete(`/api/tenant/auth/logout`);

export const getInformation = (token: string) =>
  fecthData.get(`${BASE_URL}/tenant/information`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getStoreInformation = (token: string) =>
  fecthData.get(`${BASE_URL}/tenant/store/information`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getStoreSocialInformation = (token: string) =>
  fecthData.get(`${BASE_URL}/tenant/store/social`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const updateStoreInformation = (form: UpdateStoreFormValues) =>
  fecthData.put(`/api/tenant/store/information`, form);

export const updateStoreSocial = (form: UpdateStoreSocialFormValues) =>
  fecthData.put(`/api/tenant/store/social`, form);
