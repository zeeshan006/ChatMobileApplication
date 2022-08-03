import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import NavRoutes from "../../navRoutes";
import Graph from "../../../screens/Graph";

const Stack = createNativeStackNavigator();

const GraphStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavRoutes.GRAPH} component={Graph} />
    </Stack.Navigator>
  );
};

export default GraphStack;
