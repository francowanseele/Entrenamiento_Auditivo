import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Graphic from '../../components/Graphic';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';
import {LinearGradient} from 'expo-linear-gradient';


export default function Solution({ route }) {
    const { dictation } = route.params;
    const [visible, setVisible] = useState(false);
    const [dictado, setDictado] = useState(null);
    const [figurasDictado, setFigurasDictado] = useState(null);
    const [FigurasDictadoConCompas, setFigurasDictadoConCompas] =
        useState(null);
    const [dictadoGeneradoTraducido, setdictadoGeneradoTraducido] =
        useState(null);

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
        <LinearGradient 
        style={styles.lineargradient}
        // Background Linear Gradient
        colors={[BACKGROUNDHOME,BACKGROUNDHOME,ITEMSHOME,ITEMSHOME]}
         >
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <Graphic
                        style={styles.grafico}
                        figurasConCompas={dictation.figuras}
                        figurasSinCompas={null}
                        dictadoGeneradoTraducidoParam={dictation.notas}
                        numeradorParam={dictation.numerador}
                        denominadorParam={dictation.denominador}
                        claveParam={traducirClave(dictation.clave)}
                        escalaDiatonica={dictation.escala_diatonica}
                    />
                </ScrollView>
            </View>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    lineargradient:{
        height:'100%'
    },
    container: {
        backgroundColor: BACKGROUNDHOME,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
    graficoContainer: {
        paddingTop: 30,
        paddingHorizontal: 5,
        height: '40%',
    },
    scrollView: {
        height: 100,
    },

    grafcio: {
        height: 200,
        width: 2000,
    },

    popup: {
        width: '75%',
        height: '70%',
    },

    iconPlay: {
        fontSize: 150,
        marginTop: 100,
    },
});
