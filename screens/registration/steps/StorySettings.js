import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from "../../../constants";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;

const StorySettings = () => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={require('../../../assets/Images/image-placeholder.jpg')} />
      <Text style={styles.transcript}>Your AI generated BIO</Text>
      <Text style={styles.transcriptShortDescription}>Based on your answers, our AI generated short description of your digital self. Edit it or leave as it is.</Text>
      <View style={styles.wrapperInner}>
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. Vivamus ut viverra vel congue. Ac ac elementum rutrum orci molestie congue in. Lectus orci sit porttitor odio porttitor. Lorem ipsum dolor sit amet consectetur. Vivamus ut viverra vel congue. Ac ac elementum rutrum orci molestie congue in. Lectus orci sit porttitor odio porttitor.</Text>
      </View>
    </View>
  )
}

export default StorySettings

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(11, 11, 11, 1)"
  },
  image: {
    width: width,
    height: height,
  },
  wrapperInner: {
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    borderRadius: 10,
  },
  text: {
    color: COLORS.white,
    padding: 15,
    fontSize: 18,
    lineHeight: 26,
  },
  transcript: {
    color: COLORS.white,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 16,
    paddingLeft: 16,
  },
  transcriptShortDescription: {
    color: COLORS.gray,
    paddingBottom: 10,
    fontSize: 14,
    paddingLeft: 16,
  }

})