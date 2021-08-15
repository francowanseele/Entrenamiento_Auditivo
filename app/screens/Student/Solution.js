import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import Graphic from '../../components/Graphic';
import { setAutoevaluacion } from '../../api/user';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import CheckBox from 'react-native-check-box';
// import { Button } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from '../../../utils/asyncStorageManagement';


export default function Solution({ route }) {
    const { dictation } = route.params;
    const [cantNotas, setCantNotas ] = useState(dictation.notas.length);
    const [ evaluacionNota, setevaluacionNota] = useState(-1);
    const [ currentUserMail, setCurrentUserEmail] = useState();
    const [modalVisible, setModalVisible ] = useState(false);

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

        useEffect(()=>{
            getStorageItem('email').then((email)=>{
                setCurrentUserEmail(email);
            });            
        },[])

        const calcularPorcentaje= (porcentaje) =>{
            return Math.trunc ( (cantNotas*porcentaje)/100 )
        }
        const calcularResultado = (tipoError) =>{            
            setAutoevaluacion(currentUserMail,dictation._id,evaluacionNota,tipoError).then(()=>{
                navigation.goBack();
            })
            
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
                <Button
                    title={"No tuviste errores"}
                    type="outline"
                    titleStyle={{color:TEXTHOME}}
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(12)
                        setModalVisible(true)                       
                    }}
                />  
                <Button
                    title={"De 1 a "+calcularPorcentaje(10).toString()+" de errores"}
                    type="outline"
                    titleStyle={{color:TEXTHOME}}
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(10)
                        setModalVisible(true)
                    }}
                />  
                <Button
                    title={"De "+(calcularPorcentaje(10)+1).toString()+" a "+(calcularPorcentaje(20)).toString()+" de errores"}
                    type="outline"
                    titleStyle={{color:TEXTHOME}}
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(8)
                        setModalVisible(true)
                    }}
                />  
                <Button
                    title={"De "+(calcularPorcentaje(20)+1).toString()+" a "+(calcularPorcentaje(40)).toString()+" de errores"}
                    type="outline"
                    titleStyle={{color:TEXTHOME}}
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(6)
                        setModalVisible(true)
                    }}
                />  
                <Button
                    title={"De "+(calcularPorcentaje(40)+1).toString()+" a "+(calcularPorcentaje(65)).toString()+" de errores"}
                    type="outline"
                    titleStyle={{color:TEXTHOME}}
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(2)
                        setModalVisible(true)
                    }}
                />  
                <Button
                    title={"Más de "+(calcularPorcentaje(65)+1).toString()+" de errores"}
                    titleStyle={{color:TEXTHOME}}
                    type="outline"
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(1)
                        setModalVisible(true)
                    }               
                    }
                />  
                <Button
                    title={"Todas incorrectas"}
                    titleStyle={{color:TEXTHOME}}
                    type="outline"
                    containerStyle={styles.button}
                    onPress={()=>{
                        setevaluacionNota(0)
                        setModalVisible(true)
                    }} 
                 />             
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}> 
                        <Text style={{marginBottom:10}}>Qué tipos de errores tuviste?</Text>
                        <View style={{flexDirection:'row'}}>                        
                            <Button
                                title={"Ritmicos"}
                                titleStyle={{color:TEXTHOME}}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={()=>{
                                    calcularResultado('ritmico')
                                }} 
                                />
                            <Button
                                title={"Melodicos"}
                                titleStyle={{color:TEXTHOME}}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={()=>{
                                    calcularResultado('melodico')
                                }} 
                            />
                            <Button
                                title={"Ambos"}
                                titleStyle={{color:TEXTHOME}}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={()=>{
                                    calcularResultado('ambos')
                            }} 
                            />    
                        </View>
                    </View>
                </Modal>
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
    modalView: {
        flexDirection:'column',
        marginTop:'95%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    button:{
        margin:3,
        width:'90%',
        alignSelf:'center',
    },
    buttonModal:{
        margin:3,
        width:'35%',
        alignSelf:'center',
    },
    graficoContainer: {
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
