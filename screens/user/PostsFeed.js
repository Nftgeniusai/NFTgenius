import { StyleSheet, Text, View, Image, Dimensions, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Circle, Svg, Path } from 'react-native-svg';
import { COLORS } from '../../constants';

var width = (Dimensions.get('window').width / 3.3) - 8;

const playButton = <Svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="20" cy="20" r="20" fill="#9B51E0"/>
<Path d="M28.5 19.134C29.1667 19.5189 29.1667 20.4811 28.5 20.866L16.5 27.7942C15.8333 28.1791 15 27.698 15 26.9282L15 13.0718C15 12.302 15.8333 11.8209 16.5 12.2058L28.5 19.134Z" fill="#020304"/>
</Svg>


const PostsFeed = ({myPosts, navigation, type, status2, status1}) => {

  const defaultImage = require('../../assets/Images/default-user.jpg');

  return (
     <ScrollView 
        horizontal={true}
        pagingEnabled={true}
        style={styles.list} >
         { myPosts.length !== 0 ? myPosts
          .sort((a, b) => (a.date_created < b.date_created) ? 1 : -1)
          .filter(myPosts => myPosts.post_type.includes(type ? type : ''))
          .filter(myPosts => myPosts.status.includes(myPosts.post_type === 'PERSONAL_AI_AVATAR' ? status1 : status2))
          .map((x, index) => (
            <Pressable key={index} onPress={() => navigation.navigate("Post", x)}>
              { x.post_type === 'PERSONAL_AI_AVATAR' ? 
                <View style={styles.containerCover}>
                  <View style={styles.play}>{playButton}</View>
                  <Image key={index} style={styles.image} source={x.image ? { uri: x.image } : defaultImage } /> 
                </View>
                :
                <View style={styles.containerCover}>
                  <Image key={index} style={styles.image} source={x.description ? { uri: JSON.parse(x.description)[0] } : defaultImage } />
                  <Text numberOfLines={1} style={styles.collectionName}>{x.collection}</Text>
                  <Text style={styles.collectionCount}>4 items</Text>
                </View>
              }
            </Pressable>
        )) : 
        <View>
          <Text style={styles.text}>Nothing found</Text>
        </View>
        }
      </ScrollView>
  )
}

export default PostsFeed

const styles = StyleSheet.create({
    image: {
      width: width,
      height: width,
      borderRadius: 8,
    },
    list: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 20,
    },
    containerCover: {
      position: "relative",
      flexDirection: 'column',
      margin: 4,
      overflow: 'hidden',
    },
    play: {
      position: "absolute",
      zIndex: 2,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    collectionName: {
      color: COLORS.white,
      flex: 1,
      width: width,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 16,
      paddingTop: 10
    },
    collectionCount: {
      color: COLORS.white,
      flex: 1,
      width: width,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 16,
      paddingTop: 8,
    },
    text: {
      color: "#979795",
      fontSize: 16
    }
})