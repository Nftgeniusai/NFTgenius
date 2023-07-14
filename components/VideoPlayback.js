import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable, Alert, Button, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import Video from 'react-native-video';

var width = Dimensions.get('window').width;

const VideoPlayback = ({animatedVideo}) => {

  const videoUrl = "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";

  return (
    <View style={styles.videoWrapper}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: animatedVideo,
          },
      }}
      slider={{
        visible: false,
      }}
      fullscreen={{
        visible: false,
      }}
      errorCallback={console.log('Error on loading')}
      timeVisible={false}
      style={{ height: width, width: width }}
      
    >
    <ActivityIndicator size="small" />
    </VideoPlayer>
  </View>

  )
}

export default VideoPlayback

const styles = StyleSheet.create({
  videoWrapper: {
    overflow: 'hidden',
    borderRadius: 16,
  },
})