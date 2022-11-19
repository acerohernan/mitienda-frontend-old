export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  phone: string;
  country_code: string;
}

export interface UpdateInformationFormValues {
  phone?: string;
  name?: string;
  surname?: string;
}

export interface UpdateStoreFormValues {
  name?: string;
  whatsapp?: string;
  telephone?: string;
  category?: string;
  country?: string;
  currency?: string;
  logo_img?: string | null;
  banner_img?: string | null;
  description?: string | null;
  team_img?: string | null;
  team_description?: string | null;
}

export interface UpdateStoreSocialFormValues {
  facebook?: string | null;
  instagram?: string | null;
  pinterest?: string | null;
  twitter?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
}
