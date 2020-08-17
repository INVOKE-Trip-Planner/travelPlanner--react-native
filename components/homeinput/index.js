import React from "react";
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const testData = [1,2,3,4,5]


class HomeInput extends React.Component{
    render(){
        return(
                <View style = {{ width : "80%", position : "relative"}}>
                    <TextInput  placeholder = {this.props.inputPlaceHolder}style={{ height: 60, borderWidth: 1, width : "100%", borderRadius : 20, paddingLeft : 30 , fontSize : 15}}
                />

                <Ionicons  name=  "ios-search" style = {{marginLeft : 10, fontSize : 20, position : "absolute", top : 30, transform:  [{ translateY: -10 }] }}/> 

                <FlatList/>



                </View>

        )
    }
}


export default HomeInput;
