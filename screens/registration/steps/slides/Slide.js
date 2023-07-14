import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Pressable, TextComponent } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg';
import React, {useState} from 'react'
import { COLORS, FONTS } from "../../../../constants";
import FirstSlide from './FirstSlide';
import SecondSlide from './SecondSlide';
import ThirdSlide from './ThirdSlide';
import ForthSlide from './ForthSlide';

const slide1bubbles = <Svg width="68" height="12" viewBox="0 0 68 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="white"/>
<Circle cx="34" cy="6" r="6" fill="#737373"/>
<Circle cx="62" cy="6" r="6" fill="#737373"/>
</Svg>

const slide2bubbles = <Svg width="68" height="12" viewBox="0 0 68 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#737373"/>
<Circle cx="34" cy="6" r="6" fill="white"/>
<Circle cx="62" cy="6" r="6" fill="#737373"/>
</Svg>

const slide3bubbles = <Svg width="68" height="12" viewBox="0 0 68 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="6" cy="6" r="6" fill="#737373"/>
<Circle cx="34" cy="6" r="6" fill="#737373"/>
<Circle cx="62" cy="6" r="6" fill="white"/>
</Svg>



var width = Dimensions.get('window').width - 40;

const Slide = ({setStep, setShowLogin}) => {

  const [wslide, setWslide] = useState(0);

  const Connect = (x) => {
    if(x === 0) {
      setStep(2);
      setShowLogin(true);
    } else {
      setStep(3);
    }
  }
  const handleSlide = (e) => {
    var width = Dimensions.get('window').width;
    let position = e.nativeEvent.contentOffset.x
    if(position === 0) {
      setWslide(0);
    } else if(position <= width && position <= position * 2) {
      setWslide(1);
    } else {
      setWslide(3);
      position = width * 4;
    }
  }

  return (
    <View style={styles.wrapper}>
       <ScrollView 
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={(e) => { handleSlide(e) }}>
        <SecondSlide />
        <ThirdSlide />
        <ForthSlide />
      </ScrollView>
      <View style={styles.buttonsWrapper}>
        <View style={styles.bubblesWrapper}>
          {wslide === 0 ? slide1bubbles : wslide === 1 ? slide2bubbles : slide3bubbles}
        </View>
        <Pressable style={({ pressed }) => [
            styles.button1,
            {
                backgroundColor: pressed
                  ? '#9B51E0'
                  : '#9B51E0'
              },
            ]} onPress={() => Connect(1)}>
          <Text style={styles.text1}>Get started</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={() => Connect(0)}>
          <Text style={styles.text2}>Log in</Text>
        </Pressable>
      </View> 
    </View>
  )
}

export default Slide

const styles = StyleSheet.create({
wrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    position: "relative",
    height: "100%"
},

bubblesWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 25
},
buttonsWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: width,
  marginBottom: 40
},
button1: {
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
    width: "100%",
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 8,
},
text1: {
    color: "#fff",
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 16
},
button2: {
  width: "100%",
  padding: 16,
  marginRight: 5,
  marginLeft: 5,
},
text2: {
  color: COLORS.white,
  textAlign: 'center',
  fontFamily: FONTS.regular,
  fontSize: 16,
  textDecorationLine: 'underline',
},
textSkip: {
  color: COLORS.green,
  fontFamily: FONTS.medium,
  fontSize: 16
}
})