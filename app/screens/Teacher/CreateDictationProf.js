import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import InfoGral from '../../components/CreateDictationProf/InfoGral';

import ConfigMelodic from '../../components/CreateDictationProf/ConfigMelodic';
import ConfigRhythmic from '../../components/CreateDictationProf/ConfigRhythmic';
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
import BottomSheetBPM from '../../components/CreateDictationProf/BottomSheetBPM';

const Tab = createMaterialTopTabNavigator();

export default function CreateDictationProf() {
    // Ref
    const refRBSheet = useRef();
    const refRBSheet_GiroMelodico = useRef();
    const refRBSheet_Picker = useRef();
    const refRBSheet_NotesStartEnd = useRef();
    const refRBSheet_Clave = useRef();
    const refRBSheet_Reference = useRef();
    const refRBSheet_Tonalidad = useRef();
    const refRBSheet_Compas = useRef();
    const refRBSheet_CelulaRitmica = useRef();
    const refRBSheet_BPM = useRef();
    const toastRef = useRef();

    // General config
    const [institute, setInstitute] = useState({ id: null, name: '' });
    const [course, setCourse] = useState({ id: null, name: '' });
    const [module, setModule] = useState({ id: null, name: '' });
    const [nameConfig, setNameConfig] = useState('');
    const [descriptionConfig, setDescriptionConfig] = useState('');

    // Melodic
    const [dictationRhythmic, setDictationhythmic] = useState(false);
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

    // Rhythmic
    const [nro_compases, setNro_compases] = useState(1);
    const [simple, setSimple] = useState(true);
    const [compas_regla, setCompas_regla] = useState([]);
    const [celula_ritmica_regla, setCelula_ritmica_regla] = useState([]);
    const [BPM, setBPM] = useState(128);
    const [addCompas, setAddCompas] = useState(true);
    const [addCelulaRitmica, setAddCelulaRitmica] = useState(true);
    const [editCompas_regla, setEditCompas_regla] = useState(null);
    const [editCelula_ritmica, setEditCelula_ritmica] = useState(null);
    const [notesStart, setNotesStart] = useState(true);
    const [claveEdit, setClaveEdit] = useState('Sol');

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

    const navigation = useNavigation();

    useEffect(() => {
        // Cargar del local storage el último instituto, curso y módulo para el que configuró algo
    }, []);

    const createConfigDictation = () => {
        // Filtrar los compas_regla por compas_regla.simple == simple(del useState)
        // TODO: verificar que están todos los datos correctos
        navigation.navigate('summaryCreateDictation', {
            dictationRhythmic,
            institute,
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
            celula_ritmica_regla,
            BPM,
            tesitura,
        });
    };

    // if (lastInstitute === null || lastCourse === null || lastModule === null)
    //     return <Loading isVisible={true} text="Cargando" />;

    return (
        <>
            <InfoGral
                institute={institute}
                course={course}
                module={module}
                nameConfig={nameConfig}
                descriptionConfig={descriptionConfig}
                refRBSheet={refRBSheet}
            />
            <Button title="Consultar configuración" />
            <CheckBox
                center
                title="Dictado rítmico"
                checked={dictationRhythmic}
                onPress={() => setDictationhythmic(!dictationRhythmic)}
            />
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
                refRBSheet_Picker={refRBSheet_Picker}
                refRBSheet_GiroMelodico={refRBSheet_GiroMelodico}
                refRBSheet_NotesStartEnd={refRBSheet_NotesStartEnd}
                refRBSheet_Clave={refRBSheet_Clave}
                refRBSheet_Tonalidad={refRBSheet_Tonalidad}
                refRBSheet_Reference={refRBSheet_Reference}
                refRBSheet_Compas={refRBSheet_Compas}
                refRBSheet_CelulaRitmica={refRBSheet_CelulaRitmica}
                refRBSheet_BPM={refRBSheet_BPM}
            />
            <Button title="Crear" onPress={() => createConfigDictation()} />

            {/* Bottom sheets */}
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

            {/* Melodic */}
            <BottomSheetGiroMelodico
                giro_melodico_regla={giro_melodico_regla}
                setGiro_melodico_regla={setGiro_melodico_regla}
                refRBSheet={refRBSheet_GiroMelodico}
                add={add}
                giro_melodico_reglaEdit={giro_melodico_reglaEdit}
            />
            <BottomSheetNoteStartEnd
                start={notesStart}
                notas_fin={notas_fin}
                notas_inicio={notas_inicio}
                setNotas_inicio={setNotas_inicio}
                setNotas_fin={setNotas_fin}
                refRBSheet={refRBSheet_NotesStartEnd}
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
            <BottomSheetReference
                nota_base={nota_base}
                setNota_base={setNota_base}
                refRBSheet={refRBSheet_Reference}
                toastRef={toastRef}
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
            <BottomSheetBPM
                refRBSheet={refRBSheet_BPM}
                BPM={BPM}
                setBPM={setBPM}
            />
        </>
    );
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
