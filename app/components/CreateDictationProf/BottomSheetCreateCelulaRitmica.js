import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Alert  } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import {
    ListItem,
    Icon,
    Slider,
    Button,
    Divider,
    Input,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchSelector from 'react-native-switch-selector';

import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';
import {
    addGiroMelodicoApi,
    getGiroMelodicoApi,
} from '../../api/giro_melodico';
import KeyboardCreateCelulas from './KeyboardCreateCelulas';

export default function BottomSheetCreateCelulaRitmica(props) {
    const {
        setSimple,
        refRBSheet,
        setValorCelula,
        setPhoto,
        photo,
        setFiguras,
        figuras
    } = props;
    // const [prio, setPrio] = useState(1);
    
    const [title, setTitle] = useState('Nueva celula ritmica');
    const [ valorCelulaDenominador, setValorCelulaDenominador ] = useState(0);
    const [ valorCelulaNumerador, setValorCelulaNumerador ] = useState(0);
    


    

    const confirmation = () => {

        if ( photo && (valorCelulaDenominador != 0 && valorCelulaNumerador != 0 && figuras.length > 0) ){ 
            setValorCelula(valorCelulaNumerador.toString+'/'+valorCelulaDenominador.toString);
            refRBSheet.current.close(); 
        }else
             Alert.alert('Campos incompletos','Debes llenar todos los campos','ok')
    };

  
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            setPhoto(response);
          }
        });
      };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            // closeOnPressMask={true}
            animationType="slide"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    height: '75%',
                },
            }}
        >
            <View>
                
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingRight: 15,
                            }}
                        >
                            <Text style={styles.titleBottom}>{title}</Text>
                            <Button
                                style={styles.okGiroMelodico}
                                buttonStyle={styles.okGiroMelodicoButton}
                                title={ 'Guardar Celula'}
                                onPress={() => confirmation()}
                                containerStyle={styles.okGiroMelodicoContainer}
                            />
                        </View>
                        <SwitchSelector
                        initial={0}
                        onPress={(value) => setSimple(value == 'e')}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Simple',
                                value: 'e',
                            },
                            {
                                label: 'Compuesta',
                                value: 'l',
                            },
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        style={{
                            alignSelf: 'center',
                            width: '95%',
                        }}
                    />
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingRight: 20,
                                }}
                            >
                                <Text style={styles.textPrioridad}>
                                    Figuras: 
                                </Text>

                            </View>

                            <Divider orientation="horizontal" />

                            <KeyboardCreateCelulas
                                figuras={figuras}
                                setFiguras={setFiguras}
                                // mayor={mayor}
                            />
                        </ScrollView>
                        <View style={{flexDirection:'column',width:'100%'}}>
                            <Input
                                style={{
                                    marginTop:15,
                                    width:'50%'
                                }}
                                placeholder='Valor de la celula ritmica (Numerador)'
                                onChangeText={
                                        value =>{ 
                                        setValorCelulaNumerador(value)
                                    }}
                                    keyboardType="numeric"

                            />
                            <Input
                            style={{
                                marginTop:15,
                                width:'50%'
                            }}
                            placeholder='Valor de la celula ritmica (Denominador)'
                            onChangeText={
                                    value =>{ 
                                    setValorCelulaDenominador(value)
                                }}
                                keyboardType="numeric"

                            />
                        </View>
                        {photo && (
                        <>
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                        {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
                        </>
                    )}
                    <Button title="Subir imagen" onPress={handleChoosePhoto} />
                                    </View>
            </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
   
   
    buttonDelete: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
    },
  
    okGiroMelodico: {
        marginTop: 10,
        marginBottom:10,
        borderRadius:29,
    },
    okGiroMelodicoContainer: {
        width: '30%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
   
    textPrioridad: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 20,
        width: '50%',
    },
   
});
