import React, {useState} from 'react';
import { Button, View, StyleSheet, Alert, Dimensions, TextInput } from 'react-native';
import { setStorageUserLogged } from '../../../utils/asyncStorageManagement';
import { getUsuarioApi } from '../../api/user';


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
        getUsuarioApi(Email,Password).then((res)=>{
            console.log(res)
            if (res.ok){
                if (res.esDocente){
                }else{
                    setStorageUserLogged(
                        'martin',
                        '1',
                        '60dcb5af0a02b10148eaf0fe',
                        '60c52937d3d56b2cd1671b31'
                    );
                    setIsStudent(true);
                    setLogin(true);
                }
            }else {
                Alert.alert(
                    "                :(",
                    "Usuario y/o contraseña incorrectos"                
                  );
                setEmail("");
                setPassword("");                
            }
        })
       
    }

    const updateInputVal = (val, prop) => {
        if (prop === 'Email'){
            setEmail(val) 
        } else if (prop === 'Password'){
            setPassword(val)
        }; 
      }

    return (
        <View style={styles.container}>
            {/* <Button title="boton que no hace nada" />
            <Button title="Entrar como estudiante" onPress={loginStudent} />
            <Button title="Entrar como docente" onPress={loginDoc} /> */}
            <View  style={styles.login}>  
                <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={Email}
                onChangeText={(val) => updateInputVal(val, 'Email')}
                />
                <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={Password}
                onChangeText={(val) => updateInputVal(val, 'Password')}
                maxLength={15}
                secureTextEntry={true}
                />
                <Button title="Iniciar Sesion" onPress={loginFunc} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: '#fff',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    login:{
        flexDirection: "column",
        justifyContent:"center",

    },
    inputStyle:{
        padding:10,
    }
})
