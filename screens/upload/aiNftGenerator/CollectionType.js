import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, ImageBackground, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';
import { Path, Rect, Svg } from 'react-native-svg';

var width = Dimensions.get('window').width - 40;
var collectionWidth = (Dimensions.get('window').width / 2) - 20;

const svgplus = <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect y="-0.00012207" width="48" height="48" rx="24" fill="#9B51E0" fillOpacity="0.3"/>
<Path fillRule="evenodd" clip-rule="evenodd" d="M22.7778 34.9994C22.7778 35.6743 23.325 36.2215 24 36.2215C24.675 36.2215 25.2222 35.6743 25.2222 34.9994V25.2222H34.9994C35.6744 25.2222 36.2216 24.675 36.2216 24C36.2216 23.3251 35.6744 22.7779 34.9994 22.7779H25.2222L25.2222 13.0004C25.2222 12.3254 24.675 11.7782 24 11.7782C23.325 11.7782 22.7778 12.3254 22.7778 13.0004L22.7778 22.7779L13.0004 22.7779C12.3254 22.7779 11.7783 23.3251 11.7783 24C11.7783 24.675 12.3254 25.2222 13.0004 25.2222L22.7778 25.2222L22.7778 34.9994Z" fill="#9B51E0"/>
</Svg>


const CollectionType = ({collectionType, setCollectionType}) => {

  const [error, setError] = useState('');
  const [posts, setPosts] = useState();
  const [limit, setLimit] = useState('');
  const collectionImg1 = require('../../../assets/Images/cartoon.jpg');
  const collectionImg2 = require('../../../assets/Images/realistic.jpg');
  const collectionImg3 = require('../../../assets/Images/anime.jpg');
  const collectionImg5 = require('../../../assets/Images/coming-soon-more.jpg');

  const handleSelectCollection = (col) => {
    setCollectionType(col)
  }
  const collectionTypeInner = [ 
      {name:"MidJourney PaperCut", code:"midjourney-papercut", image: require("../../../assets/Models/model-2.jpg")}, 
      {name:"Realistic Vision V1.3", code:"realistic-vision-v13", image: require("../../../assets/Models/model-3.jpg")}, 
      {name:"Dream Shaper", code:"dream-shaper-8797", image: require("../../../assets/Models/model-4.jpg")}, 
      {name:"SynthwavePunk", code:"synthwave-diffusion", image: require("../../../assets/Models/model-5.jpg")}, 
      {name:"Anything V5", code:"anything-v5", image: require("../../../assets/Models/model-6.jpg")}, 
      {name:"IconsMI V5", code:"icons-diffusion", image: require("../../../assets/Models/model-7.jpg")}, 
      {name:"Mo Di Diffusion", code:"mo-di-diffusion", image: require("../../../assets/Models/model-8.jpg")}, 
      {name:"Night Diffusion", code:"night-diffusion", image: require("../../../assets/Models/model-9.jpg")}, 
      {name:"wand-ducstyle", code:"wand-ducstyle", image: require("../../../assets/Models/model-10.jpg")}, 
      
    ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Select AI model</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {collectionTypeInner.map((x, index) => (
          <Pressable key={index} style={[styles.selectedCollection, collectionType === x.code ? null : styles.active]} onPress={() => handleSelectCollection(x.code)}>
               <View style={styles.greenContainer}>
                   <ImageBackground source={x.image} resizeMode="cover" style={styles.imageCover}>
                     <Text style={styles.listTitle}>{x.name}</Text>
                   </ImageBackground>
               </View>
           </Pressable>
        ))}
      </ScrollView>
      <View>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.error}>{limit}</Text>
      </View>
  </View>
  )
}

export default CollectionType

const styles = StyleSheet.create({
        wrapper: {
            marginLeft: 16,
            marginRight: 16,
        },
        createCollection: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 8,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 8,
            borderWidth: 1,
            backgroundColor: '#1E1E1E',
            borderColor: '#414141'
        },
        title: {
            fontSize: 16,
            fontFamily: FONTS.medium,
            color: COLORS.white,
            textAlign: "center",
        },
        title2: {
          fontSize: 16,
          paddingTop: 16,
          fontFamily: FONTS.light,
          color: COLORS.gray,
          textAlign: "center",
      },    
        list: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 220
        },
        listTitle: {
            color: COLORS.white,
            fontFamily: FONTS.medium,
            fontSize: 16,
            marginBottom: 5
          },
        listText: {
          color: COLORS.white,
          fontFamily: FONTS.medium,
          fontSize: 14
        },
        errorMessage:  {
            fontSize: 14,
            fontFamily: FONTS.regular,
            color: COLORS.error,
        },
        selectedCollection: {
            alignSelf: 'stretch',
            width: collectionWidth,
            height: collectionWidth,
            borderRadius: 8,
            marginTop: 8,
            borderWidth: 1,
            borderColor: "#9B51E0",
            overflow: "hidden",
        },
        active: {
            color: COLORS.white,
            backgroundColor: "transparent",
            borderColor: 'rgba(65, 65, 65, 1)',
        },
        error: {
          paddingTop: 10,
          color: COLORS.error,
        },
        imageCover: {
          padding: 16,
          paddingVertical: 4,
          height: collectionWidth,
          justifyContent: "flex-end",
          alignItems: "center",
        },
})