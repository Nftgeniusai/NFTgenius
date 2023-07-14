import { View, Text, StyleSheet, Pressable, TextInput, Platform, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { COLORS, FONTS } from "../../../constants";
import { getApiConfig } from '../../../functions/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";

export default function AgeCountry({
    setName, 
    name, 
    setSurname, 
    surname, 
    setUsername, 
    username, 
    setDate, 
    date, 
    gender, 
    country, 
    setEmail, 
    email, 
    setPassword1, 
    password1, 
    setPassword2, 
    password2, 
    step,
    multiline,
    setStep,
    setModalVisible,
    setListToSelect,
    onRegistration,
    setErrorMessages,
    handleEnterPressed, 
    setMultiline,
    errorMessages}) {
  const [datePicker, setDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Female', value: 'female'},
    {label: 'Male', value: 'male'},
    {label: 'Other', value: 'other'}
  ]);

  function showDatePicker() {
    setDatePicker(true);
  };
 
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
  const showSelect = (list) => {
    console.log('Worked modul opened')
    setModalVisible(true);
    setListToSelect(list);
  }
  const onPasswordEnter = (val) => {
    setPassword1(val);
    setPassword2(val);
  }
  
  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <View style={styles.inputContainer}>
        <View style={[step === 3 ? styles.hide : styles.show ]}>
          <Text style={styles.title2}>Let’s get started, what’s your name?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => setName(val)}
            value={name.trim()}
            blurOnSubmit={true}
            textContentType="name"
            placeholder="Your name"
            placeholderTextColor="rgba(155, 155, 155, 1)"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            multiline={false}
            returnKeyType="Enter" 
            onSubmitEditing={()=>{handleEnterPressed(null)}}        
          />
        </View>
        <View style={[step === 4 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>What’s your Surename?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => setSurname(val)}
            value={surname.trim()}
            blurOnSubmit={true}
            textContentType="familyName"
            placeholder="Your surname"
            placeholderTextColor="rgba(155, 155, 155, 1)"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            multiline={false}
            returnKeyType="Enter" 
            onSubmitEditing={()=>{handleEnterPressed(null)}}        
          />
        </View>
        <View style={[step === 5 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>How would you like to appear in app?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => setUsername(val)}
            value={username.trim()}
            blurOnSubmit={true}
            textContentType="username"
            placeholder="Username"
            placeholderTextColor="rgba(155, 155, 155, 1)"
            underlineColorAndroid="transparent"
            autoCorrect={false}
            multiline={false}
            returnKeyType="Enter" 
            onSubmitEditing={()=>{handleEnterPressed('username')}}
          />
        </View>
        <View style={[step === 6 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>Hi {name.trim()}, when’s your birthday?</Text>
          <Pressable onPress={() => showDatePicker()}>
            <View pointerEvents="none">
              <TextInput
                style={styles.inputDate}
                onChangeText={setDate}
                onFocus={showDatePicker}
                placeholder="DD MM YYYY"
                value={date.toDateString()}
                keyboardType="numeric"
                placeholderTextColor={COLORS.white}
                underlineColorAndroid="transparent"
              />
            </View>
          </Pressable>
        </View>
        <View style={[step === 7 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>What’s your gender?</Text>
          <Pressable onPress={() => showSelect('gender')}>
            <Text style={gender === 'Select gender' ? styles.inputEmpty : styles.input} >{gender}</Text>
          </Pressable>
        </View>
        <View style={[step === 8 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>Where are you from?</Text>
          <Pressable onPress={() => showSelect('country')}>
            <Text style={country === 'Select country' ? styles.inputEmpty : styles.input} >{country}</Text>
          </Pressable>
        </View>
        <View style={[step === 9 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>Create your account using your email address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email.trim()}
            blurOnSubmit={true}
            placeholder="Your email"
            autoCapitalize='none'
            keyboardType='email-address'
            inputMode='email'
            autoComplete='email'
            placeholderTextColor="rgba(155, 155, 155, 1)"
            underlineColorAndroid="transparent"
            multiline={false}
            returnKeyType="Enter" 
            onSubmitEditing={()=>{handleEnterPressed('email')}}
          />
        </View>
        <View style={[step === 10 ? styles.hide : styles.show]}>
          <Text style={styles.title2}>Create your password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val)=>{onPasswordEnter(val)}}
            secureTextEntry={multiline}
            keyboardType={"default"}
            multiline={false}
            autoCorrect={false}
            value={password1.trim()}
            placeholder="Password"
            placeholderTextColor="rgba(155, 155, 155, 1)"
            onSubmitEditing={()=>{onRegistration()}}
          />
        </View>
      </View>
      <View style={styles.errorList}>
        {errorMessages ? errorMessages.map((error, index)=>(
          <View key={index}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )) : null}
      </View>
      <View style={styles.MainContainer}>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}
 
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 30,
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      textAlign: "center"
  },
  title: {
      fontSize: 22,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontFamily: FONTS.medium,
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
button: {
  borderWidth: 1,
  borderColor: "rgba(65, 65, 65, 1)",
  marginBottom: 7,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 7
},
buttonText: {
  color: COLORS.white,
  fontFamily: FONTS.regular,
  fontSize: 14,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
},
buttonsWrapper: {
  paddingTop: 20,
  paddingBottom: 20
},
signIn: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.gray,
  textAlign: "center",
  zIndex: 1,
},
signInLink: {
  fontSize: 14,
  fontFamily: FONTS.regular,
  color: COLORS.green,
  textAlign: "center",
},
input: {
  display: "flex",
  justifyContent: 'center',
  textAlignVertical: 'top',
  alignItems: "center",
  fontSize: 32,
  marginLeft: 20,
  marginRight: 20,
  fontFamily: FONTS.medium,
  color: COLORS.white,
  textAlign: "center",
  borderWidth: 0,
  paddingTop: 0,
  paddingBottom: 0,
  height: 60,
},
inputEmpty: {
  display: "flex",
  justifyContent: 'center',
  textAlignVertical: 'center',
  alignItems: "center",
  fontSize: 32,
  lineHeight: 48,
  height: 48,
  marginLeft: 20,
  marginRight: 20,
  fontFamily: FONTS.medium,
  color: COLORS.gray,
  textAlign: "center",
  borderWidth: 0,
  marginTop: 5,
},
inputDate: {
  fontSize: 32,
  fontFamily: FONTS.medium,
  color: COLORS.white,
  borderWidth: 1,
  marginBottom: 7,
  textAlign: "center",
  borderWidth: 0,
},
inputContainer: {
  paddingTop: 25,
  paddingBottom: 25
},
text: {
  color: COLORS.white
},
spinnerInput: {
  fontSize: 12
},
ContainerStyle: {
  backgroundColor: "green"
},
myDropdownContainerStyle: {
  backgroundColor: "red"
},
signInContainer: {
  position: "relative",
  zIndex: 1
},
error: {
  color: COLORS.error,
  textAlign: "center",
  fontFamily: FONTS.regular,
  fontSize: 16,
},
errorList: {
  display: "flex",
  flexDirection: "column",
  paddingLeft: 20,
  paddingRight: 20
},
show: {
  display: "none"
},
hide: {
  display: "flex"
},
})