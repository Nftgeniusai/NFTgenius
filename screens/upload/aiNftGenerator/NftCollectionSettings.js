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


const NftResults = ({loading, collectionName, setCollectionName, setImagesAmount, imagesAmount, posts}) => {

  const [blockchain, setBlockchain] = useState('');
  const [wallet, setWallet] = useState('');

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
          <Text style={styles.title}>Collection settings</Text>
      </View>
      <View style={styles.wrapperInput}>
      <View style={styles.displayInline}><Text style={styles.titleInput}>Select blockchain</Text><View style={styles.comingWrapper}><Text style={styles.coming}>Coming Soon</Text></View></View>
        <View style={styles.wrapperInner}>
          { loading ? <View style={[styles.containerInput, styles.horizontal]}><ActivityIndicator size="large" color={COLORS.green} /></View> : 
          <TextInput 
            style={styles.textInputGenerated}
            editable
            onChangeText={blockchain => setBlockchain(blockchain)}
            placeholder="Blockchain"
            placeholderTextColor="#9B9B9B"
            value={blockchain}
            /> }
        </View>
      </View>
      <View style={styles.wrapperInput}>
        <View style={styles.displayInline}><Text style={styles.titleInput}>Wallet to mint NFT collection</Text><View style={styles.comingWrapper}><Text style={styles.coming}>Coming Soon</Text></View></View>
        <View style={styles.wrapperInner}>
          { loading ? <View style={[styles.containerInput, styles.horizontal]}><ActivityIndicator size="large" color={COLORS.green} /></View> : 
          <TextInput 
            style={styles.textInputGenerated}
            editable
            onChangeText={wallet => setWallet(wallet)}
            placeholder="Wallet address"
            placeholderTextColor="#9B9B9B"
            value={wallet}
            /> }
        </View>
      </View>
      <View style={styles.wrapperInput}>
        <Text style={styles.titleInput}>Collection name</Text>
        <View style={styles.wrapperInner}>
          { loading ? <View style={[styles.containerInput, styles.horizontal]}><ActivityIndicator size="large" color={COLORS.green} /></View> : 
          <TextInput 
            style={styles.textInputGenerated}
            editable
            onChangeText={collectionName => setCollectionName(collectionName)}
            placeholder="Name"
            placeholderTextColor="#9B9B9B"
            value={collectionName}
            /> }
        </View>
      </View>
      <View style={styles.wrapperInput}>
        <View style={styles.displayInline}><Text style={styles.titleInput}>Images amount</Text><View style={styles.comingWrapper}><Text style={styles.coming}>Coming Soon</Text></View></View>
        <View style={styles.wrapperInner}>
          <TextInput 
            style={styles.textInputGenerated}
            keyboardType="numeric"
            onChangeText={imagesAmount => setImagesAmount(imagesAmount)}
            placeholder="Images amount"
            placeholderTextColor="#9B9B9B"
            value={imagesAmount}
            />
        </View>
      </View>
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
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 0,
      textAlign: "center",
      padding: 10
  },
  title: {
      fontSize: 16,
      fontFamily: FONTS.medium,
      color: COLORS.white,
  },
  listText: {
      color: "#fff"
  },
  textInputGenerated: {
    color: "#979795",
    fontSize: 18,
  },
  titleInput: {
    color: COLORS.gray,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 16,
  },
  transcript: {
    color: COLORS.gray,
    paddingTop: 10,
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
  containerInput: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    marginTop: 75
  },
  wrapperInput: {
    paddingTop: 10,
    position: "relative"
  },
  optional: {
    color: "#9B9B9B"
  },
  wrapperInner: {
    marginTop: 12,
    padding: 15,
    borderColor: "rgba(65, 65, 65, 1)",
    backgroundColor: "#191919",
    borderWidth: 1,
    borderRadius: 8,
    width: width - 40,
  },
  textWarning: {
    color: '#979795',
    paddingTop: 20,
    textAlign: 'center',
  },
  coming: {
    color: "#fff",
    fontSize: 10
  },
  comingWrapper: {
    backgroundColor: "#414141",
    padding: 4,
    borderRadius: 4,
    height: 20,
    marginLeft: 7
  },
  displayInline: {
    flexDirection: "row",
    alignItems: "flex-end"
  }
})