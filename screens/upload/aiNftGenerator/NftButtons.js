import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, ImageBackground, navigation, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';
import { Path, Rect, Svg } from 'react-native-svg';

var width = Dimensions.get('window').width - 40;
var width2 = Dimensions.get('window').width;



const NftButtons = ({loading, setLoading, setStep, step, generateNfts, navigation, saveNFTsCollection, saveSettings, imagesAmount}) => {

  const buttonAction = (button) => {
    console.log('Button pressed loading... ' );
    if (step === 4) {
      generateNfts(1);
    } else if(step === 5) {
      saveNFTsCollection();
    } else if(step === 6) {
      saveSettings();
      navigation.navigate("User");
    }
    setStep(step + 1);
  }
  const skipButtonAction = () => {
    navigation.navigate("User");
  }
  const goBackButton = () => {
    setStep(step - 1);
  }



  return (
    step !== 7 ?
      <View style={styles.buttonWrapper2}>
        { step !== 5 ?
          <Pressable style={styles.button2} onPress={() => skipButtonAction()}>
              <Text style={styles.buttonText2}>Save as draft {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
          </Pressable>
          :
          <Pressable style={styles.button2} onPress={() => goBackButton()}>
              <Text style={styles.buttonText2}>Back {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
          </Pressable>
        } 
        <Pressable style={styles.button3} onPress={() => buttonAction(true)}>
            <Text style={styles.buttonText3}>Continue {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
        </Pressable>
      </View>
    :
    <View style={styles.buttonWrapper2}>
      <Pressable style={styles.button} onPress={() => skipButtonAction()}>
          <Text style={styles.buttonText}>Skip to feed</Text>
      </Pressable>
    </View>
  )
}

export default NftButtons

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.gray,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width,
        marginLeft: 16,
    },
    activeButton: {
      borderColor: COLORS.green,
      backgroundColor: COLORS.green,
      color: "rgba(11, 11, 11, 1)",
    },
    buttonText: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        fontSize: 16
    },
    buttonText2: {
        fontFamily: FONTS.medium,
        color: COLORS.white,
        fontSize: 14,
        lineHeight: 16
    },
    buttonText3: {
      fontFamily: FONTS.medium,
      color: "#fff",
      fontSize: 14,
      lineHeight: 16
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
    },
    buttonWrapper2: {
        position: 'absolute',
        display: "flex",
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        bottom: 0,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "row",
        backgroundColor: "rgb(11,11,11)",
        
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.white,
        width: (width2 / 2) - 25,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    button3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.green,
        backgroundColor: COLORS.green,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: (width2 / 2) - 25,
        marginLeft: 16,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      borderWidth: 1,
      alignSelf: 'stretch',
      textAlign: 'center',
      width: width,
      marginLeft: 8,
  },
    buttonTextSecondary: {
        color: COLORS.gray,
        fontSize: 12,
        lineHeight: 12
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 20,
      textDecorationLine: "underline",
    }
})