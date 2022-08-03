import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
} from "react-native";
import { images } from "../../constants";
import LinearGradient from "react-native-linear-gradient";

const ErrorModal = ({ visible, errorMesssage, close }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <Pressable onPress={() => close()} style={styles.centeredView}>
        <ImageBackground
          source={images.errorBorder}
          resizeMode="contain"
          style={
            {
              //  width: "85%",
              // height: 200,
              // width: 200,
            }
          }
        >
          <View style={styles.modalView}>
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", fontFamily: "montserrat" },
              ]}
            >
              Alert
            </Text>
            <View style={{ margin: "10%" }}>
              <Text style={[styles.errorMessage]}>{errorMesssage}</Text>
            </View>

            <View
              style={{
                // justifyContent: "flex-end",
                alignItems: "flex-end",
                // marginTop: 20,
              }}
            >
              <View
                style={{
                  // flexDirection: "row",
                  alignItems: "center",
                  // alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
                <Pressable onPress={() => close()} style={styles.closeBtn}>
                  <Text style={styles.closeText}>CANCEL</Text>
                </Pressable>
                <LinearGradient
                  colors={["#36C5FA", "#A96CFF", "#A96CFF"]}
                  style={styles.closeBtn}
                  start={{ y: 0.0, x: 0.0 }}
                  end={{ y: 0.0, x: 1.0 }}
                >
                  <Pressable onPress={() => close()} style={{}}>
                    <Text style={styles.closeText}>OK</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    paddingHorizontal: "15%",
    paddingVertical: "20%",
  },
  modalText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  closeBtn: {
    // backgroundColor: "#01182A",
    borderRadius: 100,
    padding: "5%",
    width: "45%",
    // alignSelf: "flex-end",
    marginTop: "10%",
  },
  errorMessage: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    fontWeight: "normal",
    fontFamily: "montserrat",
  },
  closeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    fontFamily: "montserrat",
  },
});
