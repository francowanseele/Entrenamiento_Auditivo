import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {
    BACKGROUNDHOME,
    TEXTHOME,
    ITEMSHOME,
    TOPSCREENHOME,
} from '../../styles/styleValues';
import { setStorageUserLogged } from '../../../utils/asyncStorageManagement';
import { addUserApi, getUsuarioApi } from '../../api/user';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { ScrollView } from 'react-native-gesture-handler';
import { addCourseApi } from '../../api/course';

const Tab = createMaterialTopTabNavigator();

export default function UserGuest(props) {
    const [isVisiblePass, setIsVisiblePass] = useState(true);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [lastNameUser, setLastNameUser] = useState('');
    const [typeUser, setTypeUser] = useState('estudiante');
    const { setLogin, setIsStudent } = props;
    const [student, setStudent] = useState(true);
    const [registerStatus, setRegisterStatus] = useState(false);

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

    const loginFunc = async () => {
        if (validate(Email) == true) {
            const data = {
                email: Email,
                password: Password,
                isTeacher: !student,
            };

            getUsuarioApi(data).then(async (res) => {
                if (res.ok) {
                    if (res.esDocente) {
                        await setStorageUserLogged(
                            res.email,
                            '0',
                            res.id_user,
                            res.personal_course
                        );
                        setIsStudent(false);
                        setLogin(true);
                    } else {
                        await setStorageUserLogged(
                            res.email,
                            '1',
                            res.id_user,
                            res.personal_course
                        );
                        setIsStudent(true);
                        setLogin(true);
                    }
                } else {
                    // console.log(res)
                    Alert.alert('Ups..', 'Usuario y/o contraseña incorrectos');
                    setEmail('');
                    setPassword('');
                }
            });
        } else {
            // console.log(res)
            Alert.alert('Ups..', 'Usuario y/o contraseña incorrectos');
            setEmail('');
            setPassword('');
        }
    };

    const updateInputVal = (val, prop) => {
        if (prop === 'Email') {
            setEmail(val);
        } else if (prop === 'Password') {
            setPassword(val);
        } else if (prop === 'repeatPassword') {
            setRepeatPassword(val);
        } else if (prop === 'nameUser') {
            setNameUser(val);
        } else if (prop === 'lastNameUser') {
            setLastNameUser(val);
        }
    };

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            return false;
        } else {
            return true;
        }
    };

    const changeRegisterLogin = () => {
        setIsVisiblePass(true);
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        setNameUser('');
        setLastNameUser('');
        setTypeUser('estudiante');
        setStudent(true);
        setRegisterStatus(!registerStatus);
    };

    const validateRegister = () => {
        return (
            Email != '' &&
            Password != '' &&
            repeatPassword != '' &&
            nameUser != '' &&
            lastNameUser != '' &&
            Password == repeatPassword
        );
    };

    const register = async () => {
        if (validateRegister()) {
            const data = {
                name: 'Personal - ' + nameUser,
                description:
                    'Curso personal del usuario ' +
                    nameUser +
                    ' ' +
                    lastNameUser,
                personal: true,
            };

            const addCourseResponse = await addCourseApi(data);

            if (addCourseResponse.ok) {
                if (typeUser == 'estudiante' || typeUser == 'ambos') {
                    const dataUserEstudent = {
                        name: nameUser,
                        lastname: lastNameUser,
                        email: Email,
                        password: Password,
                        isTeacher: false,
                        idCoursePersonal: addCourseResponse.course._id,
                        studyCourseArray: [],
                        dictateCourseArray: [],
                        inInstituteArray: [],
                    };

                    const userEstudentResult = await addUserApi(
                        dataUserEstudent
                    );
                    if (userEstudentResult.ok) {
                        if (typeUser == 'estudiante') {
                            await setStorageUserLogged(
                                Email,
                                '1',
                                userEstudentResult.user._id,
                                addCourseResponse.course._id
                            );

                            setIsStudent(true);
                            setLogin(true);
                        }
                    }
                }

                if (typeUser == 'docente' || typeUser == 'ambos') {
                    const dataUserDoc = {
                        name: nameUser,
                        lastname: lastNameUser,
                        email: Email,
                        password: Password,
                        isTeacher: true,
                        idCoursePersonal: addCourseResponse.course._id,
                        studyCourseArray: [],
                        dictateCourseArray: [],
                        inInstituteArray: [],
                    };

                    const userDocResult = await addUserApi(dataUserDoc);
                    if (userDocResult.ok) {
                        if (typeUser == 'docente') {
                            await setStorageUserLogged(
                                Email,
                                '0',
                                userDocResult.user._id,
                                addCourseResponse.course._id
                            );

                            setIsStudent(false);
                            setLogin(true);
                        }
                    }
                }

                if (typeUser == 'ambos') {
                    changeRegisterLogin();
                }
            }
        } else {
            Alert.alert(
                'Ups..',
                'Debe completar todos los campos de forma correcta.'
            );
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* <Button title="Entrar como docente" onPress={loginDoc} /> */}
            {registerStatus ? (
                <>
                    <Image
                        source={require('../../../assets/ADA_logo.png')}
                        style={styles.imgLogoRegister}
                    />

                    <SwitchSelector
                        initial={0}
                        onPress={(value) => setTypeUser(value)}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Estudiante',
                                value: 'estudiante',
                            },
                            {
                                label: 'Docente',
                                value: 'docente',
                            },
                            {
                                label: 'Ambos',
                                value: 'ambos',
                            },
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        style={{
                            width: '100%',
                            marginBottom: 10,
                        }}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Nombre"
                        value={nameUser}
                        onChangeText={(val) => updateInputVal(val, 'nameUser')}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Apellido"
                        value={lastNameUser}
                        onChangeText={(val) =>
                            updateInputVal(val, 'lastNameUser')
                        }
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Correo"
                        value={Email}
                        onChangeText={(val) => updateInputVal(val, 'Email')}
                    />
                    <View style={styles.inputStyle}>
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Contraseña"
                            value={Password}
                            onChangeText={(val) =>
                                updateInputVal(val, 'Password')
                            }
                            maxLength={15}
                            secureTextEntry={isVisiblePass}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setIsVisiblePass(!isVisiblePass);
                            }}
                        >
                            <Icon
                                name="eye-off"
                                type="material-community"
                                color={TEXTHOME}
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputStyle}>
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Repetir contraseña"
                            value={repeatPassword}
                            onChangeText={(val) =>
                                updateInputVal(val, 'repeatPassword')
                            }
                            maxLength={15}
                            secureTextEntry={isVisiblePass}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setIsVisiblePass(!isVisiblePass);
                            }}
                        >
                            <Icon
                                name="eye-off"
                                type="material-community"
                                color={TEXTHOME}
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Registrarse"
                        buttonStyle={styles.btnLogIn}
                        onPress={register}
                    />

                    <Button
                        type="clear"
                        title="Iniciar sesión"
                        titleStyle={{ color: PRIMARY_COLOR }}
                        onPress={changeRegisterLogin}
                    />
                </>
            ) : (
                <>
                    <Image
                        source={require('../../../assets/ADA_logo.png')}
                        style={styles.imgLogo}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Correo"
                        value={Email}
                        onChangeText={(val) => updateInputVal(val, 'Email')}
                    />
                    <View style={styles.inputStyle}>
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Contraseña"
                            value={Password}
                            onChangeText={(val) =>
                                updateInputVal(val, 'Password')
                            }
                            maxLength={15}
                            secureTextEntry={isVisiblePass}
                        />
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setIsVisiblePass(!isVisiblePass);
                            }}
                        >
                            <Icon
                                name="eye-off"
                                type="material-community"
                                color={TEXTHOME}
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>
                    <SwitchSelector
                        initial={0}
                        onPress={(value) => setStudent(value == 'e')}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Estudiante',
                                value: 'e',
                            },
                            {
                                label: 'Docente',
                                value: 'd',
                            },
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        style={{
                            width: '100%',
                            marginBottom: 10,
                        }}
                    />
                    <Button
                        title="Iniciar sesión"
                        buttonStyle={styles.btnLogIn}
                        onPress={loginFunc}
                    />
                    <Button
                        type="clear"
                        title="Registrarse"
                        titleStyle={{ color: PRIMARY_COLOR }}
                        onPress={changeRegisterLogin}
                    />
                </>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    textLogo: {
        fontSize: 70,
        color: PRIMARY_COLOR,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    imgLogoRegister: {
        marginTop: 50,
        width: '40%',
        height: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 30,
    },
    imgLogo: {
        marginTop: 50,
        width: '60%',
        height: '40%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 30,
    },
    btnLogIn: {
        backgroundColor: PRIMARY_COLOR,
    },
    container: {
        backgroundColor: BACKGROUNDHOME,
        // flexDirection: 'column',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    buttonContainer: {
        borderRadius: 10,
        shadowColor: '#470000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        elevation: 13,
        backgroundColor: ITEMSHOME,
        flexDirection: 'column',
        padding: 5,
        height: '16%',
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ITEMSHOME,
        borderRadius: 4,
        height: '100%',
        width: '100%',
    },
    textLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXTHOME,
        alignSelf: 'center',
    },
    login: {
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
    },
    inputStyle: {
        flexDirection: 'row',
        width: '100%',
        color: TEXTHOME,
        padding: 10,
        backgroundColor: ITEMSHOME,
        borderRadius: 5,
        borderWidth: 0.4,
        marginBottom: 10,
    },
    inputPass: {
        width: '92%',
    },
});
