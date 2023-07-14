import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../../../constants";
import axios from 'axios';
import { getApiConfig } from '../../../functions/api';
import * as SecureStore from 'expo-secure-store';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Status = ({postId}) => {

    const [selectedStatus, setSelectedStatus] = useState('PUBLIC');

    async function changeStatus () { 
        var token = await SecureStore.getItemAsync('secure_token');
        var edit = {
          access: selectedStatus,
          date_updated: ""
          };
        console.log('Post URL to change status: ', `https://api.dememoriam.ai/posts/${postId}/`) 
    
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
            console.log(`Saved status: ${postId}`, data);
          })
          .catch((error) => {
            console.error('Error with post saving:', error);
          });
      };

      useEffect(() => {
        changeStatus();
      }, [selectedStatus]);

  return (
    <View style={styles.wrapper}>
        <View style={styles.logo}>
            <Text style={styles.title}>Would you like to publicly share your story or just keep it for yourself?</Text>
        </View>
        <View style={styles.list}>
            <Pressable style={[styles.selectedCollection, selectedStatus === 'PRIVATE' ? null : styles.active]} onPress={() => setSelectedStatus('PRIVATE')}>
                <View style={styles.greenContainer}>
                    <Text style={[styles.listTitle, selectedStatus === 'PRIVATE' ? null : styles.active]}>Private</Text>
                </View>
            </Pressable>
            <Pressable style={[styles.selectedCollection, selectedStatus === 'PUBLIC' ? null : styles.active]} onPress={() => setSelectedStatus('PUBLIC')}>
                <View style={styles.greenContainer}>
                    <Text style={[styles.listTitle, selectedStatus === 'PUBLIC' ? null : styles.active]}>Public</Text>
                </View>
            </Pressable>
        </View>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
    wrapper: {
        marginLeft: 16,
        marginRight: 16,
    },
    comingSoon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 5,
        paddingTop: 45,
        paddingBottom: 45,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'rgba(65, 65, 65, 1)'
    },
    title: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        color: COLORS.white,
        textAlign: "center",
    },
    title2: {
      fontSize: 20,
      fontFamily: FONTS.light,
      color: COLORS.gray,
      textAlign: "center",
  },    
    list: {
      display: "flex",
      alignSelf: 'stretch',
      flexDirection: "row",
    },
    listTitle: {
        color: COLORS.black,
        fontFamily: FONTS.regular,
        fontSize: 20,
        lineHeight: 30
      },
    listText: {
      color: COLORS.black,
      fontFamily: FONTS.medium,
      fontSize: 14
    },
    errorMessage:  {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.error,
    },
    selectedCollection: {
        backgroundColor: "#9B51E0",
        alignSelf: 'stretch',
        borderRadius: 8,
        padding: 30,
        marginTop: 20,
        borderWidth: 1,
        width: (width / 2) - 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'rgba(65, 65, 65, 1)',
        marginLeft: 5,
        marginRight: 5,
    },
    active: {
        color: "rgba(151, 151, 149, 1)",
        backgroundColor: "rgba(30, 30, 30, 1)"
    },
    error: {
      paddingTop: 10,
      color: COLORS.error,
    }
})