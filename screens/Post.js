import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Platform, Pressable, Image, Modal, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern, Circle } from 'react-native-svg';
import { COLORS, FONTS } from "../constants";
import VideoPlayback from "../components/VideoPlayback"
import moment from 'moment';

var width = Dimensions.get('window').width;

const mark = <Svg style={{marginLeft: 3}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M7.28999 0.715874C7.68117 0.321464 8.31883 0.321464 8.71001 0.715875L9.59547 1.60865C9.82293 1.83799 10.1472 1.94334 10.466 1.8915L11.7071 1.68969C12.2554 1.60053 12.7713 1.97534 12.8559 2.52435L13.0475 3.76709C13.0967 4.08632 13.2971 4.36212 13.5855 4.50758L14.7082 5.07382C15.2042 5.32398 15.4012 5.93043 15.147 6.42434L14.5716 7.54235C14.4237 7.82954 14.4237 8.17046 14.5716 8.45765L15.147 9.57566C15.4012 10.0696 15.2042 10.676 14.7082 10.9262L13.5855 11.4924C13.2971 11.6379 13.0967 11.9137 13.0475 12.2329L12.8559 13.4756C12.7713 14.0247 12.2554 14.3995 11.7071 14.3103L10.466 14.1085C10.1472 14.0567 9.82293 14.162 9.59547 14.3913L8.71001 15.2841C8.31883 15.6785 7.68117 15.6785 7.28999 15.2841L6.40453 14.3913C6.17707 14.162 5.85284 14.0567 5.53402 14.1085L4.29291 14.3103C3.74461 14.3995 3.22873 14.0247 3.14409 13.4756L2.9525 12.2329C2.90328 11.9137 2.7029 11.6379 2.41449 11.4924L1.29179 10.9262C0.795802 10.676 0.598755 10.0696 0.85298 9.57566L1.42844 8.45765C1.57626 8.17046 1.57626 7.82954 1.42844 7.54235L0.85298 6.42434C0.598754 5.93043 0.795803 5.32398 1.29179 5.07382L2.41449 4.50758C2.7029 4.36212 2.90328 4.08632 2.9525 3.76709L3.14409 2.52435C3.22873 1.97534 3.74461 1.60053 4.29291 1.68969L5.53402 1.8915C5.85284 1.94334 6.17707 1.83799 6.40453 1.60865L7.28999 0.715874Z" fill="#9B51E0"/>
<Path d="M5.00098 7.28L7.00098 9.2L10.3343 6" stroke="#0B0B0B" strokeWidth="1.5" strokeLinecap="round"/>
</Svg>
const share = <Svg style={{marginRight: 10}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M16.9091 22.3234C16.8364 22.3234 16.7636 22.3072 16.6949 22.2749C16.5049 22.1901 16.3837 22.0042 16.3837 21.7982V18.8728C13.3939 18.8769 11.006 18.986 8.94541 21.7294C8.80802 21.9112 8.57366 21.9839 8.35962 21.9112C8.14557 21.8426 8 21.6406 8 21.4143C8 18.178 8.97781 15.7661 10.9091 14.2426C12.2869 13.1557 14.1738 12.5416 16.3839 12.4567V9.52342C16.3839 9.31739 16.5051 9.13153 16.695 9.04668C16.885 8.96184 17.1031 8.99412 17.2566 9.13152L23.5636 14.691C23.8423 14.9375 24 15.2889 24 15.6607C24 16.0325 23.8425 16.3839 23.5636 16.6304L17.2566 22.1899C17.1596 22.2788 17.0343 22.3232 16.9091 22.3232L16.9091 22.3234ZM16.7556 17.8223C17.1313 17.8223 17.4344 18.1253 17.4344 18.5011V20.6344L22.8687 15.8422C22.9415 15.7776 22.9495 15.7008 22.9495 15.6605C22.9495 15.62 22.9374 15.5433 22.8687 15.4787L17.4344 10.6868V12.8202C17.4344 13.1919 17.1314 13.4949 16.7636 13.499C13.5312 13.5353 9.72934 14.7233 9.13122 19.9312C9.9959 19.111 10.9615 18.5614 12.0968 18.2382C13.5675 17.822 15.1877 17.822 16.7556 17.822L16.7556 17.8223Z" fill="white"/>
<Rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white"/>
</Svg>

const view = <Svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M16.572 5.9214C15.3668 2.37545 12.0304 0 8.29255 0C4.55466 0 1.21831 2.37551 0.0130712 5.9214C-0.00435706 5.9738 -0.00435706 6.0262 0.0130712 6.0786C1.21831 9.62455 4.55466 12 8.29255 12C12.0304 12 15.3668 9.62449 16.572 6.0786C16.5895 6.0262 16.5895 5.95626 16.572 5.9214ZM8.29255 11.5107C4.78163 11.5107 1.65489 9.29242 0.484687 5.99117C1.65495 2.68986 4.78163 0.471616 8.29255 0.471616C11.8035 0.471616 14.9302 2.68992 16.1004 5.99117C14.9301 9.29248 11.8035 11.5107 8.29255 11.5107Z" fill="white"/>
<Path d="M8.2924 2.65479C6.45834 2.65479 4.95605 4.15701 4.95605 5.99113C4.95605 7.82525 6.45828 9.32747 8.2924 9.32747C10.1265 9.32747 11.6287 7.82525 11.6287 5.99113C11.6287 4.15701 10.1265 2.65479 8.2924 2.65479ZM8.2924 8.85586C6.70292 8.85586 5.42773 7.56324 5.42773 5.99119C5.42773 4.40171 6.72035 3.12652 8.2924 3.12652C9.88188 3.12652 11.1571 4.41914 11.1571 5.99119C11.1571 7.58067 9.88188 8.85586 8.2924 8.85586Z" fill="white"/>
</Svg>
const back = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M20 13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V13ZM3.29289 11.2929C2.90237 11.6834 2.90237 12.3166 3.29289 12.7071L9.65685 19.0711C10.0474 19.4616 10.6805 19.4616 11.0711 19.0711C11.4616 18.6805 11.4616 18.0474 11.0711 17.6569L5.41421 12L11.0711 6.34315C11.4616 5.95262 11.4616 5.31946 11.0711 4.92893C10.6805 4.53841 10.0474 4.53841 9.65685 4.92893L3.29289 11.2929ZM20 11L4 11V13L20 13V11Z" fill="white"/>
</Svg>

const close = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path fillRule="evenodd" clipRule="evenodd" d="M10.2388 20.6091C9.92058 20.9272 9.92058 21.4431 10.2388 21.7613C10.557 22.0795 11.0728 22.0795 11.391 21.7613L16 17.1523L20.6091 21.7614C20.9272 22.0796 21.4431 22.0796 21.7613 21.7614C22.0795 21.4432 22.0795 20.9273 21.7613 20.6091L17.1523 16.0001L21.7615 11.3909C22.0796 11.0727 22.0796 10.5568 21.7615 10.2386C21.4433 9.92045 20.9274 9.92045 20.6092 10.2386L16 14.8478L11.3909 10.2387C11.0727 9.92049 10.5568 9.92049 10.2386 10.2387C9.92045 10.5569 9.92045 11.0728 10.2386 11.3909L14.8478 16.0001L10.2388 20.6091Z" fill="#9B51E0"/>
</Svg>


const dots = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="18" cy="12" r="2" transform="rotate(90 18 12)" fill="white"/>
<Circle cx="12" cy="12" r="2" transform="rotate(90 12 12)" fill="white"/>
<Circle cx="6" cy="12" r="2" transform="rotate(90 6 12)" fill="white"/>
</Svg>




const Post = ({navigation, route}) => {

    console.log('Post data: ', route.params)

    const [externalUrls, setExternalUrls] = useState(route.params.description !== '' & route.params.post_type === 'AI_NFT_GANERATOR' ? JSON.parse(route.params.description) : '');
    const defaultImage = require('../assets/Images/imagePlaceholder.jpg');
    const [openImage, setOpenImage] = useState(false);
    const [openedImage, setOpenedImage] = useState();
    const [select, setSelect] = useState(false);
    const [selectedNfts, setSelectedNfts] = useState();

    
    const getFullName = (date) => {
        let postDate = new Date(parseFloat(date * 1000));
        let day = postDate.getDate();
        let month = postDate.getMonth();
        let year = postDate.getFullYear();
        let hours = postDate.getHours();
        let minutes = postDate.getMinutes();
        let seconds = postDate.getSeconds();
        let formatedDate = moment([year, month, day, hours, minutes, seconds]).fromNow(true);
        return formatedDate;
      };
      const handleSelectNft = (image_url) => {
        if(select) {
          setSelectedNfts(image_url);
        } else {
          setOpenImage(true);
          setOpenedImage(image_url);
        }
      }
      
       console.log('Images:', externalUrls)
       
  return (
    <KeyboardAwareScrollView
    enableOnAndroid={true}
    enableAutomaticScroll={(Platform.OS === 'ios')}
    extraScrollHeight={Platform.OS === 'ios' ? 0 : 50}
    extraHeight={Platform.OS === 'ios' ? 0 : 50}
    >
        <TouchableWithoutFeedback>
            <SafeAreaView style={styles.postContainer}>
                <View style={styles.navigation}>
                    <Pressable style={styles.back} onPress={() => navigation.goBack()}>{back}</Pressable>
                    <View style={styles.centerIt}>
                        <Text style={styles.ownerSecond}>{ route.params.owner.first_name } { route.params.post_type === 'AI_NFT_GANERATOR' ? route.params.collection : route.params.owner.last_name }</Text>
                        <Text style={styles.status}>{getFullName(route.params.date_created)} · <Text style={styles.status}>{ route.params.access }</Text></Text>
                    </View>
                    <View></View>
                </View>
                { route.params.post_type === 'AI_NFT_GANERATOR' ? 
                    <ScrollView style={styles.scrollInfo1}>
                                <View style={styles.infoBlockFlex2}>
                                    {externalUrls ? externalUrls.map((x, index) => (
                                        <Pressable key={index} style={[styles.nftImage, selectedNfts === x ? styles.nftImageSelected : null ]} onPress={() => handleSelectNft(x)}>
                                            <Image style={styles.images} source={{ uri: x }} />
                                            <Text style={styles.imageName}>{route.params.collection} #{index}</Text>
                                        </Pressable>
                                    )) : null}
                                </View>  
                    </ScrollView>


                    :
                    <ScrollView style={styles.scrollInfo}>
                        <View style={styles.videoContainer}>
                            {!route.params.video ? !route.params.image ? <Image style={styles.image} source={defaultImage} /> : <Image style={styles.image} source={{ uri: route.params.image }} /> : <VideoPlayback animatedVideo={route.params.video} />}
                        </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.longDescription}>{ route.params.description }</Text>
                            </View>
                            <View style={styles.infoBlock}>
                                <View style={styles.infoBlockFlex}>
                                    <Text style={styles.nameText2}>Contract address</Text>
                                    <Text style={styles.greenText2}>{ route.params.contract ? route.params.contract : 'Not' }</Text>
                                </View>
                                <View style={styles.infoBlockFlex}>
                                    <Text  style={styles.nameText2}>Blochckain</Text>
                                    <Text  style={styles.greenText2}>{ route.params.chain }</Text>
                                </View>
                                <View style={styles.infoBlockFlex}>
                                    <Text  style={styles.nameText2}>Token standard</Text>
                                    <Text  style={styles.greenText2}>{ route.params.standart }</Text>
                                </View>
                                <View style={styles.infoBlockFlex}>
                                    <Text  style={styles.nameText2}>Owner</Text>
                                    <Text  style={styles.greenText2}>{ route.params.owner.username }</Text>
                                </View>
                            </View>        
                    </ScrollView>
                }
                { select ? null :
                    <Modal
                        animationType={"slide"}
                        visible={openImage}
                        transparent={true}
                        onRequestClose={() => setOpenImage(false)}
                    >
                        <ScrollView contentContainerStyle={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Image style={{width: '100%', height: width}} source={{uri:`${openedImage}`}} />
                        </View>
                        <Pressable
                            style={[styles.buttonForClose, styles.buttonClose]}
                            onPress={() => setOpenImage(!openImage)}>
                            {close}
                            </Pressable>
                        </ScrollView>
                    </Modal>
                }
            </SafeAreaView>
        </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default Post

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgba(11, 11, 11, 1)",
        borderTopColor: "rgba(65, 65, 65, 1)",
        borderTopWidth: 1,
    },
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderColor: "rgba(155, 155, 155, 1)",
        width: width - 32,
        borderWidth: 1,
        padding: 14,
        margin: 16,
        borderRadius: 5
    },
    sellText: {
        color: COLORS.gray,
        fontFamily: FONTS.preety,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 20,
    },
    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    buttonInfo: {
        color: COLORS.gray,
        fontFamily: FONTS.light,
        lineHeight: 16,
        textAlign: "center",
        fontSize: 16
    },
    navigation: {
        backgroundColor: "background: rgba(11, 11, 11, 0.8)",
        padding: 12,
        paddingBottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageBottom: {
        backgroundColor: "background: rgba(20, 20, 20, 1)",
        borderBottomColor: "rgba(65, 65, 65, 1)",
        borderBottomWidth: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: 14
    },
    ownerSecond: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
        fontSize: 14,
    },
    status: {
        color: COLORS.gray,
        fontFamily: FONTS.light,
        marginTop: 0,
        lineHeight: 16,
        fontSize: 12,
        textTransform: "capitalize"
    },
    shortDescription: {
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        fontSize: 14,
    },
    longDescription: {
        color: COLORS.white,
        fontFamily: FONTS.regular,
        fontSize: 16,
        marginTop: 0,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: width,
      },
    images: {
        width: (width / 2) - 18,
        height: (width / 2) - 18,
        borderRadius: 8,
        margin: 4
    },
    views: {
        color: COLORS.white,
        fontFamily: FONTS.light,
        fontSize: 14
    },
    back: {
    },
    greenText2: {
        color: COLORS.green,
        fontFamily: FONTS.regular,
        fontSize: 16,
    },
    nameText2: {
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        fontSize: 16,
    },
    infoBlockFlex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 5
    },
    infoBlockFlex2: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 5,
        flexWrap: "wrap"
    },
    infoBlock: {
        paddingBottom: 100,
        paddingLeft: 16,
        paddingRight: 16,
    },
    collection: {
        color: COLORS.green,
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    },
    creator: {
        color: COLORS.white,
        fontFamily: FONTS.preety,
        textAlign: "center",
        fontSize: 26,

    },
    owner: {
        color: COLORS.white,
        textAlign: "center",
        fontSize: 16,
    },
    green: {
        color: COLORS.green,
    },
    descriptionContainer: {
        paddingBottom: 30,
        borderBottomColor: "rgba(25, 25, 25, 1)",
        borderBottomWidth: 1,
        margin: 16,
        marginTop: 26
    },
    postContainer: {
        backgroundColor: "rgba(11, 11, 11, 1)",
    },
    centerIt: {
        justifyContent: "center",
        alignItems: "center"
    },
    scrollInfo: {
        marginBottom: 20,
        marginTop: 20
    },
    scrollInfo1: {
        margin: 10,
    },
    imageBottomRight: {
        display: "flex",
        flexDirection: "row",
    },
    imageBottomLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textWrapper: {
        marginLeft: 10
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    statusGreen: {
        color: COLORS.green,
        fontFamily: FONTS.regular
    },
    videoContainer: {
    },
    imageName: {
        color: COLORS.white,
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 16,
        paddingBottom: 15,
        paddingTop: 15,
        width: (width / 2) - 20,
    },
    nftImage: {
        width: (width / 2) - 20,
        height: (width / 2) - 20,
        padding: 0,
        margin: 4,
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
      },
      imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        overflow: "hidden",
      },
      buttonClose: {
        position: "absolute",
        top: 80,
        right: 20,
      },
      modalContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        height: "100%"
      },
      modalView: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
      },
})