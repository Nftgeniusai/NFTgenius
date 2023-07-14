import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, RefreshControl } from "react-native"
import React, {useState, useEffect} from 'react'
import { BottomBar, HomeHeaderOnly, Post, LoadingPosts } from "../../components"
import { COLORS, FONTS } from "../../constants";
import { getApiConfig } from '../../functions/api';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import AndroidSafeAreaView from "../../components/AndroidSafeAreaView";

var height = Dimensions.get('window').height;

const Home = ({navigation}) => {

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const refreshFeed = async () => {
    console.log('Refeshing')
    var token = await SecureStore.getItemAsync('secure_token');
    setTimeout(() => {
    setLoading(true);
      axios.get(`/feed/`, getApiConfig(true, token)).then((response) => {
        console.log('Total posts: ', response['data'].count, ' posts.');
        setPosts(response['data'].results);
        setLoading(false);
      }).catch((error) => {
        setTimeout(() => {
          if(retryCounter !== 10 ) {
            setRetryCounter(retryCounter + 1);
            setLoading(true);
            refreshFeed();
            console.log('Retry in 2sec...', retryCounter);
          } else {
            setLoading(false);
            SecureStore.deleteItemAsync('auth_user');
            SecureStore.deleteItemAsync('secure_token');
            navigation.navigate("Registration");
          }
        }, 3000);
        console.log('Error getting profile HOME:', error)
      });
    }, 500);
  }

  useEffect(() => {
    refreshFeed();
    console.log('Refreshed page by refreshing');
  }, [refreshing]);


  return (
    <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
      <HomeHeaderOnly navigation={navigation} refreshFeed={refreshFeed} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        { loading ? <LoadingPosts navigation={navigation} posts={posts} /> : <Post navigation={navigation} posts={posts} /> }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height,
    backgroundColor: "rgba(11, 11, 11, 1)",
  },
  text: {
    color: COLORS.white,
  },
})