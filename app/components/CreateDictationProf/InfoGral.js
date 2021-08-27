import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getVarTemp_Teacher } from '../../../utils/asyncStorageManagement';
import {
    BACKGROUND_COLOR_RIGHT,
    BACKGROUND_COLOR_WORNING,
    BORDER_COLOR_RIGHT,
    BORDER_COLOR_WORNING,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WORNING,
} from '../../../utils/colorPalette';
import Loading from '../Loading';

export default function InfoGral(props) {
    const {
        institute,
        course,
        module,
        nameConfig,
        descriptionConfig,
        refRBSheet,
    } = props;

    const openConfigGral = () => {
        refRBSheet.current.open();
    };

    const informationMissing = () => {
        return !(
            institute.id &&
            course.id &&
            module.id &&
            nameConfig != '' &&
            descriptionConfig != ''
        );
    };

    return (
        <TouchableOpacity style={styles.contentGral} onPress={openConfigGral}>
            <View key={0} style={styles.card}>
                <View key={0} style={styles.contentCard}>
                    <View key={0} style={styles.content}>
                        <Text style={styles.title}>INSTITUTO: </Text>
                        <Text>{institute.id ? institute.name : '-'}</Text>
                    </View>

                    <View key={1} style={styles.content}>
                        <Text style={styles.title}>CURSO: </Text>
                        <Text>{course.id ? course.name : '-'}</Text>
                    </View>

                    <View key={2} style={styles.content}>
                        <Text style={styles.title}>MÓDULO: </Text>
                        <Text>{module.id ? module.name : '-'}</Text>
                    </View>

                    <View key={3} style={styles.content}>
                        <Text style={styles.title}>CONFIGURACIÓN: </Text>
                        <Text>{nameConfig != '' ? nameConfig : '-'}</Text>
                    </View>
                </View>
                {informationMissing() ? (
                    <View style={styles.contentIcon}>
                        <Icon
                            //name="chat-alert-outline"
                            name="chat-processing-outline"
                            type="material-community"
                            color="black"
                            iconStyle={styles.iconStyle}
                            containerStyle={styles.iconContainerStyle}
                        />
                    </View>
                ) : (
                    <View style={styles.contentIcon}>
                        <Icon
                            type="material-community"
                            name="check-outline"
                            iconStyle={styles.iconStyleRight}
                            containerStyle={styles.iconContainerStyleRight}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contentGral: {
        marginBottom: 10,
    },

    title: {
        fontWeight: 'bold',
    },

    content: {
        flexDirection: 'row',
    },

    card: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        marginHorizontal: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
    },

    contentCard: {
        width: '80%',
        height: 90,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    iconContainerStyle: {
        backgroundColor: BACKGROUND_COLOR_WORNING,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_WORNING,
        borderWidth: 3,
        borderRadius: 5,
    },
    iconStyle: {
        fontSize: 40,
        color: TEXT_COLOR_WORNING,
    },
    iconContainerStyleRight: {
        backgroundColor: BACKGROUND_COLOR_RIGHT,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_RIGHT,
        borderWidth: 3,
        borderRadius: 5,
    },
    iconStyleRight: {
        fontSize: 40,
        color: TEXT_COLOR_RIGHT,
    },

    contentIcon: {
        width: '20%',
        height: 90,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
    },
});
