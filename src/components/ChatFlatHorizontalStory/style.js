import { StyleSheet, Dimensions } from "react-native";
import { THEME } from "../../theme/index";
import { heightPixel, widthPixel } from "../../theme/responsive";

const style = StyleSheet.create({
  textstyle: {
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "center",
  },
  bgImg: {
    width: widthPixel(70),
    height: heightPixel(70),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: widthPixel(5),
    marginBottom: heightPixel(3),
  },
  userimg: {
    width: widthPixel(60),
    height: heightPixel(60),
    borderWidth: 2,
    resizeMode: "contain",
    zIndex: -1,
  },
});

export default style;
