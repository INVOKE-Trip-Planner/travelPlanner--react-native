import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";
import Accomodation from "components/accomodation";
import Transportation from "components/transportation";
import Iternary from "components/iternary";


class TripDetails extends React.Component{
    constructor(props){
        super(props)
        let data = this.props.route.params.detailsData; // to pass data between parent chilren
        console.log("Trip Data is: ", data)
        this.state = {
            trip: data
        }
    }

    
    render(){

        // console.log(this.props.detailsData);
        return (
            <ScrollView>
                <View style = {{alignItems : "center"}}>
                    <Text>This is the trip detail page</Text>
                    <Accomodation details = {["Hotel Seri Malaysia", "Mandarin Oriental", "The Zon"]}/>
                    <Transportation details = {["AirAsia", "Singapore Airlines", "Kuala Lumpur"]}/>
                    <Iternary details = {["Iternary A", "Iternary B", "Iternary C"]}/>
                </View>
            </ScrollView>
        )}
}

export default TripDetails;