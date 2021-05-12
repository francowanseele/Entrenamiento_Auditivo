import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ( {notasParam,cantCompasesParam,numeradorParam, denominadorParam} ) =>{

    const [notasPorCompas, setNotasPorCompas] = useState(notasParam);
    const [cantCompases, setcantCompases] = useState(cantCompasesParam);
    const [denominador, setDenominador] = useState(denominadorParam);
    const [numerador, setNumerador] = useState(numeradorParam);


  return (    
          <WebView 
          source={{ html:  
    `    
        <style>
        .music-render {            
            margin: 30px auto;
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
            renderer.resize(2500, 100);
            
            // And get a drawing context:
            var context = renderer.getContext();
            
            
            // measure 1
              var staveMeasure1 = new Vex.Flow.Stave(10, 0, 300);
              staveMeasure1.addClef("treble").addTimeSignature('`+numerador+`/`+denominador+`').setContext(context).draw();
            
              var notesMeasure1 = [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
                new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
              ];
            
              // Helper function to justify and draw a 4/4 voice
              Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
            
            
            
            
            
              // measure 2 - Linea comienzo nuevo compas
              var staveMeasure2 = new Vex.Flow.Stave(
                staveMeasure1.width + staveMeasure1.x,
                0,
                400
              );
              staveMeasure2.setContext(context).draw();
            
            
             // Notas dentro del compas
              var notesMeasure2_part1 = [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
              ];
            
              var notesMeasure2_part2 = [
                new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
                new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
              ];
            
              // create the beams for 8th notes in 2nd measure
              var beam1 = new Vex.Flow.Beam(notesMeasure2_part1);
              var beam2 = new Vex.Flow.Beam(notesMeasure2_part2);
            
              var notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);
            
              Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);
            
              // Render beams
              beam1.setContext(context).draw();
              beam2.setContext(context).draw();
              
              
              
              
              // measure 3 -Linea comienzo de nuevo compas
              var staveMeasure3 = new Vex.Flow.Stave( staveMeasure2.width  + staveMeasure2.x ,
                0,
                400
              );
              staveMeasure3.setContext(context).draw();
              
              
              // measure 3   Lo que va dentro del compas
              staveMeasure3.setContext(context).draw();
            
              var notesMeasure3 = [
                new VF.StaveNote({clef: "treble", keys: ["e##/5"], duration: "8d" }).
                  addAccidental(0, new VF.Accidental("##")).addDotToAll(),
            
                new VF.StaveNote({clef: "treble", keys: ["eb/5"], duration: "16" }).
                  addAccidental(0, new VF.Accidental("b")),
            
                new VF.StaveNote({clef: "treble", keys: ["d/5", "eb/4"], duration: "h" }).
                    addDot(0),
            
                new VF.StaveNote({clef: "treble", keys: ["c/5", "eb/5", "g#/5"], duration: "q" }).
                  addAccidental(1, new VF.Accidental("b")).
                  addAccidental(2, new VF.Accidental("#")).addDotToAll()
              ];
            
              // Helper function to justify and draw a 4/4 voice
              Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure3, notesMeasure3);
        }
        </script>
            <div class="music-render" id="boo"/> 
            <script>writeNote();</script>
    `
    }} 
    style={{ marginTop: 50,
              alignSelf:'center',
              width:2500,
              backgroundColor:'red'
     }}
 />

  );
}

