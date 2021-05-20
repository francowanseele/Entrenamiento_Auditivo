import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ( {figurasParam,cantCompasesParam,numeradorParam, denominadorParam, claveParam} ) =>{

    const [cantCompases, setcantCompases] = useState(cantCompasesParam);
    const [figuras, setfiguras] = useState(figurasParam); 
    const [denominador, setDenominador] = useState(denominadorParam);
    const [numerador, setNumerador] = useState(numeradorParam);
    const [clave,setclave] = useState(claveParam);

    // [                             
      // ["A/4","8"], 
    //   ["B/4","4"],
    //   ["C/4","4"],
    //   ["B/4","1"],
    //   ["B/4","1"],
    //   ["NuevoCompas"],
    //   ["A/4","2"], 
    //   ["B/4","2"],
    //   ["C/4","2"],
    //   ["B/4","2"],
    //   ["B/4","2"],
    //   ["NuevoCompas"],
    //   ["A/4","2"], 
    //   ["B/4","2"],
    //   ["C/4","2"],
    //   ["B/4","2"],
    //   ["NuevoCompas"],
    //   ["B/4","2"],
    //   ["B/4","1"], 
    //   ["B/4","4"],
    //   ["C/4","4"]                                                     
    //   ]
    // const translateToGraphic = () =>{

    //   for (let i=0;i<figuras.length;i++){
        
    //   }

    // }
 
    const getFigurasyDuracion = () =>{
      let res = '';
      let compasActual =1;
      for (let actual in figuras){
        if ( figuras[actual] != 'NuevoCompas'){
        res = res.concat('new Vex.Flow.StaveNote({ keys: ["'+figuras[actual].[0]+'"], duration: "'+figuras[actual].[1]+'" }),'+'\n')
        }else 
          if ( figuras[actual] == 'NuevoCompas'){ 
          compasActual = compasActual +1;
          res = res.concat(`     
            ]; \n

            Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure`+(compasActual-1)+`, notesMeasure`+(compasActual-1)+`);
            var staveMeasure`+compasActual+` = new Vex.Flow.Stave( \n
              staveMeasure`+(compasActual-1)+`.width + staveMeasure`+(compasActual-1)+`.x, 
              0,
              400
            );\n
            staveMeasure`+compasActual+`.setContext(context).draw();\n
            
            // Notas dentro del compas
            var notesMeasure`+compasActual+`= [
            `)
        }
      }
      res = res.concat(`]; \n
        Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure`+compasActual.toString()+`, notesMeasure`+compasActual.toString()+`);\n
        `)
      
      return res;
    }

    const [Html, setHtml] = useState('')


    useEffect(()=>{
      setHtml(`    
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
          renderer.resize(2500, 100);
          
          // And get a drawing context:
          var context = renderer.getContext();
          
          
          // measure 1
            var staveMeasure1 = new Vex.Flow.Stave(10, 0, 300);
            staveMeasure1.addClef("`+clave+`").addTimeSignature('`+numerador+`/`+denominador+`').setContext(context).draw();
          
            var notesMeasure1 = [
              `+getFigurasyDuracion()+`
            
          
          
      }
      </script>
          <div class="music-render" id="boo"/> 
          <script>writeNote();</script>
  `
    )
    console.log(Html)
    },[])
    


  return (
          <WebView 
                  source={{ html: Html           
            }} 
            style={{
                      alignSelf:'center',
                      width:3000, // aumentando este ancho logro aumentar el taman;o de las figuras
                      maxHeight:'100%',
                      backgroundColor:'red'
            }}
            />
  );
}

