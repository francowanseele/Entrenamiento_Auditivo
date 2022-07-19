import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FIFTH_COLOR, PRIMARY_COLOR } from '../../../utils/colorPalette';

export default function BottomSheetBPM(props) {
    const { refRBSheet, BPM, setBPM } = props;

    const [BPMLocal, setBPMLocal] = useState(null);

    const initialStateOpen = () => {
        setBPMLocal(BPM);
    };

    const onChangeMenor = (event) => {
        setBPMLocal({
            menor:
                event.nativeEvent.text != ''
                    ? parseInt(event.nativeEvent.text)
                    : 0,
            mayor: BPMLocal.mayor,
        });
    };

    const onChangeMayor = (event) => {
        console.log(event.nativeEvent);
        setBPMLocal({
            menor: BPMLocal.menor,
            mayor:
                event.nativeEvent.text != ''
                    ? parseInt(event.nativeEvent.text)
                    : 0,
        });
    };

    const confirmation = () => {
        setBPM(BPMLocal);
        refRBSheet.current.close();
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={() => {
                initialStateOpen();
            }}
            height={Dimensions.get('window').height * 0.75}
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
            <View
                style={{
                    flexDirection: 'row',
                    paddingRight: 15,
                }}
            >
                <Text style={styles.titleBottom}>Establecer BPM</Text>
                <Button
                    containerStyle={styles.okGiroMelodico}
                    buttonStyle={styles.okGiroMelodicoButton}
                    title="Confirmar"
                    onPress={() => confirmation()}
                />
            </View>
            <View
                style={{
                    paddingRight: 15,
                }}
            >
                <View style={styles.contentTextPrioridad}>
                    <Text style={styles.textPrioridad}>
                        El rango establecido corresponde al valor de BPM que
                        puede tomar la nota negra
                    </Text>
                </View>
            </View>
            <ScrollView>
                <Input
                    keyboardType="numeric"
                    placeholder="Nombre"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChangeMenor(e)}
                    label="BPM Menor"
                    value={BPMLocal ? BPMLocal.menor.toString() : ''}
                />

                <Input
                    keyboardType="numeric"
                    placeholder="Nombre"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChangeMayor(e)}
                    label="BPM Mayor"
                    value={BPMLocal ? BPMLocal.mayor.toString() : ''}
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
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
    okGiroMelodico: {
        marginTop: 10,
        width: '30%'
    },
    okGiroMelodicoContainer: {
        width: '30%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    contentTextPrioridad: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: PRIMARY_COLOR,
        backgroundColor: FIFTH_COLOR,
        padding: 10,
        borderRadius: 5,
    },
    textPrioridad: {
        fontSize: 17,
    },
});
