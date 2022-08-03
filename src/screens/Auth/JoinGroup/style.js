import { StyleSheet, Dimensions } from "react-native";
import Fontfamily from "../../../constants/fontFamily";
import { THEME } from "../../../theme/index";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    height: windowHeight * 0.23,
    marginBottom: windowHeight * 0.03,
  },
  MainText: {
    fontFamily: Fontfamily.primaryFont,
    color: THEME.COLORS.textColor,
    fontSize: 24,
    fontWeight: "600",
  },
  detailtext: {
    color: THEME.COLORS.authtextColor,
    fontSize: 14,
    fontFamily: Fontfamily.primaryFont,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
  IconImage: {
    height: windowHeight * 0.5,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  createdByView: {
    justifyContent: "center",
    alignItems: "center",
  },

  selectBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "#49495366",
    borderBottomWidth: 1,
  },
  flatListUsername: {
    fontSize: 14,
    paddingLeft: 15,
    lineHeight: 25,
    fontWeight: "400",
    color: "#BBBCBD",
    fontFamily: Fontfamily.primaryFont,
  },
  member: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 15,
    color: "#BBBCBD",
    fontFamily: Fontfamily.primaryFont,
  },
  counterView: {
    marginBottom: 2,
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "red",
  },
  ProfileImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  flatListbtn: {
    width: "90%",
    // justifyContent: 'center',
    // alignSelf: 'center',
    flexDirection: "row",
    // marginBottom: '5%',
  },
  selectBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "#49495366",
    borderBottomWidth: 1,
  },
  flatListUsername: {
    fontSize: 14,
    paddingLeft: 15,
    lineHeight: 25,
    fontWeight: "400",
    color: "#BBBCBD",
    fontFamily: Fontfamily.primaryFont,
  },
  member: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 15,
    color: "#BBBCBD",
    fontFamily: Fontfamily.primaryFont,
  },
  counterView: {
    marginBottom: 2,
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "red",
  },
});

export default style;
