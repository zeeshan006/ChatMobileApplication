import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NavRoutes from "../../navRoutes";
import Wallet from "../../../screens/Wallet";

const Stack = createNativeStackNavigator();

const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavRoutes.WALLET} component={Wallet} />
    </Stack.Navigator>
  );
};

export default WalletStack;
