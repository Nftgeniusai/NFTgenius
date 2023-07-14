import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, RefreshControl, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { COLORS, FONTS } from '../../constants';
import {BottomBar} from '../../components';
import { getApiConfig } from '../../functions/api';
import NoPosts from './NoPosts';
import PostsFeed from './PostsFeed';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";
import Logo from '../../components/Logo';

const add = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M16.1793 9.78746C16.0176 9.78751 15.8626 9.85171 15.7483 9.96606C15.634 10.0804 15.5698 10.2354 15.5698 10.3971L15.5698 15.3908L10.576 15.3908C10.3585 15.3911 10.1575 15.5073 10.0487 15.6958C9.94005 15.8842 9.94005 16.1164 10.0487 16.3049C10.1575 16.4934 10.3585 16.6096 10.576 16.6099L15.5698 16.6099L15.5698 21.6036C15.5701 21.8212 15.6863 22.0222 15.8748 22.1309C16.0632 22.2396 16.2954 22.2396 16.4839 22.1309C16.6724 22.0222 16.7886 21.8212 16.7889 21.6036L16.7889 16.6099L21.7826 16.6099C22.0002 16.6096 22.2012 16.4934 22.3099 16.3049C22.4186 16.1164 22.4186 15.8842 22.3099 15.6958C22.2012 15.5073 22.0002 15.3911 21.7826 15.3908H16.7889L16.7889 10.3971C16.7889 10.2354 16.7247 10.0804 16.6104 9.96606C16.496 9.85171 16.341 9.78747 16.1793 9.78746L16.1793 9.78746Z" fill="#9B51E0"/>
<Rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#9B51E0"/>
</Svg>;
const burger = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect x="5" y="7" width="22" height="2" rx="1" fill="#9B9B9B"/>
<Rect x="5" y="15" width="22" height="2" rx="1" fill="#9B9B9B"/>
<Rect x="5" y="23" width="22" height="2" rx="1" fill="#9B9B9B"/>
</Svg>;
const approved = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M10.58 1.43175C11.3623 0.642928 12.6377 0.642929 13.42 1.43175L14.212 2.23025C14.6669 2.68893 15.3153 2.89962 15.953 2.79594L17.063 2.61544C18.1596 2.43713 19.1914 3.18674 19.3607 4.28477L19.532 5.39627C19.6305 6.03474 20.0312 6.58635 20.608 6.87727L21.6122 7.38371C22.6042 7.88402 22.9983 9.09692 22.4898 10.0847L21.9751 11.0847C21.6795 11.6591 21.6795 12.3409 21.9751 12.9153L22.4898 13.9153C22.9983 14.9031 22.6042 16.116 21.6122 16.6163L20.608 17.1227C20.0312 17.4136 19.6305 17.9653 19.532 18.6037L19.3607 19.7152C19.1914 20.8133 18.1596 21.5629 17.063 21.3846L15.953 21.2041C15.3153 21.1004 14.6669 21.3111 14.212 21.7698L13.42 22.5683C12.6377 23.3571 11.3623 23.3571 10.58 22.5683L9.78802 21.7698C9.33311 21.3111 8.68465 21.1004 8.04701 21.2041L6.93696 21.3846C5.84036 21.5629 4.8086 20.8133 4.63932 19.7152L4.46796 18.6037C4.36952 17.9653 3.96876 17.4136 3.39195 17.1227L2.38781 16.6163C1.39583 16.116 1.00174 14.9031 1.51019 13.9153L2.02488 12.9153C2.32053 12.3409 2.32053 11.6591 2.02488 11.0847L1.51019 10.0847C1.00173 9.09692 1.39583 7.88402 2.38781 7.38371L3.39195 6.87727C3.96876 6.58635 4.36952 6.03474 4.46796 5.39627L4.63932 4.28477C4.8086 3.18674 5.84036 2.43713 6.93696 2.61544L8.04701 2.79594C8.68465 2.89962 9.33311 2.68893 9.78802 2.23025L10.58 1.43175Z" fill="#9B51E0"/>
<Path d="M7.7998 11.52L10.7998 14.4L15.7998 9.60001" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round"/>
</Svg>


const home = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M15.2429 7.12943L7.28132 13.0143C7.10626 13.1435 6.99833 13.3591 7.00002 13.5769V24.3077C7.00002 24.6702 7.32985 25 7.69227 25H13.2309C13.5933 25 13.9232 24.6702 13.9232 24.3077V19.8076C13.9232 18.8367 14.683 18.0769 15.6539 18.0769C16.6249 18.0769 17.3847 18.8367 17.3847 19.8076V24.3077C17.3847 24.6702 17.7146 25 18.077 25H23.6156C23.978 25 24.3079 24.6702 24.3079 24.3077V13.5769C24.3079 13.3593 24.2016 13.1437 24.0266 13.0143L16.065 7.12943C15.747 6.94302 15.4982 6.97127 15.2428 7.12943H15.2429ZM15.6539 8.54657L22.9232 13.9229V23.6153H18.7694V19.8075C18.7694 18.0936 17.3679 16.692 15.6541 16.692C13.9402 16.692 12.5388 18.0934 12.5388 19.8075V23.6153H8.38497V13.9229L15.6539 8.54657Z" fill="white"/>
</Svg>



