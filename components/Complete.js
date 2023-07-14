import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Circle } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../constants";

var width = Dimensions.get('window').width - 40;
var height = Dimensions.get('window').height;

const Complete = ({title, description, setStep, navigation}) => {

const completeIcon = <Svg width="198" height="140" viewBox="0 0 198 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7.57894 72L64.4615 128.882C65.6316 130.052 67.5284 130.054 68.7005 128.886L191 7" stroke="#9B51E0" strokeWidth="19"/>
</Svg>
const closeIcon = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="rgba(117, 233, 187, 0.3);
" fillPpacity="0.3"/>
<Path fillRule="evenodd" clipRule="evenodd" d="M10.2388 20.6091C9.92058 20.9272 9.92058 21.4431 10.2388 21.7613C10.557 22.0795 11.0728 22.0795 11.391 21.7613L16 17.1523L20.6091 21.7614C20.9272 22.0796 21.4431 22.0796 21.7613 21.7614C22.0795 21.4432 22.0795 20.9273 21.7613 20.6091L17.1523 16.0001L21.7615 11.3909C22.0796 11.0727 22.0796 10.5568 21.7615 10.2386C21.4433 9.92045 20.9274 9.92045 20.6092 10.2386L16 14.8478L11.3909 10.2387C11.0727 9.92049 10.5568 9.92049 10.2386 10.2387C9.92045 10.5569 9.92045 11.0728 10.2386 11.3909L14.8478 16.0001L10.2388 20.6091Z" fill="#9B51E0"/>
</Svg>

  const finished = () => {
    navigation.navigate("User");
    setStep(0);
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.close} onPress={() => finished()}>{closeIcon}</Pressable>
      <View style={styles.containerInner}>
        <View style={styles.complete}>{ completeIcon }</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={() => setStep(8)}>
              <Text style={styles.buttonText}>Preview my AI digital clone</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => finished()}>
              <Text style={styles.buttonText2}>Skip to feed</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Complete

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15221D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    marginTop: -40,
  },
  containerInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    height: height,
  },
  title: {
    fontFamily: FONTS.preety,
    color: COLORS.white,
    fontSize: 32,
    lineHeight: 36,
    textAlign: "center",
    paddingTop: 20,
  },
  description: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
},
buttonText: {
    fontFamily: FONTS.medium,
    color: "rgba(11, 11, 11, 1)",
    fontSize: 16
},
button2: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 14,
  paddingBottom: 14,
  elevation: 3,
  alignSelf: 'stretch',
  textAlign: 'center',
  width: width,
},
buttonText2: {
  fontFamily: FONTS.regular,
  color: COLORS.white,
  fontSize: 14,
  textDecorationLine: 'underline'
},
buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    bottom: 0,
},
close: {
  position: "absolute",
  zIndex: 9999,
  top: 20,
  right: 20
},
complete: {
  paddingBottom: 35,
  marginTop: -120,
}
})