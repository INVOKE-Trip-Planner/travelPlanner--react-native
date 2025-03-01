import React from "react";
import {ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image, FlatList, Modal , Button} from "react-native";

import ImagePicker from 'react-native-image-picker';



import Header from "components/header";

import Actions from "actions";
import {connect} from "react-redux"


import InputButton from "components/inputButton";
import InputForm from "components/inputForm";
import Ionicons from 'react-native-vector-icons/Ionicons';



import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomImagePicker } from "../../components/inputs";
import { getFullUrl } from "api/helper.js"
import QRCode from "react-qr-code";
import UpdateUserFrom from "./updateUserForm";


import {MAIN_COLOR} from "common/style"
import avatar_placeholder from 'assets/images/avatar_placeholder.jpg'


const AVATAR_PREFIX = getFullUrl('storage/avatars/')

class Profile extends React.Component{
        constructor(props){
            super(props) 
            console.log("profile props", props)
            this.state = {

                showModal : false,
                name : props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.name : '', 
                username : props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.username: '',
                email : props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.email : '',
                password : "",
                password_confirmation : "",
                phone : props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.phone : '',
                gender : props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.gender : '',
                birth_date_old : props.getGetUpdateUserData.data ?  props.getGetUpdateUserData.data.birth_date : '',
                birth_date :  props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.birth_date : '',   
                avatar :  props.getGetUpdateUserData.data ? props.getGetUpdateUserData.data.avatar : 'placeholder.jpg',   
                date : new Date(),
                image : null,   
                showModalQRCode :false        
            }
        }

        componentDidUpdate(prevProps) {

            if (prevProps.getGetUpdateUserData.data && prevProps.getGetUpdateUserData.data.avatar !== this.props.getGetUpdateUserData.data.avatar) {
                console.log('store avatar updated', this.props.getGetUpdateUserData.data.avatar);
                this.setState({ avatar: this.props.getGetUpdateUserData.data.avatar })
            }
        }

        postProcessValue(values, initialValue) {
            // console.log('postpross', values['username'], this.props.getUpdateUserData.data['username'])
            
            const fields = ['username', 'email', 'phone', 'avatar']
            
            fields.forEach(field => {
                if (values[field] == initialValue[field]) {
                    delete values[field];
                }
            })
        
            return values;
        }
      

        modalUpdatebuttonPressed(){

            let data = {
                name : this.state.name,
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
                password_confirmation : this.state.password_confirmation,
                phone : this.state.phone,
                gender : "MALE",
                // birth_date : moment().format("YYYY-MM-DD"),   
                avatar: this.state.avatar,
            }

            data = this.postProcessValue(data, this.props.getGetUpdateUserData.data)
            // console.log(data)
            // alert(JSON.stringify(data))
            this.props.onUserUpdate(data)
            this.setState({showModal : false})

        }

        logoutPressed() {
            this.props.onResetUserSessions();
            Alert.alert("Bubye", "Logout Succesfully", [{
                text: "Okay",
                onPress :() => this.props.navigation.navigate("Auth")
            }])
    
        }

        handleChangePhoto = (value) => {
            this.setState({avatar: value})
        }
        
    render() {

        const avatarImage = this.props.getGetUpdateUserData.data ? `${AVATAR_PREFIX}${this.props.getGetUpdateUserData.data.avatar}` : `${AVATAR_PREFIX}placeholder.jpg`;

        return(
            <ScrollView style = {{flex : 1, backgroundColor:  "white"}}>
                <View style = {{alignItems  :"center"}}>
                <Header/>



               
                {this.state.showModalQRCode && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    {/* <UpdateUserFrom /> */}

                    <View style = {styles.ModalFlex}>
                        {/* <ScrollView style = {styles.ModalBackGround}> */}
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModalQRCode : false})}>
                                <Text style = {{color : MAIN_COLOR}}>CLOSE</Text>
                            </TouchableOpacity>

                            
                            <View style= {styles.centerScrollView}>
                                <View style = {{backgroundColor : "white" , width  : "100%",  height : "100%" ,alignItems : "center", justifyContent : "center"}}>


                                     <Text style = {{fontSize : 20, marginBottom : 20}}> Lets Go on a Trip !</Text>


                    <QRCode            
                        value={
                            `{
                                "id": ${this.props.getGetUpdateUserData.data.id},
                                "name": "${this.props.getGetUpdateUserData.data.name}",
                                "avatar": "${this.props.getGetUpdateUserData.data.avatar}"
                            }`
                            } 
                            size = {250}
                        />
             

             
                
             

                  

