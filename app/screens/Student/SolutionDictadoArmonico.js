import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getParams } from '../../../utils/asyncStorageManagement';
import CalificationOptions from '../../components/Calification/CalificationOptions';
import { addCalification } from '../../api/calification';
import { tipoConfiguracion } from '../../../enums/tipoConfiguracion';
import { getMusicSheetSolutionFileApi } from '../../api/musicSheet';
import { ScrollView } from 'react-native-gesture-handler';

export default function SolutionDictadoArmonico({ route }) {
    const { dictado, acordes } = route.params;

    const [urlMusicSheetReference, setUrlMusicSheetReference] = useState('')
    const [lengthImage, setLengthImage] = useState(0)

    const navigation = useNavigation();

    useEffect(() => {
        getParams().then((params) => {
            getMusicSheetSolutionFileApi(params.id).then((url) => {
                if (url) {
                    setUrlMusicSheetReference(url)
                }
            })

        })
    }, [])

    useEffect(() => {
        if (acordes) {
            setLengthImage((acordes.length * 200) + 40) 
        } 
    }, [acordes])

    const confirmFunction = async (option) => {
        // Save calification
        const data = {
            note: option.note,
            correct: null,
            typeConfig: tipoConfiguracion.ConfiguracionDictadoArmonico,
        };
        const result = await addCalification(data, dictado.id);

        if (result.ok) {
            navigation.goBack();
        } else {
            Alert.alert('No se ha podido guardar la calificación.');
        }
    }
    
    return (
        <View style={styles.container}>
            <ScrollView horizontal style={{backgroundColor: 'white'}}>
                {urlMusicSheetReference != '' && (
                    <Image
                        style={{height: 200, width: lengthImage}}
                        source={{
                            uri: urlMusicSheetReference,
                        }}
                    />
                )}
            </ScrollView>

            <CalificationOptions
                confirmFunction={confirmFunction}
                optionsCalification={[
                    {
                        label: "Todo bien",
                        note: 12,
                    },
                    {
                        label: "Más de la mitdad de aciertos",
                        note: 9,
                    },
                    {
                        label: "La mitad del ejercicio bien",
                        note: 6,
                    },
                    {
                        label: "Menos de la mitdad de aciertos",
                        note: 3,
                    },
                    {
                        label: "Sin aciertos",
                        note: 1,
                    }
                ]}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        
    },
    textoDatos:{
        width:'90%',
        alignSelf:"center",
        marginTop:10
    },
    modalView: {
        flexDirection: 'column',
        // marginTop:'95%',
        margin: 20,
        // backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        padding: '5%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        margin: 3,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    buttonModal: {
        margin: 3,
        width: '35%',
        alignSelf: 'center',
    },
    graficoContainer: {
        paddingHorizontal: 5,
        height: '30%',
        marginBottom: 20,
    },
    checkboxContainer: {
        paddingTop: 70,
        width: '100%',
        //height: '40%',
    },
    checkbox: {
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        width: '70%',
    },
    popup: {
        width: '75%',
        height: '70%',
    },

    iconPlay: {
        fontSize: 150,
        marginTop: 100,
    },
    // musicSheetImage: { 
    //     width: (acordes.length * 200) + 20, 
    //     height: 200 ,

    // },
});
