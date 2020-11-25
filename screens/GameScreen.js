import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyle from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyle.bodyText}>#{listLength -itemData.index}</Text>
        <Text style={DefaultStyle.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Porfavor no mienta!!!', 'Tu sabes que lo que dijiste esta equivocado...', [{ text: 'Se mas Sincero!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.title}>Numero Adivinado por el Oponente</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={20} color="white" /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={20} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
            <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}  contentContainerStyle={styles.list}/>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
        maxWidth: '100%',
    },
    listItem:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10, 
        backgroundColor: Colors.accent,
        flexDirection: 'row',   
        justifyContent: 'space-around',
        alignItems: 'center',     
        width: '100%',
    },
    listContainer:{
        flex: 1,
        width: '100%',       
    },
    list:{
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default GameScreen;