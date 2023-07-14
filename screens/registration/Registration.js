import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Pressable, Dimensions, Keyboard, StatusBar } from "react-native";
import { RegisterHeader, ContinueButton } from "../../components";
import { COLORS, FONTS } from "../../constants";
import { AgeCountry, SocialConnect, Complete, Slide } from "./steps"
import axios from "axios"
import { getApiConfig } from '../../functions/api';
import * as SecureStore from 'expo-secure-store';
import Select from "../../components/Select";
import {countriesList} from "../../constants/countries"
import {gendersList} from "../../constants/gender"
import Loading from "../../components/Loading";
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";
import moment from "moment";

var width = Dimensions.get('window').width - 40;

const Registration = ({navigation}) => {
  const currentDate = new Date();
  const [date, setDate] = useState(new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()));
  const [country, setCountry] = useState('Select country');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [step, setStep] = useState(2);
  const [errorMessages, setErrorMessages] = useState([]);
  const [showLogin, setShowLogin] = useState('');
  const [gender, setGender] = useState('Select gender');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [listToSelect, setListToSelect] = useState('');
  const [process, setProcess] = useState(false);
  const [validation, setValidation] = useState(false);
  const [multiline, setMultiline] = useState(true);

  const onRegistration = async () => {
    setProcess(true);
    const registration = {
      email: email.trim(),
      username: username.trim(),
      password1: password1.trim(),
      password2: password1.trim(),
    };
    console.log('Registration:', registration);
    console.log('Config: ', getApiConfig(false));
      axios.post('/rest-auth/registration/', registration, getApiConfig(false)
      ).then((response) => {
        const data = response.data;
        saveToken('secure_token', data.access_token);
        console.log('Registration complete: ', data);
        console.log('Access token: ', data.access_token);
        setErrorMessages([]);
        setProcess(false);
        setStep(12);
        saveSettings(data.access_token)
      }).catch((error) => {
        if (error.response.data) {
          console.log('Got error on registration:', error.response.data)
          const errors = []
          for (const [key, value] of Object.entries(error.response.data)) {
            errors.push(value)
          }
          setErrorMessages(errors)
        }
        setTimeout(() => {
          setProcess(false);
        }, 1000);
      });
  };

  const handleEnterPressed = (passedStep) => {
      console.log('Passed to function: ', passedStep);
      if(passedStep) {
        const registration = {
          email: email.trim(),
          username: username.trim(),
          password1: password1.trim(),
          password2: password1.trim(),
        };
        console.log('Errors check:', registration);
        console.log('Config: ', getApiConfig(false));
          axios.post('/rest-auth/registration/', registration, getApiConfig(false)
          ).then((response) => {
            console.log("This info?", response)
          }).catch((error) => {
            if (error.response.data) {
              console.log('Got error on registration:', error.response.data)
              const errors = [];
              for (const [key, value] of Object.entries(error.response.data)) {
                if(key === passedStep) {
                  errors.push(value);
                } else {
                  console.log('Key: ', errors)
                }
              }
              setErrorMessages(errors);
              if(!errors.length) {
                setStep(step + 1);
              }
            }
        });
      } else {
        onContinue();
      }
  }

  const saveToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
    var token = await SecureStore.getItemAsync('secure_token');
    console.log('Successfuly saved: ', token)
  };

  const saveSettings = async (token) => { 
      console.log('Settings to be saved: ', gender, name, surname, moment(date).format('YYYY-MM-DD'))

      var edit = {
        gender: gender.trim(),
        first_name: name.trim(),
        last_name: surname.trim(),
        birth_date: moment(date).format('YYYY-MM-DD'),
        } 

      fetch(`https://api.dememoriam.ai/user/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(edit)
        })
        .then(response => response.json())
        .then(data => {
          console.log(`Saved description: `, data);
        })
        .catch((error) => {
          console.error('Error with post saving:', error);
        });
    };

  const onContinue = () => {
    if( step === 3 ) {
      if(name === '') {
        setValidation(false);
        console.log('Validation failed on step: ', step);
      } else {
        setValidation(false);
        setStep(step + 1);
      }
    } else if( step === 4 ) {
      if(surname === '') {
        setValidation(false);
        console.log('Validation failed on step: ', step);
      } else {
        setValidation(false);
        setStep(step + 1);
      }
    }
    else if( step === 5 ) {
      if(username === '') {
        console.log('Validation failed on step: ', step);
        setValidation(false);
      } else {
        setValidation(false);
      }
    }
    else if( step === 6 ) {
      if(date === '') {
        console.log('Validation failed on step: ', step);
        setValidation(false);
      } else {
        setValidation(false);
        setStep(step + 1);
      }
    }
    else if( step === 7 ) {
      if(gender === 'Select gender') {
        console.log('Validation failed on step: ', step);
        setValidation(false);
      } else {
        setValidation(false);
        setStep(step + 1);
      }
    }
    else if( step === 8 ) {
      if(country === 'Select country') {
        setValidation(false);
        console.log('Validation failed on step: ', step);
      } else {
        setValidation(false);
        setStep(step + 1);
      }
    }
    else if( step === 9 ) {
      if(email === '') {
        setValidation(false);
        console.log('Validation failed on step: ', step);
      } else {
        setValidation(false);
      }
    }
    else if( step === 10 ) {
      if(password1 === '') {
        setValidation(false);
        console.log('Validation failed on step: ', step);
      } else {
        onRegistration();
      }
    }
  }

  useEffect(() => {

    if( step === 3 ) {
      if(name === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 4 ) {
      if(surname === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 5 ) {
      if(username === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 6 ) {
      if(date === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 7 ) {
      if(gender === 'Select gender') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 8 ) {
      if(country === 'Select country') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 9 ) {
      if(email === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
    else if( step === 10 ) {
      if(password1 === '') {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }
  }, [name, surname, username, gender, country, email, date, password1, password2, step])


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, AndroidSafeAreaView.AndroidSafeArea]}>
       <StatusBar
        backgroundColor={step === 12 ? "#15221D" : "rgba(11, 11, 11, 1)"}
      />
      <Select 
        setModalVisible={setModalVisible} 
        modalVisible={modalVisible} 
        list={listToSelect === 'gender' ? gendersList : listToSelect === 'country' ? countriesList : []} 
        selected={listToSelect === 'gender' ? gender : listToSelect === 'country' ? country : []} 
        setSelected={listToSelect === 'gender' ? setGender : listToSelect === 'country' ? setCountry : []} 
        title={listToSelect === 'gender' ? 'Gender' : listToSelect === 'country' ? 'Country' : []}
      />
      {   
        step === 1 ?
          null : 
        step === 2 ? 
          null : 
        step === 12 ? 
          null : 
        <Pressable style={styles.icon} onPress={() => setStep(step - 1)}><RegisterHeader setStep={setStep} step={step} title={'Registration'} /></Pressable>
      }
      {
        step === 1 ? 
          <SocialConnect 
          setStep={setStep} 
          navigation={navigation}
          setShowLogin={setShowLogin}
          showLogin={showLogin} 
          setName={setName} 
          setSurname={setSurname} 
          setUsername={setUsername} 
          setGender={setGender} 
          setCountry={setCountry}
          setEmail={setEmail}
          setPassword1={setPassword1} 
          setPassword2={setPassword2}
          setErrorMessages={setErrorMessages}
        />
        : step === 2 ? 
        <SocialConnect 
          setStep={setStep} 
          navigation={navigation}
          setShowLogin={setShowLogin}
          showLogin={showLogin} 
          setName={setName} 
          setSurname={setSurname} 
          setUsername={setUsername} 
          setGender={setGender} 
          setCountry={setCountry}
          setEmail={setEmail}
          setPassword1={setPassword1} 
          setPassword2={setPassword2}
          setErrorMessages={setErrorMessages}
        />
        : step === 12 ? 
        <Complete navigation={navigation} setStep={setStep} />
        :
        <AgeCountry 
          setDate={setDate} 
          setName={setName}
          name={name} 
          setSurname={setSurname} 
          surname={surname} 
          setUsername={setUsername} 
          username={username} 
          setDate={setDate} 
          date={date} 
          gender={gender} 
          country={country}
          setEmail={setEmail}
          email={email} 
          setPassword1={setPassword1} 
          password1={password1}
          setPassword2={setPassword2}
          password2={password2} 
          step={step}
          setStep={setStep}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
          handleEnterPressed={handleEnterPressed}
          setModalVisible={setModalVisible}
          setListToSelect={setListToSelect}
          onRegistration={onRegistration}
          multiline={multiline}
          setMultiline={setMultiline}
         />
        }
        <Loading loading={process} title="Registering your" /> 
        { step === 1 ?
          null : 
          step === 2 ?
          null : 
          step === 12 ?
          null :
          <ContinueButton validation={validation} step={step} setStep={setStep} navigation={navigation} handleEnterPressed={handleEnterPressed} setRegistrationStep={setRegistrationStep} registrationStep={registrationStep} onRegistration={onRegistration}  />
        }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.green,
        position: 'absolute',
        bottom: 45,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width,
        marginLeft: 16,
    },
    buttonText: {
        fontFamily: FONTS.preety,
        color: COLORS.green,
        fontSize: 16
    },
  });

export default Registration