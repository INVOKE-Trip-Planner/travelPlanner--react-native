import React from "react";
import {ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList, Modal} from "react-native"; 


import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import InputButton from "components/inputButton";
import InputForm from "components/inputForm";


import {connect} from "react-redux";
import Actions from "../../actions";

import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';



import Ionicons from 'react-native-vector-icons/Ionicons';



import {MAIN_COLOR} from "common/style"


class Iternaries extends React.Component{



    constructor(props){
        super(props)

        this.state = {
            showModal : false,
            day : "",
            hour : "",
            minute : "",
            title : "",
            description : "",
            itinerary_id : "",
            cost : "",
            itinList : [],
            showModalSchedule : false,
            iternaryidforschedule : "",
            showModalScheduleUpdate : false,
            scheduleidforupdate : ""
            }

        // console.log("Iternaries data is here ", this.props.destinationData)
    }






    componentDidMount() {
        // this.props.onGetAll();
        this.props.onGetAllItin();
    }




    componentDidUpdate(prevProps){
        const {getGetAllData, getGetAllItinData} = this.props ;

        // if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading ) {
        //     // console.log("update getall", getGetAllData)
        //     this.setState({accList:getGetAllItinData.data})
        // }   

        

        if (prevProps.getGetAllItinData.isLoading && !getGetAllItinData.isLoading ) {
            this.setState({itinList:getGetAllItinData.data})
            // console.log("ITIN IS HERE :" , this.state.ItinList)

        } 
        
        
        
        


       

    }





    

    _deleteButtonPressed(id){

        

        // console.log(`Delete Itenary button for accomodate id ${id} is pressed`)

           this.props.ondeleteItin(id);


           Alert.alert("Success", "Your iternaries has been deleted from your dashboard",[
            {
                text : "OK",
                onPress : () => {this.props.onGetAllItin()}
            }
        ]) 

           
           
        }



        _scheduleDeleteButtonPressed(id){

            console.log(id)
            this.props.onDeleteSchedule(id)

            Alert.alert("Success", "Your schedule has been deleted from your dashboard",[
                {
                    text : "OK",
                    onPress : () => {this.props.onGetAllItin()}
                }
            ]) 

        }


        _scheduleUpdateButtonPressed(id){

            this.setState({showModalScheduleUpdate: true, scheduleidforupdate : id})

            console.log(id)



           
            

        }



        updateScheduleModalButtonisPressed(){


            console.log(this.state.scheduleidforupdate)



            const data = {

                id : this.state.scheduleidforupdate,
                hour : this.state.hour,
                minute : this.state.minute,
                title : this.state.title,
                description : this.state.description,
                cost : this.state.cost,

            }

            


            console.log(data)
            this.props.onUpdateSchedule(data)
            Alert.alert("Success", "Your schedule has been updated",[
                {
                    text : "OK",
                    onPress : () => {this.props.onGetAllItin()}
                }
            ]) 
            this.setState({showModalScheduleUpdate: false})

            
        }



        _renderItemList2(item){
            // console.log("itineary render item 2 " ,item.item.itinerary_id)
       


        return(
            <View style = {{borderColor : MAIN_COLOR, borderWidth : 1, borderRadius : 10, marginRight : 30, marginVertical : 10, height : 250, width : 150, paddingVertical : 40, justifyContent : "space-between"}}>
                 <View style = {{position : "absolute",top : 0, right : 0, flexDirection : "row", width : "100%", backgroundColor : null}}>
                    <TouchableOpacity style = {{width : "50%", justifyContent : "center", alignItems : "center"}} onPress = {() => this._scheduleUpdateButtonPressed(item.item.id)} >
                        <Ionicons  name= "md-open" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                    <TouchableOpacity style = {{width : "50%", justifyContent : "center", alignItems : "center"}} onPress = {() => this._scheduleDeleteButtonPressed(item.item.id)}>
                        <Ionicons  name= "md-close-circle" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                </View>

                {/* <Text>Itinerary ID {item.item.itinerary_id}</Text> */}
                <Text>Cost {item.item.cost}</Text>
                <Text>Description {item.item.description}</Text>
                <Text>Hour {item.item.hour}</Text>
                <Text>ID {item.item.id}</Text>
                <Text>Minutes {item.item.minute}</Text>
                <Text>Title {item.item.title}</Text>


         



            </View>

        )


    }




    addScheduleButtonisPressed(item){

        this.setState({showModalSchedule:true, iternaryidforschedule: item})

    }
    addScheduleModalButtonisPressed(){

        const data ={ 
        itinerary_id : this.state.iternaryidforschedule,
         hour : this.state.hour,
         minute : this.state.minute,
         title : this.state.title,
         description : this.state.description,
         cost : this.state.cost,

            }


        console.log(data)

        this.props.onCreateSchedule(data)
        this.setState({showModalSchedule:false,
            hour : "",
            minute : "",
            title : "",
            description : "",
            itinerary_id : "",
            cost : "",
        })
        Alert.alert("Success", "Your new schedule has been added to your dashboard",[
            {
                text : "OK",
                onPress : () => this.props.onGetAllItin

            }
        ]) 

    }



