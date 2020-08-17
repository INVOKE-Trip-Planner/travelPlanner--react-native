import React from "react";
import {Text, View, StatusBar, TouchableOpacity, Image, Icon, Picker, Alert} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';


import Actions from "actions";
import { connect} from "react-redux";





import InputButton from "components/inputButton";
import InputForm from "components/inputForm";
import DropDown from "components/dropdown";

import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonColor = "#F7230D";





class Register extends React.Component{

    



    

    constructor(props){
        super()
        this.state = {
            name : "", 
            username : "",
            email : "",
            password : "",
            password_confirmation : "",
            phone : "",
            gender : "MALE",
            birth_date_old : moment().format("DD-MM-YYYY"),
            birth_date : moment().format("YYYY-MM-DD"),
            hidePass : true,
            date : new Date(),
            showBirthday : false,
            isBirthdaySelected : false
            

            
        }
    }



    componentDidUpdate(prevProps){
      const { getRegisterData} = this.props;

      // console.log("I am here");

      if (prevProps.getRegisterData.isLoading && !getRegisterData.isLoading){
        console.log("register componentDidUpdate",getRegisterData)

        if (getRegisterData !== undefined){
          Alert.alert("Success", "Registration Successfully")

        }
        else if (getRegisterData.error !== null){



          Alert.alert("Failed", "Registration Failed")

           
        }
    }

  
  
    }



    registerbuttonPressed(){

      

        const data = {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password : this.state.password,
          password_confirmation : this.state.password_confirmation,
          phone : this.state.phone,
          gender : this.state.gender,
          birth_date : this.state.birth_date,

          
        }

        this.props.onRegister(data)

        // console.log(data)

        
        
        
      }

    render(){
        return(

            <View style = {{backgroundColor:"white", flex:1, paddingTop: 20, alignItems : "center", justifyContent : "center"}}>
                <StatusBar/>

                <Image source={require('assets/images/applogo.png')} style = {{width : 100, height : 100, }}/>



                <View style = {styles.mainBox}>

                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Name" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-ionitron"
                  onChange = {(name)=> this.setState({name:name}, 
                  
                  )}
                  />

                </View>
                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Username" 
                  inputKeyType = "default" 
                  inputSecure = {false} 
                  icon = "ios-contact"
                  onChange = {(username)=> this.setState({username:username}, 
                  
                  )}
                  />

                </View>
                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Email" 
                  inputKeyType = "email-address" 
                  inputSecure = {false} 
                  icon = "ios-mail"
                  onChange = {(email)=> this.setState({email:email}, 
                  
                  )}
                  />

                </View>

                <View style = {styles.inputBox}>

                  <InputForm inputPlaceHolder = "Your Password" 
                    inputKeyType = "default" 
                     icon = "md-lock"
                    inputSecure = {this.state.hidePass} 
                    onChange = {(password)=> this.setState({password:password}, 
                    )}/>

                    <TouchableOpacity style = {{ zIndex : 2, position: "absolute", top : "50%", right : 10, transform:[{translateX : 0}, { translateY : -10} ]}}
                    onPress = {() => this.setState({hidePass: !this.state.hidePass})}>
                        <Ionicons  name= {this.state.hidePass ? "ios-eye" : "ios-eye-off"} style = {{fontSize : 20, color : "red"}}/>   
                    </TouchableOpacity>

                </View >
                <View style = {styles.inputBox}>

                  <InputForm inputPlaceHolder = "Your Password" 
                    inputKeyType = "default" 
                     icon = "md-lock"
                    inputSecure = {this.state.hidePass} 
                    onChange = {(password_confirmation)=> this.setState({password_confirmation:password_confirmation}, 
                    )}/>

                    <TouchableOpacity style = {{ zIndex : 2, position: "absolute", top : "50%", right : 10, transform:[{translateX : 0}, { translateY : -10} ]}}
                    onPress = {() => this.setState({hidePass: !this.state.hidePass})}>
                        <Ionicons  name= {this.state.hidePass ? "ios-eye" : "ios-eye-off"} style = {{fontSize : 20, color : "red"}}/>   
                    </TouchableOpacity>

                </View >

                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Phone Number" 
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-call"
                  onChange = {(phone)=> this.setState({phone:phone}, 
                  
                  )}
                  />

                </View>

                <View style = {styles.inputBox}>


                 <Picker
                    selectedValue={this.state.gender}
                    style={{ height: 50, width: "100%", justifyContent : "center"  , borderColor : "black", borderWidth : 2 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({gender:itemValue}, () => console.log(this.state.gender))}
                  >
                    {/* <Picker.Item label="Your Gender"  disabled/> */}
                    <Picker.Item label="MALE" value="MALE" />
                    <Picker.Item label="FEMALE" value="FEMALE" />
                    <Picker.Item label="OTHER" value="OTHER" />
                  </Picker>







                 

                </View>

                <View style = {styles.inputBox}>

                <TouchableOpacity onPress = {() => this.setState({showBirthday: !this.state.showBirthday}, () => console.log(this.state.showBirthday)) }>
                    { this.state.isBirthdaySelected ? <Text>{this.state.birth_date_old}</Text> : <Text>Your Birthday</Text>} 
                </TouchableOpacity>


                  { this.state.showBirthday && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({showBirthday:false, 
                  birth_date_old:moment(selectedDate).format("DD-MM-YYYY"), 
                  birth_date:moment(selectedDate).format("YYYY-MM-DD"), 
                  isBirthdaySelected: true}, console.log(this.state.birth_date_old))}
                
                
                
                />}


                 


                </View>
                
                  <InputButton buttonName = "Sign Up " navigate = {() => this.registerbuttonPressed()} />


                  <TouchableOpacity onPress = {() => this.props.navigation.navigate("Auth")}>
                    <Ionicons  name= "md-arrow-back" style = {{fontSize : 20, color : "red"}}/>
                  </TouchableOpacity>

                  
            </View>

          
        </View>
        )
    }
}


const styles = {
  mainBox : {
    backgroundColor : "white", 
    // shadowColor: "red",
    // shadowOffset: {
    //           width: 0,
    //           height: 2,
    //               },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    width : 300,
    // height : 450,
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center"
    },

    inputBox : {
      backgroundColor : null,
      width : "100%",
      height : 50,
      justifyContent : "center",
      marginBottom : 10
    }

}



const mapStateToProps = store => ({
  
  getRegisterData: Actions.getRegisterData(store),

});
const mapDispatchToProps = {
  onRegister:Actions.register,

};


export default connect(mapStateToProps, mapDispatchToProps)(Register)
