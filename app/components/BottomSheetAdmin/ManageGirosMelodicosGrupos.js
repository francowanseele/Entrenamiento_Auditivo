import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import {
    ListItem,
    Icon,
    Button,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    PRIMARY_COLOR,
} from '../../../utils/colorPalette';
import { getAll } from '../../api/giro_melodico_grupo';
import OverlayOptionsGiroMelodicoGrupo from './OverlayOptionsGiroMelodicoGrupo';


export default function ManageGirosMelodicosGrupos(props) {
    const { refRBSheet } = props;

    const [grupos, setGrupos] = useState([]);
    const [visibleOptionsGrupo, setVisibleOptionsGrupo] = useState(false);
    const [grupoOptions, setGrupoOptions] = useState(null);
    const [isAddGrupo, setIsAddGrupo] = useState(false);
    const [isSubgrupoOption, setIsSubgrupoOption] = useState(false);
    
    const initialStateOpen = async () => {
        const result = await getAll();
        
        if(result.ok) {
            let res = [];
            result.girosMelodicosGrupo.forEach(gr => {
                let resSub = [];
                gr.subGrupo.forEach(subGr => {
                    resSub.push({
                        id: subGr.id,
                        Nombre: subGr.Nombre,
                        Nivel: subGr.Nivel,
                        expanded: false,
                    })
                });
                res.push({
                    id: gr.id,
                    Nombre: gr.Nombre,
                    Nivel: gr.Nivel,
                    subGrupo: resSub,
                    expanded: false,
                })
            });

            await setGrupos(res);
        }
    };

    const openCloseGrupo = (grupo) => {
        let res = [];
        grupos.forEach(gr => {
            if(gr.id == grupo.id) {
                res.push({
                    id: gr.id,
                    Nombre: gr.Nombre,
                    Nivel: gr.Nivel,
                    subGrupo: gr.subGrupo,
                    expanded: !gr.expanded,
                })
            } else {
                res.push(gr);
            }
        });

        setGrupos(res);
    }

    const showOptionsGrupo = (g) => {
        setGrupoOptions(g);
        setIsAddGrupo(false);
        setIsSubgrupoOption(false);
        setVisibleOptionsGrupo(true);
    }

    const showOptionsSubgrupo = (subGrupo) => {
        setIsAddGrupo(false);
        setGrupoOptions(subGrupo)
        setIsSubgrupoOption(true);
        setVisibleOptionsGrupo(true);
    }

    const showOptionAdd = () => {
        setGrupoOptions(null);
        setIsAddGrupo(true);
        setIsSubgrupoOption(false);
        setVisibleOptionsGrupo(true);
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            height={Dimensions.get('window').height * 0.75}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                },
            }}
        >
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                    }}
                >
                    <Text style={styles.titleBottom}>Administrar Grupos</Text>
                    <Button
                        style={styles.buttonTitle}
                        buttonStyle={styles.buttonTitleStyle}
                        title={'Crear grupo'}
                        onPress={() => showOptionAdd()}
                        containerStyle={styles.buttonTitleContainer}
                    />
                </View>
            
                <ScrollView>
                    {grupos && grupos.length ? (
                        <>
                        {grupos.map((grupo, key) => (
                            <ListItem.Accordion
                                content={
                                    <>
                                        <Icon name="code-brackets" size={25} type="material-community" />
                                        <ListItem.Content>
                                            <ListItem.Title>{grupo.Nombre}</ListItem.Title>
                                        </ListItem.Content>
                                    </>
                                }
                                isExpanded={grupo.expanded}
                                onPress={() => {
                                    openCloseGrupo(grupo)
                                }}
                                key={key}
                                onLongPress={() => showOptionsGrupo(grupo)}
                            >
                            {grupo.subGrupo.map((subGrupo, i) => (
                                <ListItem key={i} bottomDivider onPress={() => showOptionsSubgrupo(subGrupo)}>
                                <ListItem.Content>
                                    <ListItem.Title> - {subGrupo.Nombre}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                                </ListItem>
                            ))}
                            </ListItem.Accordion>
                        ))}
                        </>
                    ) : (
                        <View style={{ margin: 15 }}>
                            <Text>No hay grupos en el sistema. Por favor, seleccione "Crear Grupo" para añadir nuevos grupos al sistema ADA.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            <OverlayOptionsGiroMelodicoGrupo
                visible={visibleOptionsGrupo} 
                setVisible={setVisibleOptionsGrupo} 
                refRBSheet={refRBSheet} 
                grupo={grupoOptions}
                initialStateOpen={initialStateOpen}
                isAddGrupo={isAddGrupo}
                isSubgrupoOption={isSubgrupoOption}
            />
        </RBSheet>
    )
}


const styles = StyleSheet.create({
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
    buttonTitle: {
        marginTop: 10,
    },
    buttonTitleContainer: {
        width: '30%',
    },
    buttonTitleStyle: {
        backgroundColor: PRIMARY_COLOR,
    },
});
