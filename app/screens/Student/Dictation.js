import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import {BACKGROUNDHOME,TEXTHOME,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';
import { tramsitDictationApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';
import Graphic from '../../components/Graphic';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const { dictation } = route.params;
    const navigation = useNavigation();

    const playDictado = async () => {
        // TODO -> id del usuario
        const id = await getStorageItem(ID_USER);
        const tran = await tramsitDictationApi(id);

        const { sound } = await Audio.Sound.createAsync({ uri: tran });
        await sound.playAsync();
    };

    const openSolution = () => {
        navigation.navigate('solution', {
            dictation,
        });
    };
    const traducirClave = (claveParamFunc) => {
        let claveTrans;
        switch (claveParamFunc) {
            case 'Fa':
                claveTrans = 'bass';
                break;
            case 'Sol':
                claveTrans = 'treble';
                break;
        }
        return claveTrans;
    };

    console.log(dictation)
    return (
        <View style={styles.container}>
            {/* <Text>
                Mostrar pentagrama con nota de referencia y opción para
                reproducirla
            </Text> */}
            <View style={styles.notaReferencia}>
                <Graphic
                    figurasConCompas={dictation.figuras}
                    figurasSinCompas={null}
                    dictadoGeneradoTraducidoParam={dictation.notas}
                    numeradorParam={dictation.numerador}
                    denominadorParam={dictation.denominador}
                    claveParam={traducirClave(dictation.clave)}
                    escalaDiatonica={dictation.escala_diatonica}                    
                    />
                <Text>nota de referencia</Text>
            </View>
            <Icon
                type="material-community"
                name="play-circle-outline"
                iconStyle={styles.iconPlay}
                onPress={playDictado}
            />
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openSolution}
                    >
                        <Text style={styles.textbutton}>Ver Solucion</Text>
                    </TouchableOpacity>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    iconPlay: {
        fontSize: 150,
        marginTop: 100,
    },
    container:{
        height:'100%', 
    },
    buttonContainer:{
        backgroundColor:ITEMSHOME,
        alignItems:'center',
        height:'7%'
    },
    button:{     
        height:'100%',
        width:'100%',
        alignItems:'center'
    },
    notaReferencia:{
        // height:'20%',
        // width:'90%',
        // alignSelf:'center',
        // borderRadius:10
        paddingTop: 30,
        paddingHorizontal: 5,
        height: '40%',
    },
    grafcio: {
        height: 200,
        width: 2000,
    },
    textbutton:{
        color:TEXTHOME,
        fontSize:25,
        fontWeight:'bold'
    },
});
