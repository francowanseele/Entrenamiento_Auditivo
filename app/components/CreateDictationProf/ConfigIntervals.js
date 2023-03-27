import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    ListItem,
    Icon,
} from 'react-native-elements';

import AlertValidator from './AlertValidator';
import OverlayInfo from './OverlayInfo';
import DropdownSimpleSelect from '../DropdownSimpleSelect';
import { tipoIntervalo } from '../../../enums/tipoIntervalo';
import { direccionIntervalo } from '../../../enums/direccionIntervalo';

export default function ConfigIntervals(props) {
    const {
        refRBSheet_Intervals,
        intervalType,
        setIntervalType,
        directionInterval,
        setDirectionInterval,
        okClefs,
        clave_prioridad,
        setClaveEdit,
        refRBSheet_Clave,
        okIntervals,
    } = props;

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [textInfo, setTextInfo] = useState('');
    const [titleInfo, setTitleInfo] = useState('');

    const TEXT_INFO_CLEF =
        'Asigne una probabilidad de al menos valor 1 a una o ambas Claves.';
    const TITLE_INFO_CLEF =
        'Tanto la clave de Sol como Fa tienen probabilidad cero de aparecer en un dictado';

    const TEXT_INFO_INTERVAL = 'Asigne una prioridad distinta a cero en al menos un intervalo.';
    const TITLE_INFO_INTERVAL = 'Todos los intervalos tienen prioridad cero.';

    const editIntervals = () => {
        refRBSheet_Intervals.current.open();
    }

    const printPrioridadClave = (clave, clavePrio) => {
        var res = null;
        clavePrio.forEach((cp) => {
            if (cp.clave == clave) {
                res = cp.prioridad.toString();
            }
        });

        return res;
    };

    const editClave = async (clave) => {
        await setClaveEdit(clave);
        refRBSheet_Clave.current.open();
    };

    return (
        <View>
            <ListItem key={0} style={[styles.listOne, {marginBottom: 15}]}>
                <ListItem.Content style={styles.content}>
                    {!okIntervals ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_INTERVAL}
                                titleInfo={TITLE_INFO_INTERVAL}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Intervalos
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editIntervals()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            <View>
                <DropdownSimpleSelect 
                    label={'Tipo'}
                    data={[
                        { label: 'Melódico', value: tipoIntervalo.melodico},
                        { label: 'Armnónico', value: tipoIntervalo.armonico},
                        { label: 'Melódico/Armónico', value: tipoIntervalo.ambos},
                    ]}
                    value={intervalType}
                    setValue={setIntervalType}
                />

                <DropdownSimpleSelect 
                    label={'Dirección'}
                    data={[
                        { label: 'Ascendente', value: direccionIntervalo.ascendente},
                        { label: 'Descendente', value: direccionIntervalo.descendente},
                        { label: 'Ascendente/Descendente ', value: direccionIntervalo.ambas},
                    ]}
                    value={directionInterval}
                    setValue={setDirectionInterval}
                />
            </View>

            <ListItem
                key={1}
                style={styles.listOne}
                bottomDivider
            >
                <ListItem.Content style={styles.content}>
                    {!okClefs ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_CLEF}
                                titleInfo={TITLE_INFO_CLEF}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Clave de Sol
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Prioridad{' '}
                            {printPrioridadClave('Sol', clave_prioridad)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editClave('Sol')}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem key={2} bottomDivider>
                <ListItem.Content style={styles.content}>
                    {!okClefs ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_CLEF}
                                titleInfo={TITLE_INFO_CLEF}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Clave de Fa
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Prioridad{' '}
                            {printPrioridadClave('Fa', clave_prioridad)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editClave('Fa')}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            <OverlayInfo
                visible={visibleInfo}
                setVisible={setVisibleInfo}
                title={titleInfo}
                text={textInfo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listOne: {
        marginTop: 15,
    },
    content: {
        flexDirection: 'row',
    },
    contentAlert: {
        width: '10%',
    },
    contentListLeft: {
        textAlign: 'left',
        width: '70%',
    },
    titleSingle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
});
