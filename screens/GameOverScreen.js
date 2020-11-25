import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyle from '../constants/default-styles';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
        <View style={styles.screens}>
            <Card style={styles.cardContainer}>
                <Text style={DefaultStyle.title}>Juego Terminado</Text>
                <View style={styles.imageContainer}>
                    <Image
                        //source={require('../assets/success.png')}
                        fadeDuration={10000}
                        source={{uri: 'https://images.squarespace-cdn.com/content/v1/56745fd01115e0704ea133ec/1453773841949-L391UN1BR9WY75RDCKC2/ke17ZwdGBToddI8pDm48kCPztTQZpDiZMOuuCfUxiyx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UYlQ-m0oNUh_9buvyC-f1CSdhG_dNlqULB2ZTz-ses64A-QPhXXvNcU0N8wN7BGx0g/topoftheworld.jpg?format=2500w'}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <Text style={DefaultStyle.bodyText}>Numero de Turnos de su Telefono: <Text style={styles.highlight}>{props.roundsNumber}</Text></Text>
                <Text style={DefaultStyle.bodyText}>Su numero Elegido: <Text style={styles.highlight}>{props.userNumber}</Text></Text>
                <View style={styles.buttonContainer}>
                    <MainButton onPress={props.onRestart}>Jugar de Nuevo</MainButton>
                </View>
            </Card>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screens: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.accent,
        marginVertical: 10,
    },
    image: {
        width:  '100%',
        height: '100%',
    },
    imageContainer: {
        marginVertical: Dimensions.get('window').height /20,
        width: Dimensions.get('window').width * 0.70,
        height: Dimensions.get('window').width * 0.70,
        borderRadius: Dimensions.get('window').width * 0.70 / 2,
        borderWidth: 3,
        borderColor: 'white',
        overflow: 'hidden',
    },
    highlight:{
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    }
});

export default GameOverScreen;
