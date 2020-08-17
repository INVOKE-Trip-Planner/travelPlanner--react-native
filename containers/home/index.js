import React from "react";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image, StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


import Header from "components/header";
import Banner from "components/banner";
import AddButton from "components/addbutton";
import HomeInput from "components/homeinput";


const ButtonColor = "#F7230D";


const images = {
    kualalumpur: require('assets/images/kualalumpur.jpg'),
    penang: require('assets/images/penang.jpg'),
    singapore: require('assets/images/singapore.jpg'),
}

const tripData = ["kualalumpur", "penang", "singapore"]

class Home extends React.Component{



    _renderItemList(item)  {
        let src = null;
        switch (item) {

            case 'kualalumpur':
                src = images.kualalumpur
                break;
            case 'penang':
                src= images.penang
                break;
            case 'singapore':
                src = images.singapore
                break
            default :
                return;
        }
        return(

           
            <View style = {{ flexDirection : "column"}}>
                <Text>{item}</Text>
                <Image style = {{ width : 100, height : 100}} source={src}/>          
                {/* <Text>{`assets/images/${item}.jpg`}</Text>    */}
            </View>
        )

        
    }
    
    render(){
        return (

            // <View style = {styles.MainContainer}>
            //     <Text>test</Text>
            // </View>
            <View style = {styles.homeContainer}>
                    
                    <StatusBar style = {{backgroundColor : "red"}}/>


                    <View style = {{ alignItems : "center"}}>
            
                    <Header/>
                    
                
                    
                  
                    {/* <AddButton/> */}
                    <Text style = {{fontSize : 50, color :ButtonColor }}>Trips</Text>
                    <HomeInput inputPlaceHolder = "Search your dream destination here"/>





                    <FlatList
                    // keyExtractor = {} 
                    data = {tripData}
                    renderItem = {({item}) => this._renderItemList(item)} 
                     numColumns = {3}
                     contentContainerStyle= {{alignItems : "center"}}
                   
                     />

                    </View>

                    <TouchableOpacity style = {{position : "absolute", bottom : 10, right : 20}}>
                        <Ionicons  name= "md-add-circle" style = {{ fontSize : 50, color : ButtonColor}}/>
                    </TouchableOpacity>

                    

            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeContainer : {
        flex : 1, 
        backgroundColor: "white",
        // alignItems : "center"
    }
})

export default Home;