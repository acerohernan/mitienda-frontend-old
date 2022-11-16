export interface IAdminContext {
  actions: IAdminActions;
  state: IAdminState;
}

export interface IAdminActions {}

export interface IAdminState {
  tenant: ITenant | null;
  store: IStore | null;
}

export interface ITenant {
  id: string;
}

export interface IStore {
  id: string;
}
