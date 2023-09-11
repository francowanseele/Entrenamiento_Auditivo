import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Button, Icon, Slider, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import { estadoAcorde } from '../../../enums/estadoAcorde';
import { PRIMARY_COLOR, QUARTER_COLOR } from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';

export default function BottomSheetAcordeTensiones(props) {
    const {
        refRBSheet,
        listOptionsTensiones,
        setListOptionsTensiones,
        escalaForSpecificTensions,
        acordeForSpecificTensions,
        tetradaForSpecificTensions,
        tensionForSpecificTensions,
        triadaForSpecificTensions,
        selectSpecificTensionTetrada,
        isTetradaForSpecificTensions,
        selectSpecificTensionTriada,
    } = props;

    const [height, setHeight] = useState(0.5);

    const initialStateOpen = async () => {
        await setHeight(0.5);
    };

    const checkOption = (tension) => {
        setListOptionsTensiones(listOptionsTensiones.map((x) => {
            if (x.tension == tension) x.selected = !x.selected
            return x
        }))
    }

    const closeSheet = () => {
        if (isTetradaForSpecificTensions) {
            selectSpecificTensionTetrada(escalaForSpecificTensions, acordeForSpecificTensions, tetradaForSpecificTensions, tensionForSpecificTensions, listOptionsTensiones)
        } else {
            selectSpecificTensionTriada(escalaForSpecificTensions, acordeForSpecificTensions, triadaForSpecificTensions, tensionForSpecificTensions, listOptionsTensiones)
        }
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={initialStateOpen}
            onClose={closeSheet}
            height={Dimensions.get('window').height * height}
            closeDuration={CLOSE_BOTTOM_SHEET}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                },
            }}
        >
            <ScrollView>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Seleccionar tensiones</Text>
                </View>

                {listOptionsTensiones.map((opt, key) => (
                    <CheckBox
                        key={key}
                        title={opt.tension}
                        checked={opt.selected}
                        onPress={() => checkOption(opt.tension)}
                    />
                ))}
            </ScrollView>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconOption: {
        fontSize: 25,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: PRIMARY_COLOR,
    },
    options: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
    },
    confirmationTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    editTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    confirmationText: {
        fontSize: 20,
        paddingHorizontal: 15,
    },
    containerConfirmation: {
        position: 'relative',
        height: '100%',
    },
    containerButtons: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: '20%',
    },
    containerButtonOk: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: PRIMARY_COLOR,
    },
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
    },
    textPrioridad: {
        marginLeft: 30,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        paddingBottom: 30,
    },
    containerTitle: {
        marginLeft: 30,
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    }
});
