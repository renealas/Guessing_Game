import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import DefaultStyle from '../constants/default-styles';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Numero Invalido!', 'El Numero debe ser un numero entre 1 y 99', [{ text: 'Aceptar', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={DefaultStyle.title}>Usted a Elegido: </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>COMENZAR EL JUEGO</MainButton>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={DefaultStyle.title}>Pantalla de Juego</Text>
                <Card style={styles.inputContainer}>
                    <Text style={DefaultStyle.bodyText}>Seleccione un Numero</Text>
                    <Input
                        style={styles.input}
                        blurOnSumbit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Reset"
                                onPress={resetInputHandler}
                                color={Colors.accent}
                                styles={styles.buttonsCorner}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.primary}
                                styles={styles.buttonsCorner}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: '40%',
    },
    input: {
        width: 50,
        height: 50,
        textAlign: "center",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    seleccion: {
        fontSize: 16,
        fontWeight: "bold",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    text:{
        fontFamily: 'open-sans',
    },
    buttonsCorner:{
        borderRadius: 25,
    },
});

export default StartGameScreen;