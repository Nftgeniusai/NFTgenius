import { View, Text, StyleSheet, Image, Dimensions, Pressable, TouchableOpacity, ScrollView, ImageViewer, Modal, Button } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Circle } from 'react-native-svg';
import React, { useState, useCallback, useEffect } from 'react'
import { COLORS, FONTS } from "../../../constants";
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios"
import * as SecureStore from 'expo-secure-store';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;
var close = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path fillRule="evenodd" clipRule="evenodd" d="M10.2388 20.6091C9.92058 20.9272 9.92058 21.4431 10.2388 21.7613C10.557 22.0795 11.0728 22.0795 11.391 21.7613L16 17.1523L20.6091 21.7614C20.9272 22.0796 21.4431 22.0796 21.7613 21.7614C22.0795 21.4432 22.0795 20.9273 21.7613 20.6091L17.1523 16.0001L21.7615 11.3909C22.0796 11.0727 22.0796 10.5568 21.7615 10.2386C21.4433 9.92045 20.9274 9.92045 20.6092 10.2386L16 14.8478L11.3909 10.2387C11.0727 9.92049 10.5568 9.92049 10.2386 10.2387C9.92045 10.5569 9.92045 11.0728 10.2386 11.3909L14.8478 16.0001L10.2388 20.6091Z" fill="#9B51E0"/>
</Svg>
const checkMark = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="12" cy="12" r="12" fill="#9B51E0"/>
<Path d="M5.99999 11.7177L9.32792 15.2339C9.72195 15.6502 10.3846 15.6508 10.7793 15.2352L18.6 7" stroke="#020304" strokeWidth="2" strokeLinecap="round"/>
</Svg>



const NftResults = ({generatedNfts}) => {

  const [openImage, setOpenImage] = useState(false);
  const [openedImage, setOpenedImage] = useState();
  const [select, setSelect] = useState(false);
  const [selectedNfts, setSelectedNfts] = useState();

  const handleSelectNft = (image_url) => {
    if(select) {
      setSelectedNfts(image_url);
    } else {
      setOpenImage(true);
      setOpenedImage(image_url);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
          <Text style={styles.title}>AI generated NFT collection</Text>
          <Pressable  style={styles.buttonCancel}  onPress={() => setSelect(!select)}><Text style={styles.buttonCancelText}>{select ? 'Cancel' : 'Select'}</Text></Pressable>
      </View>
      <View style={styles.imagesContainer}>
        {generatedNfts ? generatedNfts.map((x, key) => (
          <Pressable key={key} style={[styles.nftImage, selectedNfts === x ? styles.nftImageSelected : null ]} onPress={() => handleSelectNft(x)}>
              <Image style={{width: '100%', height: '100%', objectFit: "cover"}} source={{uri:`${x}`}} />
              {selectedNfts === x & select ? <View style={styles.check}>{checkMark}</View> : null}
              {selectedNfts === x & select ? <View style={styles.checkBackground}></View> : null}
          </Pressable>
        )) : null}
      </View>
      { select ? null :
        <Modal
            animationType={"slide"}
            visible={openImage}
            transparent={true}
            onRequestClose={() => setOpenImage(false)}
          >
            <ScrollView contentContainerStyle={styles.modalContainer}>
              <View style={styles.modalView}>
                <Image style={{width: '100%', height: width}} source={{uri:`${openedImage}`}} />
              </View>
              <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setOpenImage(!openImage)}>
                  {close}
                </Pressable>
            </ScrollView>
        </Modal>
      }
    </View>
  )
}

export default NftResults

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      marginBottom: 0,
      textAlign: "center",
      padding: 10
  },
  check: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  checkBackground: {
    position: "absolute",
    backgroundColor: "linear-gradient(0deg, rgba(117, 233, 187, 0.5), rgba(117, 233, 187, 0.5)), url(starryai-0-1000562764-1-0-photo 2.png)",
    height: "110%",
    width: "110%",
    top: 0,
    left: 0,
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    height: "100%"
  },
  modalView: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  title: {
      fontSize: 16,
      fontFamily: FONTS.medium,
      color: COLORS.white,
  },
  listText: {
      color: "#fff"
  },
  nftImage: {
    width: (width / 2) - 20,
    height: (width / 2) - 20,
    padding: 0,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonClose: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  buttonCancel: {
    backgroundColor: "#414141",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  buttonCancelText: {
    color: COLORS.white,
  }
})