import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Graphic from '../../components/Graphic';

export default function Solution({ route }) {
    const {denominador , numerador, clave,escalaDiatonica , figurasConCompas, notasTraducidas, figurasDictado } = route.params;

    const traducirClave = (claveParamFunc) =>{

        let claveTrans;
        switch (claveParamFunc) {
            case 'Fa':
                claveTrans = 'bass';
                break;
            case 'Sol':
                claveTrans = 'treble';
                break;
        }        
        return claveTrans
    }

    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <Graphic
                        style={styles.grafico}
                        figurasConCompas={figurasConCompas}
                        figurasSinCompas={figurasDictado}
                        dictadoGeneradoTraducidoParam={notasTraducidas}
                        numeradorParam={numerador}
                        denominadorParam={denominador}
                        claveParam={traducirClave(clave)}
                        escalaDiatonica={escalaDiatonica}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 100,
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
