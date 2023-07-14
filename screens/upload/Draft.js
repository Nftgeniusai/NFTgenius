import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Platform, Pressable, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Svg, { Path, G, Defs, Rect, ClipPath, Circle } from 'react-native-svg';
import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { getApiConfig } from '../../functions/api';
import { COLORS, FONTS } from '../../constants';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import PopUp from './trainClone/PopUp'

const addIcon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="24" height="24" rx="12" fill="#9B51E0" fillOpacity="0.3"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M12.679 5.96019C12.679 5.58521 12.375 5.28123 12 5.28123C11.625 5.28123 11.321 5.58521 11.321 5.96019L11.321 11.3921L5.88924 11.3921C5.51426 11.3921 5.21028 11.6961 5.21028 12.071C5.21028 12.446 5.51426 12.75 5.88924 12.75L11.321 12.75L11.321 18.1814C11.321 18.5564 11.625 18.8604 12 18.8604C12.375 18.8604 12.679 18.5564 12.679 18.1814L12.679 12.75L18.1105 12.75C18.4855 12.75 18.7894 12.446 18.7894 12.071C18.7894 11.6961 18.4855 11.3921 18.1105 11.3921L12.679 11.3921L12.679 5.96019Z" fill="#9B51E0"/>
</Svg>;
const removeIcon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="24" height="24" rx="12" fill="#EB5757" fillOpacity="0.3"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M15.8403 16.8011C16.1054 17.0663 16.5353 17.0663 16.8005 16.8011C17.0656 16.536 17.0656 16.1061 16.8005 15.841L12.9604 12.0009L16.8016 8.15969C17.0667 7.89455 17.0667 7.46467 16.8016 7.19953C16.5364 6.93439 16.1066 6.93439 15.8414 7.19953L12.0002 11.0407L8.15902 7.19951C7.89388 6.93437 7.464 6.93437 7.19886 7.19951C6.93371 7.46465 6.93371 7.89453 7.19886 8.15967L11.0401 12.0009L7.19997 15.841C6.93483 16.1061 6.93483 16.536 7.19997 16.8011C7.46511 17.0663 7.89499 17.0663 8.16013 16.8011L12.0002 12.961L15.8403 16.8011Z" fill="#EB5757"/>
</Svg>;
const finishIcon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13H20V11H4V13Z" fill="#9B51E0"/>
</Svg>;
const videoIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M25.9298 9.92854C25.505 9.70187 24.9666 9.70187 24.57 9.98526L20.4054 12.6766V11.6C20.4054 10.3534 19.3855 9.3335 18.1389 9.3335L7.59977 9.33369C6.35316 9.33369 5.33325 10.3536 5.33325 11.6002V20.6661C5.33325 21.9127 6.35316 22.9326 7.59977 22.9326H18.1389C19.3855 22.9326 20.4054 21.9127 20.4054 20.6661V19.5895L24.57 22.2808C24.7967 22.4225 25.0516 22.5075 25.3066 22.5075C25.5332 22.5075 25.7314 22.4508 25.9581 22.3376C26.4115 22.0826 26.6664 21.6293 26.6664 21.1194L26.6666 11.1753C26.6381 10.637 26.3832 10.1836 25.9299 9.9287L25.9298 9.92854ZM19.2721 20.6659C19.2721 21.2892 18.7622 21.7991 18.139 21.7991H7.59987C6.97659 21.7991 6.46674 21.2892 6.46674 20.6659V11.6001C6.46674 10.9768 6.97659 10.4669 7.59987 10.4669H18.139C18.7622 10.4669 19.2721 10.9768 19.2721 11.6001V20.6659ZM25.5049 21.0908C25.5049 21.2325 25.4199 21.2892 25.3632 21.3175C25.3065 21.3457 25.2499 21.3742 25.1365 21.3175L20.4053 18.2295V14.0364L25.1932 10.9483C25.2782 10.8916 25.3632 10.9201 25.4199 10.9483C25.4482 10.9766 25.5616 11.0333 25.5616 11.175V21.0908H25.5049Z" fill="#9B51E0"/>
</Svg>;
const audioIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M16.3774 19.4287H16.7583C17.8194 19.4308 18.8379 19.0107 19.5889 18.2611C20.34 17.5114 20.7621 16.4937 20.7621 15.4325V9.33725C20.7641 8.2762 20.344 7.25764 19.5944 6.50662C18.8447 5.7556 17.827 5.3335 16.7658 5.3335H16.3849C15.3238 5.33146 14.3052 5.75153 13.5542 6.50118C12.8032 7.25082 12.3811 8.26854 12.3811 9.32976V15.425C12.3791 16.4861 12.7991 17.5046 13.5488 18.2556C14.2984 19.0067 15.3161 19.4287 16.3774 19.4287ZM13.9049 9.3298C13.9059 8.67435 14.1667 8.04615 14.6303 7.58269C15.0937 7.1191 15.7219 6.85836 16.3774 6.85736H16.7583C17.415 6.85634 18.0452 7.1162 18.5104 7.57999C18.9753 8.04358 19.2372 8.673 19.2383 9.3298V15.425C19.2393 16.0817 18.9794 16.712 18.5156 17.1771C18.052 17.6421 17.4226 17.9039 16.7658 17.905H16.3849C15.7282 17.906 15.0979 17.6461 14.6328 17.1823C14.1678 16.7188 13.906 16.0893 13.9049 15.4325V9.3298Z" fill="#9B51E0"/>
<Path d="M23.8094 15.238C23.8094 14.9657 23.6642 14.7142 23.4285 14.5781C23.1928 14.4421 22.9023 14.4421 22.6666 14.5781C22.4309 14.7142 22.2856 14.9657 22.2856 15.238C22.2856 17.2795 21.1965 19.1659 19.4285 20.1864C17.6605 21.2073 15.4822 21.2073 13.7142 20.1864C11.9462 19.1657 10.8571 17.2793 10.8571 15.238C10.8571 14.9657 10.7118 14.7142 10.4761 14.5781C10.2404 14.4421 9.94992 14.4421 9.7142 14.5781C9.47849 14.7142 9.33325 14.9657 9.33325 15.238C9.33359 17.0254 9.9955 18.7495 11.1913 20.078C12.3868 21.4068 14.0319 22.2459 15.8093 22.4341V22.476V25.1426H13.1426C12.8703 25.1426 12.6188 25.2879 12.4827 25.5236C12.3467 25.7593 12.3467 26.0498 12.4827 26.2855C12.6188 26.5212 12.8703 26.6665 13.1426 26.6665H20.3807C20.653 26.6665 20.9045 26.5212 21.0406 26.2855C21.1766 26.0498 21.1766 25.7593 21.0406 25.5236C20.9045 25.2879 20.653 25.1426 20.3807 25.1426H17.3331V22.476V22.4341C19.1106 22.2459 20.7557 21.4067 21.9511 20.078C23.1469 18.7494 23.8088 17.0253 23.8091 15.238H23.8094Z" fill="#9B51E0"/>
</Svg>;
const imageIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M24.1765 11.726H22.3595L22.1351 10.1332C22.0454 9.4827 21.7088 8.89932 21.1929 8.4956C20.677 8.09189 20.0263 7.93478 19.3759 8.02443L7.46392 9.68452C6.11785 9.864 5.17571 11.1202 5.35517 12.4663L6.47682 20.7665C6.65631 22.0003 7.71068 22.8976 8.92199 22.8976C9.03418 22.8976 9.14638 22.8976 9.25842 22.8752L9.72959 22.8079C9.84179 24.0641 10.8962 25.0512 12.1748 25.0512H24.1989C25.5449 25.0512 26.6666 23.952 26.6666 22.5835V14.1935C26.6442 12.8475 25.5449 11.7258 24.1765 11.7258L24.1765 11.726ZM25.2982 14.1937V21.2377L21.7539 17.1773C21.1707 16.5043 20.0938 16.5043 19.5106 17.1773L16.4597 20.677L15.3604 19.4657C14.7996 18.86 13.835 18.86 13.2966 19.4657L11.0533 21.9107V14.1937C11.0533 13.588 11.5468 13.0721 12.1749 13.0721H24.199C24.8046 13.0721 25.2982 13.588 25.2982 14.1937ZM9.70721 14.1937V21.4172L9.07908 21.5068C8.47335 21.5965 7.91252 21.1704 7.82287 20.5423L6.67882 12.2645C6.58916 11.6588 7.01526 11.0979 7.64337 11.0083L19.5553 9.37071H19.7124C20.2509 9.37071 20.7444 9.77442 20.8117 10.3352L21.0135 11.7486L12.1749 11.7484C10.8065 11.726 9.70721 12.8477 9.70721 14.1937Z" fill="#9B51E0"/>
<Path d="M15.6528 16.0331C15.6528 16.7765 15.0502 17.3791 14.3068 17.3791C13.5633 17.3791 12.9607 16.7765 12.9607 16.0331C12.9607 15.2898 13.5633 14.687 14.3068 14.687C15.0502 14.687 15.6528 15.2898 15.6528 16.0331Z" fill="#9B51E0"/>
</Svg>
const arrowIcn = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13H20V11H4V13Z" fill="#9B51E0"/>
</Svg>;
const voiceIcn = <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="40" height="40" rx="4" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M19.9245 23.8573H20.3531C21.5468 23.8596 22.6927 23.387 23.5376 22.5436C24.3825 21.7003 24.8574 20.5554 24.8574 19.3615V12.5043C24.8597 11.3106 24.3871 10.1647 23.5437 9.31978C22.7004 8.47487 21.5554 8.00001 20.3615 8.00001H19.933C18.7393 7.99771 17.5934 8.4703 16.7485 9.31365C15.9036 10.157 15.4287 11.3019 15.4287 12.4958V19.353C15.4264 20.5467 15.899 21.6926 16.7424 22.5375C17.5857 23.3824 18.7307 23.8573 19.9245 23.8573ZM17.143 12.4959C17.1442 11.7585 17.4375 11.0518 17.959 10.5304C18.4804 10.0088 19.1872 9.71548 19.9245 9.71436H20.3531C21.0918 9.71321 21.8009 10.0056 22.3242 10.5273C22.8473 11.0489 23.1419 11.757 23.1431 12.4959V19.3531C23.1442 20.0918 22.8519 20.8009 22.3301 21.3241C21.8086 21.8473 21.1005 22.1419 20.3615 22.143H19.933C19.1943 22.1442 18.4852 21.8518 17.9619 21.3301C17.4388 20.8085 17.1442 20.1004 17.143 19.3615V12.4959Z" fill="#9B51E0"/>
<Path d="M28.2859 19.1427C28.2859 18.8363 28.1225 18.5534 27.8573 18.4003C27.5921 18.2473 27.2653 18.2473 27.0001 18.4003C26.735 18.5534 26.5716 18.8364 26.5716 19.1427C26.5716 21.4394 25.3463 23.5616 23.3572 24.7097C21.3682 25.8583 18.9176 25.8583 16.9286 24.7097C14.9396 23.5614 13.7143 21.4392 13.7143 19.1427C13.7143 18.8363 13.5509 18.5534 13.2857 18.4003C13.0205 18.2473 12.6938 18.2473 12.4286 18.4003C12.1634 18.5534 12 18.8364 12 19.1427C12.0004 21.1535 12.745 23.0932 14.0903 24.5878C15.4353 26.0826 17.286 27.0266 19.2856 27.2384V27.2855V30.2855H16.2856C15.9792 30.2855 15.6963 30.4489 15.5432 30.7141C15.3902 30.9793 15.3902 31.3061 15.5432 31.5712C15.6963 31.8364 15.9793 31.9998 16.2856 31.9998H24.4285C24.7348 31.9998 25.0178 31.8364 25.1708 31.5712C25.3239 31.3061 25.3239 30.9793 25.1708 30.7141C25.0178 30.4489 24.7348 30.2855 24.4285 30.2855H20.9999V27.2855V27.2384C22.9996 27.0266 24.8504 26.0826 26.1952 24.5878C27.5404 23.0931 28.2851 21.1534 28.2855 19.1427H28.2859Z" fill="#9B51E0"/>
</Svg>



