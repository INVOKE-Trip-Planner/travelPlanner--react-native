import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


import {MAIN_COLOR} from "common/style"



class InputForm extends React.Component{
    render(){
        return(
            <View >


                <Ionicons  name= {this.props.icon} style = {{fontSize : 20, position : "absolute", top : 25, left : 10, color : MAIN_COLOR}}/>   

                
                <TextInput placeholder = {this.props.inputPlaceHolder}
                    value= { this.props.value }
                    style = {styles.formInput}
                    keyboardType = {this.props.inputKeyType || "default"} // the symbol || represents or
                    secureTextEntry = {this.props.inputSecure || false}
                    onChangeText = {this.props.onChange}
                />
            </View>
        )
    }
}

export default InputForm


const styles = StyleSheet.create({
    formInput : {
        borderRadius : 20,
        borderColor : "black",
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 40,
       color : MAIN_COLOR,
        marginVertical: 10,
        width : "100%"
    }
})



