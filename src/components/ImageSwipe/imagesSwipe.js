import { matchesProperty } from "lodash";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
   View,
   Text,
   Image,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
   Dimensions,
   Modal,
} from "react-native";
import FastImage from "react-native-fast-image";
import { FlatList } from "react-native-gesture-handler";
import { createImageProgress } from "react-native-image-progress";

const Swipeimages = ({ route, navigation }) => {
   const { uniqueArr, index } = route?.params;
   const indexd = index;
   const Imageprogress = createImageProgress(FastImage);
   const windowWidth = Dimensions.get("window").width;
   const widnowHeight = Dimensions.get("window").height;
   console.log("index", indexd);

   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <FlatList
            horizontal
            pagingEnabled
            // decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={indexd}
            getItemLayout={(uniqueArr, index) => ({
               length: windowWidth,
               offset: windowWidth * index,
               index,
            })}
            data={uniqueArr}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
               return (
                  <View
                     style={{
                        flex: 1,
                        // marginHorizontal: 1,
                        // justifyContent: "center",
                        // alignItems: "center",
                        // height: "90%",
                        // alignSelf: "center",
                        width: windowWidth,
                     }}
                  >
                     <Imageprogress
                        indicator={<ActivityIndicator></ActivityIndicator>}
                        source={{
                           uri: item?.attatchment,
                           priority: FastImage.priority.high,
                        }}
                        resizeMode="cover"
                        style={{
                           height: "100%",
                           width: windowWidth,
                        }}
                     ></Imageprogress>
                  </View>
               );
            }}
         />
      </View>
   );
};

export default Swipeimages;