                                </View>
                            </View>
                        {/* </ScrollView> */}
                    </View>
                </Modal>
                }



                 
                 
             

                 <CustomImagePicker 
                    label="avatar"
                    value={ `${AVATAR_PREFIX}${this.state.avatar}` }
                    hideLabel={true}
                    readonly
                 />

                 {/* <Button title="Pick an image from camera roll" onPress={this._pickImage} /> */}
                {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}

                <TouchableOpacity onPress = {() => this.setState({showModalQRCode: true})}> 
                <View style = {{flexDirection : "row" , borderRadius : 10, backgroundColor : MAIN_COLOR,  padding : 10, width : 170, alignItems : "center", justifyContent : "space-between"}}>
                    <Text style = {{color : "white", textAlign : "center"}}>Add Me To Your Trip</Text>                
                    <Ionicons  name= "md-qr-scanner" style = {{fontSize : 20, color : "white"}}/> 

                </View>
                
                </TouchableOpacity>  

                <View style = {{minHeight : 150, alignItems : "center", justifyContent : "space-between", paddingVertical : 10}}>

                    <Text style = {{ fontSize : 15, fontWeight : "bold"}}> { this.state.name}  </Text>
                    <Text style = {styles.profileFont}> {this.state.email}    </Text>
                    {/* <Text>Password : HIDDEN</Text>
                    <Text>Password Confirmation : HIDDEN</Text> */}
                    <Text style = {styles.profileFont}> {this.state.phone}   </Text>
                    <Text style = {styles.profileFont}> {this.state.gender}   </Text>
                    <Text style = {styles.profileFont}> {this.state.birth_date}   </Text>
                    

                </View>

                <TouchableOpacity style = {{marginVertical : 10, backgroundColor : MAIN_COLOR, width : 200, height : 50, justifyContent : "center", borderRadius : 20 }} onPress = {() => {this.logoutPressed()}}>
                    <Text style = {{color : "white", textAlign :"center"}}>Logout</Text>
                </TouchableOpacity>


                <TouchableOpacity style = {{marginVertical : 10, backgroundColor : MAIN_COLOR, width : 200, height : 50, justifyContent : "center", borderRadius : 20 }} onPress = {() => {this.setState({showModal:true})}}>
                    <Text style = {{color : "white", textAlign :"center"}}>Update Profile</Text>
                </TouchableOpacity>




                {this.state.showModal && 
                <Modal
                    animationType="fade"
                    transparent={true}
                >

                    {/* <UpdateUserFrom /> */}

                    <View style = {styles.ModalFlex}>
                        <ScrollView style = {styles.ModalBackGround}>
                            <TouchableOpacity style = {{position : "absolute", right : 0, top : 0, zIndex : 3}} onPress = {() => this.setState({showModal : false})}>
                                <Text style = {{color : MAIN_COLOR}}>CLOSE</Text>
                            </TouchableOpacity>

                            
                            <View style= {styles.centerScrollView}>
                
                                <View style = {styles.ModalBackGroundInside}>
                
                

                
                 <View style = {styles.mainBox}>

                <View style = {styles.inputBox}>





                    <CustomImagePicker 
                        label="avatar"
                        value={ `${AVATAR_PREFIX}${this.state.avatar}` }
                        defaultValue={  Image.resolveAssetSource(avatar_placeholder).uri } //`${AVATAR_PREFIX}placeholder.jpg`}
                        hideLabel={ true }
                        handleChange={ this.handleChangePhoto }
                    />

                  <InputForm inputPlaceHolder = "Your Name" 
                    value={ this.state.name }
                    inputKeyType = "default" 
                    inputSecure = {false} 
                    icon = "ios-ionitron"
                    onChange = {(name)=> this.setState({name:name},   
                  )}
                  />

                </View>
                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Username" 
                    value={ this.state.username }
                    inputKeyType = "default" 
                    inputSecure = {false} 
                    icon = "ios-contact"
                    onChange = {(username)=> this.setState({username:username}, 
                  )}
                  />

                </View>
                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Email" 
                    value={ this.state.email }
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
                        <Ionicons  name= {this.state.hidePass ? "ios-eye" : "ios-eye-off"} style = {{fontSize : 20, color : MAIN_COLOR}}/>   
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
                        <Ionicons  name= {this.state.hidePass ? "ios-eye" : "ios-eye-off"} style = {{fontSize : 20, color : MAIN_COLOR}}/>   
                    </TouchableOpacity>

                </View >

                <View style = {styles.inputBox}>


                  <InputForm inputPlaceHolder = "Your Phone Number" 
                    value={ this.state.phone }
                  inputKeyType = "number-pad" 
                  inputSecure = {false} 
                  icon = "ios-call"
                  onChange = {(phone)=> this.setState({phone:phone}, 
                  
                  )}
                  />

                </View>

                <View style = {styles.inputBox}>

{/* 
                 <Picker
                    selectedValue={this.state.gender}
                    style={{ height: 50, width: "100%", justifyContent : "center"  , borderColor : "black", borderWidth : 2 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({gender:itemValue}, () => console.log(this.state.gender))}
                  >
                    <Picker.Item label="MALE" value="MALE" />
                    <Picker.Item label="FEMALE" value="FEMALE" />
                    <Picker.Item label="OTHER" value="OTHER" />
                  </Picker>

 */}





                 

                </View>

                <View style = {styles.inputBox}>

                {/* <TouchableOpacity style = {styles.setCalendarStyle} onPress = {() => this.setState({showBirthday: !this.state.showBirthday}, () => console.log(this.state.showBirthday)) }>
                    { this.state.isBirthdaySelected ? <Text style = {{color : "white", padding : 10}}>{this.state.birth_date_old}</Text> : <Text style = {{color : "white", padding : 10}}>Your Birthday</Text>} 
                </TouchableOpacity>


                  { this.state.showBirthday && <DateTimePicker
                value = {this.state.date}
                mode = {this.state.mode}
                onChange = {(event,selectedDate) => this.setState({showBirthday:false, 
                  birth_date_old:moment(selectedDate).format("YYYY-MM-DD"), 
                  birth_date:moment(selectedDate).format("YYYY-MM-DD"), 
                  isBirthdaySelected: true}, console.log(this.state.birth_date_old))}
                
                
                
                />} */}


                 


                </View>
                
                  <InputButton buttonName = "Update Profile  " navigate = {() => this.modalUpdatebuttonPressed()} />


                  
            </View>

                </View>
                        </View>

                        </ScrollView>
                    </View>

                </Modal>
                }


                </View>
                

            </ScrollView>
        )
    }
}



