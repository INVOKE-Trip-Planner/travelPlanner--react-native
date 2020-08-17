import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


class AddButton extends React.Component{
    render(){
        return(
          
            <TouchableOpacity>
                <Ionicons  name=  "ios-add-circle-outline" style = {{fontSize : 100, position:"absolute", zIndex : 1, bottom : 0, right : 0}}/> 
            </TouchableOpacity>
           
        )
    }
}


export default AddButton;
