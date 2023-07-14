import { StyleSheet, Text, View, Image, Dimensions, Alert, Pressable } from 'react-native'
import Svg, { Path, G, Defs, Rect, ClipPath, Pattern, Circle } from 'react-native-svg';
import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../constants";
import { getApiConfig } from '../functions/api';
import axios from "axios";
import moment from 'moment';


var width = Dimensions.get('window').width;

const Post = ({navigation, posts}) => {

  const defaultImage = require('../assets/Images/default-user.jpg');

  const more = <Svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Circle cx="14" cy="2" r="2" transform="rotate(90 14 2)" fill="white"/>
  <Circle cx="8" cy="2" r="2" transform="rotate(90 8 2)" fill="white"/>
  <Circle cx="2" cy="2" r="2" transform="rotate(90 2 2)" fill="white"/>
  </Svg>
  
      
  const getFullName = (date) => {
    let postDate = new Date(parseFloat(date * 1000));
    let day = postDate.getDate();
    let month = postDate.getMonth();
    let year = postDate.getFullYear();
    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    let seconds = postDate.getSeconds();
    let formatedDate = moment([year, month, day, hours, minutes, seconds]).fromNow(true)
    return formatedDate;
  };



  return (
    <View style={styles.list}>
        {posts.sort((a, b) => (a.date_created < b.date_created) ? 1 : -1).map((x, index) => (
            <View key={index} style={styles.postContainer}>
                <View style={styles.postTop}>
                  <View style={styles.postTopLeft}>
                    <View style={styles.details}>
                        <Pressable onPress={() => navigationActive("User")}>
                          <Image style={styles.imageIcon} source={x.owner.avatar ? { uri: x.owner.avatar } : defaultImage}  />
                        </Pressable>
                        <View style={styles.detailsLine}>
                          <Pressable onPress={() => navigation.navigate("User", x.creator)}> 
                            <Text style={styles.owner}>{ x.owner.username }</Text>
                          </Pressable>
                          <Text style={styles.info}>{getFullName(x.date_created)} · {x.access}</Text>
                        </View>
                    </View>
                  </View>
                  <View style={styles.postTopRight}>
                    <Pressable style={styles.icon} onPress={() => Alert.alert('This will show more details')}>
                      {more}
                    </Pressable>
                  </View>
                </View>
                <Pressable onPress={() => navigation.navigate("Post", x)}>
                  <Image style={styles.image} source={x.image ? { uri: x.image } : defaultImage} />
                </Pressable>
            </View>
        ))}
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  list: {
    padding: 8,
    paddingTop: 0,
    backgroundColor: "rgba(11, 11, 11, 1)",
    paddingBottom: 20,
    marginTop: -30,
  },
  postContainer: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: width,
    borderRadius: 8,
  },
  owner: {
    color: COLORS.white,
  },
  info: {
    color: COLORS.gray,
    fontFamily: FONTS.light,
    fontSize: 12,   
  },
  postTop: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: 3,
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  detailsLine: {
    paddingLeft: 8,
    display: "flex",
    flexDirection: "column",
  },
})