import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ConfigMelodic from './ConfigMelodic';
import ConfigRhythmic from './ConfigRhythmic';

const Tab = createMaterialTopTabNavigator();

export default function NavigationConfig(props) {
    const {
        refRBSheet_GiroMelodico,
        giro_melodico_regla,
        notas_inicio,
        notas_fin,
        clave_prioridad,
        nota_base,
        nro_compases,
        refRBSheet_Picker,
        simple,
        setSimple,
        compas_regla,
        celula_ritmica_regla,
        BPM,
        setAdd,
        setNotesStart,
        setGiro_melodico_reglaEdit,
        setClaveEdit,
        setAddCelulaRitmica,
        setCreateCelulaRitmica,
        setAddCompas,
        setEditCompas_regla,
        setEditCelula_ritmica,
        setMayor,
        mayor,
        setEditLigaduraFirstCR,
        refRBSheet_Clave,
        refRBSheet_Tonalidad,
        refRBSheet_NotesStartEnd,
        refRBSheet_Reference,
        refRBSheet_Compas,
        refRBSheet_CelulaRitmica,
        refRBSheet_CreateRitmica,
        refRBSheet_BPM,
        okStartNotes,
        okEndNotes,
        okClefs,
        okTonality,
        okReferenceNote,
        dictationRhythmic,
        refRBSheet_Ligaduras,
    } = props;

    return (
        <Tab.Navigator>
            {dictationRhythmic ? (
                <></>
            ) : (
                <Tab.Screen
                    name="Config. Melódica"
                    children={() => (
                        <ConfigMelodic
                            giro_melodico_regla={giro_melodico_regla}
                            notas_inicio={notas_inicio}
                            notas_fin={notas_fin}
                            clave_prioridad={clave_prioridad}
                            nota_base={nota_base}
                            setAdd={setAdd}
                            setNotesStart={setNotesStart}
                            setGiro_melodico_reglaEdit={
                                setGiro_melodico_reglaEdit
                            }
                            setClaveEdit={setClaveEdit}
                            setMayor={setMayor}
                            mayor={mayor}
                            refRBSheet_GiroMelodico={refRBSheet_GiroMelodico}
                            refRBSheet_NotesStartEnd={refRBSheet_NotesStartEnd}
                            refRBSheet_Clave={refRBSheet_Clave}
                            refRBSheet_Tonalidad={refRBSheet_Tonalidad}
                            refRBSheet_Reference={refRBSheet_Reference}
                            okStartNotes={okStartNotes}
                            okEndNotes={okEndNotes}
                            okClefs={okClefs}
                            okTonality={okTonality}
                            okReferenceNote={okReferenceNote}
                        />
                    )}
                />
            )}

            <Tab.Screen
                name="Config. Rítmica"
                children={() => (
                    <ConfigRhythmic
                        nro_compases={nro_compases}
                        simple={simple}
                        setSimple={setSimple}
                        compas_regla={compas_regla}
                        celula_ritmica_regla={celula_ritmica_regla}
                        BPM={BPM}
                        setAddCelulaRitmica={setAddCelulaRitmica}
                        setCreateCelulaRitmica={setCreateCelulaRitmica}
                        setAddCompas={setAddCompas}
                        setEditCompas_regla={setEditCompas_regla}
                        setEditCelula_ritmica={setEditCelula_ritmica}
                        setEditLigaduraFirstCR={setEditLigaduraFirstCR}
                        refRBSheet_Picker={refRBSheet_Picker}
                        refRBSheet_Compas={refRBSheet_Compas}
                        refRBSheet_CelulaRitmica={refRBSheet_CelulaRitmica}
                        refRBSheet_CreateRitmica={refRBSheet_CreateRitmica}
                        refRBSheet_BPM={refRBSheet_BPM}
                        refRBSheet_Ligaduras={refRBSheet_Ligaduras}
                    />
                )}
            />
        </Tab.Navigator>
    );
}
