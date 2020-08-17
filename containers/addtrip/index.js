import React from "react";
import {Text, View, StatusBar, TouchableOpacity, Image, Alert} from "react-native";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';




class AddTrip extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date : new Date(), // Pure JS function
            mode : "date", // date format
            showstartDate : false ,
            showendtDate : false ,
            selectedStartDate : moment().format("DD-MM-YYYY"),
            selectedEndDate : moment().format("DD-MM-YYYY"),
            
        }
    }
    render(){
        return(
            <View>
                
                 <TouchableOpacity onPress = {() => this.setState({showstartDate: !this.state.showstartDate}, () => console.log(this.state.showstartDate)) }>
                    <Text>Set Start Date</Text>
                </TouchableOpacity>

                
                {this.state.showstartDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({showstartDate:false, selectedStartDate:moment(selectedDate).format("DD-MM-YYYY")}, console.log(this.state.selectedStartDate))}
                
                
                
                />}

                <Text>{this.state.selectedStartDate}</Text>



                <TouchableOpacity onPress = {() => this.setState({showendtDate: !this.state.showendtDate}, () => console.log(this.state.showendtDate)) }>
                    <Text>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showendtDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({showendtDate:false, selectedEndDate:moment(selectedDate).format("DD-MM-YYYY")}, console.log(this.state.selectedStartDate))}
                
                
                
                />}

                <Text>{this.state.selectedEndDate}</Text>

                
                {this.state.selectedEndDate > this.state.selectedStartDate ? Alert.alert("Good") : Alert.alert("Your start date must be before your end date")}
            </View>
        )
    }
}

export default AddTrip