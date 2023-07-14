import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Button, ActivityIndicator, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants"
import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { Audio } from 'expo-av'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height / 2.5;


const Edit = ({selected, result, setResult, achievements, otherHobbies, loading, setLoading, name, username, gender, postId, date, surname}) => {

  const [token, setToken] = useState();
  const voices = [ 
    {name:"Amber", code:"en-US-AmberNeural", gender:"female"}, 
    {name:"Aria", code:"en-US-AriaNeural", gender:"female"}, 
    {name:"Cora", code:"en-US-CoraNeural", gender:"female"}, 
    {name:"Elizabeth", code:"en-US-ElizabethNeural", gender:"female"}, 
    {name:"Eric", code:"en-US-EricNeural", gender:"male"}, 
    {name:"Guy", code:"en-US-GuyNeural", gender:"male"}, 
    {name:"Tony", code:"en-US-TonyNeural", gender:"male"}, 
  ];

  
  const hobbies = selected.join(', ');

  return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Your AI generated BIO</Text>
        <Text style={styles.transcript}>QLONE AI generated short story about you, review it & edit if needed</Text>
        <View style={styles.wrapperInner}>
          { loading ? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color={COLORS.green} /></View> : 
          <TextInput 
            style={styles.textInputGenerated}
            editable
            multiline
            numberOfLines={10}
            onChangeText={result => setResult(result)}
            value={result}
            /> }
        </View>
      </View>
  )
}

export default Edit

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(11, 11, 11, 1)"
  },
  container: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    marginTop: 75
  },
  image: {
    width: width,
    height: height,
  },
  wrapperInner: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    padding: 16,
    borderColor: "rgba(65, 65, 65, 1)",
    borderWidth: 1,
    borderRadius: 8,
    width: width - 40,
  },
  textInputGenerated: {
    color: COLORS.white,
    fontSize: 18,
  },
  title: {
    color: COLORS.white,
    paddingTop: 20,
    paddingBottom: 0,
    fontSize: 16,
    paddingLeft: 16,
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