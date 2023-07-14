import { View, Text, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg';
import React from 'react'
import { COLORS, FONTS } from "../../../../constants";

var width = Dimensions.get('window').width - 32;
const win = Dimensions.get('window');

// Responsive screens

const { 
  width: SCREEN_WIDTH, 
  height: SCREEN_HEIGHT 
  } = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;
  
function normalize(size, based = 'width') {
  const newSize = (based === 'height') ? 
                  size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
 }

const ThirdSlide = () => {
  return (
    <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
                style={{
                width: normalize(SCREEN_HEIGHT > 700 ? 221 : 148),
                height: normalize(SCREEN_HEIGHT > 700 ? 312 : 208),
                }}
                source={require('../../../../assets/Images/slide1.png')} 
          /> 
        </View>
        <View>
          <Text style={{ fontFamily: FONTS.regular, color: "rgba(238, 238, 238, 1)", textAlign: "center", fontSize: normalize(14) }}>Follow. Donate. Purchase NFTs</Text>
        </View>
        <View style={styles.forPadding}>
            <Text style={{ fontFamily: FONTS.preety, color: "rgba(238, 238, 238, 1)", textAlign: "center", fontSize: normalize(18) }}>Post your thoughts in decentralised way and monetize it</Text>
        </View>
        <View>
          <Text style={{ fontFamily: FONTS.regular, color: "rgba(151, 151, 149, 1))", textAlign: "center", fontSize: normalize(14) }}>Individuals can explore other users' experiences, discover fascinating details about another person's life, or simply enjoy themselves while discovering something novel and inventive.</Text>
        </View>
    </View>
  )
}

export default ThirdSlide

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingLeft: 16,
        paddingRight: 16,
      },
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
},
title: {
    fontSize: 40,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    lineHeight: 62,
    marginTop: 20
},
forPadding: {
    paddingTop: 15,
    paddingBottom: 15,
    },
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    position: 'absolute',
    bottom: 45,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
    marginLeft: 16,
},
buttonText: {
    fontFamily: FONTS.preety,
    color: COLORS.green,
    fontSize: 16
},
listItem: {
    color: COLORS.white,
    borderColor: COLORS.green,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    margin: 5,
},
list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -5,
    marginRight: -5,
},
imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 40
},
bubblesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
})