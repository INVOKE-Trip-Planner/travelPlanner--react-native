import React from "react";
import {connect} from "react-redux";
import Actions from "../../actions";


import {View, ScrollView, Text, FlatList, TouchableOpacity, Modal, Picker, Alert, StatusBar, StyleSheet} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Ionicons from 'react-native-vector-icons/Ionicons';


import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';


import InputButton from "components/inputButton";
import InputForm from "components/inputForm";


import {MAIN_COLOR} from "common/style"






class Accomodation extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            showModal : false,
            destination_id : "",
            accommodation_name : "",
            date : new Date(), // Pure JS function
            mode : "date", // date format
            showcheckindate : false,
            showcheckoutdate : false,
            checkin_date : moment().format("YYYY-MM-DD"),
            checkout_date : moment().format("YYYY-MM-DD"),
            checkin_hour : 0,
            checkout_hour : 0,
            checkin_minute : 0,
            checkout_minute : 0,
            cost : 0,
            booking_id : "",
            showModalUpdate : false,
            AccIdforUpdate : "",
            accList : [],
            // initialDestinationID : this.props.destinationData[0].destination_id
            
            






        }


        console.log("Accomodation data is here ")
    }


    componentDidMount() {
        this.props.onGetAll();
        this.props.onGetAllAcc();
    }

    componentDidUpdate(prevProps){
        const {getGetAllData, getGetAllAccData} = this.props ;

        // if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading ) {
        //     // console.log("update getall", getGetAllData)
        //     this.setState({accList:getGetAllAccData.data})
        // }   

        

        if (prevProps.getGetAllAccData.isLoading && !getGetAllAccData.isLoading ) {
            this.setState({accList:getGetAllAccData.data})
            console.log("ACCLIST IS HERE :" , this.state.accList)

        } 
        
        
        
        


       

    }



    _deleteButtonPressed(id){

        

        console.log(`Delete Accomodation button for accomodate id ${id} is pressed`)


           this.props.onDeleteAcc(id)


           
           Alert.alert("Deleted", "Your trip accomodation has been deleted from your trip details",[{
            text : "Back to Trip Details",
            onPress : () => {this.props.onGetAllAcc()}


          }]);           
        } 



    _updateButtonPressed(id){


        console.log(`Update Accomodation button for accomodate id ${id} is pressed`)
        this.setState({showModalUpdate:true, AccIdforUpdate : id})
        
    }



    _UpdateModalAccomodationButtonisPressed(){

        const data = {

            id : this.state.AccIdforUpdate,
            accommodation_name : this.state.accommodation_name,
            checkin_date : this.state.checkin_date,
            checkout_date : this.state.checkout_date,
            checkin_hour : this.state.checkin_hour,
            checkout_hour : this.state.checkout_hour,
            checkin_minute : this.state.checkin_minute,
            checkout_minute : this.state.checkin_minute,
            cost : this.state.cost,
            booking_id : this.state.booking_id
        }



        if (data.accommodation_name.length == 0){
            Alert.alert("Failed to Update Accomodation", 
            "Please fill in the accomodation name")

        }

        else if (data.checkout_date < data.checkin_date){
            Alert.alert("Failed to Update Accomodation", 
            "Your checkin date must be before your checkout date")
        }

        else if(data.checkin_date < moment().format("YYYY-MM-DD")){
            Alert.alert("Failed to Update Accomodation", "Your checkin date cannot be in the past")
          }


        else if (data.checkin_hour > 23  || data.checkout_hour > 23 || data.checkin_minute > 59 || data.checkout_minute > 59 ){
            Alert.alert("Failed to Update Accomodation", "Please make sure you add the right timing")


        }


        else if (data.booking_id.length == 0 ){
            Alert.alert("Failed to Update Accomodation", "Please fill in the booking ID")


        }

        else {



        this.props.onEditAcc(data);

        this.setState({showModalUpdate:false})

        Alert.alert("Success", "Your Accomodation has been updated",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllAcc()}
            }
        ])

        }
    }







    _renderItemList(item){

        
        return(
          
           <View>

                {item.item.destination_id == this.props.destinationID &&
           
            <View style = {styles.card}>
                <Text>Acc ID : {item.item.id} </Text>
                <Text>Accomodation Name : {item.item.accommodation_name}</Text>
                <Text>Check In Date : {item.item.checkin_date}</Text>
                <Text>Check Out Date: {item.item.checkout_date}</Text>
                <Text>Check In Hour: {item.item.checkin_hour}</Text>
                <Text>Check Out Hour : {item.item.checkout_hour}</Text>
                <Text>Check In Minutes : {item.item.checkin_minute}</Text>
                <Text>Check Out Minutes : {item.item.checkout_minute}</Text>
                <Text>Cost : {item.item.cost}</Text>
                <Text>Booking ID : {item.item.booking_id}</Text>
                <Text>Destination ID : {item.item.destination_id} and {this.props.destinationID}</Text>
               
                <View style = {{position : "absolute", top : 0, right : 0, flexDirection : "row"}}>
                    <TouchableOpacity onPress = {() => this._updateButtonPressed(item.item.id)} >
                        <Ionicons  name= "ios-open" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this._deleteButtonPressed(item.item.id)}>
                        <Ionicons  name= "ios-trash" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                </View>
            </View>

                 } 

            </View>

        )
    }


    addAccomodationButtonisPressed(){
        console.log("Pressed add accomodation");
        this.setState({showModal:true})

       

    }


    _addModalAccomodationButtonisPressed(){

        const data = {

            destination_id : this.props.destinationID,
            accommodation_name : this.state.accommodation_name,
            checkin_date : this.state.checkin_date,
            checkout_date : this.state.checkout_date,
            checkin_hour : this.state.checkin_hour,
            checkout_hour : this.state.checkout_hour,
            checkin_minute : this.state.checkin_minute,
            checkout_minute : this.state.checkout_minute,
            cost : this.state.cost,
            booking_id : this.state.booking_id
        }


        console.log(data.checkout_date < data.checkin_date);


        


        if (data.accommodation_name.length == 0){
            Alert.alert("Failed to Add Accomodation", 
            "Please fill in the accomodation name")

        }

        else if (data.checkout_date < data.checkin_date){
            Alert.alert("Failed to Add Accomodation", 
            "Your checkin date must be before your checkout date")
        }

        else if(data.checkin_date < moment().format("YYYY-MM-DD")){
            Alert.alert("Failed to Add Accomodation", "Your checkin date cannot be in the past")
          }


        else if (data.checkin_hour > 23  || data.checkout_hour > 23 || data.checkin_minute > 59 || data.checkout_minute > 59 ){
            Alert.alert("Failed to Add Accomodation", "Please make sure you add the right timing")


        }


        else if (data.booking_id.length == 0 ){
            Alert.alert("Failed to Add Accomodation", "Please fill in the booking ID")


        }



        else {
        console.log(data)

        console.log("Add Modal Accomation modal is pressed")
        this.props.onCreateAcc(data)
        this.setState({showModal:false})
        Alert.alert("Success", "Your new Accomodation has been added to your dashboard",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllAcc()}
            }
        ])
    }
}






    render(){
        return (
            <View style = {styles.mainContainer}>
                <Text style = {styles.cardTitle}>Accomodation</Text>

               
                <FlatList

                style = {{backgroundColor : null}}
                data = {this.state.accList}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

            </FlatList>

        <Text>{this.props.destinationID}</Text>

            <TouchableOpacity onPress = {() => this.addAccomodationButtonisPressed()} style = {{position : "absolute", bottom : 10, right : 20}}>
                        <Ionicons  name= "md-add-circle" style = {{ fontSize : 50, color : MAIN_COLOR}}/>
            </TouchableOpacity>


            {this.state.showModal && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    <View style = {styles.ModalFlex}>
                        <ScrollView style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModal : false})}>
                                <Text style = {{color : MAIN_COLOR}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>


                
                <InputForm 
                  inputPlaceHolder = "Your Accomodation Name" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(accommodation_name)=>this.setState({accommodation_name:accommodation_name}) }
                  
                  
                  />


                {this.state.showcheckindate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showcheckindate:false, 
                    checkin_date:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}



                <TouchableOpacity onPress = {() => this.setState({showcheckindate: !this.state.showcheckindate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Check in Date Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.checkin_date}</Text>



                <TouchableOpacity onPress = {() => this.setState({showcheckoutdate: !this.state.showcheckoutdate}) }>
                    <Text style = {styles.setCalendarStyle}>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showcheckoutdate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showcheckoutdate:false, 
                    checkout_date:moment(selectedDate).format("YYYY-MM-DD"),
                
                })}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.checkout_date}</Text>

                

                <InputForm 
                  inputPlaceHolder = "Check In Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkin_hour)=>this.setState({checkin_hour:checkin_hour}) }
                  
                  
                  />


                  <InputForm 
                  inputPlaceHolder = "Check Out Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkout_hour)=>this.setState({checkout_hour:checkout_hour}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Check In Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkin_minute)=>this.setState({checkin_minute:checkin_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Check Out Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkout_minute)=>this.setState({checkout_minute:checkout_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Booking ID" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(booking_id)=>this.setState({booking_id:booking_id}) }
                  
                  
                  />


                  



                <InputButton buttonName = "Add Accomodation  " navigate = {() => this._addModalAccomodationButtonisPressed()} />





                            </View>
                        </View>
                    </ScrollView>
                    </View>



                </Modal>
                }



            {this.state.showModalUpdate && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    <View style = {styles.ModalFlex}>
                        <ScrollView style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModalUpdate : false})}>
                                <Text style = {{color : MAIN_COLOR}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>


                
                <InputForm 
                  inputPlaceHolder = "Your Accomodation Name" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(accommodation_name)=>this.setState({accommodation_name:accommodation_name}) }
                  
                  
                  />


                {this.state.showcheckindate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showcheckindate:false, 
                    checkin_date:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}



                <TouchableOpacity onPress = {() => this.setState({showcheckindate: !this.state.showcheckindate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Check in Date Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.checkin_date}</Text>



                <TouchableOpacity onPress = {() => this.setState({showcheckoutdate: !this.state.showcheckoutdate}) }>
                    <Text style = {styles.setCalendarStyle}>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showcheckoutdate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showcheckoutdate:false, 
                    checkout_date:moment(selectedDate).format("YYYY-MM-DD"),
                
                })}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.checkout_date}</Text>

                

                <InputForm 
                  inputPlaceHolder = "Check In Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkin_hour)=>this.setState({checkin_hour:checkin_hour}) }
                  
                  
                  />


                  <InputForm 
                  inputPlaceHolder = "Check Out Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkout_hour)=>this.setState({checkout_hour:checkout_hour}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Check In Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkin_minute)=>this.setState({checkin_minute:checkin_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Check Out Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(checkout_minute)=>this.setState({checkout_minute:checkout_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Booking ID" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(booking_id)=>this.setState({booking_id:booking_id}) }
                  
                  
                  />


                  



                <InputButton buttonName = "Update Accomodation    " navigate = {() => this._UpdateModalAccomodationButtonisPressed()} />





                            </View>
                        </View>
                    </ScrollView>
                    </View>



                </Modal>
                }

                

            
            
            </View>
        )}
}


