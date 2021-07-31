import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheetBPM(props) {
    const { refRBSheet, BPM, setBPM } = props;

    const [BPMLocal, setBPMLocal] = useState(null);

    const initialStateOpen = () => {
        setBPMLocal(BPM);
    };

    const onChange = (event) => {
        setBPMLocal(parseInt(event.nativeEvent.text));
    };

    const confirmation = () => {
        setBPM(BPMLocal);
        refRBSheet.current.close();
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            closeOnPressMask={true}
            animationType="slide"
            dragFromTopOnly={true}
            onOpen={() => {
                initialStateOpen();
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    height: '50%',
                },
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleBottom}>
                    Establecer bpm para la nota negra
                </Text>
                <Button title="Confirmar" onPress={() => confirmation()} />
            </View>
            <ScrollView>
                <Input
                    keyboardType="numeric"
                    placeholder="Nombre"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e)}
                    label="bpm - Nota negra"
                    value={BPMLocal ? BPMLocal.toString() : ''}
                />
            </ScrollView>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    inputForm: {
        width: '100%',
        marginTop: 20,
    },
    titleBottom: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
});
