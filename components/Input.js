import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = props => {
    return <TextInput 
    style={{...styles.input, ...props.style}}
    {...props}
    />;
};

const styles = StyleSheet.create({
     input: {
        height: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        marginVertical: 20,
     }, 
});

export default Input;