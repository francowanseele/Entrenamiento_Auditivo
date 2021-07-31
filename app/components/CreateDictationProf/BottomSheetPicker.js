import React, { useRef } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Picker } from '@react-native-picker/picker';

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
                    height: '30%',
                },
            }}
        >
            <Picker
                ref={pickerRef}
                selectedValue={nro_compases}
                onValueChange={(itemValue, itemIndex) =>
                    setNro_compases(itemValue)
                }
            >
                {values.map((value, i) => (
                    <Picker.Item key={i} label={value} value={value} />
                ))}
            </Picker>
        </RBSheet>
    );
}