const User = ({ navigation, route }) => {

  const [user, setUser] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState('This is my profile on NFT genius social platform');
  const [postsCount, setPostsCount] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const defaultImage = require('../../assets/Images/default-user.jpg');
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retryCounter, setRetryCounter] = useState(0);
  const [status1, setStatus1] = useState('PUBLISHED');
  const [status2, setStatus2] = useState('PUBLISHED');


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getProfile = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    axios.get(`/user/profile/`, getApiConfig(true, token)).then((response) => {
      setDescription(response['data'].about_me);
      setUser(response['data'].username);
      if(response['data'].avatar !== null) {
        setAvatar(response['data'].avatar);
      } else {
        setAvatar(null);
      }
    }).catch((error) => {
      console.log('Error getting profile:', error)
    });
  };
  const getPosts = async () => {
    setLoading(true);
    const token = await SecureStore.getItemAsync('secure_token');
    axios.get(`/posts/`, getApiConfig(true, token)).then((response) => {
      setPostsCount(response['data'].count)
      setMyPosts(response['data'].results);
      setLoading(false);
    }).catch((error) => {
      setMyPosts([]);
      console.log('Error getting posts:', error)
    });
  };

  useEffect(() => {
    getProfile();
    getPosts();
    console.log('Refreshed page by refreshing');
  }, [refreshing]);

  useEffect(() => {
    setTimeout(() => {
      getProfile();
      getPosts();
    }, 2000);
  }, [route.params]);

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  
  return (

    <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
      <View style={styles.userHeader}>
        <Pressable onPress={() => navigation.navigate("User")}>{home}</Pressable>
        <Logo navigation={navigation} />
        <View style={styles.userHeaderRight}>
          <Pressable onPress={() => navigation.navigate("Settings")}><View>{ burger }</View></Pressable>
        </View>
      </View>
      { loading ? 
        <View style={styles.userInfoContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.green} />
          </View>
        </View> 
        :
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo1}>
              <Image style={styles.image} source={avatar ? { uri: avatar , width: 65, height: 65, } : defaultImage}  />
          </View>
          <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{user === '' ? '...' : user}</Text> 
              <Text style={styles.aprove}>{approved}</Text>
          </View>
          <View style={styles.userInfo2}>
              <Text style={styles.userDescription}>Create your AI Avatars, NFT collections in less than a minute. </Text>
          </View>
        </View> 
      }
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.body}>
          <View style={styles.descriptionRow}>
            <View style={styles.tabRow}>
              <Pressable onPress={() => setStatus2("PUBLISHED")}>
                <Text style={[styles.titleB, status2 === "PUBLISHED" ? styles.activeButton : null]}>NFT collections</Text>
              </Pressable>
              <Pressable onPress={() => setStatus2("EDITING")}>
                <Text style={[styles.titleT, status2 === "EDITING" ? styles.activeButton : null]}>Drafts</Text>
              </Pressable>
            </View>
          </View>
          { loading ? <View style={styles.loadingContainer}><ActivityIndicator size="large" color={COLORS.green} /></View> : myPosts.filter(myPosts => myPosts.post_type.includes('AI_NFT_GANERATOR')).length !== 0 && myPosts ? <PostsFeed type={'AI_NFT_GANERATOR'} navigation={navigation} myPosts={myPosts} status2={status2} /> : <NoPosts navigation={navigation} buttonText='Create NFT Collection' myPosts={myPosts} active={true} /> }
          { myPosts.filter(myPosts => myPosts.post_type.includes('AI_NFT_GANERATOR')).length !== 0 ? <Pressable style={styles.createNew} onPress={() => navigation.navigate("Upload", "AI_NFT_GANERATOR")}><Text style={styles.showAll}>Create new</Text></Pressable> : null }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(11, 11, 11, 0.8)",
  },
  userName: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 24,
    paddingRight: 5,
  },
  body: {
    paddingTop: 20
  },
  userNameGreen: {
    color: COLORS.green,
    fontFamily: FONTS.regular,
    fontSize: 14,
    paddingRight: 5,
    paddingBottom: 3,
  },
  userDescription: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlign: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userHeaderRight: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  add: {
    paddingRight: 10
  },
  align: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  userInfo1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    paddingTop: 0,
  },
  userInfo2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    paddingTop: 10,
  },
  userInfoRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  userInfoLeft: {
    width: "20%",
  },
  userInfoFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoBottom: {
    padding: 16,
    paddingTop: 0,
    borderBottomColor: "rgba(65, 65, 65, 1)",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.preety,
    color: COLORS.white,
    textAlign: "center",
  },
  userInfoContainer: {
    borderBottomColor: "rgba(65, 65, 65, 1)",
    borderBottomWidth: 1,
    marginBottom: 0,
    marginTop: 20,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paadingBottom: 30,
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingLeft: 24,
    paddingRight: 24,
  },
  showAll: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 8
  },
  createNew: {
    backgroundColor: COLORS.green,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  titleT: {
    color: "#979795",
    fontFamily: FONTS.medium,
    fontSize: 16,
    marginLeft: 15
  },
  titleB: {
    color: "#979795",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  aprove: {
    paddingBottom: 5,
  },
  imageLogo: {
    width: 110,
    height: 36,
  },
  tabRow: {
    flexDirection: "row"
  },
  activeButton: {
    color: COLORS.white
  },
  loadingContainer: {
    height: 135,
    justifyContent: "center",
    alignItems: "center"
  }
})