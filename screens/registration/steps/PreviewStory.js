import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from "../../../constants";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;

const PreviewStory = () => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={require('../../../assets/Images/image-placeholder.jpg')} />
      <View style={styles.wrapperUser}>
        <View><Image style={styles.profileImage} source={require('../../../assets/Images/image-placeholder.jpg')} /></View>
        <View style={styles.userTexts}>
          <Text style={styles.userName}>Name</Text>
          <Text style={styles.postStatus}>12h · Public</Text>
        </View>
      </View>
      <Text style={styles.transcript}>Your AI generated BIO</Text>
      <View style={styles.wrapperInner}>
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur. Vivamus ut viverra vel congue. Ac ac elementum rutrum orci molestie congue in. Lectus orci sit porttitor odio porttitor. Lorem ipsum dolor sit amet consectetur. Vivamus ut viverra vel congue. Ac ac elementum rutrum orci molestie congue in. Lectus orci sit porttitor odio porttitor.</Text>
      </View>
    </View>
  )
}

export default PreviewStory

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
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 26,
  },
  transcript: {
    color: COLORS.gray,
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 14,
    paddingLeft: 16,
  },
  transcriptShortDescription: {
    color: COLORS.gray,
    paddingBottom: 10,
    fontSize: 14,
    paddingLeft: 16,
  },
  wrapperUser: {
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(65, 65, 65, 1)",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    padding: 12
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20
  },
  userName: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  postStatus: {
    color: COLORS.gray
  },
  userTexts: {
    marginLeft: 12
  }
})