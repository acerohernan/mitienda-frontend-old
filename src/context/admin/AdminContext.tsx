import React, { useState } from "react";
import { API } from "../../api";
import {
  UpdateStoreFormValues,
  UpdateStoreSocialFormValues,
} from "../../api/tenant/types";
import { getHttpError } from "../../utils/error";
import { useToast } from "../../utils/toast";
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

  const toast = useToast();

  async function updateStore(form: UpdateStoreFormValues) {
    setLoading(true);
    try {
      await API.tenant.updateStoreInformation(form);
      toast.success("La tienda fue actualizada con éxito");
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }

  async function updateStoreSocial(form: UpdateStoreSocialFormValues) {
    setLoading(true);
    try {
      await API.tenant.updateStoreSocial(form);
      toast.success("Las redes sociales fueron editadas con éxito");
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }
  const actions: IAdminActions = { updateStore, updateStoreSocial };
  const state: IAdminState = { tenant, store, loading };

  return (
    <AdminContext.Provider value={{ actions, state }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
