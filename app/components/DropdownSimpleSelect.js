import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { PRIMARY_COLOR } from '../../utils/colorPalette';

export default function DropdownSimpleSelect(props) {
    const { label, data, value, setValue } = props;
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value != null || isFocus) {
            return (
                <Text
                    style={[styles.label, isFocus && { color: PRIMARY_COLOR }]}
                >
                    {label}
                </Text>
            );
        }
        return null;
    };

    const renderIcon = () => {
        if (label == 'Dirección') {
            return (
                <Icon
                    style={styles.icon}
                    color={isFocus ? PRIMARY_COLOR : 'black'}
                    type="material-community"
                    name="arrow-up-down"
                    size={20}
                />
            );
        } else if (label == 'Tipo') {
            return (
                <Icon
                    style={styles.icon}
                    color={isFocus ? PRIMARY_COLOR : 'black'}
                    type="material-community"
                    size={20}
                    name="music"
                />
            );
        } else {
            return (
                <Icon
                    style={styles.icon}
                    color={isFocus ? PRIMARY_COLOR : 'black'}
                    type="material-community"
                    name="playlist-edit"
                    size={20}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[
                    styles.dropdown,
                    isFocus && { borderColor: PRIMARY_COLOR },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Seleccionar' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() =>
                    renderIcon()
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        width: '100%',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
