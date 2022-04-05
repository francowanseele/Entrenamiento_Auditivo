import React from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider, Input } from 'react-native-elements';

export default function KeyboardCreateCelulas(props) {
    const {figuras, setFiguras} = props;
    const figuresKeyboard = [
        '1',
        '2',
        '4',
        '2',
        '4',
        '8',
        '16',
        '32',
        '64',
        'd2','d4','d8','d16'
    ];

    const getFigure = (figs) => {
        const arrFigs = figs.split('-');
        var arr = [];
        arrFigs.forEach((f) => {
            switch (f) {
                case '1':
                    arr.push('music-note-whole');
                    break;
                case '2':
                    arr.push('music-note-half');
                    break;
                case 'd2':
                    arr.push('music-note-half-dotted');
                    break;
                case '4':
                    arr.push('music-note-quarter');
                    break;
                case 'd4':
                    arr.push('music-note-quarter-dotted');
                    break;
                case '8':
                    arr.push('music-note-eighth');
                    break;
                case 'd8':
                    arr.push('music-note-eighth-dotted');
                    break;
                case '16':
                    arr.push('music-note-sixteenth');
                    break;
                case 'd16':
                    arr.push('music-note-sixteenth-dotted');
                    break;
                default:
                    break;
            }
        });

        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
            >
                {arr.map((icon, i) => (
                    <Icon
                        key={i}
                        name={icon}
                        type="material-community"
                        iconStyle={{ fontSize: 30 }}
                    />
                ))}
            </View>
        );
    };

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
            setFiguras(newGiro);
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
                        {printArray(figuras)}
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
                {figuresKeyboard.map((nota, i) => (
                    <View key={i}>
                        <Button
                             icon={
                                <Icon
                                  name="arrow-right"
                                  size={15}
                                  color="white"
                                />
                              }
                            title={nota}
                            onPress={() => writeNote(nota)}
                            containerStyle={styles.buttonNotes}
                        />
                        
                    </View>
                ))}
            </ScrollView>
            <Input
                placeholder='Valor de la celula ritmica'
                />
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
