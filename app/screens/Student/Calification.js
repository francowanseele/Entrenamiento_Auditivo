import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BACKGROUNDHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import Loading from '../../components/Loading';
import { ID_USER } from '../../../utils/asyncStorageManagement';
import {getStorageItem} from '../../../utils/asyncStorageManagement';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

export default function Calification() {

    const [loading, setLoading] = useState(true);
    const [calificaciones, setCalificaciones] = useState([])

    useEffect(() => {
        getStorageItem(ID_USER).then((idUser) => { 
            if (idUser) {
                getClasificaciones(idUser).then((response)=>{
                    console.log(response.ok)
                    if (response.ok){
                        // console.log(response.calificaciones)
                        setCalificaciones(response.calificaciones)
                        console.log(calificaciones)
                        setLoading(false);
                    }else { 
                        setCalificaciones([])
                    }
                }) 
            }
        });
    }, []);
    const open_closeModulePress = () =>{

    }


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
                            >{califCurrent.nombreCurso}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                key={i}
                isExpanded={true}
                onPress={ () => {
                    open_closeModulePress();
                }}
            >
                {califCurrent.notas.map((notaActual, j) => (
                    <ListItem containerStyle={styles.subcontent}
                        key={j}
                        // onPress={() => {
                        //     configDictationIn(config, module.module);
                        // }}
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
        marginTop:'15%',
        marginLeft:'4%'
    },
    calificacionesLine:{
        flex:1,
        backgroundColor:TOPSCREENHOME,
    },
    title:{
        color: TEXTHOME,
        fontWeight:'bold',
        fontSize:20
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
