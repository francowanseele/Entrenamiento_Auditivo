export const nombreCifrado_TetradaTriada = {
    tetrada_Maj7: 'Maj7',
    tetrada_6: '6',
    tetrada_6sus2: '6sus2',
    tetrada_maj7sus2: 'maj7sus2',
    tetrada_6sus4: '6sus4',
    tetrada_maj7sus4: 'maj7sus4',
    tetrada_m7: 'm7',
    tetrada_m6: 'm6',
    tetrada_7: '7',
    tetrada_m7b5: 'm7b5',
    tetrada_mMaj7: 'mMaj7',
    tetrada_AugMaj7: 'AugMaj7',
    tetrada_07: '07',
    tetrada_7hash5: '7(#5)',
    tetrada_7b5: '7(b5)',
    tetrada_7sus2: '7sus2',
    tetrada_7sus4: '7sus4',
    triada_Mayor: 'Mayor',
    triada_Menor: 'Menor',
    triada_Disminuido: 'Disminuido',
    triada_Aumentado: 'Aumentado',
    triada_sus2: 'sus2',
    triada_sus4: 'sus4',
};

export const intervaloTensiones = {
    novenaMenor: 'b9',     // b9
    novenaMayor: '9',     // 9
    novenaAumentada: '#9', // #9
    oncenaJusta: '11',     // 11
    oncenaAumentada: '#11', // #11
    tercenaMenor: 'b13',    // b13
    tercenaMayor: '13',    // 13,
};

export const escalaCampoArmonico = {
    mayor: 'Mayor',
};

export const acordeType = {
    tetrada: 0,
    triada: 1,
    getTypeDescription: (type) => {
        switch (type) {
            case 0:
                return 'Tétrada'
            case 1: 
                return 'Tríada'
            default:
                '';
        }
    }
};
