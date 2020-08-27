import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Picker, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { global_styles } from '../../assets/styles';
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';
import {MAIN_COLOR} from "common/style";

// import { TouchableOpacity } from 'react-native-gesture-handler';

// component did update to get prevprops
function usePrevious(value) {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const FieldWrapper = ({ containerStyle, hideLabel, children, label, errors}) => (
    <View style={ [styles.container, containerStyle] }>
        {!hideLabel && <Text style={ styles.labelText }>{ label }</Text>}
        {children}
        {errors && <Text style={ styles.errorMessage }>
            { errors }
        </Text> }
    </View>
)

export const BannerImagePicker = ({ containerStyle, hideLabel, label, errors, children, value, handleChange, defaultValue, handleSubmit, ...rest }) => {
    
    const prevValue = usePrevious(value);

    const [showImageToggle, setShowImageToggle] = React.useState(rest.showImageToggle)
    const [image, setImage] = React.useState((value === defaultValue) ? null : value)
    const [readonly, setReadonly] = React.useState(showImageToggle ? true : rest.readonly)

    // console.log(value)

    useEffect(() => {
        if (prevValue !== value) {
            setImage((value === defaultValue) ? null : value);
            setShowImageToggle(rest.showImageToggle)
            setReadonly(showImageToggle ? true : rest.readonly)
        }
    }, [value])
    

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setImage(result.uri)
          }

          const value = {
              uri: result.uri,
              type: 'multipart/form-data', // 'image.jpg',
              name: 'photo.jpg',
          }
    
        //   formikProps.setFieldValue(formikKey, result.uri)
          handleChange(value);

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    }

    const _saveImage = async () => {
        try {

          const value = {
              uri: image,
              type: 'multipart/form-data', // 'image.jpg',
              name: 'photo.jpg',
          }

          const data = {
              id: rest.tripData.id,
              trip_banner: value,
          }
        //   alert(data);
        //   formikProps.setFieldValue(formikKey, result.uri)
          handleSubmit(data);

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    }

    const _exit = () => {
        setImage(value)
        setReadonly(true)
        setShowImageToggle(true)
    }

    return(
        <FieldWrapper
            containerStyle={[
                // containerStyle,
                {
                    // alignItems: 'center',
                    // borderWidth: 1,
                }
            ]}
            hideLabel={ hideLabel || false }
            label={ label } 
            errors={ errors }
        >
            <View
                style={[ 
                    {
                        // width: 400,
                        // height: 150,
                        // marginVertical: 20,
                        // marginTop: 0,
                        // alignSelf: 'center',
                        // backgroundColor: 'transparent',
                        // overflow: 'hidden',
                    }
                ]}
            >
                <ImageBackground
                    style={[ 
                        // global_styles.avatar,
                        {
                            alignSelf: 'center',
                            overflow: 'hidden',
                            zIndex: 0,
                        },
                        {
                            width: 300,
                            // flex: 1,
                            height: 120,

                            borderTopLeftRadius : 20, 
                            borderTopRightRadius: 20, 
                            height : 120,
                            // width: '100%'
                        }
                    ]}
                    source={{ uri: image || defaultValue }}
                >
                    { (!readonly) ? ( <TouchableOpacity
                        onPress={ image ? _saveImage : _pickImage }
                        style={[
                            // global_styles.avatar,
                            {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                alignItems: 'center',
                                borderRadius: 0,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                padding: 10,
                            }
                        ]}
                    >
                        <Text
                            style={[ 
                                // inputStyles,
                                {
                                    // position: 'absolute',
                                    borderWidth: 0,
                                    color: MAIN_COLOR, // 'grey', 
                                    textAlign: 'center',
                                    fontSize: 20,
                                    width: '100%',
                                    textAlign: 'center',
                                    // bottom: -20,
                                }
                            ]}
                        >
                            { image ? 'Save' : 'Upload' }
                        </Text>
                            
                    </TouchableOpacity> ) : null }

                </ImageBackground>

                { (!readonly) ? (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 10,
                            elevation: 11,
                        }}
                        onPress={ () => image ? setImage(null) : _exit() }
                    >
                        <Ionicons 
                            style={{
                                margin: 5,
                                width: 25,
                                height: 25,
                                color: MAIN_COLOR, //'rgba(0, 0, 0, 0.6)',
                            }} 
                            name="ios-close-circle" 
                            size={25} 
                        />
                    </TouchableOpacity>) : null }

                    {
                        (showImageToggle) && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    bottom: 10,
                                    elevation: 11,
                                }}
                                onPress={ () => {
                                    setShowImageToggle(false)
                                    setReadonly(false)
                                    setImage(null)
                                } }
                            >
                                <Ionicons 
                                    style={{
                                        margin: 5,
                                        width: 25,
                                        height: 25,
                                        color: MAIN_COLOR, //'rgba(0, 0, 0, 0.6)',
                                    }} 
                                    name="ios-images"
                                    size={25} 
                                />
                            </TouchableOpacity>
                        )
                    }
            </View>

        </FieldWrapper>
    )
}

