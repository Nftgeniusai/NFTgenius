import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"; 
import { Image, Dimensions, KeyboardAvoidingView, StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react'
import { useFonts } from "expo-font";
import Registration from "./screens/registration/Registration";
import Home from "./screens/home/Home";
import Post from "./screens/Post";
import User from "./screens/user/User";
import Profile from "./screens/Settings/Profile";
import Notifications from "./screens/Settings/Notifications";
import Upload from "./screens/upload/speakingClone/Upload";
import Draft from "./screens/upload/Draft";
import Settings from "./screens/Settings/Settings";
import * as SecureStore from 'expo-secure-store';


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background : "#0B0B0B"
  }
};
const App = () => {
  const [loaded] = useFonts({
    PrettywiseExtraBold: require("./assets/Fonts/prettywise-extrabold.ttf"),
    PopinsLight: require("./assets/Fonts/Poppins-Light.ttf"),
    PopinsRegular: require("./assets/Fonts/Poppins-Regular.ttf"),
    PopinsMedium: require("./assets/Fonts/Poppins-Medium.ttf"),
  });

  const [tokenId, setTokenID] = useState();

  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    setTokenID(token);
  }
  useEffect(() => {
    getToken();
  }, [tokenId]);

  if(!loaded) return null;

  StatusBar.setBarStyle('light-content', true);
  
  return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false, 
            ...TransitionPresets.DefaultTransition,
            cardOverlayEnabled: false,
          }} 
          initialRouteName={tokenId ? "User" : "Registration"} >
          <Stack.Screen name="Registration" options={{title: 'Registration'}} component={Registration} />
          <Stack.Screen name="Home" options={{title: 'Home', unmountOnBlur: true}} component={Home} />
          <Stack.Screen name="Post" options={{title: 'Post'}} component={Post} />
          <Stack.Screen name="User" options={{title: 'User', unmountOnBlur: true}} component={User} />
          <Stack.Screen name="Upload" options={{title: 'Upload'}} component={Upload} />
          <Stack.Screen name="Draft" options={{title: 'Draft'}} component={Draft} />
          <Stack.Screen name="Settings" options={{title: 'Settings'}} component={Settings} />
          <Stack.Screen name="Notifications" options={{title: 'Notifications'}} component={Notifications} />
          <Stack.Screen 
            name="Profile" 
            options={{
              title: 'Profile', 
              cardStyle: { backgroundColor: '#0B0B0B' },
            }} component={Profile} tokenId={tokenId} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;