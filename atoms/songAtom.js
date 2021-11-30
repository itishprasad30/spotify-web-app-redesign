import { atom } from "recoil";

export const currentTrackIDState = atom({
  key: "currentTrackIDState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
