import { StyleSheet, Dimensions } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Fontfamily } from "../../../../constants";
import { THEME } from "../../../../theme/index";
const window = Dimensions.get("window");

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 3;

export default StyleSheet.create({
  container: {
    // backgroundColor: "#4c69a5",
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: RFValue(60),
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    // marginVertical: 5,
    marginTop: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    marginBottom: 20,
    padding: 10,
    // marginTop: 90,
    alignSelf: "center",
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffae",
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
  },
});
