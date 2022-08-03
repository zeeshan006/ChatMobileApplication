import { StyleSheet, Dimensions } from "react-native";
import { Fontfamily } from "../constants";
import { THEME } from "../theme/index";
const window = Dimensions.get("window");
const windowHeight = Dimensions.get("window").height;
export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    backgroundColor: "#4c69a5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffae",
  },
  iconStyle: {
    height: windowHeight * 0.27,
    width: 200,
    resizeMode: "contain",
  },
  textView: {
    marginTop: windowHeight * 0.07,
    marginBottom: windowHeight * 0.03,
    height: windowHeight * 0.1,
  },
  MainText: {
    fontFamily: Fontfamily.primaryFont,
    color: THEME.COLORS.textColor,
    fontSize: 24,
    fontWeight: "600",
  },
  detailtext: {
    fontSize: 14,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "500",
    textAlign: "center",
    color: THEME.COLORS.authtextColor,
    lineHeight: 20,
  },
  IconImage: {
    marginTop: windowHeight * 0.1,
    // marginBottom: 20,
  },
});
