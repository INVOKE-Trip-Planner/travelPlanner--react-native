import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Alert} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Actions from "actions";
import {connect} from "react-redux"





import {MAIN_COLOR} from "common/style";








class Header extends React.Component{

    constructor(props){
        super(props)

    }



    logoutPressed() {
        this.props.onResetUserSessions();
        Alert.alert("Bubye", "Logout Succesfully", [{
            text: "Okay",
            onPress :() => this.props.navigation.navigate("Auth")
        }])

    }

    render(){
        return(
            <View style = {styles.headerContainer}>
                <StatusBar/>
                <View style = {styles.LogoContainer}>
                    {/* <TouchableOpacity>
                        <Ionicons  name=  "ios-menu" style = {{fontSize : 30, color : "blue"}}/> 
                    </TouchableOpacity> */}
                    <TouchableOpacity style = {{flexDirection : "row"}}>
                       <Text style = {{fontWeight : "normal"}}>Trip</Text> 
                       <Text style = {{color : MAIN_COLOR, fontWeight : "bold"}}>Bantu </Text>
                    </TouchableOpacity>
                    
                </View>
               
                
                
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



const mapStateToProps = (store) => ({

})

const mapDispatchToProps = {
    onResetUserSessions: Actions.resetUserSession,
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);