const styles = StyleSheet.create({
    mainContainer :
    {
    backgroundColor : "white",
    width : "80%",
    minHeight : 450,
    borderRadius : 20,
    marginVertical : 20
    },

    card : {
    width : 250,
    height : 300,
    borderColor : MAIN_COLOR,
    borderWidth : 1, 
    marginVertical : 15, 
    borderRadius : 10,
    paddingVertical : 30
    },

    cardTitle : {

    width : "100%",
    backgroundColor : MAIN_COLOR,
    color : "white",
    padding : 10,
    textAlign : "center",
    borderTopRightRadius : 20,
    borderTopLeftRadius : 20,

    },

    cardDetails : 
        {
        fontSize : 20, 
        color : MAIN_COLOR, 
        marginRight : 10,
         marginTop : 10
        },

    ModalFlex : 
    {
        flex: 1, 
        backgroundColor : null, 
        justifyContent :"center", 
        alignItems : "center"
    },

    ModalBackGround :

    {
        width : "100%",
        height : "100%", 
        backgroundColor : "white", 
        // justifyContent :"center",
        // alignItems: "center"
    },


    centerScrollView : 
        {
            width : "100%", 
            justifyContent : "center", 
            alignItems :"center"
        },

    ModalBackGroundInside : {
        width :300, 
        justifyContent :"center",
        
    },


    CloseButton :

    {
        position : "absolute", 
        right : 15, 
        top : 10, 
        zIndex : 3
    },
    
    setCalendarStyle : {

        fontSize : 16, 
        textAlign :"center", 
        width : "100%", 
        height : 40, 
        justifyContent: "center", 
        color : "white",
        lineHeight:40, 
        backgroundColor: MAIN_COLOR, 
        borderColor : "black", 
        borderWidth : 1,
        marginBottom : 10

    },

    CalendarStyle : {

        fontSize : 16, 
        textAlign :"center", 
        width : "100%", 
        height : 40, 
        justifyContent: "center", 
        lineHeight:40, 
        backgroundColor:"black", 
        color : "white",
        borderColor : "black", 
        borderWidth : 1,
        marginBottom : 10

    },

       

}
)


const mapStateToProps = (store) => ({
    getGetAllData : Actions.getGetAllData(store),
    getGetAllAccData : Actions.getGetAllAccData(store)

})

const mapDispatchToProps = {
   onDeleteAcc: Actions.deleteAcc,
   onCreateAcc : Actions.createAcc,
   onGetAll : Actions.getAll,
   onEditAcc : Actions.editAcc,
   onGetAllAcc : Actions.getAllAcc,

};

export default connect(mapStateToProps, mapDispatchToProps )(Accomodation);;