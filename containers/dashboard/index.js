import React from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import Header from "components/header";
import Ionicons from 'react-native-vector-icons/Ionicons';




const tripData = [
    
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
    {
    trip_name : "Trip to RubyeMouth",
    origin : "Zettahaven",
    created_by : 6,
    start_date : "1 September 2020",
    end_date : "5 September 2020",
    cost : "RM1000",
    group_type : "Unknown",
    trip_type : "Unknown",
    trip_banner : "Unknown",

},
   
]




class Dashboard extends React.Component{


    _renderItemList(item){

        // console.log("renderitemishere",item.item.name)

        return(

        
            <View style = {{width : 300, height : 100, backgroundColor : null, marginBottom : 20, borderColor : "black", borderWidth : 1}} >
                <Text>{item.item.trip_name}</Text>
                <Text>{item.item.origin}</Text>
                <Text>{item.item.start_date}</Text>
                <Text>{item.item.end_date}</Text>
                

                <View style = {{position : "absolute", bottom : 0, right : 0, flexDirection : "row"}}>

                <TouchableOpacity >
                    <Ionicons  name= "ios-open" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons  name= "ios-trash" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                </TouchableOpacity>

                </View>
                
            </View>
        )
        }
    render(){
        return(
            <View style = {{backgroundColor : "white"}}>
                <Header/>


                <FlatList

                style = {{backgroundColor : null}}
                data = {tripData}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

                </FlatList>
            </View>
        )
    }
}

export default Dashboard;