    _renderItemList(item){

        // console.log("render item ", item.item.schedules[0])

        
        return(
            
           
                <View style = {styles.card}>
                {/* <Text>Iternary ID {item.item.id}</Text> */}
                <Text style = {{textAlign : "center", fontWeight : "bold"}}> Itineraries For Day {item.item.day}</Text>
                {/* <Text> Destination ID {item.item.destination_id} and {this.props.destinationID}</Text> */}

                 <FlatList

                style = {{backgroundColor : null}}
                data = {item.item.schedules}
                renderItem = {(list) => this._renderItemList2(list)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                horizontal = {true}
                showsHorizontalScrollIndicator={false}

                    
            
                >

                </FlatList>


                <View style = {{position : "absolute", top : 0, right : 0, flexDirection : "row"}}>
                    <TouchableOpacity onPress = {() => {console.log("HIT update")}} >
                        <Ionicons  name= "ios-open" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this._deleteButtonPressed(item.item.id)}>
                        <Ionicons  name= "ios-trash" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style = {{position : "absolute", bottom : 10, left : 20}} onPress = {()=>this.addScheduleButtonisPressed(item.item.id)}>
                        <Ionicons  name= "md-calendar" style = {{ fontSize : 30, color : MAIN_COLOR}}/>
                </TouchableOpacity>

                </View>
            

        )
    }


    addIternaryButtonisPressed(){
        // console.log("Pressed add Iternary button");
            this.setState({showModal:true})
            // console.log(this.state.showModal)

    }



    addIternaryModalButtonisPressed(){
        const data = {
            destination_id : this.props.destinationID,
            day : this.state.day
           
           
        }

        if(data.day.length == 0) {
            Alert.alert("Failed", "Please key in the day number you wish to add for iternary",[
                {
                    text : "OK",
                    // onPress : () => this.props.ongetAllDes()
                }
            ])
        }


        else {
        console.log(data)
        this.props.oncreateItin(data)
        Alert.alert("Success", "New iternary has been added to your dashboard",[
            {
                text : "OK",
                onPress : () => this.props.onGetAllItin()
            }
        ])
        this.setState({showModal :false})
}
    }
    render(){

        
        const itindataforspecificID = this.state.itinList.filter(itin => itin.destination_id == this.props.destinationID)
        // console.log("checkdata",itindataforspecificID);
        return (
            <View style = {styles.mainContainer}>

                <Text style = {styles.cardTitle}>Itineraries</Text>

               
                <FlatList

                style = {{backgroundColor : null}}
                data = {itindataforspecificID}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

            </FlatList>

        {/* <Text>{this.props.destinationID}</Text> */}

            <TouchableOpacity style = {{position : "absolute", bottom : 10, right : 20}} onPress = {()=>this.addIternaryButtonisPressed()}>
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
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>

                            

                
                

                
                <InputForm 
                  inputPlaceHolder = "Day" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(day)=>this.setState({day:day}) }
                  
                  
                  />
                



                <InputButton buttonName = "Add Iternary  " navigate = {() => this.addIternaryModalButtonisPressed()} />



                </View>
                </View>

                        </ScrollView>
                    </View>

                </Modal>
                }
            {this.state.showModalSchedule && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                     <View style = {styles.ModalFlex}>
                        <ScrollView style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModalSchedule : false})}>
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>

                            

                
                

                
                
                <InputForm 
                  inputPlaceHolder = "Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(hour)=>this.setState({hour:hour}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(minute)=>this.setState({minute:minute}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "title" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(title)=>this.setState({title:title}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "description" 
                  inputKeyType = "title" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(description)=>this.setState({description:description}) }
                  
                  
                  />



                <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                 />
                
                  



                <InputButton buttonName = "Add Schedule  " navigate = {() => this.addScheduleModalButtonisPressed()} />



                </View>
                </View>

                        </ScrollView>
                    </View>

                </Modal>
                }
            {this.state.showModalScheduleUpdate && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                     <View style = {styles.ModalFlex}>
                        <ScrollView style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModalScheduleUpdate : false})}>
                                <Text style = {{color : "red"}}>CLOSE</Text>
                            </TouchableOpacity>

                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>

                            

                
                

                
                
                <InputForm 
                  inputPlaceHolder = "Hour" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(hour)=>this.setState({hour:hour}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "Minutes" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(minute)=>this.setState({minute:minute}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "title" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(title)=>this.setState({title:title}) }
                  
                  
                  />
                <InputForm 
                  inputPlaceHolder = "description" 
                  inputKeyType = "title" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(description)=>this.setState({description:description}) }
                  
                  
                  />



                <InputForm 
                  inputPlaceHolder = "Cost" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-arrow-dropleft"
                  onChange = {(cost)=>this.setState({cost:cost}) }
                  
                  
                 />
                
                  



                <InputButton buttonName = "Update Schedule  " navigate = {() => this.updateScheduleModalButtonisPressed()} />



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
    marginVertical : 20,
    

    
   },

   card : {
    width : 250,
    minHeight : 300,
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
    
        },
    
}


const mapStateToProps = (store) => ({
    getGetAllData : Actions.getGetAllData(store),
    getGetAllItinData : Actions.getGetAllItinData(store)


})

const mapDispatchToProps = {
   ondeleteItin: Actions.deleteItin,
   oncreateItin:Actions.createItin,
   onGetAllItin : Actions.getAllItin,
   onCreateSchedule : Actions.createSchedule,
   onDeleteSchedule : Actions.deleteSchedule,
   onUpdateSchedule : Actions.editSchedule,
   onGetAll : Actions.getAll
   

};

export default connect(mapStateToProps, mapDispatchToProps )(Iternaries);