import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    Icon,
    Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { acordeType, escalaCampoArmonico, intervaloTensiones, nombreCifrado_TetradaTriada } from '../../../enums/camposArmonicosEnum';
import { BACKGROUND_COLOR_RIGHT, BORDER_COLOR_RIGHT, FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, SECONDARY_COLOR, TEXT_COLOR_RIGHT } from '../../../utils/colorPalette';
import { DELAY_LONG_PRESS } from '../../../utils/constants';
import BottomSheetAcordeOptions from '../../components/CreateAcordeProf/BottomSheetAcordeOptions';
import { estadoAcorde } from '../../../enums/estadoAcorde';
import BottomSheetAcordeTensiones from '../../components/CreateAcordeProf/BottomSheetAcordeTensiones';

export default function ConfigCampoArmonico({ route }) {
    const { 
        camposArmonicosToSend, 
        setCamposArmonicosToSend, 
        tonalidadCompasArmonico, 
        isRef,
        initializeDataCamposArmonicosToSendREFERENCIA,
    } = route.params;
    
    const initializeDataCamposArmonicos = () => {
        if (camposArmonicosToSend?.length) {
            return camposArmonicosToSend;
        } else {
            if (isRef) {
                return initializeDataCamposArmonicosToSendREFERENCIA(tonalidadCompasArmonico)
            } else {
                return [
                    // ---------------------------------------
                    // ESCALA MAYOR
                    // ---------------------------------------
                    // C
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,  
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // D
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // E
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // F
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // A
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // B
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.oncenaJusta,intervaloTensiones.tercenaMenor],
                        Tension:
                            intervaloTensiones.oncenaJusta +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayor,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMenor],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // ---------------------------------------
                    // ESCALA MAYOR ARMÓNICA
                    // ---------------------------------------
                    // C
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,  
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // D
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // E
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'E',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // F
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_mMaj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_mMaj7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMenor,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMenor + 
                            ', ' + 
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMenor],
                        Tension: 'add ' + intervaloTensiones.novenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // Ab
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_AugMaj7,
                        SpecificTensions: [intervaloTensiones.novenaAumentada,intervaloTensiones.oncenaAumentada],
                        Tension:
                            intervaloTensiones.novenaAumentada +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Aumentado,
                        SpecificTensions: [intervaloTensiones.novenaAumentada,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaAumentada +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // B
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_07,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.mayorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension:'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // ---------------------------------------
                    // ESCALA MENOR NATURAL
                    // ---------------------------------------
                    // Eb
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,  
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // F
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // Ab
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // Bb
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'Bb',
                        RealKeyNote: 'Bb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // C
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // D
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.oncenaJusta,intervaloTensiones.tercenaMenor],
                        Tension:
                            intervaloTensiones.oncenaJusta +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorNatural,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMenor],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // ---------------------------------------
                    // ESCALA MENOR ARMÓNICA
                    // ---------------------------------------
                    // C
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_AugMaj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,  
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Aumentado,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // D
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada + 
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 
                            'add ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // E
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMenor,intervaloTensiones.tercenaMenor],
                        Tension: 
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMenor],
                        Tension: 'add ' + intervaloTensiones.novenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'E',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + 
                            intervaloTensiones.novenaMenor +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // F
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaAumentada,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaAumentada +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaAumentada +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaAumentada,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaAumentada +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G#',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_07,
                        SpecificTensions: [intervaloTensiones.tercenaMenor],
                        Tension: intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G#',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // A
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_mMaj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // B
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorArmonica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // ---------------------------------------
                    // ESCALA MENOR MELÓDICA
                    // ---------------------------------------
                    // C
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_mMaj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,  
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_maj7sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus4,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.novenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.novenaMayor, intervaloTensiones.oncenaJusta],
                        Tension: 'add ' + 
                            intervaloTensiones.novenaMayor +
                            ', ' + 
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'C',
                        RealKeyNote: 'C',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // D
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m6,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Menor,
                        SpecificTensions: [intervaloTensiones.oncenaJusta],
                        Tension: 'add ' + intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'D',
                        RealKeyNote: 'D',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // Eb
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_AugMaj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor, intervaloTensiones.oncenaAumentada],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' + 
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'Eb',
                        RealKeyNote: 'Eb',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Aumentado,
                        SpecificTensions: [intervaloTensiones.novenaMayor, intervaloTensiones.oncenaAumentada],
                        Tension: 
                            'add ' + 
                            intervaloTensiones.novenaMayor + 
                            ', ' + 
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // F
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'F',
                        RealKeyNote: 'F',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.tercenaMenor],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus4,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor],
                        Tension: 'add ' + intervaloTensiones.novenaMayor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus4,
                        SpecificTensions: [],
                        Tension: 
                            'add ' + 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // A
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'A',
                        RealKeyNote: 'A',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaJusta],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaJusta,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // B
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_m7b5,
                        SpecificTensions: [intervaloTensiones.tercenaMenor],
                        Tension: intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.menorMelodica,
                        EscalaPrioridad: 1,
                        KeyNote: 'B',
                        RealKeyNote: 'B',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Disminuido,
                        SpecificTensions: [],
                        Tension: '',
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // ---------------------------------------
                    // ESCALA OTROS
                    // ---------------------------------------
                    // G
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7b5,
                        SpecificTensions: [intervaloTensiones.novenaMenor,intervaloTensiones.novenaAumentada,intervaloTensiones.tercenaMenor],
                        Tension: 
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.novenaAumentada +
                            ', ' + 
                            intervaloTensiones.tercenaMenor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'G',
                        RealKeyNote: 'G',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7hash5,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.novenaAumentada +
                            ', ' + 
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G2
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'G2',
                        RealKeyNote: 'G2',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMenor,intervaloTensiones.novenaAumentada,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension: 
                            intervaloTensiones.novenaMenor +
                            ', ' +
                            intervaloTensiones.novenaAumentada +
                            ', ' + 
                            intervaloTensiones.oncenaAumentada +
                            ', ' + 
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // G3
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'G3',
                        RealKeyNote: 'G3',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_aug7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // A
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Ab',
                        RealKeyNote: 'Ab',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    // Db
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada,intervaloTensiones.tercenaMayor],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6sus2,
                        SpecificTensions: [],
                        Tension: intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_7sus2,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.oncenaAumentada +
                            ', ' +
                            intervaloTensiones.tercenaMayor,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.tetrada_6,
                        SpecificTensions: [],
                        Tension: 
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.tetrada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_Mayor,
                        SpecificTensions: [intervaloTensiones.novenaMayor,intervaloTensiones.oncenaAumentada],
                        Tension:
                            'add ' +
                            intervaloTensiones.novenaMayor +
                            ', ' +
                            intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                        CheckTension: true,
                        ByDefault: true,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                    {
                        Escala: escalaCampoArmonico.otros,
                        EscalaPrioridad: 1,
                        KeyNote: 'Db',
                        RealKeyNote: 'Db',
                        KeyNotePrioridad: 1,
                        NombreCifrado: nombreCifrado_TetradaTriada.triada_sus2,
                        SpecificTensions: [],
                        Tension: 'add ' + intervaloTensiones.oncenaAumentada,
                        Tipo: acordeType.triada,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: false,
                        CheckTension: false,
                        ByDefault: false,
                        EstadosAcorde: estadoAcorde.fundamental.toString(),
                    },
                ];
            }
        }
    };

    const [dataCamposArmonicos, setDataCamposArmonicos] = useState(() => initializeDataCamposArmonicos());
    const [elemForMoreOptions, setElemForMoreOptions] = useState(null);
    const [typeElem, setTypeElem] = useState('');
    const [priorityElem, setPriorityElem] = useState(0);
    const [estadosAcorde, setEstadosAcorde] = useState('');
    const [hasAcordeMoreOptions, setHasAcordeMoreOptions] = useState(false);
    const [escalaForMoreOptions, setEscalaForMoreOptions] = useState(null);

    // States for specific tensions
    const [listOptionsTensiones, setListOptionsTensiones] = useState([]);
    const [escalaForSpecificTensions, setEscalaForSpecificTensions] = useState(null);
    const [acordeForSpecificTensions, setAcordeForSpecificTensions] = useState(null);
    const [tetradaForSpecificTensions, setTetradaForSpecificTensions] = useState(null);
    const [tensionForSpecificTensions, setTensionForSpecificTensions] = useState(null);
    const [triadaForSpecificTensions, setTriadaForSpecificTensions] = useState(null);
    const [isTetradaForSpecificTensions, setIsTetradaForSpecificTensions] = useState(false);
    
    // ---------------------------------------
    // ESCALA MAYOR
    // ---------------------------------------
    const [numberOfRowsForEscala, setNumberOfRowsForEscala] = useState(0);
    
    // States for C
    const [numberOfRowsForC, setNumberOfRowsForC] = useState(0);
    const [showMoreDetailsForC, setShowMoreDetailsForC] = useState(false);

    // States for D
    const [numberOfRowsForD, setNumberOfRowsForD] = useState(0);
    const [showMoreDetailsForD, setShowMoreDetailsForD] = useState(false);

    // States for E
    const [numberOfRowsForE, setNumberOfRowsForE] = useState(0);
    const [showMoreDetailsForE, setShowMoreDetailsForE] = useState(false);

    // States for F
    const [numberOfRowsForF, setNumberOfRowsForF] = useState(0);
    const [showMoreDetailsForF, setShowMoreDetailsForF] = useState(false);

    // States for G
    const [numberOfRowsForG, setNumberOfRowsForG] = useState(0);
    const [showMoreDetailsForG, setShowMoreDetailsForG] = useState(false);

    // States for A
    const [numberOfRowsForA, setNumberOfRowsForA] = useState(0);
    const [showMoreDetailsForA, setShowMoreDetailsForA] = useState(false);
    // ---------------------------------------
    // ---------------------------------------

    // ---------------------------------------
    // ESCALA MAYOR ARMÓNICA (MayorArm)
    // ---------------------------------------
    const [numberOfRowsForEscalaMayorArm, setNumberOfRowsForEscalaMayorArm] = useState(0);
    
    // States for C
    const [numberOfRowsForCMayorArm, setNumberOfRowsForCMayorArm] = useState(0);
    const [showMoreDetailsForCMayorArm, setShowMoreDetailsForCMayorArm] = useState(false);

    // States for D
    const [numberOfRowsForDMayorArm, setNumberOfRowsForDMayorArm] = useState(0);
    const [showMoreDetailsForDMayorArm, setShowMoreDetailsForDMayorArm] = useState(false);

    // States for E
    const [numberOfRowsForEMayorArm, setNumberOfRowsForEMayorArm] = useState(0);
    const [showMoreDetailsForEMayorArm, setShowMoreDetailsForEMayorArm] = useState(false);

    // States for F
    const [numberOfRowsForFMayorArm, setNumberOfRowsForFMayorArm] = useState(0);
    const [showMoreDetailsForFMayorArm, setShowMoreDetailsForFMayorArm] = useState(false);

    // States for G
    const [numberOfRowsForGMayorArm, setNumberOfRowsForGMayorArm] = useState(0);
    const [showMoreDetailsForGMayorArm, setShowMoreDetailsForGMayorArm] = useState(false);

    // States for Ab
    const [numberOfRowsForAbMayorArm, setNumberOfRowsForAbMayorArm] = useState(0);
    const [showMoreDetailsForAbMayorArm, setShowMoreDetailsForAbMayorArm] = useState(false);

    // States for B
    const [numberOfRowsForBMayorArm, setNumberOfRowsForBMayorArm] = useState(0);
    const [showMoreDetailsForBMayorArm, setShowMoreDetailsForBMayorArm] = useState(false);

    // ---------------------------------------
    // ---------------------------------------

    // ---------------------------------------
    // ESCALA MENOR NATURAL (MenorNat)
    // ---------------------------------------
    const [numberOfRowsForEscalaMenorNat, setNumberOfRowsForEscalaMenorNat] = useState(0);
    
    // States for Eb
    const [numberOfRowsForEbMenorNat, setNumberOfRowsForEbMenorNat] = useState(0);
    const [showMoreDetailsForEbMenorNat, setShowMoreDetailsForEbMenorNat] = useState(false);

    // States for F
    const [numberOfRowsForFMenorNat, setNumberOfRowsForFMenorNat] = useState(0);
    const [showMoreDetailsForFMenorNat, setShowMoreDetailsForFMenorNat] = useState(false);

    // States for G
    const [numberOfRowsForGMenorNat, setNumberOfRowsForGMenorNat] = useState(0);
    const [showMoreDetailsForGMenorNat, setShowMoreDetailsForGMenorNat] = useState(false);

    // States for Ab
    const [numberOfRowsForAbMenorNat, setNumberOfRowsForAbMenorNat] = useState(0);
    const [showMoreDetailsForAbMenorNat, setShowMoreDetailsForAbMenorNat] = useState(false);

    // States for Bb
    const [numberOfRowsForBbMenorNat, setNumberOfRowsForBbMenorNat] = useState(0);
    const [showMoreDetailsForBbMenorNat, setShowMoreDetailsForBbMenorNat] = useState(false);

    // States for C
    const [numberOfRowsForCMenorNat, setNumberOfRowsForCMenorNat] = useState(0);
    const [showMoreDetailsForCMenorNat, setShowMoreDetailsForCMenorNat] = useState(false);

    // States for D
    const [numberOfRowsForDMenorNat, setNumberOfRowsForDMenorNat] = useState(0);
    const [showMoreDetailsForDMenorNat, setShowMoreDetailsForDMenorNat] = useState(false);

    // ---------------------------------------
    // ---------------------------------------

    // ---------------------------------------
    // ESCALA MENOR ARMONICA (MenorArm)
    // ---------------------------------------
    const [numberOfRowsForEscalaMenorArm, setNumberOfRowsForEscalaMenorArm] = useState(0);
    
    // States for C
    const [numberOfRowsForCMenorArm, setNumberOfRowsForCMenorArm] = useState(0);
    const [showMoreDetailsForCMenorArm, setShowMoreDetailsForCMenorArm] = useState(false);

    // States for D
    const [numberOfRowsForDMenorArm, setNumberOfRowsForDMenorArm] = useState(0);
    const [showMoreDetailsForDMenorArm, setShowMoreDetailsForDMenorArm] = useState(false);

    // States for E
    const [numberOfRowsForEMenorArm, setNumberOfRowsForEMenorArm] = useState(0);
    const [showMoreDetailsForEMenorArm, setShowMoreDetailsForEMenorArm] = useState(false);

    // States for F
    const [numberOfRowsForFMenorArm, setNumberOfRowsForFMenorArm] = useState(0);
    const [showMoreDetailsForFMenorArm, setShowMoreDetailsForFMenorArm] = useState(false);

    // States for G
    const [numberOfRowsForGMenorArm, setNumberOfRowsForGMenorArm] = useState(0);
    const [showMoreDetailsForGMenorArm, setShowMoreDetailsForGMenorArm] = useState(false);

    // States for A
    const [numberOfRowsForAMenorArm, setNumberOfRowsForAMenorArm] = useState(0);
    const [showMoreDetailsForAMenorArm, setShowMoreDetailsForAMenorArm] = useState(false);
    // ---------------------------------------
    // ---------------------------------------

    // ---------------------------------------
    // ESCALA MENOR MELÓDICA (MenorMel)
    // ---------------------------------------
    const [numberOfRowsForEscalaMenorMel, setNumberOfRowsForEscalaMenorMel] = useState(0);
    
    // States for C
    const [numberOfRowsForCMenorMel, setNumberOfRowsForCMenorMel] = useState(0);
    const [showMoreDetailsForCMenorMel, setShowMoreDetailsForCMenorMel] = useState(false);

    // States for D
    const [numberOfRowsForDMenorMel, setNumberOfRowsForDMenorMel] = useState(0);
    const [showMoreDetailsForDMenorMel, setShowMoreDetailsForDMenorMel] = useState(false);

    // States for Eb
    const [numberOfRowsForEbMenorMel, setNumberOfRowsForEbMenorMel] = useState(0);
    const [showMoreDetailsForEbMenorMel, setShowMoreDetailsForEbMenorMel] = useState(false);

    // States for F
    const [numberOfRowsForFMenorMel, setNumberOfRowsForFMenorMel] = useState(0);
    const [showMoreDetailsForFMenorMel, setShowMoreDetailsForFMenorMel] = useState(false);

    // States for G
    const [numberOfRowsForGMenorMel, setNumberOfRowsForGMenorMel] = useState(0);
    const [showMoreDetailsForGMenorMel, setShowMoreDetailsForGMenorMel] = useState(false);

    // States for A
    const [numberOfRowsForAMenorMel, setNumberOfRowsForAMenorMel] = useState(0);
    const [showMoreDetailsForAMenorMel, setShowMoreDetailsForAMenorMel] = useState(false);

    // States for B
    const [numberOfRowsForBMenorMel, setNumberOfRowsForBMenorMel] = useState(0);
    const [showMoreDetailsForBMenorMel, setShowMoreDetailsForBMenorMel] = useState(false);

    // ---------------------------------------
    // ---------------------------------------

    // ---------------------------------------
    // ESCALA OTROA
    // ---------------------------------------
    const [numberOfRowsForEscalaOtros, setNumberOfRowsForEscalaOtros] = useState(0);

    // States for G
    const [numberOfRowsForGOtros, setNumberOfRowsForGOtros] = useState(0);
    const [showMoreDetailsForGOtros, setShowMoreDetailsForGOtros] = useState(false);

    // States for Ab
    const [numberOfRowsForAbOtros, setNumberOfRowsForAbOtros] = useState(0);
    const [showMoreDetailsForAbOtros, setShowMoreDetailsForAbOtros] = useState(false);

    // States for Db
    const [numberOfRowsForDbOtros, setNumberOfRowsForDbOtros] = useState(0);
    const [showMoreDetailsForDbOtros, setShowMoreDetailsForDbOtros] = useState(false);
    // ---------------------------------------
    // ---------------------------------------

    const navigation = useNavigation();
    const refRBSheet_AcordeOptions = useRef();
    const refRBSheet_AcordeTensiones = useRef();

    const showBottomSheetEscala = (escala) => {
        setElemForMoreOptions(escala);
        setTypeElem('escala');
        setPriorityElem(dataCamposArmonicos.find((x) => x.Escala == escala).EscalaPrioridad);

        refRBSheet_AcordeOptions.current.open();
    }

    const showBottomSheetAcorde = (acorde, escala) => {
        setElemForMoreOptions(acorde);
        setEscalaForMoreOptions(escala);
        setTypeElem('acorde');
        setHasAcordeMoreOptions((dataCamposArmonicos.filter((x) => x.KeyNote == acorde && x.Escala == escala)?.length > 2) || (escala === escalaCampoArmonico.otros && acorde === 'G')); // mayor a 2 porque el que no tiene mas opciones es de largo 2 (tétrada más tríada)
        setPriorityElem(dataCamposArmonicos.find((x) => x.KeyNote == acorde && x.Escala == escala).KeyNotePrioridad);
        setEstadosAcorde(dataCamposArmonicos.find((x) => x.KeyNote == acorde && x.Escala == escala).EstadosAcorde);

        refRBSheet_AcordeOptions.current.open();
    }

    const setEstadoAcordeEscala = (elem, estadosAcordeStr, escalaForElem) => {
        setDataCamposArmonicos(dataCamposArmonicos.map((x) => {
            if (x.KeyNote == elem && x.Escala == escalaForElem) {
                return {
                    ...x,
                    EstadosAcorde: estadosAcordeStr,
                };
            } else {
                return x;
            }
        }))
    }

    const moreOptions = (acorde, escala) => {
        switch (escala) {
            case escalaCampoArmonico.mayor:
                switch (acorde) {
                    case 'C':
                        if (tonalidadCompasArmonico == 'menor') {
                            moreOptionsForCOtros()
                        } else {
                            moreOptionsForC();
                        }
                        break;
                    case 'D':
                        moreOptionsForD();
                        break;
                    case 'E':
                        moreOptionsForE();
                        break;
                    case 'F':
                        moreOptionsForF();
                        break;
                    case 'G':
                        moreOptionsForG();
                        break;
                    case 'A':
                        moreOptionsForA();
                        break;
                    default:
                        break;
                }
                break;
            case escalaCampoArmonico.mayorArmonica:
                switch (acorde) {
                    case 'C':
                        moreOptionsForCMayorArm();
                        break;
                    case 'D':
                        moreOptionsForDMayorArm();
                        break;
                    case 'E':
                        moreOptionsForEMayorArm();
                        break;
                    case 'F':
                        moreOptionsForFMayorArm();
                        break;
                    case 'G':
                        moreOptionsForGMayorArm();
                        break;
                    case 'Ab':
                        moreOptionsForAbMayorArm();
                        break;
                    case 'B':
                        moreOptionsForBMayorArm();
                        break;
                
                    default:
                        break;
                }
            case escalaCampoArmonico.menorNatural:
                switch (acorde) {
                    case 'Eb':
                        moreOptionsForEbMenorNat()
                        break;
                    case 'F':
                        moreOptionsForFMenorNat()
                        break;
                    case 'G':
                        moreOptionsForGMenorNat()
                        break;
                    case 'Ab':
                        moreOptionsForAbMenorNat()
                        break;
                    case 'Bb':
                        moreOptionsForBbMenorNat()
                        break;
                    case 'C':
                        moreOptionsForCMenorNat()
                        break;
                    case 'D':
                        moreOptionsForDMenorNat()
                        break;
                
                    default:
                        break;
                }
            case escalaCampoArmonico.menorArmonica:
                switch (acorde) {
                    case 'D':
                        moreOptionsForDMenorArm();
                        break;
                    case 'E':
                        moreOptionsForEMenorArm();
                        break;
                    case 'F':
                        moreOptionsForFMenorArm();
                        break;
                    case 'A':
                        moreOptionsForAMenorArm();
                        break;
                    default:
                        break;
                }
                break;
            case escalaCampoArmonico.menorMelodica:
                switch (acorde) {
                    case 'C':
                        moreOptionsForCMenorMel();
                        break;
                    case 'D':
                        moreOptionsForDMenorMel();
                        break;
                    case 'Eb':
                        moreOptionsForEbMenorMel();
                        break;
                    case 'F':
                        moreOptionsForFMenorMel();
                        break;
                    case 'G':
                        moreOptionsForGMenorMel();
                        break;
                    case 'A':
                        moreOptionsForAMenorMel();
                        break;
                    case 'B':
                        moreOptionsForBMenorMel();
                        break;
                
                    default:
                        break;
                }
            case escalaCampoArmonico.otros:
                switch (acorde) {
                    case 'Ab':
                        moreOptionsForAbOtros();
                        break;
                    case 'G':
                        moreOptionsForGOtros();
                        break;
                    case 'Db':
                        moreOptionsForDbOtros();
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    };

    const setPriorityAcordeEscala = (elem, type, priority, escalaForAcorde) => {
        if (type == 'acorde') {
            setDataCamposArmonicos(dataCamposArmonicos.map((x) => {
                if (x.KeyNote == elem && x.Escala == escalaForAcorde) {
                    return {
                        ...x,
                        KeyNotePrioridad: priority,
                    };
                } else {
                    return x;
                }
            }))
        } else if (type = 'escala') {
            setDataCamposArmonicos(dataCamposArmonicos.map((x) => {
                if (x.Escala == elem) {
                    return {
                        ...x,
                        EscalaPrioridad: priority,
                    };
                } else {
                    return x;
                }
            }))
        }
    }

    const moreOptionsForC = () => {
        if (!showMoreDetailsForC) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 5);
            setNumberOfRowsForC(numberOfRowsForC + 5);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 5);
            setNumberOfRowsForC(numberOfRowsForC - 5);
        }
        setShowMoreDetailsForC(!showMoreDetailsForC);
    }

    const moreOptionsForD = () => {
        if (!showMoreDetailsForD) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 5);
            setNumberOfRowsForD(numberOfRowsForD + 5);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 5);
            setNumberOfRowsForD(numberOfRowsForD - 5);
        }
        setShowMoreDetailsForD(!showMoreDetailsForD);
    }

    const moreOptionsForE = () => {
        if (!showMoreDetailsForE) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 1);
            setNumberOfRowsForE(numberOfRowsForE + 1);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 1);
            setNumberOfRowsForE(numberOfRowsForE - 1);
        }
        setShowMoreDetailsForE(!showMoreDetailsForE);
    }

    const moreOptionsForF = () => {
        if (!showMoreDetailsForF) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 3);
            setNumberOfRowsForF(numberOfRowsForF + 3);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 3);
            setNumberOfRowsForF(numberOfRowsForF - 3);
        }
        setShowMoreDetailsForF(!showMoreDetailsForF);
    }

    function moreOptionsForG() {
        if (!showMoreDetailsForG) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 5);
            setNumberOfRowsForG(numberOfRowsForG + 5);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 5);
            setNumberOfRowsForG(numberOfRowsForG - 5);
        }
        setShowMoreDetailsForG(!showMoreDetailsForG);
    }

    const moreOptionsForA = () => {
        if (!showMoreDetailsForA) {
            setNumberOfRowsForEscala(numberOfRowsForEscala + 2);
            setNumberOfRowsForA(numberOfRowsForA + 2);
        } else {
            setNumberOfRowsForEscala(numberOfRowsForEscala - 2);
            setNumberOfRowsForA(numberOfRowsForA - 2);
        }
        setShowMoreDetailsForA(!showMoreDetailsForA);
    }

    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const moreOptionsForCMayorArm = () => {
        if (!showMoreDetailsForCMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 2);
            setNumberOfRowsForCMayorArm(numberOfRowsForCMayorArm + 2);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 2);
            setNumberOfRowsForCMayorArm(numberOfRowsForCMayorArm - 2);
        }
        setShowMoreDetailsForCMayorArm(!showMoreDetailsForCMayorArm);
    }

    const moreOptionsForDMayorArm = () => {
        if (!showMoreDetailsForDMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 0);
            setNumberOfRowsForDMayorArm(numberOfRowsForDMayorArm + 0);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 0);
            setNumberOfRowsForDMayorArm(numberOfRowsForDMayorArm - 0);
        }
        setShowMoreDetailsForDMayorArm(!showMoreDetailsForDMayorArm);
    }

    const moreOptionsForEMayorArm = () => {
        if (!showMoreDetailsForEMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 0);
            setNumberOfRowsForEMayorArm(numberOfRowsForEMayorArm + 0);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 0);
            setNumberOfRowsForEMayorArm(numberOfRowsForEMayorArm - 0);
        }
        setShowMoreDetailsForEMayorArm(!showMoreDetailsForEMayorArm);
    }

    const moreOptionsForFMayorArm = () => {
        if (!showMoreDetailsForFMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 3);
            setNumberOfRowsForFMayorArm(numberOfRowsForFMayorArm + 3);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 3);
            setNumberOfRowsForFMayorArm(numberOfRowsForFMayorArm - 3);
        }
        setShowMoreDetailsForFMayorArm(!showMoreDetailsForFMayorArm);
    }

    const moreOptionsForGMayorArm = () => {
        if (!showMoreDetailsForGMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 3);
            setNumberOfRowsForGMayorArm(numberOfRowsForGMayorArm + 3);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 3);
            setNumberOfRowsForGMayorArm(numberOfRowsForGMayorArm - 3);
        }
        setShowMoreDetailsForGMayorArm(!showMoreDetailsForGMayorArm);
    }

    const moreOptionsForAbMayorArm = () => {
        if (!showMoreDetailsForAbMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 0);
            setNumberOfRowsForAbMayorArm(numberOfRowsForAbMayorArm + 0);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 0);
            setNumberOfRowsForAbMayorArm(numberOfRowsForAbMayorArm - 0);
        }
        setShowMoreDetailsForAbMayorArm(!showMoreDetailsForAbMayorArm);
    }

    const moreOptionsForBMayorArm = () => {
        if (!showMoreDetailsForBMayorArm) {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm + 0);
            setNumberOfRowsForBMayorArm(numberOfRowsForBMayorArm + 0);
        } else {
            setNumberOfRowsForEscalaMayorArm(numberOfRowsForEscalaMayorArm - 0);
            setNumberOfRowsForBMayorArm(numberOfRowsForBMayorArm - 0);
        }
        setShowMoreDetailsForBMayorArm(!showMoreDetailsForBMayorArm);
    }

    
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const moreOptionsForEbMenorNat = () => {
        if (!showMoreDetailsForEbMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 5);
            setNumberOfRowsForEbMenorNat(numberOfRowsForEbMenorNat + 5);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 5);
            setNumberOfRowsForEbMenorNat(numberOfRowsForEbMenorNat - 5);
        }
        setShowMoreDetailsForEbMenorNat(!showMoreDetailsForEbMenorNat);
    }

    const moreOptionsForFMenorNat = () => {
        if (!showMoreDetailsForFMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 5);
            setNumberOfRowsForFMenorNat(numberOfRowsForFMenorNat + 5);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 5);
            setNumberOfRowsForFMenorNat(numberOfRowsForFMenorNat - 5);
        }
        setShowMoreDetailsForFMenorNat(!showMoreDetailsForFMenorNat);
    }

    const moreOptionsForGMenorNat = () => {
        if (!showMoreDetailsForGMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 1);
            setNumberOfRowsForGMenorNat(numberOfRowsForGMenorNat + 1);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 1);
            setNumberOfRowsForGMenorNat(numberOfRowsForGMenorNat - 1);
        }
        setShowMoreDetailsForGMenorNat(!showMoreDetailsForGMenorNat);
    }

    const moreOptionsForAbMenorNat = () => {
        if (!showMoreDetailsForAbMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 3);
            setNumberOfRowsForAbMenorNat(numberOfRowsForAbMenorNat + 3);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 3);
            setNumberOfRowsForAbMenorNat(numberOfRowsForAbMenorNat - 3);
        }
        setShowMoreDetailsForAbMenorNat(!showMoreDetailsForAbMenorNat);
    }

    function moreOptionsForBbMenorNat() {
        if (!showMoreDetailsForBbMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 5);
            setNumberOfRowsForBbMenorNat(numberOfRowsForBbMenorNat + 5);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 5);
            setNumberOfRowsForBbMenorNat(numberOfRowsForBbMenorNat - 5);
        }
        setShowMoreDetailsForBbMenorNat(!showMoreDetailsForBbMenorNat);
    }

    const moreOptionsForCMenorNat = () => {
        if (!showMoreDetailsForCMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 2);
            setNumberOfRowsForCMenorNat(numberOfRowsForCMenorNat + 2);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 2);
            setNumberOfRowsForCMenorNat(numberOfRowsForCMenorNat - 2);
        }
        setShowMoreDetailsForCMenorNat(!showMoreDetailsForCMenorNat);
    }

    const moreOptionsForDMenorNat = () => {
        if (!showMoreDetailsForDMenorNat) {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat + 0);
            setNumberOfRowsForDMenorNat(numberOfRowsForDMenorNat + 0);
        } else {
            setNumberOfRowsForEscalaMenorNat(numberOfRowsForEscalaMenorNat - 0);
            setNumberOfRowsForDMenorNat(numberOfRowsForDMenorNat - 0);
        }
        setShowMoreDetailsForDMenorNat(!showMoreDetailsForDMenorNat);
    }
    
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const moreOptionsForDMenorArm = () => {
        if (!showMoreDetailsForDMenorArm) {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm + 3);
            setNumberOfRowsForDMenorArm(numberOfRowsForDMenorArm + 3);
        } else {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm - 3);
            setNumberOfRowsForDMenorArm(numberOfRowsForDMenorArm - 3);
        }
        setShowMoreDetailsForDMenorArm(!showMoreDetailsForDMenorArm);
    }

    const moreOptionsForEMenorArm = () => {
        if (!showMoreDetailsForEMenorArm) {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm + 1);
            setNumberOfRowsForEMenorArm(numberOfRowsForEMenorArm + 1);
        } else {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm - 1);
            setNumberOfRowsForEMenorArm(numberOfRowsForEMenorArm - 1);
        }
        setShowMoreDetailsForEMenorArm(!showMoreDetailsForEMenorArm);
    }

    const moreOptionsForFMenorArm = () => {
        if (!showMoreDetailsForFMenorArm) {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm + 1);
            setNumberOfRowsForFMenorArm(numberOfRowsForFMenorArm + 1);
        } else {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm - 1);
            setNumberOfRowsForFMenorArm(numberOfRowsForFMenorArm - 1);
        }
        setShowMoreDetailsForFMenorArm(!showMoreDetailsForFMenorArm);
    }

    const moreOptionsForAMenorArm = () => {
        if (!showMoreDetailsForAMenorArm) {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm + 2);
            setNumberOfRowsForAMenorArm(numberOfRowsForAMenorArm + 2);
        } else {
            setNumberOfRowsForEscalaMenorArm(numberOfRowsForEscalaMenorArm - 2);
            setNumberOfRowsForAMenorArm(numberOfRowsForAMenorArm - 2);
        }
        setShowMoreDetailsForAMenorArm(!showMoreDetailsForAMenorArm);
    }

    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const moreOptionsForCMenorMel = () => {
        if (!showMoreDetailsForCMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 4);
            setNumberOfRowsForCMenorMel(numberOfRowsForCMenorMel + 4);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 4);
            setNumberOfRowsForCMenorMel(numberOfRowsForCMenorMel - 4);
        }
        setShowMoreDetailsForCMenorMel(!showMoreDetailsForCMenorMel);
    }

    const moreOptionsForDMenorMel = () => {
        if (!showMoreDetailsForDMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 2);
            setNumberOfRowsForDMenorMel(numberOfRowsForDMenorMel + 2);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 2);
            setNumberOfRowsForDMenorMel(numberOfRowsForDMenorMel - 2);
        }
        setShowMoreDetailsForDMenorMel(!showMoreDetailsForDMenorMel);
    }

    const moreOptionsForEbMenorMel = () => {
        if (!showMoreDetailsForEbMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 0);
            setNumberOfRowsForEbMenorMel(numberOfRowsForEbMenorMel + 0);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 0);
            setNumberOfRowsForEbMenorMel(numberOfRowsForEbMenorMel - 0);
        }
        setShowMoreDetailsForEbMenorMel(!showMoreDetailsForEbMenorMel);
    }

    const moreOptionsForFMenorMel = () => {
        if (!showMoreDetailsForFMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 3);
            setNumberOfRowsForFMenorMel(numberOfRowsForFMenorMel + 3);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 3);
            setNumberOfRowsForFMenorMel(numberOfRowsForFMenorMel - 3);
        }
        setShowMoreDetailsForFMenorMel(!showMoreDetailsForFMenorMel);
    }

    const moreOptionsForGMenorMel = () => {
        if (!showMoreDetailsForGMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 2);
            setNumberOfRowsForGMenorMel(numberOfRowsForGMenorMel + 2);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 2);
            setNumberOfRowsForGMenorMel(numberOfRowsForGMenorMel - 2);
        }
        setShowMoreDetailsForGMenorMel(!showMoreDetailsForGMenorMel);
    }

    const moreOptionsForAMenorMel = () => {
        if (!showMoreDetailsForDMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 0);
            setNumberOfRowsForAMenorMel(numberOfRowsForAMenorMel + 0);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 0);
            setNumberOfRowsForAMenorMel(numberOfRowsForAMenorMel - 0);
        }
        setShowMoreDetailsForAMenorMel(!showMoreDetailsForAMenorMel);
    }

    const moreOptionsForBMenorMel = () => {
        if (!showMoreDetailsForBMenorMel) {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel + 0);
            setNumberOfRowsForBMenorMel(numberOfRowsForBMenorMel + 0);
        } else {
            setNumberOfRowsForEscalaMenorMel(numberOfRowsForEscalaMenorMel - 0);
            setNumberOfRowsForBMenorMel(numberOfRowsForBMenorMel - 0);
        }
        setShowMoreDetailsForBMenorMel(!showMoreDetailsForBMenorMel);
    }

    
    // -----------------------------------------------------------------------
    // -----------------------------------------------------------------------

    const moreOptionsForDbOtros = () => {
        if (!showMoreDetailsForDbOtros) {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros + 3)
            setNumberOfRowsForDbOtros(numberOfRowsForDbOtros + 3)
        } else {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros - 3)
            setNumberOfRowsForDbOtros(numberOfRowsForDbOtros - 3)
        }
        setShowMoreDetailsForDbOtros(!showMoreDetailsForDbOtros);
    }

    const moreOptionsForAbOtros = () => {
        if (!showMoreDetailsForAbOtros) {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros + 3)
            setNumberOfRowsForAbOtros(numberOfRowsForAbOtros + 3)
        } else {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros - 3)
            setNumberOfRowsForAbOtros(numberOfRowsForAbOtros - 3)
        }
        setShowMoreDetailsForAbOtros(!showMoreDetailsForAbOtros);
    }

    const moreOptionsForGOtros = () => {
        if (!showMoreDetailsForGOtros) {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros + 1)
            setNumberOfRowsForGOtros(numberOfRowsForGOtros + 1)
        } else {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros - 1)
            setNumberOfRowsForGOtros(numberOfRowsForGOtros - 1)
        }
        setShowMoreDetailsForGOtros(!showMoreDetailsForGOtros);
    }

    const moreOptionsForCOtros = () => {
        if (!showMoreDetailsForC) {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros + 5);
            setNumberOfRowsForC(numberOfRowsForC + 5);
        } else {
            setNumberOfRowsForEscalaOtros(numberOfRowsForEscalaOtros - 5);
            setNumberOfRowsForC(numberOfRowsForC - 5);
        }
        setShowMoreDetailsForC(!showMoreDetailsForC);
    }
    
    // {
    //     Escala: escalaCampoArmonico.mayor,
    //     EscalaPrioridad: 1,
    //     KeyNote: 'C',
    //     KeyNotePrioridad: 1,
    //     NombreCifrado: nombreCifrado_TetradaTriada.tetrada_Maj7,
    //     Tension:
    //         intervaloTensiones.novenaMayor +
    //         ', ' +
    //         intervaloTensiones.tercenaMayor,
    //     Tipo: acordeType.tetrada,
    //     CheckEscala: true,
    //     CheckKeyNote: true,
    //     CheckNombreCifrado: true,
    //     CheckTension: true,
    //     EstadosAcorde: 'estadoAcorde.fundamental, estadoAcorde.terceraInversion'
    // }

    // --------------------------------------------------
    // Handle table
    // --------------------------------------------------
    const isEscalaChecked = (escala) => {
        return dataCamposArmonicos.find(x => x.Escala == escala)?.CheckEscala;
    }

    const isAcordeChecked = (escala, acorde) => {
        return dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde)?.CheckKeyNote;
    }

    const isTetradaChecked = (escala, acorde, tetrada) => {
        return dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tipo == acordeType.tetrada)?.CheckNombreCifrado;
    }

    const isTriadaChecked = (escala, acorde, triada) => {
        return dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tipo == acordeType.triada)?.CheckNombreCifrado;
    }

    const isTensionTetradaChecked = (escala, acorde, tetrada, tension) => {
        return dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tension == tension && x.Tipo == acordeType.tetrada)?.CheckTension;
    }

    const isTensionTriadaChecked = (escala, acorde, triada, tension) => {
        return dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tension == tension && x.Tipo == acordeType.triada)?.CheckTension;
    }

    const existAcordeSelected = (data, escala) => {
        return data.find(x => x.Escala == escala && x.CheckKeyNote) != null;
    }

    const existTetradaTriadaSelected = (data, escala, acorde) => {
        return data.find(x => x.Escala == escala && x.KeyNote == acorde && x.CheckNombreCifrado) != null;
    }

    const selectTensionTriada = (escala, acorde, triada, tension) => {
        const tensiones = getDifferentsTensiones(tension);

        const specificTensions = dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tipo == acordeType.triada)?.SpecificTensions;

        let listOptionsAux = []
        tensiones.forEach(tension => {
            listOptionsAux.push({
                tension: tension,
                selected: specificTensions.indexOf(tension) > -1
            })
        });

        setListOptionsTensiones(listOptionsAux)
        setEscalaForSpecificTensions(escala)
        setAcordeForSpecificTensions(acorde)
        setTriadaForSpecificTensions(triada)
        setTensionForSpecificTensions(tension)
        setIsTetradaForSpecificTensions(false)

        refRBSheet_AcordeTensiones.current.open();
    }

    const selectSpecificTensionTriada = (escala, acorde, triada, tension, specificsTensions) => {
        // const checkTension = !dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tension == tension && x.Tipo == acordeType.triada)?.CheckTension;
        const checkTension = specificsTensions.findIndex(x => x.selected) > -1
        const specificTensionsForDataCamposArmonicos = specificsTensions.filter(x => x.selected).map(x => x.tension)

        let result = dataCamposArmonicos;
        result =
            result.map((x) => {
                if (x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tension == tension && x.Tipo == acordeType.triada) {
                    return {
                        ...x,
                        CheckTension: checkTension,
                        CheckNombreCifrado: checkTension ? true : x.CheckNombreCifrado,
                        SpecificTensions: specificTensionsForDataCamposArmonicos,
                    }
                } else {
                    return x;
                }
            });

        // if there are triada selected then CheckKeyNote = true
        // if there are not triada selected then CheckKeyNote = false
        result = result.map((x) => {
            if (x.Escala == escala && x.KeyNote == acorde) {
                return {
                    ...x,
                    CheckKeyNote: existTetradaTriadaSelected(result, escala, acorde),
                };
            } else {
                return x;
            }
        });
     
        // if there are acorde selected then ChecEscala = true
        // if there are not acorde selected then CheckEscala = false
        result = result.map((x) => {
            if (x.Escala == escala) {
                return {
                    ...x,
                    CheckEscala: existAcordeSelected(result, escala),
                };
            } else {
                return x;
            }
        });

        setDataCamposArmonicos(result);
    }

    const getDifferentsTensiones = (tensiones) => {
        if (tensiones == '') {
            return [];
        }
    
        let tensionesStr = tensiones.replace('add','');

        tensionesStr = tensionesStr.split(' ').join('');
    
        return tensionesStr.split(',');
    }

    const selectTensionTetrada = (escala, acorde, tetrada, tension) => {
        const tensiones = getDifferentsTensiones(tension);

        const specificTensions = dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tipo == acordeType.tetrada)?.SpecificTensions;

        let listOptionsAux = []
        tensiones.forEach(tension => {
            listOptionsAux.push({
                tension: tension,
                selected: specificTensions.indexOf(tension) > -1
            })
        });

        setListOptionsTensiones(listOptionsAux)
        setEscalaForSpecificTensions(escala)
        setAcordeForSpecificTensions(acorde)
        setTetradaForSpecificTensions(tetrada)
        setTensionForSpecificTensions(tension)
        setIsTetradaForSpecificTensions(true)

        refRBSheet_AcordeTensiones.current.open();
    }

    const selectSpecificTensionTetrada = (escala, acorde, tetrada, tension, specificsTensions) => {
        // const checkTension = !dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tension == tension && x.Tipo == acordeType.tetrada)?.CheckTension;
        const checkTension = specificsTensions.findIndex(x => x.selected) > -1
        const specificTensionsForDataCamposArmonicos = specificsTensions.filter(x => x.selected).map(x => x.tension)

        let result = dataCamposArmonicos;

        result =
            result.map((x) => {
                if (x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tension == tension && x.Tipo == acordeType.tetrada) {
                    return {
                        ...x,
                        CheckTension: checkTension,
                        CheckNombreCifrado: checkTension ? true : x.CheckNombreCifrado,
                        SpecificTensions: specificTensionsForDataCamposArmonicos,
                    }
                } else {
                    return x;
                }
            });

        // if there are tetrada selected then CheckKeyNote = true
        // if there are not tetrada selected then CheckKeyNote = false
        result = result.map((x) => {
            if (x.Escala == escala && x.KeyNote == acorde) {
                return {
                    ...x,
                    CheckKeyNote: existTetradaTriadaSelected(result, escala, acorde),
                };
            } else {
                return x;
            }
        });

        // if there are acorde selected then ChecEscala = true
        // if there are not acorde selected then CheckEscala = false
        result = result.map((x) => {
            if (x.Escala == escala) {
                return {
                    ...x,
                    CheckEscala: existAcordeSelected(result, escala),
                };
            } else {
                return x;
            }
        });

        setDataCamposArmonicos(result);
    }

    const selectTriada = (escala, acorde, triada) => {
        const checkTriada = !dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tipo == acordeType.triada)?.CheckNombreCifrado;
        let result = dataCamposArmonicos;
        result =
            dataCamposArmonicos.map((x) => {
                if (x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == triada && x.Tipo == acordeType.triada) {
                    if (checkTriada) {
                        return {
                            ...x,
                            CheckNombreCifrado: checkTriada,
                        };
                    } else {
                        return {
                            ...x,
                            CheckNombreCifrado: checkTriada,
                            CheckTension: checkTriada,
                        };
                    }
                } else {
                    return x;
                }
            })

        // if there are triada selected then CheckKeyNote = true
        // if there are not triada selected then CheckKeyNote = false
        result = result.map((x) => {
            if (x.Escala == escala && x.KeyNote == acorde) {
                return {
                    ...x,
                    CheckKeyNote: existTetradaTriadaSelected(result, escala, acorde),
                };
            } else {
                return x;
            }
        });
     
        // if there are acorde selected then ChecEscala = true
        // if there are not acorde selected then CheckEscala = false
        result = result.map((x) => {
            if (x.Escala == escala) {
                return {
                    ...x,
                    CheckEscala: existAcordeSelected(result, escala),
                };
            } else {
                return x;
            }
        });

        setDataCamposArmonicos(result);
    }

    const selectTetrada = (escala, acorde, tetrada) => {
        const checkTetrada = !dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tipo == acordeType.tetrada)?.CheckNombreCifrado;
        let result = dataCamposArmonicos;
        result =
            result.map((x) => {
                if (x.Escala == escala && x.KeyNote == acorde && x.NombreCifrado == tetrada && x.Tipo == acordeType.tetrada) {
                    if (checkTetrada) {
                        return {
                            ...x,
                            CheckNombreCifrado: checkTetrada,
                        };
                    } else {
                        return {
                            ...x,
                            CheckNombreCifrado: checkTetrada,
                            CheckTension: checkTetrada,
                        };
                    }
                } else {
                    return x;
                }
            });

        // if there are tetrada selected then CheckKeyNote = true
        // if there are not tetrada selected then CheckKeyNote = false
        result = result.map((x) => {
            if (x.Escala == escala && x.KeyNote == acorde) {
                return {
                    ...x,
                    CheckKeyNote: existTetradaTriadaSelected(result, escala, acorde),
                };
            } else {
                return x;
            }
        });

        // if there are acorde selected then ChecEscala = true
        // if there are not acorde selected then CheckEscala = false
        result = result.map((x) => {
            if (x.Escala == escala) {
                return {
                    ...x,
                    CheckEscala: existAcordeSelected(result, escala),
                };
            } else {
                return x;
            }
        });

        setDataCamposArmonicos(result);
    }

    const selectAcorde = (escala, acorde) => {
        const checkAcorde = !dataCamposArmonicos.find(x => x.Escala == escala && x.KeyNote == acorde)?.CheckKeyNote;
        let result = dataCamposArmonicos;
        if (!checkAcorde) {
            result =
                result.map((x) => {
                    if (x.Escala == escala && x.KeyNote == acorde) {
                        return {
                            ...x,
                            CheckKeyNote: checkAcorde,
                            CheckNombreCifrado: checkAcorde,
                            CheckTension: checkAcorde,
                        }
                    } else {
                        return x;
                    }
                });
        } else {
            result =
                result.map((x) => {
                    if (x.Escala == escala && x.KeyNote == acorde && x.ByDefault) {
                        return {
                            ...x,
                            CheckKeyNote: true,
                            CheckNombreCifrado: true,
                            CheckTension: true,
                        }
                    } else {
                        return x;
                    }
                })
        }

        // if there are acorde selected then ChecEscala = true
        // if there are not acorde selected then CheckEscala = false
        result = result.map((x) => {
            if (x.Escala == escala) {
                return {
                    ...x,
                    CheckEscala: existAcordeSelected(result, escala),
                };
            } else {
                return x;
            }
        });

        setDataCamposArmonicos(result);
    }

    const selectEscala = async (escala) => {
        const checkEscala = !dataCamposArmonicos.find((x) => x.Escala == escala)?.CheckEscala;
        if (!checkEscala) {
            await setDataCamposArmonicos(
                dataCamposArmonicos.map((x) => {
                    if (x.Escala == escala) {
                        return { 
                            ...x, 
                            CheckEscala: checkEscala,
                            CheckKeyNote: checkEscala,
                            CheckNombreCifrado: checkEscala,
                            CheckTension: checkEscala,
                        };
                    } else {
                        return x;
                    }
                })
            );
        } else {
            await setDataCamposArmonicos(
                dataCamposArmonicos.map((x) => {
                    if (x.Escala == escala && x.ByDefault) {
                        return {
                            ...x, 
                                CheckEscala: true,
                                CheckKeyNote: true,
                                CheckNombreCifrado: true,
                                CheckTension: true,
                        }
                    } else {
                        return x;
                    }
                })
            )
        }
    };

    // --------------------------------------------------
    // --------------------------------------------------

    const saveConfig = () => {
        setCamposArmonicosToSend(dataCamposArmonicos);
        navigation.goBack();
        Alert.alert('Configuración de campos armónicos guardada con éxito.');
    }

    const getRealKeyNote = (escala, keyNote) => {
        const realKeyNote = dataCamposArmonicos.find((x) => x.Escala == escala && x.KeyNote == keyNote).RealKeyNote;
        let result = ''
        if (realKeyNote.includes('b')) result = result + 'b'
        if (realKeyNote.includes('#')) result = result + '#'

        if (realKeyNote.includes('C')) {
            result = result + 'I'
        } else if (realKeyNote.includes('D')) {
            result = result + 'II'
        } else if (realKeyNote.includes('E')) {
            result = result + 'III'
        } else if (realKeyNote.includes('F')) {
            result = result + 'IV'
        } else if (realKeyNote.includes('G')) {
            result = result + 'V'
        } else if (realKeyNote.includes('A')) {
            result = result + 'VI'
        } else if (realKeyNote.includes('B')) {
            result = result + 'VII'
        }

        return result
    }

    return (
        <>
            <View style={styles.generalContainer}>
                <ScrollView>
                    <View style={styles.contentTextPrioridad}>
                        <Text style={styles.textPrioridad}>
                            Mantenga presionado las celdas con el ícono{<Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    iconStyle={styles.keepPressIcon}
                                />}para ver mas opciones.
                        </Text>
                    </View>
                    {tonalidadCompasArmonico == 'mayor' && (
                        <>
                            {/* HEADER */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Escala</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                                    <Text style={{fontSize: 13}}>Fundamental</Text>
                                </View>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Tétrada</Text>
                                </View>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Tensión</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                                    <Text>Tríada</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                                    <Text>Tensión</Text>
                                </View>
                            </View>
                            {/* // ---------------------------------------
                            // ESCALA MAYOR
                            // --------------------------------------- */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectEscala(escalaCampoArmonico.mayor)}
                                        onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.mayor)}
                                        style={[styles.containerItemTable, {height: 350 + (50 * numberOfRowsForEscala)}, isEscalaChecked(escalaCampoArmonico.mayor) && styles.itemSelected]}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text style={styles.textItemTable}>{escalaCampoArmonico.mayor}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* ACORDES */}
                                <View style={styles.viewContainerItemTableAcorde}>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'C')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForC)}, isAcordeChecked(escalaCampoArmonico.mayor, 'C') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'C')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'D')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForD)}, isAcordeChecked(escalaCampoArmonico.mayor, 'D') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('D', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'D')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'E')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForE)}, isAcordeChecked(escalaCampoArmonico.mayor, 'E') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('E', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'E')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'F')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForF)}, isAcordeChecked(escalaCampoArmonico.mayor, 'F') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('F', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'F')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'G')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForG)}, isAcordeChecked(escalaCampoArmonico.mayor, 'G') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('G', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'G')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'A')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForA)}, isAcordeChecked(escalaCampoArmonico.mayor, 'A') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('A', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'A')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'B')}
                                        style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.mayor, 'B') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('B', escalaCampoArmonico.mayor)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'B')}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TÉTRADAS */}
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for D */}
                                    <View style={!showMoreDetailsForD && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_m7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for E */}
                                    <View style={!showMoreDetailsForE && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForF && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity   
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForG && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_m7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for A */}
                                    <View style={!showMoreDetailsForA && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TENSIONES */}
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for D */}
                                    <View style={!showMoreDetailsForD && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for E */}
                                    <View style={!showMoreDetailsForE && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForF && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForG && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for A */}
                                    <View style={!showMoreDetailsForA && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaJusta)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta + ', ' + intervaloTensiones.tercenaMenor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}, {intervaloTensiones.tercenaMenor}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TRÍADAS */}
                                <View style={styles.viewContainerItemTableTriadas}>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_Menor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for D */}
                                    <View style={!showMoreDetailsForD && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_Menor)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for E */}
                                    <View style={!showMoreDetailsForE && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForF && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForF && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForF && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForG && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_Menor)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for A */}
                                    <View style={!showMoreDetailsForA && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TENSIONES */}
                                <View style={styles.viewContainerItemTableTensionesTriadas}>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for D */}
                                    <View style={!showMoreDetailsForD && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForD && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'D', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for E */}
                                    <View style={!showMoreDetailsForE && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_sus4, '')}
                                            style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'E', nombreCifrado_TetradaTriada.triada_sus4, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                        style={[styles.containerItemsTable, showMoreDetailsForF && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForF && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, showMoreDetailsForF && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForG && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForG && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    {/* More options for A */}
                                    <View style={!showMoreDetailsForA && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'A', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor)}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMenor}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                    {tonalidadCompasArmonico == 'mayor' && (
                        <>
                            {/* HEADER */}
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Escala</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                                    <Text style={{fontSize: 13}}>Fundamental</Text>
                                </View>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Tétrada</Text>
                                </View>
                                <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                                    <Text>Tensión</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                                    <Text>Tríada</Text>
                                </View>
                                <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                                    <Text>Tensión</Text>
                                </View>
                            </View>
                            {/* // ---------------------------------------
                            // ESCALA MAYOR ARMÓNICA
                            // --------------------------------------- */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectEscala(escalaCampoArmonico.mayorArmonica)}
                                        onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.mayorArmonica)}
                                        style={[styles.containerItemTable, {height: 350 + (50 * numberOfRowsForEscalaMayorArm)}, isEscalaChecked(escalaCampoArmonico.mayorArmonica) && styles.itemSelected]}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text style={styles.textItemTable}>{escalaCampoArmonico.mayorArmonica}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* ACORDES */}
                                <View style={styles.viewContainerItemTableAcorde}>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'C')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForCMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'C') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'C')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'D')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForDMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'D') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('D', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'D')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'E')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForEMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'E') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('E', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'E')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'F')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForFMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'F') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('F', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'F')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'G')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForGMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'G') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('G', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'G')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'Ab')}
                                        style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForAbMayorArm)}, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'Ab') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('Ab', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'Ab')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectAcorde(escalaCampoArmonico.mayorArmonica, 'B')}
                                        style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.mayorArmonica, 'B') && styles.itemSelected]}
                                        onLongPress={() => showBottomSheetAcorde('B', escalaCampoArmonico.mayorArmonica)}
                                        delayLongPress={DELAY_LONG_PRESS}
                                    >
                                        <Icon
                                            type="material-community"
                                            name="gesture-tap"
                                            containerStyle={styles.keepPressContainerIcon}
                                            iconStyle={styles.keepPressIcon}
                                        />
                                        <Text>{getRealKeyNote(escalaCampoArmonico.mayorArmonica, 'B')}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TÉTRADAS */}
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForCMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_m7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_mMaj7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForFMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_mMaj7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity   
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForGMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.tetrada_AugMaj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.tetrada_AugMaj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_AugMaj7}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_07)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_07) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_07}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TENSIONES */}
                                <View style={styles.viewContainerItemTable}>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForCMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_m7, '')}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_m7, '') && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada ) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForFMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6sus2, intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7sus2, intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_mMaj7sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.tercenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForGMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMenor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMenor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMenor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMenor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_07, intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_07, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TRÍADAS */}
                                <View style={styles.viewContainerItemTableTriadas}>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForCMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                        style={[styles.containerItemsTable, showMoreDetailsForDMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Menor)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Menor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForFMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForFMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForFMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForGMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForGMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForGMayorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.triada_Aumentado)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.triada_Aumentado) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Aumentado}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                        style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* TENSIONES */}
                                <View style={styles.viewContainerItemTableTensionesTriadas}>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForCMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForCMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, showMoreDetailsForDMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Menor, '')}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Menor, '') && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                        style={[styles.containerItemsTable, showMoreDetailsForFMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                    </TouchableOpacity>
                                    {/* More options for F */}
                                    <View style={!showMoreDetailsForFMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                            style={[styles.containerItemsTable, showMoreDetailsForFMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMenor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForGMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMenor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMenor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for G */}
                                    <View style={!showMoreDetailsForGMayorArm && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMenor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForGMayorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMenor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMenor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada)}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'Ab', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.oncenaJusta)}
                                        style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.mayorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                    {/* // ---------------------------------------
                    // ESCALA MENOR NATURAL
                    // --------------------------------------- */}
                    {/* HEADER */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Escala</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                            <Text style={{fontSize: 13}}>Fundamental</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tétrada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tríada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectEscala(escalaCampoArmonico.menorNatural)}
                                onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.menorNatural)}
                                style={[styles.containerItemTable, {height: 350 + (50 * numberOfRowsForEscalaMenorNat)}, isEscalaChecked(escalaCampoArmonico.menorNatural) && styles.itemSelected]}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text style={styles.textItemTable}>{escalaCampoArmonico.menorNatural}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ACORDES */}
                        <View style={styles.viewContainerItemTableAcorde}>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'C')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForCMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'C') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'C')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'D')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.menorNatural, 'D') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('D', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'D')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'Eb')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForEbMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'Eb') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Eb', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'Eb')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'F')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForFMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'F') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('F', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'F')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'G')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForGMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'G') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'G')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'Ab')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForAbMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'Ab') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Ab', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'Ab')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorNatural, 'Bb')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForBbMenorNat)}, isAcordeChecked(escalaCampoArmonico.menorNatural, 'Bb') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Bb', escalaCampoArmonico.menorNatural)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorNatural, 'Bb')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TÉTRADAS */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_m7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                            </TouchableOpacity>
                            {/* More options for Eb */}
                            <View style={!showMoreDetailsForEbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_m7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity   
                                onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>
                            {/* More options for Bb */}
                            <View style={!showMoreDetailsForBbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta + ', ' + intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}, {intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Eb */}
                            <View style={!showMoreDetailsForEbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Bb */}
                            <View style={!showMoreDetailsForBbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TRÍADAS */}
                        <View style={styles.viewContainerItemTableTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Eb */}
                            <View style={!showMoreDetailsForEbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForAbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForAbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Bb */}
                            <View style={!showMoreDetailsForBbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTableTensionesTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'D', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Eb */}
                            <View style={!showMoreDetailsForEbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                    style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, showMoreDetailsForEbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Eb', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'F', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_sus4, '')}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'G', nombreCifrado_TetradaTriada.triada_sus4, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForAbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, showMoreDetailsForAbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Ab', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Bb */}
                            <View style={!showMoreDetailsForBbMenorNat && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                    style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, showMoreDetailsForBbMenorNat && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorNatural, 'Bb', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* // ---------------------------------------
                    // ESCALA MENOR ARMÓNICA
                    // --------------------------------------- */}
                    {/* HEADER */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Escala</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                            <Text style={{fontSize: 13}}>Fundamental</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tétrada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tríada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectEscala(escalaCampoArmonico.menorArmonica)}
                                onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.menorArmonica)}
                                style={[styles.containerItemTable, {height: 350 + (50 * numberOfRowsForEscalaMenorArm)}, isEscalaChecked(escalaCampoArmonico.menorArmonica) && styles.itemSelected]}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text style={styles.textItemTable}>{escalaCampoArmonico.menorArmonica}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ACORDES */}
                        <View style={styles.viewContainerItemTableAcorde}>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'A')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForAMenorArm)}, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'A') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('A', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'A')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'B')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'B') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('B', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'B')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'C')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'C') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'C')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'D')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForDMenorArm)}, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'D') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('D', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'D')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'E')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForEMenorArm)}, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'E') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('E', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'E')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'F')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForFMenorArm)}, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'F') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('F', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'F')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorArmonica, 'G#')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.menorArmonica, 'G#') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G#', escalaCampoArmonico.menorArmonica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorArmonica, 'G#')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TÉTRADAS */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_mMaj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_mMaj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_mMaj7}</Text>
                            </TouchableOpacity>
                            {/* More options for A */}
                            <View style={!showMoreDetailsForAMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_AugMaj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_AugMaj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_AugMaj7}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>
                            {/* More options for E */}
                            <View style={!showMoreDetailsForEMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity   
                                onPress={() => selectTetrada(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.tetrada_07)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.tetrada_07) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_07}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for A */}
                            <View style={!showMoreDetailsForAMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                            {/* More options for E */}
                            <View style={!showMoreDetailsForEMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.tercenaMenor}</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.tetrada_07, intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.tetrada_07, intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TRÍADAS */}
                        <View style={styles.viewContainerItemTableTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for A */}
                            <View style={!showMoreDetailsForAMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Aumentado)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Aumentado) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Aumentado}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, showMoreDetailsForDMenorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForDMenorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for E */}
                            <View style={!showMoreDetailsForEMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorArm && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTableTensionesTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for A */}
                            <View style={!showMoreDetailsForAMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'A', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaMayor)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'C', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForDMenorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, showMoreDetailsForDMenorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'D', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMenor)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMenor}</Text>
                            </TouchableOpacity>
                            {/* More options for E */}
                            <View style={!showMoreDetailsForEMenorArm && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor)}
                                    style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'E', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMenor}, {intervaloTensiones.tercenaMenor}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorArm && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.triada_Disminuido, '')}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorArmonica, 'G#', nombreCifrado_TetradaTriada.triada_Disminuido, '') && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>ninguna</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* HEADER */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Escala</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                            <Text style={{fontSize: 13}}>Fundamental</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tétrada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tríada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                    </View>
                    {/* // ---------------------------------------
                    // ESCALA MENOR MELÓDICA
                    // --------------------------------------- */}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectEscala(escalaCampoArmonico.menorMelodica)}
                                onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.menorMelodica)}
                                style={[styles.containerItemTable, {height: 350 + (50 * numberOfRowsForEscalaMenorMel)}, isEscalaChecked(escalaCampoArmonico.menorMelodica) && styles.itemSelected]}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text style={styles.textItemTable}>{escalaCampoArmonico.menorMelodica}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ACORDES */}
                        <View style={styles.viewContainerItemTableAcorde}>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'C')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForCMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'C') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'C')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'D')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForDMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'D') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('D', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'D')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'Eb')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForEbMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'Eb') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Eb', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'Eb')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'F')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForFMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'F') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('F', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'F')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'G')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForGMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'G') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'G')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'A')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForAMenorMel)}, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'A') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('A', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'A')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.menorMelodica, 'B')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.menorMelodica, 'B') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('B', escalaCampoArmonico.menorMelodica)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text>{getRealKeyNote(escalaCampoArmonico.menorMelodica, 'B')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TÉTRADAS */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_mMaj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_mMaj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_mMaj7}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_m6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m6}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.tetrada_AugMaj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.tetrada_AugMaj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_AugMaj7}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity   
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_m7b5}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_mMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m7, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_m6, intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.tetrada_6sus4, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.tetrada_AugMaj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2, '')}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus2, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>ningujna</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.tetrada_7sus4, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMenor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.tetrada_m7b5, intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TRÍADAS */}
                        <View style={styles.viewContainerItemTableTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, showMoreDetailsForCMenorMel && {height: 84}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForCMenorMel&& {height: 84}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForCMenorMel && {height: 83}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_Menor)}
                                style={[styles.containerItemsTable, showMoreDetailsForDMenorMel && {height: 75}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_Menor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Menor}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForDMenorMel && {height: 75}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.triada_Aumentado)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.triada_Aumentado) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Aumentado}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorMel && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorMel && {height: 100}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForGMenorMel && {height: 75}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_sus4)}
                                    style={[styles.containerItemsTable, showMoreDetailsForGMenorMel && {height: 75}, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido)}
                                style={[styles.containerItemsTable, isTriadaChecked(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Disminuido}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTableTensionesTriadas}>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, showMoreDetailsForCMenorMel && {height: 84}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for C */}
                            <View style={!showMoreDetailsForCMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaJusta)}
                                    style={[styles.containerItemsTable, showMoreDetailsForCMenorMel && {height: 84}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                    style={[styles.containerItemsTable, showMoreDetailsForCMenorMel && {height: 83}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, showMoreDetailsForDMenorMel && {height: 75}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_Menor, 'add ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            {/* More options for D */}
                            <View style={!showMoreDetailsForDMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_sus4, '')}
                                    style={[styles.containerItemsTable, showMoreDetailsForDMenorMel && {height: 75}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'D', nombreCifrado_TetradaTriada.triada_sus4, '') && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'Eb', nombreCifrado_TetradaTriada.triada_Aumentado, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForFMenorMel && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            {/* More options for F */}
                            <View style={!showMoreDetailsForFMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, showMoreDetailsForFMenorMel && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'F', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForGMenorMel && {height: 75}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGMenorMel && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor)}
                                    style={[styles.containerItemsTable, showMoreDetailsForGMenorMel && {height: 75}, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'G', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMenor}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta)}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'A', nombreCifrado_TetradaTriada.triada_Disminuido, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaJusta) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaJusta}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, '')}
                                style={[styles.containerItemsTable, isTensionTriadaChecked(escalaCampoArmonico.menorMelodica, 'B', nombreCifrado_TetradaTriada.triada_Disminuido, '') && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>ninguna</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* // ---------------------------------------
                    // ESCALA OTROS
                    // --------------------------------------- */}
                    {/* HEADER */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Escala</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableAcorde, styles.viewContainerItemTableHeader]}>
                            <Text style={{fontSize: 13}}>Fundamental</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tétrada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTable, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tríada</Text>
                        </View>
                        <View style={[styles.viewContainerItemTableTensionesTriadas, styles.viewContainerItemTableHeader]}>
                            <Text>Tensión</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.viewContainerItemTable}>
                            <TouchableOpacity 
                                onPress={() => selectEscala(escalaCampoArmonico.otros)}
                                onLongPress={() => showBottomSheetEscala(escalaCampoArmonico.otros)}
                                style={[styles.containerItemTable, {height: (tonalidadCompasArmonico == 'menor' ? 300 : 250) + (50 * numberOfRowsForEscalaOtros)}, isEscalaChecked(escalaCampoArmonico.otros) && styles.itemSelected]}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                <Text style={styles.textItemTable}>{escalaCampoArmonico.otros}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* ACORDES */}
                        <View style={styles.viewContainerItemTableAcorde}>
                            {tonalidadCompasArmonico == 'menor' && (
                                // ESCALA MAYOR
                                <TouchableOpacity 
                                    onPress={() => selectAcorde(escalaCampoArmonico.mayor, 'C')}
                                    style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForC)}, isAcordeChecked(escalaCampoArmonico.mayor, 'C') && styles.itemSelected]}
                                    onLongPress={() => showBottomSheetAcorde('C', escalaCampoArmonico.mayor)}
                                    delayLongPress={DELAY_LONG_PRESS}
                                >
                                    <Icon
                                        type="material-community"
                                        name="gesture-tap"
                                        containerStyle={styles.keepPressContainerIcon}
                                        iconStyle={styles.keepPressIcon}
                                    />
                                    <Text>{getRealKeyNote(escalaCampoArmonico.mayor, 'C')}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.otros, 'G')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForGOtros)}, isAcordeChecked(escalaCampoArmonico.otros, 'G') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G', escalaCampoArmonico.otros)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                {/* <Text>G</Text> */}
                                <Text>V</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.otros, 'G2')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.otros, 'G2') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G2', escalaCampoArmonico.otros)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                {/* <Text>G</Text> */}
                                <Text>V</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.otros, 'G3')}
                                style={[styles.containerItemsTable, isAcordeChecked(escalaCampoArmonico.otros, 'G3') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('G3', escalaCampoArmonico.otros)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                {/* <Text>G</Text> */}
                                <Text>V</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.otros, 'Ab')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForAbOtros)}, isAcordeChecked(escalaCampoArmonico.otros, 'Ab') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Ab', escalaCampoArmonico.otros)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                {/* <Text>Ab</Text> */}
                                <Text>bVI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => selectAcorde(escalaCampoArmonico.otros, 'Db')}
                                style={[styles.containerItemsTable, {height: 50 + (50 * numberOfRowsForDbOtros)}, isAcordeChecked(escalaCampoArmonico.otros, 'Db') && styles.itemSelected]}
                                onLongPress={() => showBottomSheetAcorde('Db', escalaCampoArmonico.otros)}
                                delayLongPress={DELAY_LONG_PRESS}
                            >
                                <Icon
                                    type="material-community"
                                    name="gesture-tap"
                                    containerStyle={styles.keepPressContainerIcon}
                                    iconStyle={styles.keepPressIcon}
                                />
                                {/* <Text>Db</Text> */}
                                <Text>bII</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TÉTRADAS */}
                        <View style={styles.viewContainerItemTable}>
                            {tonalidadCompasArmonico == 'menor' && (
                                // ESCALA MAYOR
                                <>
                                    <TouchableOpacity 
                                        onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                        style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus4}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4)}
                                            style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_maj7sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7b5)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7b5) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7b5}</Text>
                            </TouchableOpacity>
                            {/* More options for G */}
                            <View style={!showMoreDetailsForGOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7hash5)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7hash5) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7hash5}</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.otros, 'G2', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'G2', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.otros, 'G3', nombreCifrado_TetradaTriada.tetrada_aug7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'G3', nombreCifrado_TetradaTriada.tetrada_aug7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_aug7}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_Maj7)}
                                style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_Maj7) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_Maj7}</Text>
                            </TouchableOpacity>
                            {/* More options for Db */}
                            <View style={!showMoreDetailsForDbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_7sus2)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_7sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_7sus2}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6)}
                                    style={[styles.containerItemsTable, isTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTetrada}>{nombreCifrado_TetradaTriada.tetrada_6}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTable}>
                            {tonalidadCompasArmonico == 'menor' && (
                                // ESCALA MAYOR
                                <>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor)}
                                        style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.tercenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2, '')}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus2, intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.tercenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_6sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTetrada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.tetrada_maj7sus4, intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7b5, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.tercenaMenor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7b5, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.tercenaMenor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.novenaAumentada}, {intervaloTensiones.tercenaMenor}</Text>
                            </TouchableOpacity>

                            <View style={!showMoreDetailsForGOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7hash5, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'G', nombreCifrado_TetradaTriada.tetrada_7hash5, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'G2', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'G2', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMenor + ', ' + intervaloTensiones.novenaAumentada + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMenor}, {intervaloTensiones.novenaAumentada}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'G3', nombreCifrado_TetradaTriada.tetrada_aug7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'G3', nombreCifrado_TetradaTriada.tetrada_aug7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_Maj7, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Db */}
                            <View style={!showMoreDetailsForDbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6sus2, intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_7sus2, intervaloTensiones.oncenaAumentada + ', ' + intervaloTensiones.tercenaMayor) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.oncenaAumentada}, {intervaloTensiones.tercenaMayor}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTetrada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, isTensionTetradaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.tetrada_6, intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensionesTetradas}>{intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TRÍADAS */}
                        <View style={styles.viewContainerItemTableTriadas}>
                            {tonalidadCompasArmonico == 'menor' && (
                                // ESCALA MAYOR
                                <>
                                    <TouchableOpacity 
                                        onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus4}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <View 
                                style={[styles.containerItemsTableNoButton, showMoreDetailsForGOtros && {height: 100}]}
                            >
                            </View>

                            <View 
                                style={[styles.containerItemsTableNoButton]}
                            >
                            </View>

                            <View 
                                style={[styles.containerItemsTableNoButton]}
                            >
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForAbOtros && {height: 100}, isTriadaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForAbOtros && {height: 100}, isTriadaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTriada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_Mayor)}
                                style={[styles.containerItemsTable, showMoreDetailsForDbOtros && {height: 100}, isTriadaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_Mayor) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_Mayor}</Text>
                            </TouchableOpacity>
                            {/* More options for Db */}
                            <View style={!showMoreDetailsForDbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTriada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_sus2)}
                                    style={[styles.containerItemsTable, showMoreDetailsForDbOtros && {height: 100}, isTriadaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_sus2) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTriadas}>{nombreCifrado_TetradaTriada.triada_sus2}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* TENSIONES */}
                        <View style={styles.viewContainerItemTableTensionesTriadas}>
                            {tonalidadCompasArmonico == 'menor' && (
                                // ESCALA MAYOR
                                <>
                                    <TouchableOpacity 
                                        onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor)}
                                        style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                    >
                                        <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                    </TouchableOpacity>
                                    {/* More options for C */}
                                    <View style={!showMoreDetailsForC && {display: 'none'}}>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2, '')}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus2, '') && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>ninguna</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress={() => selectTensionTriada(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor)}
                                            style={[styles.containerItemsTable, showMoreDetailsForC && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.mayor, 'C', nombreCifrado_TetradaTriada.triada_sus4, 'add ' + intervaloTensiones.novenaMayor) && styles.itemSelected]}
                                        >
                                            <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <View 
                                style={[styles.containerItemsTableNoButton, showMoreDetailsForGOtros && {height: 100}]}
                            >
                            </View>

                            <View 
                                style={[styles.containerItemsTableNoButton]}
                            >
                            </View>

                            <View 
                                style={[styles.containerItemsTableNoButton]}
                            >
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForAbOtros && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForAbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, showMoreDetailsForAbOtros && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.otros, 'Ab', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                onPress={() => selectTensionTriada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada)}
                                style={[styles.containerItemsTable, showMoreDetailsForDbOtros && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_Mayor, 'add ' + intervaloTensiones.novenaMayor + ', ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                            >
                                <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.novenaMayor}, {intervaloTensiones.oncenaAumentada}</Text>
                            </TouchableOpacity>
                            {/* More options for Ab */}
                            <View style={!showMoreDetailsForDbOtros && {display: 'none'}}>
                                <TouchableOpacity 
                                    onPress={() => selectTensionTriada(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada)}
                                    style={[styles.containerItemsTable, showMoreDetailsForDbOtros && {height: 100}, isTensionTriadaChecked(escalaCampoArmonico.otros, 'Db', nombreCifrado_TetradaTriada.triada_sus2, 'add ' + intervaloTensiones.oncenaAumentada) && styles.itemSelected]}
                                >
                                    <Text style={styles.textItemTableTensiones}>add {intervaloTensiones.oncenaAumentada}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>


                <View style={styles.containerButtonsSaveBack}>
                    <Button 
                        onPress={() => navigation.goBack()}
                        title={'<'} 
                        containerStyle={styles.containerButton} 
                        buttonStyle={styles.atrasGiroMelodicoButton}
                    />
                    <Button
                        onPress={() => saveConfig()}
                        title={'Guardar'}
                        containerStyle={styles.containerButton}
                        buttonStyle={styles.saveButton}
                    />
                </View>
            </View>

            <BottomSheetAcordeOptions 
                refRBSheet={refRBSheet_AcordeOptions}
                elem={elemForMoreOptions}
                moreOptions={moreOptions}
                priorityElem={priorityElem}
                setPriorityAcordeEscala={setPriorityAcordeEscala}
                typeElem={typeElem}
                estadosAcorde={estadosAcorde}
                setEstadoAcordeEscala={setEstadoAcordeEscala}
                hasMoreOptions={hasAcordeMoreOptions}
                escalaForMoreOptions={escalaForMoreOptions}
            />

            <BottomSheetAcordeTensiones
                refRBSheet={refRBSheet_AcordeTensiones}
                listOptionsTensiones={listOptionsTensiones}
                setListOptionsTensiones={setListOptionsTensiones}
                escalaForSpecificTensions={escalaForSpecificTensions}
                acordeForSpecificTensions={acordeForSpecificTensions}
                tetradaForSpecificTensions={tetradaForSpecificTensions}
                tensionForSpecificTensions={tensionForSpecificTensions}
                triadaForSpecificTensions={triadaForSpecificTensions}
                selectSpecificTensionTetrada={selectSpecificTensionTetrada}
                isTetradaForSpecificTensions={isTetradaForSpecificTensions}
                selectSpecificTensionTriada={selectSpecificTensionTriada}
            />
        </>
    );
}

