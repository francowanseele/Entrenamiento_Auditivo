import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TEXTHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import { ListItem, Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {getStorageItem,ID_USER} from '../../../utils/asyncStorageManagement';
import { useNavigation } from '@react-navigation/native';


export default function CalificationCourses() {
 
    const [loading, setLoading] = useState(true);
    const [calificaciones, setCalificaciones] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getStorageItem(ID_USER).then((idUser) => { 
            if (idUser) {
                getClasificaciones(idUser).then((response)=>{
                    if (response.ok){
                        let newArray = []
                        for (let current in response.calificaciones){
                            newArray.push({
                                id:current,
                                calificaciones:response.calificaciones[current]
                            })
                        }
                        setCalificaciones(newArray)
                        setLoading(false)
                    }else { 
                        setCalificaciones([])
                        console.log('calif vacio ')
                        // setLoading(false)
                    }
                }) 
            }
        }).then(()=>{ setLoading(true) });
    }, []);

    const calificationIn = (idCourse) => {
        navigation.navigate('Calification', {
            idCourse: idCourse
        });
    }
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
        {calificaciones.map((j,i) =>(
                <ListItem key={i} 
                onPress={() => {
                    calificationIn(j.id);
                }}
                bottomDivider 
                style={{flex:1}}>
                             <ListItem.Content style={styles.container}>
                               <ListItem.Title style={styles.title} >{j.calificaciones.nombre_curso}</ListItem.Title>
                               <ListItem.Subtitle style={styles.calificacionesLine} >Promedio :
                               <Text style={getStyleByState(j.calificaciones.promedio)}> {j.calificaciones.promedio.toFixed(1)}
                               </Text></ListItem.Subtitle>
                             </ListItem.Content>
                 </ListItem>
            ) 
        )}
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
