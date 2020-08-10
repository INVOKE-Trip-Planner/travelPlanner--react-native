import React from "react";

import {StatusBar, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Auth from "containers/auth";
import Dashboard from "containers/dashboard";
import Profile from "containers/profile";
import Trip from "containers/trip";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



class BottomTab extends React.Component{


    


    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name = "Profile" component = {Profile}  options={{tabBarIcon:({focused})=>
                ( <Ionicons name= {focused ? "ios-home" : "ios-egg"} color="red" size = {focused ? 32 : 20}/> )
                }}/>
                <Tab.Screen name = "Dashboard" component = {Dashboard}   options={{tabBarIcon:({focused})=>
                ( <Ionicons name= {focused ? "ios-home" : "ios-egg"} color="red" size = {focused ? 32 : 20}/> )
                }}/>
                <Tab.Screen name = "Trip" component = {Trip}   options={{tabBarIcon:({focused})=>
                ( <Ionicons name= {focused ? "ios-home" : "ios-egg"} color="red" size = {focused ? 32 : 20}/> )
                }}/>
            </Tab.Navigator>
        )
    }

}


class Navigator extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <StatusBar style = {{backgroundColor : "red"}}/>
                <Stack.Navigator>

                    <Stack.Screen name = "Auth" component = {Auth}/>
                    <Stack.Screen name = "BottomTab" component = {BottomTab} options = {{
                        headerShown: true, 
                        headerTintColor: "blue",
                        
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

export default Navigator;