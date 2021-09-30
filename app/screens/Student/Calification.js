import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TEXTHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import { ListItem, Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {getStorageItem,ID_USER} from '../../../utils/asyncStorageManagement';

export default function Calification() {
 
    const [loading, setLoading] = useState(true);
    const [calificaciones, setCalificaciones] = useState([]);

    useEffect(() => {
        getStorageItem(ID_USER).then((idUser) => { 
            if (idUser) {
                getClasificaciones(idUser).then((response)=>{
                    if (response.ok){
                        response.calificaciones.forEach(calif =>{
                            calificaciones.push({
                                calificaciones:calif,
                                openItem:false
                            })
                        })
                        setLoading(false);
                    }else { 
                        setCalificaciones([])
                    }
                }) 
            }
        });
    }, []);
    const open_closeCalificacionesPress = (calificationCurrent) => {
        var califRes = [];
        calificaciones.forEach(calif => {
            if(calif.calificaciones.idDictado == calificationCurrent.idDictado){
                califRes.push({
                    calificaciones:calif.calificaciones,
                    openItem:!calif.openItem 
                    })
            } else {
                califRes.push({
                    calificaciones:calif.calificaciones,
                    openItem:calif.openItem 
                    })
            }
        });
        setCalificaciones(califRes);
    };
    const getStyleByState = (nota) => {
        if (nota) {
            if (nota == 0 || nota <= 2) {
                return styles.notaRed;
            } else if (nota >= 3 && nota <= 8) {
                return styles.notaOrange;
            } else {
                return styles.notaGreen;
            }
        } else return styles.notaRed;
    };


    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView style={styles.container}>          
               
        {calificaciones.map((califCurrent, i) => (
            <ListItem.Accordion containerStyle={styles.calificacionesStyle}
                content={
                    <>
                        <ListItem.Content style={styles.calificacionesLine}>                                
                            <ListItem.Title 
                            style={styles.title}
                            >{califCurrent.calificaciones.nombreCurso}</ListItem.Title>
                            <ListItem.Title
                            style={{ color:TEXTHOME }}
                            > <Text>Promedio: </Text>
                            <Text style={getStyleByState(califCurrent.calificaciones.promedio)}>{(califCurrent.calificaciones.promedio).toFixed(1)}</Text>
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                key={i}
                isExpanded={califCurrent.openItem}
                onPress={ () => {
                    open_closeCalificacionesPress(califCurrent.calificaciones)
                }}
            >
                {califCurrent.calificaciones.notas ? califCurrent.calificaciones.notas.map((notaActual, j) => (
                    <ListItem containerStyle={styles.subcontent}
                        key={j}
                        onPress={() => {
                        }}
                        bottomDivider
                    >
                        <ListItem.Content  style={styles.subitems}>
                            <ListItem.Title  style={styles.title}>{'nota  '}
                                <Text style={getStyleByState(notaActual.nota)} >{ notaActual.nota}</Text>
                            </ListItem.Title>
                            <ListItem.Subtitle  style={{color:'black'}}>
                                {'Fecha realizado:  ' + notaActual.fecha}
                            </ListItem.Subtitle>
                            {notaActual.tipoError? 
                            <ListItem.Subtitle  style={{color:'black'}}>
                            {'Tipo de error:  ' + notaActual.tipoError}
                        </ListItem.Subtitle>: <></>}
                        </ListItem.Content>
                        <ListItem.Chevron  />
                    </ListItem>
                )) : <Text>No tiene notas para mostrar</Text>}
            </ListItem.Accordion>
        ))}
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    calificacionesStyle:{
        flex:1,
        backgroundColor:TOPSCREENHOME,
        flexDirection:'row',
        height:'60%',
        marginTop:'5%',
        borderRadius:10,
        shadowColor: '#470000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
    },
    calificacionesLine:{
        flex:1,
        backgroundColor:TOPSCREENHOME,
        flexDirection:'row',
        alignContent:'space-between',
        alignItems:'center'
    },
    title:{
        flex:1,
        color: TEXTHOME,
        fontWeight:'bold',
        fontSize:20,
    },
    subcontent:{
        borderWidth:1,
        backgroundColor:ITEMSHOME,
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
    },
    subitems:{
        width:'90%',
        alignSelf:'center'
    },
    notaOrange: {
        color: '#f99856',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    notaGreen: {
        color: '#008000',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    notaRed: {
        color: '#f1503f',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },

});
