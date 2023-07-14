import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../constants";
import Svg, { Path } from 'react-native-svg';
import { getApiConfig } from '../functions/api';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import Logo from "./Logo";

const homeIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15.2429 7.12943L7.28132 13.0143C7.10626 13.1435 6.99833 13.3591 7.00002 13.5769V24.3077C7.00002 24.6702 7.32985 25 7.69227 25H13.2309C13.5933 25 13.9232 24.6702 13.9232 24.3077V19.8076C13.9232 18.8367 14.683 18.0769 15.6539 18.0769C16.6249 18.0769 17.3847 18.8367 17.3847 19.8076V24.3077C17.3847 24.6702 17.7146 25 18.077 25H23.6156C23.978 25 24.3079 24.6702 24.3079 24.3077V13.5769C24.3079 13.3593 24.2016 13.1437 24.0266 13.0143L16.065 7.12943C15.747 6.94302 15.4982 6.97127 15.2428 7.12943H15.2429ZM15.6539 8.54657L22.9232 13.9229V23.6153H18.7694V19.8075C18.7694 18.0936 17.3679 16.692 15.6541 16.692C13.9402 16.692 12.5388 18.0934 12.5388 19.8075V23.6153H8.38497V13.9229L15.6539 8.54657Z" fill="white"/>
</Svg>
const backIcn = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L9.65685 19.0711C10.0474 19.4616 10.6805 19.4616 11.0711 19.0711C11.4616 18.6805 11.4616 18.0474 11.0711 17.6569L5.41421 12L11.0711 6.34315C11.4616 5.95262 11.4616 5.31946 11.0711 4.92893C10.6805 4.53841 10.0474 4.53841 9.65685 4.92893L3.29289 11.2929ZM20 11L4 11V13L20 13V11Z" fill="white"/>
</Svg>

const HomeHeader = (props) => {

  const defaultImage = require('../assets/Images/default-user.jpg');
  const [avatar, setAvatar] = useState(null);

  const stepBack = () => {
    console.log('Now step: ', props.step)
    if(props.step === 0) {
      props.navigation.navigate("User");
      props.setOption(props.option - 1);
    } else if(props.step === 1) {
      if(props.option === 2) {
        props.navigation.navigate("User");
        props.setOption(props.option - 1);
      } else {
        props.setStep(props.step - 1);
      }
    }
     else {
      props.setStep(props.step - 1);
    }
  }
  const profileGo = () => {
    if(props.step === 0) {
      props.navigation.navigate("User")
    } else {
      props.setStep(props.step - 1);
      props.setOption(props.option - 1);
    }
  }

  useEffect(() => {
    if(props.step) {
      const getAvatar = async () => {
        const token = await SecureStore.getItemAsync('secure_token');
        axios.get(`/user/profile/`, getApiConfig(true, token)).then((response) => {
          if(response['data'].avatar !== null) {
            setAvatar(response['data'].avatar);
          }
        }).catch((error) => {
          console.log('Error getting profile:', error)
        });
      };
      getAvatar();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={() => stepBack()}>
        <View style={styles.svgWrapper}>
          {props.step === 0 ? homeIcn : backIcn}
        </View>
      </Pressable>
      <Logo navigation={props.navigation} />
      <View style={styles.profileImg}>
        <Pressable style={styles.icon} onPress={() => props.navigation.navigate('User')}><Image style={styles.image} source={avatar ? { uri: avatar , width: 65, height: 65, } : defaultImage}  /></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    color: COLORS.white,
    padding: 10,
    paddingLeft: 5,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
},
title: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
},
  text: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",

  },
  svgWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 20
  },
  imageLogo: {
    width: 110,
    height: 36,
  }

});

export default HomeHeader