import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { TEXTHOME,TOPSCREENHOME, ITEMSHOME } from '../../styles/styleValues';
import {getClasificaciones} from '../../api/user';
import { ListItem, Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {getStorageItem,ID_USER} from '../../../utils/asyncStorageManagement';
import { useNavigation } from '@react-navigation/native';
import {getTeacherCourses,getStudentsByIdCourse} from '../../api/course';


export default function CalificationProf() {
        const [loading, setLoading] = useState(true);
        const [ userCalificaciones, setUserCalificaciones ] = useState([{}]);
        const navigation = useNavigation();

        const pushUpdateCalificaciones =  (newCalif)=>{
            let esNuevo = true;
            if (userCalificaciones.length>0){
                for (let current  in  userCalificaciones){
                    if (newCalif.idCurso == userCalificaciones[current].idCurso){
                        userCalificaciones[current].promedio = (userCalificaciones[current].promedio + newCalif.promedio);
                        userCalificaciones[current].cants = userCalificaciones[current].cants + 1;
                        esNuevo = false;
                    }
                }
            }
            if (esNuevo) { 
                userCalificaciones.push(newCalif) 
            }
        }
    
        useEffect( () => {
             getStorageItem(ID_USER).then((idUser) => { 
                if (idUser) {
                    getTeacherCourses(idUser).then((result1)=>{
                        let cursos = result1.cursos;
                        let newPromCurso;
                        for (let i in cursos){
                            getStudentsByIdCourse(cursos[i].curso).then((result2)=>{ // curso actual
                                let currentStudents = result2.estudiantes 
                                for (let j in currentStudents){
                                    getClasificaciones(currentStudents[j].id).then((result3)=>{
                                        for (let calif in result3.calificaciones ){
                                            if (calif == cursos[i].curso){
                                                newPromCurso = {
                                                    cants:1,
                                                    idCurso:cursos[i].curso,
                                                    nombre_curso:result3.calificaciones[calif].nombre_curso,
                                                    promedio:result3.calificaciones[calif].promedio,
                                                }
                                                pushUpdateCalificaciones(newPromCurso);
                                            }
                                        }
                                        setLoading(false)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }, [userCalificaciones]);

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
            {userCalificaciones != []? userCalificaciones.map((j,i) =>(
                     Object.keys(j).length>0 ? <ListItem key={i} 
                    bottomDivider 
                    style={{flex:1}}>
                                 <ListItem.Content key={i+"jj"} style={styles.container}>
                                        <Text key={i} style={styles.title}>{j.nombre_curso}</Text>
                                        <Text key={i+'asd'} style={getStyleByState(j.promedio/j.cants)} >{(j.promedio/j.cants).toFixed(2)}</Text>
                                 </ListItem.Content>
                     </ListItem>  
                     : <></>
                    
            ))
            :<Text>No tiene calificaciones para mostrar</Text>}
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