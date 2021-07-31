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
}) => {
    const [figuras, setfiguras] = useState([]);
    const [clave, setclave] = useState(claveParam);
    const [tarjetas, setTarjetas] = useState({
        '16-16-16-16':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '8-16-16':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '16-16-8':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        `,
        '16-8-16':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "16" })MODIFICACION
        `,
        '8-8':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        `,
        '8-8-8':
            `
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new VF.StaveNote({clef: "` +
            claveParam +
            `", keys: ["ParteMelodica"], duration: "8" })MODIFICACION
        new VF.StaveNote({clef: "` +
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
                    '.addAccidental(0, new VF.Accidental("b")),'
                );
            } else if (figuras[actualPara][0].includes('#')) {
                resTarjeta = resTarjeta.replace(
                    'MODIFICACION',
                    '.addAccidental(0, new VF.Accidental("#")),'
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

    const translateToGraphic = () => {
        let ultimoChar;
        let resDictado = [];
        for (let actual of dictadoGeneradoTraducido) {
            ultimoChar = actual.slice(-1);
            actual = actual.slice(0, actual.length - 1) + '/' + ultimoChar;
            resDictado.push(actual);
        }
        // console.log('resDictadoconBarrita==>'+resDictado)
        let compasActual;
        let figuraActual;
        let aux = [];
        let index = -1;
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
                index = index + 1;
                if (
                    typeof tarjetasNotas[
                        figurasConCompas[compasActual][figuraActual]
                    ] == 'undefined'
                ) {
                    if (
                        !figurasConCompas[compasActual][figuraActual].includes(
                            '-'
                        )
                    ) {
                        aux.push([
                            resDictado[index],
                            figurasConCompas[compasActual][figuraActual],
                        ]);
                    } else {
                        let notasSeparar =
                            figurasConCompas[compasActual][figuraActual].split(
                                '-'
                            );

                        for (var h = 0; h < notasSeparar.length; h++) {
                            aux.push([resDictado[index + h], notasSeparar[h]]);
                        }
                        index = index + notasSeparar.length - 1;
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

    const getFigurasyDuracion = () => {
        translateToGraphic();
        // console.log('dictadoGeneradoTraducido===>' + dictadoGeneradoTraducido);
        // console.log('FigurasConCompas===>' + figurasConCompas);
        // console.log('FigurasSinCompas===>' + figurasSinCompas);
        // console.log('FiguraspostFunc///>      '+figuras)

        let res = '';
        let compasActual = 1;
        let sostenido = false;
        let bemol = false;
        let punto = false;
        let esTarjeta = false;
        let huboTarjeta = false;
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
                // console.log(esTarjeta)
                if (!sostenido && !bemol && !punto && !esTarjeta) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({clef: "' +
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
                        'new Vex.Flow.StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new VF.Accidental("#")),' +
                            '\n'
                    );
                } else if (bemol && !esTarjeta) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new VF.Accidental("b")),' +
                            '\n'
                    );
                } else if (punto && !esTarjeta) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({clef: "' +
                            clave +
                            '", keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addDotToAll(),' +
                            '\n'
                    );
                } else if (esTarjeta) {
                    // console.log('entro a tarjeta')
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
                        new Vex.Flow.Beam(notesTarjeta` +
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
                var beams = VF.Beam.generateBeams( notesMeasure` +
                        (compasActual - 1) +
                        `);
                Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure` +
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
                        ` = new Vex.Flow.Stave( \n
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
        //             new Vex.Flow.Beam(notesMeasure`+compasActual+`)
        //         `
        //     )
        // }
        res = res.concat(
            `]); \n
            var beams = VF.Beam.generateBeams( notesMeasure` +
                compasActual.toString() +
                `);
        Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure` +
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

        return res;
    };

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
      <script src="https://unpkg.com/vexflow/releases/vexflow-debug.js"> 
      </script>
      <script>
      function writeNote(pitch, rhythm){  //(tono,ritmo)
        
          VF = Vex.Flow;
  
          // Create an SVG renderer and attach it to the DIV element named "boo".
          var div = document.getElementById("boo")
          var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
          
          // Size our SVG:
          renderer.resize(10000, 300);
          
          // And get a drawing context:
          var context = renderer.getContext();
          
          
          // measure 1
            var staveMeasure1 = new Vex.Flow.Stave(10, 0, 500);
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
          <div class="music-render" id="boo"/> 
          <script>writeNote();</script>
  `
        );
        // console.log(Html)
    }, [escalaDiatonicaRes]);

    return (
        <View>
            <WebView
                showsHorizontalScrollIndicator={false}
                source={{ html: Html }}
                style={{
                    marginLeft: 1100,
                    //alignSelf: 'center',
                    width: 1500, // aumentando este ancho logro aumentar el taman;o de las figuras
                    // maxHeight: '100%',
                    // backgroundColor: '#f8c471',
                }}
            />
        </View>
    );
};
