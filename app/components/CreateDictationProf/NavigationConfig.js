import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';

import ConfigMelodic from './ConfigMelodic';
import ConfigRhythmic from './ConfigRhythmic';
import { dictationType } from '../../../enums/dictationType';
import ConfigJazzChords from './ConfigJazzChords';
import ConfigIntervals from './ConfigIntervals';

const Tab = createMaterialTopTabNavigator();

export default function NavigationConfig(props) {
    const {
        refRBSheet_GiroMelodico,
        refRBSheet_GiroMelodico_Admin,
        refRBSheet_GiroMelodicoGrupo_Admin,
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
        setAddCompas,
        setEditCompas_regla,
        setEditCelula_ritmica,
        setMayor,
        mayor,
        setEditLigaduraFirstCR,
        refRBSheet_Clave,
        refRBSheet_Tonalidad,
        refRBSheet_Intervals,
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
        generatorType,
        refRBSheet_Ligaduras,
        camposArmonicosToSend,
        setCamposArmonicosToSend,
        intervalType,
        setIntervalType,
        directionInterval,
        setDirectionInterval,
        okIntervals,
    } = props;

    return (
        <Tab.Navigator>
            {generatorType == dictationType.melodic && (
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
                            refRBSheet_GiroMelodico_Admin={refRBSheet_GiroMelodico_Admin}
                            refRBSheet_GiroMelodicoGrupo_Admin={refRBSheet_GiroMelodicoGrupo_Admin}
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

            {(generatorType == dictationType.melodic || generatorType == dictationType.rhythmic) && (
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
            )}

            {generatorType == dictationType.jazzChrods && (
                <Tab.Screen
                    name="Configuración"
                    children={() => (
                        <ConfigJazzChords
                            refRBSheet_Tonalidad={refRBSheet_Tonalidad}
                            okTonality={okTonality}
                            camposArmonicosToSend={camposArmonicosToSend}
                            setCamposArmonicosToSend={setCamposArmonicosToSend}
                        />
                    )}
                />
            )}

            {generatorType == dictationType.interval && (
                <Tab.Screen
                    name="Configuración"
                    children={() => (
                        <ConfigIntervals
                            refRBSheet_Intervals={refRBSheet_Intervals}
                            intervalType={intervalType}
                            setIntervalType={setIntervalType}
                            directionInterval={directionInterval}
                            setDirectionInterval={setDirectionInterval}
                            okClefs={okClefs}
                            clave_prioridad={clave_prioridad}
                            setClaveEdit={setClaveEdit}
                            refRBSheet_Clave={refRBSheet_Clave}
                            okIntervals={okIntervals}
                        />
                    )}
                />
            )}
        </Tab.Navigator>
    );
}
