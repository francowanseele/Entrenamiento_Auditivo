import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TEXTHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import { ListItem, Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {getStorageItem,ID_USER} from '../../../utils/asyncStorageManagement';
import { Modal, Portal,Provider } from 'react-native-paper';

export default function Calification({route}) {
 
    const [loading, setLoading] = useState(true);
    const [modulos, setModulos] = useState([]);
    const [configuraciones , setConfiguraciones] = useState([])
    const { idCourse } = route.params;
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [ currentNotes, setCurrentNotes ] = useState([]);


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
  


    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView style={styles.container}>          
               
        {modulos.map((moduloCurrent, i) => (
            <ListItem.Accordion containerStyle={styles.calificacionesStyle}
                content={
                    <>  
                        <ListItem.Content style={styles.calificacionesLine}>                                
                            <ListItem.Title 
                            style={styles.title}
                            >{moduloCurrent.modulo.nombre_modulo}</ListItem.Title>
                            <ListItem.Title
                            style={{ color:TEXTHOME }}
                            > <Text>Promedio: 
                                <Text style={getStyleByState(moduloCurrent.modulo.promedio)}>
                                    {moduloCurrent.modulo.promedio.toFixed(1)}
                                </Text></Text>
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
                    Object.values(moduloCurrent.modulo.configuraciones).map((configs,j)=>(
                        <ListItem containerStyle={styles.subcontent}
                        key={j}
                        onPress={()=>{
                            showModal();
                            setCurrentNotes(configs.notas)
                            }
                        }
                        bottomDivider

                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>
                                <Text style={styles.subitems} >{configs.nombre_configuracion}</Text>
                               
                            </ListItem.Title>
                            <ListItem.Subtitle>
                            <Text style={styles.subitems} >Promedio: <Text style={getStyleByState(configs.promedio)}>
                                        {(configs.promedio).toFixed(1)}</Text>
                            </Text>
                            </ListItem.Subtitle>
                        </ListItem.Content> 
                        <ListItem.Chevron/>
                    </ListItem>
                    ))
                    : <Text>No tiene notas para mostrar</Text>}
            </ListItem.Accordion>
        ))}

        <Provider styles={{flex:1}}>
            <Portal styles={{flex:1}}>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
                        <ScrollView styles={{flex:1}}>
                        {currentNotes.map((e,index)=>( 
                            <View key={index} style={styles.modalListNotas}>
                                <Text style={styles.notasLines}>Nota:<Text style={getStyleByState(e.nota)}>{e.nota}</Text></Text>
                                <Text style={styles.notasLines}>Tipo de error: <Text style={{color:'black'}}>{e.tipoError}</Text></Text>
                                <Text style={styles.notasLines}>Fecha intento:<Text style={{color:'black'}}>{(new Date(e.fecha).toString())}</Text></Text>
                            </View> 
                         ) )}
                        </ScrollView>
                </Modal>
            </Portal>
        </Provider>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerModal:{
        flex:0.9,
        backgroundColor:'white',
        width:'90%',
        borderRadius:10,
        alignSelf:'center'
    },
    modalListNotas:{
        flex:1,
        margin:15,
        marginBottom:5,
        alignItems:'flex-start'
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
    notasLines:{
        flex:1,
        backgroundColor:TOPSCREENHOME,
        color:TEXTHOME,
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
