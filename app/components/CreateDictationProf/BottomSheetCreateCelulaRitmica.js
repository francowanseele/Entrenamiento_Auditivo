import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Alert, Dimensions  } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';


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
import getValueFromIcon from './KeyboardCreateCelulas';
import { addCelulaRitmicaApi } from '../../api/celula_ritmica';

const KeyBoardValuesFigures = [ 
    {
     name:'music-note-whole',
     value:'1'},
     {name:'music-note-half',
     value:'2'},
   {name:'music-note-half-dotted',
   value:'d2'},
  {name:'music-note-quarter',
  value:'4'},
  {name:'music-note-quarter-dotted',
  value:'d4'},
  {name:'music-note-eighth',
  value:'8'},
  {name:'music-note-eighth-dotted',
  value:'d8'},
  {name:'music-note-sixteenth',
  value:'16'},
   {name:'music-note-sixteenth-dotted',
   value:'d16'} ]

export default function BottomSheetCreateCelulaRitmica(props) {
    const {
        setSimple,
        simple,
        refRBSheet,
        setPhoto,
        photo,
        setFiguras,
        figuras
    } = props;
    
    const [title, setTitle] = useState('Nueva celula ritmica');
    
    const confirmation = async () => {
        let valorOriginal = [];
        figuras.map((figura)=>{
            let res = KeyBoardValuesFigures.find((fig)=> fig.name === figura)
            valorOriginal.push(res.value)
        })
        
        const photo64 = await ImgToBase64.getBase64String(photo.uri)
        const data = {
            profileImage: photo64,
            valor:valorOriginal,
            simple:simple,
        }
        if ( photo &&  valorOriginal.length > 0 ){ 
            await addCelulaRitmicaApi(data)
            refRBSheet.current.close();
            setPhoto(null);
            setFiguras([])
        }else
             Alert.alert('Campos incompletos','Debes llenar todos los campos','ok')
    };

  
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response && response.assets && response.assets[0]) {
                setPhoto(response.assets[0]);
          }
        });
      };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            // onOpen={async () => {
            //     await initialStateOpen();
            // }}
            height={Dimensions.get('window').height * 0.75}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
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
                        <Divider orientation="horizontal" />

                        {photo && (
                        <>
                        <Image
                            resizeMode={'contain'}
                            source={{ uri: photo.uri }}
                            // source={{uri:}}
                            style={{ width: 380, height: 200, alignSelf:'center' }}
                        />
                        {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
                        </>
                    )}
                     <Divider orientation="horizontal" />

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