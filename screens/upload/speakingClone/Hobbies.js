import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width - 40;

const Hobbies = ({selected, setAchievements, setOtherHobbies, achievements, otherHobbies, handleSelectItem, missing, setName, setGender, setUsername, setPostId, setDate, setSurname}) => {
  const hobbies = ['writing', 'painting', 'football', 'dance', 'basketball', 'shopping', 'gardening', 'drawing', 'other..'];

  useEffect(() => {
    setTimeout(() => {
    async function createPost () { 
      var token = await SecureStore.getItemAsync('secure_token');
      var create = {
          status: 'EDITING',
          post_type: 'PERSONAL_AI_AVATAR',
          access: 'PUBLIC',
          collection: 'Life Story collection',
        } 
  
      fetch('https://api.dememoriam.ai/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(create)
        })
        .then(response => response.json())
        .then(data => {
          setPostId(data.id);
          console.log("New post's ID: ", data.id);
        })
        .catch((error) => {
          console.error('Error with post saving:', error);
        });
    }
    createPost();
  }, 1000);
  }, []);
  
  useEffect(() => {
    async function getUserInfo () {
      const token = await SecureStore.getItemAsync('secure_token');
      axios.get('user/profile/', getApiConfig(true, token)).then((response) => {
        setGender(response['data'].gender);
        setName(response['data'].first_name);
        setSurname(response['data'].last_name);
        setUsername(response['data'].username);
        setDate(response['data'].birth_date);
        console.log(response['data']);
      }).catch((error) => {
        console.log('error getting profile', error)
      });
    }
    getUserInfo();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.logo}>
        <Text style={styles.title}>Answer few questions to {"\n"}
        generate your AI profile.</Text>
      </View>
      <View style={styles.logo}>
        <Text style={styles.title2}>What is your hobby</Text>
      </View>
      <View style={styles.list}>
          {hobbies.map((x, key) => (
              <Pressable key={key} style={selected.filter(selected => selected.includes(x)).length > 0 ? styles.listItemActive : styles.listItem} onPress={() => handleSelectItem(key, x)}>
                  <Text style={selected.filter(selected => selected.includes(x)).length > 0 ? styles.listTextActive : styles.listText}>{x}</Text>
              </Pressable>
          ))}
      </View>
      <View>
      { selected.filter(selected => selected.includes('other..')).length > 0 ?
          <TextInput
              style={styles.input}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setOtherHobbies}
              value={otherHobbies}
              placeholder="Other"
              placeholderTextColor="rgba(155, 155, 155, 1)"
          /> : null }
          <View style={styles.logo}>
              <Text style={styles.title2}>Write your biggest achievement in your life</Text>
          </View>
          <TextInput
              onSubmitEditing={Keyboard.dismiss}
              style={styles.multiInput}
              onChangeText={setAchievements}
              value={achievements}
              autoCorrect={false}
              placeholder="Greatest achievement"
              multiline={true}
              placeholderTextColor="rgba(155, 155, 155, 1)"
          />
      </View>
      <View><Text style={styles.errorMessage}>{missing}</Text></View>
  </View>
  )
}

export default Hobbies

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    wrapper: {
        marginLeft: 16,
        marginRight: 16,
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        textAlign: "center"
    },
    title: {
        fontSize: 26,
        fontFamily: FONTS.preety,
        color: COLORS.white,
        textAlign: "center",
    },
    title2: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      textAlign: "center",
      marginBottom: 15
  },
    paragraph: {
      fontSize: 12,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      textAlign: "center",
      marginTop: 7
    },
    continue: {
      position: 'absolute',
      bottom: 45,
      marginLeft: 20,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: COLORS.green,
      padding: 10,
      width: width,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    continueText: {
      color: COLORS.green,
      fontFamily: FONTS.preety,
      textAlign: "center",
    },
    button: {
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      marginBottom: 7,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      marginBottom: 7,
      padding: 10,
      borderRadius: 2,
      marginBottom: 30,
    },
    multiInput: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      paddingTop: 10,
      padding: 10,
      borderRadius: 2,
      marginBottom: 30,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      paddingBottom: 12,
    },
    listItem: {
      color: COLORS.gray,
      borderWidth: 1,
      fontSize: 15,
      borderColor: COLORS.gray,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      margin: 5,
      borderRadius: 15,
      flexGrow: 1,
      width: "30%",
      textAlign: "center",
      textTransform: "capitalize",
    },
    listItemActive: {
      color: COLORS.green,
      borderWidth: 1,
      fontSize: 15,
      borderColor: COLORS.green,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 15,
      margin: 5,
      borderRadius: 15,
      flexGrow: 1,
      width: "30%",
      textAlign: "center",
      textTransform: "capitalize",
    },
    listText: {
      color: COLORS.gray,
      fontFamily: FONTS.regular,
      textAlign: "center",
      textTransform: "capitalize",
    },
    listTextActive: {
        color: COLORS.green,
        fontFamily: FONTS.regular,
        textAlign: "center",
        textTransform: "capitalize",
      },
      errorMessage:  {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.error,
      },
  })