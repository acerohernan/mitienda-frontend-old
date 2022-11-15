import { LoginFormValues, SignUpFormValues } from "../../api/tenant/types";

export interface ITenantState {
  loading: boolean;
  tenant: ITenant | null;
}

export interface ITenantActions {
  signUp: (data: SignUpFormValues) => Promise<void>;
  login: (data: LoginFormValues) => Promise<void>;
}

export interface ITenantContext {
  state: ITenantState;
  actions: ITenantActions;
}

export interface ITenant {
  id: string;
}
