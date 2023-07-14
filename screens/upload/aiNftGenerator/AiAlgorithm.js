import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';
import { Path, Rect, Svg } from 'react-native-svg';

var width = Dimensions.get('window').width - 40;
var collectionWidth = (Dimensions.get('window').width / 2) - 20;

const AiAlgorithm = ({setPostId}) => {

  useEffect(() => {
    setTimeout(() => {
    async function createPost () { 
      var token = await SecureStore.getItemAsync('secure_token');
      var create = {
          status: 'EDITING',
          access: 'PRIVATE',
          post_type: 'AI_NFT_GANERATOR',
          collection: 'New NFTs collection',
        } 
  
      fetch('https://api.dememoriam.ai/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(create)
        })
        .then(response => response.json())
        .then(data => {
          setPostId(data.id);
          console.log("New post's ID: ", data.id);
        })
        .catch((error) => {
          console.error('Error with post saving:', error);
        });
    }
    createPost();
  }, 1000);
  }, []);

  const [error, setError] = useState('');
  const [limit, setLimit] = useState('');
  const [collectionType, setCollectionType] = useState('');
  const collectionImg1 = require('../../../assets/Images/stable-diffusion.png');
  const collectionImg2 = require('../../../assets/Images/mid-journey.png');
  const collectionImg3 = require('../../../assets/Images/dall-e.png');

  const handleSelectCollection = (col) => {
    setCollectionType(col)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Choose AI Algorithm</Text>
      </View>
      <View style={styles.list}>
        <Pressable style={[styles.selectedCollection, collectionType === 'deliberate-v2' ? null : styles.active]} onPress={() => handleSelectCollection('deliberate-v2')}>
          <View><Image style={styles.imageCover} source={require('../../../assets/Images/stable-diffusion.png')} /></View>
          <View style={styles.greenContainer}><Text style={styles.listTitle}>Stable diffusion</Text></View>
        </Pressable>
        <Pressable style={[styles.selectedCollection, collectionType === 'dream-shaper-8797' ? null : styles.active]} /* onPress={() => handleSelectCollection('dream-shaper-8797')}*/>
          <View style={styles.coming}><Text style={styles.comingText}>Coming soon</Text></View>
          <View><Image style={styles.imageCover} source={require('../../../assets/Images/dall-e.png')} /></View>
          <View style={styles.greenContainer}><Text style={styles.listTitle}>Dall-e</Text></View>
        </Pressable>
      </View>
      <View>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.error}>{limit}</Text>
      </View>
  </View>
  )
}

export default AiAlgorithm

const styles = StyleSheet.create({
        wrapper: {
            marginLeft: 16,
            marginRight: 16,
            marginTop: 16,
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
            borderRadius: 8,
            marginTop: 10,
            borderWidth: 2,
            padding: 10,
            borderColor: "#9B51E0",
            backgroundColor: "#1E1E1E",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
        },
        active: {
            color: COLORS.white,
            backgroundColor: "#1E1E1E",
            borderColor: 'rgba(65, 65, 65, 1)',
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        error: {
          paddingTop: 10,
          color: COLORS.error,
        },
        imageCover: {
          padding: 16,
          paddingVertical: 4,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        },
        coming: {
          position: "absolute",
          display: "flex",
          top: 8,
          right: 8, 
          backgroundColor: "#414141",
          borderRadius: 3,
          padding: 4,
        },
        comingText: {
          color: COLORS.white
        }
})