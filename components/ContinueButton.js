import { View, SafeAreaView, FlatList, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from "react-native";
import { COLORS, FONTS } from "../constants";
import React from 'react'

var width = Dimensions.get('window').width - 32;

const ContinueButton = (props) => {
  return (
    <View style={styles.buttonWrapper}>
        { props.step === 10 && props.password !== '' ? 
        <Pressable style={({ pressed }) => [
            styles.button, props.validation ? styles.active : null,
            {
                backgroundColor: pressed
                  ? '#9B51E0'
                  : props.validation ? '#9B51E0' : 'rgba(86, 86, 88, 1)'
              },
            ]} onPress={() => props.onRegistration()}>
            <Text style={styles.buttonText}>Register</Text>
        </Pressable> :
        <Pressable style={({ pressed }) => [
            styles.button, props.validation ? styles.active : null,
            {
                backgroundColor: pressed
                  ? '#9B51E0'
                  : props.validation ? '#9B51E0' : 'rgba(86, 86, 88, 1)'
              },
            ]} onPress={() => props.handleEnterPressed(props.step === 5 ? 'username' : props.step === 9 ? 'email' : props.step === 10 ? 'password1' : props.step === 11 ? 'password2' : null, 'Enter')}>
            <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
    }

    </View>
  )
}

export default ContinueButton

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(86, 86, 88, 1)",
        backgroundColor: "rgba(86, 86, 88, 1)",
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width,
        borderRadius: 8,
        marginLeft: 16,
    },
    active: {
        borderColor: COLORS.green,
        backgroundColor: COLORS.green,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        color: "#fff",
        fontSize: 16
    },
    buttonText2: {
        fontFamily: FONTS.preety,
        color: COLORS.white,
        fontSize: 16,
        lineHeight: 16
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 40,
    },
    buttonWrapper2: {
        position: 'absolute',
        paddingTop: 20,
        bottom: 45,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "rgba(65, 65, 65, 1)"
        
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.green,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width / 2,
        marginLeft: 16,
    },
    button3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.white,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: width / 2,
        marginLeft: 16,
    },
    buttonTextSecondary: {
        color: COLORS.gray,
        fontSize: 12,
        lineHeight: 12
    }
})