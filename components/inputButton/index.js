import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";



const ButtonColor = "#F7230D";


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
        backgroundColor : ButtonColor
    },

    buttonName : {
        color : "white",
        position : "absolute",
        fontWeight: "bold",
        fontSize : 20
       
          
        
    }

})