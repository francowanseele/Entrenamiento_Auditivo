import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,ScrollView, Text, View, Button } from 'react-native';
import { playSoundApi } from './app/api/sound';
import Soundfont from 'soundfont-player';
import { Graficar } from './componentes';

export default function App() { 
  
    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <Graficar style={styles.grafico}  notasParam={'C#6/q, B5, B4, C4'} numeradorParam={4} denominadorParam={4} />
                </ScrollView>
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    graficoContainer:{
        height:'40%',
    },
    scrollView:{
        height:100
    },

    grafcio:{
        height:100,
        width:2000,
    }
});