export const CustomImagePicker = ({ containerStyle, hideLabel, label, errors, children, value, handleChange, defaultValue, showImageToggle, ...rest }) => {
    
    const prevValue = usePrevious(value);

    const [image, setImage] = React.useState((value === defaultValue) ? null : value)
    const [readonly, setReadonly] = React.useState(showImageToggle ? true : rest.readonly)

    // console.log(value)

    useEffect(() => {
        if (prevValue !== value) {
            setImage((value === defaultValue) ? null : value);
        }
    }, [value])
    

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setImage(result.uri)
          }

          const value = {
              uri: result.uri,
              type: 'multipart/form-data', // 'image.jpg',
              name: 'photo.jpg',
          }
    
        //   formikProps.setFieldValue(formikKey, result.uri)
          handleChange(value);

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    }

    
    return(
        <FieldWrapper
            containerStyle={[
                containerStyle,
                {
                    // alignItems: 'center',
                    // borderWidth: 1,
                }
            ]}
            hideLabel={ hideLabel || false }
            label={ label } 
            errors={ errors }
        >
            <View
                style={[ 
                    {
                        width: 150,
                        height: 150,
                        marginVertical: 20,
                        marginTop: 0,
                        alignSelf: 'center',
                        // backgroundColor: 'transparent',
                        // overflow: 'hidden',
                    }
                ]}
            >
                <ImageBackground
                    style={[ 
                        global_styles.avatar,
                        {
                            alignSelf: 'center',
                            overflow: 'hidden',
                            zIndex: 0,
                        }
                    ]}
                    source={{ uri: image || defaultValue }}
                >
                    { (!readonly && !image) ? ( <TouchableOpacity
                        onPress={ _pickImage }
                        style={[
                            // global_styles.avatar,
                            {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                alignItems: 'center',
                                borderRadius: 0,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                padding: 10,
                            }
                        ]}
                    >
                        <Text
                            style={[ 
                                // inputStyles,
                                {
                                    // position: 'absolute',
                                    borderWidth: 0,
                                    color: 'grey', 
                                    textAlign: 'center',
                                    fontSize: 20,
                                    width: '100%',
                                    textAlign: 'center',
                                    // bottom: -20,
                                }
                            ]}
                        >
                            Upload
                        </Text>
                            
                    </TouchableOpacity> ) : null }

                </ImageBackground>

                { (!readonly && image) ? (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 10,
                            elevation: 11,
                        }}
                        onPress={ () => setImage(null) }
                    >
                        <Ionicons 
                            style={{
                                margin: 5,
                                width: 25,
                                height: 25,
                                color: 'rgba(0, 0, 0, 0.6)',
                            }} 
                            name="ios-close-circle" 
                            size={25} 
                        />
                    </TouchableOpacity>) : null }

                {
                    (showImageToggle) && (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 10,
                                bottom: 10,
                                elevation: 11,
                            }}
                            onPress={ () => setReadonly(false) }
                        >
                            <Ionicons 
                                style={{
                                    margin: 5,
                                    width: 25,
                                    height: 25,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                }} 
                                name="image-outline"
                                size={25} 
                            />
                        </TouchableOpacity>
                    )
                }
            </View>

        </FieldWrapper>
    )
}

// Can choose to destructure the props or not
const FieldWrapperFormik = ({ containerStyle, hideLabel, children, label, formikProps, formikKey }) => (
    <View style={ [styles.container, containerStyle] }>
        {!hideLabel && <Text style={ styles.labelText }>{ label || formikKey }</Text>}
        {children}
        <Text style={ styles.errorMessage }>
            { formikProps.touched[formikKey] && formikProps.errors[formikKey] }
        </Text>
    </View>
)