const Draft = ({navigation, posts, setPostId, setStep, getPosts, setResult, setImage, option, setOption }) => {

  const [modalVisible, setModalVisible] = useState(false);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const defaultImage = require('../../assets/Images/default-user.jpg');

  const getFullName = (date) => {
    let postDate = new Date(parseFloat(date * 1000));
    let day = postDate.getDate();
    let month = postDate.getMonth();
    let year = postDate.getFullYear();
    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    let seconds = postDate.getSeconds();
    let formatedDate = moment([year, month, day, hours, minutes, seconds]).fromNow(true)
    return formatedDate;
  };

  const editPost = (id, step) => {
    setPostId(id);
    setStep(step);
    getPostInfo(id)
  }

  async function archivePost (postId) { 
    var token = await SecureStore.getItemAsync('secure_token');
    var edit = {
      status: "ARCHIVED",
      date_updated: ""
      };
    console.log('Post URL to archive: ', `https://api.dememoriam.ai/posts/${postId}/`) 

    fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Archived post: `, data);
        getPosts();
      })
      .catch((error) => {
        console.error('Error with post saving:', error);
      });
  };

  async function getPostInfo (postId) { 
    var token = await SecureStore.getItemAsync('secure_token');
    console.log('Post URL to archive: ', `https://api.dememoriam.ai/posts/${postId}/`) 

    fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      })
      .then(response => response.json())
      .then(data => {
        setResult(data.description);
        setImage(data.image);
        console.log(`Post info: `, data);
        getPosts();
      })
      .catch((error) => {
        console.error('Error with post saving:', error);
      });
  };

  const selectedOption = (option) => {
    setStep(1);
    setOption(option);
  }


  return (
    <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraScrollHeight={Platform.OS === 'ios' ? 0 : 50}
        extraHeight={Platform.OS === 'ios' ? 0 : 50}
        >
        <TouchableWithoutFeedback>
            <SafeAreaView >
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.title}>Create</Text>
                        <View style={styles.selectOption}>
                            <Pressable style={styles.addNewStory} onPress={() => selectedOption(1)}>
                                <View style={styles.iconPosition}>{videoIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Personalised AI speaking avatar</Text>
                                    <Text style={styles.addDescription}>Clone your biometric data, like voice, face expression. Save or share it</Text>
                                </View>
                                <View style={styles.iconPosition2}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} onPress={() => selectedOption(2)}>
                                <View style={styles.iconPosition}>{videoIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>AI NFT generator</Text>
                                    <Text style={styles.addDescription}>Add any image or text - AI will mint NFT collection</Text>
                                </View>
                                <View style={styles.iconPosition2}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(2)} */>
                                <View>{videoIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Train digital clone</Text>
                                    <Text style={styles.addDescription}>Clone your biometric data, like voice, face expression. Save or share it</Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(3)} */>
                                <View>{audioIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>AI Voice cloning</Text>
                                    <Text style={styles.addDescription}>After reading few sentences - get text-to-speech model of your voice</Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(4)} */>
                                <View>{imageIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>AI avatar portait</Text>
                                    <Text style={styles.addDescription}>Upload your profile picture - Get up to 50 unique avatars </Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(4)} */>
                                <View>{imageIcn}</View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>AR avatar generator</Text>
                                    <Text style={styles.addDescription}>Clone your face & body in 3D. Save or train it.</Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.draft}>
                        <Text style={styles.title2}>Drafts</Text>
                        <View style={styles.draftList}>
                            {posts.filter(posts => posts.status.includes('EDITING')).length > 0 ? posts.filter(posts => posts.status.includes('EDITING')).map(filteredPosts => (
                                <View key={filteredPosts.id} style={styles.draftItem}>
                                    <View style={styles.draftItemTop}>
                                        <View style={styles.infoRow}>
                                            <View>{ voiceIcn }</View>
                                            <View style={styles.infoWrap}>
                                                <Text style={styles.storyName}>{filteredPosts.collection}</Text>
                                                <Text style={styles.storyInfo}>Edited {getFullName(filteredPosts.date_updated)} ago</Text>
                                            </View>
                                        </View>
                                        <Pressable onPress={() => archivePost(filteredPosts.id)}>{removeIcon}</Pressable>
                                    </View>
                                    <Pressable onPress={() => editPost(filteredPosts.id, 3)} style={styles.finishRow}><Text style={styles.addText2}>Finish your story</Text><View>{finishIcon}</View></Pressable>
                                </View>
                            )) : <Text style={{color: COLORS.gray, fontFamily: FONTS.regular}}>No drafts found</Text>}
                        </View>
                    </View>
                </ScrollView>
                <PopUp modalVisible={modalVisible} setModalVisible={setModalVisible} title={title} description={description} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default Draft

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    addNewStory: {
        borderWidth: 1,
        borderColor: "rgba(65, 65, 65, 1)",
        backgroundColor: "rgba(30, 30, 30, 1)",
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    draftItem: {
        borderWidth: 1,
        borderColor: "rgba(65, 65, 65, 1)",
        backgroundColor: "rgba(30, 30, 30, 1)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        marginBottom: 10
    },
    addText: {
        fontFamily: FONTS.medium,
        fontSize: 16,
        color: COLORS.white,
        paddingBottom: 5,
    },
    addText2: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.green,
    },
    title: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: 24,
        paddingBottom: 15
    },
    title2: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: 16,
        paddingBottom: 15
    },
    draft: {
        paddingTop: 25,
    },
    draftItemTop: {
        padding: 16,
        borderBottomColor: "rgba(65, 65, 65, 1)",
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imageIcon: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    finishRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    infoRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    storyName: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: 16,
        paddingBottom: 4
    },
    storyInfo: {
        color: "rgba(155, 155, 155, 1)",
        fontFamily: FONTS.regular
    },
    infoWrap: {
        paddingLeft: 16
    },
    addDescription: {
        color: COLORS.gray,
        fontFamily: FONTS.regular,
    },
    iconPosition: {
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-start"
    },
    iconPosition2: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    innerWrapDesc: {
        width: "75%",
    },
    comingSoon: {
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        textDecorationLine: "underline",
        paddingTop: 5,
    },
    disabled: {
        opacity: 0,
    }
})