import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Graphic from '../../components/Graphic';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import CheckBox from 'react-native-check-box';
import { Button } from 'react-native-paper';

export default function Solution({ route }) {
    const { dictation } = route.params;
    const [ checkedTrue, setCheckedTrue] = useState(-1);
    const [ isChecked1, setIsChecked1 ] = useState(false);
    const [ isChecked2, setIsChecked2 ] = useState(false);
    const [ isChecked3, setIsChecked3 ] = useState(false);
    const [ isChecked4, setIsChecked4 ] = useState(false);
    const [ isChecked5, setIsChecked5 ] = useState(false);
    const [ isChecked6, setIsChecked6 ] = useState(false);
    
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
        
        const checkeAll = () => {     
            if (checkedTrue == 1){
               setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 2) {
                setIsChecked1(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 3) {
                setIsChecked2(false)
               setIsChecked1(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 4) {
                setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked1(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 5) {
                setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked1(false)
               setIsChecked6(false)
            }else if (checkedTrue == 6) {
                setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked1(false)
            }
        }
        useEffect(()=>{checkeAll()},[checkedTrue])
          
    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                    <Graphic
                       figurasConCompas={dictation.figuras}
                       figurasSinCompas={null}
                       dictadoGeneradoTraducidoParam={dictation.notas}
                       numeradorParam={dictation.numerador}
                       denominadorParam={dictation.denominador}
                       claveParam={traducirClave(dictation.clave)}
                       escalaDiatonica={dictation.escala_diatonica}
                       isNotaReferencia={false}
                    />
            </View>
            <View style={styles.checkboxContainer}>              
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{
                            setIsChecked1(!isChecked1)
                            if ((!isChecked1) == true) { setCheckedTrue(1) }  
                        }}
                    isChecked={isChecked1}
                    leftText={"De 1 a (10% de la cantidad de notas totales) de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked2(!isChecked2)
                        if ((!isChecked2) == true) { setCheckedTrue(2) }
                    }}
                    isChecked={isChecked2}
                    leftText={"De (10% de la cantidad de notas totales + 1) a (20% de la cantidad de notas totales) de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked3(!isChecked3)
                        if ((!isChecked3) == true) { setCheckedTrue(3) }
                    }}
                    isChecked={isChecked3}
                    leftText={"De (20% de la cantidad de notas totales + 1) a (40% de la cantidad de notas totales) de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked4(!isChecked4)
                        if ((!isChecked4) == true) { setCheckedTrue(4) }
                    }}
                    isChecked={isChecked4}
                    leftText={"De (40% de la cantidad de notas totales + 1) a (65% de la cantidad de notas totales) de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked5(!isChecked5)
                        if ((!isChecked5) == true) { setCheckedTrue(5) }
                    }}
                    isChecked={isChecked5}
                    leftText={"Más de (65% de la cantidad de notas totales + 1) de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked6(!isChecked6)
                        if ((!isChecked6) == true) { setCheckedTrue(6) }
                    }}
                    isChecked={isChecked6}
                    leftText={"Todas Incorrectas"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                <Button 
                    // icon="camera" 
                    mode="contained" 
                    onPress={() =>{} }> // https://callstack.github.io/react-native-paper/button.html#mode
                        Terminar
                </Button>
            </View>       
        </View>
    );
}

const styles = StyleSheet.create({
 
    container: {
        backgroundColor: BACKGROUNDHOME,
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
    button:{
        backgroundColor:'red'
    },
    graficoContainer: {
        // paddingTop: 30,
        paddingHorizontal: 5,
        height: '30%',
    },
    checkboxContainer:{
        width:'100%',
        height:'40%'
    },
    checkbox:{
        marginVertical:10,
        marginHorizontal:10,
        width:'90%'
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