const styles = StyleSheet.create({
    containerButtonsSaveBack: {
        flexDirection: 'row',
        width: '100%',
        bottom: 0,
    },
    containerButton: {
        width: '50%',
    },
    atrasGiroMelodicoButton: {
        backgroundColor: QUARTER_COLOR,
    },
    generalContainer: {
        height: '100%',
    },
    viewContainerItemTable: {
        width: '16.6%',
    },
    viewContainerItemTableAcorde: {
        width: '12.6%',
    },
    viewContainerItemTableTensionesTriadas: {
        width: '18.6%',
    },
    viewContainerItemTableTriadas: {
        width: '18.6%',
    },
    containerItemTable: {
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: FIFTH_COLOR
        // height: 350 + (50 * numberOfRowsForEscala),
        // marginTop: 3
    },
    containerItemsTable: {
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        height: 50,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: FIFTH_COLOR
    },
    containerItemsTableNoButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        height: 50,
    },
    textItemTable: {},
    textItemTableTetrada: {
        fontSize: 13,
    },
    textItemTableTensionesTetradas: {
        fontSize: 13,
    },
    textItemTableTriadas: {
        fontSize: 13,
    },
    textItemTableTensiones: {
        fontSize: 13,
    },
    itemSelected: {
        backgroundColor: BACKGROUND_COLOR_RIGHT,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_RIGHT,
        borderWidth: 3,
        borderRadius: 5,
        color: TEXT_COLOR_RIGHT,
    },
    keepPressContainerIcon: { 
        position: 'absolute', 
        top: 0, 
        right: 0 
    },
    keepPressIcon: {
        fontSize: 20,
        color: SECONDARY_COLOR
    },
    contentTextPrioridad: {
        marginHorizontal: 10,
        marginVertical: 15,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: PRIMARY_COLOR,
        backgroundColor: FIFTH_COLOR,
        padding: 10,
        borderRadius: 5,
    },
    textPrioridad: {
        fontSize: 17,
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    viewContainerItemTableHeader: {
        alignItems: 'center',
        marginBottom: 5
    }
});
