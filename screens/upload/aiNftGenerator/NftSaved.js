import { View, Text, StyleSheet, Image, Dimensions, Pressable, ActivityIndicator, TextInput, Alert, Platform } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState, useCallback, useEffect } from 'react'
import { COLORS, FONTS } from "../../../constants";
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios"
import * as SecureStore from 'expo-secure-store';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;


const NftResults = () => {

  return (
    <View style={styles.wrapper}>
     
    </View>
  )
}

export default NftResults

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
})