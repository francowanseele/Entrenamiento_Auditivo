import React from 'react';
import { Touchable } from 'react-native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    BACKGROUND_COLOR_WORNING,
    BACKGROUND_COLOR_WRONG,
    BORDER_COLOR_WORNING,
    BORDER_COLOR_WRONG,
    TEXT_COLOR_WORNING,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';

export default function AlertValidator(props) {
    const { setVisibleInfo, setTitleInfo, setTextInfo, textInfo, titleInfo } =
        props;

    const setOverlayInfo = () => {
        setTitleInfo(titleInfo);
        setTextInfo(textInfo);
        setVisibleInfo(true);
    };

    return (
        <TouchableOpacity style={styles.contentIcon} onPress={setOverlayInfo}>
            <Icon
                //name="chat-alert-outline"
                name="chat-alert-outline"
                type="material-community"
                color="black"
                iconStyle={styles.iconStyle}
                containerStyle={styles.iconContainerStyle}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contentIcon: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
    },
    iconContainerStyle: {
        backgroundColor: BACKGROUND_COLOR_WRONG,
        paddingTop: 7,
        paddingBottom: 7,
        marginRight: 5,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_WRONG,
        borderWidth: 3,
        borderRadius: 5,
    },
    iconStyle: {
        fontSize: 20,
        color: TEXT_COLOR_WRONG,
    },
});
