import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import NavRoutes from "../../navRoutes";
import Document from "../../../screens/Document";

const Stack = createNativeStackNavigator();

const DocumentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavRoutes.DOCUMENT} component={Document} />
    </Stack.Navigator>
  );
};

export default DocumentStack;
