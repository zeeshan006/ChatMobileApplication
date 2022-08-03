import { StyleSheet } from "react-native";
import { THEME } from "../../../../theme";
import Fontfamily from "../../../../constants/fontFamily";
import { heightPixel, widthPixel } from "../../../../theme/responsive";
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    resizeMode: "contain",
    height: heightPixel(188.17),
    width: widthPixel(130),
  },
  textView: {
    marginBottom: "5%",
  },
  MainText: {
    fontFamily: Fontfamily.primaryFont,
    color: THEME.COLORS.textColor,
    fontSize: 24,
    fontWeight: "600",
    paddingTop: "10%",
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
    // paddingTop: "40%",
    marginTop: heightPixel(79.34),
  },
  optView: {
    paddingVertical: 20,
    width: "80%",
    marginLeft: "5%",
    justifyContent: "center",
    alignSelf: "center",
  },
  borderStyleBase: {
    width: 40,
    height: 40,
  },
  borderStyleHighLighted: {
    backgroundColor: "#152033",
    fontFamily: Fontfamily.primaryFont,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#1A2434",
    backgroundColor: "#05213B",
    fontSize: 32,
    fontWeight: "600",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "montserrat",
  },
  alreadyAccountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    paddingVertical: 20,
  },
  forgetText: {
    fontSize: 15,
    color: THEME.COLORS.placeHolderColor,
    fontWeight: "500",
  },
});

export default style;
