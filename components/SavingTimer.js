import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard} from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTS } from "../constants";
import * as SecureStore from 'expo-secure-store';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Generating = ({ navigation, setGenerating }) => {

    const [counter, setCounter] = useState(100);

    useEffect(() => {
        if(counter === 0) {
            console.log('Done');
            setGenerating(false);
        }
          const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
          return () => clearInterval(timer);
        }, [counter]);
    

  return (
    <View style={styles.wrapper}>
        <View style={styles.logo}>
            <Text style={styles.title}>Generating AI NFT collection</Text>
        </View>
        <View  style={styles.counterWrapper}>
            <AnimatedCircularProgress
                size={350}
                width={20}
                rotation={0}
                fill={counter}
                padding={20}
                tintColor="rgba(65, 65, 65, 1)"
                backgroundColor={COLORS.green}
                style={{ transform: [{ scaleX: -1 }] }}
                >
                {
                    (fill) => (
                    <View  style={styles.timerWrapper}>
                        <Text style={styles.counterTitle}>Time remaining</Text>
                        <Text style={styles.counter}>{counter} sec</Text>
                    </View>
                    )
                }
            </AnimatedCircularProgress>
        </View>
        <View>
            <Text style={styles.description}>
                When it’s finished, you’ll get AI NFT collection of 4 images generated for you.
            </Text>
        </View>
    </View>
  )
}

export default Generating

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        position: "absolute",
        backgroundColor: "#0B0B0B",
        top: 120,
        left: 0,
        height: height,
        width: width
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
    counter: {
      color: COLORS.white,
      fontFamily: FONTS.medium,
      fontSize: 60,
    },
    timerWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scaleX: -1 }]
    },
    counterTitle: {
        color: COLORS.white,
        fontFamily: FONTS.regular,
        fontSize: 14
    },
    description: {
        padding: 20,
        color: COLORS.gray,
        fontFamily: FONTS.regular,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 26,
    },
    counterWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 50
    }
})