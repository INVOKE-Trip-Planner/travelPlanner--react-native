import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomTextInput, CustomDatePicker, CustomImagePicker } from "../../components/inputs";
import { CustomButton } from '../../components/inputs/button';
import { global_styles } from '../../assets/styles';

import { getFullUrl } from "api/helper.js"
import QRCode from "react-qr-code";
import { connect } from 'react-redux';
import Actions from "../../../actions";


const AVATAR_PREFIX = getFullUrl('storage/avatars/')

const UpdateUserForm = props => (
    <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={(values, actions) => {
            // console.log(values)
            // register(values)
            setTimeout(() => actions.setSubmitting(false), 400)
            props.onRegister(values);
        }}
    >
        {formikProps => (
            <View style={[ 
                global_styles.mainView,
                {
                    alignItems: 'center',
                }
            ]}>

                <CustomImagePicker 
                    formikProps={ formikProps }
                    formikKey="avatar"
                />

                <CustomTextInput 
                    formikProps={ formikProps }
                    formikKey="username"
                    // autoFocus
                />    

                <CustomTextInput 
                    formikProps={ formikProps }
                    formikKey="password"
                    secureTextEntry
                />

                <CustomTextInput 
                    formikProps={ formikProps }
                    formikKey="password_confirmation"
                    secureTextEntry
                    label="password confirmation"
                />

                <CustomTextInput 
                    formikProps={ formikProps }
                    formikKey="email"
                    keyboardType="email-address"
                />

                <CustomTextInput 
                    formikProps={ formikProps }
                    formikKey="phone"
                    keyboardType="phone-pad"
                />

                { formikProps.isSubmitting ? (
                    <ActivityIndicator />
                ) : (
                    <CustomButton 
                        label="Register"
                        style={ global_styles.buttonContainer }
                        textStyle={ global_styles.buttonText }
                        onPress={ formikProps.handleSubmit }
                    />
                )}
            </View>
        )}
    </Formik>
)

const initialValues = {
    // username: '',
    // password: '',
    // password_confirmation: '',
    // email: '',
    // phone: '',

    name: 'test9999',
    username: 'test9966',
    email: 'email9966@gmail.com',
    password: 'testregister',
    password_confirmation: 'testregister',
    avatar: null,
    phone: '1234567890',
}

const validationSchema = yup.object({
    username: yup.string()
        .required('Required'),
    password: yup.string()
        .required('Required')
        .min(6, 'Minimum 6 characters'),
    password_confirmation: yup.string()
        .required('Required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    phone: yup.number()
        .typeError('Invalid phone number')
        .required('Required')
        .integer('Invalid phone number')
        // need to check if values is defined otherwise will throw error
        .test('digit-length', 'Invalid phone number', values => values && values.toString().length >= 10 && values.toString().length <= 11 ),
})

const mapStateToProps = (store) => ({
    getGetUpdateUserData : Actions.getUpdateUserData(store)
})

const mapDispatchToProps = {
    onResetUserSessions: Actions.resetUserSession,
    onUserUpdate : Actions.updateUser,
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateUserForm);
