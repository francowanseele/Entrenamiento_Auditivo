import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/colorPalette';

export default function OverlayConfirmation(props) {
    const { visible, setVisible, title, text, functionOk } = props;

    const toggleOverlay = () => {
        if (functionOk) {
            functionOk();
        }
        setVisible(false);
    };

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            overlayStyle={styles.overlaySelectPicker}
        >
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
            <Button
                buttonStyle={styles.containerButtonOk}
                title="Confirmar"
                onPress={toggleOverlay}
            />
            <Button
                title="Cancelar"
                type="clear"
                onPress={() => setVisible(false)}
                titleStyle={{ color: SECONDARY_COLOR }}
            />
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlaySelectPicker: {
        width: '90%',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 20,
        fontSize: 17,
    },
    containerButtonOk: {
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: PRIMARY_COLOR,
    },
});
