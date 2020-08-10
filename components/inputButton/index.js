import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";

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
        borderWidth: 2,
        width : 200,
        height : 50,
        borderRadius : 20,
        display : "flex",
        justifyContent : "center",
        alignItems:  "center"
    },

    buttonName : {
        color : "red",
        position : "absolute",
       
          
        
    }

})