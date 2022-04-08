import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text  } from 'react-native';
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
        create,
        setSimple,
        refRBSheet,
        setValorCelula,
    } = props;
    // const [prio, setPrio] = useState(1);
    const [figuras, setFiguras] = useState([]);
    const [renderSlider, setRenderSlider] = useState(false);
    const [title, setTitle] = useState('Nueva celula ritmica');
    const [writeGiroMelodico, setWriteGiroMelodico] = useState(true);
    const [girosMelodicosDB, setGirosMelodicosDB] = useState([]);


    

    const confirmation = () => {
        // const newGiro = {
        //     giros_melodicos: giro,
        //     prioridad: prio,
        // };

        // var newGiroMelodicoRegla = [];
        // giro_melodico_regla.forEach((gm_regla) => {
        //     if (add) {
        //         newGiroMelodicoRegla.push(gm_regla);
        //     } else {
        //         if (gm_regla == giro_melodico_reglaEdit) {
        //             newGiroMelodicoRegla.push(newGiro);
        //         } else {
        //         }
        //     }
        // });
        // if (add) {
        //     newGiroMelodicoRegla.push(newGiro);
        // }

        // setGiro_melodico_regla(newGiroMelodicoRegla);
        refRBSheet.current.close();
    };

  
    const deleteGiro = () => {
        // var newGiroMelodicoRegla = [];
        // giro_melodico_regla.forEach((gm_regla) => {
        //     if (gm_regla != giro_melodico_reglaEdit) {
        //         newGiroMelodicoRegla.push(gm_regla);
        //     }
        // });

        // setGiro_melodico_regla(newGiroMelodicoRegla);
        // refRBSheet.current.close();
    };

   
   

    const isGiroAdded = (giro) => {
        var ok = false;
        girosMelodicosDB.forEach((gm_db) => {
            ok =
                ok ||
                (printArray(giro) == printArray(gm_db.giros_melodicos) &&
                    gm_db.add);
        });

        return ok;
    };


    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            setPhoto(response);
          }
        });
      };

    const createFormData = (photo, body = {}) => {
        const data = new FormData();
      
        data.append('photo', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      
        Object.keys(body).forEach((key) => {
          data.append(key, body[key]);
        });
      
        return data;
      };

      const handleUploadPhoto = () => {
        // fetch(`${SERVER_URL}/api/upload`, {
        //   method: 'POST',
        //   body: createFormData(photo, { userId: '123' }),
        // })
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log('response', response);
        //   })
        //   .catch((error) => {
        //     console.log('error', error);
        //   });
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
                                        setValorCelula(value)
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
                                    setValorCelula(value)
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
                        <Button title="Upload Photo" onPress={handleUploadPhoto} />
                        </>
                    )}
                    <Button title="Choose Photo" onPress={handleChoosePhoto} />
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
