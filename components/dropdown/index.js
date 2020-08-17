import React from "react";
import {Text, View, StatusBar, TouchableOpacity, Image, StyleSheet} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


class DropDown extends React.Component{
    render(){
        return(
            <View>
                

                <DropDownPicker
                  
                items={this.props.item}
                placeholder={this.props.placeholder}
                containerStyle={styles.formInput}
                style={{width : "100%"}}
                dropDownStyle={{backgroundColor: 'white', position : "absolute",zIndex : 2, }}/>

            </View>
            
        )

        
    }
}


const styles = StyleSheet.create({
    formInput : {
        borderRadius : 20,
        borderColor : "black",
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 40,
        color : "#F7230D",
        marginVertical: 10,
        width : "100%"
    }
})


export default DropDown;