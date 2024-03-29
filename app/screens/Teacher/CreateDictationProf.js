import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import InfoGral from '../../components/CreateDictationProf/InfoGral';

import NavigationConfig from '../../components/CreateDictationProf/NavigationConfig';
import BottomSheetInfoGral from '../../components/CreateDictationProf/BottomSheetInfoGral';
import BottomSheetGiroMelodico from '../../components/CreateDictationProf/BottomSheetGiroMelodico';
import BottomSheetPicker from '../../components/CreateDictationProf/BottomSheetPicker';
import BottomSheetNoteStartEnd from '../../components/CreateDictationProf/BottomSheetNoteStartEnd';
import BottomSheetClave from '../../components/CreateDictationProf/BottomSheetClave';
import BottomSheetReference from '../../components/CreateDictationProf/BottomSheetReference';
import BottomSheetTonalidad from '../../components/CreateDictationProf/BottomSheetTonalidad';
import BottomSheetCompas from '../../components/CreateDictationProf/BottomSheetCompas';
import BottomSheetCelulaRitmica from '../../components/CreateDictationProf/BottomSheetCelulaRitmica';
import BottomSheetCreateCelulaRitmica from '../../components/CreateDictationProf/BottomSheetCreateCelulaRitmica';
import BottomSheetBPM from '../../components/CreateDictationProf/BottomSheetBPM';
import {
    atLeastOneClef,
    atLeastOneInterval,
    atLeastOneTonality,
    notesInNoteRule,
} from '../../../utils/validator';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import OverlayInfo from '../../components/CreateDictationProf/OverlayInfo';
import { generateDictationApi } from '../../api/user';
import {
    getStorageIsStudent,
    getStorageItem,
    ID_USER,
} from '../../../utils/asyncStorageManagement';
import { getCursoPersonal } from '../../api/course';
import BottomSheetLigadura from '../../components/CreateDictationProf/BottomSheetLigadura';
import Loading from '../../components/Loading';
import BottomSheetSearchConfigDictation from '../../components/CreateDictationProf/BottomSheetSearchConfigDictation';
import { GiroMelodico as BottomSheetAdminGiroMelodico } from '../../components/BottomSheetAdmin/GiroMelodico';
import ManageGirosMelodicosGrupos from '../../components/BottomSheetAdmin/ManageGirosMelodicosGrupos';
import { dictationType } from '../../../enums/dictationType';
import { generateAcordeJazzApi } from '../../api/acordes';
import { acordeType, escalaCampoArmonico, intervaloTensiones, nombreCifrado_TetradaTriada } from '../../../enums/camposArmonicosEnum';
import { estadoAcorde } from '../../../enums/estadoAcorde';
import BottomSheetInterval from '../../components/CreateIntervalProf/BottomSheetInterval';
import { tipoIntervalo } from '../../../enums/tipoIntervalo';
import { direccionIntervalo } from '../../../enums/direccionIntervalo';
import { generateIntervaloApi } from '../../api/intervalos';
import { referenciaReglaAcorde } from '../../../enums/referenciaReglaAcorde';
import { generateDictadoArmonicoApi } from '../../api/dictadosArmonicos';
import { funcionCampoArmonico } from '../../../enums/funcionCampoArmonico';

