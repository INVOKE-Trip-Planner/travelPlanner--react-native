import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const ButtonColor = "#F7230D";



class Iternary extends React.Component{



    _renderItemList(item){

        console.log(item)
        return(
            <View style = {{width : 200, height : 50, borderColor : "black", borderWidth : 1}}>
                <Text>{item.item}</Text>
                <View style = {{position : "absolute", bottom : 0, right : 0, flexDirection : "row"}}>
                    <TouchableOpacity onPress = {() => {console.log("HIT update")}} >
                        <Ionicons  name= "ios-open" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {console.log("HIT delete")}}>
                        <Ionicons  name= "ios-trash" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    render(){


        const iternaryData = this.props.details
        return (
            <View style = {styles.mainContainer}>
               
                <FlatList

                style = {{backgroundColor : null}}
                data = {iternaryData}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

            </FlatList>

            <TouchableOpacity style = {{position : "absolute", bottom : 10, right : 20}}>
                        <Ionicons  name= "md-add-circle" style = {{ fontSize : 50, color : ButtonColor}}/>
            </TouchableOpacity>
            
            </View>
        )
    }
}

const styles = {
    mainContainer : {
    backgroundColor : "white",
    width : "80%",
    height : 350,
    borderRadius : 20,
    marginVertical : 20

    
   }
}

export default Iternary;