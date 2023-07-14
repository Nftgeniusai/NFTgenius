import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants';
import Svg, { Circle, Path } from 'react-native-svg';


const success = <Svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="32.5" cy="32" r="32" fill="rgba(117, 233, 187, 0.4)" fill-opacity="0.4"/>
<Path d="M16.5 30.8333L27.9652 42L48.5 22" stroke="white" stroke-width="5" stroke-linecap="round"/>
</Svg>


const PopUpInfo = ({setInfoVisible, infoVisible, navigation, title, description}) => {

    const closed = () => {
      setInfoVisible(!infoVisible);
    }


  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={infoVisible}
        onRequestClose={() => {
          setInfoVisible(!infoVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closed()}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default PopUpInfo

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "rgba(11, 11, 11, .3)"
      },
      modalView: {
        margin: 20,
        backgroundColor: 'rgba(11, 11, 11, 1)',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonClose: {
        borderColor: COLORS.green,
        backgroundColor: COLORS.green,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        alignSelf: 'stretch',
        textAlign: 'center',
      },
      textStyle: {
        fontFamily: FONTS.medium,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
        fontFamily: FONTS.medium,
        fontSize: 22,
      },
      modalDescription: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#979795',
        fontFamily: FONTS.regular,
        fontSize: 16,
      },
      svgContainer: {
        paddingBottom: 10
      }

})