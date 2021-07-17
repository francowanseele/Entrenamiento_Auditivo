import React, {useState} from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, TextInput,TouchableOpacity } from 'react-native';
import { setStorageUserLogged } from '../../../utils/asyncStorageManagement';
import { getUsuarioApi } from '../../api/user';
import {BACKGROUNDHOME,TEXTHOME,ITEMSHOME, TOPSCREENHOME} from '../../styles/styleValues';


export default function UserGuest(props) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const { setLogin, setIsStudent } = props;
    const loginStudent = async () => {
        await setStorageUserLogged(
            'franco.wanseele@gmail.com',
            '1',
            '60ca130df62dc319f92173d6',
            '60c524e76b07c02c7250abba'
        );

        setIsStudent(true);
        setLogin(true);
    };

    const loginDoc = async () => {
        await setStorageUserLogged(
            'franco.wanseele@gmail.com',
            '0',
            'DEFINIR',
            '60c524e76b07c02c7250abba'
        );

        setIsStudent(false);
        setLogin(true);
    };
    const loginFunc = async () =>{
        if ( validate(Email) == true ){
            getUsuarioApi(Email,Password).then((res)=>{
                if (res.ok){
                    if (res.esDocente){
                    //AQUI VA USUARIO DOCENTE setStorage
                    }else{
                        setStorageUserLogged(
                            res.email,
                            '1',
                            res.id_user,
                            res.personal_course,
                        )
                        setIsStudent(true);
                        setLogin(true);
                    }
                }else {
                    // console.log(res)
                    Alert.alert(
                        "                :(",
                        "Usuario y/o contraseña incorrectos"                
                    );
                    setEmail("");
                    setPassword("");                
                }
            })
        }else {
            // console.log(res)
            Alert.alert(
                "                :(",
                "Correo invalido"                
            );
            setEmail("");
            setPassword("");                
        }    
    }

    const updateInputVal = (val, prop) => {
        if (prop === 'Email'){
            setEmail(val) 
        } else if (prop === 'Password'){
            setPassword(val)
        }; 
      }
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          return false;
        }
        else {
          console.log("Email is Correct");
          return true
        }
     }

    return (
        <View style={styles.container}>
           
            {/* <Button title="boton que no hace nada" />
            <Button title="Entrar como estudiante" onPress={loginStudent} />
            <Button title="Entrar como docente" onPress={loginDoc} /> */}
            <View  style={styles.login}>  
                <TextInput
                style={styles.inputStyle}
                placeholder="Correo"
                value={Email}
                onChangeText={(val) => updateInputVal(val, 'Email')}
                />
                <TextInput
                style={styles.inputStyle}
                placeholder="Contraseña"
                value={Password}
                onChangeText={(val) => updateInputVal(val, 'Password')}
                maxLength={15}
                secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={loginFunc}
                    >
                        <Text style={styles.textLogin}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:BACKGROUNDHOME,
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    buttonContainer:{
        borderRadius:10,
        shadowColor: '#470000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
        elevation:13, 
        backgroundColor:ITEMSHOME,
        flexDirection:'column',
        padding:5,
        height:'20%',
        width:'50%',
        alignItems:'center',
        alignSelf:'center'
    },
    button:{
        backgroundColor:ITEMSHOME,
        borderRadius:4,
        height:'100%',
        width:'100%',
        alignSelf:'center',
        alignItems:'center'
        
    },
    textLogin:{
        fontSize:20,
        fontWeight:'bold',
        color: TEXTHOME,
        alignSelf:'center'
    },
    login:{

        flexDirection: "column",
        justifyContent:"space-evenly",

    },
    inputStyle:{
        color:TEXTHOME,
        padding:10,
        backgroundColor:ITEMSHOME,
        borderRadius:5,
        borderWidth:0.4
        
    }
})
