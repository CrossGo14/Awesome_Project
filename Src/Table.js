//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
  FlatList,
  Keyboard,
  SafeAreaView,TextInput
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon, { FeatherIcon } from "react-native-vector-icons/Feather";
import Tableinfo from "./Tableinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./config";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import Tablefood from "./Tablefood";
import uuid from "react-native-uuid";




// create a component
const Table = () => {
  const Navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const table = firebase.firestore().collection("Table");
  const[tabs,settabs]=useState([]);

  const [tableno, settableno] = useState("");



  const fetch = async () => {
    table.onSnapshot((querySnapshot) => {
      const tabs = [];
      querySnapshot.forEach((doc) => {
        const { Tableno } = doc.data();
        tabs.push({
          id: doc.id,
          Tableno,
        });
        return () => {};
      });
      settabs(tabs);
    });
  };

  useEffect(() => {
    fetch();
  });

  const userId=uuid.v4();

  const addtable = () => {
    const data = {
      Tableno: tableno,
      userId:userId,
      cart:[],
    };
    table
      .add(data)
      .then(() => {
        settableno(""), Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
    alert("Table Added");
  };


  return (
    <View>
     
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={tabs}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container} onPress={() => Navigation.navigate("Tablefood")}>
            <View styl={styles.innerContainer}>
              <Text>{item.Tableno}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

{/* <SafeAreaView style={styles.input}>
      <View style={styles.action}>
        <TextInput
          placeholder="Enter Number"
          value={tableno}
          onChangeText={(text) => settableno(text)}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={addtable}>
          <Text style={styles.tick}>✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> */}

    <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={tableno}
            placeholder="Add Todo"
            onChangeText={text => settableno(text)}
          />
           <TouchableOpacity onPress={addtable}>
          <View style={styles.iconContainer}>
            <Icon name="plus" size={20}></Icon>
          </View>
        </TouchableOpacity>
        </View>
        </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
backgroundColor: "#e5e5e5",
padding: 15,
borderRadius:15,
margin: 5,
marginHorizontal: 10,

  },
innerContainer:{
alignItems: 'center',
flexDirection: "column",
},
  box: {
    width: scale(150),
    height: verticalScale(150),
    borderRadius: 20,
    backgroundColor: "light-grey",
    marginTop: verticalScale(20),
  },
  floatingbutton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingLeft: scale(250),
    paddingTop: verticalScale(450),
  },
  // floatingbutton:{
  //     resizeMode:'contain',
  //     width:50,
  //     height:50,
  //     marginRight:
  // },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    fontSize: 30,
  },
  textinput: {
    borderBottomWidth: 0.5,
    fontSize: 20,
    width:300,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection:"row"
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  input:{
    marginTop:550
  },
  footer: {
    position:"absolute",
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:scale(490)
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor:"white",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    // height: 50,
    // width: 50,
    // elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:scale(240)
  },
});


//make this component available to the app
export default Table;
