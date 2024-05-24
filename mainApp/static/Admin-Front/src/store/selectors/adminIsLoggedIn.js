import { selector } from "recoil";
import { adminState } from "../atoms/admin.js";

export const adminIsLoggedInState = selector({
  key: "adminIsLoggedInState",
  get: ({ get }) => {
    const admin = get(adminState);
    return admin.isLoggedIn;
  },
});
