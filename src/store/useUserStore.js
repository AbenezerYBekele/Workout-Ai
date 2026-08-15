//// store/useUserStore.js
//import { create } from 'zustand';
//
//export const useUserStore = create((set) => ({
//  userProfile: null,
//  setUserProfile: (profile) => set({ userProfile: profile }),
//  clearUserProfile: () => set({ userProfile: null }),
//}));
// store/useUserStore.js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  clearUserProfile: () => set({ userProfile: null }),
}));