import React from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';

export default function Keyboard(props) {
    const { notes, setNotes, max, toastMax, textAlertMax } = props;
    const notas = [
        'A1',
        'B1',
        'C1',
        'D1',
        'E1',
        'F1',
        'G1',
        'A2',
        'B2',
        'C2',
        'D2',
        'E2',
        'F2',
        'G2',
        'A3',
        'B3',
        'C3',
        'D3',
        'E3',
        'F3',
        'G3',
        'A4',
        'B4',
        'C4',
        'D4',
        'E4',
        'F4',
        'G4',
        'A5',
        'B5',
        'C5',
        'D5',
        'E5',
        'F5',
        'G5',
        'A6',
        'B6',
        'C6',
        'D6',
        'E6',
        'F6',
        'G6',
    ];

    const alterar = (nota, alteracion) => {
        return nota.slice(0, 1) + alteracion + nota.slice(1, 2);
    };

    const printArray = (arr) => {
        var res = '';
        if (arr.length > 0) {
            for (let i = 0; i < arr.length - 1; i++) {
                const elem = arr[i];
                res = res.concat(elem, ' - ');
            }
            res = res.concat(arr[arr.length - 1]);
        } else {
            res = ' - ';
        }

        return res;
    };

    const writeNote = (nota) => {
        if (max && notes.length >= max) {
            toastMax.current.show(textAlertMax);
        } else {
            var newGiro = [];
            notes.forEach((g) => {
                newGiro.push(g);
            });
            newGiro.push(nota);
            setNotes(newGiro);
        }
    };

    const deleteNote = () => {
        var newGiro = [];
        for (let i = 0; i < notes.length - 1; i++) {
            const g = notes[i];
            newGiro.push(g);
        }

        setNotes(newGiro);
    };

    return (
        <>
            <View style={styles.contentKeyboard}>
                <View style={styles.contentGirosMelodicos}>
                    <Text style={styles.textGirosMelodicos}>
                        {printArray(notes)}
                    </Text>
                </View>
                <View style={styles.contentButtonDelete}>
                    <Button
                        icon={
                            <Icon
                                name="chevron-left-box"
                                type="material-community"
                                color="white"
                            />
                        }
                        containerStyle={styles.buttonDelete}
                        onPress={() => deleteNote()}
                    />
                </View>
            </View>

            <ScrollView horizontal={true}>
                {notas.map((nota, i) => (
                    <View key={i}>
                        <Button
                            title={alterar(nota, '#')}
                            onPress={() => writeNote(alterar(nota, '#'))}
                            containerStyle={styles.buttonNotes}
                        />
                        <Button
                            title={nota}
                            onPress={() => writeNote(nota)}
                            containerStyle={styles.buttonNotes}
                        />
                        <Button
                            title={alterar(nota, 'b')}
                            onPress={() => writeNote(alterar(nota, 'b'))}
                            containerStyle={styles.buttonNotes}
                        />
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    contentButtonDelete: {
        paddingTop: 20,
        width: '20%',
    },
    contentKeyboard: {
        flexDirection: 'row',
    },
    buttonDelete: {
        width: 60,
    },
    okGiroMelodico: {
        marginTop: 20,
    },
    titleBottom: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
    },
    buttonNotes: {
        width: 60,
        margin: 2,
    },
    contentGirosMelodicos: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 20,
        width: '80%',
    },
    textGirosMelodicos: {
        fontSize: 15,
        width: '100%',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    textPrioridad: {
        marginLeft: 20,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
});
