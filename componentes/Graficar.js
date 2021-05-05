import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default ( {notasParam,cantPulsosParam, denominadorParam} ) =>{

    const [notasPorCompas, setNotasPorCompas] = useState(notasParam);
    const [cantPulsosPorCompas, setCantPulsosPorCompas] = useState(cantPulsosParam);
    const [denominador, setDenominador] = useState(denominadorParam);


  return (    
          <WebView source={{ html:  
    `    
        <head>
        <style>
            .div-music-render{

            } 
            .music-render {
            
                margin: 10px auto;
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.85);
                align-content: center;
                width: 500px;


            }
            .div-button {
            width:500px;
            height: 50px;
            margin: 100px auto;
            }
            .button{
            height:100px;
            width:400px;
            }
            
        </style>
        </head>
        <script src="https://unpkg.com/vexflow/releases/vexflow-debug.js"> 
        </script>
        <script>
            function writeNote(pitch, rhythm){  //(tono,ritmo)
          
                const VF = Vex.Flow;

                // Create a VexFlow renderer attaced to the DIV element "boo"
                var vf = new VF.Factory({renderer: {elementId: 'new-song'}});
                var score = vf.EasyScore();
                var system = vf.System();

                // Create a 4/4 treble stave, and add two parallel voices
                system.addStave({
                voices: [  
                    // Top voice has 4 quarter notes with stems up
                    score.voice(score.notes('`+ notasPorCompas +`')),
                
                    
                ]
                }).addClef('treble').addTimeSignature('4/4');

                // Draw it!
                vf.draw();
            }
        </script> 
        <div class="div-music-render">
        <div class="music-render" id="new-song"> </div>
        </div>
        <div class="div-button">
        <input  class="button" type="submit" id="score" 
        onclick="writeNote('C5', '/h')" value="Make this note">
        </div>
    `
    }} 
    style={{ marginTop: 100,
              alignSelf:'center',
              width:500,
              height:500,
     }}
 />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