export const CustomTextInputFormik = ({ containerStyle, hideLabel, label, formikProps, formikKey, secureTextEntry, ...rest}) => {
    const inputStyles = {
        borderRadius: 5,
        borderColor: 'navy',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 5,
        marginVertical: 10,
    }

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = 'red';
    }

    const [hidePassword, setHidePassword] = React.useState( secureTextEntry )
    
    // if (secureTextEntry) {
    //     setHidePassword(true);
    // }

    return (
        <FieldWrapperFormik 
            containerStyle={ containerStyle }
            hideLabel={ hideLabel || false } 
            label={ label } 
            formikKey={ formikKey } 
            formikProps={ formikProps }
        >
            {/* {console.log({...rest})} */}
            <TextInput 
                style={ inputStyles }
                value={ {...rest}.value || formikProps.values[formikKey] }
                placeholder={ `Enter your ${ label || formikKey } here.` }
                onChangeText={ formikProps.handleChange(formikKey) }
                onBlur={ formikProps.handleBlur(formikKey) }
                // secureTextEntry={ secureTextEntry }
                secureTextEntry={ hidePassword }
                { ...rest }
            />

            { secureTextEntry && (
                <TouchableOpacity
                    onPress={ () => setHidePassword(!hidePassword) }
                >
                    <Text>
                        Show Password
                    </Text>
                </TouchableOpacity>
            ) }
        </FieldWrapperFormik>
    )
}

export const CustomSwitchFormik = ({ containerStyle, hideLabel, formikKey, formikProps, label, ...rest }) => (
    <FieldWrapperFormik 
        containerStyle={ containerStyle }
        hideLabel={ hideLabel || false } 
        label={ label } 
        formikKey={ formikKey } 
        formikProps={ formikProps }
    >
        {/* {console.log(formikProps.values[formikKey] )}
        {console.log(formikProps.values )}
        {console.log(formikProps.values['checklist.0.status'] )}
        {console.log(formikKey )} */}
        <Switch
            // value={ formikProps.values[formikKey] }
            onValueChange={ value => { formikProps.setFieldValue(formikKey, value) }}
            {...rest}
        />
    </FieldWrapperFormik>
)

export const CustomDatePickerFormik = ({ containerStyle, hideLabel, formikKey, formikProps, label, children, ...rest }) => {
    
    // states: date: new Date(), mode: 'date', 'datetime', show: false
    const [date, setDate] = React.useState(new Date()) // new Date())
    const [mode, setMode] = React.useState('date')
    const [show, setShow] = React.useState(false)

    const inputStyles = {
        borderRadius: 5,
        borderColor: 'navy',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 5,
        marginVertical: 10,
    }

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = 'red';
    }

    return(
        <FieldWrapperFormik
            containerStyle={ containerStyle }
            hideLabel={ hideLabel || false } 
            label={ label } 
            formikKey={ formikKey } 
            formikProps={ formikProps}
        >
            <TouchableOpacity
                onPress={ () => setShow(true)}
            >
                <TextInput 
                    style={ inputStyles }
                    value={ {...rest}.value || formikProps.values[formikKey] }
                    placeholder={ `Enter your ${ label || formikKey } here.` }
                    onChangeText={ formikProps.handleChange(formikKey) }
                    onBlur={ formikProps.handleBlur(formikKey) }
                    { ...rest }
                    editable={ false }
                />
            </TouchableOpacity>

            { show && (
                <DateTimePicker 
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={ (event, selectedDate) => {
                        setShow(false)
                        if (!selectedDate) return
                        setDate(selectedDate)
                        console.log(JSON.stringify(selectedDate).slice(1, 11))
                        console.log(typeof selectedDate) // JSON.stringify(selectedDate).slice(1, 11))
                        console.log(typeof moment(selectedDate).format('YYYY-MM-DD')) // JSON.stringify(selectedDate).slice(1, 11))
                        formikProps.setFieldValue(formikKey, moment(selectedDate).format('YYYY-MM-DD')) // JSON.stringify(selectedDate).slice(1, 11))
                    } }
                />
            ) }
        </FieldWrapperFormik>
    )
}

export const CustomPickerFormik = ({ containerStyle, hideLabel, formikKey, formikProps, label, children, ...rest }) => {
    const inputStyles = {
        borderRadius: 5,
        borderColor: 'navy',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 5,
        marginVertical: 10,
    }

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = 'red';
    }

    return (
        <FieldWrapperFormik 
            containerStyle={ containerStyle }
            hideLabel={ hideLabel || false } 
            label={ label } 
            formikKey={ formikKey } 
            formikProps={ formikProps}
        >
            <Picker 
                style={ inputStyles }
                selectedValue={ formikProps.values[formikKey] }
                onValueChange={ value => { formikProps.setFieldValue(formikKey, value) }}
                {...rest}
            >
                { children }
            </Picker>
        </FieldWrapperFormik>
    )
}

