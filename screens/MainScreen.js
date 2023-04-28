import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image,
     useWindowDimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import axios from 'axios';


export default function MainScreen() {

const [name, setName] = useState("");
const [artist, setArtist] = useState("");
const [genre, setGenre] = useState("");
const [imageUri, setImageUri] = useState("");
const [music, setMusic]= useState([]);
const [temp, setTemp] = useState([]);

function AddSong(){
    axios.post('http://3.134.126.64:3000/add', {
      name: name, 
      artist: artist, 
      genre: genre, 
      imageuri: imageUri, 
    })
    .then(function (response) {
      console.log(response);
      setName("");
      setArtist("");
      setGenre("");
      setImageUri("");
      alert("success!");
    })
    .catch(function (error) {
      console.log(error);
      alert("Something went wrong. Please try again");
    });

};

const GridViewSelect = ({ name}) => (
  <TouchableOpacity style={styles.gridStyle1} onPress={()=>getMusicByGenre(name)}>
  <Text style={styles.gridText}>{name}</Text>
  </TouchableOpacity>
);

const GridViewShow = ({ name, artist, genre, src}) => (
  <TouchableOpacity style={styles.gridStyle2} onPress={()=>alert("Streaming music is not implemented")}>
  <Text style={styles.gridText}>{name}</Text>
  <Image source={{uri: src}} style={{height:150, width:150}} />
  <Text style={styles.gridText}>{artist}</Text>
  <Text style={styles.gridText}>{genre}</Text>
  </TouchableOpacity>
);

function getMusicByGenre(name){
console.log(name);
axios.get('http://3.134.126.64:3000/search')
      .then((response) => {
        const myObjects = response.data;
        setTemp(myObjects);
      });
      //read the data to the console
      console.log(temp);
      let tempArray =[];
        let j = 0;
      for(let i = 0; i<temp.length; i++){
        if(name == temp[i].genre ){
            console.log("match found");
            tempArray[j] =temp[i];
            j++;
            console.log(tempArray);

          } else{ console.log("not found");}
      }
      setMusic(tempArray);

      console.log(music);
}
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

    const genreNames = [
      {id: 1, name: 'Rock'},
      {id: 2, name: 'Rap'},
      {id: 3, name: 'Country'},
      {id: 4, name: 'Blues'},
      {id: 5, name: 'Pop'},
      {id: 6, name: 'R&B'},
    
    ];
    const SelectScreen=()=>(
      <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
      style={styles.imagebackground2} imageStyle={{opacity: 0.5}}> 
     <FlatList
        data={genreNames} //uses array genreNames
        renderItem={({ item }) => <GridViewSelect name={item.name}/>} //takes data array and passes it to gridview function
        keyExtractor={item => item.name}
        numColumns={2}// defines number of columns
        key={item => item.name} //id
      />
    </ImageBackground>
    );
    const ShowScreen=()=>(
    <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
      style={styles.imagebackground2} imageStyle={{opacity: 0.5}}> 
    
    
     <FlatList
        data={music} //uses array music
        renderItem={({ item }) => <GridViewShow name={item.name} artist={item.artist} genre={item.genre} src={item.imageuri}/>} //takes data array and passes it to gridview function
        keyExtractor={item => item.name}
        numColumns={2}// defines number of columns
        key={item => item.name} //id
      />
 </ImageBackground>
    );

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([ //creates tabs with Titles and keys
    { key: 'first', title: 'Add' },
    {key: 'second', title: 'Select'},
    {key: 'third', title: 'Show'},
  ]);
  
  const renderScene = SceneMap({ //renders the routes defined above
    first: AddScreen,
    second: SelectScreen,
    third: ShowScreen,

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
  imagebackground2: {
    flex: 1, 
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
  gridText: {
    color: "#c6af4f"
  }, 

  gridContainer: {
    flex: 1, 
    backgroundColor: "#fff", 

  },
  gridStyle1: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    margin: 3,
    backgroundColor: '#05352c',
  },
  gridStyle2: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    margin: 3,
    backgroundColor: '#05352c',
  },

});
