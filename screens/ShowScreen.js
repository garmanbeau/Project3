import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground,
     useWindowDimensions, FlatList, Touchable, TextInput, TouchableOpacity } from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import axios from 'axios';

export default function ShowScreen({route}) {
const [name, setName] = useState("");

console.log(route.params)
  return (
    <View style={styles.container}>
    <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
    style={styles.imagebackground} imageStyle={{opacity: 0.5}}>
         <StatusBar style="auto" />
      <Text> </Text>
  </ImageBackground>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  imagebackground: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },

});
