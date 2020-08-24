import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image} from "react-native";


import InputButton from "components/inputButton";
import InputForm from "components/inputForm";
import Banner from "components/banner";
import AddButton from "components/addbutton";



import Ionicons from 'react-native-vector-icons/Ionicons';

import Actions from "actions";
import { connect} from "react-redux";



import CONTAINER from "common/style";
import { StatusBar } from "expo-status-bar";




const ButtonColor = "#F7230D";



class Auth extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            hidePass : true
           
        }
    }


  // functions to pass data from this.state into a constant data.
    loginButtonPressed() {

        // const data = {
        //     username: this.state.username,
        //     password : this.state.password
        //   }
        const data = {
          username: 'test0005', //this.state.username,
          password : 'test0005', //this.state.password,
        }

        this.props.onLogin(data);

        console.log(data)



    
    }


   




      componentDidMount(){

        // this.ref.current.animateNextTransition();
        console.log("DID MOUNT", this.props.getUserSessions);
        const { getUserSessions} = this.props;

        console.log(getUserSessions)
        // if ( Object.keys(getUserSessions.data).length !== 0) {
        //   this.props.navigation.navigate("BottomTab");
        // }
      }

     



      componentDidUpdate(prevProps){
        const { getLoginData} = this.props;

        console.log(getLoginData)
    
        if(prevProps.getLoginData.isLoading && !getLoginData.isLoading){
         
    
          console.log("login componentDidUpdate", getLoginData );
          
          if (
            // Object.keys(getLoginData).length !== 0 &&
            getLoginData.error == null
          ){
            // console.log("TOKEN IS ", getLoginData.data);
            Alert.alert("Success", "Login Successfully",[{
              text : "To Dash",
              onPress:() => this.props.navigation.navigate("BottomTab")
            }]);
          }

          else if (getLoginData.error !== null){

            Alert.alert("Failed", "Login Failed");
            console.log("There is an error")
          }

        }

        
    
        
         }


        
    




    

    render(){
        return(
        
        <View style = {{backgroundColor:"white", flex:1, paddingTop: 20, alignItems : "center", justifyContent : "center"}}>


            <StatusBar style = {{backgroundColor : "red"}}/>

            {/* <Banner/> */}

            <Image source={require('assets/images/applogo.png')} style = {{width : 100, height : 100, }}/>


            <View style = {styles.mainBox}>

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
                
                  <InputButton buttonName = "Login " navigate = {() => this.loginButtonPressed()} />

                  <View style = {{backgroundColor : null, width : "100%", flexDirection : "row", justifyContent : "flex-end", marginTop :10} }>


                    <Text style = {{marginRight : 5}}>New User ?</Text>
                    <TouchableOpacity onPress = { () => this.props.navigation.navigate("Register")}>
                      <Text style = {{color : ButtonColor, fontWeight : "bold" }}>SIGN UP NOW  </Text>
                    </TouchableOpacity>

                  </View>


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
    height : 250,
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

    // listen to any changes inside the store
    getLoginData: Actions.getLoginData(store),
 

  });

  // dipatch actions from 
  const mapDispatchToProps = {

    // onLogin is a props,
    // Actions.login is from action.
    // now we are mapping this two.
    // so when the login button is pressed, it will return the Actions.login that consist of type, and data

    onLogin: Actions.login,     
   

  };

  
export default connect(mapStateToProps, mapDispatchToProps)(Auth)

