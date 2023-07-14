import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, Alert, Platform } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState, useCallback, useEffect } from 'react'
import { COLORS, FONTS } from "../../../constants";
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios"
import * as SecureStore from 'expo-secure-store';

const cancel = 
<Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#EB5757" fillOpacity="0.3"/>
<Path fillRule="evenodd" clipRule="evenodd" d="M20.6087 21.7611C20.9269 22.0792 21.4428 22.0792 21.7609 21.761C22.0791 21.4429 22.0791 20.927 21.7609 20.6088L17.1526 16.0005L21.7617 11.3913C22.0799 11.0731 22.0799 10.5572 21.7617 10.2391C21.4436 9.92089 20.9277 9.92089 20.6095 10.2391L16.0003 14.8482L11.3909 10.2388C11.0727 9.92057 10.5568 9.92057 10.2386 10.2388C9.92045 10.5569 9.92045 11.0728 10.2386 11.391L14.8481 16.0005L10.2394 20.6091C9.92126 20.9273 9.92126 21.4432 10.2394 21.7614C10.5576 22.0795 11.0735 22.0795 11.3917 21.7614L16.0003 17.1527L20.6087 21.7611Z" fill="#EB5757"/>
</Svg>


const uploadImage = <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect x="0.666504" y="0.5" width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path fillRule="evenodd" clipRule="evenodd" d="M15.8517 23.8329C15.8517 24.2829 16.2165 24.6477 16.6665 24.6477C17.1165 24.6477 17.4813 24.2829 17.4813 23.8329L17.4813 17.3148L23.9994 17.3148C24.4494 17.3148 24.8142 16.95 24.8142 16.5C24.8142 16.05 24.4494 15.6852 23.9994 15.6852L17.4813 15.6852L17.4813 9.16692C17.4813 8.71693 17.1165 8.35214 16.6665 8.35214C16.2165 8.35214 15.8517 8.71693 15.8517 9.16692L15.8517 15.6852L9.33345 15.6852C8.88346 15.6852 8.51867 16.05 8.51867 16.5C8.51867 16.95 8.88346 17.3148 9.33345 17.3148L15.8517 17.3148L15.8517 23.8329Z" fill="#9B51E0"/>
</Svg>



const Photos = ({image, setImage, missing, setUploadedImage, postId, setLoading, setLoadingTitle}) => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const pickImage = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
    console.log('image upload function started.');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('2. Image upload to backend step started:');
      setLoading(true);
      setLoadingTitle('Processing your avatar image')
      console.log("Image data from phone: ", result.assets[0]);
      setImage(result.assets[0].uri);
      const form = new FormData();
      form.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: `${getRandomInt(100000)}-animated-nft.jpeg`,
      });
      console.log("Image url from phone: ", form);
      console.log(`https://api.dememoriam.ai/posts/${postId}/image/`);

      fetch(
        `https://api.dememoriam.ai/posts/${postId}/image/`,
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: form,
        }
      )
        .then(response => response.json())
        .then((result) => {
          setUploadedImage(result.image);
          setLoading(false);
          console.log('Result:', result.image);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error with image:', error.response.data);
        });
      }
  };

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
    <View style={styles.logo}>
        <Text style={styles.title}>Now let’s add you profile picture</Text>
    </View>
    <View style={styles.imagesList}>
      <Pressable style={styles.fileUpload}  onPress={pickImage}>
        {uploadImage}
      </Pressable>
      {image ? 
      <View style={styles.uploadedImage}>
          <Pressable onPress={() => setImage(null)} style={styles.iconWrapper} >{cancel}</Pressable>
          <Image style={styles.image} source={{ uri: image, width: 120, height: 120, }} />
      </View> : null }
    </View>
    <View><Text style={styles.errorMessage}>{missing}</Text></View>
  </View>
  )
}

export default Photos

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 0,
      marginBottom: 10,
      textAlign: "center"
  },
  title: {
      fontSize: 14,
      fontFamily: FONTS.medium,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
},
  fileUpload: {
    borderWidth: 1,
    width: 120,
    height: 120,
    backgroundColor: "rgba(30, 30, 30, 1)",
    borderColor: "rgba(65, 65, 65, 1)",
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
    marginRight: 8,
  },
  fileUploadText: {
    color: COLORS.white,
    fontSize: 18
  },
  fileUploadFormat: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 5
  },
  imagesContainer: {
    paddingTop: 25,
  },
  image: {
    borderRadius: 8,
    borderColor: "rgba(65, 65, 65, 1)",
    borderWidth: 1,
  },
  uploadedImage: {
    position: "relative",
  },
  iconWrapper: {
    position: "absolute",
    top: 7,
    right: 7,
    zIndex: 2,
  },
  text: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  errorMessage:  {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.error,
  },
  imagesList: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
  }
})