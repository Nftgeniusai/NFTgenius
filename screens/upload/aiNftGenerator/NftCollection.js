import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Platform, Pressable, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';
import { Path, Rect, Svg } from 'react-native-svg';
import moment from 'moment';
import PopUp from '../trainClone/PopUp'


const videoIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M25.9298 9.92854C25.505 9.70187 24.9666 9.70187 24.57 9.98526L20.4054 12.6766V11.6C20.4054 10.3534 19.3855 9.3335 18.1389 9.3335L7.59977 9.33369C6.35316 9.33369 5.33325 10.3536 5.33325 11.6002V20.6661C5.33325 21.9127 6.35316 22.9326 7.59977 22.9326H18.1389C19.3855 22.9326 20.4054 21.9127 20.4054 20.6661V19.5895L24.57 22.2808C24.7967 22.4225 25.0516 22.5075 25.3066 22.5075C25.5332 22.5075 25.7314 22.4508 25.9581 22.3376C26.4115 22.0826 26.6664 21.6293 26.6664 21.1194L26.6666 11.1753C26.6381 10.637 26.3832 10.1836 25.9299 9.9287L25.9298 9.92854ZM19.2721 20.6659C19.2721 21.2892 18.7622 21.7991 18.139 21.7991H7.59987C6.97659 21.7991 6.46674 21.2892 6.46674 20.6659V11.6001C6.46674 10.9768 6.97659 10.4669 7.59987 10.4669H18.139C18.7622 10.4669 19.2721 10.9768 19.2721 11.6001V20.6659ZM25.5049 21.0908C25.5049 21.2325 25.4199 21.2892 25.3632 21.3175C25.3065 21.3457 25.2499 21.3742 25.1365 21.3175L20.4053 18.2295V14.0364L25.1932 10.9483C25.2782 10.8916 25.3632 10.9201 25.4199 10.9483C25.4482 10.9766 25.5616 11.0333 25.5616 11.175V21.0908H25.5049Z" fill="#9B51E0"/>
</Svg>;
const audioIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M16.3774 19.4287H16.7583C17.8194 19.4308 18.8379 19.0107 19.5889 18.2611C20.34 17.5114 20.7621 16.4937 20.7621 15.4325V9.33725C20.7641 8.2762 20.344 7.25764 19.5944 6.50662C18.8447 5.7556 17.827 5.3335 16.7658 5.3335H16.3849C15.3238 5.33146 14.3052 5.75153 13.5542 6.50118C12.8032 7.25082 12.3811 8.26854 12.3811 9.32976V15.425C12.3791 16.4861 12.7991 17.5046 13.5488 18.2556C14.2984 19.0067 15.3161 19.4287 16.3774 19.4287ZM13.9049 9.3298C13.9059 8.67435 14.1667 8.04615 14.6303 7.58269C15.0937 7.1191 15.7219 6.85836 16.3774 6.85736H16.7583C17.415 6.85634 18.0452 7.1162 18.5104 7.57999C18.9753 8.04358 19.2372 8.673 19.2383 9.3298V15.425C19.2393 16.0817 18.9794 16.712 18.5156 17.1771C18.052 17.6421 17.4226 17.9039 16.7658 17.905H16.3849C15.7282 17.906 15.0979 17.6461 14.6328 17.1823C14.1678 16.7188 13.906 16.0893 13.9049 15.4325V9.3298Z" fill="#9B51E0"/>
<Path d="M23.8094 15.238C23.8094 14.9657 23.6642 14.7142 23.4285 14.5781C23.1928 14.4421 22.9023 14.4421 22.6666 14.5781C22.4309 14.7142 22.2856 14.9657 22.2856 15.238C22.2856 17.2795 21.1965 19.1659 19.4285 20.1864C17.6605 21.2073 15.4822 21.2073 13.7142 20.1864C11.9462 19.1657 10.8571 17.2793 10.8571 15.238C10.8571 14.9657 10.7118 14.7142 10.4761 14.5781C10.2404 14.4421 9.94992 14.4421 9.7142 14.5781C9.47849 14.7142 9.33325 14.9657 9.33325 15.238C9.33359 17.0254 9.9955 18.7495 11.1913 20.078C12.3868 21.4068 14.0319 22.2459 15.8093 22.4341V22.476V25.1426H13.1426C12.8703 25.1426 12.6188 25.2879 12.4827 25.5236C12.3467 25.7593 12.3467 26.0498 12.4827 26.2855C12.6188 26.5212 12.8703 26.6665 13.1426 26.6665H20.3807C20.653 26.6665 20.9045 26.5212 21.0406 26.2855C21.1766 26.0498 21.1766 25.7593 21.0406 25.5236C20.9045 25.2879 20.653 25.1426 20.3807 25.1426H17.3331V22.476V22.4341C19.1106 22.2459 20.7557 21.4067 21.9511 20.078C23.1469 18.7494 23.8088 17.0253 23.8091 15.238H23.8094Z" fill="#9B51E0"/>
</Svg>;

const arrowIcn = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13V11ZM20.7071 12.7071C21.0976 12.3166 21.0976 11.6834 20.7071 11.2929L14.3431 4.92893C13.9526 4.53841 13.3195 4.53841 12.9289 4.92893C12.5384 5.31946 12.5384 5.95262 12.9289 6.34315L18.5858 12L12.9289 17.6569C12.5384 18.0474 12.5384 18.6805 12.9289 19.0711C13.3195 19.4616 13.9526 19.4616 14.3431 19.0711L20.7071 12.7071ZM4 13H20V11H4V13Z" fill="#9B51E0"/>
</Svg>;


const Collection = ({setStep}) => {

  const [modalVisible, setModalVisible] = useState(false);  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const selectedOption = (option) => {
    setStep(2);
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
                        <Text style={styles.title}>Create NFT collection</Text>
                        <View style={styles.selectOption}>
                            <Pressable style={styles.addNewStory} onPress={() => selectedOption(1)}>
                                <View style={styles.iconPosition}><Image style={styles.collectionImage} source={require('../../../assets/Images/create-2d-nft.png')} /></View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Create 2D NFT</Text>
                                    <Text style={styles.addDescription}>Add any image or text - AI will mint NFT </Text>
                                </View>
                                <View style={styles.iconPosition2}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(2)} */>
                                <View><Image style={styles.collectionImage} source={require('../../../assets/Images/create-video-nft.png')} /></View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Create video NFT</Text>
                                    <Text style={styles.addDescription}>Add any video or text - AI will mint NFT </Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(2)} */>
                                <View><Image style={styles.collectionImage} source={require('../../../assets/Images/create-3d-nft.png')} /></View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Create 3D NFT</Text>
                                    <Text style={styles.addDescription}>Add any image or text - AI will mint NFT </Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                            <Pressable style={styles.addNewStory} /* onPress={() => selectedOption(3)} */>
                                <View><Image style={styles.collectionImage} source={require('../../../assets/Images/create-ar-nft.png')} /></View>
                                <View style={styles.innerWrapDesc}>
                                    <Text style={styles.addText}>Create AR NFT</Text>
                                    <Text style={styles.addDescription}>Scan any surface or body - AI will mint NFT </Text>
                                    <Text style={styles.comingSoon}>Coming soon</Text>
                                </View>
                                <View style={[styles.iconPosition2, styles.disabled]}>{arrowIcn}</View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <PopUp modalVisible={modalVisible} setModalVisible={setModalVisible} title={title} description={description} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default Collection

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
    },
    collectionImage: {
      width: 40,
      height: 40,
    }
})