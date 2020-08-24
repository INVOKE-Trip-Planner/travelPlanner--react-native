import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, FlatList} from "react-native";
import Accomodation from "components/accomodation";
import Transportation from "components/transportation";
import Iternaries from "components/iternary";


const ButtonColor = "#F7230D";



class TripDetails extends React.Component{
    constructor(props){
        super(props)
        let data = this.props.route.params.detailsData; // to pass data between parent chilren
        // console.log("Trip Data is: ", data.item.destinations[0].id)
        this.state = {
            trip: data,
            data_destination_array : data.item.destinations,
            selected : data.item.destinations[0].id,
            accommodationsdatafortheid : data.item.destinations[0].accommodations,
            transportsdatafortheid : data.item.destinations[0].transports,
            itinerariesdatafortheid : data.item.destinations[0].itineraries,
            showaaccommodation : true,
            showtransports : true,
            showitineraries : true,
            filterselected : "all",
            all : "all",
            accommodations : "accommodations",
            transports : "transports",
            iternary : "iternary",

        }

        let data_destination_array = data.item.destinations;
        console.log("ALL DESTINATION DATA", data_destination_array)

        
        
    }


    
    _renderItemList(item){

        // console.log("renderitemishere",item.item.transports)
    
            return(

                <TouchableOpacity onPress = {()=>this.setState({selected:item.item.id, 
                accommodationsdatafortheid: item.item.accommodations,
                transportsdatafortheid : item.item.transports,
                itinerariesdatafortheid : item.item.itineraries,
                })}
                style = {{backgroundColor : null}}>
                <View style = {[{marginHorizontal : 10, height : 50, width : 100, justifyContent : "center", alignItems : "center", borderRadius : 20}, {backgroundColor : this.state.selected == item.item.id ? ButtonColor : "white"}]}>
                    <Text>{item.item.location}</Text>
                </View>
                </TouchableOpacity>
            )
    
    }

    
    render(){

        // console.log(this.props.detailsData);
        return (
            <ScrollView>
                <View style = {{alignItems : "center", marginBottom :10}}>
                    <Text style = {{backgroundColor :'red', width : "100%", color : "white", textAlign :"center", marginBottom : 10}}>Select your Destination</Text>
                    <FlatList
                    style = {{backgroundColor : null}}
                    data = {this.state.data_destination_array}
                    renderItem = {(item) => this._renderItemList(item)}
                    numColumns = {1}
                    contentContainerStyle= {{alignItems : "center"}}
                    horizontal = {true}
                    showsHorizontalScrollIndicator={false}
                        >
                        

                   </FlatList>

                   <View>
                       {/* <Text>Destination ID is {this.state.selected}</Text> */}
                   </View>
                </View>

                <Text style = {{backgroundColor :'red', width : "100%", color : "white", textAlign :"center", marginBottom : 10}}>Filter Trip Detail By  </Text>


                <View style = {{flexDirection :"row",width : "100%", justifyContent : "space-between", paddingHorizontal : 20}}>
                    <TouchableOpacity onPress = {() => this.setState({showaaccommodation: true, showtransports: true, showitineraries: true, filterselected :this.state.all })}>
                        <Text style = {{color : this.state.filterselected == this.state.all ? "green" : "blue"}}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({showaaccommodation: true, showtransports: false, showitineraries: false, filterselected :this.state.accommodations })}>
                        <Text style = {{color : this.state.filterselected == this.state.accommodations ? "green" : "blue"}}>Accomodation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({showaaccommodation: false, showtransports: true, showitineraries: false, filterselected :this.state.transports })}>
                        <Text style = {{color : this.state.filterselected == this.state.transports ? "green" : "blue"}}>Transportation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({showaaccommodation: false, showtransports: false, showitineraries: true, filterselected :this.state.iternary })}>
                        <Text style = {{color : this.state.filterselected == this.state.iternary ? "green" : "blue"}}>Iternaries</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style = {{width : "100%", backgroundColor : null, alignItems :"center"}}>


                    {this.state.showaaccommodation && <Accomodation destinationID = {this.state.selected} destinationData = {this.state.accommodationsdatafortheid}/>}
                    {this.state.showtransports && <Transportation destinationID = {this.state.selected} destinationData = {this.state.transportsdatafortheid}/>}
                    {this.state.showitineraries && <Iternaries destinationID = {this.state.selected} destinationData = {this.state.itinerariesdatafortheid}/>}

                    
                    
                    

                </View>
               

            </ScrollView>
        )}
}

export default TripDetails;