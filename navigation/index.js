import React from "react";

import {StatusBar, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Auth from "containers/auth";
import Dashboard from "containers/dashboard";
import Profile from "containers/profile";
// import Trip from "containers/trip";
import Home from "containers/home";
import Register from "containers/register";
import AddTrip from "containers/addtrip";
import TripDetails from "containers/tripdetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const activeTabIconColor = "#F7230D";
const nonActiveTabIconColor = "#F2B9B3";



class BottomTab extends React.Component{


    


    render(){
        return(
            <Tab.Navigator  tabBarOptions={{
                activeTintColor: activeTabIconColor,
                inactiveTintColor: nonActiveTabIconColor,
              }}>
                 {/* <Tab.Screen name = "Home" component = {Home}   options={{tabBarIcon:({focused})=>
                ( <Ionicons name= "ios-home" color={focused ?  activeTabIconColor: nonActiveTabIconColor} size = {focused ? 30 : 20}/> )
                }}/> */}
                
                <Tab.Screen name = "Dashboard" component = {Dashboard}   options={{tabBarIcon:({focused})=>
                ( <Ionicons name= "md-calendar" color={focused ? activeTabIconColor : nonActiveTabIconColor} size = {focused ? 30 : 20}/> )
                }}/>
{/* 
                <Tab.Screen name = "Profile" component = {Profile}  options={{tabBarIcon:({focused})=>
                ( <Ionicons name= "ios-contact" color={focused ? activeTabIconColor : nonActiveTabIconColor} size = {focused ? 30 : 20}/> )
                }}/> */}
               
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

                
                    {/* <Stack.Screen name = "AddTrip" component = {AddTrip} options = {{
                        headerShown: false, 
                     
                        
                    }}/> */}
                  

                    <Stack.Screen name = "Auth" component = {Auth} options = {{
                        headerShown: false, 
                     
                        
                    }}/>


                     <Stack.Screen name = "Register" component = {Register} options = {{
                        headerShown: false, 
                     
                        
                    }}/>
                    <Stack.Screen name = "BottomTab" component = {BottomTab} options = {{
                        headerShown: false, 
                        headerTintColor: "blue",
                        
                    }}/>


                      <Stack.Screen name = "TripDetails" component = {TripDetails} options = {{
                        headerShown: true, 
                     
                        
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
            
        )
    }
}

export default Navigator;