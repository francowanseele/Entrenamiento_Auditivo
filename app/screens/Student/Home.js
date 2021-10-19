import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, Image, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {BACKGROUNDHOME,TEXTHOME,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';
import { getModulesApi, getAllCourse } from '../../api/course';


import {
    getStorageItem,
    ID_CURRENT_CURSE,
} from '../../../utils/asyncStorageManagement';
import Loading from '../../components/Loading';

export default function Home() {
    const navigation = useNavigation();
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([])
    // const [loadingText, setLoadingText] = useState('');

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
    }, []); // TODO -> se va a ejecutar cuando seleccione otro curso (y cambie en el async storage)

    useEffect(() => {
        getAllCourse().then((result)=>{
            setCourses(result.cursos)
        })
    },[])
    
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

    if (loading) return <Loading isVisible={true} text="Cargando" />;

    return (
       <View  style={styles.container}>
            {console.log(courses)}
           <View style={styles.cursoStories}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableHighlight
                       style={[styles.profileImgContainer, { borderColor:TEXTHOME, borderWidth:2 }]}
                            >
                                <Image source={{ uri:"https://ui-avatars.com/api/?color="+TEXTHOME+"&?name=+" }} style={styles.profileImg} />
                    </TouchableHighlight>
                    {courses.map((j,index)=>(
                       <TouchableHighlight
                       style={[styles.profileImgContainer, { borderColor:TEXTHOME, borderWidth:2 }]}
                            >
                                <Image source={{ uri:"https://ui-avatars.com/api/?color="+TEXTHOME+"&background="+BACKGROUNDHOME+"&name="+j.nombre }} style={styles.profileImg} />
                        </TouchableHighlight>
                    ))}
                </ScrollView>
           </View>
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
        flexDirection:'column',
        backgroundColor:BACKGROUNDHOME,
        marginTop:10     
    },
    cursoStories:{
        height:"11%"
    },
    itemsContainer:{
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
 