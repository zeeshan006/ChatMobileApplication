import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import style from "./style";
import { images } from "../../constants";
import { THEME } from "../../theme";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import NavRoutes from "../../routes/navRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Socket from "../../socket/socket";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [visivle, setVisible] = useState(false);
  const setMenu = () => {
    setVisible(!visivle);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setVisible(false);
    navigation.navigate("login");
    Socket.socket.emit("logout");
  };
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: THEME.COLORS.primaryColor,
        },
      ]}
    >
      <View
        style={[
          {
            width: "50%",
          },
        ]}
      >
        <Image source={images.defigram} style={style.iconStyle} />
      </View>
      <View
        style={[
          {
            flexDirection: "row",
            width: "50%",
            justifyContent: "flex-end",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={images.star} style={style.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("hello")}>
          <Image source={images.search} style={style.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image source={images.setting} style={style.img} />
          <Menu
            visible={visivle}
            onRequestClose={setMenu}
            style={{
              borderRadius: 10,
              backgroundColor: "#05213B",
            }}
          >
            <MenuItem
              onPress={() => {
                logout();
              }}
            >
              <View
                style={{
                  // width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // paddingHorizontal: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "normal",
                    color: "white",
                    textAlign: "center",
                    // marginLeft: 5,
                  }}
                >
                  Logout
                </Text>
              </View>
            </MenuItem>
          </Menu>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
