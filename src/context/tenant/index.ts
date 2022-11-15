import React from "react";
import TenantContext from "./TenantContext";

export { default } from "./TenantContext";

/* Hooks */
export const useTenantContext = () => React.useContext(TenantContext);
