// styles.js

import { Dimensions, StyleSheet } from "react-native";

const imageWidth = Dimensions.get("window").width / 2;

const styles = StyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,

  container: {
    alignItems: "center",
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "$largeContainerSize",
    height: "$largeContainerSize",
  },
  backgroundImage: {
    // <- new
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  logo: {
    width: "$largeImageSize",
  },
  text: {
    fontWeight: "600",
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    color: "$white",
  },
});

export default styles;
