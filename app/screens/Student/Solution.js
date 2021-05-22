import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Graphic from '../../components/Graphic';

export default function Solution({ route }) {
    console.log(route);
    const { figurasConCompas, notasTraducidas } = route.params;
    const [visible, setVisible] = useState(false);
    const [dictado, setDictado] = useState(null);
    const [figurasDictado, setFigurasDictado] = useState(null);
    const [FigurasDictadoConCompas, setFigurasDictadoConCompas] =
        useState(null);
    const [dictadoGeneradoTraducido, setdictadoGeneradoTraducido] =
        useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <Graphic
                        style={styles.grafico}
                        figurasParam={figurasConCompas}
                        dictadoGeneradoTraducidoParam={notasTraducidas}
                        numeradorParam={4}
                        denominadorParam={4}
                        claveParam={'treble'}
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