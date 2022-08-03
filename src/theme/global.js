import { StyleSheet } from "react-native";
import { THEME } from "./index";

const GLOBAL_STYLE = StyleSheet.create({
  CENTER: {
    justifyContent: "center",
    alignItems: "center",
  },
  MAIN: {
    flex: 1,
    backgroundColor: "#01182A",
  },
  ROW: {
    flexDirection: "row",
  },
  FLEX: {
    flex: 1,
  },
});

export default GLOBAL_STYLE;
