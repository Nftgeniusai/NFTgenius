import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable, TextInput, ScrollView, Image, Alert, ActivityIndicator, Switch } from 'react-native';
import React, {useState, useEffect} from 'react';
import MainHeader from '../../components/MainHeader';
import { getApiConfig } from '../../functions/api';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { COLORS, FONTS } from '../../constants';
import Svg, { Path, Rect } from 'react-native-svg';
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";
import Loading from "../../components/Loading";
import PopupSuccess from "../../components/PopupSuccess";

var height = Dimensions.get('window').height;

const userIcn = <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="40" height="40" rx="20" fill="#9B51E0" fillOpacity="0.3"/>
<Path d="M20.2602 12.7998C18.4102 12.7998 16.9002 14.3099 16.9002 16.1598C16.9002 18.0097 18.4103 19.5198 20.2602 19.5198C22.1102 19.5198 23.6202 18.0099 23.6202 16.1598C23.6202 14.3097 22.1102 12.7998 20.2602 12.7998ZM20.2602 13.7599C21.5914 13.7599 22.6602 14.8286 22.6602 16.1599C22.6602 17.491 21.5914 18.5599 20.2602 18.5599C18.9291 18.5599 17.8602 17.491 17.8602 16.1599C17.8602 14.8286 18.9291 13.7599 20.2602 13.7599ZM17.8602 20.1599C16.9952 20.1599 15.9964 20.4683 15.1703 21.0998C14.3442 21.7313 13.7002 22.7273 13.7002 23.9998V26.7198C13.7003 26.8471 13.7509 26.9692 13.8408 27.0592C13.9309 27.1492 14.053 27.1998 14.1802 27.1998H26.3402C26.4675 27.1998 26.5896 27.1492 26.6796 27.0592C26.7696 26.9692 26.8201 26.8471 26.8203 26.7198V23.9998C26.8203 22.7273 26.1763 21.7313 25.3502 21.0998C24.524 20.4683 23.5253 20.1599 22.6602 20.1599H17.8602ZM17.8602 21.1198H22.6602C23.2821 21.1198 24.1231 21.3739 24.7653 21.8648C25.4073 22.3557 25.8602 23.0419 25.8602 23.9998V26.2398H14.6602V23.9998C14.6602 23.0419 15.1131 22.3557 15.7552 21.8648C16.3974 21.3739 17.2383 21.1198 17.8602 21.1198Z" fill="white"/>
</Svg>

const Notifications = ({navigation}) => {

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] =useState(false);

  //Allow notifications
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);


  //Notifications about Likes & Follows
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);


  //Notifications about sold NFT
  const [isEnabled3, setIsEnabled3] = useState(false);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);

  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

  const saveSettings = () => {
    setSaving(true);
    setTimeout(() => {
        setSaving(false);
        setSaved(true);
      }, 2000);
  }

  return (
    <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
        <MainHeader navigation={navigation} title={'Registration'} />
        <View style={styles.containerMain}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Notification</Text>
                </View>
                <View style={styles.wrapper}>
                    <View style={styles.accountRow2}>
                                <View  style={styles.accountRow}>
                                    {userIcn}
                                    <Text style={styles.name}>Allow notifications</Text>
                                </View>
                                <Switch
                                    trackColor={{false: 'rgba(65, 65, 65, 1)', true: 'rgba(65, 65, 65, 1)'}}
                                    thumbColor={isEnabled1 ? '#9B51E0' : 'rgba(151, 151, 149, 1)'}
                                    ios_backgroundColor="rgba(25, 25, 25, 1)"
                                    onValueChange={toggleSwitch1}
                                    value={isEnabled1}
                                />
                    </View>
                    <View style={styles.rowWrap}>
                        <Text style={styles.secondary}>Notifications about Likes & Follows</Text>
                        <View style={styles.accountRow2}>
                                    <View  style={styles.accountRow}>
                                        {userIcn}
                                        <Text style={styles.name}>Push</Text>
                                    </View>
                                    <Switch
                                        trackColor={{false: 'rgba(65, 65, 65, 1)', true: 'rgba(65, 65, 65, 1)'}}
                                        thumbColor={isEnabled2 ? '#9B51E0' : 'rgba(151, 151, 149, 1)'}
                                        ios_backgroundColor="rgba(25, 25, 25, 1)"
                                        onValueChange={toggleSwitch2}
                                        value={isEnabled2}
                                    />
                        </View>
                    </View>
                    <View style={styles.rowWrap}>
                        <Text style={styles.secondary}>Notifications about sold NFT</Text>
                        <View style={styles.accountRow2}>
                                    <View  style={styles.accountRow}>
                                        {userIcn}
                                        <Text style={styles.name}>Push</Text>
                                    </View>
                                    <Switch
                                        trackColor={{false: 'rgba(65, 65, 65, 1)', true: 'rgba(65, 65, 65, 1)'}}
                                        thumbColor={isEnabled3 ? '#9B51E0' : 'rgba(151, 151, 149, 1)'}
                                        ios_backgroundColor="rgba(25, 25, 25, 1)"
                                        onValueChange={toggleSwitch3}
                                        value={isEnabled3}
                                    />
                        </View>
                        <View style={styles.accountRow2}>
                                    <View  style={styles.accountRow}>
                                        {userIcn}
                                        <Text style={styles.name}>Email</Text>
                                    </View>
                                    <Switch
                                        trackColor={{false: 'rgba(65, 65, 65, 1)', true: 'rgba(65, 65, 65, 1)'}}
                                        thumbColor={isEnabled4 ? '#9B51E0' : 'rgba(151, 151, 149, 1)'}
                                        ios_backgroundColor="rgba(25, 25, 25, 1)"
                                        onValueChange={toggleSwitch4}
                                        value={isEnabled4}
                                    />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}><Pressable style={({ pressed }) => [
            styles.buttonWrapper,
            {
                backgroundColor: pressed
                  ? '#9B51E0'
                  : '#9B51E0'
              },
            ]} onPress={() => saveSettings()} ><Text style={styles.saveText}>Save</Text></Pressable></View>
        </View>
        { saving ?  <Loading title='Saving settings...' /> : null }
        { saved ? <PopupSuccess setModalVisible={setSaved} modalVisible={saved} navigation={navigation} title="Settings saved successfully" /> : null }
    </SafeAreaView>
  )
}

export default Notifications

const styles = StyleSheet.create({

    accountRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    accountRow2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 35,
    },
    button: {
        backgroundColor: COLORS.green,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        color: "rgba(11, 11, 11, 1)",
        fontFamily: FONTS.regular,
        lineHeight: 16,
    },
    name: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.medium,
        marginLeft: 20
    },
    title2: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.medium,
        paddingTop: 25,
        paddingBottom: 5,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.medium,
        color: COLORS.white,
        paddingVertical: 15
    },
    wrapper: {
        paddingHorizontal: 16
    },
    secondary: {
        color: "rgba(155, 155, 155, 1)",
        fontFamily: FONTS.medium,
        fontSize: 14,
    },
    rowWrap: {
        paddingTop: 20
    },
    buttonWrap: {
        position: "absolute",
        bottom: 0
    },
    buttonWrapper: {
        backgroundColor: COLORS.green,
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
    },
    saveText: {
        textAlign: "center",
        fontFamily: FONTS.medium,
        fontSize: 16,
        paddingVertical: 16,
    },
    containerMain: {
        justifyContent: "space-between",
        height: height - 170,
    }
})