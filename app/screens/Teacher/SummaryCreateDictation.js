import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import {
    getParams,
    getStorageIsLogged,
} from '../../../utils/asyncStorageManagement';
import { addConfigDictationApi } from '../../api/course';

export default function SummaryCreateDictation({ route }) {
    const {
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
    } = route.params;

    const createConfigDictation = async () => {
        const dataStorage = await getParams();
        const logged = await getStorageIsLogged();

        if (logged) {
            const data = {
                name: nameConfig,
                description: descriptionConfig,
                giroMelodicoRegla: giro_melodico_regla,
                tesitura: tesitura,
                startNotes: notas_inicio,
                endNotes: notas_fin,
                clefPriority: clave_prioridad,
                escalaDiatonicaRegla: escala_diatonica_regla,
                celulaRitmicaRegla: celula_ritmica_regla,
                nroCompases: nro_compases,
                compasRegla: compas_regla,
                simple: simple,
                notaBase: nota_base,
                bpm: BPM,
                dictado_ritmico: dictationRhythmic,
            };

            const resultNewConfig = await addConfigDictationApi(
                course.id,
                module.id,
                dataStorage.id,
                data
            );

            if (resultNewConfig.ok) {
                // TODO:
                console.log('OK !!!');
            } else {
                // TODO:
                console.log('Error al crear la configuración');
            }
        } else {
            // TODO: user no logged
        }
    };

    return (
        <View>
            <Text>Summary dictation porf...</Text>
            <Button
                title="Finalizar"
                onPress={async () => await createConfigDictation()}
            />
        </View>
    );
}
