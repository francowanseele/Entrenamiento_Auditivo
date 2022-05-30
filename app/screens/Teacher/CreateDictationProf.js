import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SwitchSelector from 'react-native-switch-selector';

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
import {
    atLeastOneClef,
    atLeastOneTonality,
    notesInNoteRule,
} from '../../../utils/validator';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import OverlayInfo from '../../components/CreateDictationProf/OverlayInfo';
import { generateDictationApi } from '../../api/user';
import {
    getParams,
    getStorageIsStudent,
    getStorageItem,
    ID_USER,
} from '../../../utils/asyncStorageManagement';
import { getCursoPersonal } from '../../api/course';
import BottomSheetLigadura from '../../components/CreateDictationProf/BottomSheetLigadura';

const Tab = createMaterialTopTabNavigator();

export default function CreateDictationProf({ route }) {
    var cleanAll = route.params ? route.params.cleanAll : false;

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
    const refRBSheet_Ligaduras = useRef();
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

    // Overlay
    const [visibleErrorConfig, setVisibleErrorConfig] = useState(false);
    const [titleErrorConfig, setTitleErrorConfig] = useState('');
    const [textErrorConfig, setTextErrorConfig] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        getStorageIsStudent().then((result) => {
            if (result) {
                setInstitute({ id: '1', name: 'UTEC' });

                getStorageItem(ID_USER).then((idUser) => {
                    getCursoPersonal(idUser).then((curseResult) => {
                        if (curseResult.ok) {
                            setCourse({
                                id: curseResult.curso.id,
                                name: curseResult.curso.Nombre,
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
        // Start notes
        setOkStartNotes(notesInNoteRule(notas_inicio, giro_melodico_regla));

        // End notes
        setOkEndNotes(notesInNoteRule(notas_fin, giro_melodico_regla));

        // At least one clef
        setOkClefs(atLeastOneClef(clave_prioridad));

        // At least one tonality
        setOkTonality(atLeastOneTonality(escala_diatonica_regla));
    }, [
        giro_melodico_regla,
        notas_inicio,
        notas_fin,
        clave_prioridad,
        escala_diatonica_regla,
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
        if (dictationRhythmic) {
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
        } else {
            setGiro_melodico_regla([]);
            setNotas_inicio([]);
            setNotas_fin([]);
            setClave_prioridad([
                { clave: 'Sol', prioridad: 1 },
                { clave: 'Fa', prioridad: 1 },
            ]);
            setEscala_diatonica_regla(defoultValue_EscalaDiatonica());
            setNota_base(null);
        }
    }, [dictationRhythmic]);

    const clearAllFields = () => {
        // General config
        setNameConfig('');
        setDescriptionConfig('');

        // Melodic
        setDictationhythmic(false);
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
    };

    const getTarjetas = (celulaRitmica) => {
        var res = [];
        celulaRitmica.forEach((celula) => {
            res.push({
                elem: celula.celula_ritmica,
                prioridad: celula.prioridad,
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
        var allOk = true;

        // Verify empty fields
        const okConfigGral =
            institute.id != null &&
            course.id != null &&
            module.id != null &&
            nameConfig != '' &&
            descriptionConfig != '';
        const okGiroMelodico = giro_melodico_regla.length > 0;
        const okStartEndNotes = notas_inicio.length > 0 && notas_fin.length > 0;
        // const okRefNote = nota_base != null || nota_base != '';
        var okCompas = false;
        compas_regla.forEach((cr) => {
            okCompas = okCompas || cr.simple == simple;
        });
        var okCelula = false;
        celula_ritmica_regla.forEach((crr) => {
            okCelula = okCelula || crr.simple == simple;
        });
        const okBPM = BPM.menor > 0 && BPM.mayor > 0;

        if (
            allOk &&
            (!okConfigGral ||
                !okGiroMelodico ||
                !okStartEndNotes ||
                !okCompas ||
                !okCelula ||
                !okBPM)
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
                }${!okBPM ? '\n- Asignar rango de bpm' : ''}
                `
            );
            setVisibleErrorConfig(true);
        }

        // Verify Validations (useEffect)
        // Start notes
        setOkStartNotes(notesInNoteRule(notas_inicio, giro_melodico_regla));
        // End notes
        setOkEndNotes(notesInNoteRule(notas_fin, giro_melodico_regla));
        // At least one clef
        setOkClefs(atLeastOneClef(clave_prioridad));
        // At least one tonality
        setOkTonality(atLeastOneTonality(escala_diatonica_regla));

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

        // try to create dictation
        if (allOk) {
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
                dictado_ritmico: dictationRhythmic,
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
                    mayor,
                    ligadura_regla,
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
        }
        // else {
        //     setTitleErrorConfig('No es posible crear la configuración.');
        //     setTextErrorConfig(
        //         `Por favor revise los parámetros en la configuración establecida. Puede que tenga que agregar una mayor cantidad de opciones en su configuración como pueden ser más giros melódicos, células ritmicas, entre otros..`
        //     );
        //     setVisibleErrorConfig(true);
        // }
    };

    // if (lastInstitute === null || lastCourse === null || lastModule === null)
    //     return <Loading isVisible={true} text="Cargando" />;

    return (
        <>
            <ScrollView>
                <InfoGral
                    institute={institute}
                    course={course}
                    module={module}
                    nameConfig={nameConfig}
                    descriptionConfig={descriptionConfig}
                    refRBSheet={refRBSheet}
                />
                <View style={styles.contentConfigGral}>
                    <SwitchSelector
                        initial={0}
                        onPress={(value) => setDictationhythmic(value == 'r')}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Dictado Melódico',
                                value: 'm',
                            },
                            {
                                label: 'Dictado Rítmico',
                                value: 'r',
                            },
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        style={{
                            width: '80%',
                        }}
                    />
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
                    refRBSheet_GiroMelodico={refRBSheet_GiroMelodico}
                    refRBSheet_NotesStartEnd={refRBSheet_NotesStartEnd}
                    refRBSheet_Clave={refRBSheet_Clave}
                    refRBSheet_Tonalidad={refRBSheet_Tonalidad}
                    refRBSheet_Reference={refRBSheet_Reference}
                    refRBSheet_Compas={refRBSheet_Compas}
                    refRBSheet_CelulaRitmica={refRBSheet_CelulaRitmica}
                    refRBSheet_BPM={refRBSheet_BPM}
                    okStartNotes={okStartNotes}
                    okEndNotes={okEndNotes}
                    okClefs={okClefs}
                    okTonality={okTonality}
                    okReferenceNote={true} // No control in reference note
                    dictationRhythmic={dictationRhythmic}
                    refRBSheet_Ligaduras={refRBSheet_Ligaduras}
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

            {/* Melodic */}
            <BottomSheetGiroMelodico
                giro_melodico_regla={giro_melodico_regla}
                setGiro_melodico_regla={setGiro_melodico_regla}
                refRBSheet={refRBSheet_GiroMelodico}
                add={add}
                giro_melodico_reglaEdit={giro_melodico_reglaEdit}
                mayor={mayor}
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

// function clearAllFields() {
//     // General config
//     setNameConfig('');
//     setDescriptionConfig('');

//     // Melodic
//     setDictationhythmic(false);
//     setGiro_melodico_regla([]);
//     setGiro_melodico_reglaEdit(null);
//     setNotas_inicio([]);
//     setNotas_fin([]);
//     setClave_prioridad([
//         { clave: 'Sol', prioridad: 1 },
//         { clave: 'Fa', prioridad: 1 },
//     ]);
//     setEscala_diatonica_regla(defoultValue_EscalaDiatonica());
//     setNota_base(null);
//     setAdd(true);

//     // Rhythmic
//     setNro_compases(1);
//     setSimple(true);
//     setCompas_regla([]);
//     setCelula_ritmica_regla([]);
//     setBPM({
//         menor: 128,
//         mayor: 128,
//     });
//     setAddCompas(true);
//     setAddCelulaRitmica(true);
//     setEditCompas_regla(null);
//     setEditCelula_ritmica(null);
//     setNotesStart(true);

//     // Validators
//     setOkStartNotes(true);
//     setOkEndNotes(true);
//     setOkClefs(true);
//     setOkTonality(true);
// }

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
        paddingLeft: 10,
    },
    buttonSearch: {
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
    },
    buttonCreate: {
        backgroundColor: PRIMARY_COLOR,
    },
});
