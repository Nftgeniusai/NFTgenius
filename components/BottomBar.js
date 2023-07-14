import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native'
import React, {useEffect, useState} from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { COLORS, FONTS } from "../constants";
import { useNavigationState } from '@react-navigation/native';
import { getApiConfig } from '../functions/api';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

var width = Dimensions.get('window').width;

const BottomBar = (props) => {

  const [active, setActive] = useState('User');
  const [avatar, setAvatar] = useState(null);
  const defaultImage = require('../assets/Images/default-user.jpg');

  const navigationActive = (location) => {
    setActive(location);
    props.navigation.navigate(location);
  }
  const routes = useNavigationState(state => state.routes)
  const currentRoute = routes[routes.length -1].name

  const home = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M29.1594 14.975L26.3059 12.1215L26.3057 5.02852C26.3057 4.01855 25.4869 3.19995 24.4772 3.19995H21.7343C20.7244 3.19995 19.9058 4.01855 19.9058 5.02852V5.72154L18.1879 4.00362C17.1167 2.93287 15.3806 2.93287 14.3095 4.00362L3.33797 14.9751C2.43053 15.8795 2.27208 17.2924 2.95663 18.3753C3.64117 19.4581 4.98525 19.9214 6.19165 19.4898V26.9714C6.19165 27.9813 7.01046 28.7999 8.02022 28.7999H24.4775C25.4874 28.7999 26.306 27.9813 26.306 26.9714L26.3058 19.4908C27.512 19.921 28.8555 19.4575 29.5396 18.3748C30.2238 17.2922 30.0659 15.8799 29.1595 14.9751L29.1594 14.975ZM21.7341 5.02878H24.477V10.2933L21.7341 7.55052V5.02878ZM18.077 26.9713H14.4199V23.3141C14.4199 22.8093 14.8293 22.3999 15.3341 22.3999H17.1627C17.6676 22.3999 18.0769 22.8093 18.0769 23.3141L18.077 26.9713ZM24.477 26.9713H19.9056V23.3141C19.9056 21.7993 18.6776 20.5713 17.1627 20.5713H15.3342C13.8193 20.5713 12.5913 21.7993 12.5913 23.3141V26.9713H8.01974V18.0499L16.2486 9.82151L24.477 18.0499L24.477 26.9713ZM27.8662 17.5651V17.5605C27.5046 17.9063 26.9349 17.9063 26.5734 17.5605L26.0542 17.0411L26.014 17.0009L16.8947 7.8826C16.5375 7.52569 15.959 7.52569 15.6018 7.8826L6.48252 17.0055L5.92294 17.5651C5.69341 17.8027 5.35344 17.8982 5.0337 17.8144C4.71393 17.7309 4.4644 17.4811 4.38063 17.1614C4.29725 16.8418 4.39254 16.5018 4.63014 16.2723L15.6016 5.30082C15.9588 4.94391 16.5375 4.94391 16.8945 5.30082L20.1567 8.56286C20.1704 8.5774 20.1823 8.58931 20.1969 8.60304L24.7291 13.1353C24.7418 13.149 24.7537 13.1609 24.7675 13.1736L27.866 16.2721C28.2231 16.6291 28.2231 17.2078 27.866 17.565L27.8662 17.5651Z" fill={currentRoute == 'Home' ? COLORS.green : '#9B9B9B'}/>
  </Svg>
  
  const search = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M13.2132 23.4113C15.497 23.4136 17.715 22.6453 19.5084 21.2315L26.2769 28L28.0076 26.2692L21.2391 19.5007C23.1518 17.0595 23.8512 13.8813 23.139 10.863C22.4271 7.84453 20.3814 5.31356 17.5793 3.98462C14.7772 2.65567 11.523 2.67273 8.73525 4.03132C5.94746 5.38993 3.92846 7.94218 3.24846 10.9678C2.56845 13.9937 3.30114 17.1645 5.23947 19.5851C7.17784 22.0059 10.112 23.4138 13.2131 23.4114L13.2132 23.4113ZM13.2132 5.44908C15.2703 5.44908 17.2434 6.26634 18.698 7.72089C20.1525 9.17544 20.9698 11.1483 20.9698 13.2054C20.9698 15.2624 20.1525 17.2356 18.698 18.6901C17.2434 20.1447 15.2703 20.9619 13.2132 20.9619C11.1561 20.9619 9.18329 20.1447 7.72874 18.6901C6.27419 17.2356 5.45692 15.2624 5.45692 13.2054C5.45692 11.1483 6.27419 9.17544 7.72874 7.72089C9.18329 6.26634 11.1561 5.44908 13.2132 5.44908Z" fill={currentRoute == 'Search' ? COLORS.green : '#9B9B9B'}/>
  </Svg>
  
  const upload = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M16.1789 9.78746C16.0172 9.78751 15.8622 9.85171 15.7478 9.96606C15.6335 10.0804 15.5693 10.2354 15.5693 10.3971L15.5693 15.3908L10.5756 15.3908C10.358 15.3911 10.157 15.5073 10.0483 15.6958C9.93957 15.8842 9.93956 16.1164 10.0483 16.3049C10.157 16.4934 10.358 16.6096 10.5756 16.6099L15.5693 16.6099L15.5693 21.6036C15.5696 21.8212 15.6858 22.0222 15.8743 22.1309C16.0627 22.2396 16.295 22.2396 16.4834 22.1309C16.6719 22.0222 16.7881 21.8212 16.7884 21.6036L16.7884 16.6099L21.7821 16.6099C21.9997 16.6096 22.2007 16.4934 22.3094 16.3049C22.4181 16.1164 22.4181 15.8842 22.3094 15.6958C22.2007 15.5073 21.9997 15.3911 21.7821 15.3908H16.7884L16.7884 10.3971C16.7884 10.2354 16.7242 10.0804 16.6099 9.96606C16.4955 9.85171 16.3405 9.78747 16.1788 9.78746L16.1789 9.78746Z" fill={currentRoute == 'Upload' ? COLORS.green : '#9B9B9B'}/>
  <Rect x="4.5" y="4.5" width="23" height="23" rx="3.5" stroke={currentRoute == 'Upload' ? COLORS.green : '#9B9B9B'}/>
  </Svg>

  const trending = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M14.9953 5.84443C15.091 7.4533 15.9372 8.9238 17.2803 9.81503C17.7931 10.1888 18.3586 10.4841 18.9584 10.6916C20.9294 11.4655 22.5469 12.9377 23.5024 14.8274C24.4577 16.7174 24.6845 18.8927 24.1392 20.9388C23.5938 22.985 22.3146 24.7591 20.5454 25.9225C18.7761 27.0862 16.6406 27.5582 14.5455 27.2484C12.4971 26.881 10.6459 25.7982 9.32186 24.1927C7.99777 22.5874 7.28689 20.5638 7.31601 18.4831C7.31601 17.8688 7.31601 17.2769 7.37601 16.7226H7.37583C7.99565 17.6599 8.81099 18.4522 9.76576 19.0451C10.0509 19.2233 10.3809 19.3167 10.7171 19.3147C11.3093 19.3258 11.8693 19.046 12.2155 18.5656C12.5519 18.0817 12.6355 17.4658 12.4403 16.9099C11.6457 14.91 11.4707 12.7173 11.9384 10.6166C12.4507 8.75304 13.5165 7.08899 14.9951 5.84458M16.3584 3.19998C16.2552 3.19891 16.1538 3.22748 16.0663 3.28248C14.1635 4.451 11.4589 6.67614 10.5373 10.2574C9.9873 12.6306 10.1701 15.1149 11.0617 17.3823C11.1 17.4948 11.0823 17.6189 11.0142 17.7164C10.9462 17.8139 10.836 17.8735 10.7171 17.8767C10.6505 17.874 10.5857 17.8533 10.5298 17.8167C8.82323 16.8012 7.74627 14.9912 7.66805 13.0072C7.66413 12.8601 7.60181 12.7206 7.49502 12.6196C7.38824 12.5183 7.24574 12.4638 7.0986 12.4678C6.85521 12.4624 6.63932 12.6228 6.57413 12.8574C6.06987 14.6867 5.83253 16.5791 5.87006 18.476C5.83256 20.9038 6.66341 23.2649 8.21286 25.1346C9.76231 27.004 11.9283 28.2586 14.3206 28.6726C14.8506 28.7592 15.3868 28.8017 15.9238 28.7999C18.4346 28.792 20.8526 27.8492 22.7058 26.1552C24.5589 24.4613 25.7148 22.1376 25.9477 19.6374C26.1566 17.4371 25.6302 15.2294 24.4507 13.36C23.2715 11.4906 21.5056 10.0649 19.4296 9.306C18.968 9.15011 18.5314 8.92816 18.1335 8.64673C17.3678 8.18013 16.8084 7.43962 16.5691 6.57537C16.3298 5.7113 16.4284 4.78844 16.8448 3.99436C16.9264 3.82472 16.9161 3.62526 16.8177 3.46472C16.7193 3.30419 16.5461 3.20455 16.3578 3.20026L16.3584 3.19998Z" fill="#9B9B9B"/>
  <Path d="M15.7449 14.8116C15.9847 14.9089 16.2319 15.0064 16.494 15.0963H16.4942C17.2797 15.4096 17.9406 15.9723 18.3751 16.6978C18.8095 17.4233 18.9936 18.2715 18.899 19.1119C18.8077 20.0851 18.3576 20.9893 17.636 21.6486C16.9144 22.3079 15.9732 22.6748 14.9959 22.6781C14.785 22.679 14.5743 22.6613 14.3664 22.6256C14.2148 22.6018 14.0648 22.5693 13.9169 22.5282C14.8207 21.7731 15.506 20.7902 15.9023 19.6814C16.4164 18.2271 16.4164 16.6405 15.9023 15.1863C15.8473 15.0415 15.8024 14.8992 15.7674 14.7593M14.4414 12.5119V12.5117C14.3221 12.5115 14.208 12.5605 14.1259 12.6469C14.0437 12.7333 14.0007 12.8496 14.0069 12.9687C14.0446 13.8922 14.2241 14.8043 14.5387 15.6732C14.9392 16.805 14.9392 18.04 14.5387 19.1719C14.0596 20.4999 13.0502 21.5692 11.7518 22.1236C11.605 22.1795 11.4999 22.31 11.4765 22.4654C11.4533 22.6206 11.5156 22.7765 11.6395 22.8729C12.3436 23.4775 13.1975 23.8813 14.1118 24.0416C14.396 24.0921 14.6844 24.1173 14.9734 24.1164C16.3126 24.113 17.6026 23.6107 18.5915 22.7075C19.5806 21.8045 20.1977 20.5653 20.3225 19.2319C20.4403 18.0725 20.1745 16.9064 19.5654 15.913C18.9563 14.9195 18.0379 14.1536 16.9511 13.7329C16.1348 13.4681 15.3565 13.0977 14.6362 12.6315C14.5681 12.577 14.4835 12.5479 14.3964 12.5492L14.4414 12.5119Z" fill="#9B9B9B"/>
  </Svg>

  useEffect(() => {
    const getProfile = async () => {
      console.log('Worked profile picture');
      const token = await SecureStore.getItemAsync('secure_token');
      axios.get('/user/profile/', getApiConfig(true, token)).then((response) => {
        if(response['data'].avatar !== null) {
          setAvatar(response['data'].avatar);
        }
      }).catch((error) => {
        console.log('Error getting profile bottomBar:', error)
      });
    };
  getProfile();
  }, []);


  return (
    <View style={styles.container}>
      <Pressable style={[styles.button3, currentRoute == 'User' ? styles.active : null]} onPress={() => navigationActive("User")}>
        <View style={styles.itemContainer}>{home}<Text style={[styles.text , currentRoute == 'User' ? styles.active : null]}>User</Text></View>
      </Pressable>
      <View style={[styles.itemContainer, currentRoute == 'Upload' ? styles.active : null]}>{search}<Text style={styles.text}>Search</Text><Text style={styles.comingSoon}>Coming soon</Text></View>
      <Pressable style={styles.button3} onPress={() => navigationActive("Upload")}>
        <View style={styles.itemContainer}>{upload}<Text style={[styles.text, currentRoute == 'Upload' ? styles.active : null]}>Upload</Text></View>
      </Pressable>
      <View style={[styles.itemContainer, currentRoute == 'Trending' ? styles.active : null]}>{trending}<Text style={[styles.text, currentRoute == 'Tending' ? styles.active : null]}>Trending</Text><Text style={styles.comingSoon}>Coming soon</Text></View>
      <Pressable style={styles.button3} onPress={() => navigationActive("User")}>
        <View style={styles.itemContainer}>
        <Image style={styles.imageIcon} source={avatar ? { uri: avatar } : defaultImage}  />
          <Text style={[styles.text, currentRoute == 'User' ? styles.active : null]}>Profile</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(11, 11, 11, 0.8)",
    padding: 20,
    paddingLeft: 35,
    paddingRight: 35,
    borderTopColor: "rgba(65, 65, 65, 1)",
    borderTopWidth: 1,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    color: COLORS.gray,
    fontFamily: FONTS.light,
    marginTop: 5,
    fontSize: 13,
  },
  activeText: {
    color: COLORS.green,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  comingSoon: {
    position: "absolute",
    color: COLORS.green,
    fontFamily: FONTS.medium,
    fontSize: 8,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    top: 0,
    left: 0,
  },
  imageIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: 3,
  },
  active: {
    color: COLORS.green
  },
})