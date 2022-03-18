import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import {
    FIFTH_COLOR,
    QUARTER_COLOR,
    TERTIARY_COLOR,
} from '../../../utils/colorPalette';
import { notesMayor, notesMenor } from '../../../utils/keyboardNoteInterval';

export default function Keyboard(props) {
    const { notes, setNotes, max, toastMax, textAlertMax, mayor } = props;

    const scrollViewRef = useRef();

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

    useEffect(() => {
        setTimeout(() => {
            if (
                scrollViewRef &&
                scrollViewRef.current &&
                scrollViewRef.current.scrollTo
            ) {
                scrollViewRef.current.scrollTo({ x: 575, animated: true });
            }
        }, 500);
    }, []);

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

            <ScrollView horizontal={true} ref={scrollViewRef}>
                {mayor
                    ? notesMayor.map((note, i) => (
                          <View
                              key={i}
                              style={{
                                  backgroundColor: '#D6D6D6',
                                  paddingVertical: 5,
                              }}
                          >
                              <Button
                                  title={note.firstInterval}
                                  onPress={() => writeNote(note.firstNote)}
                                  containerStyle={styles.buttonNotes}
                                  buttonStyle={{
                                      backgroundColor: '#F7F7F7',
                                      height: 55,
                                      padding: 0,
                                  }}
                                  titleStyle={{ color: 'black' }}
                              />
                              {note.secondInterval != '' ? (
                                  <Button
                                      title={note.secondInterval}
                                      onPress={() => writeNote(note.secondNote)}
                                      containerStyle={styles.buttonNotes}
                                      buttonStyle={{
                                          backgroundColor: '#B5B5B5',
                                          height: 55,
                                          padding: 0,
                                      }}
                                      titleStyle={{ color: 'black' }}
                                  />
                              ) : (
                                  <></>
                              )}
                          </View>
                      ))
                    : notesMenor.map((note, i) => (
                          <View
                              key={i}
                              style={{
                                  backgroundColor: '#D6D6D6',
                                  paddingVertical: 5,
                              }}
                          >
                              <Button
                                  title={note.firstInterval}
                                  onPress={() => writeNote(note.firstNote)}
                                  containerStyle={styles.buttonNotes}
                                  buttonStyle={{
                                      backgroundColor: '#F7F7F7',
                                      height: 55,
                                      padding: 0,
                                  }}
                                  titleStyle={{ color: 'black' }}
                              />
                              {note.secondInterval != '' ? (
                                  <Button
                                      title={note.secondInterval}
                                      onPress={() => writeNote(note.secondNote)}
                                      containerStyle={styles.buttonNotes}
                                      buttonStyle={{
                                          backgroundColor: '#B5B5B5',
                                          height: 55,
                                          padding: 0,
                                      }}
                                      titleStyle={{ color: 'black' }}
                                  />
                              ) : (
                                  <></>
                              )}
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
        width: 45,
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
