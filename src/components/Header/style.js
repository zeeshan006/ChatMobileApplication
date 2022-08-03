import { StyleSheet } from "react-native";
import { Fontfamily } from "../../constants";
import { THEME } from "../../theme/index";
import { heightPixel, widthPixel } from "../../theme/responsive";

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },

   iconStyle: {
      height: heightPixel(60),
      width: widthPixel(160),
   },
   textView: {
      marginBottom: "5%",
   },
   img: {
      width: widthPixel(19),
      height: heightPixel(19),
      resizeMode: "contain",
      marginRight: "15%",
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
});

export default style;
