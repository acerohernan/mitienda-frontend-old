import { useRouter } from "next/router";
import React, { useState } from "react";
import { API } from "../../api";
import { LoginFormValues, SignUpFormValues } from "../../api/tenant/types";
import { getHttpError } from "../../utils/error";
import { useToast } from "../../utils/toast";
import { ITenant, ITenantActions, ITenantContext, ITenantState } from "./types";

interface Props {
  children?: JSX.Element | Array<JSX.Element>;
}

const TenantContext = React.createContext({} as ITenantContext);

export const TenantProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tenant, setTenant] = useState<ITenant | null>(null);

  const { push } = useRouter();
  const toast = useToast();

  async function signUp(data: SignUpFormValues) {
    setLoading(true);
    try {
      await API.tenant.signUp(data);
      push("/");
      toast.success("Usuario creado correctamente");
    } catch (error: any) {
      toast.error(getHttpError(error));
    }
    setLoading(false);
  }

  async function login(data: LoginFormValues) {
    setLoading(true);
    try {
      await API.tenant.login(data);
      toast.success("Bienvenido nuevamente");
      push("/admin");
    } catch (error: any) {
      toast.error(getHttpError(error));
    }
    setLoading(false);
  }

  async function logout(): Promise<void> {
    setLoading(true);
    try {
      await API.tenant.logout();
      push("/login");
    } catch (error: any) {
      toast.error("Error al cerrar sessión");
    }
    setLoading(false);
  }

  const state: ITenantState = { loading, tenant };
  const actions: ITenantActions = { signUp, login, logout };

  return (
    <TenantContext.Provider value={{ state, actions }}>
      {children}
    </TenantContext.Provider>
  );
};

export default TenantContext;
