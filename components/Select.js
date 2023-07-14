import { StyleSheet, Text, View, Dimensions, Pressable, Modal, ScrollView, TextInput } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import React, {useState} from 'react'
import { COLORS, FONTS } from '../constants';
import GestureRecognizer from 'react-native-swipe-gestures';


const home = <Svg width="64" height="6" viewBox="0 0 64 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="64" height="6" rx="3" fill="#3F3F3F"/>
</Svg>
const selectedIcon = <Svg style={{position: "absolute"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="12" cy="12" r="12" fill="#9B51E0"/>
<Path d="M6 11.5192L10.2308 15.2692L17.5 7.99993" stroke="#0B0B0B" stroke-width="2" stroke-linecap="round"/>
</Svg>
const emptyIcon = <Svg style={{position: "absolute"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="12" cy="12" r="11.5" stroke="#1A1C1D"/>
</Svg>
const searchIcon = <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M10.2 5.6C10.2 8.14051 8.14051 10.2 5.6 10.2C3.05949 10.2 1 8.14051 1 5.6C1 3.05949 3.05949 1 5.6 1C8.14051 1 10.2 3.05949 10.2 5.6ZM9.19053 9.89763C8.21844 10.7106 6.96637 11.2 5.6 11.2C2.50721 11.2 0 8.69279 0 5.6C0 2.50721 2.50721 0 5.6 0C8.69279 0 11.2 2.50721 11.2 5.6C11.2 6.96637 10.7106 8.21844 9.89763 9.19053L13.6536 12.9464C13.8488 13.1417 13.8488 13.4583 13.6536 13.6536C13.4583 13.8488 13.1417 13.8488 12.9464 13.6536L9.19053 9.89763Z" fill="#979795"/>
</Svg>

const win = Dimensions.get('window');


const Select = ({modalVisible, setModalVisible, list, selected, setSelected, title}) => {

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
            transparent={false}
            visible={ modalVisible }
        >
            <ScrollView  style={styles.container}>
                <View style={styles.dismiss}>{home}</View>
                <View style={styles.headWrap}>
                    <Text style={styles.title}>Select {title}</Text>
                </View>
                <View>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearched}
                        value={searched}
                        autoCorrect={false}
                        textContentType="search"
                        placeholder={`Search ${title}`}
                        placeholderTextColor="rgba(155, 155, 155, 1)"
                    />
                </View>
                </View>
                <View style={styles.wrapper}>
                    {list.filter(value => value.display_name.includes(searched)).map((x, index) => (
                        <Pressable key={index} onPress={() => selectedOption(x.display_name)}>
                            <View style={styles.listItem}>
                                {selected === x.display_name ? selectedIcon : emptyIcon}
                                    <Text style={styles.item}>{x.display_name}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </Modal>
    </GestureRecognizer>
  )
}

export default Select

const styles = StyleSheet.create({

    container: {
        backgroundColor: "rgb(1,1,1)",
        height: win.height - (win.height / 8),
    },
    dismiss: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
        paddingBottom: 10
    },
    wrapper: {
        padding: 20
    },
    title: {
        fontFamily: FONTS.preety,
        textAlign: "center",
        fontSize: 20,
        color: COLORS.white,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        paddingLeft: 40,
        borderBottomColor: "rgba(26, 28, 29, 1)",
        borderBottomWidth: 1
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
    }
})