export const CustomImagePickerFormik = ({ containerStyle, hideLabel, formikKey, formikProps, label, children, ...rest }) => {
    
    // states: date: new Date(), mode: 'date', 'datetime', show: false
    
    // const [date, setDate] = React.useState(new Date())
    // const [mode, setMode] = React.useState('date')
    // const [show, setShow] = React.useState(false)

    const [image, setImage] = React.useState(null)

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            // this.setState({ image: result.uri });
            setImage(result.uri)
          }

          const value = {
              uri: result.uri,
              type: 'image.jpg',
              name: 'photo.jpg',
          }
    
          formikProps.setFieldValue(formikKey, result.uri)

          console.log(result);
        } catch (E) {
          console.log(E);
        }
    }

    
    return(
        <FieldWrapperFormik
            containerStyle={[
                containerStyle,
                {
                    // alignItems: 'center',
                    // borderWidth: 1,
                }
            ]}
            hideLabel={ hideLabel || false } 
            // hideLabel
            label={ label } 
            formikKey={ formikKey } 
            formikProps={ formikProps }
        >
            <View
                style={[ 
                    // global_styles.avatar,
                    {
                        width: 150,
                        height: 150,
                        marginVertical: 20,
                        marginTop: 0,
                        alignSelf: 'center',
                        // backgroundColor: 'transparent',
                        // overflow: 'hidden',
                    }
                ]}
            >
                <ImageBackground
                    style={[ 
                        global_styles.avatar,
                        {
                            // borderRadius: 0,
                            alignSelf: 'center',
                            // backgroundColor: 'red',
                            overflow: 'hidden',
                            zIndex: 0,
                        }
                    ]}
                    source={{ uri: image }}
                    // source={ image ? null : require(image) }
                >
                    { !image ? ( <TouchableOpacity
                        onPress={ _pickImage }
                        style={[
                            // global_styles.avatar,
                            {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                alignItems: 'center',
                                borderRadius: 0,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                padding: 10,
                            }
                        ]}
                    >
                        <Text
                            style={[ 
                                // inputStyles,
                                {
                                    // position: 'absolute',
                                    borderWidth: 0,
                                    color: 'grey', 
                                    textAlign: 'center',
                                    fontSize: 20,
                                    width: '100%',
                                    textAlign: 'center',
                                    // bottom: -20,
                                }
                            ]}
                        >
                            Upload
                        </Text>
                            
                    </TouchableOpacity> ) : null }

                </ImageBackground>

                { image ? (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 10,
                            elevation: 11,
                        }}
                        onPress={ () => setImage(null) }
                    >
                        <Ionicons 
                            style={{
                                margin: 5,
                                width: 25,
                                height: 25,
                                color: 'rgba(0, 0, 0, 0.6)',
                            }} 
                            name="ios-close-circle" 
                            size={25} 
                        />
                    </TouchableOpacity>) : null }

                {/* <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        elevation: 300,
                    }}
                    onPress={ () => setImage(null) }
                    title={` X `}
                >
                    <Text
                        style={{
                            fontSize: 25, 
                            color: 'grey',
                            textAlign: 'center',
                            
                        }}
                    >
                        {` X `}
                    </Text>
                </TouchableOpacity> */}
            </View>

        </FieldWrapperFormik>
    )
}

// class CustomTextInput extends React.Component {
//     render() {
//         return (
//             <View style={ [styles.container, this.props.containerStyle ] }>
//                 <Text style={ styles.labelText }>{ this.props.label }</Text>
//                 <TextInput 
//                     placeholder={ `Enter your ${ this.props.label } here.` } 
//                     style={ styles.formInput } 
//                     keyboardType={ this.props.keyboardType || "default" } 
//                     secureTextEntry={ this.props.isSecure || false }

//                     onChangeText={ this.props.changeHandler }
//                     onBlur={ this.props.blurHandler }
//                     value={ this.props.value }
//                 />
//                 <Text style={ styles.errorMessage }>{ this.props.error }</Text>
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // margin: 5,
    },  
    labelText: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: 'navy',
    },  
    formInput: {
        borderRadius: 5,
        borderColor: 'navy',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 5,
        marginVertical: 10,
    },
    errorMessage: {
        color: 'red',
    }
});

// export default CustomTextInput;