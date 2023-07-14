import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Circle } from 'react-native-svg';
import React, { useState, useRef, useEffect } from 'react'
import { COLORS, FONTS } from "../../../constants";

var width = Dimensions.get('window').width - 40;
var height = Dimensions.get('window').height;

const Complete = (props) => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

const completeIcon = <Svg width="198" height="140" viewBox="0 0 198 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7.57894 72L64.4615 128.882C65.6316 130.052 67.5284 130.054 68.7005 128.886L191 7" stroke="#9B51E0" strokeWidth="19"/>
</Svg>
const closeIcon = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M10.2388 20.6091C9.92058 20.9273 9.92058 21.4432 10.2388 21.7614C10.557 22.0796 11.0728 22.0796 11.391 21.7614L16 17.1524L20.6091 21.7615C20.9272 22.0796 21.4431 22.0796 21.7613 21.7615C22.0795 21.4433 22.0795 20.9274 21.7613 20.6092L17.1523 16.0002L21.7615 11.391C22.0796 11.0728 22.0796 10.5569 21.7615 10.2387C21.4433 9.92054 20.9274 9.92054 20.6092 10.2387L16 14.8479L11.3909 10.2388C11.0727 9.92058 10.5568 9.92058 10.2386 10.2388C9.92045 10.557 9.92045 11.0728 10.2386 11.391L14.8478 16.0002L10.2388 20.6091Z" fill="#9B51E0"/>
</Svg>


const goHomeOrNot = (location) => {
  props.setStep(1);
  props.navigation.navigate(location);
}

  return (
    <View style={styles.container}>
      <Pressable style={styles.close} onPress={() => goHomeOrNot("User")}>{closeIcon}</Pressable>
      <View style={styles.containerInner}>
        <View style={styles.complete}>{ completeIcon }</View>
        <Text style={styles.title}>All done!</Text>
        <Text style={styles.description}>You are ready to start generating your first AI NFT collection</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button898} onPress={() => goHomeOrNot("User")}>
              <Text style={styles.buttonText}>Go home</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() => goHomeOrNot("Upload")}>
              <Text style={styles.buttonText2}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Complete

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(155, 81, 224, 0.1)",
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
    height: height - 50,
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
  button898: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
    textAlign: 'center',
    width: (width / 2) - 10,
},
buttonText: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
    fontSize: 16
},
button2: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.green,
  paddingTop: 14,
  paddingBottom: 14,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: COLORS.green,
  alignSelf: 'stretch',
  textAlign: 'center',
  width: (width / 2) - 10,
  marginLeft: 16,
},
buttonText2: {
  fontFamily: FONTS.medium,
  color: "rgba(11, 11, 11, 1)",
  fontSize: 16
},
buttonWrapper: {
    display: "flex",
    flexDirection: "row",
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