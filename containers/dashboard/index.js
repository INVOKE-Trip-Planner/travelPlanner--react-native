import React from "react";
import {View, Text, FlatList, TouchableOpacity, Modal, Picker, Alert, StatusBar} from "react-native";
import Header from "components/header";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


import InputButton from "components/inputButton";
import InputForm from "components/inputForm";



import {connect} from "react-redux";
import Actions from "actions"


const ButtonColor = "#F7230D";











class Dashboard extends React.Component{



    constructor(){
        super();
        this.state={

            tripList : [],
            date : new Date(), // Pure JS function
            mode : "date", // date format
            showModal : false,
            showstartDate : false ,
            showendtDate : false ,
            selectedStartDate_old : moment().format("YYYY-MM-DD"),
            selectedStartDate : moment().format("YYYY-MM-DD"),
            selectedEndDate_old : moment().format("YYYY-MM-DD"),
            selectedEndDate : moment().format("YYYY-MM-DD"),
            trip_name : "",
            origin : "",
            group_type : "SOLO",
            trip_type: "LEISURE",
            //add destination state
            showModal2 : false,
            tripIDfordestination : "",
            destinationlocation : "",
            selectedStartDateDestination : moment().format("YYYY-MM-DD"),
            selectedEndDateDestination : moment().format("YYYY-MM-DD"),
            showModalUpdate : false,
            tripidforupdate : ""

            //

          
        }
    }




    componentDidMount() {
        this.props.onGetAll();
    }

