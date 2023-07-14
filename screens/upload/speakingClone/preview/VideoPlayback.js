import { StyleSheet, Text, View, Image, Dimensions, TextInput, Pressable, Alert, Button, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'

var width = Dimensions.get('window').width;

const VideoPlayback = ({animatedVideo, stopVideo, muteVideo}) => {
  return (
        <VideoPlayer
          videoProps={{
            shouldPlay: stopVideo,
            resizeMode: ResizeMode.CONTAIN,
            isMuted: false,
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
          timeVisible={false}
          style={{ height: width, width: width }}
        
      >
      <ActivityIndicator size="small" />
      </VideoPlayer>
  )
}

export default VideoPlayback

const styles = StyleSheet.create({})