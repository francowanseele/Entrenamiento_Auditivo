import React from 'react';
import { Picker } from '@react-native-picker/picker';

export default function Picker(props) {
    const { values, setNro_compases, nro_compases } = props;

    return (
        <Picker
            ref={pickerRef}
            selectedValue={nro_compases}
            onValueChange={(itemValue, itemIndex) => setNro_compases(itemValue)}
        >
            {values.map((value, i) => (
                <Picker.Item key={i} label={value} value={value} />
            ))}
        </Picker>
    );
}
