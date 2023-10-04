import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { escalaCampoArmonico } from '../../../enums/camposArmonicosEnum';

export default function SelectTonalidad(props) {
    const { 
        tonalidadCompasArmonico, 
        setTonalidadCompasArmonico, 
        camposArmonicosToSend,
        setCamposArmonicosToSend,
        camposArmonicosInicioToSend,
        setCamposArmonicosInicioToSend,
        camposArmonicosFinToSend,
        setCamposArmonicosFinToSend,
        camposArmonicosReferenciaToSend,
        setCamposArmonicosReferenciaToSend,
    } = props;

    const getRealKeyNote = (escala, keyNote, tonalidad) => {
        if (tonalidad == 'mayor') {
            return keyNote;
        }
        if (escala == escalaCampoArmonico.menorArmonica) {
            switch (keyNote) {
                case 'A':
                    return 'C'
                case 'B':
                    return 'D'
                case 'C':
                    return 'Eb'
                case 'D':
                    return 'F'
                case 'E':
                    return 'G'
                case 'F':
                    return 'Ab'
                case 'G#':
                    return 'B'
                default:
                    return keyNote;
            }
        } else if (escala == escalaCampoArmonico.menorMelodica) {
            switch (keyNote) {
                case 'A':
                    return 'C'
                case 'B':
                    return 'D'
                case 'C':
                    return 'Eb'
                case 'D':
                    return 'F'
                case 'E':
                    return 'G'
                case 'F#':
                    return 'A'
                case 'G#':
                    return 'B'
                default:
                    return keyNote;
            }
        } else if (escala == escalaCampoArmonico.menorNatural) {
            switch (keyNote) {
                case 'A':
                    return 'C'
                case 'B':
                    return 'D'
                case 'C':
                    return 'Eb'
                case 'D':
                    return 'F'
                case 'E':
                    return 'G'
                case 'F':
                    return 'Ab'
                case 'G':
                    return 'Bb'
                default:
                    return keyNote;
            }
        } else {
            return keyNote;
        }
    }

    const changeTonalidad = (value) => {
        setTonalidadCompasArmonico(value)

        if (camposArmonicosToSend != null) {
            setCamposArmonicosToSend(camposArmonicosToSend.map((x) => {
                return {
                    ...x,
                    RealKeyNote: getRealKeyNote(x.Escala, x.KeyNote, value)
                }
            }))
        }

        if (camposArmonicosInicioToSend != null) {
            setCamposArmonicosInicioToSend(camposArmonicosInicioToSend.map((x) => {
                return {
                    ...x,
                    RealKeyNote: getRealKeyNote(x.Escala, x.KeyNote, value)
                }
            }))
        }

        if (camposArmonicosFinToSend != null) {
            setCamposArmonicosFinToSend(camposArmonicosFinToSend.map((x) => {
                return {
                    ...x,
                    RealKeyNote: getRealKeyNote(x.Escala, x.KeyNote, value)
                }
            }))
        }

        if (camposArmonicosReferenciaToSend != null) {
            setCamposArmonicosReferenciaToSend(camposArmonicosReferenciaToSend.map((x) => {
                return {
                    ...x,
                    RealKeyNote: getRealKeyNote(x.Escala, x.KeyNote, value)
                }
            }))
        }
    }

    return (
        <SwitchSelector
            value={tonalidadCompasArmonico == 'mayor' ? 0 : 1}
            initial={tonalidadCompasArmonico == 'mayor' ? 0 : 1}
            onPress={(value) => changeTonalidad(value)}
            textColor={'black'}
            selectedColor={'white'}
            buttonColor={SECONDARY_COLOR}
            borderColor={PRIMARY_COLOR}
            hasPadding
            options={[
                {
                    label: 'Mayor',
                    value: 'mayor',
                },
                {
                    label: 'Menor',
                    value: 'menor',
                },
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
            style={{
                width: '80%',
            }}
        />
    );
}
