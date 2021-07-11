import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';
import { tramsitDictationApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';
import {LinearGradient} from 'expo-linear-gradient';

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

    return (
        <LinearGradient 
        style={styles.lineargradient}
        // Background Linear Gradient
        colors={[BACKGROUNDHOME,BACKGROUNDHOME,BACKGROUNDHOME,BACKGROUNDHOME,ITEMSHOME,ITEMSHOME,ITEMSHOME]}
         >
        <View style={styles.container}>
            <Text>
                Mostrar pentagrama con nota de referencia y opción para
                reproducirla
            </Text>
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
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    lineargradient:{
        height:'100%'
    },
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
    textbutton:{
        fontSize:25,
        fontWeight:'bold'
    },
});
