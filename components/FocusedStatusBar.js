import { StatusBar, Text } from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native'

const FocusedStatusBar = (props) => {
  const isFocused = useIsFocused();
  
  return isFocused ?       
  <StatusBar
    animated={true}
    backgroundColor="#61dafb"
    barStyle="light-content"
    hidden="Visible"
  />
 : null;
}

export default FocusedStatusBar