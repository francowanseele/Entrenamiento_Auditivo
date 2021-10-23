import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, Image, ScrollView, StyleSheet,Text, Alert,TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {BACKGROUNDHOME,TEXTHOME,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';
import { getModulesApi, getAllCourse,getCursaCoursesStudent,addStudentCourse } from '../../api/course';
import { Modal, Portal,Provider } from 'react-native-paper';
import {
    getStorageItem,
    ID_CURRENT_CURSE,
    ID_USER,
    setStorageCurrentCourse
} from '../../../utils/asyncStorageManagement';
import Loading from '../../components/Loading';

export default function Home() {
    const navigation = useNavigation();
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const [updateCoursesStudent, setUpdateCoursesStudent ] = useState(false)

    useEffect(() => {
        getStorageItem(ID_CURRENT_CURSE).then((idCourse) => {
            if (idCourse) {
                getModulesApi(idCourse).then((dataModules) => {
                    if (dataModules.ok) {
                        var modulesRes = [];
                        dataModules.modules.forEach(m => {
                            modulesRes.push({module: m, open: false});
                        });
                        setModules(modulesRes);
                        setLoading(false)
                    } else {
                        setModules([]);
                    }
                });
            }
        });
    }, [currentCourse]);

    useEffect(() => {
        getAllCourse().then((result)=>{
            if (result.ok) setAllCourses(result.cursos)
        })
       
    },[])
    
    useEffect(()=>{
        getStorageItem(ID_USER).then((idUser) => {
            if (idUser) {
                getCursaCoursesStudent(idUser).then((result)=>{
                    if (result.ok){ 
                        setCourses(result.cursos)
                        setCurrentCourse(result.cursos[0].curso_cursado)
                        setStorageCurrentCourse(result.cursos[0].curso_cursado)
                    }
                })
            }
        })
        
    },[updateCoursesStudent]);

    const open_closeModulePress = (module) => {
        var modRes = [];
        modules.forEach(m => {
            if(m.module._id == module.module._id){
                modRes.push({module: m.module, open: !m.open})
            } else {
                modRes.push({module: m.module, open: m.open})
            }
        });

        setModules(modRes);
    };

    const configDictationIn = (config, module) => {
        navigation.navigate('config_dictation', {
            configDictation: config,
            module: module,
        });
    }
    const addStudentToCourse = (idCourse) =>{
        hideModal()
        getStorageItem(ID_USER).then((idUser) => {
            if (idCourse) {
                addStudentCourse(idCourse,idUser).then((result)=>{
                    if (result.ok){
                        Alert.alert('Te has inscripto en un nuevo curso exitosamente')
                        setUpdateCoursesStudent(!updateCoursesStudent);
                    }else {
                        Alert.alert('No te has podido inscribir al curso')
                    }
                })
            }else{
                Alert.alert('No te has podido inscribir al curso')
            }
        })
    }

    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
       <View  style={styles.container}>
          
           <View style={styles.cursoStories}>
                <ScrollView style={{flex:0.2}} horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableHighlight
                       style={[styles.profileImgContainer, { borderColor:TEXTHOME, borderWidth:2 }]}
                       onPress={showModal}
                            >
                                <Image source={{uri:"https://ui-avatars.com/api/?color="+TEXTHOME+"&background="+BACKGROUNDHOME+"&name=Nuevo" }} style={styles.profileImg} />
                    </TouchableHighlight>
                    <TouchableHighlight
                       style={[styles.profileImgContainer, { borderColor:TEXTHOME, borderWidth:2 }]}
                            >
                                <Image source={{ uri:"https://ui-avatars.com/api/?color="+TEXTHOME+"&background="+BACKGROUNDHOME+"&name=Personal" }} style={styles.profileImg} />
                    </TouchableHighlight>
                    {courses ? courses.map((j,index)=>(
                       <TouchableHighlight key={index}
                       style={[styles.profileImgContainer, { borderColor:TEXTHOME, borderWidth:5 }]}
                            onPress={()=>{
                                if (j._id) {
                                    setStorageCurrentCourse(j.curso_cursado)
                                    setCurrentCourse(j.curso_cursado)
                                }
                            }}
                            >
                                <Image source={{ uri:"https://ui-avatars.com/api/?color="+TEXTHOME+"&background="+BACKGROUNDHOME+"&name="+j.nombre }} style={styles.profileImg} />
                        </TouchableHighlight>
                    )) : <></>}
                </ScrollView>
           </View>
        <View style={{flex:1, backgroundColor:BACKGROUNDHOME}}>
          <ScrollView>     
            {modules.map((module, i) => (
                <ListItem.Accordion containerStyle={styles.itemsContainer}
                    content={
                        <>
                            <Icon
                                type="material-community"
                                name="playlist-music"
                                iconStyle={styles.iconMenuLeft}
                            />
                            <ListItem.Content style={styles.items}>                                
                                <ListItem.Title 
                                style={styles.title}
                                >{module.module.nombre}</ListItem.Title>
                            </ListItem.Content>
                        </>
                    }
                    key={i}
                    isExpanded={module.open}
                    onPress={ () => {
                        open_closeModulePress(module);
                    }}
                >
                    {module.module.configuracion_dictado.map((config, j) => (
                        <ListItem containerStyle={styles.subcontent}
                            key={j}
                            onPress={() => {
                                configDictationIn(config, module.module);
                            }}
                            bottomDivider
                            
                        >
                            <ListItem.Content  style={styles.subitems}>
                                <ListItem.Title  style={styles.title}>{'      ' + config.nombre}</ListItem.Title>
                                <ListItem.Subtitle  style={{color:'black'}}>
                                    {'    ' + config.descripcion}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron  />
                        </ListItem>
                    ))}
                </ListItem.Accordion>
            ))}
          </ScrollView>
      
          <Provider style={{flex:0.1}}>
            <Portal style={{flex:0.2}}>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
                        <View style={styles.containerModal}>
                            <ScrollView styles={{flex:1}}>
                            {allCourses.map((e,index)=>( 
                                <TouchableOpacity onPress={()=>{addStudentToCourse(e._id)}} key={index} style={styles.coursesToAdd}>
                                    <Text key={index} style={styles.textCourseModal}>{e.nombre}</Text>
                                </TouchableOpacity> 
                            ) )}
                            </ScrollView>
                        </View>
                </Modal>
            </Portal>
        </Provider>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconMenuLeft: {
        color: TEXTHOME,
        fontWeight:'bold',
        paddingRight:5,
        fontSize:32
    },
    coursesToAdd:{
        padding:5,
        height:'6%',
        alignItems:'center',
        backgroundColor:BACKGROUNDHOME,
    },
    textCourseModal:{
        alignSelf:'center',
        color: TEXTHOME,
        fontWeight:'bold',
        fontSize:20,
    },
    containerModal:{
        backgroundColor:BACKGROUNDHOME,
        flex:0.9,
        width:'90%',
        height:'90%',
        borderRadius:10,
        alignSelf:'center',
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 40,
      },
      profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
      },
    container:{   
        flex:1,   
        flexDirection:'column',
        backgroundColor:BACKGROUNDHOME,
        marginTop:10     
    },
    cursoStories:{
        backgroundColor:BACKGROUNDHOME,
        flex:0.15,
        height:"11%"
    },
    itemsContainer:{
        flex:1,
        marginTop:15,
        backgroundColor:ITEMSHOME,
        flexDirection:'row',
        width:'97%',
        alignSelf:'center',
        borderRadius:10,
        shadowColor: '#470000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
        elevation:13,        
    },
    items:{        
        alignSelf:'center'
       
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
 