    componentDidUpdate(prevProps){
        const { getGetAllData} = this.props ;


        if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading ) {
            // console.log("update getall", getGetAllData)
            this.setState({tripList:getGetAllData.data})
        }   


      
    }



    _renderItemList(item){

        console.log("render item is here " , item.item.destinations.length)



        return(

        
            <View style = {{width : 300, height : 300, backgroundColor : null, marginTop : 20, borderColor : ButtonColor, borderWidth : 1, borderRadius : 20, justifyContent : "center", alignItems : "center"}} >
                
                <View >
                    <Text>Trip ID : {item.item.id}</Text>
                    <Text>Trip Name : {item.item.trip_name}</Text>
                    <Text>Origin : {item.item.origin}</Text>
                    <Text>Created By : {item.item.created_by}</Text>
                    <Text>Start Date : {item.item.start_date}</Text>
                    <Text>End Date : {item.item.end_date}</Text>
                    <Text>Trip Banner : {item.item.trip_banner}</Text>
                    <Text>End</Text>
                </View>
                
                

                <View style = {{width : "90%", backgroundColor : null ,position : "absolute", bottom : 10, right : 10, flexDirection : "row", justifyContent : "space-between", alignItems : "center" }}>

                    



                    {/* <TouchableOpacity onPress = {() => {this._updateButtonPressed(item.item.id)}} >
                        <Ionicons  name= "ios-open" style = {{fontSize : 20, color : ButtonColor}}/>   
                    </TouchableOpacity> */}


                    


    

                    <TouchableOpacity onPress = {() => {this._deleteButtonPressed(item.item.id)}}>
                        <Ionicons  name= "ios-trash" style = {{fontSize : 20, color : ButtonColor}}/>   
                    </TouchableOpacity>


                    <TouchableOpacity onPress = {() => {this._addDes(item.item.id)}} style = {{borderRadius : 10, backgroundColor : "black", justifyContent : "center", alignItems : "center"}} >
                        <Text style = {{fontSize :15, color : "white", padding : 5}}>Add Destination</Text>   
                    </TouchableOpacity>




                    {item.item.destinations.length != 0 && 

                    <TouchableOpacity onPress = {() => {this.props.navigation.navigate("TripDetails",  { detailsData:item})}} style = {{borderRadius : 10, backgroundColor : "red", justifyContent : "center", alignItems : "center"}}>
                        <Text style = {{fontSize :15, color : "white", padding : 5}}>View Details</Text>   
                    </TouchableOpacity>

                    }

                </View>

               

                
            </View>
        )
        }


    _modaladdbuttonpressed() {
            const data = {
                trip_name: this.state.trip_name,
                origin: this.state.origin,
                start_date: this.state.selectedStartDate,
                end_date : this.state.selectedEndDate,
                trip_type : this.state.trip_type,
                group_type : this.state.group_type,
               
      
                
              }

              if (data.end_date < data.start_date){
                  Alert.alert("Failed to Add Trip", "Your start date must be before your end date")
              }


              else if(data.start_date < moment().format("YYYY-MM-DD")){
                Alert.alert("Failed to Add Trip", "Your start date cannot be in the past")
              }


              else if(data.trip_name.length == 0){
                Alert.alert("Failed to Add Trip", "Please fill in your trip name")
              }


              else if(data.origin.length == 0){
                Alert.alert("Failed to Add Trip", "Please fill in your origin name")
              }

              else{


              this.props.onCreate(data);
              this.setState({showModal: false})
              Alert.alert("Success", "Your new trip has been added to your dashboard",[{
                text : "Back to Dash",
                onPress : () => {this.props.onGetAll()}


              }]);
   }

              
        }

    _deleteButtonPressed(id){

        

        console.log(`Delete Trip button for ${id} trip is pressed`, typeof id)

           this.props.onDeleteTrip(id)

           Alert.alert("Deleted", "Your trip has been deleted from your dashboard",[{
            text : "Back to Dash",
            onPress : () => {this.props.onGetAll()}


          }]);
        }
        
        
    _addDes(trip_id){
        this.setState({showModal2:true, tripIDfordestination:trip_id})
        // console.log("here", this.state.tripIDfordestination)

    }


    _modalAddDestinationButtonPressed(){

        this.setState({showModal2:false})
        console.log("HIT ADD DESTINATION")

        const data = {
            trip_id : this.state.tripIDfordestination,
            location : this.state.destinationlocation,
            start_date : this.state.selectedStartDateDestination,
            end_date : this.state.selectedEndDateDestination,

        }



        if (data.end_date < data.start_date){
            Alert.alert("Failed to Add Destination", "Your start date must be before your end date")

            this.setState({showModal2:true})
        }


        else if(data.start_date < moment().format("YYYY-MM-DD")){
          Alert.alert("Failed to Add Destination", "Your start date cannot be in the past")

          this.setState({showModal2:true})

        }


        else if(data.location.length == 0){
          Alert.alert("Failed to Add Destination", "Please fill in your Destination name")

          this.setState({showModal2:true})

        }


        

        else{

        console.log(data);
        this.props.onCreateDes(data);
        Alert.alert("Success", "Your new destination has been added to your trip")
        }
    }



    _updateButtonPressed(id){

        this.setState({showModalUpdate:true, tripidforupdate:id})
        console.log(id)
        

    }


    _updateModalButtonPressed(){


        const data = {


                trip_id : this.state.tripidforupdate,
                trip_name: this.state.trip_name,
                origin: this.state.origin,
                start_date: this.state.selectedStartDate,
                end_date : this.state.selectedEndDate,
                trip_type : this.state.trip_type,
                group_type : this.state.group_type,
            
            }


        console.log(data)


        this.props.onUpdateTrip(data)

    }


    render(){


        return(
            <View style = {{backgroundColor : "white", flex : 1, paddingBottom : 20}}>
                <StatusBar/>
                <Header/>

                <FlatList

                style = {{backgroundColor : null}}
                data = {this.state.tripList}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

                </FlatList>



                <TouchableOpacity onPress = {() => this.setState({showModal : true})}style = {{position : "absolute", bottom : 20, right : 30}}>
                        <Ionicons  name= "md-add-circle" style = {{ fontSize : 50, color : ButtonColor}}/>
                </TouchableOpacity>


                {/* Modal for adding trip */}
                {this.state.showModal && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    <View style = {styles.ModalFlex}>
                        <View style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {styles.CloseButton} onPress = {() => this.setState({showModal : false})}>
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style = {styles.ModalBackGroundInside}>

                            




                            

                
                {this.state.showstartDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showstartDate:false, 
                    selectedStartDate_old:moment(selectedDate).format("YYYY-MM-DD"), 
                    selectedStartDate:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}


                <InputForm 
                  inputPlaceHolder = "Your Trip Name" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropright"
                  onChange = {(trip_name)=>this.setState({trip_name:trip_name}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Your Origin" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(origin)=>this.setState({origin:origin}) }
                  
                  
                  />


                  <TouchableOpacity onPress = {() => this.setState({showstartDate: !this.state.showstartDate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Start Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.selectedStartDate_old}</Text>



                <TouchableOpacity onPress = {() => this.setState({showendtDate: !this.state.showendtDate}) }>
                    <Text style = {styles.setCalendarStyle}>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showendtDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showendtDate:false, 
                    selectedEndDate_old:moment(selectedDate).format("YYYY-MM-DD"),
                    selectedEndDate:moment(selectedDate).format("YYYY-MM-DD"),
                
                }, console.log(this.state.selectedStartDate))}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.selectedEndDate_old}</Text>

               



                    <InputButton buttonName = "Add Trip  " navigate = {() => this._modaladdbuttonpressed()} />





                        </View>
                        </View>
                    </View>

                </Modal>
                }


                {/* Modal for adding destination */}

                {this.state.showModal2 && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    <View style = {styles.ModalFlex}>
                        <View style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {styles.CloseButton} onPress = {() => this.setState({showModal2 : false})}>
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>


                        <View style = {styles.ModalBackGroundInside}>
                        {/* <Text>Trip ID is : {this.state.tripIDfordestination}</Text> */}

                            

                
                {this.state.showstartDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showstartDate:false, 
                    selectedStartDateDestination:moment(selectedDate).format("YYYY-MM-DD")})}
                
               
                
                />}


                <InputForm 
                  inputPlaceHolder = "Destination" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropright"
                  onChange = {(destinationlocation)=>this.setState({destinationlocation:destinationlocation}) }
                  
                  
                  />
                


                <TouchableOpacity onPress = {() => this.setState({showstartDate: !this.state.showstartDate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Start Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.selectedStartDateDestination}</Text>



                <TouchableOpacity onPress = {() => this.setState({showendtDate: !this.state.showendtDate}) }>
                    <Text style = {styles.setCalendarStyle}>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showendtDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showendtDate:false, 
                    // selectedEndDate_old:moment(selectedDate).format("YYYY-MM-DD"),
                    selectedEndDateDestination:moment(selectedDate).format("YYYY-MM-DD")})
                                }
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.selectedEndDateDestination}</Text>


                


                <InputButton buttonName = "Add Destination  " navigate = {() => this._modalAddDestinationButtonPressed()} />





                        </View>
                    </View>
                    </View>
                    

                </Modal>
                }


                {this.state.showModalUpdate && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    <View style = {styles.ModalFlex}>
                        <View style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {styles.CloseButton} onPress = {() => this.setState({showModalUpdate : false})}>
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style = {styles.ModalBackGroundInside}>

                            




                            

                
                {this.state.showstartDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showstartDate:false, 
                    selectedStartDate_old:moment(selectedDate).format("YYYY-MM-DD"), 
                    selectedStartDate:moment(selectedDate).format("YYYY-MM-DD")}, 
                    )}
                
               
                
                />}


                <InputForm 
                  inputPlaceHolder = "Your Trip Name" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropright"
                  onChange = {(trip_name)=>this.setState({trip_name:trip_name}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Your Origin" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(origin)=>this.setState({origin:origin}) }
                  
                  
                  />


                  <TouchableOpacity onPress = {() => this.setState({showstartDate: !this.state.showstartDate}) }>
                        <Text style = {styles.setCalendarStyle}>Set Start Date</Text>
                </TouchableOpacity>




                <Text style = {styles.CalendarStyle} >{this.state.selectedStartDate_old}</Text>



                <TouchableOpacity onPress = {() => this.setState({showendtDate: !this.state.showendtDate}) }>
                    <Text style = {styles.setCalendarStyle}>Set End Date</Text>
                </TouchableOpacity>


                {this.state.showendtDate && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({
                    showendtDate:false, 
                    selectedEndDate_old:moment(selectedDate).format("YYYY-MM-DD"),
                    selectedEndDate:moment(selectedDate).format("YYYY-MM-DD"),
                
                }, console.log(this.state.selectedStartDate))}
                
                
                
                />}

                <Text style = {styles.CalendarStyle}>{this.state.selectedEndDate_old}</Text>

               



                <InputButton buttonName = "Update Trip  " navigate = {() => this._updateModalButtonPressed()} />





                        </View>
                        </View>
                    </View>

                </Modal>
                }



            </View>
        )
    }
}


const styles = {
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
        justifyContent :"center",
        alignItems: "center"
    },

    ModalBackGroundInside : {
        width :300, 
        justifyContent :"center"
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
        backgroundColor:"red", 
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

    }
}

const mapStateToProps = (store) => ({
    getGetAllData : Actions.getGetAllData(store),
})

const mapDispatchToProps = {
    onGetAll : Actions.getAll,
    onCreate: Actions.create,
    onDeleteTrip: Actions.deleteTrip,
    onUpdateTrip: Actions.updateTrip,
    //
    onCreateDes : Actions.createDes
};


export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);