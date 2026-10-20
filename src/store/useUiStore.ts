import { create } from "zustand"

interface UiState {
  navOpen: boolean
  toggleNav: () => void
  closeNav: () => void
}

/** Client-only UI state: the mobile navigation drawer. */
export const useUiStore = create<UiState>((set) => ({
  navOpen: false,
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),
  closeNav: () => set({ navOpen: false }),
}))
