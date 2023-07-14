import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/MainHeader';
import BottomBar from "../../components/BottomBar";
import * as SecureStore from 'expo-secure-store';
import { getApiConfig } from '../../functions/api';
import { COLORS, FONTS } from "../../constants";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";
import Loading from "../../components/Loading";
import PopupSuccess from "../../components/PopupSuccess";
import Select from "../../components/Select";
import {gendersList} from "../../constants/gender"

var width = Dimensions.get('window').width - 40;
var height = Dimensions.get('window').height;

const Profile = ({navigation, tokenId}) => {
  const logOut = () => {
    SecureStore.deleteItemAsync('auth_user');
    SecureStore.deleteItemAsync('secure_token');
    navigation.navigate("Registration");
  }
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('This is my profile on NFTgenius social platform');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const currentDate = new Date();
  const [date, setDate] = useState(new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate()));
  const [datePicker, setDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [token, setToken] = useState('');
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(null);
  const defaultImage = require('../../assets/Images/default-user.jpg');
  const [open, setOpen] = useState(false);
  const [saved, setSaved] =useState(false);
  const [newUsername, setNewUsername] =useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listToSelect, setListToSelect] = useState('');
  const [items, setItems] = useState([
    {label: 'Female', value: 'female'},
    {label: 'Male', value: 'male'},
    {label: 'Other', value: 'other'}
  ]);


  const showSelect = (list) => {
    console.log('Worked modul opened')
    setModalVisible(true);
    setListToSelect(list);
  }


  function showDatePicker() {
    setDatePicker(true);
  };
 
  function onDateSelected(event, value) {
    console.log('Show selected date: ', value)
    setDate(value);
    setDatePicker(false);
  };

  async function saveSettings () {
    setSaving(true);
    var token = await SecureStore.getItemAsync('secure_token');
    var edit = {
      about_me: description,
      birth_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      gender: gender,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone, 
    } 
    var edit2 = {
      username: newUsername,
      about_me: description,
      birth_date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      gender: gender,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone, 
    } 

    fetch(`https://api.dememoriam.ai/user/profile/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newUsername !== null ? edit2 : edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Saved description: `, data);
        setTimeout(() => {
          setSaving(false);
          setSaved(true);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error with post saving:', error);
        setSaving(false);
      });
  }

  useEffect(() => {
    const getProfile = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    axios.get(`/user/profile/`, getApiConfig(true, token)).then((response) => {
      console.log('Responce: ', response['data']);
      setUsername(response['data'].username);
      setFirstName(response['data'].first_name);
      setLastName(response['data'].last_name);
      setDescription(response['data'].about_me);
      setDate(response['data'].birth_date);
      setGender(response['data'].gender);
      setEmail(response['data'].email);
      setPhone(response['data'].phone_number);
      if(response['data'].avatar !== null) {
        setAvatar(response['data'].avatar);
      }
    }).catch((error) => {
      console.log('Error getting profile Profile page:', error);
    });
  }
  getProfile();
  }, [token]);
  
  return (
    <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
      <MainHeader navigation={navigation} title={'Registration'} />
      <ScrollView style={styles.inputContainer}>
          <View style={styles.userInfoLeft}>
              <Text style={styles.usernameText}>Edit profile details</Text>
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label1}>Username</Text>
          <TextInput
              style={styles.input1}
              onChangeText={setNewUsername}
              placeholder="Name"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={newUsername !== null ? newUsername : username}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>First name</Text>
          <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              placeholder="first name"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={firstName}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
              style={styles.input}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={lastName}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
              multiline
              numberOfLines={4}
              style={styles.input}
              onChangeText={setDescription}
              TextInput={true}
              placeholder='About yourself'
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={description}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={email}
            />
          </View>
          <View style={styles.inputWraper}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
              style={styles.input}
              onChangeText={setPhone}
              placeholder="Phone number"
              placeholderTextColor="rgba(155, 155, 155, 1)"
              value={phone}
            />
          </View>
          <View style={styles.inputWraper}>
            <Text style={styles.label}>Date of Birth</Text>
              <Pressable onPress={() => showDatePicker()}>
                <View pointerEvents="none">
                  <TextInput
                    style={styles.inputDate}
                    onChangeText={setDate}
                    onFocus={showDatePicker}
                    placeholder="DD MM YYYY"
                    value={new Date(date).toDateString()}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.white}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </Pressable>
          </View>

          <View style={styles.inputWraper}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.title2}>What’s your gender?</Text>
              <Pressable onPress={() => showSelect('gender')}>
                <Text style={styles.input} >{gender}</Text>
              </Pressable>
            </View>
          </View>
      </ScrollView>
      <View style={styles.buttonContainer}><Pressable style={({ pressed }) => [
            styles.buttonWrapper,
            {
                backgroundColor: pressed
                  ? '#9B51E0'
                  : '#9B51E0'
              },
            ]} onPress={() => saveSettings()} ><Text style={styles.saveText}>Save</Text></Pressable></View>
      { saving ?  <Loading title='Saving settings...' /> : null }
      { saved ? <PopupSuccess setModalVisible={setSaved} modalVisible={saved} navigation={navigation} title="Settings saved successfully" /> : null }

      <Select 
        setModalVisible={setModalVisible} 
        modalVisible={modalVisible} 
        list={gendersList} 
        selected={gender} 
        setSelected={setGender} 
        title="gender"
      />
      {datePicker ? <View style={styles.MainContainer}>
              {datePicker && (
                <DateTimePicker
                  value={new Date(date)}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onDateSelected}
                  style={styles.datePicker}
                />
              )}
          </View> : null }
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    inputContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 20,
    },
    container: {
        backgroundColor: "rgba(11, 11, 11, 0.8)"
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 20
    },
    userInfoLeft: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 16,
      alignItems: "center",
    },
    changeContainer: {
      marginLeft: 16
    },
    usernameText: {
      color: COLORS.white,
      fontFamily: FONTS.medium,
      fontSize: 24,
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
        alignSelf: 'stretch',
        textAlign: 'center',
        marginTop: 30
    },
    buttonText: {
        fontFamily: FONTS.preety,
        color: COLORS.green,
        fontSize: 16
    },
    changeText: {
      color: COLORS.green,
      fontFamily: FONTS.medium,
      fontSize: 14,
    },
    label: {
      color: COLORS.white,
      fontFamily: FONTS.regular,
      fontSize: 14,
      marginBottom: 8,
      marginTop: 16
    },
    input: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.white,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(25, 25, 25, 1)",
      marginBottom: 7,
      padding: 16,
      borderRadius: 8
    },
    inputDate: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.white,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(25, 25, 25, 1)",
      marginBottom: 7,
      padding: 16,
      borderRadius: 8
    },
    label1: {
      color: COLORS.gray,
      fontFamily: FONTS.regular,
      fontSize: 14,
      marginBottom: 8,
      marginTop: 16
    },
    input1: {
      fontSize: 16,
      fontFamily: FONTS.regular,
      color: COLORS.gray,
      borderWidth: 1,
      borderColor: "rgba(65, 65, 65, 1)",
      backgroundColor: "rgba(25, 25, 25, 1)",
      marginBottom: 7,
      padding: 16,
      borderRadius: 8
    },
    buttonWrap: {
      position: "absolute",
      bottom: 0
  },
  buttonWrapper: {
      backgroundColor: COLORS.green,
      borderRadius: 8,
      marginLeft: 16,
      marginRight: 16,
  },
  saveText: {
      textAlign: "center",
      fontFamily: FONTS.medium,
      fontSize: 16,
      paddingVertical: 16,
  },
  containerMain: {
      justifyContent: "space-between",
      height: height - 170,
  },
  buttonContainer: {
    paddingBottom: 16
  },

})