// const MyPhotoInput = ({ label, containerStyle, ...props }) => {
//     const [{value, onChange, ...field}, meta] = useField(props);
  
//     const BANNER_PREFIX = 'http://localhost:8000/storage/avatars/';
//     const [photo, setPhoto] = React.useState(meta.initialValue ? BANNER_PREFIX + meta.initialValue : null);
//     const [photoName, setPhotoName] = React.useState('');
  
//     console.log(photo);
  
//     const placeholder = 'http://localhost:8000/storage/avatars/placeholder.png';
  
//     const loadPhoto = (e) => {
//         // let ImageHolder = document.getElementById('image-holder');
//         // ImageHolder.src = URL.createObjectURL(e.target.files[0]);
//         // ImageHolder.onload = () => {
//         //     URL.revokeObjectURL(ImageHolder.src)
//         // }
//         // this.setState({ avatar: e.target.files[0] })
//         setPhoto(URL.createObjectURL(e.target.files[0]));
//         props.setFieldValue(props.name, e.currentTarget.files[0]);
//         setPhotoName(e.target.value)
//     }
  
//     return (
//       <>
//           {/* {photo &&  */}
//           <View 
//             //   className="profile-header-container"
//           >
//               <View 
//                 //   className="profile-header-img rounded-circle" 
//                   style={{ 
//                       width: 200, 
//                       height: 200, 
//                       overflow: 'hidden', 
//                       position: 'relative', 
//                       margin: 'auto', 
//                   }} >
//                   <Image 
//                       id='image-holder' 
//                       photo={ photo || placeholder } 
//                       style={{ 
//                           width: 200, 
//                           height: 200, 
//                           objectFit: 'cover', 
//                           objectPosition: 'center',
//                       }} 
//                       alt='customize your banner' 
//                   />
//                   {/* <View type='submit' onclick={ this.showFileUpload } id='uploadBtn'
//                       style={{ width: '100%', zIndex: 2, background: 'black', color: 'white', position: 'absolute', bottom: 0, textAlign: 'center', padding: '0.5em', fontWeight: 'bold', }} >Upload</View> */}
//               </View>
//           </View> 
//         {/* } */}
//         <View 
//         //   className={ `form-group` }
//           style={ styles.inputContainer }
//           // style={{
//           //     display: "flex", 
//           //     flexDirection: "column",
//           //     ...containerStyle,
//           // }}
//         >
//           <label 
//               htmlFor={ props.id || props.name } 
//               style={{ 
//                   textTransform: 'capitalize', 
//               }}
//           > 
//               { label || props.name }: 
//           </label>
  
//           <View style={ styles.inputStyle }>
//             <input 
//                 // className="text-input" 
//                 type="file"
//                 // placeholder={ placeholder || `Enter ${ label || props.name } here.` }
//                 onChange={ loadPhoto }
//                 {...field} 
//                 {...props} 
//                 style={{
//                   outline: "none",
//                   width: "100%",
//                   height: 50,
//                   borderRadius: 5,
//                   padding: 10,
//                 }}
//             />
//             { meta.touched && meta.error ? 
//             (
//                 <View 
//                 //   className="error" 
//                   style={styles.errorContainer}
//                     // style={{
//                     //     color: 'red',
//                     // }}
//                 >
//                     { meta.error } 
//                 </View>
//             ) : 
//                 null 
//             }
//           </View>
//         </View>
//       </>
//     );
//   };
  



const styles = {

    userPhoto : {
        width : 100,
        height : 100,
        borderRadius : 50
    },


    userQRCode : {
        width : 100,
        height : 100
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


    profileFont : { 
        fontSize : 15, 
        fontWeight : "bold"
    }
}



const mapStateToProps = (store) => ({

    getGetUpdateUserData : Actions.getUpdateUserData(store)



})

const mapDispatchToProps = {
    onResetUserSessions: Actions.resetUserSession,
    onUserUpdate : Actions.updateUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);