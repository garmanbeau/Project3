import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground,
     useWindowDimensions, FlatList, Touchable, TextInput, TouchableOpacity } from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import axios from 'axios';
import ShowScreen from './ShowScreen';

export default function MainScreen({navigation}) {
const [name, setName] = useState("");
const [artist, setArtist] = useState("");
const [genre, setGenre] = useState("");
const [imageUri, setImageUri] = useState("");

function AddSong(){
console.log(name); 
console.log(artist); 
console.log(genre); 
console.log(imageUri); 

setName("");
setArtist("");
setGenre("");
setImageUri("");
};
    const AddScreen = () => (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
        style={styles.imagebackground} imageStyle={{opacity: 0.5}}>
             <StatusBar style="auto" />
             <Text style={{fontSize: 26, marginTop: -50, marginBottom: 50, color: "black"}}>Add a song</Text>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#c6af4f"
            onChangeText={(name) => setName(name)}
            value={name}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Artist"
            placeholderTextColor="#c6af4f"
            onChangeText={(artist) => setArtist(artist)}
            value={artist}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Genre"
            placeholderTextColor="#c6af4f"
            onChangeText={(genre) => setGenre(genre)}
            value={genre}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="URL to Image Cover"
            placeholderTextColor="#c6af4f"
            onChangeText={(imageUri) => setImageUri(imageUri)}
            value={imageUri}
            />
        </View>
            
            
            
            

        <TouchableOpacity style={[styles.inputView, {borderRadius:0, width:"50%", marginTop:50, marginBottom:-20}]} onPress={()=>AddSong()}>
            <Text style={[styles.TextInput,{fontSize: 20}]}>Submit</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>

    );

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([ //creates tabs with Titles and keys
    { key: 'first', title: 'Add' },
  ]);
  
  const renderScene = SceneMap({ //renders the routes defined above
    first: AddScreen,
    
  });

  return (
    <TabView //facilitaes the rendering and management of tabs
      navigationState={{ index, routes }} //required, represents state for the tab view
      /* each state should have an index, 
      rout, key, title, icon, 
      accessibilityLabel, testID,  */
      renderScene={renderScene}// required, renders page for tab
      onIndexChange={setIndex} // required, callback called on tab change recieves the index of new tab
      initialLayout={{ width: layout.width }}
      renderTabBar={props=> <TabBar {...props} 
        renderLabel={({route})=>(<Text style={{color: '#c6af4f', margin: 8}}>{route.title}</Text>)} //colors the Text
        style={{backgroundColor: '#05352c'}}/>} // colors the tab bar
    />
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
  inputView: { //The view for the containers of the email and password txts
    backgroundColor: "#05352c",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "#c6af4f",
  },

});
