import React from "react";
import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../CustomDrawerContent/index";
import DrawerStack from "../DrawerStack/index";
import ChatNavigators from "../../Chat/ChatNavigators/index";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          sceneContainerStyle: {
            backgroundColor: "red",
          },
        }}
      >
        <Drawer.Screen
          name="DrawerStack"
          component={ChatNavigators}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
