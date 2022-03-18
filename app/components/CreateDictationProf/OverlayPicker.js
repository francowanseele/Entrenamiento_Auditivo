import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Animated,
    Platform,
} from 'react-native';
import {
    ListItem,
    Icon,
    Slider,
    Button,
    Divider,
    Overlay,
} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import SwipePicker from 'react-native-swipe-picker';
import { FIFTH_COLOR } from '../../../utils/colorPalette';

export default function OverlayPicker(props) {
    const {
        visible,
        setVisible,
        values,
        setValue,
        msjErrorOverlay,
        titleOverlay,
    } = props;

    const pickerRef = useRef();
    const [valueLocal, setValueLocal] = useState({ id: null, name: '' });
    const [valuesToPicker, setValuesToPicker] = useState([]);

    useEffect(() => {
        var arr = [];
        values.forEach((v) => {
            arr.push({
                value: v.name,
                label: v.name,
            });
        });

        setValuesToPicker(arr);
    }, [values]);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const setValuesPicker = (id, index) => {
        setValueLocal(values[index]);
    };

    const confirmation = () => {
        if (valueLocal.id) {
            setValue(valueLocal);
        } else {
            setValue(values[0]);
        }
        setVisible(!visible);
    };

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.overlaySelectPicker}
        >
            {msjErrorOverlay == '' ? (
                <>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>{titleOverlay}</Text>
                        <Button
                            containerStyle={styles.btnOk}
                            title="Ok"
                            onPress={() => confirmation()}
                        />
                    </View>
                    <View style={styles.screen}>
                        <Picker
                            ref={pickerRef}
                            selectedValue={valueLocal.name}
                            onValueChange={(itemValue, itemIndex) =>
                                setValuesPicker(itemValue, itemIndex)
                            }
                            mode="dropdown" // Android only
                            style={styles.picker}
                        >
                            {values.map((val, i) => (
                                <Picker.Item
                                    key={i}
                                    label={val.name}
                                    value={val.name}
                                />
                            ))}
                        </Picker>
                    </View>
                </>
            ) : (
                <View style={styles.containerError}>
                    <Text style={styles.titleError}>UPS...</Text>
                    <Text style={styles.msjError}>{msjErrorOverlay}</Text>
                </View>
            )}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlaySelectPicker: {
        width: '90%',
        height: '40%',
    },
    containerTitle: {
        flexDirection: 'row',
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
    },
    btnOk: {
        width: '20%',
    },
    containerError: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: 15,
    },
    titleError: {
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
    },
    msjError: {
        fontSize: 17,
    },
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
