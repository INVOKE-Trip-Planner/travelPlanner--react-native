import React from "react";
import {View, Text} from "react-native";
import Header from "components/header";



class Profile extends React.Component{
    render(){
        return(
            <View>
                <Header/>
                <Text>This is the Profile page</Text>
            </View>
        )
    }
}

export default Profile;