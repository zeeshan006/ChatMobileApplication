import { THEME } from "./index";

export const ColorTheme = (e) => {
  return {
    //  color: e ? THEME.COLORS : THEME.LightTHEME,
    color: e ? THEME.LightTHEME : THEME.COLORS,
  };
};
