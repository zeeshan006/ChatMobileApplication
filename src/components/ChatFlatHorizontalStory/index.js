import React, { useState } from "react";
import { View, Text, FlatList, Image, ImageBackground } from "react-native";
import { heightPixel } from "../../theme/responsive";
import { images } from "../../constants";
import style from "./style";
import GLOBAL_STYLE from "../../theme/global";
const ChatFlatHorizontalStory = () => {
   const [image, setimages] = useState([
      {
         id: 1,
         img: images.story1,
      },
      {
         id: 2,
         img: images.story2,
         name: "Wisteria",
      },
      {
         id: 3,
         img: images.story3,
         name: "Fleece",
      },
      {
         id: 4,
         img: images.story4,
         name: "Hilary",
      },
      {
         id: 5,
         img: images.story1,
         name: "Parsley",
      },
      {
         id: 6,
         img: images.story2,
         name: "Wisteria",
      },
   ]);
   return (
      <>
         <View
            style={{
               height: heightPixel(110),
               paddingLeft: "3%",
            }}
         >
            <FlatList
               horizontal={true}
               showsHorizontalScrollIndicator={false}
               data={image}
               renderItem={({ item, index }) => (
                  <View
                     style={{
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        // margin: 3,
                        height: heightPixel(120),
                     }}
                  >
                     <ImageBackground
                        source={images.galleryBorder}
                        resizeMode="contain"
                        style={style.bgImg}
                     >
                        <Image
                           source={item?.img}
                           key={index}
                           style={style.userimg}
                        />
                     </ImageBackground>
                     {item?.id == 1 ? (
                        <Text style={style.textstyle}>Your Story</Text>
                     ) : (
                        <View
                           style={{
                              paddingHorizontal: "2%",
                              alignItems: "center",
                           }}
                        >
                           <Text style={style.textstyle}>{item?.name}</Text>
                        </View>
                     )}
                  </View>
               )}
            />
         </View>
      </>
   );
};

export default ChatFlatHorizontalStory;
