import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Overlay } from 'react-native-elements';
import { PRIMARY_COLOR } from '../../utils/colorPalette';

export default function ScreenPlaying(props) {
    const { isVisible, text } = props;
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,.5"
            overlayBackgroundColor="transparent"
            overlayStyle={style.overlay}
        >
            <View style={style.view}>
                <Image
                    style={{ width: 300, height: 200 }}
                    source={require('../../assets/playing_dictation.gif')}
                />
                {/* <ActivityIndicator size="large" color={'#000'} /> */}
                {text && <Text style={style.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

const style = StyleSheet.create({
    overlay: {
        height: '50%',
        width: '95%',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 3,
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
