import React from "react";
import {ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList, Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from "react-redux";
import Actions from "../../actions";


import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import InputButton from "components/inputButton";
import InputForm from "components/inputForm";




import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from "axios";



import {MAIN_COLOR} from "common/style"




class Transportation extends React.Component{


    constructor(props){
        super(props)

        this.state = {
            showModal : false,
            destination_id : "",
            mode_transport : "FLIGHT",
            origin : "",
            destination : "",


            date : new Date(), // Pure JS function
            mode : "date", // date format
            showdepaturedate : false,
            showarrivaldate : false,
            departure_date : moment().format("YYYY-MM-DD"),
            arrival_date : moment().format("YYYY-MM-DD"),
            departure_hour : 0,
            arrival_hour : 0,
            departure_minute : 0,
            arrival_minute : 0,
            cost : 0,
            operator : "",
            booking_id : "",
            showModalUpdate : false,
            TransportIdforUpdate : "",
            transList : []
        
        }

        // console.log("Transportation data is here ", this.props.destinationData)
    }

    componentDidMount() {
        this.props.onGetAll();
        this.props.onGetAllTrans();
    }

    componentDidUpdate(prevProps){
        const {getGetAllData, getGetAllTransData} = this.props ;

        // if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading ) {
        //     // console.log("update getall", getGetAllData)
        //     this.setState({transList:getGetAllAccData.data})
        // }   

        

        if (prevProps.getGetAllTransData.isLoading && !getGetAllTransData.isLoading ) {
            this.setState({transList:getGetAllTransData.data})
            console.log("transList IS HERE :" , this.state.transList)

        } 
        
        
        
        


       

    }

    _deleteButtonPressed(id){

        

        console.log(`Delete Transportation button for accomodate id ${id} is pressed`)

           this.props.ondeleteTrans(id)
           Alert.alert("Success", "transport has been deletedfrom your dashboard",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllTrans()}
            }
        ]) 

           
        } 


    
    addTransportationButtonisPressed(){
            console.log("Pressed add Transporation button");
            this.setState({showModal:true})
            console.log(this.state.showModal)
    }




    addTransportationModalButtonisPressed(){
        const data = {
            destination_id : this.props.destinationID,
            mode : this.state.mode_transport,
            origin : this.state.origin,
            destination : this.state.destination,
            departure_date : this.state.departure_date,
            arrival_date : this.state.arrival_date,
            departure_hour : this.state.departure_hour,
            arrival_hour : this.state.arrival_hour,
            departure_minute : this.state.departure_minute,
            arrival_minute : this.state.arrival_minute,
            cost : this.state.cost,
            operator : this.state.operator,
            booking_id : this.state.booking_id,



        }


        if (data.origin.length == 0 ) {
            Alert.alert("Failed to Add Transport", 
            "Please fill in the origin name")

        }


        else if (data.destination.length == 0 ) {
            Alert.alert("Failed to Add Transport", 
            "Please fill in the destination name")

        }


        else if (data.arrival_date < data.departure_date){
            Alert.alert("Failed to Add Transport", 
            "Your departure date must be before your arrival date")
        }

        else if(data.departure_date < moment().format("YYYY-MM-DD")){
            Alert.alert("Failed to Add Transport", "Your arrival date cannot be in the past")
          }


        else if (data.booking_id.length == 0 ){
            Alert.alert("Failed to Add Transport", "Please fill in the booking ID")


        }
        else if (data.operator.length == 0 ){
            Alert.alert("Failed to Add Transport", "Please fill in the operator")


        }


        else {



        console.log(data)
        this.props.oncreateTrans(data)
        this.setState({showModal:false})
        Alert.alert("Success", "Your new transport has been added to your dashboard",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllTrans()}
            }
        ]) 

    }
    }


    _renderItemList(item){

        // console.log(item)
        return(


            <View>

                {item.item.destination_id == this.props.destinationID &&


            <View style = {styles.card}>
                <Text>{item.item.id}</Text>
                <Text>{item.item.cost}</Text>
                <Text>{item.item.origin}</Text>
                <Text>{item.item.destination}</Text>
                <Text>{item.item.departure_date}</Text>
                <Text>{item.item.departure_hour}</Text>
                <Text>{item.item.departure_minute}</Text>
                <Text>{item.item.arrival_date}</Text>
                <Text>{item.item.arrival_hour}</Text>
                <Text>{item.item.arrival_minute}</Text>
                <Text>{item.item.cost}</Text>
                <Text>{item.item.booking_id}</Text>
                <Text>{item.item.operator}</Text>
                {/* <Text>{item.item.destination_id} and { this.props.destinationID}</Text> */}
                <View style = {{position : "absolute", top : 0, right : 0, flexDirection : "row"}}>
                    <TouchableOpacity onPress = {() => {this._updateButtonPressed(item.item.id)}} >
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



    _updateButtonPressed(id){
        console.log(`Update Accomodation button for accomodate id ${id} is pressed`)
        this.setState({showModalUpdate:true, TransportIdforUpdate : id})
    }




    updateTransportationModalButtonisPressed(){

        const data = {
            id : this.state.TransportIdforUpdate,
            mode : this.state.mode_transport,
            origin : this.state.origin,
            destination : this.state.destination,
            departure_date : this.state.departure_date,
            arrival_date : this.state.arrival_date,
            departure_hour : this.state.departure_hour,
            arrival_hour : this.state.arrival_hour,
            departure_minute : this.state.departure_minute,
            arrival_minute : this.state.arrival_minute,
            cost : this.state.cost,
            operator : this.state.operator,
            booking_id : this.state.booking_id,

        }


        if (data.origin.length == 0 ) {
            Alert.alert("Failed to Add Transport", 
            "Please fill in the origin name")

        }


        else if (data.destination.length == 0 ) {
            Alert.alert("Failed to Add Transport", 
            "Please fill in the destination name")

        }


        else if (data.arrival_date < data.departure_date){
            Alert.alert("Failed to Add Transport", 
            "Your departure date must be before your arrival date")
        }

        else if(data.departure_date < moment().format("YYYY-MM-DD")){
            Alert.alert("Failed to Add Transport", "Your arrival date cannot be in the past")
          }


        else if (data.booking_id.length == 0 ){
            Alert.alert("Failed to Add Transport", "Please fill in the booking ID")


        }
        else if (data.operator.length == 0 ){
            Alert.alert("Failed to Add Transport", "Please fill in the operator")


        }


        else {



            console.log(data)
            this.setState({showModalUpdate:false})
    
            this.props.editTrans(data)
        Alert.alert("Success", "Your new transport has been added to your dashboard",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllTrans()}
            }
        ]) 

       
    }}

    
    render(){
        return (
            <View style = {styles.mainContainer}>

                <Text style = {styles.cardTitle}>Transportation</Text>

               
                <FlatList

                style = {{backgroundColor : null}}
                data = {this.state.transList}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

            </FlatList>

        {/* <Text>{this.props.destinationID}</Text> */}

            <TouchableOpacity style = {{position : "absolute", bottom : 10, right : 20}} onPress = {()=>this.addTransportationButtonisPressed()}>
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
                  inputPlaceHolder = "Origin" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(origin)=>this.setState({origin:origin}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Destination" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(destination)=>this.setState({destination:destination}) }
                  
                  
                  />


                {this.state.showdepaturedate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showdepaturedate:false, 
                    departure_date:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}



                <TouchableOpacity onPress = {() => this.setState({showdepaturedate: !this.state.showdepaturedate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Departure Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.departure_date}</Text>



                <TouchableOpacity onPress = {() => this.setState({showarrivaldate: !this.state.showarrivaldate}) }>
                    <Text style = {styles.setCalendarStyle}>Set Arrival Date</Text>
                </TouchableOpacity>


                {this.state.showarrivaldate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showarrivaldate:false, 
                    arrival_date:moment(selectedDate).format("YYYY-MM-DD"),
                
                })}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.arrival_date}</Text>

                

                <InputForm 
                  inputPlaceHolder = "Departure Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(departure_hour)=>this.setState({departure_hour:departure_hour}) }
                  
                  
                  />


                  <InputForm 
                  inputPlaceHolder = "Arrival Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(arrival_hour)=>this.setState({arrival_hour:arrival_hour}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Departure Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(departure_minute)=>this.setState({departure_minute:departure_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Arrival Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(arrival_minute)=>this.setState({arrival_minute:arrival_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Operator" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(operator)=>this.setState({operator:operator}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Booking ID" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(booking_id)=>this.setState({booking_id:booking_id}) }
                  
                  
                  />


                  



                <InputButton buttonName = "Add Transport  " navigate = {() => this.addTransportationModalButtonisPressed()} />



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
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModal : false})}>
                                <Text style = {{color : MAIN_COLOR}}>CLOSE</Text>
                            </TouchableOpacity>

                            
                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>
                
                

                
                <InputForm 
                  inputPlaceHolder = "Origin" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(origin)=>this.setState({origin:origin}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Destination" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(destination)=>this.setState({destination:destination}) }
                  
                  
                  />


                {this.state.showdepaturedate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showdepaturedate:false, 
                    departure_date:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}



                <TouchableOpacity onPress = {() => this.setState({showdepaturedate: !this.state.showdepaturedate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Departure Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.departure_date}</Text>



                <TouchableOpacity onPress = {() => this.setState({showarrivaldate: !this.state.showarrivaldate}) }>
                    <Text style = {styles.setCalendarStyle}>Set Arrival Date</Text>
                </TouchableOpacity>


                {this.state.showarrivaldate && 
                <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showarrivaldate:false, 
                    arrival_date:moment(selectedDate).format("YYYY-MM-DD"),
                
                })}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.arrival_date}</Text>

                

                <InputForm 
                  inputPlaceHolder = "Departure Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(departure_hour)=>this.setState({departure_hour:departure_hour}) }
                  
                  
                  />


                  <InputForm 
                  inputPlaceHolder = "Arrival Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(arrival_hour)=>this.setState({arrival_hour:arrival_hour}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Departure Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(departure_minute)=>this.setState({departure_minute:departure_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Arrival Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(arrival_minute)=>this.setState({arrival_minute:arrival_minute}) }
                  
                  
                  />

                  <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Operator" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(operator)=>this.setState({operator:operator}) }
                  
                  
                  />
                  <InputForm 
                  inputPlaceHolder = "Booking ID" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(booking_id)=>this.setState({booking_id:booking_id}) }
                  
                  
                  />


                  



                <InputButton buttonName = "Update Transport  " navigate = {() => this.updateTransportationModalButtonisPressed()} />



                </View>
                        </View>

                        </ScrollView>
                    </View>

                </Modal>
                }

            
            
            </View>
        )}

}

const styles = {
    mainContainer : {
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
    paddingVertical : 30,
    padding : 30,
    paddingTop : 50,
    justifyContent : "space-between"
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


        centerScrollView : {width : "100%", justifyContent : "center", alignItems :"center"},
    
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
            backgroundColor:MAIN_COLOR, 
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


const mapStateToProps = (store) => ({
    getGetAllData : Actions.getGetAllData(store),
    getGetAllTransData : Actions.getGetAllTransData(store)

})

const mapDispatchToProps = {
   ondeleteTrans: Actions.deleteTrans,
   oncreateTrans: Actions.createTrans,
   onGetAll : Actions.getAll,
   editTrans : Actions.editTrans,
   onGetAllTrans : Actions.getAllTrans,


};

export default connect(mapStateToProps, mapDispatchToProps )(Transportation);