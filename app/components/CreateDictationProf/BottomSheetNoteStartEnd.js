import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';

import Keyboard from './Keyboard';

export default function BottomSheetNoteStartEnd(props) {
    const {
        notas_fin,
        notas_inicio,
        start,
        setNotas_inicio,
        setNotas_fin,
        refRBSheet,
    } = props;
    const [notes, setNotes] = useState([]);

    const confirmation = () => {
        if (start) {
            setNotas_inicio(notes);
        } else {
            setNotas_fin(notes);
        }
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        if (start) {
            setNotes(notas_inicio);
        } else {
            setNotes(notas_fin);
        }
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            closeOnPressMask={true}
            animationType="slide"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    height: '60%',
                },
            }}
        >
            <ScrollView>
                {start ? (
                    <Text style={styles.titleBottom}>Notas de Inicio</Text>
                ) : (
                    <Text style={styles.titleBottom}>Notas de Fin</Text>
                )}
                <Keyboard notes={notes} setNotes={setNotes} />

                <Button
                    style={styles.okGiroMelodico}
                    title="Ok"
                    onPress={() => confirmation()}
                />
            </ScrollView>
        </RBSheet>
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
