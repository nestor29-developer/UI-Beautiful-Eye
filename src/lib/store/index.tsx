import { create } from "zustand";

export const useQuickAddition = create((set) => ({
  quickAddition: null,
  setQuickAddition: (data: any) => set(() => ({ quickAddition: data })),
}));

export const useProductsBuyCarSidebar = create((set) => ({
  productsBuyCarSidebar: [],
  setProductsBuyCarSidebar: (data: any) =>
    set(() => ({ productsBuyCarSidebar: data })),
}));

export const useCalculateForwardedFree = create((set) => ({
  calculateForwardedFree: false,
  setCalculateForwardedFree: (calculate: boolean) =>
    set(() => ({ calculateForwardedFree: calculate })),
}));

export const useShouldUpdateCarIems = create((set) => ({
  shouldUpdateCarItems: false,
  setShouldUpdateCarItems: (update: boolean) =>
    set(() => ({ shouldUpdateCarItems: update })),
}));
