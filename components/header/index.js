import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';



const IconColor = "#F7230D";


class Header extends React.Component{

    render(){
        return(
            <View style = {styles.headerContainer}>
                <StatusBar/>
                <View style = {styles.LogoContainer}>
                    {/* <TouchableOpacity>
                        <Ionicons  name=  "ios-menu" style = {{fontSize : 30, color : "blue"}}/> 
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                        <Text style = {{color : IconColor}}>TripBantu</Text>
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity>
                    <Ionicons name = "md-exit" style = {{ fontSize : 30, color : IconColor}}/>
                </TouchableOpacity>
                
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerContainer : {
        width : "100%",
        height: 60,
        backgroundColor : null,
        // borderColor : "black",
        borderBottomWidth : 1,
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 20,
        // position : "absolute",
        zIndex : 2,
        marginTop: 20,

    }, 


    LogoContainer : {
        flexDirection : "row",
        alignItems : "center", 
        width : 100,
        justifyContent : "space-between"
    }
})

export default Header;



