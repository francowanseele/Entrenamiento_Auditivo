import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ({
    figurasParam,
    dictadoGeneradoTraducidoParam,
    numeradorParam,
    denominadorParam,
    claveParam,
}) => {
    const [figuras, setfiguras] = useState([]);
    const [tarjetas, setTarjetas] = useState({ 
       '16-16-16-16':`
        new VF.StaveNote({ keys: ["ParteMelodica"], duration: "16" }),
        new VF.StaveNote({ keys: ["ParteMelodica"], duration: "16" }),
        new VF.StaveNote({ keys: ["ParteMelodica"], duration: "16" }),
        new VF.StaveNote({ keys: ["ParteMelodica"], duration: "16" }),
      `,
    })
    const [FigurasDictadoConCompas, setFigurasDictadoConCompas] =
        useState(figurasParam);
    const [dictadoGeneradoTraducido, setdictadoGeneradoTraducido] = useState(
        dictadoGeneradoTraducidoParam
    );
    const [denominador, setDenominador] = useState(denominadorParam);
    const [numerador, setNumerador] = useState(numeradorParam);
    const [clave, setclave] = useState(claveParam);
    // const [figuras, setfiguras] = useState(
    // [       
    //   ["B/4","4"],      
    //   ["B/4","4"],
    //   ["B/4","4"],
    //   ["B/4","4"],      
    //   ["B/4","4"],
    //   ["NuevoCompas"],
    //   ["Bb/4","4"],
    //   ["A/4","2"],
    //   ["B/4","2"],
    //   ["C/4","2"],
    //   ["B/4","2"],
    //   ["B/4","2"],
    //   ["B/4","16-16-16-16"],
    //   ["NuevoCompas"],
    //   ["B/4","16-16-16-16"],
    //   ["A/4","2"],
    //   ["B/4","2"],
    //   ["C/4","2"],
    //   ["B/4","2"],
    //   ["NuevoCompas"],
    //   ["B/4","2"],
    //   ["B/4","1"],
    //   ["B/4","4"],
    //   ["C/4","4"],
    //   ["B/4","16-16-16-16"]
    //   ] );

    const getTarjeta = (actual, tarjetaAArmar) =>{
        let resTarjeta = tarjetaAArmar;
        console.log('actualParam'+actual)
        console.log('figuras'+figuras)
        let hasta = actual+4;
        for (var i = 0; i < hasta; i++) {
        console.log('i= '+i);
        console.log(figuras[i][0]);
        resTarjeta = resTarjeta.replace('ParteMelodica',figuras[i][0]);
        }
        console.log('resTarjeta'+resTarjeta)
        return resTarjeta
    };

    const translateToGraphic = () => {
        let ultimoChar;
        let resDictado = [];
        for (let actual of dictadoGeneradoTraducido) {
            ultimoChar = actual.slice(-1);
            actual = actual.slice(0, actual.length - 1) + '/' + ultimoChar;
            resDictado.push(actual);
        }
        let compasActual;
        let figuraActual;
        let res = [];
        for ( compasActual = 0; compasActual < FigurasDictadoConCompas.length; compasActual++) {
            for (figuraActual = 0; figuraActual< FigurasDictadoConCompas[compasActual].length; figuraActual++) {
                res.push([
                    resDictado[figuraActual],
                    FigurasDictadoConCompas[compasActual][figuraActual]
                ]);
            }
            // if (compasActual != FigurasDictadoConCompas.length) {
            //     res.push(['NuevoCompas']);
            // }
            res.push(['NuevoCompas']);
        }
        // console.log(resDictado);
        // console.log(res);
        return res;
    };

    const getFigurasyDuracion = () => {
        setfiguras(translateToGraphic());
        console.log('dictadoGeneradoTraducido===>' + dictadoGeneradoTraducido);
        console.log('FigurasDictadoConCompas===>' + FigurasDictadoConCompas);
       
        let res = '';
        let compasActual = 1;
        let sostenido = false;
        let bemol = false;
        let punto = false;
        let esTarjeta = false;
        let huboTarjeta = false;
        for (let actual in figuras) {
            if (figuras[actual] != 'NuevoCompas') {
                if (figuras[actual][1].includes('-')){
                    // console.log('entro al iff tarjeta')
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
                        'new Vex.Flow.StaveNote({ keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }),' +
                            '\n'
                    );
                } else if (sostenido && !esTarjeta) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({ keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new VF.Accidental("#")),' +
                            '\n'
                    );
                } else if (bemol && !esTarjeta) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({ keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addAccidental(0, new VF.Accidental("b")),' +
                            '\n'
                    );
                } else if (punto && !esTarjeta ) {
                    res = res.concat(
                        'new Vex.Flow.StaveNote({ keys: ["' +
                            figuras[actual][0] +
                            '"], duration: "' +
                            figuras[actual][1] +
                            '" }).addDotToAll(),' +
                            '\n'
                    );
                } 
                else if(esTarjeta){
                   
                    // console.log('entro a tarjeta')
                    res = res.concat( `]);`+ `\n` +`var notesTarjeta`+compasActual+` = []`);
                    res = res.concat( `\n` +`var notesTarjeta`+compasActual+`= notesTarjeta`+compasActual+`.concat([`);
                    console.log('actual'+actual)
                    console.log("tarjeta: "+tarjetas[figuras[actual][1]])
                    res = res.concat(getTarjeta(actual,tarjetas[figuras[actual][1]]+ '\n')
                    );
                    // res = res.concat(tarjetas[figuras[actual][1]]);

                    res= res.concat(']);'+ '\n');
                    if (!huboTarjeta){
                        res = res.concat(`beams = []; `+'\n')
                    }
                    huboTarjeta =true;
                    res= res.concat(
                    `beams = beams.concat([
                        new Vex.Flow.Beam(notesTarjeta`+compasActual+`)
                        ])`+ '\n'+
                        `notesMeasure`+compasActual+` = notesMeasure`+compasActual+`.concat(notesTarjeta`+compasActual+`);`
                        + '\n'+`notesMeasure`+compasActual+` = notesMeasure`+compasActual+`.concat([\n`
                        );
                }
            } else if (figuras[actual] == 'NuevoCompas') {
                compasActual = compasActual + 1;
                
                res = res.concat(
                    `     
                ]); \n
                Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure` +
                        (compasActual - 1) +
                        `, notesMeasure` +
                        (compasActual - 1) +
                        `);\n`);
            
                //si hubo tarjeta en este compas entra aqui 
                if (huboTarjeta){
                res = res.concat(` beams.forEach(function(b) {b.setContext(context).draw()})`+`\n`);
                huboTarjeta = false;
                
                }
                res = res.concat(`          
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
                            `.setContext(context).draw();\n`);
                    
            
                res = res.concat(` // Notas dentro del compas
                notesMeasure`+compasActual+` = [];
                notesMeasure`+compasActual+` = notesMeasure`+compasActual+`.concat([ `);
            
            }           

            sostenido = false;
            bemol = false;
            punto = false;
            esTarjeta = false;
        }//endFOR

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
        Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure` +
                compasActual.toString() +
                `, notesMeasure` +
                compasActual.toString() +
                `);\n
        `
        );
         //si hubo tarjeta en este compas entra aqui 
         if (huboTarjeta){
            res = res.concat(` beams.forEach(function(b) {b.setContext(context).draw()})`+`\n`);
            huboTarjeta = false;
            
            }
       
        return res;
    };

    const [Html, setHtml] = useState('');

    useEffect(() => {
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
          renderer.resize(2500, 300);
          
          // And get a drawing context:
          var context = renderer.getContext();
          
          
          // measure 1
            var staveMeasure1 = new Vex.Flow.Stave(10, 0, 300);
            staveMeasure1.addClef("` +
                clave +
                `").addTimeSignature('` +
                numerador +
                `/` +
                denominador +
                `').setContext(context).draw();
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
    }, []); 

    return (
        <WebView
            source={{ html: Html }}
            style={{
                alignSelf: 'center',
                width: 3000, // aumentando este ancho logro aumentar el taman;o de las figuras
                maxHeight: '100%',
                backgroundColor: 'red',
            }}
        />
    );
};
