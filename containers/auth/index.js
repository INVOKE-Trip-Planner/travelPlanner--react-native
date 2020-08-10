import React from "react";
import {View, Text} from "react-native";

import InputButton from "components/inputButton";


class Auth extends React.Component{
    render(){
        return(
            <View>

                <Text>This is the Authorization page</Text>
                
                <InputButton buttonName = "Go To Dashboard" navigate = {() => this.props.navigation.navigate("BottomTab")}/>
            </View>
        )
    }
}

export default Auth;