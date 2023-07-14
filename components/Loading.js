import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import React, {useEffect, useRef} from 'react';
import { COLORS, FONTS } from '../constants';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const loadingIcon = <Svg width="50" height="50" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect x="10.197" y="10.197" width="229.022" height="229.022" rx="12.2364" stroke="#9B51E0" strokeWidth="20.3939"/>
<Rect x="52.7809" y="52.781" width="229.022" height="229.022" rx="12.2364" stroke="white" strokeWidth="20.3939"/>
</Svg>


const Loading = (props) => {

  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View style={[styles.container, props.loading ? styles.show : styles.hide]}>
      <View style={styles.icon}><ActivityIndicator size="large" color={COLORS.green} /></View>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(11, 11, 11, 1)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height + 50,
        bottom: 0,
        zIndex: 999999,
    },
    text: {
        color: COLORS.white,
        marginTop: -10,
        fontFamily: FONTS.medium,
    },
    hide: {
      display: "none"
    },
    show: {
      display: "flex"
    },
    animation: {
      width: 150
    },
    icon: {
      marginBottom: 30,
    }
})