import React, { useState } from "react";
import {
  IAdminActions,
  IAdminContext,
  IAdminState,
  IStore,
  ITenant,
} from "./types";

/* Types */

const AdminContext = React.createContext({} as IAdminContext);

interface Props {
  children?: JSX.Element | JSX.Element[];
  tenant: ITenant;
  store: IStore;
}

export const AdminProvider: React.FC<Props> = ({
  children,
  store: storeInitial,
  tenant: tenantInitial,
}) => {
  const [tenant, setTenant] = useState<ITenant | null>(tenantInitial);
  const [store, setStore] = useState<IStore | null>(storeInitial);
  const [loading, setLoading] = useState(false);

  const actions: IAdminActions = {};
  const state: IAdminState = { tenant, store };

  return (
    <AdminContext.Provider value={{ actions, state }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
