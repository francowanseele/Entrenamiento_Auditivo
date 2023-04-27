import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    Linking,
} from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem, Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    getParams,
    setStorageUserLogout,
} from '../../../utils/asyncStorageManagement';
import {
    PRIMARY_COLOR,
    QUARTER_COLOR,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';
import { softDeleteUserApi } from '../../api/user';

export default function Settings(props) {
    const { refRBSheet, setLogin } = props;

    const [option, setOption] = useState('');

    const close = () => {
        refRBSheet.current.close();
    }

    const logout = async () => {
        await setStorageUserLogout();
        await setLogin(false);
    };

    const deleteAccount = async () => {
        const { id } = await getParams();
        const deletedResult = await softDeleteUserApi(id);

        if (deletedResult.ok) {
            await logout();
        }
    }

    const redirectAppStore = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/uy/app/ada/id1636156710?l=es');
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.entrenamiento_auditivo');
        }
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            height={Dimensions.get('window').height * 0.75}
            closeDuration={CLOSE_BOTTOM_SHEET}
            onOpen={() => {
                setOption('');
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                },
            }}
        >   
            {option == 'delete' ? (
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View>
                        <Text style={styles.titleDelete}>¿Desea eliminar la cuenta?</Text>
                        <Text style={styles.textInfo}>
                            Tu cuenta será eliminada de forma permanente.
                        </Text>
                    </View>
                    <View style={styles.contentBottom}>
                        <Button 
                            style={styles.cerrarSesionStyle}
                            buttonStyle={styles.cerrarSesionButtonStyle}
                            titleStyle={styles.cerrarSesionTitleStyle}
                            title={'Cancelar'} 
                            onPress={() => close()}
                        />
                        <Button
                            titleStyle={{ color: 'darkred' }}
                            buttonStyle={{padding: 0, marginVertical: 10}}
                            style={styles.deleteAccoundButtonStyle}
                            type="clear"
                            title={'Eliminar cuenta'}
                            onPress={() => deleteAccount()}
                        />
                    </View>
                </ScrollView>
            ) : option == 'logout' ? (
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View>
                        <Text style={styles.title}>¿Seguro quieres salir?</Text>
                        <Text style={styles.textInfo}>Deberás de volver a iniciar sesión con tus credenciales.</Text>
                    </View>
                    <View style={styles.contentBottom}>
                        <Button 
                            style={styles.cerrarSesionStyle}
                            buttonStyle={styles.cerrarSesionButtonStyle}
                            titleStyle={styles.cerrarSesionTitleStyle}
                            title={'Cancelar'} 
                            onPress={() => close()}
                        />
                        <Button
                            titleStyle={{ color: 'gray' }}
                            buttonStyle={{padding: 0, marginVertical: 10}}
                            style={styles.deleteAccoundButtonStyle}
                            type="clear"
                            title={'Cerrar sesión'}
                            onPress={() => logout()}
                        />
                    </View>
                </ScrollView>
            ) : option == 'info' ? (
                <View>
                    <Text style={styles.title}>Tu feedback nos sirve</Text>
                    <Text style={styles.textInfo}>Podes enviarnos un mail a proy.ing.sw@gmail.com con dudas o sugerencias. ¡¡Todo comentario nos ayuda a seguir mejorando!!</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View>
                        <Text style={styles.title}>Configuración</Text>
                        <ListItem onPress={() => redirectAppStore()}>
                            <Icon name="star-box-outline" type="material-community" color="grey" />
                            <ListItem.Content>
                                <ListItem.Title>¿Te gusto la app?</ListItem.Title>
                                <ListItem.Subtitle
                                    style={{ fontSize: 14, color: 'gray' }}
                                >
                                    Valóranos en la App Store
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                        <ListItem onPress={() => setOption('info')}>
                            <Icon name="comment-account-outline" type="material-community" color="grey" />
                            <ListItem.Content>
                                <ListItem.Title>Tu opinión nos importa</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </View>
                    <View style={styles.contentBottom}>
                        <Text style={{color: 'dimgray', marginBottom: 15, textAlign: 'justify'}}>ADA - Entrenamiento Auditivo es una herramienta de software libre, desarrollada con el fin de que docentes de música guíen el entrenamiento auditivo de sus estudiantes.</Text>
                        <Button 
                            style={styles.cerrarSesionStyle}
                            buttonStyle={styles.cerrarSesionButtonStyle}
                            titleStyle={styles.cerrarSesionTitleStyle}
                            title={'Cerrar sesión'} 
                            onPress={() => setOption('logout')}
                        />
                        <Button
                            titleStyle={{ color: 'gray', fontSize: 15 }}
                            buttonStyle={{padding: 0, marginVertical: 10}}
                            style={styles.deleteAccoundButtonStyle}
                            type="clear"
                            title={'Eliminar cuenta'}
                            onPress={() => setOption('delete')}
                        />
                    </View>
                </ScrollView>
            )}
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    deleteAccoundButtonStyle: {
        // backgroundColor: 'red',
        width: '50%',
        alignSelf: 'center',
    },
    cerrarSesionStyle: {
        width: '50%',
        alignSelf: 'center',
    },
    cerrarSesionButtonStyle: {
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        // width: '50%',
        // alignSelf: 'center'
    },
    cerrarSesionTitleStyle: {
        color: 'gray'
    },
    contentScroll: {
        flexGrow: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        height: '100%',
    },
    contentBottom: {
        padding: 25,
        backgroundColor: 'lightgray',
    },
    textInfo: {
        margin: 20
    },
    title: {
        fontSize: 26,
        color: PRIMARY_COLOR,
        textAlign: 'center',
        marginVertical: 25,
        fontWeight: 'bold',
    },
    titleDelete: {
        fontSize: 26,
        color: 'darkred',
        textAlign: 'center',
        marginVertical: 25,
        fontWeight: 'bold',
    },
    container: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconOption: {
        fontSize: 20,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: PRIMARY_COLOR,
    },
    iconOptionDelete: {
        fontSize: 20,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: TEXT_COLOR_WRONG,
    },
    options: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
    },
    optionsDelete: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
        color: TEXT_COLOR_WRONG,
    },
    confirmationTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    editTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    confirmationText: {
        fontSize: 20,
        paddingHorizontal: 15,
    },
    containerConfirmation: {
        position: 'relative',
        height: '100%',
    },
    containerButtons: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: '20%',
    },
    containerButtonOk: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: PRIMARY_COLOR,
    },
    containerButtonOkDelete: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: TEXT_COLOR_WRONG,
    },
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
    },
});
