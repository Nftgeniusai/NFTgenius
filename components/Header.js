import { StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern } from 'react-native-svg';
import { COLORS, FONTS } from "../constants";
import { useNavigationState } from '@react-navigation/native';
import { getApiConfig } from '../functions/api';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import Logo from './Logo';


const approved = <Svg style={{position: "absolute", top: -6, right: -7, zIndex: 2}} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.28999 0.715874C9.68117 0.321464 10.3188 0.321464 10.71 0.715875L12.085 2.10218C12.3124 2.33152 12.6366 2.43686 12.9555 2.38502L14.8827 2.07165C15.431 1.9825 15.9468 2.3573 16.0315 2.90632L16.329 4.83603C16.3782 5.15527 16.5786 5.43107 16.867 5.57653L18.6103 6.45579C19.1063 6.70594 19.3034 7.31239 19.0491 7.80631L18.1556 9.54235C18.0077 9.82954 18.0077 10.1705 18.1556 10.4577L19.0491 12.1937C19.3034 12.6876 19.1063 13.2941 18.6103 13.5442L16.867 14.4235C16.5786 14.5689 16.3782 14.8447 16.329 15.164L16.0315 17.0937C15.9468 17.6427 15.431 18.0175 14.8827 17.9283L12.9555 17.615C12.6366 17.5631 12.3124 17.6685 12.085 17.8978L10.71 19.2841C10.3188 19.6785 9.68117 19.6785 9.28999 19.2841L7.91505 17.8978C7.68759 17.6685 7.36336 17.5631 7.04454 17.615L5.11734 17.9283C4.56904 18.0175 4.05316 17.6427 3.96852 17.0937L3.67101 15.164C3.6218 14.8447 3.42141 14.5689 3.13301 14.4235L1.38968 13.5442C0.893689 13.2941 0.696642 12.6876 0.950867 12.1937L1.84444 10.4577C1.99226 10.1705 1.99226 9.82954 1.84444 9.54235L0.950867 7.80631C0.696642 7.31239 0.89369 6.70594 1.38968 6.45579L3.13301 5.57653C3.42141 5.43107 3.6218 5.15527 3.67101 4.83603L3.96852 2.90632C4.05316 2.3573 4.56904 1.9825 5.11734 2.07165L7.04454 2.38502C7.36336 2.43686 7.68759 2.33152 7.91505 2.10218L9.28999 0.715874Z" fill="#9B51E0"/>
<Path d="M6.25098 9.1L8.75098 11.5L12.9176 7.5" stroke="#0B0B0B" stroke-width="1.2" stroke-linecap="round"/>
</Svg>
const logo = <Svg style={{ marginRight: 16, marginLeft: 20 }} width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15.8768 7.75683C16.1153 7.45878 16.3525 7.15896 16.5895 6.85916C16.8403 6.54189 16.8364 6.04169 16.5811 5.72968C14.1868 2.80436 11.5755 0.31397 8.27591 0.31397C3.93567 0.31397 0.857422 4.08864 0.857422 8.89874C0.857422 13.5259 3.98658 17.3009 7.92256 17.3009C12.0609 17.3009 14.8365 13.9523 18.9243 8.71609C20.4386 6.9503 23.4159 3.05366 26.494 3.05366C29.1183 3.05366 31.2885 5.12381 31.1369 9.02045C31.0362 12.0037 29.1687 14.5609 26.3424 14.5609C23.8854 14.2373 22.2588 12.6737 19.8874 9.86953C19.6188 9.55226 19.1868 9.56187 18.9284 9.89155C18.6707 10.2205 18.4121 10.5484 18.1524 10.8748C17.8927 11.2012 17.9042 11.7211 18.1787 12.0298C21.3575 15.6066 23.7009 17.3005 26.3425 17.3005C30.4302 17.3005 33.8624 14.0129 33.8624 8.83752C33.8624 4.02749 30.9858 0.312988 26.8477 0.312988C22.8103 0.312988 20.1863 3.4792 17.133 7.3452C14.0795 11.2113 11.3544 14.5607 8.42742 14.5607C5.70214 14.5607 3.63292 12.1254 3.5826 8.95929C3.53198 5.8541 5.24814 3.0532 8.02381 3.0532C10.8077 3.0532 13.0102 5.37764 14.9083 7.75591C15.1729 8.08685 15.6123 8.08685 15.8769 7.75616L15.8768 7.75683Z" fill="#9B51E0"/>
</Svg>

