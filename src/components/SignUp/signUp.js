import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { images } from "../../constants";
const SignUp = ({ image, height, width }) => {
  return (
    <Image
      source={image}
      resizeMode="contain"
      style={{
        height: height,
        width: width,
        marginLeft: 10,
      }}
    />
  );
};

export default SignUp;
