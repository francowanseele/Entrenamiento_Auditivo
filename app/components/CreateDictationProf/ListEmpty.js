import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    BACKGROUND_COLOR_WORNING,
    BORDER_COLOR_WORNING,
    TEXT_COLOR_WORNING,
} from '../../../utils/colorPalette';

export default function ListEmpty(props) {
    const { text } = props;
    return (
        <View style={styles.contentEmpty}>
            <View style={styles.contentBorder}>
                <Text style={styles.textStyle}>{text}</Text>
                <Icon
                    //name="chat-alert-outline"
                    name="information-outline"
                    type="material-community"
                    color="black"
                    containerStyle={styles.iconContainerStyle}
                    iconStyle={styles.iconStyle}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentEmpty: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
    contentBorder: {
        borderStyle: 'solid',
        borderWidth: 3,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        borderColor: BORDER_COLOR_WORNING,
        backgroundColor: BACKGROUND_COLOR_WORNING,
    },
    textStyle: {
        width: '80%',
        color: TEXT_COLOR_WORNING,
        fontSize: 15,
    },
    iconContainerStyle: {
        width: '20%',
    },
    iconStyle: {
        color: TEXT_COLOR_WORNING,
        fontSize: 30,
    },
});