export default function CreateDictationProf({ route }) {
    var cleanAll = route.params ? route.params.cleanAll : false;

    const initializeDataCamposArmonicosToSend = () => {
        return [
            // ---------------------------------------
            // ESCALA MAYOR
            // ---------------------------------------
            // C
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar, 
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
                Tonicalizado: false,
            },
            // D
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante, 
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
                Tonicalizado: false,
            },
            // E
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            // F
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // A
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            // B
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // ---------------------------------------
            // ESCALA MAYOR ARMÓNICA
            // ---------------------------------------
            // C
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            // D
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // E
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaDominante,
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
                Tonicalizado: false,
            },
            // F
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // Ab
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // B
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // ---------------------------------------
            // ESCALA MENOR NATURAL
            // ---------------------------------------
            // Eb
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonica,
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
                Tonicalizado: false,
            },
            // F
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // Ab
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // Bb
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // C
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            // D
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // ---------------------------------------
            // ESCALA MENOR ARMÓNICA
            // ---------------------------------------
            // C
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // D
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // E
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // F
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // A
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            // B
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // ---------------------------------------
            // ESCALA MENOR MELÓDICA
            // ---------------------------------------
            // C
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.tonicaNoTonizar,
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
                Tonicalizado: false,
            },
            // D
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // Eb
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // F
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // A
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            // B
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominanteNoTonizar,
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
                Tonicalizado: false,
            },
            // ---------------------------------------
            // ESCALA OTROS
            // ---------------------------------------
            // G
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // G2
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // G3
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // A
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.dominante,
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
                Tonicalizado: false,
            },
            // Db
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
            {
                Nivel: 0,
                From: '', 
                Funcion: funcionCampoArmonico.subdominante,
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
                Tonicalizado: false,
            },
        ];
    }

    const initializeDataCamposArmonicosToSendREFERENCIA = (ton) => {
        let dataRef = initializeDataCamposArmonicosToSend();
        dataRef = dataRef.map((x) => {
            return {
                ...x,
                CheckEscala: false,
                CheckKeyNote: false,
                CheckNombreCifrado: false,
                CheckTension: false,
                SpecificTensions: [],
            }
        })

        if (ton == 'mayor') {
            dataRef = dataRef.map((x) => {
                if (
                    x.Escala == escalaCampoArmonico.mayor
                    && x.KeyNote == 'C'
                    && x.NombreCifrado == nombreCifrado_TetradaTriada.triada_Mayor
                ) {
                    return {
                        ...x,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                    }
                } else if (
                    x.Escala == escalaCampoArmonico.mayor
                    && x.KeyNote == 'C'
                ) {
                    return {
                        ...x,
                        CheckEscala: true,
                        CheckKeyNote: true,
                    }
                } else if (x.Escala == escalaCampoArmonico.mayor) {
                    return {
                        ...x,
                        CheckEscala: true,
                    }
                } else {
                    return x;
                }
            })
        } else if (ton == 'menor') {
            dataRef = dataRef.map((x) => {
                if (
                    x.Escala == escalaCampoArmonico.menorNatural
                    && x.KeyNote == 'C'
                    && x.NombreCifrado == nombreCifrado_TetradaTriada.triada_Menor
                ) {
                    return {
                        ...x,
                        CheckEscala: true,
                        CheckKeyNote: true,
                        CheckNombreCifrado: true,
                    }
                } else if (
                    x.Escala == escalaCampoArmonico.menorNatural
                    && x.KeyNote == 'C'
                ) {
                    return {
                        ...x,
                        CheckEscala: true,
                        CheckKeyNote: true,
                    }
                } else if (x.Escala == escalaCampoArmonico.menorNatural) {
                    return {
                        ...x,
                        CheckEscala: true,
                    }
                } else {
                    return x;
                }
            })
        }

        return dataRef;
    }

    // Ref
    const refRBSheet = useRef();
    const refRBSheet_SearchConfigDictation = useRef();
    const refRBSheet_GiroMelodico = useRef();
    const refRBSheet_GiroMelodico_Admin = useRef();
    const refRBSheet_GiroMelodicoGrupo_Admin = useRef();
    const refRBSheet_Picker = useRef();
    const refRBSheet_PickerDictationLength = useRef();
    const refRBSheet_NotesStartEnd = useRef();
    const refRBSheet_Clave = useRef();
    const refRBSheet_Reference = useRef();
    const refRBSheet_Tonalidad = useRef();
    const refRBSheet_Intervals = useRef();
    const refRBSheet_Compas = useRef();
    const refRBSheet_CelulaRitmica = useRef();
    const refRBSheet_CreateRitmica = useRef();
    const refRBSheet_Ligaduras = useRef();
    const refRBSheet_BPM = useRef();
    const toastRef = useRef();

    // General config
    const [institute, setInstitute] = useState({ id: null, name: '' });
    const [course, setCourse] = useState({ id: null, name: '' });
    const [module, setModule] = useState({ id: null, name: '' });
    const [nameConfig, setNameConfig] = useState('');
    const [descriptionConfig, setDescriptionConfig] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatorType, setGeneratorType] = useState(dictationType.melodic);
    const [isFocus, setIsFocus] = useState(false);

    // Intervals
    const [intervaloRegla, setIntervaloRegla] = useState(initializeIntervaloRegla());
    const [intervalType, setIntervalType] = useState(tipoIntervalo.melodico);
    const [directionInterval, setDirectionInterval] = useState(direccionIntervalo.ascendente);

    // Harmony
    const [camposArmonicosToSend, setCamposArmonicosToSend] = useState(initializeDataCamposArmonicosToSend());
    const [camposArmonicosInicioToSend, setCamposArmonicosInicioToSend] = useState(initializeDataCamposArmonicosToSend());
    const [camposArmonicosFinToSend, setCamposArmonicosFinToSend] = useState(initializeDataCamposArmonicosToSend());
    const [camposArmonicosReferenciaToSend, setCamposArmonicosReferenciaToSend] = useState(initializeDataCamposArmonicosToSendREFERENCIA(tonalidadCompasArmonico));
    const [referenceRule, setReferenceRule] = useState(referenciaReglaAcorde.fundamental);
    const [dictationLength, setDictationLength] = useState(2);
    const [tonalidadCompasArmonico, setTonalidadCompasArmonico] = useState('mayor');

    // Melodic
    // const [dictationRhythmic, setDictationhythmic] = useState(false);
    const [giro_melodico_regla, setGiro_melodico_regla] = useState([]);
    const [giro_melodico_reglaEdit, setGiro_melodico_reglaEdit] =
        useState(null);
    const [notas_inicio, setNotas_inicio] = useState([]);
    const [notas_fin, setNotas_fin] = useState([]);
    const [clave_prioridad, setClave_prioridad] = useState([
        { clave: 'Sol', prioridad: 1 },
        { clave: 'Fa', prioridad: 1 },
    ]);
    const [escala_diatonica_regla, setEscala_diatonica_regla] = useState(
        defoultValue_EscalaDiatonica()
    );
    const [nota_base, setNota_base] = useState(null);
    const [add, setAdd] = useState(true);
    const [mayor, setMayor] = useState(true);

    // Rhythmic
    const [nro_compases, setNro_compases] = useState(1);
    const [simple, setSimple] = useState(true);
    const [compas_regla, setCompas_regla] = useState([]);
    const [celula_ritmica_regla, setCelula_ritmica_regla] = useState([]);
    const [ligadura_regla, setLigadura_regla] = useState([]);
    const [editLigaduraFirstCR, setEditLigaduraFirstCR] = useState(null);
    const [BPM, setBPM] = useState({
        menor: 128,
        mayor: 128,
    });
    const [addCompas, setAddCompas] = useState(true);
    const [addCelulaRitmica, setAddCelulaRitmica] = useState(true);
    const [editCompas_regla, setEditCompas_regla] = useState(null);
    const [editCelula_ritmica, setEditCelula_ritmica] = useState(null);
    const [notesStart, setNotesStart] = useState(true);
    const [claveEdit, setClaveEdit] = useState('Sol');

    //new celula ritmica
    const [photo, setPhoto] = useState(null);
    const [figuras, setFiguras] = useState([]);

    // Advanced
    const [tesitura, setTesitura] = useState([
        {
            clave: 'Sol',
            nota_menor: 'G3',
            nota_mayor: 'D6',
        },
        {
            clave: 'Fa',
            nota_menor: 'B1',
            nota_mayor: 'F4',
        },
    ]);

    // Validators
    const [okStartNotes, setOkStartNotes] = useState(true);
    const [okEndNotes, setOkEndNotes] = useState(true);
    const [okClefs, setOkClefs] = useState(true);
    const [okTonality, setOkTonality] = useState(true);
    const [okIntervals, setOkIntervals] = useState(true);

    // Overlay
    const [visibleErrorConfig, setVisibleErrorConfig] = useState(false);
    const [titleErrorConfig, setTitleErrorConfig] = useState('');
    const [textErrorConfig, setTextErrorConfig] = useState('');

    const navigation = useNavigation();

    const dataGeneratorType = [
        { label: 'Dictados Melódicos', value: dictationType.melodic },
        { label: 'Dictados Rítmicos', value: dictationType.rhythmic },
        { label: 'Intervalos', value: dictationType.interval },
        { label: 'Acordes', value: dictationType.jazzChrods },
        { label: 'Dictados armónicos', value: dictationType.harmonicDictation },
      ];

    useEffect(() => {
        getStorageIsStudent().then((result) => {
            if (result) {
                // setInstitute({ id: '1', name: 'UTEC' });

                getStorageItem(ID_USER).then((idUser) => {
                    getCursoPersonal(idUser).then((curseResult) => {
                        if (curseResult.ok) {
                            setCourse({
                                id: curseResult.curso_objeto.id,
                                name: curseResult.curso_objeto.Nombre,
                            });
                        }
                    });
                });
            }
        });
    }, []);

    useEffect(() => {
        // Cargar del local storage el último instituto, curso y módulo para el que configuró algo

        // VALIDATIONS ---------------------
        if (generatorType == dictationType.melodic) {
            // Start notes
            setOkStartNotes(notesInNoteRule(notas_inicio, giro_melodico_regla));
            // End notes
            setOkEndNotes(notesInNoteRule(notas_fin, giro_melodico_regla));
            // At least one clef
            setOkClefs(atLeastOneClef(clave_prioridad));
            // At least one tonality
            setOkTonality(atLeastOneTonality(escala_diatonica_regla));
        } else if (generatorType == dictationType.jazzChrods) {
            // At least one tonality
            setOkTonality(atLeastOneTonality(escala_diatonica_regla));
        } else if (generatorType == dictationType.interval) {
            // At least one clef
            setOkClefs(atLeastOneClef(clave_prioridad));
            // At least one interval
            setOkIntervals(atLeastOneInterval(intervaloRegla))
        } else if (generatorType == dictationType.harmonicDictation){
            // TODO: validar que haya al menos algo seleccionado en caompos armonicos, acordes inicio y fin
            setOkTonality(atLeastOneTonality(escala_diatonica_regla));
        } else {
            setOkStartNotes(true)
            setOkEndNotes(true)
            setOkClefs(true)
            setOkTonality(true)
            setOkIntervals(true)
        }
    }, [
        giro_melodico_regla,
        notas_inicio,
        notas_fin,
        clave_prioridad,
        escala_diatonica_regla,
        intervaloRegla,
    ]);

    useEffect(() => {
        if (cleanAll) {
            clearAllFields();
        }
    }, [cleanAll]);

    useEffect(() => {
        // Check celula_ritmica_regla and ligadura_regla
        let ligadura_reglaRes = [];
        ligadura_regla.forEach((l) => {
            const firstElemFound = celula_ritmica_regla.find(
                (cr) => cr.celula_ritmica == l.elem.first
            );
            const secondElemFound = celula_ritmica_regla.find(
                (cr) => cr.celula_ritmica == l.elem.second
            );

            if (firstElemFound && secondElemFound) {
                ligadura_reglaRes.push(l);
            }
        });

        setLigadura_regla(ligadura_reglaRes);
    }, [celula_ritmica_regla]);

    useEffect(() => {
        if (generatorType == dictationType.rhythmic) {
            setFieldsMelodicForRhythmicDictation();
        } else if (generatorType == dictationType.melodic) {
            clearFieldsMelodic()
        } else if (generatorType == dictationType.jazzChrods) {
            clearFieldsMelodic();
            clearFieldsRhythmic();
            clearFieldsHarmonic();
        } else if (generatorType == dictationType.interval) {
            clearFieldsInvervals();
        } else if (generatorType == dictationType.harmonicDictation) {
            clearFieldsHarmonicDictation()
        }
    }, [generatorType]);

    const setFieldsMelodicForRhythmicDictation = () => {
        setGiro_melodico_regla([
            {
                giros_melodicos: ['C4', 'C4', 'C4'],
                prioridad: 1,
            },
        ]);

        setNotas_inicio(['C4']);
        setNotas_fin(['C4']);
        setClave_prioridad([
            {
                clave: 'Sol',
                prioridad: 1,
            },
            {
                clave: 'Fa',
                prioridad: 0,
            },
        ]);
        setEscala_diatonica_regla([
            {
                escala_diatonica: 'Do',
                prioridad: 1,
            },
            {
                escala_diatonica: 'Sol',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Re',
                prioridad: 0,
            },
            {
                escala_diatonica: 'La',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Mi',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Si',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Fa#',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Solb',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Reb',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Lab',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Mib',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Sib',
                prioridad: 0,
            },
            {
                escala_diatonica: 'Fa',
                prioridad: 0,
            },
        ]);
        setNota_base(['C4']);
    }

    const clearFieldsInvervals = () => {
        setIntervaloRegla(initializeIntervaloRegla());
        setClave_prioridad([
            { clave: 'Sol', prioridad: 1 },
            { clave: 'Fa', prioridad: 1 },
        ]);
        setIntervalType(tipoIntervalo.melodico);
        setDirectionInterval(direccionIntervalo.ascendente);
    }

    const clearFieldsHarmonic = () => {
        setCamposArmonicosToSend(initializeDataCamposArmonicosToSend());
        setReferenceRule(referenciaReglaAcorde.fundamental);
        setTonalidadCompasArmonico('mayor');
    }

    const clearFieldsHarmonicDictation = () => {
        setCamposArmonicosInicioToSend(initializeDataCamposArmonicosToSend());
        setCamposArmonicosFinToSend(initializeDataCamposArmonicosToSend());
        setCamposArmonicosReferenciaToSend(initializeDataCamposArmonicosToSendREFERENCIA('mayor'));
        setCamposArmonicosToSend(initializeDataCamposArmonicosToSend());
        setTonalidadCompasArmonico('mayor');
        setReferenceRule(referenciaReglaAcorde.fundamental);
        setDictationLength(2);
    }

    const clearFieldsMelodic = () => {
        setGiro_melodico_regla([]);
        setGiro_melodico_reglaEdit(null);
        setNotas_inicio([]);
        setNotas_fin([]);
        setClave_prioridad([
            { clave: 'Sol', prioridad: 1 },
            { clave: 'Fa', prioridad: 1 },
        ]);
        setEscala_diatonica_regla(defoultValue_EscalaDiatonica());
        setNota_base(null);
        setAdd(true);
    }

    const clearFieldsRhythmic = () => {
        setNro_compases(1);
        setSimple(true);
        setCompas_regla([]);
        setCelula_ritmica_regla([]);
        setLigadura_regla([]);
        setBPM({
            menor: 128,
            mayor: 128,
        });
        setAddCompas(true);
        setAddCelulaRitmica(true);
        setEditCompas_regla(null);
        setEditCelula_ritmica(null);
        setNotesStart(true);
    }

    const clearFieldsValidators = () => {
        setOkStartNotes(true);
        setOkEndNotes(true);
        setOkClefs(true);
        setOkTonality(true);
    }

    const clearAllFields = () => {
        // General config
        setNameConfig('');
        setDescriptionConfig('');
        setGeneratorType(dictationType.melodic);

        // Melodic
        setGiro_melodico_regla([]);
        setGiro_melodico_reglaEdit(null);
        setNotas_inicio([]);
        setNotas_fin([]);
        setClave_prioridad([
            { clave: 'Sol', prioridad: 1 },
            { clave: 'Fa', prioridad: 1 },
        ]);
        setEscala_diatonica_regla(defoultValue_EscalaDiatonica());
        setNota_base(null);
        setAdd(true);

        // Rhythmic
        setNro_compases(1);
        setSimple(true);
        setCompas_regla([]);
        setCelula_ritmica_regla([]);
        setLigadura_regla([]);
        setBPM({
            menor: 128,
            mayor: 128,
        });
        setAddCompas(true);
        setAddCelulaRitmica(true);
        setEditCompas_regla(null);
        setEditCelula_ritmica(null);
        setNotesStart(true);

        // Validators
        setOkStartNotes(true);
        setOkEndNotes(true);
        setOkClefs(true);
        setOkTonality(true);
        setOkIntervals(true);
    };

    const getTarjetas = (celulaRitmica) => {
        var res = [];
        celulaRitmica.forEach((celula) => {
            res.push({
                elem: celula.celula_ritmica,
                prioridad: celula.prioridad,
                id:celula.id
            });
        });

        return res;
    };

    const getCompas = (compasRegla) => {
        var res = [];
        compasRegla.forEach((compas) => {
            const numDenom =
                compas.numerador.toString() +
                '/' +
                compas.denominador.toString();
            res.push({
                elem: numDenom,
                prioridad: compas.prioridad,
            });
        });

        return res;
    };

    const getGirosMelodicos = (girosMelodicos) => {
        var resGiros = [];
        var resPrio = [];

        for (let i = 0; i < girosMelodicos.length; i++) {
            const giro = girosMelodicos[i];
            resGiros.push(giro.giros_melodicos);
            resPrio.push({
                regla: i,
                prioridad: giro.prioridad,
                lecturaAmbasDirecciones: giro.lecturaAmbasDirecciones,
            });
        }

        return [resGiros, resPrio];
    };

    const getTesitura = (tesitura) => {
        var res = [];
        tesitura.forEach((t) => {
            res.push({
                clave: t.clave,
                notaMenor: t.nota_menor,
                notaMayor: t.nota_mayor,
            });
        });

        return res;
    };

    const getPrioridadClave = (clavePrioridad) => {
        var res = [];
        clavePrioridad.forEach((cp) => {
            res.push({
                elem: cp.clave,
                prioridad: cp.prioridad,
            });
        });

        return res;
    };

    const getEscalasDiatonicas = (escalas) => {
        var res = [];
        escalas.forEach((escala) => {
            res.push({
                elem: escala.escala_diatonica,
                prioridad: escala.prioridad,
            });
        });

        return res;
    };

    const createConfigDictation = async () => {
        setLoading(true);

        var allOk = true;
        
        // Verify empty fields
        const okConfigGral =
            course.id != null &&
            module.id != null &&
            nameConfig != '' &&
            descriptionConfig != '';

        let okGiroMelodico = true;
        let okStartEndNotes = true;
        let okCompas = true;
        let okCelula = true;
        let okBPM = true;
        let okAcordeJazz = true
        let okDictadoArmonico = true
        
        if (generatorType == dictationType.melodic) {
            okGiroMelodico = giro_melodico_regla.length > 0;
            okStartEndNotes = notas_inicio.length > 0 && notas_fin.length > 0;
        }

        if (generatorType == dictationType.melodic || generatorType == dictationType.rhythmic) {
            okCompas = false;
            compas_regla.forEach((cr) => {
                okCompas = okCompas || cr.simple == simple;
            });

            okCelula = false;
            celula_ritmica_regla.forEach((crr) => {
                okCelula = okCelula || crr.simple == simple;
            });

            okBPM = BPM.menor > 0 && BPM.mayor > 0;
        }

        if (generatorType == dictationType.jazzChrods) {
            let okCampoArmonico = camposArmonicosToSend.filter((ca) => ca.CheckNombreCifrado == true).length > 0
            okAcordeJazz = okCampoArmonico
        }

        let okCampoArmonico = true
        let okCampoArmonicoInicio = true
        let okCampoArmonicoFin = true
        let okCampoArmonicoReferencia = true
        if (generatorType == dictationType.harmonicDictation) {
            okCampoArmonico = camposArmonicosToSend.filter((ca) => ca.CheckNombreCifrado == true).length > 0
            okCampoArmonicoInicio = camposArmonicosInicioToSend.filter((ca) => ca.CheckNombreCifrado == true).length > 0
            okCampoArmonicoFin = camposArmonicosFinToSend.filter((ca) => ca.CheckNombreCifrado == true).length > 0
            okCampoArmonicoReferencia = camposArmonicosReferenciaToSend.filter((ca) => ca.CheckNombreCifrado == true).length > 0

            okDictadoArmonico = okDictadoArmonico && okCampoArmonico && okCampoArmonicoInicio && okCampoArmonicoFin && okCampoArmonicoReferencia
        }

        if (
            allOk &&
            (!okConfigGral ||
                !okGiroMelodico ||
                !okStartEndNotes ||
                !okCompas ||
                !okCelula ||
                !okBPM ||
                !okDictadoArmonico ||
                !okAcordeJazz)
        ) {
            allOk = false;

            setTitleErrorConfig(
                'Existen inconsistencias en la configuración del dictado. Tenga en consideración los siguientes puntos:'
            );
            setTextErrorConfig(
                `${
                    !okConfigGral
                        ? '\n- Asignar un Instituto, Curso, Módulo, Nombre y Descripción a la configuración'
                        : ''
                }${!okGiroMelodico ? '\n- Asignar giros melódicos' : ''}${
                    !okStartEndNotes
                        ? '\n- Asignar notas de inicio y notas de fin, que estén contenidas dentro de los giros melódicos'
                        : ''
                }${!okCompas ? '\n- Asignar compáses' : ''}${
                    !okCelula ? '\n- Asignar células rítmicas' : ''
                }${!okBPM ? '\n- Asignar rango de bpm' : ''
                }${!okDictadoArmonico ? '\n- Asignar Campos armónicos, Acordes de inicio, Acordes de fin y Acordes de referencias (TODOS)' : ''
                }${!okAcordeJazz ? '\n- Asignar Campos armónicos' : ''
            }
                `
            );
            setVisibleErrorConfig(true);
        }

        if (generatorType == dictationType.melodic) {

            // TODO: Esto creo que se iría la parte de setBLABLA porque 
            // se hace en el useEffect
            // TODO: Revisar....

            // Verify Validations (useEffect)
            // Start notes
            // setOkStartNotes(notesInNoteRule(notas_inicio, giro_melodico_regla));
            // // End notes
            // setOkEndNotes(notesInNoteRule(notas_fin, giro_melodico_regla));
            // // At least one clef
            // setOkClefs(atLeastOneClef(clave_prioridad));
            // // At least one tonality
            // setOkTonality(atLeastOneTonality(escala_diatonica_regla));

            if (
                allOk &&
                (!okStartNotes || !okEndNotes || !okClefs || !okTonality)
            ) {
                allOk = false;
                setTitleErrorConfig(
                    'Existen algunas advertencias que debe revisar.'
                );
                setTextErrorConfig(
                    `Revise sobe la izquierda de cada configuración si aparece alguna alerta. Para más información puede presionar sobre dicha alerta.`
                );
                setVisibleErrorConfig(true);
            }

        }

        if (generatorType == dictationType.jazzChrods) {
            if (allOk && !okTonality) {
                allOk = false;
                setTitleErrorConfig(
                    'Existen algunas advertencias que debe revisar.'
                );
                setTextErrorConfig(
                    `Revise sobe la izquierda de cada configuración si aparece alguna alerta. Para más información puede presionar sobre dicha alerta.`
                );
                setVisibleErrorConfig(true);
            }
        }

        if (generatorType == dictationType.harmonicDictation) {
            if (allOk && !okTonality) {
                allOk = false;
                setTitleErrorConfig(
                    'Existen algunas advertencias que debe revisar.'
                );
                setTextErrorConfig(
                    `Revise sobe la izquierda de cada configuración si aparece alguna alerta. Para más información puede presionar sobre dicha alerta.`
                );
                setVisibleErrorConfig(true);
            }
        }

        if (generatorType == dictationType.interval) {
            if (allOk && (!okClefs || !okIntervals)) {
                allOk = false;
                setTitleErrorConfig(
                    'Existen algunas advertencias que debe revisar.'
                );
                setTextErrorConfig(
                    `Revise sobe la izquierda de cada configuración si aparece alguna alerta. Para más información puede presionar sobre dicha alerta.`
                );
                setVisibleErrorConfig(true);
            }
        }

        // try to create dictation
        if (allOk) {
            if (generatorType == dictationType.melodic || generatorType == dictationType.rhythmic) {
                const resGirosMelodicos = getGirosMelodicos(giro_melodico_regla);
    
                const data = {
                    tarjetas: getTarjetas(celula_ritmica_regla),
                    nroCompases: nro_compases,
                    compas: getCompas(compas_regla),
                    simple: simple ? 'simples' : 'compuestas',
                    notasRegla: resGirosMelodicos[0],
                    nivelPrioridadRegla: resGirosMelodicos[1],
                    intervaloNotas: getTesitura(tesitura),
                    notasBase: notas_inicio,
                    notasFin: notas_fin,
                    nivelPrioridadClave: getPrioridadClave(clave_prioridad),
                    escalaDiatonicaRegla: getEscalasDiatonicas(
                        escala_diatonica_regla
                    ),
                    notaBase: nota_base ? nota_base[0] : null,
                    bpm: BPM,
                    dictado_ritmico: generatorType == dictationType.rhythmic,
                    ligaduraRegla: ligadura_regla,
                };
                const resGenerate = await generateDictationApi(
                    null,
                    null,
                    null,
                    null,
                    1,
                    data,
                    true
                );
    
                if (resGenerate.ok) {
                    navigation.navigate('summaryCreateDictation', {
                        dictationRhythmic: generatorType == dictationType.rhythmic,
                        course,
                        module,
                        nameConfig,
                        descriptionConfig,
                        giro_melodico_regla,
                        notas_inicio,
                        notas_fin,
                        clave_prioridad,
                        escala_diatonica_regla,
                        nota_base,
                        nro_compases,
                        simple,
                        compas_regla,
                        celula_ritmica_regla: getTarjetas(celula_ritmica_regla),
                        BPM,
                        tesitura,
                        mayor,
                        ligadura_regla,
                        generatorType,
                    });
                } else {
                    setTitleErrorConfig(
                        'No es posible crear ningún dictado a partir de la configuración'
                    );
                    setTextErrorConfig(
                        `Por favor revise los parámetros en la configuración establecida. Puede que tenga que agregar una mayor cantidad de opciones en su configuración como pueden ser más giros melódicos, células ritmicas, entre otros.`
                    );
                    setVisibleErrorConfig(true);
                }
            } else if (generatorType == dictationType.jazzChrods) {
                const data = {
                    dataCamposArmonicos: getCamposArmonicosChecked(camposArmonicosToSend), 
                    escalaDiatonicaRegla: getEscalasDiatonicas(escala_diatonica_regla),
                };

                const result = await generateAcordeJazzApi(data, null, null, true);

                const dataCAJ = {
                    name: nameConfig, 
                    description: descriptionConfig, 
                    dataCamposArmonicos: getCamposArmonicosChecked(camposArmonicosToSend), 
                    escalaDiatonicaRegla: getEscalasDiatonicas(escala_diatonica_regla),
                    referenciaRegla: referenceRule,
                };

                if (result.ok) {
                    navigation.navigate('summaryCreateDictation', {
                        module,
                        dataCAJ,
                        generatorType,
                    });
                } else {
                    setTitleErrorConfig(
                        'No es posible crear ningún acorde de jazz a partir de la configuración'
                    );
                    setTextErrorConfig(
                        `Por favor revise los parámetros en la configuración establecida y pruebe establecer nuevos parámetros.`
                    );
                    setVisibleErrorConfig(true);
                }
            } else if (generatorType == dictationType.interval) {
                const data = {
                    dataIntervalos: {
                        PrioridadClaveSol: clave_prioridad.find((x) => x.clave == 'Sol').prioridad,
                        PrioridadClaveFa: clave_prioridad.find((x) => x.clave == 'Fa').prioridad,
                        Direccion: directionInterval,
                        Tipo: intervalType,
                    },
                    intervaloRegla: intervaloRegla.map((x) => {return {
                        Intervalo: x.Intervalo,
                        Prioridad: x.Prioridad,
                    }}),
                };

                const result = await generateIntervaloApi(data, null, null, true);

                if (result.ok) {
                    const dataIntervaloToSend = {
                        name: nameConfig, 
                        description: descriptionConfig, 
                        dataIntervalos: data.dataIntervalos,
                        intervaloRegla: data.intervaloRegla
                    };

                    navigation.navigate('summaryCreateDictation', {
                        module,
                        dataIntervalo: dataIntervaloToSend,
                        generatorType,
                    });
                } else {
                    setTitleErrorConfig(
                        'No es posible crear ningún Intervalo a partir de la configuración'
                    );
                    setTextErrorConfig(
                        `Por favor revise los parámetros en la configuración establecida y pruebe establecer nuevos parámetros.`
                    );
                    setVisibleErrorConfig(true);
                }
            } else if (generatorType == dictationType.harmonicDictation) {

                const data = {
                    dataCamposArmonicos: getCamposArmonicosChecked(camposArmonicosToSend), 
                    dataCamposArmonicosInicio: getCamposArmonicosChecked(camposArmonicosInicioToSend),
                    dataCamposArmonicosFin: getCamposArmonicosChecked(camposArmonicosFinToSend),
                    dataCamposArmonicosReferencia: getCamposArmonicosChecked(camposArmonicosReferenciaToSend),
                    escalaDiatonicaRegla: getEscalasDiatonicas(escala_diatonica_regla),
                };

                // console.log(data.dataCamposArmonicos.filter(x => x.Tonicalizado == true &&
                //     x.CheckKeyNote && x.CheckNombreCifrado));
                // console.log('------------------------');
                
                const result = await generateDictadoArmonicoApi(data, null, dictationLength, null, true);

                const dataCDA = {
                    name: nameConfig, 
                    description: descriptionConfig, 
                    dataCamposArmonicos: getCamposArmonicosChecked(camposArmonicosToSend),
                    dataCamposArmonicosInicio: getCamposArmonicosChecked(camposArmonicosInicioToSend),
                    dataCamposArmonicosFin: getCamposArmonicosChecked(camposArmonicosFinToSend),
                    dataCamposArmonicosReferencia: getCamposArmonicosChecked(camposArmonicosReferenciaToSend),
                    escalaDiatonicaRegla: getEscalasDiatonicas(escala_diatonica_regla),
                    dictationLength: dictationLength,
                    
                };

                if (result.ok) {
                    navigation.navigate('summaryCreateDictation', {
                        module,
                        dataCDA,
                        generatorType,
                    });
                } else {
                    setTitleErrorConfig(
                        'No es posible crear ningún dictado armónico a partir de la configuración'
                    );
                    setTextErrorConfig(
                        `Por favor revise los parámetros en la configuración establecida y pruebe establecer nuevos parámetros.`
                    );
                    setVisibleErrorConfig(true);
                }
            }
        }
        setLoading(false);
    };

    const getTensionFromSpecificTensions = (specificTensions, tipo) => {
        let tensionToReturn = '';

        if (specificTensions.length > 0) {
            if (tipo == acordeType.triada) tensionToReturn = 'add ';

            for (let i = 0; i < specificTensions.length - 1; i++) {
                const t = specificTensions[i];
                
                tensionToReturn = tensionToReturn + t + ', ';
            }
            tensionToReturn = tensionToReturn + specificTensions[specificTensions.length - 1]
        }

        return tensionToReturn;
    }

    const getCamposArmonicosChecked = (dataCA) => {
        let result = dataCA.filter((x) => x.CheckEscala && x.CheckKeyNote && x.CheckNombreCifrado);

        result = result.map(({KeyNote, CheckTension, SpecificTensions, RealKeyNote, Tipo, ...x}) => {
            if (CheckTension) {
                return {
                    ...x,
                    KeyNote: RealKeyNote?.replace(/[0-9]/g, ''),
                    Tension: getTensionFromSpecificTensions(SpecificTensions, Tipo),
                    Tipo: Tipo,
                };
            } else {
                return {
                    ...x,
                    KeyNote: RealKeyNote?.replace(/[0-9]/g, ''),
                    Tension: '',
                    Tipo: Tipo,
                }
            }
        })

        // console.log(result);
        // console.log('------------------------------------------');
        // console.log('------------------------------------------');
        // console.log('------------------------------------------');
        // console.log(result.filter(x => x.Tonicalizado == true));
        // console.log('------------------------------------------');
        // console.log('------------------------------------------');
        // console.log(result.filter(x => x.Tonicalizado === false));

        return result;
    }

    const loadConfigDictation = () => {
        refRBSheet_SearchConfigDictation.current.open();
    }

    const renderLabel = () => {
        if (generatorType != null || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: PRIMARY_COLOR }]}>
              Tipo de dictado
            </Text>
          );
        }
        return null;
      };

    if (loading) return <Loading isVisible={true} text="Cargando.. podría tomar varios minutos" />;

    return (
        <>
            <ScrollView>
                <InfoGral
                    // institute={institute}
                    course={course}
                    module={module}
                    nameConfig={nameConfig}
                    descriptionConfig={descriptionConfig}
                    refRBSheet={refRBSheet}
                />
                <View style={{flexDirection: 'row', backgroundColor: 'white', display: 'flex', alignItems: 'center'}}>
                    <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: PRIMARY_COLOR }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataGeneratorType}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Seleccionar' : '...'}
                            value={generatorType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setGeneratorType(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                style={styles.icon}
                                color={isFocus ? PRIMARY_COLOR : 'black'}
                                name="Safety"
                                size={20}
                                />
                            )}
                        />
                    </View>
                    <Button
                        icon={
                            <Icon
                                type="material-community"
                                name="magnify"
                                color="white"
                            />
                        }
                        containerStyle={styles.containerButtonSearch}
                        buttonStyle={styles.buttonSearch}
                        onPress={loadConfigDictation}
                    />

                </View>

               
                <NavigationConfig
                    giro_melodico_regla={giro_melodico_regla}
                    notas_inicio={notas_inicio}
                    notas_fin={notas_fin}
                    clave_prioridad={clave_prioridad}
                    nota_base={nota_base}
                    nro_compases={nro_compases}
                    simple={simple}
                    setSimple={setSimple}
                    compas_regla={compas_regla}
                    celula_ritmica_regla={celula_ritmica_regla}
                    BPM={BPM}
                    setAdd={setAdd}
                    setNotesStart={setNotesStart}
                    setGiro_melodico_reglaEdit={setGiro_melodico_reglaEdit}
                    setClaveEdit={setClaveEdit}
                    setAddCelulaRitmica={setAddCelulaRitmica}
                    setAddCompas={setAddCompas}
                    setEditCompas_regla={setEditCompas_regla}
                    setEditCelula_ritmica={setEditCelula_ritmica}
                    setMayor={setMayor}
                    mayor={mayor}
                    setEditLigaduraFirstCR={setEditLigaduraFirstCR}
                    refRBSheet_Picker={refRBSheet_Picker}
                    refRBSheet_PickerDictationLength={refRBSheet_PickerDictationLength}
                    refRBSheet_GiroMelodico={refRBSheet_GiroMelodico}
                    refRBSheet_GiroMelodico_Admin={
                        refRBSheet_GiroMelodico_Admin
                    }
                    refRBSheet_GiroMelodicoGrupo_Admin={
                        refRBSheet_GiroMelodicoGrupo_Admin
                    }
                    refRBSheet_NotesStartEnd={refRBSheet_NotesStartEnd}
                    refRBSheet_Clave={refRBSheet_Clave}
                    refRBSheet_Tonalidad={refRBSheet_Tonalidad}
                    refRBSheet_Intervals={refRBSheet_Intervals}
                    refRBSheet_Reference={refRBSheet_Reference}
                    refRBSheet_Compas={refRBSheet_Compas}
                    refRBSheet_CelulaRitmica={refRBSheet_CelulaRitmica}
                    refRBSheet_CreateRitmica={refRBSheet_CreateRitmica}
                    refRBSheet_BPM={refRBSheet_BPM}
                    okStartNotes={okStartNotes}
                    okEndNotes={okEndNotes}
                    okClefs={okClefs}
                    okTonality={okTonality}
                    okReferenceNote={true} // No control in reference note
                    generatorType={generatorType}
                    refRBSheet_Ligaduras={refRBSheet_Ligaduras}
                    camposArmonicosToSend={camposArmonicosToSend}
                    setCamposArmonicosToSend={setCamposArmonicosToSend}
                    referenceRule={referenceRule}
                    setReferenceRule={setReferenceRule}
                    intervalType={intervalType}
                    setIntervalType={setIntervalType}
                    directionInterval={directionInterval}
                    setDirectionInterval={setDirectionInterval}
                    okIntervals={okIntervals}
                    camposArmonicosInicioToSend={camposArmonicosInicioToSend}
                    setCamposArmonicosInicioToSend={setCamposArmonicosInicioToSend}
                    camposArmonicosFinToSend={camposArmonicosFinToSend}
                    setCamposArmonicosFinToSend={setCamposArmonicosFinToSend}
                    camposArmonicosReferenciaToSend={camposArmonicosReferenciaToSend}
                    setCamposArmonicosReferenciaToSend={setCamposArmonicosReferenciaToSend}
                    dictationLength={dictationLength}
                    tonalidadCompasArmonico={tonalidadCompasArmonico}
                    setTonalidadCompasArmonico={setTonalidadCompasArmonico}
                    initializeDataCamposArmonicosToSend={initializeDataCamposArmonicosToSend}
                    initializeDataCamposArmonicosToSendREFERENCIA={initializeDataCamposArmonicosToSendREFERENCIA}
                />
            </ScrollView>
            <Button
                title="Crear"
                onPress={() => createConfigDictation()}
                buttonStyle={styles.buttonCreate}
            />

            {/* Bottom sheets */}
            {getStorageIsStudent() && course.name != '' && course.id != null ? (
                <BottomSheetInfoGral
                    instituteGral={institute}
                    courseGral={course}
                    moduleGral={module}
                    nameConfigGral={nameConfig}
                    descriptionConfigGral={descriptionConfig}
                    setInstituteGral={setInstitute}
                    setCourseGral={setCourse}
                    setModuleGral={setModule}
                    setNameConfigGral={setNameConfig}
                    setDescriptionConfigGral={setDescriptionConfig}
                    refRBSheet={refRBSheet}
                />
            ) : (
                <BottomSheetInfoGral
                    instituteGral={institute}
                    courseGral={course}
                    moduleGral={module}
                    nameConfigGral={nameConfig}
                    descriptionConfigGral={descriptionConfig}
                    setInstituteGral={setInstitute}
                    setCourseGral={setCourse}
                    setModuleGral={setModule}
                    setNameConfigGral={setNameConfig}
                    setDescriptionConfigGral={setDescriptionConfig}
                    refRBSheet={refRBSheet}
                />
            )}

            <BottomSheetSearchConfigDictation
                refRBSheet={refRBSheet_SearchConfigDictation}
                setGeneratorType={setGeneratorType}
                setGiro_melodico_regla={setGiro_melodico_regla}
                setNotas_inicio={setNotas_inicio}
                setNotas_fin={setNotas_fin}
                setClave_prioridad={setClave_prioridad}
                setEscala_diatonica_regla={setEscala_diatonica_regla}
                setNota_base={setNota_base}
                setMayor={setMayor}
                setNro_compases={setNro_compases}
                setSimple={setSimple}
                setCompas_regla={setCompas_regla}
                setCelula_ritmica_regla={setCelula_ritmica_regla}
                setLigadura_regla={setLigadura_regla}
                setBPM={setBPM}
                setNameConfig={setNameConfig}
                setDescriptionConfig={setDescriptionConfig}
            />

            {/* Melodic */}
            <BottomSheetGiroMelodico
                giro_melodico_regla={giro_melodico_regla}
                setGiro_melodico_regla={setGiro_melodico_regla}
                refRBSheet={refRBSheet_GiroMelodico}
                add={add}
                giro_melodico_reglaEdit={giro_melodico_reglaEdit}
                mayor={mayor}
            />
            <BottomSheetAdminGiroMelodico
                giro_melodico_regla={giro_melodico_regla}
                setGiro_melodico_regla={setGiro_melodico_regla}
                refRBSheet={refRBSheet_GiroMelodico_Admin}
                add={add}
                giro_melodico_reglaEdit={giro_melodico_reglaEdit}
                mayor={mayor}
            />
            <ManageGirosMelodicosGrupos
                refRBSheet={refRBSheet_GiroMelodicoGrupo_Admin}
            />
            <BottomSheetNoteStartEnd
                start={notesStart}
                notas_fin={notas_fin}
                notas_inicio={notas_inicio}
                setNotas_inicio={setNotas_inicio}
                setNotas_fin={setNotas_fin}
                refRBSheet={refRBSheet_NotesStartEnd}
                mayor={mayor}
            />
            <BottomSheetClave
                clave_prioridad={clave_prioridad}
                setClave_prioridad={setClave_prioridad}
                clave={claveEdit}
                refRBSheet={refRBSheet_Clave}
            />
            <BottomSheetTonalidad
                escala_diatonica_regla={escala_diatonica_regla}
                setEscala_diatonica_regla={setEscala_diatonica_regla}
                refRBSheet={refRBSheet_Tonalidad}
            />
            <BottomSheetInterval
                intervaloRegla={intervaloRegla}
                setIntervaloRegla={setIntervaloRegla}
                refRBSheet={refRBSheet_Intervals}
            />
            <BottomSheetReference
                nota_base={nota_base}
                setNota_base={setNota_base}
                refRBSheet={refRBSheet_Reference}
                toastRef={toastRef}
                mayor={mayor}
            />
            <BottomSheetPicker
                values={[
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                ]}
                setNro_compases={setNro_compases}
                nro_compases={nro_compases}
                refRBSheet={refRBSheet_Picker}
                type={'compas'}
            />

            <BottomSheetPicker
                values={[
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                ]}
                setNro_compases={setDictationLength}
                nro_compases={dictationLength}
                refRBSheet={refRBSheet_PickerDictationLength}
                type={'acorde'}
            />

            {/* Rhythmic */}
            <BottomSheetCompas
                add={addCompas}
                simple={simple}
                compas_regla={compas_regla}
                setCompas_regla={setCompas_regla}
                editCompas_regla={editCompas_regla}
                refRBSheet={refRBSheet_Compas}
            />
            <BottomSheetCelulaRitmica
                add={addCelulaRitmica}
                simple={simple}
                celula_ritmica_regla={celula_ritmica_regla}
                setCelula_ritmica_regla={setCelula_ritmica_regla}
                editCelula_ritmica={editCelula_ritmica}
                refRBSheet={refRBSheet_CelulaRitmica}
            />
            <BottomSheetCreateCelulaRitmica
                setSimple={setSimple}
                simple={simple}
                refRBSheet={refRBSheet_CreateRitmica}
                setPhoto={setPhoto}
                photo={photo}
                figuras={figuras}
                setFiguras={setFiguras}
            />
            <BottomSheetLigadura
                simple={simple}
                ligaduraFirstCR={editLigaduraFirstCR}
                celula_ritmica_regla={celula_ritmica_regla}
                ligadura_regla={ligadura_regla}
                setLigadura_regla={setLigadura_regla}
                refRBSheet_Ligaduras={refRBSheet_Ligaduras}
            />
            <BottomSheetBPM
                refRBSheet={refRBSheet_BPM}
                BPM={BPM}
                setBPM={setBPM}
            />

            <OverlayInfo
                visible={visibleErrorConfig}
                setVisible={setVisibleErrorConfig}
                title={titleErrorConfig}
                text={textErrorConfig}
            />
        </>
    );
}

