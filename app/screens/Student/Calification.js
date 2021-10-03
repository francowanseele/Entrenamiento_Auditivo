import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TEXTHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import { ListItem, Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {getStorageItem,ID_USER} from '../../../utils/asyncStorageManagement';

export default function Calification({route}) {
 
    const [loading, setLoading] = useState(true);
    const [modulos, setModulos] = useState([]);
    const [configuraciones , setConfiguraciones] = useState([])
    const { idCourse } = route.params;


    useEffect(() => {
        getStorageItem(ID_USER).then((idUser) => { 
            if (idUser) {
                let modRes = [];
                getClasificaciones(idUser).then((response)=>{
                    if (response.ok){
                        for (let calif in  response.calificaciones){
                            if ( calif == idCourse ){ 
                                for (let modulo in  response.calificaciones[calif].modulos ){
                                modRes.push({
                                    modulo:response.calificaciones[calif].modulos[modulo],
                                    openItem:false
                                })
                                }
                            }
                        }
                        setModulos(modRes)
                        setLoading(false);
                    }else { 
                        setCalificaciones([])
                    }
                }) 
            }
        });
    }, []);
    const open_closeConfiguracionesPress = (modulo) => {
        var modRes = [];
        modulos.forEach(mod => {
            if(mod == modulo){
                modRes.push({
                    modulo:mod.modulo,
                    openItem:!mod.openItem 
                    })
            } else {
                modRes.push({
                    modulo:mod.modulo,
                    openItem:mod.openItem 
                })
            }
        });
        setModulos(modRes);
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
    // const getItemsModule=(configs)=>{
            
    //         for ( let config in  configs){
    //             <ListItem containerStyle={styles.subcontent}
    //             key={config}
    //             onPress={() => {
    //             }}
    //             bottomDivider
    //         >
    //             <ListItem.Content  style={styles.subitems}>
    //                 <ListItem.Title  style={styles.title}>{'nombre configuracion: '}
    //                     <Text style={styles.subitems} >{configs[config].nombre_configuracion}</Text>
    //                 </ListItem.Title>
                    
    //             </ListItem.Content>
    //             <ListItem.Chevron/>
    //         </ListItem>
    //             )
    //         } 
    // }


    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView style={styles.container}>          
               
        {modulos.map((moduloCurrent, i) => (
            <ListItem.Accordion containerStyle={styles.calificacionesStyle}
                content={
                    <>  
                        {/* {console.log(JSON.stringify(moduloCurrent))}
                        {console.log(JSON.stringify(moduloCurrent.modulo.nombre_modulo))} */}
                        <ListItem.Content style={styles.calificacionesLine}>                                
                            <ListItem.Title 
                            style={styles.title}
                            >{moduloCurrent.modulo.nombre_modulo}</ListItem.Title>
                            <ListItem.Title
                            style={{ color:TEXTHOME }}
                            > <Text>Promedio: </Text>
                            {/* <Text style={getStyleByState(califCurrent.calificaciones.promedio)}>{(califCurrent.calificaciones.promedio).toFixed(1)}</Text> */}
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                key={i}
                isExpanded={moduloCurrent.openItem}
                onPress={ () => {
                    open_closeConfiguracionesPress(moduloCurrent)
                }}
            >   
                {moduloCurrent.modulo.configuraciones? 
                    Object.values(moduloCurrent.modulo.configuraciones).map((configs)=>(
                        <ListItem containerStyle={styles.subcontent}
                        key={configs}
                        onPress={() => {
                        }}
                        bottomDivider
                    >
                        <ListItem.Content  style={styles.subitems}>
                            <ListItem.Title  style={styles.title}>{'nombre configuracion: '}
                                <Text style={styles.subitems} >{configs.nombre_configuracion}</Text>
                            </ListItem.Title>
                            
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>
                    ))
                    : <Text>No tiene notas para mostrar</Text>}
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
