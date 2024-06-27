import { Agency, Category, SubAccount, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createAgency"
  | "deleteAgency"
  | "createSubaccount"
  | "deleteSubaccount"
  | "deleteUser"
  | "createTeamMember"
  | "editUser"
  | "createCategory"
  | "createVariantTypes"
  | "deleteVariantTypes"
  | "deleteCategory"
  | "createProduct";

export interface ModalData {
  agency?: Partial<Agency>;
  accountType?: "agency" | "subaccount";
  subaccount?: Partial<SubAccount>;
  subaccounts?: Partial<SubAccount>[];
  userId?: string;
  userName?: string;
  user?: User;
  variantType?: "size" | "color" | "volume";
  variantTypeId?: string;
  category?: Partial<Category>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setData: (data: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  setData: (data) => set({ data }),
}));
