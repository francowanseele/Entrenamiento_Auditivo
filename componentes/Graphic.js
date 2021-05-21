import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ( {figurasParam,dictadoGeneradoTraducidoParam,numeradorParam, denominadorParam, claveParam} ) =>{

    
    const [figuras, setfiguras] = useState(figurasParam);
    // const [tarjetas, setTarjetas] = useState({
    //   'd4-8':
    //   'd4-8-8':
    //   'd2':
    //   '4-4':
    //   '16-16-16-16':
    //   '8-16-16':
    //   '16-8-16':
    // })
    const [FigurasDictadoConCompas, setFigurasDictadoConCompas] = useState(figurasParam);
    const [dictadoGeneradoTraducido,setdictadoGeneradoTraducido] = useState(dictadoGeneradoTraducidoParam);
    const [denominador, setDenominador] = useState(denominadorParam);
    const [numerador, setNumerador] = useState(numeradorParam);
    const [clave,setclave] = useState(claveParam);
    // const [figuras, setfiguras] = useState(
    // [                             
    //   ["E/4","d4"], 
    //   ["Db/5","4"],
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
    //   ] );
    const translateToGraphic = () =>{
      let ultimoChar;
      let resDictado = [];
      for (let actual of dictadoGeneradoTraducido) {
         ultimoChar = actual.slice(-1);
         actual = actual.slice(0,actual.length-1) + '/' + ultimoChar;
         resDictado.push(actual)
      }
      let compasActual;
      let figuraActual; 
      let res = [];
      for (compasActual in FigurasDictadoConCompas){
        for (figuraActual in FigurasDictadoConCompas[compasActual]){
        res.push([resDictado[figuraActual],FigurasDictadoConCompas[compasActual][figuraActual]]);
        }
        if (compasActual != FigurasDictadoConCompas.length-1 ){res.push(['NuevoCompas'])};
      }
      console.log(resDictado);
      console.log(res);
      return res;      
    }
   
 
    const getFigurasyDuracion = () =>{
      console.log('dictadoGeneradoTraducido===>'+dictadoGeneradoTraducido);
      console.log('FigurasDictadoConCompas===>'+FigurasDictadoConCompas);
      setfiguras(translateToGraphic());
      let res = '';
      let compasActual =1;
      let sostenido = false;
      let bemol = false;
      let punto = false;
      for (let actual in figuras){
        if ( figuras[actual] != 'NuevoCompas'){
          if (figuras[actual].[1].includes('d')){
            figuras[actual].[1].replace('d','')
            punto = true;
          }
          if (figuras[actual].[0].includes('#')){
            figuras[actual].[0].replace('#','');
            sostenido = true;            
          }
          if (figuras[actual].[0].includes('b')){
            figuras[actual].[0].replace('b','');
            bemol = true;            
          }
          if (!sostenido && !bemol && !punto) {
            res = res.concat('new Vex.Flow.StaveNote({ keys: ["'+figuras[actual].[0]+'"], duration: "'+figuras[actual].[1]+'" }),'+'\n');
          }else if (sostenido){
            res = res.concat('new Vex.Flow.StaveNote({ keys: ["'+figuras[actual].[0]+'"], duration: "'+figuras[actual].[1]+'" }).addAccidental(0, new VF.Accidental("#")),'+'\n');
          }else if (bemol){
            res = res.concat('new Vex.Flow.StaveNote({ keys: ["'+figuras[actual].[0]+'"], duration: "'+figuras[actual].[1]+'" }).addAccidental(0, new VF.Accidental("b")),'+'\n');
          }else if (punto){
            res = res.concat('new Vex.Flow.StaveNote({ keys: ["'+figuras[actual].[0]+'"], duration: "'+figuras[actual].[1]+'" }).addDotToAll(),'+'\n');
          }
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
        sostenido = false;
        bemol = false;
        punto = false;  
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
    // console.log(Html)
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

