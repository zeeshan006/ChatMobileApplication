import { StyleSheet, Dimensions } from "react-native";
import Fontfamily from "../../../constants/fontFamily";
import { THEME } from "../../../theme";
import { RFValue } from "react-native-responsive-fontsize";
const window = Dimensions.get("window");

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 5,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    // marginBottom: 30,
    padding: 10,
    marginTop: 90,
    alignSelf: "center",
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffae",
    marginTop: 2,
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
    lineHeight: 23,
    color: THEME.COLORS.placeHolderColor,
  },
  textView: {
    marginBottom: "5%",
    marginTop: 30,
  },
  forgetBtn: {
    marginTop: window.height * 0.02,
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  forgetText: {
    fontFamily: Fontfamily.primaryFont,
    fontSize: 14,
    color: THEME.COLORS.textColor,
    fontWeight: "600",
    textAlign: "center",
  },
  alreadyAccountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: window.height * 0.02,
    // paddingVertical: 20,
  },
});
