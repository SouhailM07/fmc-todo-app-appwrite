import { create } from "zustand";

const myStore = create((set) => ({
  notes: [""],
  updateNotes: (listOfNotes) => set(() => ({ notes: listOfNotes })),
}));

export default myStore;
