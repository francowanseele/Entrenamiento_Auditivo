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
                    <Graficar 
                        style={styles.grafico}  
                        figurasParam={ 
                            [                             
                            ["a/4","1"], 
                            ["b/4","4"],
                            ["c/4","4"],
                            ["b/4","1"],
                            ["b/4","1"],
                            ["NuevoCompas"],
                            ["a/4","2"], 
                            ["b/4","2"],
                            ["c/4","2"],
                            ["b/4","2"],
                            ["b/4","2"],
                            ["NuevoCompas"],
                            ["a/4","2"], 
                            ["b/4","2"],
                            ["c/4","2"],
                            ["b/4","2"],
                            ["NuevoCompas"],
                            ["b/4","2"],
                            ["a/4","1"], 
                            ["b/4","4"],
                            ["c/4","4"],
                                                 
                            ]
                        }
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
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    graficoContainer:{
        paddingTop:30,
        paddingHorizontal:5,
        height:'40%',
    },
    scrollView:{
        height:100,
    },

    grafcio:{
        height:100,
        width:2000,
    }
});
