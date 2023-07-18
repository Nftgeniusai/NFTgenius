import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, BackHandler } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from "axios";
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';
import Logo from '../../../components/Logo';

const googleIcon = <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M20.3684 10.2281C20.3693 9.54663 20.3113 8.8664 20.195 8.19482H10.6992V12.046H16.138C16.0267 12.6611 15.7911 13.2475 15.4455 13.7697C15.0999 14.292 14.6513 14.7393 14.1269 15.0848V17.5846H17.3728C19.2734 15.8444 20.3684 13.271 20.3684 10.2281Z" fill="#4285F4"/>
<Path d="M10.6997 19.9998C13.4169 19.9998 15.7049 19.1137 17.3733 17.586L14.1274 15.0861C13.2239 15.6944 12.0604 16.0416 10.6997 16.0416C8.07328 16.0416 5.84408 14.2834 5.04693 11.9141H1.70312V14.4903C2.5412 16.1465 3.82629 17.5387 5.41494 18.5116C7.00358 19.4844 8.83324 19.9997 10.6997 19.9998Z" fill="#34A853"/>
<Path d="M5.04686 11.9141C4.62543 10.6726 4.62543 9.32806 5.04686 8.08651V5.51025H1.70305C0.998032 6.90345 0.630859 8.44108 0.630859 10.0003C0.630859 11.5595 0.998032 13.0972 1.70305 14.4904L5.04686 11.9141Z" fill="#FBBC04"/>
<Path d="M10.6997 3.95879C12.1356 3.93549 13.5231 4.47429 14.5623 5.45872L17.4362 2.60469C15.6139 0.904883 13.1996 -0.0283412 10.6997 0.000656061C8.83324 0.000740536 7.00358 0.515984 5.41494 1.48886C3.82629 2.46174 2.5412 3.85397 1.70312 5.5101L5.04693 8.08636C5.84408 5.71704 8.07328 3.95879 10.6997 3.95879Z" fill="#EA4335"/>
</Svg>;
const facebookIcon = <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<G ClipPath="url(#clip0_260_5181)">
<Path d="M5.27082 10.652H7.46315V19.6774C7.46315 19.8556 7.60753 20 7.78573 20H11.5029C11.6811 20 11.8255 19.8556 11.8255 19.6774V10.6945H14.3457C14.5096 10.6945 14.6475 10.5715 14.6662 10.4088L15.049 7.08606C15.0595 6.99465 15.0305 6.9031 14.9693 6.83452C14.9081 6.76587 14.8205 6.72658 14.7286 6.72658H11.8256V4.64374C11.8256 4.01587 12.1637 3.69748 12.8305 3.69748C12.9255 3.69748 14.7286 3.69748 14.7286 3.69748C14.9068 3.69748 15.0511 3.55303 15.0511 3.3749V0.324968C15.0511 0.146774 14.9068 0.0023871 14.7286 0.0023871H12.1128C12.0943 0.00148387 12.0533 0 11.993 0C11.5391 0 9.96147 0.0890967 8.71527 1.23555C7.3345 2.506 7.52644 4.02716 7.57231 4.2909V6.72652H5.27082C5.09263 6.72652 4.94824 6.8709 4.94824 7.0491V10.3294C4.94824 10.5075 5.09263 10.652 5.27082 10.652Z" fill="#4A5F9A"/>
</G>
<Defs>
<ClipPath id="clip0_260_5181">
<Rect width="20" height="20" fill="white"/>
</ClipPath>
</Defs>
</Svg>;

