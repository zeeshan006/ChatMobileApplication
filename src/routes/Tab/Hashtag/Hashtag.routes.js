import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NavRoutes from "../../navRoutes";
import Hashtag from "../../../screens/Hashtag";

const Stack = createNativeStackNavigator();

const HashtagStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={NavRoutes.HASHTAG} component={Hashtag} />
    </Stack.Navigator>
  );
};

export default HashtagStack;
