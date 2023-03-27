// notes = notas_inicio/notas_fin; notesRule = giros_melodico_regla
export function notesInNoteRule(notes, notesRule) {
    var missing = false;

    if (notes.length > 0 && notesRule.length > 0) {
        for (let i = 0; i < notes.length && !missing; i++) {
            const note = notes[i];
            var isHere = false;
            notesRule.forEach((noteRule) => {
                noteRule.giros_melodicos.forEach((n) => {
                    if (note == n) {
                        isHere = true;
                    }
                });
            });
            missing = !isHere;
        }
    }

    return !missing;
}

// [{ clave: 'Sol', prioridad: 1 }, { clave: 'Fa', prioridad: 1 }]
export function atLeastOneClef(clefs) {
    return clefs[0].prioridad != 0 || clefs[1].prioridad != 0;
}

// [{escala_diatonica: 'Do', prioridad: 1} ... ]
export function atLeastOneTonality(tonalities) {
    var ok = false;
    tonalities.forEach((t) => {
        ok = ok || t.prioridad > 0;
    });

    return ok;
}

export function atLeastOneInterval(intervalos) {
    return intervalos.find((x) => x.Prioridad > 0) != null;
}
