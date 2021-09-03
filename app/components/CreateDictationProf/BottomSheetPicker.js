import React, { useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import SwipePicker from 'react-native-swipe-picker';
import { Platform } from 'react-native';

export default function BottomSheetPicker(props) {
    const { refRBSheet, values, setNro_compases, nro_compases } = props;

    const pickerRef = useRef();

    const [valuesToPicker, setValuesToPicker] = useState([]);

    const initialStateOpen = () => {
        var arr = [];
        values.forEach((v) => {
            arr.push({
                value: v,
                label: v,
            });
        });

        setValuesToPicker(arr);
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
                    height: '30%',
                },
            }}
        >
            {Platform.OS == 'ios' ? (
                <>
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
                </>
            ) : (
                <>
                    {valuesToPicker.length > 0 ? (
                        <SwipePicker
                            items={valuesToPicker}
                            onChange={({ index, item }) => {
                                setNro_compases(item.value);
                            }}
                            initialSelectedIndex={parseInt(nro_compases) - 1}
                        />
                    ) : (
                        <></>
                    )}
                </>
            )}
        </RBSheet>
    );
}
