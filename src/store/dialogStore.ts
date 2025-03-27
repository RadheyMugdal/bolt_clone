import { create } from "zustand";

interface DialogStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (value: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}));