function initializeIntervaloRegla() {
    return [
        {
            Intervalo: '2m',
            Prioridad: 1,
            Checked: true,
        },
        {
            Intervalo: '1A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '2M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '3m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '2A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '3M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '4d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '4P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '4A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '5d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '5P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '6m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '5A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '6M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '7m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '6A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '7M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '8d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '8P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '7A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '9m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '8A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '9M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '10m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '9A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '10M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '11d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '11P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '11A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '12d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '12P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '13m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '12A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '13M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '14m',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '13A',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '14M',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '15d',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '15P',
            Prioridad: 0,
            Checked: false,
        },
        {
            Intervalo: '14A',
            Prioridad: 0,
            Checked: false,
        },
    ]
}

function defoultValue_EscalaDiatonica() {
    return [
        {
            escala_diatonica: 'Do',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Sol',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Re',
            prioridad: 1,
        },
        {
            escala_diatonica: 'La',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Mi',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Si',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Fa#',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Solb',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Reb',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Lab',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Mib',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Sib',
            prioridad: 1,
        },
        {
            escala_diatonica: 'Fa',
            prioridad: 1,
        },
    ];
}

const styles = StyleSheet.create({
    contentConfigGral: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    containerButtonSearch: {
        width: '20%',
        paddingHorizontal: 7,
        // paddingTop: 18
    },
    buttonSearch: {
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
    },
    buttonCreate: {
        backgroundColor: PRIMARY_COLOR,
    },
    container: {
        // backgroundColor: 'white',
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        width: '80%'
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});
