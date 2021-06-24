import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { getModulesApi } from '../../api/course';
import {
    getStorageItem,
    ID_CURRENT_CURSE,
} from '../../../utils/asyncStorageManagement';
import Loading from '../../components/Loading';

export default function Home() {
    const navigation = useNavigation();
    const [modules, setModules] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

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
                    } else {
                        setModules([]);
                    }
                });
            }
        });
    }, []); // TODO -> se va a ejecutar cuando seleccione otro curso (y cambie en el async storage)

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

    if (modules === null) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView>
            {modules.map((module, i) => (
                <ListItem.Accordion
                    content={
                        <>
                            <Icon
                                type="material-community"
                                name="playlist-music"
                                iconStyle={styles.iconMenuLeft}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{module.module.nombre}</ListItem.Title>
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
                        <ListItem
                            key={j}
                            onPress={() => {
                                configDictationIn(config, module.module);
                            }}
                            bottomDivider
                        >
                            <ListItem.Content>
                                <ListItem.Title>{'    ' + config.nombre}</ListItem.Title>
                                <ListItem.Subtitle>
                                    {'    ' + config.descripcion}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))}
                </ListItem.Accordion>
            ))}
            <Loading text={loadingText} isVisible={loading} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconMenuLeft: {
        color: 'lightgrey',
    },
});
