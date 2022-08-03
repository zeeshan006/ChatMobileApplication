import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";
function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const DrawerStack = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen name="Feed" component={Feed} />
      {/* <Stack.Screen name="Notification" component={Notifications} /> */}
    </Stack.Navigator>
  );
};

export default DrawerStack;
