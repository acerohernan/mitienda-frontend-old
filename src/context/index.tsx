import React from "react";
import { TenantProvider } from "./tenant/TenantContext";

interface Props {
  children?: JSX.Element | Array<JSX.Element>;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  return <TenantProvider>{children}</TenantProvider>;
};