const homeIcon = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15.2429 7.12943L7.28132 13.0143C7.10626 13.1435 6.99833 13.3591 7.00002 13.5769V24.3077C7.00002 24.6702 7.32985 25 7.69227 25H13.2309C13.5933 25 13.9232 24.6702 13.9232 24.3077V19.8076C13.9232 18.8367 14.683 18.0769 15.6539 18.0769C16.6249 18.0769 17.3847 18.8367 17.3847 19.8076V24.3077C17.3847 24.6702 17.7146 25 18.077 25H23.6156C23.978 25 24.3079 24.6702 24.3079 24.3077V13.5769C24.3079 13.3593 24.2016 13.1437 24.0266 13.0143L16.065 7.12943C15.747 6.94302 15.4982 6.97127 15.2428 7.12943H15.2429ZM15.6539 8.54657L22.9232 13.9229V23.6153H18.7694V19.8075C18.7694 18.0936 17.3679 16.692 15.6541 16.692C13.9402 16.692 12.5388 18.0934 12.5388 19.8075V23.6153H8.38497V13.9229L15.6539 8.54657Z" fill="white"/>
</Svg>
const storyIcon = <Svg style={{ marginRight: 16, marginLeft: 20 }} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M8.6671 15.1852C8.21711 15.1852 7.85232 15.55 7.85232 16C7.85232 16.45 8.21711 16.8148 8.6671 16.8148L15.1852 16.8148L15.1852 23.3329C15.1852 23.7829 15.55 24.1477 16 24.1477C16.45 24.1477 16.8148 23.7829 16.8148 23.3329L16.8148 16.8148L23.3331 16.8148C23.7831 16.8148 24.1479 16.45 24.1479 16C24.1479 15.55 23.7831 15.1852 23.3331 15.1852L16.8148 15.1852L16.8148 8.66694C16.8148 8.21695 16.45 7.85217 16 7.85217C15.55 7.85217 15.1852 8.21696 15.1852 8.66694L15.1852 15.1852L8.6671 15.1852Z" fill="#9B51E0"/>
</Svg>




const Header = (props) => {

  const [active, setActive] = useState('User');
  const [avatar, setAvatar] = useState(null);
  const defaultImage = require('../assets/Images/default-user.jpg');

  const navigationActive = (location) => {
    setActive(location);
    props.refreshFeed;
    props.navigation.navigate(location);
  }

  useEffect(() => {
    const getProfile = async () => {
      console.log('Worked profile picture');
      const token = await SecureStore.getItemAsync('secure_token');
      axios.get('/user/profile/', getApiConfig(true, token)).then((response) => {
        if(response['data'].avatar !== null) {
          setAvatar(response['data'].avatar);
        }
      }).catch((error) => {
        console.log('Error getting profile Header:', error)
      });
    };
  getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          {homeIcon}
        </View>
      </View>
      <Logo navigation={props.navigation} />
      <View style={styles.right}>
        <View style={styles.logo}>
            <Pressable style={styles.button3} onPress={() => navigationActive("Upload")}>
              <View>
                {storyIcon}
              </View>
            </Pressable>
            <Pressable onPress={() => navigationActive("User")}>
              <Image style={styles.imageIcon} source={avatar ? { uri: avatar } : defaultImage}  />
            </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
    
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
  },
  imageIcon: {
    width: 34,
    height: 34,
    borderRadius: 20,
    marginBottom: 0,
  },
  imageLogo: {
    width: 110,
    height: 36,
  },
})