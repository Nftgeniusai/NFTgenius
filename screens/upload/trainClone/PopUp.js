import { StyleSheet, Text, View, Dimensions, Pressable, Modal, ScrollView, TextInput } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg';
import React, {useState} from 'react'
import { COLORS, FONTS } from '../../../constants';
import GestureRecognizer from 'react-native-swipe-gestures';


const home = <Svg width="64" height="6" viewBox="0 0 64 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="64" height="6" rx="3" fill="#3F3F3F"/>
</Svg>
const markIcn = <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="32" height="32" rx="16" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M10 16L14.5 20.5L23 12" stroke="#9B51E0" strokeWidth="2" strokeLinecap="round"/>
</Svg>


const win = Dimensions.get('window');


const PopUp = ({modalVisible, setModalVisible, list, selected, setSelected, title, description}) => {

    const selectedOption = (option) => {
        setSelected(option);
        setTimeout(() => {
            setModalVisible(false);
            setSearched('');
          }, 500);
    };
    const [searched, setSearched] = useState('')

  return (
    <GestureRecognizer
        onSwipeUp={ () => setModalVisible(true) }
        onSwipeDown={ () => setModalVisible(false) }
        >
        <Modal 
            animationType="slide"
            presentationStyle="formSheet"
            visible={ modalVisible }
            transparent={false}
        >
            <View  style={styles.container}>
                <View>
                    <View style={styles.dismiss}>{home}</View>
                    <View style={styles.headWrap}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <Text style={styles.info} >
                        Before proceeding, make sure that
                    </Text>
                    <ScrollView style={styles.wrapper}>
                        <View style={styles.listItem}>
                            <View style={styles.icon}>{markIcn}</View>
                            <View style={styles.listItemWrap}>
                                <Text style={styles.titleItem}>Read the sentence exactly as it written</Text>
                                <Text style={styles.descriptionItem}>Made a mistake? Delete the recording and record again</Text>
                            </View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.icon}>{markIcn}</View>
                            <View style={styles.listItemWrap}>
                                <Text style={styles.titleItem}>Record at least 25 phrases</Text>
                                <Text style={styles.descriptionItem}>Quality will get better up to about 20 minutes of training</Text>
                            </View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.icon}>{markIcn}</View>
                            <View style={styles.listItemWrap}>
                                <Text style={styles.titleItem}>Be emotive! Talk naturally</Text>
                                <Text style={styles.descriptionItem}>Talk in an enthusiastic way, don’t be monotone to get natural voice clone</Text>
                            </View>
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.icon}>{markIcn}</View>
                            <View style={styles.listItemWrap}>
                                <Text style={styles.titleItem}>Be in a quiet environment</Text>
                                <Text style={styles.descriptionItem}>Make sure that nobody interrupts you, in order to get high quality clone</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={styles.button}><Text style={styles.buttonText}>Coming soon</Text></Pressable>
                </View>
            </View>
        </Modal>
    </GestureRecognizer>
  )
}

export default PopUp

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "rgba(11, 11, 11, 1)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: "space-between",
    },
    dismiss: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 5
    },
    button: {
        backgroundColor: "rgba(86, 86, 88, 1)",
        borderRadius: 8,
        padding: 16,
    },
    buttonText: {
        textAlign: "center"
    },
    wrapper: {
        paddingTop: 10,
    },
    title: {
        fontFamily: FONTS.medium,
        fontSize: 20,
        color: COLORS.white,
        paddingBottom: 5,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.white,
    },
    buttonWrapper: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 15,
        borderBottomColor: "rgba(26, 28, 29, 1)",
        borderBottomWidth: 1,
        borderColor: "rgba(65, 65, 65, 1)",
        borderWidth: 1,
        backgroundColor: "rgba(30, 30, 30, 1)",
        borderRadius: 8,
        marginBottom: 8,
    },
    item: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        textTransform: "capitalize"
    },
    headWrap: {
        borderBottomColor: "rgba(26, 28, 29, 1)",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    input: {
        backgroundColor: "rgba(26, 28, 29, 1)",
        fontFamily: FONTS.regular,
        color: COLORS.gray,
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        paddingLeft: 45,
        marginBottom: 7,
        borderWidth: 0,
        borderRadius: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    searchWrapper: {
        paddingTop: 20
    },
    info: {
        color: COLORS.gray,
        fontFamily: FONTS.medium,
        paddingTop: 15,
        fontSize: 14,
    },
    listItemWrap: {
        flexShrink: 1,
        paddingLeft: 16,
    },
    titleItem: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.white,
        paddingBottom: 5,
    },
    descriptionItem: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.gray,
    },
})