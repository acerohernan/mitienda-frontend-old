import {
  UpdateStoreFormValues,
  UpdateStoreSocialFormValues,
} from "../../api/tenant/types";

export interface IAdminContext {
  actions: IAdminActions;
  state: IAdminState;
}

export interface IAdminActions {
  updateStore: (form: UpdateStoreFormValues) => Promise<void>;
  updateStoreSocial: (form: UpdateStoreSocialFormValues) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
}

export interface IAdminState {
  tenant: ITenant | null;
  store: IStore | null;
  loading: boolean;
}

export interface ITenant {
  id: string;
  store_id: string;
  status: number;
  expiration_date: Date;
  email: string;
  phone: string;
  name: string | null;
  surname: string | null;
  country: string;
}

export interface IStore {
  id: string;
  tenant_id: string;
  name: string;
  domain: string;
  whatsapp: string;
  telephone: string;
  category: string;
  country: string;
  currency: string;
  logo_img: string | null;
  banner_img: string | null;
  description: string | null;
  team_img: string | null;
  team_description: string | null;
  social: {
    facebook: string | null;
    instagram: string | null;
    pinterest: string | null;
    twitter: string | null;
    tiktok: string | null;
    youtube: string | null;
  };
}
