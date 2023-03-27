export const tipoIntervalo = {
    melodico: 0,
    armonico: 1,
    ambos: 3,
    getTipoIntervaloDescription: (type) => {
        switch (type) {
            case 0:
                return 'Melódico'
            case 1: 
                return 'Armónico'
            case 2: 
                return 'Melódico/Armónico'
            default:
                '';
        }
    }
};