const SocialConnect = ({navigation, setStep, setShowLogin, setName, setSurname, setUsername, setGender, setCountry, setEmail, setPassword1, setPassword2, setErrorMessages}) => {

  const [emailLogin, setEmailLogin] = useState(__DEV__ ? 'andriuskevicius.ernestas@gmail.com' : '');
  //const [emailLogin, setEmailLogin] = useState('');
  const [password, setPassword] = useState(__DEV__ ? 'darvienas' : '');
  const [errorLoginMessages, setLoginErrorMessages] = useState('');

  const Login = async e => {
    const user = {
      email: emailLogin,
      password: password
    };

    axios.post("/rest-auth/login/", user, getApiConfig(false))
      .then((response) => {
        const data = response.data;
        save('secure_token', data.access_token);
        save('username', data.username);
        setLoginErrorMessages('');
        navigation.navigate("User", {refresh : true});
      }).catch((error) => {
        setLoginErrorMessages('Email or password was incorect, try again.');
        console.log("Login error", error.response.data);
      })
  };
  async function save(key, value) {
    await SecureStore.deleteItemAsync(key)
    await SecureStore.setItemAsync(key, value);
  }
  const clearAllFields = () => {
    setName('');
    setSurname('');
    setUsername('');
    setGender('Select gender');
    setCountry('Select country');
    setEmail('');
    setPassword1('');
    setPassword2('');
    setErrorMessages('');
    setStep(3);
  }

  useEffect(() => {

    const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
              return true;
            },
          );
          return () => backHandler.remove();
    })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperLogo}>
          <Logo navigation={navigation} />
        </View>
        <View>
              <Text style={styles.title2}>Mint NFT collection in a matter of minutes</Text>
        </View>
        <View>
          <TextInput
              style={styles.input}
              onChangeText={setEmailLogin}
              keyboardType="email-address"
              placeholder="Email address"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              keyboardType="email-address" 
              caretHidden={false}
              value={emailLogin}
            />
          <TextInput
              style={styles.input}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={password} 
              returnKeyType="Enter" 
              onSubmitEditing={()=>{Login()}}
          />
          { errorLoginMessages ?  <Text style={styles.errorMessage}>{ errorLoginMessages }</Text> : null }
        {/*<View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 12}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'rgba(65, 65, 65, 1)'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: 'white', fontSize: 18}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'rgba(65, 65, 65, 1)'}} />
        </View>
          <View style={styles.buttonsWrapper}>
            <Pressable style={styles.button} onPress={e => setShowLogin(true)}>
              { googleIcon }<Text style={styles.buttonText}>Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={e => setShowLogin(true)}>
              { facebookIcon }<Text style={styles.buttonText}>Continue with Facebook</Text>
            </Pressable>
          </View> */}
        </View>
        <View>
          <View style={styles.flexRow}> 
            <Text style={styles.signIn}>Don't have account?</Text> 
            <Pressable onPress={() => clearAllFields()}>
              <Text style={styles.signInLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <Pressable style={({ pressed }) => [
              styles.buttonSign2,
              {
                  backgroundColor: pressed
                    ? '#9B51E0'
                    : '#9B51E0'
                },
              ]} onPress={e => Login(e)}>
            <Text style={styles.buttonSignText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SocialConnect

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
  },
  wrapperLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  input: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    backgroundColor: "rgba(25, 25, 25, 1)",
    color: COLORS.white,
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    padding: 14,
    paddingBottom: 10,
    height: 60,
    borderRadius: 8
  },
  errorMessage:  {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.error,
  },
  forgot: {
    paddingTop: 5,
    float: "right",
    paddingBottom: 20,
  },
  forgotText: {
    color: COLORS.green,
    fontFamily: FONTS.regular,
    fontSize: 16
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      textAlign: "center"
  },
  title: {
      fontSize: 26,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 30,
    lineHeight: 40,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    marginTop: 35,
    marginBottom: 25
  },
  title3: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10
  },
  paragraph: {
      fontSize: 12,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      textAlign: "center",
      marginTop: 7
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    flexDirection: "row",
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
  buttonEmailText: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7
  },
  buttonSign: {
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    marginBottom: 30
  },
  buttonSign2: {
    borderWidth: 1,
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
    marginBottom: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    marginBottom: 0,
    borderRadius: 8,
  },
  buttonBottom: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  buttonSignText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsWrapper: {
    paddingTop: 20,
    paddingBottom: 0
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
    marginLeft: 4
  },
  active: {
    color: COLORS.green,
    borderColor: COLORS.green,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  orWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  justLine: {
      backgroundColor: "red",
      borderBottomColor: "red",
      borderBottomWidth: 1,
      with: 20,
      height: 20,
      position: "relative"
  },
  imageLogo: {
    width: 110,
    height: 36,
  },
})