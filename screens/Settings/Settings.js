import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/MainHeader';
import { getApiConfig } from '../../functions/api';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { COLORS, FONTS } from '../../constants';
import Svg, { Path, Rect } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import Loading from "../../components/Loading";
import PopupSuccess from "../../components/PopupSuccess";

const profileIcn = <Svg style={{position: "absolute", right: 0, bottom: 0}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="20" height="20" rx="10" fill="white" fillOpacity="0.8"/>
<Path d="M14.0357 6.53846H13.2104C13.028 5.66182 12.2343 5 11.2857 5H9.71429C8.76573 5 7.97195 5.66182 7.78955 6.53846H6.96429C5.88121 6.53846 5 7.40119 5 8.46154V13.0769C5 14.1373 5.88121 15 6.96429 15H14.0357C15.1188 15 16 14.1373 16 13.0769V8.46154C16 7.40119 15.1188 6.53846 14.0357 6.53846ZM15.2143 13.0769C15.2143 13.7132 14.6856 14.2308 14.0357 14.2308H6.96429C6.31441 14.2308 5.78571 13.7132 5.78571 13.0769V8.46154C5.78571 7.8253 6.31441 7.30769 6.96429 7.30769H8.14286C8.35981 7.30769 8.53571 7.13547 8.53571 6.92308C8.53571 6.28684 9.06441 5.76923 9.71429 5.76923H11.2857C11.9356 5.76923 12.4643 6.28684 12.4643 6.92308C12.4643 7.13547 12.6402 7.30769 12.8571 7.30769H14.0357C14.6856 7.30769 15.2143 7.8253 15.2143 8.46154V13.0769Z" fill="#0B0B0B"/>
<Path d="M10.498 8.07812C8.98169 8.07812 7.74805 9.28588 7.74805 10.7704C7.74805 12.255 8.98169 13.4627 10.498 13.4627C12.0144 13.4627 13.248 12.255 13.248 10.7704C13.248 9.28588 12.0144 8.07812 10.498 8.07812ZM10.498 12.6935C9.41497 12.6935 8.53376 11.8308 8.53376 10.7704C8.53376 9.71008 9.41497 8.84736 10.498 8.84736C11.5811 8.84736 12.4623 9.71008 12.4623 10.7704C12.4623 11.8308 11.5811 12.6935 10.498 12.6935Z" fill="#0B0B0B"/>
</Svg>
const userIcn = <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="40" height="40" rx="20" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M20.2602 12.7998C18.4102 12.7998 16.9002 14.3099 16.9002 16.1598C16.9002 18.0097 18.4103 19.5198 20.2602 19.5198C22.1102 19.5198 23.6202 18.0099 23.6202 16.1598C23.6202 14.3097 22.1102 12.7998 20.2602 12.7998ZM20.2602 13.7599C21.5914 13.7599 22.6602 14.8286 22.6602 16.1599C22.6602 17.491 21.5914 18.5599 20.2602 18.5599C18.9291 18.5599 17.8602 17.491 17.8602 16.1599C17.8602 14.8286 18.9291 13.7599 20.2602 13.7599ZM17.8602 20.1599C16.9952 20.1599 15.9964 20.4683 15.1703 21.0998C14.3442 21.7313 13.7002 22.7273 13.7002 23.9998V26.7198C13.7003 26.8471 13.7509 26.9692 13.8408 27.0592C13.9309 27.1492 14.053 27.1998 14.1802 27.1998H26.3402C26.4675 27.1998 26.5896 27.1492 26.6796 27.0592C26.7696 26.9692 26.8201 26.8471 26.8203 26.7198V23.9998C26.8203 22.7273 26.1763 21.7313 25.3502 21.0998C24.524 20.4683 23.5253 20.1599 22.6602 20.1599H17.8602ZM17.8602 21.1198H22.6602C23.2821 21.1198 24.1231 21.3739 24.7653 21.8648C25.4073 22.3557 25.8602 23.0419 25.8602 23.9998V26.2398H14.6602V23.9998C14.6602 23.0419 15.1131 22.3557 15.7552 21.8648C16.3974 21.3739 17.2383 21.1198 17.8602 21.1198Z" fill="white"/>
</Svg>
const arrow = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13H20V11H4V13Z" fill="white"/>
</Svg>

const Settings = ({navigation}) => {

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [saving, setSaving] = useState(false);
    const [image, setImage] = useState(null);
    const [saved, setSaved] =useState(false);
    const defaultImage = require('../../assets/Images/default-user.jpg');

    const logOut = () => {
        SecureStore.deleteItemAsync('auth_user');
        SecureStore.deleteItemAsync('secure_token');
        SecureStore.deleteItemAsync('username');
        navigation.navigate("Registration");
    }

    useEffect(() => {
        const getProfile = async () => {
          const token = await SecureStore.getItemAsync('secure_token');
          axios.get(`/user/profile/`, getApiConfig(true, token)).then((response) => {
            setName(response['data'].first_name);
            setSurname(response['data'].last_name);
            if(response['data'].avatar !== null) {
              setAvatar(response['data'].avatar);
            }
          }).catch((error) => {
            console.log('Error getting profile:', error)
          });
        };
      getProfile();
      }, []);

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const pickImage = async () => {
        console.log('image upload function');
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
        if (!result.canceled) {
          const token = await SecureStore.getItemAsync('secure_token');
          setImage(result.assets[0].uri);
          const formData = new FormData();
          formData.append('avatar', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            name: `${getRandomInt(100000)}-animated-nft.jpeg`,
          });
          setSaving(true)
          fetch(
            'https://api.dememoriam.ai/user/profile/avatar/',
            {
              method: 'PUT',
              headers: {
                'authorization': `Bearer ${token}`,
              },
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              setAvatar(result.avatar);
              setSaving(false);
              setSaved(true);
            })
            .catch((error) => {
              setSaving(false)
              console.error('Error with image:', error.response);
            });
      }};

      async function saveAvatar () {
        setSaving(true);
        var token = await SecureStore.getItemAsync('secure_token');
        var edit = {
          about_me: description,
          birth_date: date,
          gender: gender,
          first_name: firstName,
          last_name: lastName,
          phone_number: phone, 
        } 
        var edit2 = {
          username: newUsername,
          about_me: description,
          birth_date: date,
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

  return (
    <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
        <MainHeader navigation={navigation} title={'Registration'} />
        <View style={styles.wrapper}>
            <Text style={styles.title}>Your account</Text>
            <View style={styles.accountRow}>
                <View style={styles.accountRow}>
                    <View>
                        <Image style={styles.image} source={avatar ? { uri: avatar , width: 65, height: 65, } : defaultImage}  />
                        <Pressable onPress={() => pickImage()}>{profileIcn}</Pressable>
                    </View>
                    <Pressable style={styles.accountRow} onPress={() => navigation.navigate('User')}><Text style={styles.name}>{name} {surname}</Text></Pressable>
                </View>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}><Text style={styles.buttonText}>Edit profile</Text></Pressable>
            </View>
            <Text style={styles.title2}>Settings</Text>
            <View>
                {/*<Pressable style={styles.accountRow2} onPress={() => navigation.navigate('Notifications')}>
                    <View  style={styles.accountRow}>
                        {userIcn}
                        <Text style={styles.name}>Notifications</Text>
                    </View>
                    {arrow}
                  </Pressable> */}
                <Pressable style={styles.accountRow2} onPress={logOut}>
                    <View  style={styles.accountRow}>
                        {userIcn}
                        <Text style={styles.name}>Log out</Text>
                    </View>
                    {arrow}
                </Pressable>

            </View>
        </View>
        { saving ?  <Loading title='Uploading Image...' /> : null }
        { saved ? <PopupSuccess setModalVisible={setSaved} modalVisible={saved} navigation={navigation} title="New avatar saved successfully" /> : null }
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({

    accountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    accountRow2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 35,
    },
    button: {
        backgroundColor: COLORS.green,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        color: "#fff",
        fontFamily: FONTS.regular,
        lineHeight: 16,
    },
    name: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.medium,
        marginLeft: 20
    },
    title2: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.medium,
        paddingTop: 25,
        paddingBottom: 5,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.medium,
        color: COLORS.white,
        paddingVertical: 15
    },
    wrapper: {
        paddingHorizontal: 16
    }
})