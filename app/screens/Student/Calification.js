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
    const [isPressExpand, setIsPressExpand] = useState([]);

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
        calificaciones.calificaciones.forEach(c => {
            if(c.calificaciones._id == calificationCurrent._id){
                califRes.push({
                    calificaciones:c.calificaciones,
                    calificaciones:!c.openItem 
                    })
            } else {
                califRes.push({
                    calificaciones:c.calificaciones,
                    calificaciones:c.openItem 
                    })
            }
        });

        setCalificaciones(califRes);
    };


    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView style={styles.container}>          
               
        {calificaciones.map((califCurrent, i) => (
            <ListItem.Accordion containerStyle={styles.calificacionesStyle}
            // onEndReached={}
                content={
                    <>
                        <ListItem.Content style={styles.calificacionesLine}>                                
                            <ListItem.Title 
                            style={styles.title}
                            >{califCurrent.calificaciones.nombreCurso}</ListItem.Title>
                            <ListItem.Title
                            style={styles.title}
                            > <Text>Promedio: </Text>{califCurrent.calificaciones.promedio}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                key={i}
                isExpanded={califCurrent.calificaciones.openItem}
                onPress={ () => {
                    open_closeCalificacionesPress(califCurrent)
                }}
            >
                {califCurrent.calificaciones.notas.map((notaActual, j) => (
                    <ListItem containerStyle={styles.subcontent}
                        key={j}
                        onPress={() => {
                        }}
                        bottomDivider
                    >
                        <ListItem.Content  style={styles.subitems}>
                            <ListItem.Title  style={styles.title}>{'      ' + notaActual.nota}</ListItem.Title>
                            <ListItem.Subtitle  style={{color:'black'}}>
                                {'    ' + notaActual.fecha}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron  />
                    </ListItem>
                ))}
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
    }

});
