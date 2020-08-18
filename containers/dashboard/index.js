import React from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import Header from "components/header";
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from "react-redux";
import Actions from "actions"


const ButtonColor = "#F7230D";





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
   
   
]





class Dashboard extends React.Component{



    constructor(){
        super();
        this.state={

            tripList : [],
          
        }
    }




    componentDidMount() {
        this.props.onGetAll();
    }

    componentDidUpdate(prevProps){
        const { getGetAllData} = this.props ;

        console.log("get all data is here" , getGetAllData)

        if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading ) {
            this.setState({tripList:getGetAllData.data})
            console.log("I AM HERE")
        }
    }



    _renderItemList(item){

        // console.log("renderitemishere",item.item.trip_name)

        return(

        
            <View style = {{width : 300, height : 300, backgroundColor : null, marginBottom : 20, borderColor : "black", borderWidth : 1}} >
                <Text>{item.item.id}</Text>
                <Text>{item.item.trip_name}</Text>
                <Text>{item.item.origin}</Text>
                <Text>{item.item.created_by}</Text>
                <Text>{item.item.start_date}</Text>
                <Text>{item.item.end_date}</Text>
                <Text>{item.item.trip_banner}</Text>
                <Text>End</Text>
                
                

                <View style = {{position : "absolute", bottom : 0, right : 0, flexDirection : "row"}}>

                <TouchableOpacity onPress = {() => {console.log("HIT update")}} >
                    <Ionicons  name= "ios-open" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {console.log("HIT delete")}}>
                    <Ionicons  name= "ios-trash" style = {{fontSize : 20, color : "black", marginRight : 10, marginBottom : 10}}/>   
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {this.props.navigation.navigate("TripDetails",  { detailsData:item})}} style = {{backgroundColor : "red"}}>
                    <Text style = {{fontSize :15, color : "white", marginRight : 10, marginBottom : 10}}>View Details</Text>   
                </TouchableOpacity>

                </View>

               

                
            </View>
        )
        }
    render(){
        return(
            <View style = {{backgroundColor : "white"}}>
                <Header/>
                {/* {this.state.tripList.map( list => ())} */}

                <FlatList

                style = {{backgroundColor : null}}
                data = {this.state.tripList}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

                </FlatList>
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    getGetAllData : Actions.getGetAllData(store)
})

const mapDispatchToProps = {
    onGetAll : Actions.getAll
};


export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);