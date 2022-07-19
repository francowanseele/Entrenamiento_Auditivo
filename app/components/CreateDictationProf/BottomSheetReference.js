import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-easy-toast';

import KeyboardIntervals from './KeyboardIntervals';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';

export default function BottomSheetReference(props) {
    const { nota_base, setNota_base, refRBSheet, toastRef, mayor } = props;
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (notes.length > 1) {
            setNotes([notes[0]]);
            toastRef.current.show('Solo UNA nota de referencia');
        }
    }, [notes]);

    const confirmation = () => {
        if (notes.length > 0) {
            setNota_base(notes);
        } else {
            setNota_base(null);
        }
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        if (nota_base) {
            setNotes([nota_base]);
        } else {
            setNotes([]);
        }
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            height={Dimensions.get('window').height * 0.6}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                },
            }}
        >
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                    }}
                >
                    <Text style={styles.titleBottom}>Nota de referencia</Text>
                    <Button
                        containerStyle={styles.okGiroMelodico}
                        buttonStyle={styles.okGiroMelodicoButton}
                        title="Confirmar"
                        onPress={() => confirmation()}
                    />
                </View>
                <ScrollView>
                    <KeyboardIntervals
                        notes={notes}
                        setNotes={setNotes}
                        max={1}
                        toastMax={toastRef}
                        textAlertMax={'Solo UNA nota de referencia'}
                        mayor={mayor}
                    />
                </ScrollView>
            </View>

            <Toast ref={toastRef} position="top" opacity={0.9} />
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
    // okGiroMelodico: {
    //     marginTop: 20,
    // },
    okGiroMelodico: {
        marginTop: 10,
        width: '30%',
    },
    okGiroMelodicoContainer: {
        width: '30%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
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
