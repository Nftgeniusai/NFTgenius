import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";


var width = Dimensions.get('window').width - 32;

const NameEmailPassword = ({name, surname, username, email, password1, password2, setName, setSurname, setUsername, setEmail, setPassword1, setPassword2, errorMessages, onRegistration, isKeyboardVisible}) => {

  const approvedIcon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M10.58 1.43175C11.3623 0.642928 12.6377 0.642929 13.42 1.43175L14.212 2.23025C14.6669 2.68893 15.3153 2.89962 15.953 2.79594L17.063 2.61544C18.1596 2.43713 19.1914 3.18674 19.3607 4.28477L19.532 5.39627C19.6305 6.03474 20.0312 6.58635 20.608 6.87727L21.6122 7.38371C22.6042 7.88402 22.9983 9.09692 22.4898 10.0847L21.9751 11.0847C21.6795 11.6591 21.6795 12.3409 21.9751 12.9153L22.4898 13.9153C22.9983 14.9031 22.6042 16.116 21.6122 16.6163L20.608 17.1227C20.0312 17.4136 19.6305 17.9653 19.532 18.6037L19.3607 19.7152C19.1914 20.8133 18.1596 21.5629 17.063 21.3846L15.953 21.2041C15.3153 21.1004 14.6669 21.3111 14.212 21.7698L13.42 22.5683C12.6377 23.3571 11.3623 23.3571 10.58 22.5683L9.78802 21.7698C9.33311 21.3111 8.68465 21.1004 8.04701 21.2041L6.93696 21.3846C5.84036 21.5629 4.8086 20.8133 4.63932 19.7152L4.46796 18.6037C4.36952 17.9653 3.96876 17.4136 3.39195 17.1227L2.38781 16.6163C1.39583 16.116 1.00174 14.9031 1.51019 13.9153L2.02488 12.9153C2.32053 12.3409 2.32053 11.6591 2.02488 11.0847L1.51019 10.0847C1.00173 9.09692 1.39583 7.88402 2.38781 7.38371L3.39195 6.87727C3.96876 6.58635 4.36952 6.03474 4.46796 5.39627L4.63932 4.28477C4.8086 3.18674 5.84036 2.43713 6.93696 2.61544L8.04701 2.79594C8.68465 2.89962 9.33311 2.68893 9.78802 2.23025L10.58 1.43175Z" fill="#9B51E0"/>
  <Path d="M7.7998 11.5201L10.7998 14.4001L15.7998 9.6001" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
  

  return (
    <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
    contentContainerStyle={styles.container}
    enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    extraScrollHeight={50}
  >
      <View style={styles.logo}>
            <Text style={styles.title2}>Let's connect, My name is {"\n"} NFTgenius {approvedIcon}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={setSurname}
          placeholder="Surname"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          value={surname}
        />
         <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword1}
          placeholder="Password"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          secureTextEntry={true}
          value={password1}
        />
          <TextInput
          style={styles.input}
          onChangeText={setPassword2}
          placeholder="Password"
          placeholderTextColor="rgba(155, 155, 155, 1)"
          secureTextEntry={true}
          value={password2}
        />
      </View>
      <Text style={styles.errorMessage}>{ errorMessages }</Text>
      {!isKeyboardVisible ? <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={(e) => onRegistration(e)}>
            <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View> : null}
    </KeyboardAwareScrollView>
  )
}

export default NameEmailPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    height: "100%",
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
      marginTop: 30,
      height: "100%",
  },
  logo: {
      marginTop: 30,
  },
  title: {
      fontSize: 22,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
    marginTop: 4
},
  paragraph: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 7
},
errorMessage:  {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.error,
},
button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 14,
  paddingBottom: 14,
  borderRadius: 4,
  elevation: 3,
  borderWidth: 1,
  borderColor: COLORS.green,
  alignSelf: 'stretch',
  textAlign: 'center',
  width: width,
},
buttonText: {
  color: COLORS.green,
  fontFamily: FONTS.preety,
  fontSize: 16,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
},
buttonsWrapper: {
  paddingTop: 20,
  paddingBottom: 20,
},
signIn: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.gray,
  textAlign: "center",
},
signInLink: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.green,
  textAlign: "center",
},
input: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.gray,
  borderWidth: 1,
  borderColor: "rgba(65, 65, 65, 1)",
  marginBottom: 7,
  padding: 10,
  borderRadius: 2
},
inputContainer: {
  paddingTop: 25,
  paddingBottom: 0
},
buttonWrapper: {
  position: 'absolute',
  bottom: 6,
},
})