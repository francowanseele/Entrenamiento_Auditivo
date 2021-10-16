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
        const [ userCalificaciones, setUserCalificaciones ] = useState([]);
        const navigation = useNavigation();
    
        useEffect( () => {
             getStorageItem(ID_USER).then((idUser) => { 
                if (idUser) {
                    getTeacherCourses(idUser).then((result1)=>{
                        let cursos = result1.cursos;
                        let newPromCurso;
                        for (let i in cursos){
                            let sumaPromedios = 0;
                            let cantPromedios = 0;
                            getStudentsByIdCourse(cursos[i].curso).then((result2)=>{ // curso actual
                                let currentStudents = result2.estudiantes 
                                let nombreCurso;
                                let finish = false;
                                for (let j in currentStudents){
                                    getClasificaciones(currentStudents[j].id).then((result3)=>{
                                        // console.log(result3.calificaciones)
                                        for (let calif in result3.calificaciones ){
                                            // me quedo con los promedios solo del curso actual iterado
                                            if (calif == cursos[i].curso){
                                                // console.log(result3.calificaciones[calif].nombre_curso)
                                                // console.log(result3.calificaciones[calif].promedio)
                                                console.log('entro')
                                                nombreCurso = result3.calificaciones[calif].nombre_curso;
                                                cantPromedios = cantPromedios + 1;
                                                sumaPromedios = sumaPromedios + result3.calificaciones[calif].promedio;
                                                console.log(sumaPromedios)

                                                newPromCurso = {
                                                    nombre_curso:nombreCurso,
                                                    promedio:(sumaPromedios/cantPromedios)
                                                }
                                                userCalificaciones.push(newPromCurso);
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }, []);
    
        // const calificationIn = (idCourse) => {
        //     navigation.navigate('Calification', {
        //         idCourse: idCourse
        //     });
        // }
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
                {/* {console.log(userCalificaciones)} */}
            {userCalificaciones != []? userCalificaciones.map((j,i) =>(
                    <ListItem key={i} 
                    bottomDivider 
                    style={{flex:1}}>
                                 {/* <ListItem.Content style={styles.container}>
                                  
                                    {(Object.keys(j.calificaciones)).forEach((e)=>{
                                          {console.log('entro')}
                                        {console.log(j.calificaciones[e].promedio)}
                                    })}
                                 </ListItem.Content> */}
                     </ListItem>
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