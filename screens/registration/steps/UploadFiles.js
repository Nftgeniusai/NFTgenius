import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, Alert } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";

const UploadFiles = () => {
  return (
    <View style={styles.wrapper}>
    <View style={styles.logo}>
        <Text style={styles.title}>Good job! Now lets upload your {"\n"} photos, so we can customise it in a {"\n"} unique way</Text>
    </View>
    <Text style={styles.title2}>Upload you 5 portraits</Text>
    <Pressable style={styles.fileUpload}  onPress={() => Alert.alert('Start uploading images')}>
      <Text style={styles.fileUploadText}><Text style={{color: COLORS.green}}>Choose file</Text> to upload </Text>
      <Text style={styles.fileUploadFormat}>JPEG or PNG (up to 2 MB)</Text>
    </Pressable>
    <View style={styles.imagesContainer}>
          <Text style={styles.text}>Uploaded images</Text>
    </View>
  </View>
  )
}

export default UploadFiles

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
      marginTop: 30,
      textAlign: "center"
  },
  title: {
      fontSize: 20,
      fontFamily: FONTS.preety,
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
    borderColor: COLORS.green,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 45

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
  text: {
    color: COLORS.gray,
    fontSize: 14,
  }
})