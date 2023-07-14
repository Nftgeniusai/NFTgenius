import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import React from 'react'
import { COLORS, FONTS } from "../constants";
import Svg, { Path } from 'react-native-svg';
import Logo from "./Logo";

const MainHeader = (props) => {

  const stepBack = () => {
    if(props.step < 2) {
      props.navigation.navigate("User")
    } else {
      props.setStep(props.step - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={() => props.navigation.goBack(null)}>
        <View style={styles.svgWrapper}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L9.65685 19.0711C10.0474 19.4616 10.6805 19.4616 11.0711 19.0711C11.4616 18.6805 11.4616 18.0474 11.0711 17.6569L5.41421 12L11.0711 6.34315C11.4616 5.95262 11.4616 5.31946 11.0711 4.92893C10.6805 4.53841 10.0474 4.53841 9.65685 4.92893L3.29289 11.2929ZM20 11L4 11V13L20 13V11Z" fill="white"/>
          </Svg>
        </View>
      </Pressable>
      <View style={styles.containerLogo}>
        <Logo navigation={props.navigation} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(11, 11, 11, 0.8)",
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 15,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
},
title: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
},
  text: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 2,
    width: 50,
    height: 50,
  },
  svgWrapper: {
    width: 50,
    height: 50,
  },
  imageLogo: {
    width: 110,
    height: 36,
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center"
  }

});

export default MainHeader