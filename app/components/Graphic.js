import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ({
    figurasConCompas,
    figurasSinCompas,
    dictadoGeneradoTraducidoParam,
    numeradorParam,
    denominadorParam,
    claveParam,
    escalaDiatonica,
    isNotaReferencia
}) => {
    const [figuras, setfiguras] = useState([]);
    const [ figurasLigaduras, setFigurasLigaduras ] = useState(figurasConCompas)
    const [clave, setclave] = useState(claveParam); 
    const [tarjetas, setTarjetas] = useState({ 
       '16-16-16-16':`
        new   StaveNote({clef: "`+claveParam+`", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "`+claveParam+`", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "`+claveParam+`", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "`+claveParam+`", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '8-16-16':
            `
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '16-16-8':
            `
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        `,
        '16-8-16':
            `
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '8-8':
            `
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        `,
        '8-8-8':
            `
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new   StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        `,
    });
    const [tarjetasNotas, setTarjetasNotas] = useState({
        '16-16-16-16': ['16', '16', '16', '16'],
        '8-16-16': ['8', '16', '16'],
        '16-8-16': ['16', '8', '16'], //arieugonl
        '16-16-8': ['16', '16', '8'],
        '8-8': ['8', '8'],
        '8-8-8': ['8', '8', '8'],
    });
    // const [FigurasDictadoConCompas, setFigurasDictadoConCompas] =
    //     useState(figurasConCompas);
    const [dictadoGeneradoTraducido, setdictadoGeneradoTraducido] = useState(
        dictadoGeneradoTraducidoParam
    );
    const [denominador, setDenominador] = useState(denominadorParam);
    const [numerador, setNumerador] = useState(numeradorParam);
    const [tarjetasActuales, setTarjetasActuales] = useState([]);
    const [escalaDiatonicaRes, setEscaladiatonicaRes] = useState('');

    // const traducirClave = (claveParamFunc) =>{

    //     let claveTrans;
    //     switch (claveParamFunc) {
    //         case 'Fa':
    //             claveTrans = 'bass';
    //             break;
    //         case 'Sol':
    //             claveTrans = 'treble';
    //             break;
    //     }
    //     setclave(claveTrans);
    //     return claveTrans
    // }

    const traducirEscala = (escalaDiatonicaParam) => {
        let nombreNota_Trans = '';
        switch (escalaDiatonicaParam) {
            case 'Do':
                nombreNota_Trans = 'C';
                break;
            case 'Sol':
                nombreNota_Trans = 'G';
                break;
            case 'Re':
                nombreNota_Trans = 'D';
                break;
            case 'La':
                nombreNota_Trans = 'A';
                break;
            case 'Mi':
                nombreNota_Trans = 'E';
            case 'Si':
                nombreNota_Trans = 'B';
                break;
            case 'Fa#':
                nombreNota_Trans = 'F#';
                break;
            case 'Solb':
                nombreNota_Trans = 'Gb';
                break;
            case 'Reb':
                nombreNota_Trans = 'Db';
                break;
            case 'Lab':
                nombreNota_Trans = 'Ab';
                break;
            case 'Mib':
                nombreNota_Trans = 'Eb';
                break;
            case 'Sib':
                nombreNota_Trans = 'Bb';
                break;
            case 'Fa':
                nombreNota_Trans = 'F';
        }
        setEscaladiatonicaRes(nombreNota_Trans);
    };

    const getTarjeta = (actualPara, tarjetaAArmar, largoTrj) => {
        let resTarjeta = tarjetaAArmar;
        let hasta = actualPara + largoTrj;
        for (var j = actualPara; j < hasta; j++) {
            if (figuras[j][0] == 'NuevoCompas') {
                break;
            }
            resTarjeta = resTarjeta.replace('ParteMelodica', figuras[j][0]);
            if (figuras[actualPara][0].includes('b')) {
                resTarjeta = resTarjeta.replace(
                    'MODIFICACION',
                    '.addAccidental(0, new   Accidental("b")),'
                );
            } else if (figuras[actualPara][0].includes('#')) {
                resTarjeta = resTarjeta.replace(
                    'MODIFICACION',
                    '.addAccidental(0, new   Accidental("#")),'
                );
            } else if (figuras[actualPara][0].includes('d')) {
                resTarjeta = resTarjeta.replace(
                    'MODIFICACION',
                    '.addDotToAll(),'
                );
            } else {
                resTarjeta = resTarjeta.replace('MODIFICACION', ',');
            }
        }
        return resTarjeta;
    };
    const convert4And2 = (auxParam) => {
        let res = [];
        for (let fig of auxParam) {
            if (fig[1] == '2') {
                fig[1] = 'h';
            } else if (fig[1] == '4') {
                fig[1] = 'q';
            }
            res.push(fig);
        }
        return res;
    };

    const translateToGraphic = (arrayIndicesLigaduras) => {
        let ultimoChar;
        let resDictado = [];
        for (let actual of dictadoGeneradoTraducido) {
            ultimoChar = actual.slice(-1);
            actual = actual.slice(0, actual.length - 1) + '/' + ultimoChar;
            resDictado.push(actual);
        }
        let compasActual;
        let figuraActual;
        let aux = [];
        let index = 0;
        // for (let i = 0;i < figurasConCompas.length; i++){
        //     for (let j=0;j< figurasConCompas.length;j++){
        //         if (figurasConCompas[i][j] && figurasConCompas[i][j].includes('_')){
        //              if (figurasConCompas[i][j][0]=='_') figurasConCompas[i][j] = figurasConCompas[i][j].substring(1);
        //              figurasConCompas[i][j]= figurasConCompas[i][j].replace('_','-')
        //         }
        //     }
        // }
        for (
            compasActual = 0;
            compasActual < figurasConCompas.length;
            compasActual++
        ) {
            for (
                figuraActual = 0;
                figuraActual < figurasConCompas[compasActual].length;
                figuraActual++
            ) {
                if (
                    typeof tarjetasNotas[
                        figurasConCompas[compasActual][figuraActual]
                    ] == 'undefined'
                ) {
                    if( (!figurasConCompas[compasActual][figuraActual].includes('-')) && 
                                (!figurasConCompas[compasActual][figuraActual].includes('_')) ){
                        aux.push([
                            resDictado[index],
                            figurasConCompas[compasActual][figuraActual],
                        ]);
                        index = index + 1;
                    } else if (!figurasConCompas[compasActual][figuraActual].includes('_')) {
                        let notasSeparar = figurasConCompas[compasActual][figuraActual].split('-');
                        for (var h = 0; h < notasSeparar.length; h++) {
                            aux.push([resDictado[index + h], notasSeparar[h]]);
                        } 
                        index = index + notasSeparar.length - 1;
                        index = index + 1;
                    }else if (figurasConCompas[compasActual][figuraActual].includes('_')){
                        if (figurasConCompas[compasActual][figuraActual].charAt(0) === '_'){
                            // me guardo indices para graficar la ligadura
                            arrayIndicesLigaduras.push({
                                compas:compasActual,
                                figura:figuraActual,
                                esAlPrincipio:true,
                                largoCompasAnterior:figurasConCompas[compasActual-1].length,
                            })
                            //caso ligaduras al principio del compas
                            let notasSeparar = figurasConCompas[compasActual][figuraActual].split('_');
                            notasSeparar.shift();
                            for (var h = 0; h < notasSeparar.length; h++) {
                                aux.push([resDictado[index-1], notasSeparar[h]]);
                            } 
                        }else {
                             // me guardo indices para graficar la ligadura
                             arrayIndicesLigaduras.push({
                                compas:compasActual,
                                figura:figuraActual,
                                esAlPrincipio:false
                            })
                            //caso ligaduras en el medio del compas
                            let notasSeparar = figurasConCompas[compasActual][figuraActual].split('_');
                            for (var h = 0; h < notasSeparar.length; h++) {
                                aux.push([resDictado[index], notasSeparar[h]]);
                            } 
                            index = index + 1;
                        }
                    }
                } else {
                    tarjetasActuales.push(
                        figurasConCompas[compasActual][figuraActual]
                    );
                    let notasTrj =
                        tarjetasNotas[
                            figurasConCompas[compasActual][figuraActual]
                        ];
                    for (var h = 0; h < notasTrj.length; h++) {
                        aux.push([resDictado[index + h], '+' + notasTrj[h]]);
                    }
                    index = index + notasTrj.length - 1;
                    index = index + 1;
                }
            }
            if (compasActual != figurasConCompas.length - 1) {
                aux.push(['NuevoCompas']);
            }
        }
        let aux2 = convert4And2(aux);
        setfiguras(aux2);
    };

    function removeItemFromArr(arr, item) {
        return arr.filter(function (e) {
            return e !== item;
        });
    }

    const existLigadura = () =>{
        let res = false;
        figurasLigaduras.forEach((figuras)=>{
            figuras.forEach((fig)=>{
                if (fig.includes('_')){
                    res =  true;
                }
            })
        })
        return res;
    }

    const getLigadurasToGraphic = (arrayIndicesLigaduras) =>{
        res = 'const ties = [\n';
        console.log(arrayIndicesLigaduras)
        arrayIndicesLigaduras.forEach((ligadura)=>{
                        let indice1 = ligadura.esAlPrincipio? ligadura.largoCompasAnterior : ligadura.figura;
                        let indice2 = ligadura.esAlPrincipio? ligadura.figura : ligadura.figura+1;
                        // el grafico toma los compases apartir de 1
                        let numeroCompas1 = ligadura.esAlPrincipio ? ligadura.compas -1 : ligadura.compas;
                        let numeroCompas2 =  ligadura.compas;
                        res = res.concat(`
                            new StaveTie({
                            first_note: notesMeasure`+numeroCompas1+`[`+indice1 +`],
                            last_note: notesMeasure`+numeroCompas2+`[`+indice2+`],
                            first_indices: [0],
                            last_indices: [0],
                            }),
                        \n`)
        })
        if (res != '') {
            res = res.concat( `];\n 
            ties.forEach((t) => {
                t.setContext(context).draw();
            });\n`)
        } 
        return res;
    }

    const getFigurasyDuracion = () => {
        arrayIndicesLigaduras = []
        translateToGraphic(arrayIndicesLigaduras);
        let res = '';
        let compasActual = 1;
        let sostenido = false;
        let bemol = false;
        let punto = false;
        let esTarjeta = false;
        let huboTarjeta = false;
        // FIGURAS LLEGA CON UN UNDEFINE EN izquierda [[undefined, "h"]]
        for (let actual = 0; actual < figuras.length; actual++) {
            if (figuras[actual] != 'NuevoCompas') {
                if (figuras[actual][1].includes('+')) {
                    esTarjeta = true;
                }
                if (figuras[actual][1].includes('d')) {
                    figuras[actual][1].replace('d', '');
                    punto = true;
                }
                if (figuras[actual][0].includes('#')) {
                    figuras[actual][0].replace('#', '');
                    sostenido = true;
                }
                if (figuras[actual][0].includes('b')) {
                    figuras[actual][0].replace('b', '');
                    bemol = true;
                }
                if (!sostenido && !bemol && !punto && !esTarjeta) {
                    res = res.concat(
                        'new  StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }),' +
                            '\n'
                    );
                } else if (sostenido && !esTarjeta) {
                    res = res.concat(
                        'new  StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new   Accidental("#")),' +
                            '\n'
                    );
                } else if (bemol && !esTarjeta) {
                    res = res.concat(
                        'new  StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new   Accidental("b")),' +
                            '\n'
                    );
                } else if (punto && !esTarjeta) {
                    res = res.concat(
                        'new  StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addDotToAll(),' +
                            '\n'
                    );
                } else if (esTarjeta) {
                    res = res.concat(
                        `]);` +
                            `\n` +
                            `var notesTarjeta` +
                            compasActual +
                            ` = []`
                    );
                    res = res.concat(
                        `\n` +
                            `var notesTarjeta` +
                            compasActual +
                            `= notesTarjeta` +
                            compasActual +
                            `.concat([`
                    );

                    let trj = tarjetasActuales.shift();
                    let largoTrj = tarjetasNotas[trj].length;
                    let tarjetaAArmar = tarjetas[trj];
                    res = res.concat(
                        getTarjeta(actual, tarjetaAArmar, largoTrj)
                    );
                    actual = actual + largoTrj - 1;

                    res = res.concat(']);' + '\n');
                    if (!huboTarjeta) {
                        res = res.concat(`beams = []; ` + '\n');
                    }
                    huboTarjeta = true;
                    res = res.concat(
                        `beams = beams.concat([
                        new  Beam(notesTarjeta` +
                            compasActual +
                            `)
                        ])` +
                            '\n' +
                            `notesMeasure` +
                            compasActual +
                            ` = notesMeasure` +
                            compasActual +
                            `.concat(notesTarjeta` +
                            compasActual +
                            `);` +
                            '\n' +
                            `notesMeasure` +
                            compasActual +
                            ` = notesMeasure` +
                            compasActual +
                            `.concat([\n`
                    );
                }
            } else if (figuras[actual] == 'NuevoCompas') {
                compasActual = compasActual + 1;

                res = res.concat(
                    `     
                ]); \n
                var beams =   Beam.generateBeams( notesMeasure` +
                        (compasActual - 1) +
                        `);
                 Formatter.FormatAndDraw(context, staveMeasure` +
                        (compasActual - 1) +
                        `, notesMeasure` +
                        (compasActual - 1) +
                        `);\n`
                );

                //si hubo tarjeta en este compas entra aqui
                if (huboTarjeta) {
                    res = res.concat(
                        ` beams.forEach(function(b) {b.setContext(context).draw()})` +
                            `\n`
                    );
                    huboTarjeta = false;
                }
                res = res.concat(
                    `          
                // Notas dentro del compas
                var staveMeasure` +
                        compasActual +
                        ` = new  Stave( \n
                staveMeasure` +
                        (compasActual - 1) +
                        `.width + staveMeasure` +
                        (compasActual - 1) +
                        `.x, 
                0,
                400
                );\n
                staveMeasure` +
                        compasActual +
                        `.setContext(context).draw();\n`
                );

                res = res.concat(
                    ` // Notas dentro del compas
                notesMeasure` +
                        compasActual +
                        ` = [];
                notesMeasure` +
                        compasActual +
                        ` = notesMeasure` +
                        compasActual +
                        `.concat([ `
                );
            }

            sostenido = false;
            bemol = false;
            punto = false;
            esTarjeta = false;
        } //endFOR

        // //caso tarjetas
        // if (esTarjeta){
        //     res = res.concat(
        //         `]; \n beams = [
        //             new  Beam(notesMeasure`+compasActual+`)
        //         `
        //     )
        // }
        res = res.concat(
            `]); \n
            var beams =   Beam.generateBeams( notesMeasure` +
                compasActual.toString() +
                `);
         Formatter.FormatAndDraw(context, staveMeasure` +
                compasActual.toString() +
                `, notesMeasure` +
                compasActual.toString() +
                `);\n
        `
        );

        
        //si hubo tarjeta en este compas entra aqui
        if (huboTarjeta) {
            res = res.concat(
                ` beams.forEach(function(b) {b.setContext(context).draw()})` +
                    `\n`
            );
            huboTarjeta = false;
        }
        if (existLigadura(figurasLigaduras)){
            res = res.concat(getLigadurasToGraphic(arrayIndicesLigaduras));
        }
        return res;
    };


    const largoPentagrama = () =>{
        if (isNotaReferencia) {
            return '930'
        } else {
            return '10000'
        }
    }

    const [Html, setHtml] = useState('');

    useEffect(() => {
        traducirEscala(escalaDiatonica);
        // traducirClave(claveParam);
        setHtml(
            `    
      <style> 
      .music-render {            
          margin:  auto;
          height: 1px;
      }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/vexflow/build/cjs/vexflow.js"></script>

      </script>
      <script>
      function writeNote(){  //(tono,ritmo)
        
            const { Renderer, Stave, Accidental, StaveNote, Beam, Formatter, Dot,StaveTie } = Vex.Flow;

  
          // Create an SVG renderer and attach it to the DIV element named "boo".
          var div = document.getElementById("boo")
          var renderer = new Renderer(div, Renderer.Backends.SVG);
          
          // Size our SVG:
          renderer.resize(`+largoPentagrama() +`, 300);
          
          // And get a drawing context:
          var context = renderer.getContext();
          
          
          // measure 1
            var staveMeasure1 = new  Stave(10, 0, 500);
            staveMeasure1.addClef("` +
                clave +
                `").addTimeSignature('` +
                numeradorParam +
                `/` +
                denominadorParam +
                `').addKeySignature("` +
                escalaDiatonicaRes +
                `").
                setContext(context).draw();
            notesMeasure1 = [];
            notesMeasure1 = notesMeasure1.concat([
              ` +
                getFigurasyDuracion() +
                `
      }
      </script>
          <div class="music-render" id="boo"></div> 
          <script>writeNote();</script>
  `
        );
        console.log(Html)
    }, [escalaDiatonicaRes]); 
    return (
        // <WebView source={{ uri: 'https://reactnative.dev/' }} />
        <WebView
            source={{ html: Html }}
            style={{
                marginLeft:1100,
                width: 1500, // aumentando este ancho logro aumentar el taman;o de las figuras               
            }}
            showsHorizontalScrollIndicator={false}            
        />
    );
};
