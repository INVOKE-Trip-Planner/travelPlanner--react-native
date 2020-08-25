import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';


export const CustomButton = ({ textStyle, label, children, ...rest}) => (
    <TouchableOpacity 
        {...rest}
    >
        {
            children ? (
                { children }
            ) : (
                <Text style={ textStyle }>
                    { label } 
                </Text>
            )
        }

    </TouchableOpacity>
)

// class CustomButton extends React.Component {

//     render() {
//         return (
//             // <View style={ this.props.containerStyle }>
//                 <TouchableOpacity onPress={ this.props.pressHandler } style={ this.props.containerStyle }>
//                     <Text style={ this.props.textStyle }>
//                         { this.props.label } 
//                     </Text>
//                 </TouchableOpacity>
//             // </View>
//         )
//     }
// }

// export default CustomButton;