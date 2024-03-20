const ALTERACIONES_ESCALA_DIATONICA = [
    {
        escala: 'C',
        escalaTraducida: 'Do',
        alteracion: [],
        base: 'C',
    },
    {
        escala: 'G',
        escalaTraducida: 'Sol',
        alteracion: ['F#'],
        base: 'G',
    },
    {
        escala: 'D',
        escalaTraducida: 'Re',
        alteracion: ['C#', 'F#'],
        base: 'D',
    },
    {
        escala: 'A',
        escalaTraducida: 'La',
        alteracion: ['C#', 'F#', 'G#'],
        base: 'A',
    },
    {
        escala: 'E',
        escalaTraducida: 'Mi',
        alteracion: ['C#', 'F#', 'G#', 'D#'],
        base: 'E',
    },
    {
        escala: 'B',
        escalaTraducida: 'Si',
        alteracion: ['C#', 'F#', 'G#', 'D#', 'A#'],
        base: 'B',
    },
    {
        escala: 'F#',
        escalaTraducida: 'Fa#',
        alteracion: ['C#', 'F#', 'G#', 'D#', 'A#', 'E#'],
        base: 'F',
    },
    {
        escala: 'Gb',
        escalaTraducida: 'Solb',
        alteracion: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'],
        base: 'G',
    },
    {
        escala: 'Db',
        escalaTraducida: 'Reb',
        alteracion: ['Gb', 'Ab', 'Bb', 'Db', 'Eb'],
        base: 'D',
    },
    {
        escala: 'Ab',
        escalaTraducida: 'Lab',
        alteracion: ['Ab', 'Bb', 'Db', 'Eb'],
        base: 'A',
    },
    {
        escala: 'Eb',
        escalaTraducida: 'Mib',
        alteracion: ['Ab', 'Bb', 'Eb'],
        base: 'E',
    },
    {
        escala: 'Bb',
        escalaTraducida: 'Sib',
        alteracion: ['Bb', 'Eb'],
        base: 'B',
    },
    {
        escala: 'F',
        escalaTraducida: 'Fa',
        alteracion: ['Bb'],
        base: 'F',
    },
];
const NOTAS_BASICAS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// A partir de las notas basicas cuenta cuantas notas hay involucradas
const getNroNotasInvolucradas = (notaIni, notaFin) => {
    const notasBase = NOTAS_BASICAS;
    const i_ini = notasBase.indexOf(notaIni);
    const i_fin = notasBase.indexOf(notaFin);

    if (i_ini <= i_fin) {
        return i_fin - i_ini + 1;
    } else {
        return notasBase.length - i_ini + (i_fin + 1);
    }
};

/**
 * 
 * @param {string} nota ex: 'C' or 'Ab' (sin altura - número)
 * @param {int} nroMov 
 * @returns {string}
 */
const getNotaTransformada = (nota, nroMov) => {
    const alteracionesSostenido = nota.match(/#/g) || []
    const alteracionesBmol = nota.match(/b/g) || []
    let nuevaNota = nota
    if (alteracionesSostenido.length) {
        nuevaNota = nuevaNota.replace('#', '')
    }
    if (alteracionesBmol.length) {
        nuevaNota = nuevaNota.replace('b', '')
    }
    
    // nuevaNota es del tipo C (sin alteraciones)
    const nombreNota = nuevaNota

    const notasBase = NOTAS_BASICAS;
    const i_origin = notasBase.indexOf(nombreNota);

    const i_tarns = (i_origin + nroMov + notasBase.length) % notasBase.length;

    if (alteracionesSostenido.length || alteracionesBmol.length) {
        // Existe alteracion
        return notasBase[i_tarns].concat(alteracionesSostenido.join(''), alteracionesBmol.join(''));
    } else {
        // No Existe alteracion
        return notasBase[i_tarns];
    }
};

// Pasa cada nota en 'notas' a la escala diatónica 'tonalidad'
// Ej de notas = ['C', 'Ab', 'D']
export const transformarAEscalaDiatonica = (notas, tonalidad) => {
    const tonalidadBase = ALTERACIONES_ESCALA_DIATONICA.find(x => x.escala == tonalidad)?.base;
    if (tonalidadBase == null) return notas;

    const nroInvolucrados = getNroNotasInvolucradas('C', tonalidadBase);

    var nroMovimiento = 0;
    nroInvolucrados > 5
        ? (nroMovimiento = nroInvolucrados - 8)
        : (nroMovimiento = nroInvolucrados - 1);

    var notasMovidas = [];

    notas.forEach((nota) => {
        const notaTrans = getNotaTransformada(nota, nroMovimiento);
        notasMovidas.push(notaTrans);
    });

    // Aplicar alteraciones dependiendo de la escala diatónica
    const alteraciones = ALTERACIONES_ESCALA_DIATONICA.find(x => x.escala == tonalidad)?.alteracion
    let notasTransformadas = [];
    notasMovidas.forEach(n => {
        let nResult = n;
        alteraciones.forEach(alt => {
            if (n == alt.slice(0, 1)) {
                nResult = n.concat(alt.slice(-1))
                nResult = nResult.replace('#b', '')
                nResult = nResult.replace('b#', '')
            }
        });
        notasTransformadas.push(nResult);
    });

    return notasTransformadas;
};


// console.log(transformarAEscalaDiatonica(['C', 'Ab'], 'Db'))