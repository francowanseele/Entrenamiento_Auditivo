import React, { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { Platform, View, StyleSheet } from 'react-native';
import { FIFTH_COLOR } from '../../../utils/colorPalette';

export default function BottomSheetPicker(props) {
    const { refRBSheet, values, setNro_compases, nro_compases } = props;

    const pickerRef = useRef();

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            closeOnPressMask={true}
            animationType="slide"
            dragFromTopOnly={true}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    height: Platform.OS == 'ios' ? '50%' : '35%',
                },
            }}
        >
            <View style={styles.screen}>
                <Picker
                    ref={pickerRef}
                    selectedValue={nro_compases}
                    onValueChange={(itemValue, itemIndex) =>
                        setNro_compases(itemValue)
                    }
                    mode="dropdown" // Android only
                    style={styles.picker}
                >
                    {values.map((value, i) => (
                        <Picker.Item
                            key={i}
                            label={value.concat(
                                value == 1 ? ' compás' : ' compases'
                            )}
                            value={value}
                        />
                    ))}
                </Picker>
            </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: FIFTH_COLOR,
        borderRadius: 5,
    },
});
