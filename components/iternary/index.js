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


const ButtonColor = "#F7230D";



class Iternaries extends React.Component{



    constructor(props){
        super(props)

        this.state = {
            showModal : false,
            day : "",
            }

        // console.log("Iternaries data is here ", this.props.destinationData)
    }

    _deleteButtonPressed(id){

        

        console.log(`Delete Itenary button for accomodate id ${id} is pressed`)

           this.props.ondeleteItin(id)
           
        } 

    _renderItemList(item){

        console.log(item)
        return(
            <View style = {styles.card}>
                <Text>{item.item.id}</Text>
                <Text>{item.item.day}</Text>
                <View style = {{position : "absolute", top : 0, right : 0, flexDirection : "row"}}>
                    <TouchableOpacity onPress = {() => {console.log("HIT update")}} >
                        <Ionicons  name= "ios-open" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this._deleteButtonPressed(item.item.id)}>
                        <Ionicons  name= "ios-trash" style = {styles.cardDetails}/>   
                    </TouchableOpacity>
                </View>
            </View>

        )
    }


    addIternaryButtonisPressed(){
        console.log("Pressed add Iternary button");
            this.setState({showModal:true})
            console.log(this.state.showModal)

    }



    addIternaryModalButtonisPressed(){
        const data = {
            destination_id : this.props.destinationID,
            day : this.state.day,
        }
        console.log(data)
        this.props.oncreateItin(data)

    }
    render(){
        return (
            <View style = {styles.mainContainer}>

                <Text style = {styles.cardTitle}>Iternaries</Text>

               
                <FlatList

                style = {{backgroundColor : null}}
                data = {this.props.destinationData}
                renderItem = {(item) => this._renderItemList(item)}
                numColumns = {1}
                contentContainerStyle= {{alignItems : "center"}}
                >

            </FlatList>

        <Text>{this.props.destinationID}</Text>

            <TouchableOpacity style = {{position : "absolute", bottom : 10, right : 20}} onPress = {()=>this.addIternaryButtonisPressed()}>
                        <Ionicons  name= "md-add-circle" style = {{ fontSize : 50, color : ButtonColor}}/>
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
    height : 300,
    borderColor : ButtonColor,
    borderWidth : 1, 
    marginVertical : 15, 
    borderRadius : 10,
    paddingVertical : 30

    },

    cardTitle : {

        width : "100%",
        backgroundColor : ButtonColor,
        color : "white",
        padding : 10,
        textAlign : "center",
        borderTopRightRadius : 20,
        borderTopLeftRadius : 20,
    
        },

        cardDetails : 
        {
        fontSize : 20, 
        color : ButtonColor, 
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
    getGetAllData : Actions.getGetAllData(store)
})

const mapDispatchToProps = {
   ondeleteItin: Actions.deleteItin,
   oncreateItin:Actions.createItin,

};

export default connect(mapStateToProps, mapDispatchToProps )(Iternaries);