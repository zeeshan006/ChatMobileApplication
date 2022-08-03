import { StyleSheet, Dimensions } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Fontfamily } from "../../../../constants";
import { THEME } from "../../../../theme/index";
const window = Dimensions.get("window");

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFValue(60),
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
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  iconStyle: {
    height: IMAGE_HEIGHT,
    width: widthPixel(177),
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    alignSelf: "center",
  },
  UploadedBorder: {
    // height: "100%",
    // width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: heightPixel(40),
    marginTop: RFValue(90),
    width: 130,
    height: 130,
  },
  profileUpload: {
    height: "85%",
    width: "85%",
    // height: IMAGE_HEIGHT,
    borderRadius: 100,
    resizeMode: "contain",
    zIndex: -1,
  },
  UploadedBorderAnimate: {
    height: heightPixel(170),
    width: widthPixel(170),
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: heightPixel(40),
    marginTop: RFValue(90),
  },
  profileUploadAnimate: {
    height: 135,
    width: 135,
    borderRadius: 100,
    resizeMode: "contain",
    zIndex: -1,
  },
  textView: {
    // marginTop: windowHeight * 0.17,
    marginBottom: windowHeight * 0.05,
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
  galleryView: {
    // height: heightPixel(69),
    // width: widthPixel(69),
    marginRight: widthPixel(7),
    alignSelf: "center",
  },
  galleryBorder: {
    height: 70,
    width: 70,
    // height: "50%",
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryImage: {
    height: "85%",
    width: "85%",
    resizeMode: "contain",
    borderRadius: 100,
  },
  IconImage: {
    height: windowHeight * 0.5,
    backgroundColor: "red",
  },
  centeredView: {
    height: windowHeight * 0.52,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  galleryImages: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPixel(120),
    width: widthPixel(120),
    // opacity: 0.5,
  },
  opacity: {
    opacity: 0.5,
  },
  mainGalleryView: {
    width: "33.3%",
    margin: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: windowHeight * 0.52,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    paddingVertical: 15,
    paddingLeft: 10,
    fontFamily: Fontfamily.primaryFont,
    fontSize: 14,
    fontWeight: "500",
    color: THEME.COLORS.chosePhotoColor,
  },
  select: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: THEME.COLORS.selectCircle,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  selectText: {
    fontFamily: Fontfamily.primaryFont,
    fontSize: 10,
    fontWeight: "400",
    color: THEME.COLORS.chosePhotoColor,
  },
  unselect: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderColor: THEME.COLORS.selectCircle,
    borderWidth: 1,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
