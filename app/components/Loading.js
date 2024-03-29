import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/colorPalette';

export default function Loading(props) {
    const { isVisible, text } = props;
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,.5"
            overlayBackgroundColor="transparent"
            overlayStyle={style.overlay}
        >
            <View style={style.view}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                {text && <Text style={style.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

const style = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
    },

    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#000',
        textTransform: 'uppercase',
        marginTop: 10,
    },
});
