import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";


import {MAIN_COLOR} from "common/style"



class InputButton extends React.Component{
    render(){
        return(
            <TouchableOpacity style = {styles.button} onPress = {this.props.navigate}>
                <Text style = {styles.buttonName}>{this.props.buttonName}</Text>
            </TouchableOpacity>
        )
    }
}

export default InputButton


const styles = StyleSheet.create({
    button : {
        
        borderColor : "black",
        borderWidth: 1,
        width : "100%",
        height : 50,
        borderRadius : 20,
        display : "flex",
        justifyContent : "center",
        alignItems:  "center",
        backgroundColor : MAIN_COLOR
    },

    buttonName : {
        color : "white",
        position : "absolute",
        fontWeight: "bold",
        fontSize : 20
       
          
        
    }

})