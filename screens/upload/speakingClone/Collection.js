import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, ImageBackground} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width - 40;

const Collection = ({handleSelectCollection, collection, error}) => {

  const [posts, setPosts] = useState();
  const [limit, setLimit] = useState('');
  const collectionImg = require('../../../assets/Images/collection-cover.jpg');

  useEffect(() => {
    const getPosts = async () => {
      const token = await SecureStore.getItemAsync('secure_token');
    axios.get(`/posts/`, getApiConfig(true, token)).then((response) => {
      response['data'].count == 5 ? setLimit('You have reached posts limit.') : setLimit('');
    }).catch((error) => {
      console.log('Error getting posts:', error)
    });
  };
  getPosts();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Select collection in which you would like to {"\n"} create your new story</Text>
      </View>
      <View style={styles.list}>
        <Pressable style={[styles.selectedCollection, !collection ? styles.active : null]} onPress={() => handleSelectCollection()}>
            <View style={styles.greenContainer}>
                <ImageBackground source={collectionImg} resizeMode="cover" style={styles.imageCover}>
                  <Text style={[styles.listTitle, !collection ? styles.active : null]}>Life Story collection</Text>
                  <Text style={[styles.listText, !collection ? styles.active : null]}>Upload story about yourself, like hobbies or biggest life’s achievements</Text>
                </ImageBackground>
            </View>
        </Pressable>
      </View>
      <View style={styles.comingSoon}>
        <Text style={styles.title2}>New collection coming soon</Text>
      </View>
      <View>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.error}>{limit}</Text>
      </View>
  </View>
  )
}

export default Collection

const styles = StyleSheet.create({
        wrapper: {
            marginLeft: 16,
            marginRight: 16,
        },
        comingSoon: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 8,
            paddingTop: 45,
            paddingBottom: 45,
            marginTop: 8,
            borderWidth: 1,
            borderColor: 'rgba(65, 65, 65, 1)'
        },
        title: {
            fontSize: 16,
            fontFamily: FONTS.medium,
            color: COLORS.white,
            textAlign: "center",
        },
        title2: {
          fontSize: 20,
          fontFamily: FONTS.light,
          color: COLORS.gray,
          textAlign: "center",
      },    
        list: {
          alignSelf: 'stretch',
        },
        listTitle: {
            color: COLORS.white,
            fontFamily: FONTS.medium,
            fontSize: 20,
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
            borderRadius: 8,
            marginTop: 24,
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
          paddingVertical: 24,
        },
})