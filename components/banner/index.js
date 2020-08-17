import React from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

class Banner extends React.Component{
    render(){
        return(
          
                <Image style = {styles.banner} source={require('assets/images/klcc.jpg')}/>
           
        )
    }
}

const styles = StyleSheet.create({
    banner : {
        height : 150,
        width : "100%",
        marginTop : 60

    }
})

export default Banner;
