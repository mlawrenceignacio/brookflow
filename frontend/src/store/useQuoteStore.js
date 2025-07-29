import { create } from "zustand";

const useQuoteStore = create((set) => ({
  quote: "",

  setQuote: (text) => set({ quote: text }),
}));

export default useQuoteStore;
