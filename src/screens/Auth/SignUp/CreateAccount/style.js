import { StyleSheet } from "react-native";
import Fontfamily from "../../../../constants/fontFamily";
import { THEME } from "../../../../theme";
import { heightPixel, widthPixel } from "../../../../theme/responsive";
const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
  iconStyle: {
    resizeMode: "contain",
    height: heightPixel(188.17),
    width: widthPixel(130),
    resizeMode: "contain",
  },
  textView: {
    marginBottom: "5%",
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
    lineHeight: 20,
    color: THEME.COLORS.placeHolderColor,
  },
  IconImage: {
    marginVertical: "20%",
  },
  forgetBtn: {
    marginTop: "5%",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
  },
  forgetText: {
    fontFamily: Fontfamily.primaryFont,
    fontSize: 16,
    color: THEME.COLORS.textColor,
    fontWeight: "600",
    textAlign: "center",
  },
  createdBy: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  createdByView: {
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyAccountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    paddingVertical: 20,
  },
});

export default style;
