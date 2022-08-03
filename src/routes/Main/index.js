import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavRoutes from "../navRoutes";
import BottomTabs from "./../Tab/Tab.routes";
// import ChatNavigators from "../../screens/Chat/ChatNavigators";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavRoutes.BOTTOM_STACK} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
