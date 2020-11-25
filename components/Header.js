import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import Colors from '../constants/colors';

const Header = props => {
    return(
        <View style={{
           ...styles.headerBase, 
           ...Platform.select({
               ios: styles.headerIOS,
               android: styles.headerAndroid,
           })
        }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%', 
        height: 90,
        paddingTop: 36,         
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    headerAndroid:{
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    headerTitle:{
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold',
    },
});

export default Header;