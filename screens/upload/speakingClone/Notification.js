import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../../constants'

const Notification = ({notificationText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{color: "white", fontSize: 14, fontFamily: FONTS.regular}}>{notificationText}</Text>
      </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(11, 11, 11, 0.8)",
    paddingTop: 10,
    paddingBottom: 10
  },
  wrapper: {
    backgroundColor: "rgba(117, 233, 187, 0.7);",
    borderRadius: 4,
    padding: 12,
  }
})