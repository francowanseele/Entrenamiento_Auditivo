import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Graphic from '../../components/Graphic';
import { setAutoevaluacion } from '../../api/user';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import CheckBox from 'react-native-check-box';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from '../../../utils/asyncStorageManagement';
import { registerCustomIconType } from 'react-native-elements';


export default function Solution({ route }) {
    const { dictation } = route.params;
    const [cantNotas, setCantNotas ] = useState(dictation.notas.length);
    const [ checkedTrue, setCheckedTrue] = useState(-1);
    const [ isChecked0, setIsChecked0 ] = useState(false);
    const [ isChecked1, setIsChecked1 ] = useState(false);
    const [ isChecked2, setIsChecked2 ] = useState(false);
    const [ isChecked3, setIsChecked3 ] = useState(false);
    const [ isChecked4, setIsChecked4 ] = useState(false);
    const [ isChecked5, setIsChecked5 ] = useState(false);
    const [ isChecked6, setIsChecked6 ] = useState(false);
    const [ currentUserMail, setCurrentUserEmail] = useState();

    const navigation = useNavigation();

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
            if (checkedTrue == 0){
                setIsChecked1(false)
                setIsChecked2(false)
                setIsChecked3(false)
                setIsChecked4(false)
                setIsChecked5(false)
                setIsChecked6(false)     
            }else if (checkedTrue == 1){
               setIsChecked0(false)
               setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 2) {
                setIsChecked0(false)
                setIsChecked1(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 3) {
                setIsChecked0(false)
                setIsChecked2(false)
               setIsChecked1(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 4) {
                setIsChecked0(false)
                setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked1(false)
               setIsChecked5(false)
               setIsChecked6(false)
            }else if (checkedTrue == 5) {
                setIsChecked0(false)
               setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked1(false)
               setIsChecked6(false)
            }else if (checkedTrue == 6) {
                setIsChecked0(false)
                setIsChecked2(false)
               setIsChecked3(false)
               setIsChecked4(false)
               setIsChecked5(false)
               setIsChecked1(false)
            }
        }

        useEffect(()=>{
            getStorageItem('email').then((email)=>{
                setCurrentUserEmail(email);
            });            
            checkeAll()
        },[checkedTrue])

        const calcularPorcentaje= (porcentaje) =>{
            return Math.trunc ( (cantNotas*porcentaje)/100 )
        }
        const calcularResultado = () =>{            
            if ( checkedTrue == 0 ){
                setAutoevaluacion(currentUserMail,dictation._id,12)
            }
            else if (checkedTrue == 1){
                setAutoevaluacion(currentUserMail,dictation._id,10)                
            }else if (checkedTrue == 2){
                setAutoevaluacion(currentUserMail,dictation._id,8)
            }else if (checkedTrue == 2){
                setAutoevaluacion(currentUserMail,dictation._id,6)
            }else if (checkedTrue == 3){
                setAutoevaluacion(currentUserMail,dictation._id,2)
            }else if (checkedTrue == 4){
                setAutoevaluacion(currentUserMail,dictation._id,1)
            }else if (checkedTrue == 5){
                setAutoevaluacion(currentUserMail,dictation._id,0)
            }
        }
          
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
                                setIsChecked0(!isChecked0)
                                if ((!isChecked0) == true) { setCheckedTrue(0) }
                                else { setCheckedTrue(-1) }  
                            }}
                        isChecked={isChecked0}
                        leftText={"No tuviste errores"}
                        checkedCheckBoxColor={TEXTHOME}
                        checkBoxColor={"black"}
                    />              
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{
                            setIsChecked1(!isChecked1)
                            if ((!isChecked1) == true) { setCheckedTrue(1) }
                            else { setCheckedTrue(-1) }  
                        }}
                    isChecked={isChecked1}
                    leftText={"De 1 a "+calcularPorcentaje(10).toString()+" de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked2(!isChecked2)
                        if ((!isChecked2) == true) { setCheckedTrue(2) }
                        else { setCheckedTrue(-1) }  
                    }}
                    isChecked={isChecked2}
                    leftText={"De "+(calcularPorcentaje(10)+1).toString()+" a "+(calcularPorcentaje(20)).toString()+" de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked3(!isChecked3)
                        if ((!isChecked3) == true) { setCheckedTrue(3) }
                        else { setCheckedTrue(-1) }  
                    }}
                    isChecked={isChecked3}
                    leftText={"De "+(calcularPorcentaje(20)+1).toString()+" a "+(calcularPorcentaje(40)).toString()+" de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked4(!isChecked4)
                        if ((!isChecked4) == true) { setCheckedTrue(4) }
                        else { setCheckedTrue(-1) }  
                    }}
                    isChecked={isChecked4}
                    leftText={"De "+(calcularPorcentaje(40)+1).toString()+" a "+(calcularPorcentaje(65)).toString()+" de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                 <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked5(!isChecked5)
                        if ((!isChecked5) == true) { setCheckedTrue(5) }
                        else { setCheckedTrue(-1) }  
                    }}
                    isChecked={isChecked5}
                    leftText={"Más de "+(calcularPorcentaje(65)+1).toString()+" de errores"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={()=>{setIsChecked6(!isChecked6)
                        if ((!isChecked6) == true) { setCheckedTrue(6) }
                        else { setCheckedTrue(-1) }  
                    }}
                    isChecked={isChecked6}
                    leftText={"Todas Incorrectas"}
                    checkedCheckBoxColor={TEXTHOME}
                    checkBoxColor={"black"}
                />
                <Button 
                    // icon="camera" 
                    disabled={(checkedTrue == -1)}
                    contentStyle={styles.button}
                    mode="contained" 
                    onPress={() =>{
                       calcularResultado()
                       navigation.goBack()
                    } 
                }>
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
        backgroundColor:TEXTHOME
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
        alignSelf:'center',
        marginVertical:10,
        marginHorizontal:10,
        width:'70%'
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
